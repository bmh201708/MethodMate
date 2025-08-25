<template>
  <div v-if="referencedCount > 0">
    <!-- Action bar -->
    <div class="bg-white rounded-lg shadow-md p-4 mb-6">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-purple-800 flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
          </svg>
          Referenced Papers List ({{ referencedCount }} papers)
        </h3>
        <div class="flex gap-2">
          <button
            @click="exportReferences"
            class="text-sm text-blue-600 hover:text-blue-700 transition-colors flex items-center"
          >
            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
            Export
          </button>
          <button
            @click="clearAllReferences"
            class="text-sm text-gray-500 hover:text-red-500 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>

    <!-- Left-right column layout -->
    <div class="grid grid-cols-12 gap-6">
      <!-- Left side paper card list -->
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
                    title="Remove reference"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
                
                <div class="text-xs text-gray-500 mb-2 flex items-center gap-2">
                  <span class="px-2 py-1 rounded-full"
                        :class="paper.source === 'search' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'">
                    {{ paper.source === 'search' ? 'Literature Search' : 'AI Recommendation' }}
                  </span>
                  <span v-if="paper.referencedAt" class="text-gray-400">
                    {{ formatDate(paper.referencedAt) }}
                  </span>
                </div>
                
                <p v-if="paper.abstract || paper.summary" class="text-sm text-gray-600 mb-3 line-clamp-2">
                  {{ paper.abstract || paper.summary || 'No abstract available' }}
                </p>
                
                <!-- Tag display area -->
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
                
                <div class="flex items-center justify-between">
                  <div class="text-xs text-gray-500">
                    <span v-if="paper.authors" class="mr-2">
                      {{ Array.isArray(paper.authors) ? paper.authors.slice(0, 2).join(', ') + (paper.authors.length > 2 ? ' et al.' : '') : paper.authors }}
                    </span>
                    <span v-if="paper.year">{{ paper.year }}</span>
                  </div>
                  <span class="text-xs text-purple-500">Click to view details</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right side paper details -->
      <div class="col-span-7">
        <div class="paper-detail-scroll bg-white rounded-lg shadow-sm p-6 max-h-[80vh] overflow-y-auto">
          <div v-if="selectedPaper">
            <!-- Title and action buttons -->
            <div class="flex justify-between items-start mb-6">
              <h2 class="text-2xl font-bold text-gray-900 flex-1">{{ showTitleTranslation && translatedTitle ? translatedTitle : selectedPaper.title }}</h2>
              <div class="ml-4 flex items-center space-x-2">
                <span class="px-3 py-1 bg-purple-100 text-purple-600 text-sm rounded-full">
                  Referenced
                </span>
                <button 
                  @click="removeFromReferences(selectedPaper)"
                  class="px-4 py-2 text-sm rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                >
                  Remove Reference
                </button>
              </div>
            </div>
            
            <!-- Basic information -->
            <div class="mb-6">
              <div class="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div v-if="selectedPaper.authors">
                  <span class="font-medium text-gray-700">Authors:</span>
                  {{ Array.isArray(selectedPaper.authors) ? selectedPaper.authors.join(', ') : selectedPaper.authors }}
                </div>
                <div v-if="selectedPaper.year">
                  <span class="font-medium text-gray-700">Publication Year:</span>
                  {{ selectedPaper.year }}
                </div>
                <div v-if="selectedPaper.journal">
                  <span class="font-medium text-gray-700">Journal:</span>
                  {{ selectedPaper.journal }}
                </div>
                <div v-if="selectedPaper.citations || selectedPaper.citationCount">
                  <span class="font-medium text-gray-700">Citations:</span>
                  {{ selectedPaper.citations || selectedPaper.citationCount }}
                </div>
                <div v-if="selectedPaper.source">
                  <span class="font-medium text-gray-700">Source:</span>
                  <span class="px-2 py-1 rounded text-xs"
                        :class="selectedPaper.source === 'search' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'">
                    {{ selectedPaper.source === 'search' ? 'Literature Search' : 'AI Recommendation' }}
                  </span>
                </div>
                <div v-if="selectedPaper.referencedAt">
                  <span class="font-medium text-gray-700">Referenced Time:</span>
                  {{ formatDate(selectedPaper.referencedAt) }}
                </div>
              </div>
              
              <!-- Tag management area -->
              <div class="mt-4 pt-3 border-t border-gray-100">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="text-sm font-medium text-gray-700">Custom Tags</h4>
                  <button 
                    @click="showTagDialog = true"
                    class="text-sm px-2 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors flex items-center space-x-1"
                    title="Add tag"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                    </svg>
                    <span>Add Tag</span>
                  </button>
                </div>
                
                <!-- Tag display area -->
                <div class="flex flex-wrap gap-2 min-h-[2rem] mb-3">
                  <div v-if="getPaperTags(selectedPaper).length === 0" 
                       class="text-sm text-gray-400 italic flex items-center">
                    No tags yet, click the button on the right to add
                  </div>
                  <div
                    v-for="tag in getPaperTags(selectedPaper)"
                    :key="tag.id"
                    class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-md cursor-default group"
                    :style="{ backgroundColor: tag.color + '20', color: tag.color, borderColor: tag.color }"
                    style="border-width: 1px;"
                  >
                    <span>{{ tag.name }}</span>
                    <button
                      @click="removeTagFromPaper(selectedPaper, tag.id)"
                      class="ml-1 p-0.5 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors opacity-0 group-hover:opacity-100"
                      title="Remove tag"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              <!-- "Save to Local" button moved to bottom of basic info -->
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
                  :title="paperCacheStatus === 'saved' ? 'Saved to local' : paperCacheStatus === 'updated' ? 'Local cache updated' : 'Save to local cache'"
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

            <!-- Abstract -->
                          <div v-if="selectedPaper.abstract || selectedPaper.summary" class="mb-6">
                            <div class="flex items-center justify-between mb-3">
                              <h3 class="text-lg font-semibold text-gray-900">Abstract</h3>
                              <button 
                                @click="toggleTranslation"
                                :disabled="isTranslating"
                                class="text-sm px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                                title="Translate title and abstract"
                              >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
                                </svg>
                                <span>{{ isTranslating ? 'Translating...' : (showTranslation ? 'Show Original' : 'Show Translation') }}</span>
                              </button>
                            </div>
                            <p class="text-gray-600 leading-relaxed">
                              {{ showTranslation && translatedAbstract ? translatedAbstract : (selectedPaper.abstract || selectedPaper.summary) }}
                            </p>
                          </div>

                          <!-- Research Method Section -->
                          <div class="mt-6 mb-6">
                            <div class="flex items-center justify-between">
                              <h3 class="text-lg font-semibold text-gray-900">Research Method Preview</h3>
                              <div class="flex items-center space-x-2">
                                <span v-if="isLoadingPaperContent" 
                                      class="text-sm text-gray-500 mr-3 flex items-center">
                                  <svg class="animate-spin h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Analyzing...
                                </span>
                                <button 
                                  v-if="selectedPaper.researchMethod"
                                  @click="retryExtractMethod"
                                  class="text-orange-500 hover:text-orange-600 text-sm flex items-center"
                                  :disabled="isLoadingPaperContent"
                                  title="Re-analyze research method"
                                >
                                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                  </svg>
                                  Re-analyze
                                </button>
                                <button 
                                  v-if="selectedPaper.researchMethod"
                                  @click="toggleFullText"
                                  class="text-blue-600 hover:text-blue-700 text-sm flex items-center"
                                >
                                  {{ showFullText ? 'Collapse' : 'Expand' }}
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
                              <p class="text-sm mb-2">No research method information available</p>
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
                                  {{ isLoadingPaperContent ? 'Loading...' : 'Try to get research method' }}
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
                                  title="Switch language"
                                >
                                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
                                  </svg>
                                  <span>{{ isTranslatingMethod ? 'Translating...' : (showMethodTranslation ? 'Show Original' : 'Show Translation') }}</span>
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

            <!-- Download Sources -->
            <div v-if="selectedPaper.downloadSources && selectedPaper.downloadSources.length > 0" class="mb-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Download Sources</h3>
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
                    <span v-if="source.free" class="ml-1 text-green-600 text-xs">(Free)</span>
                  </div>
                  <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
                  </svg>
                </a>
              </div>
            </div>

            <!-- Links -->
            <div class="mb-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Paper Links</h3>
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
                  View Original
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
                  Download Original
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
                  {{ loadingDownload ? 'Loading...' : 'Get More Download Sources' }}
                </button>
              </div>
            </div>

            <!-- Citation Information -->
            <div class="bg-purple-50 p-4 rounded-lg">
              <h3 class="text-lg font-semibold text-purple-900 mb-2 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
                </svg>
                Citation Information
              </h3>
              <p class="text-purple-700 text-sm">
                This paper has been added to your reference list. You can cite this paper's viewpoints and methods in your research proposal.
              </p>
            </div>
          </div>
          
          <!-- Empty state when no paper is selected -->
          <div v-else class="text-center text-gray-500 mt-20">
            <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            <p class="text-lg">Please click on a paper card on the left to view details</p>
            <p class="text-sm mt-2">Select a reference paper to view its detailed information</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Empty state when no referenced papers -->
  <div v-else class="no-references text-center py-12 px-4 bg-gray-50 rounded-lg">
    <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
    </svg>
    <h3 class="text-xl font-medium text-gray-900 mb-2">No Reference Papers</h3>
    <p class="text-gray-500">Click the "Reference This" button on the literature search or recommendation page to add papers to this list</p>
    <div class="mt-6 flex gap-3 justify-center">
      <router-link 
        to="/scholar-search" 
        class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
        </svg>
        Go to Literature Search
      </router-link>
      <router-link 
        to="/papers" 
        class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        Go to Literature Recommendations
      </router-link>
    </div>
  </div>

  <!-- Tag Management Dialog -->
  <div v-if="showTagDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="showTagDialog = false">
    <div class="bg-white rounded-2xl p-6 w-full max-w-md mx-4" @click.stop>
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-gray-900">Manage Tags</h3>
        <button @click="showTagDialog = false" class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- New Tag Creation Area -->
      <div class="mb-6">
        <h4 class="text-sm font-medium text-gray-700 mb-3">Create New Tag</h4>
        <div class="space-y-3">
          <input
            v-model="newTagName"
            type="text"
            placeholder="Enter tag name"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            @keyup.enter="createNewTag"
            maxlength="20"
          />
          <div class="flex items-center justify-between">
            <div class="flex space-x-2">
              <span class="text-sm text-gray-600">Color:</span>
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
              Create
            </button>
          </div>
          <!-- Preview -->
          <div v-if="newTagName.trim()" class="mt-2">
            <span class="text-xs text-gray-500">Preview:</span>
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

      <!-- Existing Tags List -->
      <div class="mb-6">
        <h4 class="text-sm font-medium text-gray-700 mb-3">Select Existing Tags</h4>
        <div class="max-h-40 overflow-y-auto">
          <div v-if="allTags.length === 0" class="text-sm text-gray-400 italic text-center py-4">
            No tags available, please create one first
          </div>
          <div v-else class="space-y-2">
            <label
              v-for="tag in allTags"
              :key="tag.id"
              class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer group"
            >
              <input
                type="checkbox"
                :checked="isPaperTagged(selectedPaper, tag.id)"
                @change="togglePaperTag(selectedPaper, tag)"
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
                title="Delete tag"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </label>
          </div>
        </div>
      </div>

      <!-- Bottom Buttons -->
      <div class="flex justify-end space-x-3">
        <button
          @click="showTagDialog = false"
          class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          Cancel
        </button>
        <button
          @click="showTagDialog = false"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { papersState, clearReferences, removePaperFromReferences } from '../stores/chatStore'
