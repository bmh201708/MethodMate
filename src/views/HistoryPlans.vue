<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- 顶部导航栏 -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-8">
            <button
              @click="router.push('/')"
              class="text-gray-600 hover:text-gray-900 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              首页
            </button>
            <h1 class="text-2xl font-bold text-gray-900">历史方案</h1>
          </div>
        </div>
      </div>
    </nav>

    <main class="flex-1 max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-12 gap-8">
        <!-- 左侧聊天框 -->
        <div class="col-span-4">
          <ChatBox />
        </div>

        <!-- 右侧历史方案列表 -->
        <div class="col-span-8">
          <!-- 顶部操作按钮 -->
          <div v-if="historyState.historyPlans.length > 0" class="flex justify-between items-center mb-6">
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
          
          <div v-if="historyState.historyPlans.length > 0" class="space-y-4">
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
          <div v-else class="bg-white rounded-lg shadow-sm p-12 text-center">
            <div class="mb-6">
              <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">暂无历史方案</h3>
            <p class="text-gray-500 mb-6">
              您还没有生成过任何研究方案。请前往研究方案页面开始创建您的第一个方案。
            </p>
            <button 
              @click="router.push('/research-plan')"
              class="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              开始创建方案
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ChatBox from '../components/ChatBox.vue'
import { historyState, removeHistoryPlan, clearHistoryPlans, setCurrentViewingPlan } from '../stores/chatStore'

const router = useRouter()

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