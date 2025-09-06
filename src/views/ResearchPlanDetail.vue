<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <main class="flex-1 max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-12 gap-8">
        <!-- 左侧聊天框 -->
        <div class="col-span-5 h-[calc(100vh-10rem)]">
          <ChatBox ref="chatBoxRef" pageContext="research-plan" />
          
          <!-- 生成研究方案按钮 -->
          <div class="mt-1 px-6">
            <button
              ref="generatePlanBtnRef"
              @click="showResearchPlanDialog"
              :disabled="isGenerating"
              class="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm font-medium"
            >
              <svg v-if="isGenerating" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 818-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
              </svg>
              <span>{{ isGenerating ? 'Generating...' : 'Generate Quantitative Research Proposal' }}</span>
            </button>
            
            <!-- 参考文献状态显示 -->
            <div class="mt-3 text-sm text-center">
              <!-- 生成状态提示 -->
              <div v-if="isGenerating" class="text-blue-600 mb-2">
                <svg class="w-4 h-4 inline mr-1 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                Waiting for AI response, please wait...
              </div>
              
              <div v-if="papersState.referencedPapers.size > 0" class="text-purple-600">
                <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Selected {{ papersState.referencedPapers.size }} reference papers
              </div>
              <div v-else class="text-gray-500">
                <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                No reference papers (can be selected from the related papers page)
              </div>
            </div>
          </div>
        </div>

        <!-- 研究方案详情 -->
        <div class="col-span-7 h-[calc(100vh-10rem)] overflow-y-auto custom-scrollbar">
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
                  <h4 class="text-sm font-medium text-blue-900">Viewing Historical Plan</h4>
                  <p class="text-sm text-blue-700">{{ historyState.currentViewingPlan.title }}</p>
                                      <p class="text-xs text-blue-600">Created: {{ historyState.currentViewingPlan.createdAt }}</p>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <button 
                  @click="applyHistoryPlan"
                  class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                >
                  Apply This Plan
                </button>
                <button 
                  @click="exitHistoryView"
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Return to Current Plan
                </button>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="space-y-6">
              <!-- 实验方案部分 -->
              <div class="bg-white rounded-xl shadow-sm p-6">
                <!-- 方案导航按钮 -->
                <div class="flex justify-between items-center mb-4 pb-1">
                  <button
                    v-for="section in sections"
                    :key="section.id"
                    :ref="section.id === 'full' ? 'fullSectionBtnRef' : null"
                    @click="activeSection = section.id"
                    class="px-3 py-1.5 rounded text-xs font-bold transition-colors whitespace-nowrap flex-1 mx-1 text-center"
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
                  <div class="flex justify-between items-center mb-4">
                    <h1 class="text-xl font-bold text-gray-900">{{ hasGeneratedPlan ? currentPlanState.title : 'Quantitative Research Proposal' }}</h1>
                    <!-- 按钮组 -->
                    <div v-if="hasGeneratedPlan" class="flex space-x-2">
                      <!-- Comparison按钮 - 橙色 -->
                      <button
                        ref="planComparisonBtnRef"
                        @click="showPlanComparison"
                        class="px-3 py-1.5 text-xs bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors flex items-center justify-center space-x-1 shadow-sm min-w-[80px]"
                      >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                        </svg>
                        <span>Comparison</span>
                      </button>
                      
                      <!-- Evaluation按钮 - 蓝色 -->
                      <button
                        ref="evaluateBtnRef"
                        @click="evaluatePlan"
                        :disabled="isEvaluating"
                        class="px-3 py-1.5 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1 shadow-sm min-w-[80px]"
                      >
                        <svg v-if="isEvaluating" class="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 818-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <svg v-else class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span>{{ isEvaluating ? 'Evaluating...' : 'Evaluation' }}</span>
                      </button>
                      
                      <!-- Iteration按钮 - 绿色 -->
                      <button
                        ref="iterateBtnRef"
                        @click="showIterateDialog('full')"
                        :disabled="isIterating"
                        class="px-3 py-1.5 text-xs bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1 shadow-sm min-w-[80px]"
                      >
                        <svg v-if="isIterating" class="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 818-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <svg v-else class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                        </svg>
                        <span>{{ isIterating ? 'Iterating...' : 'Iteration' }}</span>
                      </button>
                    </div>
                  </div>
                  <div class="space-y-6">
                    <!-- 如果有解析的plan数据，显示四个字段的内容 -->
                    <div v-if="hasGeneratedPlan">
                      <div v-if="currentPlanState.hypotheses && currentPlanState.hypotheses.length > 0">
                        <h3 class="text-lg font-semibold text-gray-900 mb-3">Research Hypotheses</h3>
                        <div class="space-y-2">
                          <div v-for="(hypothesis, index) in renderedHypotheses" :key="index" 
                               class="p-4 bg-gray-50 rounded-lg">
                            <div class="text-gray-900 prose prose-sm max-w-none" v-html="hypothesis"></div>
                          </div>
                        </div>
                      </div>
                      
                      <div v-if="currentPlanState.experimentalDesign">
                        <h3 class="text-lg font-semibold text-gray-900 mb-3">Experimental Design</h3>
                        <div class="text-gray-600 leading-relaxed prose prose-sm max-w-none" v-html="renderedExperimentalDesign"></div>
                      </div>
                      
                      <div v-if="currentPlanState.analysisMethod">
                        <h3 class="text-lg font-semibold text-gray-900 mb-3">Data Analysis</h3>
                        <div class="text-gray-600 leading-relaxed prose prose-sm max-w-none" v-html="renderedAnalysisMethod"></div>
                      </div>
                      
                      <div v-if="currentPlanState.expectedResults">
                        <h3 class="text-lg font-semibold text-gray-900 mb-3">Results Presentation</h3>
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
                      <h3 class="text-lg font-medium text-gray-900 mb-2">No experimental proposal generated yet, please generate a research proposal first</h3>
                      <p class="text-gray-500 mb-6 max-w-md mx-auto">
                        You can click the "Generate Quantitative Research Proposal" button on the left, or enter relevant requirements in the chat box to generate a personalized research proposal.
                      </p>
                      <div class="flex justify-center space-x-4 text-sm text-gray-400">
                        <div class="flex items-center">
                          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                          </svg>
                          AI Generation
                        </div>
                        <div class="flex items-center">
                          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                          </svg>
                          Literature-Based
                        </div>
                        <div class="flex items-center">
                          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                          </svg>
                          Structured Output
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="activeSection === 'hypothesis'">
                  <div class="flex justify-between items-center mb-4">
                    <h2 class="text-lg font-semibold text-gray-900">Research Hypotheses</h2>
                    <!-- 分节按钮组 -->
                    <div v-if="hasGeneratedPlan" class="flex space-x-2">
                      <!-- Section Evaluation按钮 - 蓝色 -->
                      <button
                        @click="evaluateSectionPlan('hypothesis')"
                        :disabled="isEvaluatingSection && evaluatingSection === 'hypothesis'"
                        class="px-3 py-1.5 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1 shadow-sm min-w-[80px]"
                      >
                        <svg v-if="isEvaluatingSection && evaluatingSection === 'hypothesis'" class="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 818-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <svg v-else class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span>{{ (isEvaluatingSection && evaluatingSection === 'hypothesis') ? 'Evaluating...' : 'Evaluation' }}</span>
                      </button>
                      
                      <!-- Section Iteration按钮 - 绿色 -->
                      <button
                        @click="showIterateDialog('hypothesis')"
                        :disabled="isIterating"
                        data-section-iterate="hypothesis"
                        class="px-3 py-1.5 text-xs bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1 shadow-sm min-w-[80px]"
                      >
                        <svg v-if="isIterating" class="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 818-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <svg v-else class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                        </svg>
                        <span>{{ isIterating ? 'Iterating...' : 'Iteration' }}</span>
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
                    <p class="text-gray-500">No research hypotheses generated yet, please generate a research proposal first</p>
                  </div>
                </div>
                <div v-if="activeSection === 'design'">
                  <div class="flex justify-between items-center mb-4">
                    <h2 class="text-lg font-semibold text-gray-900">Experimental Design</h2>
                    <!-- 分节按钮组 -->
                    <div v-if="hasGeneratedPlan" class="flex space-x-2">
                      <!-- Section Evaluation按钮 - 蓝色 -->
                      <button
                        @click="evaluateSectionPlan('design')"
                        :disabled="isEvaluatingSection && evaluatingSection === 'design'"
                        class="px-3 py-1.5 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1 shadow-sm min-w-[80px]"
                      >
                        <svg v-if="isEvaluatingSection && evaluatingSection === 'design'" class="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 818-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <svg v-else class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span>{{ (isEvaluatingSection && evaluatingSection === 'design') ? 'Evaluating...' : 'Evaluation' }}</span>
                      </button>
                      
                      <!-- Section Iteration按钮 - 绿色 -->
                      <button
                        @click="showIterateDialog('design')"
                        :disabled="isIterating"
                        data-section-iterate="design"
                        class="px-3 py-1.5 text-xs bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1 shadow-sm min-w-[80px]"
                      >
                        <svg v-if="isIterating" class="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 818-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <svg v-else class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                        </svg>
                        <span>{{ isIterating ? 'Iterating...' : 'Iteration' }}</span>
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
                    <p class="text-gray-500">No experimental design generated yet, please generate a research proposal first</p>
                  </div>
                </div>
                <div v-if="activeSection === 'analysis'">
                  <div class="flex justify-between items-center mb-4">
                    <h2 class="text-lg font-semibold text-gray-900">Data Analysis</h2>
                    <!-- 分节按钮组 -->
                    <div v-if="hasGeneratedPlan" class="flex space-x-2">
                      <!-- Section Evaluation按钮 - 蓝色 -->
                      <button
                        @click="evaluateSectionPlan('analysis')"
                        :disabled="isEvaluatingSection && evaluatingSection === 'analysis'"
                        class="px-3 py-1.5 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1 shadow-sm min-w-[80px]"
                      >
                        <svg v-if="isEvaluatingSection && evaluatingSection === 'analysis'" class="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 818-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <svg v-else class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span>{{ (isEvaluatingSection && evaluatingSection === 'analysis') ? 'Evaluating...' : 'Evaluation' }}</span>
                      </button>
                      
                      <!-- Section Iteration按钮 - 绿色 -->
                      <button
                        @click="showIterateDialog('analysis')"
                        :disabled="isIterating"
                        data-section-iterate="analysis"
                        class="px-3 py-1.5 text-xs bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1 shadow-sm min-w-[80px]"
                      >
                        <svg v-if="isIterating" class="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 818-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <svg v-else class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                        </svg>
                        <span>{{ isIterating ? 'Iterating...' : 'Iteration' }}</span>
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
                    <p class="text-gray-500">No data analysis proposal generated yet, please generate a research proposal first</p>
                  </div>
                </div>
                <div v-if="activeSection === 'results'">
                  <div class="flex justify-between items-center mb-4">
                    <h2 class="text-lg font-semibold text-gray-900">Expected Results</h2>
                    <!-- 分节按钮组 -->
                    <div v-if="hasGeneratedPlan" class="flex space-x-2">
                      <!-- Section Evaluation按钮 - 蓝色 -->
                      <button
                        @click="evaluateSectionPlan('results')"
                        :disabled="isEvaluatingSection && evaluatingSection === 'results'"
                        class="px-3 py-1.5 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1 shadow-sm min-w-[80px]"
                      >
                        <svg v-if="isEvaluatingSection && evaluatingSection === 'results'" class="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 818-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <svg v-else class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span>{{ (isEvaluatingSection && evaluatingSection === 'results') ? 'Evaluating...' : 'Evaluation' }}</span>
                      </button>
                      
                      <!-- Section Iteration按钮 - 绿色 -->
                      <button
                        @click="showIterateDialog('results')"
                        :disabled="isIterating"
                        data-section-iterate="results"
                        class="px-3 py-1.5 text-xs bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1 shadow-sm min-w-[80px]"
                      >
                        <svg v-if="isIterating" class="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 818-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <svg v-else class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                        </svg>
                        <span>{{ isIterating ? 'Iterating...' : 'Iteration' }}</span>
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
                    <p class="text-gray-500">No results presentation proposal generated yet, please generate a research proposal first</p>
                  </div>
                </div>
              </div>



              <!-- 来源和方法介绍卡片 -->
              <div class="bg-white rounded-xl shadow-sm p-8">
                <!-- Source introduction content (only shown for research hypotheses, experimental design, results presentation; data analysis is controlled through sub-navigation) -->
                <div v-if="['hypothesis', 'design', 'results'].includes(activeSection)" class="space-y-4">
                  <div class="flex items-center justify-between mb-3">
                    <h3 class="text-lg font-semibold text-gray-900">Source Introduction</h3>
                    <button
                      ref="sourceIntroBtnRef"
                      @click="generateSourceIntroduction"
                      :disabled="isGeneratingSource"
                      class="px-3 py-1.5 text-xs bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                    >
                      <svg v-if="isGeneratingSource" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                      </svg>
                      <span>{{ isGeneratingSource ? 'Generating...' : 'Generate Source Introduction' }}</span>
                    </button>
                  </div>
                  <div v-if="currentSourceIntroduction" class="text-gray-600 leading-relaxed prose prose-sm max-w-none" v-html="renderedSourceIntroduction"></div>
                  <div v-else class="text-gray-500 italic">
                    Click the "Generate Source Introduction" button to generate source description for the current section based on reference literature
                  </div>
                </div>

                <!-- 数据分析部分的子导航和内容 -->
                <div v-if="activeSection === 'analysis'" class="space-y-6">
                  <!-- 数据分析子导航 -->
                  <div class="flex space-x-4 border-b border-gray-200 pb-4">
                    <button
                      v-for="subSection in analysisSubSections"
                      :key="subSection.id"
                      :ref="subSection.id === 'query' ? 'statisticalQueryBtnRef' : null"
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

                  <!-- Source introduction content -->
                  <div v-if="analysisSubSection === 'source'" class="space-y-4">
                    <div class="flex items-center justify-between mb-3">
                      <h3 class="text-lg font-semibold text-gray-900">Source Introduction</h3>
                      <button
                        ref="sourceIntroBtnRef2"
                        @click="generateSourceIntroduction"
                        :disabled="isGeneratingSource"
                        class="px-3 py-1.5 text-xs bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                      >
                        <svg v-if="isGeneratingSource" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                        </svg>
                        <span>{{ isGeneratingSource ? 'Generating...' : 'Generate Source Introduction' }}</span>
                      </button>
                    </div>
                    <div v-if="currentSourceIntroduction" class="text-gray-600 leading-relaxed prose prose-sm max-w-none" v-html="renderedSourceIntroduction"></div>
                    <div v-else class="text-gray-500 italic">
                      Click the "Generate Source Introduction" button to generate source description for the current section based on reference literature
                    </div>
                  </div>

                  <!-- Method introduction content -->
                  <div v-if="analysisSubSection === 'method'" class="space-y-4">
                    <div class="flex items-center justify-between mb-3">
                      <h3 class="text-lg font-semibold text-gray-900">Method Introduction</h3>
                      <button
                        ref="methodIntroBtnRef"
                        @click="generateMethodIntroduction"
                        :disabled="isGeneratingMethod"
                        class="px-3 py-1.5 text-xs bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                      >
                        <svg v-if="isGeneratingMethod" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                        </svg>
                        <span>{{ isGeneratingMethod ? 'Generating...' : 'Generate Method Introduction' }}</span>
                      </button>
                    </div>
                    
                    <!-- 显示生成的方法介绍或默认提示 -->
                    <div v-if="generatedMethodIntro" class="text-gray-600 leading-relaxed prose prose-sm max-w-none" v-html="renderedGeneratedMethodIntro"></div>
                    <div v-else class="text-gray-500 italic">
                      Click the "Generate Method Introduction" button to intelligently generate detailed research method introduction and statistical analysis method description based on the data analysis section content of the research plan
                    </div>
                  </div>

                  <!-- Statistical method query content -->
                  <div v-if="analysisSubSection === 'query'" class="space-y-6" id="statistical-method-query">
                    <div class="bg-gray-50 p-6 rounded-lg">
                      <h3 class="text-lg font-semibold text-gray-900 mb-4">Statistical Method Lookup</h3>
                      <div class="flex space-x-4">
                        <input
                          ref="statisticalQueryInputRef"
                          v-model="statisticalMethodQuery"
                          type="text"
                          placeholder="Enter statistical method name, e.g.: t-test, ANOVA, regression analysis, etc."
                          class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          @keyup.enter="queryStatisticalMethod"
                        />
                        <button
                          ref="statisticalQueryBtnRef"
                          @click="queryStatisticalMethod"
                          :disabled="isQuerying"
                          class="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                        >
                          <svg v-if="isQuerying" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>{{ isQuerying ? 'Searching...' : 'Search' }}</span>
                        </button>
                      </div>
                      
                      <!-- Test button area -->
                      <div class="flex flex-wrap gap-2 mb-4">
                        <button
                          @click="() => { statisticalMethodQuery = 'one-sample t-test'; queryStatisticalMethod(); }"
                          class="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
                        >
                          Test: One-sample t-test
                        </button>
                      </div>
                      
                      <!-- Query results -->
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
    
    <!-- 新手指引遮罩层 -->
    <div v-if="showTutorial" class="fixed inset-0 bg-black bg-opacity-50 z-[60] transition-opacity duration-300 tutorial-overlay" @click="skipTutorial">
      <!-- 高亮区域 -->
      <div 
        v-if="currentTutorialStep < tutorialSteps.length"
        class="absolute border-2 border-blue-400 bg-blue-50 bg-opacity-20 rounded-lg transition-all duration-500 tutorial-highlight"
        :style="highlightStyle"
      ></div>
      
      <!-- 引导提示框 -->
      <div 
        v-if="currentTutorialStep < tutorialSteps.length"
        class="absolute bg-white rounded-lg shadow-xl p-4 max-w-sm transition-all duration-300 transform tutorial-tooltip"
        :style="tooltipStyle"
        @click.stop
      >
        <div class="flex items-start space-x-3">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center animate-bounce">
              <span class="text-blue-600 font-semibold text-sm">{{ currentTutorialStep + 1 }}</span>
            </div>
          </div>
          <div class="flex-1">
            <h3 class="text-sm font-semibold text-gray-900 mb-1">
              {{ tutorialSteps[currentTutorialStep].title }}
            </h3>
            <p class="text-sm text-gray-600 mb-3 leading-relaxed">
              {{ tutorialSteps[currentTutorialStep].description }}
            </p>
            <div class="flex items-center justify-between">
              <div class="flex space-x-2">
                <button
                  v-if="currentTutorialStep > 0"
                  @click="prevTutorialStep"
                  class="px-3 py-1.5 text-gray-600 text-sm hover:text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Back
                </button>
                <button
                  @click="nextTutorialStep"
                  class="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {{ currentTutorialStep === tutorialSteps.length - 1 ? 'Finish' : 'Understand' }}
                </button>
                <button
                  @click="skipTutorial"
                  class="px-3 py-1.5 text-gray-600 text-sm hover:text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Skip
                </button>
              </div>
              <button
                @click="dontShowAgain"
                class="text-xs text-gray-500 hover:text-gray-700 transition-colors underline"
              >
                Not prompting next time
              </button>
            </div>
            
            <!-- 键盘快捷键提示 -->
            <div class="mt-2 text-xs text-gray-400 text-center">
              <span>Enter: next step</span>
              <span class="mx-2">•</span>
              <span>Esc: Skip</span>
              <span class="mx-2">•</span>
              <span>←→: Steps before and after</span>
            </div>
          </div>
        </div>
        
        <!-- 进度指示器 -->
        <div class="mt-3 pt-2 border-t border-gray-100">
          <div class="flex items-center justify-between text-xs text-gray-500">
            <span>Step {{ currentTutorialStep + 1 }} / {{ tutorialSteps.length }}</span>
            <div class="flex space-x-1">
              <div 
                v-for="(step, index) in tutorialSteps" 
                :key="index"
                class="w-2 h-2 rounded-full transition-colors"
                :class="index <= currentTutorialStep ? 'bg-blue-500' : 'bg-gray-300'"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 重置引导按钮（开发模式） -->
    <div v-if="isDevelopment" class="fixed bottom-4 right-4 z-[58] flex flex-col space-y-2">
      <button
        @click="resetTutorial"
        class="px-3 py-2 bg-gray-800 text-white text-xs rounded-lg hover:bg-gray-700 transition-colors opacity-50 hover:opacity-100"
        title="Reset tutorial status"
      >
        Reset Tutorial
      </button>
      <button
        @click="debugElementRefs"
        class="px-3 py-2 bg-blue-800 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors opacity-50 hover:opacity-100"
        title="Debug element references"
      >
        Debug Elements
      </button>
    </div>
    
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
                Please enter your iteration suggestions, and AI will optimize {{ getSectionNameInEnglish(iteratingSection) }} based on your suggestions
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
            <label class="block text-sm font-medium text-gray-700 mb-3">Quick selection suggestions</label>
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
            <label class="block text-sm font-medium text-gray-700 mb-3">Iterative suggestions</label>
            <textarea
              v-model="iterateSuggestion"
              rows="6"
              class="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all duration-200"
              placeholder="Please enter your iteration suggestions..."
            ></textarea>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="px-8 py-6 border-t border-gray-100 flex justify-end space-x-3">
          <button
            @click="closeIterateDialog"
            class="px-6 py-3 text-gray-700 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors font-medium"
          >
            Cancel
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
            <span>{{ isIterating ? 'Iterating...' : 'Confirm iteration' }}</span>
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
          <h3 class="text-xl font-semibold text-gray-900">Generate research proposal</h3>
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
              <span>Custom Theme</span>
            </div>
          </button>
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
              <span>Intelligent Analysis</span>
            </div>
          </button>
        </div>

        <!-- 自定义主题模式 -->
        <div v-if="researchPlanMode === 'custom'">
          <label class="block text-sm font-medium text-gray-700 mb-3">Enter your research topic or question</label>
          <textarea
            v-model="researchTopicInput"
            placeholder="For example, exploring the impact of artificial intelligence on the learning outcomes of college students .."
            class="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all duration-200"
            rows="4"
          ></textarea>
          <p class="text-xs text-gray-500 mt-2">
            The system will generate a corresponding quantitative research proposal based on the topic you input, combined with references
          </p>
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
              <h4 class="font-medium text-purple-900 mb-2">AI Analysis of User Requirements</h4>
              <p class="text-sm text-purple-700 leading-relaxed">
                The system will automatically analyze research requirements, background and objectives mentioned in your chat history, combined with selected reference literature, to generate personalized quantitative research proposals.
              </p>
              <div class="mt-3 flex items-center space-x-4 text-xs text-purple-600">
                <div class="flex items-center space-x-1">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Analyze Chat History</span>
                </div>
                <div class="flex items-center space-x-1">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Combine References</span>
                </div>
                <div class="flex items-center space-x-1">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Generate Proposal</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 参考文献状态 -->
        <div class="bg-gray-50 rounded-2xl p-4 mb-6">
          <div class="flex items-center space-x-3">
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-700">Reference Papers Status</p>
              <p class="text-xs text-gray-500 mt-0.5">
                {{ papersState.referencedPapers.size > 0 
                  ? `Selected ${papersState.referencedPapers.size} reference papers` 
                  : 'No reference papers (can be selected from related papers page)' }}
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
          Cancel
        </button>
        <button
          @click="confirmGenerateResearchPlan"
          :disabled="researchPlanMode === 'custom' && !researchTopicInput.trim()"
          class="px-6 py-3 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center space-x-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          <span>Start generating</span>
        </button>
      </div>
    </div>
  </div>

  <!-- 方案对比对话框 -->
  <div v-if="showPlanComparisonModal" 
       class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
      <!-- 对话框头部 -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <div class="flex items-center space-x-3">
          <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
          <h2 class="text-xl font-semibold text-gray-900">Solution Comparison</h2>
        </div>
        <button @click="closePlanComparison" 
                class="text-gray-400 hover:text-gray-600 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- 对话框内容 -->
      <div class="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
        <div v-if="planComparisonData" class="space-y-6">
          <!-- 迭代信息 -->
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-medium text-blue-900">
                  Iterative information
                </h3>
                <p class="text-sm text-blue-700 mt-1">
                  Iteration Section: {{ getSectionNameInEnglish(planComparisonData.section) }}
                </p>
                <p class="text-sm text-blue-700">
                  Iteration Suggestions: {{ planComparisonData.suggestion }}
                </p>
                <p class="text-sm text-blue-600">
                  Iteration Time: {{ new Date(planComparisonData.timestamp).toLocaleString() }}
                </p>
              </div>
              <div class="text-right">
                <div class="text-2xl font-bold text-blue-600">
                  {{ planComparisonData.statistics.totalChanges }}
                </div>
                <div class="text-sm text-blue-600">parts have undergone changes</div>
              </div>
            </div>
          </div>

          <!-- 变化统计 -->
          <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div class="bg-white border border-gray-200 rounded-lg p-4 text-center">
                              <div class="text-2xl font-bold text-gray-900">{{ planComparisonData.statistics.titleChanged ? 'Yes' : 'No' }}</div>
                              <div class="text-sm text-gray-600">Title Changes</div>
              </div>
              <div class="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <div class="text-2xl font-bold text-gray-900">{{ planComparisonData.statistics.hypothesesChanged ? 'Yes' : 'No' }}</div>
                <div class="text-sm text-gray-600">Hypothesis Changes</div>
              </div>
              <div class="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <div class="text-2xl font-bold text-gray-900">{{ planComparisonData.statistics.experimentalDesignChanged ? 'Yes' : 'No' }}</div>
                <div class="text-sm text-gray-600">Design Changes</div>
              </div>
              <div class="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <div class="text-2xl font-bold text-gray-900">{{ planComparisonData.statistics.analysisMethodChanged ? 'Yes' : 'No' }}</div>
                <div class="text-sm text-gray-600">Analysis Changes</div>
              </div>
              <div class="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <div class="text-2xl font-bold text-gray-900">{{ planComparisonData.statistics.expectedResultsChanged ? 'Yes' : 'No' }}</div>
                <div class="text-sm text-gray-600">Results Changes</div>
            </div>
          </div>

          <!-- 详细对比内容 -->
          <div class="bg-gray-50 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Detailed Comparison (Left: Original, Right: After Iteration)</h3>
            <div class="mb-4 flex items-center justify-center space-x-6 text-sm">
              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 bg-red-100 rounded-full border border-red-300"></div>
                <span class="text-red-700">Deleted Content</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 bg-green-100 rounded-full border border-green-300"></div>
                <span class="text-green-700">Added Content</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 bg-gray-100 rounded-full border border-gray-300"></div>
                <span class="text-gray-700">Unchanged</span>
              </div>
            </div>
            <div v-html="planComparisonHTML"></div>
          </div>
        </div>
      </div>

      <!-- 对话框底部 -->
      <div class="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
        <button @click="closePlanComparison" 
                class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
                          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import ChatBox from '../components/ChatBox.vue'