import { marked } from 'marked'
import markedKatex from 'marked-katex-extension'
import 'katex/dist/katex.min.css'
import { chatState } from '../stores/chatStore'
import { sendSilentMessageToCoze } from '../services/cozeApi'

// Configure marked to support LaTeX math formulas
marked.use(markedKatex({
  throwOnError: false,
  displayMode: false,
  output: 'html'
}))

// Configure marked security options
marked.setOptions({
  sanitize: true,
  breaks: true,
  gfm: true
})

// Reactive data
const selectedPaper = ref(null)
const loadingDownload = ref(false)

// Translation related states
const showTranslation = ref(false)
const translatedAbstract = ref('')
const isTranslating = ref(false)

// Title translation related states
const showTitleTranslation = ref(false)
const translatedTitle = ref('')

// Research method related states
const showMethodTranslation = ref(false)
const translatedMethod = ref('')
const isTranslatingMethod = ref(false)
const showFullText = ref(false)
const isLoadingPaperContent = ref(false)

// Paper cache related states
const isSavingToCache = ref(false)
const paperCacheStatus = ref('') // 'saved', 'updated', ''

// Tag management related states
const showTagDialog = ref(false)
const newTagName = ref('')
const newTagColor = ref('#3B82F6')
const allTags = ref([])
const paperTags = ref(new Map()) // Store paper-tag associations

