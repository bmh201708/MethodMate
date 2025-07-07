<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 导航栏 -->
    <NavigationBar />
    
    <!-- 主要内容区域 -->
    <main class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <!-- 页面标题 -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">ChatGPT 对话</h1>
          <p class="text-gray-600">与 GPT-4o 进行智能对话</p>
        </div>
        
        <!-- 聊天组件 -->
        <ChatGPTChat />
      </div>
    </main>
  </div>
</template>

<script setup>
import NavigationBar from '../components/NavigationBar.vue'
import ChatGPTChat from '../components/ChatGPTChat.vue'
</script>

<style scoped>
/* 页面特定样式 */
</style> 