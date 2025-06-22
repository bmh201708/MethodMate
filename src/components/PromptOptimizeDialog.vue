<template>
  <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl shadow-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
      <!-- 头部 -->
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">润色提示词</h3>
          <button @click="handleCancel" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="px-6 py-4 max-h-[60vh] overflow-y-auto">
        <!-- 快捷选项 -->
        <div class="mb-4">
          <div class="flex flex-wrap gap-2">
            <button 
              @click="handleQuickOption('auto')"
              class="px-3 py-1.5 bg-purple-100 text-purple-700 text-sm rounded-full hover:bg-purple-200 transition-colors"
            >
              自动优化
            </button>
            <button 
              @click="handleQuickOption('clear')"
              class="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
            >
              使表达更清晰
            </button>
            <button 
              @click="handleQuickOption('professional')"
              class="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
            >
              使表达更专业
            </button>
          </div>
        </div>

        <!-- 输入框 -->
        <div class="mb-4">
          <div class="relative">
            <input
              v-model="optimizeInstruction"
              type="text"
              placeholder="您希望如何润色提示词？"
              class="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500"
              @keyup.enter="handleOptimize"
              :disabled="isOptimizing"
            />
            <button
              @click="handleOptimize"
              :disabled="!optimizeInstruction.trim() || isOptimizing"
              class="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <!-- 原始提示词 -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">原始提示词:</label>
          <div class="bg-gray-50 rounded-lg p-3">
            <p class="text-gray-800 text-sm">{{ originalPrompt }}</p>
          </div>
        </div>

        <!-- 润色结果 -->
        <div v-if="optimizedPrompt || isOptimizing" class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">润色后的提示词:</label>
          <div class="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <div v-if="isOptimizing" class="flex items-center space-x-2">
              <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
              <span class="text-sm text-gray-600">正在润色中...</span>
            </div>
            <p v-else class="text-gray-800 text-sm whitespace-pre-wrap">{{ optimizedPrompt }}</p>
          </div>
        </div>

        <!-- 润色建议 -->
        <div v-if="optimizationSuggestions" class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">优化建议:</label>
          <div class="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
            <!-- 如果是数组格式的建议 -->
            <ul v-if="Array.isArray(optimizationSuggestions)" class="space-y-2">
              <li v-for="(suggestion, index) in optimizationSuggestions" :key="index" 
                  class="flex items-start space-x-2">
                <span class="flex-shrink-0 w-5 h-5 bg-yellow-200 text-yellow-800 text-xs rounded-full flex items-center justify-center font-medium mt-0.5">
                  {{ index + 1 }}
                </span>
                <span class="text-gray-800 text-sm">{{ suggestion }}</span>
              </li>
            </ul>
            <!-- 如果是字符串格式的建议 -->
            <p v-else class="text-gray-800 text-sm whitespace-pre-wrap">{{ optimizationSuggestions }}</p>
          </div>
        </div>
      </div>

      <!-- 底部按钮 -->
      <div class="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
        <button
          @click="handleCancel"
          class="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          取消
        </button>
        <button
          @click="handleReplace"
          :disabled="!optimizedPrompt"
          class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          替换
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { sendSilentMessageToCoze } from '../services/cozeApi'

// Props
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  originalPrompt: {
    type: String,
    default: ''
  }
})

// Emits
const emit = defineEmits(['close', 'replace'])

// 响应式数据
const optimizeInstruction = ref('')
const optimizedPrompt = ref('')
const optimizationSuggestions = ref(null) // 可以是字符串或数组
const isOptimizing = ref(false)

// 监听显示状态变化，重置数据
watch(() => props.visible, (newVisible) => {
  if (newVisible) {
    optimizeInstruction.value = ''
    optimizedPrompt.value = ''
    optimizationSuggestions.value = null
    isOptimizing.value = false
  }
})

// 快捷选项处理
const handleQuickOption = (type) => {
  switch (type) {
    case 'auto':
      optimizeInstruction.value = '全面优化这个研究提示词，使其更符合学术研究标准，包含详细的方法论指导、理论背景和实践步骤，帮助研究者获得更深入的专业指导'
      break
    case 'clear':
      optimizeInstruction.value = '优化提示词的结构和逻辑，使其更加清晰明确，包含具体的研究步骤和操作指南，便于研究者理解和执行'
      break
    case 'professional':
      optimizeInstruction.value = '提升提示词的学术专业性，使用准确的研究术语和方法论表达，结合相关理论框架和最新研究进展，符合学术论文写作标准'
      break
  }
  handleOptimize()
}

