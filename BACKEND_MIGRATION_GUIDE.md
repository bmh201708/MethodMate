# 后端服务迁移配置指南

## 🎯 当前状态

你已经成功将 `/server` 后端服务部署到：
```
https://fmenujeiejbj.sealoshzh.site
```

## ✅ 已完成的配置

### 1. 前端代理配置已更新
`vite.config.js` 中的代理配置已更新：
```javascript
proxy: {
  '/api': {
    target: 'https://fmenujeiejbj.sealoshzh.site',
    changeOrigin: true,
    secure: true,
    rewrite: (path) => path
  }
}
```

## 🔧 需要完成的配置

### 1. 更新服务器 CORS 配置

你需要在远程服务器上更新 `server/local-api.js` 文件中的 CORS 配置，添加你的 Vercel 前端域名。

**步骤：**

1. **获取你的 Vercel 部署域名**
   - 登录 Vercel 控制台
   - 查看你的项目部署地址，通常类似：
     - `https://your-app-name.vercel.app`
     - `https://your-app-name-hash.vercel.app`

2. **更新 CORS 配置**
   在远程服务器的 `server/local-api.js` 文件中，找到第20行左右的 CORS 配置：

   ```javascript
   // 当前配置
   const corsOptions = {
     origin: process.env.NODE_ENV === 'production' 
       ? ['https://method-mate.vercel.app', 'https://methodmate.vercel.app'] 
       : ['http://localhost:5173', 'http://localhost:3000'],
     credentials: true,
     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
     allowedHeaders: ['Content-Type', 'Authorization']
   };
   ```

   **更新为：**
   ```javascript
   const corsOptions = {
     origin: process.env.NODE_ENV === 'production' 
       ? [
           'https://method-mate.vercel.app', 
           'https://methodmate.vercel.app',
           'https://你的实际vercel域名.vercel.app',  // 替换为实际域名
           'https://fmenujeiejbj.sealoshzh.site'    // 允许后端自己访问
         ]
       : ['http://localhost:5173', 'http://localhost:3000'],
     credentials: true,
     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
     allowedHeaders: ['Content-Type', 'Authorization']
   };
   ```

3. **重启远程服务器**
   更新配置后，重启你的远程服务器以使配置生效。

## 🧪 测试连接

### 1. 本地开发测试

启动本地开发服务器：
```bash
npm run dev
```

现在所有的 `/api` 请求都会被代理到 `https://fmenujeiejbj.sealoshzh.site`

### 2. 测试步骤

1. **健康检查测试**
   ```bash
   curl https://fmenujeiejbj.sealoshzh.site/api/health
   ```
   
   期望返回：
   ```json
   {
     "status": "healthy",
     "timestamp": "2024-01-20T10:30:00.000Z",
     "uptime": 123,
     "environment": "production"
   }
   ```

2. **前端API调用测试**
   在浏览器中打开开发环境：`http://localhost:3000`
   
   检查浏览器控制台，确保没有 CORS 错误。

3. **功能测试**
   - 尝试学者搜索功能
   - 测试文献推荐功能
   - 验证聊天功能

## 🐛 故障排除

### CORS 错误
如果看到类似错误：
```
Access to fetch at 'https://fmenujeiejbj.sealoshzh.site/api/...' 
from origin 'http://localhost:3000' has been blocked by CORS policy
```

**解决方案：**
1. 确认远程服务器的 CORS 配置已更新
2. 确认服务器已重启
3. 清除浏览器缓存

### 网络连接问题
如果请求超时或连接被拒绝：
1. 确认远程服务器运行正常
2. 检查防火墙设置
3. 验证域名解析

### API 调用失败
如果API返回错误：
1. 检查环境变量配置
2. 验证API密钥有效性
3. 查看服务器日志

## 📋 检查清单

在部署到生产环境之前，请确认：

- [ ] 远程服务器运行正常
- [ ] CORS 配置已更新并包含你的 Vercel 域名
- [ ] 健康检查端点可访问
- [ ] 本地开发环境可正常调用远程API
- [ ] 所有功能模块测试通过
- [ ] 环境变量已正确配置
- [ ] 服务器日志无错误

## 🚀 生产环境部署

完成测试后，你可以：

1. **部署前端到 Vercel**
   ```bash
   npm run build
   # 推送到 GitHub，触发 Vercel 自动部署
   git add .
   git commit -m "update backend proxy to remote server"
   git push
   ```

2. **验证生产环境**
   - 访问 Vercel 部署的前端
   - 测试所有功能
   - 监控错误日志

## 💡 优化建议

1. **性能优化**
   - 为远程API添加缓存
   - 设置合理的超时时间
   - 实施请求重试机制

2. **监控配置**
   - 设置服务器监控
   - 配置日志收集
   - 实施告警机制

3. **安全加固**
   - 限制API访问频率
   - 实施IP白名单（如需要）
   - 定期更新依赖包

---

## 🎉 迁移完成

完成上述配置后，你的架构将是：

```
前端 (Vercel) → 后端API (/api on Vercel) + 后端服务 (https://fmenujeiejbj.sealoshzh.site)
```

这样可以充分利用 Vercel 的 CDN 和无服务器函数，同时使用你的远程服务器处理复杂的 Express 应用逻辑。 