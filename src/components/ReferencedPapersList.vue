<template>
  <div v-if="referencedCount > 0">
    <!-- 操作栏 -->
    <div class="bg-white rounded-lg shadow-md p-4 mb-6">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-purple-800 flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
          </svg>
          参考文献列表 ({{ referencedCount }} 篇)
        </h3>
        <div class="flex gap-2">
          <button
            @click="exportReferences"
            class="text-sm text-blue-600 hover:text-blue-700 transition-colors flex items-center"
          >
            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
            导出
          </button>
          <button
            @click="clearAllReferences"
            class="text-sm text-gray-500 hover:text-red-500 transition-colors"
          >
            清空全部
          </button>
        </div>
      </div>
    </div>

    <!-- 左右分栏布局 -->
    <div class="grid grid-cols-12 gap-6">
      <!-- 左侧文献卡片列表 -->
      <div class="col-span-5">
        <div class="space-y-4 max-h-[80vh] overflow-y-auto">
          <div
            v-for="(paper, index) in referencedPapersList"
            :key="index"
            class="paper-card bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow border"
            :class="{ 'border-2 border-purple-500': selectedPaper === paper }"
            @click="selectPaper(paper)"
          >
            <div class="flex items-start">
              <div class="flex-1">
                <div class="flex justify-between items-start mb-2">
                  <h4 class="text-base font-semibold text-purple-600 leading-tight flex-1 mr-3 line-clamp-2">
                    {{ paper.title }}
                  </h4>
                  <button 
                    @click.stop="removeFromReferences(paper)"
                    class="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                    title="移除引用"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
                
                <div class="text-xs text-gray-500 mb-2 flex items-center gap-2">
                  <span class="px-2 py-1 rounded-full"
                        :class="paper.source === 'search' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'">
                    {{ paper.source === 'search' ? '文献搜索' : 'AI推荐' }}
                  </span>
                  <span v-if="paper.referencedAt" class="text-gray-400">
                    {{ formatDate(paper.referencedAt) }}
                  </span>
                </div>
                
                <p v-if="paper.abstract || paper.summary" class="text-sm text-gray-600 mb-3 line-clamp-2">
                  {{ paper.abstract || paper.summary || '暂无摘要' }}
                </p>
                
                <div class="flex items-center justify-between">
                  <div class="text-xs text-gray-500">
                    <span v-if="paper.authors" class="mr-2">
                      {{ Array.isArray(paper.authors) ? paper.authors.slice(0, 2).join(', ') + (paper.authors.length > 2 ? ' 等' : '') : paper.authors }}
                    </span>
                    <span v-if="paper.year">{{ paper.year }}</span>
                  </div>
                  <span class="text-xs text-purple-500">点击查看详情</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧文献详情 -->
      <div class="col-span-7">
        <div class="paper-detail-scroll bg-white rounded-lg shadow-sm p-6 max-h-[80vh] overflow-y-auto">
          <div v-if="selectedPaper">
            <!-- 标题和操作按钮 -->
            <div class="flex justify-between items-start mb-6">
              <h2 class="text-2xl font-bold text-gray-900 flex-1">{{ selectedPaper.title }}</h2>
              <div class="ml-4 flex items-center space-x-2">
                <span class="px-3 py-1 bg-purple-100 text-purple-600 text-sm rounded-full">
                  已参考
                </span>
                <button 
                  @click="removeFromReferences(selectedPaper)"
                  class="px-4 py-2 text-sm rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                >
                  移除引用
                </button>
              </div>
            </div>
            
            <!-- 基本信息 -->
            <div class="mb-6">
              <div class="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div v-if="selectedPaper.authors">
                  <span class="font-medium text-gray-700">作者：</span>
                  {{ Array.isArray(selectedPaper.authors) ? selectedPaper.authors.join(', ') : selectedPaper.authors }}
                </div>
                <div v-if="selectedPaper.year">
                  <span class="font-medium text-gray-700">发表年份：</span>
                  {{ selectedPaper.year }}
                </div>
                <div v-if="selectedPaper.journal">
                  <span class="font-medium text-gray-700">期刊：</span>
                  {{ selectedPaper.journal }}
                </div>
                <div v-if="selectedPaper.citations || selectedPaper.citationCount">
                  <span class="font-medium text-gray-700">被引用次数：</span>
                  {{ selectedPaper.citations || selectedPaper.citationCount }}
                </div>
                <div v-if="selectedPaper.source">
                  <span class="font-medium text-gray-700">来源：</span>
                  <span class="px-2 py-1 rounded text-xs"
                        :class="selectedPaper.source === 'search' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'">
                    {{ selectedPaper.source === 'search' ? '文献搜索' : 'AI推荐' }}
                  </span>
                </div>
                <div v-if="selectedPaper.referencedAt">
                  <span class="font-medium text-gray-700">引用时间：</span>
                  {{ formatDate(selectedPaper.referencedAt) }}
                </div>
              </div>
              
              <!-- "保存到本地"按钮移到基本信息底部 -->
              <div class="mt-4 pt-3 border-t border-gray-100">
                <button 
                  @click="savePaperToCache(selectedPaper)"
                  :disabled="isSavingToCache"
                  class="p-1.5 text-xs rounded transition-colors opacity-50 hover:opacity-80"
                  :class="[
                    paperCacheStatus === 'saved' 
                      ? 'bg-green-50 text-green-500 hover:bg-green-100'
                      : paperCacheStatus === 'updated'
                      ? 'bg-blue-50 text-blue-500 hover:bg-blue-100'
                      : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                  ]"
                  :title="paperCacheStatus === 'saved' ? '已保存到本地' : paperCacheStatus === 'updated' ? '已更新本地缓存' : '保存到本地缓存'"
                >
                  <svg v-if="isSavingToCache" class="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <svg v-else class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- 摘要 -->
                          <div v-if="selectedPaper.abstract || selectedPaper.summary" class="mb-6">
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
                              {{ showTranslation && translatedAbstract ? translatedAbstract : (selectedPaper.abstract || selectedPaper.summary) }}
                            </p>
                          </div>

                          <!-- 研究方法部分 -->
                          <div class="mt-6 mb-6">
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
                                  v-if="selectedPaper.researchMethod"
                                  @click="retryExtractMethod"
                                  class="text-orange-500 hover:text-orange-600 text-sm flex items-center"
                                  :disabled="isLoadingPaperContent"
                                  title="重新分析研究方法"
                                >
                                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                  </svg>
                                  重新分析
                                </button>
                                <button 
                                  v-if="selectedPaper.researchMethod"
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
                            <div v-if="!isLoadingPaperContent && !selectedPaper.researchMethod" 
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
                            <div v-else-if="selectedPaper.researchMethod && showFullText" class="mt-3">
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
                                     v-html="renderMarkdown(selectedPaper.researchMethod)"></div>
                              </div>
                            </div>
                          </div>

            <!-- 下载源 -->
            <div v-if="selectedPaper.downloadSources && selectedPaper.downloadSources.length > 0" class="mb-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">下载源</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <a
                  v-for="(source, sourceIndex) in selectedPaper.downloadSources"
                  :key="sourceIndex"
                  :href="source.url"
                  target="_blank"
                  class="flex items-center justify-between p-3 rounded border hover:bg-gray-50 transition-colors text-sm"
                  :class="{
                    'border-green-300 bg-green-50': source.free,
                    'border-gray-300': !source.free
                  }"
                >
                  <div class="flex items-center">
                    <span class="font-medium">{{ source.source }}</span>
                    <span v-if="source.free" class="ml-1 text-green-600 text-xs">(免费)</span>
                  </div>
                  <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
                  </svg>
                </a>
              </div>
            </div>

            <!-- 链接 -->
            <div class="mb-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">文献链接</h3>
              <div class="flex gap-3">
                <a
                  v-if="selectedPaper.scholar_url"
                  :href="selectedPaper.scholar_url"
                  target="_blank"
                  class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                  查看原文
                </a>
                <a
                  v-if="selectedPaper.downloadUrl"
                  :href="selectedPaper.downloadUrl"
                  target="_blank"
                  class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  下载原文
                </a>
                <button
                  @click="findDownloadSources(selectedPaper)"
                  :disabled="loadingDownload"
                  class="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                  <svg v-if="loadingDownload" class="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                  </svg>
                  {{ loadingDownload ? '获取中...' : '获取更多下载源' }}
                </button>
              </div>
            </div>

            <!-- 引用信息 -->
            <div class="bg-purple-50 p-4 rounded-lg">
              <h3 class="text-lg font-semibold text-purple-900 mb-2 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
                </svg>
                引用信息
              </h3>
              <p class="text-purple-700 text-sm">
                该文献已被添加到您的参考文献列表中，您可以在研究方案中引用此文献的观点和方法。
              </p>
            </div>
          </div>
          
          <!-- 未选择文献时的空状态 -->
          <div v-else class="text-center text-gray-500 mt-20">
            <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            <p class="text-lg">请点击左侧文献卡片查看详情</p>
            <p class="text-sm mt-2">选择一篇参考文献，查看其详细信息</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- 无引用文献时的空状态 -->
  <div v-else class="no-references text-center py-12 px-4 bg-gray-50 rounded-lg">
    <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
    </svg>
    <h3 class="text-xl font-medium text-gray-900 mb-2">暂无参考文献</h3>
    <p class="text-gray-500">在文献搜索页面或推荐页面点击"参考此文"按钮添加文献到此列表</p>
    <div class="mt-6 flex gap-3 justify-center">
      <router-link 
        to="/scholar-search" 
        class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
        </svg>
        前往文献搜索
      </router-link>
      <router-link 
        to="/papers" 
        class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        前往文献推荐
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { papersState, clearReferences, removePaperFromReferences } from '../stores/chatStore'
import { marked } from 'marked'
import markedKatex from 'marked-katex-extension'
import 'katex/dist/katex.min.css'
import { chatState } from '../stores/chatStore'
import { sendSilentMessageToCoze } from '../services/cozeApi'

