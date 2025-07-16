// Import the jsonwebtoken library to handle JWT operations
const jwt = require('jsonwebtoken');

// Secret key used to sign and verify JWT tokens
const SECRET = "D8#fK9w!sR3@zL1vX0uTqN7aB4pMhE2c";

/**
 * Middleware to authorize access based on user roles.
 * 
 * @param {Array} roles - List of roles permitted to access the route.
 * @returns {Function} Express middleware function.
 */
function authorize(roles = []) {
  return (req, res, next) => {
    // Extract the Authorization header from the request
    const authHeader = req.headers.authorization;

    // Validate the presence and format of the Authorization header
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Missing or invalid token" });
    }

    // Extract the token from the header
    const token = authHeader.split(" ")[1];

    try {
      // Verify the token using the secret key
      const decoded = jwt.verify(token, SECRET);
      
      // Check if the user's role is included in the allowed roles
      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden" }); // User not authorized
      }

      // Proceed to the next middleware or route handler
      next();
    } catch (err) {
      // Token verification failed (e.g., expired or tampered)
      return res.status(401).json({ message: "Invalid token" });
    }
  };
}

// Export the authorize middleware and the secret key
module.exports = { authorize, SECRET };