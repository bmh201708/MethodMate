<template>
  <div :class="['flex flex-col md:flex-row items-center rounded-2xl shadow-lg p-6 mb-6', gradient, 'w-full h-full']">
    <!-- 左侧大图（更大，尽量完整展示） -->
    <div class="w-full md:w-2/3 h-full flex items-center justify-center">
      <img :src="image" alt="Feature Preview" class="w-full h-[28vh] md:h-[36vh] object-contain rounded-xl transition-all duration-500 bg-white/30" />
    </div>
    <!-- 右侧内容（大字号，宽度适中） -->
    <div class="flex-1 text-left flex flex-col justify-center h-full md:pl-8">
      <h3 class="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow">{{ title }}</h3>
      <ul class="list-disc pl-6 space-y-3 text-white/90 text-lg md:text-xl">
        <li v-for="(desc, idx) in descList" :key="idx">{{ desc }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// props: image, gradient, title, descList
const props = defineProps({
  image: String,
  gradient: String,
  title: String,
  descList: Array
})
</script> 