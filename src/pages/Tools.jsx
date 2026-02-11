import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList';

function Tools() {
  const [toolsCategoryId, setToolsCategoryId] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Find the Tools category ID
  useEffect(() => {
    const fetchToolsCategory = async () => {
      try {
        setLoading(true);
        
        // Fetch categories to find the Tools category
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`);
        const categories = response.data;
        
        // Look for Tools category or anything with Utensils type
        const toolsCategory = categories.find(category => 
          category.name.toLowerCase() === 'tools' || 
          category.name.toLowerCase().includes('tool') ||
          category.type === 'Utensils'
        );
        
        if (toolsCategory) {
          setToolsCategoryId(toolsCategory.id);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchToolsCategory();
  }, []);

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Gardening Tools</h1>
          <p className="text-gray-600 mt-2 text-lg">
            Quality tools for every gardener - from beginners to experts
          </p>
        </div>
        
        {/* Banner */}
        <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-blue-100 to-indigo-100">
          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:pr-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">The Right Tools Make All the Difference</h2>
              <p className="text-gray-600 max-w-lg">
                Discover our collection of durable and ergonomic gardening tools designed 
                to make your gardening tasks easier and more enjoyable.
              </p>
            </div>
            <img 
              src="https://res.cloudinary.com/dl16vvgyy/image/upload/v1749117279/meomwqdamv4wf8sdsu1o.webp" 
              alt="Gardening Tools Collection" 
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
              categoryParam={toolsCategoryId} 
              searchQuery="tool" 
              sortBy="featured"
            />
            
            {/* Tool Categories */}
            <div className="mt-12 bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-6">Essential Gardening Tool Categories</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-5 rounded-lg shadow-sm text-center">
                  <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-700" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-5.5-6a.5.5 0 00.5.5h10a.5.5 0 000-1H5a.5.5 0 00-.5.5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-lg mb-2">Digging Tools</h4>
                  <p className="text-gray-600 text-sm">
                    Spades, shovels, and forks for soil preparation and planting
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow-sm text-center">
                  <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-700" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-lg mb-2">Pruning Tools</h4>
                  <p className="text-gray-600 text-sm">
                    Secateurs, shears, and loppers for plant maintenance
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow-sm text-center">
                  <div className="bg-yellow-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-700" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5.05a2.5 2.5 0 014.9 0H17a1 1 0 001-1V5a1 1 0 00-1-1H3z" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-lg mb-2">Watering Tools</h4>
                  <p className="text-gray-600 text-sm">
                    Watering cans, hoses, sprinklers, and irrigation systems
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow-sm text-center">
                  <div className="bg-red-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-700" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-lg mb-2">Hand Tools</h4>
                  <p className="text-gray-600 text-sm">
                    Trowels, hand forks, weeders, and cultivators for detailed work
                  </p>
                </div>
              </div>
            </div>
            
            {/* Gardening Tips */}
            <div className="mt-8 p-6 bg-green-50 rounded-lg">
              <h3 className="text-xl font-medium mb-4">Tool Maintenance Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium text-lg mb-2">Keep Tools Clean</h4>
                  <p className="text-gray-600">
                    After each use, remove dirt and debris from your tools. For metal parts, 
                    use a wire brush or hose them down. Dry thoroughly to prevent rust.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium text-lg mb-2">Sharpen Regularly</h4>
                  <p className="text-gray-600">
                    Keep cutting tools sharp for efficient use. Use a file, whetstone, or 
                    take them to a professional sharpening service annually.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium text-lg mb-2">Oil Metal Parts</h4>
                  <p className="text-gray-600">
                    Apply linseed oil to wooden handles to prevent splinters and cracking. 
                    Use machine oil on metal parts to prevent rust and maintain smooth operation.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium text-lg mb-2">Proper Storage</h4>
                  <p className="text-gray-600">
                    Store tools in a dry place. Hang larger tools on the wall and keep smaller 
                    ones in a bucket filled with sand mixed with oil to prevent rust.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Tools;