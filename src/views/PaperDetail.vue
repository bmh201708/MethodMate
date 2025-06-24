<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <main class="flex-1 max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-12 gap-8">
        <!-- 左侧聊天框 -->
        <div class="col-span-4 h-[calc(100vh-8rem)]">
          <ChatBox ref="chatBoxRef" />
        </div>

        <!-- 中间文献列表 -->
        <div class="col-span-3">
          <!-- 关键词输入和提取区域 -->
          <div class="mb-4 space-y-3">
            <!-- 关键词输入框 -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">搜索关键词</label>
              <div class="flex space-x-2">
                <input
                  v-model="searchKeywords"
                  type="text"
                  placeholder="输入关键词，用逗号分隔"
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  @keyup.enter="getRecommendedPapers"
                />
                <button
                  @click="extractKeywordsFromChat"
                  :disabled="isExtractingKeywords"
                  class="px-2 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1 whitespace-nowrap"
                  title="从对话历史中提取关键词"
                >
                  <svg v-if="isExtractingKeywords" class="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <svg v-else class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                  <span class="text-xs">{{ isExtractingKeywords ? '提取中...' : '提取关键词' }}</span>
                </button>
              </div>
              <p class="text-xs text-gray-500">
                支持中英文关键词，多个关键词用逗号分隔。点击"提取关键词"可从对话历史中智能提取相关关键词。
              </p>
            </div>

            <!-- 获取相关文献按钮和选项 -->
            <div class="space-y-2">
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
              
              <!-- 顶刊顶会过滤选项 -->
              <div class="flex items-center justify-between px-1">
                <label class="flex items-center text-sm text-gray-600 cursor-pointer">
                  <input 
                    type="checkbox" 
                    v-model="filterTopVenues" 
                    class="form-checkbox h-4 w-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                  />
                  <span class="ml-2">只获取顶刊顶会文献</span>
                </label>
                <span class="text-xs text-gray-500">提高文献质量</span>
              </div>
            </div>
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
        <div class="col-span-5">
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
                    @click="savePaperToCache(papersState.selectedPaper)"
                    :disabled="isSavingToCache"
                    class="px-3 py-1 text-xs rounded transition-colors flex items-center space-x-1"
                    :class="[
                      paperCacheStatus === 'saved' 
                        ? 'bg-green-100 text-green-600 hover:bg-green-200'
                        : paperCacheStatus === 'updated'
                        ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    ]"
                    :title="paperCacheStatus === 'saved' ? '已保存到本地' : paperCacheStatus === 'updated' ? '已更新本地缓存' : '保存到本地缓存'"
                  >
                    <svg v-if="isSavingToCache" class="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <svg v-else class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
                    </svg>
                    <span>{{ 
                      isSavingToCache ? '保存中...' : 
                      paperCacheStatus === 'saved' ? '已保存' : 
                      paperCacheStatus === 'updated' ? '已更新' : '保存到本地' 
                    }}</span>
                  </button>
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
                <!-- 作者和年份信息 -->
                <div class="mb-4 text-sm text-gray-500">
                  <span v-if="papersState.selectedPaper.authors" class="mr-4">
                    <span class="font-medium">作者：</span>{{ papersState.selectedPaper.authors }}
                  </span>
                  <span v-if="papersState.selectedPaper.year" class="mr-4">
                    <span class="font-medium">发表年份：</span>{{ papersState.selectedPaper.year }}
                  </span>
                  <span v-if="papersState.selectedPaper.citationCount !== undefined" class="mr-4">
                    <span class="font-medium">被引用次数：</span>{{ papersState.selectedPaper.citationCount }}
                  </span>
                </div>
                
                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-lg font-semibold text-gray-900">摘要</h3>
                  <button 
                    @click="toggleTranslation"
                    :disabled="isTranslating"
                    class="text-sm px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                    title="显示中文译文"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
                    </svg>
                    <span>{{ isTranslating ? '翻译中...' : (showTranslation ? '显示原文' : '显示译文') }}</span>
                  </button>
                </div>
                <p class="text-gray-600 leading-relaxed">
                  {{ showTranslation && translatedAbstract ? translatedAbstract : papersState.selectedPaper.abstract }}
                </p>

                <!-- 研究方法部分 -->
                <div class="mt-6">
                  <div class="flex items-center justify-between">
                    <h3 class="text-lg font-semibold text-gray-900">研究方法预览</h3>
                    <div class="flex items-center space-x-2">
                      <span v-if="isLoadingPaperContent" 
                            class="text-sm text-gray-500 mr-3 flex items-center">
                        <svg class="animate-spin h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        正在分析...
                      </span>
                      <button 
                        v-if="papersState.selectedPaper.researchMethod"
                        @click="retryExtractMethod"
                        class="text-orange-500 hover:text-orange-600 text-sm flex items-center"
                        :disabled="isLoadingPaperContent"
                        title="重新提取研究方法"
                      >
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                        </svg>
                        重试
                      </button>
                      <button 
                        v-if="papersState.selectedPaper.researchMethod"
                        @click="toggleFullText"
                        class="text-blue-600 hover:text-blue-700 text-sm flex items-center"
                      >
                        {{ showFullText ? '收起' : '展开' }}
                        <svg 
                          class="w-4 h-4 ml-1 transform transition-transform"
                          :class="{ 'rotate-180': showFullText }"
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div v-if="!isLoadingPaperContent && !papersState.selectedPaper.researchMethod" 
                       class="mt-3 text-gray-500">
                    <p class="text-sm mb-2">暂无研究方法信息</p>
                    <div class="flex space-x-2">
                      <button 
                        @click="fetchPaperContent"
                        class="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded hover:bg-blue-200 transition-colors flex items-center"
                        :disabled="isLoadingPaperContent"
                      >
                        <svg v-if="isLoadingPaperContent" class="animate-spin h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <svg v-else class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                        </svg>
                        {{ isLoadingPaperContent ? '获取中...' : '尝试获取研究方法' }}
                      </button>
                    </div>
                  </div>
                  <div v-else-if="papersState.selectedPaper.researchMethod && showFullText" class="mt-3">
                    <div class="flex items-center justify-between mb-2">
                      <div></div>
                      <button 
                        @click="toggleMethodTranslation"
                        :disabled="isTranslatingMethod"
                        class="text-sm px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                        title="切换中英文"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
                        </svg>
                        <span>{{ isTranslatingMethod ? '翻译中...' : (showMethodTranslation ? '显示原文' : '显示译文') }}</span>
                      </button>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                      <div v-if="showMethodTranslation && translatedMethod" 
                           class="prose max-w-none text-gray-600" 
                           v-html="renderMarkdown(translatedMethod)"></div>
                      <div v-else 
                           class="prose max-w-none text-gray-600" 
                           v-html="renderMarkdown(papersState.selectedPaper.researchMethod)"></div>
                    </div>
                  </div>
                </div>
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
                <!-- 显示AI分析结果 -->
                <div v-if="papersState.selectedPaper.problem || papersState.selectedPaper.design || papersState.selectedPaper.data || papersState.selectedPaper.outcome || 
                          papersState.selectedPaper.fullPlan || papersState.selectedPaper.hypothesis || papersState.selectedPaper.experimentDesign || 
                          papersState.selectedPaper.dataAnalysis || papersState.selectedPaper.resultsPresentation" 
                     class="space-y-4">
                  <div v-if="papersState.selectedPaper.problem" class="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">研究问题</h3>
                    <div class="prose max-w-none text-gray-600" v-html="renderMarkdown(papersState.selectedPaper.problem)"></div>
                  </div>
                  <div v-if="papersState.selectedPaper.design" class="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">研究方法</h3>
                    <div class="prose max-w-none text-gray-600" v-html="renderMarkdown(papersState.selectedPaper.design)"></div>
                  </div>
                  <div v-if="papersState.selectedPaper.data" class="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">研究数据</h3>
                    <div class="prose max-w-none text-gray-600" v-html="renderMarkdown(papersState.selectedPaper.data)"></div>
                  </div>
                  <div v-if="papersState.selectedPaper.outcome" class="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">研究成果</h3>
                    <div class="prose max-w-none text-gray-600" v-html="renderMarkdown(papersState.selectedPaper.outcome)"></div>
                  </div>
                  <div v-if="papersState.selectedPaper.fullPlan" class="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">完整方案</h3>
                    <div class="prose max-w-none text-gray-600" v-html="renderMarkdown(papersState.selectedPaper.fullPlan)"></div>
                  </div>
                  <div v-if="papersState.selectedPaper.hypothesis" class="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">研究假设</h3>
                    <div class="prose max-w-none text-gray-600" v-html="renderMarkdown(papersState.selectedPaper.hypothesis)"></div>
                  </div>
                  <div v-if="papersState.selectedPaper.experimentDesign" class="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">实验设计</h3>
                    <div class="prose max-w-none text-gray-600" v-html="renderMarkdown(papersState.selectedPaper.experimentDesign)"></div>
                  </div>
                  <div v-if="papersState.selectedPaper.dataAnalysis" class="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">数据分析</h3>
                    <div class="prose max-w-none text-gray-600" v-html="renderMarkdown(papersState.selectedPaper.dataAnalysis)"></div>
                  </div>
                  <div v-if="papersState.selectedPaper.resultsPresentation" class="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">结果呈现</h3>
                    <div class="prose max-w-none text-gray-600" v-html="renderMarkdown(papersState.selectedPaper.resultsPresentation)"></div>
                  </div>
                </div>

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
import { marked } from 'marked'
import { chatState } from '../stores/chatStore'
import { sendSilentMessageToCoze } from '../services/cozeApi'
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

