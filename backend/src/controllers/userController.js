/**
 * 用户控制器
 */

const bcrypt = require('bcryptjs');
const { query } = require('../utils/db');
const { generateToken, generateRefreshToken, verifyRefreshToken } = require('../middleware/auth');
const logger = require('../utils/logger');

// 用户注册
const register = async (req, res, next) => {
  try {
    const { email, password, name, phone } = req.body;

    // 检查用户是否已存在
    const existingUser = await query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        success: false,
        error: 'USER_EXISTS',
        message: '用户已存在'
      });
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建用户
    const result = await query(
      `INSERT INTO users (email, password, name, phone) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, email, name, phone, created_at`,
      [email, hashedPassword, name, phone]
    );

    const user = result.rows[0];

    logger.info('User registered', { userId: user.id, email });

    res.status(201).json({
      success: true,
      message: '注册成功',
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone
      }
    });
  } catch (error) {
    next(error);
  }
};

// 用户登录
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 查找用户
    const result = await query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        error: 'INVALID_CREDENTIALS',
        message: '邮箱或密码错误'
      });
    }

    const user = result.rows[0];

    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'INVALID_CREDENTIALS',
        message: '邮箱或密码错误'
      });
    }

    // 生成Token
    const token = generateToken(user.id, user.email);
    const refreshToken = generateRefreshToken(user.id, user.email);

    // 更新刷新令牌
    await query(
      'UPDATE users SET refresh_token = $1 WHERE id = $2',
      [refreshToken, user.id]
    );

    logger.info('User logged in', { userId: user.id, email });

    res.json({
      success: true,
      message: '登录成功',
      data: {
        token,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          phone: user.phone
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// 获取用户资料
const getProfile = async (req, res, next) => {
  try {
    const result = await query(
      'SELECT id, email, name, phone, address, created_at FROM users WHERE id = $1',
      [req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'USER_NOT_FOUND',
        message: '用户不存在'
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

// 更新用户资料
const updateProfile = async (req, res, next) => {
  try {
    const { name, phone, address } = req.body;

    const result = await query(
      `UPDATE users 
       SET name = $1, phone = $2, address = $3 
       WHERE id = $4 
       RETURNING id, email, name, phone, address`,
      [name, phone, address, req.user.userId]
    );

    res.json({
      success: true,
      message: '资料更新成功',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

// 修改密码
const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // 获取当前用户
    const result = await query(
      'SELECT password FROM users WHERE id = $1',
      [req.user.userId]
    );

    const user = result.rows[0];

    // 验证旧密码
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        error: 'INVALID_PASSWORD',
        message: '原密码错误'
      });
    }

    // 加密新密码
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 更新密码
    await query(
      'UPDATE users SET password = $1 WHERE id = $2',
      [hashedPassword, req.user.userId]
    );

    logger.info('Password changed', { userId: req.user.userId });

    res.json({
      success: true,
      message: '密码修改成功'
    });
  } catch (error) {
    next(error);
  }
};

// 刷新Token
const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    // 验证刷新令牌
    const decoded = verifyRefreshToken(refreshToken);

    // 查找用户
    const result = await query(
      'SELECT id, email, refresh_token FROM users WHERE id = $1',
      [decoded.userId]
    );

    if (result.rows.length === 0 || result.rows[0].refresh_token !== refreshToken) {
      return res.status(401).json({
        success: false,
        error: 'INVALID_REFRESH_TOKEN',
        message: '无效的刷新令牌'
      });
    }

    const user = result.rows[0];

    // 生成新的访问令牌
    const token = generateToken(user.id, user.email);

    res.json({
      success: true,
      data: {
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

// 用户登出
const logout = async (req, res, next) => {
  try {
    await query(
      'UPDATE users SET refresh_token = NULL WHERE id = $1',
      [req.user.userId]
    );

    logger.info('User logged out', { userId: req.user.userId });

    res.json({
      success: true,
      message: '登出成功'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  refreshToken,
  logout
};