// 配置marked支持LaTeX数学公式
marked.use(markedKatex({
  throwOnError: false,
  displayMode: false,
  output: 'html'
}))

// 配置marked安全选项
marked.setOptions({
  sanitize: true,
  breaks: true,
  gfm: true
})

// 响应式数据
const selectedPaper = ref(null)
const loadingDownload = ref(false)

// 翻译相关状态
const showTranslation = ref(false)
const translatedAbstract = ref('')
const isTranslating = ref(false)

// 研究方法相关状态
const showMethodTranslation = ref(false)
const translatedMethod = ref('')
const isTranslatingMethod = ref(false)
const showFullText = ref(false)
const isLoadingPaperContent = ref(false)

// 论文缓存相关状态
const isSavingToCache = ref(false)
const paperCacheStatus = ref('') // 'saved', 'updated', ''

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

// 获取论文内容和研究方法
const fetchPaperContent = async () => {
  if (!selectedPaper.value || !selectedPaper.value.title) {
    return
  }
  
  isLoadingPaperContent.value = true
  
  try {
    console.log('手动获取论文内容:', selectedPaper.value.title)
    
    const { getApiBaseUrl } = await import('../config/environment.js')
    const getContentApiUrl = `${getApiBaseUrl()}/paper/get-full-content`
    console.log('📤 获取论文内容API请求URL:', getContentApiUrl)
    
    const response = await fetch(getContentApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: selectedPaper.value.title,
        doi: selectedPaper.value.doi || null
      })
    })
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }
    
    const result = await response.json()
    
    if (result.success) {
      // 更新选中论文的全文
      if (result.fullText) {
        selectedPaper.value.fullText = result.fullText
      }
      
      // 更新研究方法
      if (result.researchMethod) {
        selectedPaper.value.researchMethod = result.researchMethod
        showFullText.value = true // 自动展开研究方法
        // 重置研究方法翻译状态
        showMethodTranslation.value = false
        translatedMethod.value = ''
      }
      
      // 同时更新引用论文列表中的对应论文
      const paperIndex = referencedPapersList.value.findIndex(
        paper => paper.title === selectedPaper.value.title
      )
      
      if (paperIndex !== -1) {
        if (result.fullText) {
          referencedPapersList.value[paperIndex].fullText = result.fullText
        }
        if (result.researchMethod) {
          referencedPapersList.value[paperIndex].researchMethod = result.researchMethod
        }
      }
    } else {
      console.error('获取论文内容失败:', result.error)
      alert('获取论文内容失败: ' + (result.error || '未知错误'))
    }
  } catch (error) {
    console.error('获取论文内容出错:', error)
    alert('获取论文内容出错: ' + error.message)
  } finally {
    isLoadingPaperContent.value = false
  }
}



