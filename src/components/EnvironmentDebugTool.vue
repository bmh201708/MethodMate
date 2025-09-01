<template>
  <div v-if="showTool" class="fixed bottom-4 right-4 z-50">
    <div class="bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-sm">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-sm font-semibold text-gray-700">Environment Debug Tool</h3>
        <button
          @click="toggleTool"
          class="text-gray-400 hover:text-gray-600 text-sm"
        >
          ✕
        </button>
      </div>
      
      <!-- Current Environment Info -->
      <div class="mb-3">
        <div class="text-xs text-gray-500 mb-1">Current Environment</div>
        <div class="flex items-center space-x-2">
          <div 
            class="w-2 h-2 rounded-full"
            :class="environmentStatusClass"
          ></div>
          <span class="text-sm font-medium">{{ currentEnvironment.name }}</span>
        </div>
        <div class="text-xs text-gray-600 mt-1">{{ currentEnvironment.description }}</div>
      </div>
      
      <!-- API Configuration Info -->
      <div class="mb-3">
        <div class="text-xs text-gray-500 mb-1">API Configuration</div>
        <div class="bg-gray-50 rounded p-2 text-xs font-mono">
          <div>Base: {{ currentEnvironment.apiBaseUrl }}</div>
          <div>Chat: {{ currentEnvironment.chatApiUrl }}</div>
        </div>
      </div>
      
      <!-- Connection Status -->
      <div class="mb-3">
        <div class="text-xs text-gray-500 mb-1">Connection Status</div>
        <div class="flex items-center space-x-2">
          <div 
            class="w-2 h-2 rounded-full"
            :class="connectionStatus === 'connected' ? 'bg-green-400' : 
                   connectionStatus === 'connecting' ? 'bg-yellow-400' : 'bg-red-400'"
          ></div>
          <span class="text-xs">{{ connectionStatusText }}</span>
          <button
            @click="testConnection"
            :disabled="connectionStatus === 'connecting'"
            class="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 disabled:opacity-50"
          >
            Test
          </button>
        </div>
      </div>
      
      <!-- 快速切换按钮 -->
      <div class="mb-3">
        <div class="text-xs text-gray-500 mb-2">Quick Switch</div>
        <div class="grid grid-cols-2 gap-2">
          <button
            @click="switchEnvironment('local')"
            :class="currentEnvironment.type === 'local' 
              ? 'bg-green-100 text-green-700 border-green-300' 
              : 'bg-gray-50 text-gray-700 border-gray-300'"
            class="px-2 py-1 text-xs border rounded hover:bg-opacity-80"
          >
            Local Environment
          </button>
          <button
            @click="switchEnvironment('remote')"
            :class="currentEnvironment.type === 'remote' 
              ? 'bg-blue-100 text-blue-700 border-blue-300' 
              : 'bg-gray-50 text-gray-700 border-gray-300'"
            class="px-2 py-1 text-xs border rounded hover:bg-opacity-80"
          >
            Cloud Server
          </button>
        </div>
      </div>

      <!-- AI服务选择 -->
      <div class="mb-3">
        <div class="text-xs text-gray-500 mb-2">AI Service Selection</div>
        <div class="grid grid-cols-2 gap-2">
          <button
            @click="switchAIService('coze')"
            :class="currentAIService === 'coze' 
              ? 'bg-purple-100 text-purple-700 border-purple-300' 
              : 'bg-gray-50 text-gray-700 border-gray-300'"
            class="px-2 py-1 text-xs border rounded hover:bg-opacity-80"
          >
            🤖 Coze
          </button>
          <button
            @click="switchAIService('chatgpt')"
            :class="currentAIService === 'chatgpt' 
              ? 'bg-green-100 text-green-700 border-green-300' 
              : 'bg-gray-50 text-gray-700 border-gray-300'"
            class="px-2 py-1 text-xs border rounded hover:bg-opacity-80"
          >
            💬 ChatGPT
          </button>
        </div>
        <div class="text-xs text-gray-600 mt-1">Current: {{ currentAIServiceName }}</div>
      </div>
      
      <!-- 调试信息 -->
      <div class="mb-3">
        <button
          @click="showDebugInfo = !showDebugInfo"
          class="text-xs text-gray-500 hover:text-gray-700"
        >
          {{ showDebugInfo ? 'Hide' : 'Show' }} Debug Info ▼
        </button>
        
        <div v-if="showDebugInfo" class="mt-2 bg-gray-50 rounded p-2 text-xs">
          <div class="space-y-1">
            <div><strong>Development Mode:</strong> {{ isDev ? 'Yes' : 'No' }}</div>
            <div><strong>Vite HMR:</strong> {{ hasHMR ? 'Yes' : 'No' }}</div>
            <div><strong>LocalStorage:</strong> {{ hasEnvironmentInStorage ? 'Set' : 'Not Set' }}</div>
            <div><strong>URL Parameters:</strong> {{ urlEnvironment || 'None' }}</div>
            <div><strong>Browser:</strong> {{ userAgent }}</div>
          </div>
        </div>
      </div>
      
      <!-- 操作按钮 -->
      <div class="flex space-x-2">
        <button
          @click="clearEnvironmentSettings"
          class="flex-1 px-2 py-1 text-xs bg-yellow-50 text-yellow-700 border border-yellow-300 rounded hover:bg-yellow-100"
        >
          Reset Settings
        </button>
        <button
          @click="copyEnvironmentInfo"
          class="flex-1 px-2 py-1 text-xs bg-gray-50 text-gray-700 border border-gray-300 rounded hover:bg-gray-100"
        >
          Copy Info
        </button>
      </div>
    </div>
  </div>
  
  <!-- 切换工具按钮 -->
  <button
    v-if="!showTool && (isDev || isDebugMode)"
    @click="toggleTool"
    class="fixed bottom-4 right-4 z-40 w-10 h-10 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 flex items-center justify-center text-sm"
    title="Open Environment Debug Tool"
  >
    🔧
  </button>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { 
  environmentUtils, 
  setCurrentEnvironment, 
  getCurrentEnvironment
} from '../config/environment.js'
import { 
  aiServiceState, 
  AI_SERVICE_TYPES 
} from '../stores/aiServiceStore.js'

