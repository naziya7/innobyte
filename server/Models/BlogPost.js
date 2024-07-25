const mongoose = require('mongoose');
const blogPostSchema = new mongoose.Schema({
  thumbnail: String,
  category: String,
  title: String,
  desc: String,
  authorID: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BlogPost', blogPostSchema);