// 配置marked安全选项
marked.setOptions({
  sanitize: true,
  breaks: true,
  gfm: true
})

const router = useRouter()
const currentSection = ref('papers')
const chatBoxRef = ref(null)
const showFullText = ref(false)

// 翻译相关状态
const showTranslation = ref(false)
const translatedAbstract = ref('')
const isTranslating = ref(false)

// 研究方法翻译相关状态
const showMethodTranslation = ref(false)
const translatedMethod = ref('')
const isTranslatingMethod = ref(false)

// 论文内容加载状态
const isLoadingPaperContent = ref(false)

// 顶刊顶会过滤选项
const filterTopVenues = ref(false)

// 关键词输入
const searchKeywords = ref('')
const isExtractingKeywords = ref(false)

// 论文缓存相关状态
const isSavingToCache = ref(false)
const paperCacheStatus = ref('') // 'saved', 'updated', ''

// 手动获取论文全文和研究方法
const fetchPaperContent = async () => {
  if (!papersState.selectedPaper || !papersState.selectedPaper.title) {
    return
  }
  
  isLoadingPaperContent.value = true
  
  try {
    console.log('手动获取论文内容:', papersState.selectedPaper.title)
    
    const response = await fetch('/api/paper/get-full-content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: papersState.selectedPaper.title,
        doi: papersState.selectedPaper.doi || null
      })
    })
    
    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('请求过于频繁，请稍后再试。');
      }
      const errorResult = await response.json().catch(() => ({}));
      throw new Error(errorResult.error || `API响应错误: ${response.status}`);
    }
    
    const result = await response.json()
    
    if (result.success) {
      // 更新选中论文的全文
      if (result.fullText) {
        papersState.selectedPaper.fullText = result.fullText
      }
      
      // 更新研究方法
      if (result.researchMethod) {
        papersState.selectedPaper.researchMethod = result.researchMethod
        showFullText.value = true // 自动展开研究方法
        // 重置研究方法翻译状态
        showMethodTranslation.value = false
        translatedMethod.value = ''
      } else if (papersState.selectedPaper.fullText) {
        // 如果没有获取到研究方法但有全文，尝试使用备用方法
        console.log('未获取到研究方法，尝试使用备用方法生成概要')
        await tryGenerateMethodSummary()
      }
      
      // 同时更新推荐论文列表中的对应论文
      const paperIndex = papersState.recommendedPapers.findIndex(
        paper => paper.title === papersState.selectedPaper.title
      )
      
      if (paperIndex !== -1) {
        if (result.fullText) {
          papersState.recommendedPapers[paperIndex].fullText = result.fullText
        }
        if (result.researchMethod) {
          papersState.recommendedPapers[paperIndex].researchMethod = result.researchMethod
        }
      }
    } else {
      throw new Error(result.error || '获取论文内容失败');
    }
  } catch (error) {
    console.error('获取论文内容出错:', error)
    alert('获取论文内容出错: ' + error.message)
  } finally {
    isLoadingPaperContent.value = false
  }
}

