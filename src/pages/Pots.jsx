import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import ProductList from '../components/ProductList';

function Pots() {
  const location = useLocation();
  const [potType, setPotType] = useState(null);
  const [potCategoryId, setPotCategoryId] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Extract pot type from URL
  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    if (pathSegments.length > 2) {
      setPotType(pathSegments[2]);
    } else {
      setPotType(null);
    }
  }, [location.pathname]);
  
  // Find the Pots category ID
  useEffect(() => {
    const fetchPotCategory = async () => {
      try {
        setLoading(true);
        
        // Fetch categories to find the Pots category
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`);
        const categories = response.data;
        
        // Look for Pots category
        const potsCategory = categories.find(category => 
          category.name === 'Pots' || 
          category.name.toLowerCase().includes('pot')
        );
        
        if (potsCategory) {
          setPotCategoryId(potsCategory.id);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPotCategory();
  }, []);

  const getTitle = () => {
    if (!potType) return 'All Planters & Pots';
    
    // Convert potType to title case (e.g., ceramic -> Ceramic)
    const formattedType = potType.charAt(0).toUpperCase() + potType.slice(1);
    return `${formattedType} Planters & Pots`;
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{getTitle()}</h1>
          <p className="text-gray-600 mt-2 text-lg">
            {potType 
              ? `Explore our collection of premium ${potType} planters for your home and garden`
              : 'Stylish containers for every space and plant in your collection'}
          </p>
        </div>
        
        {/* Banner */}
        <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-green-100 to-teal-100">
          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:pr-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">Find the Perfect Home for Your Plants</h2>
              <p className="text-gray-600 max-w-lg">
                Discover our collection of beautiful planters and pots to complement your indoor and outdoor plants.
              </p>
            </div>
            <img 
              src="https://res.cloudinary.com/dl16vvgyy/image/upload/v1749118250/rujkt2kuefmncagvkk7g.webp" 
              alt="Planter Collection" 
              className="w-full md:w-1/3 rounded-xl shadow-lg object-cover h-48"
            />
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <>
            {/* Use ProductList component to handle all the filtering and sorting */}
            <ProductList 
              categoryParam={potCategoryId} 
              searchQuery={potType || ""} 
              sortBy="featured"
            />
            
            {/* Pot Type Selector - Show only on main pots page */}
            {!potType && (
              <div className="mt-12 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-4">Browse by Pot Type</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  <Link 
                    to="/pots/ceramic" 
                    className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow text-center"
                  >
                    <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                      <span className="text-green-700 font-bold">C</span>
                    </div>
                    <span className="block text-gray-800">Ceramic</span>
                  </Link>
                  <Link 
                    to="/pots/plastic" 
                    className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow text-center"
                  >
                    <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                      <span className="text-blue-700 font-bold">P</span>
                    </div>
                    <span className="block text-gray-800">Plastic</span>
                  </Link>
                  <Link 
                    to="/pots/terracotta" 
                    className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow text-center"
                  >
                    <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                      <span className="text-orange-700 font-bold">T</span>
                    </div>
                    <span className="block text-gray-800">Terracotta</span>
                  </Link>
                  <Link 
                    to="/pots/metal" 
                    className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow text-center"
                  >
                    <div className="bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                      <span className="text-gray-700 font-bold">M</span>
                    </div>
                    <span className="block text-gray-800">Metal</span>
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Pots;