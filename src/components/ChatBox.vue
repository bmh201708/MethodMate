<template>
  <div class="bg-white rounded-xl shadow-sm p-6 h-full">
    <div class="flex flex-col h-full">
      <!-- 对话管理头部 -->
      <div class="mb-4 border-b border-gray-200 pb-4">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-lg font-semibold text-gray-900">对话管理</h3>
          <div class="flex items-center space-x-2">
            <button
              @click="showConversationsList = !showConversationsList"
              class="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-1"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.013 8.013 0 01-7-4c0-4.418 3.582-8 8-8s8 3.582 8 8z"/>
              </svg>
              <span>{{ showConversationsList ? '隐藏' : '查看' }}历史对话</span>
            </button>
            <button
              @click="createNewConversation"
              :disabled="isCreatingConversation"
              class="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              <span>{{ isCreatingConversation ? '创建中...' : '新对话' }}</span>
            </button>
          </div>
        </div>

        <!-- 当前对话信息 -->
        <div class="flex items-center justify-between">
          <div v-if="currentConversation" class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
            <span class="text-sm font-medium text-gray-900">{{ currentConversation.title }}</span>
            <span class="text-xs text-gray-500">{{ currentConversation.updated_at ? new Date(currentConversation.updated_at).toLocaleString('zh-CN') : '' }}</span>
          </div>
          <div v-else-if="isAuthenticated" class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span class="text-sm text-gray-500">临时对话（发送消息后自动保存）</span>
          </div>
          <div v-else class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
            <span class="text-sm text-gray-500">临时对话（请先登录以保存对话）</span>
          </div>
          
          <div class="text-xs text-gray-400 flex items-center space-x-2">
            <span>{{ Math.max(0, chatState.messages.length - 1) }} 条消息</span>
            <span v-if="isAuthenticated && (chatState.conversationId || currentConversation)" class="text-green-600">已保存</span>
            <span v-else-if="isAuthenticated" class="text-orange-500">未保存</span>
            <span v-else class="text-gray-400">未登录</span>
          </div>
        </div>

        <!-- 历史对话列表 -->
        <div v-if="showConversationsList" class="mt-4 max-h-48 overflow-y-auto border border-gray-200 rounded-lg">
          <div v-if="conversationsLoading" class="p-4 text-center text-gray-500">
            <div class="inline-flex items-center space-x-2">
              <svg class="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              <span>加载中...</span>
            </div>
          </div>
          
          <div v-else-if="conversations.length === 0" class="p-4 text-center text-gray-500">
            暂无历史对话
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
                <p class="text-xs text-gray-500 truncate">{{ conversation.description || '暂无描述' }}</p>
                <p class="text-xs text-gray-400">{{ new Date(conversation.updated_at).toLocaleString('zh-CN') }}</p>
              </div>
              <div class="flex items-center space-x-1">
                <button
                  @click.stop="deleteConversation(conversation)"
                  class="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  title="删除对话"
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

      <!-- 聊天记录 -->
      <div class="flex-1 overflow-y-auto mb-4 space-y-4" ref="chatContainer">
        <!-- 调试信息 -->
        <div v-if="true" class="text-xs text-gray-400 p-2 bg-yellow-50 border border-yellow-200 rounded">
          调试：消息总数 {{ chatState.messages.length }}，最后更新时间 {{ new Date().toLocaleTimeString() }}，强制更新标志: {{ chatState.forceUpdateFlag }}
        </div>
        <div v-for="message in chatState.messages" :key="`msg_${message.id}_${message.content?.length || 0}`" 
             :class="['flex', message.type === 'user' ? 'justify-end' : 'justify-start']">
          <div :class="['max-w-[70%] rounded-lg p-4 relative', 
                       message.type === 'user' ? 'bg-purple-100' : 
                       message.isError ? 'bg-red-50 border border-red-200' : 'bg-gray-100']">
            <!-- 用户消息：纯文本显示 -->
            <div v-if="message.type === 'user'">
              <p class="whitespace-pre-wrap text-gray-800">{{ getDisplayContent(message) }}</p>
              
              <!-- 用户消息的展开按钮 -->
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
                  <span>{{ message.isExpanded ? '收起' : '展开完整内容' }}</span>
                </button>
              </div>
            </div>
            
            <!-- 助手消息：markdown渲染 -->
            <div v-else-if="message.type === 'assistant'" 
                 :class="['markdown-content', message.isError ? 'text-red-700' : 'text-gray-800']">
              <!-- 调试信息 -->
              <div class="text-xs text-blue-500 mb-2 border-b border-blue-200 pb-1">
                ID: {{ message.id }}, 长度: {{ message.content?.length || 0 }}, 完成: {{ message.isComplete }}
              </div>
              <div v-html="renderMarkdown(getDisplayContent(message))"></div>
            </div>
            
            <!-- 研究方案相关按钮（右上角） -->
            <div v-if="message.type === 'assistant' && !message.isError && message.isComplete && isResearchPlan(getOriginalContent(message))"
                 class="absolute top-2 right-2 flex items-center space-x-2">
              
              <!-- 查看对比按钮 -->
              <button 
                v-if="isIterationMessage(message.id) || true"
                @click="handleViewComparison(message)"
                class="flex items-center space-x-1 px-1.5 py-1 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors border border-blue-200 bg-white/80 backdrop-blur-sm"
                title="查看方案迭代对比"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                <span>对比</span>
              </button>
              
              <!-- 在右侧查看按钮 -->
              <button 
                @click="handleViewInRightPanel(message)"
                class="flex items-center space-x-1 px-1.5 py-1 text-xs text-green-600 hover:text-green-700 hover:bg-green-50 rounded-md transition-colors border border-green-200 bg-white/80 backdrop-blur-sm"
                title="将研究方案显示在右侧面板"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                <span>右侧查看</span>
              </button>
            </div>
            
            <!-- 展开按钮（用于长回答） -->
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
                <span>{{ message.isExpanded ? '收起' : '展开完整内容' }}</span>
              </button>
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

      <!-- 悬浮输入框 -->
      <div class="fixed bottom-4 left-4 z-50">
        <!-- 收起状态：圆形按钮 -->
        <div v-if="!isInputExpanded" 
             @click="expandInput"
             class="w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
        >
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.013 8.013 0 01-7-4c0-4.418 3.582-8 8-8s8 3.582 8 8z"/>
          </svg>
        </div>

        <!-- 展开状态：完整输入框 -->
        <div v-else 
             class="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 min-w-80 max-w-md transition-all duration-300 transform"
             :class="{ 'animate-scale-in': isInputExpanded }"
        >
          <!-- 头部 -->
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
              <h3 class="text-sm font-medium text-gray-900">AI助手</h3>
            </div>
            <button 
              @click="collapseInput"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- 输入区域 -->
          <div class="space-y-3">
            <div class="relative">
              <textarea
                v-model="newMessage"
                placeholder="请输入您的问题..."
                class="w-full rounded-lg border border-gray-300 px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                rows="3"
                @keyup.enter.ctrl="handleSendMessage"
                @keyup.enter.exact="handleSendMessage"
                :disabled="chatState.isLoading"
              />
              <!-- 润色按钮 -->
              <button
                @click="handleShowOptimizeDialog"
                :disabled="!newMessage.trim() || chatState.isLoading"
                class="absolute right-2 top-2 p-1.5 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="润色提示词"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>

            <!-- 按钮组 -->
            <div class="flex items-center justify-between">
              <button
                @click="handleShowOptimizeDialog"
                :disabled="!newMessage.trim() || chatState.isLoading"
                class="flex items-center space-x-1 px-3 py-1.5 text-sm text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <span>润色</span>
              </button>
              
              <button
                @click="handleSendMessage"
                :disabled="chatState.isLoading || !newMessage.trim()"
                class="flex items-center space-x-1 px-4 py-1.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg v-if="chatState.isLoading" class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>
                <span>{{ chatState.isLoading ? '发送中...' : '发送' }}</span>
              </button>
            </div>

            <!-- 快捷提示 -->
            <div class="text-xs text-gray-500 text-center">
              按 Ctrl+Enter 快速发送
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 润色提示词对话框 -->
    <PromptOptimizeDialog 
      :visible="showOptimizeDialog" 
      :originalPrompt="newMessage"
      @close="showOptimizeDialog = false"
      @replace="handleOptimizeReplace"
    />
    
    <!-- 方案对比弹窗 -->
    <PlanComparisonDialog 
      :show="showComparisonDialog" 
      :comparisonData="currentComparisonData"
      @close="handleCloseComparison"
    />
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, computed } from 'vue'
import { chatState, sendMessage, conversationAPI, clearMessages, updateCurrentPlan, getIterationComparison, isIterationMessage } from '../stores/chatStore'
import { useUserStore } from '../stores/userStore.js'
import { sendSilentMessageToCoze } from '../services/cozeApi'
import LoadingDots from './LoadingDots.vue'
import ConversationGuide from './ConversationGuide.vue'
import PromptOptimizeDialog from './PromptOptimizeDialog.vue'
import PlanComparisonDialog from './PlanComparisonDialog.vue'
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
const showComparisonDialog = ref(false)
const currentComparisonData = ref(null)
const isInputExpanded = ref(false)

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
  console.log('=== ChatBox组件初始化 ===')
  console.log('用户认证状态:', isAuthenticated.value)
  
  if (isAuthenticated.value) {
    await loadConversations()
    
    // 检查是否有保存的对话ID，如果有则自动切换过去
    const savedConversationId = localStorage.getItem('currentConversationId')
    console.log('从localStorage读取的对话ID:', savedConversationId)
    
    if (savedConversationId) {
      // 等待对话列表加载完成
      await nextTick()
      
      console.log('当前可用对话列表:', conversations.value.map(c => ({ id: c.id, title: c.title })))
      
      // 查找保存的对话
      const savedConversation = conversations.value.find(c => c.id.toString() === savedConversationId)
      if (savedConversation) {
        console.log('✅ 找到保存的对话，自动切换到:', savedConversation.title, 'ID:', savedConversation.id)
        await switchToConversation(savedConversation)
      } else {
        console.log('❌ 保存的对话ID在对话列表中不存在，清除localStorage记录')
        console.log('查找的ID:', savedConversationId, '类型:', typeof savedConversationId)
        console.log('可用的对话IDs:', conversations.value.map(c => ({ id: c.id, toString: c.id.toString() })))
        localStorage.removeItem('currentConversationId')
      }
    } else {
      console.log('localStorage中没有保存的对话ID')
    }
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
      
      // 设置为当前对话并保存到localStorage
      localStorage.setItem('currentConversationId', newConversation.id.toString())
      
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
      
      // 保存当前对话ID到localStorage，以便页面刷新后恢复
      localStorage.setItem('currentConversationId', conversation.id.toString())
      console.log('✅ 已保存对话ID到localStorage:', conversation.id.toString())
      
      console.log('chatState.conversationId 已设置为:', chatState.conversationId)
      
      // 清空当前消息并加载历史消息（不重置conversationId）
      chatState.messages = [
        {
          id: 1,
          type: 'assistant',
          content: '你好！我是 MethodMate AI 助手，请问有什么我可以帮助你的吗？',
          isComplete: true
        }
      ]
      console.log('✅ 已清空消息数组但保持conversationId:', chatState.conversationId)
      
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
          
          // 清除保存的对话ID
          localStorage.removeItem('currentConversationId')
          
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

// 检测是否为研究方案（缓存结果避免重复计算）
const researchPlanCache = new Map()
const isResearchPlan = (content) => {
  if (!content || typeof content !== 'string') return false
  
  // 创建内容hash作为缓存键
  const contentHash = content.length + '_' + content.substring(0, 100)
  
  // 检查缓存
  if (researchPlanCache.has(contentHash)) {
    return researchPlanCache.get(contentHash)
  }
  
  // 检查关键词组合，提高检测准确性
  const researchKeywords = [
    '研究假设', '实验设计', '数据分析', '结果呈现',
    '研究方案', '实验方案', '定量研究', '研究方法',
    '研究目标', '研究问题', '实验组', '对照组',
    'H1:', 'H2:', 'H3:', '假设一', '假设二', '假设三'
  ]
  
  const designKeywords = [
    '2x2设计', '实验设计', '自变量', '因变量', '控制变量',
    '随机分组', '实验条件', '实验程序', '被试'
  ]
  
  const analysisKeywords = [
    'SPSS', 'R Studio', '方差分析', 'ANOVA', '回归分析',
    't检验', '卡方检验', '统计分析', '数据处理'
  ]
  
  // 计算匹配的关键词数量
  const countMatches = (keywords) => {
    return keywords.filter(keyword => content.includes(keyword)).length
  }
  
  const researchMatches = countMatches(researchKeywords)
  const designMatches = countMatches(designKeywords)
  const analysisMatches = countMatches(analysisKeywords)
  
  // 至少包含多个不同类别的关键词才判断为研究方案
  const totalMatches = researchMatches + designMatches + analysisMatches
  const categoryCount = (researchMatches > 0 ? 1 : 0) + 
                       (designMatches > 0 ? 1 : 0) + 
                       (analysisMatches > 0 ? 1 : 0)
  
  // 判断标准：总匹配数>=3 且 涉及至少2个类别
  const isValidPlan = totalMatches >= 3 && categoryCount >= 2
  
  // 缓存结果
  researchPlanCache.set(contentHash, isValidPlan)
  
  // 限制缓存大小
  if (researchPlanCache.size > 50) {
    const firstKey = researchPlanCache.keys().next().value
    researchPlanCache.delete(firstKey)
  }
  
  // 只在检测到研究方案时输出日志，减少控制台噪音
  if (isValidPlan) {
    console.log('检测到研究方案:', {
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
    console.log('开始解析研究方案...')
    
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
      console.log('JSON解析失败，使用原始内容')
    }
    
    // 提取各个部分
    const extractSection = (text, patterns, sectionName) => {
      console.log(`开始提取${sectionName}...`)
      for (let i = 0; i < patterns.length; i++) {
        const pattern = patterns[i]
        const match = text.match(pattern)
        console.log(`${sectionName} 模式 ${i + 1} 匹配结果:`, match ? '匹配成功' : '未匹配')
        if (match) {
          let content = match[1] || match[2] || match[0]
          console.log(`${sectionName} 原始匹配内容:`, content.substring(0, 200) + '...')
          // 清理内容：移除多余的标点和换行
          content = content.replace(/^[：:\s]+/, '').replace(/\s+$/, '').trim()
          if (content.length > 10) { // 确保提取到有意义的内容
            console.log(`${sectionName} 清理后内容长度:`, content.length)
            return content
          }
        }
      }
      console.log(`${sectionName} 所有模式都未匹配成功`)
      return null
    }
    
    // 研究假设提取模式（支持markdown格式）
    const hypothesisPatterns = [
      // Markdown标题格式: # 研究假设
      /(?:#+\s*(?:研究假设|实验假设|假设).*?)\n((?:(?!#+\s*(?:实验设计|数据分析|结果呈现|研究设计|统计分析|预期结果)).)+?)(?=\n#+\s*(?:实验设计|数据分析|结果呈现|研究设计|统计分析|预期结果)|$)/is,
      // 传统冒号格式
      /(?:研究假设|实验假设)[：:\s]*\n?((?:(?:H\d+[:：]|假设\d+[:：]|\d+[\.、]|[•·*-]\s*).*\n?)+)/i,
      /(?:假设|hypothesis)[：:\s]*\n?((?:(?:H\d+[:：]|假设\d+[:：]|\d+[\.、]|[•·*-]\s*).*\n?)+)/i,
      /((?:H\d+[:：]|假设\d+[:：]).*(?:\n(?:H\d+[:：]|假设\d+[:：]).*)*)/i
    ]
    
    // 实验设计提取模式（支持markdown格式）
    const designPatterns = [
      // Markdown标题格式: # 实验设计
      /(?:#+\s*(?:实验设计|研究设计|设计方案).*?)\n((?:(?!#+\s*(?:数据分析|结果呈现|研究假设|统计分析|预期结果)).)+?)(?=\n#+\s*(?:数据分析|结果呈现|研究假设|统计分析|预期结果)|$)/is,
      // 传统冒号格式
      /(?:实验设计|研究设计)[：:\s]*\n?((?:(?!(?:数据分析|结果呈现|研究假设)).)+?)(?=(?:\n\s*(?:数据分析|结果呈现|研究假设|$)))/is,
      /(?:设计方案|实验方法)[：:\s]*\n?((?:(?!(?:数据分析|结果呈现|研究假设)).)+?)(?=(?:\n\s*(?:数据分析|结果呈现|研究假设|$)))/is
    ]
    
    // 数据分析提取模式（支持markdown格式）
    const analysisPatterns = [
      // Markdown标题格式: # 数据分析
      /(?:#+\s*(?:数据分析|统计分析|分析方法).*?)\n((?:(?!#+\s*(?:结果呈现|研究假设|实验设计|预期结果)).)+?)(?=\n#+\s*(?:结果呈现|研究假设|实验设计|预期结果)|$)/is,
      // 传统冒号格式
      /(?:数据分析|统计分析|分析方法)[：:\s]*\n?((?:(?!(?:结果呈现|研究假设|实验设计)).)+?)(?=(?:\n\s*(?:结果呈现|研究假设|实验设计|$)))/is,
      /(?:分析工具|统计方法|数据处理)[：:\s]*\n?((?:(?!(?:结果呈现|研究假设|实验设计)).)+?)(?=(?:\n\s*(?:结果呈现|研究假设|实验设计|$)))/is
    ]
    
    // 结果呈现提取模式（支持markdown格式）
    const resultsPatterns = [
      // Markdown标题格式: # 结果呈现
      /(?:#+\s*(?:结果呈现|预期结果|研究结果).*?)\n((?:(?!#+\s*(?:研究假设|实验设计|数据分析)).)+?)(?=\n#+\s*(?:研究假设|实验设计|数据分析)|$)/is,
      // 传统冒号格式
      /(?:结果呈现|预期结果|研究结果)[：:\s]*\n?((?:(?!(?:研究假设|实验设计|数据分析)).)+?)(?=(?:\n\s*(?:研究假设|实验设计|数据分析|$)))/is,
      /(?:预期|预计|期望).*?(?:结果|发现|效应)[：:\s]*\n?((?:(?!(?:研究假设|实验设计|数据分析)).)+?)(?=(?:\n\s*(?:研究假设|实验设计|数据分析|$)))/is
    ]
    
    // 提取各部分内容
    const hypothesis = extractSection(actualContent, hypothesisPatterns, '研究假设')
    const design = extractSection(actualContent, designPatterns, '实验设计')
    const analysis = extractSection(actualContent, analysisPatterns, '数据分析')
    const results = extractSection(actualContent, resultsPatterns, '结果呈现')
    
    console.log('提取结果:')
    console.log('- 研究假设:', hypothesis ? '✓ 已提取' : '✗ 未提取', hypothesis ? `(${hypothesis.length}字符)` : '')
    console.log('- 实验设计:', design ? '✓ 已提取' : '✗ 未提取', design ? `(${design.length}字符)` : '')
    console.log('- 数据分析:', analysis ? '✓ 已提取' : '✗ 未提取', analysis ? `(${analysis.length}字符)` : '')
    console.log('- 结果呈现:', results ? '✓ 已提取' : '✗ 未提取', results ? `(${results.length}字符)` : '')
    
    // 检查是否提取到至少一个有效内容
    const hasValidContent = hypothesis || design || analysis || results
    if (!hasValidContent) {
      console.log('未提取到任何有效的研究方案内容')
      console.log('完整内容长度:', actualContent.length)
      console.log('内容包含的关键词:')
      console.log('- 研究假设:', actualContent.includes('研究假设'))
      console.log('- 实验设计:', actualContent.includes('实验设计'))
      console.log('- 数据分析:', actualContent.includes('数据分析'))
      console.log('- 结果呈现:', actualContent.includes('结果呈现'))
      console.log('实际内容前1000字符:', actualContent.substring(0, 1000))
      return false
    }
    
    // 构建新的研究方案数据
    const planData = {
      title: `基于Coze生成的研究方案`,
      researchQuestions: 'Coze智能体生成的研究方案',
      methodology: `基于用户需求生成的研究方法 (生成时间: ${new Date().toLocaleString('zh-CN')})`,
      dataCollection: '根据研究设计制定的数据收集方案',
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
      
      console.log(`成功解析并更新研究方案，更新了 ${updatedFields} 个字段`)
      
      // 显示成功提示
      setTimeout(() => {
        alert('研究方案已更新到右侧！请查看各个模块的内容。')
      }, 500)
      
      return true
    } else {
      console.log('未更新任何字段，解析失败')
      return false
    }
    
  } catch (error) {
    console.error('解析研究方案时出现错误:', error)
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
    console.log('解析失败，原始内容前500字符:', originalContent.substring(0, 500))
    alert('解析研究方案失败，请检查方案格式是否正确。')
  }
}

// 处理"查看对比"按钮点击
const handleViewComparison = (message) => {
  console.log('查看对比，消息ID:', message.id)
  
  // 获取这个消息对应的迭代对比数据
  let comparisonData = getIterationComparison(message.id)
  
  // 如果没有实际的迭代数据，创建模拟数据用于演示
  if (!comparisonData) {
    console.log('没有找到实际迭代数据，创建模拟数据用于演示')
    
    // 创建模拟的迭代前数据
    const mockBeforeData = {
      title: "初始研究方案",
      researchQuestions: "初始研究问题",
      methodology: "初始研究方法",
      hypotheses: [
        "H1: 用户对产品的满意度会影响购买意愿",
        "H2: 价格敏感度在不同年龄组之间存在差异"
      ],
      experimentalDesign: "采用2x2实验设计，包含两个自变量：价格水平（高价/低价）和产品类型（功能型/享乐型）。通过控制实验条件，测量用户的购买意愿和满意度评分。",
      analysisMethod: "使用SPSS进行数据分析，包括描述性统计、方差分析(ANOVA)和回归分析。",
      expectedResults: "预期发现价格和产品类型对购买意愿的交互作用显著。",
      timestamp: new Date(Date.now() - 60000).toISOString()
    }
    
    // 创建模拟的迭代后数据
    const mockAfterData = {
      title: "优化后研究方案",
      researchQuestions: "优化的研究问题",
      methodology: "改进的研究方法",
      hypotheses: [
        "H1: 用户对产品的满意度会正向影响购买意愿，且这种影响在高价格条件下更为显著",
        "H2: 价格敏感度在不同年龄组之间存在显著差异，年轻用户更关注价格因素",
        "H3: 产品类型调节价格与购买意愿的关系"
      ],
      experimentalDesign: "采用2x2x2三因素实验设计，新增年龄组变量（年轻组18-35岁/成熟组36-55岁）。通过在线实验平台进行随机分组，每组不少于30人。实验材料包括产品图片、价格信息和详细描述。",
      analysisMethod: "使用SPSS和R Studio进行混合效应模型分析，包括描述性统计、多因素方差分析(MANOVA)、回归分析和中介效应检验。采用Bootstrap方法进行置信区间估计。",
      expectedResults: "预期发现价格、产品类型和年龄组之间的三重交互作用。年轻用户对价格更敏感，功能型产品的价格效应更明显。",
      timestamp: new Date().toISOString()
    }
    
    // 创建模拟的对比数据
    comparisonData = {
      before: mockBeforeData,
      after: mockAfterData,
      section: null,
      suggestion: "请优化研究方案，增加更多的研究假设，完善实验设计的细节，并提升数据分析的深度。",
      timestamp: new Date().toISOString(),
      isDemoData: true // 标记为演示数据
    }
  }
  
  if (comparisonData) {
    console.log('显示对比数据:', comparisonData)
    currentComparisonData.value = comparisonData
    showComparisonDialog.value = true
  } else {
    console.log('无法创建对比数据')
    alert('暂无可对比的数据，请确保此消息是迭代后的方案。')
  }
}

// 关闭对比弹窗
const handleCloseComparison = () => {
  showComparisonDialog.value = false
  currentComparisonData.value = null
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
    console.error('Markdown渲染错误:', error)
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
        
        console.log('尝试解析的JSON字符串:', jsonStr)
        
        let jsonData = null
        
        // 尝试多种解析方法
        try {
          jsonData = JSON.parse(jsonStr)
        } catch (e1) {
          console.log('第一次解析失败:', e1.message)
          
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
            
            console.log('修复后的JSON字符串:', jsonStr)
            jsonData = JSON.parse(jsonStr)
          } catch (e2) {
            console.log('第二次解析也失败:', e2.message)
            
            // 最后尝试：提取可识别的字段
            try {
              const outputMatch = jsonStr.match(/"output"\s*:\s*"([^"]*)"/)
              const otherMatch = jsonStr.match(/"(?:otherIntention|otherInthtion)"\s*:\s*"([^"]*)"/)
              
              if (outputMatch || otherMatch) {
                jsonData = {
                  output: outputMatch ? outputMatch[1] : '',
                  otherIntention: otherMatch ? otherMatch[1] : ''
                }
                console.log('通过正则表达式提取的数据:', jsonData)
              }
            } catch (e3) {
              console.log('正则提取也失败:', e3.message)
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
            console.log('成功提取显示内容:', displayContent)
          }
        }
      }
    } catch (error) {
      // JSON解析失败，返回原内容
      console.log('JSON解析完全失败，显示原始内容:', error.message)
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
    const description = '基于用户消息自动创建的对话'
    
    try {
      const result = await conversationAPI.create(title, description)
      if (result.success) {
        const newConversation = result.conversation
        conversations.value.unshift(newConversation)
        currentConversation.value = newConversation
        chatState.conversationId = newConversation.id
        console.log('自动创建新对话:', newConversation.title, 'ID:', newConversation.id)
        
        // 强制刷新UI
        await nextTick()
      }
    } catch (error) {
      console.error('自动创建对话失败:', error)
      alert('创建对话失败：' + error.message)
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

// 展开悬浮输入框
const expandInput = () => {
  isInputExpanded.value = true
}

// 收起悬浮输入框
const collapseInput = () => {
  isInputExpanded.value = false
}


</script>

<style scoped>
/* 悬浮输入框样式 */
@keyframes scale-in {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-scale-in {
  animation: scale-in 0.3s ease-out;
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
</style> 