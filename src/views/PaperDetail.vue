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
                  ref="keywordInputRef"
                  v-model="searchKeywords"
                  type="text"
                  placeholder="输入关键词，用逗号分隔"
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  @keyup.enter="getRecommendedPapers"
                />
                <button
                  ref="extractKeywordsBtnRef"
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
                ref="getPapersBtnRef"
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
              
              <!-- 外部论文池状态指示器 -->
              <div v-if="externalPoolStatus && externalPoolStatus.totalPapers > 0" 
                   class="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded space-y-1">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-1">
                    <svg class="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                    </svg>
                    <span>论文池: {{ externalPoolStatus.unusedPapers }}/{{ externalPoolStatus.totalPapers }} 可用</span>
                  </div>
                  <button 
                    @click="clearExternalPool"
                    class="text-gray-400 hover:text-red-500 transition-colors ml-2"
                    title="清空论文池"
                  >
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
                <div class="text-gray-400 text-[10px]">
                  关键词: {{ externalPoolStatus.currentKeywords || '无' }}
                </div>
              </div>
              
              <!-- 本地缓存搜索选项 -->
              <div class="flex items-center justify-between px-1">
                <label class="flex items-center text-sm text-gray-600 cursor-pointer">
                  <input 
                    ref="localCacheCheckboxRef"
                    type="checkbox" 
                    v-model="useLocalCache" 
                    class="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span class="ml-2">从本地缓存获取论文</span>
                </label>
                <span class="text-xs text-gray-500">优先使用本地高质量缓存</span>
              </div>
              
              <!-- HCI范围控制选项 -->
              <div class="flex items-center justify-between px-1">
                <label class="flex items-center text-sm text-gray-600 cursor-pointer">
                  <input 
                    ref="hciOnlyCheckboxRef"
                    type="checkbox" 
                    v-model="hciOnly" 
                    class="form-checkbox h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                  />
                  <span class="ml-2">缩小推荐范围：只人机交互领域的文献</span>
                </label>
                <span class="text-xs text-gray-500">专注HCI核心研究</span>
              </div>
              
              <!-- 扩大范围选项 -->
              <div class="flex items-center justify-between px-1">
                <label class="flex items-center text-sm text-gray-600 cursor-pointer">
                  <input 
                    ref="expandRangeCheckboxRef"
                    type="checkbox" 
                    v-model="expandRange" 
                    class="form-checkbox h-4 w-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                  />
                  <span class="ml-2">扩大范围，不限顶刊顶会文献</span>
                </label>
                <span class="text-xs text-gray-500">包含更多文献源</span>
              </div>
            </div>
          </div>

          <!-- AI推荐文献列表 -->
          <div id="papers-list" class="space-y-3 max-h-[65vh] overflow-y-auto overflow-x-hidden pr-2">
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
                    <!-- 相关性显示 -->
                    <span
                      v-if="getRelevanceLevel(paper)"
                      class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ml-2"
                      :class="{
                        'bg-green-100 text-green-700': getRelevanceLevel(paper) === 'high',
                        'bg-yellow-100 text-yellow-700': getRelevanceLevel(paper) === 'medium',
                        'bg-orange-100 text-orange-700': getRelevanceLevel(paper) === 'low',
                        'bg-red-100 text-red-700': getRelevanceLevel(paper) === 'very-low'
                      }"
                    >
                      <div class="flex items-center space-x-1">
                        <div 
                          class="w-2 h-2 rounded-full"
                          :class="{
                            'bg-green-500': getRelevanceLevel(paper) === 'high',
                            'bg-yellow-500': getRelevanceLevel(paper) === 'medium',
                            'bg-orange-500': getRelevanceLevel(paper) === 'low',
                            'bg-red-500': getRelevanceLevel(paper) === 'very-low'
                          }"
                        ></div>
                        <span>
                          {{ getRelevanceLevel(paper) === 'high' ? '高相关性' : 
                             getRelevanceLevel(paper) === 'medium' ? '中等相关性' : 
                             getRelevanceLevel(paper) === 'low' ? '低相关性' : '极低相关性' }}
                        </span>
                      </div>
                    </span>
                  </div>
                  <p class="text-sm text-gray-600 mb-3 line-clamp-2">
                    {{ paper.abstract }}
                  </p>
                  <div class="text-xs text-gray-500 mb-2">
                    <span v-if="paper.authors" class="mr-2">
                      <span class="font-medium">作者：</span>{{ Array.isArray(paper.authors) ? paper.authors.slice(0, 2).join(', ') + (paper.authors.length > 2 ? ' 等' : '') : paper.authors }}
                    </span>
                    <span v-if="paper.year" class="mr-2">{{ paper.year }}</span>
                    <span v-if="paper.journal || paper.venue" class="mr-2">
                      <span class="font-medium">期刊：</span>{{ paper.journal || paper.venue }}
                    </span>
                  </div>
                  
                  <!-- 标签显示区域 -->
                  <div v-if="getPaperTags(paper).length > 0" class="mb-2">
                    <div class="flex flex-wrap gap-1">
                      <div
                        v-for="tag in getPaperTags(paper).slice(0, 3)"
                        :key="tag.id"
                        class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                        :style="{ backgroundColor: tag.color + '20', color: tag.color, borderColor: tag.color }"
                        style="border-width: 1px;"
                      >
                        {{ tag.name }}
                      </div>
                      <div
                        v-if="getPaperTags(paper).length > 3"
                        class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-300"
                      >
                        +{{ getPaperTags(paper).length - 3 }}
                      </div>
                    </div>
                  </div>
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
          <div id="paper-detail" class="paper-detail-container bg-white rounded-xl shadow-sm p-8 max-h-[95vh] overflow-y-auto">
            <div v-if="papersState.selectedPaper">
              <div class="flex justify-between items-start mb-6">
                <h2 class="text-2xl font-bold text-gray-900 flex-1">{{ showTitleTranslation && translatedTitle ? translatedTitle : papersState.selectedPaper.title }}</h2>
                <div class="ml-4 flex items-center space-x-2">
                  <span v-if="isReferenced(papersState.selectedPaper)" 
                        class="px-3 py-1 bg-purple-100 text-purple-600 text-sm rounded-full">
                    已选为参考
                  </span>
                  <button 
                    ref="referenceBtnRef"
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
                    <span class="font-medium">作者：</span>{{ Array.isArray(papersState.selectedPaper.authors) ? papersState.selectedPaper.authors.join(', ') : papersState.selectedPaper.authors }}
                  </span>
                  <span v-if="papersState.selectedPaper.year" class="mr-4">
                    <span class="font-medium">发表年份：</span>{{ papersState.selectedPaper.year }}
                  </span>
                  <span v-if="papersState.selectedPaper.journal || papersState.selectedPaper.venue" class="mr-4">
                    <span class="font-medium">期刊：</span>{{ papersState.selectedPaper.journal || papersState.selectedPaper.venue }}
                  </span>
                  <span v-if="papersState.selectedPaper.citationCount !== undefined" class="mr-4">
                    <span class="font-medium">被引用次数：</span>{{ papersState.selectedPaper.citationCount }}
                  </span>
                </div>
                
                <!-- 相关性显示 -->
                <div v-if="getRelevanceLevel(papersState.selectedPaper)" class="mb-4">
                  <span class="text-sm font-medium text-gray-700 mr-2">相关性：</span>
                  <span
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                    :class="{
                      'bg-green-100 text-green-700': getRelevanceLevel(papersState.selectedPaper) === 'high',
                      'bg-yellow-100 text-yellow-700': getRelevanceLevel(papersState.selectedPaper) === 'medium',
                      'bg-orange-100 text-orange-700': getRelevanceLevel(papersState.selectedPaper) === 'low',
                      'bg-red-100 text-red-700': getRelevanceLevel(papersState.selectedPaper) === 'very-low'
                    }"
                  >
                    <div class="flex items-center space-x-2">
                      <div 
                        class="w-2 h-2 rounded-full"
                        :class="{
                          'bg-green-500': getRelevanceLevel(papersState.selectedPaper) === 'high',
                          'bg-yellow-500': getRelevanceLevel(papersState.selectedPaper) === 'medium',
                          'bg-orange-500': getRelevanceLevel(papersState.selectedPaper) === 'low',
                          'bg-red-500': getRelevanceLevel(papersState.selectedPaper) === 'very-low'
                        }"
                      ></div>
                      <span>
                        {{ getRelevanceLevel(papersState.selectedPaper) === 'high' ? '高相关性' : 
                           getRelevanceLevel(papersState.selectedPaper) === 'medium' ? '中等相关性' : 
                           getRelevanceLevel(papersState.selectedPaper) === 'low' ? '低相关性' : '极低相关性' }}
                      </span>
                    </div>
                  </span>
                </div>
                
                <!-- 标签管理区域 -->
                <div class="mb-4">
                  <div class="flex items-center justify-between mb-3">
                    <h4 class="text-sm font-medium text-gray-700">自定义标签</h4>
                    <button 
                      @click="showTagDialog = true"
                      class="text-sm px-2 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors flex items-center space-x-1"
                      title="添加标签"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                      </svg>
                      <span>添加标签</span>
                    </button>
                  </div>
                  
                  <!-- 标签显示区域 -->
                  <div class="flex flex-wrap gap-2 min-h-[2rem]">
                    <div v-if="getPaperTags(papersState.selectedPaper).length === 0" 
                         class="text-sm text-gray-400 italic flex items-center">
                      暂无标签，点击右侧按钮添加
                    </div>
                    <div
                      v-for="tag in getPaperTags(papersState.selectedPaper)"
                      :key="tag.id"
                      class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-md cursor-default group"
                      :style="{ backgroundColor: tag.color + '20', color: tag.color, borderColor: tag.color }"
                      style="border-width: 1px;"
                    >
                      <span>{{ tag.name }}</span>
                      <button
                        @click="removeTagFromPaper(papersState.selectedPaper, tag.id)"
                        class="ml-1 p-0.5 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors opacity-0 group-hover:opacity-100"
                        title="移除标签"
                      >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                <!-- "保存到本地"按钮移到这里 -->
                <div class="mb-4 pb-3 border-b border-gray-100">
                  <button 
                    @click="savePaperToCache(papersState.selectedPaper)"
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
                
                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-lg font-semibold text-gray-900">摘要</h3>
                  <button 
                    @click="toggleTranslation"
                    :disabled="isTranslating"
                    class="text-sm px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                    title="翻译标题和摘要"
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
                <div id="research-method-section" class="mt-6">
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
                        @click="reanalyzeResearchMethod"
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

  <!-- 标签管理对话框 -->
  <div v-if="showTagDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="showTagDialog = false">
    <div class="bg-white rounded-2xl p-6 w-full max-w-md mx-4" @click.stop>
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-gray-900">管理标签</h3>
        <button @click="showTagDialog = false" class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- 新建标签区域 -->
      <div class="mb-6">
        <h4 class="text-sm font-medium text-gray-700 mb-3">创建新标签</h4>
        <div class="space-y-3">
          <input
            v-model="newTagName"
            type="text"
            placeholder="输入标签名称"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            @keyup.enter="createNewTag"
            maxlength="20"
          />
          <div class="flex items-center justify-between">
            <div class="flex space-x-2">
              <span class="text-sm text-gray-600">颜色：</span>
              <div class="flex space-x-1">
                <button
                  v-for="color in tagColors"
                  :key="color"
                  @click="newTagColor = color"
                  class="w-6 h-6 rounded-full border-2 transition-all"
                  :class="newTagColor === color ? 'border-gray-400 scale-110' : 'border-gray-200'"
                  :style="{ backgroundColor: color }"
                  :title="color"
                ></button>
              </div>
            </div>
            <button
              @click="createNewTag"
              :disabled="!newTagName.trim()"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
            >
              创建
            </button>
          </div>
          <!-- 预览 -->
          <div v-if="newTagName.trim()" class="mt-2">
            <span class="text-xs text-gray-500">预览：</span>
            <div
              class="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ml-2"
              :style="{ backgroundColor: newTagColor + '20', color: newTagColor, borderColor: newTagColor }"
              style="border-width: 1px;"
            >
              {{ newTagName.trim() }}
            </div>
          </div>
        </div>
      </div>

      <!-- 现有标签列表 -->
      <div class="mb-6">
        <h4 class="text-sm font-medium text-gray-700 mb-3">选择现有标签</h4>
        <div class="max-h-40 overflow-y-auto">
          <div v-if="allTags.length === 0" class="text-sm text-gray-400 italic text-center py-4">
            暂无标签，请先创建
          </div>
          <div v-else class="space-y-2">
            <label
              v-for="tag in allTags"
              :key="tag.id"
              class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer group"
            >
              <input
                type="checkbox"
                :checked="isPaperTagged(papersState.selectedPaper, tag.id)"
                @change="togglePaperTag(papersState.selectedPaper, tag)"
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div
                class="flex-1 inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium"
                :style="{ backgroundColor: tag.color + '20', color: tag.color, borderColor: tag.color }"
                style="border-width: 1px;"
              >
                {{ tag.name }}
              </div>
              <button
                @click.prevent="deleteTag(tag.id)"
                class="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:text-red-600 transition-all"
                title="删除标签"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </label>
          </div>
        </div>
      </div>

      <!-- 底部按钮 -->
      <div class="flex justify-end space-x-3">
        <button
          @click="showTagDialog = false"
          class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          取消
        </button>
        <button
          @click="showTagDialog = false"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          完成
        </button>
      </div>
    </div>
  </div>

  <!-- 新手指引遮罩层 -->
  <div v-if="showTutorial" class="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300" @click="skipTutorial">
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
                @click="nextTutorialStep"
                class="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                知道了
              </button>
              <button
                @click="skipTutorial"
                class="px-3 py-1.5 text-gray-600 text-sm hover:text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                跳过
              </button>
            </div>
            <button
              @click="dontShowAgain"
              class="text-xs text-gray-500 hover:text-gray-700 transition-colors underline"
            >
              下次不提示
            </button>
          </div>
          
          <!-- 键盘快捷键提示 -->
          <div class="mt-2 text-xs text-gray-400 text-center">
            <span>Enter/空格: 下一步</span>
            <span class="mx-2">•</span>
            <span>Esc: 跳过</span>
            <span class="mx-2">•</span>
            <span>←→: 切换步骤</span>
          </div>
        </div>
      </div>
      
      <!-- 进度指示器 -->
      <div class="mt-3 pt-2 border-t border-gray-100">
        <div class="flex items-center justify-between text-xs text-gray-500">
          <span>步骤 {{ currentTutorialStep + 1 }} / {{ tutorialSteps.length }}</span>
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
  <div v-if="isDevelopment" class="fixed bottom-4 right-4 z-40">
    <button
      @click="resetTutorial"
      class="px-3 py-2 bg-gray-800 text-white text-xs rounded-lg hover:bg-gray-700 transition-colors opacity-50 hover:opacity-100"
      title="重置新手指引状态"
    >
      重置引导
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import ChatBox from '../components/ChatBox.vue'
import { marked } from 'marked'
import markedKatex from 'marked-katex-extension'
import 'katex/dist/katex.min.css'
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
  setRecommendationError,
  markPapersAsDisplayed,
  getDisplayedPaperIds,
  getDisplayedPaperTitles,
  clearExternalPaperPool,
  getExternalPoolStatus,
  clearDisplayedPapers
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