// Reactive data
const showTool = ref(false)
const showDebugInfo = ref(false)
const currentEnvironment = ref(environmentUtils.getCurrentInfo())
const connectionStatus = ref('unknown') // 'connected', 'connecting', 'disconnected', 'unknown'

// Computed properties
const isDev = computed(() => import.meta.env.DEV)
const isDebugMode = computed(() => {
  return localStorage.getItem('methodmate_debug_mode') === 'true' || 
         new URLSearchParams(window.location.search).get('debug') === 'true'
})

const hasHMR = computed(() => !!(import.meta.hot))
const hasEnvironmentInStorage = computed(() => !!localStorage.getItem('methodmate_environment'))

const urlEnvironment = computed(() => {
  return new URLSearchParams(window.location.search).get('env')
})

const userAgent = computed(() => {
  const ua = navigator.userAgent
  if (ua.includes('Chrome')) return 'Chrome'
  if (ua.includes('Firefox')) return 'Firefox'
  if (ua.includes('Safari')) return 'Safari'
  if (ua.includes('Edge')) return 'Edge'
  return 'Other'
})

const environmentStatusClass = computed(() => {
  switch (currentEnvironment.value.type) {
    case 'local': return 'bg-green-400'
    case 'remote': return 'bg-blue-400'
    case 'development': return 'bg-yellow-400'
    default: return 'bg-gray-400'
  }
})

const connectionStatusText = computed(() => {
  switch (connectionStatus.value) {
    case 'connected': return 'Connected'
    case 'connecting': return 'Connecting...'
    case 'disconnected': return 'Connection Failed'
    default: return 'Not Tested'
  }
})

// AI service related computed properties
const currentAIService = computed(() => aiServiceState.getCurrentAIService())
const currentAIServiceName = computed(() => aiServiceState.getCurrentAIServiceName())

// Methods
function toggleTool() {
  showTool.value = !showTool.value
}

function switchEnvironment(envType) {
  try {
    setCurrentEnvironment(envType)
    currentEnvironment.value = environmentUtils.getCurrentInfo()
    console.log(`🔄 Environment switched to: ${currentEnvironment.value.name}`)
    
    // Reset connection status
    connectionStatus.value = 'unknown'
  } catch (error) {
    console.error('Environment switch failed:', error)
  }
}

function switchAIService(serviceType) {
  try {
    aiServiceState.setAIService(serviceType)
    console.log(`🤖 AI service switched to: ${aiServiceState.getCurrentAIServiceName()}`)
  } catch (error) {
    console.error('AI service switch failed:', error)
  }
}

async function testConnection() {
  connectionStatus.value = 'connecting'
  
  try {
    const response = await fetch(currentEnvironment.value.chatApiUrl.replace('/chat', '/health'), {
      method: 'GET',
      timeout: 5000
    })
    
    if (response.ok) {
      connectionStatus.value = 'connected'
    } else {
      connectionStatus.value = 'disconnected'
    }
  } catch (error) {
    console.error('Connection test failed:', error)
    connectionStatus.value = 'disconnected'
  }
}

function clearEnvironmentSettings() {
  localStorage.removeItem('methodmate_environment')
  localStorage.removeItem('methodmate_debug_mode')
  location.reload()
}

function copyEnvironmentInfo() {
  const info = {
    environment: currentEnvironment.value,
    debug: {
      isDev: isDev.value,
      hasHMR: hasHMR.value,
      hasEnvironmentInStorage: hasEnvironmentInStorage.value,
      urlEnvironment: urlEnvironment.value,
      userAgent: userAgent.value
    },
    connection: connectionStatus.value,
    timestamp: new Date().toISOString()
  }
  
  navigator.clipboard.writeText(JSON.stringify(info, null, 2)).then(() => {
    console.log('Environment information copied to clipboard')
  }).catch(err => {
    console.error('Copy failed:', err)
  })
}

// Listen for environment change events
function handleEnvironmentChange(event) {
  currentEnvironment.value = environmentUtils.getCurrentInfo()
  connectionStatus.value = 'unknown'
}

// Keyboard shortcuts
function handleKeyDown(event) {
  // Ctrl/Cmd + Shift + E to open/close debug tool
  if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'E') {
    event.preventDefault()
    toggleTool()
  }
}

// Lifecycle
onMounted(() => {
  window.addEventListener('environmentChanged', handleEnvironmentChange)
  document.addEventListener('keydown', handleKeyDown)
  
  // Auto open in development mode
  if (isDev.value && localStorage.getItem('methodmate_auto_debug') !== 'false') {
    showTool.value = true
  }
})

onUnmounted(() => {
  window.removeEventListener('environmentChanged', handleEnvironmentChange)
  document.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
/* Tool panel animations */
.fixed {
  animation: slideInUp 0.3s ease-out;
}

@keyframes slideInUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style> 