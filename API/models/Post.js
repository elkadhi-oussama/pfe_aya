const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: String,
    role: String,
    imageUrl: String,
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', PostSchema);
