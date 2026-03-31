# AI宠物健康管理系统 - 启动指南

## 前置准备

在开始之前，请确保您的系统已安装以下软件：

### 必需软件
- **Node.js** (版本 >= 14.x) - [下载地址](https://nodejs.org/)
- **PostgreSQL** (版本 >= 12.x) - [下载地址](https://www.postgresql.org/download/)
- **InfluxDB** (版本 >= 2.x) - [下载地址](https://www.influxdata.com/downloads/)

### 可选软件
- **Git** - 用于版本控制
- **PM2** - 用于生产环境进程管理
- **Docker** - 用于容器化部署

## 第一步：克隆项目

如果您是从Git仓库克隆项目：

```bash
git clone <repository-url>
cd PetCare
```

## 第二步：安装依赖

```bash
npm install
```

这将安装所有后端依赖包。

## 第三步：配置环境变量

1. 复制环境变量示例文件：

```bash
cp .env.example .env
```

2. 编辑 `.env` 文件，配置以下关键参数：

```env
# 服务器配置
PORT=3000
NODE_ENV=development

# PostgreSQL数据库配置
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pet_care
DB_USER=postgres
DB_PASSWORD=your_password

# InfluxDB配置
INFLUXDB_URL=http://localhost:8086
INFLUXDB_TOKEN=your_token
INFLUXDB_ORG=pet_care
INFLUXDB_BUCKET=health_data

# JWT配置
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=24h

# Dify配置
DIFY_BASE_URL=http://47.113.151.36//v1
DIFY_API_KEY=your_dify_api_key
```

## 第四步：配置数据库

### 配置PostgreSQL

1. 创建数据库：

```sql
CREATE DATABASE pet_care;
```

2. 确保数据库用户有足够的权限。

### 配置InfluxDB

1. 启动InfluxDB服务
2. 创建组织和存储桶：
   - 组织名称：`pet_care`
   - 存储桶名称：`health_data`
3. 生成API Token并记录下来

## 第五步：初始化数据库

运行数据库迁移脚本：

```bash
npm run migrate
```

这将创建所有必需的数据表和索引。

## 第六步：配置Dify智能体和工作流

### 1. 登录Dify平台

访问 Dify 平台并登录您的账号。

### 2. 创建智能体

按照以下步骤创建4个智能体：

#### 宠物健康助手智能体（中枢）
- **类型**: Chatbot
- **角色**: 中枢智能体，负责意图调度和结果整合
- **配置**: 设置为可以调用其他智能体

#### 兽医智能体
- **类型**: Chatbot
- **角色**: 专业兽医咨询
- **知识库**: 上传兽医知识库
- **配置**: 启用多轮对话

#### 喂养方案定制智能体
- **类型**: Chatbot
- **角色**: 宠物营养师
- **配置**: 基于NRC模型进行计算

#### 行为训练智能体
- **类型**: Chatbot
- **角色**: 行为训练师
- **配置**: 加载行为问题库

### 3. 创建工作流

按照以下步骤创建4个工作流：

#### 异常预警工作流
- **触发方式**: 数据库事件
- **任务**:
  - 读取监测数据
  - 运行异常检测算法
  - 风险评估
  - 生成预警通知
  - 保存预警记录
  - 推送用户通知

#### 健康资讯工作流
- **触发方式**: 定时任务（每天上午9点）
- **任务**:
  - 检查生命周期节点
  - 生成健康资讯
  - 匹配资讯内容
  - 推送资讯

#### 喂养方案调整工作流
- **触发方式**: 定时任务（每周一上午10点）
- **任务**:
  - 分析体重趋势
  - 计算调整方案
  - 更新喂养方案
  - 通知用户

#### 兽医咨询工作流
- **触发方式**: 用户触发
- **任务**:
  - 分诊评估
  - 症状匹配
  - 诊断建议
  - 保存病历
  - 紧急情况检查

### 4. 配置文件

将创建的智能体和工作流的ID和密钥填入对应的配置文件：

**config/agents-config.json**:
```json
{
  "agents": [
    {
      "id": "pet-health-assistant",
      "dify_config": {
        "agent_id": "您的智能体ID",
        "agent_key": "您的智能体密钥"
      }
    },
    // ... 其他智能体配置
  ]
}
```

**config/workflows-config.json**:
```json
{
  "workflows": [
    {
      "id": "anomaly-detection-workflow",
      "dify_config": {
        "workflow_id": "您的工作流ID",
        "workflow_key": "您的工作流密钥"
      }
    },
    // ... 其他工作流配置
  ]
}
```

## 第七步：启动开发服务器

```bash
npm run dev
```

服务器将在 `http://localhost:3000` 启动。

## 第八步：访问应用

在浏览器中打开 `http://localhost:3000`。

### 首次使用

1. 点击"注册"按钮创建账号
2. 填写注册信息
3. 注册成功后登录系统
4. 添加您的宠物档案
5. 开始使用各项功能

## 常见问题

### 问题1：数据库连接失败

**解决方案**：
- 检查PostgreSQL服务是否启动
- 验证 `.env` 文件中的数据库配置是否正确
- 确保数据库用户有足够的权限

### 问题2：InfluxDB连接失败

**解决方案**：
- 检查InfluxDB服务是否启动
- 验证InfluxDB URL和Token是否正确
- 确保组织和存储桶已创建

### 问题3：Dify智能体调用失败

**解决方案**：
- 检查Dify基础地址是否正确
- 验证智能体ID和密钥是否正确
- 确保智能体在Dify平台中已启用

### 问题4：端口被占用

**解决方案**：
- 修改 `.env` 文件中的 `PORT` 配置
- 或者停止占用3000端口的其他服务

## 开发模式 vs 生产模式

### 开发模式
```bash
npm run dev
```
特点：
- 自动重启（使用nodemon）
- 详细的日志输出
- 启用调试功能

### 生产模式
```bash
npm start
```
特点：
- 性能优化
- 最小化日志
- 错误处理更严格

## 使用PM2管理进程（推荐用于生产环境）

```bash
# 安装PM2
npm install -g pm2

# 启动应用
pm2 start backend/src/server.js --name pet-care

# 查看状态
pm2 status

# 查看日志
pm2 logs pet-care

# 重启应用
pm2 restart pet-care

# 停止应用
pm2 stop pet-care

# 删除应用
pm2 delete pet-care
```

## 下一步

启动成功后，您可以：

1. **测试功能**：逐一测试各个功能模块
2. **配置IoT设备**：连接智能项圈、食盆等设备
3. **自定义配置**：根据需求调整智能体和工作流配置
4. **开发新功能**：基于现有架构扩展功能

## 获取帮助

如果遇到问题：

1. 查看 [config/README.md](../config/README.md) 了解配置详情
2. 查看 [README.md](../README.md) 了解项目架构
3. 查看日志文件 `backend/logs/` 获取错误信息
4. 提交Issue获取社区支持

## 安全建议

1. **不要提交敏感信息**：`.env` 文件包含敏感信息，不要提交到Git
2. **使用强密码**：为数据库和JWT设置强密码
3. **定期更新依赖**：运行 `npm audit` 检查安全漏洞
4. **启用HTTPS**：在生产环境中使用HTTPS
5. **限制API访问**：配置适当的CORS和限流策略

祝您使用愉快！
