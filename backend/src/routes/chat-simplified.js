/**
 * 聊天相关路由 - 简化版
 */

const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// 所有路由通过sessionId验证
router.post('/message', chatController.sendMessage);
router.get('/history', chatController.getHistory);

module.exports = router;