// 标题翻译相关状态
const showTitleTranslation = ref(false)
const translatedTitle = ref('')

// 研究方法翻译相关状态
const showMethodTranslation = ref(false)
const translatedMethod = ref('')
const isTranslatingMethod = ref(false)

// 论文内容加载状态
const isLoadingPaperContent = ref(false)

// 扩大范围选项 - 默认为false（只获取顶刊顶会）
const expandRange = ref(false)

// 本地缓存搜索选项 - 默认为true（优先使用本地缓存）
const useLocalCache = ref(true)

// HCI范围控制选项 - 默认为false（推荐多领域相关文献）
const hciOnly = ref(false)

// 关键词输入
const searchKeywords = ref('')
const isExtractingKeywords = ref(false)

// 论文缓存相关状态
const isSavingToCache = ref(false)
const paperCacheStatus = ref('') // 'saved', 'updated', ''

// 外部论文池状态
const externalPoolStatus = ref(null)

// 标签管理相关状态
const showTagDialog = ref(false)
const newTagName = ref('')
const newTagColor = ref('#3B82F6')
const allTags = ref([])
const paperTags = ref(new Map()) // 存储论文与标签的关联关系

// 预定义的标签颜色
const tagColors = [
  '#3B82F6', // 蓝色
  '#10B981', // 绿色
  '#F59E0B', // 黄色
  '#EF4444', // 红色
  '#8B5CF6', // 紫色
  '#F97316', // 橙色
  '#06B6D4', // 青色
  '#84CC16', // 石灰绿
  '#EC4899', // 粉色
  '#6B7280'  // 灰色
]

