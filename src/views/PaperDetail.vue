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
          <ChatBox ref="chatBoxRef" />
        </div>

        <!-- 中间文献列表 -->
        <div class="col-span-3">
          <!-- 获取相关文献按钮 -->
          <div class="mb-4">
            <button
              @click="getRecommendedPapers"
              :disabled="papersState.isLoadingRecommendations"
              class="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <svg v-if="papersState.isLoadingRecommendations" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ papersState.isLoadingRecommendations ? '获取中...' : (papersState.recommendedPapers.length > 0 ? '获取更多文献' : '获取相关文献') }}</span>
            </button>
          </div>

          <!-- AI推荐文献列表 -->
          <div class="space-y-3">
            <div v-if="papersState.recommendedPapers.length === 0 && !papersState.isLoadingRecommendations" 
                 class="text-center text-gray-500 py-8">
              <svg class="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <p>点击上方按钮获取AI推荐的相关文献</p>
            </div>

            <div v-for="(paper, index) in papersState.recommendedPapers" :key="paper.id || index" 
                 class="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
                 :class="{ 'border-2 border-purple-500': papersState.selectedPaper === paper }"
                 @click="selectRecommendedPaper(paper)">
              <div class="flex items-start">
                <div class="flex-1">
                  <div class="flex justify-between items-start mb-2">
                    <h2 class="text-base font-semibold line-clamp-2 flex-1 mr-3"
                        :class="[
                          isReferenced(paper) ? 'text-purple-600' : 'text-gray-900'
                        ]">
                      {{ paper.title }}
                    </h2>
                    <button 
                      @click.stop="removePaper(index)"
                      class="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                      title="删除此文献"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                  <div class="text-xs text-gray-500 mb-2">
                    <span class="px-2 py-1 bg-blue-100 text-blue-600 rounded-full">AI推荐</span>
                    <span class="ml-2 text-gray-400">第{{ paper.batchIndex || Math.floor(index / 3) + 1 }}次获取</span>
                  </div>
                  <p class="text-sm text-gray-600 mb-3 line-clamp-2">
                    {{ paper.abstract }}
                  </p>
                  <div class="mt-3 flex justify-between items-center">
                    <span class="text-xs text-gray-500">点击查看详情</span>
                    <div class="flex space-x-2">
                      <a 
                        v-if="paper.downloadUrl"
                        :href="paper.downloadUrl" 
                        target="_blank"
                        @click.stop
                        class="px-3 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600 transition-colors"
                        title="下载原文"
                      >
                        下载
                      </a>
                      <button 
                        @click.stop="toggleReference(paper)"
                        class="px-3 py-1 text-xs rounded transition-colors"
                        :class="[
                          isReferenced(paper)
                            ? 'bg-purple-600 text-white hover:bg-purple-700'
                            : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                        ]"
                      >
                        {{ isReferenced(paper) ? '已参考' : '参考此文' }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 操作按钮区域 -->
          <div v-if="papersState.recommendedPapers.length > 0" class="mt-4 space-y-2">
            <div class="flex justify-between items-center text-sm text-gray-500">
              <span>共 {{ papersState.recommendedPapers.length }} 篇文献</span>
              <button 
                @click="clearAllPapers"
                class="px-3 py-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
              >
                清空全部
              </button>
            </div>
            <div v-if="papersState.referencedPapers.size > 0" class="flex justify-between items-center text-sm">
              <span class="text-purple-600 font-medium">
                已选择 {{ papersState.referencedPapers.size }} 篇作为参考文献
              </span>
              <button 
                @click="clearReferences"
                class="px-3 py-1 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded transition-colors"
              >
                清空参考
              </button>
            </div>
          </div>

          <!-- 错误提示 -->
          <div v-if="papersState.recommendationError" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div class="flex">
              <svg class="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <p class="text-red-700">{{ papersState.recommendationError }}</p>
            </div>
          </div>
        </div>

        <!-- 右侧文献详情 -->
        <div class="col-span-6">
          <div class="bg-white rounded-xl shadow-sm p-8">
            <div v-if="papersState.selectedPaper">
              <div class="flex justify-between items-start mb-6">
                <h2 class="text-2xl font-bold text-gray-900 flex-1">{{ papersState.selectedPaper.title }}</h2>
                <div class="ml-4 flex items-center space-x-2">
                  <span v-if="isReferenced(papersState.selectedPaper)" 
                        class="px-3 py-1 bg-purple-100 text-purple-600 text-sm rounded-full">
                    已选为参考
                  </span>
                  <button 
                    @click="toggleReference(papersState.selectedPaper)"
                    class="px-4 py-2 text-sm rounded-lg transition-colors"
                    :class="[
                      isReferenced(papersState.selectedPaper)
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                    ]"
                  >
                    {{ isReferenced(papersState.selectedPaper) ? '取消参考' : '选为参考' }}
                  </button>
                </div>
              </div>
              
              <div class="mb-8">
                <h3 class="text-lg font-semibold text-gray-900 mb-3">摘要</h3>
                <p class="text-gray-600 leading-relaxed">{{ papersState.selectedPaper.abstract }}</p>
              </div>

              <div class="mb-6" v-if="papersState.selectedPaper.downloadUrl">
                <h3 class="text-lg font-semibold text-gray-900 mb-3">文献链接</h3>
                <a 
                  :href="papersState.selectedPaper.downloadUrl" 
                  target="_blank"
                  class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  下载原文
                </a>
              </div>

              <!-- 根据推荐文献的结构显示详情 -->
              <div class="space-y-6">
                <div class="bg-blue-50 p-6 rounded-lg">
                  <h3 class="text-lg font-semibold text-blue-900 mb-3 flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                    </svg>
                    AI推荐说明
                  </h3>
                  <p class="text-blue-700">
                    这篇文献是基于您的对话内容，由AI智能推荐的相关学术论文。建议您仔细阅读摘要，判断是否符合您的研究需求。
                  </p>
                </div>
                
                <div class="border-t pt-6">
                  <h3 class="text-lg font-semibold text-gray-900 mb-3">使用建议</h3>
                  <ul class="text-gray-600 space-y-2">
                    <li class="flex items-start">
                      <span class="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>仔细阅读摘要，了解研究的核心内容和方法</span>
                    </li>
                    <li class="flex items-start">
                      <span class="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>如果相关，点击"下载原文"获取完整论文</span>
                    </li>
                    <li class="flex items-start">
                      <span class="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>可以将重要观点和方法应用到您的研究中</span>
                    </li>
                    <li class="flex items-start">
                      <span class="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>注意文献的发表时间和引用情况</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div v-else class="text-center text-gray-500">
              <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <p class="text-lg">请先获取并选择一篇文献查看详情</p>
              <p class="text-sm mt-2">点击左侧的"获取相关文献"按钮开始</p>
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
import { chatState } from '../stores/chatStore'
import { 
  papersState, 
  addRecommendedPapers,
  selectPaper,
  toggleReference,
  isReferenced,
  removePaper,
  clearAllPapers,
  clearReferences,
  setLoadingRecommendations,
  setRecommendationError
} from '../stores/chatStore'

