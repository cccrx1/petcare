/**
 * 预警控制器
 */

const { query } = require('../utils/db');
const logger = require('../utils/logger');

// 获取预警列表
const getAlerts = async (req, res, next) => {
  try {
    const { status, limit = 50 } = req.query;

    let queryText = `
      SELECT a.*, p.name as pet_name, p.species
      FROM alerts a
      JOIN pets p ON a.pet_id = p.id
      WHERE p.user_id = $1
    `;
    const params = [req.user.userId];
    let paramCount = 1;

    if (status) {
      paramCount++;
      queryText += ` AND a.status = $${paramCount}`;
      params.push(status);
    }

    queryText += ` ORDER BY a.created_at DESC LIMIT $${paramCount + 1}`;
    params.push(parseInt(limit));

    const result = await query(queryText, params);

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
};

// 获取预警详情
const getAlertById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(
      `SELECT a.*, p.name as pet_name, p.species
       FROM alerts a
       JOIN pets p ON a.pet_id = p.id
       WHERE a.id = $1 AND p.user_id = $2`,
      [id, req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'ALERT_NOT_FOUND',
        message: '预警不存在'
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

// 标记预警已读
const markAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(
      `UPDATE alerts
       SET status = 'read'
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'ALERT_NOT_FOUND',
        message: '预警不存在'
      });
    }

    res.json({
      success: true,
      message: '预警已标记为已读',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

// 忽略预警
const dismissAlert = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(
      `UPDATE alerts
       SET status = 'dismissed'
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'ALERT_NOT_FOUND',
        message: '预警不存在'
      });
    }

    logger.info('Alert dismissed', { alertId: id });

    res.json({
      success: true,
      message: '预警已忽略',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAlerts,
  getAlertById,
  markAsRead,
  dismissAlert
};
