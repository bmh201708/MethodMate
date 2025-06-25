<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <main class="flex-1 max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-12 gap-8">
        <!-- 左侧聊天框 -->
        <div class="col-span-5 h-[calc(100vh-8rem)]">
          <ChatBox ref="chatBoxRef" pageContext="research-plan" />
          
          <!-- 生成研究方案按钮 -->
          <div class="mt-4">
            <button
              @click="showResearchPlanDialog"
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
        <div class="col-span-7">
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
                  <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-900">{{ hasGeneratedPlan ? currentPlanState.title : '定量研究方案' }}</h2>
                    <!-- 简约的评估和迭代按钮 -->
                    <div v-if="hasGeneratedPlan" class="flex space-x-2">
                      <button
                        @click="evaluatePlan"
                        :disabled="isEvaluating"
                        class="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1.5"
                      >
                        <svg v-if="isEvaluating" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 818-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span>{{ isEvaluating ? '评估中...' : '整体评估' }}</span>
                      </button>
                      <button
                        @click="showIterateDialog('full')"
                        :disabled="isIterating"
                        class="px-3 py-1.5 text-sm bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1.5"
                      >
                        <svg v-if="isIterating" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 818-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                        </svg>
                        <span>{{ isIterating ? '迭代中...' : '方案迭代' }}</span>
                      </button>
                    </div>
                  </div>
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
                  <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-900">研究假设</h2>
                    <!-- 简约的部分评估按钮 -->
                    <div v-if="hasGeneratedPlan" class="flex space-x-2">
                      <button
                        @click="evaluateSectionPlan('hypothesis')"
                        :disabled="isEvaluatingSection && evaluatingSection === 'hypothesis'"
                        class="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1.5"
                      >
                        <svg v-if="isEvaluatingSection && evaluatingSection === 'hypothesis'" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 818-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span>{{ (isEvaluatingSection && evaluatingSection === 'hypothesis') ? '评估中...' : '部分评估' }}</span>
                      </button>
                      <button
                        @click="showIterateDialog('hypothesis')"
                        :disabled="isIterating"
                        class="px-3 py-1.5 text-sm bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1.5"
                      >
                        <svg v-if="isIterating" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 818-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                        </svg>
                        <span>{{ isIterating ? '迭代中...' : '方案迭代' }}</span>
                      </button>
                    </div>
                  </div>
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
                  <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-900">实验设计</h2>
                    <!-- 简约的部分评估按钮 -->
                    <div v-if="hasGeneratedPlan" class="flex space-x-2">
                      <button
                        @click="evaluateSectionPlan('design')"
                        :disabled="isEvaluatingSection && evaluatingSection === 'design'"
                        class="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1.5"
                      >
                        <svg v-if="isEvaluatingSection && evaluatingSection === 'design'" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 818-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span>{{ (isEvaluatingSection && evaluatingSection === 'design') ? '评估中...' : '部分评估' }}</span>
                      </button>
                      <button
                        @click="showIterateDialog('design')"
                        :disabled="isIterating"
                        class="px-3 py-1.5 text-sm bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1.5"
                      >
                        <svg v-if="isIterating" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 818-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                        </svg>
                        <span>{{ isIterating ? '迭代中...' : '方案迭代' }}</span>
                      </button>
                    </div>
                  </div>
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
                  <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-900">数据分析</h2>
                    <!-- 简约的部分评估按钮 -->
                    <div v-if="hasGeneratedPlan" class="flex space-x-2">
                      <button
                        @click="evaluateSectionPlan('analysis')"
                        :disabled="isEvaluatingSection && evaluatingSection === 'analysis'"
                        class="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1.5"
                      >
                        <svg v-if="isEvaluatingSection && evaluatingSection === 'analysis'" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 818-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span>{{ (isEvaluatingSection && evaluatingSection === 'analysis') ? '评估中...' : '部分评估' }}</span>
                      </button>
                      <button
                        @click="showIterateDialog('analysis')"
                        :disabled="isIterating"
                        class="px-3 py-1.5 text-sm bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1.5"
                      >
                        <svg v-if="isIterating" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 818-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                        </svg>
                        <span>{{ isIterating ? '迭代中...' : '方案迭代' }}</span>
                      </button>
                    </div>
                  </div>
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
                  <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-900">结果呈现</h2>
                    <!-- 简约的部分评估按钮 -->
                    <div v-if="hasGeneratedPlan" class="flex space-x-2">
                      <button
                        @click="evaluateSectionPlan('results')"
                        :disabled="isEvaluatingSection && evaluatingSection === 'results'"
                        class="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1.5"
                      >
                        <svg v-if="isEvaluatingSection && evaluatingSection === 'results'" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 818-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span>{{ (isEvaluatingSection && evaluatingSection === 'results') ? '评估中...' : '部分评估' }}</span>
                      </button>
                      <button
                        @click="showIterateDialog('results')"
                        :disabled="isIterating"
                        class="px-3 py-1.5 text-sm bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1.5"
                      >
                        <svg v-if="isIterating" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 818-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                        </svg>
                        <span>{{ isIterating ? '迭代中...' : '方案迭代' }}</span>
                      </button>
                    </div>
                  </div>
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
                <!-- 来源介绍内容（只显示研究假设、实验设计、结果呈现，数据分析通过子导航控制） -->
                <div v-if="['hypothesis', 'design', 'results'].includes(activeSection)" class="space-y-4">
                  <div class="flex items-center justify-between mb-3">
                    <h3 class="text-lg font-semibold text-gray-900">来源介绍</h3>
                    <button
                      @click="generateSourceIntroduction"
                      :disabled="isGeneratingSource"
                      class="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                    >
                      <svg v-if="isGeneratingSource" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                      </svg>
                      <span>{{ isGeneratingSource ? '生成中...' : '生成来源介绍' }}</span>
                    </button>
                  </div>
                  <div v-if="currentSourceIntroduction" class="text-gray-600 leading-relaxed prose prose-sm max-w-none" v-html="renderedSourceIntroduction"></div>
                  <div v-else class="text-gray-500 italic">
                    点击"生成来源介绍"按钮，基于参考文献生成当前部分的来源说明
                  </div>
                </div>

                <!-- 数据分析部分的子导航和内容 -->
                <div v-if="activeSection === 'analysis'" class="space-y-6">
                  <!-- 数据分析子导航 -->
                  <div class="flex space-x-4 border-b border-gray-200 pb-4">
                    <button
                      v-for="subSection in analysisSubSections"
                      :key="subSection.id"
                      @click="analysisSubSection = subSection.id"
                      class="px-4 py-2 rounded-lg font-medium transition-colors"
                      :class="[
                        analysisSubSection === subSection.id
                          ? 'bg-purple-100 text-purple-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      ]"
                    >
                      {{ subSection.name }}
                    </button>
                  </div>

                  <!-- 来源介绍内容 -->
                  <div v-if="analysisSubSection === 'source'" class="space-y-4">
                    <div class="flex items-center justify-between mb-3">
                      <h3 class="text-lg font-semibold text-gray-900">来源介绍</h3>
                      <button
                        @click="generateSourceIntroduction"
                        :disabled="isGeneratingSource"
                        class="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                      >
                        <svg v-if="isGeneratingSource" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                        </svg>
                        <span>{{ isGeneratingSource ? '生成中...' : '生成来源介绍' }}</span>
                      </button>
                    </div>
                    <div v-if="currentSourceIntroduction" class="text-gray-600 leading-relaxed prose prose-sm max-w-none" v-html="renderedSourceIntroduction"></div>
                    <div v-else class="text-gray-500 italic">
                      点击"生成来源介绍"按钮，基于参考文献生成当前部分的来源说明
                    </div>
                  </div>

                  <!-- 方法介绍内容 -->
                  <div v-if="analysisSubSection === 'method'" class="space-y-4">
                    <div class="flex items-center justify-between mb-3">
                      <h3 class="text-lg font-semibold text-gray-900">方法介绍</h3>
                      <button
                        @click="generateMethodIntroduction"
                        :disabled="isGeneratingMethod"
                        class="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                      >
                        <svg v-if="isGeneratingMethod" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                        </svg>
                        <span>{{ isGeneratingMethod ? '生成中...' : '生成方法介绍' }}</span>
                      </button>
                    </div>
                    
                    <!-- 显示生成的方法介绍或默认提示 -->
                    <div v-if="generatedMethodIntro" class="text-gray-600 leading-relaxed prose prose-sm max-w-none" v-html="renderedGeneratedMethodIntro"></div>
                    <div v-else class="text-gray-500 italic">
                      点击"生成方法介绍"按钮，基于研究方案的数据分析部分内容，智能生成详细的研究方法介绍和统计分析方法说明
                    </div>
                  </div>

                  <!-- 统计方法查询内容 -->
                  <div v-if="analysisSubSection === 'query'" class="space-y-6">
                    <div class="bg-gray-50 p-6 rounded-lg">
                      <h3 class="text-lg font-semibold text-gray-900 mb-4">统计方法查询</h3>
                      <div class="flex space-x-4">
                        <input
                          v-model="statisticalMethodQuery"
                          type="text"
                          placeholder="输入统计方法名称，如：t检验、方差分析、回归分析等"
                          class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          @keyup.enter="queryStatisticalMethod"
                        />
                        <button
                          @click="queryStatisticalMethod"
                          :disabled="isQuerying"
                          class="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                        >
                          <svg v-if="isQuerying" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>{{ isQuerying ? '查询中...' : '查询' }}</span>
                        </button>
                      </div>
                      
                      <!-- 测试按钮区域 -->
                      <div class="flex flex-wrap gap-2 mb-4">
                        <button
                          @click="() => { statisticalMethodQuery = '单样本t检验'; queryStatisticalMethod(); }"
                          class="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
                        >
                          测试：单样本t检验
                        </button>
                        <button
                          @click="testMarkdownRender"
                          class="px-3 py-1 text-sm bg-green-100 text-green-600 rounded hover:bg-green-200 transition-colors"
                        >
                          测试渲染器
                        </button>
                        <button
                          @click="() => { console.log('当前统计方法结果:', statisticalMethodResult); console.log('渲染结果:', renderedStatisticalMethodResult); }"
                          class="px-3 py-1 text-sm bg-yellow-100 text-yellow-600 rounded hover:bg-yellow-200 transition-colors"
                        >
                          调试信息
                        </button>
                      </div>
                      
                      <!-- 查询结果 -->
                      <div v-if="statisticalMethodResult" class="mt-4">
                        <div class="bg-white p-4 rounded-lg shadow-sm">
                          <div class="prose prose-sm max-w-none" v-html="renderedStatisticalMethodResult"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    
    <!-- 迭代建议对话框 -->
    <div v-if="showIterateDialogModal" 
         class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
         @click.self="closeIterateDialog">
      <div class="bg-white rounded-3xl shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden transform transition-all duration-300">
        <!-- 头部 -->
        <div class="px-8 py-6 border-b border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-xl font-semibold text-gray-900">{{ getIterateDialogTitle() }}</h3>
              <p class="text-gray-600 mt-2 text-sm">
                请输入您的迭代建议，AI将基于您的建议对{{ getSectionNameInChinese(iteratingSection) }}进行优化
              </p>
            </div>
            <button
              @click="closeIterateDialog"
              class="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-xl hover:bg-gray-100"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- 内容区域 -->
        <div class="px-8 py-6 max-h-[60vh] overflow-y-auto">
        
          <!-- 预设建议选项 -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-3">快速选择建议</label>
            <div class="grid grid-cols-2 gap-3">
              <button
                v-for="(suggestion, index) in getPresetSuggestions()"
                :key="index"
                @click="selectPresetSuggestion(suggestion)"
                :class="[
                  'text-left px-4 py-3 rounded-2xl transition-colors text-sm font-medium border',
                  selectedPresetSuggestion === suggestion
                    ? 'bg-purple-100 text-purple-700 border-purple-300 shadow-sm'
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 hover:text-gray-700'
                ]"
              >
                {{ suggestion }}
              </button>
            </div>
          </div>
        
                  <!-- 迭代建议输入框 -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-3">迭代建议</label>
            <textarea
              v-model="iterateSuggestion"
              rows="6"
              class="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all duration-200"
              placeholder="请输入您的迭代建议..."
            ></textarea>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="px-8 py-6 border-t border-gray-100 flex justify-end space-x-3">
          <button
            @click="closeIterateDialog"
            class="px-6 py-3 text-gray-700 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors font-medium"
          >
            取消
          </button>
          <button
            @click="confirmIterate"
            :disabled="!iterateSuggestion.trim() || isIterating"
            class="px-6 py-3 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center space-x-2"
          >
            <svg v-if="isIterating" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 818-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ isIterating ? '迭代中...' : '确认迭代' }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- 研究方案生成对话框 -->
  <div v-if="showResearchPlanDialogModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-3xl shadow-2xl max-w-lg w-full mx-4 transform transition-all duration-300">
      <!-- 对话框头部 -->
      <div class="px-8 py-6 border-b border-gray-100">
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-semibold text-gray-900">生成研究方案</h3>
          <button
            @click="closeResearchPlanDialog"
            class="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-xl hover:bg-gray-100"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- 对话框内容 -->
      <div class="px-8 py-6">
        <!-- 选项标签 -->
        <div class="flex bg-gray-100 rounded-2xl p-1 mb-6">
          <button
            @click="researchPlanMode = 'auto'"
            :class="[
              'flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200',
              researchPlanMode === 'auto'
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            ]"
          >
            <div class="flex items-center justify-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              <span>智能分析</span>
            </div>
          </button>
          <button
            @click="researchPlanMode = 'custom'"
            :class="[
              'flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200',
              researchPlanMode === 'custom'
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            ]"
          >
            <div class="flex items-center justify-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
              </svg>
              <span>自定义主题</span>
            </div>
          </button>
        </div>

        <!-- 智能分析模式说明 -->
        <div v-if="researchPlanMode === 'auto'" class="bg-purple-50 rounded-2xl p-6 mb-6">
          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0">
              <svg class="w-6 h-6 text-purple-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
            </div>
            <div>
              <h4 class="font-medium text-purple-900 mb-2">智能分析用户需求</h4>
              <p class="text-sm text-purple-700 leading-relaxed">
                系统将自动分析您在聊天历史中提到的研究需求、背景和目标，结合已选择的参考文献，生成个性化的定量研究方案。
              </p>
              <div class="mt-3 flex items-center space-x-4 text-xs text-purple-600">
                <div class="flex items-center space-x-1">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>分析对话历史</span>
                </div>
                <div class="flex items-center space-x-1">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>结合参考文献</span>
                </div>
                <div class="flex items-center space-x-1">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>智能生成方案</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 自定义主题模式 -->
        <div v-if="researchPlanMode === 'custom'">
          <label class="block text-sm font-medium text-gray-700 mb-3">请输入您的研究主题或问题</label>
          <textarea
            v-model="researchTopicInput"
            placeholder="例如：探讨人工智能对大学生学习效果的影响研究..."
            class="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all duration-200"
            rows="4"
          ></textarea>
          <p class="text-xs text-gray-500 mt-2">
            系统将基于您输入的主题，结合参考文献生成相应的定量研究方案
          </p>
        </div>

        <!-- 参考文献状态 -->
        <div class="bg-gray-50 rounded-2xl p-4 mb-6">
          <div class="flex items-center space-x-3">
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-700">参考文献状态</p>
              <p class="text-xs text-gray-500 mt-0.5">
                {{ papersState.referencedPapers.size > 0 
                  ? `已选择 ${papersState.referencedPapers.size} 篇参考文献` 
                  : '暂无参考文献（可在相关文献页面选择）' }}
              </p>
            </div>
            <div v-if="papersState.referencedPapers.size > 0" class="text-green-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- 对话框底部 -->
      <div class="px-8 py-6 border-t border-gray-100 flex justify-end space-x-3">
        <button
          @click="closeResearchPlanDialog"
          class="px-6 py-3 text-gray-700 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors font-medium"
        >
          取消
        </button>
        <button
          @click="confirmGenerateResearchPlan"
          :disabled="researchPlanMode === 'custom' && !researchTopicInput.trim()"
          class="px-6 py-3 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center space-x-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          <span>开始生成</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ChatBox from '../components/ChatBox.vue'
