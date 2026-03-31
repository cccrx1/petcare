/**
 * 宠物档案相关路由 - 简化版
 */

const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController-simplified');

// 所有路由通过sessionId验证
router.post('/', petController.createPet);
router.get('/', petController.getPets);
router.get('/:id', petController.getPetById);
router.put('/:id', petController.updatePet);
router.delete('/:id', petController.deletePet);

module.exports = router;
