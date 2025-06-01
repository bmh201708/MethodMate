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
          <div class="flex items-center space-x-4">
            <button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              新建方案
            </button>
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
          <div class="space-y-4">
            <div v-for="plan in historyPlans" :key="plan.id" 
                 class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
                 @click="router.push(`/research-plan/${plan.id}`)">
              <div class="flex justify-between items-start">
                <div class="space-y-2">
                  <h3 class="text-lg font-semibold text-gray-900">{{ plan.title }}</h3>
                  <p class="text-gray-600">{{ plan.description }}</p>
                  <div class="flex items-center space-x-4 text-sm text-gray-500">
                    <span>创建时间：{{ plan.createdAt }}</span>
                    <span>最后修改：{{ plan.updatedAt }}</span>
                    <span>作者：{{ plan.author }}</span>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
                    {{ plan.status }}
                  </span>
                </div>
              </div>
            </div>
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

const router = useRouter()

// 历史方案数据
const historyPlans = ref([
  {
    id: 1,
    title: 'AI-Edited Images and Videos Impact on Human Memory',
    description: '研究AI编辑的图像与视频如何影响人类记忆形成和回忆的准确性，探讨AI技术对认知过程的影响。',
    createdAt: '2024-02-20',
    updatedAt: '2024-02-22',
    author: 'Qi Liu',
    status: '进行中'
  },
  {
    id: 2,
    title: 'The Effect of AI-Generated Content on Learning Outcomes',
    description: '探究AI生成的教育内容对学习效果的影响，包括知识理解、记忆保持和技能迁移等方面。',
    createdAt: '2024-02-15',
    updatedAt: '2024-02-18',
    author: 'Qi Liu',
    status: '已完成'
  },
  {
    id: 3,
    title: 'Comparing Human and AI-Generated Research Methodologies',
    description: '比较人类专家和AI系统在研究方法设计上的差异，评估AI辅助研究设计的可行性和效果。',
    createdAt: '2024-02-10',
    updatedAt: '2024-02-12',
    author: 'Qi Liu',
    status: '已完成'
  }
])
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
</style> 