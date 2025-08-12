<template>
  <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-3xl shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden transform transition-all duration-300">
      <!-- Header -->
      <div class="px-8 py-6 border-b border-gray-100">
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-semibold text-gray-900">Polish Prompt</h3>
          <button @click="handleCancel" class="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-xl hover:bg-gray-100">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Content Area -->
      <div class="px-8 py-6 max-h-[60vh] overflow-y-auto">
        <!-- Input Box -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-3">Custom Optimization Requirements (Optional)</label>
          <div class="relative">
            <input
              v-model="optimizeInstruction"
              type="text"
              placeholder="How would you like to polish the prompt? Leave empty to use default professional polishing..."
              class="w-full rounded-2xl border border-gray-200 px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              @keyup.enter="handleOptimize"
              :disabled="isOptimizing"
            />
            <button
              @click="handleOptimize"
              :disabled="isOptimizing"
              class="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Original Prompt -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-3">Original Prompt</label>
          <div class="bg-gray-50 rounded-2xl p-4 border border-gray-200">
            <p class="text-gray-800 text-sm leading-relaxed">{{ originalPrompt }}</p>
          </div>
        </div>

        <!-- Polish Result -->
        <div v-if="optimizedPrompt || isOptimizing" class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-3">Polished Prompt</label>
          <div class="bg-purple-50 rounded-2xl border border-purple-200">
            <div v-if="isOptimizing" class="flex items-center space-x-3 p-4">
              <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
              <span class="text-sm text-purple-700 font-medium">Polishing...</span>
            </div>
            <textarea
              v-else
              v-model="optimizedPrompt"
              class="w-full p-4 bg-transparent text-gray-800 text-sm leading-relaxed resize-none focus:outline-none placeholder-gray-500"
              rows="8"
              placeholder="The polished prompt will be displayed here, you can edit it directly..."
            ></textarea>
          </div>
        </div>

        <!-- Polish Suggestions -->
        <div v-if="optimizationSuggestions" class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-3">💡 Optimization Suggestions</label>
          <div class="bg-purple-50 rounded-2xl p-4 border border-purple-200">
            <!-- If suggestions are in array format -->
            <ul v-if="Array.isArray(optimizationSuggestions)" class="space-y-3">
              <li v-for="(suggestion, index) in optimizationSuggestions" :key="index" 
                  class="flex items-start space-x-3">
                <span class="flex-shrink-0 w-6 h-6 bg-purple-200 text-purple-800 text-xs rounded-full flex items-center justify-center font-semibold mt-0.5">
                  {{ index + 1 }}
                </span>
                <span class="text-gray-800 text-sm leading-relaxed">{{ suggestion }}</span>
              </li>
            </ul>
            <!-- If suggestions are in string format -->
            <p v-else class="text-gray-800 text-sm whitespace-pre-wrap leading-relaxed">{{ optimizationSuggestions }}</p>
          </div>
        </div>
      </div>

      <!-- Bottom Buttons -->
      <div class="px-8 py-6 border-t border-gray-100 flex justify-end space-x-3">
        <button
          @click="handleCancel"
          class="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-2xl transition-colors font-medium"
        >
          Cancel
        </button>
        <button
          @click="handleReplace"
          :disabled="!optimizedPrompt"
          class="px-6 py-3 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center space-x-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          <span>Replace</span>
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

// Reactive data
const optimizeInstruction = ref('')
const optimizedPrompt = ref('')
const optimizationSuggestions = ref(null) // Can be string or array
const isOptimizing = ref(false)

// Watch display state changes, reset data
watch(() => props.visible, (newVisible) => {
  if (newVisible) {
    optimizeInstruction.value = ''
    optimizedPrompt.value = ''
    optimizationSuggestions.value = null
    isOptimizing.value = false
  }
})

