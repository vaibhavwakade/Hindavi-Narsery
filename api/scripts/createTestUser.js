const bcrypt = require('bcrypt');
const sequelize = require('../config/database');
const User = require('../models/User');

async function createTestUser() {
  try {
    // Connect to database
    await sequelize.authenticate();
    console.log('Database connected');

    // Sync models
    await sequelize.sync();
    
    const testEmail = 'vaibhavwakade45@gmail.com';
    
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email: testEmail } });
    if (existingUser) {
      console.log('Test user already exists');
      return;
    }

    // Create test user
    const user = await User.create({
      name: 'Test User',
      email: testEmail,
      password: 'password123', // This will be hashed by the hook
      role: 'user'
    });

    console.log('Test user created successfully:', user.email);
    
  } catch (error) {
    console.error('Error creating test user:', error);
  } finally {
    await sequelize.close();
  }
}

createTestUser();