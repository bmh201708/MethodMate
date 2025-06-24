<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <main class="flex-1 max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-12 gap-8">
        <!-- 左侧聊天框 -->
        <div class="col-span-4">
          <ChatBox />
        </div>

        <!-- 右侧历史方案列表 -->
        <div class="col-span-8">
          <!-- 加载状态 -->
          <div v-if="isLoading" class="bg-white rounded-lg shadow-sm p-12 text-center">
            <div class="mb-6">
              <svg class="animate-spin mx-auto h-12 w-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">正在加载历史方案...</h3>
            <p class="text-gray-500">请稍候，正在从数据库获取您的研究方案</p>
          </div>

          <!-- 顶部操作按钮 -->
          <div v-else-if="historyState.historyPlans.length > 0" class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold text-gray-900">
              共 {{ historyState.historyPlans.length }} 个历史方案
            </h2>
            <button 
              @click="confirmClearAll"
              class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              清除所有方案
            </button>
          </div>
          
          <div v-if="!isLoading && historyState.historyPlans.length > 0" class="space-y-4">
            <div v-for="plan in historyState.historyPlans" :key="plan.id" 
                 class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div class="p-6 cursor-pointer" @click="viewPlan(plan)">
                <div class="flex justify-between items-start">
                  <div class="space-y-2 flex-1">
                    <h3 class="text-lg font-semibold text-gray-900">{{ plan.title }}</h3>
                    <p class="text-gray-600 line-clamp-2">{{ plan.description }}</p>
                    <div class="flex items-center space-x-4 text-sm text-gray-500">
                      <span>创建时间：{{ plan.createdAt }}</span>
                      <span>作者：{{ plan.author }}</span>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2 ml-4">
                    <span v-if="historyState.currentAppliedPlanId === plan.id" 
                          class="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                      应用中
                    </span>
                    <span v-else 
                          class="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
                      {{ plan.status }}
                    </span>
                  </div>
                </div>
              </div>
              
              <!-- 操作按钮区域 -->
              <div class="px-6 py-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                <button 
                  @click="viewPlan(plan)"
                  class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                >
                  查看详情
                </button>
                <button 
                  @click.stop="confirmDelete(plan)"
                  class="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm"
                >
                  删除
                </button>
              </div>
            </div>
          </div>
          
          <!-- 空状态 -->
          <div v-else-if="!isLoading" class="bg-white rounded-lg shadow-sm p-12 text-center">
            <div class="mb-6">
              <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">暂无历史方案</h3>
            <p class="text-gray-500 mb-6">
              您还没有生成过任何研究方案。请前往研究方案页面开始创建您的第一个方案。
            </p>
            
            <!-- 调试信息区域 -->
            <div v-if="!userStore.isAuthenticated" class="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
                <span class="text-yellow-800 font-medium">您尚未登录</span>
              </div>
              <p class="text-yellow-700 mt-2">
                历史方案功能需要登录后使用。请先登录您的账户。
              </p>
              <button 
                @click="router.push('/login')"
                class="mt-3 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                立即登录
              </button>
            </div>
            
            <!-- 开发者调试信息 -->
            <div v-if="isDev && debugInfo.errorMessage" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
              <h4 class="text-red-800 font-medium mb-2">调试信息:</h4>
              <ul class="text-red-700 text-sm space-y-1">
                <li>用户已登录: {{ debugInfo.userAuthenticated ? '是' : '否' }}</li>
                <li>方案数量: {{ debugInfo.planCount }}</li>
                <li v-if="debugInfo.errorMessage">错误信息: {{ debugInfo.errorMessage }}</li>
                <li v-if="debugInfo.apiResponse">API响应: {{ debugInfo.apiResponse }}</li>
              </ul>
            </div>
            
            <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button 
                @click="router.push('/research-plan')"
                class="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                开始创建方案
              </button>
              <button 
                @click="refreshData"
                class="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                刷新数据
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ChatBox from '../components/ChatBox.vue'
import { historyState, removeHistoryPlan, clearHistoryPlans, setCurrentViewingPlan, papersState, loadUserData } from '../stores/chatStore'
import { useUserStore } from '../stores/userStore.js'

const router = useRouter()
const userStore = useUserStore()
const isLoading = ref(false)

// 开发环境检测
const isDev = import.meta.env.DEV

// 引用文献计数
const referencedCount = computed(() => papersState.referencedPapers.size)

// 页面加载时主动加载数据
onMounted(async () => {
  await refreshData()
})

// 添加调试状态
const debugInfo = ref({
  userAuthenticated: false,
  apiResponse: null,
  errorMessage: null,
  planCount: 0
})

// 刷新数据
const refreshData = async () => {
  if (isLoading.value) return // 防止重复加载
  
  isLoading.value = true
  try {
    console.log('历史方案页面：开始刷新数据')
    
    // 更新调试信息
    debugInfo.value.userAuthenticated = userStore.isAuthenticated
    debugInfo.value.errorMessage = null
    
    console.log('用户认证状态:', userStore.isAuthenticated)
    
    if (userStore.isAuthenticated) {
      // 如果用户已登录，加载用户数据
      await loadUserData()
      debugInfo.value.planCount = historyState.historyPlans.length
      debugInfo.value.apiResponse = `成功加载 ${historyState.historyPlans.length} 个方案`
      console.log('数据加载完成，历史方案数量:', historyState.historyPlans.length)
    } else {
      debugInfo.value.errorMessage = '用户未登录，请先登录后查看历史方案'
      console.log('用户未登录，跳过数据加载')
    }
  } catch (error) {
    console.error('加载历史方案数据失败:', error)
    debugInfo.value.errorMessage = `加载失败: ${error.message}`
    debugInfo.value.apiResponse = error.message
    // 可以在这里添加错误提示给用户
  } finally {
    isLoading.value = false
  }
}

// 查看方案详情
const viewPlan = (plan) => {
  // 设置当前查看的方案
  setCurrentViewingPlan(plan)
  // 跳转到研究方案页面
  router.push('/research-plan')
}

// 确认删除单个方案
const confirmDelete = (plan) => {
  if (confirm(`确定要删除方案"${plan.title}"吗？`)) {
    removeHistoryPlan(plan.id)
  }
}

// 确认清除所有方案
const confirmClearAll = () => {
  if (confirm(`确定要清除所有 ${historyState.historyPlans.length} 个历史方案吗？此操作不可撤销。`)) {
    clearHistoryPlans()
  }
}
</script>

<style scoped>
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

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 