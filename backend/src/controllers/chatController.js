/**
 * 聊天控制器 - 集成智能体
 */

const { query } = require('../utils/db');
const logger = require('../utils/logger');
const difyService = require('../services/difyService');

// 发送消息给智能体
const sendMessage = async (req, res, next) => {
  try {
    const { message, petId, conversationId } = req.body;

    // 调用Dify智能体
    const response = await difyService.chatWithAgent(
      'pet-health-assistant',
      message,
      {
        userId: req.user.userId,
        petId,
        conversationId
      }
    );

    // 保存聊天记录
    await query(
      `INSERT INTO chat_messages (user_id, pet_id, conversation_id, message, response)
       VALUES ($1, $2, $3, $4, $5)`,
      [req.user.userId, petId, conversationId, message, response.answer]
    );

    logger.info('Chat message sent', { userId: req.user.userId, petId });

    res.json({
      success: true,
      data: {
        answer: response.answer,
        conversationId: response.conversationId
      }
    });
  } catch (error) {
    next(error);
  }
};

// 获取聊天历史
const getHistory = async (req, res, next) => {
  try {
    const { petId, limit = 50 } = req.query;

    let queryText = `SELECT * FROM chat_messages WHERE user_id = $1`;
    const params = [req.user.userId];
    let paramCount = 1;

    if (petId) {
      paramCount++;
      queryText += ` AND pet_id = $${paramCount}`;
      params.push(petId);
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

module.exports = {
  sendMessage,
  getHistory
};
