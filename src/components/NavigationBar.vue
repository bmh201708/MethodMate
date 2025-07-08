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

        <!-- 中间：主导航菜单（高频功能） -->
        <nav class="hidden md:flex items-center space-x-8">
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

        <!-- 右上角：低频功能、历史记录、环境切换器和用户菜单 -->
        <div class="flex items-center space-x-2">
          <!-- 文献搜索（低频功能） -->
          <router-link
            to="/scholar-search"
            class="flex items-center px-2.5 py-2 text-sm text-gray-600 hover:text-blue-600 border border-gray-300 rounded-md hover:border-blue-300 transition-colors"
            :class="{ 'text-blue-600 border-blue-300 bg-blue-50': $route.name === 'scholar-search' }"
          >
            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
            </svg>
            搜索
          </router-link>

          <!-- 引用文献（低频功能） -->
          <router-link
            to="/references"
            class="flex items-center px-2.5 py-2 text-sm text-gray-600 hover:text-blue-600 border border-gray-300 rounded-md hover:border-blue-300 transition-colors"
            :class="{ 'text-blue-600 border-blue-300 bg-blue-50': $route.name === 'references' }"
          >
            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
            </svg>
            引用
            <span v-if="referencedCount > 0" class="ml-1 px-1.5 py-0.5 text-xs bg-purple-500 text-white rounded-full">{{ referencedCount }}</span>
          </router-link>

          <!-- ChatGPT对话 - 已隐藏 -->
          <!-- <router-link
            to="/chatgpt"
            class="flex items-center px-2.5 py-2 text-sm text-gray-600 hover:text-green-600 border border-gray-300 rounded-md hover:border-green-300 transition-colors"
            :class="{ 'text-green-600 border-green-300 bg-green-50': $route.name === 'chatgpt' }"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
            ChatGPT
          </router-link> -->

          <!-- 历史记录 -->
          <button
            @click="router.push('/history-plans')"
            class="flex items-center px-2.5 py-2 text-sm text-gray-600 hover:text-blue-600 border border-gray-300 rounded-md hover:border-blue-300 transition-colors"
            :class="{ 'text-blue-600 border-blue-300 bg-blue-50': $route.name === 'history-plans' }"
          >
            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
            </svg>
            历史
          </button>

          <!-- 主题切换按钮 -->
          <button
            @click="themeStore.toggleTheme"
            class="flex items-center px-2.5 py-2 text-sm text-gray-600 hover:text-blue-600 border border-gray-300 rounded-md hover:border-blue-300 transition-colors"
            :title="themeStore.isDark ? '切换到浅色模式' : '切换到暗黑模式'"
          >
            <svg v-if="themeStore.isDark" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <!-- 太阳图标 (浅色模式) -->
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"/>
            </svg>
            <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <!-- 月亮图标 (暗黑模式) -->
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
            </svg>
          </button>

          <!-- 用户菜单 -->
          <div v-if="userStore.isAuthenticated" class="relative ml-2">
            <button
              @click="toggleUserMenu"
              class="flex items-center px-3 py-2 text-gray-600 hover:text-blue-600 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
              </svg>
              {{ userStore.user?.username }}
              <svg class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>

            <!-- 用户下拉菜单 -->
            <div v-show="showUserMenu" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-50">
              <div class="py-1">
                <div class="px-4 py-2 text-sm text-gray-600 border-b">
                  <div class="font-medium">{{ userStore.user?.username }}</div>
                  <div class="text-xs text-gray-500">{{ userStore.user?.email }}</div>
                </div>
                <button
                  @click="handleLogout"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 001-1h10.586l-2.293-2.293a1 1 0 10-1.414 1.414L14.586 3H3zm11.707 4.707L16.414 9H11a1 1 0 100 2h5.414l-1.707 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 00-1.414 1.414z" clip-rule="evenodd"/>
                  </svg>
                  退出登录
                </button>
              </div>
            </div>
          </div>

          <!-- 登录/注册按钮 -->
          <div v-else class="flex items-center space-x-1 ml-2">
            <router-link
              to="/login"
              class="px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              登录
            </router-link>
            <router-link
              to="/register"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              注册
            </router-link>
          </div>
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
          <!-- 高频功能 -->
          <router-link
            to="/papers"
            class="mobile-nav-link"
            @click="closeMobileMenu"
          >
            文献推荐
          </router-link>
          <router-link
            to="/research-plan"
            class="mobile-nav-link"
            @click="closeMobileMenu"
          >
            研究方案
          </router-link>
          
          <!-- 分隔线 -->
          <div class="border-t my-2"></div>
          
          <!-- 低频功能 -->
          <router-link
            to="/scholar-search"
            class="mobile-nav-link"
            @click="closeMobileMenu"
          >
            文献搜索
          </router-link>
          <router-link
            to="/references"
            class="mobile-nav-link"
            @click="closeMobileMenu"
          >
            引用文献 ({{ referencedCount }})
          </router-link>
          <!-- <router-link
            to="/chatgpt"
            class="mobile-nav-link"
            @click="closeMobileMenu"
          >
            ChatGPT 对话
          </router-link> -->
          <router-link
            to="/history-plans"
            class="mobile-nav-link"
            @click="closeMobileMenu"
          >
            历史记录
          </router-link>
          
          <!-- 主题切换按钮 (移动端) -->
          <button
            @click="themeStore.toggleTheme"
            class="flex items-center px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors w-full"
          >
            <svg v-if="themeStore.isDark" class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"/>
            </svg>
            <svg v-else class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
            </svg>
            {{ themeStore.isDark ? '浅色模式' : '暗黑模式' }}
          </button>
          
          <!-- 移动端用户菜单分隔线 -->
          <div class="border-t pt-2 mt-2">
            <div v-if="userStore.isAuthenticated" class="space-y-1">
              <div class="px-3 py-2 text-sm text-gray-600">
                <div class="font-medium">{{ userStore.user?.username }}</div>
                <div class="text-xs text-gray-500">{{ userStore.user?.email }}</div>
              </div>
              <button
                @click="handleLogout"
                class="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                退出登录
              </button>
            </div>
            <div v-else class="space-y-1">
              <router-link
                to="/login"
                class="mobile-nav-link"
                @click="closeMobileMenu"
              >
                登录
              </router-link>
              <router-link
                to="/register"
                class="mobile-nav-link"
                @click="closeMobileMenu"
              >
                注册
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { papersState } from '../stores/chatStore'
import { useUserStore } from '../stores/userStore'
import { useThemeStore } from '../stores/themeStore'

const router = useRouter()
const userStore = useUserStore()
const themeStore = useThemeStore()

// 移动端菜单状态
const showMobileMenu = ref(false)
const showUserMenu = ref(false)

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

// 切换用户菜单
const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

// 关闭用户菜单
const closeUserMenu = () => {
  showUserMenu.value = false
}

// 处理用户登出
const handleLogout = () => {
  userStore.logout()
  closeUserMenu()
  router.push('/')
}

// 点击外部关闭用户菜单
const handleClickOutside = (event) => {
  const userMenuElement = event.target.closest('.relative')
  if (!userMenuElement && showUserMenu.value) {
    closeUserMenu()
  }
}

// 初始化用户状态
onMounted(async () => {
  await userStore.initializeUser()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
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