import { sendMessage, chatState } from '../stores/chatStore'
import { papersState, addHistoryPlan, historyState, clearCurrentViewingPlan, currentPlanState, updateCurrentPlan, applyPlanAsCurrentPlan, updateSourceIntroduction, getSourceIntroduction, clearSourceIntroductions, storeIterationSnapshot, completeIteration, iterationState, getIterationComparison } from '../stores/chatStore'
import { marked } from 'marked'
import markedKatex from 'marked-katex-extension'
import 'katex/dist/katex.min.css'
import { generateLeftRightComparisonHTML, generateDiffStatistics } from '../utils/textDiff.js'
import { PromptService } from '../services/promptService.js'

const router = useRouter()
const currentSection = ref('research-plan')
const activeSection = ref('full')
const chatBoxRef = ref(null)
const isGenerating = ref(false)
const lastMessageIdBeforeGenerate = ref(null) // 记录开始生成前的最后一条消息ID
const isViewingHistoryPlan = ref(false) // 是否正在查看历史方案
const originalPlan = ref(null) // 保存原始方案数据
// 已移除：const lastProcessedMessageId = ref(null) // 不再需要，因为已改为明确的解析触发机制
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
const researchPlanMode = ref('custom') // 研究方案生成模式：'auto' 或 'custom'
const researchTopicInput = ref('') // 用户输入的研究主题

// 方案对比相关状态
const showPlanComparisonModal = ref(false) // 是否显示方案对比对话框
const planComparisonData = ref(null) // 方案对比数据
const selectedIterationRecord = ref(null) // 选中的迭代记录

// 方案对比HTML计算属性
const planComparisonHTML = computed(() => {
  if (!planComparisonData.value || !planComparisonData.value.before || !planComparisonData.value.after) {
    return '<div class="text-center text-gray-500 py-8">暂无对比数据</div>'
  }
  
  try {
    return generateLeftRightComparisonHTML(planComparisonData.value.before, planComparisonData.value.after)
  } catch (error) {
    console.error('生成方案对比HTML失败:', error)
    return '<div class="text-center text-red-500 py-8">生成对比内容失败</div>'
  }
})

// 新手指引相关状态
const showTutorial = ref(false)
const currentTutorialStep = ref(0)

// 样例研究方案数据
const sampleResearchPlan = {
  title: 'A Quantitative Research Proposal on the Impact of Social Media Use on College Students\' Learning Efficiency',
  hypotheses: [
    'H1: Social media usage time is negatively correlated with learning efficiency',
    'H2: Different types of social media use have significantly different impacts on learning efficiency',
    'H3: Social media usage motivation moderates the relationship between study time and learning efficiency'
  ],
  experimentalDesign: `**Participant Characteristics:**
- Sample size: Plan to recruit 300 college students, calculated based on effect size 0.25, α=0.05, power 0.8
- Age composition: 18-25 years old, average age 21.5 years
- Gender ratio: Male to female ratio approximately 1:1
- Academic background: Covers different majors including STEM, liberal arts, arts, etc.
- Recruitment method: Recruit through campus announcements, social media, course groups, etc.
- Inclusion criteria: Full-time college students with smartphone usage experience
- Exclusion criteria: History of serious mental illness, inability to complete experimental tasks

**Grouping Method:**
- Research design: 2×3 mixed design
- Independent variable 1: Social media usage time (high usage group vs low usage group)
- Independent variable 2: Social media type (entertainment, educational, social)
- Dependent variable: Learning efficiency indicators (task completion time, accuracy rate, attention concentration)
- Control variables: Age, gender, academic background, study habits, sleep quality

**Experimental Procedure:**
1. Pre-experiment phase (30 minutes):
   - Sign informed consent form
   - Complete basic information questionnaire
   - Complete learning ability baseline test
   - Install experimental monitoring software

2. Experimental phase (7 days):
   - Days 1-3: Normal social media use, system records usage data
   - Day 4: Complete learning task test
   - Days 5-7: Continue recording usage data
   - Daily completion of usage diary and emotional state questionnaire

3. Post-test phase (60 minutes):
   - Complete learning efficiency test
   - Fill out social media usage motivation questionnaire
   - Conduct in-depth interviews (randomly select 30% of participants)`,
  analysisMethod: `**Data Collection Types:**
1. Subjective rating data: Learning efficiency self-assessment scale, usage motivation questionnaire, attention assessment
2. Behavioral data: Usage duration, frequency, task completion time, accuracy rate

**Statistical Analysis Methods:**
1. Descriptive statistics: Calculate means, standard deviations, distribution characteristics
2. Correlation analysis: Pearson correlation coefficient analysis of relationship between usage time and learning efficiency
3. Analysis of variance: Two-factor mixed design ANOVA to analyze interaction effects`,
  expectedResults: `**Expected Differences and Trends:**
1. Main dependent variable difference predictions:
   - Learning efficiency in high usage group significantly lower than low usage group (p < 0.05)
   - Entertainment social media users have the lowest learning efficiency
   - Educational social media users have relatively higher learning efficiency
   - Usage time negatively correlated with learning efficiency (r = -0.35)

2. Interaction effect predictions:
   - Significant interaction effect between social media type and usage time
   - Entertainment social media has the greatest negative impact in high usage group
   - Educational social media may have positive impact in low usage group

3. Moderation effect predictions:
   - Usage motivation significantly moderates the relationship between study time and efficiency
   - Users with strong learning motivation show less negative impact of usage time on efficiency

**Result Presentation Methods:**
1. Descriptive statistical charts:
   - Box plots: Show learning efficiency distribution across different usage groups
   - Bar charts: Compare usage duration of different social media types
   - Scatter plots: Display correlation between usage time and learning efficiency

2. Inferential statistical charts:
   - Interaction effect plots: Show interaction between social media type and usage time
   - Moderation effect plots: Display the moderating role of usage motivation
   - Effect size forest plots: Show effect sizes of various statistical tests

3. Auxiliary interpretation charts:
   - Path diagrams: Show causal relationships between variables
   - Heat maps: Display correlation matrix between variables
   - Time series plots: Show changes in usage patterns over 7 days

**Result Interpretation Logic:**
- Validate the reasonableness of research hypotheses through multi-dimensional data
- Explain the theoretical significance of findings in combination with previous research
- Analyze the guiding value of results for educational practice
- Discuss research limitations and future research directions`,
  isGenerated: true,
  lastUpdated: new Date().toISOString()
}

// 开发模式判断
const isDevelopment = computed(() => {
  return process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost'
})

// 引用DOM元素
const generatePlanBtnRef = ref(null)
const fullSectionBtnRef = ref(null)
const evaluateBtnRef = ref(null)
const iterateBtnRef = ref(null)
const sourceIntroBtnRef = ref(null)
const sourceIntroBtnRef2 = ref(null)
const methodIntroBtnRef = ref(null)
const statisticalQueryBtnRef = ref(null)
const statisticalQueryInputRef = ref(null)
const planComparisonBtnRef = ref(null) // 方案对比按钮

