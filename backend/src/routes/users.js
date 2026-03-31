/**
 * 用户相关路由
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth');

// 公开路由
router.post('/register', userController.register);
router.post('/login', userController.login);

// 需要认证的路由
router.use(authenticateToken);
router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);
router.put('/password', userController.changePassword);
router.post('/refresh-token', userController.refreshToken);
router.post('/logout', userController.logout);

module.exports = router;
