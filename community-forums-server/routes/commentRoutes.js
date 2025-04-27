const express = require('express');
const Comment = require('../models/Comment');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Post a comment
router.post('/:forumId', verifyToken, async (req, res) => {
  const { content } = req.body;
  const newComment = new Comment({ content, user: req.user.id, forum: req.params.forumId });
  await newComment.save();
  res.status(201).json(newComment);
});

// Delete a comment
router.delete('/:id', verifyToken, async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (comment.user.toString() !== req.user.id) return res.status(403).json({ message: "You can only delete your own comments" });
  await comment.remove();
  res.json({ message: 'Comment deleted' });
});

module.exports = router;
