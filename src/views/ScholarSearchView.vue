<template>
  <div class="scholar-search-view">
    <ScholarSearch />
  </div>
</template>

<script>
import ScholarSearch from '@/components/ScholarSearch.vue'

export default {
  name: 'ScholarSearchView',
  components: {
    ScholarSearch
  }
}
</script>

<style scoped>
.scholar-search-view {
  min-height: 100vh;
  background-color: #f8fafc;
}
</style> 