import { sendMessage, chatState } from '../stores/chatStore'
import { papersState, addHistoryPlan, historyState, clearCurrentViewingPlan, currentPlanState, updateCurrentPlan, applyPlanAsCurrentPlan, updateSourceIntroduction, getSourceIntroduction, clearSourceIntroductions } from '../stores/chatStore'
import { marked } from 'marked'
import markedKatex from 'marked-katex-extension'
import 'katex/dist/katex.min.css'

const router = useRouter()
const currentSection = ref('research-plan')
const activeSection = ref('full')
const chatBoxRef = ref(null)
const isGenerating = ref(false)
const lastMessageIdBeforeGenerate = ref(null) // 记录开始生成前的最后一条消息ID
const isViewingHistoryPlan = ref(false) // 是否正在查看历史方案
const originalPlan = ref(null) // 保存原始方案数据
const lastProcessedMessageId = ref(null) // 记录最后处理的消息ID，防止重复解析
const isEvaluating = ref(false) // 是否正在评估方案
const isIterating = ref(false) // 是否正在迭代方案
const statisticalMethodQuery = ref('') // 统计方法查询输入
const statisticalMethodResult = ref('') // 统计方法查询结果
const generatedMethodIntro = ref('') // 生成的方法介绍
const isQuerying = ref(false) // 是否正在查询统计方法
const isGeneratingSource = ref(false) // 是否正在生成来源介绍
const isGeneratingMethod = ref(false) // 是否正在生成方法介绍
const analysisSubSection = ref('source') // 数据分析页面的子部分：source(来源介绍)、method(方法介绍)、query(统计方法查询)
const isEvaluatingSection = ref(false) // 是否正在评估某个部分
const evaluatingSection = ref('') // 当前正在评估的部分
const showIterateDialogModal = ref(false) // 是否显示迭代建议对话框
const iteratingSection = ref('') // 当前正在迭代的部分
const iterateSuggestion = ref('') // 用户输入的迭代建议
const selectedPresetSuggestion = ref('') // 当前选中的预设建议
const showResearchPlanDialogModal = ref(false) // 是否显示研究方案生成对话框
const researchPlanMode = ref('auto') // 研究方案生成模式：'auto' 或 'custom'
const researchTopicInput = ref('') // 用户输入的研究主题

const sections = [
  { id: 'full', name: '完整方案' },
  { id: 'hypothesis', name: '研究假设' },
  { id: 'design', name: '实验设计' },
  { id: 'analysis', name: '数据分析' },
  { id: 'results', name: '结果呈现' }
]

const analysisSubSections = [
  { id: 'source', name: '来源介绍' },
  { id: 'method', name: '方法介绍' },
  { id: 'query', name: '统计方法查询' }
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

// 配置marked选项，支持LaTeX数学公式
marked.use(markedKatex({
  throwOnError: false, // 数学公式错误时不抛出异常
  displayMode: false,  // 默认为行内模式
  output: 'html'       // 输出HTML格式
}))

// 自定义渲染器，确保图片能正确渲染
const renderer = new marked.Renderer()

// 自定义图片渲染
renderer.image = function(href, title, text) {
  console.log('正在渲染图片:', href)
  
  // 清理并验证URL
  const cleanHref = href.trim()
  if (!cleanHref) {
    console.warn('图片URL为空')
    return `<span style="color: #ef4444;">[图片URL为空]</span>`
  }
  
  const titleAttr = title ? ` title="${title}"` : ''
  const altAttr = text ? ` alt="${text || 'LaTeX公式'}"` : ' alt="LaTeX公式"'
  
  // 检查是否是外部图片，需要使用代理
  const isExternalImage = cleanHref.startsWith('http://') || cleanHref.startsWith('https://')
  const isLatexImage = cleanHref.includes('yuque/__latex')
  
  // 构建图片URL - 对于外部图片使用代理
  let finalHref = cleanHref
  if (isExternalImage && (isLatexImage || cleanHref.includes('cdn.nlark.com'))) {
    // 对语雀等可能有防盗链的图片使用代理
    finalHref = `/api/proxy-image?url=${encodeURIComponent(cleanHref)}`
    console.log('使用代理访问图片:', cleanHref, '=>', finalHref)
  }
  
  // 为LaTeX公式图片添加特殊处理 - 区分行内和行间公式
  let className, styles
  if (isLatexImage) {
    // 通过URL参数或启发式方法判断是否为行间公式
    const isDisplayMode = cleanHref.includes('displaystyle') || 
                         cleanHref.includes('%5Cdisplaystyle') ||  // URL编码的\displaystyle
                         cleanHref.includes('\\begin{') ||
                         cleanHref.includes('%5Cbegin') ||  // URL编码的\begin
                         cleanHref.includes('align') ||
                         cleanHref.includes('equation') ||
                         cleanHref.includes('$$') ||
                         (text && (text.includes('$$') || text.length > 50)) // 长公式通常是行间公式
    
    className = isDisplayMode ? 'latex-formula-display' : 'latex-formula-inline'
    styles = isDisplayMode 
      ? 'display: block; margin: 0.5rem auto; max-width: 100%; max-height: 8em; border: none; background: transparent;'
      : 'display: inline-block; margin: 0 2px; vertical-align: middle; max-height: 1.5em; border: none; background: transparent;'
    
    console.log(`LaTeX公式检测: ${isDisplayMode ? '行间公式' : '行内公式'}`, cleanHref)
  } else {
    className = 'markdown-image'
    styles = 'max-width: 100%; height: auto; margin: 0.5rem 0; border-radius: 0.25rem;'
  }
  
  // 添加referrer策略（作为备用方案）
  const referrerPolicy = isLatexImage ? ' referrerpolicy="no-referrer"' : ''
  
  // 错误处理 - 如果代理失败，尝试直接访问
  const onError = isExternalImage && (isLatexImage || cleanHref.includes('cdn.nlark.com'))
    ? `console.error('代理图片加载失败:', '${finalHref}'); console.log('尝试直接访问:', '${cleanHref}'); this.src='${cleanHref}'; this.referrerPolicy='no-referrer';`
    : isLatexImage 
      ? `console.error('LaTeX图片加载失败:', '${finalHref}'); this.style.display='inline-block'; this.style.background='#f3f4f6'; this.style.padding='2px 4px'; this.style.border='1px dashed #ccc'; this.style.fontSize='0.75rem'; this.style.color='#666'; this.textContent='${text || '公式'}';`
      : `console.error('图片加载失败:', '${finalHref}'); this.style.display='block'; this.style.background='#f9f9f9'; this.style.padding='20px'; this.style.border='1px dashed #ccc'; this.textContent='图片加载失败';`
  
  // 添加加载完成后的尺寸优化
  const onLoad = isLatexImage 
    ? `console.log('✅ LaTeX图片加载成功:', '${finalHref}'); 
       if (this.naturalHeight > 40) { 
         this.style.maxHeight = 'none'; 
         this.style.height = 'auto'; 
         if (this.naturalHeight > 100) {
           this.style.display = 'block';
           this.style.margin = '0.5rem auto';
         }
       }`
    : `console.log('✅ 图片加载成功:', '${finalHref}')`
  
  const result = `<img src="${finalHref}" class="${className}" style="${styles}" ${titleAttr}${altAttr}${referrerPolicy} onerror="${onError}" onload="${onLoad}" />`
  
  console.log('渲染器输出:', result)
  return result
}

// 自定义表格渲染，添加样式
renderer.table = function(header, body) {
  return `<div class="table-container" style="overflow-x: auto; margin: 1rem 0;">
    <table class="markdown-table" style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb;">
      <thead style="background-color: #f9fafb;">${header}</thead>
      <tbody>${body}</tbody>
    </table>
  </div>`
}

renderer.tablerow = function(content) {
  return `<tr style="border-bottom: 1px solid #e5e7eb;">${content}</tr>`
}

renderer.tablecell = function(content, flags) {
  const type = flags.header ? 'th' : 'td'
  const style = flags.header 
    ? 'padding: 0.75rem; border: 1px solid #e5e7eb; font-weight: 600; text-align: left;'
    : 'padding: 0.75rem; border: 1px solid #e5e7eb;'
  return `<${type} style="${style}">${content}</${type}>`
}

marked.setOptions({
  breaks: true, // 支持换行
  gfm: true,    // 支持GitHub flavored markdown
  headerIds: false, // 禁用header id生成
  mangle: false, // 禁用邮箱混淆
  pedantic: false, // 使用更宽松的markdown解析
  sanitize: false, // 允许HTML（在受控环境中使用）
  renderer: renderer // 使用自定义渲染器
})

// 安全的markdown渲染函数
const safeMarkdownRender = (text) => {
  try {
    if (!text) return ''
    
    console.log('开始渲染markdown，文本长度:', text.length)
    console.log('前100字符:', text.substring(0, 100))
    
    const result = marked(text)
    console.log('Markdown渲染完成，结果长度:', result.length)
    console.log('渲染结果前200字符:', result.substring(0, 200))
    
    // 检查是否包含图片标签
    const imgCount = (result.match(/<img/g) || []).length
    console.log(`发现 ${imgCount} 个图片标签`)
    
    return result
  } catch (error) {
    console.error('Markdown渲染错误:', error)
    return text || '' // 如果渲染失败，返回原始文本
  }
}

// 测试markdown渲染的函数
const testMarkdownRender = () => {
  const testMarkdown = `测试LaTeX公式：![img](https://cdn.nlark.com/yuque/__latex/97175e519d61d550ce1d0327b2f7999f.svg) 和普通文本。`
  console.log('=== 测试Markdown渲染 ===')
  console.log('输入:', testMarkdown)
  const rendered = safeMarkdownRender(testMarkdown)
  console.log('输出:', rendered)
  console.log('========================')
  return rendered
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

// 统计方法查询结果的Markdown渲染
const renderedStatisticalMethodResult = computed(() => {
  return statisticalMethodResult.value ? safeMarkdownRender(statisticalMethodResult.value) : ''
})

// 生成的方法介绍的Markdown渲染
const renderedGeneratedMethodIntro = computed(() => {
  return generatedMethodIntro.value ? safeMarkdownRender(generatedMethodIntro.value) : ''
})

// 当前部分的来源介绍
const currentSourceIntroduction = computed(() => {
  return getSourceIntroduction(activeSection.value)
})

// 来源介绍的Markdown渲染
const renderedSourceIntroduction = computed(() => {
  return currentSourceIntroduction.value ? safeMarkdownRender(currentSourceIntroduction.value) : ''
})

// 监听活动部分变化，清空统计方法查询结果和重置数据分析子部分
watch(() => activeSection.value, (newSection, oldSection) => {
  statisticalMethodResult.value = ''
  
  // 当切换到数据分析页面时，默认显示来源介绍
  if (newSection === 'analysis') {
    analysisSubSection.value = 'source'
  }
})

// 监听数据分析子部分变化，清空相关状态
watch(() => analysisSubSection.value, (newSubSection) => {
  // 当切换子部分时，清空统计方法查询结果
  if (newSubSection !== 'query') {
    statisticalMethodResult.value = ''
  }
})

// 注释：移除自动生成来源介绍功能，改为手动生成

// 监听聊天消息，解析研究方案
watch(() => chatState.messages, (newMessages, oldMessages) => {
  // 获取最新的助手消息
  const latestAssistantMessage = newMessages
    .filter(msg => msg.type === 'assistant' && msg.isComplete && !msg.isError)
    .pop()
  
  if (latestAssistantMessage) {
    // 简化重复处理检查：只检查消息ID
    if (lastProcessedMessageId.value === latestAssistantMessage.id) {
      return
    }
    
    const content = latestAssistantMessage.content
    
    // 检查是否包含研究方案Markdown格式
    const hasResearchPlanMarkdown = content.includes('研究假设') || 
                                   content.includes('实验设计') || 
                                   content.includes('数据分析') ||
                                   content.includes('结果呈现') ||
                                   (content.includes('#') && (content.includes('假设') || content.includes('设计') || content.includes('分析')))
    
    // 检查是否是评估消息（包括整体评估和部分评估）
    const isEvaluationMessage = content.includes('逻辑性') && 
                               content.includes('合理性') && 
                               content.includes('可行性')
    
    // 如果是评估消息，重置评估状态并跳过方案解析
    if (isEvaluationMessage) {
      console.log('检测到评估消息，重置评估状态')
      isEvaluating.value = false
      isEvaluatingSection.value = false
      evaluatingSection.value = ''
      return
    }
    
    // 如果正在评估状态（整体或部分），跳过方案解析
    if (isEvaluating.value || isEvaluatingSection.value) {
      console.log('处于评估状态，跳过方案解析')
      return
    }
    
    // 如果正在生成状态或迭代状态，按原有逻辑处理
    if (isGenerating.value || isIterating.value) {
      // 检查消息ID，只处理在生成开始之后的新消息
      if (lastMessageIdBeforeGenerate.value && latestAssistantMessage.id <= lastMessageIdBeforeGenerate.value) {
        console.log('跳过生成开始前的旧消息，消息ID:', latestAssistantMessage.id, '生成前最后消息ID:', lastMessageIdBeforeGenerate.value)
        return
      }
      
      console.log('收到新的助手消息（生成/迭代状态），尝试解析:', content.substring(0, 200))
      console.log('消息ID:', latestAssistantMessage.id, '生成前最后消息ID:', lastMessageIdBeforeGenerate.value)
      
      // 检查是否是部分迭代响应
      const isPartialIteration = isIterating.value && iteratingSection.value && iteratingSection.value !== 'full'
      
      if (isPartialIteration) {
        // 处理部分迭代响应 - 现在AI返回完整方案，使用完整方案解析
        console.log(`检测到${iteratingSection.value}部分的迭代响应，尝试解析完整方案`)
        
        // 检查是否包含研究方案内容
        const hasResearchContent = hasResearchPlanMarkdown || 
                                  (content.includes('研究') || content.includes('方案') || content.includes('实验'))
        
        if (hasResearchContent) {
          const wasSuccessfullyParsed = parseResearchPlanResponse(content)
          
          if (wasSuccessfullyParsed) {
            lastProcessedMessageId.value = latestAssistantMessage.id
            console.log(`成功解析${iteratingSection.value}部分迭代的完整方案，标记消息为已处理，ID:`, latestAssistantMessage.id)
            
            // 显示完整方案（延迟一下以确保状态更新完成）
            const updatedSection = getSectionNameInChinese(iteratingSection.value)
            setTimeout(() => {
              displayCompleteUpdatedPlan(updatedSection)
            }, 1000)
            
            // 成功解析后重置状态
            isIterating.value = false
            iteratingSection.value = ''
          }
        }
        return
      }
      
      // 检查消息是否包含研究方案相关内容
      const hasResearchContent = hasResearchPlanMarkdown || 
                                (content.includes('研究') || content.includes('方案') || content.includes('实验'))
      
      // 如果是问候语或者非研究方案消息，继续等待
      if (!hasResearchContent && (content.includes('你好') || content.includes('助手') || content.length < 100)) {
        console.log('收到问候语，继续等待研究方案消息...')
        // 设置一个较长的超时，如果30秒内没有收到方案消息则重置状态
        setTimeout(() => {
          if (isGenerating.value || isIterating.value) {
            console.log('等待研究方案消息超时，重置生成状态')
            isGenerating.value = false
            isIterating.value = false
            iteratingSection.value = ''
          }
        }, 30000)
        return
      }
      
      // 尝试解析研究方案
      const wasSuccessfullyParsed = parseResearchPlanResponse(content)
      
      // 根据解析结果处理状态
      if (wasSuccessfullyParsed) {
        lastProcessedMessageId.value = latestAssistantMessage.id
        console.log('成功解析方案，标记消息为已处理，ID:', latestAssistantMessage.id)
        // 成功解析后重置状态
        isGenerating.value = false
        isIterating.value = false
        iteratingSection.value = ''
      } else if (hasResearchContent) {
        console.log('包含研究内容但解析失败，重置生成状态')
        isGenerating.value = false
        isIterating.value = false
        iteratingSection.value = ''
      }
    }
    // 如果不是生成状态，但检测到研究方案Markdown格式，也要解析
    else if (hasResearchPlanMarkdown) {
      console.log('检测到普通聊天中的研究方案回复，尝试解析:', content.substring(0, 200))
      
      // 检查是否为新消息，避免重复解析
      const messageId = latestAssistantMessage.id
      
      if (lastProcessedMessageId.value === messageId) {
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
      // 初始化研究假设部分的来源介绍
      currentPlanState.hypothesis = {
        sourceIntro: '本研究假设基于现有文献和理论基础，结合研究目标和具体情境制定。'
      }
      console.log('更新研究假设:', currentPlanState.hypotheses)
      updatedFields++
    }
    
    // 更新实验设计
    if (design) {
      currentPlanState.experimentalDesign = design
      // 初始化实验设计部分的来源介绍
      currentPlanState.design = {
        sourceIntro: '实验设计方案参考了相关领域的经典实验范式和最新研究方法。'
      }
      console.log('更新实验设计:', design.substring(0, 100) + '...')
      updatedFields++
    }
    
    // 更新数据分析
    if (analysis) {
      currentPlanState.analysisMethod = analysis
      // 初始化数据分析部分的来源介绍和方法介绍
      currentPlanState.analysis = {
        sourceIntro: '数据分析方法基于研究目标和数据特征，采用适当的统计分析方法。',
        methodIntro: '本研究采用的统计方法包括描述性统计和推论统计。您可以使用下方的查询功能了解具体统计方法的详细信息。'
      }
      console.log('更新数据分析:', analysis.substring(0, 100) + '...')
      updatedFields++
    }
    
    // 更新结果呈现
    if (results) {
      currentPlanState.expectedResults = results
      // 初始化结果呈现部分的来源介绍
      currentPlanState.results = {
        sourceIntro: '结果呈现方式遵循学术论文的标准格式，确保研究发现清晰易懂。'
      }
      console.log('更新结果呈现:', results.substring(0, 100) + '...')
      updatedFields++
    }
    
    // 更新基本信息
    const timestamp = new Date().toLocaleString('zh-CN')
    currentPlanState.title = `基于AI智能体生成的定量研究方案`
    currentPlanState.researchQuestions = 'AI生成的研究方案'
    currentPlanState.methodology = `基于参考文献生成的研究方法 (生成时间: ${timestamp})`
    currentPlanState.dataCollection = '根据研究设计制定的数据收集方案'
    
    // 初始化完整方案部分的来源介绍
    currentPlanState.full = {
      sourceIntro: '本研究方案综合了多种研究方法和文献资源，旨在提供一个全面、科学的定量研究框架。'
    }
    
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
        if (isIterating.value) {
          // 迭代状态下的提示
          if (updatedFields >= 3) {
            alert('方案迭代成功！已优化研究假设、实验设计、数据分析和结果呈现四个完整部分。')
          } else if (updatedFields >= 2) {
            alert(`方案迭代成功！已优化 ${updatedFields} 个部分，请查看各个板块的内容。`)
          } else {
            alert('方案迭代成功！请查看右侧内容。')
          }
          
          // 为完整方案迭代显示完整的更新后方案
          setTimeout(() => {
            displayCompleteUpdatedPlan('完整方案')
          }, 1000)
        } else if (isGenerating.value) {
          // 生成状态下的提示
          if (updatedFields >= 3) {
            alert('研究方案生成成功！已包含研究假设、实验设计、数据分析和结果呈现四个完整部分。PDF文件可在聊天框中下载。')
          } else if (updatedFields >= 2) {
            alert(`研究方案生成成功！已包含 ${updatedFields} 个部分，请查看各个板块的内容。PDF文件可在聊天框中下载。`)
          } else {
            alert('研究方案已生成，请查看右侧内容。PDF文件可在聊天框中下载。')
          }
        }
      }, 500)
      
      // 生成成功后，将方案添加到历史方案中
      if (isGenerating.value) {
        // 准备方案数据，用于添加到历史记录
        const planData = {
          title: currentPlanState.title,
          researchQuestions: currentPlanState.researchQuestions,
          methodology: currentPlanState.methodology,
          hypotheses: currentPlanState.hypotheses,
          experimentalDesign: currentPlanState.experimentalDesign,
          analysisMethod: currentPlanState.analysisMethod,
          expectedResults: currentPlanState.expectedResults,
          timeline: currentPlanState.timeline || '',
          isGenerated: true
        }
        
        // 准备生成上下文，包含参考文献信息
        const generationContext = {
          referencedPapers: Array.from(papersState.referencedPapersList).map(paper => ({
            title: paper.title,
            authors: paper.authors,
            year: paper.year,
            source: paper.source
          })),
          generateTime: new Date().toISOString(),
          userRequirements: extractConversationContext().userRequirements || ''
        }
        
        console.log('准备添加研究方案到历史记录')
        
        // 延迟添加，确保UI更新完成
        setTimeout(async () => {
          try {
            await addHistoryPlan(planData, generationContext)
            console.log('成功添加研究方案到历史记录')
          } catch (error) {
            console.error('添加研究方案到历史记录失败:', error)
          }
        }, 1000)
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

// 解析部分迭代响应
const parseSectionIterationResponse = (content, section) => {
  try {
    console.log(`解析${section}部分的迭代响应，长度:`, content.length, '前500字符:', content.substring(0, 500))
    
    // 预检查：跳过普通问候语和不包含研究方案的消息
    if (!content || typeof content !== 'string') {
      console.log('消息内容为空或非字符串，跳过解析')
      return false
    }
    
    const sectionName = getSectionNameInChinese(section)
    
    // 检查是否包含相关部分的内容
    const hasTargetSection = content.includes(sectionName) || 
                            content.includes(`#${sectionName}`) ||
                            content.includes(`# ${sectionName}`)
    
    if (!hasTargetSection) {
      console.log(`未找到${sectionName}部分的内容，跳过解析`)
      return false
    }
    
    // 提取目标部分的内容
    let extractedContent = ''
    
    // 尝试多种提取模式
    const patterns = [
      // Markdown标题格式: #研究假设 或 # 研究假设
      new RegExp(`(?:#+\\s*${sectionName}[：:\\s]*)\\n?([\\s\\S]*?)(?=\\n#+\\s*(?:研究假设|实验设计|数据分析|结果呈现)|$)`, 'i'),
      // 传统冒号格式：研究假设：
      new RegExp(`${sectionName}[：:\\s]*\\n?([\\s\\S]*?)(?=\\n\\s*(?:研究假设|实验设计|数据分析|结果呈现|$))`, 'i'),
      // 直接提取（如果只有一个部分的内容）
      new RegExp(`([\\s\\S]*)`, 'i')
    ]
    
    for (const pattern of patterns) {
      const match = content.match(pattern)
      if (match && match[1] && match[1].trim()) {
        extractedContent = match[1].trim()
        console.log(`使用模式提取到${sectionName}内容:`, extractedContent.substring(0, 200) + '...')
        break
      }
    }
    
    if (!extractedContent) {
      console.log(`未能提取到${sectionName}部分的有效内容`)
      return false
    }
    
    // 清理内容：移除多余的标题标记和格式
    extractedContent = extractedContent
      .replace(/^#+\s*[\u4e00-\u9fa5]+[：:]\s*/g, '') // 移除开头的markdown标题
      .replace(/^[\u4e00-\u9fa5]+[：:]\s*/g, '') // 移除开头的冒号标题
      .trim()
    
    if (!extractedContent || extractedContent.length < 10) {
      console.log(`${sectionName}部分内容太短或为空，不进行更新`)
      return false
    }
    
    console.log(`准备更新${sectionName}部分，新内容长度:`, extractedContent.length)
    
    // 根据部分类型更新对应的状态
    let updatedFields = 0
    
    switch (section) {
      case 'hypothesis':
        // 处理研究假设（支持多个假设）
        const hypothesesArray = extractedContent.split(/\n(?=H\d+[:：]|假设\d+[:：]|\d+[\.、]|[•·]\s*)/).filter(h => h.trim())
        if (hypothesesArray.length > 1) {
          currentPlanState.hypotheses = hypothesesArray.map(h => h.trim())
    } else {
          currentPlanState.hypotheses = [extractedContent]
        }
        console.log('更新研究假设:', currentPlanState.hypotheses)
        updatedFields++
        break
        
      case 'design':
        currentPlanState.experimentalDesign = extractedContent
        console.log('更新实验设计:', extractedContent.substring(0, 100) + '...')
        updatedFields++
        break
        
      case 'analysis':
        currentPlanState.analysisMethod = extractedContent
        console.log('更新数据分析:', extractedContent.substring(0, 100) + '...')
        updatedFields++
        break
        
      case 'results':
        currentPlanState.expectedResults = extractedContent
        console.log('更新结果呈现:', extractedContent.substring(0, 100) + '...')
        updatedFields++
        break
        
      default:
        console.log('未知的部分类型:', section)
      return false
    }
    
    if (updatedFields > 0) {
      // 更新时间戳
      currentPlanState.lastUpdated = new Date().toISOString()
      
      // 强制更新响应式状态
      const forceUpdate = {
        ...currentPlanState,
        _timestamp: Date.now()
      }
      Object.assign(currentPlanState, forceUpdate)
      
      // 切换到对应的部分视图
      activeSection.value = section
      
      console.log(`成功更新${sectionName}部分`)
      
      // 显示成功提示
      setTimeout(() => {
        alert(`${sectionName}部分迭代成功！已根据您的建议完成优化。`)
      }, 500)
      
      return true
    } else {
      console.log(`${sectionName}部分解析失败，未更新任何字段`)
      return false
    }
    
  } catch (error) {
    console.error(`解析${section}部分迭代响应时出现错误:`, error)
    console.log('原始内容:', content)
    return false
  }
}

// 在聊天框中显示完整的更新后方案
const displayCompleteUpdatedPlan = (updatedSectionName) => {
  try {
    console.log(`显示完整的更新后方案，更新的部分: ${updatedSectionName}`)
    
    // 构建完整方案的Markdown格式
    const isFullPlanUpdate = updatedSectionName === '完整方案'
    let completeMarkdown = isFullPlanUpdate 
      ? `✨ **完整研究方案已更新** （全方案优化迭代）\n\n`
      : `✨ **完整研究方案已更新** （${updatedSectionName}部分已优化）\n\n`
    
    // 添加研究假设
    if (currentPlanState.hypotheses && currentPlanState.hypotheses.length > 0) {
      const isUpdated = isFullPlanUpdate || updatedSectionName === '研究假设'
      completeMarkdown += `${isUpdated ? '🔄' : '📋'} **#研究假设：**\n`
      
      currentPlanState.hypotheses.forEach((hypothesis, index) => {
        if (currentPlanState.hypotheses.length > 1) {
          completeMarkdown += `${index + 1}. ${hypothesis}\n\n`
        } else {
          completeMarkdown += `${hypothesis}\n\n`
        }
      })
    }
    
    // 添加实验设计
    if (currentPlanState.experimentalDesign) {
      const isUpdated = isFullPlanUpdate || updatedSectionName === '实验设计'
      completeMarkdown += `${isUpdated ? '🔄' : '📋'} **#实验设计：**\n`
      completeMarkdown += `${currentPlanState.experimentalDesign}\n\n`
    }
    
    // 添加数据分析
    if (currentPlanState.analysisMethod) {
      const isUpdated = isFullPlanUpdate || updatedSectionName === '数据分析'
      completeMarkdown += `${isUpdated ? '🔄' : '📋'} **#数据分析：**\n`
      completeMarkdown += `${currentPlanState.analysisMethod}\n\n`
    }
    
    // 添加结果呈现
    if (currentPlanState.expectedResults) {
      const isUpdated = isFullPlanUpdate || updatedSectionName === '结果呈现'
      completeMarkdown += `${isUpdated ? '🔄' : '📋'} **#结果呈现：**\n`
      completeMarkdown += `${currentPlanState.expectedResults}\n\n`
    }
    
    // 添加说明
    completeMarkdown += `---\n\n📝 **说明：**\n`
    if (isFullPlanUpdate) {
      completeMarkdown += `- 🔄 表示本次完整方案迭代中的所有部分\n`
      completeMarkdown += `- 更新时间：${new Date().toLocaleString('zh-CN')}`
    } else {
      completeMarkdown += `- 🔄 表示本次迭代中更新的部分\n`
      completeMarkdown += `- 📋 表示保持不变的部分\n`
      completeMarkdown += `- 更新时间：${new Date().toLocaleString('zh-CN')}`
    }
    
    // 创建一个系统消息并添加到聊天状态中
    const systemMessage = {
      id: Date.now() + Math.random(), // 生成唯一ID
      type: 'assistant',
      content: completeMarkdown,
      timestamp: new Date().toISOString(),
      isComplete: true,
      isError: false,
      isSystemGenerated: true // 标记为系统生成的消息
    }
    
    // 添加到聊天消息列表
    chatState.messages.push(systemMessage)
    
    console.log('完整方案已添加到聊天框')
    
  } catch (error) {
    console.error('显示完整方案时出错:', error)
  }
}

// 显示研究方案生成对话框
const showResearchPlanDialog = () => {
  researchPlanMode.value = 'auto'
  researchTopicInput.value = ''
  showResearchPlanDialogModal.value = true
}

// 关闭研究方案生成对话框
const closeResearchPlanDialog = () => {
  showResearchPlanDialogModal.value = false
  researchPlanMode.value = 'auto'
  researchTopicInput.value = ''
}

// 确认生成研究方案
const confirmGenerateResearchPlan = async () => {
  // 保存当前的模式和主题，避免在关闭对话框时被重置
  const currentMode = researchPlanMode.value
  const currentTopic = researchTopicInput.value
  
  // 关闭对话框
  closeResearchPlanDialog()
  
  // 调用生成函数，传递保存的模式和主题
  await generateResearchPlan(currentMode, currentTopic)
}

// 生成定量研究方案（修改为支持模式和主题参数）
const generateResearchPlan = async (mode = 'auto', customTopic = '') => {
  // 记录当前最新的消息ID
  const latestMessage = chatState.messages
    .filter(msg => msg.isComplete)
    .pop()
  lastMessageIdBeforeGenerate.value = latestMessage ? latestMessage.id : 0
  
  // 清除之前的解析记录，确保新生成的方案能被解析
  lastProcessedMessageId.value = null
  
  isGenerating.value = true
  
  console.log('开始生成新方案，当前最新消息ID:', lastMessageIdBeforeGenerate.value)
  console.log('生成模式:', mode, '自定义主题:', customTopic)
  
  try {
    // 构建消息内容
    let message = "请帮我生成定量实验方案。"
    
    // 预先提取对话上下文（智能分析模式会用到）
    const conversationContext = extractConversationContext()
    
    // 根据模式决定使用自定义主题还是智能分析
    if (mode === 'custom' && customTopic.trim()) {
      console.log('使用自定义主题模式，主题:', customTopic.trim())
      message += `\n\n**研究主题/问题：**\n${customTopic.trim()}`
      message += `\n\n请基于以上研究主题生成详细的定量研究方案。`
    } else {
      console.log('使用智能分析模式')
      // 使用智能分析模式，分析对话历史，提取用户需求和上下文
      if (conversationContext.hasUserRequirements) {
        message += `\n\n根据我们的对话历史，我了解到以下研究需求：\n${conversationContext.userRequirements}`
        message += `\n\n研究背景和上下文：\n${conversationContext.researchContext}`
      }
    }
    
    // 2. 获取所有参考文献信息（包括搜索和推荐的）
    const referencedPapers = Array.from(papersState.referencedPapersList)
    
    if (referencedPapers.length > 0) {
      message += `\n\n我将为你提供以下${referencedPapers.length}篇参考文献的内容：\n`
      
      // 为每篇论文获取研究方法和摘要
      const paperContents = await Promise.all(referencedPapers.map(async (paper, index) => {
        let paperInfo = `\n${index + 1}. 标题：${paper.title}`
        paperInfo += `\n   作者：${Array.isArray(paper.authors) ? paper.authors.join(', ') : paper.authors || '未知'}`
        paperInfo += `\n   年份：${paper.year || '未知'}`
        paperInfo += `\n   来源：${paper.source === 'search' ? '文献搜索' : 'AI推荐'}`
        
        // 如果已有摘要，直接使用
        if (paper.abstract || paper.summary) {
          paperInfo += `\n   摘要：${paper.abstract || paper.summary}`
        }
        
        // 如果已有研究方法，直接使用
        if (paper.researchMethod) {
          paperInfo += `\n   研究方法：${paper.researchMethod}`
        }
        // 如果没有研究方法但有全文，尝试获取研究方法
        else if (paper.fullText) {
          try {
            const response = await fetch('/api/paper/generate-method-summary', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                title: paper.title,
                fullText: paper.fullText
              })
            });
            
            if (response.ok) {
              const result = await response.json();
              if (result.success && result.methodSummary) {
                // 更新论文对象的研究方法
                paper.researchMethod = result.methodSummary;
                paperInfo += `\n   研究方法：${result.methodSummary}`;
              }
            }
          } catch (error) {
            console.error(`获取论文"${paper.title}"研究方法失败:`, error);
          }
        }
        // 如果既没有研究方法也没有全文，尝试获取全文和研究方法
        else {
          try {
            const response = await fetch('/api/paper/get-full-content', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                title: paper.title,
                doi: paper.doi || null
              })
            });
            
            if (response.ok) {
              const result = await response.json();
              if (result.success) {
                // 更新论文对象的全文
                if (result.fullText) {
                  paper.fullText = result.fullText;
                }
                
                // 更新研究方法
                if (result.researchMethod) {
                  paper.researchMethod = result.researchMethod;
                  paperInfo += `\n   研究方法：${result.researchMethod}`;
                }
                // 如果没有获取到研究方法但有全文，尝试生成研究方法概要
                else if (paper.fullText) {
                  try {
                    const methodResponse = await fetch('/api/paper/generate-method-summary', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        title: paper.title,
                        fullText: paper.fullText
                      })
                    });
                    
                    if (methodResponse.ok) {
                      const methodResult = await methodResponse.json();
                      if (methodResult.success && methodResult.methodSummary) {
                        paper.researchMethod = methodResult.methodSummary;
                        paperInfo += `\n   研究方法：${methodResult.methodSummary}`;
                      }
                    }
                  } catch (methodError) {
                    console.error(`生成论文"${paper.title}"研究方法概要失败:`, methodError);
                  }
                }
              }
            }
          } catch (error) {
            console.error(`获取论文"${paper.title}"内容失败:`, error);
          }
        }
        
        return paperInfo + "\n";
      }));
      
      // 添加所有论文信息到消息中
      message += paperContents.join("");
      
      message += `\n请基于以上${referencedPapers.length}篇参考文献的内容（特别是研究方法部分）`
    } else {
      message += `\n\n`
    }
    
    // 3. 根据模式、用户需求和参考文献，调整生成策略
    if (mode === 'custom' && customTopic.trim()) {
      // 自定义主题模式
      if (referencedPapers.length > 0) {
        message += `，结合上述研究主题，生成一个详细的定量研究方案。`
      } else {
        message += `，生成一个详细的定量研究方案。`
      }
    } else {
      // 智能分析模式
      if (conversationContext.hasUserRequirements && referencedPapers.length > 0) {
        message += `，结合我提到的研究需求，生成一个详细的定量研究方案。`
      } else if (conversationContext.hasUserRequirements) {
        message += `请基于我提到的研究需求，生成一个详细的定量研究方案。`
      } else if (referencedPapers.length > 0) {
        message += `生成一个详细的定量研究方案。`
      } else {
        message += `请生成一个详细的定量研究方案。`
      }
    }

    message += `

请严格按照以下格式返回：
#研究假设：<此处填写具体研究假设内容>；
#实验设计：<此处填写实验设计详细方案>；
#数据分析：<此处描述数据分析方法>；
#结果呈现：<此处说明结果展示形式>；

要求：`
    
    // 根据模式添加不同的要求
    if (mode === 'custom' && customTopic.trim()) {
      message += `
1. 紧密围绕上述研究主题进行设计
2. 如果有参考文献，请结合文献内容和研究主题进行设计
3. 确保研究方案与提供的研究主题高度匹配
4. 基于文献内容生成科学严谨的研究方案
5. 必须严格按照上述格式返回,使用Markdown格式
6. plan字段中的每个部分都要详细具体`
    } else {
      message += `
1. 优先考虑我在对话中提到的具体研究需求和目标
2. 如果有参考文献，请结合文献内容和我提到的需求进行设计
3. 确保研究方案与我的研究目标高度匹配
4. 基于文献内容生成科学严谨的研究方案
5. 必须严格按照上述格式返回,使用Markdown格式
6. plan字段中的每个部分都要详细具体`
    }
    
    console.log('准备发送的消息:', message)
    console.log('生成模式:', mode)
    console.log('自定义主题:', customTopic || '无')
    console.log('参考文献数量:', referencedPapers.length)
    
    // 发送消息到chatbox
    await sendMessage(message)
    
  } catch (error) {
    console.error('生成研究方案失败:', error)
    isGenerating.value = false
  }
  // 注意：不在这里重置isGenerating，让解析成功时再重置，避免过早重置导致解析逻辑失效
}