// 引导步骤定义
const tutorialSteps = [
    {
    title: 'Generate Quantitative Research Proposal',
    description: 'Click this button to generate a quantitative research proposal. AI will intelligently generate a complete research design based on your requirements and reference literature.',
    ref: generatePlanBtnRef
  },
  {
    title: 'Proposal Evaluation Function',
    description: 'Click the "Overall Evaluation" button, and AI will conduct a comprehensive evaluation of your research proposal, including logic, rationality, feasibility, and requirement matching.',
    ref: evaluateBtnRef
  },
  {
    title: 'Overall Proposal Iteration',
    description: 'Click the "Proposal Iteration" button to optimize and improve the entire research proposal. AI will regenerate a more perfect proposal based on your suggestions.',
    ref: iterateBtnRef
  },

  {
    title: 'Plan Comparison Function',
    description: 'After plan iteration, you can view the comparison before and after iteration to understand the improvements of the plan.',
    ref: planComparisonBtnRef
  },
  {
    title: 'Generate Source Introduction',
    description: 'Based on the reference literature you selected, AI can generate source descriptions for the current section to help you understand the research background.',
    getElement: () => {
      // 优先选择数据分析部分的来源介绍按钮
      if (activeSection.value === 'analysis' && analysisSubSection.value === 'source') {
        return sourceIntroBtnRef2.value
      }
      
      // 如果不在数据分析部分，先切换到数据分析的来源介绍子页面
      if (activeSection.value !== 'analysis') {
        activeSection.value = 'analysis'
        return null // 返回null让focusCurrentElement处理重试
      }
      
      // 如果在数据分析部分但不在来源介绍子页面，切换到来源介绍子页面
      if (analysisSubSection.value !== 'source') {
        analysisSubSection.value = 'source'
        return null // 返回null让focusCurrentElement处理重试
      }
      
      // 如果已经在正确的页面，返回来源介绍按钮
      return sourceIntroBtnRef2.value
    }
  },
  {
    title: 'Generate Method Introduction',
    description: 'In the data analysis section, you can generate detailed research method introductions and statistical analysis method descriptions.',
    getElement: () => {
      // 确保在数据分析部分
      if (activeSection.value !== 'analysis') {
        activeSection.value = 'analysis'
        return null // 返回null让focusCurrentElement处理重试
      }
      
      // 确保在方法介绍子页面
      if (analysisSubSection.value !== 'method') {
        analysisSubSection.value = 'method'
        return null // 返回null让focusCurrentElement处理重试
      }
      
      return methodIntroBtnRef.value
    }
  },
  {
    title: 'Statistical Method Lookup',
    description: 'In the data analysis section, you can query detailed descriptions and usage scenarios of various statistical methods.',
    getElement: () => {
      // 确保在数据分析部分
      if (activeSection.value !== 'analysis') {
        activeSection.value = 'analysis'
        return null // 返回null让focusCurrentElement处理重试
      }
      
      // 确保在统计方法查询子页面
      if (analysisSubSection.value !== 'query') {
        analysisSubSection.value = 'query'
        return null // 返回null让focusCurrentElement处理重试
      }
      
      return statisticalQueryBtnRef.value
    }
  }
]

// 计算高亮区域样式
const highlightStyle = computed(() => {
  if (currentTutorialStep.value >= tutorialSteps.length) return {}
  
  const currentStep = tutorialSteps[currentTutorialStep.value]
  const element = currentStep.getElement ? currentStep.getElement() : currentStep.ref.value
  
  if (!element || typeof element.getBoundingClientRect !== 'function') {
    console.warn('元素不存在或无法获取位置:', currentStep.title, element)
    return {}
  }
  
  try {
    const rect = element.getBoundingClientRect()
    return {
      top: `${rect.top - 8}px`,
      left: `${rect.left - 8}px`,
      width: `${rect.width + 16}px`,
      height: `${rect.height + 16}px`
    }
  } catch (error) {
    console.warn('计算高亮区域样式失败:', error)
    return {}
  }
})

// 计算提示框位置
const tooltipStyle = computed(() => {
  if (currentTutorialStep.value >= tutorialSteps.length) return {}
  
  const currentStep = tutorialSteps[currentTutorialStep.value]
  const element = currentStep.getElement ? currentStep.getElement() : currentStep.ref.value
  
  if (!element || typeof element.getBoundingClientRect !== 'function') return {}
  
  try {
    const rect = element.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const windowWidth = window.innerWidth
    
    // 计算提示框位置，避免超出屏幕
    let top = rect.bottom + 20
    let left = rect.left
    
    // 如果下方空间不够，显示在上方
    if (top + 200 > windowHeight) {
      top = rect.top - 220
    }
    
    // 如果右侧空间不够，调整位置
    if (left + 320 > windowWidth) {
      left = windowWidth - 340
    }
    
    return {
      top: `${Math.max(20, top)}px`,
      left: `${Math.max(20, left)}px`
    }
  } catch (error) {
    console.warn('计算提示框位置失败:', error)
    return {}
  }
})

// 检查是否需要显示新手指引
const shouldShowTutorial = () => {
  const tutorialShown = localStorage.getItem('researchPlanDetail_tutorial_shown')
  return tutorialShown !== 'true'
}

// 开始新手指引
const startTutorial = () => {
  if (!shouldShowTutorial()) return
  
  // 确保在正确的初始状态
  activeSection.value = 'full'
  analysisSubSection.value = 'source'
  
  // 如果没有生成方案，使用样例数据
  if (!hasGeneratedPlan.value) {
    console.log('新手指引：使用样例数据')
    Object.assign(currentPlanState, sampleResearchPlan)
  }
  
  showTutorial.value = true
  currentTutorialStep.value = 0
  
  // 等待DOM更新后计算高亮区域
  nextTick(() => {
    setTimeout(() => {
      focusCurrentElement()
    }, 500) // 增加延迟确保页面完全加载
  })
}

// 聚焦到当前步骤的元素
const focusCurrentElement = () => {
  if (currentTutorialStep.value >= tutorialSteps.length) return
  
  const currentStep = tutorialSteps[currentTutorialStep.value]
  
  // 根据步骤设置正确的页面状态
  if (currentTutorialStep.value === 0) {
    // 第一步：生成方案 - 确保在完整方案页面
    activeSection.value = 'full'
  } else if (currentTutorialStep.value === 1) {
    // 第二步：方案评估 - 确保在完整方案页面
    activeSection.value = 'full'
  } else if (currentTutorialStep.value === 2) {
    // 第三步：整体方案迭代 - 确保在完整方案页面
    activeSection.value = 'full'
  } else if (currentTutorialStep.value === 3) {
    // 第四步：方案对比 - 确保在完整方案页面
    activeSection.value = 'full'
  } else if (currentTutorialStep.value === 4) {
    // 第五步：生成来源介绍 - 切换到数据分析的来源介绍
    activeSection.value = 'analysis'
    analysisSubSection.value = 'source'
  } else if (currentTutorialStep.value === 5) {
    // 第六步：生成方法介绍 - 切换到数据分析的方法介绍
    activeSection.value = 'analysis'
    analysisSubSection.value = 'method'
  } else if (currentTutorialStep.value === 6) {
    // 第七步：统计方法查询 - 切换到数据分析的统计方法查询
    activeSection.value = 'analysis'
    analysisSubSection.value = 'query'
  }
  
  // 等待DOM更新后计算高亮区域（不滚动页面）
  nextTick(() => {
    setTimeout(() => {
      const element = currentStep.getElement ? currentStep.getElement() : currentStep.ref.value
      
      if (element && typeof element.getBoundingClientRect === 'function') {
        try {
          console.log('聚焦元素:', currentStep.title, element)
          
          // 如果是输入框，聚焦
          if (element.tagName === 'INPUT' && typeof element.focus === 'function') {
            element.focus()
          }
        } catch (error) {
          console.warn('聚焦元素失败:', error)
        }
      } else {
        console.warn('元素不存在或无法聚焦:', currentStep.title)
        
        // 如果元素不存在，可能是页面状态还没切换完成，重试一次
        if (currentStep.getElement) {
          console.log('元素不存在，可能是页面状态切换中，重试一次')
          setTimeout(() => {
            const retryElement = currentStep.getElement()
            if (retryElement && typeof retryElement.getBoundingClientRect === 'function') {
              try {
                console.log('重试成功，聚焦元素:', currentStep.title, retryElement)
                // 如果是输入框，聚焦
                if (retryElement.tagName === 'INPUT' && typeof retryElement.focus === 'function') {
                  retryElement.focus()
                }
              } catch (error) {
                console.warn('重试聚焦元素失败:', error)
                // 如果重试也失败，跳到下一步
                if (currentTutorialStep.value < tutorialSteps.length - 1) {
                  console.log('重试失败，自动跳到下一步')
                  nextTutorialStep()
                }
              }
            } else {
              console.log('重试失败，元素仍然不存在，跳到下一步')
              if (currentTutorialStep.value < tutorialSteps.length - 1) {
                nextTutorialStep()
              }
            }
          }, 800) // 增加重试延迟，给页面切换更多时间
        } else {
          // 如果元素不存在，尝试跳到下一步
          if (currentTutorialStep.value < tutorialSteps.length - 1) {
            console.log('元素不存在，自动跳到下一步')
            nextTutorialStep()
          }
        }
      }
    }, 500) // 增加延迟确保DOM更新完成
  })
}

// 前一步
const prevTutorialStep = () => {
  if (currentTutorialStep.value > 0) {
    currentTutorialStep.value--
    // 等待DOM更新后重新聚焦（不滚动页面）
    nextTick(() => {
      setTimeout(() => {
        focusCurrentElement()
      }, 300) // 给页面切换更多时间
    })
  }
}

// 下一步
const nextTutorialStep = () => {
  currentTutorialStep.value++
  
  if (currentTutorialStep.value >= tutorialSteps.length) {
    // 引导完成
    completeTutorial()
  } else {
    // 聚焦到下一个元素（不滚动页面）
    nextTick(() => {
      setTimeout(() => {
        focusCurrentElement()
      }, 300) // 增加延迟确保页面切换完成
    })
  }
}

// 跳过引导
const skipTutorial = () => {
  showTutorial.value = false
  currentTutorialStep.value = 0
  
  // 如果使用了样例数据，清理掉
  if (hasGeneratedPlan.value && currentPlanState.title === sampleResearchPlan.title) {
    console.log('跳过新手指引：清理样例数据')
    // 重置为未生成状态
    currentPlanState.isGenerated = false
    currentPlanState.title = ''
    currentPlanState.hypotheses = []
    currentPlanState.experimentalDesign = ''
    currentPlanState.analysisMethod = ''
    currentPlanState.expectedResults = ''
  }
}

// 下次不提示
const dontShowAgain = () => {
  localStorage.setItem('researchPlanDetail_tutorial_shown', 'true')
  skipTutorial()
}

// 完成引导
const completeTutorial = () => {
  showTutorial.value = false
  currentTutorialStep.value = 0
  
  // 如果使用了样例数据，清理掉
  if (hasGeneratedPlan.value && currentPlanState.title === sampleResearchPlan.title) {
    console.log('新手指引完成：清理样例数据')
    // 重置为未生成状态
    currentPlanState.isGenerated = false
    currentPlanState.title = ''
    currentPlanState.hypotheses = []
    currentPlanState.experimentalDesign = ''
    currentPlanState.analysisMethod = ''
    currentPlanState.expectedResults = ''
  }
  
  console.log('✅ 研究方案详情页面新手指引完成')
}

// 重置引导状态（用于测试）
const resetTutorial = () => {
  localStorage.removeItem('researchPlanDetail_tutorial_shown')
  console.log('🔄 研究方案详情页面新手指引状态已重置')
}

// 调试函数：检查所有元素引用
const debugElementRefs = () => {
  console.log('=== 调试元素引用 ===')
  console.log('当前页面状态:', {
    activeSection: activeSection.value,
    analysisSubSection: analysisSubSection.value,
    hasGeneratedPlan: hasGeneratedPlan.value
  })
  
  tutorialSteps.forEach((step, index) => {
    const element = step.getElement ? step.getElement() : step.ref.value
    console.log(`步骤${index + 1} (${step.title}):`, element ? '存在' : '不存在', element)
    
    if (step.getElement) {
      console.log(`  - 使用getElement函数`)
    } else {
      console.log(`  - 使用ref引用`)
    }
  })
  console.log('=== 调试完成 ===')
}

// 键盘事件处理
const handleKeydown = (event) => {
  if (!showTutorial.value) return
  
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault()
      nextTutorialStep()
      break
    case 'Escape':
      event.preventDefault()
      skipTutorial()
      break
    case 'ArrowRight':
      event.preventDefault()
      nextTutorialStep()
      break
    case 'ArrowLeft':
      event.preventDefault()
      if (currentTutorialStep.value > 0) {
        currentTutorialStep.value--
        // 等待DOM更新后重新聚焦
        nextTick(() => {
          setTimeout(() => {
            focusCurrentElement()
          }, 200) // 给页面切换更多时间
        })
      }
      break
  }
}

// 统计方法名称列表
const statisticalMethods = [
  't检验', 'T检验', 't-test', 'T-test', '双侧t检验', '单样本t检验', '独立样本t检验', '配对样本t检验',
  '方差分析', 'ANOVA', 'anova', '单因素方差分析', '双因素方差分析', '重复测量方差分析', '多元方差分析',
  '回归分析', '线性回归', '多元回归', '逻辑回归', '回归', '多项式回归', '分层回归',
  '相关分析', '皮尔逊相关', 'Pearson相关', 'Spearman相关', '相关性分析', '偏相关分析',
  '卡方检验', 'χ²检验', 'Chi-square检验', 'chi-square', '卡方拟合优度检验', '卡方独立性检验',
  'Mann-Whitney U检验', 'Mann-Whitney检验', 'U检验', 'Mann-Whitney U',
  'Wilcoxon检验', 'Wilcoxon符号秩检验', 'Wilcoxon秩和检验', 'Wilcoxon',
  'Kruskal-Wallis检验', 'Kruskal-Wallis', 'K-W检验',
  '描述性统计', '推论统计', '统计检验', '假设检验', '参数检验', '非参数检验',
  '效应量', 'Cohen\'s d', 'eta平方', 'eta²', 'η²', '偏eta平方',
  '置信区间', '显著性检验', '显著性水平', 'p值', 'P值', 'α水平', 'α值',
  '正态性检验', 'Shapiro-Wilk检验', 'Kolmogorov-Smirnov检验', 'K-S检验',
  '方差齐性检验', 'Levene检验', 'Bartlett检验',
  '多重比较', 'Bonferroni校正', 'Tukey检验', 'LSD检验', 'Scheffé检验'
]

