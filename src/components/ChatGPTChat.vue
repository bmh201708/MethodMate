<template>
  <div class="bg-white rounded-lg shadow-sm border h-[700px] flex flex-col">
    <!-- Chat Title Bar -->
    <div class="border-b border-gray-200 p-4 flex justify-between items-center">
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
        </div>
        <div>
          <h3 class="font-semibold text-gray-900">ChatGPT (GPT-4o)</h3>
          <p class="text-sm text-gray-500">Online</p>
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <button 
          @click="testLargeText"
          class="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          :disabled="isLoading"
          title="Test 150k characters large text"
        >
          Test Large Text
        </button>
        <button 
          @click="clearChat"
          class="text-gray-400 hover:text-red-500 transition-colors"
          title="Clear conversation"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Message List Area -->
    <div class="flex-1 overflow-y-auto p-4 space-y-4" ref="messagesContainer">
      <!-- Welcome Message -->
      <div v-if="messages.length === 0" class="text-center text-gray-500 py-8">
        <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
        </svg>
        <p class="text-lg font-medium mb-2">Start Conversation with ChatGPT</p>
        <p class="text-sm">Enter your question and I'll try my best to help you</p>
      </div>

      <!-- Message List -->
      <div v-for="(message, index) in messages" :key="index" class="flex" :class="message.role === 'user' ? 'justify-end' : 'justify-start'">
        <div class="flex max-w-[80%]" :class="message.role === 'user' ? 'flex-row-reverse' : 'flex-row'">
          <!-- Avatar -->
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
          
          <!-- Message Content -->
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

      <!-- Typing Indicator -->
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

    <!-- Input Area -->
    <div class="border-t border-gray-200 p-4">
      <div class="flex space-x-3">
        <div class="flex-1">
          <textarea
            v-model="newMessage"
            @keydown="handleKeydown"
            placeholder="Enter your message..."
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
          <span>{{ isLoading ? 'Sending...' : 'Send' }}</span>
        </button>
      </div>
      <div class="mt-2 text-xs text-gray-500 text-center">
        Press Ctrl+Enter to send quickly • Supports Markdown format
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'
import { sendMessageToChatGPT } from '../services/chatgptService'
import { marked } from 'marked'

// Reactive data
const messages = ref([])
const newMessage = ref('')
const isLoading = ref(false)
const messagesContainer = ref(null)

// Configure marked
marked.setOptions({
  breaks: true,
  gfm: true
})

// Send message
const sendMessage = async () => {
  if (!newMessage.value.trim() || isLoading.value) return

  const userMessage = {
    role: 'user',
    content: newMessage.value.trim(),
    timestamp: Date.now()
  }

  // Add user message
  messages.value.push(userMessage)
  const messageText = newMessage.value.trim()
  newMessage.value = ''
  
  // Scroll to bottom
  await nextTick()
  scrollToBottom()

  // Set loading state
  isLoading.value = true

  try {
    // Call ChatGPT API
    const response = await sendMessageToChatGPT(messageText, messages.value.slice(0, -1))
    
    // Add AI reply
    const aiMessage = {
      role: 'assistant',
      content: response,
      timestamp: Date.now()
    }
    
    messages.value.push(aiMessage)
    
    // Scroll to bottom
    await nextTick()
    scrollToBottom()
    
  } catch (error) {
    console.error('ChatGPT API call failed:', error)
    
    // Add error message
    const errorMessage = {
      role: 'assistant',
      content: 'Sorry, I cannot reply to your message right now. Please check your network connection or try again later.',
      timestamp: Date.now()
    }
    
    messages.value.push(errorMessage)
    
    // Scroll to bottom
    await nextTick()
    scrollToBottom()
  } finally {
    isLoading.value = false
  }
}

// Handle keyboard events
const handleKeydown = (event) => {
  if (event.ctrlKey && event.key === 'Enter') {
    event.preventDefault()
    sendMessage()
  }
}