// 提取对话历史中的用户需求和上下文
const extractConversationContext = () => {
  const messages = chatState.messages
  const userMessages = messages.filter(msg => msg.type === 'user' && msg.isComplete)
  const assistantMessages = messages.filter(msg => msg.type === 'assistant' && msg.isComplete && !msg.isError)
  
  // 提取用户需求关键词
  const userRequirements = []
  const researchContext = []
  
  // 分析最近的用户消息（最多取最近10条）
  const recentUserMessages = userMessages.slice(-10)
  
  for (const msg of recentUserMessages) {
    const content = msg.content.toLowerCase()
    
    // 提取研究主题和领域
    if (content.includes('研究') || content.includes('实验') || content.includes('调查')) {
      // 提取包含"研究"、"实验"、"调查"等关键词的完整句子
      const sentences = msg.content.split(/[。！？\n]/).filter(s => 
        s.includes('研究') || s.includes('实验') || s.includes('调查') || 
        s.includes('分析') || s.includes('评估') || s.includes('测试')
      )
      userRequirements.push(...sentences)
    }
    
    // 提取具体的研究目标
    if (content.includes('目标') || content.includes('目的') || content.includes('想要')) {
      const sentences = msg.content.split(/[。！？\n]/).filter(s => 
        s.includes('目标') || s.includes('目的') || s.includes('想要') ||
        s.includes('希望') || s.includes('需要')
      )
      userRequirements.push(...sentences)
    }
    
    // 提取研究变量和指标
    if (content.includes('变量') || content.includes('指标') || content.includes('测量') || 
        content.includes('因素') || content.includes('影响') || content.includes('关系')) {
      const sentences = msg.content.split(/[。！？\n]/).filter(s => 
        s.includes('变量') || s.includes('指标') || s.includes('测量') ||
        s.includes('因素') || s.includes('影响') || s.includes('关系')
      )
      userRequirements.push(...sentences)
    }
    
    // 提取研究方法和设计偏好
    if (content.includes('方法') || content.includes('设计') || content.includes('问卷') ||
        content.includes('访谈') || content.includes('观察') || content.includes('实验')) {
      const sentences = msg.content.split(/[。！？\n]/).filter(s => 
        s.includes('方法') || s.includes('设计') || s.includes('问卷') ||
        s.includes('访谈') || s.includes('观察') || s.includes('实验')
      )
      userRequirements.push(...sentences)
    }
    
    // 提取研究背景和上下文信息
    if (content.includes('背景') || content.includes('现状') || content.includes('问题') ||
        content.includes('领域') || content.includes('行业') || content.includes('应用')) {
      const sentences = msg.content.split(/[。！？\n]/).filter(s => 
        s.includes('背景') || s.includes('现状') || s.includes('问题') ||
        s.includes('领域') || s.includes('行业') || s.includes('应用')
      )
      researchContext.push(...sentences)
    }
  }
  
  // 去重并清理
  const uniqueRequirements = [...new Set(userRequirements)].filter(req => req.trim().length > 5)
  const uniqueContext = [...new Set(researchContext)].filter(ctx => ctx.trim().length > 5)
  
  // 构建格式化的需求描述
  let formattedRequirements = ''
  if (uniqueRequirements.length > 0) {
    formattedRequirements = uniqueRequirements.slice(0, 5).join('\n• ')
  }
  
  let formattedContext = ''
  if (uniqueContext.length > 0) {
    formattedContext = uniqueContext.slice(0, 3).join('\n• ')
  }
  
  console.log('提取的用户需求:', uniqueRequirements)
  console.log('提取的研究上下文:', uniqueContext)
  
  return {
    hasUserRequirements: uniqueRequirements.length > 0,
    userRequirements: formattedRequirements,
    researchContext: formattedContext,
    requirementCount: uniqueRequirements.length,
    contextCount: uniqueContext.length
  }
}

