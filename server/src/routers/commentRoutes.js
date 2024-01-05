const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

router.post("/comment", commentController.createComment);
router.get("/comments", commentController.listComment);
router.put("/comment/status/:status", commentController.changeCommentStatus);

module.exports = router;
