const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const TempUser = require('../models/TempUser');
const nodemailer = require("nodemailer")
require('dotenv').config();
const path = require('path');

// console.log("Auth Controller Loaded", process.env.EMAIL_USER, process.env.EMAIL_PASS)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, otp } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }
    
    // For development - skip email verification if EMAIL_USER is not properly configured
    let skipEmailVerification = !process.env.EMAIL_USER || !process.env.EMAIL_PASS || process.env.EMAIL_PASS === 'Vaibhav@123';
    
    // Direct signup without email verification
    if (skipEmailVerification) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      // Password will be automatically hashed by User model hook
      const newUser = await User.create({
        name,
        email,
        password, // Don't hash here - model hook will handle it
      });

      const token = jwt.sign(
        { userId: newUser.id, role: newUser.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      return res.status(201).json({
        message: 'User registered successfully',
        token,
        user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
      });
    }

    // If OTP is NOT provided and email verification is enabled
    if (!otp && !skipEmailVerification) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      let tempUser = await TempUser.findOne({ where: { email } });
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

      if (tempUser) {
        tempUser.otp = generatedOtp;
        tempUser.createdAt = new Date();
        await tempUser.save();
      } else {
        await TempUser.create({
          name,
          email,
          password,
          otp: generatedOtp
        });
      }

      const host = req.get('host');
      const protocol = req.protocol;
      const logoUrl = `${protocol}://${host}/public/images/hindavi_nursery.png`;

      try {
        await transporter.sendMail({
          from: `"Hindavi Nursery" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: 'Your OTP Code from Hindavi Nursery 🌿',
          html: `
    <html>
      <body>
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <div style="background-color: #2e7d32; text-align: center; padding: 20px;">
            <img src="${logoUrl}" alt="Hindavi Nursery Logo" style="width: 150px;">
          </div>
          <div style="padding: 30px;">
            <p>Dear User,</p>
            <p>Thank you for choosing <strong>Hindavi Nursery</strong>! 🌱</p>
            <p>Your OTP code for verification is:</p>
            <div style="font-size: 28px; font-weight: bold; color: #2e7d32; text-align: center; margin: 20px 0;">${generatedOtp}</div>
            <p>This OTP is valid for <strong>5 minutes</strong>. Please do not share it with anyone.</p>
            <p>We're excited to have you grow with us!</p>
            <p>Warm regards,<br>Team Hindavi Nursery</p>
          </div>
          <div style="font-size: 14px; text-align: center; padding: 20px; color: #777;">
            📞 +91 80073 45005<br>
            📧 hindavinursery@gmail.com<br>
            🌐 www.hindavinursery.com
          </div>
        </div>
      </body>
    </html>
  `
        });
        return res.status(200).json({ message: 'OTP sent to email' });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Fall back to direct signup
        const newUser = await User.create({
          name,
          email,
          password, // Model hook will hash this
        });

        const token = jwt.sign(
          { userId: newUser.id, role: newUser.role },
          process.env.JWT_SECRET,
          { expiresIn: '24h' }
        );

        return res.status(201).json({
          message: 'User registered successfully',
          token,
          user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
        });
      }
    }

    // If OTP is provided: Verify OTP and register user
    if (otp) {
      const tempUser = await TempUser.findOne({ where: { email } });
      if (!tempUser) {
        return res.status(400).json({ message: 'No OTP request found for this email' });
      }

      if (tempUser.otp !== otp) {
        return res.status(400).json({ message: 'Invalid OTP' });
      }

      const user = await User.create({
        name: tempUser.name,
        email: tempUser.email,
        password: tempUser.password // Model hook will hash this
      });

      await TempUser.destroy({ where: { email } });

      return res.status(201).json({ message: 'User created successfully' });
    }

  } catch (error) {
    console.log({ error })
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      const error = new Error('Email and password are required');
      error.status = 400;
      throw error;
    }

    // Check if JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not configured');
      const error = new Error('Server configuration error');
      error.status = 500;
      throw error;
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      const error = new Error('Invalid credentials');
      error.status = 401;
      throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error('Invalid credentials');
      error.status = 401;
      throw error;
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    next(error);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.userId);
    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }

    res.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { name } = req.body;
    const user = await User.findByPk(req.user.userId);
    
    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }

    user.name = name || user.name;
    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    next(error);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findByPk(req.user.userId);
    
    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      const error = new Error('Current password is incorrect');
      error.status = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({
      message: 'Password changed successfully'
    });
  } catch (error) {
    next(error);
  }
};