// 尝试使用备用方法生成研究方法概要
const tryGenerateMethodSummary = async () => {
  if (!papersState.selectedPaper || !papersState.selectedPaper.fullText) {
    return false
  }

  const response = await fetch('/api/paper/generate-method-summary', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: papersState.selectedPaper.title,
      fullText: papersState.selectedPaper.fullText
    })
  })
    
  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('请求过于频繁，请稍后再试。');
    }
    const errorResult = await response.json().catch(() => ({}));
    throw new Error(errorResult.error || `生成概要失败: ${response.status}`);
  }
    
  const result = await response.json()
    
  if (result.success && result.methodSummary) {
    // 更新选中论文的研究方法
    papersState.selectedPaper.researchMethod = result.methodSummary
    showFullText.value = true // 自动展开研究方法
    // 重置研究方法翻译状态
    showMethodTranslation.value = false
    translatedMethod.value = ''
      
    // 同时更新推荐论文列表中的对应论文
    const paperIndex = papersState.recommendedPapers.findIndex(
      paper => paper.title === papersState.selectedPaper.title
    )
      
    if (paperIndex !== -1) {
      papersState.recommendedPapers[paperIndex].researchMethod = result.methodSummary
    }
      
    return true
  } else {
    throw new Error(result.error || '备用方法生成研究方法概要失败');
  }
}

