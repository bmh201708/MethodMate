<template>
  <div v-if="show" 
       class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
       @click.self="closeDialog">
    <div class="bg-white rounded-3xl shadow-2xl max-w-7xl w-full mx-4 max-h-[90vh] overflow-hidden transform transition-all duration-300">
      <!-- 演示数据提示条 -->
      <div v-if="comparisonData?.isDemoData" 
           class="px-8 py-3 bg-gradient-to-r from-yellow-50 to-orange-50 border-b border-yellow-200">
        <div class="flex items-center justify-center space-x-2">
          <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z"/>
          </svg>
          <span class="text-yellow-800 font-medium">演示模式</span>
          <span class="text-yellow-700 text-sm">这是模拟的对比数据，用于展示功能效果</span>
        </div>
      </div>

      <!-- 头部 -->
      <div class="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">方案迭代对比</h3>
            <div class="flex items-center space-x-4 text-sm text-gray-600">
              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 bg-red-100 rounded-full border border-red-300"></div>
                <span>删除内容</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 bg-green-100 rounded-full border border-green-300"></div>
                <span>新增内容</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 bg-gray-100 rounded-full border border-gray-300"></div>
                <span>未修改</span>
              </div>
            </div>
            <p class="text-gray-600 mt-2 text-sm">
              <span class="font-medium">迭代部分：</span>{{ getSectionDisplayName(comparisonData?.section) }}
              <span class="mx-2">•</span>
              <span class="font-medium">修改字段：</span>{{ changedFieldsText }}
            </p>
          </div>
          <button
            @click="closeDialog"
            class="text-gray-400 hover:text-gray-600 transition-colors p-3 rounded-2xl hover:bg-white/50"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- 内容区域 -->
      <div class="p-8 max-h-[calc(90vh-12rem)] overflow-y-auto">
        <div v-if="comparisonData && fieldDiffs" class="space-y-8">
          <!-- 迭代建议卡片 -->
          <div v-if="comparisonData.suggestion" 
               class="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
            <h4 class="text-lg font-semibold text-amber-800 mb-3 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
              迭代建议
            </h4>
            <div class="text-amber-700 bg-white/60 rounded-xl p-4 font-medium">
              {{ comparisonData.suggestion }}
            </div>
          </div>

          <!-- 字段对比卡片 -->
          <div class="grid grid-cols-1 gap-6">
            <div v-for="(fieldDiff, fieldKey) in fieldDiffs" 
                 :key="fieldKey"
                 class="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              
              <!-- 字段标题 -->
              <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between"
                   :class="fieldDiff.hasChanges ? 'bg-blue-50' : 'bg-gray-50'">
                <h4 class="text-lg font-semibold flex items-center"
                    :class="fieldDiff.hasChanges ? 'text-blue-900' : 'text-gray-700'">
                  <div class="w-2 h-2 rounded-full mr-3"
                       :class="fieldDiff.hasChanges ? 'bg-blue-500' : 'bg-gray-400'"></div>
                  {{ fieldDiff.name }}
                </h4>
                <div class="flex items-center space-x-2">
                  <span v-if="fieldDiff.hasChanges" 
                        class="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                    已修改
                  </span>
                  <span v-else 
                        class="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                    未修改
                  </span>
                </div>
              </div>

              <!-- 对比内容 -->
              <div class="p-6">
                <div v-if="fieldDiff.hasChanges" class="space-y-6">
                  <!-- 修改前后对比视图 -->
                  <div class="grid grid-cols-2 gap-6">
                    <!-- 修改前 -->
                    <div class="space-y-3">
                      <h5 class="text-sm font-semibold text-gray-700 flex items-center">
                        <svg class="w-4 h-4 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        修改前
                      </h5>
                      <div class="bg-red-50 border border-red-200 rounded-xl p-4 text-sm">
                        <div class="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                             v-html="renderMarkdown(getFieldValueDisplay(comparisonData.before, fieldKey))">
                        </div>
                      </div>
                    </div>

                    <!-- 修改后 -->
                    <div class="space-y-3">
                      <h5 class="text-sm font-semibold text-gray-700 flex items-center">
                        <svg class="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        修改后
                      </h5>
                      <div class="bg-green-50 border border-green-200 rounded-xl p-4 text-sm">
                        <div class="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                             v-html="renderMarkdown(getFieldValueDisplay(comparisonData.after, fieldKey))">
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- 详细差异显示 -->
                  <div class="space-y-3">
                    <h5 class="text-sm font-semibold text-gray-700 flex items-center">
                      <svg class="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                      </svg>
                      详细变更
                    </h5>
                    <div class="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <div class="text-sm leading-relaxed" 
                           v-html="getDiffHtml(fieldDiff.diff)">
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- 未修改的内容 -->
                <div v-else class="text-gray-600 bg-gray-50 rounded-xl p-4">
                  <div class="text-sm leading-relaxed prose prose-sm max-w-none"
                       v-html="renderMarkdown(getFieldValueDisplay(comparisonData.after, fieldKey))">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 无对比数据时的提示 -->
        <div v-else class="text-center py-16">
          <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">暂无对比数据</h3>
          <p class="text-gray-500">请先进行方案迭代后再查看对比结果</p>
        </div>
      </div>

      <!-- 底部操作栏 -->
      <div class="px-8 py-6 border-t border-gray-100 bg-gray-50 flex justify-end">
        <button
          @click="closeDialog"
          class="px-8 py-3 bg-white text-gray-700 border border-gray-300 rounded-2xl hover:bg-gray-50 transition-colors font-medium shadow-sm"
        >
          关闭
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits, onMounted } from 'vue'
import { computeFieldDiff, diffToHtml, getDiffStats } from '../utils/textDiff'
import { marked } from 'marked'