// Predefined tag colors
const tagColors = [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#F59E0B', // Yellow
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#F97316', // Orange
  '#06B6D4', // Cyan
  '#84CC16', // Lime
  '#EC4899', // Pink
  '#6B7280'  // Gray
]

// Render markdown content
const renderMarkdown = (markdown) => {
  if (!markdown) return ''
  try {
    return marked.parse(markdown)
  } catch (error) {
    console.error('Markdown parsing error:', error)
    return markdown // Return original content as fallback
  }
}

// Toggle full text display state
const toggleFullText = () => {
  showFullText.value = !showFullText.value
}

// Get paper content and research method
const fetchPaperContent = async () => {
  if (!selectedPaper.value || !selectedPaper.value.title) {
    return
  }
  
  isLoadingPaperContent.value = true
  
  try {
    console.log('Manually get paper content:', selectedPaper.value.title)
    
    const { getApiBaseUrl } = await import('../config/environment.js')
    const getContentApiUrl = `${getApiBaseUrl()}/paper/get-full-content`
    console.log('📤 Get paper content API request URL:', getContentApiUrl)
    
    // 获取当前AI服务类型
    const { getCurrentAIService } = await import('../stores/aiServiceStore.js')
    const currentAIService = getCurrentAIService()
    
    const response = await fetch(getContentApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: selectedPaper.value.title,
        doi: selectedPaper.value.doi || null,
        aiService: currentAIService === 'chatgpt' ? 'chatgpt' : 'coze'
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
      alert('Failed to get paper content: ' + (result.error || 'Unknown error'))
    }
  } catch (error) {
    console.error('获取论文内容出错:', error)
    alert('Error getting paper content: ' + error.message)
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
    console.log('Re-analyzing research method:', selectedPaper.value.title)
    
    // 第一步：清空数据库中的研究方法，强制重新分析
    console.log('🗑️ Clearing research method from database...')
    
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
      console.warn('Failed to clear research method from database, but continuing with re-analysis')
    } else {
      console.log('✅ Successfully cleared research method from database')
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
    console.log('🔄 Re-fetching paper content and research method...')
    
    const getContentApiUrl = `${getApiBaseUrl()}/paper/get-full-content`
    console.log('📤 Re-analysis - Get paper content API request URL:', getContentApiUrl)
    
    // 获取当前AI服务类型
    const { getCurrentAIService } = await import('../stores/aiServiceStore.js')
    const currentAIService = getCurrentAIService()
    
    const response = await fetch(getContentApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: selectedPaper.value.title,
        doi: selectedPaper.value.doi || null,
        aiService: currentAIService === 'chatgpt' ? 'chatgpt' : 'coze'
      })
    })
    
    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Too many requests, please try again later.');
      }
      const errorResult = await response.json().catch(() => ({}));
      throw new Error(errorResult.error || `API response error: ${response.status}`);
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
        console.log('✅ Re-analysis successful, obtained new research method')
      } else {
        console.log('⚠️ Re-analysis completed, but no research method obtained')
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
      throw new Error(result.error || 'Failed to re-fetch paper content');
    }
    
  } catch (error) {
    console.error('重新分析研究方法出错:', error)
    alert('Error re-analyzing research method: ' + error.message)
  } finally {
    isLoadingPaperContent.value = false
  }
}

