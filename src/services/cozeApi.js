import { CozeAPI } from '@coze/api'

const API_KEY = 'pat_xdxRBDKN85QE746XMRQ0hGgKJsVQSrH8VCIvUzlRkW62OTBqZ88ti1eIkTvHbU18'
const BOT_ID = '7507577087193710608'
const USER_ID = '7505301221562023954'

const apiClient = new CozeAPI({
  token: API_KEY,
  baseURL: 'https://api.coze.com',
  allowPersonalAccessTokenInBrowser: true
})

export const sendMessageToCoze = async (message) => {
  try {
    const res = await apiClient.chat.create({
      bot_id: BOT_ID,
      user_id: USER_ID,
      additional_messages: [
        {
          role: 'user',
          content: message,
          content_type: 'text'
        }
      ],
      auto_save_history: true
    })
    // 官方SDK返回结构体，reply在data.reply
    if (res.status === 'failed') {
      throw new Error(`聊天失败: ${res.last_error?.msg || '未知错误'}`)
    }
    return res.reply || '抱歉，我没有收到有效的回复。'
  } catch (error) {
    console.error('=== 发生错误 ===')
    console.error('错误类型:', error.name)
    console.error('错误消息:', error.message)
    console.error('错误堆栈:', error.stack)
    throw error
  }
}

export const sendStreamMessageToCoze = async (message, onChunk) => {
  try {
    console.log('=== 准备发送消息到Coze ===')
    console.log('消息内容:', message)
    console.log('消息长度:', message.length)
    
    const params = {
      bot_id: BOT_ID,
      user_id: USER_ID,
      additional_messages: [
        {
          role: 'user',
          content: message,
          content_type: 'text'
        }
      ],
      stream: true,
      auto_save_history: true
    }
    
    console.log('请求参数:', params)
    
    const stream = await apiClient.chat.stream(params)
    let fullResponse = ''
    let conversationId = null
    
    for await (const data of stream) {
      console.log('收到流数据:', data)
      
      // 处理会话创建事件
      if (data.event === 'conversation.chat.created') {
        conversationId = data.data?.conversation_id
        console.log('会话已创建，ID:', conversationId)
        continue
      }
      
      // 处理聊天进行中事件
      if (data.event === 'conversation.chat.in_progress') {
        console.log('聊天进行中...')
        continue
      }
      
      // 处理聊天失败事件
      if (data.event === 'conversation.chat.failed') {
        const errorInfo = data.data?.last_error || {}
        console.error('聊天失败详情:', errorInfo)
        console.error('失败的完整数据:', data.data)
        throw new Error(`聊天失败: ${errorInfo.msg || '未知错误'} (错误码: ${errorInfo.code || 'N/A'})`)
      }
      
      // 处理聊天完成事件
      if (data.event === 'conversation.chat.completed') {
        console.log('聊天完成')
        continue
      }
      
      // 处理消息内容 - 根据文档，应该监听 conversation.message.completed
      if (data.event === 'conversation.message.completed') {
        const msgData = data.data
        console.log('收到消息:', msgData)
        
        // 只处理 type=answer 的消息（agent回复）
        if (msgData?.type === 'answer') {
          const content = msgData.content || ''
          if (content) {
            // 对于完整消息，直接设置而不是追加
            fullResponse = content
            if (onChunk) {
              onChunk(content, fullResponse)
            }
          }
        }
      }
      
      // 处理流式消息片段
      if (data.event === 'conversation.message.delta') {
        const msgData = data.data
        // 只处理 type=answer 的消息片段
        if (msgData?.type === 'answer') {
          const content = msgData.content || ''
          if (content) {
            fullResponse += content
            if (onChunk) {
              onChunk(content, fullResponse)
            }
          }
        }
      }
      
      // 处理错误事件
      if (data.event === 'error') {
        const errorMsg = data.data?.msg || data.data?.message || '未知错误'
        console.error('API错误:', data.data)
        throw new Error(`Coze API 错误: ${errorMsg}`)
      }
    }
    
    return fullResponse || '抱歉，我没有收到有效的回复。'
  } catch (error) {
    console.error('=== 发生错误 ===')
    console.error('错误类型:', error.name)
    console.error('错误消息:', error.message)
    console.error('错误堆栈:', error.stack)
    throw error
  }
} 