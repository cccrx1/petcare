/**
 * 聊天相关路由
 */

const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const { authenticateToken } = require('../middleware/auth');

// 所有路由都需要认证
router.use(authenticateToken);

router.post('/message', chatController.sendMessage);
router.get('/history', chatController.getHistory);

module.exports = router;
