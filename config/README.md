# AI宠物健康管理系统 - 配置说明

## 概述

本目录包含AI宠物健康管理系统的统一配置文件，用于配置智能体、工作流和API接口。

## 配置文件说明

### 1. agents-config.json - 智能体配置文件

该文件定义了系统中所有智能体的配置信息，包括：

#### 配置的智能体

| 智能体ID | 名称 | 角色 | 说明 |
|---------|------|------|------|
| pet-health-assistant | 宠物健康助手智能体 | 中枢智能体 | 用户与系统的唯一交互入口，负责意图调度和结果整合 |
| veterinarian-agent | 兽医智能体 | 专业智能体 | 基于RAG技术，提供健康咨询、症状分析和用药建议 |
| nutrition-agent | 喂养方案定制智能体 | 专业智能体 | 基于NRC模型，计算能量需求，生成个性化喂养方案 |
| training-agent | 行为训练智能体 | 专业智能体 | 提供行为问题诊断和训练指导 |

#### 需要配置的Dify参数

在每个智能体的 `dify_config` 中，需要配置以下参数：

```json
"dify_config": {
  "agent_id": "在Dify中创建智能体后的ID",
  "agent_key": "智能体的API密钥",
  "enabled": true
}
```

### 2. workflows-config.json - 工作流配置文件

该文件定义了系统中所有工作流的配置信息，包括：

#### 配置的工作流

| 工作流ID | 名称 | 触发方式 | 说明 |
|---------|------|---------|------|
| anomaly-detection-workflow | 异常预警工作流 | 数据库事件 | 实时监听监测数据，运行异常检测算法，推送预警 |
| health-info-workflow | 健康资讯工作流 | 定时任务 | 每天检查生命周期节点，推送养护知识和体检提醒 |
| feeding-adjustment-workflow | 喂养方案调整工作流 | 定时任务 | 每周根据体重变化自动调整喂养方案 |
| veterinary-consultation-workflow | 兽医咨询工作流 | 用户触发 | 处理在线问诊请求，进行分诊和记录 |

#### 需要配置的Dify参数

在每个工作流的 `dify_config` 中，需要配置以下参数：

```json
"dify_config": {
  "workflow_id": "在Dify中创建工作流后的ID",
  "workflow_key": "工作流的API密钥",
  "enabled": true
}
```

### 3. api-config.json - API接口配置文件

该文件定义了系统的API接口配置，包括：

- 所有业务模块的API端点定义
- 数据库连接配置
- 认证配置
- 通知服务配置
- IoT设备配置

#### 需要配置的参数

1. **Dify配置**（已预设基础地址）：
```json
"dify": {
  "base_url": "http://47.113.151.36//v1",
  "api_key": "您的Dify API密钥",
  "timeout": 30000
}
```

2. **后端API配置**：
```json
"api": {
  "base_url": "您的后端API地址",
  "version": "v1",
  "timeout": 30000
}
```

3. **数据库配置**：
```json
"database": {
  "primary": {
    "type": "PostgreSQL",
    "host": "数据库主机地址",
    "port": 5432,
    "database": "数据库名",
    "username": "用户名",
    "password": "密码"
  },
  "timeseries": {
    "type": "InfluxDB",
    "host": "时序数据库主机地址",
    "port": 8086,
    "database": "数据库名",
    "username": "用户名",
    "password": "密码"
  }
}
```

## 配置步骤

### 第一步：在Dify中创建智能体

1. 登录Dify平台（http://47.113.151.36）
2. 创建以下智能体：
   - 宠物健康助手智能体
   - 兽医智能体
   - 喂养方案定制智能体
   - 行为训练智能体
3. 记录每个智能体的ID和API密钥
4. 将这些信息填入 `agents-config.json` 对应的 `dify_config` 中

### 第二步：在Dify中创建工作流

1. 在Dify中创建以下工作流：
   - 异常预警工作流
   - 健康资讯工作流
   - 喂养方案调整工作流
   - 兽医咨询工作流
2. 记录每个工作流的ID和API密钥
3. 将这些信息填入 `workflows-config.json` 对应的 `dify_config` 中

### 第三步：配置后端API和数据库

1. 部署后端服务
2. 配置数据库连接信息
3. 将相关信息填入 `api-config.json`

### 第四步：测试配置

1. 使用配置文件测试智能体调用
2. 测试工作流触发和执行
3. 验证API接口正常工作

## 注意事项

1. **安全性**：配置文件中包含敏感信息（API密钥、数据库密码等），请勿提交到版本控制系统
2. **环境变量**：建议使用环境变量来存储敏感信息，而非直接写在配置文件中
3. **配置验证**：在修改配置后，建议进行配置验证，确保格式正确
4. **备份**：定期备份配置文件，以便在需要时快速恢复

## 配置文件结构

```
config/
├── agents-config.json      # 智能体配置
├── workflows-config.json   # 工作流配置
├── api-config.json         # API接口配置
└── README.md              # 本说明文档
```

## 技术支持

如有配置问题，请参考：
- Dify官方文档
- 系统设计方案文档
- 项目技术文档