// 渲染markdown内容
const renderMarkdown = (markdown) => {
  if (!markdown) return ''
  try {
    return marked.parse(markdown)
  } catch (error) {
    console.error('Markdown解析错误:', error)
    return markdown // 返回原始内容作为回退
  }
}

// 切换全文显示状态
const toggleFullText = () => {
  showFullText.value = !showFullText.value
}

// 重新提取研究方法
const retryExtractMethod = async () => {
  if (!papersState.selectedPaper || !papersState.selectedPaper.fullText) {
    alert('无法重新提取研究方法：论文全文不可用')
    return
  }
  
  isLoadingPaperContent.value = true
  
  try {
    console.log('重新提取研究方法:', papersState.selectedPaper.title)
    
    // 重置研究方法翻译状态
    showMethodTranslation.value = false
    translatedMethod.value = ''
    
    // 直接使用备用方法生成研究方法概要
    const success = await tryGenerateMethodSummary()
    
    if (!success) {
      alert('重新提取研究方法失败，请稍后再试')
    }
  } catch (error) {
    console.error('重新提取研究方法出错:', error)
    alert('重新提取研究方法出错: ' + error.message)
  } finally {
    isLoadingPaperContent.value = false
  }
}

const selectRecommendedPaper = (paper) => {
  selectPaper(paper)
  // 重置全文显示状态
  showFullText.value = false
  // 重置翻译状态
  showTranslation.value = false
  translatedAbstract.value = ''
  // 重置研究方法翻译状态
  showMethodTranslation.value = false
  translatedMethod.value = ''
}

