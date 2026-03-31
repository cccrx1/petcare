# 简化版配置说明

## 📋 概述

本文档说明AI宠物健康管理系统简化版的配置方法。

---

## 🎯 简化版特点

### 已移除的组件

1. **PostgreSQL数据库** - 不再需要安装和配置数据库
2. **InfluxDB时序数据库** - 不再需要时序数据存储
3. **JWT认证系统** - 不再需要复杂的Token管理
4. **复杂的智能体和工作流** - 仅保留核心功能

### 保留的功能

1. **本地文件存储** - 使用JSON文件存储数据
2. **简单会话管理** - 使用sessionId代替JWT
3. **核心智能体** - 宠物健康助手
4. **可选工作流** - 健康分析工作流（默认禁用）

---

## ⚙️ 配置文件

### 1. 环境配置（.env）

简化版使用 `.env.simplified` 作为模板：

```env
# 服务器配置
PORT=3000
NODE_ENV=development

# Dify配置（可选）
DIFY_BASE_URL=http://47.113.151.36//v1
DIFY_API_KEY=

# 数据存储配置
DATA_DIR=./data
BACKUP_DIR=./backups

# CORS配置
CORS_ORIGIN=*

# 日志配置
LOG_LEVEL=info
LOG_DIR=backend/logs
```

**配置说明**：

| 配置项 | 说明 | 默认值 | 是否必需 |
|--------|------|--------|----------|
| PORT | 服务器端口 | 3000 | 否 |
| NODE_ENV | 运行环境 | development | 否 |
| DIFY_API_KEY | Dify API密钥 | 空 | 否（不使用AI功能可留空） |
| DATA_DIR | 数据存储目录 | ./data | 否 |
| BACKUP_DIR | 备份目录 | ./backups | 否 |

### 2. 智能体配置（agents-config-simplified.json）

简化版仅配置1个智能体：

```json
{
  "version": "1.0.0-simplified",
  "dify": {
    "base_url": "http://47.113.151.36//v1",
    "api_key": "",
    "timeout": 30000
  },
  "agents": [
    {
      "id": "pet-health-assistant",
      "name": "宠物健康助手智能体",
      "type": "central",
      "role": "中枢智能体",
      "description": "用户与系统的唯一交互入口，负责健康咨询和喂养建议",
      "dify_config": {
        "agent_id": "",
        "agent_key": "",
        "enabled": true
      },
      "capabilities": [
        "健康咨询",
        "喂养建议",
        "行为指导"
      ]
    }
  ]
}
```

**配置步骤**：

1. 在Dify平台创建"宠物健康助手"智能体
2. 配置智能体提示词：
   ```
   你是一个专业的宠物健康助手，能够回答关于宠物健康、喂养、行为等方面的问题。
   请用友好、专业的语气回答用户的问题。
   ```
3. 获取智能体ID和API密钥
4. 填入配置文件：
   ```json
   {
     "dify_config": {
       "agent_id": "您的智能体ID",
       "agent_key": "您的API密钥",
       "enabled": true
     }
   }
   ```

### 3. 工作流配置（workflows-config-simplified.json）

简化版仅保留1个工作流（默认禁用）：

```json
{
  "version": "1.0.0-simplified",
  "dify": {
    "base_url": "http://47.113.151.36//v1",
    "api_key": "",
    "timeout": 60000
  },
  "workflows": [
    {
      "id": "health-analysis-workflow",
      "name": "健康分析工作流",
      "type": "user_triggered",
      "trigger": "user_action",
      "description": "分析宠物健康数据并提供建议",
      "dify_config": {
        "workflow_id": "",
        "workflow_key": "",
        "enabled": false
      }
    }
  ]
}
```

**配置步骤**（可选）：

1. 在Dify平台创建"健康分析"工作流
2. 配置工作流任务
3. 获取工作流ID和API密钥
4. 填入配置文件并设置 `enabled: true`

---

## 🚀 快速配置

### 方式一：使用启动脚本（推荐）

双击 `start.bat` 即可自动完成配置并启动服务。

### 方式二：手动配置

1. **安装依赖**
   ```bash
   npm install
   ```

2. **配置环境**
   ```bash
   copy .env.simplified .env
   ```

3. **编辑.env文件**（可选）
   - 配置Dify API密钥（如需使用AI功能）
   - 修改端口（如需）

4. **启动服务**
   ```bash
   npm start
   ```

---

## 💾 数据存储

### 数据文件位置

所有数据存储在 `data` 目录下：

```
data/
├── users.json              # 用户信息
├── pets.json               # 宠物档案
├── health_records.json     # 健康记录
└── chat_messages.json      # 聊天记录
```

