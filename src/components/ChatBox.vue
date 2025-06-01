<template>
  <div class="bg-white rounded-xl shadow-sm p-6 h-full">
    <div class="flex flex-col h-full">
      <!-- 聊天记录 -->
      <div class="flex-1 overflow-y-auto mb-4 space-y-4" ref="chatContainer">
        <div v-for="message in chatState.messages" :key="message.id" 
             :class="['flex', message.type === 'user' ? 'justify-end' : 'justify-start']">
          <div :class="['max-w-[70%] rounded-lg p-4', 
                       message.type === 'user' ? 'bg-purple-100' : 
                       message.isError ? 'bg-red-50 border border-red-200' : 'bg-gray-100']">
            <p :class="['whitespace-pre-wrap', message.isError ? 'text-red-700' : 'text-gray-800']">{{ getDisplayContent(message) }}</p>
          </div>
        </div>
        <!-- 加载动画 -->
        <div v-if="chatState.isLoading" class="flex justify-start">
          <div class="max-w-[70%] rounded-lg p-4 bg-gray-100">
            <LoadingDots />
          </div>
        </div>
      </div>

      <!-- 输入框 -->
      <div class="flex items-center space-x-4">
        <input
          v-model="newMessage"
          type="text"
          placeholder="请输入您的问题..."
          class="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          @keyup.enter="handleSendMessage"
          :disabled="chatState.isLoading"
        />
        <button
          @click="handleSendMessage"
          class="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="chatState.isLoading"
        >
          发送
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { chatState, sendMessage } from '../stores/chatStore'
import LoadingDots from './LoadingDots.vue'

// 接收页面上下文的props
const props = defineProps({
  pageContext: {
    type: String,
    default: null
  }
})

const newMessage = ref('')
const chatContainer = ref(null)

// 处理消息显示内容
const getDisplayContent = (message) => {
  // 如果是用户消息或错误消息，直接返回原内容
  if (message.type === 'user' || message.isError) {
    return message.content
  }
  
  // 如果是助手消息，尝试解析JSON并提取output和otherIntention
  if (message.type === 'assistant') {
    try {
      // 首先尝试从代码块中提取JSON
      const jsonMatch = message.content.match(/```json\s*([\s\S]*?)\s*```/i) || message.content.match(/\{[\s\S]*\}/)
      
      if (jsonMatch) {
        let jsonStr = jsonMatch[1] || jsonMatch[0]
        
        // 增强的JSON修复逻辑
        jsonStr = jsonStr
          .replace(/,\s*}/g, '}')  // 移除对象末尾的多余逗号
          .replace(/,\s*]/g, ']')  // 移除数组末尾的多余逗号
          .replace(/:\s*,/g, ': null,')  // 将空值替换为null
          .replace(/"\s*:\s*,/g, '": null,')  // 处理 "key": , 的情况
          .replace(/,\s*,/g, ',')  // 移除连续的逗号
          .replace(/}\s*}+$/g, '}')  // 移除末尾多余的花括号
          .replace(/^{+/g, '{')  // 移除开头多余的花括号
          .trim()
        
        console.log('尝试解析的JSON字符串:', jsonStr)
        
        let jsonData = null
        
        // 尝试多种解析方法
        try {
          jsonData = JSON.parse(jsonStr)
        } catch (e1) {
          console.log('第一次解析失败:', e1.message)
          
          // 尝试修复更复杂的格式问题
          try {
            // 尝试找到最后一个完整的JSON对象
            const braceCount = (str, char) => (str.match(new RegExp('\\' + char, 'g')) || []).length
            let openBraces = braceCount(jsonStr, '{')
            let closeBraces = braceCount(jsonStr, '}')
            
            if (openBraces > closeBraces) {
              // 缺少结束花括号
              jsonStr += '}'.repeat(openBraces - closeBraces)
            } else if (closeBraces > openBraces) {
              // 多余的结束花括号，从末尾移除
              const excess = closeBraces - openBraces
              for (let i = 0; i < excess; i++) {
                jsonStr = jsonStr.replace(/}([^}]*)$/, '$1')
              }
            }
            
            console.log('修复后的JSON字符串:', jsonStr)
            jsonData = JSON.parse(jsonStr)
          } catch (e2) {
            console.log('第二次解析也失败:', e2.message)
            
            // 最后尝试：提取可识别的字段
            try {
              const outputMatch = jsonStr.match(/"output"\s*:\s*"([^"]*)"/)
              const otherMatch = jsonStr.match(/"(?:otherIntention|otherInthtion)"\s*:\s*"([^"]*)"/)
              
              if (outputMatch || otherMatch) {
                jsonData = {
                  output: outputMatch ? outputMatch[1] : '',
                  otherIntention: otherMatch ? otherMatch[1] : ''
                }
                console.log('通过正则表达式提取的数据:', jsonData)
              }
            } catch (e3) {
              console.log('正则提取也失败:', e3.message)
            }
          }
        }
        
        // 如果解析成功，提取display内容
        if (jsonData && typeof jsonData === 'object') {
          const output = jsonData.output || ''
          const otherIntention = jsonData.otherIntention || jsonData.otherInthtion || '' // 兼容拼写错误
          
          // 构建显示内容：拼接output和otherIntention
          const contentParts = []
          
          if (otherIntention && otherIntention.trim()) {
            contentParts.push(otherIntention.trim())
          }
          
          if (output && output.trim()) {
            contentParts.push(output.trim())
          }
          
          // 如果有任何一个字段有内容，返回拼接结果
          if (contentParts.length > 0) {
            console.log('成功提取显示内容:', contentParts.join('\n\n'))
            return contentParts.join('\n\n')
          }
        }
      }
    } catch (error) {
      // JSON解析失败，返回原内容
      console.log('JSON解析完全失败，显示原始内容:', error.message)
    }
  }
  
  // 默认返回原内容
  return message.content
}

// 发送消息
const handleSendMessage = async () => {
  if (!newMessage.value.trim()) return
  
  const message = newMessage.value
  newMessage.value = ''
  
  // 传递页面上下文给sendMessage方法
  await sendMessage(message, props.pageContext)
  
  // 自动滚动到底部
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}

// 监听消息变化，自动滚动
watch(() => chatState.messages.length, () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
})
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