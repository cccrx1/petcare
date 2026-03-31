# 📁 项目目录结构

## 完整目录树

```
PetCare/
│
├── backend/                          # 后端代码
│   ├── src/                          # 源代码
│   │   ├── controllers/              # 控制器（简化版）
│   │   │   ├── userController-simplified.js      # 用户控制器
│   │   │   ├── petController-simplified.js       # 宠物控制器
│   │   │   ├── healthController-simplified.js    # 健康控制器
│   │   │   └── chatController-simplified.js      # 聊天控制器
│   │   │
│   │   ├── routes/                   # 路由（简化版）
│   │   │   ├── users-simplified.js              # 用户路由
│   │   │   ├── pets-simplified.js               # 宠物路由
│   │   │   ├── health-simplified.js             # 健康路由
│   │   │   └── chat-simplified.js               # 聊天路由
│   │   │
│   │   ├── utils/                    # 工具函数
│   │   │   ├── logger.js                        # 日志工具
│   │   │   └── fileStorage.js                   # 文件存储工具
│   │   │
│   │   ├── middleware/               # 中间件
│   │   │   └── errorHandler.js                 # 错误处理中间件
│   │   │
│   │   ├── services/                 # 服务
│   │   │   └── difyService.js                   # Dify集成服务
│   │   │
│   │   ├── config/                   # 配置
│   │   │   └── index.js                         # 配置管理
│   │   │
│   │   └── server-simplified.js      # 服务器入口（简化版）
│   │
│   └── logs/                         # 日志目录（自动创建）
│       ├── combined.log
│       └── error.log
│
├── frontend/                         # 前端代码
│   ├── index.html                    # 桌面端首页
│   ├── mobile.html                   # 移动端首页
│   │
│   ├── css/                          # 样式文件
│   │   ├── style.css                 # 桌面端样式
│   │   └── mobile.css                # 移动端样式
│   │
│   └── js/                           # JavaScript文件
│       ├── api.js                    # API客户端
│       ├── auth.js                   # 认证模块
│       ├── chat.js                   # 聊天组件
│       ├── app.js                    # 主应用（桌面端）
│       └── mobile-app.js             # 移动端应用
│
├── config/                           # 配置文件
│   ├── agents-config-simplified.json # 简化版智能体配置
│   ├── workflows-config-simplified.json # 简化版工作流配置
│   ├── SIMPLIFIED_CONFIG.md          # 简化版配置说明
│   └── DIFY_OUTPUT_FORMAT.md         # Dify输出格式说明
│
├── docs/                             # 文档
│   ├── SIMPLIFIED_STARTUP_GUIDE.md   # 简化版启动指南
│   ├── TROUBLESHOOTING.md            # 故障排除指南
│   ├── MOBILE_GUIDE.md               # 移动端使用指南
│   ├── SYSTEM_CHECKLIST.md           # 系统检查清单
│   ├── READY_TO_START.md             # 就绪确认
│   └── STARTUP_SUCCESS.md            # 启动成功
│
├── data/                             # 数据目录（自动创建）
│   ├── users.json                    # 用户数据
│   ├── pets.json                     # 宠物数据
│   ├── health_records.json           # 健康记录
│   └── chat_messages.json            # 聊天记录
│
├── backups/                          # 备份目录（自动创建）
│   └── data_YYYY-MM-DD_HHMMSS/       # 数据备份
│
├── .env                              # 环境配置文件
├── .env.example                      # 环境配置示例
├── .env.simplified                   # 简化版环境配置
│
├── package.json                      # Node.js依赖配置
│
├── start.bat                         # 启动脚本（Windows）
├── diagnose.bat                      # 诊断脚本（Windows）
├── test.bat                          # 测试脚本（Windows）
├── backup.bat                        # 备份脚本（Windows）
├── restore.bat                       # 恢复脚本（Windows）
│
└── README-SIMPLIFIED.md              # 简化版项目说明
```

---

## 📊 文件统计

### 后端文件

| 类别 | 数量 | 说明 |
|------|------|------|
| 控制器 | 4 | 简化版控制器 |
| 路由 | 4 | 简化版路由 |
| 工具 | 2 | 日志和文件存储 |
| 中间件 | 1 | 错误处理 |
| 服务 | 1 | Dify集成 |
| 配置 | 1 | 配置管理 |
| 服务器 | 1 | 服务器入口 |
| **总计** | **14** | |

### 前端文件

