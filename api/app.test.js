// Import dependencies
const request = require('supertest'); // For HTTP testing
const app = require('./app'); // Express app
const jwt = require('jsonwebtoken');
const { SECRET } = require('./middleware/authorize'); // JWT secret key

// Generate tokens for different user roles
const userToken = jwt.sign({ id: "u1", role: "user" }, SECRET);   // Regular user
const adminToken = jwt.sign({ id: "u2", role: "admin" }, SECRET); // Admin user
const invalidToken = "invalid.token.here"; // Simulated invalid token

/**
 * Test suite for DELETE /posts/:id endpoint
 */
describe("DELETE /posts/:id", () => {

  /**
   * It should allow an admin to delete a post
   */
  it("should allow admin to delete", async () => {
    const res = await request(app)
      .delete("/posts/123") // Attempt to delete post with ID 123
      .set("Authorization", `Bearer ${adminToken}`); // Set valid admin token

    expect(res.status).toBe(200); // Expect successful response
    expect(res.body.message).toBe("Post 123 deleted"); // Confirm message
  });

  /**
   * It should forbid a regular user from deleting a post
   */
  it("should forbid user from deleting", async () => {
    const res = await request(app)
      .delete("/posts/123")
      .set("Authorization", `Bearer ${userToken}`); // Set valid user token

    expect(res.status).toBe(403); // Expect forbidden response
    expect(res.body.message).toBe("Forbidden"); // Confirm message
  });

  /**
   * It should reject requests with a missing or invalid token
   */
  it("should reject missing or invalid token", async () => {
    const res = await request(app)
      .delete("/posts/123")
      .set("Authorization", `Bearer ${invalidToken}`); // Set invalid token

    expect(res.status).toBe(401); // Expect unauthorized response
    expect(res.body.message).toMatch(/Invalid token/i); // Confirm error message
  });
});
