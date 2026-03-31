/**
 * 聊天控制器 - 简化版
 * 使用本地文件存储，不依赖数据库
 */

const storage = require('../utils/fileStorage');
const logger = require('../utils/logger');
const difyService = require('../services/difyService');

// 发送消息给智能体
const sendMessage = async (req, res, next) => {
  try {
    const { sessionId } = req.query;
    const { message, petId, conversationId } = req.body;

    if (!sessionId) {
      return res.status(401).json({
        success: false,
        error: 'UNAUTHORIZED',
        message: '未授权'
      });
    }

    // 验证用户
    const user = await storage.findOne('users', u => u.sessionId === sessionId);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'UNAUTHORIZED',
        message: '未授权'
      });
    }

    // 调用Dify智能体
    const response = await difyService.chatWithAgent(
      'pet-health-assistant',
      message,
      {
        userId: user.id,
        petId,
        conversationId
      }
    );

    // 保存聊天记录
    await storage.add('chat_messages', {
      userId: user.id,
      petId,
      conversationId,
      message,
      response: response.answer
    });

    logger.info('Chat message sent', { userId: user.id, petId });

    res.json({
      success: true,
      data: {
        answer: response.answer,
        conversationId: response.conversationId
      }
    });
  } catch (error) {
    logger.error('Chat message error', { error: error.message });
    next(error);
  }
};

// 获取聊天历史
const getHistory = async (req, res, next) => {
  try {
    const { sessionId } = req.query;
    const { petId, limit = 50 } = req.query;

    if (!sessionId) {
      return res.status(401).json({
        success: false,
        error: 'UNAUTHORIZED',
        message: '未授权'
      });
    }

    const user = await storage.findOne('users', u => u.sessionId === sessionId);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'UNAUTHORIZED',
        message: '未授权'
      });
    }

    let messages = await storage.find('chat_messages', msg => msg.userId === user.id);

    if (petId) {
      messages = messages.filter(msg => msg.petId === petId);
    }

    // 按时间倒序排列
    messages.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    // 限制返回数量
    if (messages.length > parseInt(limit)) {
      messages = messages.slice(0, parseInt(limit));
    }

    res.json({
      success: true,
      data: messages
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendMessage,
  getHistory
};
