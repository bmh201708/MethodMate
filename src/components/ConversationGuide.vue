<template>
  <div class="mb-4">
    <div class="flex flex-wrap gap-2 items-center">
      <!-- 提示词按钮 -->
      <template v-for="(prompt, index) in currentPrompts" :key="index">
        <button
          @click="handlePromptClick(prompt)"
          class="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors whitespace-nowrap"
        >
          {{ prompt }}
        </button>
      </template>
      
      <!-- 换一批按钮 -->
      <button
        @click="handleRefresh"
        class="flex items-center space-x-1 px-3 py-1.5 border border-purple-300 text-purple-600 hover:bg-purple-50 text-sm rounded-full transition-colors whitespace-nowrap ml-2"
      >
        <span>Refresh</span>
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 接收父组件传递的方法
const emit = defineEmits(['sendPrompt'])

// 首页必显示的提示词
const firstPrompt = 'What is quantitative research?'

// 其他提示词
const otherPrompts = [
  'Recommend latest HCI research',
  'What are the common types of variables?',
  'What are the data collection methods?',
  'Beginner-friendly quantitative research examples',
  'Recommend classic quantitative research in HCI',
  'Common experimental designs in human-computer interaction',
  'What measurement indicators are suitable for HCI?',
  'How to evaluate differences in user experience?',
  'Help me find an experimental study on user behavior',
  'Which statistical methods are suitable for analyzing group differences?',
  'How to choose appropriate significance tests?',
  'Difference between descriptive and inferential statistics?',
  'How to visualize experimental results?',
  'How to report p-values and effect sizes?',
  'Help me draft research background',
  'How to describe participant information?',
  'What are the key points in writing the methods section?'
]

// 所有提示词（用于轮换显示）
const allPrompts = [firstPrompt, ...otherPrompts]

// 当前批次索引
const currentBatchIndex = ref(0)
// 每批显示的提示词数量
const promptsPerBatch = 3

// 当前显示的提示词
const currentPrompts = computed(() => {
  if (currentBatchIndex.value === 0) {
    // 第一批：第一个位置固定显示首页提示词，其他两个从其他提示词中选择
    return [
      firstPrompt,
      otherPrompts[0],
      otherPrompts[1]
    ]
  } else {
    // 其他批次：从所有提示词中按批次选择（跳过前3个，因为第一批已经用了）
    const adjustedIndex = currentBatchIndex.value - 1
    const startIndex = 3 + adjustedIndex * promptsPerBatch
    return allPrompts.slice(startIndex, startIndex + promptsPerBatch)
  }
})

// 处理提示词点击
const handlePromptClick = (prompt) => {
  emit('sendPrompt', prompt)
}

// 处理换一批
const handleRefresh = () => {
  // 总批次数：第一批(3个) + 剩余提示词的批次数
  const remainingPrompts = allPrompts.length - 3 // 减去第一批使用的3个
  const remainingBatches = Math.ceil(remainingPrompts / promptsPerBatch)
  const totalBatches = 1 + remainingBatches // 第一批 + 剩余批次
  
  currentBatchIndex.value = (currentBatchIndex.value + 1) % totalBatches
}
</script> 