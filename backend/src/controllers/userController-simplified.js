/**
 * 用户控制器 - 简化版
 * 移除JWT认证，使用简单会话管理
 */

const storage = require('../utils/fileStorage');
const logger = require('../utils/logger');

// 用户注册
const register = async (req, res, next) => {
    try {
        const { email, name, phone } = req.body;

        // 检查用户是否已存在
        const existingUsers = await storage.find('users', user => user.email === email);
        if (existingUsers.length > 0) {
            return res.status(409).json({
                success: false,
                error: 'USER_EXISTS',
                message: '用户已存在'
            });
        }

        // 创建用户
        const user = await storage.add('users', {
            email,
            name,
            phone,
            sessionId: generateSessionId()
        });

        logger.info('User registered', { userId: user.id, email });

        res.status(201).json({
            success: true,
            message: '注册成功',
            data: {
                id: user.id,
                email: user.email,
                name: user.name,
                phone: user.phone,
                sessionId: user.sessionId
            }
        });
    } catch (error) {
        next(error);
    }
};

// 用户登录（简化版，无需密码）
const login = async (req, res, next) => {
    try {
        const { email } = req.body;

        // 查找用户
        let user = await storage.findOne('users', u => u.email === email);

        if (!user) {
            // 如果用户不存在，自动创建
            user = await storage.add('users', {
                email,
                name: email.split('@')[0],
                phone: '',
                sessionId: generateSessionId()
            });
            logger.info('Auto-created user', { userId: user.id, email });
        } else {
            // 更新会话ID
            user = await storage.update('users', user.id, {
                sessionId: generateSessionId()
            });
        }

        logger.info('User logged in', { userId: user.id, email });

        res.json({
            success: true,
            message: '登录成功',
            data: {
                id: user.id,
                email: user.email,
                name: user.name,
                phone: user.phone,
                sessionId: user.sessionId
            }
        });
    } catch (error) {
        next(error);
    }
};

// 获取用户资料
const getProfile = async (req, res, next) => {
    try {
        const { sessionId } = req.query;
        if (!sessionId) {
            return res.status(401).json({
                success: false,
                error: 'UNAUTHORIZED',
                message: '未授权'
            });
        }

        const user = await storage.findOne('users', u => u.sessionId === sessionId);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'USER_NOT_FOUND',
                message: '用户不存在'
            });
        }

        res.json({
            success: true,
            data: {
                id: user.id,
                email: user.email,
                name: user.name,
                phone: user.phone,
                address: user.address || ''
            }
        });
    } catch (error) {
        next(error);
    }
};

// 更新用户资料
const updateProfile = async (req, res, next) => {
    try {
        const { sessionId } = req.query;
        const { name, phone, address } = req.body;

        if (!sessionId) {
            return res.status(401).json({
                success: false,
                error: 'UNAUTHORIZED',
                message: '未授权'
            });
        }

        const user = await storage.findOne('users', u => u.sessionId === sessionId);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'USER_NOT_FOUND',
                message: '用户不存在'
            });
        }

        const updatedUser = await storage.update('users', user.id, {
            name,
            phone,
            address
        });

        res.json({
            success: true,
            message: '资料更新成功',
            data: {
                id: updatedUser.id,
                email: updatedUser.email,
                name: updatedUser.name,
                phone: updatedUser.phone,
                address: updatedUser.address || ''
            }
        });
    } catch (error) {
        next(error);
    }
};

// 用户登出
const logout = async (req, res, next) => {
    try {
        const { sessionId } = req.query;
        if (sessionId) {
            const user = await storage.findOne('users', u => u.sessionId === sessionId);
            if (user) {
                await storage.update('users', user.id, {
                    sessionId: generateSessionId()
                });
            }
        }

        logger.info('User logged out', { sessionId });

        res.json({
            success: true,
            message: '登出成功'
        });
    } catch (error) {
        next(error);
    }
};

// 生成会话ID
function generateSessionId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

module.exports = {
    register,
    login,
    getProfile,
    updateProfile,
    logout
};
