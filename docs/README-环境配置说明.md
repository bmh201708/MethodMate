# MethodMate 环境配置说明

## 概述

MethodMate 现已支持灵活的环境配置功能，您可以轻松在本地开发服务器和云服务器之间切换，无需修改代码。

## 功能特性

### 🔄 环境类型

- **本地环境** (`local`): 使用本地开发服务器 (localhost:3004)
- **云服务器** (`remote`): 使用生产环境云服务器 (175.27.162.174:3004)
- **开发环境** (`development`): 根据当前模式自动选择

### 🎯 智能配置

- **自动检测**: 开发模式下默认使用本地环境，生产模式下使用云服务器
- **持久化存储**: 环境设置保存在 localStorage 中，重启应用后保持
- **URL 参数支持**: 通过 `?env=local` 或 `?env=remote` 快速切换
- **优先级**: URL参数 > localStorage > 环境变量 > 默认值

## 使用方法

### 1. 界面切换

在导航栏右上角可以看到环境指示器：
- 🟢 绿点：本地环境
- 🔵 蓝点：云服务器  
- 🟡 黄点：开发环境

点击"切换"按钮可以选择不同的环境。

### 2. 命令行启动

```bash
# 启动本地环境（使用本地后端）
npm run dev:local

# 启动远程环境（使用云服务器）
npm run dev:remote

# 同时启动后端和前端（推荐开发时使用）
npm run dev:all
```

### 3. URL 参数切换

直接在浏览器地址栏添加参数：
```
http://localhost:3000?env=local     # 切换到本地环境
http://localhost:3000?env=remote    # 切换到云服务器
```

### 4. 开发者调试工具

开发模式下，右下角会显示一个调试工具按钮（🔧），提供：
- 当前环境详细信息
- API 配置显示
- 连接状态测试
- 快速环境切换
- 调试信息查看

**快捷键**: `Ctrl+Shift+E` (或 `Cmd+Shift+E`) 打开/关闭调试工具

## 配置文件说明

### 环境配置 (`src/config/environment.js`)

```javascript
export const ENVIRONMENT_CONFIG = {
  local: {
    name: '本地环境',
    apiBaseUrl: '/api',                           // 使用Vite代理
    chatApiUrl: '/api/chat',
    description: '本地开发服务器'
  },
  remote: {
    name: '云服务器',
    apiBaseUrl: 'http://175.27.162.174:3004/api', // 直接访问
chatApiUrl: 'http://175.27.162.174:3004/api/chat',
    description: '生产环境云服务器'
  }
}
```

### Vite 代理配置 (`vite.config.js`)

```javascript
proxy: {
  '/api': {
    target: process.env.USE_REMOTE_BACKEND === 'false' 
      ? 'http://localhost:3004'      // 本地后端
              : 'http://175.27.162.174:3004', // 远程后端
    changeOrigin: true
  }
}
```

## API 使用

### 在组件中使用

```javascript
import { environmentUtils, getChatApiUrl } from '@/config/environment.js'

// 获取当前环境信息
const currentEnv = environmentUtils.getCurrentInfo()
console.log('当前环境:', currentEnv.name)

// 获取API URL
const apiUrl = getChatApiUrl()

// 切换环境
environmentUtils.switchToLocal()
environmentUtils.switchToRemote()

// 监听环境变更
window.addEventListener('environmentChanged', (event) => {
  console.log('环境已切换到:', event.detail.environment)
})
```

### 在API服务中使用

```javascript
import { getChatApiUrl, environmentUtils } from '@/config/environment.js'

// API 请求会自动使用当前环境的URL
const response = await axios.post(getChatApiUrl(), data)

// 检查当前环境
if (environmentUtils.isLocal()) {
  console.log('正在使用本地环境')
}
```

## 故障排除

### 1. 本地环境连接失败

确保本地服务器正在运行：
```bash
cd server
npm start
```

### 2. 云服务器连接问题

- 检查网络连接
- 确认云服务器状态
- 查看浏览器控制台错误信息

### 3. 环境切换不生效

- 清除浏览器缓存
- 使用调试工具的"重置设置"功能
- 检查浏览器控制台输出

### 4. 调试工具不显示

- 确认是否在开发模式 (`npm run dev`)
- 手动启用: 在控制台执行 `localStorage.setItem('methodmate_debug_mode', 'true')`
- 使用 URL 参数: `?debug=true`

## 技术细节

### 环境检测逻辑

1. 检查 URL 参数 `env`
2. 检查 localStorage `methodmate_environment`  
3. 检查 Vite 环境变量 `import.meta.env.DEV`
4. 默认使用 `remote` 环境

### 代理工作原理

- **本地环境**: `/api/*` → `http://localhost:3004/api/*`
- **云服务器**: 直接请求 `http://175.27.162.174:3004/api/*`

### 状态管理

- 环境状态存储在 localStorage
- 全局事件系统通知环境变更
- 所有 API 服务自动使用当前环境配置

## 部署注意事项

### 开发部署
- 使用 `npm run dev:local` 连接本地后端
- 使用调试工具监控连接状态

### 生产部署  
- 构建时会自动使用云服务器配置
- 可通过 URL 参数临时切换环境进行测试

## 更新日志

- ✅ 支持环境动态切换
- ✅ 添加可视化环境指示器
- ✅ 集成开发者调试工具
- ✅ 支持 URL 参数配置
- ✅ 添加连接状态检测 