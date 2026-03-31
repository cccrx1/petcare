# AI宠物健康管理系统 - 简化版

基于多智能体技术的宠物健康管理平台 - Windows本地部署版

## 📋 版本说明

这是项目的**简化版**，专为Windows本地部署设计，移除了复杂的数据库和认证系统，让部署变得简单快捷。

### 简化版特点

- ✅ **无需数据库** - 使用本地JSON文件存储
- ✅ **无需密码** - 简单的邮箱登录
- ✅ **快速部署** - 5分钟即可启动
- ✅ **保留AI功能** - 集成Dify智能体
- ✅ **移动端支持** - 响应式设计

### 移除的功能

- ❌ PostgreSQL数据库
- ❌ InfluxDB时序数据库
- ❌ JWT认证系统
- ❌ 复杂的工作流系统
- ❌ 部分智能体和工作流

---

## 🚀 快速开始

### 前置要求

- Windows 10/11
- Node.js 14.x 或更高版本

### 安装步骤

#### 方式一：使用启动脚本（推荐）

1. **双击运行 `diagnose.bat`**
   - 检查系统环境
   - 自动修复可修复的问题

2. **双击运行 `start.bat`**
   - 自动完成所有配置
   - 启动服务

3. **访问应用**
   ```
   桌面端：http://localhost:3000
   移动端：http://localhost:3000/mobile.html
   ```

#### 方式二：手动安装

1. **安装Node.js**
   ```
   下载并安装：https://nodejs.org/
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **配置环境**
   ```bash
   copy .env.simplified .env
   ```

4. **启动服务**
   ```bash
   npm start
   ```

5. **访问应用**
   ```
   桌面端：http://localhost:3000
   移动端：http://localhost:3000/mobile.html
   ```

### ⚠️ 遇到问题？

如果运行脚本后窗口闪退或遇到其他问题：

1. **运行诊断脚本**：双击 `diagnose.bat`
2. **查看故障排除指南**：[docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)
3. **运行测试脚本**：双击 `test.bat`

常见问题：
- ❌ 窗口闪退 → 运行 `diagnose.bat` 检查环境
- ❌ Node.js未安装 → 访问 https://nodejs.org/ 下载安装
- ❌ 依赖安装失败 → 检查网络连接，尝试使用国内镜像
- ❌ 端口被占用 → 修改 `.env` 中的 `PORT` 为其他端口

详细说明请查看：[简化版启动指南](docs/SIMPLIFIED_STARTUP_GUIDE.md)

---

## 📁 项目结构

```
PetCare/
├── backend/                    # 后端代码
│   ├── src/
│   │   ├── controllers/       # 控制器
│   │   ├── routes/            # 路由
│   │   ├── utils/             # 工具函数
│   │   │   ├── fileStorage.js # 本地文件存储
│   │   │   └── logger.js      # 日志工具
│   │   └── server-simplified.js
│   └── logs/                  # 日志文件
├── frontend/                  # 前端代码
│   ├── index.html             # 桌面端
│   ├── mobile.html            # 移动端
│   ├── css/                   # 样式
│   └── js/                    # 脚本
├── config/                    # 配置文件
│   ├── agents-config-simplified.json
│   └── workflows-config-simplified.json
├── data/                      # 数据存储（自动创建）
├── backups/                   # 数据备份（自动创建）
└── docs/                      # 文档
```

---

## ⚙️ 配置说明

### 环境配置（.env）

```env
PORT=3000
NODE_ENV=development

# Dify配置（可选）
DIFY_BASE_URL=http://47.113.151.36//v1
DIFY_API_KEY=