const router = useRouter()
const currentSection = ref('papers')
const chatBoxRef = ref(null)

// 使用全局状态，直接引用papersState而不解构，保持响应式
// const { 
//   recommendedPapers, 
//   selectedPaper, 
//   referencedPapers, 
//   isLoadingRecommendations, 
//   recommendationError 
// } = papersState

const selectRecommendedPaper = (paper) => {
  selectPaper(paper)
}

const getRecommendedPapers = async () => {
  setLoadingRecommendations(true)
  setRecommendationError('')

  try {
    // 获取聊天历史记录
    const chatHistory = chatState.messages.filter(msg => msg.isComplete && !msg.isError)
    
    console.log('当前聊天历史:', chatHistory)

    // 直接调用推荐API，不通过代理
    const { getRecommendedPapers: getRecommendedPapersAPI } = await import('../services/cozeApi')
    const result = await getRecommendedPapersAPI(chatHistory)
    
    if (!result.success) {
      throw new Error(result.error || '获取推荐失败')
    }

    // 处理推荐结果 - 使用全局状态管理
    if (result.papers && Array.isArray(result.papers)) {
      addRecommendedPapers(result.papers)
      
      console.log('获取到推荐文献:', result.papers)
      console.log('累加后的文献列表:', papersState.recommendedPapers)
      console.log('总文献数量:', papersState.recommendedPapers.length)
    } else {
      // 如果没有解析到papers，显示原始回复
      console.log('未能解析到papers，原始回复:', result.rawResponse)
      setRecommendationError('智能体回复格式异常，请稍后重试')
    }

  } catch (error) {
    console.error('获取推荐文献失败:', error)
    setRecommendationError(`获取推荐文献失败: ${error.message}`)
  } finally {
    setLoadingRecommendations(false)
  }
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

/* 文本截断样式 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 加载动画优化 */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style> 