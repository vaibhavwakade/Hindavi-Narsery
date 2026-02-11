const mysql = require('mysql2/promise');
require('dotenv').config();

async function testDatabaseConnection() {
  console.log('Testing database connection...');
  console.log('Host:', process.env.DB_HOST);
  console.log('Port:', process.env.DB_PORT || 3306);
  console.log('Database:', process.env.DB_NAME);
  console.log('User:', process.env.DB_USER);
  console.log('Password:', process.env.DB_PASSWORD ? '***hidden***' : 'NOT SET');

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      connectTimeout: 10000
    });

    console.log('✅ Database connection successful!');
    
    // Test basic query
    const [rows] = await connection.execute('SHOW TABLES');
    console.log('📋 Existing tables:', rows.length > 0 ? rows.map(row => Object.values(row)[0]) : 'No tables found');
    
    await connection.end();
    return true;
  } catch (error) {
    console.log('❌ Database connection failed:');
    console.log('Error code:', error.code);
    console.log('Error message:', error.message);
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('\n🔧 Possible solutions:');
      console.log('1. Check if the password is correct in your Hostinger control panel');
      console.log('2. Verify the database user has proper permissions');
      console.log('3. Check if your IP address is whitelisted in Hostinger');
      console.log('4. Ensure the database host and port are correct');
    } else if (error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT') {
      console.log('\n🔧 Possible solutions:');
      console.log('1. Check if the hostname is correct');
      console.log('2. Verify your internet connection');
      console.log('3. Check if your IP is whitelisted for remote access');
    }
    
    return false;
  }
}

testDatabaseConnection().then(success => {
  process.exit(success ? 0 : 1);
});