// Install the necessary packages: npm install express mongoose
require("dotenv").config({ path: "../env" });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });
const app = express();
const port = 3000;

const DB_URL = process.env.DB_URL || "localhost";

// Connect to MongoDB
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// Define Comment schema
const commentSchema = new mongoose.Schema({
     comment: String,
     userId: String,
     username: String,
     channelId: String,
     status: String,
     statusEventTime: Date,
});

const Comment = mongoose.model("Comment", commentSchema);

app.use(bodyParser.json());

// API routes
app.post("/api/comment", async (req, res) => {
     const { comment, userId, username, channelId } = req.body;
     const newComment = new Comment({
          comment,
          userId,
          username,
          channelId,
          status: "new",
          statusEventTime: new Date(),
     });
     await newComment.save();
     res.json(newComment);
});

app.get("/api/comments", async (req, res) => {
     const comments = await Comment.find();
     res.json(comments);
});

app.put("/api/comment/status/:status", async (req, res) => {
     const { status } = req.params;
     // Update the comment status logic here
     res.json({ message: `Comment status changed to ${status}` });
});

// Start the server
app.listen(port, () => {
     console.log(`Server is running at http://localhost:${port}`);
});