// 重新分析研究方法
const retryExtractMethod = async () => {
  if (!selectedPaper.value || !selectedPaper.value.title) {
    return
  }
  
  isLoadingPaperContent.value = true
  
  try {
    console.log('重新分析研究方法:', selectedPaper.value.title)
    
    // 第一步：清空数据库中的研究方法，强制重新分析
    console.log('🗑️ 清空数据库中的研究方法...')
    
    const { getApiBaseUrl } = await import('../config/environment.js')
    const saveApiUrl = `${getApiBaseUrl()}/paper-cache/save`
    
    // 准备清空研究方法的数据
    const clearMethodData = {
      title: selectedPaper.value.title,
      authors: Array.isArray(selectedPaper.value.authors) ? selectedPaper.value.authors.join(', ') : (selectedPaper.value.authors || ''),
      abstract: selectedPaper.value.abstract || selectedPaper.value.summary || '',
      doi: selectedPaper.value.doi || '',
      url: selectedPaper.value.scholar_url || selectedPaper.value.url || '',
      download_url: selectedPaper.value.pdf_url || selectedPaper.value.downloadUrl || '',
      year: selectedPaper.value.year ? parseInt(selectedPaper.value.year) : null,
      journal: selectedPaper.value.journal || '',
      venue: selectedPaper.value.journal || '',
      citation_count: selectedPaper.value.citations || selectedPaper.value.citationCount || 0,
      research_method: '', // 清空研究方法
      full_text: selectedPaper.value.fullText || selectedPaper.value.full_text || '',
      translated_abstract: translatedAbstract.value || selectedPaper.value.translated_abstract || '',
      translated_method: '', // 同时清空翻译的研究方法
      paper_id: selectedPaper.value.paper_id || selectedPaper.value.id || '',
      source: selectedPaper.value.source || 'manual',
      is_top_venue: selectedPaper.value.isTopVenue || false
    }
    
    const clearResponse = await fetch(saveApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clearMethodData)
    })
    
    if (!clearResponse.ok) {
      console.warn('清空数据库研究方法失败，但继续进行重新分析')
    } else {
      console.log('✅ 成功清空数据库中的研究方法')
    }
    
    // 第二步：清除前端状态
    selectedPaper.value.researchMethod = null
    showMethodTranslation.value = false
    translatedMethod.value = ''
    
    // 同时更新引用论文列表中的对应论文
    const paperIndex = referencedPapersList.value.findIndex(
      paper => paper.title === selectedPaper.value.title
    )
    if (paperIndex !== -1) {
      referencedPapersList.value[paperIndex].researchMethod = null
    }
    
    // 第三步：重新获取论文内容
    console.log('🔄 重新获取论文内容和研究方法...')
    
    const getContentApiUrl = `${getApiBaseUrl()}/paper/get-full-content`
    console.log('📤 重新分析-获取论文内容API请求URL:', getContentApiUrl)
    
    const response = await fetch(getContentApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: selectedPaper.value.title,
        doi: selectedPaper.value.doi || null
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
        selectedPaper.value.fullText = result.fullText
      }
      
      // 更新研究方法
      if (result.researchMethod) {
        selectedPaper.value.researchMethod = result.researchMethod
        showFullText.value = true // 自动展开研究方法
        console.log('✅ 重新分析成功，获取到新的研究方法')
      } else {
        console.log('⚠️ 重新分析完成，但未获取到研究方法')
      }
      
      // 同时更新引用论文列表中的对应论文
      const paperIndex = referencedPapersList.value.findIndex(
        paper => paper.title === selectedPaper.value.title
      )
      
      if (paperIndex !== -1) {
        if (result.fullText) {
          referencedPapersList.value[paperIndex].fullText = result.fullText
        }
        if (result.researchMethod) {
          referencedPapersList.value[paperIndex].researchMethod = result.researchMethod
        }
      }
    } else {
      throw new Error(result.error || '重新获取论文内容失败');
    }
    
  } catch (error) {
    console.error('重新分析研究方法出错:', error)
    alert('重新分析研究方法出错: ' + error.message)
  } finally {
    isLoadingPaperContent.value = false
  }
}