// 自动跳转到统计方法查询并执行查询
const jumpToStatisticalMethodQuery = async (methodName) => {
  try {
    console.log('跳转到统计方法查询:', methodName)
    
    // 切换到数据分析部分
    activeSection.value = 'analysis'
    
    // 切换到统计方法查询子部分
    analysisSubSection.value = 'query'
    
    // 设置查询内容
    statisticalMethodQuery.value = decodeURIComponent(methodName)
    
    // 等待DOM更新
    await nextTick()
    
    // 执行查询
    await queryStatisticalMethod()
    
    // 滚动到统计方法查询输入框
    setTimeout(() => {
      // 首先尝试滚动到输入框
      const inputElement = document.querySelector('#statistical-method-query input[type="text"]')
      if (inputElement) {
        inputElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
        // 给输入框添加焦点效果
        inputElement.focus()
        setTimeout(() => {
          inputElement.blur()
        }, 1000)
      } else {
        // 如果找不到输入框，滚动到查询区域顶部
        const queryElement = document.querySelector('#statistical-method-query')
        if (queryElement) {
          queryElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    }, 100)
    
  } catch (error) {
    console.error('跳转到统计方法查询失败:', error)
    alert('Navigation failed, please manually switch to statistical method lookup')
  }
}


const sections = [
  { id: 'full', name: 'Full Proposal' },
  { id: 'hypothesis', name: 'Hypotheses' },
  { id: 'design', name: 'Experimental Design' },
  { id: 'analysis', name: 'Data Analysis' },
  { id: 'results', name: 'Expected Results' }
]

const analysisSubSections = [
  { id: 'source', name: 'Source Introduction' },
  { id: 'method', name: 'Method Introduction' },
  { id: 'query', name: 'Statistical Method Lookup' }
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

// 添加一个后处理函数来处理统计方法链接
const postProcessStatisticalLinks = (html) => {
  if (!html || typeof html !== 'string') {
    console.warn('postProcessStatisticalLinks: 输入无效', html)
    return html || ''
  }
  
  try {
    let processedHtml = html
    console.log('开始处理统计方法链接，原始HTML长度:', html.length)
    
    // 为每个统计方法名称添加链接
    statisticalMethods.forEach(method => {
      try {
        // 简单的字符串替换，避免复杂的正则表达式
        if (processedHtml.includes(method)) {
          console.log(`发现统计方法: ${method}`)
          
          // 检查是否已经在链接内
          const methodIndex = processedHtml.indexOf(method)
          if (methodIndex !== -1) {
            const beforeMethod = processedHtml.substring(0, methodIndex)
            const lastOpenTag = beforeMethod.lastIndexOf('<a ')
            const lastCloseTag = beforeMethod.lastIndexOf('</a>')
            
            // 如果在链接标签内，跳过
            if (lastOpenTag > lastCloseTag) {
              console.log(`跳过已在链接内的方法: ${method}`)
              return
            }
            
            // 创建链接
            const encodedMethod = encodeURIComponent(method)
            const linkHtml = `<a href="javascript:void(0)" onclick="handleStatisticalMethodClick('${encodedMethod}')" style="color: #3b82f6; text-decoration: underline; cursor: pointer;" title="点击查询统计方法详情">${method}</a>`
            
            // 只替换第一个匹配项
            processedHtml = processedHtml.replace(method, linkHtml)
            console.log(`成功为方法添加链接: ${method}`)
          }
        }
      } catch (methodError) {
        console.error('处理统计方法时出错:', methodError, { method })
        // 继续处理其他方法
      }
    })
    
    console.log('统计方法链接处理完成，最终HTML长度:', processedHtml.length)
    return processedHtml
  } catch (error) {
    console.error('统计方法链接后处理出错:', error)
    return html // 如果处理失败，返回原始HTML
  }
}

// 安全的markdown渲染函数
const safeMarkdownRender = (text, enableStatisticalLinks = false) => {
  try {
    if (!text) return ''
    
    console.log('开始渲染markdown，文本长度:', text.length)
    console.log('前100字符:', text.substring(0, 100))
    
    // 首先进行标准的Markdown渲染
    let result
    try {
      result = marked.parse(text)
      console.log('使用marked.parse()成功')
    } catch (parseError) {
      console.warn('marked.parse()失败，尝试使用marked():', parseError)
      result = marked(text)
      console.log('使用marked()成功')
    }
    
    console.log('Markdown渲染完成，结果长度:', result.length)
    console.log('渲染结果前200字符:', result.substring(0, 200))
    
    // 如果启用统计方法链接，则在HTML渲染后处理
    if (enableStatisticalLinks) {
      console.log('开始后处理统计方法链接')
      result = postProcessStatisticalLinks(result)
      console.log('统计方法链接后处理完成，最终长度:', result.length)
    }
    
    // 检查是否包含图片标签
    const imgCount = (result.match(/<img/g) || []).length
    console.log(`发现 ${imgCount} 个图片标签`)
    
    return result
  } catch (error) {
    console.error('Markdown渲染错误:', error)
    console.error('错误堆栈:', error.stack)
    return `<div style="color: red; padding: 10px; border: 1px solid red; border-radius: 4px;">
      <strong>Markdown渲染错误:</strong><br>
      ${error.message}<br>
      <details>
        <summary>原始文本</summary>
        <pre>${text}</pre>
      </details>
    </div>`
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
  console.log('计算renderedExperimentalDesign，experimentalDesign:', currentPlanState.experimentalDesign)
  if (!currentPlanState.experimentalDesign) {
    console.log('experimentalDesign为空，返回空字符串')
    return ''
  }
  console.log('开始渲染experimentalDesign')
  const result = safeMarkdownRender(currentPlanState.experimentalDesign)
  console.log('experimentalDesign渲染完成，结果长度:', result.length)
  return result
})

const renderedAnalysisMethod = computed(() => {
  console.log('计算renderedAnalysisMethod，analysisMethod:', currentPlanState.analysisMethod)
  if (!currentPlanState.analysisMethod) {
    console.log('analysisMethod为空，返回空字符串')
    return ''
  }
  console.log('开始渲染analysisMethod，启用统计方法链接')
  const result = safeMarkdownRender(currentPlanState.analysisMethod, true)
  console.log('analysisMethod渲染完成，结果长度:', result.length)
  return result
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

// 等待特定响应的函数
const waitForResponse = (timeoutMs = 30000) => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now()
    const checkInterval = 1000 // 每秒检查一次
    
    const checkForResponse = () => {
      const latestAssistantMessage = chatState.messages
    .filter(msg => msg.type === 'assistant' && msg.isComplete && !msg.isError)
    .pop()
  
      if (latestAssistantMessage && latestAssistantMessage.id > lastMessageIdBeforeGenerate.value) {
        console.log('收到新的助手消息，ID:', latestAssistantMessage.id)
        resolve(latestAssistantMessage)
      return
    }
    
      // 检查是否超时
      if (Date.now() - startTime > timeoutMs) {
        reject(new Error('等待AI响应超时'))
      return
    }
    
      // 继续等待
      setTimeout(checkForResponse, checkInterval)
    }
    
    checkForResponse()
  })
}

// Auto save to history plans
const saveToHistoryPlans = async (context = {}) => {
  try {
    console.log('Starting to save plan to history, context:', context)
    
    // Ensure title is the latest generated (if current title is default title, regenerate)
    let finalTitle = currentPlanState.title
    
    // Check if title needs to be regenerated
    const needRegenerateTitle = !finalTitle || 
      finalTitle === 'AI-Edited Images and Videos Impact on Human Memory' ||
      finalTitle.includes('定量研究方案') ||
      finalTitle.includes('AI生成的研究方案') ||
      finalTitle === '用户自定义研究方案'
    
    if (needRegenerateTitle) {
      console.log('Current title needs regeneration:', finalTitle)
      // Regenerate title with richer context
      finalTitle = generatePlanTitle()
      console.log('Regenerated title:', finalTitle)
      // Update current plan title
      currentPlanState.title = finalTitle
    }
    
    // Build plan data
    const planData = {
      title: finalTitle,
      researchQuestions: currentPlanState.researchQuestions,
      methodology: currentPlanState.methodology,
      hypotheses: currentPlanState.hypotheses,
      experimentalDesign: currentPlanState.experimentalDesign,
      analysisMethod: currentPlanState.analysisMethod,
      expectedResults: currentPlanState.expectedResults,
      timeline: currentPlanState.timeline || '',
      isGenerated: true,
      isIterated: context.isIteration || false
    }
    
    // Build save context
    const saveContext = {
      referencedPapers: Array.from(papersState.referencedPapersList).map(paper => ({
        title: paper.title,
        authors: paper.authors,
        year: paper.year,
        source: paper.source
      })),
      userRequirements: extractConversationContext().userRequirements || '',
      ...context, // Merge passed context
      saveTime: new Date().toISOString()
    }
    
    // Set different title suffixes based on whether it's an iteration
    if (context.isIteration) {
      if (context.iterationType === 'complete') {
        planData.title = `${planData.title} - Complete Iteration`
      } else if (context.iterationType === 'partial') {
        planData.title = `${planData.title} - ${context.iteratedSectionName} Iteration`
      }
    }
    
    console.log('Plan data ready to save:', {
      title: planData.title,
      isIterated: planData.isIterated,
      iterationType: context.iterationType
    })
    
    await addHistoryPlan(planData, saveContext)
    console.log('Successfully saved plan to history')
    
  } catch (error) {
    console.error('Failed to save plan to history:', error)
    // Don't throw error to avoid affecting main process
  }
}

// Parse AI-generated research proposal Markdown (strict mode)
const parseResearchPlanResponse = async (content, context = {}) => {
  try {
    console.log('Starting to parse research proposal, content length:', content.length)
    
    if (!content || typeof content !== 'string') {
      throw new Error('AI response content is empty or invalid format')
    }
    
    // Strict check for required research proposal structure (support both English and Chinese)
    const requiredSections = {
      english: ['Research Hypotheses', 'Experimental Design', 'Data Analysis', 'Results Presentation'],
      chinese: ['研究假设', '实验设计', '数据分析', '结果呈现']
    }
    
    // Check if content contains English or Chinese sections
    let isEnglish = false
    let isChinese = false
    
    for (const section of requiredSections.english) {
      if (content.includes(section) || content.includes(`#${section}`) || content.includes(`# ${section}`)) {
        isEnglish = true
        break
      }
    }
    
    for (const section of requiredSections.chinese) {
      if (content.includes(section) || content.includes(`#${section}`) || content.includes(`# ${section}`)) {
        isChinese = true
        break
      }
    }
    
    // Use appropriate language sections for validation
    const sectionsToCheck = isEnglish ? requiredSections.english : requiredSections.chinese
    const missingSections = []
    
    for (const section of sectionsToCheck) {
      const hasSection = content.includes(section) || 
                        content.includes(`#${section}`) ||
                        content.includes(`# ${section}`)
      
      if (!hasSection) {
        missingSections.push(section)
      }
    }
    
    if (missingSections.length > 0) {
      throw new Error(`AI response missing required research proposal sections: ${missingSections.join(', ')}. Please ensure the response contains complete research proposal format.`)
    }
    
        // Use simpler and more accurate parsing method
    const extractAllSections = () => {
      console.log('Starting to extract all section contents...')
      
      // Find all section title positions - support both English and Chinese
      const sectionTitles = isEnglish ? requiredSections.english : requiredSections.chinese
      const sectionPositions = []
      
      sectionTitles.forEach(title => {
        // Search for various possible formats
        const patterns = [
          `#\\s*${title}\\s*[：:：]?\\s*$`, // # Research Hypotheses: or # Research Hypotheses (end of line)
          `#\\s*${title}\\s*[：:：]?\\s*\\n`, // # Research Hypotheses: newline or # Research Hypotheses newline
          `${title}\\s*[：:：]\\s*$`, // Research Hypotheses: (end of line)
          `${title}\\s*[：:：]\\s*\\n` // Research Hypotheses: newline
        ]
        
        for (const pattern of patterns) {
          const regex = new RegExp(pattern, 'gim') // Add m flag for multiline support
          let match
          while ((match = regex.exec(content)) !== null) {
            sectionPositions.push({
              title: title,
              start: match.index,
              end: match.index + match[0].length,
              fullMatch: match[0]
            })
            console.log(`Found ${title} at position ${match.index}, matched content: "${match[0]}"`)
            break // Only take the first match
          }
        }
      })
      
      // Sort by position
      sectionPositions.sort((a, b) => a.start - b.start)
      console.log('Found section positions:', sectionPositions.map(p => ({ title: p.title, start: p.start })))
      
      // Extract content for each section
      const extractedSections = {}
      
      for (let i = 0; i < sectionPositions.length; i++) {
        const currentSection = sectionPositions[i]
        const nextSection = sectionPositions[i + 1]
        
        // Determine content start and end positions
        const contentStart = currentSection.end
        const contentEnd = nextSection ? nextSection.start : content.length
        
        // Extract content
        let sectionContent = content.substring(contentStart, contentEnd).trim()
        
        // Clean content
        sectionContent = sectionContent
          .replace(/^[：:：;\s]+/, '') // Remove leading colons and semicolons
          .replace(/[；;]+\s*$/, '') // Remove trailing semicolons
          .trim()
        
        // Remove possible markdown markers at the beginning
        sectionContent = sectionContent.replace(/^#+\s*/, '').trim()
        
        if (sectionContent) {
          extractedSections[currentSection.title] = sectionContent
          console.log(`Successfully extracted ${currentSection.title}:`, sectionContent.substring(0, 100) + '...')
        }
      }
      
      return extractedSections
    }
    
    // Extract all sections
    const extractedSections = extractAllSections()
    
    // Get content for each section based on language
    const sectionKeys = isEnglish ? {
      hypothesis: 'Research Hypotheses',
      design: 'Experimental Design', 
      analysis: 'Data Analysis',
      results: 'Results Presentation'
    } : {
      hypothesis: '研究假设',
      design: '实验设计',
      analysis: '数据分析', 
      results: '结果呈现'
    }
    
    const hypothesis = extractedSections[sectionKeys.hypothesis] || ''
    const design = extractedSections[sectionKeys.design] || ''
    const analysis = extractedSections[sectionKeys.analysis] || ''
    const results = extractedSections[sectionKeys.results] || ''
    
    console.log('Extraction results summary:')
    console.log(`- ${sectionKeys.hypothesis}:`, hypothesis ? '✓ Extracted' : '✗ Not extracted', hypothesis ? `(${hypothesis.length} chars)` : '')
    console.log(`- ${sectionKeys.design}:`, design ? '✓ Extracted' : '✗ Not extracted', design ? `(${design.length} chars)` : '')
    console.log(`- ${sectionKeys.analysis}:`, analysis ? '✓ Extracted' : '✗ Not extracted', analysis ? `(${analysis.length} chars)` : '')
    console.log(`- ${sectionKeys.results}:`, results ? '✓ Extracted' : '✗ Not extracted', results ? `(${results.length} chars)` : '')
    
    // Check if at least one valid content is extracted
    const hasValidContent = hypothesis || design || analysis || results
    if (!hasValidContent) {
      console.log('No valid research proposal content extracted, first 500 characters of original content:', content.substring(0, 500))
      // Output more detailed debug information
      console.log('Attempting to find keywords:')
      if (isEnglish) {
        console.log('- Contains "Research Hypotheses":', content.includes('Research Hypotheses'))
        console.log('- Contains "Experimental Design":', content.includes('Experimental Design'))
        console.log('- Contains "Data Analysis":', content.includes('Data Analysis'))
        console.log('- Contains "Results Presentation":', content.includes('Results Presentation'))
      } else {
        console.log('- Contains "研究假设":', content.includes('研究假设'))
        console.log('- Contains "实验设计":', content.includes('实验设计'))
        console.log('- Contains "数据分析":', content.includes('数据分析'))
        console.log('- Contains "结果呈现":', content.includes('结果呈现'))
      }
      return false
    }
    
    // Save current state first, then clear fields
    const wasGenerated = currentPlanState.isGenerated
    
    // Clear fields and reset state
    currentPlanState.hypotheses = []
    currentPlanState.experimentalDesign = ''
    currentPlanState.analysisMethod = ''
    currentPlanState.expectedResults = ''
    
    console.log('Cleared old data, starting to update new plan...')
    
    // Count actually updated fields
    let updatedFields = 0
    
    // Update research hypotheses (support multiple hypotheses)
    if (hypothesis) {
      // If containing multiple hypotheses (separated by numbers), split into array
      const hypothesesArray = hypothesis.split(/\n\d+\.|\n[•·]\s*/).filter(h => h.trim())
      if (hypothesesArray.length > 1) {
        currentPlanState.hypotheses = hypothesesArray.map(h => h.trim())
      } else {
        currentPlanState.hypotheses = [hypothesis]
      }
      // Initialize source introduction for research hypotheses section
      currentPlanState.hypothesis = {
        sourceIntro: 'This research hypotheses are based on existing literature and theoretical foundations, combined with research objectives and specific contexts.'
      }
      console.log('Updated research hypotheses:', currentPlanState.hypotheses)
      updatedFields++
    }
    
    // Update experimental design
    if (design) {
      currentPlanState.experimentalDesign = design
      // Initialize source introduction for experimental design section
      currentPlanState.design = {
        sourceIntro: 'The experimental design plan references classic experimental paradigms and latest research methods in related fields.'
      }
      console.log('Updated experimental design:', design.substring(0, 100) + '...')
      updatedFields++
    }
    
    // Update data analysis
    if (analysis) {
      currentPlanState.analysisMethod = analysis
      // Initialize source introduction and method introduction for data analysis section
      currentPlanState.analysis = {
        sourceIntro: 'Data analysis methods are based on research objectives and data characteristics, using appropriate statistical analysis methods.',
        methodIntro: 'The statistical methods used in this study include descriptive statistics and inferential statistics. You can use the query function below to learn detailed information about specific statistical methods.'
      }
      console.log('Updated data analysis:', analysis.substring(0, 100) + '...')
      updatedFields++
    }
    
    // Update results presentation
    if (results) {
      currentPlanState.expectedResults = results
      // Initialize source introduction for results presentation section
      currentPlanState.results = {
        sourceIntro: 'Results presentation follows the standard format of academic papers, ensuring research findings are clear and understandable.'
      }
      console.log('Updated results presentation:', results.substring(0, 100) + '...')
      updatedFields++
    }
    
    // Update basic information
    const timestamp = new Date().toLocaleString('en-US')
    const generatedTitle = generatePlanTitle()
    currentPlanState.title = generatedTitle
    currentPlanState.researchQuestions = 'AI-generated research proposal'
    currentPlanState.methodology = `Research methodology generated based on reference literature (Generated: ${timestamp})`
    currentPlanState.dataCollection = 'Data collection plan formulated according to research design'
    
    console.log('Generated plan title:', generatedTitle)
    
    // Initialize source introduction for complete plan section
    currentPlanState.full = {
              sourceIntro: 'This research proposal integrates various research methods and literature resources, aiming to provide a comprehensive and scientific quantitative research framework.'
    }
    
    // If at least one field is updated, consider it successful
    if (updatedFields >= 1) {
      // Set to generated state
      currentPlanState.isGenerated = true
      currentPlanState.lastUpdated = new Date().toISOString()
      
      console.log(`Successfully updated ${updatedFields} fields`)
      console.group('Final parsing results')
      console.log('Research hypotheses:', currentPlanState.hypotheses)
      console.log('Experimental design:', currentPlanState.experimentalDesign ? 'Updated' : 'Not updated') 
      console.log('Data analysis:', currentPlanState.analysisMethod ? 'Updated' : 'Not updated')
      console.log('Results presentation:', currentPlanState.expectedResults ? 'Updated' : 'Not updated')
      console.log('isGenerated:', currentPlanState.isGenerated)
      console.groupEnd()
      
      // Force update reactive state
      const forceUpdate = {
        ...currentPlanState,
        _timestamp: Date.now() // Add timestamp to force update
      }
      Object.assign(currentPlanState, forceUpdate)
      
      // Automatically switch to complete plan view
      activeSection.value = 'full'
      
      // Show success message
      console.log('Successfully parsed and updated research proposal')
      
      // Automatically save to history plans
      await saveToHistoryPlans(context)
      
      return true // Successfully parsed and updated research proposal
    } else {
      throw new Error('Parsing failed: Unable to extract valid research proposal content from AI response. Please check if the AI response format is correct.')
    }
  } catch (error) {
    console.error('Error occurred while parsing research proposal:', error)
    console.log('Original content:', content.substring(0, 500))
    throw error // Re-throw error for caller to handle
  }
}

// 已移除：parseSectionIterationResponse 函数 - 不再需要，因为现在使用统一的解析机制

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
      const isUpdated = isFullPlanUpdate || updatedSectionName === 'Experimental Design'
      completeMarkdown += `${isUpdated ? '🔄' : '📋'} **#Experimental Design:**\n`
      completeMarkdown += `${currentPlanState.experimentalDesign}\n\n`
    }
    
    // Add data analysis
    if (currentPlanState.analysisMethod) {
      const isUpdated = isFullPlanUpdate || updatedSectionName === 'Data Analysis'
      completeMarkdown += `${isUpdated ? '🔄' : '📋'} **#Data Analysis:**\n`
      completeMarkdown += `${currentPlanState.analysisMethod}\n\n`
    }
    
    // Add results presentation
    if (currentPlanState.expectedResults) {
      const isUpdated = isFullPlanUpdate || updatedSectionName === 'Results Presentation'
      completeMarkdown += `${isUpdated ? '🔄' : '📋'} **#Results Presentation:**\n`
      completeMarkdown += `${currentPlanState.expectedResults}\n\n`
    }
    
    // Add description
    completeMarkdown += `---\n\n📝 **Description:**\n`
    if (isFullPlanUpdate) {
      completeMarkdown += `- 🔄 Indicates all parts in this complete plan iteration\n`
      completeMarkdown += `- Update time: ${new Date().toLocaleString('en-US')}`
    } else {
      completeMarkdown += `- 🔄 Indicates updated parts in this iteration\n`
      completeMarkdown += `- 📋 Indicates unchanged parts\n`
      completeMarkdown += `- Update time: ${new Date().toLocaleString('en-US')}`
    }
    
    // 创建一个系统消息并添加到聊天状态中
    const systemMessage = {
      id: Date.now() + Math.random(), // Generate unique ID
      type: 'assistant',
      content: completeMarkdown,
      timestamp: new Date().toISOString(),
      isComplete: true,
      isError: false,
      isSystemGenerated: true // Mark as system generated message
    }
    
    // 添加到聊天消息列表
    chatState.messages.push(systemMessage)
    
    console.log('Complete plan has been added to chat box')
    
  } catch (error) {
    console.error('Error when displaying complete plan:', error)
  }
}

