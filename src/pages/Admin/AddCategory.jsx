import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Leaf,
  Edit,
  Trash2,
  Plus,
  X,
  Save,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

function AddCategory() {
  // State for new category form
  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
    type: "",
  });

  // State for edit form
  const [editingCategory, setEditingCategory] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
    type: "",
  });

  // State for all categories
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [categoryError, setCategoryError] = useState("");
  const [categorySuccess, setCategorySuccess] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch all categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setRefreshing(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/categories`,
      );
      setCategories(response.data);
    } catch (error) {
      toast.error("Failed to fetch categories");
      console.error("Error fetching categories:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleCategorySubmit = async () => {
    setCategoryError("");
    setCategorySuccess("");
    setLoading(true);

    if (!token) {
      setCategoryError("You must be logged in as admin to create a category");
      setLoading(false);
      return;
    }

    if (!categoryData.name || !categoryData.type) {
      setCategoryError("Name and type are required");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/categories`,
        categoryData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setCategorySuccess(response.data.message);
      setCategoryData({ name: "", description: "", type: "" });
      toast.success("Category added successfully");
      fetchCategories(); // Refresh the list
    } catch (error) {
      setCategoryError(
        error.response?.data?.message || "Error creating category",
      );
      toast.error(error.response?.data?.message || "Error creating category");
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (category) => {
    setEditingCategory(category._id);
    setEditFormData({
      name: category.name,
      description: category.description || "",
      type: category.type || "",
    });
  };

  const cancelEditing = () => {
    setEditingCategory(null);
    setEditFormData({ name: "", description: "", type: "" });
  };

  const saveEdit = async (categoryId) => {
    if (!token) {
      toast.error("You must be logged in as admin to edit a category");
      return;
    }

    if (!editFormData.name || !editFormData.type) {
      toast.error("Name and type are required");
      return;
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/categories/${categoryId}`,
        editFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Update the local state to reflect changes
      setCategories(
        categories.map((cat) =>
          cat._id === categoryId ? { ...cat, ...editFormData } : cat,
        ),
      );

      toast.success("Category updated successfully");
      cancelEditing();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating category");
    }
  };

  const confirmDelete = (categoryId) => {
    setDeleteConfirm(categoryId);
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  const deleteCategory = async (categoryId) => {
    if (!token) {
      toast.error("You must be logged in as admin to delete a category");
      return;
    }

    try {
      // Add debugging to see what's happening
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/categories/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Delete response:", response.data);

      // Remove the category from the local state
      setCategories(categories.filter((cat) => cat._id !== categoryId));

      toast.success("Category deleted successfully");
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting category:", error);
      console.error("Error response:", error.response?.data);
      toast.error(error.response?.data?.message || "Error deleting category");
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center text-green-600">
        <Leaf className="h-8 w-8 mr-2" /> Category Management
      </h1>

      {/* Add Category Form */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Plus className="h-5 w-5 mr-2 text-green-600" />
          Add New Category
        </h2>

        {categoryError && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            <p>{categoryError}</p>
          </div>
        )}

        {categorySuccess && (
          <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-500 text-green-700">
            <p>{categorySuccess}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="categoryName"
              className="block text-sm font-medium text-gray-700"
            >
              Category Name *
            </label>
            <input
              type="text"
              id="categoryName"
              name="name"
              value={categoryData.name}
              onChange={handleCategoryChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="e.g., Indoor Plants"
              required
            />
          </div>

          <div>
            <label
              htmlFor="categoryType"
              className="block text-sm font-medium text-gray-700"
            >
              Category Type *
            </label>
            <select
              id="categoryType"
              name="type"
              value={categoryData.type}
              onChange={handleCategoryChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            >
              <option value="">Select a type</option>
              <option value="Pots">Pots</option>
              <option value="Flowers">Flowers</option>
              <option value="Plants">Plants</option>
              <option value="Utensils">Utensils</option>
              <option value="Tools">Tools</option>
              <option value="Seeds">Seeds</option>
              <option value="Fertilizers">Fertilizers</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="categoryDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              type="text"
              id="categoryDescription"
              name="description"
              value={categoryData.description}
              onChange={handleCategoryChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="e.g., Plants suitable for indoor environments"
            />
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={handleCategorySubmit}
            disabled={loading}
            className="py-2 px-4 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </>
            )}
          </button>
        </div>
      </div>

      {/* Categories List */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold flex items-center">
            <Leaf className="h-5 w-5 mr-2 text-green-600" />
            All Categories
          </h2>
          <button
            onClick={fetchCategories}
            className="flex items-center text-sm text-green-600 hover:text-green-800"
            disabled={refreshing}
          >
            <RefreshCw
              className={`h-4 w-4 mr-1 ${refreshing ? "animate-spin" : ""}`}
            />
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No categories found. Add your first category above.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr
                    key={category._id}
                    className={
                      editingCategory === category._id
                        ? "bg-green-50"
                        : "hover:bg-gray-50"
                    }
                  >
                    {editingCategory === category._id ? (
                      // Edit mode
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="text"
                            name="name"
                            value={editFormData.name}
                            onChange={handleEditChange}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            placeholder="Category name"
                            required
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            name="type"
                            value={editFormData.type}
                            onChange={handleEditChange}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            required
                          >
                            <option value="">Select a type</option>
                            <option value="Pots">Pots</option>
                            <option value="Flowers">Flowers</option>
                            <option value="Plants">Plants</option>
                            <option value="Utensils">Utensils</option>
                            <option value="Tools">Tools</option>
                            <option value="Seeds">Seeds</option>
                            <option value="Fertilizers">Fertilizers</option>
                            <option value="Others">Others</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            name="description"
                            value={editFormData.description}
                            onChange={handleEditChange}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            placeholder="Description (optional)"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => saveEdit(category._id)}
                              className="text-green-600 hover:text-green-900 bg-green-100 p-1 rounded-full"
                              title="Save changes"
                            >
                              <Save className="h-5 w-5" />
                            </button>
                            <button
                              onClick={cancelEditing}
                              className="text-gray-600 hover:text-gray-900 bg-gray-100 p-1 rounded-full"
                              title="Cancel"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      // View mode
                      <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {category.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {category.type || "N/A"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                          {category.description || "No description provided"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {deleteConfirm === category._id ? (
                            <div className="flex justify-end items-center space-x-2">
                              <span className="text-red-600 text-xs font-medium">
                                Confirm?
                              </span>
                              <button
                                onClick={() => deleteCategory(category.id)}
                                className="text-white bg-red-600 p-1 rounded-full hover:bg-red-700"
                                title="Confirm delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={cancelDelete}
                                className="text-gray-600 bg-gray-100 p-1 rounded-full hover:bg-gray-200"
                                title="Cancel"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => startEditing(category)}
                                className="text-green-600 hover:text-green-900 bg-green-100 p-1 rounded-full"
                                title="Edit category"
                              >
                                <Edit className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => confirmDelete(category._id)}
                                className="text-red-600 hover:text-red-900 bg-red-100 p-1 rounded-full"
                                title="Delete category"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddCategory;
