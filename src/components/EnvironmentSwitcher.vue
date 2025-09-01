<template>
  <div class="environment-switcher">
    <!-- 环境指示器 -->
    <div class="flex items-center space-x-2 text-sm">
      <div class="flex items-center space-x-1">
        <div 
          class="w-2 h-2 rounded-full"
          :class="environmentStatusClass"
        ></div>
        <span class="text-gray-600">{{ currentEnvironment.name }}</span>
      </div>
      
      <!-- 切换按钮 -->
      <div class="relative">
        <button
          @click="showSelector = !showSelector"
          class="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          title="Switch Environment"
        >
          {{ showSelector ? 'Hide' : 'Switch' }}
        </button>
        
        <!-- 环境选择器 -->
        <div 
          v-if="showSelector"
          class="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-48"
        >
          <div class="p-2">
            <div class="text-xs font-medium text-gray-500 mb-2">Select Runtime Environment</div>
            <div class="space-y-1">
              <button
                v-for="env in availableEnvironments"
                :key="env.key"
                @click="switchToEnvironment(env.key)"
                class="w-full text-left px-3 py-2 text-sm rounded-md transition-colors"
                :class="env.key === currentEnvironment.type 
                  ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                  : 'hover:bg-gray-50'"
              >
                <div class="flex items-center space-x-2">
                  <div 
                    class="w-2 h-2 rounded-full"
                    :class="getEnvironmentStatusClass(env.key)"
                  ></div>
                  <div>
                    <div class="font-medium">{{ env.name }}</div>
                    <div class="text-xs text-gray-500">{{ env.description }}</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
          
          <!-- 快速切换按钮 -->
          <div class="border-t border-gray-100 p-2">
            <div class="text-xs text-gray-500 mb-2">Quick Switch</div>
            <div class="flex space-x-1">
              <button
                @click="quickSwitch('local')"
                class="flex-1 px-2 py-1 text-xs bg-green-50 text-green-700 rounded border border-green-200 hover:bg-green-100"
              >
                Local
              </button>
              <button
                @click="quickSwitch('remote')"
                class="flex-1 px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded border border-blue-200 hover:bg-blue-100"
              >
                Remote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 环境信息提示 -->
    <div v-if="showDetails" class="mt-2 p-2 bg-gray-50 rounded-md text-xs">
      <div class="font-medium">Current Environment Details:</div>
      <div class="text-gray-600">
        <div>Name: {{ currentEnvironment.name }}</div>
        <div>API URL: {{ currentEnvironment.apiBaseUrl }}</div>
        <div>Description: {{ currentEnvironment.description }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { 
  environmentUtils, 
  getAvailableEnvironments, 
  setCurrentEnvironment 
} from '../config/environment.js'

// 响应式数据
const showSelector = ref(false)
const showDetails = ref(false)
const currentEnvironment = ref(environmentUtils.getCurrentInfo())
const availableEnvironments = ref(getAvailableEnvironments())

// 计算属性
const environmentStatusClass = computed(() => {
  return getEnvironmentStatusClass(currentEnvironment.value.type)
})

// 方法
function getEnvironmentStatusClass(envType) {
  switch (envType) {
    case 'local':
      return 'bg-green-400'
    case 'remote':
      return 'bg-blue-400'
    case 'development':
      return 'bg-yellow-400'
    default:
      return 'bg-gray-400'
  }
}

function switchToEnvironment(envType) {
  try {
    setCurrentEnvironment(envType)
    currentEnvironment.value = environmentUtils.getCurrentInfo()
    showSelector.value = false
    
    // 显示切换成功提示
    console.log(`🔄 环境已切换到: ${currentEnvironment.value.name}`)
    
    // 可选: 显示用户友好的提示
    if (window.$notify) {
      window.$notify({
        type: 'success',
        title: '环境切换成功',
        message: `已切换到 ${currentEnvironment.value.name}`
      })
    }
  } catch (error) {
    console.error('环境切换失败:', error)
    if (window.$notify) {
      window.$notify({
        type: 'error',
        title: '环境切换失败',
        message: error.message
      })
    }
  }
}

function quickSwitch(envType) {
  switchToEnvironment(envType)
}

// 监听环境变更事件
function handleEnvironmentChange(event) {
  currentEnvironment.value = environmentUtils.getCurrentInfo()
  
  // 自动关闭选择器
  showSelector.value = false
}

// 点击外部关闭选择器
function handleClickOutside(event) {
  if (!event.target.closest('.environment-switcher')) {
    showSelector.value = false
  }
}

// 生命周期
onMounted(() => {
  window.addEventListener('environmentChanged', handleEnvironmentChange)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('environmentChanged', handleEnvironmentChange)
  document.removeEventListener('click', handleClickOutside)
})

// 暴露给父组件的方法
defineExpose({
  switchToEnvironment,
  getCurrentEnvironment: () => currentEnvironment.value,
  toggleDetails: () => showDetails.value = !showDetails.value
})
</script>

<style scoped>
.environment-switcher {
  user-select: none;
}

/* 过渡动画 */
.environment-switcher button {
  transition: all 0.2s ease;
}

.environment-switcher .absolute {
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 