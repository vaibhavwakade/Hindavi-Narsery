
// // Landscaping.jsx
// import React from 'react';
// import {
//     ClipboardListIcon,
//     CameraIcon,
//     SparklesIcon,
//     TruckIcon,
//     UsersIcon,
//     LeafIcon, // Added for a more natural feel in some sections
//     MapPinIcon, // For location details
//     PhoneIcon, // For contact details
//     MailIcon, // For contact details
// } from 'lucide-react';
// import { motion } from 'framer-motion';

// import img1 from '../assets/images/landscape1.jpg';
// import img2 from '../assets/images/landscape2.jpg';
// import img3 from '../assets/images/landscape3.jpg';
// import img4 from '../assets/images/landscape4.webp';

// const steps = [
//     {
//         img: img1,
//         icon: ClipboardListIcon,
//         title: 'Site Visit & Planning',
//         description: 'We start with a thorough site inspection to understand your space, light conditions, and requirements.',
//     },
//     {
//         img: img2,
//         icon: SparklesIcon,
//         title: 'Custom Landscape Design',
//         description: 'Our designers craft a tailored blueprint including plant selection, hardscapes, and irrigation layout.',
//     },
//     {
//         img: img3,
//         icon: TruckIcon,
//         title: 'Execution & Installation',
//         description: 'Our skilled team transforms the design into reality with high-quality materials and plants.',
//     },
//     {
//         img: img4,
//         icon: UsersIcon,
//         title: 'Maintenance & Support',
//         description: 'We offer ongoing care plans to keep your garden thriving all year round.',
//     },
// ];

// // Reusable animation config
// const fadeIn = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { opacity: 1, y: 0 },
// };

// const Landscaping = () => (
//     <div className="bg-gradient-to-br from-green-50 to-emerald-100 text-green-900 font-sans antialiased">
//         {/* Header */}
//         <header className="bg-green-800 text-white py-12 text-center shadow-2xl overflow-hidden">
//             <motion.h1
//                 className="text-5xl font-extrabold tracking-tight"
//                 variants={fadeIn}
//                 initial="hidden"
//                 animate="visible"
//                 transition={{ duration: 0.8 }}
//             >
//                 Landscaping Services – <span className="text-green-300">Hindavi Nursery</span>
//             </motion.h1>
//             <motion.p
//                 className="mt-4 text-xl font-light italic"
//                 variants={fadeIn}
//                 initial="hidden"
//                 animate="visible"
//                 transition={{ delay: 0.4, duration: 0.8 }}
//             >
//                 Crafting Natural Spaces That Breathe, Designed to Flourish
//             </motion.p>
//         </header>

//         {/* Intro Section */}
//         <motion.section
//             className="px-6 py-16 max-w-6xl mx-auto bg-white shadow-lg rounded-xl -mt-8 relative z-10"
//             variants={fadeIn}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.2 }}
//             transition={{ duration: 0.8 }}
//         >
//             <h2 className="text-3xl font-bold mb-6 text-center text-green-700 flex items-center justify-center gap-3">
//                 <CameraIcon className="w-8 h-8 text-green-600" />
//                 Transform your outdoor space into a paradise
//             </h2>
//             <p className="text-lg text-green-800 leading-relaxed text-center">
//                 At <strong>Hindavi Nursery</strong>  we specialize in designing, installing, and maintaining premium-quality, eco-conscious landscapes. Whether it’s a personal home retreat, a bustling urban office environment, or a thriving community garden, we meticulously tailor every detail to the unique needs of your space and vision. Our commitment ensures not just beauty, but sustainability and functionality.
//             </p>
//         </motion.section>

//         {/* Landscaping Process Section */}
//         <section className="py-20 px-6 max-w-7xl mx-auto relative">
//             <motion.h2
//                 className="text-4xl font-bold text-center mb-16 text-green-800"
//                 variants={fadeIn}
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true, amount: 0.3 }}
//                 transition={{ duration: 0.8 }}
//             >
//                 Our Comprehensive Landscaping Process
//             </motion.h2>