// 配置marked选项
marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: false,
  mangle: false
})

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  comparisonData: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close'])

// 计算字段级别的差异
const fieldDiffs = computed(() => {
  if (!props.comparisonData?.before || !props.comparisonData?.after) {
    return null
  }
  
  return computeFieldDiff(props.comparisonData.before, props.comparisonData.after)
})

// 计算修改的字段文本
const changedFieldsText = computed(() => {
  if (!fieldDiffs.value) return '无'
  
  const changedFields = Object.values(fieldDiffs.value)
    .filter(field => field.hasChanges)
    .map(field => field.name)
  
  if (changedFields.length === 0) return '无修改'
  if (changedFields.length === 1) return changedFields[0]
  if (changedFields.length === 2) return changedFields.join(' 和 ')
  
  return `${changedFields.slice(0, -1).join('、')} 和 ${changedFields[changedFields.length - 1]}`
})

// 获取部分显示名称
const getSectionDisplayName = (section) => {
  const sectionMap = {
    'full': '完整方案',
    'hypothesis': '研究假设',
    'design': '实验设计',
    'analysis': '数据分析',
    'results': '结果呈现'
  }
  return sectionMap[section] || '未知部分'
}

// 获取字段值用于显示
const getFieldValueDisplay = (plan, fieldKey) => {
  if (!plan) return ''
  
  if (fieldKey === 'hypotheses') {
    if (Array.isArray(plan.hypotheses)) {
      return plan.hypotheses.join('\n')
    }
    return plan.hypotheses || ''
  }
  
  return plan[fieldKey] || ''
}

// 获取差异HTML
const getDiffHtml = (diff) => {
  if (!diff) return ''
  return diffToHtml(diff)
}

// 渲染markdown
const renderMarkdown = (content) => {
  if (!content) return ''
  try {
    const html = marked.parse(content)
    return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  } catch (error) {
    console.error('Markdown渲染错误:', error)
    return content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }
}

// 关闭对话框
const closeDialog = () => {
  emit('close')
}

