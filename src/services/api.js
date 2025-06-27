import axios from 'axios'

// 本地存储会话历史
const sessions = {}

// 聊天 API
export const chatAPI = {
  // 发送消息 - 通过 Vercel Edge Function
  sendMessage: async (data) => {
    const sessionId = data.session_id || 'default'
    
    // 获取或创建会话历史
    if (!sessions[sessionId]) {
      sessions[sessionId] = []
    }

    try {
      // 调用 Vercel Edge Function
      const response = await axios.post('/api/chat', {
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
  }
}

export default axios