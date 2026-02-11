import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductList from '../components/ProductList';

function OutdoorPlants() {
  const [searchParams] = useSearchParams();
  const plantType = searchParams.get('type')?.toLowerCase().trim() || null; // Normalize plantType
  const [outdoorPlantCategoryId, setOutdoorPlantCategoryId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the Outdoor Plants category ID
  useEffect(() => {
    const fetchOutdoorPlantCategory = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`);
        const categories = response.data || [];

        // Look for Outdoor category with case-insensitive matching
        const outdoorPlantsCategory = categories.find(category => 
          category.name.toLowerCase().includes('outdoor') || 
          category.type.toLowerCase().includes('outdoor')
        );

        if (outdoorPlantsCategory) {
          setOutdoorPlantCategoryId(outdoorPlantsCategory.id);
        } else {
          console.warn('No Outdoor category found');
          setError('Could not load outdoor plants category. Displaying all available plants.');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to load outdoor plants category. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOutdoorPlantCategory();
  }, []);

  // Generate page title based on plant type
  const getPageTitle = () => {
    if (!plantType) return "Outdoor Plants";
    const formattedType = plantType.charAt(0).toUpperCase() + plantType.slice(1);
    return `${formattedType} Plants`;
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{getPageTitle()}</h1>
          <p className="text-gray-600 mt-2 text-lg">
            {plantType 
              ? `Explore our collection of beautiful ${plantType} plants for your garden`
              : 'Transform your outdoor space with our collection of beautiful garden plants'
            }
          </p>
        </div>

        {/* Banner */}
        <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-green-100 to-emerald-100">
          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:pr-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                {plantType ? `Discover Our ${plantType.charAt(0).toUpperCase() + plantType.slice(1)} Plants` : 'Transform Your Garden'}
              </h2>
              <p className="text-gray-600 max-w-lg">
                {plantType === 'fruit' 
                  ? 'Our collection of fruit trees will bring both beauty and bounty to your garden. Enjoy the satisfaction of growing your own delicious fruits.'
                  : plantType === 'palm' 
                  ? 'Add a tropical touch to your landscape with our selection of palm trees. Perfect for creating a relaxing outdoor oasis.'
                  : plantType === 'flowering' 
                  ? 'Bring color and fragrance to your garden with our flowering plants. Attract butterflies and hummingbirds to create a vibrant ecosystem.'
                  : 'Our outdoor plants are carefully selected for their beauty, resilience, and ease of care. Transform your garden into a thriving outdoor sanctuary.'}
              </p>
            </div>
            <img 
              src={plantType === 'fruit' 
                ? "https://images.unsplash.com/photo-1550828520-4cb496926fc9"
                : plantType === 'palm'
                ? "https://images.unsplash.com/photo-1515514257461-bc194198c71e"
                : plantType === 'flowering'
                ? "https://images.unsplash.com/photo-1464982326199-86f32f81b211"
                : "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae"
              }
              alt={plantType ? `${plantType.charAt(0).toUpperCase() + plantType.slice(1)} Plants Collection` : "Outdoor Plants Collection"}
              className="w-full md:w-1/3 rounded-xl shadow-lg object-cover h-48"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="bg-red-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M12 3a9 9 0 100 18 9 9 0 000-18z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Error</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <ProductList 
              categoryParam={outdoorPlantCategoryId} 
              searchQuery={plantType || ''} // Pass clean plantType or empty string
              sortBy="featured"
            />

            {/* Plant Care Tips */}
            <div className="mt-12 bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-4">
                {plantType ? `${plantType.charAt(0).toUpperCase() + plantType.slice(1)} Plant Care Tips` : 'Outdoor Plant Care Tips'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium text-lg mb-2">Watering Guide</h4>
                  <p className="text-gray-600">
                    {plantType === 'fruit' 
                      ? 'Fruit trees generally need regular, deep watering, especially during dry spells and fruit development. Young trees need more frequent watering than established ones.'
                      : plantType === 'palm'
                      ? 'Palm trees prefer deep, infrequent watering. Allow the top few inches of soil to dry out between waterings. Increase frequency during hot summer months.'
                      : plantType === 'flowering'
                      ? 'Most flowering plants need consistent moisture. Water when the top inch of soil feels dry, being careful not to wet the flowers and foliage which can lead to fungal issues.'
                      : 'Outdoor plants generally need more water than indoor varieties, especially during hot weather. Water deeply and less frequently to encourage stronger root growth.'}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium text-lg mb-2">Soil & Fertilizing</h4>
                  <p className="text-gray-600">
                    {plantType === 'fruit' 
                      ? 'Fruit trees thrive in well-drained, loamy soil rich in organic matter. Feed with balanced fertilizer in early spring and again after fruit set. Avoid over-fertilizing which reduces fruit production.'
                      : plantType === 'palm'
                      ? 'Palms prefer sandy, well-draining soil. Use a palm-specific fertilizer with micronutrients 2-3 times per year to prevent deficiencies that cause yellowing fronds.'
                      : plantType === 'flowering'
                      ? 'Use rich, well-draining soil with plenty of organic matter. Apply a phosphorus-rich fertilizer to encourage blooming. Many flowering plants benefit from compost tea applications.'
                      : 'Most outdoor plants benefit from soil enriched with compost. Apply a slow-release fertilizer in spring, and supplement with liquid fertilizer during the growing season as needed.'}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium text-lg mb-2">Seasonal Care</h4>
                  <p className="text-gray-600">
                    {plantType === 'fruit' 
                      ? 'Prune fruit trees during dormancy (winter). Protect young trees from frost with burlap wraps. Thin fruits in early summer to improve size and quality. Harvest when ripe but firm.'
                      : plantType === 'palm'
                      ? 'Palms need less care in winter. Remove only brown, dead fronds. Provide wind protection for young palms. In colder regions, wrap the trunk with burlap and mulch heavily around the base.'
                      : plantType === 'flowering'
                      ? 'Deadhead spent blooms to encourage more flowers. Cut back perennials in late fall. Apply winter mulch after the ground freezes. Divide overcrowded plants in early spring or fall.'
                      : 'Prepare plants for winter by reducing watering in fall. Mulch around plants to insulate roots. Prune only as appropriate for the specific plant variety. Consider winter protection for tender varieties.'}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium text-lg mb-2">Common Issues</h4>
                  <p className="text-gray-600">
                    {plantType === 'fruit' 
                      ? 'Watch for pest issues like aphids, fruit flies, and codling moths. Diseases include powdery mildew, fire blight, and various rots. Early detection and treatment are essential for a healthy harvest.'
                      : plantType === 'palm'
                      ? 'Yellowing fronds often indicate nutrient deficiencies. Spider mites and scale insects can be problematic. Avoid overwatering which leads to root rot, a common cause of palm decline.'
                      : plantType === 'flowering'
                      ? 'Common pests include aphids, whiteflies, and Japanese beetles. Fungal issues like powdery mildew and black spot can affect many flowering plants, especially in humid conditions.'
                      : 'Check regularly for signs of pests and diseases. Many issues can be prevented with proper spacing, air circulation, and avoiding overhead watering. Use organic pest control methods whenever possible.'}
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

export default OutdoorPlants;