// Show research plan generation dialog
const showResearchPlanDialog = () => {
  researchPlanMode.value = 'custom'
  researchTopicInput.value = ''
  showResearchPlanDialogModal.value = true
}

// Close research plan generation dialog
const closeResearchPlanDialog = () => {
  showResearchPlanDialogModal.value = false
  researchPlanMode.value = 'custom'
  researchTopicInput.value = ''
  
  // Reset generation info
  currentGenerationInfo.value = {
    mode: 'auto',
    customTopic: '',
    timestamp: null
  }
}

// Confirm research plan generation
const confirmGenerateResearchPlan = async () => {
  // Save current mode and topic to avoid reset when closing dialog
  const currentMode = researchPlanMode.value
  const currentTopic = researchTopicInput.value
  
  // 关闭对话框
  closeResearchPlanDialog()
  
  // Call generation function with saved mode and topic
  await generateResearchPlan(currentMode, currentTopic)
}

// Current generation plan info (for title generation)
const currentGenerationInfo = ref({
  mode: 'auto',
  customTopic: '',
  timestamp: null
})

// Generate quantitative research plan (modified to support mode and topic parameters)
const generateResearchPlan = async (mode = 'auto', customTopic = '') => {
  // Record the latest message ID
  const latestMessage = chatState.messages
    .filter(msg => msg.isComplete)
    .pop()
  lastMessageIdBeforeGenerate.value = latestMessage ? latestMessage.id : 0
  
  // Save current generation info for subsequent title generation
  currentGenerationInfo.value = {
    mode: mode,
    customTopic: customTopic.trim(),
    timestamp: new Date().toISOString()
  }
  
  isGenerating.value = true
  
  console.log('Starting to generate new plan, current latest message ID:', lastMessageIdBeforeGenerate.value)
  console.log('Generation mode:', mode, 'Custom topic:', customTopic)
  
  try {
    // Pre-extract conversation context (intelligent analysis mode will use this)
    const conversationContext = extractConversationContext()
    
    // Get all reference paper information (including search and recommendation)
    const referencedPapers = Array.from(papersState.referencedPapersList)
    
    // Prepare reference paper content
    let paperContents = []
    if (referencedPapers.length > 0) {
      // Get current AI service type
      const { getCurrentAIService } = await import('../stores/aiServiceStore.js')
      const currentAIService = getCurrentAIService()
      
      console.log(`🔍 Starting to process full text content of ${referencedPapers.length} reference papers`)
      
      // Get full text content for each paper
      paperContents = await Promise.all(referencedPapers.map(async (paper, index) => {
        let fullText = paper.fullText;
        
        // If no full text, try to get it
        if (!fullText) {
          try {
            const { getApiBaseUrl } = await import('../config/environment.js')
            const getContentApiUrl = `${getApiBaseUrl()}/paper/get-full-content`
            console.log('📤 Get paper content API request URL:', getContentApiUrl)
            
            const response = await fetch(getContentApiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                title: paper.title,
                doi: paper.doi || null,
                aiService: currentAIService === 'chatgpt' ? 'chatgpt' : 'coze'
              })
            });
            
            if (response.ok) {
              const result = await response.json();
              if (result.success && result.fullText) {
                fullText = result.fullText;
                paper.fullText = fullText; // Update paper object
              }
            }
          } catch (error) {
            console.error(`获取论文"${paper.title}"全文失败:`, error);
          }
        }
        
        return { fullText };
      }));
    }
    
    // Use PromptService to generate research plan prompt
    const promptData = {
      customTopic: customTopic.trim(),
      hasUserRequirements: conversationContext.hasUserRequirements,
      userRequirements: conversationContext.userRequirements,
      researchContext: conversationContext.researchContext,
      hasPapers: referencedPapers.length > 0,
      paperCount: referencedPapers.length,
      paperContents: paperContents.map((content, index) => 
        content.fullText ? `References ${index + 1} full text content：\n${content.fullText}` : ''
      ).filter(content => content).join('\n\n'),
      mode: mode
    }
    
    const message = PromptService.generateResearchPlan(promptData)
    
    console.log('Message to be sent:', message)
    console.log('Generation mode:', mode)
    console.log('Custom topic:', customTopic || 'None')
    console.log('Number of reference papers:', referencedPapers.length)
    
    // Send message to chatbox
    await sendMessage(message)
    
    // 等待AI响应
    console.log('等待AI响应...')
    const response = await waitForResponse()
    
    // 解析AI响应
    console.log('收到AI响应，开始解析...')
    
    // Prepare generation context
    const generationContext = {
      isIteration: false,
      generateTime: new Date().toISOString(),
      mode: mode,
      customTopic: customTopic
    }
    
    await parseResearchPlanResponse(response.content, generationContext)
    
    // 解析成功，显示成功提示
    alert('Research proposal generated successfully!')
    
  } catch (error) {
    console.error('生成研究方案失败:', error)
          alert(`Failed to generate research plan: ${error.message}`)
  } finally {
    isGenerating.value = false
  }
}

// 生成智能的方案标题
const generatePlanTitle = () => {
  const generationInfo = currentGenerationInfo.value
  console.log('开始生成方案标题，生成信息:', generationInfo)
  
  // 策略1：如果是自定义主题模式且有具体主题，直接使用
  if (generationInfo.mode === 'custom' && generationInfo.customTopic) {
    console.log('使用自定义主题模式，原始主题:', generationInfo.customTopic)
    // 清理主题，移除多余的词汇，保持简洁
    let cleanedTopic = generationInfo.customTopic
      .replace(/^(探讨|研究|分析|调查|实验|测试|评估|关于|explore|research|analyze|investigate|experiment|test|evaluate|about|study)+/gi, '') // 移除开头的动词
      .replace(/(的影响|的关系|的效果|的作用|研究|分析|实验|方案|设计|impact|relationship|effect|influence|research|analysis|experiment|plan|design)+$/gi, '') // 移除结尾的研究词汇
      .replace(/请帮我|请|帮我|我想要|我希望|能否|可以|如何|怎样|please help|please|help me|i want|i hope|can you|how to|how can/gi, '') // 移除请求性词汇
      .replace(/\s+/g, ' ') // 合并多个空格
      .trim()
    
    // 如果清理后太短，使用原始主题
    if (cleanedTopic.length < 3) {
      cleanedTopic = generationInfo.customTopic.trim()
    }
    
    // 限制长度，过长则截断，保持在合理范围内
    if (cleanedTopic.length > 35) {
      // 尝试在词语边界截断
      const truncated = cleanedTopic.substring(0, 35)
      const lastSpace = truncated.lastIndexOf(' ')
      const lastChineseChar = truncated.search(/[\u4e00-\u9fa5][，。！？]?$/)
      
      if (lastSpace > 20) {
        cleanedTopic = truncated.substring(0, lastSpace) + '...'
      } else if (lastChineseChar > 20) {
        cleanedTopic = truncated.substring(0, lastChineseChar + 1) + '...'
      } else {
        cleanedTopic = truncated + '...'
      }
    }
    
    // 确保标题不为空
    if (!cleanedTopic || cleanedTopic === '...') {
      cleanedTopic = 'User Custom Research Proposal'
    }
    
    console.log('自定义主题清理后的标题:', cleanedTopic)
    return cleanedTopic
  }
  
  // 策略2：从当前方案内容中提取关键词生成标题
  if (currentPlanState.hypotheses && currentPlanState.hypotheses.length > 0) {
    console.log('尝试从研究假设中提取标题')
    const hypothesesText = currentPlanState.hypotheses.join(' ')
    const titleFromContent = extractTitleFromContent(hypothesesText)
    if (titleFromContent) {
      console.log('从研究假设提取的标题:', titleFromContent)
      return titleFromContent
    }
  }
  
  // 策略3：智能分析模式：从对话历史中提取关键主题
  if (generationInfo.mode === 'auto') {
    console.log('使用智能分析模式生成标题')
    const conversationContext = extractConversationContext()
    
    if (conversationContext.hasUserRequirements) {
      console.log('从用户需求中提取关键词，需求内容:', conversationContext.userRequirements)
      const titleFromRequirements = extractTitleFromRequirements(conversationContext.userRequirements)
      if (titleFromRequirements) {
        console.log('从用户需求提取的标题:', titleFromRequirements)
        return titleFromRequirements
      }
    }
    
    // 策略4：如果提取失败，检查是否有参考文献相关的主题
    const referencedPapers = Array.from(papersState.referencedPapersList)
    if (referencedPapers.length > 0) {
      console.log('尝试从参考文献中提取主题，文献数量:', referencedPapers.length)
      const titleFromPapers = extractTitleFromPapers(referencedPapers)
      if (titleFromPapers) {
        console.log('从参考文献提取的标题:', titleFromPapers)
        return titleFromPapers
      }
    }
  }
  
  // 策略5：通用内容分析策略（从任何可用内容中提取）
  const allAvailableContent = [
    currentPlanState.experimentalDesign,
    currentPlanState.analysisMethod,
    currentPlanState.expectedResults,
    currentPlanState.researchQuestions,
    currentPlanState.methodology
  ].filter(content => content && content.trim().length > 10).join(' ')
  
  if (allAvailableContent.length > 50) {
    console.log('尝试从方案内容中提取标题')
    const titleFromAllContent = extractTitleFromContent(allAvailableContent)
    if (titleFromAllContent) {
      console.log('从方案内容提取的标题:', titleFromAllContent)
      return titleFromAllContent
    }
  }
  
  // 策略6：基于时间的智能默认标题（更具描述性）
  const now = new Date()
  const timeStr = `${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`
  const referencedCount = Array.from(papersState.referencedPapersList).length
  
  let smartDefaultTitle = ''
  if (referencedCount > 0) {
          smartDefaultTitle = `Quantitative Research Proposal Based on ${referencedCount} Papers`
  } else if (generationInfo.mode === 'custom') {
          smartDefaultTitle = 'User Custom Research Proposal'
  } else {
          smartDefaultTitle = 'AI Generated Research Proposal'
  }
  
  const finalTitle = `${smartDefaultTitle}-${timeStr}`
  console.log('使用智能默认标题:', finalTitle)
  return finalTitle
}

// 新增：从内容中提取标题的函数
const extractTitleFromContent = (content) => {
  if (!content || content.length < 10) return null
  
  // 提取关键概念和技术术语
  const keywordPatterns = [
    // 技术和方法相关 (中英文)
    /(?:基于|使用|采用|通过|based on|using|through|with)([^，。！？.,!?]{3,15}?)(?:的|技术|方法|算法|系统|平台|technology|method|algorithm|system|platform)/gi,
    // 研究对象和领域 (中英文)
    /([A-Za-z\u4e00-\u9fa5]{3,15}?)(?:对|与|在|on|with|in|for)([^，。！？.,!?]{3,15}?)(?:的影响|的关系|的效果|中的应用|impact|relationship|effect|application)/gi,
    // 实验和测试相关 (中英文)
    /(?:实验|测试|验证|评估|experiment|test|validation|evaluation)([^，。！？.,!?]{3,15}?)(?:的|效果|性能|准确性|effect|performance|accuracy)/gi,
    // 界面和交互相关 (中英文)
    /([^，。！？.,!?]{3,15}?)(?:界面|交互|设计|体验|用户体验|interface|interaction|design|experience|user experience|UI|UX)/gi,
    // AI和智能相关 (中英文)
    /(人工智能|机器学习|深度学习|神经网络|AI|智能|artificial intelligence|machine learning|deep learning|neural network|intelligent)[^，。！？.,!?]{0,10}?(?:在|对|与|in|on|for|with)([^，。！？.,!?]{3,15})/gi,
    // 英文专有名词和概念
    /\b([A-Z][a-zA-Z]{2,14})\s+(technology|system|method|approach|framework|model|algorithm)\b/gi,
    /\b(virtual reality|augmented reality|human-computer interaction|user interface|machine learning|deep learning|natural language processing|computer vision|VR|AR|HCI|NLP|CV)\b/gi
  ]
  
  const extractedKeywords = new Set()
  
  for (const pattern of keywordPatterns) {
    let match
    while ((match = pattern.exec(content)) !== null) {
      if (match[1] && match[1].trim().length > 2) {
        extractedKeywords.add(match[1].trim())
      }
      if (match[2] && match[2].trim().length > 2) {
        extractedKeywords.add(match[2].trim())
      }
    }
  }
  
  // 清理和筛选关键词
  const cleanedKeywords = Array.from(extractedKeywords)
    .filter(keyword => 
      keyword.length > 2 && 
      keyword.length < 15 &&
      !keyword.includes('假设') &&
      !keyword.includes('实验') &&
      !keyword.includes('研究') &&
      !keyword.includes('分析') &&
      !keyword.includes('方法') &&
      !keyword.includes('用户') &&
      !keyword.includes('数据') &&
      !keyword.includes('结果') &&
      !keyword.includes('hypothesis') &&
      !keyword.includes('experiment') &&
      !keyword.includes('research') &&
      !keyword.includes('analysis') &&
      !keyword.includes('method') &&
      !keyword.includes('user') &&
      !keyword.includes('data') &&
      !keyword.includes('result')
    )
    .slice(0, 2) // 最多取2个关键词
  
  if (cleanedKeywords.length > 0) {
    let title = cleanedKeywords.join(' and ')
    if (title.length > 30) {
      title = cleanedKeywords[0]
    }
    // 添加研究后缀
    if (!title.includes('研究') && !title.includes('分析') && !title.includes('评估') &&
        !title.includes('Research') && !title.includes('Analysis') && !title.includes('Study')) {
      title += ' Research'
    }
    return title
  }
  
  return null
}

