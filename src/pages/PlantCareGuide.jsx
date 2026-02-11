import { useParams, Link } from 'react-router-dom';

const guideData = {
  'indoor-plant-care-101': {
    title: 'Indoor Plant Care 101',
    description: 'Master the basics of keeping your indoor plants healthy and THRIVING',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&h=800&fit=crop',
    readTime: '5 min read',
    content: [
      {
        heading: 'Introduction to Indoor Plant Care',
        text: 'Indoor plants not only enhance the aesthetic appeal of your home but also improve air quality and boost your mood. However, keeping them healthy requires understanding their basic needs. This guide covers the essentials of indoor plant care, ensuring your green friends thrive in any space.',
      },
      {
        heading: 'Light: The Key to Growth',
        text: 'Light is the most critical factor for indoor plants. Most houseplants prefer bright, indirect light, but requirements vary. For example, succulents thrive in direct sunlight, while ferns prefer shadier spots. Observe your plant’s leaves—yellowing may indicate too much light, while leggy growth suggests too little. Place plants near east or west-facing windows for optimal light exposure.',
      },
      {
        heading: 'Watering: Finding the Balance',
        text: 'Overwatering is the leading cause of houseplant death. Check the soil’s moisture level before watering—stick your finger an inch into the soil; if it’s dry, it’s time to water. Use pots with drainage holes to prevent root rot, and always empty excess water from saucers. Adjust watering frequency based on the season—less in winter, more in summer.',
      },
      {
        heading: 'Humidity and Temperature',
        text: 'Most indoor plants originate from tropical environments and thrive in 40-60% humidity. If your home is dry, especially in winter, consider using a humidifier or placing a tray of water near your plants. Maintain temperatures between 18-24°C (65-75°F) and avoid placing plants near drafts or heating vents.',
      },
      {
        heading: 'Soil and Fertilizing',
        text: 'Use well-draining potting mix tailored to your plant’s needs—cacti need sandy soil, while tropical plants prefer a peat-based mix. Fertilize during the growing season (spring and summer) with a balanced, water-soluble fertilizer every 4-6 weeks. Avoid over-fertilizing, as it can burn roots and damage your plant.',
      },
      {
        heading: 'Common Issues and Solutions',
        text: 'Watch for signs of distress: yellow leaves (overwatering or poor drainage), brown tips (low humidity or over-fertilizing), or pests like spider mites. Regularly inspect your plants, clean their leaves, and prune dead foliage to encourage healthy growth. If pests appear, use neem oil or insecticidal soap for treatment.',
      },
      {
        heading: 'Top Tips for Success',
        text: [
          'Rotate plants every few weeks for even light exposure.',
          'Group plants together to create a microclimate with higher humidity.',
          'Research your plant’s specific needs—each species is unique!',
          'Be patient; plants grow slowly and need time to adjust to new environments.',
        ],
      },
    ],
  },
  // Add other guides here for dynamic routing
};

function PlantCareGuide() {
  const { guideId } = useParams();
  const guide = guideData[guideId] || guideData['indoor-plant-care-101'];

  return (
    <div className="bg-gray-50 overflow-hidden">
      {/* Hero Section */}
      <div className="relative">
        <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
          <img
            src={guide.image}
            alt={guide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl text-white">
                <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                  {guide.readTime}
                </span>
                <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                  {guide.title}
                </h1>
                <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
                  {guide.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guide Content Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {guide.content.map((section, index) => (
              <div key={index} className="mb-12">
                {section.heading && (
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {section.heading}
                  </h2>
                )}
                {typeof section.text === 'string' ? (
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {section.text}
                  </p>
                ) : (
                  <ul className="list-disc pl-6 text-gray-600 leading-relaxed text-lg">
                    {section.text.map((item, i) => (
                      <li key={i} className="mb-2">{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Grow Your Green Oasis?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Explore our premium collection of indoor plants and start your plant care journey today!
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-full hover:from-emerald-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Shop Now
            <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Stay Green with Our Newsletter
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              Get more plant care tips, exclusive offers, and updates on new arrivals.
            </p>
            <div className="flex flex-col sm:flex-row max-w-lg mx-auto gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30"
              />
              <button className="px-8 py-4 bg-white text-emerald-600 font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300">
                Subscribe
              </button>
            </div>
            <p className="text-emerald-200 text-sm mt-4">
              Join 25,000+ plant lovers. No spam, just green goodness.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlantCareGuide;