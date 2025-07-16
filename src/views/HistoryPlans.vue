<template>
    <div class="min-h-screen bg-gray-50 flex flex-col">
        <main class="flex-1 max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="flex gap-8">
                        <!-- 左侧历史方案列表 -->
        <div class="w-96 h-[calc(100vh-10rem)] overflow-y-auto custom-scrollbar flex-shrink-0">
          <div class="bg-white rounded-xl shadow-sm p-6">
                        <h2 class="text-xl font-semibold text-gray-900 mb-6">历史方案列表</h2>

                        <!-- 加载状态 -->
                        <div v-if="isLoading" class="text-center py-12">
                            <div class="mb-6">
                                <svg class="animate-spin mx-auto h-12 w-12 text-purple-600" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </div>
                            <h3 class="text-lg font-medium text-gray-900 mb-2">正在加载历史方案...</h3>
                            <p class="text-gray-500">请稍候，正在从数据库获取您的研究方案</p>
                        </div>

                        <!-- 顶部操作按钮 -->
                        <div v-else-if="historyState.historyPlans.length > 0"
                            class="flex justify-between items-center mb-6">
                            <p class="text-sm text-gray-600">
                                共 {{ historyState.historyPlans.length }} 个历史方案
                            </p>
                            <button @click="confirmClearAll"
                                class="px-3 py-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm">
                                清除所有
                            </button>
                        </div>

                        <div v-if="!isLoading && historyState.historyPlans.length > 0" class="space-y-4">
                            <div v-for="plan in historyState.historyPlans" :key="plan.id"
                                class="border border-gray-200 rounded-xl hover:shadow-lg transition-all cursor-pointer group"
                                :class="[selectedPlan && selectedPlan.id === plan.id ? 'bg-purple-50 border-purple-200 shadow-md' : 'bg-white hover:bg-gray-50']"
                                @click="selectPlan(plan)">
                                
                                <!-- 主要内容区域 -->
                                <div class="p-5">
                                    <div class="flex justify-between items-start mb-3">
                                        <h3 class="text-base font-semibold text-gray-900 line-clamp-2 pr-3 leading-relaxed">
                                            {{ plan.title }}
                                        </h3>
                                        <div class="flex items-center space-x-2 ml-2 flex-shrink-0">
                                            <span v-if="historyState.currentAppliedPlanId === plan.id"
                                                class="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium whitespace-nowrap">
                                                应用中
                                            </span>
                                            <span v-else
                                                class="px-2.5 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium whitespace-nowrap">
                                                {{ plan.status }}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <p class="text-gray-600 text-sm line-clamp-2 mb-3 leading-relaxed">
                                        {{ plan.description }}
                                    </p>
                                    
                                    <div class="flex items-center justify-between text-xs text-gray-500">
                                        <span class="flex items-center">
                                            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-7 9v4a1 1 0 001 1h6a1 1 0 001-1v-4M3 7h18M4 7h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V7z"/>
                                            </svg>
                                            {{ plan.createdAt }}
                                        </span>
                                        <span class="flex items-center">
                                            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                            </svg>
                                            {{ plan.author }}
                                        </span>
                                    </div>
                                </div>

                                <!-- 操作按钮区域 -->
                                <div class="px-5 py-3 bg-gray-50 border-t border-gray-200 rounded-b-xl">
                                    <!-- 主要操作按钮 -->
                                    <div class="flex justify-between items-center">
                                        <div class="flex space-x-2">
                                            <button @click.stop="applyPlan(plan)"
                                                class="w-20 px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-xs font-medium flex items-center justify-center">
                                                应用方案
                                            </button>
                                            <button @click.stop="downloadPDF(plan)"
                                                :disabled="isGeneratingPDF"
                                                class="w-16 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1">
                                                <svg v-if="isGeneratingPDF" class="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 818-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <svg v-else class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                                </svg>
                                                <span>PDF</span>
                                            </button>
                                            <button @click.stop="downloadTXT(plan)"
                                                class="w-16 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs flex items-center justify-center space-x-1">
                                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                                </svg>
                                                <span>TXT</span>
                                            </button>
                                        </div>
                                        
                                        <!-- 更多操作按钮 -->
                                        <div class="flex items-center space-x-2">
                                            <div class="relative group/dropdown">
                                                <button @click.stop="toggleMoreActions(plan.id)"
                                                    class="px-2 py-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-xs flex items-center space-x-1">
                                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                                                    </svg>
                                                    <span>更多</span>
                                                </button>
                                                
                                                <!-- 下拉菜单 -->
                                                <div v-if="showMoreActions === plan.id" 
                                                    class="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50 transform transition-all duration-150 ease-out">
                                                    <div class="py-1">
                                                        <button @click.stop="regenerateTitle(plan)"
                                                            :disabled="isRegeneratingTitle"
                                                            class="w-full px-3 py-2 text-left text-xs text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors">
                                                            <svg v-if="isRegeneratingTitle" class="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                                                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 818-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            <svg v-else class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                                            </svg>
                                                            <span>{{ isRegeneratingTitle ? '生成中' : '重新命名' }}</span>
                                                        </button>
                                                        <div class="border-t border-gray-100"></div>
                                                        <button @click.stop="confirmDelete(plan)"
                                                            class="w-full px-3 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center space-x-2 transition-colors">
                                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                                            </svg>
                                                            <span>删除</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- 批量操作区域 -->
                            <div v-if="historyState.historyPlans.length > 0" class="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <div class="flex items-center justify-between">
                                    <span class="text-sm text-gray-600">
                                        共 {{ historyState.historyPlans.length }} 个研究方案
                                    </span>
                                    <button @click.stop="regenerateAllTitles()"
                                        :disabled="isRegeneratingTitle || historyState.historyPlans.length === 0"
                                        class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                        </svg>
                                        <span>批量重新命名</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- 空状态 -->
                        <div v-else-if="!isLoading" class="text-center py-12">
                            <div class="mb-6">
                                <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 class="text-lg font-medium text-gray-900 mb-2">暂无历史方案</h3>
                            <p class="text-gray-500 mb-6">
                                您还没有生成过任何研究方案。请前往研究方案页面开始创建您的第一个方案。
                            </p>

                            <!-- 调试信息区域 -->
                            <div v-if="!userStore.isAuthenticated"
                                class="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <div class="flex items-center">
                                    <svg class="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="text-yellow-800 font-medium">您尚未登录</span>
                                </div>
                                <p class="text-yellow-700 mt-2">
                                    历史方案功能需要登录后使用。请先登录您的账户。
                                </p>
                                <button @click="router.push('/login')"
                                    class="mt-3 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                                    立即登录
                                </button>
                            </div>

                            <!-- 开发者调试信息 -->
                            <div v-if="isDev && debugInfo.errorMessage"
                                class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                                <h4 class="text-red-800 font-medium mb-2">调试信息:</h4>
                                <ul class="text-red-700 text-sm space-y-1">
                                    <li>用户已登录: {{ debugInfo.userAuthenticated ? '是' : '否' }}</li>
                                    <li>方案数量: {{ debugInfo.planCount }}</li>
                                    <li v-if="debugInfo.errorMessage">错误信息: {{ debugInfo.errorMessage }}</li>
                                    <li v-if="debugInfo.apiResponse">API响应: {{ debugInfo.apiResponse }}</li>
                                </ul>
                            </div>

                            <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
                                <button @click="router.push('/research-plan')"
                                    class="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                                    开始创建方案
                                </button>
                                <button @click="refreshData"
                                    class="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                                    刷新数据
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                                <!-- 右侧方案详情 -->
        <div class="h-[calc(100vh-10rem)] overflow-y-auto custom-scrollbar" style="width: 800px;">
          <div v-if="selectedPlan" class="bg-white rounded-xl shadow-sm p-8">
                                                    <div class="space-y-8">
                            <!-- 方案导航按钮 -->
                            <div class="flex space-x-4 mb-8">
                                <button v-for="section in sections" :key="section.id"
                                    @click="activeSection = section.id"
                                    class="px-4 py-2 rounded-lg font-medium transition-colors" :class="[
                                        activeSection === section.id
                                            ? 'bg-purple-100 text-purple-700'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    ]">
                                    {{ section.name }}
                                </button>
                            </div>

                            <!-- 完整方案 -->
                            <div v-if="activeSection === 'full'">
                                <div class="flex justify-between items-center mb-6">
                                    <h2 class="text-2xl font-bold text-gray-900 flex-1 mr-4">{{ selectedPlan.title }}</h2>
                                    <div class="flex space-x-2 flex-shrink-0">
                                        <button @click="downloadPDF(selectedPlan)"
                                            :disabled="isGeneratingPDF"
                                            class="w-32 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2">
                                            <svg v-if="isGeneratingPDF" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                            </svg>
                                            <span class="text-sm">{{ isGeneratingPDF ? '生成中...' : '下载PDF' }}</span>
                                        </button>
                                        <button @click="downloadTXT(selectedPlan)"
                                            class="w-32 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                            </svg>
                                            <span class="text-sm">导出TXT</span>
                                        </button>
                                        <button @click="applyPlan(selectedPlan)"
                                            class="w-32 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center">
                                            <span class="text-sm">应用此方案</span>
                                        </button>
                                    </div>
                                </div>
                                <div class="space-y-6">
                                    <div
                                        v-if="selectedPlan.fullPlan.hypotheses && selectedPlan.fullPlan.hypotheses.length > 0">
                                        <h3 class="text-lg font-semibold text-gray-900 mb-3">研究假设</h3>
                                        <div class="space-y-2">
                                            <div v-for="(hypothesis, index) in selectedPlan.fullPlan.hypotheses"
                                                :key="index" class="p-4 bg-gray-50 rounded-lg">
                                                <div class="text-gray-900 prose prose-sm"
                                                    v-html="safeMarkdownRender(hypothesis)"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div v-if="selectedPlan.fullPlan.experimentalDesign">
                                        <h3 class="text-lg font-semibold text-gray-900 mb-3">实验设计</h3>
                                        <div class="text-gray-600 leading-relaxed prose prose-sm"
                                            v-html="safeMarkdownRender(selectedPlan.fullPlan.experimentalDesign)"></div>
                                    </div>

                                    <div v-if="selectedPlan.fullPlan.analysisMethod">
                                        <h3 class="text-lg font-semibold text-gray-900 mb-3">数据分析</h3>
                                        <div class="text-gray-600 leading-relaxed prose prose-sm"
                                            v-html="safeMarkdownRender(selectedPlan.fullPlan.analysisMethod)"></div>
                                    </div>

                                    <div v-if="selectedPlan.fullPlan.expectedResults">
                                        <h3 class="text-lg font-semibold text-gray-900 mb-3">结果呈现</h3>
                                        <div class="text-gray-600 leading-relaxed prose prose-sm"
                                            v-html="safeMarkdownRender(selectedPlan.fullPlan.expectedResults)"></div>
                                    </div>
                                </div>
                            </div>

                            <!-- 研究假设部分 -->
                            <div v-if="activeSection === 'hypothesis'" class="w-full">
                                <h2 class="text-2xl font-bold text-gray-900 mb-6">研究假设</h2>
                                <div v-if="selectedPlan.fullPlan.hypotheses && selectedPlan.fullPlan.hypotheses.length > 0"
                                    class="space-y-4 w-full">
                                    <div v-for="(hypothesis, index) in selectedPlan.fullPlan.hypotheses" :key="index"
                                        class="p-4 bg-gray-50 rounded-lg">
                                        <div class="text-gray-900 prose prose-sm"
                                            v-html="safeMarkdownRender(hypothesis)"></div>
                                    </div>
                                </div>
                                <div v-else class="text-center py-12">
                                    <div class="mb-4">
                                        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                                                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    </div>
                                    <p class="text-gray-500">该方案暂无研究假设内容</p>
                                </div>
                            </div>

                            <!-- 实验设计部分 -->
                            <div v-if="activeSection === 'design'" class="w-full">
                                <h2 class="text-2xl font-bold text-gray-900 mb-6">实验设计</h2>
                                <div v-if="selectedPlan.fullPlan.experimentalDesign" class="space-y-6 w-full">
                                    <div class="text-gray-600 leading-relaxed prose prose-sm max-w-none w-full min-w-[600px]"
                                        v-html="safeMarkdownRender(selectedPlan.fullPlan.experimentalDesign)"></div>
                                </div>
                                <div v-else class="text-center py-12">
                                    <div class="mb-4">
                                        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                                                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                        </svg>
                                    </div>
                                    <p class="text-gray-500">该方案暂无实验设计内容</p>
                                </div>
                            </div>

                            <!-- 数据分析部分 -->
                            <div v-if="activeSection === 'analysis'" class="w-full">
                                <h2 class="text-2xl font-bold text-gray-900 mb-6">数据分析</h2>
                                <div v-if="selectedPlan.fullPlan.analysisMethod" class="space-y-6 w-full">
                                    <div class="text-gray-600 leading-relaxed prose prose-sm max-w-none w-full min-w-[600px]"
                                        v-html="safeMarkdownRender(selectedPlan.fullPlan.analysisMethod)"></div>
                                </div>
                                <div v-else class="text-center py-12">
                                    <div class="mb-4">
                                        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <p class="text-gray-500">该方案暂无数据分析内容</p>
                                </div>
                            </div>

                            <!-- 结果呈现部分 -->
                            <div v-if="activeSection === 'results'" class="w-full">
                                <h2 class="text-2xl font-bold text-gray-900 mb-6">结果呈现</h2>
                                <div v-if="selectedPlan.fullPlan.expectedResults" class="space-y-6 w-full">
                                    <div class="text-gray-600 leading-relaxed prose prose-sm max-w-none w-full min-w-[600px]"
                                        v-html="safeMarkdownRender(selectedPlan.fullPlan.expectedResults)"></div>
                                </div>
                                <div v-else class="text-center py-12">
                                    <div class="mb-4">
                                        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                                                d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                        </svg>
                                    </div>
                                    <p class="text-gray-500">该方案暂无结果呈现内容</p>
                                </div>
                            </div>
                        </div>
                    </div>

                              <!-- 未选择方案时的提示 -->
          <div v-else class="bg-white rounded-xl shadow-sm p-8 text-center w-full">
                        <div class="mb-6">
                            <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 class="text-lg font-medium text-gray-900 mb-2">请选择一个方案查看详情</h3>
                        <p class="text-gray-500">
                            点击左侧列表中的任一方案，即可在此处查看完整的方案内容和详细信息。
                        </p>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { historyState, removeHistoryPlan, clearHistoryPlans, setCurrentViewingPlan, papersState, loadUserData, applyPlanAsCurrentPlan, researchPlanAPI } from '../stores/chatStore'
import { useUserStore } from '../stores/userStore.js'
import { marked } from 'marked'
import markedKatex from 'marked-katex-extension'
import 'katex/dist/katex.min.css'
import html2pdf from 'html2pdf.js'

const router = useRouter()
const userStore = useUserStore()
const isLoading = ref(false)
const selectedPlan = ref(null)
const activeSection = ref('full')
const isGeneratingPDF = ref(false)
const isRegeneratingTitle = ref(false) // 添加标题重新生成状态
const showMoreActions = ref(null) // 控制下拉菜单显示

// 方案导航部分
const sections = [
    { id: 'full', name: '完整方案' },
    { id: 'hypothesis', name: '研究假设' },
    { id: 'design', name: '实验设计' },
    { id: 'analysis', name: '数据分析' },
    { id: 'results', name: '结果呈现' }
]

// 配置marked选项，支持LaTeX数学公式
marked.use(markedKatex({
    throwOnError: false,
    displayMode: false,
    output: 'html'
}))

// 自定义渲染器
const renderer = new marked.Renderer()

// 自定义图片渲染
renderer.image = function (href, title, text) {
    const cleanHref = href.trim()
    if (!cleanHref) {
        return `<span style="color: #ef4444;">[图片URL为空]</span>`
    }

    const titleAttr = title ? ` title="${title}"` : ''
    const altAttr = text ? ` alt="${text || 'LaTeX公式'}"` : ' alt="LaTeX公式"'

    const isExternalImage = cleanHref.startsWith('http://') || cleanHref.startsWith('https://')
    const isLatexImage = cleanHref.includes('yuque/__latex')

    let finalHref = cleanHref
    if (isExternalImage && (isLatexImage || cleanHref.includes('cdn.nlark.com'))) {
        finalHref = `/api/proxy-image?url=${encodeURIComponent(cleanHref)}`
    }

    let className, styles
    if (isLatexImage) {
        const isDisplayMode = cleanHref.includes('displaystyle') ||
            cleanHref.includes('%5Cdisplaystyle') ||
            cleanHref.includes('\\begin{') ||
            cleanHref.includes('%5Cbegin') ||
            cleanHref.includes('align') ||
            cleanHref.includes('equation') ||
            cleanHref.includes('$$') ||
            (text && (text.includes('$$') || text.length > 50))

        className = isDisplayMode ? 'latex-formula-display' : 'latex-formula-inline'
        styles = isDisplayMode
            ? 'display: block; margin: 0.5rem auto; max-width: 100%; max-height: 8em; border: none; background: transparent;'
            : 'display: inline-block; margin: 0 2px; vertical-align: middle; max-height: 1.5em; border: none; background: transparent;'
    } else {
        className = 'markdown-image'
        styles = 'max-width: 100%; height: auto; margin: 0.5rem 0; border-radius: 0.25rem;'
    }

    const referrerPolicy = isLatexImage ? ' referrerpolicy="no-referrer"' : ''

    const onError = isExternalImage && (isLatexImage || cleanHref.includes('cdn.nlark.com'))
        ? `this.src='${cleanHref}'; this.referrerPolicy='no-referrer';`
        : `this.style.display='block'; this.style.background='#f9f9f9'; this.style.padding='20px'; this.style.border='1px dashed #ccc'; this.textContent='图片加载失败';`

    return `<img src="${finalHref}" class="${className}" style="${styles}" ${titleAttr}${altAttr}${referrerPolicy} onerror="${onError}" />`
}

marked.setOptions({
    breaks: true,
    gfm: true,
    headerIds: false,
    mangle: false,
    pedantic: false,
    sanitize: false,
    renderer: renderer
})

// 安全的markdown渲染函数
const safeMarkdownRender = (text) => {
    try {
        if (!text) return ''
        return marked(text)
    } catch (error) {
        console.error('Markdown渲染错误:', error)
        return text || ''
    }
}

// 开发环境检测
const isDev = import.meta.env.DEV

// 引用文献计数
const referencedCount = computed(() => papersState.referencedPapers.size)

// 页面加载时主动加载数据
onMounted(async () => {
    await refreshData()
    
    // 添加点击外部关闭下拉菜单的监听器
    const closeDropdownHandler = (e) => {
        // 如果点击的不是下拉菜单相关元素，则关闭所有下拉菜单
        if (!e.target.closest('.group\\/dropdown')) {
            showMoreActions.value = null
        }
    }
    
    document.addEventListener('click', closeDropdownHandler)
    
    // 保存处理器函数以便在unmounted时清理
    window.closeDropdownHandler = closeDropdownHandler
})

// 清理事件监听器
onUnmounted(() => {
    if (window.closeDropdownHandler) {
        document.removeEventListener('click', window.closeDropdownHandler)
        delete window.closeDropdownHandler
    }
})

// 添加调试状态
const debugInfo = ref({
    userAuthenticated: false,
    apiResponse: null,
    errorMessage: null,
    planCount: 0
})

// 选择方案
const selectPlan = (plan) => {
    selectedPlan.value = plan
    activeSection.value = 'full'
    // 选择方案时关闭所有下拉菜单
    showMoreActions.value = null
    console.log('选择方案:', plan.title)
}

// 切换下拉菜单显示
const toggleMoreActions = (planId) => {
    showMoreActions.value = showMoreActions.value === planId ? null : planId
}

// 应用方案
const applyPlan = (plan) => {
    // 关闭下拉菜单
    showMoreActions.value = null
    
    // 确保plan对象存在且有title属性
    const planTitle = plan?.title || '未命名方案'
    
    if (confirm(`确定要应用方案"${planTitle}"吗？这将替换当前的研究方案。`)) {
        // 应用方案到当前方案
        applyPlanAsCurrentPlan(
            plan.fullPlan,
            plan.id,
            plan.sourceIntroductions || {}
        )

        console.log('应用方案:', planTitle)
        alert(`方案"${planTitle}"已成功应用！您可以前往研究方案页面查看。`)

        // 可选：跳转到研究方案页面
        router.push('/research-plan')
    }
}

// 刷新数据
const refreshData = async () => {
    if (isLoading.value) return // 防止重复加载

    isLoading.value = true
    try {
        console.log('历史方案页面：开始刷新数据')

        // 更新调试信息
        debugInfo.value.userAuthenticated = userStore.isAuthenticated
        debugInfo.value.errorMessage = null

        console.log('用户认证状态:', userStore.isAuthenticated)

        if (userStore.isAuthenticated) {
            // 如果用户已登录，加载用户数据
            await loadUserData()
            debugInfo.value.planCount = historyState.historyPlans.length
            debugInfo.value.apiResponse = `成功加载 ${historyState.historyPlans.length} 个方案`
            console.log('数据加载完成，历史方案数量:', historyState.historyPlans.length)
        } else {
            debugInfo.value.errorMessage = '用户未登录，请先登录后查看历史方案'
            console.log('用户未登录，跳过数据加载')
        }
    } catch (error) {
        console.error('加载历史方案数据失败:', error)
        debugInfo.value.errorMessage = `加载失败: ${error.message}`
        debugInfo.value.apiResponse = error.message
        // 可以在这里添加错误提示给用户
    } finally {
        isLoading.value = false
    }
}

// 确认删除单个方案
const confirmDelete = (plan) => {
    // 关闭下拉菜单
    showMoreActions.value = null
    
    if (confirm(`确定要删除方案"${plan.title}"吗？`)) {
        removeHistoryPlan(plan.id)
        // 如果删除的是当前选中的方案，清空选中状态
        if (selectedPlan.value && selectedPlan.value.id === plan.id) {
            selectedPlan.value = null
        }
    }
}

// 确认清除所有方案
const confirmClearAll = async () => {
    const planCount = historyState.historyPlans.length
    if (confirm(`确定要清除所有 ${planCount} 个历史方案吗？此操作不可撤销。`)) {
        try {
            isLoading.value = true
            console.log('开始清除所有历史方案...')

            await clearHistoryPlans()

            console.log('所有历史方案清除完成')
            alert('所有历史方案已成功清除！')

            // 清空当前选中的方案
            selectedPlan.value = null

            // 刷新调试信息
            debugInfo.value.planCount = 0
            debugInfo.value.apiResponse = '所有方案已清除'
            debugInfo.value.errorMessage = null

        } catch (error) {
            console.error('清除历史方案失败:', error)
            alert(`清除历史方案时发生错误：${error.message}`)

            // 更新调试信息
            debugInfo.value.errorMessage = `清除失败: ${error.message}`

        } finally {
            isLoading.value = false
        }
    }
}

// 下载TXT功能
const downloadTXT = async (plan) => {
    if (!plan) return
    
    // 关闭下拉菜单
    showMoreActions.value = null
    
    try {
        console.log('开始生成TXT文件:', plan.title)
        
        // 创建内容字符串
        let content = `
研究方案：${plan.title || '未命名方案'}

基本信息：
- 创建时间：${plan.createdAt || '未知'}
- 作者：${plan.author || '未知'}
- 状态：${plan.status || '未知'}
`

        // 添加方案内容
        if (plan.fullPlan) {
            if (plan.fullPlan.hypotheses && plan.fullPlan.hypotheses.length > 0) {
                content += '\n研究假设：\n'
                plan.fullPlan.hypotheses.forEach((hypothesis, index) => {
                    content += `${index + 1}. ${hypothesis}\n`
                })
            }
            
            if (plan.fullPlan.experimentalDesign) {
                content += '\n实验设计：\n' + plan.fullPlan.experimentalDesign + '\n'
            }
            
            if (plan.fullPlan.analysisMethod) {
                content += '\n数据分析：\n' + plan.fullPlan.analysisMethod + '\n'
            }
            
            if (plan.fullPlan.expectedResults) {
                content += '\n结果呈现：\n' + plan.fullPlan.expectedResults + '\n'
            }
        } else {
            content += '\n注意：此方案暂无详细内容。\n'
        }
        
        content += `\n\n此文档由 MethodMate 系统生成\n生成时间：${new Date().toLocaleString('zh-CN')}`
        
        // 创建Blob并下载
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `${(plan.title || '研究方案').replace(/[<>:"/\\|?*]/g, '_')}.txt`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        
        console.log('TXT文件生成完成')
        alert('研究方案已导出为文本文件！')
        
    } catch (error) {
        console.error('TXT文件生成失败:', error)
        alert(`TXT文件生成失败：${error.message}`)
    }
}

// 重新生成单个方案标题
const regenerateTitle = async (plan) => {
    if (!plan || isRegeneratingTitle.value) return
    
    try {
        isRegeneratingTitle.value = true
        // 关闭下拉菜单
        showMoreActions.value = null
        console.log('开始为方案重新生成标题:', plan.title)
        
        // 使用方案内容生成新标题
        const newTitle = generateTitleFromPlan(plan)
        
        if (newTitle && newTitle !== plan.title) {
            const originalTitle = plan.title
            
            // 先更新前端显示
            plan.title = newTitle
            
            // 如果当前选中的是这个方案，也要更新
            if (selectedPlan.value && selectedPlan.value.id === plan.id) {
                selectedPlan.value.title = newTitle
            }
            
            // 更新本地存储中的标题
            const planIndex = historyState.historyPlans.findIndex(p => p.id === plan.id)
            if (planIndex !== -1) {
                historyState.historyPlans[planIndex].title = newTitle
            }
            
            // 如果用户已登录且方案有数据库ID，同步更新数据库
            if (userStore.isAuthenticated && plan.databaseId) {
                try {
                    console.log('正在同步标题到数据库...', plan.databaseId)
                    const updateResult = await researchPlanAPI.update(plan.databaseId, {
                        title: newTitle
                    })
                    
                    if (updateResult.success) {
                        console.log('标题已成功同步到数据库')
                    } else {
                        throw new Error(updateResult.error || '数据库更新失败')
                    }
                } catch (dbError) {
                    console.error('同步标题到数据库失败:', dbError)
                    // 恢复原标题
                    plan.title = originalTitle
                    if (selectedPlan.value && selectedPlan.value.id === plan.id) {
                        selectedPlan.value.title = originalTitle
                    }
                    if (planIndex !== -1) {
                        historyState.historyPlans[planIndex].title = originalTitle
                    }
                    
                    alert(`标题更新失败：${dbError.message}\n已恢复原标题。`)
                    return
                }
            }
            
            console.log('标题重新生成完成:', newTitle)
            alert(`标题已更新为："${newTitle}"`)
        } else {
            console.log('生成的标题与原标题相同或生成失败')
            alert('标题生成失败或与原标题相同')
        }
        
    } catch (error) {
        console.error('重新生成标题失败:', error)
        alert(`重新生成标题失败：${error.message}`)
    } finally {
        isRegeneratingTitle.value = false
    }
}

