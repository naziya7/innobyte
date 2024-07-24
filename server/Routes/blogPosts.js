// routes/blogPosts.js
const express = require('express');
const router = express.Router();
const BlogPost = require('../Models/BlogPost');

// Create a blog post
router.post('/create', async (req, res) => {
    try {
      const blogPost = new BlogPost(req.body);
      await blogPost.save();
      res.status(201).json(blogPost);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Fetch all blog posts
  router.get('/posts', async (req, res) => {
    try {
      const posts = await BlogPost.find();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update a blog post
  router.put('/edit/:id', async (req, res) => {
    try {
      const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete a blog post
  router.delete('/delete/:id', async (req, res) => {
    try {
      await BlogPost.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  module.exports = router;