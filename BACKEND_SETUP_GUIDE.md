# 🚀 MethodMate 后端设置指南

## 📊 当前状态

✅ **远程服务器**：`https://fmenujeiejbj.sealoshzh.site` - 正常运行  
❌ **本地服务器**：`localhost:3002` - 未启动

## 🎯 解决方案

现在你有两种方式运行项目：

### 方案一：使用远程后端（默认推荐）

```bash
# 默认启动项目（使用远程后端）
npm run dev

# 或者明确指定使用远程后端
npm run dev:remote
```

这会将所有 `/api` 请求转发到 `https://fmenujeiejbj.sealoshzh.site`

### 方案二：使用本地后端

如果你想使用本地后端，需要先启动本地服务器：

```bash
# 1. 启动本地后端服务器
cd server
npm start

# 2. 在新的终端窗口中启动前端（使用本地后端）
npm run dev:local
```

## ⚙️ 配置说明

我已经为你修改了配置，现在可以灵活切换：

### vite.config.js 配置
```javascript
proxy: {
  '/api': {
    target: process.env.USE_REMOTE_BACKEND === 'false' 
      ? 'http://localhost:3002'                 // 本地后端
      : 'https://fmenujeiejbj.sealoshzh.site',  // 远程后端（默认）
    changeOrigin: true,
    secure: process.env.USE_REMOTE_BACKEND !== 'false',
    rewrite: (path) => path
  }
}
```

### 更新的 npm 脚本
```json
{
  "dev": "vite",                                    // 默认使用远程后端
  "dev:local": "cross-env USE_REMOTE_BACKEND=false vite", // 明确使用本地后端
  "dev:remote": "vite"                              // 使用远程后端（与默认相同）
}
```

## 🔧 CORS 配置需求

如果使用远程后端时遇到 CORS 错误，需要在远程服务器的 `server/local-api.js` 中更新配置：

```javascript
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://method-mate.vercel.app', 
        'https://methodmate.vercel.app',
        'https://你的vercel域名.vercel.app',
        'http://localhost:3000',              // 本地开发
        'http://localhost:5173',              // Vite 默认端口
        'https://fmenujeiejbj.sealoshzh.site' // 允许后端自己访问
      ]
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
```

## 🧪 测试连接

使用测试脚本检查服务器状态：

```bash
node test-backend.js
```

这会告诉你哪个服务器可用，并推荐使用哪种启动方式。

## 🚀 推荐工作流

### 开发阶段
```bash
# 默认启动（使用远程后端，推荐）
npm run dev
```

### 需要调试后端时
```bash
# 终端1：启动本地后端
cd server
npm start

# 终端2：启动前端连接本地后端
npm run dev:local
```

### 生产部署
```bash
# 构建前端（自动连接到远程后端）
npm run build
```

## ❓ 故障排除

### 问题1：CORS 错误
**症状**：浏览器控制台显示跨域错误
**解决**：更新远程服务器的 CORS 配置

### 问题2：远程连接失败
**症状**：API 调用超时或失败
**解决**：
1. 检查远程服务器状态
2. 验证网络连接
3. 确认防火墙设置

### 问题3：本地服务器启动失败
**症状**：`npm start` 在 server 目录失败
**解决**：
1. 检查端口3002是否被占用
2. 验证环境变量配置
3. 确认依赖安装完整

## 🎉 总结

现在你可以：
- ✅ 使用 `npm run dev` 默认连接远程后端（推荐）
- ✅ 使用 `npm run dev:local` 连接本地后端
- ✅ 使用 `npm run dev:remote` 明确连接远程后端
- ✅ 使用 `node test-backend.js` 测试连接状态
- ✅ 灵活切换开发模式

**默认使用远程后端**进行日常开发，只有在需要调试后端代码时才使用本地后端。 