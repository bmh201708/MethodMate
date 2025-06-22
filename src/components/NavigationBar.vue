<template>
  <header class="bg-white shadow-sm border-b sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- 左上角：首页按钮 -->
        <div class="flex items-center">
          <button
            @click="router.push('/')"
            class="flex items-center px-3 py-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            :class="{ 'text-blue-600': $route.name === 'home' }"
          >
            <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
            </svg>
            MethodMate
          </button>
        </div>

        <!-- 中间：主导航菜单 -->
        <nav class="hidden md:flex items-center space-x-8">
          <router-link
            to="/scholar-search"
            class="nav-link"
            :class="{ 'nav-link-active': $route.name === 'scholar-search' }"
          >
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
            </svg>
            文献搜索
          </router-link>

          <router-link
            to="/papers"
            class="nav-link"
            :class="{ 'nav-link-active': $route.name === 'papers' }"
          >
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
            </svg>
            文献推荐
          </router-link>

          <router-link
            to="/references"
            class="nav-link"
            :class="{ 'nav-link-active': $route.name === 'references' }"
          >
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
            </svg>
            引用文献
            <span v-if="referencedCount > 0" class="ml-1 px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">{{ referencedCount }}</span>
          </router-link>

          <router-link
            to="/research-plan"
            class="nav-link"
            :class="{ 'nav-link-active': $route.name === 'research-plan' }"
          >
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zM3 15a1 1 0 011-1h1a1 1 0 011 1v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-1zm7-14a2 2 0 012-2h2a2 2 0 012 2v11a3 3 0 11-6 0V1zm2 13a1 1 0 011-1h1a1 1 0 011 1v1a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1z" clip-rule="evenodd"/>
            </svg>
            研究方案
          </router-link>
        </nav>

        <!-- 右上角：历史记录按钮 -->
        <div class="flex items-center">
          <button
            @click="router.push('/history-plans')"
            class="flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 border border-gray-300 rounded-lg hover:border-blue-300 transition-colors"
            :class="{ 'text-blue-600 border-blue-300 bg-blue-50': $route.name === 'history-plans' }"
          >
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
            </svg>
            历史记录
          </button>
        </div>

        <!-- 移动端菜单按钮 -->
        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            class="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- 移动端导航菜单 -->
      <div v-show="showMobileMenu" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
          <router-link
            to="/scholar-search"
            class="mobile-nav-link"
            @click="closeMobileMenu"
          >
            文献搜索
          </router-link>
          <router-link
            to="/papers"
            class="mobile-nav-link"
            @click="closeMobileMenu"
          >
            文献推荐
          </router-link>
          <router-link
            to="/references"
            class="mobile-nav-link"
            @click="closeMobileMenu"
          >
            引用文献 ({{ referencedCount }})
          </router-link>
          <router-link
            to="/research-plan"
            class="mobile-nav-link"
            @click="closeMobileMenu"
          >
            研究方案
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { papersState } from '../stores/chatStore'

const router = useRouter()

// 移动端菜单状态
const showMobileMenu = ref(false)

// 引用文献计数
const referencedCount = computed(() => papersState.referencedPapers.size)

// 切换移动端菜单
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

// 关闭移动端菜单
const closeMobileMenu = () => {
  showMobileMenu.value = false
}
</script>

<style scoped>
.nav-link {
  @apply flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors;
}

.nav-link-active {
  @apply text-blue-600 bg-blue-50;
}

.mobile-nav-link {
  @apply block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors;
}
</style> 