-- Run these SQL commands in phpMyAdmin to create a user with remote access
-- Replace 'your_ip' with your actual IP or use '%' for any IP

-- Create a new user (replace with your preferred password)
CREATE USER 'nursery_remote'@'%' IDENTIFIED BY 'NewPassword123!';

-- Grant all privileges on the database
GRANT ALL PRIVILEGES ON u448940947_nursery.* TO 'nursery_remote'@'%';

-- Flush privileges to apply changes
FLUSH PRIVILEGES;

-- Show users to verify
SELECT User, Host FROM mysql.user WHERE User LIKE '%nursery%';