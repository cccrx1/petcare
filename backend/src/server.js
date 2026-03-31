/**
 * AI宠物健康管理系统 - 服务器入口文件
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { createServer } = require('http');
const { Server } = require('socket.io');

const logger = require('./utils/logger');
const config = require('./config');

// 导入路由
const userRoutes = require('./routes/users');
const petRoutes = require('./routes/pets');
const healthRoutes = require('./routes/health');
const alertRoutes = require('./routes/alerts');
const veterinaryRoutes = require('./routes/veterinary');
const feedingRoutes = require('./routes/feeding');
const trainingRoutes = require('./routes/training');
const communityRoutes = require('./routes/community');
const chatRoutes = require('./routes/chat');

// 导入中间件
const errorHandler = require('./middleware/errorHandler');
const authMiddleware = require('./middleware/auth');

// 创建Express应用
const app = express();
const httpServer = createServer(app);

// 创建Socket.IO实例
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST']
  }
});

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
    version: '1.0.0'
  });
});

// API路由
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/pets', petRoutes);
app.use('/api/v1/health', healthRoutes);
app.use('/api/v1/alerts', alertRoutes);
app.use('/api/v1/veterinary', veterinaryRoutes);
app.use('/api/v1/feeding', feedingRoutes);
app.use('/api/v1/training', trainingRoutes);
app.use('/api/v1/community', communityRoutes);
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

// Socket.IO连接处理
io.on('connection', (socket) => {
  logger.info('Client connected', { socketId: socket.id });

  socket.on('join', (userId) => {
    socket.join(`user:${userId}`);
    logger.info('User joined room', { userId, socketId: socket.id });
  });

  socket.on('disconnect', () => {
    logger.info('Client disconnected', { socketId: socket.id });
  });
});

// 将io实例附加到app，供其他模块使用
app.set('io', io);

// 启动服务器
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// 优雅关闭
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  httpServer.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});

module.exports = { app, io };
