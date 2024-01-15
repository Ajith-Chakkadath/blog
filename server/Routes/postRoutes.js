const express = require('express');
const { addPost, getAllPosts } = require('../Controller/postContoller');
const authenticateToken = require('../MiddleWare/authentication');

const router = express.Router();

router.post('/posts', authenticateToken, addPost);
router.get('/posts', getAllPosts);

module.exports = router;
