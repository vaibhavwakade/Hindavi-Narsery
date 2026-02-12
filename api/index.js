const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const adminRoutes = require('./routes/adminRoutes');
const path = require('path');
const { staffAttendaceRouter } = require('./routes/staffAttendanceRoutes');
const { accountantRouter } = require('./routes/accountantRouter');
const { dashboardRouter } = require('./routes/dashboardRouter');
const { reviewRouter } = require('./routes/reviewRoutes');
// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars);
  console.error('Please check your .env file');
}

// Configure Cloudinary
if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log('Cloudinary configured successfully');
} else {
  console.warn('Cloudinary configuration incomplete. Some features may not work.');
}

const app = express();

// Middleware - CORS configuration for production
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // List of allowed origins
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://hindavi-nursery.vercel.app',
      'https://hindavi-nursery-frontend.vercel.app'
    ];
    
    // Allow any vercel.app domain
    if (origin.includes('.vercel.app') || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // Block other origins
    const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
    return callback(new Error(msg), false);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());


// ✅ Serve static files like the logo
app.use('/public', express.static(path.join(__dirname, 'public')));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Backend API is working!', 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Root route for API
app.get('/api', (req, res) => {
  res.json({
    message: 'Hindavi Nursery API',
    version: '1.0.0',
    endpoints: [
      '/api/health',
      '/api/test', 
      '/api/auth',
      '/api/products', 
      '/api/categories',
      '/api/orders',
      '/api/admin'
    ]
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use("/api/staff", staffAttendaceRouter)
app.use("/api/accountant", accountantRouter)
app.use("/api/dashboard", dashboardRouter)
app.use("/api/reviews", reviewRouter)

// Error handling middleware
app.use(errorMiddleware);

// Database connection
const sequelize = require('./config/database');
const User = require('./models/User'); // Import models to ensure they are registered
const Category = require('./models/Category');
const Product = require('./models/Product');
const { Cart, CartItem } = require('./models/Cart');
const { Order, OrderItem } = require('./models/Order');
const Review = require('./models/Review');
const { Staff, Attendance } = require('./models/StaffAttendance');
const TempUser = require('./models/TempUser');

// Test and sync database
(async () => {
  try {
    // Only connect if we have database credentials
    if (process.env.DB_HOST && process.env.DB_NAME && process.env.DB_USER) {
      await sequelize.authenticate();
      console.log('Database connection established successfully.');
      // Use existing MySQL tables without altering structure
      await sequelize.sync({ force: false, alter: false }); 
      console.log('Database synced successfully.');
    } else {
      console.warn('Database credentials not found. Skipping database connection.');
    }
  } catch (error) {
    console.error('Database connection/sync error:', error);
    console.error('Please check your database configuration in .env file');
    // Don't exit the process, let it continue for development
    // process.exit(1);
  }
})();

// Start server
// Start server
const PORT = process.env.PORT || 5000;
console.log('Checking main module:', require.main === module);
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT} \n http://localhost:${PORT}`));
} else {
  console.log('Not running as main module');
}

module.exports = app;
