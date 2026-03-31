/**
 * 社区资讯相关路由
 */

const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController');
const { authenticateToken } = require('../middleware/auth');

// 所有路由都需要认证
router.use(authenticateToken);

router.get('/feed', communityController.getFeed);
router.post('/posts', communityController.createPost);
router.get('/posts/:postId/comments', communityController.getComments);
router.post('/posts/:postId/comments', communityController.addComment);
router.get('/news', communityController.getNews);

module.exports = router;
