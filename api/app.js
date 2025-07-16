// Import required modules
const express = require('express');
const jwt = require('jsonwebtoken');
const users = require('./users'); // Simulated user database
const { SECRET } = require('./middleware/authorize'); // JWT secret key
const postsRouter = require('./routes/posts'); // Router for /feed and /posts endpoints

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// CORS middleware to allow cross-origin requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS"); // Allowed HTTP methods
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allowed headers
  next(); // Proceed to next middleware/route handler
});

/**
 * POST /login
 * Authenticates a user based on ID and returns a JWT if valid.
 */
app.post('/login', (req, res) => {
  const { id } = req.body;

  // Find the user by ID from the dummy user list
  const user = users.find(u => u.id === id);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  // Create and sign a JWT with the user’s ID and role, valid for 1 hour
  const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '1h' });

  // Send the token to the client
  res.json({ token });
});

// Mount the posts router to handle feed and post-related routes
app.use(postsRouter);

// Export the app (used for testing or external imports)
module.exports = app;

// If this file is run directly, start the Express server
if (require.main === module) {
  app.listen(3000, () => console.log('Server running on port 3000'));
}
