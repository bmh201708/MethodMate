<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- 顶部导航栏 -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-8">
            <button
              @click="router.push('/')"
              class="text-gray-600 hover:text-gray-900 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              首页
            </button>
            <h1 class="text-2xl font-bold text-gray-900">MethodMate</h1>
            <div class="flex space-x-4">
              <button
                @click="router.push('/papers')"
                class="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium"
                :class="{ 'text-purple-600 border-b-2 border-purple-600': currentSection === 'papers' }"
              >
                相关文献
              </button>
              <button
                @click="router.push('/research-plan')"
                class="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium"
                :class="{ 'text-purple-600 border-b-2 border-purple-600': currentSection === 'research-plan' }"
              >
                定量研究方案
              </button>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              新建方案
            </button>
            <button
              @click="router.push('/history-plans')"
              class="px-4 py-2 bg-white text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
            >
              历史方案
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="flex-1 max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-12 gap-8">
        <!-- 左侧聊天框 -->
        <div class="col-span-3 h-[calc(100vh-8rem)]">
          <ChatBox />
        </div>

        <!-- 研究方案详情 -->
        <div class="col-span-9">
          <div class="bg-white rounded-xl shadow-sm p-8">
            <div class="space-y-8">
              <!-- 实验方案部分 -->
              <div class="bg-white rounded-xl shadow-sm p-8">
                <!-- 方案导航按钮 -->
                <div class="flex space-x-4 mb-8">
                  <button
                    v-for="section in sections"
                    :key="section.id"
                    @click="activeSection = section.id"
                    class="px-4 py-2 rounded-lg font-medium transition-colors"
                    :class="[
                      activeSection === section.id
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    ]"
                  >
                    {{ section.name }}
                  </button>
                </div>

                <!-- 各部分内容 -->
                <div v-if="activeSection === 'full'">
                  <h2 class="text-2xl font-bold text-gray-900 mb-6">{{ plan.title }}</h2>
                  <div class="space-y-6">
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900 mb-3">研究问题</h3>
                      <p class="text-gray-600 leading-relaxed">{{ plan.researchQuestions }}</p>
                    </div>
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900 mb-3">研究方法</h3>
                      <p class="text-gray-600 leading-relaxed">{{ plan.methodology }}</p>
                    </div>
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900 mb-3">数据收集</h3>
                      <p class="text-gray-600 leading-relaxed">{{ plan.dataCollection }}</p>
                    </div>
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900 mb-3">分析方法</h3>
                      <p class="text-gray-600 leading-relaxed">{{ plan.analysisMethod }}</p>
                    </div>
                  </div>
                </div>
                <div v-if="activeSection === 'hypothesis'">
                  <h2 class="text-2xl font-bold text-gray-900 mb-6">研究假设</h2>
                  <div class="space-y-4">
                    <div v-for="(hypothesis, index) in plan.hypotheses" :key="index" 
                         class="p-4 bg-gray-50 rounded-lg">
                      <p class="text-gray-900">{{ hypothesis }}</p>
                    </div>
                  </div>
                </div>
                <div v-if="activeSection === 'design'">
                  <h2 class="text-2xl font-bold text-gray-900 mb-6">实验设计</h2>
                  <div class="space-y-6">
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900 mb-3">实验流程</h3>
                      <p class="text-gray-600 leading-relaxed">{{ plan.experimentalDesign }}</p>
                    </div>
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900 mb-3">变量控制</h3>
                      <p class="text-gray-600 leading-relaxed">{{ plan.variables }}</p>
                    </div>
                  </div>
                </div>
                <div v-if="activeSection === 'analysis'">
                  <h2 class="text-2xl font-bold text-gray-900 mb-6">数据分析</h2>
                  <div class="space-y-6">
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900 mb-3">分析方法</h3>
                      <p class="text-gray-600 leading-relaxed">{{ plan.analysisMethod }}</p>
                    </div>
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900 mb-3">统计工具</h3>
                      <p class="text-gray-600 leading-relaxed">{{ plan.statisticalTools }}</p>
                    </div>
                  </div>
                </div>
                <div v-if="activeSection === 'results'">
                  <h2 class="text-2xl font-bold text-gray-900 mb-6">结果呈现</h2>
                  <div class="space-y-6">
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900 mb-3">预期结果</h3>
                      <p class="text-gray-600 leading-relaxed">{{ plan.expectedResults }}</p>
                    </div>
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900 mb-3">数据可视化</h3>
                      <p class="text-gray-600 leading-relaxed">{{ plan.visualization }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 来源和方法介绍卡片 -->
              <div class="bg-white rounded-xl shadow-sm p-8">
                <!-- 来源和方法导航按钮 -->
                <div class="flex space-x-4 mb-8 border-b">
                  <button
                    v-for="tab in introTabs"
                    :key="tab.id"
                    @click="activeIntroTab = tab.id"
                    class="px-4 py-2 font-medium transition-colors relative"
                    :class="[
                      activeIntroTab === tab.id
                        ? 'text-purple-600 border-b-2 border-purple-600'
                        : 'text-gray-600 hover:text-gray-900'
                    ]"
                  >
                    {{ tab.name }}
                  </button>
                </div>

                <!-- 来源介绍内容 -->
                <div v-if="activeIntroTab === 'source'" class="space-y-4">
                  <p class="text-gray-600 leading-relaxed">
                    {{ plan[activeSection].sourceIntro }}
                  </p>
                </div>

                <!-- 方法介绍内容 -->
                <div v-if="activeIntroTab === 'method'" class="space-y-4">
                  <p class="text-gray-600 leading-relaxed">
                    {{ plan[activeSection].methodIntro }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ChatBox from '../components/ChatBox.vue'

const router = useRouter()
const currentSection = ref('research-plan')
const activeSection = ref('full')
const activeIntroTab = ref('source')

const sections = [
  { id: 'full', name: '完整方案' },
  { id: 'hypothesis', name: '研究假设' },
  { id: 'design', name: '实验设计' },
  { id: 'analysis', name: '数据分析' },
  { id: 'results', name: '结果呈现' }
]

const introTabs = [
  { id: 'source', name: '来源介绍' },
  { id: 'method', name: '方法介绍' }
]

// 研究方案数据
const plan = ref({
  title: 'AI-Edited Images and Videos Impact on Human Memory',
  researchQuestions: 'AI编辑的图像与视频如何影响人类记忆形成和回忆的准确性？这种影响与传统媒体的影响有何不同？',
  methodology: '采用混合研究方法，结合实验研究和问卷调查。实验组和对照组将分别接触AI编辑和传统编辑的媒体内容。',
  dataCollection: '通过在线实验平台收集数据，参与者将完成记忆测试和问卷调查。使用眼动追踪技术记录参与者观看内容时的注意力分配。',
  analysisMethod: '使用SPSS进行定量分析，包括方差分析(ANOVA)和多元回归分析。质性数据将通过主题分析方法进行编码和分析。',
  hypotheses: [
    'H1: 接触AI编辑的媒体内容会导致更高的虚假记忆形成率。',
    'H2: AI编辑内容的不确定性特征会增加记忆失真的程度。',
    'H3: 参与者的媒体素养水平会调节AI编辑内容对记忆的影响。'
  ],
  experimentalDesign: '采用2x2混合实验设计，操纵媒体类型（AI编辑 vs. 传统编辑）和呈现方式（静态 vs. 动态）。',
  variables: '自变量：媒体类型、呈现方式；因变量：记忆准确度、虚假记忆比率；控制变量：媒体素养、年龄、教育背景。',
  statisticalTools: 'SPSS 26.0, R Studio, Python数据分析包（pandas, numpy, scipy）',
  expectedResults: '预期AI编辑的媒体内容会导致更高的虚假记忆形成率，且这种效应会被参与者的媒体素养水平调节。',
  visualization: '使用ggplot2创建交互效应图，使用Python的seaborn库绘制相关性热图和箱线图。',
  references: [
    {
      id: 1,
      title: 'The Impact of AI-Generated Content on Human Memory Formation',
      authors: ['Smith, J.', 'Johnson, M.']
    },
    {
      id: 2,
      title: 'Digital Media and Memory: A Comprehensive Review',
      authors: ['Brown, R.', 'Davis, K.']
    }
  ],
  full: {
    sourceIntro: 'This paper examines the role that enchantment plays in the design of AI things by constructing a taxonomy of design approaches that increase or decrease the perception of magic and enchantment. We start from the design discourse surrounding recent developments in AI technologies, highlighting specific interaction qualities such as algorithmic uncertainties and errors and articulating relations to the rhetoric of magic and supernatural thinking.',
    methodIntro: 'The research methodology follows a mixed-methods approach, combining experimental research with survey methods. The experimental group and control group will be exposed to AI-edited and traditionally edited media content respectively.'
  },
  hypothesis: {
    sourceIntro: '研究假设的形成基于对现有文献的系统性回顾，特别是关于AI技术对人类认知影响的研究。我们整合了来自认知科学、人工智能和人机交互领域的最新发现。',
    methodIntro: '假设的验证将采用实验研究方法，通过严格控制的实验环境来测试AI编辑内容对记忆形成的影响。实验设计包括前测和后测，以确保结果的可靠性。'
  },
  design: {
    sourceIntro: '实验设计参考了多个经典的记忆研究范式，并结合了最新的AI技术发展特点。设计方案经过专家评审和预实验优化。',
    methodIntro: '采用2x2混合实验设计，操纵媒体类型（AI编辑 vs. 传统编辑）和呈现方式（静态 vs. 动态）。所有实验材料都经过标准化处理。'
  },
  analysis: {
    sourceIntro: '数据分析方法的选择基于近期发表的类似研究，并考虑了数据的特点和研究目标。分析框架经过方法专家的审查和验证。',
    methodIntro: '使用SPSS 26.0进行定量分析，包括描述性统计、方差分析和回归分析。质性数据采用主题编码方法，使用NVivo软件辅助分析。'
  },
  results: {
    sourceIntro: '研究结果的呈现方式参考了领域内顶级期刊的标准，确保数据可视化的清晰性和科学性。',
    methodIntro: '结果呈现采用多种可视化方法，包括交互效应图、热图和箱线图。所有图表都遵循APA格式规范。'
  }
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