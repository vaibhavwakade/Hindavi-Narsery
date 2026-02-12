import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductList from "../components/ProductList";

function Seeds() {
  const [seedCategoryId, setSeedCategoryId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Find the Seeds category ID
  useEffect(() => {
    const fetchSeedCategory = async () => {
      try {
        setLoading(true);

        // Fetch categories to find the Seeds category
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/categories`,
        );
        const categories = response.data;

        // Look for Seeds category
        const seedsCategory = categories.find(
          (category) =>
            category.name === "seeds" ||
            category.name.toLowerCase() === "seeds",
        );

        if (seedsCategory) {
          setSeedCategoryId(seedsCategory.id);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeedCategory();
  }, []);

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Organic Seeds
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Premium quality seeds for your garden - grow your own vegetables,
            fruits, and flowers
          </p>
        </div>

        {/* Banner */}
        <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-orange-100 to-amber-100">
          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:pr-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                Grow Your Own Food
              </h2>
              <p className="text-gray-600 max-w-lg">
                Start your sustainable garden journey with our collection of
                organic, non-GMO seeds that ensure healthy plants and bountiful
                harvests.
              </p>
            </div>
            <img
              src="https://res.cloudinary.com/dl16vvgyy/image/upload/v1749119498/r7ebov3jmtgiaczqlnww.webp"
              alt="Seeds Collection"
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
              categoryParam={seedCategoryId}
              searchQuery="seed"
              sortBy="featured"
            />

            {/* Seed Type Information */}
            <div className="mt-12 bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-4">
                Types of Seeds We Offer
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium text-lg mb-2">Vegetable Seeds</h4>
                  <p className="text-gray-600">
                    Start your own vegetable garden with our selection of
                    high-quality vegetable seeds. From tomatoes and peppers to
                    leafy greens, we have everything you need for a bountiful
                    harvest.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium text-lg mb-2">Flower Seeds</h4>
                  <p className="text-gray-600">
                    Add color to your garden with our beautiful flower seeds.
                    Choose from annuals, perennials, and biennial varieties to
                    create stunning flower beds and arrangements.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium text-lg mb-2">Herb Seeds</h4>
                  <p className="text-gray-600">
                    Grow your own culinary herbs with our herb seed collection.
                    Fresh herbs are just steps away from your kitchen when you
                    grow them on your windowsill or garden.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium text-lg mb-2">Microgreen Seeds</h4>
                  <p className="text-gray-600">
                    Perfect for indoor growing, our microgreen seeds are
                    nutrient-packed and ready to harvest in just a few weeks.
                    Great for adding fresh flavor to your meals year-round.
                  </p>
                </div>
              </div>
            </div>

            {/* Seed Growing Guide */}
            <div className="mt-8 p-6 bg-green-50 rounded-lg">
              <h3 className="text-xl font-medium mb-4">
                Quick Seed Growing Guide
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mb-3 shadow-sm">
                    <span className="text-green-700 font-bold">1</span>
                  </div>
                  <h4 className="font-medium mb-1">Prepare</h4>
                  <p className="text-sm text-gray-600">
                    Choose the right soil and container for your seeds
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mb-3 shadow-sm">
                    <span className="text-green-700 font-bold">2</span>
                  </div>
                  <h4 className="font-medium mb-1">Plant</h4>
                  <p className="text-sm text-gray-600">
                    Follow package instructions for planting depth
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mb-3 shadow-sm">
                    <span className="text-green-700 font-bold">3</span>
                  </div>
                  <h4 className="font-medium mb-1">Water</h4>
                  <p className="text-sm text-gray-600">
                    Keep soil moist but not soggy
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mb-3 shadow-sm">
                    <span className="text-green-700 font-bold">4</span>
                  </div>
                  <h4 className="font-medium mb-1">Care</h4>
                  <p className="text-sm text-gray-600">
                    Provide adequate light and temperature
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

export default Seeds;
