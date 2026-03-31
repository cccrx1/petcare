/**
 * 宠物档案控制器
 */

const { query } = require('../utils/db');
const logger = require('../utils/logger');

// 创建宠物档案
const createPet = async (req, res, next) => {
  try {
    const { name, species, breed, age, weight, gender, isNeutered, birthDate } = req.body;

    const result = await query(
      `INSERT INTO pets (user_id, name, species, breed, age, weight, gender, is_neutered, birth_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [req.user.userId, name, species, breed, age, weight, gender, isNeutered, birthDate]
    );

    logger.info('Pet created', { petId: result.rows[0].id, userId: req.user.userId });

    res.status(201).json({
      success: true,
      message: '宠物档案创建成功',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

// 获取用户的所有宠物
const getPets = async (req, res, next) => {
  try {
    const result = await query(
      'SELECT * FROM pets WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.userId]
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
};

// 获取单个宠物详情
const getPetById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(
      'SELECT * FROM pets WHERE id = $1 AND user_id = $2',
      [id, req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'PET_NOT_FOUND',
        message: '宠物不存在'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

// 更新宠物档案
const updatePet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, species, breed, age, weight, gender, isNeutered, birthDate } = req.body;

    const result = await query(
      `UPDATE pets
       SET name = $1, species = $2, breed = $3, age = $4, weight = $5, gender = $6, is_neutered = $7, birth_date = $8
       WHERE id = $9 AND user_id = $10
       RETURNING *`,
      [name, species, breed, age, weight, gender, isNeutered, birthDate, id, req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'PET_NOT_FOUND',
        message: '宠物不存在'
      });
    }

    logger.info('Pet updated', { petId: id, userId: req.user.userId });

    res.json({
      success: true,
      message: '宠物档案更新成功',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

// 删除宠物档案
const deletePet = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(
      'DELETE FROM pets WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'PET_NOT_FOUND',
        message: '宠物不存在'
      });
    }

    logger.info('Pet deleted', { petId: id, userId: req.user.userId });

    res.json({
      success: true,
      message: '宠物档案删除成功'
    });
  } catch (error) {
    next(error);
  }
};

// 获取宠物医疗记录
const getMedicalRecords = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(
      'SELECT * FROM medical_records WHERE pet_id = $1 ORDER BY date DESC',
      [id]
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
};

// 添加医疗记录
const addMedicalRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { type, description, date, doctor, notes } = req.body;

    const result = await query(
      `INSERT INTO medical_records (pet_id, type, description, date, doctor, notes)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [id, type, description, date, doctor, notes]
    );

    logger.info('Medical record added', { petId: id, recordId: result.rows[0].id });

    res.status(201).json({
      success: true,
      message: '医疗记录添加成功',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPet,
  getPets,
  getPetById,
  updatePet,
  deletePet,
  getMedicalRecords,
  addMedicalRecord
};
