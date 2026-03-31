/**
 * Dify集成服务模块
 * 用于调用Dify平台的智能体和工作流
 */

const axios = require('axios');
const config = require('../config');
const logger = require('../utils/logger');
const fs = require('fs');
const path = require('path');

// 加载配置文件
const loadAgentConfig = () => {
  try {
    const configPath = path.join(process.cwd(), 'config', 'agents-config.json');
    const configData = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(configData);
  } catch (error) {
    logger.error('Failed to load agent config', { error: error.message });
    return null;
  }
};

const loadWorkflowConfig = () => {
  try {
    const configPath = path.join(process.cwd(), 'config', 'workflows-config.json');
    const configData = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(configData);
  } catch (error) {
    logger.error('Failed to load workflow config', { error: error.message });
    return null;
  }
};

// 创建Dify API客户端
const createClient = (apiKey) => {
  return axios.create({
    baseURL: config.dify.baseUrl,
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    timeout: 30000
  });
};

/**
 * 与智能体聊天
 * @param {string} agentId - 智能体ID
 * @param {string} message - 用户消息
 * @param {object} context - 上下文信息
 * @returns {Promise<object>}
 */
const chatWithAgent = async (agentId, message, context = {}) => {
  try {
    const agentConfig = loadAgentConfig();
    if (!agentConfig) {
      throw new Error('Agent config not found');
    }

    const agent = agentConfig.agents.find(a => a.id === agentId);
    if (!agent || !agent.dify_config.agent_key) {
      throw new Error(`Agent ${agentId} not configured`);
    }

    const client = createClient(agent.dify_config.agent_key);

    const payload = {
      inputs: {
        ...context
      },
      query: message,
      response_mode: 'blocking',
      conversation_id: context.conversationId || '',
      user: context.userId?.toString() || 'anonymous'
    };

    logger.info('Calling Dify agent', { agentId, message: message.substring(0, 50) });

    const response = await client.post('/chat-messages', payload);

    logger.info('Dify agent response received', { agentId, responseStatus: response.status });

    return {
      answer: response.data.answer,
      conversationId: response.data.conversation_id,
      messageId: response.data.message_id
    };
  } catch (error) {
    logger.error('Dify agent call failed', {
      agentId,
      error: error.response?.data || error.message
    });
    throw error;
  }
};

/**
 * 触发工作流
 * @param {string} workflowId - 工作流ID
 * @param {object} inputs - 工作流输入参数
 * @returns {Promise<object>}
 */
const triggerWorkflow = async (workflowId, inputs = {}) => {
  try {
    const workflowConfig = loadWorkflowConfig();
    if (!workflowConfig) {
      throw new Error('Workflow config not found');
    }

    const workflow = workflowConfig.workflows.find(w => w.id === workflowId);
    if (!workflow || !workflow.dify_config.workflow_key) {
      throw new Error(`Workflow ${workflowId} not configured`);
    }

    const client = createClient(workflow.dify_config.workflow_key);

    const payload = {
      inputs,
      response_mode: 'blocking',
      user: inputs.userId?.toString() || 'system'
    };

    logger.info('Triggering Dify workflow', { workflowId, inputs });

    const response = await client.post('/workflows/run', payload);

    logger.info('Dify workflow completed', { workflowId, responseStatus: response.status });

    return {
      result: response.data.result,
      status: response.data.status,
      executionId: response.data.execution_id
    };
  } catch (error) {
    logger.error('Dify workflow trigger failed', {
      workflowId,
      error: error.response?.data || error.message
    });
    throw error;
  }
};

/**
 * 获取对话历史
 * @param {string} agentId - 智能体ID
 * @param {string} userId - 用户ID
 * @returns {Promise<object>}
 */
const getConversationHistory = async (agentId, userId) => {
  try {
    const agentConfig = loadAgentConfig();
    if (!agentConfig) {
      throw new Error('Agent config not found');
    }

    const agent = agentConfig.agents.find(a => a.id === agentId);
    if (!agent || !agent.dify_config.agent_key) {
      throw new Error(`Agent ${agentId} not configured`);
    }

    const client = createClient(agent.dify_config.agent_key);

    const response = await client.get('/messages', {
      params: {
        user: userId.toString(),
        limit: 50
      }
    });

    return response.data;
  } catch (error) {
    logger.error('Failed to get conversation history', {
      agentId,
      userId,
      error: error.message
    });
    throw error;
  }
};

/**
 * 特定智能体调用方法
 */

// 兽医智能体
const veterinarianConsultation = async (symptoms, petInfo, userId) => {
  const context = {
    userId,
    petId: petInfo.id,
    petName: petInfo.name,
    species: petInfo.species,
    age: petInfo.age,
    weight: petInfo.weight
  };

  return await chatWithAgent('veterinarian-agent', symptoms, context);
};

// 喂养方案智能体
const generateFeedingPlan = async (petInfo, userId) => {
  const context = {
    userId,
    petId: petInfo.id,
    petName: petInfo.name,
    species: petInfo.species,
    age: petInfo.age,
    weight: petInfo.weight,
    activityLevel: petInfo.activityLevel || 'normal'
  };

  return await chatWithAgent('nutrition-agent', '请为我的宠物生成喂养方案', context);
};

// 行为训练智能体
const behaviorTraining = async (problem, petInfo, userId) => {
  const context = {
    userId,
    petId: petInfo.id,
    petName: petInfo.name,
    species: petInfo.species,
    age: petInfo.age
  };

  return await chatWithAgent('training-agent', problem, context);
};

/**
 * 特定工作流触发方法
 */

// 异常预警工作流
const triggerAnomalyDetection = async (petId, healthData) => {
  return await triggerWorkflow('anomaly-detection-workflow', {
    petId,
    healthData,
    timestamp: new Date().toISOString()
  });
};

// 健康资讯工作流
const triggerHealthInfo = async (petId, petInfo) => {
  return await triggerWorkflow('health-info-workflow', {
    petId,
    petInfo,
    timestamp: new Date().toISOString()
  });
};

// 喂养方案调整工作流
const triggerFeedingAdjustment = async (petId, weightTrend) => {
  return await triggerWorkflow('feeding-adjustment-workflow', {
    petId,
    weightTrend,
    timestamp: new Date().toISOString()
  });
};

// 兽医咨询工作流
const triggerVeterinaryConsultation = async (consultationId, symptoms, petInfo) => {
  return await triggerWorkflow('veterinary-consultation-workflow', {
    consultationId,
    petId: petInfo.id,
    symptoms,
    petInfo,
    timestamp: new Date().toISOString()
  });
};

module.exports = {
  // 通用方法
  chatWithAgent,
  triggerWorkflow,
  getConversationHistory,

  // 智能体特定方法
  veterinarianConsultation,
  generateFeedingPlan,
  behaviorTraining,

  // 工作流特定方法
  triggerAnomalyDetection,
  triggerHealthInfo,
  triggerFeedingAdjustment,
  triggerVeterinaryConsultation
};
