/**
 * AI宠物健康管理系统 - 简化版服务器入口
 * 移除数据库依赖，使用本地文件存储
 * 移除JWT认证，简化部署
 */

require('dotenv').config({ path: '.env.simplified' });
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const logger = require('./utils/logger');
const config = require('./config');

// 导入路由
const userRoutes = require('./routes/users');
const petRoutes = require('./routes/pets');
const healthRoutes = require('./routes/health');
const chatRoutes = require('./routes/chat');

// 导入中间件
const errorHandler = require('./middleware/errorHandler');

// 创建Express应用
const app = express();

// 全局中间件
app.use(helmet()); // 安全头
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 限流中间件
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15分钟
    max: 100 // 每个IP最多100个请求
});
app.use('/api', limiter);

// 请求日志中间件
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.path}`, {
        ip: req.ip,
        userAgent: req.get('user-agent')
    });
    next();
});

// 健康检查端点
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        version: '1.0.0-simplified'
    });
});

// API路由
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/pets', petRoutes);
app.use('/api/v1/health', healthRoutes);
app.use('/api/v1/chat', chatRoutes);

// 静态文件服务（前端）
app.use(express.static('frontend'));

// 404处理
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Cannot ${req.method} ${req.path}`
    });
});

// 错误处理中间件
app.use(errorHandler);

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
    logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
    logger.info(`Data directory: ${config.dataDir || './data'}`);
    logger.info(`Simplified version - No database required`);
});

// 优雅关闭
process.on('SIGTERM', () => {
    logger.info('SIGTERM signal received: closing HTTP server');
    process.exit(0);
});

module.exports = { app };
