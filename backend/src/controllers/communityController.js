/**
 * 社区资讯控制器
 */

const { query } = require('../utils/db');
const logger = require('../utils/logger');

// 获取社区动态
const getFeed = async (req, res, next) => {
  try {
    const { limit = 20, offset = 0 } = req.query;

    const result = await query(
      `SELECT p.*, u.name as user_name, COUNT(pc.id) as comment_count
       FROM posts p
       JOIN users u ON p.user_id = u.id
       LEFT JOIN post_comments pc ON p.id = pc.post_id
       GROUP BY p.id, u.name
       ORDER BY p.created_at DESC
       LIMIT $1 OFFSET $2`,
      [parseInt(limit), parseInt(offset)]
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
};

// 创建帖子
const createPost = async (req, res, next) => {
  try {
    const { title, content, images } = req.body;

    const result = await query(
      `INSERT INTO posts (user_id, title, content, images)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [req.user.userId, title, content, images]
    );

    logger.info('Post created', { postId: result.rows[0].id });

    res.status(201).json({
      success: true,
      message: '帖子发布成功',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

// 获取评论
const getComments = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const result = await query(
      `SELECT pc.*, u.name as user_name
       FROM post_comments pc
       JOIN users u ON pc.user_id = u.id
       WHERE pc.post_id = $1
       ORDER BY pc.created_at ASC`,
      [postId]
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
};

// 添加评论
const addComment = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    const result = await query(
      `INSERT INTO post_comments (post_id, user_id, content)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [postId, req.user.userId, content]
    );

    logger.info('Comment added', { commentId: result.rows[0].id, postId });

    res.status(201).json({
      success: true,
      message: '评论添加成功',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

// 获取热点资讯
const getNews = async (req, res, next) => {
  try {
    const { limit = 10 } = req.query;

    const result = await query(
      `SELECT * FROM news
       ORDER BY published_at DESC
       LIMIT $1`,
      [parseInt(limit)]
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFeed,
  createPost,
  getComments,
  addComment,
  getNews
};
