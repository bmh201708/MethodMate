<template>
  <div class="mb-4">
    <div class="flex flex-wrap gap-2 items-center">
      <!-- Prompt Buttons -->
      <template v-for="(prompt, index) in currentPrompts" :key="index">
        <button
          @click="handlePromptClick(prompt)"
          class="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors whitespace-nowrap"
        >
          {{ prompt }}
        </button>
      </template>
      
      <!-- Change Batch Button -->
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

// Receive methods passed from parent component
const emit = defineEmits(['sendPrompt'])

// Prompt that must be displayed on homepage
const firstPrompt = 'What is quantitative research?'

// Other prompts
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

// All prompts (for rotation display)
const allPrompts = [firstPrompt, ...otherPrompts]

// Current batch index
const currentBatchIndex = ref(0)
// Number of prompts displayed per batch
const promptsPerBatch = 3

// Currently displayed prompts
const currentPrompts = computed(() => {
  if (currentBatchIndex.value === 0) {
    // First batch: first position fixed for homepage prompt, other two selected from other prompts
    return [
      firstPrompt,
      otherPrompts[0],
      otherPrompts[1]
    ]
  } else {
    // Other batches: select from all prompts by batch (skip first 3, as first batch already used)
    const adjustedIndex = currentBatchIndex.value - 1
    const startIndex = 3 + adjustedIndex * promptsPerBatch
    return allPrompts.slice(startIndex, startIndex + promptsPerBatch)
  }
})

// Handle prompt click
const handlePromptClick = (prompt) => {
  emit('sendPrompt', prompt)
}

// Handle change batch
const handleRefresh = () => {
  // Total batch count: first batch (3) + batch count of remaining prompts
  const remainingPrompts = allPrompts.length - 3 // Subtract 3 used in first batch
  const remainingBatches = Math.ceil(remainingPrompts / promptsPerBatch)
  const totalBatches = 1 + remainingBatches // First batch + remaining batches
  
  currentBatchIndex.value = (currentBatchIndex.value + 1) % totalBatches
}
</script> 