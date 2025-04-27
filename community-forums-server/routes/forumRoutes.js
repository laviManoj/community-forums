const express = require('express');
const Forum = require('../models/Forum');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Get all forums
router.get('/', async (req, res) => {
  const forums = await Forum.find();
  res.json(forums);
});

// Create a new forum
router.post('/', verifyToken, async (req, res) => {
  const { title, description, tags } = req.body;
  const newForum = new Forum({ title, description, tags, creator: req.user.id });
  await newForum.save();
  res.status(201).json(newForum);
});

// Upvote a forum
router.put('/upvote/:id', verifyToken, async (req, res) => {
  const forum = await Forum.findById(req.params.id);
  forum.upvotes += 1;
  await forum.save();
  res.json(forum);
});

module.exports = router;