//             <div className="relative space-y-20 md:space-y-32">
//                 {steps.map((step, index) => (
//                     <motion.div
//                         key={index}
//                         variants={fadeIn}
//                         initial="hidden"
//                         whileInView="visible"
//                         viewport={{ once: true, amount: 0.3 }}
//                         transition={{ delay: index * 0.2, duration: 0.8 }}
//                         className={`flex flex-col md:flex-row items-center gap-10 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
//                     >
//                         <div className="md:w-1/2 p-4">
//                             <img
//                                 src={step.img}
//                                 alt={step.title}
//                                 className="rounded-2xl shadow-xl w-full h-auto object-cover transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
//                             />
//                         </div>
//                         <div className="md:w-1/2 p-4 text-center md:text-left">
//                             <div className="flex items-center justify-center md:justify-start gap-4 mb-4 text-green-700">
//                                 <step.icon className="w-9 h-9 text-green-600 drop-shadow-md" />
//                                 <h3 className="text-3xl font-semibold">{step.title}</h3>
//                             </div>
//                             <p className="text-lg text-green-800 leading-relaxed">{step.description} Our detailed approach ensures every step, from initial concept to final touch, is handled with utmost precision and care.</p>
//                         </div>
//                     </motion.div>
//                 ))}
//             </div>
//             {/* Decorative line for process flow */}
//             <div className="absolute left-1/2 transform -translate-x-1/2 h-[80%] w-1 bg-green-300 rounded-full hidden md:block" style={{ top: '10%' }}></div>
//         </section>

//         {/* Why Choose Us */}
//         <motion.section
//             className="bg-green-100 py-16 px-6 shadow-inner"
//             variants={fadeIn}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.3 }}
//             transition={{ duration: 0.8 }}
//         >
//             <div className="max-w-5xl mx-auto">
//                 <h2 className="text-3xl font-bold mb-8 text-center text-green-700 flex items-center justify-center gap-3">
//                     <ClipboardListIcon className="w-8 h-8 text-green-600" />
//                     Why Choose Hindavi Nursery?
//                 </h2>
//                 <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 list-none p-0 text-green-800 text-lg">
//                     <li className="flex items-start gap-3">
//                         <LeafIcon className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
//                         <div>
//                             <strong className="text-xl">25+ Years of Proven Excellence:</strong> With over two decades of experience, we've earned the trust of hundreds of satisfied clients across India, delivering stunning and enduring landscapes.
//                         </div>
//                     </li>
//                     <li className="flex items-start gap-3">
//                         <SparklesIcon className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
//                         <div>
//                             <strong className="text-xl">Exquisitely Tailored Solutions:</strong> Every design is a unique masterpiece, meticulously personalized to reflect your individual taste, functional needs, and budgetary considerations.
//                         </div>
//                     </li>
//                     <li className="flex items-start gap-3">
//                         <LeafIcon className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
//                         <div>
//                             <strong className="text-xl">Committed to Eco-Conscious Practices:</strong> We champion sustainability, prioritizing the use of native plants, implementing advanced water conservation techniques, and embracing organic landscaping practices.
//                         </div>
//                     </li>
//                     <li className="flex items-start gap-3">
//                         <TruckIcon className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
//                         <div>
//                             <strong className="text-xl">Seamless One-Stop Service:</strong> Experience unparalleled convenience with our comprehensive offerings. From initial concept and intricate design to flawless installation and long-term maintenance – we manage it all with precision.
//                         </div>
//                     </li>
//                     <li className="flex items-start gap-3 col-span-1 md:col-span-2 justify-center">
//                         <UsersIcon className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
//                         <div>
//                             <strong className="text-xl">Highly Skilled & Passionate Expert Team:</strong> Our success is rooted in our team of friendly horticulturists, visionary designers, and diligent on-site workers, all dedicated to transforming your outdoor dreams into reality.
//                         </div>
//                     </li>
//                 </ul>
//             </div>
//         </motion.section>

//         {/* Services Section - Enhanced Styling */}
//         <motion.section
//             className="py-16 px-6 bg-green-50 relative overflow-hidden" // Added relative and overflow-hidden for the background elements
//             variants={fadeIn}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.3 }}
//             transition={{ duration: 0.8 }}
//         >
//             {/* Background decorative elements */}
//             <div className="absolute inset-0 z-0 opacity-10">
//                 <div className="w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob top-0 left-0"></div>
//                 <div className="w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 top-0 right-0"></div>
//                 <div className="w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 bottom-0 left-0"></div>
//                 <div className="w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-6000 bottom-0 right-0"></div>
//             </div>

