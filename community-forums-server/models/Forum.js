const mongoose = require('mongoose');

const forumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tags: { type: [String], default: [] },
  upvotes: { type: Number, default: 0 },
}, { timestamps: true });

const Forum = mongoose.model('Forum', forumSchema);
module.exports = Forum;
