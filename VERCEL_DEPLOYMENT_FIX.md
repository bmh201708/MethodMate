# 🚀 Vercel 部署问题解决方案

## 🔍 问题分析

你的项目有两套后端系统：

### 1. Vercel Serverless Functions (`/api` 目录)
- `scholar-search.js`
- `semantic-recommend.js` 
- `paper-download.js`
- `chat.js`
- `recommend-papers.js`

### 2. 远程 Express 服务器 (`/server` 目录，已部署到 https://fmenujeiejbj.sealoshzh.site)
- `/api/scholar-search`
- `/api/semantic-recommend`
- `/api/paper/get-full-content`
- `/api/paper/generate-method-summary`
- `/api/query-statistical-method`
- `/api/coze-chat`
- `/api/paper/get-cached-method`
- `/api/health`

## ❌ 问题原因

**在本地开发时**：
- `vite.config.js` 的代理配置将 `/api/*` 请求转发到远程服务器
- 工作正常 ✅

**在 Vercel 生产环境时**：
- `vercel.json` 的重写规则将 `/api/*` 请求路由到 Vercel 的 serverless functions
- 但很多接口（如 `/api/paper/*`, `/api/query-statistical-method` 等）只存在于远程服务器
- 导致 404 错误 ❌

## ✅ 解决方案

### 统一 API 架构（推荐）

经过测试发现，远程服务器上已经包含了所有需要的 API 接口，包括：
- `/api/scholar-search` ✅
- `/api/semantic-recommend` ✅
- `/api/paper/get-full-content` ✅
- `/api/paper/generate-method-summary` ✅
- `/api/query-statistical-method` ✅
- `/api/coze-chat` ✅
- `/api/paper/get-cached-method` ✅

因此最简单的解决方案是将所有 API 请求重定向到远程服务器：

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://fmenujeiejbj.sealoshzh.site/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

这样可以：
- ✅ 避免维护两套重复的 API 代码
- ✅ 确保所有功能都能正常工作
- ✅ 简化部署和维护流程

### 方案二：更新远程服务器 CORS 配置

确保远程服务器允许来自 Vercel 域名的请求。在 `server/local-api.js` 中更新 CORS 配置：

```javascript
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://method-mate.vercel.app',
        'https://methodmate.vercel.app', 
        'https://你的vercel域名.vercel.app',  // 替换为你的实际域名
        'http://localhost:3000',
        'http://localhost:5173',
        'https://fmenujeiejbj.sealoshzh.site'
      ]
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
```

## 🧪 测试步骤

### 1. 重新部署到 Vercel
```bash
# 提交更改
git add vercel.json
git commit -m "fix: redirect API requests to remote server"
git push

# 或者手动部署
vercel --prod
```

### 2. 检查 Vercel 域名
在 Vercel Dashboard 中找到你的项目域名，通常是：
- `https://你的项目名.vercel.app`
- `https://你的项目名-你的用户名.vercel.app`

### 3. 测试 API 连接
在浏览器中访问：
```
https://你的vercel域名.vercel.app/api/health
```

应该返回远程服务器的健康状态。

### 4. 更新远程服务器 CORS
在远程服务器上更新 CORS 配置，添加你的 Vercel 域名。

## 🔧 故障排除

### 问题1：仍然出现 404 错误
**可能原因**：
- Vercel 缓存了旧的配置
- 远程服务器 CORS 配置不正确

**解决方案**：
1. 在 Vercel Dashboard 中手动触发重新部署
2. 检查远程服务器日志
3. 确认 CORS 配置包含了 Vercel 域名

### 问题2：CORS 错误
**症状**：浏览器控制台显示跨域错误
**解决方案**：
1. 确认远程服务器的 CORS 配置正确
2. 检查 `Access-Control-Allow-Origin` 头部
3. 确保 `credentials: true` 配置正确

### 问题3：请求超时
**可能原因**：
- 远程服务器响应慢
- 网络连接问题

**解决方案**：
1. 检查远程服务器状态
2. 增加请求超时时间
3. 考虑添加重试机制

## 📊 验证清单

- [ ] `vercel.json` 已更新，重定向到远程服务器
- [ ] 项目已重新部署到 Vercel
- [ ] 远程服务器 CORS 配置包含 Vercel 域名
- [ ] 测试 `/api/health` 接口正常
- [ ] 前端功能在 Vercel 上正常工作
- [ ] 本地开发环境仍然正常

## 🎯 最终架构

```
用户浏览器
    ↓
Vercel 前端 (Vue.js)
    ↓ /api/* 请求
远程服务器 (Express.js)
    ↓
各种服务 (翻译、AI、数据库等)
```

这样既保持了本地开发的灵活性，又确保了生产环境的正常运行。 