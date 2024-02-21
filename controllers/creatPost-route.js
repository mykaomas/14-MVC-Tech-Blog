const express = require('express');
const router = express.Router();
const { Post } = require('../models/post');

router.post('/create-post', async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.session.userId;
    await Post.create({ title, content, userId });
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;