// 翻译摘要
const translateAbstract = async (abstractText) => {
  if (!abstractText || !abstractText.trim()) {
    throw new Error('摘要内容为空')
  }

  isTranslating.value = true
  
  try {
    console.log('🔤 开始翻译摘要:', abstractText)
    
    // 调用后端翻译API
    const { getApiBaseUrl } = await import('../config/environment.js')
    const translateApiUrl = `${getApiBaseUrl()}/translate`
    console.log('📤 调用翻译API:', translateApiUrl)
    
    const response = await fetch(translateApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: abstractText,
        from: 'en',
        to: 'zh-CN'
      })
    })
    
    if (!response.ok) {
      const errorResult = await response.json().catch(() => ({}));
      throw new Error(errorResult.error || `翻译失败，状态码: ${response.status}`);
    }
    
    const result = await response.json()
    console.log('📥 翻译API响应:', result)
    
    if (!result.success || !result.translated) {
      throw new Error('翻译API返回无效结果')
    }
    
    const translatedText = result.translated.trim()
    
    if (translatedText && translatedText.length > 5) {
      console.log('✅ 摘要翻译成功')
      return translatedText
    } else {
      throw new Error('翻译结果为空或过短')
    }
    
  } catch (error) {
    console.error('❌ 翻译摘要失败:', error)
    throw error
  } finally {
    isTranslating.value = false
  }
}

