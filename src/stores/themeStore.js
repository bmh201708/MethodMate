import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // 从localStorage获取保存的主题，默认为浅色主题
  const savedTheme = localStorage.getItem('theme')
  const isDark = ref(savedTheme === 'dark')
  
  // 计算属性
  const theme = computed(() => isDark.value ? 'dark' : 'light')
  const themeClass = computed(() => isDark.value ? 'dark-theme' : 'light-theme')
  
  // 切换主题
  const toggleTheme = () => {
    isDark.value = !isDark.value
    // 保存到localStorage
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    
    // 更新body类
    updateBodyClass()
  }
  
  // 设置主题
  const setTheme = (newTheme) => {
    isDark.value = newTheme === 'dark'
    localStorage.setItem('theme', newTheme)
    updateBodyClass()
  }
  
  // 更新body类
  const updateBodyClass = () => {
    if (isDark.value) {
      document.body.classList.add('dark-theme')
      document.body.classList.remove('light-theme')
    } else {
      document.body.classList.add('light-theme')
      document.body.classList.remove('dark-theme')
    }
  }
  
  // 初始化主题
  const initializeTheme = () => {
    updateBodyClass()
  }
  
  return {
    isDark,
    theme,
    themeClass,
    toggleTheme,
    setTheme,
    initializeTheme
  }
}) 