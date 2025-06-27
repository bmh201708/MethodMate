import axios from 'axios'
import { getChatApiUrl, getApiBaseUrl, environmentUtils } from '../config/environment.js'

// 本地存储会话历史
const sessions = {}

// 输出当前环境信息
console.log('🔗 API服务当前环境:', environmentUtils.getCurrentInfo())

// 聊天 API
export const chatAPI = {
  // 发送消息 - 动态使用环境配置的URL
  sendMessage: async (data) => {
    const sessionId = data.session_id || 'default'
    
    // 获取或创建会话历史
    if (!sessions[sessionId]) {
      sessions[sessionId] = []
    }

    try {
      // 使用环境配置的聊天API URL
      const chatUrl = getChatApiUrl()
      console.log('📡 发送聊天请求到:', chatUrl)
      
      const response = await axios.post(chatUrl, {
        message: data.message,
        session_id: sessionId,
        history: data.include_history ? sessions[sessionId] : []
      })

      // 更新会话历史
      sessions[sessionId].push(
        { role: 'user', content: data.message },
        { role: 'assistant', content: response.data.reply }
      )

      // 限制历史长度
      if (sessions[sessionId].length > 20) {
        sessions[sessionId] = sessions[sessionId].slice(-20)
      }

      return response.data
    } catch (error) {
      console.error('API Error:', error)
      console.error('请求的URL:', getChatApiUrl())
      console.error('当前环境:', environmentUtils.getCurrentInfo())
      throw new Error(error.response?.data?.error || '发送消息失败')
    }
  },

  // 获取会话历史
  getHistory: async (sessionId) => {
    return {
      history: sessions[sessionId] || []
    }
  },

  // 清除会话
  clearSession: async (sessionId) => {
    delete sessions[sessionId]
    return { message: 'Session cleared' }
  },

  // 清除历史方案
  clearHistoryPlans: async (sessionId) => {
    // 在前端模拟清除
    return { message: 'History plans cleared' }
  },

  // 获取当前环境信息
  getCurrentEnvironment: () => environmentUtils.getCurrentInfo(),

  // 切换环境
  switchEnvironment: (envType) => {
    const result = environmentUtils.switchToRemote()
    if (envType === 'local') {
      return environmentUtils.switchToLocal()
    } else if (envType === 'development') {
      return environmentUtils.switchToDevelopment()
    }
    return result
  }
}

// 创建一个通用的API客户端
export const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器 - 输出请求信息
apiClient.interceptors.request.use(
  (config) => {
    console.log('📤 API请求:', config.method?.toUpperCase(), config.url)
    return config
  },
  (error) => {
    console.error('📤 请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    console.log('📥 API响应:', response.status, response.config.url)
    return response
  },
  (error) => {
    console.error('📥 响应错误:', error.response?.status, error.config?.url, error.message)
    return Promise.reject(error)
  }
)

export default axios