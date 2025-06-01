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
            <p :class="['whitespace-pre-wrap', message.isError ? 'text-red-700' : 'text-gray-800']">{{ message.content }}</p>
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

const newMessage = ref('')
const chatContainer = ref(null)

// 发送消息
const handleSendMessage = async () => {
  if (!newMessage.value.trim()) return
  
  const message = newMessage.value
  newMessage.value = ''
  
  await sendMessage(message)
  
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