// 处理建议数据的格式化
const processSuggestions = (suggestions) => {
  if (!suggestions) return null
  
  // 如果已经是数组，直接返回
  if (Array.isArray(suggestions)) {
    return suggestions
  }
  
  // 如果是字符串，尝试解析
  if (typeof suggestions === 'string') {
    // 尝试解析JSON数组格式的字符串
    try {
      const parsed = JSON.parse(suggestions)
      if (Array.isArray(parsed)) {
        return parsed
      }
    } catch (e) {
      // JSON解析失败，继续处理
    }
    
    // 检查是否是数组格式的字符串 (如 "[\"建议1\", \"建议2\"]")
    const arrayMatch = suggestions.match(/^\s*\[(.*)\]\s*$/)
    if (arrayMatch) {
      try {
        const parsed = JSON.parse(suggestions)
        if (Array.isArray(parsed)) {
          return parsed
        }
      } catch (e) {
        // 如果JSON解析失败，尝试手动分割
        const content = arrayMatch[1]
        const items = content.split(/,\s*(?=")/g)
          .map(item => item.replace(/^"(.*)"$/, '$1').trim())
          .filter(item => item.length > 0)
        
        if (items.length > 0) {
          return items
        }
      }
    }
    
    // 尝试按行或分号分割
    const lines = suggestions.split(/\n|;/).map(line => line.trim()).filter(line => line.length > 0)
    if (lines.length > 1) {
      return lines
    }
    
    // 返回原字符串
    return suggestions
  }
  
  // 其他情况返回原值
  return suggestions
}

// 处理优化请求
const handleOptimize = async () => {
  if (!optimizeInstruction.value.trim() || isOptimizing.value) return
  
  isOptimizing.value = true
  optimizedPrompt.value = ''
  optimizationSuggestions.value = null
  
  try {
    // 构建发送给coze的消息
    const optimizeMessage = `你是一位资深的学术研究指导专家，专门帮助科研工作者优化他们的研究提示词和问题。请根据以下要求专业地润色提示词，使其更符合学术研究的标准和深度。

【背景信息】
- 这是一个面向科研工作者的MethodMate研究助手项目
- 用户主要从事定量研究、HCI（人机交互）、实验设计等学术研究
- 需要提供专业、详细、可操作的研究指导

【原始提示词】
${props.originalPrompt}

【润色要求】
${optimizeInstruction.value}

【润色标准】
1. 学术专业性：使用准确的学术术语和研究方法论
2. 详细程度：提供具体的操作指导和理论背景
3. 结构化：逻辑清晰，层次分明
4. 实用性：包含具体的步骤、方法或案例参考
5. 前沿性：结合最新的研究趋势和方法

【输出要求】
请返回JSON格式，包含以下字段：
- optimizedPrompt: 润色后的专业研究提示词（详细、结构化、包含具体指导）
- suggestions: 优化建议数组，每条建议说明优化的理由和学术依据

示例输出格式：
{
  "optimizedPrompt": "详细的专业研究提示词...",
  "suggestions": [
    "建议1：说明学术理由",
    "建议2：说明方法论依据",
    "建议3：说明实践指导价值"
  ]
}

请确保润色后的提示词能够帮助研究者获得更深入、更专业的研究指导。`
    
    console.log('开始润色提示词:', optimizeMessage)
    
    // 发送到coze agent
    const result = await sendSilentMessageToCoze(optimizeMessage, [])
    
    console.log('润色结果:', result)
    
    // 解析结果
    await parseOptimizeResult(result)
    
  } catch (error) {
    console.error('润色提示词失败:', error)
    optimizedPrompt.value = '润色失败，请重试'
  } finally {
    isOptimizing.value = false
  }
}

// 解析优化结果
const parseOptimizeResult = async (result) => {
  let parsedResult = null
  
  try {
    // 尝试提取JSON
    const jsonMatch = result.match(/```json\s*([\s\S]*?)\s*```/i) || result.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      let jsonStr = jsonMatch[1] || jsonMatch[0]
      // 清理JSON字符串
      jsonStr = jsonStr
        .replace(/,\s*}/g, '}')
        .replace(/,\s*]/g, ']')
        .replace(/:\s*,/g, ': null,')
        .replace(/"\s*:\s*,/g, '": null,')
        .replace(/,\s*,/g, ',')
        .trim()
      
      parsedResult = JSON.parse(jsonStr)
    }
  } catch (error) {
    console.log('JSON解析失败，尝试其他方法:', error.message)
  }
  
  if (parsedResult && typeof parsedResult === 'object') {
    // 成功解析JSON
    optimizedPrompt.value = parsedResult.optimizedPrompt || parsedResult.output || parsedResult.result || ''
    
    // 处理建议数据 - 可能是字符串、数组或其他格式
    const suggestions = parsedResult.suggestions || parsedResult.explanation || ''
    optimizationSuggestions.value = processSuggestions(suggestions)
  } else {
    // 如果JSON解析失败，直接使用结果作为优化后的提示词
    optimizedPrompt.value = result.trim()
  }
  
  // 如果优化后的提示词为空或与原始提示词相同，使用原始结果
  if (!optimizedPrompt.value || optimizedPrompt.value === props.originalPrompt) {
    optimizedPrompt.value = result.trim()
  }
}

// 处理取消
const handleCancel = () => {
  emit('close')
}

// 处理替换
const handleReplace = () => {
  if (optimizedPrompt.value) {
    emit('replace', optimizedPrompt.value)
    emit('close')
  }
}
</script>

<style scoped>
/* 自定义滚动条样式 */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c5c5c5;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style> 