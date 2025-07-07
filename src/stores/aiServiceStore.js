import { ref, computed } from 'vue'

// AI服务类型
export const AI_SERVICE_TYPES = {
  COZE: 'coze',
  CHATGPT: 'chatgpt'
}

// 全局AI服务状态
const currentAIService = ref(AI_SERVICE_TYPES.COZE) // 默认使用Coze

// 从localStorage加载设置
const loadAIServiceSetting = () => {
  const saved = localStorage.getItem('methodmate_ai_service')
  if (saved && Object.values(AI_SERVICE_TYPES).includes(saved)) {
    currentAIService.value = saved
  }
}

// 保存设置到localStorage
const saveAIServiceSetting = (service) => {
  localStorage.setItem('methodmate_ai_service', service)
}

// 初始化加载设置
loadAIServiceSetting()

// 计算属性
export const isUsingCoze = computed(() => currentAIService.value === AI_SERVICE_TYPES.COZE)
export const isUsingChatGPT = computed(() => currentAIService.value === AI_SERVICE_TYPES.CHATGPT)

// 获取当前AI服务
export const getCurrentAIService = () => currentAIService.value

// 切换AI服务
export const setAIService = (service) => {
  if (Object.values(AI_SERVICE_TYPES).includes(service)) {
    currentAIService.value = service
    saveAIServiceSetting(service)
    console.log(`🤖 AI服务已切换到: ${service}`)
  } else {
    console.error('无效的AI服务类型:', service)
  }
}

// 切换AI服务（在两个服务之间切换）
export const toggleAIService = () => {
  const newService = currentAIService.value === AI_SERVICE_TYPES.COZE 
    ? AI_SERVICE_TYPES.CHATGPT 
    : AI_SERVICE_TYPES.COZE
  setAIService(newService)
}

// 获取AI服务名称
export const getAIServiceName = (service) => {
  switch (service) {
    case AI_SERVICE_TYPES.COZE:
      return 'Coze'
    case AI_SERVICE_TYPES.CHATGPT:
      return 'ChatGPT'
    default:
      return '未知'
  }
}

// 获取当前AI服务名称
export const getCurrentAIServiceName = () => getAIServiceName(currentAIService.value)

// 导出响应式状态
export const aiServiceState = {
  current: currentAIService,
  isUsingCoze,
  isUsingChatGPT,
  getCurrentAIService,
  setAIService,
  toggleAIService,
  getCurrentAIServiceName,
  getAIServiceName,
  AI_SERVICE_TYPES
} 