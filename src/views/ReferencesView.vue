<template>
  <div class="references-view min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">引用文献管理</h1>
        <p class="text-gray-600">管理您在文献搜索和推荐中选择的参考文献</p>
      </div>
      
      <ReferencedPapersList />
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