const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access token required' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  console.log(req.user.role !== 'admin' && req.user.role !== "manager")
  if (req.user.role !== 'admin' && req.user.role !== "manager") return res.status(403).json({ message: 'Admin access required' });
  next();
};
