import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { Search, Leaf, AlertCircle } from "lucide-react";

function ProductList({ searchQuery, sortBy: initialSortBy, viewMode }) {
  const [products, setProducts] = useState([]);
  const [localSearch, setLocalSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState(initialSortBy || "price-low");

  // Use searchQuery from props if provided, otherwise use local search
  const effectiveSearch = (searchQuery || localSearch).toLowerCase().trim();

  // Set initial sort order from props if provided
  useEffect(() => {
    if (initialSortBy) {
      setSortBy(initialSortBy);
    }
  }, [initialSortBy]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch products with fixed indoor category ID and type filter
        const params = {
          category: "1", // Indoor category ID
        };
        // Only add type filter if searchQuery is not "indoor" to avoid over-filtering
        if (effectiveSearch && effectiveSearch !== "indoor") {
          params.type = effectiveSearch;
        }

        const productsRes = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/products`,
          { params },
        );

        let fetchedProducts = productsRes.data.products || [];

        // Sort products based on sortBy state
        fetchedProducts = sortProducts(fetchedProducts, sortBy);

        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load indoor plants. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [effectiveSearch, sortBy]);

  const sortProducts = (products, sortType) => {
    const sortedProducts = [...products];
    switch (sortType) {
      case "price-low":
        return sortedProducts.sort((a, b) => a.price - b.price);
      case "price-high":
        return sortedProducts.sort((a, b) => b.price - a.price);
      case "popularity":
        return sortedProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "name":
        return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return sortedProducts;
    }
  };

  const clearSearch = () => {
    setLocalSearch("");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="relative">
          <LoadingSpinner />
          <div className="absolute -top-2 -right-2">
            <Leaf className="w-6 h-6 text-green-500 animate-pulse" />
          </div>
        </div>
        <p className="mt-4 text-green-600 font-medium">
          Growing your indoor plant collection...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="bg-red-100 rounded-full p-4 mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Oops! Something went wrong
        </h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4 py-8">
      {/* Search Input */}
      {!searchQuery && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for indoor plants (e.g., tulsi, money, succulent)..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
            />
          </div>
          {localSearch && (
            <button
              onClick={clearSearch}
              className="text-sm text-green-600 hover:text-green-800 underline mt-2"
            >
              Clear search
            </button>
          )}
        </div>
      )}

      {/* Results Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Leaf className="w-5 h-5 text-green-600" />
          <span className="text-gray-700">
            {products.length} indoor plant{products.length !== 1 ? "s" : ""}{" "}
            found
            {effectiveSearch &&
              effectiveSearch !== "indoor" &&
              ` for "${effectiveSearch}"`}
          </span>
        </div>

        {products.length > 0 && (
          <div className="flex gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border-b border-gray-300 bg-transparent focus:outline-none focus:border-green-500 py-1 pl-1"
              >
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popularity">Popularity</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Products Grid/List */}
      {products.length > 0 ? (
        <div
          className={`
          ${
            viewMode === "list"
              ? "space-y-4"
              : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          }
        `}
        >
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div
                className={
                  viewMode === "list" ? "transform hover:scale-[1.02]" : ""
                }
              >
                <ProductCard
                  product={product}
                  viewMode={viewMode}
                  isFavorite={favorites.includes(product.id)}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="bg-green-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
            <Leaf className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No indoor plants found
          </h3>
          <p className="text-gray-600 mb-6">
            {effectiveSearch && effectiveSearch !== "indoor"
              ? `We couldn't find any indoor plants matching "${effectiveSearch}"`
              : "No indoor plants match your current search"}
          </p>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Try:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Checking your spelling</li>
              <li>
                • Using different keywords (e.g., tulsi, money, succulent)
              </li>
              <li>• Browsing all indoor plants</li>
            </ul>
          </div>
          {effectiveSearch && effectiveSearch !== "indoor" && (
            <button
              onClick={clearSearch}
              className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Clear Search
            </button>
          )}
        </div>
      )}

      {/* Load More Button (if pagination is needed) */}
      {products.length > 0 && products.length % 12 === 0 && (
        <div className="text-center pt-8">
          <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl">
            Load More Indoor Plants
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductList;
