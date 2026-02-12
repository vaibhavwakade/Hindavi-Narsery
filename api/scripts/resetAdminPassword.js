// Render Shell Script - Reset Admin Password
// Run this on Render Shell to reset admin password

const bcrypt = require('bcrypt');
const sequelize = require('./config/database');
const User = require('./models/User');

async function resetAdminPassword() {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected');

        const email = 'vaibhavwakade45@gmail.com';
        const newPassword = 'Vaibhav@123';

        // Find admin user
        let admin = await User.findOne({ where: { email } });

        if (!admin) {
            console.log('❌ Admin user not found. Creating new admin...');
            
            // Create new admin (hooks will hash password automatically)
            admin = await User.create({
                name: 'Admin',
                email: email,
                password: newPassword,
                role: 'admin',
                isVerified: true
            });
            
            console.log('✅ Admin user created successfully');
        } else {
            console.log('✅ Admin user found. Updating password...');
            
            // Update password (hooks will hash it automatically)
            await admin.update({ password: newPassword });
            
            console.log('✅ Admin password updated successfully');
        }

        console.log('\n📊 Admin User Details:');
        console.log('Email:', admin.email);
        console.log('Role:', admin.role);
        console.log('ID:', admin.id);
        console.log('\n✅ Password: Vaibhav@123');
        console.log('\n🌐 You can now login at: https://hindavi-nursery.vercel.app/login');

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error(error);
    } finally {
        await sequelize.close();
        process.exit(0);
    }
}

resetAdminPassword();
