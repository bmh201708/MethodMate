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
            <button
              @click="router.push('/history-plans')"
              class="px-4 py-2 bg-white text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
            >
              历史方案
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="flex-1 max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-12 gap-8">
        <!-- 左侧聊天框 -->
        <div class="col-span-4 h-[calc(100vh-8rem)]">
          <ChatBox ref="chatBoxRef" pageContext="research-plan" />
          
          <!-- 生成研究方案按钮 -->
          <div class="mt-4">
            <button
              @click="generateResearchPlan"
              :disabled="isGenerating"
              class="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <svg v-if="isGenerating" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
              </svg>
              <span>{{ isGenerating ? '生成中...' : '生成定量研究方案' }}</span>
            </button>
            
            <!-- 参考文献状态显示 -->
            <div class="mt-3 text-sm text-center">
              <!-- 生成状态提示 -->
              <div v-if="isGenerating" class="text-blue-600 mb-2">
                <svg class="w-4 h-4 inline mr-1 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                正在等待智能体回复，请稍候...
              </div>
              
              <div v-if="papersState.referencedPapers.size > 0" class="text-purple-600">
                <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                已选择 {{ papersState.referencedPapers.size }} 篇参考文献
              </div>
              <div v-else class="text-gray-500">
                <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                暂无参考文献（可在相关文献页面选择）
              </div>
            </div>
          </div>
        </div>

        <!-- 研究方案详情 -->
        <div class="col-span-8">
          <!-- 
            右侧显示的是当前方案：
            - 如果用户生成了AI方案，显示AI生成的内容
            - 如果用户正在查看历史方案，显示历史方案的内容
            - 如果没有生成方案，显示默认的示例内容
            - 用户在左侧聊天框发送消息时，当前方案会作为上下文发送给AI（但不显示在对话框中）
          -->
          <!-- 历史方案查看提示 -->
          <div v-if="isViewingHistoryPlan && historyState.currentViewingPlan" 
               class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <div>
                  <h4 class="text-sm font-medium text-blue-900">正在查看历史方案</h4>
                  <p class="text-sm text-blue-700">{{ historyState.currentViewingPlan.title }}</p>
                  <p class="text-xs text-blue-600">创建时间：{{ historyState.currentViewingPlan.createdAt }}</p>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <button 
                  @click="applyHistoryPlan"
                  class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                >
                  应用此方案
                </button>
                <button 
                  @click="exitHistoryView"
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  返回当前方案
                </button>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm p-8">
            <div class="space-y-8">
              <!-- 实验方案部分 -->
              <div class="bg-white rounded-xl shadow-sm p-8">
                <!-- 方案导航按钮 -->
                <div class="flex space-x-4 mb-8">
                  <button
                    v-for="section in sections"
                    :key="section.id"
                    @click="activeSection = section.id"
                    class="px-4 py-2 rounded-lg font-medium transition-colors"
                    :class="[
                      activeSection === section.id
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    ]"
                  >
                    {{ section.name }}
                  </button>
                </div>

                <!-- 各部分内容 -->
                <div v-if="activeSection === 'full'">
                  <h2 class="text-2xl font-bold text-gray-900 mb-6">{{ hasGeneratedPlan ? currentPlanState.title : '定量研究方案' }}</h2>
                  <div class="space-y-6">
                    <!-- 如果有解析的plan数据，显示四个字段的内容 -->
                    <div v-if="hasGeneratedPlan">
                      <div v-if="currentPlanState.hypotheses && currentPlanState.hypotheses.length > 0">
                        <h3 class="text-lg font-semibold text-gray-900 mb-3">研究假设</h3>
                        <div class="space-y-2">
                          <div v-for="(hypothesis, index) in renderedHypotheses" :key="index" 
                               class="p-4 bg-gray-50 rounded-lg">
                            <div class="text-gray-900 prose prose-sm max-w-none" v-html="hypothesis"></div>
                          </div>
                        </div>
                      </div>
                      
                      <div v-if="currentPlanState.experimentalDesign">
                        <h3 class="text-lg font-semibold text-gray-900 mb-3">实验设计</h3>
                        <div class="text-gray-600 leading-relaxed prose prose-sm max-w-none" v-html="renderedExperimentalDesign"></div>
                      </div>
                      
                      <div v-if="currentPlanState.analysisMethod">
                        <h3 class="text-lg font-semibold text-gray-900 mb-3">数据分析</h3>
                        <div class="text-gray-600 leading-relaxed prose prose-sm max-w-none" v-html="renderedAnalysisMethod"></div>
                      </div>
                      
                      <div v-if="currentPlanState.expectedResults">
                        <h3 class="text-lg font-semibold text-gray-900 mb-3">结果呈现</h3>
                        <div class="text-gray-600 leading-relaxed prose prose-sm max-w-none" v-html="renderedExpectedResults"></div>
                      </div>
                    </div>
                    
                    <!-- 未生成方案时的提示 -->
                    <div v-else class="text-center py-16">
                      <div class="mb-6">
                        <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                      </div>
                      <h3 class="text-lg font-medium text-gray-900 mb-2">还未生成实验方案，请先生成研究方案</h3>
                      <p class="text-gray-500 mb-6 max-w-md mx-auto">
                        您可以点击左侧的"生成定量研究方案"按钮，或在聊天框中输入相关需求来生成个性化的研究方案。
                      </p>
                      <div class="flex justify-center space-x-4 text-sm text-gray-400">
                        <div class="flex items-center">
                          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                          </svg>
                          智能生成
                        </div>
                        <div class="flex items-center">
                          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                          </svg>
                          基于文献
                        </div>
                        <div class="flex items-center">
                          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                          </svg>
                          结构化输出
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="activeSection === 'hypothesis'">
                  <h2 class="text-2xl font-bold text-gray-900 mb-6">研究假设</h2>
                  <div v-if="hasGeneratedPlan && currentPlanState.hypotheses && currentPlanState.hypotheses.length > 0" class="space-y-4">
                    <div v-for="(hypothesis, index) in renderedHypotheses" :key="index" 
                         class="p-4 bg-gray-50 rounded-lg">
                      <div class="text-gray-900 prose prose-sm max-w-none" v-html="hypothesis"></div>
                    </div>
                  </div>
                  <div v-else class="text-center py-12">
                    <div class="mb-4">
                      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                      </svg>
                    </div>
                    <p class="text-gray-500">还未生成实验方案，请先生成研究方案</p>
                  </div>
                </div>
                <div v-if="activeSection === 'design'">
                  <h2 class="text-2xl font-bold text-gray-900 mb-6">实验设计</h2>
                  <div v-if="hasGeneratedPlan && currentPlanState.experimentalDesign" class="space-y-6">
                    <div>
                      <div class="text-gray-600 leading-relaxed prose prose-sm max-w-none" v-html="renderedExperimentalDesign"></div>
                    </div>
                  </div>
                  <div v-else class="text-center py-12">
                    <div class="mb-4">
                      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                      </svg>
                    </div>
                    <p class="text-gray-500">还未生成实验方案，请先生成研究方案</p>
                  </div>
                </div>
                <div v-if="activeSection === 'analysis'">
                  <h2 class="text-2xl font-bold text-gray-900 mb-6">数据分析</h2>
                  <div v-if="hasGeneratedPlan && currentPlanState.analysisMethod" class="space-y-6">
                    <div>
                      <div class="text-gray-600 leading-relaxed prose prose-sm max-w-none" v-html="renderedAnalysisMethod"></div>
                    </div>
                  </div>
                  <div v-else class="text-center py-12">
                    <div class="mb-4">
                      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                      </svg>
                    </div>
                    <p class="text-gray-500">还未生成实验方案，请先生成研究方案</p>
                  </div>
                </div>
                <div v-if="activeSection === 'results'">
                  <h2 class="text-2xl font-bold text-gray-900 mb-6">结果呈现</h2>
                  <div v-if="hasGeneratedPlan && currentPlanState.expectedResults" class="space-y-6">
                    <div>
                      <div class="text-gray-600 leading-relaxed prose prose-sm max-w-none" v-html="renderedExpectedResults"></div>
                    </div>
                  </div>
                  <div v-else class="text-center py-12">
                    <div class="mb-4">
                      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/>
                      </svg>
                    </div>
                    <p class="text-gray-500">还未生成实验方案，请先生成研究方案</p>
                  </div>
                </div>
              </div>

              <!-- 来源和方法介绍卡片 -->
              <div class="bg-white rounded-xl shadow-sm p-8">
                <!-- 来源和方法导航按钮 -->
                <div class="flex space-x-4 mb-8 border-b">
                  <button
                    v-for="tab in introTabs"
                    :key="tab.id"
                    @click="activeIntroTab = tab.id"
                    class="px-4 py-2 font-medium transition-colors relative"
                    :class="[
                      activeIntroTab === tab.id
                        ? 'text-purple-600 border-b-2 border-purple-600'
                        : 'text-gray-600 hover:text-gray-900'
                    ]"
                  >
                    {{ tab.name }}
                  </button>
                </div>

                <!-- 来源介绍内容 -->
                <div v-if="activeIntroTab === 'source'" class="space-y-4">
                  <p class="text-gray-600 leading-relaxed">
                    {{ currentPlanState[activeSection].sourceIntro }}
                  </p>
                </div>

                <!-- 方法介绍内容 -->
                <div v-if="activeIntroTab === 'method'" class="space-y-4">
                  <p class="text-gray-600 leading-relaxed">
                    {{ currentPlanState[activeSection].methodIntro }}
                  </p>
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
import { ref, watch, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ChatBox from '../components/ChatBox.vue'
import { sendMessage, chatState } from '../stores/chatStore'
import { papersState, addHistoryPlan, historyState, clearCurrentViewingPlan, currentPlanState, updateCurrentPlan, applyPlanAsCurrentPlan } from '../stores/chatStore'
import { marked } from 'marked'

const router = useRouter()
const currentSection = ref('research-plan')
const activeSection = ref('full')
const activeIntroTab = ref('source')
const chatBoxRef = ref(null)
const isGenerating = ref(false)
const lastMessageIdBeforeGenerate = ref(null) // 记录开始生成前的最后一条消息ID
const isViewingHistoryPlan = ref(false) // 是否正在查看历史方案
const originalPlan = ref(null) // 保存原始方案数据
const lastProcessedMessageId = ref(null) // 记录最后处理的消息ID，防止重复解析

const sections = [
  { id: 'full', name: '完整方案' },
  { id: 'hypothesis', name: '研究假设' },
  { id: 'design', name: '实验设计' },
  { id: 'analysis', name: '数据分析' },
  { id: 'results', name: '结果呈现' }
]

const introTabs = [
  { id: 'source', name: '来源介绍' },
  { id: 'method', name: '方法介绍' }
]

// 检测是否有AI生成的研究方案数据
const hasGeneratedPlan = computed(() => {
  // 如果正在查看历史方案，直接返回true
  if (isViewingHistoryPlan.value) {
    return true
  }
  
  // 使用全局状态的isGenerated标记
  return currentPlanState.isGenerated
})

// 配置marked选项
marked.setOptions({
  breaks: true, // 支持换行
  gfm: true,    // 支持GitHub flavored markdown
  headerIds: false, // 禁用header id生成
  mangle: false, // 禁用邮箱混淆
  pedantic: false, // 使用更宽松的markdown解析
  sanitize: false // 允许HTML（在受控环境中使用）
})

// 安全的markdown渲染函数
const safeMarkdownRender = (text) => {
  try {
    return marked(text || '')
  } catch (error) {
    console.error('Markdown渲染错误:', error)
    return text || '' // 如果渲染失败，返回原始文本
  }
}

// Markdown渲染计算属性
const renderedHypotheses = computed(() => {
  if (!currentPlanState.hypotheses || currentPlanState.hypotheses.length === 0) {
    return []
  }
  return currentPlanState.hypotheses.map(hypothesis => safeMarkdownRender(hypothesis))
})

const renderedExperimentalDesign = computed(() => {
  return currentPlanState.experimentalDesign ? safeMarkdownRender(currentPlanState.experimentalDesign) : ''
})

const renderedAnalysisMethod = computed(() => {
  return currentPlanState.analysisMethod ? safeMarkdownRender(currentPlanState.analysisMethod) : ''
})

const renderedExpectedResults = computed(() => {
  return currentPlanState.expectedResults ? safeMarkdownRender(currentPlanState.expectedResults) : ''
})

// 监听聊天消息，解析研究方案
watch(() => chatState.messages, (newMessages) => {
  // 获取最新的助手消息
  const latestAssistantMessage = newMessages
    .filter(msg => msg.type === 'assistant' && msg.isComplete && !msg.isError)
    .pop()
  
  if (latestAssistantMessage) {
    // 防止重复处理同一条消息
    if (lastProcessedMessageId.value === latestAssistantMessage.id) {
      console.log('跳过重复处理的消息，ID:', latestAssistantMessage.id)
      return
    }
    
    const content = latestAssistantMessage.content
    
    // 检查是否包含研究方案Markdown格式
    const hasResearchPlanMarkdown = content.includes('研究假设') || 
                                   content.includes('实验设计') || 
                                   content.includes('数据分析') ||
                                   content.includes('结果呈现') ||
                                   (content.includes('#') && (content.includes('假设') || content.includes('设计') || content.includes('分析')))
    
    // 如果正在生成状态，按原有逻辑处理
    if (isGenerating.value) {
      // 检查消息ID，只处理在生成开始之后的新消息
      if (lastMessageIdBeforeGenerate.value && latestAssistantMessage.id <= lastMessageIdBeforeGenerate.value) {
        console.log('跳过生成开始前的旧消息，消息ID:', latestAssistantMessage.id, '生成前最后消息ID:', lastMessageIdBeforeGenerate.value)
        return
      }
      
      console.log('收到新的助手消息（生成状态），尝试解析:', content.substring(0, 200))
      console.log('消息ID:', latestAssistantMessage.id, '生成前最后消息ID:', lastMessageIdBeforeGenerate.value)
      
      const wasSuccessfullyParsed = parseResearchPlanResponse(content)
      
      // 如果成功解析了方案，标记消息为已处理
      if (wasSuccessfullyParsed) {
        lastProcessedMessageId.value = latestAssistantMessage.id
        console.log('成功解析方案，标记消息为已处理，ID:', latestAssistantMessage.id)
        isGenerating.value = false // 成功解析后立即停止生成状态
      }
      
      // 检查消息是否包含研究方案相关内容
      const hasResearchContent = hasResearchPlanMarkdown || 
                                (content.includes('研究') || content.includes('方案') || content.includes('实验'))
      
      // 如果是问候语或者非研究方案消息，继续等待
      if (!hasResearchContent && (content.includes('你好') || content.includes('助手') || content.length < 100)) {
        console.log('收到问候语，继续等待研究方案消息...')
        // 设置一个较长的超时，如果30秒内没有收到方案消息则重置状态
        setTimeout(() => {
          if (isGenerating.value) {
            console.log('等待研究方案消息超时，重置生成状态')
            isGenerating.value = false
          }
        }, 30000)
        return
      }
      
      // 如果包含研究方案内容但解析失败，也要重置生成状态（避免卡住）
      if (hasResearchContent && !wasSuccessfullyParsed) {
        console.log('包含研究内容但解析失败，重置生成状态')
        isGenerating.value = false
      }
    }
    // 如果不是生成状态，但检测到研究方案Markdown格式，也要解析
    else if (hasResearchPlanMarkdown) {
      console.log('检测到普通聊天中的研究方案回复，尝试解析:', content.substring(0, 200))
      
      // 检查是否为新消息，避免重复解析
      const messageId = latestAssistantMessage.id
      
      if (lastProcessedMessageId.value && messageId <= lastProcessedMessageId.value) {
        console.log('跳过已解析的消息，ID:', messageId)
        return
      }
      
      const wasSuccessfullyParsed = parseResearchPlanResponse(content)
      
      if (wasSuccessfullyParsed) {
        // 记录已解析的消息ID
        lastProcessedMessageId.value = messageId
        console.log('成功解析普通聊天中的研究方案，消息ID:', messageId)
      }
    }
  }
}, { deep: true })

// 解析智能体返回的研究方案Markdown
const parseResearchPlanResponse = (content) => {
  try {
    console.log('解析智能体回复，长度:', content.length, '前500字符:', content.substring(0, 500))
    
    // 预检查：跳过普通问候语和不包含研究方案的消息
    if (!content || typeof content !== 'string') {
      console.log('消息内容为空或非字符串，跳过解析')
      return false
    }
    
    // 检查是否包含研究方案相关的关键词（更宽泛的匹配）
    const hasPlanKeyword = content.includes('研究假设') || 
                          content.includes('实验设计') || 
                          content.includes('数据分析') ||
                          content.includes('结果呈现') ||
                          content.includes('#研究假设') ||
                          content.includes('#实验设计') ||
                          content.includes('#数据分析') ||
                          content.includes('#结果呈现') ||
                          (content.includes('# 研究假设')) ||
                          (content.includes('# 实验设计')) ||
                          (content.includes('# 数据分析')) ||
                          (content.includes('# 结果呈现')) ||
                          (content.includes('假设') && content.includes('实验')) ||
                          (content.includes('设计') && content.includes('方案')) ||
                          (content.includes('分析') && content.includes('方法'))
    
    // 如果是简单的问候语或不包含研究方案相关内容，跳过解析
    if (!hasPlanKeyword && (
      content.includes('你好') || 
      content.includes('助手') || 
      content.includes('帮助') ||
      content.length < 50  // 太短的消息通常是问候语
    )) {
      console.log('检测到问候语或无关消息，跳过解析:', content.substring(0, 100))
      return false
    }
    
    // 使用更简单且准确的解析方法
    const extractAllSections = () => {
      console.log('开始提取所有部分内容...')
      
      // 先找到所有的部分标题位置
      const sectionTitles = ['研究假设', '实验设计', '数据分析', '结果呈现']
      const sectionPositions = []
      
             sectionTitles.forEach(title => {
         // 查找各种可能的格式
         const patterns = [
           `#\\s*${title}\\s*[：:：]?\\s*$`, // # 研究假设：或 # 研究假设（行结尾）
           `#\\s*${title}\\s*[：:：]?\\s*\\n`, // # 研究假设：换行 或 # 研究假设换行
           `${title}\\s*[：:：]\\s*$`, // 研究假设：（行结尾）
           `${title}\\s*[：:：]\\s*\\n` // 研究假设：换行
         ]
         
         for (const pattern of patterns) {
           const regex = new RegExp(pattern, 'gim') // 添加m标志支持多行
           let match
           while ((match = regex.exec(content)) !== null) {
             sectionPositions.push({
               title: title,
               start: match.index,
               end: match.index + match[0].length,
               fullMatch: match[0]
             })
             console.log(`找到${title}在位置${match.index}，匹配内容: "${match[0]}"`)
             break // 只取第一个匹配
           }
         }
       })
      
      // 按位置排序
      sectionPositions.sort((a, b) => a.start - b.start)
      console.log('找到的部分位置:', sectionPositions.map(p => ({ title: p.title, start: p.start })))
      
      // 提取每个部分的内容
      const extractedSections = {}
      
      for (let i = 0; i < sectionPositions.length; i++) {
        const currentSection = sectionPositions[i]
        const nextSection = sectionPositions[i + 1]
        
        // 确定内容的起始和结束位置
        const contentStart = currentSection.end
        const contentEnd = nextSection ? nextSection.start : content.length
        
        // 提取内容
        let sectionContent = content.substring(contentStart, contentEnd).trim()
        
        // 清理内容
        sectionContent = sectionContent
          .replace(/^[：:：;\s]+/, '') // 移除开头的冒号和分号
          .replace(/[；;]+\s*$/, '') // 移除结尾的分号
          .trim()
        
        // 移除可能的markdown标记开头
        sectionContent = sectionContent.replace(/^#+\s*/, '').trim()
        
        if (sectionContent) {
          extractedSections[currentSection.title] = sectionContent
          console.log(`提取${currentSection.title}成功:`, sectionContent.substring(0, 100) + '...')
        }
      }
      
      return extractedSections
    }
    
    // 提取所有部分
    const extractedSections = extractAllSections()
    
    // 获取各个部分的内容
    const hypothesis = extractedSections['研究假设'] || ''
    const design = extractedSections['实验设计'] || ''
    const analysis = extractedSections['数据分析'] || ''
    const results = extractedSections['结果呈现'] || ''
    
    console.log('提取结果汇总:')
    console.log('- 研究假设:', hypothesis ? '✓ 已提取' : '✗ 未提取', hypothesis ? `(${hypothesis.length}字符)` : '')
    console.log('- 实验设计:', design ? '✓ 已提取' : '✗ 未提取', design ? `(${design.length}字符)` : '')
    console.log('- 数据分析:', analysis ? '✓ 已提取' : '✗ 未提取', analysis ? `(${analysis.length}字符)` : '')
    console.log('- 结果呈现:', results ? '✓ 已提取' : '✗ 未提取', results ? `(${results.length}字符)` : '')
    
    // 检查是否提取到至少一个有效内容
    const hasValidContent = hypothesis || design || analysis || results
    if (!hasValidContent) {
      console.log('未提取到任何有效的研究方案内容，原始内容前500字符：', content.substring(0, 500))
      // 输出更详细的调试信息
      console.log('尝试查找的关键词：')
      console.log('- 是否包含"研究假设":', content.includes('研究假设'))
      console.log('- 是否包含"实验设计":', content.includes('实验设计'))
      console.log('- 是否包含"数据分析":', content.includes('数据分析'))
      console.log('- 是否包含"结果呈现":', content.includes('结果呈现'))
      return false
    }
    
    // 先保存当前状态，然后清空字段
    const wasGenerated = currentPlanState.isGenerated
    
    // 清空字段并重置状态
    currentPlanState.hypotheses = []
    currentPlanState.experimentalDesign = ''
    currentPlanState.analysisMethod = ''
    currentPlanState.expectedResults = ''
    
    console.log('已清空旧数据，开始更新新方案...')
    
    // 计数实际更新的字段
    let updatedFields = 0
    
    // 更新研究假设（支持多个假设）
    if (hypothesis) {
      // 如果包含多个假设（用数字序号分隔），则分割成数组
      const hypothesesArray = hypothesis.split(/\n\d+\.|\n[•·]\s*/).filter(h => h.trim())
      if (hypothesesArray.length > 1) {
        currentPlanState.hypotheses = hypothesesArray.map(h => h.trim())
      } else {
        currentPlanState.hypotheses = [hypothesis]
      }
      console.log('更新研究假设:', currentPlanState.hypotheses)
      updatedFields++
    }
    
    // 更新实验设计
    if (design) {
      currentPlanState.experimentalDesign = design
      console.log('更新实验设计:', design.substring(0, 100) + '...')
      updatedFields++
    }
    
    // 更新数据分析
    if (analysis) {
      currentPlanState.analysisMethod = analysis
      console.log('更新数据分析:', analysis.substring(0, 100) + '...')
      updatedFields++
    }
    
    // 更新结果呈现
    if (results) {
      currentPlanState.expectedResults = results
      console.log('更新结果呈现:', results.substring(0, 100) + '...')
      updatedFields++
    }
    
    // 更新基本信息
    const timestamp = new Date().toLocaleString('zh-CN')
    currentPlanState.title = `基于AI智能体生成的定量研究方案`
    currentPlanState.researchQuestions = 'AI生成的研究方案'
    currentPlanState.methodology = `基于参考文献生成的研究方法 (生成时间: ${timestamp})`
    currentPlanState.dataCollection = '根据研究设计制定的数据收集方案'
    
    // 如果至少更新了一个字段，就认为成功
    if (updatedFields >= 1) {
      // 设置为已生成状态
      currentPlanState.isGenerated = true
      currentPlanState.lastUpdated = new Date().toISOString()
      
      console.log(`成功更新 ${updatedFields} 个字段`)
      console.group('最终解析结果')
      console.log('研究假设:', currentPlanState.hypotheses)
      console.log('实验设计:', currentPlanState.experimentalDesign ? '已更新' : '未更新') 
      console.log('数据分析:', currentPlanState.analysisMethod ? '已更新' : '未更新')
      console.log('结果呈现:', currentPlanState.expectedResults ? '已更新' : '未更新')
      console.log('isGenerated:', currentPlanState.isGenerated)
      console.groupEnd()
      
      // 强制更新响应式状态
      const forceUpdate = {
        ...currentPlanState,
        _timestamp: Date.now() // 添加时间戳强制更新
      }
      Object.assign(currentPlanState, forceUpdate)
      
      // 自动切换到完整方案视图
      activeSection.value = 'full'
      
      // 显示成功提示
      console.log('成功解析并更新研究方案')
      
      // 使用Vue的nextTick确保DOM更新完成后再显示提示
      setTimeout(() => {
        if (updatedFields >= 3) {
          alert('研究方案生成成功！已包含研究假设、实验设计、数据分析和结果呈现四个完整部分。PDF文件可在聊天框中下载。')
        } else if (updatedFields >= 2) {
          alert(`研究方案生成成功！已包含 ${updatedFields} 个部分，请查看各个板块的内容。PDF文件可在聊天框中下载。`)
        } else {
          alert('研究方案已生成，请查看右侧内容。PDF文件可在聊天框中下载。')
        }
      }, 500)
      
      // 记录历史方案
      if (updatedFields >= 1) {
        console.log('准备添加到历史方案')
        addHistoryPlan(currentPlanState)
      }
      
      return true // 成功解析并更新了研究方案
    } else {
      console.log('未更新任何字段，解析失败')
      return false
    }
  } catch (error) {
    console.error('解析研究方案时出现意外错误:', error)
    console.log('原始内容:', content)
    return false
  }
}

// 生成定量研究方案
const generateResearchPlan = async () => {
  // 记录当前最新的消息ID
  const latestMessage = chatState.messages
    .filter(msg => msg.isComplete)
    .pop()
  lastMessageIdBeforeGenerate.value = latestMessage ? latestMessage.id : 0
  
  // 清除之前的解析记录，确保新生成的方案能被解析
  lastProcessedMessageId.value = null
  
  isGenerating.value = true
  
  console.log('开始生成新方案，当前最新消息ID:', lastMessageIdBeforeGenerate.value)
  
  try {
    // 构建消息内容
    let message = "请帮我生成定量实验方案。"
    
    // 获取参考文献信息
    const referencedPapers = Array.from(papersState.referencedPapers).map(paperId => {
      return papersState.recommendedPapers.find(paper => paper.id === paperId)
    }).filter(paper => paper) // 过滤掉可能找不到的文献
    
    if (referencedPapers.length > 0) {
      message += "\n\n请参考以下文献进行生成：\n"
      referencedPapers.forEach((paper, index) => {
        message += `\n${index + 1}. 标题：${paper.title}`
        if (paper.downloadUrl) {
          message += `\n   链接：${paper.downloadUrl}`
        }
        message += "\n"
      })
      
      message += `\n请先通过以上下载链接仔细阅读这${referencedPapers.length}篇参考文献的完整内容，然后基于文献内容生成一个详细的定量研究方案。`
    } else {
      message += "\n\n请生成一个详细的定量研究方案。"
    }

    message += `

请严格按照以下格式返回：
#研究假设：<此处填写具体研究假设内容>；
#实验设计：<此处填写实验设计详细方案>；
#数据分析：<此处描述数据分析方法>；
#结果呈现：<此处说明结果展示形式>；

要求：
1. 如果有参考文献，请先仔细阅读链接中的完整文献内容
2. 基于文献内容生成科学严谨的研究方案
3. 必须严格按照上述格式返回,使用Markdown格式
4. plan字段中的每个部分都要详细具体`
    
    console.log('准备发送的消息:', message)
    console.log('参考文献数量:', referencedPapers.length)
    
    // 发送消息到chatbox
    await sendMessage(message)
    
  } catch (error) {
    console.error('生成研究方案失败:', error)
  } finally {
    isGenerating.value = false
  }
}

// 页面加载时检查是否有历史方案要显示
onMounted(() => {
  if (historyState.currentViewingPlan) {
    // 延迟一点再加载，确保当前方案数据已经初始化完成
    setTimeout(() => {
      loadHistoryPlan(historyState.currentViewingPlan)
    }, 100)
  }
})

// 加载历史方案数据
const loadHistoryPlan = (historyPlan) => {
  // 保存当前方案数据（只在第一次查看历史方案时保存）
  if (!originalPlan.value && !isViewingHistoryPlan.value) {
    // 检查当前是否有生成的方案，如果有则保存，否则保存默认状态
    const currentHasGenerated = currentPlanState.isGenerated
    
    originalPlan.value = { 
      ...currentPlanState,
      _hasGeneratedPlan: currentHasGenerated // 标记原始状态是否有生成的方案
    }
    console.log('保存原始方案数据，有生成内容:', currentHasGenerated)
  }
  
  isViewingHistoryPlan.value = true
  const fullPlan = historyPlan.fullPlan
  
  // 加载历史方案数据到当前plan
  Object.assign(currentPlanState, fullPlan)
  
  console.log('加载历史方案:', historyPlan.title)
}

// 退出历史方案查看
const exitHistoryView = () => {
  isViewingHistoryPlan.value = false
  clearCurrentViewingPlan()
  
  // 恢复原始方案数据
  if (originalPlan.value) {
    const { _hasGeneratedPlan, ...originalData } = originalPlan.value
    Object.assign(currentPlanState, originalData)
    originalPlan.value = null
    console.log('恢复原始方案数据，原本有生成内容:', _hasGeneratedPlan)
  }
}

// 应用当前历史方案为当前方案
const applyHistoryPlan = () => {
  if (historyState.currentViewingPlan) {
    // 将当前历史方案数据保存为新的当前方案
    const currentPlan = { ...currentPlanState }
    const planId = historyState.currentViewingPlan.id
    
    // 退出历史查看模式
    isViewingHistoryPlan.value = false
    clearCurrentViewingPlan()
    
    // 清空原始数据记录，因为现在这就是新的当前方案
    originalPlan.value = null
    
    // 使用全局方法应用方案，传递方案ID
    applyPlanAsCurrentPlan(currentPlan, planId)
    
    // 不再添加到历史记录，因为这个方案已经在历史记录中了
    
    console.log('应用历史方案为当前方案，方案ID:', planId)
    alert('历史方案已应用为当前方案！')
  }
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

/* Markdown样式增强 */
.prose {
  color: inherit !important;
}

.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
  color: inherit !important;
  margin-top: 1rem !important;
  margin-bottom: 0.5rem !important;
}

.prose p {
  margin-top: 0.5rem !important;
  margin-bottom: 0.5rem !important;
  line-height: 1.6 !important;
}

.prose ul, .prose ol {
  margin-top: 0.5rem !important;
  margin-bottom: 0.5rem !important;
  padding-left: 1.5rem !important;
}

.prose li {
  margin-top: 0.25rem !important;
  margin-bottom: 0.25rem !important;
}

.prose strong {
  font-weight: 600 !important;
}

.prose em {
  font-style: italic !important;
}

.prose code {
  background-color: #f3f4f6 !important;
  padding: 0.125rem 0.25rem !important;
  border-radius: 0.25rem !important;
  font-size: 0.875em !important;
}

.prose blockquote {
  border-left: 4px solid #e5e7eb !important;
  padding-left: 1rem !important;
  margin: 1rem 0 !important;
  color: #6b7280 !important;
}
</style> 