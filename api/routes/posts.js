// Import required modules
const express = require('express');
const router = express.Router();
const { authorize } = require('../middleware/authorize'); // Authorization middleware

// Dummy data to simulate a feed of posts
const allPosts = Array.from({ length: 100 }).map((_, i) => ({
  id: i + 1,
  author: `u ${i + 1}`,
  content: `This is post number ${i + 1}`,
}));

/**
 * GET /feed
 * Protected route to fetch a paginated feed of posts.
 * Accessible by users with roles: "user" or "admin".
 */
router.get('/feed', authorize(["user", "admin"]), (req, res) => {
  // Parse pagination parameters from query (default: page=0, limit=10)
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;

  // Calculate the starting index for slicing
  const start = page * limit;

  // Slice the dummy posts array to return paginated results
  const paginatedPosts = allPosts.slice(start, start + limit);

  // Respond with the selected posts
  res.json(paginatedPosts);
});

/**
 * DELETE /posts/:id
 * Protected route to delete a post by ID.
 * Accessible only by users with the "admin" role.
 */
router.delete('/posts/:id', authorize(["admin"]), (req, res) => {
  // Simulate deletion logic (no actual data modification here)
  res.status(200).json({ message: `Post ${req.params.id} deleted` });
});

// Export the router to be used in the main application
module.exports = router;
