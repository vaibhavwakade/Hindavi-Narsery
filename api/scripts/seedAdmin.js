const User = require('../models/User');
const sequelize = require('../config/database');

async function seedAdmin() {
    try {
        await sequelize.sync(); // Ensure tables exist

        // Check if admin already exists
        const existingAdmin = await User.findOne({
            where: { email: 'vaibhavwakade45@gmail.com' }
        });

        if (existingAdmin) {
            console.log('✅ Admin user already exists.');
        } else {
            // Create new admin user
            await User.create({
                name: 'Admin',
                email: 'vaibhavwakade45@gmail.com',
                password: 'Vaibhav@123', // Sequelize hook will hash this
                role: 'admin'
            });
            console.log('✅ Admin user created successfully.');
        }
    } catch (error) {
        console.error('❌ Error seeding admin:', error);
    } finally {
        // Close connection
        await sequelize.close();
    }
}

seedAdmin();
