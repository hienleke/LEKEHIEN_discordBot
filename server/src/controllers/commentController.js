const Comment = require("../models/comment");
const log4js = require("log4js");
const logger = log4js.getLogger("default");

exports.createComment = async (req, res) => {
     try {
          const { comment, userId, username, channelId } = req.body;

          logger.info(`Received feedback: ${JSON.stringify(req.body)} from user ${userId} in channel ${channelId}`);
          const newComment = new Comment({
               comment: comment,
               userId,
               username,
               channelId,
               status: "new",
               statusEventTime: new Date(),
          });
          await newComment.save();
          res.status(200).json(newComment);
     } catch (error) {
          res.status(500).json({ error: error.message });
     }
};

exports.listComment = async (req, res) => {
     try {
          const comments = await Comment.find();
          res.json(comments);
     } catch (error) {
          res.status(500).json({ error: error.message });
     }
};

exports.changeCommentStatus = async (req, res) => {
     try {
          const { status } = req.params;
          const { id } = req.body;

          // Log the received comment status update data
          logger.info(`Received request to update comment status. ID: ${id}, New Status: ${status}`);

          // Validate if the provided status is valid
          if (status !== "new" && status !== "resolved") {
               return res.status(400).json({ success: false, error: "Invalid status provided" });
          }

          // Update comment status using Mongoose
          const updatedComment = await Comment.findByIdAndUpdate(id, { status }, { new: true });

          if (!updatedComment) {
               // Comment with the given ID not found
               return res.status(404).json({ success: false, error: "Comment not found" });
          }

          res.json({ success: true, comment: updatedComment });
     } catch (error) {
          res.status(500).json({ error: error.message });
     }
};