### 数据文件格式

每个文件都是一个JSON数组，例如 `users.json`：

```json
[
  {
    "id": "unique_id",
    "email": "user@example.com",
    "name": "用户姓名",
    "phone": "13800138000",
    "sessionId": "session_id",
    "created_at": "2024-03-30T10:00:00.000Z",
    "updated_at": "2024-03-30T10:00:00.000Z"
  }
]
```

### 备份数据

使用提供的备份脚本：

```bash
# Windows
backup.bat
```

或手动备份：

```bash
# 命令提示符
xcopy data backups\data_%date:~0,10% /E /I /Y

# PowerShell
Copy-Item -Path data -Destination "backups\data_$(Get-Date -Format 'yyyy-MM-dd')" -Recurse
```

### 恢复数据

使用提供的恢复脚本：

```bash
# 查看可用备份
restore.bat

# 恢复指定备份
restore.bat data_2024-03-30_103045
```

---

## 🔧 认证系统

### 简化版认证

简化版使用简单的sessionId代替JWT：

1. **登录/注册**
   - 用户只需提供邮箱
   - 系统自动创建用户（如不存在）
   - 生成sessionId并返回

2. **会话验证**
   - 每个请求携带sessionId
   - 系统验证sessionId有效性
   - 无需密码验证

3. **登出**
   - 生成新的sessionId
   - 原sessionId失效

### 使用方式

在API请求中添加sessionId：

```javascript
// GET请求
fetch('/api/v1/users/profile?sessionId=your_session_id')

// POST请求
fetch('/api/v1/pets?sessionId=your_session_id', {
  method: 'POST',
  body: JSON.stringify(petData)
})
```

---

## 🤖 Dify集成

### 配置Dify（可选）

如果不使用AI功能，可以跳过此步骤。

1. **创建智能体**
   - 登录Dify平台
   - 创建"宠物健康助手"智能体
   - 配置提示词

2. **获取密钥**
   - 记录智能体ID
   - 记录API密钥

3. **填写配置**
   - 编辑 `config/agents-config-simplified.json`
   - 填入智能体ID和API密钥

4. **测试连接**
   - 启动服务
   - 访问AI助手功能
   - 测试问答功能

### 不使用Dify

如果不使用AI功能：

1. 不配置 `DIFY_API_KEY`
2. 不配置智能体ID和密钥
3. 系统仍可正常使用基础功能

---

## 📝 常见配置问题

### Q1: 端口被占用

**解决方案**：
编辑 `.env` 文件，修改 `PORT` 为其他端口：
```env
PORT=3001
```

### Q2: 无法连接Dify

**解决方案**：
1. 检查Dify API密钥是否正确
2. 检查网络连接
3. 查看日志：`backend/logs/combined.log`
4. 或不配置Dify，仅使用基础功能

### Q3: 数据文件损坏

**解决方案**：
1. 从备份恢复数据
2. 或删除数据文件，重新开始

### Q4: 权限问题

**解决方案**：
1. 以管理员身份运行命令提示符
2. 或修改数据目录权限

---

## 🔍 调试技巧

### 查看日志

```bash
# 查看所有日志
type backend\logs\combined.log

# 查看错误日志
type backend\logs\error.log

# 实时查看日志（PowerShell）
Get-Content backend\logs\combined.log -Wait
```

### 测试API

使用浏览器或curl测试API：

```bash
# 健康检查
curl http://localhost:3000/health

# 用户登录
curl -X POST http://localhost:3000/api/v1/users/login -H "Content-Type: application/json" -d "{\"email\":\"test@example.com\"}"
```

### 查看数据

直接查看JSON文件：
```bash
type data\users.json
type data\pets.json
```

---

## 📚 相关文档

- [简化版启动指南](../docs/SIMPLIFIED_STARTUP_GUIDE.md) - 详细的部署和使用说明
- [简化版README](../README-SIMPLIFIED.md) - 项目概览
- [移动端使用指南](../docs/MOBILE_GUIDE.md) - 移动端功能说明

---

## ✅ 配置检查清单

完成配置后，请确认以下项目：

- [ ] Node.js已安装
- [ ] 依赖已安装
- [ ] .env文件已配置
- [ ] data目录已创建
- [ ] backups目录已创建
- [ ] 服务可以正常启动
- [ ] 可以访问前端页面
- [ ] 可以正常登录
- [ ] 可以添加宠物
- [ ] 可以记录健康数据
- [ ] （可选）AI助手可以正常使用

---

**版本**：1.0.0-simplified  
**更新日期**：2024-03-30