// 新增：从用户需求中提取标题的函数
const extractTitleFromRequirements = (requirements) => {
  if (!requirements || requirements.length < 10) return null
  
  // 提取研究主题关键词
  const topicKeywords = []
  
  // 更全面的研究主题模式
  const patterns = [
    /(?:探讨|研究|分析|调查|实验|测试|评估)([^。！？\n]{3,25}?)(?:的影响|的关系|的效果|的作用|研究|分析|实验|$)/g,
    /([^。！？\n]{3,15}?)(?:对|与)([^。！？\n]{3,15}?)(?:的影响|的关系|的效果|的作用)/g,
    /(?:关于|针对|面向|基于)([^。！？\n]{3,20}?)(?:的|进行|研究|分析)/g,
    /([A-Za-z\u4e00-\u9fa5]{3,20}?)(?:系统|平台|工具|方法|技术|设计|界面|交互|应用|效果)/g,
    /(?:提高|改善|优化|增强)([^。！？\n]{3,20}?)(?:的|效果|性能|体验)/g,
    /([^。！？\n]{3,20}?)(?:在|中的)([^。！？\n]{3,20}?)(?:应用|使用|效果)/g,
    // 新增模式
    /(?:如何|怎样)([^。！？\n]{3,20}?)(?:影响|改善|提升)/g,
    /([^。！？\n]{3,15}?)(?:与|和)([^。！？\n]{3,15}?)(?:之间的关系|的关联)/g,
    /比较([^。！？\n]{3,15}?)(?:与|和)([^。！？\n]{3,15})/g
  ]
  
  for (const pattern of patterns) {
    let match
    while ((match = pattern.exec(requirements)) !== null) {
      if (match[1] && match[1].trim().length > 2) {
        topicKeywords.push(match[1].trim())
      }
      if (match[2] && match[2].trim().length > 2) {
        topicKeywords.push(match[2].trim())
      }
    }
  }
  
  // 去重并选择最有意义的关键词
  const uniqueKeywords = [...new Set(topicKeywords)]
    .filter(keyword => 
      keyword.length > 2 && 
      keyword.length < 20 &&
      !keyword.includes('用户') && 
      !keyword.includes('我们') &&
      !keyword.includes('他们') &&
      !keyword.includes('这个') &&
      !keyword.includes('那个') &&
      !keyword.includes('什么') &&
      !keyword.includes('如何') &&
      !keyword.includes('怎么') &&
      !keyword.includes('方式') &&
      !keyword.includes('方法')
    )
    .slice(0, 3)
  
  if (uniqueKeywords.length > 0) {
    // 清理关键词，移除多余词汇
    const cleanedKeywords = uniqueKeywords.map(kw => 
      kw.replace(/^(对|与|的|在|中|和)/, '').replace(/(的|效果|影响|关系)$/, '').trim()
    ).filter(kw => kw.length > 1)
    
    if (cleanedKeywords.length > 0) {
      // 组合关键词生成标题
      let title = cleanedKeywords.join('与')
      if (title.length > 25) {
        title = cleanedKeywords[0]
      }
      // 如果标题不包含"研究"相关词汇，则添加
      if (!title.includes('研究') && !title.includes('分析') && !title.includes('评估')) {
        title += '研究'
      }
      return title
    }
  }
  
  return null
}

// 新增：从参考文献中提取标题的函数
const extractTitleFromPapers = (referencedPapers) => {
  if (!referencedPapers || referencedPapers.length === 0) return null
  
  // 从参考文献标题中提取共同主题
  const paperTitles = referencedPapers.map(paper => paper.title).join(' ')
  
  // 提取高频关键词
  const commonKeywords = []
  const keywordPatterns = [
    /([A-Za-z]+(?:\s+[A-Za-z]+){0,2})/g, // 英文关键词组
    /([\u4e00-\u9fa5]{2,8})/g, // 中文关键词
    // 新增：特定领域术语
    /(人工智能|机器学习|深度学习|神经网络|计算机视觉|自然语言处理|人机交互|用户体验|界面设计)/g,
    /(算法|模型|系统|平台|框架|工具|方法|技术)/g
  ]
  
  for (const pattern of keywordPatterns) {
    let match
    while ((match = pattern.exec(paperTitles)) !== null) {
      const keyword = match[1].trim().toLowerCase()
      if (keyword.length > 2 && 
          !keyword.includes('study') && 
          !keyword.includes('research') &&
          !keyword.includes('analysis') &&
          !keyword.includes('method') &&
          !keyword.includes('approach') &&
          !keyword.includes('based') &&
          !keyword.includes('using')) {
        commonKeywords.push(match[1].trim()) // 保持原始大小写
      }
    }
  }
  
  // 统计词频并选择最高频的词
  const keywordCount = {}
  commonKeywords.forEach(keyword => {
    const normalizedKeyword = keyword.toLowerCase()
    keywordCount[normalizedKeyword] = (keywordCount[normalizedKeyword] || 0) + 1
  })
  
  const sortedKeywords = Object.entries(keywordCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(entry => {
      // 找到原始大小写的版本
      const originalKeyword = commonKeywords.find(kw => kw.toLowerCase() === entry[0])
      return originalKeyword || entry[0]
    })
  
  if (sortedKeywords.length > 0) {
    let title = sortedKeywords.join('与')
    if (title.length > 25) {
      title = sortedKeywords[0]
    }
    const finalTitle = title + '研究'
    return finalTitle
  }
  
  return null
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
  console.log('🧪 ResearchPlanDetail组件已挂载')
  
  // 将统计方法点击处理函数暴露到全局window对象
  if (typeof window !== 'undefined') {
    console.log('🔍 jumpToStatisticalMethodQuery函数类型:', typeof jumpToStatisticalMethodQuery)
    
    // 创建一个全局处理函数
    window.handleStatisticalMethodClick = async (encodedMethodName) => {
      try {
        console.log('🔍 处理统计方法点击:', encodedMethodName)
        await jumpToStatisticalMethodQuery(encodedMethodName)
      } catch (error) {
        console.error('处理统计方法点击失败:', error)
        alert('Navigation failed, please try again later')
      }
    }
    
    // 保持原有的全局函数
    window.jumpToStatisticalMethodQuery = jumpToStatisticalMethodQuery
    
    console.log('✅ 统计方法处理函数已暴露到全局')
    console.log('🔍 验证全局函数:', typeof window.handleStatisticalMethodClick)
    
    // 测试函数是否可以调用
    setTimeout(() => {
      console.log('🧪 测试全局函数是否可用:', typeof window.handleStatisticalMethodClick)
    }, 1000)
  }
  
  if (historyState.currentViewingPlan) {
    // 延迟一点再加载，确保当前方案数据已经初始化完成
    setTimeout(() => {
      loadHistoryPlan(historyState.currentViewingPlan)
    }, 100)
  }
  
  // 测试基础Markdown渲染
  console.log('=== 测试基础Markdown渲染 ===')
  const basicTest = `**粗体文本**和*斜体文本*`
  console.log('基础测试:', basicTest)
  const basicResult = safeMarkdownRender(basicTest, false)
  console.log('基础渲染结果:', basicResult)
  
  // 测试统计方法链接
  console.log('=== 测试统计方法链接 ===')
  const methodTest = `我们使用t检验和方差分析进行数据分析。`
  console.log('方法测试:', methodTest)
  const methodResult = safeMarkdownRender(methodTest, true)
  console.log('方法渲染结果:', methodResult)
  console.log('=== 测试完成 ===')
  
  // 检查当前方案状态
  console.log('当前方案状态:', {
    isGenerated: currentPlanState.isGenerated,
    hasAnalysisMethod: !!currentPlanState.analysisMethod,
    analysisMethodLength: currentPlanState.analysisMethod?.length || 0,
    analysisMethodPreview: currentPlanState.analysisMethod?.substring(0, 100) + '...'
  })
  
  // 添加键盘事件监听
  document.addEventListener('keydown', handleKeydown)
  
  // 检查是否需要显示新手指引
  if (shouldShowTutorial()) {
    // 延迟一点时间，确保页面完全加载
    setTimeout(() => {
      startTutorial()
    }, 1000)
  }
})

// 重置右侧研究方案展示状态（对话切换时调用）
const resetPlanDisplayState = () => {
  console.log('🔄 对话切换：重置右侧研究方案展示状态')
  
  // 重置当前方案状态为未生成状态
  currentPlanState.isGenerated = false
  currentPlanState.title = ''
  currentPlanState.hypotheses = []
  currentPlanState.experimentalDesign = ''
  currentPlanState.analysisMethod = ''
  currentPlanState.expectedResults = ''
  currentPlanState.researchQuestions = ''
  currentPlanState.methodology = ''
  currentPlanState.dataCollection = ''
  currentPlanState.timeline = ''
  currentPlanState.lastUpdated = ''
  
  // 重置历史方案查看状态
  isViewingHistoryPlan.value = false
  clearCurrentViewingPlan() // 清空历史方案查看状态
  
  // 重置UI状态
  activeSection.value = 'full'
  analysisSubSection.value = 'methodology'
  
  console.log('✅ 研究方案展示状态已重置')
}

// 监听对话ID变化，当用户切换对话时重置右侧展示
watch(() => chatState.conversationId, (newConversationId, oldConversationId) => {
  console.log('🔄 检测到对话ID变化:', { 
    from: oldConversationId, 
    to: newConversationId 
  })
  
  // 如果是从一个有效的对话切换到另一个对话（不是初始化）
  if (oldConversationId !== undefined && oldConversationId !== newConversationId) {
    console.log('🔄 执行对话切换重置')
    resetPlanDisplayState()
  }
}, { immediate: false }) // 不需要立即执行