// Handle suggestion data formatting
const processSuggestions = (suggestions) => {
  if (!suggestions) return null
  
  // If already an array, return directly
  if (Array.isArray(suggestions)) {
    return suggestions
  }
  
  // If it's a string, try to parse
  if (typeof suggestions === 'string') {
    // Try to parse JSON array format string
    try {
      const parsed = JSON.parse(suggestions)
      if (Array.isArray(parsed)) {
        return parsed
      }
    } catch (e) {
      // JSON parsing failed, continue processing
    }
    
    // Check if it's an array format string (like "[\"suggestion1\", \"suggestion2\"]")
    const arrayMatch = suggestions.match(/^\s*\[(.*)\]\s*$/)
    if (arrayMatch) {
      try {
        const parsed = JSON.parse(suggestions)
        if (Array.isArray(parsed)) {
          return parsed
        }
      } catch (e) {
        // If JSON parsing fails, try manual splitting
        const content = arrayMatch[1]
        const items = content.split(/,\s*(?=")/g)
          .map(item => item.replace(/^"(.*)"$/, '$1').trim())
          .filter(item => item.length > 0)
        
        if (items.length > 0) {
          return items
        }
      }
    }
    
    // Try splitting by lines or semicolons
    const lines = suggestions.split(/\n|;/).map(line => line.trim()).filter(line => line.length > 0)
    if (lines.length > 1) {
      return lines
    }
    
    // Return original string
    return suggestions
  }
  
  // Return original value in other cases
  return suggestions
}

// 处理优化请求
const handleOptimize = async () => {
  if (isOptimizing.value) return
  
  isOptimizing.value = true
  optimizedPrompt.value = ''
  optimizationSuggestions.value = null
  
  try {
    // If user hasn't input custom requirements, use default professional polishing
    const finalInstruction = optimizeInstruction.value.trim() || 
      'Enhance the academic professionalism of the prompt, use accurate research terminology and methodological expressions, combine relevant theoretical frameworks and latest research developments, comply with academic paper writing standards'
    
    // Build message to send to coze
    const optimizeMessage = `你是一位资深的学术研究指导专家，专门帮助科研工作者优化他们的研究提示词和问题。请根据以下要求专业地润色提示词，使其更符合学术研究的标准和深度。

【背景信息】
- 这是一个面向科研工作者的MethodMate研究助手项目
- 用户主要从事定量研究、HCI（人机交互）、实验设计等学术研究
- 用户可能有多种研究需求：生成研究方案、了解研究背景、分析研究方法、探索研究问题等
- 需要提供专业、详细、可操作的指导

【原始提示词】
${props.originalPrompt}

【润色要求】
${finalInstruction}

【润色标准】
1. 学术专业性：使用准确的学术术语和研究方法论表达
2. 详细程度：提供具体的操作指导和理论背景
3. 结构化：逻辑清晰，层次分明
4. 实用性：包含具体的步骤、方法或案例参考
5. 适应性：适合不同类型的研究需求（方案生成、背景了解、方法分析等）
6. 前沿性：结合最新的研究趋势和方法

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

注意：
- 不要假设用户一定要生成研究方案，要根据提示词内容判断用户的真实需求
- 润色后的提示词应该保持原有的核心意图，只是让表达更专业、更学术化
- 确保润色后的提示词能够帮助研究者获得更深入、更专业的指导`
    
    console.log('Starting prompt polishing:', optimizeMessage)
    
    // Send to coze agent
    const result = await sendSilentMessageToCoze(optimizeMessage, [])
    
    console.log('Polish result:', result)
    
    // Parse result
    await parseOptimizeResult(result)
    
  } catch (error) {
    console.error('Prompt polishing failed:', error)
    optimizedPrompt.value = 'Polishing failed, please try again'
  } finally {
    isOptimizing.value = false
  }
}

// Parse optimization result
const parseOptimizeResult = async (result) => {
  let parsedResult = null
  
  try {
    // Try to extract JSON
    const jsonMatch = result.match(/```json\s*([\s\S]*?)\s*```/i) || result.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      let jsonStr = jsonMatch[1] || jsonMatch[0]
      // Clean JSON string
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
    console.log('JSON parsing failed, trying other methods:', error.message)
  }
  
  if (parsedResult && typeof parsedResult === 'object') {
    // Successfully parsed JSON
    optimizedPrompt.value = parsedResult.optimizedPrompt || parsedResult.output || parsedResult.result || ''
    
    // Handle suggestion data - may be string, array or other formats
    const suggestions = parsedResult.suggestions || parsedResult.explanation || ''
    optimizationSuggestions.value = processSuggestions(suggestions)
  } else {
    // If JSON parsing fails, use result directly as polished prompt
    optimizedPrompt.value = result.trim()
  }
  
  // If polished prompt is empty or same as original, use original result
  if (!optimizedPrompt.value || optimizedPrompt.value === props.originalPrompt) {
    optimizedPrompt.value = result.trim()
  }
}

// Handle cancel
const handleCancel = () => {
  emit('close')
}

// Handle replace
const handleReplace = () => {
  if (optimizedPrompt.value) {
    emit('replace', optimizedPrompt.value)
    emit('close')
  }
}
</script>

<style scoped>
/* Custom scrollbar styles */
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

/* Text box styles */
textarea {
  min-height: 120px;
}

textarea:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(147, 51, 234, 0.2);
}
</style> 