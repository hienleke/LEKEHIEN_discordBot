const request = require("supertest");
const app = require("../app"); // Update the path accordingly

describe("Comment API Endpoints", () => {
     it("should create a new comment", async () => {
          const commentData = {
               comment: "Test comment",
               userId: "user123",
               username: "testuser",
               channelId: "channel123",
          };

          const createRes = await request(app).post("/comment").send(commentData);

          expect(createRes.statusCode).toBe(200);
          expect(createRes.body).toHaveProperty("comment");
          // Additional assertions if needed

          // Store the created comment ID for later use
          const commentId = createRes.body.comment._id;

          // Now, test listing comments
          const listRes = await request(app).get("/comments");
          expect(listRes.statusCode).toBe(200);
          expect(listRes.body.length).toBeGreaterThan(0);
          // Additional assertions if needed

          // Now, test changing comment status
          const newStatus = "resolved";
          const statusRes = await request(app).put(`/comment/status/${newStatus}`).send({ id: commentId });

          expect(statusRes.statusCode).toBe(200);
          expect(statusRes.body.success).toBe(true);
          expect(statusRes.body.comment).toHaveProperty("status", newStatus);
          // Additional assertions if needed

          // Test handling invalid status
          const invalidStatus = "invalid";
          const invalidStatusRes = await request(app).put(`/comment/status/${invalidStatus}`).send({ id: commentId });

          expect(invalidStatusRes.statusCode).toBe(400);
          expect(invalidStatusRes.body.success).toBe(false);
          expect(invalidStatusRes.body).toHaveProperty("error", "Invalid status provided");
     });

     afterAll(async () => {
          // Perform any cleanup or logging needed after all tests are done
          console.log("All tests are done!");

          // For example, you might want to delete the created comment
          if (commentId) {
               // Add logic to delete the comment, e.g., using your API endpoint
               await request(app).delete(`/comment/${commentId}`);
          }
     });
});
