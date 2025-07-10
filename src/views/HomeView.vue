<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- 顶部简介（无logo，放大标题） -->
    <header class="text-center py-16">
      <h1 class="text-5xl md:text-6xl font-extrabold mb-4">MethodMate</h1>
      <p class="text-2xl text-gray-700 mb-2">让科研方法与文献推荐更智能</p>
      <p class="text-gray-500">一站式学术研究助手，助力高效科研</p>
    </header>

    <!-- 主按钮区 -->
    <div class="flex justify-center gap-8 mb-8">
      <button @click="router.push('/papers')" class="px-8 py-4 bg-blue-600 text-white rounded-full text-lg font-semibold shadow hover:bg-blue-700 transition">从文献推荐开始</button>
      <button @click="router.push('/research-plan')" class="px-8 py-4 bg-green-600 text-white rounded-full text-lg font-semibold shadow hover:bg-green-700 transition">从研究方案开始</button>
    </div>

    <!-- 横向Tab导航（移到按钮下方） -->
    <div class="flex justify-center gap-4 mb-10 flex-wrap">
      <button
        v-for="(tab, idx) in tabs"
        :key="tab.key"
        @click="activeTab = idx"
        :class="[
          'px-6 py-2 rounded-full font-semibold text-lg transition',
          activeTab === idx
            ? 'bg-blue-600 text-white shadow'
            : 'bg-white text-gray-700 border border-gray-200 hover:bg-blue-50'
        ]"
      >
        {{ tab.title }}
      </button>
    </div>

    <!-- 当前选中功能卡片（更大宽度，统一渐变色） -->
    <section class="flex-1 flex items-start justify-center mb-16">
      <transition name="fade-slide" mode="out-in">
        <div
          v-if="tabs[activeTab]"
          :key="tabs[activeTab].key"
          class="w-[98vw] md:w-[90vw] h-[40vh] max-w-7xl flex items-center justify-center"
        >
          <FeatureCard
            :image="tabs[activeTab].image"
            gradient="bg-gradient-to-b from-blue-500 to-blue-100"
            :title="tabs[activeTab].title"
            :descList="tabs[activeTab].descList"
            class="w-full h-full"
          />
        </div>
      </transition>
    </section>

    <!-- 页脚 -->
    <footer class="text-center text-gray-400 py-4 text-sm">
      © 2024 MethodMate 团队
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import FeatureCard from '../components/FeatureCard.vue'

const router = useRouter()

const tabs = [
  {
    key: 'paper',
    title: '文献推荐',
    image: '/src/images/paper-recommand.jpg',
    descList: [
      '智能对话提取关键词',
      '相关文献精准查询',
      '支持研究方法预览'
    ]
  },
  {
    key: 'plan',
    title: '研究方案',
    image: '/src/images/research-plan.jpg',
    descList: [
      'AI生成定量研究方案',
      '方案评估与一键迭代',
      '方案来源、方法、统计方法查询'
    ]
  },
  {
    key: 'search',
    title: '学术搜索',
    image: '/src/images/scholar-search.jpg',
    descList: [
      '直接检索所需论文',
      '多条件筛选与排序',
      '高效定位学术资源'
    ]
  },
  {
    key: 'ref',
    title: '引用管理',
    image: '/src/images/referrence-paper.jpg',
    descList: [
      '集中查看已引用论文',
      '便捷管理引用列表',
      '支持引用内容预览'
    ]
  },
  {
    key: 'history',
    title: '历史方案',
    image: '/src/images/history-plan.jpg',
    descList: [
      '浏览历史生成方案',
      '快速应用与对比',
      '方案内容一键复用'
    ]
  }
]

const activeTab = ref(0)
</script>

<style>
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.5s cubic-bezier(0.4,0,0.2,1);
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(40px) scale(0.98);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-40px) scale(0.98);
}
</style>