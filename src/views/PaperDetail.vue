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
            <h1 class="text-2xl font-bold text-gray-900">MethodMate</h1>
            <div class="flex space-x-4">
              <button
                @click="router.push('/papers')"
                class="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium"
                :class="{ 'text-purple-600 border-b-2 border-purple-600': currentSection === 'papers' }"
              >
                相关文献
              </button>
              <button
                @click="router.push('/research-plan')"
                class="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium"
                :class="{ 'text-purple-600 border-b-2 border-purple-600': currentSection === 'research-plan' }"
              >
                定量研究方案
              </button>
            </div>
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
        <div class="col-span-3 h-[calc(100vh-8rem)]">
          <ChatBox />
        </div>

        <!-- 中间文献列表 -->
        <div class="col-span-3">
          <div class="space-y-3">
            <div v-for="paper in papers" :key="paper.id" 
                 class="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
                 :class="{ 'border-2 border-purple-500': selectedPaper?.id === paper.id }"
                 @click="selectPaper(paper)">
              <div class="flex items-start">
                <div class="flex-1">
                  <h2 class="text-base font-semibold mb-2 line-clamp-2"
                      :class="[
                        isPaperSelected(paper.id) ? 'text-purple-600' : 'text-gray-900'
                      ]">
                    {{ paper.title }}
                  </h2>
                  <div class="text-xs text-gray-500 mb-2">
                    <span>期刊信息xxxxxxxx</span>
                    <span class="mx-2">年份</span>
                  </div>
                  <div class="flex flex-wrap gap-2 text-xs text-gray-500">
                    <span>关键词1</span>
                    <span>关键词2</span>
                    <span>关键词3</span>
                    <span>关键词4</span>
                  </div>
                  <div class="mt-3 flex justify-between items-center">
                    <span class="text-xs text-gray-500">全文链接：xxxxxx</span>
                    <button 
                      @click="togglePaperSelection(paper.id, $event)"
                      class="px-3 py-1 rounded text-xs transition-colors"
                      :class="[
                        isPaperSelected(paper.id)
                          ? 'bg-red-50 text-red-600 hover:bg-red-100'
                          : 'text-purple-600 hover:text-purple-700'
                      ]"
                    >
                      {{ isPaperSelected(paper.id) ? '取消选中' : '参考此文' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧文献详情 -->
        <div class="col-span-6">
          <div class="bg-white rounded-xl shadow-sm p-8">
            <div v-if="selectedPaper">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">{{ selectedPaper.title }}</h2>
              
              <div class="mb-8">
                <h3 class="text-lg font-semibold text-gray-900 mb-3">摘要</h3>
                <p class="text-gray-600 leading-relaxed">{{ selectedPaper.abstract }}</p>
              </div>

              <div class="mb-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">AI规格定量研究</h3>
                <div class="space-y-6">
                  <div>
                    <h4 class="font-medium text-gray-900 mb-2">1. 实验目的的阐述</h4>
                    <p class="text-gray-600 leading-relaxed">{{ selectedPaper.purpose }}</p>
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900 mb-2">2. 被试情况</h4>
                    <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
                      <li>人数：{{ selectedPaper.participants }}</li>
                      <li>来源：{{ selectedPaper.source }}</li>
                      <li>性别比例：{{ selectedPaper.gender_ratio }}</li>
                      <li>年龄分布：{{ selectedPaper.age_distribution }}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900 mb-2">3. 实验材料与流程</h4>
                    <p class="text-gray-600 leading-relaxed">{{ selectedPaper.materials }}</p>
                  </div>
                </div>
              </div>

              <!-- 研究方案详情 -->
              <div class="space-y-6">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-3">研究问题</h3>
                  <p class="text-gray-600 leading-relaxed">{{ selectedPaper?.researchQuestions }}</p>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-3">研究方法</h3>
                  <p class="text-gray-600 leading-relaxed">{{ selectedPaper?.methodology }}</p>
                </div>
              </div>
            </div>
            <div v-else class="text-center text-gray-500">
              请选择一篇文献查看详情
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
const currentSection = ref('papers')
const selectedPaper = ref(null)
const selectedPapers = ref(new Set())

const papers = ref([
  {
    id: 1,
    title: 'Synthetic Human Memories: AI-Edited Images and Videos Can Implant False Memories and Distort Recollection',
    abstract: 'AI is increasingly used to enhance images and videos, both intentionally and unintentionally. As AI becomes more integrated into smartphones, users can modify or animate photos into realistic videos. This study examines the impact of AI-altered visuals on false memories...',
    researchQuestions: '探讨当前在探讨AI编辑的图像与视频是否会影响人类对过去事件的回忆，从而形成虚假记忆（false memory）。',
    methodology: '采用混合研究方法，结合实验研究和问卷调查。实验组和对照组将分别接触AI编辑和传统编辑的媒体内容。',
    purpose: '探讨当前在探讨AI编辑的图像与视频是否会影响人类对过去事件的回忆，从而形成虚假记忆（false memory）。',
    participants: '200人',
    source: '实验是在线上CloudResearch招募',
    gender_ratio: '男女1:1',
    age_distribution: '20至73岁，平均38岁（标准差12.25）',
    materials: '基础图像集：24张版权自由图片（包括新闻照、日常生活照、纪录片照）'
  },
  {
    id: 2,
    title: 'The Impact of AI-Generated Content on Human Memory Formation',
    abstract: 'This study investigates how exposure to AI-generated content affects memory formation and recall accuracy in human subjects...',
    researchQuestions: '研究AI生成内容对人类记忆形成的影响机制。',
    methodology: '使用最新的AI生成技术创建的图像和视频材料进行实验研究。',
    purpose: '研究AI生成内容对人类记忆形成的影响机制。',
    participants: '150人',
    source: '大学生志愿者',
    gender_ratio: '男女3:2',
    age_distribution: '18至25岁，平均21岁',
    materials: '使用最新的AI生成技术创建的图像和视频材料'
  }
])

const selectPaper = (paper) => {
  selectedPaper.value = paper
}

const togglePaperSelection = (paperId, event) => {
  event.stopPropagation()
  
  if (selectedPapers.value.has(paperId)) {
    selectedPapers.value.delete(paperId)
  } else {
    selectedPapers.value.add(paperId)
  }
}

const isPaperSelected = (paperId) => {
  return selectedPapers.value.has(paperId)
}
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

/* 添加按钮悬停效果 */
.hover-button {
  transition: all 0.2s ease-in-out;
}

.hover-button:hover {
  transform: translateY(-1px);
}
</style> 