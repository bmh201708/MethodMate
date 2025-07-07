import { getCurrentAIService, AI_SERVICE_TYPES } from '../stores/aiServiceStore.js'
import { sendStreamMessageToCoze, sendSilentMessageToCoze } from './cozeApi.js'
import { sendMessageToChatGPT } from './chatgptService.js'
import { getApiBaseUrl } from '../config/environment.js'

/**
 * 统一的AI服务适配器
 * 根据当前选择的AI服务调用相应的API
 */

/**
 * 发送流式消息（聊天框使用）
 * @param {string} message - 消息内容
 * @param {Function} onChunk - 流式数据回调
 * @param {Array} chatHistory - 聊天历史
 * @returns {Promise<string>} - 完整回复
 */
export const sendStreamMessage = async (message, onChunk, chatHistory = []) => {
  const currentService = getCurrentAIService()
  
  if (currentService === AI_SERVICE_TYPES.COZE) {
    return await sendStreamMessageToCoze(message, onChunk, chatHistory)
  } else if (currentService === AI_SERVICE_TYPES.CHATGPT) {
    // 转换聊天历史格式
    const formattedHistory = chatHistory
      .filter(msg => msg.isComplete && !msg.isError)
      .slice(-10) // 只取最近10条消息
      .map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      }))
    
    console.log('🤖 ChatGPT发送消息:', message.substring(0, 100) + '...')
    console.log('📜 聊天历史条数:', formattedHistory.length)
    
    // ChatGPT不支持流式，模拟流式效果
    const response = await sendMessageToChatGPT(message, formattedHistory)
    
    // 模拟流式输出
    if (onChunk) {
      const words = response.split('')
      let currentText = ''
      
      for (let i = 0; i < words.length; i++) {
        currentText += words[i]
        onChunk(words[i], currentText)
        // 添加小延迟以模拟流式效果
        await new Promise(resolve => setTimeout(resolve, 10))
      }
    }
    
    console.log('✅ ChatGPT响应完成，长度:', response.length)
    return response
  } else {
    throw new Error(`不支持的AI服务类型: ${currentService}`)
  }
}

/**
 * 发送静默消息（不显示在聊天框中）
 * @param {string} message - 消息内容
 * @param {Array} chatHistory - 聊天历史
 * @returns {Promise<string>} - 回复内容
 */
export const sendSilentMessage = async (message, chatHistory = []) => {
  const currentService = getCurrentAIService()
  
  if (currentService === AI_SERVICE_TYPES.COZE) {
    return await sendSilentMessageToCoze(message, chatHistory)
  } else if (currentService === AI_SERVICE_TYPES.CHATGPT) {
    // 转换聊天历史格式
    const formattedHistory = chatHistory
      .filter(msg => msg.isComplete && !msg.isError)
      .slice(-10) // 只取最近10条消息
      .map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      }))
    
    return await sendMessageToChatGPT(message, formattedHistory)
  } else {
    throw new Error(`不支持的AI服务类型: ${currentService}`)
  }
}

/**
 * 调用后端API进行AI交互（用于研究方案生成、来源介绍等）
 * @param {string} endpoint - API端点
 * @param {Object} data - 请求数据
 * @returns {Promise<Object>} - API响应
 */
export const callBackendAI = async (endpoint, data) => {
  const currentService = getCurrentAIService()
  const baseUrl = getApiBaseUrl()
  
  // 根据当前AI服务选择不同的端点
  let apiUrl
  if (currentService === AI_SERVICE_TYPES.COZE) {
    apiUrl = `${baseUrl}/${endpoint}`
  } else if (currentService === AI_SERVICE_TYPES.CHATGPT) {
    // 为ChatGPT添加特殊标识
    apiUrl = `${baseUrl}/${endpoint}`
    data = { ...data, aiService: 'chatgpt' }
  } else {
    throw new Error(`不支持的AI服务类型: ${currentService}`)
  }
  
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  
  if (!response.ok) {
    throw new Error(`API请求失败: ${response.status}`)
  }
  
  return await response.json()
}

/**
 * 生成来源介绍
 * @param {string} message - 提示消息
 * @param {string} conversationId - 会话ID
 * @returns {Promise<string>} - 生成的来源介绍
 */
