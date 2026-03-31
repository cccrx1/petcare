/**
 * 健康监测相关路由
 */

const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');
const { authenticateToken } = require('../middleware/auth');

// 所有路由都需要认证
router.use(authenticateToken);

router.post('/records', healthController.createRecord);
router.get('/records/:petId', healthController.getRecords);
router.get('/trends/:petId', healthController.getTrends);
router.post('/iot-data', healthController.receiveIoTData);

module.exports = router;