// 切换未修改内容的展开/折叠状态
const toggleUnchangedSection = (event) => {
  const button = event.currentTarget
  const content = button.parentElement.querySelector('.unchanged-content')
  const icon = button.querySelector('svg')
  
  if (content.classList.contains('hidden')) {
    content.classList.remove('hidden')
    icon.style.transform = 'rotate(180deg)'
  } else {
    content.classList.add('hidden')
    icon.style.transform = 'rotate(0deg)'
  }
}

// 在mounted阶段添加全局函数以支持HTML中的onclick调用
onMounted(() => {
  // 为HTML中的onclick调用提供全局函数
  window.toggleUnchangedSection = (button) => {
    const content = button.parentElement.querySelector('.unchanged-content')
    const icon = button.querySelector('svg')
    
    if (content.classList.contains('hidden')) {
      content.classList.remove('hidden')
      icon.style.transform = 'rotate(180deg)'
    } else {
      content.classList.add('hidden')
      icon.style.transform = 'rotate(0deg)'
    }
  }
})
</script>

<style scoped>
/* 自定义滚动条 */
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

/* 差异文本样式 */
:deep(.diff-added) {
  background-color: rgb(240 253 244) !important;
  border-left: 4px solid rgb(34 197 94) !important;
  margin: 0.25rem 0 !important;
}

:deep(.diff-removed) {
  background-color: rgb(254 242 242) !important;
  border-left: 4px solid rgb(239 68 68) !important;
  margin: 0.25rem 0 !important;
}

:deep(.diff-unchanged) {
  background-color: rgb(249 250 251) !important;
  border-left: 4px solid rgb(156 163 175) !important;
  margin: 0.25rem 0 !important;
}

:deep(.diff-unchanged-merged) {
  background-color: rgb(249 250 251) !important;
  border-left: 4px solid rgb(156 163 175) !important;
  margin: 0.25rem 0 !important;
}

:deep(.unchanged-toggle) {
  transition: all 0.2s ease;
}

:deep(.unchanged-toggle:hover) {
  background-color: rgb(243 244 246) !important;
}

:deep(.unchanged-content) {
  max-height: 300px;
  overflow-y: auto;
  transition: all 0.3s ease;
}

:deep(.unchanged-content::-webkit-scrollbar) {
  width: 4px;
}

:deep(.unchanged-content::-webkit-scrollbar-track) {
  background: #f1f1f1;
  border-radius: 2px;
}

:deep(.unchanged-content::-webkit-scrollbar-thumb) {
  background: #c5c5c5;
  border-radius: 2px;
}

:deep(.unchanged-content::-webkit-scrollbar-thumb:hover) {
  background: #a8a8a8;
}

:deep(.line-through) {
  text-decoration: line-through !important;
}

/* markdown渲染样式 */
:deep(.prose) {
  max-width: none !important;
}

:deep(.prose h1),
:deep(.prose h2),
:deep(.prose h3),
:deep(.prose h4),
:deep(.prose h5),
:deep(.prose h6) {
  color: rgb(31 41 55) !important;
  margin-top: 1rem !important;
  margin-bottom: 0.5rem !important;
}

:deep(.prose p) {
  margin-top: 0.5rem !important;
  margin-bottom: 0.5rem !important;
}

:deep(.prose ul),
:deep(.prose ol) {
  margin-top: 0.5rem !important;
  margin-bottom: 0.5rem !important;
  padding-left: 1.25rem !important;
}

:deep(.prose li) {
  margin-top: 0.25rem !important;
  margin-bottom: 0.25rem !important;
}

:deep(.prose strong) {
  font-weight: 600 !important;
  color: rgb(31 41 55) !important;
}

:deep(.prose em) {
  font-style: italic !important;
}

:deep(.prose code) {
  background-color: rgb(243 244 246) !important;
  padding: 0.125rem 0.25rem !important;
  border-radius: 0.25rem !important;
  font-size: 0.875em !important;
}

/* 卡片悬停效果 */
.hover\:shadow-md:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* 渐变背景动画 */
.bg-gradient-to-r {
  background-size: 200% 200%;
  animation: gradientShift 6s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style> 