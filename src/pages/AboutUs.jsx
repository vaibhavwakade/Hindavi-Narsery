// import React from 'react';
// // Import the logo image
// import logo from '../assets/images/hindavi_nursery.png';

// function AboutUs() {
//   const milestones = [
//     {
//       year: '2015',
//       title: 'The Green Dream Begins',
//       description: 'Started with a simple mission: make premium plants accessible to every Indian home',
//     },
//     {
//       year: '2018',
//       title: 'National Expansion',
//       description: 'Expanded to 15 cities with our specialized plant delivery network',
//     },
//     {
//       year: '2020',
//       title: 'Digital Innovation',
//       description: 'Launched virtual plant consultations and AI-powered care recommendations',
//     },
//     {
//       year: '2023',
//       title: 'Sustainability Focus',
//       description: 'Introduced eco-friendly packaging and carbon-neutral delivery options',
//     },
//   ];

//   const values = [
//     {
//       icon: (
//         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//         </svg>
//       ),
//       title: 'Passion for Plants',
//       description: 'Every plant is selected with love and expertise, ensuring only the healthiest specimens reach your home.',
//       color: 'from-rose-400 to-pink-600',
//     },
//     {
//       icon: (
//         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       ),
//       title: 'Quality Promise',
//       description: 'We maintain the highest standards from nursery to doorstep, backed by our 30-day plant warranty.',
//       color: 'from-emerald-400 to-teal-600',
//     },
//     {
//       icon: (
//         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
//         </svg>
//       ),
//       title: 'Sustainability First',
//       description: 'Committed to eco-friendly practices, from biodegradable packaging to supporting local growers.',
//       color: 'from-green-400 to-emerald-600',
//     },
//     {
//       icon: (
//         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//         </svg>
//       ),
//       title: 'Community Growth',
//       description: 'Building a thriving community of plant lovers through education, support, and shared experiences.',
//       color: 'from-purple-400 to-indigo-600',
//     },
//   ];

//   const stats = [
//     { number: '500K+', label: 'Happy Plant Parents', icon: '🌱' },
//     { number: '50+', label: 'Cities Served', icon: '🏙️' },
//     { number: '10M+', label: 'Plants Delivered', icon: '🚚' },
//     { number: '98%', label: 'Customer Satisfaction', icon: '⭐' },
//   ];

