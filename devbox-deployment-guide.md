# DevBox 部署操作指南

## 🎯 准备工作（5分钟）

### 1. 检查文件
确保项目根目录有以下文件：
- ✅ `Dockerfile` 
- ✅ `.dockerignore`
- ✅ `server/` 目录及所有文件

### 2. 本地测试（可选但推荐）
```bash
# 构建 Docker 镜像
docker build -t methodmate-server .

# 本地运行测试
docker run -p 3002:3002 -e NODE_ENV=production methodmate-server

# 测试健康检查端点
curl http://localhost:3002/api/health
```

## 🚀 DevBox 部署步骤（10分钟）

### Step 1: 注册并登录 DevBox

1. 访问 [DevBox.cn](https://devbox.cn)
2. 使用 GitHub 账号注册/登录
3. 进入控制台

### Step 2: 创建新项目

1. 点击 **"新建项目"**
2. 选择 **"从 Git 仓库导入"**
3. 选择你的 GitHub 仓库：`MethodMate-feature-download-papers`
4. 选择分支：`ForDeployment`

### Step 3: 配置项目设置

#### 基本设置
- **项目名称**：`methodmate-server`
- **服务端口**：`3002`
- **健康检查路径**：`/api/health`
- **构建方式**：**自动检测**（会检测到 Dockerfile）

#### 高级设置
- **CPU**：0.5 核（可后续调整）
- **内存**：1GB（推荐）
- **磁盘**：10GB

### Step 4: 配置环境变量

在项目设置中添加以下环境变量：

```env
# 必须配置的环境变量
CORE_API_KEY=your_core_api_key_here
SEMANTIC_API_KEY=your_semantic_scholar_api_key_here
COZE_API_KEY=your_coze_api_key_here
COZE_API_URL=https://api.coze.com
COZE_BOT_ID=your_coze_bot_id_here
COZE_BOT_ID_Reference=your_coze_reference_bot_id_here
COZE_USER_ID=your_coze_user_id_here

# 服务器配置
NODE_ENV=production
PORT=3002
```

**重要**：请将 `your_xxx_here` 替换为实际的 API 密钥！

### Step 5: 部署

1. 点击 **"部署"** 按钮
2. DevBox 将自动：
   - 拉取代码
   - 构建 Docker 镜像
   - 启动容器
   - 分配访问地址

### Step 6: 获取访问地址

部署成功后，你将得到类似这样的地址：
```
https://your-project-name.devbox.run
```

## ✅ 部署验证（2分钟）

### 1. 检查服务状态
访问健康检查端点：
```
https://your-project-name.devbox.run/api/health
```

应该返回：
```json
{
  "status": "healthy",
  "timestamp": "2024-01-20T10:30:00.000Z",
  "uptime": 123,
  "environment": "production"
}
```

### 2. 测试 API 接口
尝试访问一个 API 端点：
```
POST https://your-project-name.devbox.run/api/scholar-search
Content-Type: application/json

{
  "query": "machine learning",
  "limit": 5
}
```

## 🔧 更新 CORS 配置

部署成功后，需要更新 CORS 配置：

1. **获取实际的 DevBox 域名**
2. **更新代码**：
   ```javascript
   // server/local-api.js 第20-27行
   const corsOptions = {
     origin: process.env.NODE_ENV === 'production' 
       ? [
           'https://method-mate.vercel.app', 
           'https://methodmate.vercel.app',
           'https://your-actual-devbox-domain.devbox.run'  // 替换这里
         ]
       : ['http://localhost:5173', 'http://localhost:3000'],
   ```

3. **提交代码并重新部署**：
   ```bash
   git add .
   git commit -m "update CORS for DevBox deployment"
   git push
   ```

4. **在 DevBox 控制台点击重新部署**

## 📊 监控和日志

### 查看实时日志
1. 进入 DevBox 项目详情页
2. 点击 **"日志"** 标签
3. 查看实时应用日志

### 监控指标
DevBox 提供以下监控：
- CPU 使用率
- 内存使用率
- 网络流量
- 请求数量

### 设置告警
在项目设置中配置：
- CPU 使用率 > 80% 时告警
- 内存使用率 > 90% 时告警
- 5分钟内无响应时告警

## 🔄 自动部署配置

### 设置 Git 自动部署
1. 在 DevBox 项目设置中
2. 开启 **"Git 自动部署"**
3. 选择监听分支：`ForDeployment`
4. 每次推送代码后自动重新部署

### Webhook 配置（可选）
如果需要更复杂的 CI/CD，可以配置 Webhook：
```bash
# 手动触发部署
curl -X POST "https://api.devbox.cn/v1/projects/your-project-id/deploy" \
  -H "Authorization: Bearer your-api-token"
```

## 🌐 域名配置（可选）

### 绑定自定义域名
1. 在 DevBox 控制台添加域名
2. 配置 DNS CNAME 记录：
   ```
   api.your-domain.com CNAME your-project-name.devbox.run
   ```
3. DevBox 自动申请 SSL 证书

### 更新前端配置
更新前端中的 API 基础地址：
```javascript
// 前端配置
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://api.your-domain.com'  // 自定义域名
  : 'http://localhost:3002';
```

## 🛠️ 故障排除

### 常见问题

#### 1. 构建失败
**症状**：Docker 构建过程中出错
**解决**：
```bash
# 检查 Dockerfile 语法
# 确保 server/package.json 存在
# 检查构建日志
```

#### 2. 容器启动失败
**症状**：应用无法启动
**解决**：
- 检查端口配置（必须是 3002）
- 验证环境变量是否正确
- 查看启动日志

#### 3. 健康检查失败
**症状**：DevBox 显示服务不健康
**解决**：
- 确认 `/api/health` 端点正常
- 检查应用是否在 3002 端口监听
- 验证防火墙设置

#### 4. API 调用失败
**症状**：前端无法调用后端 API
**解决**：
- 检查 CORS 配置
- 验证 API 密钥是否正确
- 确认网络连通性

### 调试命令

```bash
# 查看容器日志
docker logs <container-id>

# 进入容器调试
docker exec -it <container-id> /bin/sh

# 检查端口监听
netstat -tlnp | grep 3002

# 测试 API 连通性
curl -v https://your-devbox-app.devbox.run/api/health
```

## 💰 成本优化

### DevBox 收费模式
- **免费层**：1个项目，512MB内存，100小时/月
- **基础版**：¥29/月，2GB内存，无时间限制
- **专业版**：¥99/月，4GB内存，更多功能

### 优化建议
1. **开发阶段**：使用免费层
2. **生产阶段**：升级到基础版
3. **高流量**：考虑专业版或迁移到 ECS

## 🎉 部署完成

恭喜！你的 MethodMate 后端服务已成功部署到 DevBox。

**下一步**：
1. ✅ 测试所有 API 接口
2. ✅ 更新前端 API 地址
3. ✅ 配置监控告警
4. ✅ 设置自动部署

**访问地址**：`https://your-project-name.devbox.run`

需要帮助？查看 [DevBox 官方文档](https://docs.devbox.cn) 或联系技术支持。 