import { getApiBaseUrl } from '../config/environment.js'

/**
 * 发送消息到ChatGPT API
 * @param {string} message - 用户消息
 * @param {Array} history - 对话历史
 * @returns {Promise<string>} - AI回复
 */
export async function sendMessageToChatGPT(message, history = []) {
  try {
    // 获取环境配置
    const config = await getEnvironmentConfig()
    
    if (!config.chatgpt_api_key) {
      throw new Error('ChatGPT API密钥未配置')
    }

    // 构建消息历史
    const messages = [
      {
        role: 'system',
        content: '你是一个专业的学术研究助手，擅长人机交互（HCI）、定量研究方法、统计分析和学术写作。请用中文回答问题，保持专业性和准确性。'
      },
      ...history.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      {
        role: 'user',
        content: message
      }
    ]

    // 调用ChatGPT API
    const response = await fetch(config.chatgpt_base_url || 'https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.chatgpt_api_key}`
      },
      body: JSON.stringify({
        model: config.chatgpt_model || 'gpt-4o',
        messages: messages,
        max_tokens: config.chatgpt_max_tokens || 2000,
        temperature: config.chatgpt_temperature || 0.7,
        stream: false
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(`ChatGPT API错误: ${response.status} - ${errorData.error?.message || response.statusText}`)
    }

    const data = await response.json()
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('ChatGPT API返回数据格式错误')
    }

    return data.choices[0].message.content

  } catch (error) {
    console.error('ChatGPT API调用失败:', error)
    throw error
  }
}

/**
 * 获取环境配置
 * @returns {Promise<Object>} - 环境配置对象
 */
async function getEnvironmentConfig() {
  // 直接使用前端环境变量配置
  // 这样可以避免不必要的后端API调用和404错误
  return {
    chatgpt_api_key: import.meta.env.VITE_CHATGPT_API_KEY,
    chatgpt_base_url: import.meta.env.VITE_CHATGPT_BASE_URL || 'https://api.openai.com/v1/chat/completions',
    chatgpt_model: import.meta.env.VITE_CHATGPT_MODEL || 'gpt-4o',
    chatgpt_max_tokens: parseInt(import.meta.env.VITE_CHATGPT_MAX_TOKENS) || 2000,
    chatgpt_temperature: parseFloat(import.meta.env.VITE_CHATGPT_TEMPERATURE) || 0.7
  }
}

/**
 * 流式发送消息到ChatGPT API（可选功能）
 * @param {string} message - 用户消息
 * @param {Array} history - 对话历史
 * @param {Function} onChunk - 接收流式数据的回调函数
 * @returns {Promise<string>} - 完整的AI回复
 */
export async function sendMessageToChatGPTStream(message, history = [], onChunk) {
  try {
    const config = await getEnvironmentConfig()
    
    if (!config.chatgpt_api_key) {
      throw new Error('ChatGPT API密钥未配置')
    }

    const messages = [
      {
        role: 'system',
        content: '你是一个专业的学术研究助手，擅长人机交互（HCI）、定量研究方法、统计分析和学术写作。请用中文回答问题，保持专业性和准确性。'
      },
      ...history.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      {
        role: 'user',
        content: message
      }
    ]

    const response = await fetch(config.chatgpt_base_url || 'https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.chatgpt_api_key}`
      },
      body: JSON.stringify({
        model: config.chatgpt_model || 'gpt-4o',
        messages: messages,
        max_tokens: config.chatgpt_max_tokens || 2000,
        temperature: config.chatgpt_temperature || 0.7,
        stream: true
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(`ChatGPT API错误: ${response.status} - ${errorData.error?.message || response.statusText}`)
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let fullResponse = ''

    while (true) {
      const { done, value } = await reader.read()
      
      if (done) break

      const chunk = decoder.decode(value)
      const lines = chunk.split('\n')

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6)
          
          if (data === '[DONE]') {
            return fullResponse
          }

          try {
            const parsed = JSON.parse(data)
            const content = parsed.choices[0]?.delta?.content
            
            if (content) {
              fullResponse += content
              if (onChunk) {
                onChunk(content)
              }
            }
          } catch (error) {
            // 忽略解析错误
          }
        }
      }
    }

    return fullResponse

  } catch (error) {
    console.error('ChatGPT流式API调用失败:', error)
    throw error
  }
} 