// 组件卸载时清理全局函数
onUnmounted(() => {
  if (typeof window !== 'undefined') {
    if (window.jumpToStatisticalMethodQuery) {
      delete window.jumpToStatisticalMethodQuery
      console.log('🧹 已清理全局函数 jumpToStatisticalMethodQuery')
    }
    if (window.handleStatisticalMethodClick) {
      delete window.handleStatisticalMethodClick
      console.log('🧹 已清理全局函数 handleStatisticalMethodClick')
    }
  }
  
  // 移除键盘事件监听
  document.removeEventListener('keydown', handleKeydown)
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

  // Evaluate research plan
  const evaluatePlan = async () => {
    if (isEvaluating.value || !currentPlanState) return
    
    try {
      isEvaluating.value = true
      
      // Extract user requirements from conversation history
      const conversationContext = extractConversationContext()
      
      // Use PromptService to generate evaluation prompt
      const promptData = {
        planContent: `# Research Hypothesis:
${currentPlanState.hypotheses ? currentPlanState.hypotheses.join('\n') : ''}

# Experimental Design:
${currentPlanState.experimentalDesign || ''}

# Data Analysis:
${currentPlanState.analysisMethod || ''}

# Results Presentation:
${currentPlanState.expectedResults || ''}`,
        hasUserRequirements: conversationContext.hasUserRequirements,
        userRequirements: conversationContext.userRequirements,
        researchContext: conversationContext.researchContext
      }
      
      const evaluationPrompt = PromptService.generatePlanEvaluationPrompt(promptData)

      console.log('Evaluation prompt includes user requirements:', conversationContext.hasUserRequirements)

      // Send message to conversation
      await sendMessage(evaluationPrompt)
      
      // Show notification message
      setTimeout(() => {
        alert('Evaluation request sent, please wait for AI assistant evaluation results.')
      }, 500)

      // Set a timer to reset evaluation status after 10 seconds
      // This prevents evaluation status from persisting too long, even if no response is received
      setTimeout(() => {
        if (isEvaluating.value) {
          console.log('Evaluation status timeout, automatically reset')
          isEvaluating.value = false
        }
      }, 10000)

    } catch (error) {
      console.error('Plan evaluation failed:', error)
      alert('Failed to evaluate plan, please try again')
      isEvaluating.value = false
    }
  }

// Evaluate specific sections of research plan
const evaluateSectionPlan = async (section) => {
  if (isEvaluatingSection.value || !currentPlanState) return
  
  try {
    isEvaluatingSection.value = true
    evaluatingSection.value = section
    
    // Extract user requirements from conversation history
    const conversationContext = extractConversationContext()
    
    // Get corresponding content and English names based on section
    let sectionContent = ''
    let sectionName = ''
    
    switch (section) {
      case 'full':
        sectionName = 'Complete Plan'
        sectionContent = `Research Hypothesis: ${currentPlanState.hypotheses ? currentPlanState.hypotheses.join('\n') : ''}
Experimental Design: ${currentPlanState.experimentalDesign || ''}
Data Analysis: ${currentPlanState.analysisMethod || ''}
Results Presentation: ${currentPlanState.expectedResults || ''}`
        break
      case 'hypothesis':
        sectionName = 'Research Hypothesis'
        sectionContent = currentPlanState.hypotheses ? currentPlanState.hypotheses.join('\n') : ''
        break
      case 'design':
        sectionName = 'Experimental Design'
        sectionContent = currentPlanState.experimentalDesign || ''
        break
      case 'analysis':
        sectionName = 'Data Analysis'
        sectionContent = currentPlanState.analysisMethod || ''
        break
      case 'results':
        sectionName = 'Results Presentation'
        sectionContent = currentPlanState.expectedResults || ''
        break
      default:
        alert('Unsupported evaluation section')
      return
    }
    
    if (!sectionContent.trim()) {
      alert(`Current ${sectionName} section is empty, cannot perform evaluation`)
      isEvaluatingSection.value = false
      evaluatingSection.value = ''
      return
    }
    
    // Use PromptService to generate section evaluation prompt
    const promptData = {
      sectionName,
      sectionContent,
      fullPlanContent: `# Research Hypothesis:
${currentPlanState.hypotheses ? currentPlanState.hypotheses.join('\n') : ''}

# Experimental Design:
${currentPlanState.experimentalDesign || ''}

# Data Analysis:
${currentPlanState.analysisMethod || ''}

# Results Presentation:
${currentPlanState.expectedResults || ''}`,
      hasUserRequirements: conversationContext.hasUserRequirements,
      userRequirements: conversationContext.userRequirements,
      researchContext: conversationContext.researchContext
    }
    
    const evaluationPrompt = PromptService.generateSectionEvaluationPrompt(promptData)

    console.log(`Evaluating ${sectionName} section, includes user requirements:`, conversationContext.hasUserRequirements)

    // Send message to conversation
    await sendMessage(evaluationPrompt)
    
    // Show notification message
    setTimeout(() => {
      alert(`${sectionName} section evaluation request sent, please wait for AI assistant results.`)
    }, 500)

    // Set a timer to reset evaluation status after 10 seconds
    setTimeout(() => {
      if (isEvaluatingSection.value) {
        console.log('Section evaluation status timeout, automatically reset')
        isEvaluatingSection.value = false
        evaluatingSection.value = ''
      }
    }, 10000)

  } catch (error) {
    console.error(`${sectionName} section evaluation failed:`, error)
    alert(`Failed to evaluate ${sectionName} section, please try again`)
    isEvaluatingSection.value = false
    evaluatingSection.value = ''
  }
}

// 根据用户建议动态生成优化要求的辅助函数
const generateOptimizationRequirements = (suggestion) => {
      const suggestionLower = suggestion.toLowerCase()
      let requirements = []
      let focusAreas = []
              let tone = "You are a senior HCI research expert"
      
      // 分析用户建议类型并生成相应要求
      if (suggestionLower.includes('自动迭代优化') || suggestionLower.includes('全面优化')) {
        tone += "，需要对研究方案进行全面的智能优化"
        requirements = [
          "**全面提升**：从理论基础、方法设计、数据分析、结果呈现等各个维度进行综合优化",
          "**平衡改进**：在保持方案整体协调性的基础上，适度提升各部分的专业深度",
          "**智能调整**：根据方案的薄弱环节，自动识别并重点强化需要改进的部分"
        ]
        focusAreas = ["整体协调性", "方法论完整性", "学术规范性"]
      }
      
      else if (suggestionLower.includes('提高科学严谨性') || suggestionLower.includes('严谨性')) {
        tone += "，需要重点提升研究方案的科学严谨性"
        requirements = [
          "**方法论严谨性**：确保研究设计的逻辑性、控制变量的完整性、因果推断的有效性",
          "**统计严谨性**：使用正确的统计方法、设置合理的显著性水平、考虑效应量和统计功效",
          "**伦理规范性**：确保研究符合学术伦理要求、被试权益保护、数据隐私安全"
        ]
        focusAreas = ["研究设计的内外部效度", "统计分析的规范性", "结果解释的客观性"]
      }
      
      else if (suggestionLower.includes('增加更多细节') || suggestionLower.includes('细节') || suggestionLower.includes('详细')) {
        tone += "，需要大幅增加研究方案的具体细节"
        requirements = [
          "**操作细节丰富化**：提供具体的数值参数、详细的操作步骤、明确的时间安排",
          "**技术规范细化**：包含设备型号、软件版本、实验环境配置等技术细节",
          "**实施指南详细化**：提供可直接执行的操作手册，包括人员配置、材料准备、质量控制"
        ]
        focusAreas = ["具体参数设置", "操作流程细化", "实施标准明确"]
      }
      
      else if (suggestionLower.includes('简化表述') || suggestionLower.includes('简化') || suggestionLower.includes('精简')) {
        tone += "，需要简化和精炼研究方案的表述"
        requirements = [
          "**表述精炼化**：去除冗余描述，保留核心要点，使表达更加简洁明了",
          "**结构清晰化**：优化段落结构，使用更清晰的逻辑层次，便于理解和执行",
          "**要点突出化**：突出关键信息，减少次要细节，确保重点内容一目了然"
        ]
        focusAreas = ["表达简洁性", "逻辑清晰度", "重点突出性"]
      }
      
      else if (suggestionLower.includes('统计方法') || suggestionLower.includes('数据分析方法')) {
        tone += "，需要重点优化统计分析方法部分"
        requirements = [
          "**统计方法选择优化**：确保统计方法与研究设计和假设相匹配，提供选择依据",
          "**分析流程细化**：详细描述数据预处理、假设检验、后续分析的完整流程",
          "**统计软件和工具**：明确使用的统计软件、具体函数包、分析代码框架"
        ]
        focusAreas = ["统计方法的适用性", "分析流程的完整性", "结果解释的准确性"]
      }
      
      else if (suggestionLower.includes('数据处理流程') || suggestionLower.includes('数据处理')) {
        tone += "，需要重点优化数据收集和处理流程"
        requirements = [
          "**数据收集优化**：完善数据收集方法、提高数据质量标准、增强数据完整性",
          "**预处理流程细化**：详细描述数据清洗、异常值处理、缺失值处理的具体步骤",
          "**质量控制强化**：建立数据质量检查机制、设置数据验证标准、确保数据可靠性"
        ]
        focusAreas = ["数据收集的标准化", "处理流程的规范性", "质量控制的有效性"]
      }
      
      else if (suggestionLower.includes('效应量分析') || suggestionLower.includes('效应量')) {
        tone += "，需要重点补充和完善效应量分析"
        requirements = [
          "**效应量计算**：为每个统计检验添加相应的效应量指标（如Cohen's d, η², R²等）",
          "**效应量解释**：提供效应量的实际意义解释和临界值参考标准",
          "**统计功效分析**：进行事前功效分析确定样本量，事后功效分析验证结果可靠性"
        ]
        focusAreas = ["效应量的计算方法", "实际意义的解释", "统计功效的评估"]
      }
      
      else if (suggestionLower.includes('统计假设检验') || suggestionLower.includes('假设检验')) {
        tone += "，需要完善统计假设检验部分"
        requirements = [
          "**假设设定规范化**：明确零假设和备择假设的具体表述，确保逻辑清晰",
          "**检验条件验证**：检查统计检验的前提条件，如正态性、方差齐性、独立性等",
          "**多重比较校正**：考虑多重检验问题，选择合适的校正方法（如Bonferroni、FDR等）"
        ]
        focusAreas = ["假设的明确性", "前提条件的满足", "多重比较的控制"]
      }
      
      else {
        // 默认情况：根据建议内容进行针对性优化
        tone += "，需要根据具体建议进行针对性优化"
        requirements = [
          "**针对性改进**：重点关注建议中提到的具体问题和改进方向",
          "**保持平衡**：在改进的同时保持方案的整体协调性和完整性",
          "**质量提升**：确保优化后的方案在指定方面有显著的质量提升"
        ]
        focusAreas = ["建议的针对性实施", "整体方案的协调性", "改进效果的显著性"]
      }
      
      return { tone, requirements, focusAreas }
    }

// 根据优化建议类型生成相应的验证标准的辅助函数
const generateValidationCriteria = (suggestion) => {
  const suggestionLower = suggestion.toLowerCase()
  let criteria = []
  let qualityRequirements = []
  let checklist = []
  
  if (suggestionLower.includes('自动迭代优化') || suggestionLower.includes('全面优化')) {
    criteria = [
      "**平衡性检查**：确保各部分都有适度的改进，没有明显的薄弱环节",
      "**整体性验证**：各部分之间的逻辑关联更加紧密，形成完整的方法论体系",
      "**质量提升确认**：整体方案的学术水平和可操作性都有显著提升"
    ]
    checklist = ["整体协调性", "方法论完整性", "学术规范性"]
  }
  
  else if (suggestionLower.includes('提高科学严谨性') || suggestionLower.includes('严谨性')) {
    criteria = [
      "**逻辑严谨性检查**：研究设计的内外部效度得到加强，因果推断更加可靠",
      "**统计规范性验证**：统计方法选择正确，假设检验设置合理，结果解释客观",
      "**伦理合规性确认**：研究程序符合学术伦理要求，被试权益得到充分保护"
    ]
    checklist = ["逻辑一致性", "统计规范性", "伦理合规性"]
  }
  
  else if (suggestionLower.includes('增加更多细节') || suggestionLower.includes('细节')) {
    criteria = [
      "**细节丰富度验证**：包含具体的数值参数、操作步骤、技术规范等详细信息",
      "**可操作性检查**：每个环节都有具体的执行指导，可直接用于实际研究",
      "**完整性确认**：关键信息无遗漏，技术细节充分详细"
    ]
    qualityRequirements = [
      "提供具体的数值参数（如样本量、时间安排、设备型号）",
      "包含详细的操作步骤和质量控制标准",
      "明确工具选择和技术规范（如软件版本、分析包名称）"
    ]
    checklist = ["参数具体性", "操作详细性", "技术完整性"]
  }
  
  else if (suggestionLower.includes('简化表述') || suggestionLower.includes('简化')) {
    criteria = [
      "**简洁性检查**：表述更加精炼，去除冗余内容，重点突出",
      "**清晰度验证**：逻辑结构更加清晰，便于理解和执行",
      "**保质简化确认**：简化的同时保持核心内容的完整性和准确性"
    ]
    qualityRequirements = [
      "去除冗余表述，保留关键信息",
      "使用简洁明了的语言，避免复杂的术语堆砌",
      "突出重点内容，次要信息适当简化"
    ]
    checklist = ["表达简洁性", "逻辑清晰度", "重点突出性"]
  }
  
  else if (suggestionLower.includes('统计方法') || suggestionLower.includes('数据分析方法')) {
    criteria = [
      "**方法适配性检查**：统计方法与研究设计和数据类型完全匹配",
      "**分析完整性验证**：包含完整的分析流程，从预处理到结果解释",
      "**技术规范性确认**：统计软件、函数包、参数设置都明确具体"
    ]
    qualityRequirements = [
      "明确统计方法的选择理由和适用条件",
      "提供详细的数据分析流程和备选方案",
      "包含具体的软件工具和分析代码框架"
    ]
    checklist = ["方法选择正确性", "分析流程完整性", "技术实施可行性"]
  }
  
  else if (suggestionLower.includes('数据处理流程') || suggestionLower.includes('数据处理')) {
    criteria = [
      "**流程完整性检查**：数据收集、清洗、处理、验证的完整流程",
      "**质量标准验证**：每个处理环节都有明确的质量控制标准",
      "**可追溯性确认**：处理过程可记录、可重现、可验证"
    ]
    qualityRequirements = [
      "详细描述数据收集的标准化流程",
      "提供数据清洗和预处理的具体步骤",
      "建立数据质量检查和异常处理机制"
    ]
    checklist = ["收集标准化", "处理规范性", "质量控制有效性"]
  }
  
  else if (suggestionLower.includes('效应量分析') || suggestionLower.includes('效应量')) {
    criteria = [
      "**效应量完整性检查**：每个统计检验都配有相应的效应量指标",
      "**解释准确性验证**：效应量的实际意义解释清晰、准确",
      "**标准一致性确认**：效应量评判标准与学科惯例一致"
    ]
    qualityRequirements = [
      "为每种统计方法指定合适的效应量指标",
      "提供效应量的临界值和解释标准",
      "结合统计功效分析进行样本量计算"
    ]
    checklist = ["效应量计算完整性", "解释标准准确性", "实际意义明确性"]
  }
  
  else if (suggestionLower.includes('统计假设检验') || suggestionLower.includes('假设检验')) {
    criteria = [
      "**假设设定规范性检查**：零假设和备择假设表述清晰、逻辑正确",
      "**检验条件验证**：统计检验的前提条件得到充分验证",
      "**多重比较控制确认**：适当考虑并控制多重比较问题"
    ]
    qualityRequirements = [
      "明确每个统计检验的假设设定",
      "验证统计检验的前提条件（正态性、方差齐性等）",
      "选择合适的多重比较校正方法"
    ]
    checklist = ["假设设定明确性", "前提条件满足性", "多重比较控制"]
  }
  
  else {
    // 默认验证标准
    criteria = [
      "**改进针对性检查**：优化内容准确回应了用户的具体建议",
      "**质量提升验证**：在建议的方向上有明显的改进效果",
      "**整体协调性确认**：改进的同时保持了方案的整体协调性"
    ]
    checklist = ["建议响应度", "改进显著性", "整体协调性"]
  }
  
  return { criteria, qualityRequirements, checklist }
}

// 带建议的完整方案迭代
const iteratePlanWithSuggestion = async (suggestion) => {
  if (isIterating.value || !currentPlanState) return

  try {
    isIterating.value = true
    
    console.log('开始迭代完整方案，建议:', suggestion)
    
    // 存储迭代前的方案快照
    storeIterationSnapshot('full', suggestion)

    // 提取对话历史中的用户需求
    const conversationContext = extractConversationContext()
    
    // 使用PromptService生成完整方案迭代提示词
    const promptData = {
      suggestion,
      planContent: JSON.stringify({
        title: currentPlanState.title || '定量研究方案',
        hypotheses: currentPlanState.hypotheses || [],
        experimentalDesign: currentPlanState.experimentalDesign || '',
        analysisMethod: currentPlanState.analysisMethod || '',
        expectedResults: currentPlanState.expectedResults || ''
      }, null, 2),
      hasUserRequirements: conversationContext.hasUserRequirements,
      userRequirements: conversationContext.userRequirements,
      researchContext: conversationContext.researchContext
    }
    
    const iterationPrompt = PromptService.generateFullPlanIterationPrompt(promptData)

    console.log('迭代提示包含用户需求:', conversationContext.hasUserRequirements)
    
    // 发送消息到对话
    await sendMessage(iterationPrompt)
    
    // 等待AI响应
    console.log('等待AI响应...')
    const response = await waitForResponse()
    
    // 解析AI响应
    console.log('收到AI响应，开始解析...')
    
    // 准备迭代上下文
    const iterationContext = {
      isIteration: true,
      iterationType: 'complete',
      iterationSuggestion: suggestion,
      iterateTime: new Date().toISOString()
    }
    
    await parseResearchPlanResponse(response.content, iterationContext)
    
    // 完成迭代，记录对比数据
    await completeIteration(response.id)
    
    // 解析成功，显示成功提示
          alert('Plan iteration successful! The complete research plan has been optimized based on your suggestions.')

  } catch (error) {
    console.error('迭代方案失败:', error)
          alert(`Failed to iterate plan: ${error.message}`)
  } finally {
    isIterating.value = false
  }
}

// 带建议的部分迭代
const iterateSectionPlan = async (section, suggestion) => {
  if (isIterating.value || !currentPlanState) return
  
  try {
    isIterating.value = true
    
    console.log(`开始迭代${section}部分，建议:`, suggestion)
    
    // 存储迭代前的方案快照
    storeIterationSnapshot(section, suggestion)
    
    // 获取部分名称和内容
    const sectionName = getSectionNameInEnglish(section)
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
        alert('Unsupported section')
        isIterating.value = false
        return
    }
    
    if (!sectionContent.trim()) {
      alert(`Current ${sectionName} section is empty, cannot perform iteration`)
      isIterating.value = false
      return
    }
    
    // 提取对话历史中的用户需求
    const conversationContext = extractConversationContext()
    
    // 使用PromptService生成部分迭代提示词
    const promptData = {
      section,
      sectionName,
      suggestion,
      hypotheses: currentPlanState.hypotheses ? currentPlanState.hypotheses.join('\n') : '',
      experimentalDesign: currentPlanState.experimentalDesign || '',
      analysisMethod: currentPlanState.analysisMethod || '',
      expectedResults: currentPlanState.expectedResults || '',
      hasUserRequirements: conversationContext.hasUserRequirements,
      userRequirements: conversationContext.userRequirements,
      researchContext: conversationContext.researchContext
    }
    
    const iterationPrompt = PromptService.generateSectionIterationPrompt(promptData)
    
    console.log(`发送${sectionName}部分迭代请求`)
    
    // 发送消息到对话
    await sendMessage(iterationPrompt)
    
    // 等待AI响应
    console.log('等待AI响应...')
    const response = await waitForResponse()
    
    // 解析AI响应
    console.log('收到AI响应，开始解析...')
    
    // 准备迭代上下文
    const iterationContext = {
      isIteration: true,
      iterationType: 'partial',
      iterationSuggestion: suggestion,
      iteratedSection: section,
      iteratedSectionName: sectionName,
      iterateTime: new Date().toISOString()
    }
    
    await parseResearchPlanResponse(response.content, iterationContext)
    
    // 完成迭代，记录对比数据
    await completeIteration(response.id)
    
    // 解析成功，显示成功提示
          alert(`${sectionName} section iteration successful! Content has been optimized based on your suggestions.`)
    
  } catch (error) {
    console.error(`迭代${section}部分失败:`, error)
          alert(`Iteration failed: ${error.message}`)
  } finally {
    isIterating.value = false
  }
}

// 查询统计方法
const queryStatisticalMethod = async () => {
  if (!statisticalMethodQuery.value.trim()) {
    alert('Please enter the statistical method name to search')
    return
  }

  isQuerying.value = true
  statisticalMethodResult.value = ''

  try {
    console.log('🔍 查询统计方法:', statisticalMethodQuery.value.trim())
    
    // 调用AI服务适配器
    const { queryStatisticalMethod } = await import('../services/aiServiceAdapter.js')
    const data = await queryStatisticalMethod(statisticalMethodQuery.value.trim())
    
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

// Generate source introduction
const generateSourceIntroduction = async () => {
  if (isGeneratingSource.value) return
  
  // Check if research plan has been generated
  if (!hasGeneratedPlan.value) {
    alert('Please generate a research plan first before generating source introduction')
    return
  }
  
  // Check if there are reference papers
  const referencedPapers = Array.from(papersState.referencedPapersList)
  if (referencedPapers.length === 0) {
    alert('Please select reference papers first before generating source introduction')
    return
  }
  
  isGeneratingSource.value = true
  
  try {
    // Get current section content
    let currentSectionContent = ''
    let sectionName = ''
    
    switch (activeSection.value) {
      case 'hypothesis':
        currentSectionContent = currentPlanState.hypotheses ? currentPlanState.hypotheses.join('\n') : ''
        sectionName = 'Research Hypothesis'
        break
      case 'design':
        currentSectionContent = currentPlanState.experimentalDesign || ''
        sectionName = 'Experimental Design'
        break
      case 'analysis':
        currentSectionContent = currentPlanState.analysisMethod || ''
        sectionName = 'Data Analysis'
        break
      case 'results':
        currentSectionContent = currentPlanState.expectedResults || ''
        sectionName = 'Results Presentation'
        break
      default:
        alert('Current section does not support generating source introduction')
        return
    }
    
    if (!currentSectionContent.trim()) {
      alert(`Current ${sectionName} section is empty, cannot generate source introduction`)
      return
    }
    
    // Get current AI service type
    const { getCurrentAIService } = await import('../stores/aiServiceStore.js')
    const currentAIService = getCurrentAIService()
    
    // Build reference papers information
    let referencesInfo = ''
    const paperInfoArray = []
    
    for (let i = 0; i < referencedPapers.length; i++) {
      const paper = referencedPapers[i]
      let paperInfo = `\nReference ${i + 1}:`
      paperInfo += `\nTitle: ${paper.title}`
      paperInfo += `\nAbstract: ${paper.abstract || paper.summary || 'No abstract available'}`
      
      let fullText = paper.fullText

      // If no full text, try to fetch it
      if (!fullText) {
        try {
          const { getApiBaseUrl } = await import('../config/environment.js')
          const getContentApiUrl = `${getApiBaseUrl()}/paper/get-full-content`
          console.log('📤 Getting full text API request URL:', getContentApiUrl)
          
          const response = await fetch(getContentApiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: paper.title,
              doi: paper.doi || null,
              aiService: currentAIService === 'chatgpt' ? 'chatgpt' : 'coze'
            })
          })
          
          if (response.ok) {
            const result = await response.json()
            if (result.success && result.fullText) {
              fullText = result.fullText
              paper.fullText = fullText // Update paper object
            }
          }
        } catch (error) {
          console.error(`Failed to get full text for paper "${paper.title}":`, error)
        }
      }

      // Prioritize full text content
      if (fullText) {
        paperInfo += `\nFull Text Content: ${fullText}`
      } else {
        // If no full text, fall back to research method summary
        if (paper.researchMethod) {
          paperInfo += `\nResearch Method Summary: ${paper.researchMethod}`
        } else {
          // If no research method summary, try to get from cache
          try {
            const { getApiBaseUrl } = await import('../config/environment.js')
            const getCachedMethodApiUrl = `${getApiBaseUrl()}/paper/get-cached-method`
            console.log('📤 Getting cached method API request URL:', getCachedMethodApiUrl)
            
            const response = await fetch(getCachedMethodApiUrl, {
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
                paperInfo += `\nResearch Method Summary: ${result.methodSummary}`
                // Update paper object
                paper.researchMethod = result.methodSummary
              } else {
                paperInfo += `\nResearch Method Summary: Not available`
              }
            } else {
              paperInfo += `\nResearch Method Summary: Not available`
            }
          } catch (error) {
            console.error('Failed to get research method summary:', error)
            paperInfo += `\nResearch Method Summary: Not available`
          }
        }
      }
      
      paperInfo += '\n'
      paperInfoArray.push({ paperInfo, fullText: fullText })
    }
    
    // Intelligent content length control in ChatGPT mode
    if (currentAIService === 'chatgpt') {
      console.log('🎯 ChatGPT Mode: Checking message length for source introduction generation, intelligently selecting reference content')
      
      // Build base prompt first (excluding reference papers)
      let basePrompt = `I will provide you with a research proposal and some reference papers that the research proposal refers to. Please analyze which reference papers the "${sectionName}" section of the following research proposal refers to in terms of research methods and generate a concise source introduction.

${sectionName} section of the research proposal:
${currentSectionContent}

Reference information:`
      
      // Use full text version directly
      referencesInfo = paperInfoArray.map(paperData => paperData.paperInfo).join('')
      
      const fullTextPrompt = basePrompt + referencesInfo
      
      // Check message length
      if (fullTextPrompt.length <= 250000) {
        console.log(`✅ Message length ${fullTextPrompt.length} characters, within limit, using full text version`)
      } else {
        console.log(`⚠️ Message length ${fullTextPrompt.length} characters, exceeds limit`)
        // Truncation logic can be added here if exceeding limit
      }
    } else {
      console.log('🔧 Coze Mode: Using standard reference processing')
      // Coze mode: use standard reference processing
      referencesInfo = paperInfoArray.map(paperData => paperData.paperInfo).join('')
    }
    
    // Use PromptService to generate source introduction prompt
    const conversationContext = extractConversationContext()
    const promptData = {
      section: activeSection.value,
      sectionName,
      sectionContent: currentSectionContent,
      referencesInfo,
      hasUserRequirements: conversationContext.hasUserRequirements,
      userRequirements: conversationContext.userRequirements,
      researchContext: conversationContext.researchContext
    }
    
    const prompt = PromptService.generateSourceIntroductionPrompt(promptData)

    console.log('Sending source introduction generation request:', prompt)
    console.log('Source introduction generation includes user requirements:', conversationContext.hasUserRequirements)
    console.log('Current section using prompt type:', activeSection.value)
    
    // Call AI service
    const { generateSourceIntroduction } = await import('../services/aiServiceAdapter.js')
    const result = await generateSourceIntroduction(
      prompt, 
      `source_intro_${activeSection.value}_${Date.now()}`
    )
    
    // Save source introduction to global state
    updateSourceIntroduction(activeSection.value, result)
    console.log(`Successfully generated source introduction for ${sectionName} section`)
    

    
  } catch (error) {
    console.error('Failed to generate source introduction:', error)
    alert(error.message || 'Failed to generate source introduction, please try again later')
  } finally {
    isGeneratingSource.value = false
  }
}

