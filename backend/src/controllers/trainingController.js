/**
 * 行为训练控制器
 */

const { query } = require('../utils/db');
const logger = require('../utils/logger');

// 获取行为问题库
const getProblems = async (req, res, next) => {
  try {
    const { species } = req.query;

    let queryText = 'SELECT * FROM behavior_problems';
    const params = [];

    if (species) {
      queryText += ' WHERE species = $1';
      params.push(species);
    }

    queryText += ' ORDER BY name';

    const result = await query(queryText, params);

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
};

// 获取纠正方案
const getSolution = async (req, res, next) => {
  try {
    const { problemId } = req.params;

    const result = await query(
      'SELECT * FROM behavior_solutions WHERE problem_id = $1',
      [problemId]
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
};

// 创建训练计划
const createPlan = async (req, res, next) => {
  try {
    const { petId, problemId, startDate, duration } = req.body;

    const result = await query(
      `INSERT INTO training_plans (pet_id, problem_id, start_date, duration, user_id, status)
       VALUES ($1, $2, $3, $4, $5, 'active')
       RETURNING *`,
      [petId, problemId, startDate, duration, req.user.userId]
    );

    logger.info('Training plan created', { planId: result.rows[0].id, petId });

    res.status(201).json({
      success: true,
      message: '训练计划创建成功',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

// 训练打卡
const checkIn = async (req, res, next) => {
  try {
    const { planId } = req.params;
    const { notes, rating } = req.body;

    const result = await query(
      `INSERT INTO training_checkins (plan_id, notes, rating, checkin_date)
       VALUES ($1, $2, $3, CURRENT_DATE)
       RETURNING *`,
      [planId, notes, rating]
    );

    logger.info('Training check-in', { planId });

    res.status(201).json({
      success: true,
      message: '打卡成功',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProblems,
  getSolution,
  createPlan,
  checkIn
};
