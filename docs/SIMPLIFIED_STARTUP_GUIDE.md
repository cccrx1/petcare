# AI宠物健康管理系统 - 简化版启动指南

## 📋 概述

简化版专为Windows本地部署设计，移除了以下复杂组件：
- ❌ PostgreSQL数据库
- ❌ InfluxDB时序数据库
- ❌ JWT认证系统
- ❌ 复杂的工作流系统

简化版特点：
- ✅ 使用本地JSON文件存储数据
- ✅ 简单的会话管理（无需密码）
- ✅ 仅保留1个智能体（宠物健康助手）
- ✅ 仅保留1个工作流（健康分析，可选）
- ✅ 快速部署，开箱即用

---

## 🚀 快速开始（5分钟部署）

### 第一步：安装Node.js

1. 访问 [Node.js官网](https://nodejs.org/)
2. 下载并安装LTS版本（推荐18.x或20.x）
3. 安装完成后，打开命令提示符（CMD）或PowerShell
4. 验证安装：
   ```bash
   node --version
   npm --version
   ```

### 第二步：下载项目

1. 将项目文件夹复制到您想要的位置，例如：`C:\PetCare`
2. 进入项目目录：
   ```bash
   cd C:\PetCare
   ```

### 第三步：安装依赖

```bash
npm install
```

等待安装完成（可能需要几分钟）。

### 第四步：配置环境

1. 复制简化版环境配置文件：
   ```bash
   copy .env.simplified .env
   ```

2. 编辑 `.env` 文件（使用记事本或VS Code）：
   ```env
   PORT=3000
   NODE_ENV=development

   # Dify配置（可选，如果不使用AI功能，可以留空）
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

3. 如果要使用Dify智能体，配置Dify API密钥：
   - 在Dify平台创建智能体
   - 获取API密钥
   - 填入 `DIFY_API_KEY` 字段

### 第五步：启动服务

```bash
npm start
```

看到以下信息表示启动成功：
```
Server running on port 3000
Environment: development
Data directory: ./data
Simplified version - No database required
```

### 第六步：访问应用

在浏览器中打开：
```
http://localhost:3000
```

或访问移动端界面：
```
http://localhost:3000/mobile.html
```

---

## 📁 项目结构（简化版）

```
PetCare/
├── backend/
│   ├── src/
│   │   ├── controllers/       # 控制器（简化版）
│   │   ├── routes/            # 路由（简化版）
│   │   ├── utils/             # 工具函数
│   │   │   ├── fileStorage.js # 本地文件存储
│   │   │   ├── logger.js      # 日志工具
│   │   │   └── difyService.js # Dify集成服务
│   │   ├── config/            # 配置管理
│   │   └── server-simplified.js  # 简化版服务器
│   └── logs/                  # 日志文件
├── frontend/                  # 前端代码
│   ├── index.html             # 桌面端
│   ├── mobile.html            # 移动端
│   ├── css/                   # 样式文件
│   └── js/                    # JavaScript文件
├── config/                    # 配置文件
│   ├── agents-config-simplified.json  # 简化版智能体配置
│   └── workflows-config-simplified.json # 简化版工作流配置
├── data/                      # 数据存储目录（自动创建）
│   ├── users.json             # 用户数据
│   ├── pets.json              # 宠物数据
│   └── health_records.json    # 健康记录
├── backups/                   # 数据备份目录（自动创建）
├── .env                       # 环境配置
├── .env.simplified            # 简化版环境配置模板
└── package.json               # 项目依赖
```

---

## 🔧 配置说明

### 1. Dify智能体配置（可选）

如果需要使用AI功能：

1. 登录Dify平台
2. 创建"宠物健康助手"智能体
3. 配置智能体提示词：
   ```
   你是一个专业的宠物健康助手，能够回答关于宠物健康、喂养、行为等方面的问题。
   请用友好、专业的语气回答用户的问题。
   ```

4. 获取API密钥
5. 填入 `config/agents-config-simplified.json`：
   ```json
   {
     "dify_config": {
       "agent_id": "您的智能体ID",
       "agent_key": "您的API密钥",
       "enabled": true
     }
   }
   ```

### 2. 工作流配置（可选）

简化版仅保留1个工作流：

- **健康分析工作流**（health-analysis-workflow）
  - 功能：分析宠物健康数据并提供建议
  - 状态：默认禁用（enabled: false）
  - 如需启用，在Dify中创建工作流并配置ID和密钥

### 3. 数据存储配置

数据自动存储在 `./data` 目录下：

- `users.json` - 用户信息
- `pets.json` - 宠物档案
- `health_records.json` - 健康记录
- `chat_messages.json` - 聊天记录

**重要提示**：
- 数据文件会自动创建
- 建议定期备份 `data` 目录
- 不要直接编辑JSON文件，通过API操作

---

## 💡 使用说明

### 首次使用

1. **注册/登录**
   - 打开应用
   - 输入邮箱即可登录（无需密码）
   - 系统会自动创建用户账户

2. **添加宠物**
   - 进入"宠物档案"页面
   - 点击"添加宠物"
   - 填写宠物信息

3. **记录健康数据**
   - 进入"健康监测"页面
   - 选择宠物
   - 添加健康记录

4. **使用AI助手**
   - 点击"AI助手"按钮
   - 输入问题
   - 获取AI回答（需配置Dify）

### 数据管理

#### 查看数据
数据存储在 `data` 目录下的JSON文件中，可以直接查看。

#### 备份数据
```bash
# 手动备份
xcopy data backups\data_%date:~0,10% /E /I /Y
```

#### 恢复数据
```bash
# 从备份恢复
xcopy backups\data_2024-03-30 data /E /I /Y
```

#### 清空数据
如需清空所有数据，删除 `data` 目录下的所有文件。

---

## 🐛 常见问题

### Q1: 启动失败，提示端口被占用

**解决方案**：
1. 修改 `.env` 文件中的 `PORT` 为其他端口（如3001）
2. 或者停止占用3000端口的程序

### Q2: 无法连接Dify智能体

**解决方案**：
1. 检查Dify API密钥是否正确
2. 检查网络连接
3. 查看后端日志：`backend/logs/combined.log`
4. 如果不需要AI功能，可以不配置Dify

### Q3: 数据丢失

**解决方案**：
1. 定期备份 `data` 目录
2. 检查磁盘空间
3. 查看日志文件排查错误

### Q4: 前端页面无法访问

**解决方案**：
1. 确认后端服务已启动
2. 检查端口是否正确
3. 尝试清除浏览器缓存
4. 检查防火墙设置

### Q5: 如何完全重置系统

**解决方案**：
1. 停止服务
2. 删除 `data` 目录
3. 删除 `backups` 目录
4. 重启服务

---

## 🔄 与完整版的主要区别

| 功能 | 完整版 | 简化版 |
|------|--------|--------|
| 数据库 | PostgreSQL + InfluxDB | 本地JSON文件 |
| 认证 | JWT Token | 简单会话ID |
| 部署难度 | 中等 | 简单 |
| 数据持久性 | 高 | 中等（需备份） |
| 并发性能 | 高 | 中等 |
| 智能体数量 | 4个 | 1个 |
| 工作流数量 | 4个 | 1个（可选） |
| 适用场景 | 生产环境 | 个人/小团队 |

---

## 📝 开发者说明

### 修改端口

编辑 `.env` 文件：
```env
PORT=3001
```

### 启用开发模式

```bash
npm run dev
```

使用nodemon自动重启，便于开发调试。

### 查看日志

```bash
# 查看所有日志
type backend\logs\combined.log

# 查看错误日志
type backend\logs\error.log
```

### 添加新功能

1. 在 `backend/src/controllers/` 创建控制器
2. 在 `backend/src/routes/` 创建路由
3. 在 `backend/src/server-simplified.js` 注册路由
4. 重启服务

---

## 🔒 安全建议

虽然简化版移除了复杂的认证系统，但仍需注意：

1. **不要在公网部署** - 简化版仅适合本地使用
2. **定期备份数据** - 防止数据丢失
3. **保护数据目录** - 不要让他人访问 `data` 目录
4. **使用防火墙** - 限制外部访问
5. **及时更新** - 定期更新Node.js和依赖包

---

## 📞 技术支持

如遇问题：

1. 查看 [README.md](../README.md)
2. 查看日志文件：`backend/logs/`
3. 检查配置文件：`.env` 和 `config/`
4. 尝试重启服务

---

## 🎉 完成！

恭喜您成功部署了AI宠物健康管理系统的简化版！

现在您可以：
- 管理宠物档案
- 记录健康数据
- 使用AI助手（已配置Dify）
- 在手机上访问移动端界面

享受您的智能宠物健康管理之旅！

---

**版本**：1.0.0-simplified
**更新日期**：2024-03-30
**适用平台**：Windows 10/11

**提示**：简化版适合个人使用和小团队测试，如需生产环境部署，请使用完整版。
