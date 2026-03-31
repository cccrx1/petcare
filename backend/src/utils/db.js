/**
 * 数据库连接模块 - PostgreSQL
 */

const { Pool } = require('pg');
const config = require('../config');
const logger = require('./logger');

// 创建连接池
const pool = new Pool({
  host: config.database.host,
  port: config.database.port,
  database: config.database.database,
  user: config.database.user,
  password: config.database.password,
  max: 20, // 最大连接数
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

// 测试连接
pool.on('connect', () => {
  logger.info('PostgreSQL database connected');
});

pool.on('error', (err) => {
  logger.error('PostgreSQL database error', { error: err.message });
});

// 查询函数
const query = async (text, params) => {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    logger.debug('Executed query', {
      text,
      duration,
      rows: result.rowCount
    });
    return result;
  } catch (error) {
    logger.error('Query error', {
      text,
      error: error.message
    });
    throw error;
  }
};

// 获取客户端
const getClient = async () => {
  const client = await pool.connect();
  return client;
};

// 关闭连接池
const close = async () => {
  await pool.end();
  logger.info('PostgreSQL connection pool closed');
};

module.exports = {
  pool,
  query,
  getClient,
  close
};
