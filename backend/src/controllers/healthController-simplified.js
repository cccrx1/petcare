/**
 * 健康监测控制器 - 简化版
 * 使用本地文件存储，不依赖数据库
 */

const storage = require('../utils/fileStorage');
const logger = require('../utils/logger');

// 创建健康监测记录
const createRecord = async (req, res, next) => {
  try {
    const { sessionId } = req.query;
    const { petId, type, value, unit, notes } = req.body;

    if (!sessionId) {
      return res.status(401).json({
        success: false,
        error: 'UNAUTHORIZED',
        message: '未授权'
      });
    }

    const record = await storage.add('health_records', {
      petId,
      type,
      value,
      unit,
      notes,
      recordedAt: new Date().toISOString()
    });

    logger.info('Health record created', { petId, type, value });

    res.status(201).json({
      success: true,
      message: '健康记录创建成功',
      data: record
    });
  } catch (error) {
    next(error);
  }
};

// 获取健康记录
const getRecords = async (req, res, next) => {
  try {
    const { sessionId } = req.query;
    const { petId } = req.params;
    const { type, limit = 50 } = req.query;

    if (!sessionId) {
      return res.status(401).json({
        success: false,
        error: 'UNAUTHORIZED',
        message: '未授权'
      });
    }

    let records = await storage.find('health_records', record => record.petId === petId);

    if (type) {
      records = records.filter(record => record.type === type);
    }

    // 按时间倒序排列
    records.sort((a, b) => new Date(b.recordedAt) - new Date(a.recordedAt));

    // 限制返回数量
    if (records.length > parseInt(limit)) {
      records = records.slice(0, parseInt(limit));
    }

    res.json({
      success: true,
      data: records
    });
  } catch (error) {
    next(error);
  }
};

// 获取健康趋势
const getTrends = async (req, res, next) => {
  try {
    const { sessionId } = req.query;
    const { petId } = req.params;
    const { type = 'weight', days = 30 } = req.query;

    if (!sessionId) {
      return res.status(401).json({
        success: false,
        error: 'UNAUTHORIZED',
        message: '未授权'
      });
    }

    const records = await storage.find('health_records', record => 
      record.petId === petId && record.type === type
    );

    // 按时间正序排列
    records.sort((a, b) => new Date(a.recordedAt) - new Date(b.recordedAt));

    // 返回最近N天的数据
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - parseInt(days));
    
    const recentRecords = records.filter(record => 
      new Date(record.recordedAt) >= cutoffDate
    );

    res.json({
      success: true,
      data: {
        type,
        days,
        records: recentRecords,
        count: recentRecords.length
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRecord,
  getRecords,
  getTrends
};
