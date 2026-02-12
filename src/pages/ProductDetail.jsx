import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  ShoppingCart,
  Heart,
  Minus,
  Plus,
  Check,
  TruckIcon,
  Shield,
  Star,
} from "lucide-react";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { CartCountContext } from "../context/cartCount";
import ProductReviewSection from "../components/ProductReviewSection";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { setCartCount } = useContext(CartCountContext);

  useEffect(() => {
    const fetchProduct = async () => {
      // Check if id is valid before making API call
      if (!id || id === "undefined") {
        toast.error("Invalid product ID");
        navigate("/products");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/products/${id}`,
        );
        setProduct(res.data);
      } catch (error) {
        const message =
          error.response?.data?.message || "Failed to load product";
        toast.error(message);
        navigate("/products");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to add items to cart");
        navigate("/login");
        return;
      }
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/cart/add`,
        { productId: id, quantity: quantity },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setCartCount((prev) => prev + 1);

      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
      toast.success("Added to cart!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!product) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Images */}
        <div className="md:w-1/2">
          <div className="bg-gray-50 rounded-xl p-6 flex items-center justify-center">
            <img
              src={
                product.imageUrls[selectedImage] ||
                "https://via.placeholder.com/400"
              }
              alt={product.name}
              className="w-full h-96 object-contain rounded-lg"
            />
          </div>
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {product.imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`${product.name} ${index + 1}`}
                className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 
                  ${selectedImage === index ? "border-green-500 shadow-md" : "border-transparent"}`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="md:w-1/2">
          {product.stock < 10 && product.stock > 0 && (
            <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">
              Only {product.stock} left in stock
            </div>
          )}
          {product.stock === 0 && (
            <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">
              Out of Stock
            </div>
          )}

          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-600 mt-1">{product.category?.name}</p>

          <div className="mt-4">
            <p className="text-3xl font-bold text-gray-900">
              ₹{parseFloat(product.price || 0).toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">Price includes taxes</p>
          </div>

          <div className="mt-6">
            <h3 className="font-medium text-gray-900 mb-2">Description</h3>
            <p className="text-gray-700">
              {product.description || "No description available"}
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center text-gray-700">
              <TruckIcon className="h-5 w-5 text-green-600 mr-2" />
              <span>Free shipping on orders over ₹350</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Shield className="h-5 w-5 text-green-600 mr-2" />
              <span>30-day returns & plant health guarantee</span>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mt-8">
            <h3 className="font-medium text-gray-900 mb-3">Quantity</h3>
            <div className="flex items-center">
              <button
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center 
                  hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Minus size={16} />
              </button>
              <span className="mx-4 w-10 text-center font-medium">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                disabled={product.stock <= quantity}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center 
                  hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="mt-8 flex space-x-4">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || addingToCart}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl 
                font-medium flex items-center justify-center space-x-2 transition duration-200
                shadow-md hover:shadow-lg transform hover:scale-[1.02] disabled:opacity-50 
                disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
              {addingToCart ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : addedToCart ? (
                <>
                  <Check className="h-5 w-5" />
                  <span>Added to Cart</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5" />
                  <span>
                    {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </span>
                </>
              )}
            </button>

            <button
              className="w-12 h-12 flex items-center justify-center rounded-full 
              border-2 border-gray-300 hover:border-red-400 hover:bg-red-50 transition duration-200"
            >
              <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
            </button>
          </div>
        </div>
      </div>
      <ProductReviewSection productId={id} />
    </div>
  );
}

export default ProductDetail;
