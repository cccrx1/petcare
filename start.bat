@echo off
chcp 65001 >nul
title AI宠物健康管理系统 - 简化版
color 0A

echo.
echo ========================================
echo   AI宠物健康管理系统 - 简化版
echo   快速启动脚本
echo ========================================
echo.

REM 检查当前目录
echo 当前目录: %CD%
echo.

REM [步骤1] 检查Node.js
echo [步骤1/5] 检查Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ 未检测到Node.js
    echo.
    echo 请先安装Node.js:
    echo 1. 访问 https://nodejs.org/
    echo 2. 下载并安装LTS版本（推荐18.x或20.x）
    echo 3. 安装完成后重新运行此脚本
    echo.
    pause
    exit /b 1
)
echo ✅ Node.js已安装
node --version
npm --version
echo.

REM [步骤2] 检查package.json
echo [步骤2/5] 检查package.json...
if not exist "package.json" (
    echo ❌ 未找到package.json文件
    echo 请确保在正确的项目目录中运行此脚本
    echo.
    pause
    exit /b 1
)
echo ✅ 找到package.json文件
echo.

REM [步骤3] 检查依赖
echo [步骤3/5] 检查依赖...
if not exist "node_modules\" (
    echo 正在安装依赖，这可能需要几分钟...
    echo.
    call npm install
    if errorlevel 1 (
        echo.
        echo ❌ 依赖安装失败
        echo.
        echo 可能的原因:
        echo 1. 网络连接问题
        echo 2. npm源访问问题
        echo 3. 权限不足
        echo.
        echo 解决方案:
        echo 1. 检查网络连接
        echo 2. 尝试使用国内镜像: npm config set registry https://registry.npmmirror.com
        echo 3. 以管理员身份运行
        echo.
        pause
        exit /b 1
    )
    echo.
    echo ✅ 依赖安装完成
) else (
    echo ✅ 依赖已安装
)
echo.

REM [步骤4] 配置环境
echo [步骤4/5] 配置环境...
if not exist ".env" (
    if exist ".env.simplified" (
        echo 正在创建.env文件...
        copy .env.simplified .env >nul
        echo ✅ 环境配置已创建
    ) else if exist "package-simplified.json" (
        echo ⚠️  未找到.env.simplified文件
        echo 正在创建基本配置...
        (
            echo PORT=3000
            echo NODE_ENV=development
            echo.
            echo DIFY_BASE_URL=http://47.113.151.36//v1
            echo DIFY_API_KEY=
            echo.
            echo DATA_DIR=./data
            echo BACKUP_DIR=./backups
            echo.
            echo CORS_ORIGIN=*
            echo.
            echo LOG_LEVEL=info
            echo LOG_DIR=backend/logs
        ) > .env
        echo ✅ 基本配置已创建
    ) else (
        echo ❌ 未找到任何配置文件
        echo 请手动创建.env文件
        echo.
        pause
        exit /b 1
    )
) else (
    echo ✅ 环境配置已存在
)
echo.

REM [步骤5] 创建数据目录
echo [步骤5/5] 创建数据目录...
if not exist "data\" (
    mkdir data
    echo ✅ 数据目录已创建
) else (
    echo ✅ 数据目录已存在
)

if not exist "backups\" (
    mkdir backups
    echo ✅ 备份目录已创建
) else (
    echo ✅ 备份目录已存在
)

if not exist "backend\logs\" (
    mkdir backend\logs
    echo ✅ 日志目录已创建
) else (
    echo ✅ 日志目录已存在
)
echo.

REM 检查服务器文件
echo 检查服务器文件...
if exist "backend\src\server-simplified.js" (
    echo ✅ 找到简化版服务器文件
    set SERVER_FILE=backend\src\server-simplified.js
) else if exist "backend\src\server.js" (
    echo ✅ 找到标准版服务器文件
    set SERVER_FILE=backend\src\server.js
) else (
    echo ❌ 未找到服务器文件
    echo 请检查backend\src\目录下是否有server.js或server-simplified.js
    echo.
    pause
    exit /b 1
)
echo.

REM 启动服务
echo ========================================
echo   准备启动服务...
echo ========================================
echo.
echo 访问地址:
echo   桌面端: http://localhost:3000
echo   移动端: http://localhost:3000/mobile.html
echo.
echo 按任意键启动服务，或按Ctrl+C取消...
pause >nul

echo.
echo 正在启动服务...
echo 服务启动后，请勿关闭此窗口
echo 按 Ctrl+C 可停止服务
echo.
echo ========================================
echo.

REM 尝试启动服务
node %SERVER_FILE%

REM 如果到这里说明服务已停止
echo.
echo ========================================
echo   服务已停止
echo ========================================
echo.
pause
