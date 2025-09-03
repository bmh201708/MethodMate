<template>
  <div class="bg-white rounded-lg border p-6 max-w-2xl mx-auto">
    <h2 class="text-xl font-bold mb-4">AI Service Test</h2>
    
    <!-- Current AI Service Status -->
    <div class="mb-4 p-3 bg-gray-50 rounded">
      <div class="text-sm text-gray-600">Current AI Service</div>
      <div class="text-lg font-semibold text-blue-600">
        {{ currentAIServiceName }}
      </div>
    </div>
    
    <!-- Switch Button -->
    <div class="mb-4">
      <button
        @click="toggleAIService"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Switch to {{ nextServiceName }}
      </button>
    </div>
    
    <!-- Test Message Input -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Test Message
      </label>
      <textarea
        v-model="testMessage"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        rows="3"
        placeholder="Enter test message..."
      ></textarea>
    </div>
    
    <!-- Test Buttons -->
    <div class="mb-4 space-x-2">
      <button
        @click="testStreamMessage"
        :disabled="isLoading || !testMessage.trim()"
        class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 transition-colors"
      >
        {{ isLoading ? 'Testing...' : 'Test Stream Message' }}
      </button>
      
      <button
        @click="testSilentMessage"
        :disabled="isLoading || !testMessage.trim()"
        class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50 transition-colors"
      >
        {{ isLoading ? 'Testing...' : 'Test Silent Message' }}
      </button>
      
      <button
        @click="testKeywordExtraction"
        :disabled="isLoading"
        class="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 disabled:opacity-50 transition-colors"
      >
        {{ isLoading ? 'Testing...' : 'Test Keyword Extraction' }}
      </button>
      
      <button
        @click="testSourceIntroduction"
        :disabled="isLoading"
        class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50 transition-colors"
      >
        {{ isLoading ? 'Testing...' : 'Test Source Introduction' }}
      </button>
      
      <button
        @click="testMethodIntroduction"
        :disabled="isLoading"
        class="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 disabled:opacity-50 transition-colors"
      >
        {{ isLoading ? 'Testing...' : 'Test Method Introduction' }}
      </button>
      
      <button
        @click="testStatisticalMethod"
        :disabled="isLoading"
        class="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50 transition-colors"
      >
        {{ isLoading ? 'Testing...' : 'Test Statistical Method Query' }}
      </button>
    </div>
    
    <!-- Test Results -->
    <div v-if="testResult" class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Test Results
      </label>
      <div class="bg-gray-50 border rounded-md p-3 max-h-60 overflow-y-auto">
        <pre class="text-sm whitespace-pre-wrap">{{ testResult }}</pre>
      </div>
    </div>
    
    <!-- Error Message -->
    <div v-if="errorMessage" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
      <div class="text-red-800 text-sm">
        <strong>Error:</strong>{{ errorMessage }}
      </div>
    </div>
    
    <!-- Real-time Stream Output Display -->
    <div v-if="streamOutput" class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Stream Output (Real-time)
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

// Reactive data
const testMessage = ref('Please introduce the basic concepts of quantitative research methods')
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
    
    // Mock chat history
    const mockChatHistory = [
      {
        type: 'user',
        content: 'I want to research the impact of user interface design on user experience'
      },
      {
        type: 'assistant',
        content: 'This is an interesting HCI research direction. You can consider using experimental design methods, setting different interface conditions, and measuring indicators such as user task completion time, error rate, and satisfaction.'
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
    
    const mockPrompt = `I will provide you with the data analysis section content of a research plan. Please analyze the research methods and statistical analysis methods used in it, and generate a detailed method introduction.

Data analysis section of the research plan:
A combination of descriptive and inferential statistical analysis methods is adopted. First, descriptive statistical analysis is performed on task completion time, error rate, and satisfaction scores, calculating mean and standard deviation. Then, two-way ANOVA is used to test the main effects and interaction effects of interface complexity and feedback type on various indicators. If significant differences are found, post-hoc tests (Tukey HSD) will be conducted to determine specific difference locations. The significance level is set at α=0.05.

Please generate a 300-500 word method introduction based on the above data analysis content, including the overall strategy of data analysis, specific statistical methods and their applicable scenarios, analysis workflow, etc.`
    
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