// 全局聊天状态管理
import { reactive, ref } from 'vue'
import { sendStreamMessageToCoze } from '../services/cozeApi'

// 聊天状态
export const chatState = reactive({
  messages: [
    {
      id: 1,
      type: 'assistant',
      content: '你好！我是 MethodMate AI 助手，请问有什么我可以帮助你的吗？',
      isComplete: true
    }
  ],
  isLoading: false,
  conversationId: null
})

// 发送消息的方法
export const sendMessage = async (message) => {
  if (!message.trim() || chatState.isLoading) return

  const messageId = chatState.messages.length + 1
  
  // 添加用户消息
  chatState.messages.push({
    id: messageId,
    type: 'user',
    content: message,
    isComplete: true
  })

  chatState.isLoading = true

  // 添加助手消息占位
  const assistantMessageId = messageId + 1
  chatState.messages.push({
    id: assistantMessageId,
    type: 'assistant',
    content: '',
    isComplete: false
  })

  try {
    await sendStreamMessageToCoze(message, (chunk, fullResponse) => {
      // 更新助手消息内容
      const assistantMessage = chatState.messages.find(m => m.id === assistantMessageId)
      if (assistantMessage) {
        assistantMessage.content = fullResponse
      }
    })

    // 标记消息完成
    const assistantMessage = chatState.messages.find(m => m.id === assistantMessageId)
    if (assistantMessage) {
      assistantMessage.isComplete = true
    }
  } catch (error) {
    console.error('聊天错误:', error)
    
    // 移除空的助手消息
    chatState.messages = chatState.messages.filter(m => m.id !== assistantMessageId)
    
    // 添加错误消息
    chatState.messages.push({
      id: assistantMessageId,
      type: 'assistant',
      content: '抱歉，我遇到了一些问题。错误信息：' + (error.message || '未知错误') + '\n请稍后再试，或者刷新页面重试。',
      isComplete: true,
      isError: true
    })
  } finally {
    chatState.isLoading = false
  }
}

// 清空聊天记录
export const clearMessages = () => {
  chatState.messages = [
    {
      id: 1,
      type: 'assistant',
      content: '你好！我是 MethodMate AI 助手，请问有什么我可以帮助你的吗？',
      isComplete: true
    }
  ]
  chatState.conversationId = null
} 