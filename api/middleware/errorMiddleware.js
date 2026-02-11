module.exports = (err, req, res, next) => {
  console.error('Error occurred:', err.stack);
  
  const status = err.status || 500;
  let message = err.message || 'Internal Server Error';
  
  // Handle specific database errors
  if (err.name === 'SequelizeConnectionError') {
    message = 'Database connection error. Please try again later.';
    console.error('Database connection issue:', err.message);
  } else if (err.name === 'SequelizeValidationError') {
    message = err.errors?.[0]?.message || 'Validation error';
    console.error('Validation error:', err.errors);
  } else if (err.name === 'JsonWebTokenError') {
    message = 'Invalid token';
  } else if (err.name === 'TokenExpiredError') {
    message = 'Token expired';
  }
  
  // Don't expose sensitive error details in production
  if (process.env.NODE_ENV === 'production' && status === 500) {
    message = 'Server error. Please try again later.';
  }
  
  res.status(status).json({ 
    success: false,
    message, 
    status,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
};
