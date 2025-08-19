<template>
  <div class="bg-white rounded-xl shadow-sm p-6 h-full chat-container">
    <div class="flex flex-col h-full">
      <!-- Conversation management header -->
      <div class="mb-4 border-b border-gray-200 pb-4">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-lg font-semibold text-gray-900">Conversation Management</h3>
          <div class="flex items-center space-x-2">
            <button
              @click="showConversationsList = !showConversationsList"
              class="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-1"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.013 8.013 0 01-7-4c0-4.418 3.582-8 8-8s8 3.582 8 8z"/>
              </svg>
              <span>{{ showConversationsList ? 'Hide' : 'View' }} History</span>
            </button>
            <button
              @click="createNewConversation"
              :disabled="isCreatingConversation"
              class="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              <span>{{ isCreatingConversation ? 'Creating...' : 'New Chat' }}</span>
            </button>
          </div>
        </div>

        <!-- Current conversation information -->
        <div class="flex items-center justify-between">
          <div v-if="currentConversation" class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
            <span class="text-sm font-medium text-gray-900">{{ currentConversation.title }}</span>
            <span class="text-xs text-gray-500">{{ currentConversation.updated_at ? new Date(currentConversation.updated_at).toLocaleString('en-US') : '' }}</span>
          </div>
          <div v-else-if="isAuthenticated" class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span class="text-sm text-gray-500">Temporary Chat (Auto-save after sending)</span>
          </div>
          <div v-else class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
            <span class="text-sm text-gray-500">Temporary Chat (Please login to save)</span>
          </div>
          
          <div class="text-xs text-gray-400 flex items-center space-x-2">
            <span>{{ Math.max(0, chatState.messages.length - 1) }} Messages</span>
            <span v-if="isAuthenticated && (chatState.conversationId || currentConversation)" class="text-green-600">Saved</span>
            <span v-else-if="isAuthenticated" class="text-orange-500">Unsaved</span>
            <span v-else class="text-gray-400">Not Logged In</span>
          </div>
        </div>

        <!-- Historical conversation list -->
        <div v-if="showConversationsList" class="mt-4 max-h-48 overflow-y-auto border border-gray-200 rounded-lg">
          <div v-if="conversationsLoading" class="p-4 text-center text-gray-500">
            <div class="inline-flex items-center space-x-2">
              <svg class="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              <span>Loading...</span>
            </div>
          </div>
          
          <div v-else-if="conversations.length === 0" class="p-4 text-center text-gray-500">
            No conversation history
          </div>
          
          <div v-else class="divide-y divide-gray-200">
            <div 
              v-for="conversation in conversations" 
              :key="conversation.id"
              @click="switchToConversation(conversation)"
              :class="[
                'p-3 cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between',
                currentConversation?.id === conversation.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
              ]"
            >
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">{{ conversation.title }}</p>
                <p class="text-xs text-gray-500 truncate">{{ conversation.description || 'No description' }}</p>
                <p class="text-xs text-gray-400">{{ new Date(conversation.updated_at).toLocaleString('en-US') }}</p>
              </div>
              <div class="flex items-center space-x-1">
                <button
                  @click.stop="deleteConversation(conversation)"
                  class="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  title="Delete conversation"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Chat history -->
      <div class="flex-1 overflow-y-auto mb-4 space-y-4" ref="chatContainer">
        <!-- Debug information -->
        <div v-if="false" class="text-xs text-gray-400 p-2 bg-yellow-50 border border-yellow-200 rounded">
          Debug: Total messages {{ chatState.messages.length }}, Last updated {{ new Date().toLocaleTimeString() }}, Force update flag: {{ chatState.forceUpdateFlag }}
        </div>
        <div v-for="message in chatState.messages" :key="`msg_${message.id}_${message.content?.length || 0}`" 
             :class="['flex', message.type === 'user' ? 'justify-end' : 'justify-start']">
          <div :class="['max-w-[70%] rounded-lg p-4 relative', 
                       message.type === 'user' ? 'bg-purple-100' : 
                       message.isError ? 'bg-red-50 border border-red-200' : 'bg-gray-100']">
            <!-- User message: plain text display -->
            <div v-if="message.type === 'user'">
              <p class="whitespace-pre-wrap text-gray-800">{{ getDisplayContent(message) }}</p>
              
              <!-- Expand button for user messages -->
              <div v-if="message.fullContent && message.isTruncated" 
                   class="mt-3 pt-3 border-t border-purple-200">
                <button 
                  @click="toggleMessageExpansion(message)"
                  class="flex items-center space-x-2 px-3 py-2 text-sm text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
                >
                  <svg v-if="!message.isExpanded" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
                  </svg>
                  <span>{{ message.isExpanded ? 'Collapse' : 'Expand Full Content' }}</span>
                </button>
              </div>
            </div>
            
            <!-- Assistant message: markdown rendering -->
            <div v-else-if="message.type === 'assistant'" 
                 :class="['markdown-content', message.isError ? 'text-red-700' : 'text-gray-800']">
              <!-- Debug information -->
              <div class="text-xs text-blue-500 mb-2 border-b border-blue-200 pb-1">
                ID: {{ message.id }}, Length: {{ message.content?.length || 0 }}, Completed: {{ message.isComplete }}
              </div>
              <div v-html="renderMarkdown(getDisplayContent(message))"></div>
            </div>
            
            <!-- Research plan related buttons (top right corner) -->
            <div v-if="message.type === 'assistant' && !message.isError && message.isComplete && isResearchPlan(getOriginalContent(message))"
                 class="absolute top-2 right-2 flex items-center space-x-2">
              
              <!-- View in right panel button -->
              <button 
                @click="handleViewInRightPanel(message)"
                class="flex items-center space-x-1 px-1.5 py-1 text-xs text-green-600 hover:text-green-700 hover:bg-green-50 rounded-md transition-colors border border-green-200 bg-white/80 backdrop-blur-sm"
                title="Display research plan in the right panel"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                <span>View in Right Panel</span>
              </button>
            </div>
            
            <!-- Expand button (for long responses) -->
            <div v-if="message.type === 'assistant' && message.fullContent && message.isTruncated" 
                 class="mt-3 pt-3 border-t border-gray-200">
              <button 
                @click="toggleMessageExpansion(message)"
                class="flex items-center space-x-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <svg v-if="!message.isExpanded" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
                </svg>
                <span>{{ message.isExpanded ? 'Collapse' : 'Expand Full Content' }}</span>
              </button>
            </div>
          </div>
        </div>
        <!-- Loading animation -->
        <div v-if="chatState.isLoading" class="flex justify-start">
          <div class="max-w-[70%] rounded-lg p-4 bg-gray-100">
            <LoadingDots />
          </div>
        </div>
      </div>

      <!-- Conversation guide -->
      <ConversationGuide @sendPrompt="handlePromptMessage" />

      <!-- Chat input area -->
      <div class="mt-4">
                <!-- Collapsed state: expand chat button -->
        <button v-if="!isInputExpanded" 
                @click="expandInput"
                class="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.013 8.013 0 01-7-4c0-4.418 3.582-8 8-8s8 3.582 8 8z"/>
          </svg>
          <span class="font-medium">Chat with AI Assistant</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>

        <!-- Expanded state: chat input interface -->
        <div v-else 
             class="bg-white border border-gray-200 rounded-lg transition-all duration-300"
             :class="{ 'animate-expand-in': isInputExpanded }"
        >
          <!-- Input area -->
          <div class="p-4 space-y-3">
            <!-- Header information -->
            <div class="mb-3">
            </div>

            <!-- Input box -->
            <div class="relative">
              <textarea
                v-model="newMessage"
                placeholder="Please enter your question..."
                class="w-full rounded-lg bg-white px-3 py-2 focus:outline-none resize-none text-sm"
                rows="3"
                @keyup.enter.ctrl="handleSendMessage"
                @keyup.enter.exact="handleSendMessage"
                :disabled="chatState.isLoading"
                ref="messageInput"
              />
            </div>

            <!-- Button group -->
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <button
                  @click="handleShowOptimizeDialog"
                  :disabled="!newMessage.trim() || chatState.isLoading"
                  class="flex items-center space-x-1 px-3 py-1.5 text-sm bg-gradient-to-r from-purple-600 to-blue-600 text-white border-none rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg class="w-4 h-4" fill="none" stroke="white" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  <span>Polish</span>
                </button>
              </div>
              <div class="flex items-center space-x-2">
                <button
                  @click="handleSendMessage"
                  :disabled="chatState.isLoading || !newMessage.trim()"
                  class="flex items-center space-x-1 px-4 py-1.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-none rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg v-if="chatState.isLoading" class="w-4 h-4 animate-spin" fill="none" stroke="white" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="white" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                  </svg>
                  <span>{{ chatState.isLoading ? 'Sending...' : 'Send' }}</span>
                </button>
                <!-- Collapse button moved to bottom right -->
                <button 
                  @click="collapseInput"
                  class="text-black hover:text-gray-700 transition-colors p-1"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Polish prompt dialog -->
    <PromptOptimizeDialog 
      :visible="showOptimizeDialog" 
      :originalPrompt="newMessage"
      @close="showOptimizeDialog = false"
      @replace="handleOptimizeReplace"
    />
    

  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, computed } from 'vue'
