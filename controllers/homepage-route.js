const express = require('express');
const router = express.Router();
const { Post } = require('../models/post'); // Update the import path to correctly reference the file where Post is exported

router.get('/', async (req, res) => {
  try {
    if (!Post) {
      throw new Error('Post model is undefined or not properly imported');
    }

    const posts = await Post.findAll();

    res.render('homepage', { posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;