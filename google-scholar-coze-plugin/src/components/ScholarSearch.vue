<template>
  <div class="scholar-search-container max-w-6xl mx-auto p-6">
    <!-- 搜索表单 -->
    <div class="search-form bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Google Scholar 文献搜索</h2>
      
      <form @submit.prevent="searchPapers" class="space-y-4">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="输入搜索关键词，如：深度学习、机器学习、自然语言处理..."
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
          </div>
          
          <div class="flex gap-2">
            <select
              v-model="numResults"
              class="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="5">5篇</option>
              <option value="10">10篇</option>
              <option value="20">20篇</option>
              <option value="50">50篇</option>
            </select>
            
            <select
              v-model="language"
              class="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="zh-CN">中文</option>
              <option value="en">English</option>
              <option value="ja">日本語</option>
              <option value="ko">한국어</option>
            </select>
            
            <button
              type="submit"
              :disabled="loading"
              class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span v-if="loading" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                搜索中...
              </span>
              <span v-else>搜索</span>
            </button>
          </div>
        </div>
      </form>
    </div>

    <!-- 搜索结果 -->
    <div v-if="searchResults.length > 0" class="search-results">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-xl font-semibold text-gray-800">
          搜索结果 (共 {{ searchResults.length }} 篇)
        </h3>
        <div class="text-sm text-gray-600">
          搜索关键词: "{{ lastSearchQuery }}"
        </div>
      </div>

      <div class="grid gap-6">
        <div
          v-for="(paper, index) in searchResults"
          :key="index"
          class="paper-card bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow"
        >
          <!-- 论文标题和基本信息 -->
          <div class="paper-header mb-4">
            <h4 class="text-lg font-semibold text-gray-900 mb-2 leading-tight">
              {{ paper.title }}
            </h4>
            
            <div class="paper-meta flex flex-wrap gap-4 text-sm text-gray-600">
              <span v-if="paper.authors && paper.authors.length" class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                作者: {{ paper.authors.join(', ') }}
              </span>
              
              <span v-if="paper.journal" class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fill-rule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"/>
                </svg>
                期刊: {{ paper.journal }}
              </span>
              
              <span v-if="paper.year" class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                </svg>
                年份: {{ paper.year }}
              </span>
              
              <span v-if="paper.citations" class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                引用: {{ paper.citations }}
              </span>
            </div>
          </div>

          <!-- 论文摘要 -->
          <div v-if="paper.summary" class="paper-summary mb-4">
            <p class="text-gray-700 text-sm leading-relaxed">{{ paper.summary }}</p>
          </div>

          <!-- 操作按钮 -->
          <div class="paper-actions flex flex-wrap gap-2">
            <a
              v-if="paper.scholar_url"
              :href="paper.scholar_url"
              target="_blank"
              class="inline-flex items-center px-3 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-sm"
            >
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
              </svg>
              查看原文
            </a>

            <button
              @click="findDownloadSources(paper)"
              :disabled="loadingDownload === index"
              class="inline-flex items-center px-3 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors text-sm disabled:opacity-50"
            >
              <svg v-if="loadingDownload === index" class="animate-spin w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
              获取全文
            </button>

            <span
              v-if="paper.relevance_score"
              class="inline-flex items-center px-3 py-2 bg-yellow-100 text-yellow-700 rounded-md text-sm"
            >
              相关性: {{ Math.round(paper.relevance_score * 100) }}%
            </span>
          </div>

          <!-- 下载链接 -->
          <div v-if="paper.downloadSources && paper.downloadSources.length > 0" class="download-sources mt-4 pt-4 border-t border-gray-200">
            <h5 class="text-sm font-medium text-gray-800 mb-2">可用下载源:</h5>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              <a
                v-for="(source, sourceIndex) in paper.downloadSources"
                :key="sourceIndex"
                :href="source.url"
                target="_blank"
                class="flex items-center justify-between p-2 rounded border hover:bg-gray-50 transition-colors text-sm"
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
            <p class="text-xs text-gray-500 mt-2">{{ paper.downloadMessage }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-else-if="!loading && searchQuery" class="empty-state text-center py-12">
      <div class="text-gray-400 mb-4">
        <svg class="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">暂无搜索结果</h3>
      <p class="text-gray-500">请尝试使用不同的关键词进行搜索</p>
    </div>

    <!-- 错误信息 -->
    <div v-if="error" class="error-message bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <div class="flex items-center">
        <svg class="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
        </svg>
        <span class="text-red-800">{{ error }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScholarSearch',
  data() {
    return {
      searchQuery: '',
      lastSearchQuery: '',
      numResults: 10,
      language: 'zh-CN',
      loading: false,
      loadingDownload: null,
      searchResults: [],
      error: null
    }
  },
  methods: {
    async searchPapers() {
      this.loading = true
      this.error = null
      this.lastSearchQuery = this.searchQuery

      try {
        const response = await fetch('/api/scholar-search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: this.searchQuery,
            num_results: this.numResults,
            lang: this.language
          })
        })

        const data = await response.json()

        if (data.success) {
          this.searchResults = data.results.map(result => ({
            ...result,
            downloadSources: null,
            downloadMessage: ''
          }))
        } else {
          this.error = data.error || '搜索失败，请重试'
          this.searchResults = []
        }
      } catch (err) {
        console.error('Search error:', err)
        this.error = '网络错误，请检查网络连接'
        this.searchResults = []
      } finally {
        this.loading = false
      }
    },

    async findDownloadSources(paper, index) {
      this.loadingDownload = index
      paper.downloadSources = null
      paper.downloadMessage = ''

      try {
        const response = await fetch('/api/paper-download', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paper_url: paper.scholar_url,
            doi: paper.doi,
            title: paper.title
          })
        })

        const data = await response.json()

        if (data.success) {
          paper.downloadSources = data.download_sources
          paper.downloadMessage = data.message
        } else {
          paper.downloadMessage = data.error || '获取下载链接失败'
        }
      } catch (err) {
        console.error('Download sources error:', err)
        paper.downloadMessage = '网络错误，请重试'
      } finally {
        this.loadingDownload = null
      }
    }
  }
}
</script>

<style scoped>
.scholar-search-container {
  min-height: 100vh;
  background-color: #f8fafc;
}

.paper-card {
  transition: all 0.2s ease-in-out;
}

.paper-card:hover {
  transform: translateY(-1px);
}

.download-sources a:hover {
  transform: translateX(2px);
}

/* 搜索框聚焦效果 */
.search-form input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* 加载动画 */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.loading-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style> 