// Scroll to bottom
const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// Test large text functionality
const testLargeText = async () => {
  if (isLoading.value) return
  
  // Generate test text of about 150,000 characters
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
    
    // Repeat text until reaching about 150,000 characters
    let result = ''
    const targetLength = 150000
    
    while (result.length < targetLength) {
      result += baseText + '\n\n'
      
      // Add some variation to avoid complete repetition
      result += `第${Math.floor(result.length / 1000)}段：当前文本长度约为${result.length}字符。`
      result += `时间戳：${new Date().toISOString()}。`
      result += `随机数：${Math.random().toString(36).substring(2, 15)}。\n\n`
    }
    
    return result.substring(0, targetLength)
  }
  
  const largeText = generateLargeText()
  
  // Create test message
  const testMessage = `请分析以下大文本（约${largeText.length}字符）并提供简要总结：\n\n${largeText}\n\n请总结这段文本的主要内容，并评估文本的结构和特点。`
  
  // Add user message
  const userMessage = {
    role: 'user',
    content: testMessage,
    timestamp: Date.now()
  }
  
  messages.value.push(userMessage)
  
  // Scroll to bottom
  await nextTick()
  scrollToBottom()
  
  // Set loading state
  isLoading.value = true
  
  try {
    console.log(`Sending large text test, text length: ${testMessage.length} characters`)
    
    // Record start time
    const startTime = Date.now()
    
    // Call ChatGPT API
    const response = await sendMessageToChatGPT(testMessage, messages.value.slice(0, -1))
    
    // Record end time
    const endTime = Date.now()
    const duration = endTime - startTime
    
    // Add AI reply
    const aiMessage = {
      role: 'assistant',
      content: `${response}\n\n---\n📊 **Test Result Statistics:**\n- Input text length: ${testMessage.length.toLocaleString()} characters\n- Processing time: ${duration.toLocaleString()} milliseconds\n- Test status: ✅ Success`,
      timestamp: Date.now()
    }
    
    messages.value.push(aiMessage)
    
    console.log(`Large text test completed, processing time: ${duration}ms`)
    
  } catch (error) {
    console.error('Large text test failed:', error)
    
    // Add error message
    const errorMessage = {
      role: 'assistant',
      content: `❌ **Large Text Test Failed**\n\nError message: ${error.message}\n\nThis may be due to the following reasons:\n1. Text length exceeds API token limit\n2. Network connection issues\n3. API configuration problems\n4. Server processing timeout\n\nSuggestions:\n- Check network connection\n- Confirm API key configuration is correct\n- Try sending shorter text for testing`,
      timestamp: Date.now()
    }
    
    messages.value.push(errorMessage)
  } finally {
    isLoading.value = false
    
    // Scroll to bottom
    await nextTick()
    scrollToBottom()
  }
}

// Clear conversation
const clearChat = () => {
  if (confirm('Are you sure you want to clear all conversation records?')) {
    messages.value = []
  }
}

// Format message content (supports Markdown)
const formatMessage = (content) => {
  try {
    return marked.parse(content)
  } catch (error) {
    console.error('Markdown parsing error:', error)
    return content.replace(/\n/g, '<br>')
  }
}

// Format time
const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now - date

  if (diff < 60000) { // Less than 1 minute
    return 'Just now'
  } else if (diff < 3600000) { // Less than 1 hour
    return `${Math.floor(diff / 60000)} minutes ago`
  } else if (date.toDateString() === now.toDateString()) { // Today
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  } else {
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
  }
}

// Initialization when component mounts
onMounted(() => {
  // Can load historical messages here
})
</script>

<style scoped>
/* Custom scrollbar */
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

/* Animation effects */
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

/* Message content styles */
.whitespace-pre-wrap {
  white-space: pre-wrap;
  word-wrap: break-word;
}

/* Markdown styles */
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