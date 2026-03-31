/**
 * 健康监测控制器
 */

const { query } = require('../utils/db');
const { writePoint } = require('../utils/influxdb');
const { Point } = require('@influxdata/influxdb-client');
const logger = require('../utils/logger');

// 创建健康监测记录
const createRecord = async (req, res, next) => {
  try {
    const { petId, type, value, unit, notes } = req.body;

    // 写入PostgreSQL
    const pgResult = await query(
      `INSERT INTO health_records (pet_id, type, value, unit, notes)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [petId, type, value, unit, notes]
    );

    // 写入InfluxDB用于时序分析
    const point = new Point('health_data')
      .tag('pet_id', petId.toString())
      .tag('type', type)
      .floatField('value', value)
      .stringField('unit', unit);

    await writePoint(point);

    logger.info('Health record created', { petId, type, value });

    res.status(201).json({
      success: true,
      message: '健康记录创建成功',
      data: pgResult.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

// 获取健康记录
const getRecords = async (req, res, next) => {
  try {
    const { petId } = req.params;
    const { type, startDate, endDate, limit = 50 } = req.query;

    let queryText = 'SELECT * FROM health_records WHERE pet_id = $1';
    const params = [petId];
    let paramCount = 1;

    if (type) {
      paramCount++;
      queryText += ` AND type = $${paramCount}`;
      params.push(type);
    }

    if (startDate) {
      paramCount++;
      queryText += ` AND created_at >= $${paramCount}`;
      params.push(startDate);
    }

    if (endDate) {
      paramCount++;
      queryText += ` AND created_at <= $${paramCount}`;
      params.push(endDate);
    }

    queryText += ` ORDER BY created_at DESC LIMIT $${paramCount + 1}`;
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

// 获取健康趋势
const getTrends = async (req, res, next) => {
  try {
    const { petId } = req.params;
    const { type = 'weight', days = 30 } = req.query;

    // 这里应该从InfluxDB查询时序数据
    // 暂时返回模拟数据
    const trends = {
      type,
      days,
      data: []
    };

    res.json({
      success: true,
      data: trends
    });
  } catch (error) {
    next(error);
  }
};

// 接收IoT设备数据
const receiveIoTData = async (req, res, next) => {
  try {
    const { deviceId, petId, dataType, value, timestamp } = req.body;

    // 验证设备
    const deviceResult = await query(
      'SELECT * FROM iot_devices WHERE device_id = $1 AND pet_id = $2',
      [deviceId, petId]
    );

    if (deviceResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'DEVICE_NOT_FOUND',
        message: '设备不存在或未绑定'
      });
    }

    // 写入InfluxDB
    const point = new Point('iot_data')
      .tag('device_id', deviceId)
      .tag('pet_id', petId.toString())
      .tag('data_type', dataType)
      .floatField('value', value)
      .timestamp(new Date(timestamp));

    await writePoint(point);

    logger.info('IoT data received', { deviceId, petId, dataType, value });

    // 触发异常检测工作流（这里应该调用工作流引擎）
    // await workflowService.triggerAnomalyDetection(petId);

    res.json({
      success: true,
      message: '数据接收成功'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRecord,
  getRecords,
  getTrends,
  receiveIoTData
};
