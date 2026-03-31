# 🗑️ 文件清理计划

## ✅ 需要保留的文件

### 核心配置
- [x] `package.json` - 简化版依赖配置
- [x] `.env` - 环境配置文件
- [x] `.env.example` - 环境配置示例
- [x] `.env.simplified` - 简化版环境配置

### 服务器文件
- [x] `backend/src/server-simplified.js` - 简化版服务器
- [x] `backend/src/config/index.js` - 配置管理
- [x] `backend/src/utils/logger.js` - 日志工具
- [x] `backend/src/utils/fileStorage.js` - 文件存储
- [x] `backend/src/middleware/errorHandler.js` - 错误处理
- [x] `backend/src/services/difyService.js` - Dify服务

### 简化版控制器
- [x] `backend/src/controllers/userController-simplified.js`
- [x] `backend/src/controllers/petController-simplified.js`
- [x] `backend/src/controllers/healthController-simplified.js`
- [x] `backend/src/controllers/chatController-simplified.js`

### 简化版路由
- [x] `backend/src/routes/users-simplified.js`
- [x] `backend/src/routes/pets-simplified.js`
- [x] `backend/src/routes/health-simplified.js`
- [x] `backend/src/routes/chat-simplified.js`

### 前端文件
- [x] `frontend/index.html` - 桌面端页面
- [x] `frontend/mobile.html` - 移动端页面
- [x] `frontend/css/style.css` - 桌面端样式
- [x] `frontend/css/mobile.css` - 移动端样式
- [x] `frontend/js/api.js` - API客户端
- [x] `frontend/js/auth.js` - 认证模块
- [x] `frontend/js/chat.js` - 聊天组件
- [x] `frontend/js/app.js` - 主应用
- [x] `frontend/js/mobile-app.js` - 移动端应用

### 辅助脚本
- [x] `start.bat` - 启动脚本
- [x] `diagnose.bat` - 诊断脚本
- [x] `test.bat` - 测试脚本
- [x] `backup.bat` - 备份脚本
- [x] `restore.bat` - 恢复脚本

### 配置文件
- [x] `config/agents-config-simplified.json` - 简化版智能体配置
- [x] `config/workflows-config-simplified.json` - 简化版工作流配置
- [x] `config/SIMPLIFIED_CONFIG.md` - 简化版配置说明
- [x] `config/DIFY_OUTPUT_FORMAT.md` - Dify输出格式

### 文档
- [x] `README-SIMPLIFIED.md` - 简化版说明
- [x] `docs/SIMPLIFIED_STARTUP_GUIDE.md` - 简化版启动指南
- [x] `docs/TROUBLESHOOTING.md` - 故障排除
- [x] `docs/MOBILE_GUIDE.md` - 移动端指南
- [x] `docs/SYSTEM_CHECKLIST.md` - 系统检查清单
- [x] `docs/READY_TO_START.md` - 就绪确认
- [x] `docs/STARTUP_SUCCESS.md` - 启动成功

---

## ❌ 需要删除的文件

### 原始版本控制器
- [ ] `backend/src/controllers/userController.js` - 原始用户控制器
- [ ] `backend/src/controllers/petController.js` - 原始宠物控制器
- [ ] `backend/src/controllers/healthController.js` - 原始健康控制器
- [ ] `backend/src/controllers/chatController.js` - 原始聊天控制器
- [ ] `backend/src/controllers/feedingController.js` - 喂养控制器（未使用）
- [ ] `backend/src/controllers/trainingController.js` - 训练控制器（未使用）
- [ ] `backend/src/controllers/anomalyController.js` - 异常检测控制器（未使用）
- [ ] `backend/src/controllers/notificationController.js` - 通知控制器（未使用）

### 原始版本路由
- [ ] `backend/src/routes/users.js` - 原始用户路由
- [ ] `backend/src/routes/pets.js` - 原始宠物路由
- [ ] `backend/src/routes/health.js` - 原始健康路由
- [ ] `backend/src/routes/chat.js` - 原始聊天路由
- [ ] `backend/src/routes/feeding.js` - 喂养路由（未使用）
- [ ] `backend/src/routes/training.js` - 训练路由（未使用）
- [ ] `backend/src/routes/anomaly.js` - 异常路由（未使用）
- [ ] `backend/src/routes/notifications.js` - 通知路由（未使用）

### 数据库相关文件
- [ ] `backend/src/utils/db.js` - PostgreSQL数据库工具
- [ ] `backend/src/utils/influxdb.js` - InfluxDB数据库工具
- [ ] `backend/src/middleware/auth.js` - JWT认证中间件
- [ ] `backend/src/models/` - 数据库模型目录（整个目录）
- [ ] `backend/migrations/` - 数据库迁移目录（整个目录）

