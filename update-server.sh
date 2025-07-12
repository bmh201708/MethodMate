#!/bin/bash

# 更新云端服务器的脚本
# 使用方法: ./update-server.sh

echo "开始更新云端服务器代码..."

# 检查是否有SSH配置
if [ ! -f ~/.ssh/config ] && [ -z "$SSH_HOST" ]; then
    echo "请设置SSH连接信息："
    echo "方法1: 设置环境变量 export SSH_HOST=root@175.27.251.132"
    echo "方法2: 在~/.ssh/config中配置连接信息"
    exit 1
fi

# 设置服务器信息
SERVER_HOST=${SSH_HOST:-"root@175.27.251.132"}
SERVER_PATH="/www/wwwroot/MethodMate/backend"

echo "连接到服务器: $SERVER_HOST"
echo "服务器路径: $SERVER_PATH"

# 将修改后的文件上传到服务器
echo "上传修改后的local-api.js文件..."
scp server/local-api.js $SERVER_HOST:$SERVER_PATH/

# 重启PM2服务
echo "重启后端服务..."
ssh $SERVER_HOST << 'EOF'
cd /www/wwwroot/MethodMate/backend
pm2 restart all
pm2 logs --lines 20
EOF

echo "更新完成！"
echo "请查看上面的日志确认服务启动正常" 