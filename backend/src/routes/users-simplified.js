/**
 * 用户相关路由 - 简化版
 * 移除JWT认证中间件
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController-simplified');

// 公开路由（无需认证）
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);
router.post('/logout', userController.logout);

module.exports = router;
