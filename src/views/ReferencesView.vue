<template>
  <div class="references-view min-h-screen bg-gray-50">
    <!-- 顶部导航栏 -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-8">
            <router-link
              to="/"
              class="text-gray-600 hover:text-gray-900 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              首页
            </router-link>
            <h1 class="text-2xl font-bold text-gray-900">MethodMate</h1>
            <div class="flex space-x-4">
              <router-link
                to="/scholar-search"
                class="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium"
              >
                文献搜索
              </router-link>
              <router-link
                to="/papers"
                class="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium"
              >
                文献推荐
              </router-link>
              <span class="px-4 py-2 text-purple-600 font-medium border-b-2 border-purple-600">
                引用文献
              </span>
              <router-link
                to="/research-plan"
                class="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium"
              >
                研究方案
              </router-link>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <router-link
              to="/history-plans"
              class="px-4 py-2 bg-white text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
            >
              历史方案
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">引用文献管理</h1>
        <p class="text-gray-600">管理您在文献搜索和推荐中选择的参考文献</p>
      </div>
      
      <ReferencedPapersList />
      
      <div class="mt-8 text-center">
        <div class="flex justify-center gap-4">
          <router-link 
            to="/scholar-search" 
            class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
            </svg>
            前往文献搜索
          </router-link>
          <router-link 
            to="/papers" 
            class="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            前往文献推荐
          </router-link>
          <router-link 
            to="/research-plan" 
            class="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
            </svg>
            前往研究方案
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReferencedPapersList from '@/components/ReferencedPapersList.vue'

export default {
  name: 'ReferencesView',
  components: {
    ReferencedPapersList
  }
}
</script>

<style scoped>
.references-view {
  min-height: 100vh;
}
</style> 