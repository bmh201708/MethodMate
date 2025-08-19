import { getApiBaseUrl } from '../config/environment.js'

/**
 * 处理ChatGPT API错误，提供友好的错误信息
 * @param {Response} response - API响应对象
 * @param {Object} errorData - 错误数据
 * @returns {Error} - 格式化的错误对象
 */
function handleChatGPTError(response, errorData = {}) {
  const errorMessage = errorData.error?.message || response.statusText
  
  // 检查是否是token超限错误
  if (errorMessage.includes('maximum context length') || 
      errorMessage.includes('exceed') && errorMessage.includes('token')) {
    return new Error(`💬 消息内容过长，请尝试以下解决方案：

🔧 **解决方法：**
1. **开始新对话** - 点击"新建对话"重新开始，避免历史消息过多
2. **简化问题** - 将复杂问题拆分为多个简单问题分别询问  
3. **切换AI服务** - 尝试切换到Coze AI服务，支持更长的对话历史

📊 **技术说明：**
当前对话历史加上您的问题总长度超过了ChatGPT的处理限制（约128,000个token）。系统已自动优化历史记录，但这次请求仍然过长。

💡 **提示：** 如果您需要处理大量文本内容，建议使用Coze AI服务或分段处理。`)
  }
  
  // 检查是否是其他常见错误
  if (response.status === 401) {
    return new Error('❌ ChatGPT API密钥无效或已过期，请检查配置')
  }
  
  if (response.status === 429) {
    return new Error('⏰ ChatGPT API调用频率超限，请稍后再试')
  }
  
  if (response.status === 500) {
    return new Error('🔧 ChatGPT服务器暂时不可用，请稍后再试')
  }
  
  // 默认错误消息
  return new Error(`ChatGPT API错误: ${response.status} - ${errorMessage}`)
}

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
        content: 'You are a professional academic research assistant, specializing in Human-Computer Interaction (HCI), quantitative research methods, statistical analysis, and academic writing. Please respond in English while maintaining professionalism and accuracy.'
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
      throw handleChatGPTError(response, errorData)
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
        content: 'You are a professional academic research assistant, specializing in Human-Computer Interaction (HCI), quantitative research methods, statistical analysis, and academic writing. Please respond in English while maintaining professionalism and accuracy.'
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
      throw handleChatGPTError(response, errorData)
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