// 页面加载时检查是否有历史方案要显示
onMounted(() => {
  // 测试markdown渲染功能
  console.log('🧪 开始测试markdown渲染功能')
  testMarkdownRender()
  
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

  // 评估研究方案
  const evaluatePlan = async () => {
    if (isEvaluating.value || !currentPlanState) return
    
    try {
      isEvaluating.value = true
      
      // 提取对话历史中的用户需求
      const conversationContext = extractConversationContext()
      
      // 构建评估提示
      let evaluationPrompt = `请对以下研究方案进行系统评估，分别从以下三方面进行分析：
1. 逻辑性：评估研究目的、研究假设、评估指标等的前后对应关系
2. 合理性：评估各评估指标、评估工具、评估方法等是否有效且合适
3. 可行性：评估用户实验的任务量、时间、成本等是否可行`

      // 如果有用户需求，添加需求匹配度评估
      if (conversationContext.hasUserRequirements) {
        evaluationPrompt += `
4. 需求匹配度：评估方案是否充分满足用户的具体研究需求和目标`
      }

      evaluationPrompt += `

最后请总结指出方案的优点和可改进之处。

研究方案内容：
${JSON.stringify({
  title: currentPlanState.title || '定量研究方案',
  hypotheses: currentPlanState.hypotheses || [],
  experimentalDesign: currentPlanState.experimentalDesign || '',
  analysisMethod: currentPlanState.analysisMethod || '',
  expectedResults: currentPlanState.expectedResults || ''
}, null, 2)}`

      // 如果有用户需求，添加到评估提示中
      if (conversationContext.hasUserRequirements) {
        evaluationPrompt += `

用户研究需求：
${conversationContext.userRequirements}

研究背景和上下文：
${conversationContext.researchContext}

请特别注意评估：
1. 方案是否充分考虑了用户提到的具体研究目标
2. 研究假设是否与用户的需求高度匹配
3. 实验设计是否适合用户的研究场景和偏好
4. 数据分析方法是否能够有效回答用户的研究问题`
      }

      console.log('评估提示包含用户需求:', conversationContext.hasUserRequirements)

      // 发送消息到对话
      await sendMessage(evaluationPrompt)
      
      // 显示提示消息
      setTimeout(() => {
        alert('评估请求已发送，请等待AI助手的评估结果。')
      }, 500)

      // 设置一个定时器，在10秒后重置评估状态
      // 这是为了防止评估状态长时间保持，即使没有收到响应也会重置
      setTimeout(() => {
        if (isEvaluating.value) {
          console.log('评估状态超时，自动重置')
          isEvaluating.value = false
        }
      }, 10000)

    } catch (error) {
      console.error('评估方案失败:', error)
      alert('评估方案失败，请重试')
      isEvaluating.value = false
    }
  }

// 评估研究方案的特定部分
const evaluateSectionPlan = async (section) => {
  if (isEvaluatingSection.value || !currentPlanState) return
  
  try {
    isEvaluatingSection.value = true
    evaluatingSection.value = section
    
    // 提取对话历史中的用户需求
    const conversationContext = extractConversationContext()
    
    // 根据部分获取相应的内容和中文名称
    let sectionContent = ''
    let sectionName = ''
    
    switch (section) {
      case 'full':
        sectionName = '完整方案'
        sectionContent = `研究假设：${currentPlanState.hypotheses ? currentPlanState.hypotheses.join('\n') : ''}
实验设计：${currentPlanState.experimentalDesign || ''}
数据分析：${currentPlanState.analysisMethod || ''}
结果呈现：${currentPlanState.expectedResults || ''}`
        break
      case 'hypothesis':
        sectionName = '研究假设'
        sectionContent = currentPlanState.hypotheses ? currentPlanState.hypotheses.join('\n') : ''
        break
      case 'design':
        sectionName = '实验设计'
        sectionContent = currentPlanState.experimentalDesign || ''
        break
      case 'analysis':
        sectionName = '数据分析'
        sectionContent = currentPlanState.analysisMethod || ''
        break
      case 'results':
        sectionName = '结果呈现'
        sectionContent = currentPlanState.expectedResults || ''
        break
      default:
        alert('不支持的评估部分')
      return
    }
    
    if (!sectionContent.trim()) {
      alert(`当前${sectionName}部分内容为空，无法进行评估`)
      isEvaluatingSection.value = false
      evaluatingSection.value = ''
      return
    }
    
    // 构建评估提示
    let evaluationPrompt = `请对以下研究方案中的"${sectionName}"部分进行专项评估。

完整研究方案背景：
${JSON.stringify({
  title: currentPlanState.title || '定量研究方案',
  hypotheses: currentPlanState.hypotheses || [],
  experimentalDesign: currentPlanState.experimentalDesign || '',
  analysisMethod: currentPlanState.analysisMethod || '',
  expectedResults: currentPlanState.expectedResults || ''
}, null, 2)}

需要重点评估的"${sectionName}"部分内容：
${sectionContent}

请针对"${sectionName}"部分进行以下方面的评估：
1. 逻辑性：评估该部分内容的逻辑结构是否清晰，与整体方案的协调性
2. 合理性：评估该部分的设计是否科学合理，方法选择是否恰当
3. 可行性：评估该部分的实施难度、时间成本和资源需求
4. 完整性：评估该部分内容是否充分详细，是否缺少重要要素`

    // 如果有用户需求，添加需求匹配度评估
    if (conversationContext.hasUserRequirements) {
      evaluationPrompt += `
5. 需求匹配度：评估该部分是否充分满足用户的具体研究需求和目标`
    }

    evaluationPrompt += `

请重点分析：
- 该部分的优点和亮点
- 存在的问题和不足
- 具体的改进建议和优化方向`

    // 如果有用户需求，添加到评估提示中
    if (conversationContext.hasUserRequirements) {
      evaluationPrompt += `

用户研究需求：
${conversationContext.userRequirements}

研究背景和上下文：
${conversationContext.researchContext}

请特别注意评估：
- 该部分是否充分考虑了用户提到的具体研究目标
- 设计是否适合用户的研究场景和偏好
- 如何更好地满足用户的研究需求`
    }

    evaluationPrompt += `

请提供针对性的评估意见，重点关注"${sectionName}"部分的质量和改进空间。`

    console.log(`评估${sectionName}部分，包含用户需求:`, conversationContext.hasUserRequirements)

    // 发送消息到对话
    await sendMessage(evaluationPrompt)
    
    // 显示提示消息
    setTimeout(() => {
      alert(`${sectionName}部分的评估请求已发送，请等待AI助手的评估结果。`)
    }, 500)

    // 设置一个定时器，在10秒后重置评估状态
    setTimeout(() => {
      if (isEvaluatingSection.value) {
        console.log('部分评估状态超时，自动重置')
        isEvaluatingSection.value = false
        evaluatingSection.value = ''
      }
    }, 10000)

  } catch (error) {
    console.error(`评估${sectionName}部分失败:`, error)
    alert(`评估${sectionName}部分失败，请重试`)
    isEvaluatingSection.value = false
    evaluatingSection.value = ''
  }
}

// 带建议的完整方案迭代
const iteratePlanWithSuggestion = async (suggestion) => {
  if (isIterating.value || !currentPlanState) return

  try {
    isIterating.value = true
    
    console.log('开始迭代完整方案，建议:', suggestion)

    // 提取对话历史中的用户需求
    const conversationContext = extractConversationContext()
    
    // 构建迭代提示
    let iterationPrompt = `请基于以下迭代建议对研究方案进行优化：

迭代建议：${suggestion}

当前研究方案：
${JSON.stringify({
  title: currentPlanState.title || '定量研究方案',
  hypotheses: currentPlanState.hypotheses || [],
  experimentalDesign: currentPlanState.experimentalDesign || '',
  analysisMethod: currentPlanState.analysisMethod || '',
  expectedResults: currentPlanState.expectedResults || ''
}, null, 2)}`

    // 如果有用户需求，添加到迭代提示中
    if (conversationContext.hasUserRequirements) {
      iterationPrompt += `

用户研究需求：
${conversationContext.userRequirements}

研究背景和上下文：
${conversationContext.researchContext}

请特别注意：
1. 确保优化后的方案更好地满足用户的具体研究需求
2. 在保持科学严谨性的同时，优先考虑用户提到的研究目标和偏好
3. 结合评估建议和用户需求进行综合优化`
    }

    iterationPrompt += `

请按照以下格式返回优化后的方案：
#研究假设：<优化后的研究假设>
#实验设计：<优化后的实验设计>
#数据分析：<优化后的数据分析方法>
#结果呈现：<优化后的结果呈现方式>

注意：
1. 重点优化评估中指出的问题部分
2. 保持方案的整体一致性
3. 确保优化后的方案更加科学严谨
4. 如果有用户需求，确保优化后的方案更好地满足这些需求
5. 必须按照上述格式返回完整的优化方案`

    console.log('迭代提示包含用户需求:', conversationContext.hasUserRequirements)
    
    // 发送消息到对话
    await sendMessage(iterationPrompt)

  } catch (error) {
    console.error('迭代方案失败:', error)
    alert('迭代方案失败，请重试')
    isIterating.value = false
  }
  // 注意：不在这里重置isIterating，让解析成功时再重置，避免过早重置导致解析逻辑失效
}

// 带建议的部分迭代
const iterateSectionPlan = async (section, suggestion) => {
  if (isIterating.value || !currentPlanState) return
  
  try {
    isIterating.value = true
    
    console.log(`开始迭代${section}部分，建议:`, suggestion)
    
    // 获取部分名称和内容
    const sectionName = getSectionNameInChinese(section)
    let sectionContent = ''
    
    switch (section) {
      case 'hypothesis':
        sectionContent = currentPlanState.hypotheses ? currentPlanState.hypotheses.join('\n') : ''
        break
      case 'design':
        sectionContent = currentPlanState.experimentalDesign || ''
        break
      case 'analysis':
        sectionContent = currentPlanState.analysisMethod || ''
        break
      case 'results':
        sectionContent = currentPlanState.expectedResults || ''
        break
      default:
        alert('不支持的部分')
        isIterating.value = false
        return
    }
    
    if (!sectionContent.trim()) {
      alert(`当前${sectionName}部分内容为空，无法进行迭代`)
      isIterating.value = false
      return
    }
    
    // 提取对话历史中的用户需求
    const conversationContext = extractConversationContext()
    
    // 构建迭代提示
    let iterationPrompt = `请基于以下迭代建议，对研究方案的"${sectionName}"部分进行优化，并返回完整的研究方案：

迭代建议：${suggestion}

当前完整研究方案：
#研究假设：
${currentPlanState.hypotheses ? currentPlanState.hypotheses.join('\n') : ''}

#实验设计：
${currentPlanState.experimentalDesign || ''}

#数据分析：
${currentPlanState.analysisMethod || ''}

#结果呈现：
${currentPlanState.expectedResults || ''}

需要重点优化的部分：${sectionName}

迭代要求：
1. 严格按照用户的迭代建议优化"${sectionName}"部分
2. 保持其他三个部分的内容不变（可以做必要的协调调整）
3. 确保所有部分之间的逻辑一致性`
    
    // 如果有用户需求，添加到迭代提示中
    if (conversationContext.hasUserRequirements) {
      iterationPrompt += `
4. 确保优化后的内容符合用户的研究需求

用户研究需求：
${conversationContext.userRequirements}

研究背景和上下文：
${conversationContext.researchContext}`
    }
    
    iterationPrompt += `

请按照以下格式返回完整的优化后方案：
#研究假设：<研究假设内容>
#实验设计：<实验设计内容>
#数据分析：<数据分析内容>
#结果呈现：<结果呈现内容>

⚠️ **重要要求：**
- 必须返回完整的4个部分
- 重点优化"${sectionName}"部分，其他部分保持原样或做必要的协调调整
- 必须使用Markdown格式
- 内容要详细具体，符合学术规范
- 严格按照上述格式返回，不要添加其他说明`
    
    console.log(`发送${sectionName}部分迭代请求`)
    
    // 发送消息到对话
    await sendMessage(iterationPrompt)
    
    // 显示提示消息
    setTimeout(() => {
      alert(`${sectionName}部分迭代请求已发送，请等待AI助手生成优化内容。`)
    }, 500)
    
  } catch (error) {
    console.error(`迭代${section}部分失败:`, error)
    alert(`迭代失败，请重试`)
    isIterating.value = false
  }
}

// 查询统计方法
const queryStatisticalMethod = async () => {
  if (!statisticalMethodQuery.value.trim()) {
    alert('请输入要查询的统计方法名称')
    return
  }

  isQuerying.value = true
  statisticalMethodResult.value = ''

  try {
    console.log('🔍 查询统计方法:', statisticalMethodQuery.value.trim())
    
    const response = await fetch('/api/query-statistical-method', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        method: statisticalMethodQuery.value.trim()
      })
    })

    if (!response.ok) {
      throw new Error('查询失败，请稍后重试')
    }

    const data = await response.json()
    console.log('📋 查询响应:', data)
    
    if (data.success) {
      console.log('✅ 查询成功，解释内容长度:', data.explanation?.length || 0)
      console.log('📝 解释内容前200字符:', data.explanation?.substring(0, 200) || '')
      
      statisticalMethodResult.value = data.explanation
      
      // 验证渲染结果
      setTimeout(() => {
        console.log('🎨 当前渲染结果:', renderedStatisticalMethodResult.value?.substring(0, 300) || '')
      }, 100)
    } else {
      throw new Error(data.error || '查询失败，请稍后重试')
    }
  } catch (error) {
    console.error('❌ 查询统计方法失败:', error)
    alert(error.message)
  } finally {
    isQuerying.value = false
  }
}

