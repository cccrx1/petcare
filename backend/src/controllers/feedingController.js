/**
 * 喂养方案控制器
 */

const { query } = require('../utils/db');
const logger = require('../utils/logger');

// 获取喂养方案
const getFeedingPlan = async (req, res, next) => {
  try {
    const { petId } = req.params;

    const result = await query(
      `SELECT fp.*, p.name as pet_name, p.weight, p.age, p.species
       FROM feeding_plans fp
       JOIN pets p ON fp.pet_id = p.id
       WHERE fp.pet_id = $1 AND p.user_id = $2
       ORDER BY fp.created_at DESC
       LIMIT 1`,
      [petId, req.user.userId]
    );

    if (result.rows.length === 0) {
      // 如果没有喂养方案，调用喂养智能体生成
      // await agentService.generateFeedingPlan(petId);
      return res.json({
        success: true,
        data: null,
        message: '暂无喂养方案，系统将自动生成'
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

// 调整喂养方案
const adjustFeedingPlan = async (req, res, next) => {
  try {
    const { petId } = req.params;
    const { weightChange, activityLevel, notes } = req.body;

    const result = await query(
      `INSERT INTO feeding_plans (pet_id, daily_calories, protein, fat, carbs, notes, created_by)
       VALUES ($1, 0, 0, 0, 0, $2, 'system')
       RETURNING *`,
      [petId, notes]
    );

    logger.info('Feeding plan adjusted', { petId });

    res.status(201).json({
      success: true,
      message: '喂养方案调整成功',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

// 获取食谱建议
const getRecipes = async (req, res, next) => {
  try {
    const { petId } = req.params;

    const result = await query(
      `SELECT * FROM recipes
       WHERE pet_id = $1
       ORDER BY created_at DESC`,
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
  getFeedingPlan,
  adjustFeedingPlan,
  getRecipes
};
