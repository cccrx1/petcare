/**
 * 行为训练相关路由
 */

const express = require('express');
const router = express.Router();
const trainingController = require('../controllers/trainingController');
const { authenticateToken } = require('../middleware/auth');

// 所有路由都需要认证
router.use(authenticateToken);

router.get('/problems', trainingController.getProblems);
router.get('/solution/:problemId', trainingController.getSolution);
router.post('/plan', trainingController.createPlan);
router.post('/check-in/:planId', trainingController.checkIn);

module.exports = router;
