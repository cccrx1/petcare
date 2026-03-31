/**
 * 预警相关路由
 */

const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');
const { authenticateToken } = require('../middleware/auth');

// 所有路由都需要认证
router.use(authenticateToken);

router.get('/', alertController.getAlerts);
router.get('/:id', alertController.getAlertById);
router.put('/:id/read', alertController.markAsRead);
router.put('/:id/dismiss', alertController.dismissAlert);

module.exports = router;