// 监听外部论文池状态变化
const updateExternalPoolStatus = () => {
  externalPoolStatus.value = getExternalPoolStatus()
}

// 初始化时更新状态
updateExternalPoolStatus()

// 页面加载时清空已显示论文记录，确保重新开始推荐
onMounted(() => {
  clearDisplayedPapers()
  updateExternalPoolStatus()
  loadTagsData()
  console.log('🔄 页面加载时已清空已显示论文记录，重新开始推荐')
  
  // 检查是否需要显示新手指引
  if (shouldShowTutorial()) {
    // 延迟一点时间，确保页面完全加载
    setTimeout(() => {
      startTutorial()
    }, 1000)
  }
  
  // 添加键盘事件监听
  document.addEventListener('keydown', handleKeydown)
})

// 组件卸载时移除事件监听
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

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
        nextTick(() => {
          focusCurrentElement()
        })
      }
      break
  }
}

// 清空外部论文池
const clearExternalPool = () => {
  clearExternalPaperPool()
  updateExternalPoolStatus()
}

// 重新分析研究方法
const reanalyzeResearchMethod = async () => {
  if (!papersState.selectedPaper || !papersState.selectedPaper.title) {
    return
  }
  
  isLoadingPaperContent.value = true
  
  try {
    console.log('重新分析研究方法:', papersState.selectedPaper.title)
    
    // 第一步：清空数据库中的研究方法，强制重新分析
    console.log('🗑️ 清空数据库中的研究方法...')
    
    const { getApiBaseUrl } = await import('../config/environment.js')
    const saveApiUrl = `${getApiBaseUrl()}/paper-cache/save`
    
    // 准备清空研究方法的数据
    const clearMethodData = {
      title: papersState.selectedPaper.title,
      authors: Array.isArray(papersState.selectedPaper.authors) ? papersState.selectedPaper.authors.join(', ') : (papersState.selectedPaper.authors || ''),
      abstract: papersState.selectedPaper.abstract || '',
      doi: papersState.selectedPaper.doi || '',
      url: papersState.selectedPaper.url || papersState.selectedPaper.scholar_url || '',
      download_url: papersState.selectedPaper.downloadUrl || papersState.selectedPaper.pdf_url || '',
      year: papersState.selectedPaper.year ? parseInt(papersState.selectedPaper.year) : null,
      journal: papersState.selectedPaper.journal || '',
      venue: papersState.selectedPaper.venue || papersState.selectedPaper.journal || '',
      citation_count: papersState.selectedPaper.citationCount || papersState.selectedPaper.citations || 0,
      research_method: '', // 清空研究方法
      full_text: papersState.selectedPaper.fullText || papersState.selectedPaper.full_text || '',
      translated_abstract: translatedAbstract.value || papersState.selectedPaper.translated_abstract || '',
      translated_method: '', // 同时清空翻译的研究方法
      paper_id: papersState.selectedPaper.paper_id || papersState.selectedPaper.id || '',
      source: 'recommendation',
      is_top_venue: papersState.selectedPaper.isTopVenue || false
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
    papersState.selectedPaper.researchMethod = null
    showMethodTranslation.value = false
    translatedMethod.value = ''
    
    // 同时更新推荐论文列表中的对应论文
    const paperIndex = papersState.recommendedPapers.findIndex(
      paper => paper.title === papersState.selectedPaper.title
    )
    if (paperIndex !== -1) {
      papersState.recommendedPapers[paperIndex].researchMethod = null
    }
    
    // 第三步：重新获取论文内容
    console.log('🔄 重新获取论文内容和研究方法...')
    
    const getContentApiUrl = `${getApiBaseUrl()}/paper/get-full-content`
    console.log('📤 重新分析-获取论文内容API请求URL:', getContentApiUrl)
    
    // 获取当前AI服务类型
    const { getCurrentAIService } = await import('../stores/aiServiceStore.js')
    const currentAIService = getCurrentAIService()
    
    const response = await fetch(getContentApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: papersState.selectedPaper.title,
        doi: papersState.selectedPaper.doi || null,
        aiService: currentAIService === 'chatgpt' ? 'chatgpt' : 'coze'
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
        console.log('✅ 重新分析成功，获取到新的研究方法')
      } else {
        console.log('⚠️ 重新分析完成，但未获取到研究方法')
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
      throw new Error(result.error || '重新获取论文内容失败');
    }
    
  } catch (error) {
    console.error('重新分析研究方法出错:', error)
    alert('重新分析研究方法出错: ' + error.message)
  } finally {
    isLoadingPaperContent.value = false
  }
}

// 手动获取论文全文和研究方法
const fetchPaperContent = async () => {
  if (!papersState.selectedPaper || !papersState.selectedPaper.title) {
    return
  }
  
  isLoadingPaperContent.value = true
  
  // 重置研究方法翻译状态
  showMethodTranslation.value = false
  translatedMethod.value = ''
  
  try {
    console.log('获取论文内容:', papersState.selectedPaper.title)
    
    const { getApiBaseUrl } = await import('../config/environment.js')
    const getContentApiUrl = `${getApiBaseUrl()}/paper/get-full-content`
    console.log('📤 获取论文内容API请求URL:', getContentApiUrl)
    
    // 获取当前AI服务类型
    const { getCurrentAIService } = await import('../stores/aiServiceStore.js')
    const currentAIService = getCurrentAIService()
    
    const response = await fetch(getContentApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: papersState.selectedPaper.title,
        doi: papersState.selectedPaper.doi || null,
        aiService: currentAIService === 'chatgpt' ? 'chatgpt' : 'coze'
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



// 配置marked支持LaTeX数学公式
marked.use(markedKatex({
  throwOnError: false,
  displayMode: false,
  output: 'html'
}))

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



const selectRecommendedPaper = (paper) => {
  selectPaper(paper)
  // 重置全文显示状态
  showFullText.value = false
  // 重置翻译状态
  showTranslation.value = false
  translatedAbstract.value = ''
  // 重置标题翻译状态
  showTitleTranslation.value = false
  translatedTitle.value = ''
  // 重置研究方法翻译状态
  showMethodTranslation.value = false
  translatedMethod.value = ''
}

// 翻译文本的通用函数
const translateText = async (text, type = 'text') => {
  if (!text || !text.trim()) {
    throw new Error(`${type}内容为空`)
  }
  
  try {
    console.log(`🔤 开始翻译${type}:`, text)
    
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
        text: text,
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
    
    if (translatedText && translatedText.length > 0) {
      console.log(`✅ ${type}翻译成功`)
      return translatedText
    } else {
      throw new Error('翻译结果为空')
    }
    
  } catch (error) {
    console.error(`❌ 翻译${type}失败:`, error)
    throw error
  }
}

// 翻译摘要
const translateAbstract = async (abstractText) => {
  isTranslating.value = true
  try {
    return await translateText(abstractText, '摘要')
  } finally {
    isTranslating.value = false
  }
}

// 翻译标题
const translateTitle = async (titleText) => {
  isTranslating.value = true
  try {
    return await translateText(titleText, '标题')
  } finally {
    isTranslating.value = false
  }
}

// 切换翻译显示
const toggleTranslation = async () => {
  if (!papersState.selectedPaper) {
    return
  }

  // 如果已经显示翻译，切换回原文
  if (showTranslation.value) {
    showTranslation.value = false
    showTitleTranslation.value = false
    return
  }

  // 如果已经有翻译内容，直接显示
  if (translatedAbstract.value || translatedTitle.value) {
    showTranslation.value = true
    showTitleTranslation.value = true
    return
  }

  // 同时翻译标题和摘要
  try {
    const promises = []
    
    // 翻译标题
    if (papersState.selectedPaper.title) {
      promises.push(
        translateTitle(papersState.selectedPaper.title)
          .then(translated => {
            translatedTitle.value = translated
          })
          .catch(error => {
            console.error('标题翻译失败:', error)
            // 标题翻译失败不影响整体流程
          })
      )
    }
    
    // 翻译摘要
    if (papersState.selectedPaper.abstract) {
      promises.push(
        translateAbstract(papersState.selectedPaper.abstract)
          .then(translated => {
            translatedAbstract.value = translated
          })
          .catch(error => {
            console.error('摘要翻译失败:', error)
            throw error // 摘要翻译失败需要报错
          })
      )
    }
    
    // 等待所有翻译完成
    if (promises.length > 0) {
      await Promise.all(promises)
    }
    
    // 显示翻译结果
    showTranslation.value = true
    showTitleTranslation.value = true
    
  } catch (error) {
    console.error('翻译失败:', error)
    alert('翻译失败：' + error.message)
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
  return await translateText(methodText, '研究方法')
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
    
    // 调用AI服务适配器
    const { extractKeywords } = await import('../services/aiServiceAdapter.js')
    const keywords = await extractKeywords(chatHistory, Date.now().toString())
    
    if (keywords) {
      console.log('提取到关键词:', keywords)
      searchKeywords.value = keywords
      alert('关键词提取成功！')
    } else {
      throw new Error('提取关键词失败');
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

    // 收集已显示的论文ID和标题，避免重复推荐
    const excludeIds = getDisplayedPaperIds()
    const excludeTitles = getDisplayedPaperTitles()
    
    console.log('排除已显示的论文ID:', excludeIds)
    console.log('排除已显示的论文标题:', excludeTitles)

    // 确定当前搜索关键词（必须与后端格式化逻辑一致）
    let currentKeywords = ''
    if (searchKeywords.value && searchKeywords.value.trim()) {
      currentKeywords = searchKeywords.value.trim()
    } else {
      // 从聊天历史提取关键词的简化版本
      const recentMessages = chatHistory.slice(-4)
      currentKeywords = recentMessages
        .map(msg => msg.content)
        .join(' ')
        .replace(/[^\w\s\u4e00-\u9fa5]/g, ' ')
        .split(/\s+/)
        .filter(word => word.length > 2)
        .slice(0, 10)
        .join(' ')
    }

    // 检查外部论文池状态
    const { isExternalPoolAvailable, getExternalPoolStatus, getUnusedExternalPapers } = await import('../stores/chatStore')
    
    // 先检查基本的论文池状态
    const poolStatus = getExternalPoolStatus()
    console.log('🔍 基本论文池状态:', poolStatus)
    
    // 检查是否有可用的未使用论文
    const unusedPapers = getUnusedExternalPapers(5)
    console.log('📋 可用的未使用论文数:', unusedPapers.length)
    
    // 检查关键词匹配（使用更宽松的匹配条件）
    let keywordsMatch = false
    if (poolStatus.currentKeywords && currentKeywords) {
      const poolWords = poolStatus.currentKeywords.toLowerCase().split(/[,\s]+/).filter(w => w.length > 2)
      const currentWords = currentKeywords.toLowerCase().split(/[,\s]+/).filter(w => w.length > 2)
      
      // 如果有任何词汇重叠，就认为匹配
      keywordsMatch = poolWords.some(pw => currentWords.some(cw => 
        pw.includes(cw) || cw.includes(pw) || pw === cw
      ))
    }
    
    console.log('🔑 关键词匹配检查:', {
      poolKeywords: poolStatus.currentKeywords,
      currentKeywords: currentKeywords,
      match: keywordsMatch,
      poolWords: poolStatus.currentKeywords?.toLowerCase().split(/[,\s]+/).filter(w => w.length > 2),
      currentWords: currentKeywords.toLowerCase().split(/[,\s]+/).filter(w => w.length > 2)
    })
    
    // 简化条件：只要有未使用的论文就优先使用论文池
    const poolAvailable = unusedPapers.length >= 1 && poolStatus.totalPapers > 0
    
    console.log('🏊‍♂️ 外部论文池可用性:', {
      available: poolAvailable,
      keywordsMatch,
      unusedCount: unusedPapers.length,
      totalPapers: poolStatus.totalPapers,
      currentKeywords,
      poolKeywords: poolStatus.currentKeywords
    })

    // 构建请求参数
    const requestBody = {
      filter_venues: !expandRange.value, // 默认只获取顶刊顶会，勾选扩大范围后获取所有文献
      session_id: Date.now().toString(),
      exclude_ids: excludeIds, // 传递要排除的论文ID
      exclude_titles: excludeTitles, // 传递要排除的论文标题
      use_local_cache: useLocalCache.value, // 是否使用本地缓存搜索
      hci_only: hciOnly.value, // 是否只推荐人机交互领域文献
      
      // 外部论文池相关参数
      useExternalPool: poolAvailable,
      externalPoolData: poolAvailable ? papersState.externalPaperPool : null,
      poolKeywords: currentKeywords
    }
    
    console.log('📤 发送给后端的论文池数据:', {
      useExternalPool: requestBody.useExternalPool,
      hasPoolData: !!requestBody.externalPoolData,
      poolDataKeys: requestBody.externalPoolData ? Object.keys(requestBody.externalPoolData) : [],
      poolPaperCount: requestBody.externalPoolData?.papers?.length || 0,
      poolKeywords: requestBody.externalPoolData?.currentKeywords,
      requestKeywords: requestBody.poolKeywords
    })
    
    // 如果用户输入了关键词，优先使用用户输入的关键词
    if (searchKeywords.value && searchKeywords.value.trim()) {
      requestBody.keywords = searchKeywords.value.trim()
      console.log('使用用户输入的关键词进行搜索:', requestBody.keywords)
    } else {
      // 否则使用聊天历史
      requestBody.chatHistory = chatHistory
      console.log('使用聊天历史进行搜索')
    }

    // 调用推荐API（使用环境配置）
    const { getApiBaseUrl } = await import('../config/environment.js')
    const apiUrl = `${getApiBaseUrl()}/semantic-recommend`
    console.log('📤 文献推荐API请求URL:', apiUrl)
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    })
    
         // 记录请求URL和参数（用于调试）
     console.log('📤 推荐文献API请求参数:', {
       ...requestBody,
       externalPoolData: requestBody.externalPoolData ? '已提供论文池数据' : '无论文池数据'
     });
     
     console.log(`🔍 搜索模式: ${useLocalCache.value ? '本地缓存 + 外部搜索' : '仅外部搜索'}`);
     console.log(`📊 文献范围: ${expandRange.value ? '扩大范围（包含非顶刊顶会）' : '仅顶刊顶会'}`);
     console.log(`🎯 推荐领域: ${hciOnly.value ? '仅人机交互领域 (HCI)' : '多领域相关（CS+Arts+Psychology+Social）'}`);

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

    // 处理外部论文池信息
    if (result.externalPoolInfo) {
      const { addToExternalPaperPool } = await import('../stores/chatStore')
      
      if (result.externalPoolInfo.used && result.externalPoolInfo.action === 'used_existing_pool') {
        // 使用了现有论文池，无需更新
        console.log('✅ 使用了现有外部论文池:', result.externalPoolInfo)
      } else if (result.externalPoolInfo.pool) {
        // 建立了新的论文池或扩展了论文池
        const action = result.externalPoolInfo.action || 'creating_new_pool'
        console.log(`📋 ${action === 'creating_new_pool' ? '建立新的' : action === 'expanding_pool' ? '扩展' : '更新'}外部论文池:`, result.externalPoolInfo)
        addToExternalPaperPool(result.externalPoolInfo.pool, result.externalPoolInfo.keywords, result.externalPoolInfo)
      }
    }

    // 处理推荐结果 - 使用全局状态管理
    if (result.papers && Array.isArray(result.papers)) {
      // 确保每个paper对象包含所需的所有字段
      const processedPapers = result.papers.map(paper => ({
        ...paper,
        title: paper.title || '无标题',
        abstract: paper.abstract || '暂无摘要',
        downloadUrl: paper.downloadUrl || null,
        fullText: paper.fullText || paper.full_text || null,
        researchMethod: paper.researchMethod || paper.research_method || null,
        translatedAbstract: paper.translatedAbstract || paper.translated_abstract || null,
        translatedMethod: paper.translatedMethod || paper.translated_method || null,
        authors: paper.authors || '未知作者',
        year: paper.year || null,
        citationCount: paper.citationCount || 0
      }));

      addRecommendedPapers(processedPapers)
      
      // 标记新获取的论文为已显示
      markPapersAsDisplayed(processedPapers)
      
      console.log('📋 获取到推荐文献:', processedPapers)
      console.log('📊 推荐统计: 缓存命中', result.cache_hits || 0, '篇, 外部获取', result.external_hits || 0, '篇')
      console.log('⚙️ 后端确认设置: 使用本地缓存 =', result.use_local_cache)
      
      if (!result.use_local_cache) {
        console.log('✅ 已按要求跳过本地缓存搜索，所有结果均来自外部API')
      }
      
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

    // 更新外部论文池状态
    updateExternalPoolStatus()

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
      research_method: paper.researchMethod || paper.research_method || '',
      full_text: paper.fullText || paper.full_text || '',
      translated_abstract: translatedAbstract.value || paper.translated_abstract || '',
      translated_method: translatedMethod.value || paper.translated_method || '',
      paper_id: paper.paper_id || paper.id || '',
      source: 'recommendation',
      is_top_venue: paper.isTopVenue || false,
      download_sources: paper.downloadSources || null,
      metadata: {
        from_cache: paper.from_cache || false,
        saved_at: new Date().toISOString()
      }
    }

    const { getApiBaseUrl } = await import('../config/environment.js')
    const saveApiUrl = `${getApiBaseUrl()}/paper-cache/save`
    console.log('📤 保存论文API请求URL:', saveApiUrl)
    
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
    const { getApiBaseUrl } = await import('../config/environment.js')
    const checkApiUrl = `${getApiBaseUrl()}/paper-cache/check`
    console.log('📤 检查论文缓存API请求URL:', checkApiUrl)
    
    const response = await fetch(checkApiUrl, {
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

// 标签管理函数
const generateTagId = () => {
  return 'tag_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
}

const generatePaperKey = (paper) => {
  return paper.title || paper.id || Math.random().toString(36)
}

// 创建新标签
const createNewTag = () => {
  if (!newTagName.value.trim()) return
  
  const newTag = {
    id: generateTagId(),
    name: newTagName.value.trim(),
    color: newTagColor.value,
    createdAt: Date.now()
  }
  
  allTags.value.push(newTag)
  
  // 保存到localStorage
  localStorage.setItem('paperTags_allTags', JSON.stringify(allTags.value))
  
  // 重置表单
  newTagName.value = ''
  newTagColor.value = tagColors[0]
  
  console.log('创建新标签:', newTag)
}

// 删除标签
const deleteTag = (tagId) => {
  if (!confirm('确定要删除这个标签吗？删除后所有文献的此标签也会被移除。')) return
  
  // 从所有标签中移除
  allTags.value = allTags.value.filter(tag => tag.id !== tagId)
  
  // 从所有论文中移除此标签
  paperTags.value.forEach((tags, paperKey) => {
    const updatedTags = tags.filter(id => id !== tagId)
    if (updatedTags.length === 0) {
      paperTags.value.delete(paperKey)
    } else {
      paperTags.value.set(paperKey, updatedTags)
    }
  })
  
  // 保存到localStorage
  localStorage.setItem('paperTags_allTags', JSON.stringify(allTags.value))
  localStorage.setItem('paperTags_paperTags', JSON.stringify(Array.from(paperTags.value.entries())))
  
  console.log('删除标签:', tagId)
}

// 获取论文的标签
const getPaperTags = (paper) => {
  if (!paper) return []
  
  const paperKey = generatePaperKey(paper)
  const tagIds = paperTags.value.get(paperKey) || []
  
  return allTags.value.filter(tag => tagIds.includes(tag.id))
}

// 检查论文是否有指定标签
const isPaperTagged = (paper, tagId) => {
  if (!paper) return false
  
  const paperKey = generatePaperKey(paper)
  const tagIds = paperTags.value.get(paperKey) || []
  
  return tagIds.includes(tagId)
}

// 切换论文标签
const togglePaperTag = (paper, tag) => {
  if (!paper) return
  
  const paperKey = generatePaperKey(paper)
  const currentTags = paperTags.value.get(paperKey) || []
  
  if (currentTags.includes(tag.id)) {
    // 移除标签
    const updatedTags = currentTags.filter(id => id !== tag.id)
    if (updatedTags.length === 0) {
      paperTags.value.delete(paperKey)
    } else {
      paperTags.value.set(paperKey, updatedTags)
    }
  } else {
    // 添加标签
    paperTags.value.set(paperKey, [...currentTags, tag.id])
  }
  
  // 保存到localStorage
  localStorage.setItem('paperTags_paperTags', JSON.stringify(Array.from(paperTags.value.entries())))
  
  console.log('切换论文标签:', paperKey, tag.name)
}

// 从论文中移除标签
const removeTagFromPaper = (paper, tagId) => {
  if (!paper) return
  
  const paperKey = generatePaperKey(paper)
  const currentTags = paperTags.value.get(paperKey) || []
  const updatedTags = currentTags.filter(id => id !== tagId)
  
  if (updatedTags.length === 0) {
    paperTags.value.delete(paperKey)
  } else {
    paperTags.value.set(paperKey, updatedTags)
  }
  
  // 保存到localStorage
  localStorage.setItem('paperTags_paperTags', JSON.stringify(Array.from(paperTags.value.entries())))
  
  console.log('从论文移除标签:', paperKey, tagId)
}

// 加载标签数据
const loadTagsData = () => {
  try {
    // 加载所有标签
    const savedTags = localStorage.getItem('paperTags_allTags')
    if (savedTags) {
      allTags.value = JSON.parse(savedTags)
    }
    
    // 加载论文标签关联
    const savedPaperTags = localStorage.getItem('paperTags_paperTags')
    if (savedPaperTags) {
      const entries = JSON.parse(savedPaperTags)
      paperTags.value = new Map(entries)
    }
    
    console.log('加载标签数据:', allTags.value.length, '个标签,', paperTags.value.size, '个论文关联')
  } catch (error) {
    console.error('加载标签数据失败:', error)
  }
}

// 根据相关性分数确定相关性等级（与ScholarSearch.vue保持一致）
const getRelevanceLevel = (paper) => {
  // 优先使用paper对象的relevance_score字段
  const score = paper.relevance_score
  if (score !== undefined && score !== null) {
    if (score >= 0.8) return 'high'      // 高相关性：绿色
    if (score >= 0.6) return 'medium'    // 中等相关性：黄色  
    if (score >= 0.4) return 'low'       // 低相关性：橙色
    return 'very-low'                    // 极低相关性：红色
  }
  
  // 如果没有relevance_score，返回null（不显示相关性标签）
  return null
}

// 新手指引相关状态
const showTutorial = ref(false)
const currentTutorialStep = ref(0)

// 开发模式判断
const isDevelopment = computed(() => {
  return process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost'
})

// 引用DOM元素
const keywordInputRef = ref(null)
const extractKeywordsBtnRef = ref(null)
const getPapersBtnRef = ref(null)
const localCacheCheckboxRef = ref(null)
const hciOnlyCheckboxRef = ref(null)
const expandRangeCheckboxRef = ref(null)
const referenceBtnRef = ref(null)

// 样例数据 - 用于新手指引时显示
const tutorialSamplePapers = [
  {
    id: 'tutorial_1',
    title: 'Synthetic Human Memories: AI-Edited Images and Videos Can Implant False Memories and Distort Recollection',
    abstract: 'This study investigates how AI-edited media content affects human memory formation and recall accuracy. Through a series of controlled experiments, we demonstrate that exposure to AI-manipulated images and videos can significantly alter participants\' memory of events, leading to false memory implantation and distorted recollection patterns. Our findings reveal that AI-generated content can be particularly effective at creating false memories due to its realistic appearance and the lack of obvious manipulation cues that humans have learned to detect in traditional media.',
    authors: ['Smith, J.', 'Johnson, M.', 'Brown, R.', 'Davis, K.', 'Wilson, A.'],
    year: 2023,
    journal: 'Nature Human Behaviour',
    venue: 'Nature Human Behaviour',
    citationCount: 156,
    relevance_score: 0.95,
    downloadUrl: 'https://example.com/paper1.pdf',
    researchMethod: `## 研究假设与实验设计

**方法学解释：**
本研究采用2×2混合实验设计，旨在探究AI编辑媒体内容对人类记忆形成的影响。实验设计基于认知负荷理论和记忆重构理论，通过操纵媒体类型（AI编辑 vs. 传统编辑）和呈现方式（静态 vs. 动态）来检验研究假设。

**原文引用：**
"We hypothesized that AI-edited media content would lead to higher rates of false memory formation compared to traditionally edited content, particularly when presented in dynamic formats."

## 参与者特征与实验实施

**方法学解释：**
研究招募了120名年龄在18-35岁之间的参与者，采用随机分组的方式分配到四个实验条件中。所有参与者均具有正常的视觉和听觉能力，无认知障碍史。

**原文引用：**
"Participants were randomly assigned to one of four experimental conditions using a computer-generated randomization sequence. Each participant completed a pre-test memory assessment and then viewed either AI-edited or traditionally edited media content."

## 数据收集与统计分析

**方法学解释：**
数据收集包括主观评分数据（记忆信心度、内容可信度）和行为数据（反应时间、错误率）。统计分析采用SPSS 26.0进行，包括描述性统计、方差分析和回归分析。

**原文引用：**
"Memory confidence was measured using a 7-point Likert scale, while response times and error rates were recorded automatically by the experimental software. Statistical analyses were conducted using SPSS 26.0 with α = 0.05."

## 结果测量与效果评估

**方法学解释：**
结果评估采用多种测量工具，包括记忆准确性测试、虚假记忆检测和主观评价量表。评估指标的选择基于认知心理学领域的标准测量方法。

**原文引用：**
"Memory accuracy was assessed through a recognition test administered 24 hours after exposure to the media content. False memory rates were calculated as the proportion of incorrectly recognized items that were not present in the original stimuli."`
  },
  {
    id: 'tutorial_2', 
    title: 'The Impact of Deep Learning on Human-Computer Interaction Design',
    abstract: 'This paper explores the transformative effects of deep learning technologies on HCI design methodologies. We present a comprehensive framework for integrating AI-driven design tools into traditional user interface development processes.',
    authors: ['Davis, K.', 'Wilson, A.', 'Miller, P.'],
    year: 2023,
    journal: 'ACM CHI Conference on Human Factors in Computing Systems',
    citationCount: 89,
    relevance_score: 0.87,
    downloadUrl: 'https://example.com/paper2.pdf'
  },
  {
    id: 'tutorial_3',
    title: 'User Experience Design in the Age of Artificial Intelligence',
    abstract: 'A systematic review of how AI technologies are reshaping user experience design principles and practices. The study analyzes current trends and provides recommendations for designers working with AI-enhanced interfaces.',
    authors: ['Garcia, L.', 'Taylor, S.', 'Anderson, M.'],
    year: 2023,
    journal: 'International Journal of Human-Computer Studies',
    citationCount: 67,
    relevance_score: 0.82,
    downloadUrl: 'https://example.com/paper3.pdf'
  }
]

// 样例论文详情数据已合并到tutorialSamplePapers[0]中，不再需要单独的tutorialSamplePaperDetail

// 引导步骤定义
const tutorialSteps = [
  {
    title: '输入关键词',
    description: '在这里输入你想要搜索的关键词，支持中英文，多个关键词用逗号分隔。',
    ref: keywordInputRef
  },
  {
    title: '智能提取关键词',
    description: '点击这个按钮可以从对话历史中智能提取相关关键词，帮助你快速开始搜索。',
    ref: extractKeywordsBtnRef
  },
  {
    title: '获取相关文献',
    description: '这是核心功能按钮，点击后会根据关键词为你推荐相关的学术文献。',
    ref: getPapersBtnRef
  },
  {
    title: '本地缓存选项',
    description: '勾选此项会优先从本地高质量缓存中搜索论文，提高搜索速度和准确性。',
    ref: localCacheCheckboxRef
  },
  {
    title: 'HCI专业范围',
    description: '勾选此项会专注推荐人机交互（HCI）领域的核心文献，适合深入研究HCI主题。',
    ref: hciOnlyCheckboxRef
  },
  {
    title: '扩大搜索范围',
    description: '勾选此项会包含更多文献源，不仅限于顶级期刊和会议，但可能影响相关性。',
    ref: expandRangeCheckboxRef
  },
  {
    title: '文献列表管理',
    description: '这里显示AI推荐的文献列表。点击文献卡片可以查看详情，使用删除按钮可以移除不需要的文献。',
    ref: null,
    customHighlight: 'papers-list'
  },
  {
    title: '文献详情查看',
    description: '右侧显示选中文献的详细信息，包括摘要、研究方法、作者信息等。可以在这里进行翻译、标记参考等操作。',
    ref: null,
    customHighlight: 'paper-detail'
  },
  {
    title: '选为参考功能',
    description: '点击"选为参考"按钮可以将当前文献标记为参考文献，方便在研究方案中引用。已选择的文献会显示"已选为参考"标签。',
    ref: referenceBtnRef
  },
  {
    title: '研究方法预览',
    description: '这里显示文献的研究方法信息，包括实验设计、参与者特征、数据收集和统计分析等。点击"展开"可以查看完整的研究方法内容。',
    ref: null,
    customHighlight: 'research-method-section'
  }
]

// 计算高亮区域样式
const highlightStyle = computed(() => {
  if (currentTutorialStep.value >= tutorialSteps.length) return {}
  
  const currentStep = tutorialSteps[currentTutorialStep.value]
  
  // 如果是自定义高亮区域
  if (currentStep.customHighlight) {
    const element = document.getElementById(currentStep.customHighlight)
    if (element) {
      const rect = element.getBoundingClientRect()
      return {
        top: `${rect.top - 8}px`,
        left: `${rect.left - 8}px`,
        width: `${rect.width + 16}px`,
        height: `${rect.height + 16}px`
      }
    }
  }
  
  // 普通元素高亮
  const element = currentStep.ref?.value
  if (!element) return {}
  
  const rect = element.getBoundingClientRect()
  return {
    top: `${rect.top - 8}px`,
    left: `${rect.left - 8}px`,
    width: `${rect.width + 16}px`,
    height: `${rect.height + 16}px`
  }
})

// 计算提示框位置
const tooltipStyle = computed(() => {
  if (currentTutorialStep.value >= tutorialSteps.length) return {}
  
  const currentStep = tutorialSteps[currentTutorialStep.value]
  
  // 如果是自定义高亮区域
  if (currentStep.customHighlight) {
    const element = document.getElementById(currentStep.customHighlight)
    if (element) {
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
    }
  }
  
  // 普通元素提示框位置
  const element = currentStep.ref?.value
  if (!element) return {}
  
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
})

// 检查是否需要显示新手指引
const shouldShowTutorial = () => {
  const tutorialShown = localStorage.getItem('paperDetail_tutorial_shown')
  return tutorialShown !== 'true'
}

// 开始新手指引
const startTutorial = () => {
  if (!shouldShowTutorial()) return
  
  showTutorial.value = true
  currentTutorialStep.value = 0
  
  // 在引导时显示样例数据
  if (papersState.recommendedPapers.length === 0) {
    // 添加样例论文到推荐列表
    addRecommendedPapers(tutorialSamplePapers)
    
    // 选择第一篇论文（指定的论文）作为详情显示
    // 注意：使用tutorialSamplePapers[0]而不是tutorialSamplePaperDetail，确保中间列表高亮正确
    selectPaper(tutorialSamplePapers[0])
    
    // 将第一篇论文添加到引用列表，确保标题显示紫色高亮
    toggleReference(tutorialSamplePapers[0])
    
    // 将第二篇论文添加到引用列表（用于演示）
    toggleReference(tutorialSamplePapers[1])
    
    // 确保研究方法预览为展开状态
    showFullText.value = true
  }
  
  // 等待DOM更新后聚焦到第一个元素
  nextTick(() => {
    focusCurrentElement()
  })
}

// 聚焦到当前步骤的元素
const focusCurrentElement = () => {
  if (currentTutorialStep.value >= tutorialSteps.length) return
  
  const currentStep = tutorialSteps[currentTutorialStep.value]
  const element = currentStep.ref?.value
  
  if (element) {
    // 滚动到元素位置
    element.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    })
    
    // 如果是输入框，聚焦
    if (element.tagName === 'INPUT') {
      element.focus()
    }
  }
}

// 下一步
const nextTutorialStep = () => {
  currentTutorialStep.value++
  
  if (currentTutorialStep.value >= tutorialSteps.length) {
    // 引导完成
    completeTutorial()
  } else {
    // 聚焦到下一个元素
    nextTick(() => {
      focusCurrentElement()
    })
  }
}

// 跳过引导
const skipTutorial = () => {
  showTutorial.value = false
  currentTutorialStep.value = 0
  
  // 清除样例数据
  if (papersState.recommendedPapers.length > 0 && 
      papersState.recommendedPapers[0].id?.startsWith('tutorial_')) {
    clearAllPapers()
    clearReferences()
    selectPaper(null)
    // 重置研究方法预览状态
    showFullText.value = false
  }
}

// 下次不提示
const dontShowAgain = () => {
  localStorage.setItem('paperDetail_tutorial_shown', 'true')
  skipTutorial()
}

// 完成引导
const completeTutorial = () => {
  showTutorial.value = false
  currentTutorialStep.value = 0
  
  // 清除样例数据
  if (papersState.recommendedPapers.length > 0 && 
      papersState.recommendedPapers[0].id?.startsWith('tutorial_')) {
    clearAllPapers()
    clearReferences()
    selectPaper(null)
    // 重置研究方法预览状态
    showFullText.value = false
  }
  
  console.log('✅ 新手指引完成')
}

// 重置引导状态（用于测试）
const resetTutorial = () => {
  localStorage.removeItem('paperDetail_tutorial_shown')
  console.log('🔄 新手指引状态已重置')
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

/* 专门为右侧文献详情容器的滚动条样式 */
.paper-detail-container {
  scrollbar-width: thin;
  scrollbar-color: #94a3b8 #e2e8f0;
}

.paper-detail-container::-webkit-scrollbar {
  width: 10px;
}

.paper-detail-container::-webkit-scrollbar-track {
  background: #e2e8f0;
  border-radius: 5px;
  margin: 5px 0;
}

.paper-detail-container::-webkit-scrollbar-thumb {
  background: #94a3b8;
  border-radius: 5px;
  border: 2px solid #e2e8f0;
  background-clip: content-box;
}

.paper-detail-container::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}

.paper-detail-container::-webkit-scrollbar-thumb:active {
  background: #475569;
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
  z-index: 51;
}

/* 引导提示框样式优化 */
.tutorial-tooltip {
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