// 生成来源介绍
const generateSourceIntroduction = async () => {
  if (isGeneratingSource.value) return
  
  // 检查是否有生成的方案
  if (!hasGeneratedPlan.value) {
    alert('请先生成研究方案，再生成来源介绍')
    return
  }
  
  // 检查是否有参考文献
  const referencedPapers = Array.from(papersState.referencedPapersList)
  if (referencedPapers.length === 0) {
    alert('请先选择参考文献，再生成来源介绍')
    return
  }
  
  isGeneratingSource.value = true
  
  try {
    // 获取当前部分的内容
    let currentSectionContent = ''
    let sectionName = ''
    
    switch (activeSection.value) {
      case 'hypothesis':
        currentSectionContent = currentPlanState.hypotheses ? currentPlanState.hypotheses.join('\n') : ''
        sectionName = '研究假设'
        break
      case 'design':
        currentSectionContent = currentPlanState.experimentalDesign || ''
        sectionName = '实验设计'
        break
      case 'analysis':
        currentSectionContent = currentPlanState.analysisMethod || ''
        sectionName = '数据分析'
        break
      case 'results':
        currentSectionContent = currentPlanState.expectedResults || ''
        sectionName = '结果呈现'
        break
      default:
        alert('当前部分不支持生成来源介绍')
        return
    }
    
    if (!currentSectionContent.trim()) {
      alert(`当前${sectionName}部分内容为空，无法生成来源介绍`)
      return
    }
    
    // 构建参考文献信息
    let referencesInfo = ''
    for (let i = 0; i < referencedPapers.length; i++) {
      const paper = referencedPapers[i]
      referencesInfo += `\n参考文献${i + 1}：`
      referencesInfo += `\n标题：${paper.title}`
      referencesInfo += `\n摘要：${paper.abstract || paper.summary || '无摘要'}`
      
      // 获取研究方法总结
      if (paper.researchMethod) {
        referencesInfo += `\n研究方法总结：${paper.researchMethod}`
      } else {
        // 如果没有研究方法总结，尝试从缓存中获取
        try {
          const response = await fetch('/api/paper/get-cached-method', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: paper.title,
              doi: paper.doi || null
            })
          })
          
          if (response.ok) {
            const result = await response.json()
            if (result.success && result.methodSummary) {
              referencesInfo += `\n研究方法总结：${result.methodSummary}`
              // 更新论文对象
              paper.researchMethod = result.methodSummary
            } else {
              referencesInfo += `\n研究方法总结：暂无`
            }
          } else {
            referencesInfo += `\n研究方法总结：暂无`
          }
        } catch (error) {
          console.error('获取研究方法总结失败:', error)
          referencesInfo += `\n研究方法总结：暂无`
        }
      }
      referencesInfo += '\n'
    }
    
    // 构建发送给Coze的提示
    let prompt = `我将为你提供一个研究方案，以及研究方案参考的一些参考文献。请分析以下研究方案的"${sectionName}"部分参考了哪些参考文献的研究方法内容，并生成一个简洁的来源介绍。

研究方案的${sectionName}部分：
${currentSectionContent}

参考文献信息：${referencesInfo}`

    // 如果有用户需求，添加到提示中
    const conversationContext = extractConversationContext()
    if (conversationContext.hasUserRequirements) {
      prompt += `

用户研究需求：
${conversationContext.userRequirements}

研究背景和上下文：
${conversationContext.researchContext}`
    }

    prompt += `

请分析${sectionName}部分具体参考了哪些文献的哪些研究方法要素，并生成一个200-300字的来源介绍，说明：
1. 该部分主要参考了哪些文献
2. 具体借鉴了这些文献的哪些研究方法要素
3. 如何结合这些方法要素形成当前的方案设计`

    // 如果有用户需求，添加个性化要求
    if (conversationContext.hasUserRequirements) {
      prompt += `
4. 如何结合用户的具体研究需求来选择和调整这些方法要素`
    }

    prompt += `

请用学术性的语言，简洁明了地说明来源和参考依据。`

    console.log('发送来源介绍生成请求:', prompt.substring(0, 200) + '...')
    console.log('来源介绍生成包含用户需求:', conversationContext.hasUserRequirements)
    
    // 调用Coze API
    const response = await fetch('/api/coze-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: prompt,
        conversation_id: `source_intro_${activeSection.value}_${Date.now()}`
      })
    })
    
    if (!response.ok) {
      throw new Error('生成来源介绍失败，请稍后重试')
    }
    
    const data = await response.json()
    
    if (data.success && data.reply) {
      // 保存来源介绍到全局状态
      updateSourceIntroduction(activeSection.value, data.reply)
      console.log(`成功生成${sectionName}部分的来源介绍`)
    } else {
      throw new Error(data.error || '生成来源介绍失败')
    }
    
  } catch (error) {
    console.error('生成来源介绍失败:', error)
    alert(error.message || '生成来源介绍失败，请稍后重试')
  } finally {
    isGeneratingSource.value = false
  }
}

