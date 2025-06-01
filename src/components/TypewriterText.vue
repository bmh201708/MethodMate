<template>
  <span>{{ displayText }}</span>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  speed: {
    type: Number,
    default: 50
  }
});

const displayText = ref('');
let currentIndex = 0;
let timer = null;

const typeText = () => {
  if (currentIndex < props.text.length) {
    displayText.value += props.text[currentIndex];
    currentIndex++;
    timer = setTimeout(typeText, props.speed);
  }
};

watch(() => props.text, (newText) => {
  clearTimeout(timer);
  displayText.value = '';
  currentIndex = 0;
  if (newText) {
    typeText();
  }
}, { immediate: true });
</script> 