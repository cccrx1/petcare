/**
 * 配置管理模块
 */

const config = {
  // 服务器配置
  server: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development'
  },

  // 数据库配置
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || 'pet_care',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || ''
  },

  // InfluxDB配置
  influxdb: {
    url: process.env.INFLUXDB_URL || 'http://localhost:8086',
    token: process.env.INFLUXDB_TOKEN || '',
    org: process.env.INFLUXDB_ORG || 'pet_care',
    bucket: process.env.INFLUXDB_BUCKET || 'health_data'
  },

  // JWT配置
  jwt: {
    secret: process.env.JWT_SECRET || 'your_jwt_secret_key',
    expiresIn: process.env.JWT_EXPIRE || '24h',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'your_refresh_secret_key',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRE || '7d'
  },

  // Dify配置
  dify: {
    baseUrl: process.env.DIFY_BASE_URL || 'http://47.113.151.36//v1',
    apiKey: process.env.DIFY_API_KEY || ''
  },

  // 推送服务配置
  push: {
    apiKey: process.env.PUSH_SERVICE_API_KEY || ''
  },

  // CORS配置
  cors: {
    origin: process.env.CORS_ORIGIN || '*'
  },

  // 日志配置
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    dir: process.env.LOG_DIR || 'backend/logs'
  },

  // 文件上传配置
  upload: {
    dir: process.env.UPLOAD_DIR || 'uploads',
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 5242880 // 5MB
  }
};

module.exports = config;
