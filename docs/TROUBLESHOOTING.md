# 快速故障排除指南

## 常见问题及解决方案

### 问题1：运行脚本后窗口闪退

**原因**：
- npm start 命令执行失败
- 缺少必要的文件或依赖
- 端口被占用

**解决方案**：

#### 方法1：使用诊断脚本（推荐）

1. 双击运行 `diagnose.bat`
2. 查看诊断结果
3. 根据提示解决问题

#### 方法2：手动检查

1. **检查Node.js是否安装**
   ```bash
   node --version
   ```
   如果显示版本号，说明已安装。如果提示"不是内部或外部命令"，请先安装Node.js。

2. **检查是否在正确的目录**
   - 确保在项目根目录（包含package.json的目录）
   - 可以通过 `dir` 命令查看当前目录文件

3. **检查依赖是否安装**
   - 查看 `node_modules` 文件夹是否存在
   - 如果不存在，运行：`npm install`

4. **检查服务器文件是否存在**
   - 查看 `backend\src\server.js` 或 `backend\src\server-simplified.js` 是否存在

#### 方法3：查看详细错误信息

使用命令提示符（CMD）手动运行：

```bash
# 1. 打开命令提示符
# 2. 进入项目目录
cd C:\PetCare

# 3. 尝试启动服务
npm start
```

这样可以看到详细的错误信息。

---

### 问题2：Node.js未安装

**症状**：
- 运行 `node --version` 提示"不是内部或外部命令"

**解决方案**：

1. 访问 [Node.js官网](https://nodejs.org/)
2. 下载LTS版本（推荐18.x或20.x）
3. 运行安装程序，按照提示完成安装
4. 重新打开命令提示符
5. 验证安装：`node --version`

---

### 问题3：依赖安装失败

**症状**：
- `npm install` 命令执行失败
- 提示网络错误或权限错误

**解决方案**：

#### 网络问题

1. 检查网络连接
2. 使用国内镜像：
   ```bash
   npm config set registry https://registry.npmmirror.com
   npm install
   ```

#### 权限问题

1. 以管理员身份运行命令提示符
2. 右键点击"命令提示符" → "以管理员身份运行"

#### 其他问题

1. 删除 `node_modules` 文件夹和 `package-lock.json` 文件
2. 重新运行：`npm install`

---

### 问题4：端口被占用

**症状**：
- 提示 "EADDRINUSE: address already in use :::3000"
- 服务无法启动

**解决方案**：

#### 方法1：修改端口

编辑 `.env` 文件，修改端口：
```env
PORT=3001
```

#### 方法2：停止占用端口的程序

1. 查找占用端口的进程：
   ```bash
   netstat -ano | findstr :3000
   ```
2. 记下PID（最后一列的数字）
3. 结束进程：
   ```bash
   taskkill /PID 进程号 /F
   ```

---

### 问题5：找不到服务器文件

**症状**：
- 提示 "Cannot find module" 或类似的错误
- 无法启动服务

**解决方案**：

1. 检查文件是否存在：
   - `backend\src\server.js`（标准版）
   - `backend\src\server-simplified.js`（简化版）

2. 如果文件不存在，可能是：
   - 文件被删除
   - 项目不完整
   - 在错误的目录

3. 确保在正确的项目目录，重新下载项目文件

---

### 问题6：无法访问前端页面

**症状**：
- 服务启动成功
- 但浏览器无法访问 http://localhost:3000

**解决方案**：

1. **检查服务是否真的启动**
   - 查看命令提示符中的输出
   - 应该看到 "Server running on port 3000"

2. **检查防火墙**
   - 临时关闭防火墙测试
   - 或添加Node.js到防火墙允许列表

3. **尝试其他浏览器**
   - Chrome
   - Firefox
   - Edge

4. **清除浏览器缓存**
   - Ctrl + Shift + Delete
   - 清除缓存和Cookie

5. **检查端口是否正确**
   - 确认访问的是配置的端口（默认3000）

---

### 问题7：数据文件错误

**症状**：
- 提示JSON解析错误
- 数据无法读取或保存

**解决方案**：

1. **检查JSON文件格式**
   - 使用文本编辑器打开 `data` 目录下的JSON文件
   - 确保格式正确（逗号、引号等）
   - 可以使用在线JSON验证工具验证

2. **清空数据重新开始**
   - 停止服务
   - 删除 `data` 目录下的所有文件
   - 重启服务

3. **从备份恢复**
   - 如果有备份，使用 `restore.bat` 恢复数据

---

### 问题8：Dify连接失败

**症状**：
- AI助手无法使用
- 提示连接错误

**解决方案**：

1. **检查Dify配置**
   - 确认 `.env` 文件中的 `DIFY_API_KEY` 已填写
   - 确认 `config/agents-config-simplified.json` 中的配置正确

2. **检查网络连接**
   - 确保可以访问Dify服务器
   - 尝试在浏览器中访问：`http://47.113.151.36`

3. **不使用AI功能**
   - 如果不需要AI功能，可以不配置Dify
   - 系统仍可正常使用其他功能

---

## 获取帮助

### 查看日志

```bash
# 查看所有日志
type backend\logs\combined.log

# 查看错误日志
type backend\logs\error.log
```

### 运行诊断

```bash
# 双击运行
diagnose.bat
```

### 查看文档

- [简化版启动指南](SIMPLIFIED_STARTUP_GUIDE.md)
- [简化版配置说明](../config/SIMPLIFIED_CONFIG.md)
- [简化版README](../README-SIMPLIFIED.md)

---

## 常用命令

### 检查Node.js版本
```bash
node --version
npm --version
```

### 安装依赖
```bash
npm install
```

### 启动服务
```bash
npm start
```

### 开发模式（自动重启）
```bash
npm run dev
```

### 备份数据
```bash
backup.bat
```

### 恢复数据
```bash
restore.bat
```

---

## 联系支持

如果以上方法都无法解决问题：

1. 收集错误信息
2. 查看日志文件
3. 记录操作步骤
4. 联系技术支持

---

**提示**：大多数问题都可以通过运行 `diagnose.bat` 诊断脚本找到原因。