// 批量重新生成所有方案标题
const regenerateAllTitles = async () => {
    if (isRegeneratingTitle.value || historyState.historyPlans.length === 0) return
    
    const planCount = historyState.historyPlans.length
    if (!confirm(`确定要重新生成所有 ${planCount} 个方案的标题吗？此操作不可撤销。`)) {
        return
    }
    
    try {
        isRegeneratingTitle.value = true
        console.log('开始批量重新生成标题，方案数量:', planCount)
        
        let updatedCount = 0
        let dbSuccessCount = 0
        let dbFailureCount = 0
        const totalPlans = historyState.historyPlans.length
        const failedUpdates = []
        
        for (let i = 0; i < totalPlans; i++) {
            const plan = historyState.historyPlans[i]
            const originalTitle = plan.title
            
            console.log(`正在处理第 ${i + 1}/${totalPlans} 个方案: ${originalTitle}`)
            
            const newTitle = generateTitleFromPlan(plan)
            
            if (newTitle && newTitle !== originalTitle) {
                // 先更新前端显示
                plan.title = newTitle
                updatedCount++
                
                // 如果当前选中的是这个方案，也要更新
                if (selectedPlan.value && selectedPlan.value.id === plan.id) {
                    selectedPlan.value.title = newTitle
                }
                
                // 如果用户已登录且方案有数据库ID，同步更新数据库
                if (userStore.isAuthenticated && plan.databaseId) {
                    try {
                        console.log(`正在同步标题到数据库 (${i + 1}/${totalPlans}):`, plan.databaseId)
                        const updateResult = await researchPlanAPI.update(plan.databaseId, {
                            title: newTitle
                        })
                        
                        if (updateResult.success) {
                            dbSuccessCount++
                            console.log(`✅ 数据库更新成功: "${originalTitle}" -> "${newTitle}"`)
                        } else {
                            throw new Error(updateResult.error || '数据库更新失败')
                        }
                    } catch (dbError) {
                        dbFailureCount++
                        console.error(`❌ 数据库更新失败 (${i + 1}/${totalPlans}):`, dbError)
                        failedUpdates.push({
                            planTitle: newTitle,
                            originalTitle: originalTitle,
                            error: dbError.message
                        })
                        
                        // 恢复原标题（因为数据库更新失败）
                        plan.title = originalTitle
                        if (selectedPlan.value && selectedPlan.value.id === plan.id) {
                            selectedPlan.value.title = originalTitle
                        }
                        updatedCount-- // 减少成功计数
                    }
                } else {
                    console.log(`✅ 前端更新成功: "${originalTitle}" -> "${newTitle}"`)
                }
            }
            
            // 为了用户体验，添加小延迟
            if (i < totalPlans - 1) {
                await new Promise(resolve => setTimeout(resolve, 200))
            }
        }
        
        console.log('批量标题重新生成完成')
        console.log(`- 前端更新: ${updatedCount} 个`)
        console.log(`- 数据库成功: ${dbSuccessCount} 个`)
        console.log(`- 数据库失败: ${dbFailureCount} 个`)
        
        // 构建结果消息
        let resultMessage = `批量标题重新生成完成！\n`
        resultMessage += `共处理 ${totalPlans} 个方案，成功更新 ${updatedCount} 个标题。`
        
        if (userStore.isAuthenticated) {
            resultMessage += `\n\n数据库同步情况：`
            resultMessage += `\n✅ 成功：${dbSuccessCount} 个`
            if (dbFailureCount > 0) {
                resultMessage += `\n❌ 失败：${dbFailureCount} 个`
                resultMessage += `\n\n注意：部分标题因数据库同步失败已恢复原状，刷新页面后将显示原标题。`
            }
        }
        
        alert(resultMessage)
        
        // 如果有失败的更新，在控制台详细记录
        if (failedUpdates.length > 0) {
            console.group('❌ 数据库同步失败的方案详情:')
            failedUpdates.forEach((item, index) => {
                console.log(`${index + 1}. "${item.originalTitle}" -> "${item.planTitle}"`)
                console.log(`   错误: ${item.error}`)
            })
            console.groupEnd()
        }
        
    } catch (error) {
        console.error('批量重新生成标题失败:', error)
        alert(`批量重新生成标题失败：${error.message}`)
    } finally {
        isRegeneratingTitle.value = false
    }
}

// 从方案内容生成标题的函数
const generateTitleFromPlan = (plan) => {
    if (!plan || !plan.fullPlan) {
        return null
    }
    
    console.log('开始从方案内容生成标题...')
    
    // 策略1：从研究假设中提取关键词
    if (plan.fullPlan.hypotheses && plan.fullPlan.hypotheses.length > 0) {
        const hypothesesText = plan.fullPlan.hypotheses.join(' ')
        const titleFromHypotheses = extractTitleFromContent(hypothesesText)
        if (titleFromHypotheses) {
            console.log('从研究假设提取标题:', titleFromHypotheses)
            return titleFromHypotheses
        }
    }
    
    // 策略2：从实验设计中提取关键词
    if (plan.fullPlan.experimentalDesign) {
        const titleFromDesign = extractTitleFromContent(plan.fullPlan.experimentalDesign)
        if (titleFromDesign) {
            console.log('从实验设计提取标题:', titleFromDesign)
            return titleFromDesign
        }
    }
    
    // 策略3：从数据分析中提取关键词
    if (plan.fullPlan.analysisMethod) {
        const titleFromAnalysis = extractTitleFromContent(plan.fullPlan.analysisMethod)
        if (titleFromAnalysis) {
            console.log('从数据分析提取标题:', titleFromAnalysis)
            return titleFromAnalysis
        }
    }
    
    // 策略4：从所有内容中综合提取
    const allContent = [
        plan.fullPlan.hypotheses?.join(' ') || '',
        plan.fullPlan.experimentalDesign || '',
        plan.fullPlan.analysisMethod || '',
        plan.fullPlan.expectedResults || ''
    ].filter(content => content.trim().length > 10).join(' ')
    
    if (allContent.length > 50) {
        const titleFromAll = extractTitleFromContent(allContent)
        if (titleFromAll) {
            console.log('从综合内容提取标题:', titleFromAll)
            return titleFromAll
        }
    }
    
    // 策略5：生成基于时间的默认标题
    const now = new Date()
    const timeStr = `${now.getMonth() + 1}月${now.getDate()}日-${now.getHours()}时${now.getMinutes()}分`
    const smartTitle = `智能重命名研究方案-${timeStr}`
    
    console.log('使用默认重命名标题:', smartTitle)
    return smartTitle
}

// 从内容中提取标题的函数（与ResearchPlanDetail.vue中的函数相同）
const extractTitleFromContent = (content) => {
    if (!content || content.length < 10) return null
    
    // 提取关键概念和技术术语
    const keywordPatterns = [
        // 技术和方法相关
        /(?:基于|使用|采用|通过)([^，。！？]{3,15}?)(?:的|技术|方法|算法|系统|平台)/g,
        // 研究对象和领域
        /([A-Za-z\u4e00-\u9fa5]{3,15}?)(?:对|与|在)([^，。！？]{3,15}?)(?:的影响|的关系|的效果|中的应用)/g,
        // 实验和测试相关
        /(?:实验|测试|验证|评估)([^，。！？]{3,15}?)(?:的|效果|性能|准确性)/g,
        // 界面和交互相关
        /([^，。！？]{3,15}?)(?:界面|交互|设计|体验|用户体验)/g,
        // AI和智能相关
        /(人工智能|机器学习|深度学习|神经网络|AI|智能)[^，。！？]{0,10}?(?:在|对|与)([^，。！？]{3,15})/g,
        // 研究主题相关
        /(?:探讨|研究|分析|调查)([^，。！？]{3,15}?)(?:的影响|的关系|的效果|的作用)/g,
        // 比较研究相关
        /比较([^，。！？]{3,15}?)(?:与|和)([^，。！？]{3,15})/g
    ]
    
    const extractedKeywords = new Set()
    
    for (const pattern of keywordPatterns) {
        let match
        while ((match = pattern.exec(content)) !== null) {
            if (match[1] && match[1].trim().length > 2) {
                extractedKeywords.add(match[1].trim())
            }
            if (match[2] && match[2].trim().length > 2) {
                extractedKeywords.add(match[2].trim())
            }
        }
    }
    
    // 清理和筛选关键词
    const cleanedKeywords = Array.from(extractedKeywords)
        .filter(keyword => 
            keyword.length > 2 && 
            keyword.length < 15 &&
            !keyword.includes('假设') &&
            !keyword.includes('实验') &&
            !keyword.includes('研究') &&
            !keyword.includes('分析') &&
            !keyword.includes('方法') &&
            !keyword.includes('用户') &&
            !keyword.includes('数据') &&
            !keyword.includes('结果') &&
            !keyword.includes('设计') &&
            !keyword.includes('测试') &&
            !keyword.includes('评估') &&
            !keyword.includes('验证')
        )
        .slice(0, 2) // 最多取2个关键词
    
    if (cleanedKeywords.length > 0) {
        let title = cleanedKeywords.join('与')
        if (title.length > 20) {
            title = cleanedKeywords[0]
        }
        // 添加研究后缀
        if (!title.includes('研究') && !title.includes('分析') && !title.includes('评估')) {
            title += '研究'
        }
        return title
    }
    
    return null
}

