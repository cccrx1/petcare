/**
 * 宠物档案相关路由
 */

const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const { authenticateToken } = require('../middleware/auth');

// 所有路由都需要认证
router.use(authenticateToken);

router.post('/', petController.createPet);
router.get('/', petController.getPets);
router.get('/:id', petController.getPetById);
router.put('/:id', petController.updatePet);
router.delete('/:id', petController.deletePet);
router.get('/:id/medical-records', petController.getMedicalRecords);
router.post('/:id/medical-records', petController.addMedicalRecord);

module.exports = router;