// 翻译摘要
const translateAbstract = async (abstractText) => {
  if (!abstractText || !abstractText.trim()) {
    throw new Error('摘要内容为空')
  }

  isTranslating.value = true
  
  try {
    console.log('开始翻译摘要:', abstractText)
    
    // 构建翻译消息
    const translateMessage = `请将以下英文摘要翻译成中文，保持学术性和准确性：\n\n${abstractText}`
    
    // 静默发送到coze agent
    const translatedResult = await sendSilentMessageToCoze(translateMessage, chatState.messages)
    
    console.log('翻译结果:', translatedResult)
    
    // 尝试提取翻译后的内容
    let translatedText = translatedResult
    
    // 如果是JSON格式，尝试提取output字段
    try {
      const jsonMatch = translatedResult.match(/```json\s*([\s\S]*?)\s*```/i) || translatedResult.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        let jsonStr = jsonMatch[1] || jsonMatch[0]
        jsonStr = jsonStr
          .replace(/,\s*}/g, '}')
          .replace(/,\s*]/g, ']')
          .replace(/:\s*,/g, ': null,')
          .replace(/"\s*:\s*,/g, '": null,')
          .replace(/,\s*,/g, ',')
          .replace(/}\s*}+$/g, '}')
          .replace(/^{+/g, '{')
          .trim()
        
        const jsonData = JSON.parse(jsonStr)
        if (jsonData && typeof jsonData === 'object') {
          translatedText = jsonData.output || jsonData.translation || jsonData.result || translatedResult
        }
      }
    } catch (error) {
      console.log('JSON解析失败，使用原始结果:', error.message)
    }
    
    // 清理翻译结果，移除可能的提示词或额外说明
    translatedText = translatedText
      .replace(/^翻译结果?[：:]?\s*/i, '')
      .replace(/^中文翻译[：:]?\s*/i, '')
      .replace(/^以下是翻译[：:]?\s*/i, '')
      .replace(/^翻译[：:]?\s*/i, '')
      .trim()
    
    if (translatedText && translatedText.length > 10) {
      return translatedText
    } else {
      throw new Error('翻译结果为空或过短')
    }
    
  } catch (error) {
    console.error('翻译摘要失败:', error)
    throw error
  } finally {
    isTranslating.value = false
  }
}

// 切换翻译显示
const toggleTranslation = async () => {
  if (!papersState.selectedPaper || !papersState.selectedPaper.abstract) {
    return
  }

  // 如果已经显示翻译，切换回原文
  if (showTranslation.value) {
    showTranslation.value = false
    return
  }

  // 如果还没有翻译，先进行翻译
  if (!translatedAbstract.value) {
    try {
      const translated = await translateAbstract(papersState.selectedPaper.abstract)
      translatedAbstract.value = translated
      showTranslation.value = true
    } catch (error) {
      console.error('翻译失败:', error)
      alert('翻译失败：' + error.message)
    }
  } else {
    // 已有翻译，直接显示
    showTranslation.value = true
  }
}

// 切换研究方法翻译显示
const toggleMethodTranslation = async () => {
  if (!papersState.selectedPaper || !papersState.selectedPaper.researchMethod) {
    return
  }

  // 如果已经显示翻译，切换回原文
  if (showMethodTranslation.value) {
    showMethodTranslation.value = false
    return
  }

  // 如果还没有翻译，先进行翻译
  if (!translatedMethod.value) {
    try {
      isTranslatingMethod.value = true
      const translated = await translateMethod(papersState.selectedPaper.researchMethod)
      translatedMethod.value = translated
      showMethodTranslation.value = true
    } catch (error) {
      console.error('研究方法翻译失败:', error)
      alert('研究方法翻译失败：' + error.message)
    } finally {
      isTranslatingMethod.value = false
    }
  } else {
    // 已有翻译，直接显示
    showMethodTranslation.value = true
  }
}

// 翻译研究方法
const translateMethod = async (methodText) => {
  if (!methodText || !methodText.trim()) {
    throw new Error('研究方法内容为空')
  }
  
  try {
    console.log('开始翻译研究方法')
    
    // 构建翻译消息
    const translateMessage = `请将以下英文研究方法翻译成中文，保持学术性和准确性，保留原始的Markdown格式：\n\n${methodText}`
    
    // 静默发送到coze agent
    const translatedResult = await sendSilentMessageToCoze(translateMessage, chatState.messages)
    
    console.log('研究方法翻译结果:', translatedResult)
    
    // 清理翻译结果，移除可能的提示词或额外说明
    let translatedText = translatedResult
      .replace(/^翻译结果?[：:]?\s*/i, '')
      .replace(/^中文翻译[：:]?\s*/i, '')
      .replace(/^以下是翻译[：:]?\s*/i, '')
      .replace(/^翻译[：:]?\s*/i, '')
      .trim()
    
    if (translatedText && translatedText.length > 10) {
      return translatedText
    } else {
      throw new Error('翻译结果为空或过短')
    }
    
  } catch (error) {
    console.error('翻译研究方法失败:', error)
    throw error
  }
}