// 生成方法介绍
const generateMethodIntroduction = async () => {
  if (isGeneratingMethod.value) return
  
  // 检查是否有生成的方案
  if (!hasGeneratedPlan.value) {
    alert('请先生成研究方案，再生成方法介绍')
    return
  }
  
  // 检查数据分析部分是否有内容
  const analysisContent = currentPlanState.analysisMethod || ''
  if (!analysisContent.trim()) {
    alert('数据分析部分内容为空，无法生成方法介绍')
    return
  }
  
  isGeneratingMethod.value = true
  
  try {
    // 构建发送给Coze的提示
    let prompt = `我将为你提供一个研究方案的数据分析部分内容。请分析其中使用的研究方法和统计分析方法，并生成一个详细的方法介绍。

研究方案的数据分析部分：
${analysisContent}`

    // 如果有用户需求，添加到提示中
    const conversationContext = extractConversationContext()
    if (conversationContext.hasUserRequirements) {
      prompt += `

用户研究需求：
${conversationContext.userRequirements}

研究背景和上下文：
${conversationContext.researchContext}`
    }

    prompt += `

请基于上述数据分析内容，生成一个300-500字的方法介绍，包括：
1. 数据分析的总体策略和思路
2. 具体使用的统计方法及其适用场景
3. 数据处理和分析的步骤流程
4. 各种统计方法的作用和意义
5. 分析方法的优势和局限性`

    // 如果有用户需求，添加个性化要求
    if (conversationContext.hasUserRequirements) {
      prompt += `
6. 这些分析方法如何有效回答用户的具体研究问题
7. 方法选择如何体现对用户研究需求的考虑`
    }

    prompt += `

请用学术性的语言，清晰详细地介绍这些分析方法的原理、适用性和实施步骤。`

    console.log('发送方法介绍生成请求:', prompt.substring(0, 200) + '...')
    console.log('方法介绍生成包含用户需求:', conversationContext.hasUserRequirements)
    
    // 调用Coze API
    const response = await fetch('/api/coze-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: prompt,
        conversation_id: `method_intro_${Date.now()}`
      })
    })
    
    if (!response.ok) {
      throw new Error('生成方法介绍失败，请稍后重试')
    }
    
    const data = await response.json()
    
    if (data.success && data.reply) {
      // 保存生成的方法介绍
      generatedMethodIntro.value = data.reply
      console.log('成功生成方法介绍')
    } else {
      throw new Error(data.error || '生成方法介绍失败')
    }
    
  } catch (error) {
    console.error('生成方法介绍失败:', error)
    alert(error.message || '生成方法介绍失败，请稍后重试')
  } finally {
    isGeneratingMethod.value = false
  }
}