### 原始版本服务器
- [ ] `backend/src/server.js` - 原始服务器入口

### 原始版本配置
- [ ] `config/agents-config.json` - 原始智能体配置
- [ ] `config/workflows-config.json` - 原始工作流配置
- [ ] `config/api-config.json` - 原始API配置

### 原始版本文档
- [ ] `README.md` - 原始README
- [ ] `docs/API_DOCUMENTATION.md` - API文档
- [ ] `docs/DEPLOYMENT_GUIDE.md` - 部署指南
- [ ] `docs/DATABASE_SCHEMA.md` - 数据库架构
- [ ] `docs/ARCHITECTURE.md` - 系统架构

### 测试文件
- [ ] `backend/tests/` - 测试目录（整个目录）
- [ ] `test-modules.js` - 测试脚本（已删除）

### 临时文件
- [ ] `package-simplified.json` - 临时简化版package（已合并到package.json）
- [ ] `backend/src/server-simplified.js.bak` - 备份文件（如果有）

### 其他未使用文件
- [ ] `backend/src/controllers/analyticsController.js` - 分析控制器（未使用）
- [ ] `backend/src/routes/analytics.js` - 分析路由（未使用）

---

## 📊 清理统计

### 保留文件
- **配置文件**: 4个
- **服务器文件**: 7个
- **控制器**: 4个（简化版）
- **路由**: 4个（简化版）
- **前端文件**: 9个
- **辅助脚本**: 5个
- **配置文件**: 4个
- **文档文件**: 7个

**总计**: 44个文件

### 删除文件
- **原始控制器**: 8个
- **原始路由**: 8个
- **数据库文件**: 5个
- **原始服务器**: 1个
- **原始配置**: 3个
- **原始文档**: 5个
- **测试文件**: 1个目录
- **临时文件**: 2个
- **其他未使用**: 2个

**总计**: 34个文件 + 1个目录

---

## 🎯 清理后的目录结构

```
PetCare/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── userController-simplified.js
│   │   │   ├── petController-simplified.js
│   │   │   ├── healthController-simplified.js
│   │   │   └── chatController-simplified.js
│   │   ├── routes/
│   │   │   ├── users-simplified.js
│   │   │   ├── pets-simplified.js
│   │   │   ├── health-simplified.js
│   │   │   └── chat-simplified.js
│   │   ├── utils/
│   │   │   ├── logger.js
│   │   │   └── fileStorage.js
│   │   ├── middleware/
│   │   │   └── errorHandler.js
│   │   ├── services/
│   │   │   └── difyService.js
│   │   ├── config/
│   │   │   └── index.js
│   │   └── server-simplified.js
│   └── logs/ (自动创建)
├── frontend/
│   ├── index.html
│   ├── mobile.html
│   ├── css/
│   │   ├── style.css
│   │   └── mobile.css
│   └── js/
│       ├── api.js
│       ├── auth.js
│       ├── chat.js
│       ├── app.js
│       └── mobile-app.js
├── config/
│   ├── agents-config-simplified.json
│   ├── workflows-config-simplified.json
│   ├── SIMPLIFIED_CONFIG.md
│   └── DIFY_OUTPUT_FORMAT.md
├── docs/
│   ├── SIMPLIFIED_STARTUP_GUIDE.md
│   ├── TROUBLESHOOTING.md
│   ├── MOBILE_GUIDE.md
│   ├── SYSTEM_CHECKLIST.md
│   ├── READY_TO_START.md
│   └── STARTUP_SUCCESS.md
├── data/ (自动创建)
├── backups/ (自动创建)
├── .env
├── .env.example
├── .env.simplified
├── package.json
├── start.bat
├── diagnose.bat
├── test.bat
├── backup.bat
├── restore.bat
└── README-SIMPLIFIED.md
```

---

## ⚠️ 清理注意事项

1. **备份重要数据**
   - 在执行清理前，确保 `data/` 和 `backups/` 目录中的数据已备份

2. **停止服务器**
   - 清理前先停止运行中的服务器

3. **确认删除**
   - 确认要删除的文件确实不再需要

4. **保留日志**
   - 保留 `backend/logs/` 目录中的日志文件用于调试

---

## 🚀 清理后验证

清理完成后，验证系统是否正常：

```bash
# 1. 检查文件结构
dir backend\src\controllers
dir backend\src\routes

# 2. 启动服务器
npm start

# 3. 测试端点
curl http://localhost:3000/health

# 4. 访问前端
# 浏览器打开 http://localhost:3000
```

---

**清理计划创建时间**: 2024-03-31
**预计清理文件数**: 34个文件 + 1个目录
**预计保留文件数**: 44个文件
