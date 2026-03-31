/**
 * 兽医咨询控制器
 */

const { query } = require('../utils/db');
const logger = require('../utils/logger');

// 创建咨询
const createConsultation = async (req, res, next) => {
  try {
    const { petId, symptoms, description, images } = req.body;

    const result = await query(
      `INSERT INTO consultations (pet_id, symptoms, description, images, user_id, status)
       VALUES ($1, $2, $3, $4, $5, 'pending')
       RETURNING *`,
      [petId, symptoms, description, images, req.user.userId]
    );

    logger.info('Consultation created', { consultationId: result.rows[0].id, petId });

    // 触发兽医智能体进行初步诊断
    // await agentService.triggerVeterinaryAgent(result.rows[0].id);

    res.status(201).json({
      success: true,
      message: '咨询创建成功',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

// 获取咨询列表
const getConsultations = async (req, res, next) => {
  try {
    const { petId } = req.params;

    const result = await query(
      `SELECT c.*, p.name as pet_name
       FROM consultations c
       JOIN pets p ON c.pet_id = p.id
       WHERE c.pet_id = $1 AND p.user_id = $2
       ORDER BY c.created_at DESC`,
      [petId, req.user.userId]
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
};

// 创建预约
const createAppointment = async (req, res, next) => {
  try {
    const { petId, hospitalId, serviceType, appointmentDate, notes } = req.body;

    const result = await query(
      `INSERT INTO appointments (pet_id, hospital_id, service_type, appointment_date, notes, user_id, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'scheduled')
       RETURNING *`,
      [petId, hospitalId, serviceType, appointmentDate, notes, req.user.userId]
    );

    logger.info('Appointment created', { appointmentId: result.rows[0].id, petId });

    res.status(201).json({
      success: true,
      message: '预约创建成功',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

// 获取预约列表
const getAppointments = async (req, res, next) => {
  try {
    const { status } = req.query;

    let queryText = `
      SELECT a.*, p.name as pet_name, h.name as hospital_name
      FROM appointments a
      JOIN pets p ON a.pet_id = p.id
      LEFT JOIN hospitals h ON a.hospital_id = h.id
      WHERE p.user_id = $1
    `;
    const params = [req.user.userId];

    if (status) {
      queryText += ` AND a.status = $2`;
      params.push(status);
    }

    queryText += ` ORDER BY a.appointment_date ASC`;

    const result = await query(queryText, params);

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
};

// 获取病历
const getMedicalRecords = async (req, res, next) => {
  try {
    const { petId } = req.params;

    const result = await query(
      `SELECT * FROM medical_records
       WHERE pet_id = $1
       ORDER BY date DESC`,
      [petId]
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createConsultation,
  getConsultations,
  createAppointment,
  getAppointments,
  getMedicalRecords
};
