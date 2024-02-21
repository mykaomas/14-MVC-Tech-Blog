const express = require('express');
const router = express.Router();
const { Post } = require('../models/post');

router.get('/dashboard', async (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect('/login');
  }
  try {
    const userId = req.session.userId;
    const userPosts = await Post.findAll({ where: { userId } });
    res.render('dashboard', { userPosts });
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;