//   return (
//     <div className="bg-gray-50 overflow-hidden">
//       {/* Hero Section */}
//       <div className="relative">
//         <div className="relative h-[500px] lg:h-[600px]">
//           <img
//             src="https://media.istockphoto.com/id/482987325/photo/patio.jpg?s=612x612&w=0&k=20&c=9O4GNPGOz_Pqttc_n4BwEyE0iAUBf2h0jrtVYG4izuY="
//             alt="Lush green plants in modern interior"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
//           <div className="absolute inset-0 flex items-center">
//             <div className="container mx-auto px-4">
//               <div className="max-w-3xl text-white">
//                 {/* Added company logo */}
//                 <div className="flex items-center mb-8">
//                   <img 
//                     src={logo} 
//                     alt="Hindavi Nursery Logo" 
//                     className="h-24 w-80 object-contain bg-white/70 rounded-full p-2"
//                   />
//                 </div>
//                 <span className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
//                   Our Story
//                 </span>
//                 <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
//                   Growing Dreams,
//                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400"> One Plant at a Time</span>
//                 </h1>
//                 <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
//                   From a small nursery to India's most trusted plant destination, our journey has been rooted in passion, quality, and the belief that every space deserves the magic of green life.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mission Statement */}
//       <div className="py-20 bg-white">
//         <div className="container mx-auto px-4">
//           <div className="max-w-6xl mx-auto">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//               <div>
//                 <span className="inline-block px-6 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold mb-6">
//                   Our Mission
//                 </span>
//                 <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
//                   Bringing Nature Home to Every Indian Family
//                 </h2>
//                 <p className="text-xl text-gray-600 leading-relaxed mb-8">
//                   We believe that everyone deserves to experience the joy, peace, and vitality that plants bring to our lives. Our mission is to make premium-quality plants accessible, affordable, and easy to care for, transforming houses into homes and offices into sanctuaries.
//                 </p>
//                 <div className="space-y-4">
//                   <div className="flex items-center space-x-4">
//                     <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
//                     <span className="text-gray-700">Democratizing access to premium plants across India</span>
//                   </div>
//                   <div className="flex items-center space-x-4">
//                     <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
//                     <span className="text-gray-700">Educating and empowering plant parents</span>
//                   </div>
//                   <div className="flex items-center space-x-4">
//                     <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
//                     <span className="text-gray-700">Promoting sustainable and eco-friendly practices</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="relative">
//                 <img
//                   src="https://cdn.shopify.com/s/files/1/0632/2526/6422/files/IMG_4320.jpg?v=1728717196&width=1728"
//                   alt="Beautiful indoor plants arrangement"
//                   className="rounded-2xl shadow-2xl"
//                 />
//                 {/* Added logo overlay */}
//                 <div className="absolute bottom-4 right-4">
//                   <img 
//                     src={logo} 
//                     alt="Hindavi Nursery Logo" 
//                     className="h-16 w-60 object-contain bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-lg"
//                   />
//                 </div>
//                 <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl opacity-20"></div>
//                 <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-teal-400 to-emerald-600 rounded-2xl opacity-20"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
//               Growing Together
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Numbers that reflect our commitment to bringing green joy to millions of homes across India
//             </p>
//           </div>
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
//             {stats.map((stat, index) => (
//               <div key={index} className="text-center group">
//                 <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
//                   <div className="text-4xl mb-4">{stat.icon}</div>
//                   <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
//                   <div className="text-gray-600 font-medium">{stat.label}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Journey Timeline */}
//       <div className="py-20 bg-white">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
//               Our Growth Journey
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               From humble beginnings to becoming India's most trusted plant destination
//             </p>
//           </div>
//           <div className="max-w-4xl mx-auto">
//             <div className="relative">
//               <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-400 to-teal-600"></div>
//               <div className="space-y-12">
//                 {milestones.map((milestone, index) => (
//                   <div key={index} className="relative flex items-start">
//                     <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
//                       {milestone.year.slice(-2)}
//                     </div>
//                     <div className="ml-8 flex-1">
//                       <div className="bg-gray-50 rounded-2xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300">
//                         <div className="text-emerald-600 font-semibold text-sm mb-2">{milestone.year}</div>
//                         <h3 className="text-xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
//                         <p className="text-gray-600">{milestone.description}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Values Section */}
//       <div className="py-20 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
//               Our Core Values
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               The principles that guide everything we do and shape our commitment to you
//             </p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {values.map((value, index) => (
//               <div key={index} className="group">
//                 <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
//                   <div className="flex items-start space-x-6">
//                     <div className="flex-shrink-0">
//                       <div className={`w-14 h-14 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
//                         {value.icon}
//                       </div>
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
//                       <p className="text-gray-600 leading-relaxed">{value.description}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Sustainability Section */}
//       <div className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
//         <div className="container mx-auto px-4">
//           <div className="max-w-6xl mx-auto">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//               <div className="relative">
//                 <img
//                   src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=500&fit=crop"
//                   alt="Sustainable plant packaging and eco-friendly practices"
//                   className="rounded-2xl shadow-2xl"
//                 />
//                 {/* Added logo overlay */}
//                 <div className="absolute top-4 left-4">
//                   <img 
//                     src={logo} 
//                     alt="Hindavi Nursery Logo" 
//                     className="h-16 w-auto object-contain bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-lg"
//                   />
//                 </div>
//                 <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl opacity-20"></div>
//               </div>
//               <div>
//                 <span className="inline-block px-6 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-6">
//                   Sustainability Commitment
//                 </span>
//                 <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
//                   Growing Responsibly for Future Generations
//                 </h2>
//                 <p className="text-xl text-gray-600 leading-relaxed mb-8">
//                   Our commitment to the environment goes beyond just selling plants. We're building a sustainable future through eco-friendly practices, supporting local communities, and reducing our carbon footprint at every step.
//                 </p>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                   <div className="flex items-start space-x-4">
//                     <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
//                       <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-gray-900 mb-1">Carbon-Neutral Delivery</h4>
//                       <p className="text-gray-600 text-sm">Offsetting emissions from all deliveries</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start space-x-4">
//                     <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
//                       <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-gray-900 mb-1">Biodegradable Packaging</h4>
//                       <p className="text-gray-600 text-sm">100% eco-friendly materials</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start space-x-4">
//                     <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
//                       <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-gray-900 mb-1">Local Sourcing</h4>
//                       <p className="text-gray-600 text-sm">Supporting regional growers</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start space-x-4">
//                     <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
//                       <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-gray-900 mb-1">Zero Waste Goal</h4>
//                       <p className="text-gray-600 text-sm">Recycling and reuse programs</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
//         <div className="container mx-auto px-4">
//           <div className="max-w-4xl mx-auto text-center">
//             {/* Added logo at the top of CTA */}
//             <div className="flex justify-center mb-6">
//               <img 
//                 src={logo} 
//                 alt="Hindavi Nursery Logo" 
//                 className="h-20 w-auto object-contain bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg"
//               />
//             </div>
//             <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
//               Ready to Start Your Plant Journey?
//             </h2>
//             <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
//               Join our community of passionate plant parents and transform your space into a green paradise. 
//               Experience the Hindavi Nursery difference today.
//             </p>
//             <div className="flex flex-col sm:flex-row justify-center gap-6">
//               <button className="px-8 py-4 bg-white text-emerald-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
//                 Shop Our Collections
//               </button>
//               <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
//                 Contact Our Experts
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AboutUs;
import React, { useEffect, useState } from 'react';
// Import the logo image
import logo from '../assets/images/hindavi_nursery.png';
// Import additional images