//             <div className="max-w-6xl mx-auto relative z-10"> {/* Ensure content is above background */}
//                 <h2 className="text-3xl font-bold mb-10 text-center text-green-700 flex items-center justify-center gap-3">
//                     <SparklesIcon className="w-8 h-8 text-green-600" />
//                     Our Diverse Landscaping Services
//                 </h2>
//                 <p className="text-center text-lg text-green-800 mb-12 max-w-3xl mx-auto">
//                     From initial concept to vibrant realization, Hindavi Nursery offers a comprehensive suite of landscaping services designed to meet every outdoor need. We blend creativity with expertise to deliver spaces that are not just beautiful, but also sustainable and perfectly functional.
//                 </p>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-green-800">
//                     {[
//                         'Garden Design & Layout',
//                         'Pathways & Avenue Plantation',
//                         'Lawn Installation',
//                         'Vertical Gardens & Green Walls',
//                         'Rock & Desert Gardens',
//                         'Water Features & Hardscaping',
//                     ].map((service, idx) => (
//                         <motion.div
//                             key={idx}
//                             className="p-6 bg-white rounded-xl shadow-lg border border-green-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group relative overflow-hidden"
//                             whileHover={{ scale: 1.02 }}
//                             transition={{ type: "spring", stiffness: 400, damping: 10 }}
//                         >
//                             {/* Decorative corner element */}
//                             <div className="absolute top-0 left-0 w-24 h-24 bg-green-200 opacity-20 transform -translate-x-1/2 -translate-y-1/2 rounded-full group-hover:scale-150 transition-transform duration-500"></div>

//                             <h3 className="font-bold text-xl mb-3 text-green-700 flex items-center gap-2 relative z-10">
//                                 <LeafIcon className="w-6 h-6 text-green-600 group-hover:text-green-800 transition-colors" /> {service}
//                             </h3>
//                             <p className="mt-2 text-sm opacity-90 leading-relaxed relative z-10">
//                                 We provide professional and sustainable execution for all aspects of {service.toLowerCase()}. Expect unparalleled craftsmanship and meticulous attention to detail, ensuring your outdoor space is both stunning and enduring.
//                             </p>
//                             {/* Hover overlay */}
//                             <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"></div>
//                         </motion.div>
//                     ))}
//                 </div>
//             </div>
//         </motion.section>

//         {/* Contact Section */}
//         <motion.section
//             className="bg-green-200 py-16 px-6 shadow-inner"
//             variants={fadeIn}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.3 }}
//             transition={{ duration: 0.8 }}
//         >
//             <div className="max-w-4xl mx-auto text-center">
//                 <h2 className="text-3xl font-bold mb-6 text-green-800 flex items-center justify-center gap-3">
//                     <CameraIcon className="w-8 h-8 text-green-700" />
//                     Book a Free Site Visit
//                 </h2>
//                 <p className="mb-6 text-lg text-green-900 leading-relaxed">
//                     Let our experts visit your site and provide customized solutions – completely free of charge. We'll assess your needs and offer tailored advice to kickstart your landscaping project.
//                 </p>
//                 <div className="space-y-4 text-xl">
//                     <p className="flex items-center justify-center gap-3">
//                         <MailIcon className="w-6 h-6 text-green-700" />
//                         <strong>Email:</strong>{' '}
//                         <a href="mailto:hindavinursery@gmail.com" className="text-green-700 underline hover:text-green-900 transition duration-300">
//                             hindavinursery@gmail.com
//                         </a>
//                     </p>
//                     <p className="flex items-center justify-center gap-3">
//                         <PhoneIcon className="w-6 h-6 text-green-700" />
//                         <strong>Phone / WhatsApp:</strong>{' '}
//                         <a href="tel:+918007345005" className="text-green-700 underline hover:text-green-900 transition duration-300">
//                             +91 80073 45005
//                         </a>
//                     </p>
//                 </div>
//             </div>
//         </motion.section>

//         {/* Footer */}
//         <footer className="bg-green-900 text-white py-8 px-6">
//             <div className="max-w-5xl mx-auto text-center">
//                 <h2 className="text-2xl font-semibold mb-4 text-green-200">Our Landscaping Projects Span Across</h2>
//                 <p className="text-lg text-green-100">
//                     <MapPinIcon className="inline-block w-5 h-5 mr-2 -mt-1" />
//                     <strong>Uruli Kanchan, Beed Ashti, and Khed Shivapur</strong>
//                 </p>
//             </div>
//         </footer>
//     </div>
// );

