# 简单部署脚本
Write-Host "开始部署..." -ForegroundColor Green

# 步骤1: 上传文件
Write-Host "上传文件到服务器..." -ForegroundColor Yellow
scp server/local-api.js root@175.27.162.174:/www/wwwroot/MethodMate/backend/

if ($LASTEXITCODE -eq 0) {
    Write-Host "文件上传成功!" -ForegroundColor Green
    
    # 步骤2: 重启服务
    Write-Host "重启服务..." -ForegroundColor Yellow
    ssh root@175.27.162.174 "cd /www/wwwroot/MethodMate/backend && pm2 restart all"
    
    Write-Host "部署完成!" -ForegroundColor Green
} else {
    Write-Host "上传失败，请检查连接" -ForegroundColor Red
}

Read-Host "按回车键退出" 