import imageAbout1 from '../assets/images_about/image_about_1.jpg';
import imageAbout2 from '../assets/images_about/image_about_2.jpg';
import imageAbout3 from '../assets/images_about/image_about_3.jpg';
import imageAbout4 from '../assets/images_about/image_about_4.jpg';
import imageAbout5 from '../assets/images_about/image_about_5.jpg';


function AboutUs() {
  const milestones = [
    {
      year: '2015',
      title: 'The Green Dream Begins',
      description: 'Started with a simple mission: make premium plants accessible to every Indian home',
    },
    {
      year: '2018',
      title: 'National Expansion',
      description: 'Expanded to 15 cities with our specialized plant delivery network',
    },
    {
      year: '2020',
      title: 'Digital Innovation',
      description: 'Launched virtual plant consultations and AI-powered care recommendations',
    },
    {
      year: '2023',
      title: 'Sustainability Focus',
      description: 'Introduced eco-friendly packaging and carbon-neutral delivery options',
    },
  ];

  const values = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: 'Passion for Plants',
      description: 'Every plant is selected with love and expertise, ensuring only the healthiest specimens reach your home.',
      color: 'from-rose-400 to-pink-600',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Quality Promise',
      description: 'We maintain the highest standards from nursery to doorstep, backed by our 30-day plant warranty.',
      color: 'from-emerald-400 to-teal-600',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: 'Sustainability First',
      description: 'Committed to eco-friendly practices, from biodegradable packaging to supporting local growers.',
      color: 'from-green-400 to-emerald-600',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Community Growth',
      description: 'Building a thriving community of plant lovers through education, support, and shared experiences.',
      color: 'from-purple-400 to-indigo-600',
    },
  ];

  const stats = [
    { number: '500K+', label: 'Happy Plant Parents', icon: '🌱' },
    { number: '50+', label: 'Cities Served', icon: '🏙️' },
    { number: '10M+', label: 'Plants Delivered', icon: '🚚' },
    { number: '98%', label: 'Customer Satisfaction', icon: '⭐' },
  ];

  const additionalImages = [
    imageAbout1,
    imageAbout2,
    imageAbout3,
    imageAbout4,
    imageAbout5,
  ];


  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % additionalImages.length
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [additionalImages.length]);

  return (
    <div className="bg-gray-50 overflow-hidden">
      {/* Hero Section */}
      <div className="relative">
        <div className="relative h-[500px] lg:h-[600px]">
          <img
            src="https://media.istockphoto.com/id/482987325/photo/patio.jpg?s=612x612&w=0&k=20&c=9O4GNPGOz_Pqttc_n4BwEyE0iAUBf2h0jrtVYG4izuY="
            alt="Lush green plants in modern interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl text-white">
                {/* Added company logo */}
                <div className="flex items-center mb-8">
                  <img
                    src={logo}
                    alt="Hindavi Nursery Logo"
                    className="h-24 w-80 object-contain bg-white/70 rounded-full p-2"
                  />
                </div>
                <span className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                  Our Story
                </span>
                <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                  Growing Dreams,
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400"> One Plant at a Time</span>
                </h1>
                <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
                  From a small nursery to India's most trusted plant destination, our journey has been rooted in passion, quality, and the belief that every space deserves the magic of green life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-block px-6 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold mb-6">
                  Our Mission
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Bringing Nature Home to Every Indian Family
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  We believe that everyone deserves to experience the joy, peace, and vitality that plants bring to our lives. Our mission is to make premium-quality plants accessible, affordable, and easy to care for, transforming houses into homes and offices into sanctuaries.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span className="text-gray-700">Democratizing access to premium plants across India</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span className="text-gray-700">Educating and empowering plant parents</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span className="text-gray-700">Promoting sustainable and eco-friendly practices</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src={imageAbout1} // Using image_about_1.png here
                  alt="Beautiful indoor plants arrangement"
                  className="rounded-2xl shadow-2xl w-full h-96 object-cover"
                />
                {/* Added logo overlay */}
                <div className="absolute bottom-4 right-4">
                  <img
                    src={logo}
                    alt="Hindavi Nursery Logo"
                    className="h-16 w-60 object-contain bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-lg"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl opacity-20"></div>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-teal-400 to-emerald-600 rounded-2xl opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Growing Together
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Numbers that reflect our commitment to bringing green joy to millions of homes across India
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Journey Timeline */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our Growth Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to becoming India's most trusted plant destination
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-400 to-teal-600"></div>
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative flex items-start">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {milestone.year.slice(-2)}
                    </div>
                    <div className="ml-8 flex-1">
                      <div className="bg-gray-50 rounded-2xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300">
                        <div className="text-emerald-600 font-semibold text-sm mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Images Section - New Section */}
      <div className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              A Glimpse of Our Green World
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore some real moments from our nurseries and happy plant parents.
            </p>
          </div>
          <div className="relative w-full max-w-4xl mx-auto h-96 rounded-2xl shadow-lg overflow-hidden">
            <img
              src={additionalImages[currentImageIndex]}
              alt={`Hindavi Nursery Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out" // Added transition for fade effect
            />
            {/* <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">Growing Green</span>
            </div> */}
            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {additionalImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-3 h-3 rounded-full ${currentImageIndex === idx ? 'bg-white' : 'bg-gray-400'
                    } focus:outline-none`}
                  aria-label={`Go to slide ${idx + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* Values Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do and shape our commitment to you
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className={`w-14 h-14 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                        {value.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sustainability Section */}
      <div className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <img
                  src={imageAbout2} // Using image_about_2.png here
                  alt="Sustainable plant packaging and eco-friendly practices"
                  className="rounded-2xl shadow-2xl w-full h-96 object-cover"
                />
                {/* Added logo overlay */}
                <div className="absolute top-4 left-4">
                  <img
                    src={logo}
                    alt="Hindavi Nursery Logo"
                    className="h-16 w-auto object-contain bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-lg"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl opacity-20"></div>
              </div>
              <div>
                <span className="inline-block px-6 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-6">
                  Sustainability Commitment
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Growing Responsibly for Future Generations
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Our commitment to the environment goes beyond just selling plants. We're building a sustainable future through eco-friendly practices, supporting local communities, and reducing our carbon footprint at every step.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Carbon-Neutral Delivery</h4>
                      <p className="text-gray-600 text-sm">Offsetting emissions from all deliveries</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Biodegradable Packaging</h4>
                      <p className="text-gray-600 text-sm">100% eco-friendly materials</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Local Sourcing</h4>
                      <p className="text-gray-600 text-sm">Supporting regional growers</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Zero Waste Goal</h4>
                      <p className="text-gray-600 text-sm">Recycling and reuse programs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Added logo at the top of CTA */}
            <div className="flex justify-center mb-6">
              <img
                src={logo}
                alt="Hindavi Nursery Logo"
                className="h-20 w-auto object-contain bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg"
              />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Start Your Plant Journey?
            </h2>
            <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
              Join our community of passionate plant parents and transform your space into a green paradise.
              Experience the Hindavi Nursery difference today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="px-8 py-4 bg-white text-emerald-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Shop Our Collections
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
                Contact Our Experts
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;