@echo off
chcp 65001 >nul
echo ========================================
echo   数据恢复脚本
echo ========================================
echo.

if "%1"=="" (
    echo 用法: restore.bat [备份目录名]
    echo.
    echo 可用的备份目录:
    dir /b backups\ | findstr data_
    echo.
    pause
    exit /b 0
)

set BACKUP_PATH=backups\%1

if not exist "%BACKUP_PATH%" (
    echo ❌ 备份目录不存在: %BACKUP_PATH%
    pause
    exit /b 1
)

echo 即将从以下目录恢复数据:
echo %BACKUP_PATH%
echo.
echo ⚠️  警告: 这将覆盖当前的数据！
echo.
set /p confirm=确认恢复？(y/n): 

if /i not "%confirm%"=="y" (
    echo 已取消
    pause
    exit /b 0
)

echo.
echo 正在恢复数据...

xcopy "%BACKUP_PATH%" data /E /I /Y >nul
if errorlevel 1 (
    echo ❌ 恢复失败
    pause
    exit /b 1
)

echo ✅ 恢复成功
echo.
pause
