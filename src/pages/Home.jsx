import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ProductList from "../components/ProductList";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Leaf,
  ShoppingBag,
  Truck,
  MapPin,
} from "lucide-react";

// CSS for smooth marquee animations
const marqueeStyles = `
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-100%); }
  }
  @keyframes marquee-reverse {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(0); }
  }
  .animate-marquee {
    animation: marquee 30s linear infinite;
  }
  .animate-marquee-reverse {
    animation: marquee-reverse 30s linear infinite;
  }
  .animate-marquee:hover, .animate-marquee-reverse:hover {
    animation-play-state: paused;
  }
`;

function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slideInterval = useRef(null);

  // Slideshow images and content
  const heroSlides = [
    {
      image: "https://images.pexels.com/photos/793012/pexels-photo-793012.jpeg",
      title: "Transform Your Space",
      subtitle: "Premium Indoor Plants Collection",
      description:
        "Discover our curated selection of air-purifying plants that bring life to every corner of your home",
      cta: "Explore Collection",
      link: "/indoor-plants",
    },
    {
      image:
        "https://images.pexels.com/photos/1470171/pexels-photo-1470171.jpeg",
      title: "Outdoor Oasis",
      subtitle: "Beautiful Garden Plants",
      description:
        "Create a stunning landscape with our selection of outdoor plants, trees and flowering shrubs",
      cta: "Garden Collection",
      link: "/outdoor-plants",
    },
    {
      image:
        "https://images.pexels.com/photos/1207978/pexels-photo-1207978.jpeg",
      title: "Designer Planters",
      subtitle: "Elevate Your Plant Display",
      description:
        "Complement your greenery with our range of stylish pots and planters for every décor style",
      cta: "View Planters",
      link: "/pots",
    },
  ];

  // Auto-rotate slides
  useEffect(() => {
    slideInterval.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(slideInterval.current);
  }, [heroSlides.length]);

  // Go to previous slide
  const prevSlide = () => {
    setActiveSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );
  };

  // Go to next slide
  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  };

  // Reset interval when manually changing slide
  const handleSlideChange = (index) => {
    setActiveSlide(index);
    clearInterval(slideInterval.current);
    slideInterval.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
  };

  // Features data for marquee
  const features = [
    {
      icon: <Leaf className="w-6 h-6 text-green-600" />,
      title: "Quality Plants",
      description: "Sourced from trusted growers",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-green-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 20h9"></path>
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
        </svg>
      ),
      title: "Expert Advice",
      description: "Personalized plant care guidance",
    },
    {
      icon: <Truck className="w-6 h-6 text-green-600" />,
      title: "Fast Delivery",
      description: "Safe packaging for fresh plants",
    },
    {
      icon: <MapPin className="w-6 h-6 text-green-600" />,
      title: "Multiple Locations",
      description: "उरुळीकांचन and बीड आष्टी",
    },
    {
      icon: <ShoppingBag className="w-6 h-6 text-green-600" />,
      title: "Wide Selection",
      description: "Over 100+ plant varieties",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 text-green-600"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      ),
      title: "Quality Guarantee",
      description: "30-day plant health guarantee",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 text-green-600"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 8v4l3 3"></path>
        </svg>
      ),
      title: "Same Day Dispatch",
      description: "Orders placed before 2pm",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 text-green-600"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      ),
      title: "Customer Love",
      description: "Over 10,000 happy customers",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 text-green-600"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      ),
      title: "Expert Guides",
      description: "Free care guides with every plant",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 text-green-600"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
      ),
      title: "AfterPay Available",
      description: "Buy now, pay later options",
    },
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* Inject marquee styles */}
      <style>{marqueeStyles}</style>
      {/* Hero Slideshow */}
      <div className="relative overflow-hidden bg-gray-900 h-[500px] md:h-[600px]">
        <AnimatePresence initial={false}>
          {heroSlides.map(
            (slide, index) =>
              activeSlide === index && (
                <motion.div
                  key={slide.title}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <div className="absolute inset-0 bg-black/40 z-10"></div>
                  <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${slide.image})` }}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 7 }}
                  ></motion.div>
                  <div className="absolute inset-0 z-20 flex items-center">
                    <div className="container mx-auto px-4">
                      <motion.div
                        className="max-w-lg text-white"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                      >
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.5, duration: 0.8 }}
                        >
                          <span className="inline-block px-4 py-1 bg-green-600/80 rounded-full text-sm font-medium mb-4">
                            {slide.subtitle}
                          </span>
                        </motion.div>
                        <motion.h1
                          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.7, duration: 0.8 }}
                        >
                          {slide.title}
                        </motion.h1>
                        <motion.p
                          className="text-lg md:text-xl text-gray-200 mb-8"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.9, duration: 0.8 }}
                        >
                          {slide.description}
                        </motion.p>
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 1.1, duration: 0.8 }}
                        >
                          <Link
                            to={slide.link}
                            className="inline-block bg-white text-green-700 px-6 py-3 rounded-lg font-medium hover:bg-green-50 transition-colors"
                          >
                            {slide.cta}
                          </Link>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ),
          )}
        </AnimatePresence>

        {/* Slide Controls */}
        <div className="absolute z-30 flex items-center justify-between w-full top-1/2 transform -translate-y-1/2 px-4">
          <button
            onClick={prevSlide}
            className="bg-white/20 backdrop-blur-sm hover:bg-white/40 p-2 rounded-full text-white transition-colors focus:outline-none"
            aria-label="Previous slide"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="bg-white/20 backdrop-blur-sm hover:bg-white/40 p-2 rounded-full text-white transition-colors focus:outline-none"
            aria-label="Next slide"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute z-30 flex space-x-2 bottom-8 left-1/2 transform -translate-x-1/2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                activeSlide === index
                  ? "bg-white"
                  : "bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Plant Categories */}
      <section className="container mx-auto px-4">
        <motion.div
          className="mb-12 text-center"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Shop By Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our wide selection of plants and accessories for your home
            and garden
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {/* Category 1: Indoor Plants */}
          <motion.div
            className="relative overflow-hidden rounded-xl group cursor-pointer"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onClick={() => (window.location.href = "/indoor-plants")}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
            <img
              src="https://images.pexels.com/photos/3076899/pexels-photo-3076899.jpeg"
              alt="Indoor Plants"
              className="w-full h-48 sm:h-60 md:h-80 object-cover object-center transition-transform group-hover:scale-105 duration-700"
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 z-20">
              <h3 className="text-white text-base sm:text-lg md:text-2xl font-bold mb-1 md:mb-2">
                Indoor Plants
              </h3>
              <span className="inline-flex items-center text-white text-sm md:text-base hover:text-green-300 transition-colors">
                Shop Now
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 ml-1 md:ml-2 group-hover:translate-x-1 transition-transform"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
            <Link
              to="/indoor-plants"
              className="absolute inset-0 z-30"
              aria-label="Shop Indoor Plants"
            ></Link>
          </motion.div>

          {/* Category 2: Outdoor Plants */}
          <motion.div
            className="relative overflow-hidden rounded-xl group cursor-pointer"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={() => (window.location.href = "/outdoor-plants")}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
            <img
              src="https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg"
              alt="Outdoor Plants"
              className="w-full h-48 sm:h-60 md:h-80 object-cover object-center transition-transform group-hover:scale-105 duration-700"
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 z-20">
              <h3 className="text-white text-base sm:text-lg md:text-2xl font-bold mb-1 md:mb-2">
                Outdoor Plants
              </h3>
              <span className="inline-flex items-center text-white text-sm md:text-base hover:text-green-300 transition-colors">
                Shop Now
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 ml-1 md:ml-2 group-hover:translate-x-1 transition-transform"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
            <Link
              to="/outdoor-plants"
              className="absolute inset-0 z-30"
              aria-label="Shop Outdoor Plants"
            ></Link>
          </motion.div>

          {/* Category 3: Planters & Pots */}
          <motion.div
            className="relative overflow-hidden rounded-xl group cursor-pointer"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={() => (window.location.href = "/products?type=pots")}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
            <img
              src="https://images.pexels.com/photos/1084188/pexels-photo-1084188.jpeg"
              alt="Planters & Pots"
              className="w-full h-48 sm:h-60 md:h-80 object-cover object-center transition-transform group-hover:scale-105 duration-700"
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 z-20">
              <h3 className="text-white text-base sm:text-lg md:text-2xl font-bold mb-1 md:mb-2">
                Planters & Pots
              </h3>
              <span className="inline-flex items-center text-white text-sm md:text-base hover:text-green-300 transition-colors">
                Shop Now
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 ml-1 md:ml-2 group-hover:translate-x-1 transition-transform"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
            <Link
              to="/products?type=pots"
              className="absolute inset-0 z-30"
              aria-label="Shop Planters & Pots"
            ></Link>
          </motion.div>

          {/* Category 4: Gardening Tools */}
          <motion.div
            className="relative overflow-hidden rounded-xl group cursor-pointer"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onClick={() => (window.location.href = "/tools")}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
            <img
              src="https://images.pexels.com/photos/2132230/pexels-photo-2132230.jpeg"
              alt="Gardening Tools"
              className="w-full h-48 sm:h-60 md:h-80 object-cover object-center transition-transform group-hover:scale-105 duration-700"
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 z-20">
              <h3 className="text-white text-base sm:text-lg md:text-2xl font-bold mb-1 md:mb-2">
                Gardening Tools
              </h3>
              <span className="inline-flex items-center text-white text-sm md:text-base hover:text-green-300 transition-colors">
                Shop Now
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 ml-1 md:ml-2 group-hover:translate-x-1 transition-transform"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
            <Link
              to="/tools"
              className="absolute inset-0 z-30"
              aria-label="Shop Gardening Tools"
            ></Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="mb-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Featured Plants</h2>
            <div className="h-1 w-32 bg-green-600 rounded-full mb-8"></div>
          </motion.div>

          <ProductList sortBy="popularity" />
        </div>
      </section>

      {/* Why Choose Hindavi Nursery - Marquee */}
      <section className="bg-green-50 py-12 overflow-hidden">
        <div className="container mx-auto px-4 mb-8">
          <div className="text-center mb-6">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Why Choose Hindavi Nursery
            </motion.h2>
          </div>
        </div>

        <div className="relative">
          {/* First row of scrolling items */}
          <div className="flex animate-marquee whitespace-nowrap">
            {features.map((feature, index) => (
              <motion.div
                key={`row-1-${index}`}
                className="flex items-center mx-4 bg-white px-6 py-4 rounded-xl shadow-sm"
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  {feature.icon}
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-bold">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
            {/* Duplicate features for seamless scrolling */}
            {features.map((feature, index) => (
              <motion.div
                key={`row-1-duplicate-${index}`}
                className="flex items-center mx-4 bg-white px-6 py-4 rounded-xl shadow-sm"
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  {feature.icon}
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-bold">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Second row of scrolling items (opposite direction) */}
          <div className="flex animate-marquee-reverse whitespace-nowrap mt-6">
            {features.map((feature, index) => (
              <motion.div
                key={`row-2-${index}`}
                className="flex items-center mx-4 bg-white px-6 py-4 rounded-xl shadow-sm"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  {feature.icon}
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-bold">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
            {/* Duplicate features for seamless scrolling */}
            {features.map((feature, index) => (
              <motion.div
                key={`row-2-duplicate-${index}`}
                className="flex items-center mx-4 bg-white px-6 py-4 rounded-xl shadow-sm"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  {feature.icon}
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-bold">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-8">
        <motion.div
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-700 to-emerald-600"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute top-0 left-0 w-full h-full">
            <svg
              viewBox="0 0 600 600"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-10"
            >
              <path
                d="M361.5,205.5Q323,411,154.5,302.5Q-14,194,153.5,122.5Q321,51,361.5,205.5Z"
                fill="#ffffff"
              ></path>
            </svg>
          </div>
          <div className="relative z-10 py-16 px-8 md:px-16 text-center md:text-left md:flex md:items-center md:justify-between">
            <div className="mb-8 md:mb-0 md:mr-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Start Your Plant Journey?
              </h2>
              <p className="text-green-50 md:text-lg max-w-xl">
                Join thousands of happy plant parents and transform your space
                today with our healthy, beautiful plants.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link
                to="/products"
                className="bg-white text-green-700 hover:text-green-800 hover:bg-gray-100 transition-colors px-8 py-3 rounded-lg font-medium shadow-lg"
              >
                Shop Now
              </Link>
              <Link
                to="/about"
                className="border border-white text-white hover:bg-white/10 transition-colors px-8 py-3 rounded-lg font-medium"
              >
                Learn More
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default Home;
