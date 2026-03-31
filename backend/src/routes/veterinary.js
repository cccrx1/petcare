/**
 * 兽医咨询相关路由
 */

const express = require('express');
const router = express.Router();
const veterinaryController = require('../controllers/veterinaryController');
const { authenticateToken } = require('../middleware/auth');

// 所有路由都需要认证
router.use(authenticateToken);

router.post('/consultation', veterinaryController.createConsultation);
router.get('/consultations/:petId', veterinaryController.getConsultations);
router.post('/appointment', veterinaryController.createAppointment);
router.get('/appointments', veterinaryController.getAppointments);
router.get('/records/:petId', veterinaryController.getMedicalRecords);

module.exports = router;