export const generateSourceIntroduction = async (message, conversationId) => {
  const currentService = getCurrentAIService()
  
  if (currentService === AI_SERVICE_TYPES.COZE) {
    const response = await callBackendAI('coze-chat', {
      message,
      conversation_id: conversationId
    })
    return response.reply
  } else if (currentService === AI_SERVICE_TYPES.CHATGPT) {
    const response = await sendMessageToChatGPT(message, [])
    return response
  } else {
    throw new Error(`不支持的AI服务类型: ${currentService}`)
  }
}

/**
 * 生成方法介绍
 * @param {string} message - 提示消息
 * @returns {Promise<string>} - 生成的方法介绍
 */
export const generateMethodIntroduction = async (message) => {
  const currentService = getCurrentAIService()
  
  if (currentService === AI_SERVICE_TYPES.COZE) {
    const response = await callBackendAI('coze-chat', {
      message,
      conversation_id: `method_intro_${Date.now()}`
    })
    return response.reply
  } else if (currentService === AI_SERVICE_TYPES.CHATGPT) {
    const response = await sendMessageToChatGPT(message, [])
    return response
  } else {
    throw new Error(`不支持的AI服务类型: ${currentService}`)
  }
}

/**
 * 提取关键词
 * @param {Array} chatHistory - 聊天历史
 * @param {string} sessionId - 会话ID
 * @returns {Promise<string>} - 提取的关键词
 */
export const extractKeywords = async (chatHistory = [], sessionId = Date.now().toString()) => {
  const currentService = getCurrentAIService()
  
  if (currentService === AI_SERVICE_TYPES.COZE) {
    const response = await callBackendAI('extract-keywords', {
      chatHistory,
      session_id: sessionId
    })
    return response.keywords
  } else if (currentService === AI_SERVICE_TYPES.CHATGPT) {
    // 构建关键词提取消息
    let messageContent = `Please analyze the following text and extract 1-2 key academic search terms in English. 
Focus on the most important and specific technical terms, methodologies, and core concepts.
The keywords MUST be in English only.

Please respond with only the keywords, separated by commas.

`

    if (chatHistory && chatHistory.length > 1) {
      messageContent += 'Conversation history:\n'
      
      const recentHistory = chatHistory.slice(-8)
      
      recentHistory.forEach((msg, index) => {
        if (msg.type === 'user') {
          messageContent += `User ${index + 1}: ${msg.content}\n`
        } else if (msg.type === 'assistant' && !msg.isError) {
          messageContent += `Assistant ${index + 1}: ${msg.content}\n`
        }
      })
      
      messageContent += '\nBased on the above conversation, extract the most relevant academic search keywords.'
    } else {
      messageContent += 'Please provide some general academic research method keywords, especially in quantitative research methods, experimental design, data analysis, and related fields.'
    }
    
    const response = await sendMessageToChatGPT(messageContent, [])
    
    // 简单解析关键词
    const keywords = response
      .replace(/[^\w\s,]/g, '')
      .split(',')
      .map(kw => kw.trim())
      .filter(kw => kw.length > 0 && /^[a-zA-Z\s\-]+$/.test(kw))
      .slice(0, 2)
      .join(',')
    
    return keywords
  } else {
    throw new Error(`不支持的AI服务类型: ${currentService}`)
  }
}

/**
 * 查询统计方法
 * @param {string} methodName - 方法名称
 * @returns {Promise<Object>} - 方法解释
 */
export const queryStatisticalMethod = async (methodName) => {
  const currentService = getCurrentAIService()
  
  if (currentService === AI_SERVICE_TYPES.COZE) {
    const response = await callBackendAI('query-statistical-method', {
      method: methodName
    })
    return response
  } else if (currentService === AI_SERVICE_TYPES.CHATGPT) {
    const prompt = `请详细解释统计方法"${methodName}"。

请按照以下格式回答：
1. 方法定义：简要说明该方法的基本概念
2. 适用场景：什么情况下使用这个方法
3. 使用步骤：具体的操作步骤
4. 注意事项：使用时需要注意的要点
5. 举例说明：提供一个具体的应用例子

请用中文回答，内容要准确、专业。`
    
    const response = await sendMessageToChatGPT(prompt, [])
    
    return {
      success: true,
      method: methodName,
      explanation: response,
      isLocalContent: false,
      source: 'ChatGPT生成'
    }
  } else {
    throw new Error(`不支持的AI服务类型: ${currentService}`)
  }
} 