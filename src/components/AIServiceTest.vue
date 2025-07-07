<template>
  <div class="bg-white rounded-lg border p-6 max-w-2xl mx-auto">
    <h2 class="text-xl font-bold mb-4">AI服务测试</h2>
    
    <!-- 当前AI服务状态 -->
    <div class="mb-4 p-3 bg-gray-50 rounded">
      <div class="text-sm text-gray-600">当前AI服务</div>
      <div class="text-lg font-semibold text-blue-600">
        {{ currentAIServiceName }}
      </div>
    </div>
    
    <!-- 切换按钮 -->
    <div class="mb-4">
      <button
        @click="toggleAIService"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        切换到 {{ nextServiceName }}
      </button>
    </div>
    
    <!-- 测试消息输入 -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        测试消息
      </label>
      <textarea
        v-model="testMessage"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        rows="3"
        placeholder="输入测试消息..."
      ></textarea>
    </div>
    
    <!-- 测试按钮 -->
    <div class="mb-4 space-x-2">
      <button
        @click="testStreamMessage"
        :disabled="isLoading || !testMessage.trim()"
        class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 transition-colors"
      >
        {{ isLoading ? '测试中...' : '测试流式消息' }}
      </button>
      
      <button
        @click="testSilentMessage"
        :disabled="isLoading || !testMessage.trim()"
        class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50 transition-colors"
      >
        {{ isLoading ? '测试中...' : '测试静默消息' }}
      </button>
      
      <button
        @click="testKeywordExtraction"
        :disabled="isLoading"
        class="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 disabled:opacity-50 transition-colors"
      >
        {{ isLoading ? '测试中...' : '测试关键词提取' }}
      </button>
      
      <button
        @click="testSourceIntroduction"
        :disabled="isLoading"
        class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50 transition-colors"
      >
        {{ isLoading ? '测试中...' : '测试来源介绍' }}
      </button>
      
      <button
        @click="testMethodIntroduction"
        :disabled="isLoading"
        class="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 disabled:opacity-50 transition-colors"
      >
        {{ isLoading ? '测试中...' : '测试方法介绍' }}
      </button>
      
      <button
        @click="testStatisticalMethod"
        :disabled="isLoading"
        class="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50 transition-colors"
      >
        {{ isLoading ? '测试中...' : '测试统计方法查询' }}
      </button>
    </div>
    
    <!-- 测试结果 -->
    <div v-if="testResult" class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        测试结果
      </label>
      <div class="bg-gray-50 border rounded-md p-3 max-h-60 overflow-y-auto">
        <pre class="text-sm whitespace-pre-wrap">{{ testResult }}</pre>
      </div>
    </div>
    
    <!-- 错误信息 -->
    <div v-if="errorMessage" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
      <div class="text-red-800 text-sm">
        <strong>错误：</strong>{{ errorMessage }}
      </div>
    </div>
    
    <!-- 流式输出实时显示 -->
    <div v-if="streamOutput" class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        流式输出（实时）
      </label>
      <div class="bg-blue-50 border border-blue-200 rounded-md p-3 max-h-60 overflow-y-auto">
        <div class="text-sm whitespace-pre-wrap">{{ streamOutput }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { aiServiceState } from '../stores/aiServiceStore.js'
import { 
  sendStreamMessage, 
  sendSilentMessage, 
  extractKeywords,
  generateSourceIntroduction,
  generateMethodIntroduction,
  queryStatisticalMethod
} from '../services/aiServiceAdapter.js'

// 响应式数据
const testMessage = ref('请介绍一下定量研究方法的基本概念')
const testResult = ref('')
const errorMessage = ref('')
const streamOutput = ref('')
const isLoading = ref(false)

// 计算属性
const currentAIServiceName = computed(() => aiServiceState.getCurrentAIServiceName())
const nextServiceName = computed(() => {
  return aiServiceState.getCurrentAIService() === 'coze' ? 'ChatGPT' : 'Coze'
})

// 方法
const toggleAIService = () => {
  aiServiceState.toggleAIService()
  clearResults()
}

const clearResults = () => {
  testResult.value = ''
  errorMessage.value = ''
  streamOutput.value = ''
}

const testStreamMessage = async () => {
  if (!testMessage.value.trim()) return
  
  isLoading.value = true
  clearResults()
  
  try {
    console.log(`🧪 测试流式消息 - 使用 ${currentAIServiceName.value}`)
    
    const result = await sendStreamMessage(
      testMessage.value.trim(),
      (chunk, fullResponse) => {
        streamOutput.value = fullResponse
      },
      []
    )
    
    testResult.value = `✅ 流式消息测试成功\n\n最终结果：\n${result}`
    
  } catch (error) {
    console.error('流式消息测试失败:', error)
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}

const testSilentMessage = async () => {
  if (!testMessage.value.trim()) return
  
  isLoading.value = true
  clearResults()
  
  try {
    console.log(`🧪 测试静默消息 - 使用 ${currentAIServiceName.value}`)
    
    const result = await sendSilentMessage(testMessage.value.trim(), [])
    
    testResult.value = `✅ 静默消息测试成功\n\n结果：\n${result}`
    
  } catch (error) {
    console.error('静默消息测试失败:', error)
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}

const testKeywordExtraction = async () => {
  isLoading.value = true
  clearResults()
  
  try {
    console.log(`🧪 测试关键词提取 - 使用 ${currentAIServiceName.value}`)
    
    // 模拟聊天历史
    const mockChatHistory = [
      {
        type: 'user',
        content: '我想研究用户界面设计对用户体验的影响'
      },
      {
        type: 'assistant',
        content: '这是一个很有趣的HCI研究方向。你可以考虑使用实验设计方法，设置不同的界面条件，测量用户的任务完成时间、错误率和满意度等指标。'
      }
    ]
    
    const keywords = await extractKeywords(mockChatHistory, Date.now().toString())
    
    testResult.value = `✅ 关键词提取测试成功\n\n提取的关键词：\n${keywords}`
    
  } catch (error) {
    console.error('关键词提取测试失败:', error)
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}

const testSourceIntroduction = async () => {
  isLoading.value = true
  clearResults()
  
  try {
    console.log(`🧪 测试来源介绍生成 - 使用 ${currentAIServiceName.value}`)
    
    const mockPrompt = `我将为你提供一个研究方案，以及研究方案参考的一些参考文献。请分析以下研究方案的"实验设计"部分参考了哪些参考文献的研究方法内容，并生成一个简洁的来源介绍。

研究方案的实验设计部分：
采用2×2的被试间实验设计，招募60名年龄在18-25岁的大学生作为被试。实验包含两个自变量：界面复杂度（简单vs复杂）和反馈类型（视觉vs听觉）。被试将完成网购任务，测量任务完成时间、错误率和用户满意度。

参考文献信息：
1. 《人机交互设计原理》- 提供了界面设计的理论基础
2. 《用户体验测量方法》- 介绍了各种UX测量指标
3. 《实验心理学方法》- 阐述了实验设计的基本原则

请分析实验设计部分具体参考了哪些文献的哪些研究方法要素，并生成一个200-300字的来源介绍。`
    
    const result = await generateSourceIntroduction(mockPrompt, `test_source_${Date.now()}`)
    
    testResult.value = `✅ 来源介绍生成测试成功\n\n生成的来源介绍：\n${result}`
    
  } catch (error) {
    console.error('来源介绍生成测试失败:', error)
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}

const testMethodIntroduction = async () => {
  isLoading.value = true
  clearResults()
  
  try {
    console.log(`🧪 测试方法介绍生成 - 使用 ${currentAIServiceName.value}`)
    
    const mockPrompt = `我将为你提供一个研究方案的数据分析部分内容。请分析其中使用的研究方法和统计分析方法，并生成一个详细的方法介绍。

研究方案的数据分析部分：
采用描述性统计分析和推断性统计分析相结合的方法。首先对任务完成时间、错误率和满意度评分进行描述性统计分析，计算均值、标准差等。然后使用双因素方差分析(Two-way ANOVA)检验界面复杂度和反馈类型对各项指标的主效应和交互效应。如果发现显著差异，将进行事后检验(Tukey HSD)确定具体差异位置。显著性水平设定为α=0.05。

请基于上述数据分析内容，生成一个300-500字的方法介绍，包括数据分析的总体策略、具体统计方法及其适用场景、分析步骤流程等。`
    
    const result = await generateMethodIntroduction(mockPrompt)
    
    testResult.value = `✅ 方法介绍生成测试成功\n\n生成的方法介绍：\n${result}`
    
  } catch (error) {
    console.error('方法介绍生成测试失败:', error)
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}

const testStatisticalMethod = async () => {
  isLoading.value = true
  clearResults()
  
  try {
    console.log(`🧪 测试统计方法查询 - 始终使用Coze API（不受当前AI服务选择影响）`)
    
    const methodName = 'ANOVA'
    const result = await queryStatisticalMethod(methodName)
    
    testResult.value = `✅ 统计方法查询测试成功\n\n查询方法：${methodName}\n数据来源：${result.source}\n说明：统计方法查询始终使用Coze API\n\n方法解释：\n${result.explanation}`
    
  } catch (error) {
    console.error('统计方法查询测试失败:', error)
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* 添加一些自定义样式 */
.transition-colors {
  transition: background-color 0.2s ease-in-out;
}
</style> 