@echo off
echo 开始部署到云端服务器...

REM 设置服务器信息
set SERVER_HOST=root@119.45.20.245
set SERVER_PATH=/www/wwwroot/MethodMate/backend

echo 正在上传修改后的文件...
scp server/local-api.js %SERVER_HOST%:%SERVER_PATH%/

if %ERRORLEVEL% EQU 0 (
    echo 文件上传成功！
    echo 正在重启服务...
    ssh %SERVER_HOST% "cd %SERVER_PATH% && pm2 restart all && pm2 logs --lines 10"
    echo 部署完成！
) else (
    echo 上传失败，请检查网络连接和服务器密码
)

pause 