import { chatState, sendMessage, conversationAPI, clearMessages, updateCurrentPlan, shouldReinitialize, markAsInitialized } from '../stores/chatStore'
import { useUserStore } from '../stores/userStore.js'
import { sendSilentMessageToCoze } from '../services/cozeApi'
import LoadingDots from './LoadingDots.vue'
import ConversationGuide from './ConversationGuide.vue'
import PromptOptimizeDialog from './PromptOptimizeDialog.vue'

import { marked } from 'marked'

// Props to receive page context
const props = defineProps({
  pageContext: {
    type: String,
    default: null
  }
})

const newMessage = ref('')
const chatContainer = ref(null)
const messageInput = ref(null)
const showOptimizeDialog = ref(false)

const isInputExpanded = ref(false)

// User state
const userStore = useUserStore()

// Conversation management related states
const conversations = ref([])
const currentConversation = ref(null)
const showConversationsList = ref(false)
const conversationsLoading = ref(false)
const isCreatingConversation = ref(false)

// Computed property: whether user is logged in
const isAuthenticated = computed(() => userStore.isAuthenticated)

// Load conversation list on initialization
onMounted(async () => {
  console.log('=== ChatBox Component Initialization ===')
  console.log('Page context:', props.pageContext)
  console.log('User authentication status:', isAuthenticated.value)
  console.log('Current conversation ID:', chatState.conversationId)
  console.log('Current message count:', chatState.messages.length)
  
  // 检查是否需要重新初始化
  if (!shouldReinitialize(props.pageContext)) {
    console.log('✅ Detected existing conversation state, skipping reinitialization')
    console.log('Current conversation ID:', chatState.conversationId)
    console.log('Current message count:', chatState.messages.length)
    return
  }
  
  if (isAuthenticated.value) {
    await loadConversations()
    
    // 检查是否有保存的对话ID，如果有则自动切换过去
    const savedConversationId = localStorage.getItem('currentConversationId')
    console.log('Conversation ID read from localStorage:', savedConversationId)
    
    if (savedConversationId) {
      // 等待对话列表加载完成
      await nextTick()
      
      console.log('Current available conversation list:', conversations.value.map(c => ({ id: c.id, title: c.title })))
      
      // 查找保存的对话
      const savedConversation = conversations.value.find(c => c.id.toString() === savedConversationId)
      if (savedConversation) {
        console.log('✅ Found saved conversation, automatically switching to:', savedConversation.title, 'ID:', savedConversation.id)
        await switchToConversation(savedConversation)
      } else {
        console.log('❌ Saved conversation ID does not exist in conversation list, clearing localStorage record')
        console.log('Searched ID:', savedConversationId, 'Type:', typeof savedConversationId)
        console.log('Available conversation IDs:', conversations.value.map(c => ({ id: c.id, toString: c.id.toString() })))
        localStorage.removeItem('currentConversationId')
      }
    } else {
      console.log('No saved conversation ID in localStorage')
    }
  }
  
  // 标记已初始化
  markAsInitialized(props.pageContext)
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
      console.log(`Loaded ${conversations.value.length} conversations`)
    }
  } catch (error) {
    console.error('Failed to load conversation list:', error)
  } finally {
    conversationsLoading.value = false
  }
}