// 提取关键词
const extractKeywordsFromChat = async () => {
  isExtractingKeywords.value = true
  
  try {
    console.log('开始从对话历史中提取关键词')
    
    // 获取聊天历史记录
    const chatHistory = chatState.messages.filter(msg => msg.isComplete && !msg.isError)
    
    if (chatHistory.length === 0) {
      alert('没有找到有效的对话历史，无法提取关键词')
      return
    }
    
    const response = await fetch('/api/extract-keywords', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatHistory,
        session_id: Date.now().toString()
      })
    })
    
    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('请求过于频繁，请稍后再试。');
      }
      const errorResult = await response.json().catch(() => ({}));
      throw new Error(errorResult.error || `提取关键词失败，状态码: ${response.status}`);
    }
    
    const result = await response.json()
    
    if (result.success && result.keywords) {
      console.log('提取到关键词:', result.keywords)
      searchKeywords.value = result.keywords
      alert('关键词提取成功！')
    } else {
      throw new Error(result.error || '提取关键词失败');
    }
  } catch (error) {
    console.error('提取关键词出错:', error)
    alert(error.message)
  } finally {
    isExtractingKeywords.value = false
  }
}

const getRecommendedPapers = async () => {
  setLoadingRecommendations(true)
  setRecommendationError('')

  try {
    // 获取聊天历史记录
    const chatHistory = chatState.messages.filter(msg => msg.isComplete && !msg.isError)
    
    console.log('当前聊天历史:', chatHistory)
    console.log('用户输入的关键词:', searchKeywords.value)

    // 构建请求参数
    const requestBody = {
      filter_venues: filterTopVenues.value,
      session_id: Date.now().toString()
    }
    
    // 如果用户输入了关键词，优先使用用户输入的关键词
    if (searchKeywords.value && searchKeywords.value.trim()) {
      requestBody.keywords = searchKeywords.value.trim()
      console.log('使用用户输入的关键词进行搜索:', requestBody.keywords)
    } else {
      // 否则使用聊天历史
      requestBody.chatHistory = chatHistory
      console.log('使用聊天历史进行搜索')
    }

    // 调用推荐API（通过Vue开发服务器代理）
    const response = await fetch('/api/semantic-recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    })
    
    // 记录请求URL和参数（用于调试）
    console.log('API请求参数:', requestBody);

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('请求过于频繁，请稍后再试。');
      }
      const errorResult = await response.json().catch(() => ({}));
      throw new Error(errorResult.error || `获取推荐文献失败，状态码: ${response.status}`);
    }

    const result = await response.json()
    
    if (!result.success) {
      throw new Error(result.error || '获取推荐失败')
    }

    // 处理推荐结果 - 使用全局状态管理
    if (result.papers && Array.isArray(result.papers)) {
      // 确保每个paper对象包含所需的所有字段
      const processedPapers = result.papers.map(paper => ({
        ...paper,
        title: paper.title || '无标题',
        abstract: paper.abstract || '暂无摘要',
        downloadUrl: paper.downloadUrl || null,
        fullText: paper.fullText || null,
        authors: paper.authors || '未知作者',
        year: paper.year || null,
        citationCount: paper.citationCount || 0,
        batchIndex: Math.floor(papersState.recommendedPapers.length / 3) + 1
      }));

      addRecommendedPapers(processedPapers)
      
      console.log('获取到推荐文献:', processedPapers)
      console.log('累加后的文献列表:', papersState.recommendedPapers)
      console.log('总文献数量:', papersState.recommendedPapers.length)

      if (processedPapers.length === 0) {
        setRecommendationError('未找到相关文献')
      }
    } else if (result.rawResponse) {
      console.log('API返回原始响应:', result.rawResponse)
      setRecommendationError('解析推荐文献失败，请稍后重试')
    } else {
      console.log('未能解析到papers，API响应:', result)
      setRecommendationError('获取推荐文献失败，请稍后重试')
    }

  } catch (error) {
    console.error('获取推荐文献失败:', error)
    setRecommendationError(error.message)
  } finally {
    setLoadingRecommendations(false)
  }
}

