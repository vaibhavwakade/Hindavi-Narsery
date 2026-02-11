const sequelize = require('../config/database');
const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');
const { Cart, CartItem } = require('../models/Cart');
const { Order, OrderItem } = require('../models/Order');
const Review = require('../models/Review');
const { Staff, Attendance } = require('../models/StaffAttendance');
const TempUser = require('../models/TempUser');

async function setupMySQLDatabase() {
  try {
    console.log('🔄 Connecting to MySQL database...');
    await sequelize.authenticate();
    console.log('✅ Database connection successful!');

    console.log('🔄 Creating all tables...');
    // Sync individual models to avoid constraint conflicts
    await User.sync({ alter: true });
    console.log('✅ User table created');
    
    await Category.sync({ alter: true });
    console.log('✅ Category table created');
    
    await Product.sync({ alter: true });
    console.log('✅ Product table created');
    
    await TempUser.sync({ alter: true });
    console.log('✅ TempUser table created');
    
    await Cart.sync({ alter: true });
    console.log('✅ Cart table created');
    
    await CartItem.sync({ alter: true });
    console.log('✅ CartItem table created');
    
    await Order.sync({ alter: true });
    console.log('✅ Order table created');
    
    await OrderItem.sync({ alter: true });
    console.log('✅ OrderItem table created');
    
    await Review.sync({ alter: true });
    console.log('✅ Review table created');
    
    await Staff.sync({ alter: true });
    console.log('✅ Staff table created');
    
    await Attendance.sync({ alter: true });
    console.log('✅ Attendance table created');
    
    console.log('✅ All tables created successfully!');

    console.log('🔄 Creating initial categories...');
    const categories = [
      { name: 'Indoor Plants', description: 'Plants suitable for indoor environments', type: 'Plants' },
      { name: 'Outdoor Plants', description: 'Plants for outdoor gardens', type: 'Plants' },
      { name: 'Flowers', description: 'Beautiful flowering plants', type: 'Flowers' },
      { name: 'Pots', description: 'Various types of plant pots', type: 'Pots' },
      { name: 'Garden Tools', description: 'Tools for gardening', type: 'Utensils' },
      { name: 'Seeds', description: 'Plant seeds for growing', type: 'Others' }
    ];

    for (const categoryData of categories) {
      const existingCategory = await Category.findOne({ where: { name: categoryData.name } });
      if (!existingCategory) {
        const category = await Category.create(categoryData);
        console.log(`✅ Created category: ${category.name} (ID: ${category.id})`);
      } else {
        console.log(`ℹ️ Category already exists: ${categoryData.name} (ID: ${existingCategory.id})`);
      }
    }

    console.log('🔄 Creating admin user...');
    const adminEmail = 'vaibhavwakade45@gmail.com';
    const adminPassword = 'Vaibhav@123';
    
    const existingUser = await User.findOne({ where: { email: adminEmail } });
    if (!existingUser) {
      const adminUser = await User.create({
        name: 'Admin User',
        email: adminEmail,
        password: adminPassword, // Will be hashed by model hook
        role: 'admin'
      });
      console.log(`✅ Admin user created: ${adminUser.email} (ID: ${adminUser.id})`);
    } else {
      // Update existing user to admin role
      existingUser.role = 'admin';
      existingUser.password = adminPassword; // Will be hashed by model hook
      await existingUser.save();
      console.log(`✅ Existing user updated to admin: ${existingUser.email} (ID: ${existingUser.id})`);
    }

    console.log('🔄 Creating sample products...');
    const sampleProducts = [
      {
        name: 'Snake Plant',
        description: 'Easy-care indoor plant perfect for beginners. Tolerates low light and infrequent watering.',
        price: 299.99,
        categoryId: 1, // Indoor Plants
        stock: 50,
        size: 'Medium pot (6 inches)',
        imageUrls: []
      },
      {
        name: 'Rose Plant',
        description: 'Beautiful red roses perfect for outdoor gardens. Blooms throughout the season.',
        price: 199.99,
        categoryId: 2, // Outdoor Plants
        stock: 30,
        size: 'Standard pot (8 inches)',
        imageUrls: []
      },
      {
        name: 'Ceramic Pot',
        description: 'Decorative ceramic pot with drainage holes. Perfect for indoor plants.',
        price: 149.99,
        categoryId: 4, // Pots
        stock: 100,
        size: '6 inches diameter',
        imageUrls: []
      }
    ];

    for (const productData of sampleProducts) {
      const existingProduct = await Product.findOne({ where: { name: productData.name } });
      if (!existingProduct) {
        const product = await Product.create(productData);
        console.log(`✅ Created product: ${product.name} (ID: ${product.id})`);
      } else {
        console.log(`ℹ️ Product already exists: ${productData.name} (ID: ${existingProduct.id})`);
      }
    }

    console.log('\n🎉 MySQL database setup completed successfully!');
    console.log('📊 Summary:');
    console.log(`📦 Categories: ${await Category.count()}`);
    console.log(`🛍️ Products: ${await Product.count()}`);
    console.log(`👥 Users: ${await User.count()}`);
    
    console.log('\n🔗 You can now:');
    console.log('1. Login with: vaibhavwakade45@gmail.com / Vaibhav@123');
    console.log('2. Access admin panel to manage products');
    console.log('3. All data is now stored in your Hostinger MySQL database');

  } catch (error) {
    console.error('❌ Error setting up database:', error);
    console.error(error.message);
  } finally {
    await sequelize.close();
  }
}

setupMySQLDatabase();