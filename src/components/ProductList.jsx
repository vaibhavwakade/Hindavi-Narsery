import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import LoadingSpinner from './common/LoadingSpinner';
import { Search, Filter, Leaf, AlertCircle } from 'lucide-react';

function ProductList({ searchQuery, sortBy: initialSortBy, viewMode, categoryParam }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [localSearch, setLocalSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [priceRange, setPriceRange] = useState('');
  const [sortBy, setSortBy] = useState(initialSortBy || 'price-low'); // Default to price low to high

  // Use searchQuery from props if provided, otherwise use local search
  const effectiveSearch = searchQuery || localSearch;
  
  // Set the selected category based on the categoryParam prop if provided
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

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
        
        // Debug: Log the backend URL
        console.log('🔍 Backend URL:', import.meta.env.VITE_BACKEND_URL);
        console.log('🔍 Environment variables:', import.meta.env);
        
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`, {
            params: { 
              category: selectedCategory, 
              search: effectiveSearch,
              priceRange
            },
          }),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`),
        ]);
        
        let fetchedProducts = productsRes.data.products || [];
        
        // Sort products based on sortBy state
        fetchedProducts = sortProducts(fetchedProducts, sortBy);
        console.log([productsRes, categoriesRes] )
        setProducts(fetchedProducts);
        console.log({categoriesRes})
        setCategories(Array.isArray(categoriesRes?.data) ? categoriesRes?.data : []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load plants. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [selectedCategory, effectiveSearch, sortBy, priceRange]);

  const sortProducts = (products, sortType) => {
    const sortedProducts = [...products];
    switch (sortType) {
      case 'price-low':
        return sortedProducts.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sortedProducts.sort((a, b) => b.price - a.price);
      case 'popularity':
        return sortedProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'name':
        return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return sortedProducts;
    }
  };

  const clearAllFilters = () => {
    setSelectedCategory('');
    setLocalSearch('');
    setPriceRange('');
    setSortBy('price-low'); // Reset to default sort order
  };

  const activeFiltersCount = [selectedCategory, priceRange].filter(Boolean).length;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="relative">
          <LoadingSpinner />
          <div className="absolute -top-2 -right-2">
            <Leaf className="w-6 h-6 text-green-500 animate-pulse" />
          </div>
        </div>
        <p className="mt-4 text-green-600 font-medium">Growing your plant collection...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="bg-red-100 rounded-full p-4 mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Oops! Something went wrong</h3>
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
    <div className="space-y-6">
      {/* Advanced Filters - Only show if not using parent page filters */}
      {!searchQuery && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for plants, pots, accessories..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Sort Order Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-sm"
                >
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popularity">Popularity</option>
                  <option value="name">Name</option>
                </select>
                
                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-sm"
                >
                  <option value="">All Categories</option>
                  {categories?.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
                
                {/* Price Range Filter - Updated to ₹ */}
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="px-3 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-sm"
                >
                  <option value="">Any Price</option>
                  <option value="0-499">Under ₹499</option>
                  <option value="500-999">₹500 - ₹999</option>
                  <option value="1000-1999">₹1000 - ₹1999</option>
                  <option value="2000-4999">₹2000 - ₹4999</option>
                  <option value="5000+">Over ₹5000</option>
                </select>
              </div>
            </div>
          </div>
          
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2 mt-3">
              <span className="text-sm text-green-700 font-medium">
                {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} applied
              </span>
              <button
                onClick={clearAllFilters}
                className="text-sm text-green-600 hover:text-green-800 underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      )}

      {/* Results Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Leaf className="w-5 h-5 text-green-600" />
          <span className="text-gray-700">
            {products.length} plant{products.length !== 1 ? 's' : ''} found
            {effectiveSearch && ` for "${effectiveSearch}"`}
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
        <div className={`
          ${viewMode === 'list' 
            ? 'space-y-4' 
            : 'grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6'
          }
        `}>
          {products?.map((product) => (
            <div key={product.id} className="group relative">
              <div className={viewMode === 'list' ? 'transform hover:scale-[1.02]' : ''}>
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
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No plants found</h3>
          <p className="text-gray-600 mb-6">
            {effectiveSearch 
              ? `We couldn't find any plants matching "${effectiveSearch}"`
              : "No plants match your current filters"
            }
          </p>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Try:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Checking your spelling</li>
              <li>• Using different keywords</li>
              <li>• Removing some filters</li>
              <li>• Browsing all categories</li>
            </ul>
          </div>
          {(effectiveSearch || activeFiltersCount > 0) && (
            <button
              onClick={clearAllFilters}
              className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}

      {/* Load More Button (if pagination is needed) */}
      {products.length > 0 && products.length % 12 === 0 && (
        <div className="text-center pt-8">
          <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl">
            Load More Plants
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductList;