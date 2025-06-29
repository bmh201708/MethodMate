// 环境配置文件
// 可以通过 localStorage 或 URL 参数来切换环境

// 环境类型定义
export const ENVIRONMENT_TYPES = {
  LOCAL: 'local',
  REMOTE: 'remote',
  DEVELOPMENT: 'development'
}

// 环境配置
export const ENVIRONMENT_CONFIG = {
  [ENVIRONMENT_TYPES.LOCAL]: {
    name: '本地环境',
    apiBaseUrl: '/api', // 使用相对路径，通过Vite代理到本地服务器
    chatApiUrl: '/api/chat',
    description: '本地开发服务器'
  },
  [ENVIRONMENT_TYPES.REMOTE]: {
    name: '云服务器',
    apiBaseUrl: 'http://1.13.253.97:3004/api', // 直接访问云服务器
    chatApiUrl: 'http://1.13.253.97:3004/api/chat',
    description: '生产环境云服务器'
  },
  [ENVIRONMENT_TYPES.DEVELOPMENT]: {
    name: '开发环境',
    apiBaseUrl: import.meta.env.DEV ? '/api' : 'http://1.13.253.97:3004/api',
    chatApiUrl: import.meta.env.DEV ? '/api/chat' : 'http://1.13.253.97:3004/api/chat',
    description: '根据开发/生产环境自动切换'
  }
}

// 获取当前环境类型
export function getCurrentEnvironment() {
  // 优先级：URL参数 > localStorage > 环境变量 > 默认值
  const urlParams = new URLSearchParams(window.location.search)
  const envFromUrl = urlParams.get('env')
  
  if (envFromUrl && ENVIRONMENT_CONFIG[envFromUrl]) {
    return envFromUrl
  }
  
  const envFromStorage = localStorage.getItem('methodmate_environment')
  if (envFromStorage && ENVIRONMENT_CONFIG[envFromStorage]) {
    return envFromStorage
  }
  
  // 根据环境变量判断
  if (import.meta.env.DEV) {
    return ENVIRONMENT_TYPES.LOCAL
  }
  
  return ENVIRONMENT_TYPES.REMOTE
}

// 设置当前环境
export function setCurrentEnvironment(envType) {
  if (!ENVIRONMENT_CONFIG[envType]) {
    throw new Error(`不支持的环境类型: ${envType}`)
  }
  
  localStorage.setItem('methodmate_environment', envType)
  
  // 触发环境变更事件
  window.dispatchEvent(new CustomEvent('environmentChanged', {
    detail: { environment: envType, config: ENVIRONMENT_CONFIG[envType] }
  }))
  
  return ENVIRONMENT_CONFIG[envType]
}

// 获取当前环境配置
export function getCurrentEnvironmentConfig() {
  const currentEnv = getCurrentEnvironment()
  return ENVIRONMENT_CONFIG[currentEnv]
}

// 获取API基础URL
export function getApiBaseUrl() {
  return getCurrentEnvironmentConfig().apiBaseUrl
}

// 获取聊天API URL
export function getChatApiUrl() {
  return getCurrentEnvironmentConfig().chatApiUrl
}

// 获取所有可用环境
export function getAvailableEnvironments() {
  return Object.keys(ENVIRONMENT_CONFIG).map(key => ({
    key,
    ...ENVIRONMENT_CONFIG[key]
  }))
}

// 环境切换工具函数
export const environmentUtils = {
  isLocal: () => getCurrentEnvironment() === ENVIRONMENT_TYPES.LOCAL,
  isRemote: () => getCurrentEnvironment() === ENVIRONMENT_TYPES.REMOTE,
  isDevelopment: () => getCurrentEnvironment() === ENVIRONMENT_TYPES.DEVELOPMENT,
  
  switchToLocal: () => setCurrentEnvironment(ENVIRONMENT_TYPES.LOCAL),
  switchToRemote: () => setCurrentEnvironment(ENVIRONMENT_TYPES.REMOTE),
  switchToDevelopment: () => setCurrentEnvironment(ENVIRONMENT_TYPES.DEVELOPMENT),
  
  getCurrentInfo: () => {
    const env = getCurrentEnvironment()
    const config = ENVIRONMENT_CONFIG[env]
    return {
      type: env,
      ...config
    }
  }
}

// 控制台输出当前环境信息
if (import.meta.env.DEV) {
  console.log('🌍 当前环境:', environmentUtils.getCurrentInfo())
} 