// 创建新对话
const createNewConversation = async () => {
  if (!isAuthenticated.value) {
    alert('Please login first to create a conversation')
    return
  }

  isCreatingConversation.value = true
  try {
    // 生成对话标题（基于当前时间或消息内容）
    const title = `New Conversation ${new Date().toLocaleString('en-US')}`
    const description = 'New conversation created by user'
    
    console.log('Creating new conversation:', { title, description })
    
    const result = await conversationAPI.create(title, description)
    if (result.success) {
      const newConversation = result.conversation
      
      console.log('Conversation created successfully:', newConversation)
      
      // 添加到对话列表开头
      conversations.value.unshift(newConversation)
      
      // 设置当前对话
      currentConversation.value = newConversation
      chatState.conversationId = newConversation.id
      
      // 清空当前消息（保留欢迎消息）
      clearMessages()
      
      // 设置为当前对话并保存到localStorage
      localStorage.setItem('currentConversationId', newConversation.id.toString())
      
      // 强制刷新UI
      await nextTick()
      
      console.log('New conversation created successfully:', newConversation.title, 'ID:', newConversation.id)
      alert('New conversation created successfully!')
    } else {
      throw new Error(result.error || 'Failed to create conversation')
    }
  } catch (error) {
    console.error('Failed to create new conversation:', error)
    alert('Failed to create conversation: ' + error.message)
  } finally {
    isCreatingConversation.value = false
  }
}

