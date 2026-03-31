/**
 * 喂养方案相关路由
 */

const express = require('express');
const router = express.Router();
const feedingController = require('../controllers/feedingController');
const { authenticateToken } = require('../middleware/auth');

// 所有路由都需要认证
router.use(authenticateToken);

router.get('/plan/:petId', feedingController.getFeedingPlan);
router.post('/adjust/:petId', feedingController.adjustFeedingPlan);
router.get('/recipes/:petId', feedingController.getRecipes);

module.exports = router;
