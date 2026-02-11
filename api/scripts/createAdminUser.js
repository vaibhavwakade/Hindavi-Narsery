const bcrypt = require('bcrypt');
const sequelize = require('../config/database');
const User = require('../models/User');

async function createAdminUser() {
  try {
    // Connect to database
    await sequelize.authenticate();
    console.log('Database connected');

    // Sync models
    await sequelize.sync();
    
    const adminEmail = 'vaibhavwakade45@gmail.com';
    const adminPassword = 'Vaibhav@123';
    
    // Check if admin user already exists
    const existingUser = await User.findOne({ where: { email: adminEmail } });
    if (existingUser) {
      // Update existing user to admin role and new password
      existingUser.role = 'admin';
      existingUser.password = adminPassword; // This will be hashed by the hook
      await existingUser.save();
      console.log('Existing user updated to admin:', existingUser.email);
    } else {
      // Create new admin user
      const adminUser = await User.create({
        name: 'Admin User',
        email: adminEmail,
        password: adminPassword, // This will be hashed by the hook
        role: 'admin'
      });
      console.log('Admin user created successfully:', adminUser.email);
    }
    
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await sequelize.close();
  }
}

createAdminUser();