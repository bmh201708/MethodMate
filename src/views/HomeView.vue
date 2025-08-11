<template>
  <div class="min-h-screen bg-gray-50 overflow-hidden">
    <div class="container mx-auto px-4 py-16 sm:py-24">
      
      <!-- Header Section -->
      <header class="text-center mb-16 sm:mb-20">
        <h1 class="text-5xl md:text-6xl font-bold text-gray-900">MethodMate</h1>
        <p class="mt-4 text-lg md:text-xl text-gray-600">Intelligent Research Methods and Literature Recommendations</p>
        <p class="mt-2 text-base text-gray-500">One-stop Academic Research Assistant for Efficient Research</p>
      </header>

      <!-- Features Section -->
      <main class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        
        <!-- Literature Recommendation Card -->
        <div class="relative bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
          <!-- Watermark Icon -->
          <img :src="homeIcon1" alt="" class="absolute top-0 left-0 w-48 h-48 opacity-50 mix-blend-luminosity" />
          
          <div class="p-8 z-10">
            <div class="flex justify-between items-center">
              <!-- Left Content -->
              <div>
                <h2 class="text-3xl font-bold text-gray-800">Literature Recommendation</h2>
                <ul class="mt-4 space-y-2 text-gray-600 text-lg">
                  <li v-for="(item, index) in literatureFeatures" :key="index" class="flex items-center">
                    <svg class="w-6 h-6 text-purple-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
              <!-- Right Button -->
              <button @click="goTo('/papers')" class="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center text-base flex-shrink-0">
                Try Now
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </button>
            </div>
          </div>
          <div class="bg-gray-50 p-4 mt-auto z-10">
            <img :src="homeFeature1" alt="Literature Recommendation Feature Screenshot" class="rounded-lg shadow-inner w-full">
          </div>
        </div>

        <!-- Research Plan Card -->
        <div class="relative bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
          <!-- Watermark Icon -->
          <img :src="homeIcon2" alt="" class="absolute top-0 left-0 w-48 h-48 opacity-50 mix-blend-luminosity" />

          <div class="p-8 z-10">
             <div class="flex justify-between items-center">
              <!-- Left Content -->
              <div>
                <h2 class="text-3xl font-bold text-gray-800">Research Plan</h2>
                <ul class="mt-4 space-y-2 text-gray-600 text-lg">
                  <li v-for="(item, index) in planFeatures" :key="index" class="flex items-center">
                    <svg class="w-6 h-6 text-indigo-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
              <!-- Right Button -->
              <button @click="goTo('/research-plan')" class="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center text-base flex-shrink-0">
                Try Now
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </button>
            </div>
          </div>
          <div class="bg-gray-50 p-4 mt-auto z-10">
            <img :src="homeFeature2" alt="Research Plan Feature Screenshot" class="rounded-lg shadow-inner w-full">
          </div>
        </div>

      </main>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import homeIcon1 from '../images/home-icon-1.png'
import homeIcon2 from '../images/home-icon-2.png'
import homeFeature1 from '../images/home-feature-1.png'
import homeFeature2 from '../images/home-feature-2.png'

const router = useRouter()

const literatureFeatures = [
  'Input research objectives and content',
  'Automatically recommend relevant literature with generated lists',
  'View abstracts and AI-extracted quantitative research information'
]

const planFeatures = [
  'Automatically generate quantitative research plans',
  'Support multi-round evaluation and module-level optimization',
  'Provide literature correspondence for traceability'
]

const goTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
/* You can add additional styles here if needed, but Tailwind should cover most cases. */
</style>
