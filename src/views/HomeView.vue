<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <main class="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <!-- 相关文献 -->
        <div>
          <h2 class="text-lg font-semibold text-gray-900 mb-4">相关文献</h2>
          <div class="space-y-4">
            <div class="research-card">
              <img src="/images/os-icon.png" alt="Operating System" class="card-icon" />
              <div class="card-content">
                <h3 class="card-title">{{ papers[0].title }}</h3>
                <p class="card-description">{{ papers[0].description }}</p>
                <p class="card-author">Created by {{ papers[0].author }}</p>
              </div>
              <div class="card-arrow cursor-pointer" @click="router.push('/papers')">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- 定量研究方案 -->
        <div>
          <h2 class="text-lg font-semibold text-gray-900 mb-4">定量研究方案</h2>
          <div class="research-card">
            <img src="/images/ai-icon.png" alt="Research Plan" class="card-icon" />
            <div class="card-content">
              <h3 class="card-title">{{ researchPlans[0].title }}</h3>
              <p class="card-description">{{ researchPlans[0].description }}</p>
              <p class="card-author">Created by {{ researchPlans[0].author }}</p>
            </div>
            <div class="card-arrow cursor-pointer" @click="router.push('/research-plan')">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- 聊天框 -->
      <div class="h-[calc(100vh-22rem)]">
        <ChatBox />
      </div>
    </main>

    <!-- AI服务测试侧边栏 -->
    <div v-if="isDev">
      <!-- 切换按钮 -->
      <button 
        @click="isTestPanelOpen = !isTestPanelOpen" 
        class="fixed top-1/2 z-50 bg-white p-2 rounded-l-md shadow-lg border-l border-t border-b h-24 flex items-center justify-center transition-all duration-300 ease-in-out"
        :style="{ right: isTestPanelOpen ? '24rem' : '0rem', transform: 'translateY(-50%)' }"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600 transition-transform duration-300" :class="{'rotate-180': isTestPanelOpen}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- 面板内容 -->
      <div 
        class="fixed top-1/2 -translate-y-1/2 z-40 bg-white shadow-lg border rounded-l-md w-96 h-[80vh] overflow-y-auto transition-transform duration-300 ease-in-out"
        :class="isTestPanelOpen ? 'translate-x-0' : 'translate-x-full'"
        style="right: 0;"
      >
        <div class="p-4">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">AI服务测试</h3>
          <AIServiceTest />
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ChatBox from '../components/ChatBox.vue'
import AIServiceTest from '../components/AIServiceTest.vue'
import { papersState } from '../stores/chatStore'

const router = useRouter()

// 开发模式检测
const isDev = computed(() => import.meta.env.DEV)
const isTestPanelOpen = ref(false)

// 引用文献计数
const referencedCount = computed(() => papersState.referencedPapers.size)

// 论文和研究计划数据
const papers = ref([
  {
    id: 1,
    title: 'Relevant Papers',
    description: 'Learn the basic operating system abstractions, mechanisms, and their implementations.',
    author: 'Qi Liu',
    icon: '/images/os-icon.png'
  }
])

const researchPlans = ref([
  {
    id: 1,
    title: 'Research Plan',
    description: 'Intelligence demonstrated by machines, unlike the natural intelligence displayed by humans and animals.',
    author: 'Qi Liu',
    icon: '/images/ai-icon.png'
  }
])
</script>

<style>
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
</style>