// Generate method introduction
const generateMethodIntroduction = async () => {
  if (isGeneratingMethod.value) return
  
  // Check if research plan has been generated
  if (!hasGeneratedPlan.value) {
    alert('Please generate a research plan first before generating method introduction')
    return
  }
  
  // Check if data analysis section has content
  const analysisContent = currentPlanState.analysisMethod || ''
  if (!analysisContent.trim()) {
    alert('Data analysis section is empty, cannot generate method introduction')
    return
  }
  
  isGeneratingMethod.value = true
  
  try {
    // Get current AI service type
    const { getCurrentAIService } = await import('../stores/aiServiceStore.js')
    const currentAIService = getCurrentAIService()
    
    // Use PromptService to generate method introduction prompt
    const conversationContext = extractConversationContext()
    const promptData = {
      analysisContent,
      hasUserRequirements: conversationContext.hasUserRequirements,
      userRequirements: conversationContext.userRequirements,
      researchContext: conversationContext.researchContext,
      aiService: currentAIService
    }
    
    const prompt = PromptService.generateMethodIntroductionPrompt(promptData)

    console.log('Sending method introduction generation request:', prompt.substring(0, 200) + '...')
    console.log('Method introduction generation includes user requirements:', conversationContext.hasUserRequirements)
    console.log('Current AI service:', currentAIService)
    
    // Call AI service
    const { generateMethodIntroduction } = await import('../services/aiServiceAdapter.js')
    const result = await generateMethodIntroduction(prompt)
    
    // Save generated method introduction
    generatedMethodIntro.value = result
    console.log('Successfully generated method introduction')
    
  } catch (error) {
    console.error('Method introduction generation failed:', error)
    alert(error.message || 'Failed to generate method introduction, please try again later')
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
    
    console.log('Applied historical plan as current plan, plan ID:', planId)
    alert('Historical plan has been applied as current plan!')
  }
}

// 显示迭代对话框
const showIterateDialog = (section) => {
  if (!currentPlanState || !hasGeneratedPlan.value) {
    alert('Please generate a research plan first')
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
  const sectionName = getSectionNameInEnglish(iteratingSection.value)
  return sectionName === 'Full Plan' ? 'Iterate Complete Research Plan' : `Iterate ${sectionName} Section`
}

// 获取部分名称的英文映射
const getSectionNameInEnglish = (section) => {
  const sectionMap = {
    'full': 'Full Plan',
    'hypothesis': 'Research Hypotheses',
    'design': 'Experimental Design',
    'analysis': 'Data Analysis',
    'results': 'Expected Results'
  }
  return sectionMap[section] || section
}

// 获取预设建议
const getPresetSuggestions = () => {
  const section = iteratingSection.value
  
  // 基础建议（所有部分都有）
  const baseSuggestions = [
    'Automatic iteration optimization',
    'Improve scientific rigor',
    'Add more details',
    'Simplify expression'
  ]
  
  // 特定部分的建议
  const sectionSpecificSuggestions = {
    'full': [
      'Optimize overall consistency between sections',
      'Enhance research innovation',
      'Improve plan operability',
      'Strengthen theoretical foundation'
    ],
    'hypothesis': [
      'Make hypotheses more specific and clear',
      'Add theoretical support',
      'Improve hypothesis verifiability',
      'Optimize variable definitions'
    ],
    'design': [
      'Refine experimental procedures',
      'Optimize sampling strategy',
      'Improve control variable settings',
      'Increase experimental reproducibility'
    ],
    'analysis': [
      'Add detailed description of statistical methods',
      'Optimize data processing workflow',
      'Supplement effect size analysis',
      'Improve statistical hypothesis testing'
    ],
    'results': [
      'Add visualization presentation methods',
      'Optimize logic of result interpretation',
      'Supplement practical significance of results',
      'Improve conclusion statements'
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
    alert('Please enter iteration suggestions')
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

// 显示方案对比
const showPlanComparison = async () => {
  console.log('🔍 开始执行方案对比功能...')
  console.log('📊 当前方案状态:', {
    hasPlan: !!currentPlanState,
    planId: currentPlanState?.id,
    planTitle: currentPlanState?.title,
    isGenerated: currentPlanState?.isGenerated,
    iterationHistoryCount: currentPlanState?.iterationHistory?.length || 0
  })
  
  try {
    // 首先检查是否有当前方案
    if (!currentPlanState || !currentPlanState.isGenerated) {
      alert('Please generate a research plan first')
      return
    }
    
    console.log('🔄 尝试从数据库获取迭代对比数据...')
    // 尝试从数据库获取迭代对比数据
    const comparison = await getIterationComparison()
    console.log('📋 数据库对比数据结果:', comparison)
    
    if (!comparison) {
      console.log('⚠️ 数据库中没有对比数据，尝试从本地获取...')
      // 检查是否有本地迭代历史
      const iterationHistory = currentPlanState.iterationHistory || []
      console.log('📚 本地迭代历史:', {
        count: iterationHistory.length,
        history: iterationHistory
      })
      
      if (iterationHistory.length === 0) {
        console.log('❌ 没有迭代历史，创建测试对比数据...')
        // 创建测试对比数据用于演示
        const testBeforePlan = {
          title: 'Test Plan - Original Version',
          hypotheses: ['H1: Test hypothesis 1', 'H2: Test hypothesis 2'],
          experimentalDesign: 'This is the original experimental design content',
          analysisMethod: 'This is the original data analysis method',
          expectedResults: 'This is the original results presentation content'
        }
        
        const testAfterPlan = {
          title: 'Test Plan - Iterated Version',
          hypotheses: ['H1: Test hypothesis 1 (optimized)', 'H2: Test hypothesis 2 (optimized)', 'H3: New hypothesis 3'],
          experimentalDesign: 'This is the optimized experimental design content with more details',
          analysisMethod: 'This is the optimized data analysis method with more detailed statistical explanations',
          expectedResults: 'This is the optimized results presentation content with visualization explanations'
        }
        
        planComparisonData.value = {
          before: testBeforePlan,
          after: testAfterPlan,
          section: 'full',
          suggestion: 'Test iteration suggestion: Optimize the scientific nature and operability of the plan',
          timestamp: new Date().toISOString(),
          statistics: generateDiffStatistics(testBeforePlan, testAfterPlan)
        }
        
        console.log('📊 生成的测试对比数据:', planComparisonData.value)
      } else {
        // 如果有多个迭代记录，选择最新的一个
        const latestIteration = iterationHistory[iterationHistory.length - 1]
        console.log('✅ 使用最新迭代记录:', latestIteration)
        selectedIterationRecord.value = latestIteration
        
        // 生成对比数据
        console.log('🔧 生成对比数据...')
        planComparisonData.value = {
          before: latestIteration.before,
          after: latestIteration.after,
          section: latestIteration.section,
          suggestion: latestIteration.suggestion,
          timestamp: latestIteration.timestamp,
          statistics: generateDiffStatistics(latestIteration.before, latestIteration.after)
        }
        console.log('📊 生成的对比数据:', planComparisonData.value)
      }
    } else {
      console.log('✅ 使用数据库获取的对比数据')
      // 使用从数据库获取的数据
      selectedIterationRecord.value = {
        id: Date.now(),
        section: comparison.section,
        suggestion: comparison.suggestion,
        before: comparison.before,
        after: comparison.after,
        timestamp: comparison.timestamp,
        messageId: iterationState.lastIterationMessageId
      }
      console.log('📋 选择的迭代记录:', selectedIterationRecord.value)
      
      // 生成对比数据
      console.log('🔧 生成对比数据...')
      planComparisonData.value = {
        before: comparison.before,
        after: comparison.after,
        section: comparison.section,
        suggestion: comparison.suggestion,
        timestamp: comparison.timestamp,
        statistics: generateDiffStatistics(comparison.before, comparison.after)
      }
      console.log('📊 生成的对比数据:', planComparisonData.value)
    }
    
    // 验证对比数据
    if (!planComparisonData.value || !planComparisonData.value.before || !planComparisonData.value.after) {
      throw new Error('对比数据不完整')
    }
    
    // 显示对比对话框
    console.log('🎯 显示对比对话框...')
    showPlanComparisonModal.value = true
    console.log('✅ 方案对比功能执行完成')
    
  } catch (error) {
    console.error('❌ 获取方案对比数据失败:', error)
    console.error('🔍 错误详情:', {
      message: error.message,
      stack: error.stack,
      currentPlanState: currentPlanState,
      iterationState: iterationState
    })
    alert('Failed to get plan comparison data, please try again')
  }
}

// 关闭方案对比对话框
const closePlanComparison = () => {
  showPlanComparisonModal.value = false
  planComparisonData.value = null
  selectedIterationRecord.value = null
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

/* 研究方案详情区域的自定义滚动条样式 */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f8f9fa;
  border-radius: 4px;
  margin: 8px 0;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #a855f7 0%, #8b5cf6 100%);
  border-radius: 4px;
  border: 2px solid #f8f9fa;
  transition: all 0.2s ease;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #9333ea 0%, #7c3aed 100%);
  border-color: #f3f4f6;
}

.custom-scrollbar::-webkit-scrollbar-thumb:active {
  background: linear-gradient(180deg, #7c3aed 0%, #6d28d9 100%);
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

/* 方案对比样式 */
.plan-comparison {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.comparison-section {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: white;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e5e7eb;
}

.text-diff {
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
}

.diff-section {
  margin-bottom: 1.5rem;
}

.diff-title {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.diff-title.removed {
  background: #fef2f2;
  color: #dc2626;
}

.diff-title.added {
  background: #f0fdf4;
  color: #16a34a;
}

.diff-title.unchanged {
  background: #f9fafb;
  color: #6b7280;
}

.diff-content {
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #e5e7eb;
}

.diff-content.removed {
  background: #fef2f2;
  border-color: #fecaca;
}

.diff-content.added {
  background: #f0fdf4;
  border-color: #bbf7d0;
}

.diff-content.unchanged {
  background: #f9fafb;
  border-color: #d1d5db;
}

.diff-line {
  padding: 0.125rem 0;
  white-space: pre-wrap;
  word-break: break-word;
}

.diff-line.removed {
  color: #dc2626;
  background: #fef2f2;
}

.diff-line.added {
  color: #16a34a;
  background: #f0fdf4;
}

.diff-line.unchanged {
  color: #6b7280;
  background: #f9fafb;
}

.array-diff {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.array-diff-title {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
}

.diff-item {
  padding: 0.5rem;
  margin: 0.25rem 0;
  border-radius: 0.25rem;
  border-left: 3px solid;
}

.diff-item.removed {
  background: #fef2f2;
  border-left-color: #dc2626;
  color: #dc2626;
}

.diff-item.added {
  background: #f0fdf4;
  border-left-color: #16a34a;
  color: #16a34a;
}

.diff-item.unchanged {
  background: #f9fafb;
  border-left-color: #6b7280;
  color: #6b7280;
}

/* 左右分栏对比样式 */
.plan-comparison-side-by-side {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.side-by-side-diff,
.side-by-side-array-diff {
  margin-bottom: 2rem;
}

/* 方案对比样式 - 全局样式，用于v-html内容 */
:deep(.left-right-comparison) {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

:deep(.comparison-section) {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: white;
}

:deep(.section-title) {
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e5e7eb;
}

:deep(.left-right-diff),
:deep(.left-right-array-diff) {
  margin-bottom: 1.5rem;
}

:deep(.array-diff-title) {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
}

:deep(.diff-columns) {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;
}

:deep(.diff-column) {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  background: white;
}

:deep(.column-title) {
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

:deep(.column-title.removed) {
  background: #fef2f2;
  color: #dc2626;
}

:deep(.column-title.added) {
  background: #f0fdf4;
  color: #16a34a;
}

:deep(.column-content) {
  padding: 1rem;
  max-height: 400px;
  overflow-y: auto;
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
}

:deep(.diff-line) {
  padding: 0.25rem 0;
  white-space: pre-wrap;
  word-break: break-word;
  border-radius: 0.25rem;
  margin: 0.125rem 0;
}

:deep(.diff-line.removed) {
  background: #fef2f2;
  color: #dc2626;
  text-decoration: line-through;
  padding: 0.25rem 0.5rem;
}

:deep(.diff-line.added) {
  background: #f0fdf4;
  color: #16a34a;
  padding: 0.25rem 0.5rem;
}

:deep(.diff-line.unchanged) {
  color: #374151;
  padding: 0.25rem 0;
}

:deep(.diff-item) {
  padding: 0.5rem;
  margin: 0.25rem 0;
  border-radius: 0.25rem;
  border-left: 3px solid;
}

:deep(.diff-item.removed) {
  background: #fef2f2;
  border-left-color: #dc2626;
  color: #dc2626;
  text-decoration: line-through;
}

:deep(.diff-item.added) {
  background: #f0fdf4;
  border-left-color: #16a34a;
  color: #16a34a;
}

:deep(.diff-item.unchanged) {
  background: #f9fafb;
  border-left-color: #6b7280;
  color: #374151;
}

/* 响应式设计 */
@media (max-width: 768px) {
  :deep(.diff-columns) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  :deep(.column-content) {
    max-height: 300px;
  }
}

.prose code {
  background-color: rgba(59, 130, 246, 0.1) !important;
  color: #1e40af !important;
  padding: 0.125rem 0.25rem !important;
  border-radius: 0.25rem !important;
  font-size: 0.875em !important;
  border: 1px solid rgba(59, 130, 246, 0.2) !important;
}

.prose blockquote {
  border-left: 4px solid #3b82f6 !important;
  padding: 1rem !important;
  margin: 1rem 0 !important;
  color: #374151 !important;
  background-color: rgba(59, 130, 246, 0.05) !important;
  border-radius: 0.25rem !important;
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
  background-color: rgba(59, 130, 246, 0.03) !important;
}

.prose .markdown-table tr:hover {
  background-color: rgba(59, 130, 246, 0.08) !important;
}

/* 新手指引动画样式 */
@keyframes tutorial-fade-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes tutorial-highlight {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(59, 130, 246, 0.1);
  }
}

.tutorial-highlight {
  animation: tutorial-highlight 2s infinite;
}

.tutorial-tooltip {
  animation: tutorial-fade-in 0.3s ease-out;
}

/* 确保高亮元素在最上层 */
.tutorial-highlight {
  z-index: 61;
}

/* 引导提示框样式优化 */
.tutorial-tooltip {
  z-index: 62;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  isolation: isolate; /* Create a new stacking context */
}

/* 确保新手指引层级始终最高 */
div[v-if="showTutorial"] {
  position: fixed !important;
  z-index: 60 !important;
}

/* 防止任何输入框或其他元素覆盖新手指引 */
.tutorial-highlight,
.tutorial-tooltip {
  position: absolute !important;
  pointer-events: auto !important;
}

/* 确保新手指引遮罩层不会被任何元素覆盖 */
.tutorial-overlay {
  isolation: isolate;
  contain: layout style paint;
}
</style> 