// 保存论文到本地缓存
const savePaperToCache = async (paper) => {
  if (!paper || !paper.title) {
    alert('无效的论文信息')
    return
  }

  isSavingToCache.value = true
  paperCacheStatus.value = ''

  try {
    console.log('保存论文到本地缓存:', paper.title)

    // 准备要保存的论文数据
    const paperData = {
      title: paper.title,
      authors: Array.isArray(paper.authors) ? paper.authors.join(', ') : (paper.authors || ''),
      abstract: paper.abstract || '',
      doi: paper.doi || '',
      url: paper.url || paper.scholar_url || '',
      download_url: paper.downloadUrl || paper.pdf_url || '',
      year: paper.year ? parseInt(paper.year) : null,
      journal: paper.journal || '',
      venue: paper.venue || paper.journal || '',
      citation_count: paper.citationCount || paper.citations || 0,
      research_method: paper.researchMethod || '',
      full_text: paper.fullText || '',
      translated_abstract: translatedAbstract.value || '',
      translated_method: translatedMethod.value || '',
      paper_id: paper.paper_id || paper.id || '',
      source: 'recommendation',
      is_top_venue: paper.isTopVenue || false,
      download_sources: paper.downloadSources || null,
      metadata: {
        batchIndex: paper.batchIndex,
        from_cache: paper.from_cache || false,
        saved_at: new Date().toISOString()
      }
    }

    const response = await fetch('/api/paper-cache/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paperData)
    })

    if (!response.ok) {
      const errorResult = await response.json().catch(() => ({}))
      throw new Error(errorResult.error || `保存失败，状态码: ${response.status}`)
    }

    const result = await response.json()

    if (result.success) {
      paperCacheStatus.value = result.is_update ? 'updated' : 'saved'
      console.log(`✅ 论文${result.is_update ? '更新' : '保存'}成功:`, paper.title)
      
      // 显示成功消息
      const message = result.is_update ? '论文缓存已更新' : '论文已保存到本地缓存'
      
      // 3秒后重置状态
      setTimeout(() => {
        paperCacheStatus.value = ''
      }, 3000)
      
    } else {
      throw new Error(result.error || '保存失败')
    }

  } catch (error) {
    console.error('保存论文到缓存失败:', error)
    alert('保存失败: ' + error.message)
    paperCacheStatus.value = ''
  } finally {
    isSavingToCache.value = false
  }
}

// 检查论文是否已缓存
const checkPaperCache = async (paper) => {
  try {
    const response = await fetch('/api/paper-cache/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: paper.title,
        doi: paper.doi || ''
      })
    })

    if (response.ok) {
      const result = await response.json()
      return result.cached
    }
  } catch (error) {
    console.error('检查论文缓存失败:', error)
  }
  return false
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

/* Markdown内容样式 */
.prose {
  max-width: 100%;
}

.prose h1, .prose h2, .prose h3, .prose h4 {
  margin-top: 1.25em;
  margin-bottom: 0.75em;
  font-weight: 600;
}

.prose p {
  margin-top: 1em;
  margin-bottom: 1em;
  line-height: 1.6;
}

.prose ul, .prose ol {
  padding-left: 1.5em;
  margin-top: 1em;
  margin-bottom: 1em;
}

.prose li {
  margin-bottom: 0.5em;
}

.prose code {
  background-color: #f3f4f6;
  padding: 0.2em 0.4em;
  border-radius: 0.25em;
  font-family: monospace;
}

.prose pre {
  background-color: #f3f4f6;
  padding: 1em;
  border-radius: 0.5em;
  overflow-x: auto;
  margin-top: 1em;
  margin-bottom: 1em;
}

.prose blockquote {
  border-left: 4px solid #e5e7eb;
  padding-left: 1em;
  margin-left: 0;
  color: #6b7280;
  font-style: italic;
}

.prose a {
  color: #3b82f6;
  text-decoration: underline;
}

.prose a:hover {
  color: #2563eb;
}
</style>