// 切换到指定对话
const switchToConversation = async (conversation) => {
  if (!isAuthenticated.value) return
  
  try {
    console.log('Switching to conversation:', conversation.title, 'ID:', conversation.id)
    
    // 获取对话详情和消息
    const result = await conversationAPI.getById(conversation.id)
    if (result.success) {
      // 设置当前对话
      currentConversation.value = result.conversation
      chatState.conversationId = conversation.id
      
      // 保存当前对话ID到localStorage，以便页面刷新后恢复
      localStorage.setItem('currentConversationId', conversation.id.toString())
      console.log('✅ Saved conversation ID to localStorage:', conversation.id.toString())
      
      console.log('chatState.conversationId set to:', chatState.conversationId)
      
      // 清空当前消息并加载历史消息（不重置conversationId）
      chatState.messages = [
        {
          id: 1,
          type: 'assistant',
          content: 'Hello! I am MethodMate AI Assistant. Is there anything I can do for you?',
          isComplete: true
        }
      ]
      console.log('✅ Cleared message array but maintained conversationId:', chatState.conversationId)
      
      // 添加历史消息到chatState
      if (result.messages && result.messages.length > 0) {
        // 过滤掉第一条默认的欢迎消息，然后添加历史消息
        // 确保历史消息ID不会与新消息冲突，使用连续的前端ID
        let messageIdCounter = 2 // 从2开始，1是欢迎消息
        chatState.messages = [
          chatState.messages[0], // 保留欢迎消息
          ...result.messages.map(msg => ({
            id: messageIdCounter++, // 使用连续的前端ID，避免与数据库ID冲突
            type: msg.role,
            content: msg.content,
            isComplete: true,
            isError: false,
            saved: true, // 从数据库加载的消息标记为已保存
            databaseId: msg.id // 保存原始数据库ID
          }))
        ]
      }
      
      console.log(`Loaded ${result.messages?.length || 0} messages for conversation "${conversation.title}"`)
      
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
    console.error('Failed to switch conversation:', error)
    alert('Failed to switch conversation: ' + error.message)
  }
}

// 删除对话
const deleteConversation = async (conversation) => {
  if (!isAuthenticated.value) return
  
  if (!confirm(`Are you sure you want to delete the conversation "${conversation.title}"? This action cannot be undone.`)) {
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
          
          // 清除保存的对话ID
          localStorage.removeItem('currentConversationId')
          
          console.log('Reset to temporary conversation state')
        }
      }
      
      console.log('Conversation deleted successfully:', conversation.title)
    }
  } catch (error) {
    console.error('Failed to delete conversation:', error)
    alert('Failed to delete conversation: ' + error.message)
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

// Detect if content is a research plan (cache results to avoid repeated calculations)
const researchPlanCache = new Map()
const isResearchPlan = (content) => {
  if (!content || typeof content !== 'string') return false
  
  // 创建内容hash作为缓存键
  const contentHash = content.length + '_' + content.substring(0, 100)
  
  // 检查缓存
  if (researchPlanCache.has(contentHash)) {
    return researchPlanCache.get(contentHash)
  }
  
  // Check keyword combinations to improve detection accuracy (supports Chinese and English)
  const researchKeywords = [
    // Chinese keywords
    '研究假设', '实验设计', '数据分析', '结果呈现',
    '研究方案', '实验方案', '定量研究', '研究方法',
    '研究目标', '研究问题', '实验组', '对照组',
    'H1:', 'H2:', 'H3:', '假设一', '假设二', '假设三',
    // English keywords
    'Research Hypotheses', 'Experimental Design', 'Data Analysis', 'Results Presentation',
    'research plan', 'experimental plan', 'quantitative research', 'research method',
    'research objective', 'research question', 'experimental group', 'control group',
    'hypothesis', 'hypotheses'
  ]
  
  const designKeywords = [
    // Chinese keywords
    '2x2设计', '实验设计', '自变量', '因变量', '控制变量',
    '随机分组', '实验条件', '实验程序', '被试',
    // English keywords
    '2x2 design', 'experimental design', 'independent variable', 'dependent variable', 'control variable',
    'random assignment', 'experimental condition', 'experimental procedure', 'participants'
  ]
  
  const analysisKeywords = [
    // Chinese keywords
    'SPSS', 'R Studio', '方差分析', 'ANOVA', '回归分析',
    't检验', '卡方检验', '统计分析', '数据处理',
    // English keywords
    'data analysis', 'statistical analysis', 'regression analysis',
    't-test', 'chi-square test', 'ANOVA', 'data processing'
  ]
  
  // 计算匹配的关键词数量
  const countMatches = (keywords) => {
    return keywords.filter(keyword => content.includes(keyword)).length
  }
  
  const researchMatches = countMatches(researchKeywords)
  const designMatches = countMatches(designKeywords)
  const analysisMatches = countMatches(analysisKeywords)
  
  // Only consider as research plan if contains multiple keywords from different categories
  const totalMatches = researchMatches + designMatches + analysisMatches
  const categoryCount = (researchMatches > 0 ? 1 : 0) + 
                       (designMatches > 0 ? 1 : 0) + 
                       (analysisMatches > 0 ? 1 : 0)
  
  // Criteria: total matches >= 3 and involves at least 2 categories
  const isValidPlan = totalMatches >= 3 && categoryCount >= 2
  
  // Cache results
  researchPlanCache.set(contentHash, isValidPlan)
  
  // Limit cache size
  if (researchPlanCache.size > 50) {
    const firstKey = researchPlanCache.keys().next().value
    researchPlanCache.delete(firstKey)
  }
  
  // Only output logs when research plan detected to reduce console noise
  if (isValidPlan) {
    console.log('Detected research plan:', {
      totalMatches,
      categoryCount,
      researchMatches,
      designMatches, 
      analysisMatches,
      content: content.substring(0, 200) + '...'
    })
  }
  
  return isValidPlan
}

// 解析研究方案内容并更新右侧显示
const parseAndDisplayResearchPlan = (content) => {
  try {
    console.log('Starting to parse research plan...')
    
    // 首先尝试从JSON中提取内容
    let actualContent = content
    try {
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/i) || content.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        let jsonStr = jsonMatch[1] || jsonMatch[0]
        jsonStr = jsonStr.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']').trim()
        const jsonData = JSON.parse(jsonStr)
        if (jsonData.output) {
          actualContent = jsonData.output
        } else if (jsonData.otherIntention) {
          actualContent = jsonData.otherIntention
        }
      }
    } catch (jsonError) {
      console.log('JSON parsing failed, using original content')
    }
    
    // 提取各个部分
    const extractSection = (text, patterns, sectionName) => {
      console.log(`Starting to extract ${sectionName}...`)
      for (let i = 0; i < patterns.length; i++) {
        const pattern = patterns[i]
        const match = text.match(pattern)
        console.log(`${sectionName} pattern ${i + 1} match result:`, match ? 'Matched' : 'No match')
        if (match) {
          let content = match[1] || match[2] || match[0]
          console.log(`${sectionName} original matched content:`, content.substring(0, 200) + '...')
          // 清理内容：移除多余的标点和换行
          content = content.replace(/^[：:\s]+/, '').replace(/\s+$/, '').trim()
          if (content.length > 10) { // 确保提取到有意义的内容
            console.log(`${sectionName} cleaned content length:`, content.length)
            return content
          }
        }
      }
      console.log(`${sectionName} all patterns failed to match`)
      return null
    }
    
    // 研究假设提取模式（支持markdown格式和中英文）
    const hypothesisPatterns = [
      // English Markdown format: # Research Hypotheses
      /(?:#+\s*(?:Research Hypotheses|Experimental Hypotheses|Hypotheses).*?)\n((?:(?!#+\s*(?:Experimental Design|Data Analysis|Results Presentation|Research Design|Statistical Analysis|Expected Results)).)+?)(?=\n#+\s*(?:Experimental Design|Data Analysis|Results Presentation|Research Design|Statistical Analysis|Expected Results)|$)/is,
      // Chinese Markdown format: # 研究假设
      /(?:#+\s*(?:研究假设|实验假设|假设).*?)\n((?:(?!#+\s*(?:实验设计|数据分析|结果呈现|研究设计|统计分析|预期结果|Experimental Design|Data Analysis|Results Presentation)).)+?)(?=\n#+\s*(?:实验设计|数据分析|结果呈现|研究设计|统计分析|预期结果|Experimental Design|Data Analysis|Results Presentation)|$)/is,
      // English colon format
      /(?:Research Hypotheses|Experimental Hypotheses)[：:\s]*\n?((?:(?:H\d+[:：]|Hypothesis\s+\d+[:：]|\d+[\.、]|[•·*-]\s*).*\n?)+)/i,
      // Chinese colon format
      /(?:研究假设|实验假设)[：:\s]*\n?((?:(?:H\d+[:：]|假设\d+[:：]|\d+[\.、]|[•·*-]\s*).*\n?)+)/i,
      /(?:假设|hypothesis)[：:\s]*\n?((?:(?:H\d+[:：]|假设\d+[:：]|\d+[\.、]|[•·*-]\s*).*\n?)+)/i,
      /((?:H\d+[:：]|假设\d+[:：]).*(?:\n(?:H\d+[:：]|假设\d+[:：]).*)*)/i
    ]
    
    // 实验设计提取模式（支持markdown格式和中英文）
    const designPatterns = [
      // English Markdown format: # Experimental Design
      /(?:#+\s*(?:Experimental Design|Research Design|Design Plan).*?)\n((?:(?!#+\s*(?:Data Analysis|Results Presentation|Research Hypotheses|Statistical Analysis|Expected Results)).)+?)(?=\n#+\s*(?:Data Analysis|Results Presentation|Research Hypotheses|Statistical Analysis|Expected Results)|$)/is,
      // Chinese Markdown format: # 实验设计
      /(?:#+\s*(?:实验设计|研究设计|设计方案).*?)\n((?:(?!#+\s*(?:数据分析|结果呈现|研究假设|统计分析|预期结果|Data Analysis|Results Presentation|Research Hypotheses)).)+?)(?=\n#+\s*(?:数据分析|结果呈现|研究假设|统计分析|预期结果|Data Analysis|Results Presentation|Research Hypotheses)|$)/is,
      // English colon format
      /(?:Experimental Design|Research Design)[：:\s]*\n?((?:(?!(?:Data Analysis|Results Presentation|Research Hypotheses|数据分析|结果呈现|研究假设)).)+?)(?=(?:\n\s*(?:Data Analysis|Results Presentation|Research Hypotheses|数据分析|结果呈现|研究假设|$)))/is,
      // Chinese colon format
      /(?:实验设计|研究设计)[：:\s]*\n?((?:(?!(?:数据分析|结果呈现|研究假设|Data Analysis|Results Presentation|Research Hypotheses)).)+?)(?=(?:\n\s*(?:数据分析|结果呈现|研究假设|Data Analysis|Results Presentation|Research Hypotheses|$)))/is,
      /(?:设计方案|实验方法)[：:\s]*\n?((?:(?!(?:数据分析|结果呈现|研究假设|Data Analysis|Results Presentation|Research Hypotheses)).)+?)(?=(?:\n\s*(?:数据分析|结果呈现|研究假设|Data Analysis|Results Presentation|Research Hypotheses|$)))/is
    ]
    
    // 数据分析提取模式（支持markdown格式和中英文）
    const analysisPatterns = [
      // English Markdown format: # Data Analysis
      /(?:#+\s*(?:Data Analysis|Statistical Analysis|Analysis Method).*?)\n((?:(?!#+\s*(?:Results Presentation|Research Hypotheses|Experimental Design|Expected Results)).)+?)(?=\n#+\s*(?:Results Presentation|Research Hypotheses|Experimental Design|Expected Results)|$)/is,
      // Chinese Markdown format: # 数据分析
      /(?:#+\s*(?:数据分析|统计分析|分析方法).*?)\n((?:(?!#+\s*(?:结果呈现|研究假设|实验设计|预期结果|Results Presentation|Research Hypotheses|Experimental Design)).)+?)(?=\n#+\s*(?:结果呈现|研究假设|实验设计|预期结果|Results Presentation|Research Hypotheses|Experimental Design)|$)/is,
      // English colon format
      /(?:Data Analysis|Statistical Analysis|Analysis Method)[：:\s]*\n?((?:(?!(?:Results Presentation|Research Hypotheses|Experimental Design|结果呈现|研究假设|实验设计)).)+?)(?=(?:\n\s*(?:Results Presentation|Research Hypotheses|Experimental Design|结果呈现|研究假设|实验设计|$)))/is,
      // Chinese colon format
      /(?:数据分析|统计分析|分析方法)[：:\s]*\n?((?:(?!(?:结果呈现|研究假设|实验设计|Results Presentation|Research Hypotheses|Experimental Design)).)+?)(?=(?:\n\s*(?:结果呈现|研究假设|实验设计|Results Presentation|Research Hypotheses|Experimental Design|$)))/is,
      /(?:分析工具|统计方法|数据处理)[：:\s]*\n?((?:(?!(?:结果呈现|研究假设|实验设计|Results Presentation|Research Hypotheses|Experimental Design)).)+?)(?=(?:\n\s*(?:结果呈现|研究假设|实验设计|Results Presentation|Research Hypotheses|Experimental Design|$)))/is
    ]
    
    // 结果呈现提取模式（支持markdown格式和中英文）
    const resultsPatterns = [
      // English Markdown format: # Results Presentation
      /(?:#+\s*(?:Results Presentation|Expected Results|Research Results).*?)\n((?:(?!#+\s*(?:Research Hypotheses|Experimental Design|Data Analysis)).)+?)(?=\n#+\s*(?:Research Hypotheses|Experimental Design|Data Analysis)|$)/is,
      // Chinese Markdown format: # 结果呈现
      /(?:#+\s*(?:结果呈现|预期结果|研究结果).*?)\n((?:(?!#+\s*(?:研究假设|实验设计|数据分析|Research Hypotheses|Experimental Design|Data Analysis)).)+?)(?=\n#+\s*(?:研究假设|实验设计|数据分析|Research Hypotheses|Experimental Design|Data Analysis)|$)/is,
      // English colon format
      /(?:Results Presentation|Expected Results|Research Results)[：:\s]*\n?((?:(?!(?:Research Hypotheses|Experimental Design|Data Analysis|研究假设|实验设计|数据分析)).)+?)(?=(?:\n\s*(?:Research Hypotheses|Experimental Design|Data Analysis|研究假设|实验设计|数据分析|$)))/is,
      // Chinese colon format
      /(?:结果呈现|预期结果|研究结果)[：:\s]*\n?((?:(?!(?:研究假设|实验设计|数据分析|Research Hypotheses|Experimental Design|Data Analysis)).)+?)(?=(?:\n\s*(?:研究假设|实验设计|数据分析|Research Hypotheses|Experimental Design|Data Analysis|$)))/is,
      /(?:预期|预计|期望).*?(?:结果|发现|效应)[：:\s]*\n?((?:(?!(?:研究假设|实验设计|数据分析|Research Hypotheses|Experimental Design|Data Analysis)).)+?)(?=(?:\n\s*(?:研究假设|实验设计|数据分析|Research Hypotheses|Experimental Design|Data Analysis|$)))/is
    ]
    
    // 提取各部分内容
    const hypothesis = extractSection(actualContent, hypothesisPatterns, 'Research Hypotheses')
    const design = extractSection(actualContent, designPatterns, 'Experimental Design')
    const analysis = extractSection(actualContent, analysisPatterns, 'Data Analysis')
    const results = extractSection(actualContent, resultsPatterns, 'Results Presentation')
    
    console.log('Extraction Results:')
    console.log('- Research Hypotheses:', hypothesis ? '✓ Extracted' : '✗ Not extracted', hypothesis ? `(${hypothesis.length} characters)` : '')
    console.log('- Experimental Design:', design ? '✓ Extracted' : '✗ Not extracted', design ? `(${design.length} characters)` : '')
    console.log('- Data Analysis:', analysis ? '✓ Extracted' : '✗ Not extracted', analysis ? `(${analysis.length} characters)` : '')
    console.log('- Results Presentation:', results ? '✓ Extracted' : '✗ Not extracted', results ? `(${results.length} characters)` : '')
    
    // 检查是否提取到至少一个有效内容
    const hasValidContent = hypothesis || design || analysis || results
    if (!hasValidContent) {
      console.log('No valid research plan content extracted')
      console.log('Full content length:', actualContent.length)
      console.log('Content includes keywords:')
      console.log('- Research Hypotheses:', actualContent.includes('Research Hypotheses') || actualContent.includes('研究假设'))
      console.log('- Experimental Design:', actualContent.includes('Experimental Design') || actualContent.includes('实验设计'))
      console.log('- Data Analysis:', actualContent.includes('Data Analysis') || actualContent.includes('数据分析'))
      console.log('- Results Presentation:', actualContent.includes('Results Presentation') || actualContent.includes('结果呈现'))
      console.log('First 1000 characters of actual content:', actualContent.substring(0, 1000))
      return false
    }
    
    // 构建新的研究方案数据
    const planData = {
      title: `Research Plan Generated by AI`,
      researchQuestions: 'AI-generated research plan',
      methodology: `Research methodology generated based on user requirements (Generated: ${new Date().toLocaleString('en-US')})`,
      dataCollection: 'Data collection plan formulated according to research design',
      hypotheses: [],
      experimentalDesign: '',
      analysisMethod: '',
      expectedResults: ''
    }
    
    let updatedFields = 0
    
    // 更新研究假设
    if (hypothesis) {
      // 如果包含多个假设，分割成数组
      const hypothesesArray = hypothesis.split(/\n(?=H\d+[:：]|假设\d+[:：]|\d+[\.、]|[•·]\s*)/).filter(h => h.trim())
      if (hypothesesArray.length > 1) {
        planData.hypotheses = hypothesesArray.map(h => h.trim())
      } else {
        planData.hypotheses = [hypothesis]
      }
      updatedFields++
    }
    
    // 更新实验设计
    if (design) {
      planData.experimentalDesign = design
      updatedFields++
    }
    
    // 更新数据分析
    if (analysis) {
      planData.analysisMethod = analysis
      updatedFields++
    }
    
    // 更新结果呈现
    if (results) {
      planData.expectedResults = results
      updatedFields++
    }
    
    // 如果至少更新了一个字段，就应用到右侧显示
    if (updatedFields >= 1) {
      // 使用 updateCurrentPlan 更新当前方案状态
      updateCurrentPlan(planData)
      
      console.log(`Successfully parsed and updated research plan, updated ${updatedFields} fields`)
      
      // 显示成功提示
      setTimeout(() => {
        alert('Research plan has been updated on the right panel! Please check the content of each module.')
      }, 500)
      
      return true
    } else {
      console.log('No fields updated, parsing failed')
      return false
    }
    
  } catch (error) {
    console.error('Error occurred while parsing research plan:', error)
    return false
  }
}

// 获取消息的原始完整内容（用于解析）
const getOriginalContent = (message) => {
  // 直接返回原始内容，不经过任何处理
  return message.content
}

// 处理"在右侧查看"按钮点击
const handleViewInRightPanel = (message) => {
  // 使用原始完整内容进行解析，避免截断问题
  const originalContent = getOriginalContent(message)
  const success = parseAndDisplayResearchPlan(originalContent)
  
  if (!success) {
    console.log('Parsing failed, first 500 characters of original content:', originalContent.substring(0, 500))
    alert('Failed to parse research plan. Please check if the plan format is correct.')
  }
}





// markdown渲染函数
const renderMarkdown = (content) => {
  if (!content) return ''
  try {
    // 使用marked渲染markdown
    const html = marked.parse(content)
    // 简单的XSS防护 - 移除script标签
    return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  } catch (error) {
    console.error('Markdown rendering error:', error)
    // 如果渲染失败，返回原始文本并转义HTML
    return content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }
}

// 处理消息显示内容
const getDisplayContent = (message) => {
  // 处理用户消息的长度截断
  if (message.type === 'user') {
    const content = message.content
    
    // 检查是否为长消息，如果是则截断显示并存储完整内容
    if (isLongResponse(content)) {
      // 存储完整内容用于展开显示
      message.fullContent = content
      message.isTruncated = true
      
      // 如果当前是展开状态，显示完整内容
      if (message.isExpanded) {
        return content
      }
      
      // 否则只显示前200个字符（用户消息截断得更短一些）
      return content.substring(0, 200) + '...'
    }
    
    return content
  }
  
  // 如果是错误消息，直接返回原内容
  if (message.isError) {
    return message.content
  }
  
  let displayContent = message.content
  
  // 如果是助手消息，尝试解析JSON并提取output和otherIntention
  if (message.type === 'assistant') {
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
        
        console.log('Attempting to parse JSON string:', jsonStr)
        
        let jsonData = null
        
        // 尝试多种解析方法
        try {
          jsonData = JSON.parse(jsonStr)
        } catch (e1) {
          console.log('First parsing attempt failed:', e1.message)
          
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
            
            console.log('Fixed JSON string:', jsonStr)
            jsonData = JSON.parse(jsonStr)
          } catch (e2) {
            console.log('Second parsing attempt also failed:', e2.message)
            
            // 最后尝试：提取可识别的字段
            try {
              const outputMatch = jsonStr.match(/"output"\s*:\s*"([^"]*)"/)
              const otherMatch = jsonStr.match(/"(?:otherIntention|otherInthtion)"\s*:\s*"([^"]*)"/)
              
              if (outputMatch || otherMatch) {
                jsonData = {
                  output: outputMatch ? outputMatch[1] : '',
                  otherIntention: otherMatch ? otherMatch[1] : ''
                }
                console.log('Data extracted through regex:', jsonData)
              }
            } catch (e3) {
              console.log('Regex extraction also failed:', e3.message)
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
            console.log('Successfully extracted display content:', displayContent)
          }
        }
      }
    } catch (error) {
      // JSON解析失败，返回原内容
      console.log('JSON parsing completely failed, displaying original content:', error.message)
    }
  }
  
  // 检查是否为长回答，如果是则截断显示并存储完整内容
  if (isLongResponse(displayContent)) {
    // 存储完整内容用于展开显示
    message.fullContent = displayContent
    message.isTruncated = true
    
    // 如果当前是展开状态，显示完整内容
    if (message.isExpanded) {
      return displayContent
    }
    
    // 否则只显示前300个字符
    return displayContent.substring(0, 300) + '...'
  }
  
  // 默认返回原内容
  return displayContent
}

// 检测是否为长回答（需要截断显示）
const isLongResponse = (content) => {
  return content && content.length > 300 // 超过300个字符视为长回答
}

// 切换消息展开状态
const toggleMessageExpansion = (message) => {
  message.isExpanded = !message.isExpanded
  // 强制重新渲染
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
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
  
  // 如果用户已登录但没有当前对话，先创建一个对话
  if (isAuthenticated.value && !currentConversation.value && !chatState.conversationId) {
    // 生成基于第一条消息的对话标题
    const title = message.length > 20 ? message.substring(0, 20) + '...' : message
    const description = 'Conversation automatically created based on user message'
    
    try {
      const result = await conversationAPI.create(title, description)
      if (result.success) {
        const newConversation = result.conversation
        conversations.value.unshift(newConversation)
        currentConversation.value = newConversation
        chatState.conversationId = newConversation.id
        console.log('Automatically created new conversation:', newConversation.title, 'ID:', newConversation.id)
        
        // 强制刷新UI
        await nextTick()
      }
    } catch (error) {
      console.error('Failed to automatically create conversation:', error)
      alert('Failed to create conversation: ' + error.message)
      // 继续发送消息，即使对话创建失败
    }
  }
  
  // 传递页面上下文给sendMessage方法
  await sendMessage(message, props.pageContext)
  
  // 发送消息后自动收起输入框
  collapseInput()
  
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

// 展开聊天输入框
const expandInput = () => {
  isInputExpanded.value = true
  // 等待DOM更新后聚焦到输入框
  nextTick(() => {
    if (messageInput.value) {
      messageInput.value.focus()
    }
  })
}

// 收起聊天输入框
const collapseInput = () => {
  isInputExpanded.value = false
}




</script>

<style scoped>
/* 展开动画 */
@keyframes expand-in {
  from {
    max-height: 0;
    opacity: 0;
    transform: scaleY(0.8);
  }
  to {
    max-height: 200px;
    opacity: 1;
    transform: scaleY(1);
  }
}

.animate-expand-in {
  animation: expand-in 0.3s ease-out;
  transform-origin: top;
}

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
  background-color: rgba(59, 130, 246, 0.1);
  color: #1e40af;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9em;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.markdown-content :deep(pre) {
  background-color: rgba(59, 130, 246, 0.05);
  border: 1px solid rgba(59, 130, 246, 0.15);
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
  border-left: 4px solid #3b82f6;
  margin: 0.8em 0;
  padding: 1em;
  background-color: rgba(59, 130, 246, 0.05);
  border-radius: 0.25rem;
  color: #374151;
}

/* 文本截断样式 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 