| 类别 | 数量 | 说明 |
|------|------|------|
| HTML | 2 | 桌面端和移动端 |
| CSS | 2 | 桌面端和移动端样式 |
| JavaScript | 5 | API、认证、聊天、应用 |
| **总计** | **9** | |

### 配置文件

| 类别 | 数量 | 说明 |
|------|------|------|
| 环境配置 | 3 | .env, .env.example, .env.simplified |
| 智能体配置 | 1 | agents-config-simplified.json |
| 工作流配置 | 1 | workflows-config-simplified.json |
| 配置文档 | 2 | SIMPLIFIED_CONFIG.md, DIFY_OUTPUT_FORMAT.md |
| **总计** | **7** | |

### 辅助脚本

| 类别 | 数量 | 说明 |
|------|------|------|
| 启动脚本 | 1 | start.bat |
| 诊断脚本 | 1 | diagnose.bat |
| 测试脚本 | 1 | test.bat |
| 备份脚本 | 1 | backup.bat |
| 恢复脚本 | 1 | restore.bat |
| **总计** | **5** | |

### 文档文件

| 类别 | 数量 | 说明 |
|------|------|------|
| 项目说明 | 1 | README-SIMPLIFIED.md |
| 启动指南 | 1 | SIMPLIFIED_STARTUP_GUIDE.md |
| 故障排除 | 1 | TROUBLESHOOTING.md |
| 移动端指南 | 1 | MOBILE_GUIDE.md |
| 系统检查 | 1 | SYSTEM_CHECKLIST.md |
| 就绪确认 | 1 | READY_TO_START.md |
| 启动成功 | 1 | STARTUP_SUCCESS.md |
| **总计** | **7** | |

### 总计

| 类别 | 数量 |
|------|------|
| 后端文件 | 14 |
| 前端文件 | 9 |
| 配置文件 | 7 |
| 辅助脚本 | 5 |
| 文档文件 | 7 |
| **总计** | **42** |

---

## 🔍 关键文件说明

### 后端核心文件

#### server-simplified.js
- **作用**: 服务器入口文件
- **功能**: 初始化Express应用，配置中间件，注册路由
- **端口**: 3000（可通过.env配置）

#### controllers/*-simplified.js
- **作用**: 处理业务逻辑
- **特点**: 使用本地文件存储，无数据库依赖
- **包含**: 用户、宠物、健康、聊天四个控制器

#### routes/*-simplified.js
- **作用**: 定义API端点
- **特点**: 使用sessionId认证，无JWT
- **路径**: /api/v1/{users|pets|health|chat}

#### utils/fileStorage.js
- **作用**: 本地文件存储
- **功能**: CRUD操作，支持JSON文件
- **位置**: data/目录

### 前端核心文件

#### index.html / mobile.html
- **作用**: 页面入口
- **特点**: 响应式设计，支持桌面和移动端

#### js/api.js
- **作用**: API客户端
- **功能**: 封装所有API调用

#### js/auth.js
- **作用**: 认证管理
- **功能**: 处理登录、登出、会话管理

### 配置文件

#### .env
- **作用**: 环境变量配置
- **关键配置**: PORT, DATA_DIR, DIFY_BASE_URL, DIFY_API_KEY

#### config/agents-config-simplified.json
- **作用**: Dify智能体配置
- **包含**: pet-health-assistant智能体配置

#### config/workflows-config-simplified.json
- **作用**: Dify工作流配置
- **包含**: health-analysis工作流配置

---

## 🚀 快速导航

### 启动应用

```bash
# Windows
start.bat

# 或使用npm
npm start
```

### 访问应用

- **桌面端**: http://localhost:3000
- **移动端**: http://localhost:3000/mobile.html
- **API文档**: 参考 `docs/SIMPLIFIED_STARTUP_GUIDE.md`

### 数据管理

```bash
# 备份数据
backup.bat

# 恢复数据
restore.bat

# 数据位置
data/
```

### 系统诊断

```bash
# 运行诊断
diagnose.bat

# 查看日志
backend/logs/
```

---

## 📝 注意事项

1. **数据目录**: `data/` 目录会在首次启动时自动创建
2. **备份目录**: `backups/` 目录会在首次备份时自动创建
3. **日志目录**: `backend/logs/` 目录会在首次运行时自动创建
4. **环境配置**: 请根据需要修改 `.env` 文件
5. **Dify配置**: 如需使用AI助手，请配置Dify API密钥

---

**文档版本**: 1.0.0-simplified
**更新时间**: 2024-03-31
**项目状态**: 🟢 正常运行

🎯
