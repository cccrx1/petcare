/**
 * 认证中间件
 */

const jwt = require('jsonwebtoken');
const config = require('../config');
const logger = require('../utils/logger');

// 验证JWT Token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Access token is required'
    });
  }

  jwt.verify(token, config.jwt.secret, (err, user) => {
    if (err) {
      logger.error('Token verification failed', {
        error: err.message,
        token: token.substring(0, 20) + '...'
      });
      return res.status(403).json({
        error: 'Forbidden',
        message: 'Invalid or expired token'
      });
    }

    req.user = user;
    next();
  });
};

// 生成JWT Token
const generateToken = (userId, email, expiresIn = config.jwt.expiresIn) => {
  return jwt.sign(
    { userId, email },
    config.jwt.secret,
    { expiresIn }
  );
};

// 生成刷新Token
const generateRefreshToken = (userId, email) => {
  return jwt.sign(
    { userId, email, type: 'refresh' },
    config.jwt.refreshSecret,
    { expiresIn: config.jwt.refreshExpiresIn }
  );
};

// 验证刷新Token
const verifyRefreshToken = (token) => {
  return jwt.verify(token, config.jwt.refreshSecret);
};

module.exports = {
  authenticateToken,
  generateToken,
  generateRefreshToken,
  verifyRefreshToken
};
