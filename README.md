# AI宠物健康管理系统

基于多智能体（Multi-Agent）与工作流（Workflow）技术的综合性宠物健康管理平台。

## 项目概述

本系统通过引入兽医智能体、喂养智能体等AI能力，实现从被动记录到主动干预的转变。系统采用后端工作流直连数据库的架构模式，彻底解耦前端交互与底层数据处理，确保数据处理的实时性、安全性与智能化。

## 技术栈

### 后端
- **框架**: Node.js + Express
- **数据库**: PostgreSQL (关系型) + InfluxDB (时序数据)
- **认证**: JWT
- **AI集成**: Dify Platform
- **实时通信**: Socket.IO

### 前端
- **框架**: HTML5 + CSS3 + JavaScript
- **UI框架**: Tailwind CSS
- **交互**: SweetAlert2
- **HTTP客户端**: Fetch API

## 项目结构

```
PetCare/
├── backend/                    # 后端代码
│   ├── src/
│   │   ├── controllers/       # 控制器
│   │   ├── models/            # 数据模型
│   │   ├── routes/            # 路由
│   │   ├── services/          # 业务服务
│   │   ├── middleware/        # 中间件
│   │   ├── utils/             # 工具函数
│   │   ├── config/            # 配置文件
│   │   └── server.js          # 服务器入口
│   ├── logs/                  # 日志文件
│   └── tests/                 # 测试文件
├── frontend/                  # 前端代码
│   ├── css/                   # 样式文件
│   ├── js/                    # JavaScript文件
│   ├── assets/                # 静态资源
│   └── index.html             # 主页面
├── config/                    # 配置文件
│   ├── agents-config.json     # 智能体配置
│   ├── workflows-config.json  # 工作流配置
│   ├── api-config.json        # API配置
│   └── README.md             # 配置说明
├── database/                  # 数据库相关
│   ├── migrations/            # 数据库迁移
│   └── seeds/                 # 种子数据
├── docs/                      # 文档
├── .env.example              # 环境变量示例
├── .gitignore               # Git忽略文件
├── package.json             # 项目依赖
└── README.md                # 项目说明
```

## 核心功能

### 1. 用户模块
- 用户注册与登录
- 个人资料管理
- JWT身份认证

### 2. 宠物档案模块
- 宠物基本信息管理
- 医疗档案记录
- 病史管理

### 3. 健康监测模块
- 手动录入健康数据
- IoT设备数据接入
- 健康趋势图表

### 4. 异常预警模块
- 实时数据分析
- 智能异常检测
- 分级预警推送

### 5. 兽医咨询模块
- 在线问诊
- 预约服务
- 电子病历

### 6. 喂养指南模块
- 基于NRC模型的能量计算
- 个性化食谱生成
- 动态喂养调整

### 7. 行为训练模块
- 行为问题库
- 纠正方案
- 训练计划

### 8. 社区资讯模块
- 精准推送
- 用户交流
- 热点资讯

## 智能体配置

系统配置了4个专业智能体：

| 智能体ID | 名称 | 角色 |
|---------|------|------|
| pet-health-assistant | 宠物健康助手 | 中枢智能体 |
| veterinarian-agent | 兽医智能体 | 健康咨询 |
| nutrition-agent | 喂养方案定制 | 营养规划 |
| training-agent | 行为训练 | 行为纠正 |

## 工作流配置

系统配置了4个自动化工作流：

| 工作流ID | 名称 | 触发方式 |
|---------|------|---------|
| anomaly-detection-workflow | 异常预警工作流 | 数据库事件 |
| health-info-workflow | 健康资讯工作流 | 定时任务 |
| feeding-adjustment-workflow | 喂养方案调整工作流 | 定时任务 |
| veterinary-consultation-workflow | 兽医咨询工作流 | 用户触发 |

## 快速开始

### 1. 环境要求

- Node.js >= 14.x
- PostgreSQL >= 12.x
- InfluxDB >= 2.x
- Dify Platform账号

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

复制 `.env.example` 为 `.env` 并配置相应的环境变量：

```bash
cp .env.example .env
```

编辑 `.env` 文件，配置数据库、Dify等参数。

### 4. 初始化数据库

```bash
npm run migrate
```

### 5. 启动开发服务器

```bash
npm run dev
```

服务器将在 `http://localhost:3000` 启动。

### 6. 配置Dify智能体和工作流

1. 登录Dify平台
2. 创建智能体和工作流
3. 将获得的ID和密钥填入 `config/` 目录下的配置文件

详细配置说明请参考 [config/README.md](config/README.md)

## API接口

系统提供RESTful API接口，主要端点包括：

- `/api/v1/users` - 用户相关
- `/api/v1/pets` - 宠物档案
- `/api/v1/health` - 健康监测
- `/api/v1/alerts` - 预警管理
- `/api/v1/veterinary` - 兽医咨询
- `/api/v1/feeding` - 喂养方案
- `/api/v1/training` - 行为训练
- `/api/v1/community` - 社区
- `/api/v1/chat` - 智能体聊天

详细API文档请参考 [docs/API.md](docs/API.md)

## 开发指南

### 添加新的API端点

1. 在 `backend/src/routes/` 创建路由文件
2. 在 `backend/src/controllers/` 创建控制器
3. 在 `backend/src/server.js` 中注册路由

### 添加新的智能体

1. 在Dify平台创建智能体
2. 在 `config/agents-config.json` 中配置智能体信息
3. 在 `backend/src/services/difyService.js` 中添加调用方法

### 添加新的工作流

1. 在Dify平台创建工作流
2. 在 `config/workflows-config.json` 中配置工作流信息
3. 在 `backend/src/services/difyService.js` 中添加触发方法

## 数据库架构

系统使用PostgreSQL存储结构化数据，InfluxDB存储时序健康数据。

主要数据表：
- users - 用户表
- pets - 宠物表
- health_records - 健康记录表
- alerts - 预警表
- consultations - 咨询表
- appointments - 预约表
- 等等...

详细数据库设计请参考 [database/migrations/001_init_schema.sql](database/migrations/001_init_schema.sql)

## 部署

### 使用PM2部署

```bash
# 安装PM2
npm install -g pm2

# 启动应用
pm2 start backend/src/server.js --name pet-care

# 查看日志
pm2 logs pet-care

# 停止应用
pm2 stop pet-care
```

### 使用Docker部署

```bash
# 构建镜像
docker build -t pet-care .

# 运行容器
docker run -p 3000:3000 pet-care
```

## 测试

```bash
# 运行测试
npm test

# 运行测试并生成覆盖率报告
npm run test:coverage
```

## 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## 许可证

本项目采用MIT许可证。详见 [LICENSE](LICENSE) 文件。

## 联系方式

如有问题或建议，请通过以下方式联系：

- 提交Issue
- 发送邮件
- 加入社区讨论

## 致谢

感谢所有为本项目做出贡献的开发者！

---

**注意**: 本项目部分内容可能由AI生成，请根据实际需求进行调整和完善。
