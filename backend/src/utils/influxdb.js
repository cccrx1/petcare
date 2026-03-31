/**
 * 时序数据库连接模块 - InfluxDB
 */

const { InfluxDB } = require('@influxdata/influxdb-client');
const { OrgsAPI } = require('@influxdata/influxdb-client-apis');
const config = require('../config');
const logger = require('./logger');

// 创建InfluxDB客户端
const influxDB = new InfluxDB({
  url: config.influxdb.url,
  token: config.influxdb.token
});

// 获取写入API
const writeApi = influxDB.getWriteApi(
  config.influxdb.org,
  config.influxdb.bucket
);

// 设置默认标签
writeApi.useDefaultTags({
  source: 'pet-care-system'
});

// 获取查询API
const queryApi = influxDB.getQueryApi(config.influxdb.org);

// 写入数据
const writePoint = async (point) => {
  try {
    writeApi.writePoint(point);
    await writeApi.flush();
    logger.debug('Data written to InfluxDB', {
      measurement: point.measurement,
      fields: Object.keys(point.fields)
    });
  } catch (error) {
    logger.error('InfluxDB write error', { error: error.message });
    throw error;
  }
};

// 批量写入数据
const writePoints = async (points) => {
  try {
    writeApi.writePoints(points);
    await writeApi.flush();
    logger.debug('Batch data written to InfluxDB', { count: points.length });
  } catch (error) {
    logger.error('InfluxDB batch write error', { error: error.message });
    throw error;
  }
};

// 查询数据
const query = async (fluxQuery) => {
  try {
    const result = [];
    await queryApi.queryRows(fluxQuery, {
      next(row, tableMeta) {
        const o = tableMeta.toObject(row);
        result.push(o);
      },
      error(error) {
        logger.error('InfluxDB query error', { error: error.message });
        throw error;
      },
      complete() {
        logger.debug('InfluxDB query completed', { count: result.length });
      }
    });
    return result;
  } catch (error) {
    logger.error('InfluxDB query error', { error: error.message });
    throw error;
  }
};

// 关闭连接
const close = async () => {
  try {
    await writeApi.close();
    logger.info('InfluxDB connection closed');
  } catch (error) {
    logger.error('InfluxDB close error', { error: error.message });
  }
};

module.exports = {
  influxDB,
  writeApi,
  queryApi,
  writePoint,
  writePoints,
  query,
  close
};