// 翻译文本的通用函数
const translateText = async (text, type = 'text') => {
  if (!text || !text.trim()) {
    throw new Error(`${type} content is empty`)
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
      throw new Error(errorResult.error || `Translation failed, status code: ${response.status}`);
    }
    
    const result = await response.json()
    console.log('📥 翻译API响应:', result)
    
    if (!result.success || !result.translated) {
      throw new Error('Translation API returned invalid result')
    }
    
    const translatedText = result.translated.trim()
    
    if (translatedText && translatedText.length > 0) {
      console.log(`✅ ${type}翻译成功`)
      return translatedText
    } else {
      throw new Error('Translation result is empty')
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
  if (!selectedPaper.value) {
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
    if (selectedPaper.value.title) {
      promises.push(
        translateTitle(selectedPaper.value.title)
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
    if (selectedPaper.value.abstract || selectedPaper.value.summary) {
      promises.push(
        translateAbstract(selectedPaper.value.abstract || selectedPaper.value.summary)
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
    alert('Translation failed: ' + error.message)
  }
}

// 翻译研究方法
const translateMethod = async (methodText) => {
  return await translateText(methodText, '研究方法')
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
      alert('Research method translation failed: ' + error.message)
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
  // 重置标题翻译状态
  showTitleTranslation.value = false
  translatedTitle.value = ''
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
    showTitleTranslation.value = false
    translatedTitle.value = ''
    showMethodTranslation.value = false
    translatedMethod.value = ''
    showFullText.value = false
  }
}

// 清空所有引用
const clearAllReferences = () => {
  if (confirm('Are you sure you want to clear all reference papers?')) {
    clearReferences()
    selectedPaper.value = null
  }
}

// 格式化日期
const formatDate = (timestamp) => {
  if (!timestamp) return ''
  try {
    return new Date(timestamp).toLocaleDateString('en-US', {
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
  if (!paper.title) return;

  loadingDownload.value = true;
  try {
    const { getApiBaseUrl } = await import('../config/environment.js');
    const apiUrl = `${getApiBaseUrl()}/paper/download-sources`;
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: paper.title,
        doi: paper.doi
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const sources = await response.json();

    // 更新选中文献的下载源
    if (selectedPaper.value && selectedPaper.value.title === paper.title) {
      selectedPaper.value.downloadSources = sources;
    }

    // 也更新原始数据
    const paperInList = referencedPapersList.value.find(p => p.title === paper.title);
    if (paperInList) {
      paperInList.downloadSources = sources;
    }

  } catch (error) {
    console.error('Failed to get download sources:', error);
    alert('Failed to get download sources, please try again later');
  } finally {
    loadingDownload.value = false;
  }
};

// 导出引用文献
const exportReferences = () => {
  if (referencedCount.value === 0) {
    alert('No reference papers to export')
    return
  }

  const exportData = referencedPapersList.value.map((paper, index) => ({
    Index: index + 1,
    Title: paper.title,
    Authors: Array.isArray(paper.authors) ? paper.authors.join(', ') : paper.authors || '',
    Journal: paper.journal || '',
    Year: paper.year || '',
    Citations: paper.citations || paper.citationCount || '',
    Abstract: paper.abstract || paper.summary || '',
    'Research Method': paper.researchMethod || '',
    Link: paper.scholar_url || paper.downloadUrl || '',
    Source: paper.source === 'search' ? 'Literature Search' : 'AI Recommendation',
    'Referenced Time': paper.referencedAt ? new Date(paper.referencedAt).toLocaleString('en-US') : ''
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
  link.download = `reference_papers_${new Date().toISOString().slice(0, 10)}.csv`
  link.click()
}

// 保存论文到本地缓存
const savePaperToCache = async (paper) => {
  if (!paper || !paper.title) {
    alert('Invalid paper information')
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
      throw new Error(errorResult.error || `Save failed, status code: ${response.status}`)
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
      throw new Error(result.error || 'Save failed')
    }

  } catch (error) {
    console.error('Failed to save reference paper to cache:', error)
    alert('Save failed: ' + error.message)
    paperCacheStatus.value = ''
  } finally {
    isSavingToCache.value = false
  }
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
  if (!confirm('Are you sure you want to delete this tag? All papers with this tag will also have it removed.')) return
  
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

// 组件挂载时加载标签数据
onMounted(() => {
  loadTagsData()
})
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
  line-clamp: 2;
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