// 下载PDF功能
const downloadPDF = async (plan) => {
    if (!plan || isGeneratingPDF.value) return
    
    // 关闭下拉菜单
    showMoreActions.value = null
    
    try {
        isGeneratingPDF.value = true
        console.log('开始生成PDF:', plan.title)
        
        // 创建一个新的页面用于PDF生成
        const printWindow = window.open('', '_blank')
        if (!printWindow) {
            throw new Error('无法打开新窗口，请允许弹窗后重试')
        }
        
        // 构建完整的HTML内容
        let htmlContent = `
            <!DOCTYPE html>
            <html lang="zh-CN">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${plan.title || '研究方案'}</title>
                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    
                    body {
                        font-family: 'Microsoft YaHei', 'SimSun', Arial, sans-serif;
                        line-height: 1.8;
                        color: #333;
                        background: #fff;
                        padding: 40px;
                        font-size: 14px;
                    }
                    
                    h1 {
                        color: #2c3e50;
                        font-size: 24px;
                        margin-bottom: 20px;
                        text-align: center;
                        border-bottom: 2px solid #3498db;
                        padding-bottom: 10px;
                    }
                    
                    h2 {
                        color: #34495e;
                        font-size: 18px;
                        margin-top: 30px;
                        margin-bottom: 15px;
                        border-left: 4px solid #3498db;
                        padding-left: 15px;
                    }
                    
                    h3 {
                        color: #34495e;
                        font-size: 16px;
                        margin-top: 20px;
                        margin-bottom: 10px;
                    }
                    
                    p {
                        margin-bottom: 12px;
                        text-indent: 2em;
                    }
                    
                    .meta-info {
                        background: #f8f9fa;
                        padding: 20px;
                        border-radius: 8px;
                        margin-bottom: 30px;
                        border: 1px solid #e9ecef;
                    }
                    
                    .meta-info p {
                        text-indent: 0;
                        margin-bottom: 8px;
                    }
                    
                    .content-section {
                        margin-bottom: 25px;
                        padding: 20px;
                        background: #fdfdfd;
                        border-radius: 6px;
                        border: 1px solid #f0f0f0;
                    }
                    
                    .hypothesis-item {
                        background: #f8f9ff;
                        padding: 15px;
                        margin-bottom: 10px;
                        border-radius: 5px;
                        border-left: 3px solid #6c5ce7;
                    }
                    
                    .footer {
                        margin-top: 50px;
                        padding-top: 20px;
                        border-top: 1px solid #ddd;
                        text-align: center;
                        color: #666;
                        font-size: 12px;
                    }
                    
                    ul, ol {
                        margin-left: 2em;
                        margin-bottom: 15px;
                    }
                    
                    li {
                        margin-bottom: 5px;
                    }
                    
                    strong {
                        color: #2c3e50;
                        font-weight: 600;
                    }
                    
                    @media print {
                        body { padding: 20px; }
                        h1 { page-break-after: avoid; }
                        h2 { page-break-after: avoid; }
                        .content-section { page-break-inside: avoid; }
                    }
                </style>
            </head>
            <body>
                <h1>${plan.title || '研究方案'}</h1>
                
                <div class="meta-info">
                    <p><strong>创建时间：</strong>${plan.createdAt || '未知'}</p>
                    <p><strong>作者：</strong>${plan.author || '未知'}</p>
                    <p><strong>状态：</strong>${plan.status || '未知'}</p>
                    ${plan.description ? `<p><strong>描述：</strong>${plan.description}</p>` : ''}
                </div>
        `
        
        // 添加研究假设
        if (plan.fullPlan && plan.fullPlan.hypotheses && plan.fullPlan.hypotheses.length > 0) {
            htmlContent += `
                <div class="content-section">
                    <h2>研究假设</h2>
            `
            plan.fullPlan.hypotheses.forEach((hypothesis, index) => {
                const cleanHypothesis = hypothesis.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                htmlContent += `
                    <div class="hypothesis-item">
                        <h3>假设 ${index + 1}</h3>
                        <p>${cleanHypothesis}</p>
                    </div>
                `
            })
            htmlContent += `</div>`
        }
        
        // 添加实验设计
        if (plan.fullPlan && plan.fullPlan.experimentalDesign) {
            const cleanDesign = plan.fullPlan.experimentalDesign
                .replace(/\n/g, '<br>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
            htmlContent += `
                <div class="content-section">
                    <h2>实验设计</h2>
                    <p>${cleanDesign}</p>
                </div>
            `
        }
        
        // 添加数据分析
        if (plan.fullPlan && plan.fullPlan.analysisMethod) {
            const cleanAnalysis = plan.fullPlan.analysisMethod
                .replace(/\n/g, '<br>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
            htmlContent += `
                <div class="content-section">
                    <h2>数据分析</h2>
                    <p>${cleanAnalysis}</p>
                </div>
            `
        }
        
        // 添加结果呈现
        if (plan.fullPlan && plan.fullPlan.expectedResults) {
            const cleanResults = plan.fullPlan.expectedResults
                .replace(/\n/g, '<br>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
            htmlContent += `
                <div class="content-section">
                    <h2>结果呈现</h2>
                    <p>${cleanResults}</p>
                </div>
            `
        }
        
        // 如果没有内容，添加提示
        if (!plan.fullPlan || (!plan.fullPlan.hypotheses && !plan.fullPlan.experimentalDesign && !plan.fullPlan.analysisMethod && !plan.fullPlan.expectedResults)) {
            htmlContent += `
                <div class="content-section" style="background: #fff3cd; border-color: #ffeaa7;">
                    <h2 style="color: #856404;">注意</h2>
                    <p style="color: #856404;">此方案暂无详细内容，可能是数据格式问题或方案尚未完整生成。</p>
                </div>
            `
        }
        
        // 添加页脚
        htmlContent += `
                <div class="footer">
                    <p>此文档由 MethodMate 系统生成</p>
                    <p>生成时间：${new Date().toLocaleString('zh-CN')}</p>
                </div>
            </body>
            </html>
        `
        
        // 写入新窗口
        printWindow.document.write(htmlContent)
        printWindow.document.close()
        
        // 等待内容加载完成
        await new Promise(resolve => {
            printWindow.onload = resolve
            setTimeout(resolve, 1000) // 备用超时
        })
        
        console.log('开始生成PDF...')
        
        // 配置html2pdf选项
        const opt = {
            margin: [20, 15, 20, 15],
            filename: `${(plan.title || '研究方案').replace(/[<>:"/\\|?*]/g, '_')}.pdf`,
            image: { 
                type: 'jpeg', 
                quality: 0.98 
            },
            html2canvas: { 
                scale: 1.5,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                logging: false,
                letterRendering: true,
                windowWidth: 1200,
                windowHeight: 800
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: 'portrait',
                compress: true
            },
            pagebreak: { 
                mode: ['avoid-all', 'css', 'legacy']
            }
        }
        
        // 从新窗口生成PDF
        await html2pdf().set(opt).from(printWindow.document.body).save()
        
        // 关闭新窗口
        setTimeout(() => {
            printWindow.close()
        }, 500)
        
        console.log('PDF生成完成')
        alert('PDF文件已成功生成并开始下载！')
        
    } catch (error) {
        console.error('PDF生成失败:', error)
        alert(`PDF生成失败：${error.message}`)
    } finally {
        isGeneratingPDF.value = false
    }
}
</script>

<style scoped>
/* 自定义滚动条样式 */
.custom-scrollbar::-webkit-scrollbar {
    width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: #f8f9fa;
    border-radius: 4px;
    margin: 8px 0;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #a855f7 0%, #8b5cf6 100%);
    border-radius: 4px;
    border: 2px solid #f8f9fa;
    transition: all 0.2s ease;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #9333ea 0%, #7c3aed 100%);
    border-color: #f3f4f6;
}

.custom-scrollbar::-webkit-scrollbar-thumb:active {
    background: linear-gradient(180deg, #7c3aed 0%, #6d28d9 100%);
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Markdown样式增强 */
.prose {
    color: inherit !important;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
    color: inherit !important;
    margin-top: 1rem !important;
    margin-bottom: 0.5rem !important;
}

.prose p {
    margin-top: 0.5rem !important;
    margin-bottom: 0.5rem !important;
    line-height: 1.6 !important;
}

.prose ul,
.prose ol {
    margin-top: 0.5rem !important;
    margin-bottom: 0.5rem !important;
    padding-left: 1.5rem !important;
}

.prose li {
    margin-top: 0.25rem !important;
    margin-bottom: 0.25rem !important;
}

.prose strong {
    font-weight: 600 !important;
}

.prose em {
    font-style: italic !important;
}

.prose code {
    background-color: rgba(59, 130, 246, 0.1) !important;
    color: #1e40af !important;
    padding: 0.125rem 0.25rem !important;
    border-radius: 0.25rem !important;
    font-size: 0.875em !important;
    border: 1px solid rgba(59, 130, 246, 0.2) !important;
}

.prose blockquote {
    border-left: 4px solid #3b82f6 !important;
    padding: 1rem !important;
    margin: 1rem 0 !important;
    color: #374151 !important;
    background-color: rgba(59, 130, 246, 0.05) !important;
    border-radius: 0.25rem !important;
}

/* 图片样式 */
.prose img {
    max-width: 100% !important;
    height: auto !important;
    margin: 0.5rem 0 !important;
    border-radius: 0.25rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

/* LaTeX公式图片样式 - 行内公式 */
.prose img[src*="yuque/__latex"],
.prose .latex-formula,
.prose .latex-formula-inline {
    display: inline-block !important;
    margin: 0 2px !important;
    vertical-align: middle !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    background: transparent !important;
    max-height: 1.5em !important;
    border: none !important;
}

/* LaTeX公式图片样式 - 行间公式 */
.prose .latex-formula-display {
    display: block !important;
    margin: 0.75rem auto !important;
    text-align: center !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    background: transparent !important;
    max-height: 10em !important;
    max-width: 100% !important;
    height: auto !important;
    border: none !important;
    padding: 0.25rem 0 !important;
}

/* 普通markdown图片样式 */
.prose .markdown-image {
    max-width: 100% !important;
    height: auto !important;
    margin: 0.5rem 0 !important;
    border-radius: 0.25rem !important;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1) !important;
}

/* 确保所有图片都能正确加载 */
.prose img {
    display: inline-block !important;
    max-width: 100% !important;
    height: auto !important;
}
</style>