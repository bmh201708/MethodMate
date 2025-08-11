<template>
  <div class="references-view min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Referenced Papers Management</h1>
        <p class="text-gray-600">Manage your selected reference papers from literature search and recommendations</p>
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