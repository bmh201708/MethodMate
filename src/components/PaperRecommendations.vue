<template>
  <div class="paper-recommendations p-6 bg-white rounded-lg shadow-sm">
    <!-- 标题区域 -->
    <div class="flex items-center mb-6">
      <div class="flex items-center">
        <svg class="w-8 h-8 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
        </svg>
        <h2 class="text-2xl font-bold text-gray-900">智能文献推荐</h2>
      </div>
      <div class="ml-auto">
        <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
          AI 驱动
        </span>
      </div>
    </div>

    <!-- 种子论文选择区域 -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">选择种子论文</h3>
      <div class="grid md:grid-cols-2 gap-6">
        <!-- 正面种子论文 -->
        <div class="space-y-4">
          <label class="block text-sm font-medium text-gray-700">
            正面种子论文 (感兴趣的论文)
          </label>
          <div class="space-y-2">
            <div v-for="(paperId, index) in positivePaperIds" :key="`pos-${index}`" 
                 class="flex items-center space-x-2">
              <input
                v-model="positivePaperIds[index]"
                type="text"
                placeholder="输入论文ID或URL"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button @click="removePositivePaper(index)" 
                      class="text-red-500 hover:text-red-700">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <button @click="addPositivePaper" 
                    class="text-blue-500 hover:text-blue-700 text-sm flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              添加论文
            </button>
          </div>
        </div>

        <!-- 负面种子论文 -->
        <div class="space-y-4">
          <label class="block text-sm font-medium text-gray-700">
            负面种子论文 (不感兴趣的论文，可选)
          </label>
          <div class="space-y-2">
            <div v-for="(paperId, index) in negativePaperIds" :key="`neg-${index}`" 
                 class="flex items-center space-x-2">
              <input
                v-model="negativePaperIds[index]"
                type="text"
                placeholder="输入论文ID或URL"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button @click="removeNegativePaper(index)" 
                      class="text-red-500 hover:text-red-700">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <button @click="addNegativePaper" 
                    class="text-blue-500 hover:text-blue-700 text-sm flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              添加论文
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 推荐设置 -->
    <div class="mb-6 p-4 bg-gray-50 rounded-lg">
      <h4 class="text-md font-semibold text-gray-800 mb-3">推荐设置</h4>
      <div class="grid md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">推荐数量</label>
          <select v-model="recommendationLimit" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option :value="5">5篇</option>
            <option :value="10">10篇</option>
            <option :value="20">20篇</option>
            <option :value="50">50篇</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">排序方式</label>
          <select v-model="sortBy" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="relevance">相关性</option>
            <option value="citation">引用数</option>
            <option value="year">发表年份</option>
          </select>
        </div>
        <div class="flex items-end">
          <button
            @click="getRecommendations"
            :disabled="!canRecommend || isLoading"
            class="w-full px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isLoading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              获取推荐中...
            </span>
            <span v-else>获取推荐</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 错误提示 -->
    <div v-if="error" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
      <div class="flex">
        <svg class="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <p class="text-red-700">{{ error }}</p>
      </div>
    </div>

    <!-- 推荐结果 -->
    <div v-if="recommendations.length > 0" class="space-y-6">
      <div class="flex items-center justify-between">
        <h3 class="text-xl font-semibold text-gray-900">
          推荐结果 ({{ recommendations.length }} 篇)
        </h3>
        <div class="text-sm text-gray-500">
          算法: {{ metadata?.algorithm || 'Semantic Scholar ML' }}
        </div>
      </div>

      <!-- 推荐论文列表 -->
      <div class="space-y-4">
        <div v-for="(paper, index) in sortedRecommendations" :key="paper.paperId" 
             class="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          
          <!-- 论文头部信息 -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <div class="flex items-center mb-2">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  #{{ index + 1 }}
                </span>
                <span v-if="paper.category" 
                      class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {{ paper.category }}
                </span>
                <span class="ml-2 text-sm text-gray-500">
                  相关性: {{ (paper.relevanceScore * 100).toFixed(1) }}%
                </span>
              </div>
              
              <h4 class="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer"
                  @click="openPaper(paper)">
                {{ paper.title }}
              </h4>
              
              <div class="flex items-center text-sm text-gray-600 mb-2">
                <span v-if="paper.authors && paper.authors.length > 0">
                  {{ formatAuthors(paper.authors) }}
                </span>
                <span v-if="paper.year" class="ml-4">{{ paper.year }}</span>
                <span v-if="paper.journal" class="ml-4">{{ paper.journal }}</span>
              </div>
            </div>
            
            <div class="flex items-center space-x-4 ml-4">
              <div class="text-right">
                <div class="text-sm font-medium text-gray-900">
                  {{ paper.citationCount || 0 }} 引用
                </div>
                <div class="text-xs text-gray-500">
                  {{ paper.recommendationReason }}
                </div>
              </div>
            </div>
          </div>

          <!-- 论文摘要 -->
          <div v-if="paper.abstract" class="mb-4">
            <p class="text-gray-700 text-sm leading-relaxed">
              {{ truncateText(paper.abstract, 200) }}
            </p>
          </div>

          <!-- 下载链接 -->
          <div v-if="paper.downloadSources && paper.downloadSources.length > 0" 
               class="flex flex-wrap gap-2">
            <a v-for="source in paper.downloadSources" :key="source.source"
               :href="source.url" 
               target="_blank"
               rel="noopener noreferrer"
               class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
               :class="source.free ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'">
              <svg v-if="source.type === 'pdf'" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <svg v-else class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              {{ source.source }}
              <span v-if="source.free" class="ml-1 text-green-600">免费</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-else-if="!isLoading && hasSearched" 
         class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">暂无推荐结果</h3>
      <p class="mt-1 text-sm text-gray-500">请检查种子论文ID是否正确</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaperRecommendations',
  data() {
    return {
      positivePaperIds: [''],
      negativePaperIds: [],
      recommendationLimit: 10,
      sortBy: 'relevance',
      recommendations: [],
      isLoading: false,
      error: null,
      hasSearched: false,
      metadata: null
    }
  },
  computed: {
    canRecommend() {
      return this.positivePaperIds.some(id => id.trim().length > 0);
    },
    sortedRecommendations() {
      const sorted = [...this.recommendations];
      
      switch (this.sortBy) {
        case 'citation':
          return sorted.sort((a, b) => (b.citationCount || 0) - (a.citationCount || 0));
        case 'year':
          return sorted.sort((a, b) => (b.year || 0) - (a.year || 0));
        case 'relevance':
        default:
          return sorted.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
      }
    }
  },
  methods: {
    addPositivePaper() {
      this.positivePaperIds.push('');
    },
    removePositivePaper(index) {
      this.positivePaperIds.splice(index, 1);
      if (this.positivePaperIds.length === 0) {
        this.positivePaperIds.push('');
      }
    },
    addNegativePaper() {
      this.negativePaperIds.push('');
    },
    removeNegativePaper(index) {
      this.negativePaperIds.splice(index, 1);
    },
    
    async getRecommendations() {
      if (!this.canRecommend) return;
      
      this.isLoading = true;
      this.error = null;
      this.hasSearched = true;
      
      try {
        // 清理并提取有效的论文ID
        const validPositiveIds = this.positivePaperIds
          .map(id => this.extractPaperId(id))
          .filter(id => id);
          
        const validNegativeIds = this.negativePaperIds
          .map(id => this.extractPaperId(id))
          .filter(id => id);
        
        if (validPositiveIds.length === 0) {
          throw new Error('请至少提供一个有效的正面种子论文ID');
        }
        
        const requestBody = {
          positivePaperIds: validPositiveIds,
          negativePaperIds: validNegativeIds,
          limit: this.recommendationLimit,
          fields: 'title,authors,year,citationCount,abstract,openAccessPdf,url'
        };
        
        console.log('发送推荐请求:', requestBody);
        
        // 使用相对路径，代理会自动转发到Vercel
        const response = await fetch('/api/paper-recommendations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        });
        
        console.log('API响应状态:', response.status, response.statusText);
        
        // 检查响应状态
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API错误响应:', errorText);
          throw new Error(`服务器错误 (${response.status}): ${errorText.substring(0, 200)}...`);
        }
        
        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.error || '推荐请求失败');
        }
        
        this.recommendations = data.recommendations || [];
        this.metadata = data.metadata;
        
        console.log('推荐结果:', data);
        
      } catch (error) {
        console.error('推荐错误:', error);
        this.error = error.message;
        this.recommendations = [];
      } finally {
        this.isLoading = false;
      }
    },
    
    extractPaperId(input) {
      if (!input || typeof input !== 'string') return '';
      
      input = input.trim();
      if (!input) return '';
      
      // 如果是完整的 Semantic Scholar URL，提取 paper ID
      const urlMatch = input.match(/semanticscholar\.org\/paper\/([a-f0-9]+)/i);
      if (urlMatch) {
        return urlMatch[1];
      }
      
      // 如果是 40 字符的十六进制字符串，直接返回
      if (/^[a-f0-9]{40}$/i.test(input)) {
        return input;
      }
      
      // 否则返回原始输入（可能是其他格式的ID）
      return input;
    },
    
    formatAuthors(authors) {
      if (!authors || authors.length === 0) return '未知作者';
      
      const names = authors.map(author => author.name || author).slice(0, 3);
      const result = names.join(', ');
      
      if (authors.length > 3) {
        return result + ` 等 ${authors.length} 人`;
      }
      
      return result;
    },
    
    truncateText(text, maxLength) {
      if (!text) return '';
      if (text.length <= maxLength) return text;
      return text.substring(0, maxLength) + '...';
    },
    
    openPaper(paper) {
      if (paper.url) {
        window.open(paper.url, '_blank');
      }
    }
  },
  
  mounted() {
    // 可以从URL参数或其他来源预填充种子论文
    const urlParams = new URLSearchParams(window.location.search);
    const seedPaper = urlParams.get('seed');
    if (seedPaper) {
      this.positivePaperIds[0] = seedPaper;
    }
  }
}
</script>

<style scoped>
.paper-recommendations {
  max-width: 1200px;
  margin: 0 auto;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .paper-recommendations {
    padding: 1rem;
  }
}
</style> 