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
        <div class="bg-white rounded-lg shadow-sm p-6 min-h-[80vh]">
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
            </div>

            <!-- 摘要 -->
            <div v-if="selectedPaper.abstract || selectedPaper.summary" class="mb-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">摘要</h3>
              <p class="text-gray-600 leading-relaxed">
                {{ selectedPaper.abstract || selectedPaper.summary }}
              </p>
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

// 响应式数据
const selectedPaper = ref(null)
const loadingDownload = ref(false)

// 计算属性
const referencedCount = computed(() => papersState.referencedPapers.size)
const referencedPapersList = computed(() => papersState.referencedPapersList)

// 选择文献
const selectPaper = (paper) => {
  selectedPaper.value = paper
}

// 移除单个文献的引用
const removeFromReferences = (paper) => {
  removePaperFromReferences(paper)
  // 如果移除的是当前选中的文献，清空选择
  if (selectedPaper.value === paper) {
    selectedPaper.value = null
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
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
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