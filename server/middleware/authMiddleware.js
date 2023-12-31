const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get the token from the request header or query parameter or cookie
  const token = req.header('token');

  if (!token) {
    return res.status(401).json({ message: 'Authorization denied. Token not found.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'your-secret-key');

    // Attach the user ID to the request object
    req.userId = decoded.userId;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authorization denied. Invalid token.' });
  }
};

module.exports = authMiddleware;