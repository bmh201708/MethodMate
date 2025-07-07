<template>
  <div class="bg-white rounded-lg shadow-sm border h-[700px] flex flex-col">
    <!-- 聊天标题栏 -->
    <div class="border-b border-gray-200 p-4 flex justify-between items-center">
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
        </div>
        <div>
          <h3 class="font-semibold text-gray-900">ChatGPT (GPT-4o)</h3>
          <p class="text-sm text-gray-500">在线</p>
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <button 
          @click="testLargeText"
          class="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          :disabled="isLoading"
          title="测试15万字符大文本"
        >
          测试大文本
        </button>
        <button 
          @click="clearChat"
          class="text-gray-400 hover:text-red-500 transition-colors"
          title="清空对话"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- 消息列表区域 -->
    <div class="flex-1 overflow-y-auto p-4 space-y-4" ref="messagesContainer">
      <!-- 欢迎消息 -->
      <div v-if="messages.length === 0" class="text-center text-gray-500 py-8">
        <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
        </svg>
        <p class="text-lg font-medium mb-2">开始与 ChatGPT 对话</p>
        <p class="text-sm">输入您的问题，我会尽力为您提供帮助</p>
      </div>

      <!-- 消息列表 -->
      <div v-for="(message, index) in messages" :key="index" class="flex" :class="message.role === 'user' ? 'justify-end' : 'justify-start'">
        <div class="flex max-w-[80%]" :class="message.role === 'user' ? 'flex-row-reverse' : 'flex-row'">
          <!-- 头像 -->
          <div class="flex-shrink-0" :class="message.role === 'user' ? 'ml-3' : 'mr-3'">
            <div class="w-8 h-8 rounded-full flex items-center justify-center" 
                 :class="message.role === 'user' ? 'bg-blue-500' : 'bg-green-500'">
              <svg v-if="message.role === 'user'" class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              <svg v-else class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
          </div>
          
          <!-- 消息内容 -->
          <div class="flex flex-col">
            <div class="px-4 py-2 rounded-lg" 
                 :class="message.role === 'user' 
                   ? 'bg-blue-500 text-white' 
                   : 'bg-gray-100 text-gray-900'">
              <div class="whitespace-pre-wrap break-words" v-html="formatMessage(message.content)"></div>
            </div>
            <div class="text-xs text-gray-500 mt-1" :class="message.role === 'user' ? 'text-right' : 'text-left'">
              {{ formatTime(message.timestamp) }}
            </div>
          </div>
        </div>
      </div>

      <!-- 正在输入指示器 -->
      <div v-if="isLoading" class="flex justify-start">
        <div class="flex max-w-[80%]">
          <div class="flex-shrink-0 mr-3">
            <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
          </div>
          <div class="bg-gray-100 px-4 py-2 rounded-lg">
            <div class="flex space-x-1">
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 输入区域 -->
    <div class="border-t border-gray-200 p-4">
      <div class="flex space-x-3">
        <div class="flex-1">
          <textarea
            v-model="newMessage"
            @keydown="handleKeydown"
            placeholder="输入您的消息..."
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            rows="2"
            :disabled="isLoading"
          ></textarea>
        </div>
        <button
          @click="sendMessage"
          :disabled="!newMessage.trim() || isLoading"
          class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
        >
          <svg v-if="isLoading" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
          </svg>
          <span>{{ isLoading ? '发送中...' : '发送' }}</span>
        </button>
      </div>
      <div class="mt-2 text-xs text-gray-500 text-center">
        按 Ctrl+Enter 快速发送 • 支持 Markdown 格式
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'
import { sendMessageToChatGPT } from '../services/chatgptService'
import { marked } from 'marked'

// 响应式数据
const messages = ref([])
const newMessage = ref('')
const isLoading = ref(false)
const messagesContainer = ref(null)

// 配置marked
marked.setOptions({
  breaks: true,
  gfm: true
})

// 发送消息
const sendMessage = async () => {
  if (!newMessage.value.trim() || isLoading.value) return

  const userMessage = {
    role: 'user',
    content: newMessage.value.trim(),
    timestamp: Date.now()
  }

  // 添加用户消息
  messages.value.push(userMessage)
  const messageText = newMessage.value.trim()
  newMessage.value = ''
  
  // 滚动到底部
  await nextTick()
  scrollToBottom()

  // 设置加载状态
  isLoading.value = true

  try {
    // 调用ChatGPT API
    const response = await sendMessageToChatGPT(messageText, messages.value.slice(0, -1))
    
    // 添加AI回复
    const aiMessage = {
      role: 'assistant',
      content: response,
      timestamp: Date.now()
    }
    
    messages.value.push(aiMessage)
    
    // 滚动到底部
    await nextTick()
    scrollToBottom()
    
  } catch (error) {
    console.error('ChatGPT API调用失败:', error)
    
    // 添加错误消息
    const errorMessage = {
      role: 'assistant',
      content: '抱歉，我现在无法回复您的消息。请检查网络连接或稍后再试。',
      timestamp: Date.now()
    }
    
    messages.value.push(errorMessage)
    
    // 滚动到底部
    await nextTick()
    scrollToBottom()
  } finally {
    isLoading.value = false
  }
}

// 处理键盘事件
const handleKeydown = (event) => {
  if (event.ctrlKey && event.key === 'Enter') {
    event.preventDefault()
    sendMessage()
  }
}

