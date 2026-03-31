/**
 * 健康监测相关路由 - 简化版
 */

const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');

// 所有路由通过sessionId验证
router.post('/records', healthController.createRecord);
router.get('/records/:petId', healthController.getRecords);
router.get('/trends/:petId', healthController.getTrends);

module.exports = router;
