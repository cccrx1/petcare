@echo off
chcp 65001 >nul
title 系统诊断工具
color 0B

echo.
echo ========================================
echo   AI宠物健康管理系统 - 系统诊断
echo ========================================
echo.

REM 诊断计数器
set /a total_checks=0
set /a passed_checks=0
set /a failed_checks=0

REM [检查1] Node.js安装
echo [检查1/8] Node.js安装状态...
set /a total_checks+=1
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js未安装
    echo.
    echo 解决方案:
    echo 1. 访问 https://nodejs.org/
    echo 2. 下载并安装LTS版本
    echo 3. 重新运行此诊断
    set /a failed_checks+=1
) else (
    echo ✅ Node.js已安装
    node --version
    npm --version
    set /a passed_checks+=1
)
echo.

REM [检查2] 当前目录
echo [检查2/8] 当前目录检查...
set /a total_checks+=1
if exist "package.json" (
    echo ✅ 当前目录正确
    echo 目录: %CD%
    set /a passed_checks+=1
) else (
    echo ❌ 当前目录不正确
    echo 当前目录: %CD%
    echo.
    echo 请进入项目目录后运行此脚本:
    echo cd 项目目录路径
    echo 系统诊断
    set /a failed_checks+=1
)
echo.

REM [检查3] 依赖安装
echo [检查3/8] 依赖安装状态...
set /a total_checks+=1
if exist "node_modules\" (
    echo ✅ 依赖已安装
    dir node_modules /b | find /c /v "" >nul
    set /a passed_checks+=1
) else (
    echo ❌ 依赖未安装
    echo.
    echo 解决方案:
    echo npm install
    set /a failed_checks+=1
)
echo.

REM [检查4] 环境配置
echo [检查4/8] 环境配置...
set /a total_checks+=1
if exist ".env" (
    echo ✅ 环境配置已创建
    set /a passed_checks+=1
) else if exist ".env.simplified" (
    echo ⚠️  环境配置模板存在，但未创建.env
    echo.
    echo 解决方案:
    echo copy .env.simplified .env
    set /a failed_checks+=1
) else (
    echo ❌ 未找到环境配置文件
    echo.
    echo 解决方案:
    echo 手动创建.env文件
    set /a failed_checks+=1
)
echo.

REM [检查5] 服务器文件
echo [检查5/8] 服务器文件...
set /a total_checks+=1
if exist "backend\src\server-simplified.js" (
    echo ✅ 找到简化版服务器文件
    set /a passed_checks+=1
) else if exist "backend\src\server.js" (
    echo ✅ 找到标准版服务器文件
    set /a passed_checks+=1
) else (
    echo ❌ 未找到服务器文件
    echo.
    echo 期望位置: backend\src\server.js 或 backend\src\server-simplified.js
    set /a failed_checks+=1
)
echo.

REM [检查6] 数据目录
echo [检查6/8] 数据目录...
set /a total_checks+=1
if exist "data\" (
    echo ✅ 数据目录已创建
    set /a passed_checks+=1
) else (
    echo ⚠️  数据目录未创建（启动时会自动创建）
    set /a passed_checks+=1
)
echo.

REM [检查7] 端口占用
echo [检查7/8] 端口3000占用状态...
set /a total_checks+=1
netstat -ano | findstr :3000 >nul 2>&1
if errorlevel 1 (
    echo ✅ 端口3000未被占用
    set /a passed_checks+=1
) else (
    echo ⚠️  端口3000已被占用
    echo.
    echo 占用进程:
    netstat -ano | findstr :3000
    echo.
    echo 解决方案:
    echo 1. 修改.env文件中的PORT为其他端口
    echo 2. 或停止占用3000端口的程序
    set /a failed_checks+=1
)
echo.

REM [检查8] 网络连接
echo [检查8/8] 网络连接...
set /a total_checks+=1
ping -n 1 127.0.0.1 >nul 2>&1
if errorlevel 1 (
    echo ❌ 网络连接异常
    set /a failed_checks+=1
) else (
    echo ✅ 网络连接正常
    set /a passed_checks+=1
)
echo.

REM 诊断结果汇总
echo ========================================
echo   诊断结果汇总
echo ========================================
echo.
echo 总检查项: %total_checks%
echo 通过: %passed_checks%
echo 失败: %failed_checks%
echo.

if %failed_checks% EQU 0 (
    echo ✅ 所有检查通过！系统状态良好
    echo.
    echo 您可以运行 start.bat 启动服务
) else (
    echo ❌ 发现 %failed_checks% 个问题需要解决
    echo.
    echo 请根据上述提示解决问题后重新诊断
)
echo.

REM 询问是否自动修复
if %failed_checks% GTR 0 (
    echo 是否尝试自动修复可修复的问题？ (Y/N)
    set /p auto_fix="请选择: "
    if /i "%auto_fix%"=="Y" (
        echo.
        echo 尝试自动修复...
        echo.

        REM 修复环境配置
        if not exist ".env" (
            if exist ".env.simplified" (
                copy .env.simplified .env >nul 2>&1
                echo ✅ 已创建.env文件
            )
        )

        REM 修复数据目录
        if not exist "data\" (
            mkdir data
            echo ✅ 已创建data目录
        )

        if not exist "backups\" (
            mkdir backups
            echo ✅ 已创建backups目录
        )

        if not exist "backend\logs\" (
            mkdir backend\logs
            echo ✅ 已创建backend\logs目录
        )

        echo.
        echo 自动修复完成，请重新运行诊断
    )
)

echo.
echo 按任意键退出...
pause >nul
