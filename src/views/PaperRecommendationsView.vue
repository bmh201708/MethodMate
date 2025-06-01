<template>
  <div class="recommendations-view min-h-screen bg-gray-50">
    <!-- 页面头部 -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <router-link to="/" class="flex items-center text-gray-600 hover:text-gray-900">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              返回首页
            </router-link>
          </div>
          <div class="text-sm text-gray-500">
            MethodMate - 智能文献推荐
          </div>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 页面介绍 -->
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">智能文献推荐系统</h1>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          基于 Semantic Scholar 的机器学习算法，根据您感兴趣的种子论文，智能推荐相关的高质量学术文献。
          支持正面和负面种子论文筛选，帮助您快速发现最相关的研究成果。
        </p>
      </div>

      <!-- 功能特点 -->
      <div class="mb-12 grid md:grid-cols-3 gap-8">
        <div class="text-center">
          <div class="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">AI 驱动算法</h3>
          <p class="text-gray-600">
            使用 Semantic Scholar 的先进机器学习算法，基于论文内容和引用关系进行智能推荐
          </p>
        </div>
        
        <div class="text-center">
          <div class="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2m-6 0h8m-8 0a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">精准筛选</h3>
          <p class="text-gray-600">
            支持正面和负面种子论文，帮助您精确定义研究兴趣，排除不相关内容
          </p>
        </div>
        
        <div class="text-center">
          <div class="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">多源下载</h3>
          <p class="text-gray-600">
            自动识别开放获取 PDF、DOI 链接等多种下载源，提供便捷的全文获取方式
          </p>
        </div>
      </div>

      <!-- 推荐组件 -->
      <PaperRecommendations ref="recommendationsComponent" />
      
      <!-- 使用帮助 -->
      <div class="mt-12 bg-blue-50 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-blue-900 mb-4">📚 使用指南</h3>
        <div class="grid md:grid-cols-2 gap-6 text-sm text-blue-800">
          <div>
            <h4 class="font-medium mb-2">如何获取论文ID？</h4>
            <ul class="space-y-1 text-blue-700">
              <li>• 访问 Semantic Scholar 网站搜索论文</li>
              <li>• 复制论文页面URL中的ID部分</li>
              <li>• 或直接粘贴完整的论文URL</li>
              <li>• 支持40位十六进制ID格式</li>
            </ul>
          </div>
          <div>
            <h4 class="font-medium mb-2">如何优化推荐效果？</h4>
            <ul class="space-y-1 text-blue-700">
              <li>• 选择与您研究方向高度相关的种子论文</li>
              <li>• 添加负面种子论文排除不相关内容</li>
              <li>• 可以使用2-5篇正面种子论文获得最佳效果</li>
              <li>• 根据引用数或相关性排序浏览结果</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 示例论文ID -->
      <div class="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">🚀 快速开始</h3>
        <p class="text-gray-600 mb-4">您可以使用以下示例论文ID来测试推荐功能：</p>
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <h4 class="font-medium text-gray-800 mb-2">深度学习相关：</h4>
            <div class="space-y-2 text-sm font-mono">
              <div class="bg-white p-2 rounded border">
                <button @click="useSamplePaper('204e3073870fae3d05bcbc2f6a8e263d9b72e776')" 
                        class="text-blue-600 hover:text-blue-800 text-left w-full">
                  204e3073870fae3d05bcbc2f6a8e263d9b72e776
                </button>
                <div class="text-xs text-gray-500 mt-1">Attention Is All You Need</div>
              </div>
            </div>
          </div>
          <div>
            <h4 class="font-medium text-gray-800 mb-2">机器学习：</h4>
            <div class="space-y-2 text-sm font-mono">
              <div class="bg-white p-2 rounded border">
                <button @click="useSamplePaper('649def34f8be52c8b66281af98ae884c09aef38b')" 
                        class="text-blue-600 hover:text-blue-800 text-left w-full">
                  649def34f8be52c8b66281af98ae884c09aef38b
                </button>
                <div class="text-xs text-gray-500 mt-1">Deep Learning</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PaperRecommendations from '@/components/PaperRecommendations.vue'

export default {
  name: 'PaperRecommendationsView',
  components: {
    PaperRecommendations
  },
  methods: {
    useSamplePaper(paperId) {
      // 使用ref直接访问推荐组件
      this.$nextTick(() => {
        const recommendationComponent = this.$refs.recommendationsComponent;
        if (recommendationComponent) {
          // 设置第一个正面种子论文ID
          recommendationComponent.positivePaperIds = [paperId];
          // 滚动到推荐组件
          recommendationComponent.$el.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        } else {
          console.error('推荐组件未找到');
        }
      });
    }
  },
  mounted() {
    // 页面加载时的初始化逻辑
    console.log('推荐页面已加载');
    
    // 如果URL中有种子论文参数，可以在这里处理
    const urlParams = new URLSearchParams(window.location.search);
    const seedPaper = urlParams.get('seed');
    if (seedPaper) {
      console.log('从URL获取种子论文:', seedPaper);
      // 设置种子论文
      this.$nextTick(() => {
        this.useSamplePaper(seedPaper);
      });
    }
  }
}
</script>

<style scoped>
.recommendations-view {
  min-height: 100vh;
}

/* 确保在移动设备上的良好显示 */
@media (max-width: 640px) {
  .recommendations-view {
    padding: 1rem;
  }
}
</style> 