// 切换摘要翻译显示
const toggleTranslation = async () => {
  if (!selectedPaper.value || !selectedPaper.value.abstract) {
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
      const translated = await translateAbstract(selectedPaper.value.abstract)
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

// 翻译研究方法
const translateMethod = async (methodText) => {
  if (!methodText || !methodText.trim()) {
    throw new Error('研究方法内容为空')
  }
  
  try {
    console.log('🔤 开始翻译研究方法')
    
    // 调用后端翻译API
    const { getApiBaseUrl } = await import('../config/environment.js')
    const translateApiUrl = `${getApiBaseUrl()}/translate`
    console.log('📤 调用翻译API:', translateApiUrl)
    
    const response = await fetch(translateApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: methodText,
        from: 'en',
        to: 'zh-CN'
      })
    })
    
    if (!response.ok) {
      const errorResult = await response.json().catch(() => ({}));
      throw new Error(errorResult.error || `翻译失败，状态码: ${response.status}`);
    }
    
    const result = await response.json()
    console.log('📥 翻译API响应:', result)
    
    if (!result.success || !result.translated) {
      throw new Error('翻译API返回无效结果')
    }
    
    const translatedText = result.translated.trim()
    
    if (translatedText && translatedText.length > 5) {
      console.log('✅ 研究方法翻译成功')
      return translatedText
    } else {
      throw new Error('翻译结果为空或过短')
    }
    
  } catch (error) {
    console.error('❌ 翻译研究方法失败:', error)
    throw error
  }
}

