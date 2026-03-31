@echo off
chcp 65001 >nul
echo ========================================
echo   数据备份脚本
echo ========================================
echo.

set BACKUP_DIR=backups\data_%date:~0,10%_%time:~0,2%%time:~3,2%%time:~6,2%
set BACKUP_DIR=%BACKUP_DIR: =0%

echo 正在备份数据到: %BACKUP_DIR%
echo.

if not exist "data\" (
    echo ❌ 数据目录不存在
    pause
    exit /b 1
)

if exist "%BACKUP_DIR%" (
    echo ⚠️  备份目录已存在，将覆盖
    rd /s /q "%BACKUP_DIR%"
)

xcopy data "%BACKUP_DIR%" /E /I /Y >nul
if errorlevel 1 (
    echo ❌ 备份失败
    pause
    exit /b 1
)

echo ✅ 备份成功
echo 备份位置: %BACKUP_DIR%
echo.
pause