# 数据存储
DATA_DIR=./data
BACKUP_DIR=./backups
```

### Dify智能体配置

简化版仅配置1个智能体：

**宠物健康助手**（pet-health-assistant）
- 功能：健康咨询、喂养建议、行为指导
- 配置文件：`config/agents-config-simplified.json`

### 工作流配置

简化版仅保留1个工作流（可选）：

**健康分析工作流**（health-analysis-workflow）
- 功能：分析健康数据并提供建议
- 状态：默认禁用
- 配置文件：`config/workflows-config-simplified.json`

---

## 💡 核心功能

### 1. 用户管理
- 邮箱登录（无需密码）
- 个人资料管理
- 简单会话管理

### 2. 宠物档案
- 创建宠物档案
- 编辑宠物信息
- 删除宠物

### 3. 健康监测
- 记录健康数据
- 查看健康记录
- 健康趋势分析

### 4. AI助手
- 智能问答
- 健康咨询
- 喂养建议
- 行为指导

---

## 📱 访问方式

### 桌面端
```
http://localhost:3000
```

### 移动端
```
http://localhost:3000/mobile.html
```

### 添加到桌面（PWA体验）

**Windows Chrome**：
1. 访问移动端页面
2. 点击地址栏右侧的安装图标
3. 选择"安装"或"创建快捷方式"

**iOS Safari**：
1. 访问移动端页面
2. 点击分享按钮
3. 选择"添加到主屏幕"

---

## 💾 数据管理

### 数据存储位置

所有数据存储在 `data` 目录下：
- `users.json` - 用户信息
- `pets.json` - 宠物档案
- `health_records.json` - 健康记录
- `chat_messages.json` - 聊天记录

### 备份数据

```bash
# Windows命令提示符
xcopy data backups\data_%date:~0,10% /E /I /Y

# PowerShell
Copy-Item -Path data -Destination "backups\data_$(Get-Date -Format 'yyyy-MM-dd')" -Recurse
```

### 恢复数据

```bash
# 从备份恢复
xcopy backups\data_2024-03-30 data /E /I /Y
```

### 清空数据

删除 `data` 目录下的所有文件即可清空所有数据。

---

## 🐛 常见问题

### Q: 启动失败，提示端口被占用？

**A**: 修改 `.env` 文件中的 `PORT` 为其他端口。

### Q: 无法连接Dify智能体？

**A**: 
1. 检查Dify API密钥是否正确
2. 检查网络连接
3. 或不配置Dify，仅使用基础功能

### Q: 数据丢失了怎么办？

**A**: 
1. 从 `backups` 目录恢复数据
2. 如果没有备份，数据无法恢复
3. 建议定期备份数据

### Q: 如何完全重置系统？

**A**: 
1. 停止服务
2. 删除 `data` 和 `backups` 目录
3. 重启服务

更多问题请查看：[简化版启动指南](docs/SIMPLIFIED_STARTUP_GUIDE.md)

---

## 🔒 安全建议

1. **不要在公网部署** - 简化版仅适合本地使用
2. **定期备份数据** - 防止数据丢失
3. **保护数据目录** - 不要让他人访问 `data` 目录
4. **使用防火墙** - 限制外部访问
5. **及时更新** - 定期更新Node.js和依赖包

---

## 📚 文档

- [简化版启动指南](docs/SIMPLIFIED_STARTUP_GUIDE.md) - 详细的部署和使用说明
- [移动端使用指南](docs/MOBILE_GUIDE.md) - 移动端功能说明
- [完整版README](README.md) - 完整版项目说明（包含数据库和认证）

---

## 🔄 版本对比

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

## 📝 开发者信息

### 修改配置

编辑 `.env` 文件修改服务器配置。

### 查看日志

```bash
# 查看所有日志
type backend\logs\combined.log

# 查看错误日志
type backend\logs\error.log
```

### 开发模式

```bash
npm run dev
```

使用nodemon自动重启，便于开发调试。

---

## 🎯 适用场景

- ✅ 个人使用
- ✅ 小团队测试
- ✅ 快速原型开发
- ✅ 功能演示
- ❌ 生产环境（请使用完整版）

---

## 📄 许可证

MIT License

---

## 🙏 致谢

感谢所有为项目做出贡献的开发者！

---

**版本**：1.0.0-simplified  
**更新日期**：2024-03-30  
**适用平台**：Windows 10/11

**提示**：简化版适合个人使用和小团队测试，如需生产环境部署，请使用完整版。
