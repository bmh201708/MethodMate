<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- 统一的顶部导航栏 -->
    <NavigationBar />
    
    <!-- 主要内容区域 -->
    <main class="flex-1">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from './stores/userStore.js'
import NavigationBar from './components/NavigationBar.vue'

const router = useRouter()
const userStore = useUserStore()

// 应用启动时初始化用户状态
onMounted(async () => {
  try {
    await userStore.initializeUser()
  } catch (error) {
    console.error('应用初始化用户状态失败:', error)
  }
})
</script>

<style>
/* 全局样式 */
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>