// 切换研究方法翻译显示
const toggleMethodTranslation = async () => {
  if (!selectedPaper.value || !selectedPaper.value.researchMethod) {
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
      const translated = await translateMethod(selectedPaper.value.researchMethod)
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

// 计算属性
const referencedCount = computed(() => papersState.referencedPapers.size)
const referencedPapersList = computed(() => papersState.referencedPapersList)

// 选择文献
const selectPaper = (paper) => {
  selectedPaper.value = paper
  // 重置翻译状态
  showTranslation.value = false
  translatedAbstract.value = ''
  // 重置研究方法翻译状态
  showMethodTranslation.value = false
  translatedMethod.value = ''
  showFullText.value = false
  

}

// 移除单个文献的引用
const removeFromReferences = (paper) => {
  // 在移除引用之前，确保研究方法和翻译内容被保存
  const paperToRemove = referencedPapersList.value.find(p => p.title === paper.title)
  if (paperToRemove) {
    // 保存研究方法和全文到原始论文对象
    const originalPaper = papersState.recommendedPapers.find(p => p.title === paper.title)
    if (originalPaper) {
      if (paperToRemove.researchMethod) {
        originalPaper.researchMethod = paperToRemove.researchMethod
      }
      if (paperToRemove.fullText) {
        originalPaper.fullText = paperToRemove.fullText
      }
    }
  }
  
  removePaperFromReferences(paper)
  
  // 如果移除的是当前选中的文献，清空选择和相关状态
  if (selectedPaper.value === paper) {
    selectedPaper.value = null
    showTranslation.value = false
    translatedAbstract.value = ''
    showMethodTranslation.value = false
    translatedMethod.value = ''
    showFullText.value = false
  }
}

// 清空所有引用
const clearAllReferences = () => {
  if (confirm('确定要清空所有参考文献吗？')) {
    clearReferences()
    selectedPaper.value = null
  }
}

// 格式化日期
const formatDate = (timestamp) => {
  if (!timestamp) return ''
  try {
    return new Date(timestamp).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (error) {
    return ''
  }
}

// 获取更多下载源
const findDownloadSources = async (paper) => {
  if (!paper.title) return
  
  loadingDownload.value = true
  try {
    // 这里可以调用API获取更多下载源
    // 暂时模拟一些下载源
    const mockSources = [
      { source: 'ResearchGate', url: '#', free: true },
      { source: 'Academia.edu', url: '#', free: true },
      { source: 'PubMed Central', url: '#', free: true },
      { source: 'ArXiv', url: '#', free: true },
      { source: 'IEEE Xplore', url: '#', free: false },
      { source: 'SpringerLink', url: '#', free: false }
    ]
    
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 更新选中文献的下载源
    if (selectedPaper.value && selectedPaper.value.title === paper.title) {
      selectedPaper.value.downloadSources = mockSources
    }
    
    // 也更新原始数据
    const paperInList = referencedPapersList.value.find(p => p.title === paper.title)
    if (paperInList) {
      paperInList.downloadSources = mockSources
    }
    
  } catch (error) {
    console.error('获取下载源失败:', error)
    alert('获取下载源失败，请稍后重试')
  } finally {
    loadingDownload.value = false
  }
}

// 导出引用文献
const exportReferences = () => {
  if (referencedCount.value === 0) {
    alert('暂无参考文献可导出')
    return
  }

  const exportData = referencedPapersList.value.map((paper, index) => ({
    序号: index + 1,
    标题: paper.title,
    作者: Array.isArray(paper.authors) ? paper.authors.join(', ') : paper.authors || '',
    期刊: paper.journal || '',
    年份: paper.year || '',
    引用次数: paper.citations || paper.citationCount || '',
    摘要: paper.abstract || paper.summary || '',
    研究方法: paper.researchMethod || '',
    链接: paper.scholar_url || paper.downloadUrl || '',
    来源: paper.source === 'search' ? '文献搜索' : 'AI推荐',
    引用时间: paper.referencedAt ? new Date(paper.referencedAt).toLocaleString() : ''
  }))

  // 转换为CSV格式
  const headers = Object.keys(exportData[0])
  const csvContent = [
    headers.join(','),
    ...exportData.map(row => headers.map(header => `"${row[header]}"`).join(','))
  ].join('\n')

  // 下载CSV文件
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `参考文献列表_${new Date().toISOString().slice(0, 10)}.csv`
  link.click()
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
    console.log('保存引用论文到本地缓存:', paper.title)

    // 准备要保存的论文数据
    const paperData = {
      title: paper.title,
      authors: Array.isArray(paper.authors) ? paper.authors.join(', ') : (paper.authors || ''),
      abstract: paper.abstract || paper.summary || '',
      doi: paper.doi || '',
      url: paper.scholar_url || paper.url || '',
      download_url: paper.pdf_url || paper.downloadUrl || '',
      year: paper.year ? parseInt(paper.year) : null,
      journal: paper.journal || '',
      venue: paper.journal || '',
      citation_count: paper.citations || paper.citationCount || 0,
      research_method: paper.researchMethod || paper.research_method || '',
      full_text: paper.fullText || paper.full_text || '',
      translated_abstract: translatedAbstract.value || paper.translated_abstract || '',
      translated_method: translatedMethod.value || paper.translated_method || '',
      paper_id: paper.paper_id || paper.id || '',
      source: paper.source || 'manual',
      is_top_venue: paper.isTopVenue || false,
      download_sources: paper.downloadSources || null,
      metadata: {
        referencedAt: paper.referencedAt,
        from_cache: paper.from_cache || false,
        saved_at: new Date().toISOString()
      }
    }

    const { getApiBaseUrl } = await import('../config/environment.js')
    const saveApiUrl = `${getApiBaseUrl()}/paper-cache/save`
    console.log('📤 保存论文缓存API请求URL:', saveApiUrl)
    
    const response = await fetch(saveApiUrl, {
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
      console.log(`✅ 引用论文${result.is_update ? '更新' : '保存'}成功:`, paper.title)
      
      // 3秒后重置状态
      setTimeout(() => {
        paperCacheStatus.value = ''
      }, 3000)
      
    } else {
      throw new Error(result.error || '保存失败')
    }

  } catch (error) {
    console.error('保存引用论文到缓存失败:', error)
    alert('保存失败: ' + error.message)
    paperCacheStatus.value = ''
  } finally {
    isSavingToCache.value = false
  }
}
</script>

<style scoped>
.paper-card {
  transition: all 0.2s ease-in-out;
}

.paper-card:hover {
  transform: translateY(-1px);
}

.no-references {
  border: 2px dashed #d1d5db;
}

/* 文本截断样式 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 滚动条样式 */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #f1f5f9;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
  border: 1px solid #f1f5f9;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* 强制显示滚动条 */
.overflow-y-auto::-webkit-scrollbar-corner {
  background: #f1f5f9;
}

/* 专门为右侧文献详情区域的滚动条样式 */
.paper-detail-scroll {
  scrollbar-width: thin;
  scrollbar-color: #94a3b8 #e2e8f0;
}

.paper-detail-scroll::-webkit-scrollbar {
  width: 10px;
}

.paper-detail-scroll::-webkit-scrollbar-track {
  background: #e2e8f0;
  border-radius: 5px;
  margin: 5px 0;
}

.paper-detail-scroll::-webkit-scrollbar-thumb {
  background: #94a3b8;
  border-radius: 5px;
  border: 2px solid #e2e8f0;
  background-clip: content-box;
}

.paper-detail-scroll::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}

.paper-detail-scroll::-webkit-scrollbar-thumb:active {
  background: #475569;
}

/* 响应式设计 */
@media (max-width: 1280px) {
  .grid.grid-cols-12 {
    display: block;
  }
  
  .col-span-5,
  .col-span-7 {
    width: 100%;
    margin-bottom: 1.5rem;
  }
}

@media (max-width: 768px) {
  .paper-card {
    padding: 1rem;
  }
  
  .paper-card h4 {
    font-size: 0.9rem;
  }
  
  .grid.grid-cols-2 {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .bg-white {
    padding: 1rem;
  }
  
  .text-2xl {
    font-size: 1.25rem;
  }
  
  .mb-6 {
    margin-bottom: 1rem;
  }
}

/* 动画效果 */
.paper-card.border-purple-500 {
  animation: selected-glow 0.3s ease-in-out;
}

@keyframes selected-glow {
  0% {
    box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4);
  }
  50% {
    box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.2);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(139, 92, 246, 0);
  }
}

/* 加载动画 */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style> 