// export default Landscaping;


// Landscaping.jsx
import React from 'react';
import {
    ClipboardListIcon,
    CameraIcon,
    SparklesIcon,
    TruckIcon,
    UsersIcon,
    LeafIcon,
    MapPinIcon,
    PhoneIcon,
    MailIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';

import img1 from '../assets/images/landscape1.jpg'; // Existing image for step 1
import img2 from '../assets/images/landscape2.jpg'; // Existing image for step 2
import img3 from '../assets/images/landscape3.jpg'; // Existing image for step 3
import img4 from '../assets/images/landscape4.webp'; // Existing image for step 4

// New landscaping project images
import landscapeProject1 from '../assets/images_landscaping/images_landscape_1.jpg';
import landscapeProject2 from '../assets/images_landscaping/images_landscape_2.jpg';
import landscapeProject3 from '../assets/images_landscaping/images_landscape_3.jpg';

const steps = [
    {
        img: img1,
        icon: ClipboardListIcon,
        title: 'Site Visit & Planning',
        description: 'We start with a thorough site inspection to understand your space, light conditions, and requirements.',
    },
    {
        img: img2,
        icon: SparklesIcon,
        title: 'Custom Landscape Design',
        description: 'Our designers craft a tailored blueprint including plant selection, hardscapes, and irrigation layout.',
    },
    {
        img: img3,
        icon: TruckIcon,
        title: 'Execution & Installation',
        description: 'Our skilled team transforms the design into reality with high-quality materials and plants.',
    },
    {
        img: img4,
        icon: UsersIcon,
        title: 'Maintenance & Support',
        description: 'We offer ongoing care plans to keep your garden thriving all year round.',
    },
];

// Reusable animation config
const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

const Landscaping = () => (
    <div className="bg-gradient-to-br from-green-50 to-emerald-100 text-green-900 font-sans antialiased">
        {/* Header */}
        <header className="bg-green-800 text-white py-12 text-center shadow-2xl overflow-hidden">
            <motion.h1
                className="text-5xl font-extrabold tracking-tight"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8 }}
            >
                Landscaping Services – <span className="text-green-300">Hindavi Nursery</span>
            </motion.h1>
            <motion.p
                className="mt-4 text-xl font-light italic"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4, duration: 0.8 }}
            >
                Crafting Natural Spaces That Breathe, Designed to Flourish
            </motion.p>
        </header>

        {/* Intro Section */}
        <motion.section
            className="px-6 py-16 max-w-6xl mx-auto bg-white shadow-lg rounded-xl -mt-8 relative z-10"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
        >
            <h2 className="text-3xl font-bold mb-6 text-center text-green-700 flex items-center justify-center gap-3">
                <CameraIcon className="w-8 h-8 text-green-600" />
                Transform your outdoor space into a paradise
            </h2>
            <p className="text-lg text-green-800 leading-relaxed text-center">
                At **Hindavi Nursery** we specialize in designing, installing, and maintaining premium-quality, eco-conscious landscapes. Whether it’s a personal home retreat, a bustling urban office environment, or a thriving community garden, we meticulously tailor every detail to the unique needs of your space and vision. Our commitment ensures not just beauty, but sustainability and functionality.
            </p>
        </motion.section>

        {/* Landscaping Process Section */}
        <section className="py-20 px-6 max-w-7xl mx-auto relative">
            <motion.h2
                className="text-4xl font-bold text-center mb-16 text-green-800"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
            >
                Our Comprehensive Landscaping Process
            </motion.h2>

            <div className="relative space-y-20 md:space-y-32">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ delay: index * 0.2, duration: 0.8 }}
                        className={`flex flex-col md:flex-row items-center gap-10 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                    >
                        <div className="md:w-1/2 p-4">
                            <img
                                src={step.img}
                                alt={step.title}
                                className="rounded-2xl shadow-xl w-full h-auto object-cover transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
                            />
                        </div>
                        <div className="md:w-1/2 p-4 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-4 mb-4 text-green-700">
                                <step.icon className="w-9 h-9 text-green-600 drop-shadow-md" />
                                <h3 className="text-3xl font-semibold">{step.title}</h3>
                            </div>
                            <p className="text-lg text-green-800 leading-relaxed">{step.description} Our detailed approach ensures every step, from initial concept to final touch, is handled with utmost precision and care.</p>
                        </div>
                    </motion.div>
                ))}
            </div>
            {/* Decorative line for process flow */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-[80%] w-1 bg-green-300 rounded-full hidden md:block" style={{ top: '10%' }}></div>
        </section>

        

        {/* Project Gallery Section - New */}
        <motion.section
            className="py-20 px-6 bg-green-100"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
        >
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-12 text-green-800 flex items-center justify-center gap-3">
                    <CameraIcon className="w-9 h-9 text-green-700" />
                    Our Landscaping Masterpieces
                </h2>
                <p className="text-lg text-green-800 mb-12 max-w-3xl mx-auto">
                    Take a look at some of our completed projects that showcase our dedication to creating stunning and sustainable outdoor environments.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <motion.div
                        className="rounded-2xl shadow-xl overflow-hidden group"
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <img
                            src={landscapeProject1}
                            alt="Landscape Project 1"
                            className="w-full h-72 object-cover transform transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="p-6 bg-white text-left">
                            <h3 className="text-xl font-semibold text-green-800 mb-2">Residential Oasis</h3>
                            <p className="text-green-700 text-sm">A serene garden retreat designed for relaxation and beauty.</p>
                        </div>
                    </motion.div>
                    <motion.div
                        className="rounded-2xl shadow-xl overflow-hidden group"
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <img
                            src={landscapeProject2}
                            alt="Landscape Project 2"
                            className="w-full h-72 object-cover transform transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="p-6 bg-white text-left">
                            <h3 className="text-xl font-semibold text-green-800 mb-2">Commercial Green Space</h3>
                            <p className="text-green-700 text-sm">Enhancing corporate environments with vibrant, low-maintenance landscapes.</p>
                        </div>
                    </motion.div>
                    <motion.div
                        className="rounded-2xl shadow-xl overflow-hidden group"
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <img
                            src={landscapeProject3}
                            alt="Landscape Project 3"
                            className="w-full h-72 object-cover transform transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="p-6 bg-white text-left">
                            <h3 className="text-xl font-semibold text-green-800 mb-2">Community Garden Revitalization</h3>
                            <p className="text-green-700 text-sm">Transforming public spaces into thriving green hubs for all to enjoy.</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.section>

        ---

        {/* Why Choose Us */}
        <motion.section
            className="bg-green-100 py-16 px-6 shadow-inner"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
        >
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center text-green-700 flex items-center justify-center gap-3">
                    <ClipboardListIcon className="w-8 h-8 text-green-600" />
                    Why Choose Hindavi Nursery?
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 list-none p-0 text-green-800 text-lg">
                    <li className="flex items-start gap-3">
                        <LeafIcon className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <div>
                            <strong className="text-xl">25+ Years of Proven Excellence:</strong> With over two decades of experience, we've earned the trust of hundreds of satisfied clients across India, delivering stunning and enduring landscapes.
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <SparklesIcon className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <div>
                            <strong className="text-xl">Exquisitely Tailored Solutions:</strong> Every design is a unique masterpiece, meticulously personalized to reflect your individual taste, functional needs, and budgetary considerations.
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <LeafIcon className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <div>
                            <strong className="text-xl">Committed to Eco-Conscious Practices:</strong> We champion sustainability, prioritizing the use of native plants, implementing advanced water conservation techniques, and embracing organic landscaping practices.
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <TruckIcon className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <div>
                            <strong className="text-xl">Seamless One-Stop Service:</strong> Experience unparalleled convenience with our comprehensive offerings. From initial concept and intricate design to flawless installation and long-term maintenance – we manage it all with precision.
                        </div>
                    </li>
                    <li className="flex items-start gap-3 col-span-1 md:col-span-2 justify-center">
                        <UsersIcon className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <div>
                            <strong className="text-xl">Highly Skilled & Passionate Expert Team:</strong> Our success is rooted in our team of friendly horticulturists, visionary designers, and diligent on-site workers, all dedicated to transforming your outdoor dreams into reality.
                        </div>
                    </li>
                </ul>
            </div>
        </motion.section>

        {/* Services Section - Enhanced Styling */}
        <motion.section
            className="py-16 px-6 bg-green-50 relative overflow-hidden" // Added relative and overflow-hidden for the background elements
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
        >
            {/* Background decorative elements */}
            <div className="absolute inset-0 z-0 opacity-10">
                <div className="w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob top-0 left-0"></div>
                <div className="w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 top-0 right-0"></div>
                <div className="w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 bottom-0 left-0"></div>
                <div className="w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-6000 bottom-0 right-0"></div>
            </div>

            <div className="max-w-6xl mx-auto relative z-10"> {/* Ensure content is above background */}
                <h2 className="text-3xl font-bold mb-10 text-center text-green-700 flex items-center justify-center gap-3">
                    <SparklesIcon className="w-8 h-8 text-green-600" />
                    Our Diverse Landscaping Services
                </h2>
                <p className="text-center text-lg text-green-800 mb-12 max-w-3xl mx-auto">
                    From initial concept to vibrant realization, Hindavi Nursery offers a comprehensive suite of landscaping services designed to meet every outdoor need. We blend creativity with expertise to deliver spaces that are not just beautiful, but also sustainable and perfectly functional.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-green-800">
                    {[
                        'Garden Design & Layout',
                        'Pathways & Avenue Plantation',
                        'Lawn Installation',
                        'Vertical Gardens & Green Walls',
                        'Rock & Desert Gardens',
                        'Water Features & Hardscaping',
                    ].map((service, idx) => (
                        <motion.div
                            key={idx}
                            className="p-6 bg-white rounded-xl shadow-lg border border-green-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group relative overflow-hidden"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            {/* Decorative corner element */}
                            <div className="absolute top-0 left-0 w-24 h-24 bg-green-200 opacity-20 transform -translate-x-1/2 -translate-y-1/2 rounded-full group-hover:scale-150 transition-transform duration-500"></div>

                            <h3 className="font-bold text-xl mb-3 text-green-700 flex items-center gap-2 relative z-10">
                                <LeafIcon className="w-6 h-6 text-green-600 group-hover:text-green-800 transition-colors" /> {service}
                            </h3>
                            <p className="mt-2 text-sm opacity-90 leading-relaxed relative z-10">
                                We provide professional and sustainable execution for all aspects of {service.toLowerCase()}. Expect unparalleled craftsmanship and meticulous attention to detail, ensuring your outdoor space is both stunning and enduring.
                            </p>
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
            className="bg-green-200 py-16 px-6 shadow-inner"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
        >
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6 text-green-800 flex items-center justify-center gap-3">
                    <CameraIcon className="w-8 h-8 text-green-700" />
                    Book a Free Site Visit
                </h2>
                <p className="mb-6 text-lg text-green-900 leading-relaxed">
                    Let our experts visit your site and provide customized solutions – completely free of charge. We'll assess your needs and offer tailored advice to kickstart your landscaping project.
                </p>
                <div className="space-y-4 text-xl">
                    <p className="flex items-center justify-center gap-3">
                        <MailIcon className="w-6 h-6 text-green-700" />
                        <strong>Email:</strong>{' '}
                        <a href="mailto:hindavinursery@gmail.com" className="text-green-700 underline hover:text-green-900 transition duration-300">
                            hindavinursery@gmail.com
                        </a>
                    </p>
                    <p className="flex items-center justify-center gap-3">
                        <PhoneIcon className="w-6 h-6 text-green-700" />
                        <strong>Phone / WhatsApp:</strong>{' '}
                        <a href="tel:+918007345005" className="text-green-700 underline hover:text-green-900 transition duration-300">
                            +91 80073 45005
                        </a>
                    </p>
                </div>
            </div>
        </motion.section>

        {/* Footer */}
        <footer className="bg-green-900 text-white py-8 px-6">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-2xl font-semibold mb-4 text-green-200">Our Landscaping Projects Span Across</h2>
                <p className="text-lg text-green-100">
                    <MapPinIcon className="inline-block w-5 h-5 mr-2 -mt-1" />
                    <strong>Uruli Kanchan, Beed Ashti, and Khedshivapur Pune</strong>
                </p>
            </div>
        </footer>
    </div>
);

export default Landscaping;