// 滚动到底部
const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// 测试大文本功能
const testLargeText = async () => {
  if (isLoading.value) return
  
  // 生成约15万字符的测试文本
  const generateLargeText = () => {
    const baseText = `这是一个大文本测试。本文将测试GPT-4o处理大量文本的能力。在人工智能和自然语言处理领域，处理大量文本数据是一个重要的挑战。现代的大语言模型如GPT-4o具有强大的文本理解和生成能力，但它们也有token限制。

GPT-4o的上下文窗口为128,000个token，这意味着它可以处理相当大量的文本。然而，实际的字符数量取决于tokenization的方式。一般来说，英文文本的token数量大约是字符数的1/4，而中文文本的token数量可能更高。

在这个测试中，我们将发送约15万字符的文本，看看系统是否能够正常处理。这个测试将帮助我们了解：
1. API是否能够接受如此大量的文本
2. 响应时间是否在可接受范围内
3. 是否会出现任何错误或异常
4. 返回的结果是否准确和有意义

测试文本包含了各种类型的内容：技术描述、问题分析、数据统计、案例研究等。这样可以更全面地评估模型的处理能力。

在实际应用中，处理大文本的需求经常出现，比如：
- 分析长篇研究论文
- 处理法律文档
- 总结会议记录
- 分析客户反馈
- 处理技术文档

因此，这个测试对于评估系统的实用性具有重要意义。`
    
    // 重复文本直到达到约15万字符
    let result = ''
    const targetLength = 150000
    
    while (result.length < targetLength) {
      result += baseText + '\n\n'
      
      // 添加一些变化以避免完全重复
      result += `第${Math.floor(result.length / 1000)}段：当前文本长度约为${result.length}字符。`
      result += `时间戳：${new Date().toISOString()}。`
      result += `随机数：${Math.random().toString(36).substring(2, 15)}。\n\n`
    }
    
    return result.substring(0, targetLength)
  }
  
  const largeText = generateLargeText()
  
  // 创建测试消息
  const testMessage = `请分析以下大文本（约${largeText.length}字符）并提供简要总结：\n\n${largeText}\n\n请总结这段文本的主要内容，并评估文本的结构和特点。`
  
  // 添加用户消息
  const userMessage = {
    role: 'user',
    content: testMessage,
    timestamp: Date.now()
  }
  
  messages.value.push(userMessage)
  
  // 滚动到底部
  await nextTick()
  scrollToBottom()
  
  // 设置加载状态
  isLoading.value = true
  
  try {
    console.log(`正在发送大文本测试，文本长度：${testMessage.length}字符`)
    
    // 记录开始时间
    const startTime = Date.now()
    
    // 调用ChatGPT API
    const response = await sendMessageToChatGPT(testMessage, messages.value.slice(0, -1))
    
    // 记录结束时间
    const endTime = Date.now()
    const duration = endTime - startTime
    
    // 添加AI回复
    const aiMessage = {
      role: 'assistant',
      content: `${response}\n\n---\n📊 **测试结果统计：**\n- 输入文本长度：${testMessage.length.toLocaleString()}字符\n- 处理时间：${duration.toLocaleString()}毫秒\n- 测试状态：✅ 成功`,
      timestamp: Date.now()
    }
    
    messages.value.push(aiMessage)
    
    console.log(`大文本测试完成，处理时间：${duration}ms`)
    
  } catch (error) {
    console.error('大文本测试失败:', error)
    
    // 添加错误消息
    const errorMessage = {
      role: 'assistant',
      content: `❌ **大文本测试失败**\n\n错误信息：${error.message}\n\n这可能是由于以下原因：\n1. 文本长度超过了API的token限制\n2. 网络连接问题\n3. API配置问题\n4. 服务器处理超时\n\n建议：\n- 检查网络连接\n- 确认API密钥配置正确\n- 尝试发送较短的文本进行测试`,
      timestamp: Date.now()
    }
    
    messages.value.push(errorMessage)
  } finally {
    isLoading.value = false
    
    // 滚动到底部
    await nextTick()
    scrollToBottom()
  }
}

// 清空对话
const clearChat = () => {
  if (confirm('确定要清空所有对话记录吗？')) {
    messages.value = []
  }
}

// 格式化消息内容（支持Markdown）
const formatMessage = (content) => {
  try {
    return marked.parse(content)
  } catch (error) {
    console.error('Markdown解析错误:', error)
    return content.replace(/\n/g, '<br>')
  }
}

// 格式化时间
const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now - date

  if (diff < 60000) { // 小于1分钟
    return '刚刚'
  } else if (diff < 3600000) { // 小于1小时
    return `${Math.floor(diff / 60000)}分钟前`
  } else if (date.toDateString() === now.toDateString()) { // 今天
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  } else {
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
  }
}

// 组件挂载时的初始化
onMounted(() => {
  // 可以在这里加载历史消息
})
</script>

<style scoped>
/* 自定义滚动条 */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c5c5c5;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 动画效果 */
@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

.animate-bounce {
  animation: bounce 1.4s infinite ease-in-out both;
}

/* 消息内容样式 */
.whitespace-pre-wrap {
  white-space: pre-wrap;
  word-wrap: break-word;
}

/* Markdown样式 */
:deep(.markdown) h1,
:deep(.markdown) h2,
:deep(.markdown) h3 {
  font-weight: bold;
  margin: 0.5em 0;
}

:deep(.markdown) p {
  margin: 0.5em 0;
}

:deep(.markdown) ul,
:deep(.markdown) ol {
  margin: 0.5em 0;
  padding-left: 1.5em;
}

:deep(.markdown) code {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 0.2em 0.4em;
  border-radius: 0.25em;
  font-family: monospace;
}

:deep(.markdown) pre {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 1em;
  border-radius: 0.5em;
  overflow-x: auto;
  margin: 0.5em 0;
}

:deep(.markdown) blockquote {
  border-left: 4px solid #ccc;
  padding-left: 1em;
  margin: 0.5em 0;
  color: #666;
}
</style> 