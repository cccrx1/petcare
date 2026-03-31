@echo off
chcp 65001 >nul
title 系统测试工具
color 0E

echo.
echo ========================================
echo   AI宠物健康管理系统 - 系统测试
echo ========================================
echo.

echo 准备运行系统测试...
echo 此测试将验证系统的基本功能是否正常
echo.

REM 测试计数器
set /a total_tests=0
set /a passed_tests=0

REM [测试1] Node.js版本测试
echo [测试1/6] Node.js版本测试...
set /a total_tests+=1
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js未安装或不可用
) else (
    echo ✅ Node.js正常
    node --version
    set /a passed_tests+=1
)
echo.

REM [测试2] 依赖测试
echo [测试2/6] 依赖测试...
set /a total_tests+=1
if exist "node_modules\" (
    echo ✅ 依赖已安装
    set /a passed_tests+=1
) else (
    echo ❌ 依赖未安装
    echo 运行 npm install 安装依赖
)
echo.

REM [测试3] 配置文件测试
echo [测试3/6] 配置文件测试...
set /a total_tests+=1
if exist ".env" (
    echo ✅ 环境配置文件存在
    set /a passed_tests+=1
) else if exist ".env.simplified" (
    echo ⚠️  环境配置模板存在，但.env未创建
) else (
    echo ❌ 环境配置文件不存在
)
echo.

REM [测试4] 服务器文件测试
echo [测试4/6] 服务器文件测试...
set /a total_tests+=1
if exist "backend\src\server-simplified.js" (
    echo ✅ 简化版服务器文件存在
    set /a passed_tests+=1
) else if exist "backend\src\server.js" (
    echo ✅ 标准版服务器文件存在
    set /a passed_tests+=1
) else (
    echo ❌ 服务器文件不存在
)
echo.

REM [测试5] 前端文件测试
echo [测试5/6] 前端文件测试...
set /a total_tests+=1
if exist "frontend\index.html" (
    echo ✅ 桌面端文件存在
    set /a passed_tests+=1
) else (
    echo ❌ 桌面端文件不存在
)
echo.

REM [测试6] 端口测试
echo [测试6/6] 端口测试...
set /a total_tests+=1
netstat -ano | findstr :3000 >nul 2>&1
if errorlevel 1 (
    echo ✅ 端口3000可用
    set /a passed_tests+=1
) else (
    echo ⚠️  端口3000已被占用
    echo 可能需要修改.env中的PORT配置
)
echo.

REM 测试结果
echo ========================================
echo   测试结果
echo ========================================
echo.
echo 总测试: %total_tests%
echo 通过: %passed_tests%
echo 失败: %total_tests% - %passed_tests%
echo.

if %passed_tests% EQU %total_tests% (
    echo ✅ 所有测试通过！
    echo.
    echo 系统已准备就绪，可以运行 start.bat 启动服务
) else (
    echo ❌ 部分测试未通过
    echo.
    echo 建议:
    echo 1. 运行 diagnose.bat 进行详细诊断
    echo 2. 查看故障排除指南: docs\TROUBLESHOOTING.md
)

echo.
echo 按任意键退出...
pause >nul
