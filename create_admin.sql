-- Create Users table (sequelize standard structure)
CREATE TABLE IF NOT EXISTS Users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin', 'staff', 'accountant', 'manager') DEFAULT 'user',
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);

-- Insert Admin User if not exists
INSERT INTO Users (name, email, password, role, createdAt, updatedAt) 
SELECT * FROM (SELECT 
    'Admin' as name, 
    'vaibhavwakade45@gmail.com' as email, 
    '$2b$10$DSEcEHE2RWQ8nh.Rann2s.hcpYTjjREBWzaXmMQMryZoFP6/icfgq' as password, -- Hash for 'Vaibhav@123'
    'admin' as role, 
    NOW() as createdAt, 
    NOW() as updatedAt
) AS tmp
WHERE NOT EXISTS (
    SELECT email FROM Users WHERE email = 'vaibhavwakade45@gmail.com'
) LIMIT 1;

-- If admin exists, update password and role just in case
UPDATE Users 
SET password = '$2b$10$DSEcEHE2RWQ8nh.Rann2s.hcpYTjjREBWzaXmMQMryZoFP6/icfgq', role = 'admin'
WHERE email = 'vaibhavwakade45@gmail.com';
