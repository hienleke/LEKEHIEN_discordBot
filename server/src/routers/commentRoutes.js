const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const { auth } = require("../middleware/authMiddleware");
router.post("/comment", auth, commentController.createComment);
router.get("/comments", auth, commentController.listComment);
router.put("/comment/status/:status", auth, commentController.changeCommentStatus);

module.exports = router;
