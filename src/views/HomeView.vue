<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <h1 class="text-2xl font-bold text-gray-900">MethodMate</h1>
          <div class="flex items-center space-x-4">
            <button
              class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              新建方案
            </button>
            <button
              @click="router.push('/history-plans')"
              class="px-4 py-2 bg-white text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
            >
              历史方案
            </button>
          </div>
        </div>
      </div>
    </header>

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
      <div class="h-[calc(100vh-24rem)]">
        <ChatBox />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ChatBox from '../components/ChatBox.vue'

const router = useRouter()

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