// 应用当前历史方案为当前方案
const applyHistoryPlan = () => {
  if (historyState.currentViewingPlan) {
    // 将当前历史方案数据保存为新的当前方案
    const currentPlan = { ...currentPlanState }
    const planId = historyState.currentViewingPlan.id
    const sourceIntroductions = historyState.currentViewingPlan.sourceIntroductions
    
    // 退出历史查看模式
    isViewingHistoryPlan.value = false
    clearCurrentViewingPlan()
    
    // 清空原始数据记录，因为现在这就是新的当前方案
    originalPlan.value = null
    
    // 使用全局方法应用方案，传递方案ID和来源介绍
    applyPlanAsCurrentPlan(currentPlan, planId, sourceIntroductions)
    
    // 不再添加到历史记录，因为这个方案已经在历史记录中了
    
    console.log('应用历史方案为当前方案，方案ID:', planId)
    alert('历史方案已应用为当前方案！')
  }
}

// 显示迭代对话框
const showIterateDialog = (section) => {
  if (!currentPlanState || !hasGeneratedPlan.value) {
    alert('请先生成研究方案')
    return
  }
  
  iteratingSection.value = section
  iterateSuggestion.value = ''
  selectedPresetSuggestion.value = ''
  showIterateDialogModal.value = true
}

// 关闭迭代对话框
const closeIterateDialog = () => {
  showIterateDialogModal.value = false
  iteratingSection.value = ''
  iterateSuggestion.value = ''
  selectedPresetSuggestion.value = ''
}

// 获取迭代对话框标题
const getIterateDialogTitle = () => {
  const sectionName = getSectionNameInChinese(iteratingSection.value)
  return sectionName === '完整方案' ? '迭代完整研究方案' : `迭代${sectionName}部分`
}

// 获取部分名称的中文映射
const getSectionNameInChinese = (section) => {
  const sectionMap = {
    'full': '完整方案',
    'hypothesis': '研究假设',
    'design': '实验设计',
    'analysis': '数据分析',
    'results': '结果呈现'
  }
  return sectionMap[section] || section
}

// 获取预设建议
const getPresetSuggestions = () => {
  const section = iteratingSection.value
  
  // 基础建议（所有部分都有）
  const baseSuggestions = [
    '自动迭代优化',
    '提高科学严谨性',
    '增加更多细节',
    '简化表述'
  ]
  
  // 特定部分的建议
  const sectionSpecificSuggestions = {
    'full': [
      '整体优化各部分的一致性',
      '强化研究的创新性',
      '提升方案的可操作性',
      '增强理论依据'
    ],
    'hypothesis': [
      '使假设更加具体明确',
      '增加理论支撑',
      '提高假设的可验证性',
      '优化变量定义'
    ],
    'design': [
      '细化实验步骤',
      '优化样本选择策略',
      '改进控制变量设置',
      '增加实验的可重复性'
    ],
    'analysis': [
      '增加统计方法的详细说明',
      '优化数据处理流程',
      '补充效应量分析',
      '完善统计假设检验'
    ],
    'results': [
      '增加可视化呈现方式',
      '优化结果解释的逻辑',
      '补充结果的实践意义',
      '完善结论的表述'
    ]
  }
  
  return [...baseSuggestions, ...(sectionSpecificSuggestions[section] || [])]
}

// 选择预设建议
const selectPresetSuggestion = (suggestion) => {
  selectedPresetSuggestion.value = suggestion
  iterateSuggestion.value = suggestion
}

// 确认迭代
const confirmIterate = async () => {
  if (!iterateSuggestion.value.trim()) {
    alert('请输入迭代建议')
    return
  }
  
  // 关闭对话框
  const section = iteratingSection.value
  const suggestion = iterateSuggestion.value
  closeIterateDialog()
  
  // 调用迭代函数
  if (section === 'full') {
    await iteratePlanWithSuggestion(suggestion)
  } else {
    await iterateSectionPlan(section, suggestion)
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

/* 图片样式 */
.prose img {
  max-width: 100% !important;
  height: auto !important;
  margin: 0.5rem 0 !important;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

/* LaTeX公式图片样式 - 行内公式 */
.prose img[src*="yuque/__latex"],
.prose .latex-formula,
.prose .latex-formula-inline {
  display: inline-block !important;
  margin: 0 2px !important;
  vertical-align: middle !important;
  box-shadow: none !important;
  border-radius: 0 !important;
  background: transparent !important;
  max-height: 1.5em !important;
  border: none !important;
}

/* LaTeX公式图片样式 - 行间公式 */
.prose .latex-formula-display {
  display: block !important;
  margin: 0.75rem auto !important;
  text-align: center !important;
  box-shadow: none !important;
  border-radius: 0 !important;
  background: transparent !important;
  max-height: 10em !important;
  max-width: 100% !important;
  height: auto !important;
  border: none !important;
  padding: 0.25rem 0 !important;
}

/* 自适应LaTeX公式尺寸 */
.prose img.latex-formula-display[style*="max-height: none"] {
  max-height: none !important;
}

/* 大型公式的额外样式 */
.prose .latex-formula-display {
  transition: all 0.2s ease !important;
}

.prose .latex-formula-display:hover {
  transform: scale(1.05) !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
  border-radius: 4px !important;
  background: rgba(249, 250, 251, 0.8) !important;
  padding: 0.5rem !important;
}

/* 普通markdown图片样式 */
.prose .markdown-image {
  max-width: 100% !important;
  height: auto !important;
  margin: 0.5rem 0 !important;
  border-radius: 0.25rem !important;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1) !important;
}

/* 确保所有图片都能正确加载 */
.prose img {
  display: inline-block !important;
  max-width: 100% !important;
  height: auto !important;
}

/* 表格样式 */
.prose .table-container {
  overflow-x: auto !important;
  margin: 1rem 0 !important;
  border-radius: 0.5rem !important;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1) !important;
}

.prose .markdown-table {
  width: 100% !important;
  border-collapse: collapse !important;
  font-size: 0.875rem !important;
}

.prose .markdown-table th {
  background-color: #f9fafb !important;
  padding: 0.75rem !important;
  border: 1px solid #e5e7eb !important;
  font-weight: 600 !important;
  text-align: left !important;
  color: #374151 !important;
}

.prose .markdown-table td {
  padding: 0.75rem !important;
  border: 1px solid #e5e7eb !important;
  color: #6b7280 !important;
}

.prose .markdown-table tr:nth-child(even) {
  background-color: #f9fafb !important;
}

.prose .markdown-table tr:hover {
  background-color: #f3f4f6 !important;
}
</style> 