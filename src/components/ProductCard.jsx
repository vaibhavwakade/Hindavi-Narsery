import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { useState, useEffect, useRef, useContext } from "react";

import { CartCountContext } from "../context/cartCount";

function ProductCard({ product }) {
  const [isAdding, setIsAdding] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const intervalRef = useRef(null);
  const { setCartCount } = useContext(CartCountContext);

  // Ensure imageUrls is always an array
  const imageUrls = Array.isArray(product.imageUrls)
    ? product.imageUrls
    : product.imageUrls
      ? [product.imageUrls]
      : ["https://via.placeholder.com/300x300?text=No+Image"];

  // Auto-scroll for image carousel
  useEffect(() => {
    if (imageUrls.length > 1 && !isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1,
        );
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [product.imageUrls.length, isHovered]);

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTimeout(() => {
      if (product.imageUrls.length > 1 && !isHovered) {
        intervalRef.current = setInterval(() => {
          setCurrentImageIndex((prevIndex) =>
            prevIndex === product.imageUrls.length - 1 ? 0 : prevIndex + 1,
          );
        }, 5000);
      }
    }, 3000);
  };

  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to add items to cart");
        return;
      }
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/cart/add`,
        { productId: product.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setCartCount((prev) => prev + 1);

      toast.success("Added to cart successfully");
      // window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to cart");
    } finally {
      setIsAdding(false);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div
        className="group relative bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-gray-300 flex flex-col h-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image Container - Responsive Height */}
        <div className="relative aspect-square sm:aspect-[4/3] overflow-hidden bg-gray-50">
          {/* Image Stack */}
          <div className="relative w-full h-full">
            {imageUrls.map((imageUrl, index) => (
              <div
                key={`image-${product.id}-${index}`}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  currentImageIndex === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <Link to={`/products/${product.id}`}>
                  <img
                    src={
                      imageUrl ||
                      "https://via.placeholder.com/300x300?text=No+Image"
                    }
                    alt={`${product.name} - Image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onLoad={() => setIsImageLoading(false)}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x300?text=Image+Not+Found";
                      setIsImageLoading(false);
                    }}
                  />
                </Link>
              </div>
            ))}
          </div>

          {/* Loading State */}
          {isImageLoading && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            </div>
          )}

          {/* Image Indicators - Only show on larger screens */}
          {imageUrls.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 hidden sm:flex space-x-1">
              {imageUrls.map((_, index) => (
                <button
                  key={`indicator-${product.id}-${index}`}
                  onClick={() => handleImageChange(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    currentImageIndex === index
                      ? "bg-white shadow-sm"
                      : "bg-white/60 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Stock Status */}
          {product.stock === 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
              Out of Stock
            </div>
          )}
          {product.stock > 0 && product.stock < 5 && (
            <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-medium px-2 py-1 rounded">
              {product.stock} left
            </div>
          )}

          {/* Discount Badge */}
          {product.originalPrice && product.originalPrice > product.price && (
            <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded">
              {Math.round(
                ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100,
              )}
              % OFF
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 p-3 sm:p-4 flex flex-col">
          <div className="flex-1">
            <Link to={`/products/${product.id}`}>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 hover:text-green-600 transition-colors duration-200 line-clamp-2 mb-1 sm:mb-2">
                {product.name}
              </h3>
            </Link>
            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-2 sm:mb-3">
              {product.description}
            </p>
          </div>

          {/* Price Section */}
          <div className="mb-3">
            <div className="flex items-baseline space-x-2">
              <span className="text-lg sm:text-xl font-bold text-gray-900">
                ₹{parseFloat(product.price || 0).toFixed(2)}
              </span>
              {product.originalPrice &&
                parseFloat(product.originalPrice) >
                  parseFloat(product.price) && (
                  <span className="text-xs sm:text-sm text-gray-500 line-through">
                    ₹{parseFloat(product.originalPrice || 0).toFixed(2)}
                  </span>
                )}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding || product.stock === 0}
            className={`w-full inline-flex items-center justify-center px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-md transition-all duration-200 ${
              product.stock === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                : isAdding
                  ? "bg-green-500 text-white cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 active:bg-green-800"
            }`}
          >
            <ShoppingCart className="h-4 w-4 mr-1.5" />
            {product.stock === 0
              ? "Out of Stock"
              : isAdding
                ? "Adding..."
                : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
