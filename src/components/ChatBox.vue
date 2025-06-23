<template>
  <div class="bg-white rounded-xl shadow-sm p-6 h-full">
    <div class="flex flex-col h-full">
      <!-- 聊天记录 -->
      <div class="flex-1 overflow-y-auto p-4 space-y-4" ref="chatContainer">
        <!-- 消息列表 -->
        <div v-for="(message, index) in chatState.messages" :key="index" class="flex"
             :class="message.type === 'user' ? 'justify-end' : 'justify-start'">
          
          <!-- 用户消息 -->
          <div v-if="message.type === 'user'" 
               class="max-w-[60%] rounded-2xl p-3 bg-purple-100 text-gray-800">
            <div class="prose prose-sm max-w-none whitespace-pre-wrap" v-html="renderMarkdown(message.content)"></div>
          </div>
          
          <!-- 助手消息 -->
          <div v-else class="max-w-[80%]">
            <div class="rounded-2xl p-4 bg-gray-100 text-gray-900">
              <!-- 显示内容（可能被截断） -->
              <div class="prose prose-sm max-w-none" v-html="renderMarkdown(getDisplayContent(message, index))"></div>
              
              <!-- 长文本的展开按钮 -->
              <div v-if="message.type === 'assistant' && isLongContent(message)"
                   class="mt-3 flex justify-center">
                <button 
                  @click="toggleMessageExpansion(index)"
                  class="px-3 py-1.5 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center space-x-1.5"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="message.isExpanded" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                  <span>{{ message.isExpanded ? '收起' : '展开全部' }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- 加载动画 -->
        <div v-if="chatState.isLoading" class="flex justify-start">
          <div class="max-w-[70%] rounded-lg p-4 bg-gray-100">
            <LoadingDots />
          </div>
        </div>
      </div>

      <!-- 对话引导 -->
      <ConversationGuide @sendPrompt="handlePromptMessage" />

      <!-- 输入框 -->
      <div class="flex items-center space-x-2">
        <div class="relative flex-1">
          <input
            v-model="newMessage"
            type="text"
            placeholder="请输入您的问题..."
            class="w-full rounded-lg border border-gray-300 px-4 py-2 pr-16 focus:outline-none focus:ring-2 focus:ring-purple-500"
            @keyup.enter="handleSendMessage"
            :disabled="chatState.isLoading"
          />
          <!-- 润色提示词按钮 -->
          <button
            @click="handleShowOptimizeDialog"
            :disabled="!newMessage.trim() || chatState.isLoading"
            class="absolute right-2 top-1/2 transform -translate-y-1/2 px-2 py-1 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
            title="润色提示词"
          >
            <!-- 魔法棒图标 -->
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            <span class="text-xs font-medium">润色</span>
          </button>
        </div>
        <button
          @click="handleSendMessage"
          class="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="chatState.isLoading"
        >
          发送
        </button>
      </div>
    </div>

    <!-- 润色提示词对话框 -->
    <PromptOptimizeDialog 
      :visible="showOptimizeDialog" 
      :originalPrompt="newMessage"
      @close="showOptimizeDialog = false"
      @replace="handleOptimizeReplace"
    />
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from 'vue'
import { chatState, sendMessage } from '../stores/chatStore'
import { sendSilentMessageToCoze } from '../services/cozeApi'
import LoadingDots from './LoadingDots.vue'
import ConversationGuide from './ConversationGuide.vue'
import PromptOptimizeDialog from './PromptOptimizeDialog.vue'
import { marked } from 'marked'

// 接收页面上下文的props
const props = defineProps({
  pageContext: {
    type: String,
    default: null
  }
})

const newMessage = ref('')
const chatContainer = ref(null)
const showOptimizeDialog = ref(false)

// 用户状态
const userStore = useUserStore()

// 对话管理相关状态
const conversations = ref([])
const currentConversation = ref(null)
const showConversationsList = ref(false)
const conversationsLoading = ref(false)
const isCreatingConversation = ref(false)

// 计算属性：用户是否已登录
const isAuthenticated = computed(() => userStore.isAuthenticated)

// 初始化时加载对话列表
onMounted(async () => {
  if (isAuthenticated.value) {
    await loadConversations()
  }
})

// 监听用户登录状态变化
watch(isAuthenticated, async (newVal) => {
  if (newVal) {
    await loadConversations()
  } else {
    // 用户登出时清空对话数据
    conversations.value = []
    currentConversation.value = null
    showConversationsList.value = false
  }
})

// 加载对话列表
const loadConversations = async () => {
  if (!isAuthenticated.value) return
  
  conversationsLoading.value = true
  try {
    const result = await conversationAPI.getAll()
    if (result.success) {
      conversations.value = result.conversations || []
      console.log(`已加载 ${conversations.value.length} 个对话`)
    }
  } catch (error) {
    console.error('加载对话列表失败:', error)
  } finally {
    conversationsLoading.value = false
  }
}

// 创建新对话
const createNewConversation = async () => {
  if (!isAuthenticated.value) {
    alert('请先登录后再创建对话')
    return
  }

  isCreatingConversation.value = true
  try {
    // 生成对话标题（基于当前时间或消息内容）
    const title = `新对话 ${new Date().toLocaleString('zh-CN')}`
    const description = '用户创建的新对话'
    
    console.log('正在创建新对话:', { title, description })
    
    const result = await conversationAPI.create(title, description)
    if (result.success) {
      const newConversation = result.conversation
      
      console.log('对话创建成功:', newConversation)
      
      // 添加到对话列表开头
      conversations.value.unshift(newConversation)
      
      // 设置当前对话
      currentConversation.value = newConversation
      chatState.conversationId = newConversation.id
      
      // 清空当前消息（保留欢迎消息）
      clearMessages()
      
      // 强制刷新UI
      await nextTick()
      
      console.log('新对话创建成功:', newConversation.title, 'ID:', newConversation.id)
      alert('新对话创建成功！')
    } else {
      throw new Error(result.error || '创建对话失败')
    }
  } catch (error) {
    console.error('创建新对话失败:', error)
    alert('创建对话失败：' + error.message)
  } finally {
    isCreatingConversation.value = false
  }
}

// 切换到指定对话
const switchToConversation = async (conversation) => {
  if (!isAuthenticated.value) return
  
  try {
    console.log('切换到对话:', conversation.title, 'ID:', conversation.id)
    
    // 获取对话详情和消息
    const result = await conversationAPI.getById(conversation.id)
    if (result.success) {
      // 设置当前对话
      currentConversation.value = result.conversation
      chatState.conversationId = conversation.id
      
      console.log('chatState.conversationId 已设置为:', chatState.conversationId)
      
      // 清空当前消息并加载历史消息
      clearMessages()
      
      // 添加历史消息到chatState
      if (result.messages && result.messages.length > 0) {
        // 过滤掉第一条默认的欢迎消息，然后添加历史消息
        chatState.messages = [
          chatState.messages[0], // 保留欢迎消息
          ...result.messages.map(msg => ({
            id: msg.id,
            type: msg.role,
            content: msg.content,
            isComplete: true,
            isError: false,
            saved: true, // 从数据库加载的消息标记为已保存
            databaseId: msg.id
          }))
        ]
      }
      
      console.log(`已加载对话 "${conversation.title}" 的 ${result.messages?.length || 0} 条消息`)
      
      // 强制刷新UI
      await nextTick()
      
      // 滚动到底部
      nextTick(() => {
        if (chatContainer.value) {
          chatContainer.value.scrollTop = chatContainer.value.scrollHeight
        }
      })
    }
  } catch (error) {
    console.error('切换对话失败:', error)
    alert('切换对话失败：' + error.message)
  }
}

// 删除对话
const deleteConversation = async (conversation) => {
  if (!isAuthenticated.value) return
  
  if (!confirm(`确定要删除对话"${conversation.title}"吗？此操作不可撤销。`)) {
    return
  }
  
  try {
    const result = await conversationAPI.delete(conversation.id)
    if (result.success) {
      // 从列表中移除
      const index = conversations.value.findIndex(c => c.id === conversation.id)
      if (index > -1) {
        conversations.value.splice(index, 1)
      }
      
      // 如果删除的是当前对话，切换到新对话或清空
      if (currentConversation.value?.id === conversation.id) {
        if (conversations.value.length > 0) {
          // 切换到第一个对话
          await switchToConversation(conversations.value[0])
        } else {
          // 没有其他对话，重置为临时对话状态
          currentConversation.value = null
          chatState.conversationId = null
          clearMessages()
          
          console.log('已重置为临时对话状态')
        }
      }
      
      console.log('对话删除成功:', conversation.title)
    }
  } catch (error) {
    console.error('删除对话失败:', error)
    alert('删除对话失败：' + error.message)
  }
}

// 监听用户登录状态变化，如果用户登出后重新登录，重新加载对话
watch(isAuthenticated, async (newVal, oldVal) => {
  if (newVal && !oldVal) {
    // 用户刚刚登录
    await loadConversations()
  }
})

// 配置markdown渲染器
marked.setOptions({
  gfm: true, // GitHub风格的markdown
  breaks: true, // 支持换行符转换为<br>
  headerIds: false, // 禁用标题ID以避免重复
  mangle: false // 禁用标题锚点混淆
})

// markdown渲染函数
const renderMarkdown = (content) => {
  if (!content) return ''
  try {
    // 使用marked渲染markdown
    const html = marked.parse(content)
    // 简单的XSS防护 - 移除script标签
    return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  } catch (error) {
    console.error('Markdown渲染错误:', error)
    // 如果渲染失败，返回原始文本并转义HTML
    return content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }
}

// 将markdown转换为HTML
const markdownToHtml = (text) => {
  if (!text) return ''
  
  let html = text
    // 处理标题（从大到小处理，避免冲突）
    .replace(/#{6}\s+(.*?)(\n|$)/g, '<h6>$1</h6>')
    .replace(/#{5}\s+(.*?)(\n|$)/g, '<h5>$1</h5>')
    .replace(/#{4}\s+(.*?)(\n|$)/g, '<h4>$1</h4>')
    .replace(/#{3}\s+(.*?)(\n|$)/g, '<h3>$1</h3>')
    .replace(/#{2}\s+(.*?)(\n|$)/g, '<h2>$1</h2>')
    .replace(/#{1}\s+(.*?)(\n|$)/g, '<h1>$1</h1>')
    // 处理粗体和斜体
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // 处理代码
    .replace(/`(.*?)`/g, '<code>$1</code>')
    // 处理链接
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
  
  // 处理列表
  const lines = html.split('\n')
  const processedLines = []
  let inList = false
  
  lines.forEach(line => {
    const trimmedLine = line.trim()
    
    // 检查是否是列表项
    if (trimmedLine.match(/^[-*+]\s+/) || trimmedLine.match(/^\d+\.\s+/)) {
      if (!inList) {
        processedLines.push('<ul>')
        inList = true
      }
      // 移除列表标记并包装为li
      const content = trimmedLine.replace(/^[-*+]\s+/, '').replace(/^\d+\.\s+/, '')
      processedLines.push(`<li>${content}</li>`)
    } else {
      if (inList) {
        processedLines.push('</ul>')
        inList = false
      }
      processedLines.push(line)
    }
  })
  
  // 如果最后还在列表中，关闭列表
  if (inList) {
    processedLines.push('</ul>')
  }
  
  html = processedLines.join('\n')
  
  // 处理段落（按双换行符分割）
  const paragraphs = html.split(/\n\s*\n/)
  const processedParagraphs = paragraphs.map(paragraph => {
    const trimmed = paragraph.trim()
    if (!trimmed) return ''
    
    // 如果已经是HTML标签，直接返回
    if (trimmed.match(/^<(h[1-6]|ul|ol|li|p|div)/)) {
      return trimmed
    }
    
    // 否则包装为段落
    return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`
  })
  
  return processedParagraphs.filter(p => p).join('\n')
}

// 处理消息显示内容
const getDisplayContent = (message, index) => {
  if (message.type !== 'assistant') return message.content
  
  // 如果消息已展开，显示完整内容
  if (message.isExpanded) {
    return getOriginalContent(message)
  }
  
  // 获取处理后的原始内容
  let content = getOriginalContent(message)
  
  // 如果内容长度超过200字符，截断显示
  if (content.length > 200) {
    return content.substring(0, 200) + '...'
  }
  
  return content
}

// 处理提示词点击
const handlePromptMessage = async (prompt) => {
  // 直接将提示词设置到输入框并发送
  newMessage.value = prompt
  await handleSendMessage()
}

// 显示润色对话框
const handleShowOptimizeDialog = () => {
  if (!newMessage.value.trim()) return
  showOptimizeDialog.value = true
}

// 处理润色替换
const handleOptimizeReplace = (optimizedPrompt) => {
  newMessage.value = optimizedPrompt
}

// 发送消息
const handleSendMessage = async () => {
  if (!newMessage.value.trim()) return
  
  const message = newMessage.value
  newMessage.value = ''
  
  // 传递页面上下文给sendMessage方法
  await sendMessage(message, props.pageContext)
  
  // 自动滚动到底部
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}

// 监听消息变化，自动滚动
watch(() => chatState.messages.length, () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
})

// 添加展开/收起功能
const toggleMessageExpansion = (index) => {
  const message = chatState.messages[index]
  message.isExpanded = !message.isExpanded
}

// 添加长文本判断
const isLongContent = (message) => {
  if (message.type !== 'assistant') return false
  
  // 获取处理后的原始内容
  let content = getOriginalContent(message)
  
  // 判断是否为长文本（超过200字符）
  return content.length > 200
}

// 获取原始内容（处理JSON）
const getOriginalContent = (message) => {
  if (message.type !== 'assistant') return message.content
  
  let displayContent = message.content
  
  // 如果是助手消息，尝试解析JSON并提取output和otherIntention
  try {
    // 首先尝试从代码块中提取JSON
    const jsonMatch = message.content.match(/```json\s*([\s\S]*?)\s*```/i) || message.content.match(/\{[\s\S]*\}/)
    
    if (jsonMatch) {
      let jsonStr = jsonMatch[1] || jsonMatch[0]
      
      // 增强的JSON修复逻辑
      jsonStr = jsonStr
        .replace(/,\s*}/g, '}')  // 移除对象末尾的多余逗号
        .replace(/,\s*]/g, ']')  // 移除数组末尾的多余逗号
        .replace(/:\s*,/g, ': null,')  // 将空值替换为null
        .replace(/"\s*:\s*,/g, '": null,')  // 处理 "key": , 的情况
        .replace(/,\s*,/g, ',')  // 移除连续的逗号
        .replace(/}\s*}+$/g, '}')  // 移除末尾多余的花括号
        .replace(/^{+/g, '{')  // 移除开头多余的花括号
        .trim()
      
      let jsonData = null
      
      // 尝试多种解析方法
      try {
        jsonData = JSON.parse(jsonStr)
      } catch (e1) {
        // 尝试修复更复杂的格式问题
        try {
          // 尝试找到最后一个完整的JSON对象
          const braceCount = (str, char) => (str.match(new RegExp('\\' + char, 'g')) || []).length
          let openBraces = braceCount(jsonStr, '{')
          let closeBraces = braceCount(jsonStr, '}')
          
          if (openBraces > closeBraces) {
            // 缺少结束花括号
            jsonStr += '}'.repeat(openBraces - closeBraces)
          } else if (closeBraces > openBraces) {
            // 多余的结束花括号，从末尾移除
            const excess = closeBraces - openBraces
            for (let i = 0; i < excess; i++) {
              jsonStr = jsonStr.replace(/}([^}]*)$/, '$1')
            }
          }
          
          jsonData = JSON.parse(jsonStr)
        } catch (e2) {
          // 最后尝试：提取可识别的字段
          try {
            const outputMatch = jsonStr.match(/"output"\s*:\s*"([^"]*)"/)
            const otherMatch = jsonStr.match(/"(?:otherIntention|otherInthtion)"\s*:\s*"([^"]*)"/)
            
            if (outputMatch || otherMatch) {
              jsonData = {
                output: outputMatch ? outputMatch[1] : '',
                otherIntention: otherMatch ? otherMatch[1] : ''
              }
            }
          } catch (e3) {
            // 忽略错误
          }
        }
      }
      
      // 如果解析成功，提取display内容
      if (jsonData && typeof jsonData === 'object') {
        const output = jsonData.output || ''
        const otherIntention = jsonData.otherIntention || jsonData.otherInthtion || '' // 兼容拼写错误
        
        // 构建显示内容：拼接output和otherIntention
        const contentParts = []
        
        if (otherIntention && otherIntention.trim()) {
          contentParts.push(otherIntention.trim())
        }
        
        if (output && output.trim()) {
          contentParts.push(output.trim())
        }
        
        // 如果有任何一个字段有内容，返回拼接结果
        if (contentParts.length > 0) {
          displayContent = contentParts.join('\n\n')
        }
      }
    }
  } catch (error) {
    // JSON解析失败，返回原内容
  }
  
  return displayContent
}
</script>

<style scoped>
/* 自定义滚动条样式 */
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

/* Markdown内容样式 */
.markdown-content {
  line-height: 1.6;
}

.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3),
.markdown-content :deep(h4),
.markdown-content :deep(h5),
.markdown-content :deep(h6) {
  margin: 0.8em 0 0.4em 0;
  font-weight: 600;
  line-height: 1.3;
}

.markdown-content :deep(h1) {
  font-size: 1.5em;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0.3em;
}

.markdown-content :deep(h2) {
  font-size: 1.3em;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.2em;
}

.markdown-content :deep(h3) {
  font-size: 1.2em;
}

.markdown-content :deep(h4) {
  font-size: 1.1em;
}

.markdown-content :deep(p) {
  margin: 0.5em 0;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin: 0.5em 0;
  padding-left: 1.5em;
}

.markdown-content :deep(li) {
  margin: 0.2em 0;
}

.markdown-content :deep(code) {
  background-color: #f3f4f6;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9em;
}

.markdown-content :deep(pre) {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  padding: 1em;
  overflow-x: auto;
  margin: 0.8em 0;
}

.markdown-content :deep(pre code) {
  background-color: transparent;
  padding: 0;
  border-radius: 0;
}

.markdown-content :deep(blockquote) {
  border-left: 4px solid #d1d5db;
  margin: 0.8em 0;
  padding: 0.5em 1em;
  background-color: #f9fafb;
}

.markdown-content :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin: 0.8em 0;
}

.markdown-content :deep(th),
.markdown-content :deep(td) {
  border: 1px solid #d1d5db;
  padding: 0.5em;
  text-align: left;
}

.markdown-content :deep(th) {
  background-color: #f3f4f6;
  font-weight: 600;
}

.markdown-content :deep(a) {
  color: #3b82f6;
  text-decoration: underline;
}

.markdown-content :deep(a:hover) {
  color: #1d4ed8;
}

.markdown-content :deep(strong) {
  font-weight: 600;
}

.markdown-content :deep(em) {
  font-style: italic;
}

.markdown-content :deep(hr) {
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 1.5em 0;
}
</style> 