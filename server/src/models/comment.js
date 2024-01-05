const mongoose = require("mongoose");

const comment = new mongoose.Schema({
     commentId: { type: String, unique: true },
     comment: String,
     userId: String,
     username: String,
     channelId: String,
     status: String,
     statusEventTime: Date,
});

const Comment = mongoose.model("comment", comment);

module.exports = Comment;
