<template>
    <div class="min-h-screen bg-gray-50 flex flex-col">
        <main class="flex-1 max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="flex gap-8">
                        <!-- 左侧历史方案列表 -->
        <div class="w-96 h-[calc(100vh-10rem)] overflow-y-auto custom-scrollbar flex-shrink-0">
          <div class="bg-white rounded-xl shadow-sm p-6">
                        <h2 class="text-xl font-semibold text-gray-900 mb-6">History Proposal List</h2>

                        <!-- 加载状态 -->
                        <div v-if="isLoading" class="text-center py-12">
                            <div class="mb-6">
                                <svg class="animate-spin mx-auto h-12 w-12 text-purple-600" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </div>
                            <h3 class="text-lg font-medium text-gray-900 mb-2">Loading History Proposals...</h3>
                            <p class="text-gray-500">Please wait, fetching your research proposals from the database</p>
                        </div>

                        <!-- 顶部操作按钮 -->
                        <div v-else-if="historyState.historyPlans.length > 0"
                            class="flex justify-between items-center mb-6">
                            <p class="text-sm text-gray-600">
                                Total {{ historyState.historyPlans.length }} history proposals
                            </p>
                            <button @click="confirmClearAll"
                                class="px-3 py-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm">
                                Clear All
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
                                                Applied
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
                                                class="w-32 px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-xs font-medium flex items-center justify-center">
                                                Apply Proposal
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
                                                    <span>More</span>
                                                </button>
                                                
                                                <!-- 下拉菜单 -->
                                                <div v-if="showMoreActions === plan.id" 
                                                    class="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50 transform transition-all duration-150 ease-out">
                                                    <div class="py-1">
                                                        <!-- Auto Rename Option -->
                                                        <button @click.stop="autoRename(plan)"
                                                            :disabled="isRegeneratingTitle"
                                                            class="w-full px-3 py-2 text-left text-xs text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors">
                                                            <svg v-if="isRegeneratingTitle" class="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                                                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 818-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            <svg v-else class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                                            </svg>
                                                            <span>{{ isRegeneratingTitle ? 'Generating...' : 'Auto Rename' }}</span>
                                                        </button>
                                                        
                                                        <!-- Manual Rename Option -->
                                                        <button @click.stop="manualRename(plan)"
                                                            class="w-full px-3 py-2 text-left text-xs text-gray-700 hover:bg-gray-50 flex items-center space-x-2 transition-colors">
                                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                                                            </svg>
                                                            <span>Manual Rename</span>
                                                        </button>
                                                        
                                                        <div class="border-t border-gray-100"></div>
                                                        
                                                        <!-- Download PDF Option -->
                                                        <button @click.stop="downloadPDF(plan)"
                                                            :disabled="isGeneratingPDF"
                                                            class="w-full px-3 py-2 text-left text-xs text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors">
                                                            <svg v-if="isGeneratingPDF" class="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                                                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 818-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            <svg v-else class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                                            </svg>
                                                            <span>{{ isGeneratingPDF ? 'Generating PDF...' : 'Download PDF' }}</span>
                                                        </button>
                                                        
                                                        <!-- Download TXT Option -->
                                                        <button @click.stop="downloadTXT(plan)"
                                                            class="w-full px-3 py-2 text-left text-xs text-gray-700 hover:bg-gray-50 flex items-center space-x-2 transition-colors">
                                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                                            </svg>
                                                            <span>Download TXT</span>
                                                        </button>
                                                        
                                                        <div class="border-t border-gray-100"></div>
                                                        <button @click.stop="confirmDelete(plan)"
                                                            class="w-full px-3 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center space-x-2 transition-colors">
                                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                                            </svg>
                                                            <span>Delete</span>
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
                                        Total {{ historyState.historyPlans.length }} research proposals
                                    </span>
                                    <button @click.stop="regenerateAllTitles()"
                                        :disabled="isRegeneratingTitle || historyState.historyPlans.length === 0"
                                        class="w-40 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                        </svg>
                                        <span>Batch Rename</span>
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
                            <h3 class="text-lg font-medium text-gray-900 mb-2">No History Proposals</h3>
                            <p class="text-gray-500 mb-6">
                                You haven't generated any research proposals yet. Please go to the research proposal page to start creating your first proposal.
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
                                    <span class="text-yellow-800 font-medium">You are not logged in</span>
                                </div>
                                <p class="text-yellow-700 mt-2">
                                    History proposals feature requires login. Please log in to your account first.
                                </p>
                                <button @click="router.push('/login')"
                                    class="mt-3 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                                    Login Now
                                </button>
                            </div>

                            <!-- 开发者调试信息 -->
                            <div v-if="isDev && debugInfo.errorMessage"
                                class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                                <h4 class="text-red-800 font-medium mb-2">Debug Info:</h4>
                                <ul class="text-red-700 text-sm space-y-1">
                                    <li>User logged in: {{ debugInfo.userAuthenticated ? 'Yes' : 'No' }}</li>
                                    <li>Proposal count: {{ debugInfo.planCount }}</li>
                                    <li v-if="debugInfo.errorMessage">Error message: {{ debugInfo.errorMessage }}</li>
                                    <li v-if="debugInfo.apiResponse">API response: {{ debugInfo.apiResponse }}</li>
                                </ul>
                            </div>

                            <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
                                <button @click="router.push('/research-plan')"
                                    class="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                                    Start Creating Proposal
                                </button>
                                <button @click="refreshData"
                                    class="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                                    Refresh Data
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
                            <div class="flex justify-between items-center mb-4 pb-1">
                                <button v-for="section in sections" :key="section.id"
                                    @click="activeSection = section.id"
                                    class="px-3 py-1.5 rounded text-xs font-bold transition-colors whitespace-nowrap flex-1 mx-1 text-center" :class="[
                                        activeSection === section.id
                                            ? 'bg-purple-100 text-purple-700'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    ]">
                                    {{ section.name }}
                                </button>
                            </div>

                            <!-- Complete Proposal -->
                            <div v-if="activeSection === 'full'">
                                <div class="flex justify-between items-center mb-6">
                                    <h2 class="text-2xl font-bold text-gray-900 flex-1 mr-4">{{ selectedPlan.title }}</h2>
                                    <div class="flex space-x-2 flex-shrink-0">
                                        <button @click="downloadPDF(selectedPlan)"
                                            :disabled="isGeneratingPDF"
                                            class="px-3 py-1.5 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1 shadow-sm min-w-[80px]">
                                            <svg v-if="isGeneratingPDF" class="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 818-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <svg v-else class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                            </svg>
                                            <span>{{ isGeneratingPDF ? 'Generating...' : 'Download PDF' }}</span>
                                        </button>
                                        <button @click="downloadTXT(selectedPlan)"
                                            class="px-3 py-1.5 text-xs bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center justify-center space-x-1 shadow-sm min-w-[80px]">
                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                            </svg>
                                            <span>Export TXT</span>
                                        </button>
                                        <button @click="applyPlan(selectedPlan)"
                                            class="px-3 py-1.5 text-xs bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors flex items-center justify-center space-x-1 shadow-sm min-w-[80px]">
                                            <span>Apply This Proposal</span>
                                        </button>
                                    </div>
                                </div>
                                <div class="space-y-6">
                                    <div
                                        v-if="selectedPlan.fullPlan.hypotheses && selectedPlan.fullPlan.hypotheses.length > 0">
                                        <h3 class="text-lg font-semibold text-gray-900 mb-3">Research Hypothesis</h3>
                                        <div class="space-y-2">
                                            <div v-for="(hypothesis, index) in selectedPlan.fullPlan.hypotheses"
                                                :key="index" class="p-4 bg-gray-50 rounded-lg">
                                                <div class="text-gray-900 prose prose-sm"
                                                    v-html="safeMarkdownRender(hypothesis)"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div v-if="selectedPlan.fullPlan.experimentalDesign">
                                        <h3 class="text-lg font-semibold text-gray-900 mb-3">Experimental Design</h3>
                                        <div class="text-gray-600 leading-relaxed prose prose-sm"
                                            v-html="safeMarkdownRender(selectedPlan.fullPlan.experimentalDesign)"></div>
                                    </div>

                                    <div v-if="selectedPlan.fullPlan.analysisMethod">
                                        <h3 class="text-lg font-semibold text-gray-900 mb-3">Data Analysis</h3>
                                        <div class="text-gray-600 leading-relaxed prose prose-sm"
                                            v-html="safeMarkdownRender(selectedPlan.fullPlan.analysisMethod)"></div>
                                    </div>

                                    <div v-if="selectedPlan.fullPlan.expectedResults">
                                        <h3 class="text-lg font-semibold text-gray-900 mb-3">Results Presentation</h3>
                                        <div class="text-gray-600 leading-relaxed prose prose-sm"
                                            v-html="safeMarkdownRender(selectedPlan.fullPlan.expectedResults)"></div>
                                    </div>
                                </div>
                            </div>

                            <!-- Research Hypothesis Section -->
                            <div v-if="activeSection === 'hypothesis'" class="w-full">
                                <h2 class="text-2xl font-bold text-gray-900 mb-6">Research Hypothesis</h2>
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
                                    <p class="text-gray-500">This plan has no research hypothesis content</p>
                                </div>
                            </div>

                            <!-- Experimental Design Section -->
                            <div v-if="activeSection === 'design'" class="w-full">
                                <h2 class="text-2xl font-bold text-gray-900 mb-6">Experimental Design</h2>
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
                                    <p class="text-gray-500">This plan has no experimental design content</p>
                                </div>
                            </div>

                            <!-- Data Analysis Section -->
                            <div v-if="activeSection === 'analysis'" class="w-full">
                                <h2 class="text-2xl font-bold text-gray-900 mb-6">Data Analysis</h2>
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
                                    <p class="text-gray-500">This plan has no data analysis content</p>
                                </div>
                            </div>

                            <!-- Results Presentation Section -->
                            <div v-if="activeSection === 'results'" class="w-full">
                                <h2 class="text-2xl font-bold text-gray-900 mb-6">Results Presentation</h2>
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
                                    <p class="text-gray-500">This plan has no results presentation content</p>
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
                        <h3 class="text-lg font-medium text-gray-900 mb-2">Please select a plan to view details</h3>
                        <p class="text-gray-500">
                            Click on any plan in the left list to view the complete plan content and detailed information here.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <!-- 手动重命名对话框 -->
    <div v-if="manualRenameDialog.show" 
         class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
         @click.self="cancelManualRename">
        <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Rename Plan</h3>
            
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    Plan Title
                </label>
                <input 
                    v-model="manualRenameDialog.newTitle"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter new plan title..."
                    maxlength="24"
                    @keyup.enter="confirmManualRename"
                    @keyup.escape="cancelManualRename"
                    ref="titleInput"
                />
                <p class="text-xs text-gray-500 mt-1">
                    {{ manualRenameDialog.newTitle.length }}/24 characters
                </p>
            </div>
            
            <div class="flex justify-end space-x-3">
                <button 
                    @click="cancelManualRename"
                    class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                    Cancel
                </button>
                <button 
                    @click="confirmManualRename"
                    :disabled="!manualRenameDialog.newTitle.trim() || manualRenameDialog.newTitle.trim().length > 24 || manualRenameDialog.newTitle.trim() === manualRenameDialog.plan?.title"
                    class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    Rename
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
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
const manualRenameDialog = ref({ show: false, plan: null, newTitle: '' }) // 手动重命名对话框状态
const titleInput = ref(null) // 标题输入框的引用

// 方案导航部分
const sections = [
    { id: 'full', name: 'Full Proposal' },
    { id: 'hypothesis', name: 'Hypothesis' },
    { id: 'design', name: 'Experimental Design' },
    { id: 'analysis', name: 'Data Analysis' },
    { id: 'results', name: 'Expected Results' }
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
// 监听手动重命名对话框的显示状态，自动聚焦输入框
watch(() => manualRenameDialog.value.show, async (newShow) => {
    if (newShow) {
        await nextTick()
        if (titleInput.value) {
            titleInput.value.focus()
            titleInput.value.select() // 选中所有文本
        }
    }
})

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
    
    if (confirm(`Are you sure you want to apply the plan "${planTitle}"? This will replace the current research plan.`)) {
        // 应用方案到当前方案
        applyPlanAsCurrentPlan(
            plan.fullPlan,
            plan.id,
            plan.sourceIntroductions || {}
        )

        console.log('应用方案:', planTitle)
        alert(`Plan "${planTitle}" has been successfully applied! You can go to the research plan page to view it.`)

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
            debugInfo.value.errorMessage = 'Please login fisrt'
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
    
    if (confirm(`Are you sure you want to delete the plan "${plan.title}"?`)) {
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
    if (confirm(`Are you sure you want to clear all ${planCount} history plans? This operation cannot be undone.`)) {
        try {
            isLoading.value = true
            console.log('开始清除所有历史方案...')

            await clearHistoryPlans()

            console.log('所有历史方案清除完成')
            alert('All historical plans have been successfully cleared!')

            // 清空当前选中的方案
            selectedPlan.value = null

            // 刷新调试信息
            debugInfo.value.planCount = 0
            debugInfo.value.apiResponse = '所有方案已清除'
            debugInfo.value.errorMessage = null

        } catch (error) {
            console.error('清除历史方案失败:', error)
            alert(`Error occurred while clearing historical plans: ${error.message}`)

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
                content += '\nResearch Hypothesis:\n'
                plan.fullPlan.hypotheses.forEach((hypothesis, index) => {
                    content += `${index + 1}. ${hypothesis}\n`
                })
            }
            
            if (plan.fullPlan.experimentalDesign) {
                content += '\nExperimental Design:\n' + plan.fullPlan.experimentalDesign + '\n'
            }
            
            if (plan.fullPlan.analysisMethod) {
                content += '\nData Analysis:\n' + plan.fullPlan.analysisMethod + '\n'
            }
            
            if (plan.fullPlan.expectedResults) {
                content += '\nResults Presentation:\n' + plan.fullPlan.expectedResults + '\n'
            }
        } else {
            content += '\nNote: This plan has no detailed content.\n'
        }
        
        content += `\n\nThis document was generated by MethodMate system\nGeneration time: ${new Date().toLocaleString('en-US')}`
        
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
        alert('Research plan has been exported as a text file!')
        
    } catch (error) {
        console.error('TXT文件生成失败:', error)
        alert(`TXT file generation failed: ${error.message}`)
    }
}

// Auto Rename功能 - 自动生成标题
const autoRename = async (plan) => {
    if (!plan || isRegeneratingTitle.value) return
    
    try {
        isRegeneratingTitle.value = true
        // 关闭下拉菜单
        showMoreActions.value = null
        console.log('Starting auto rename for plan:', plan.title)
        
        // 使用方案内容生成新标题，确保长度不超过24个字符
        const newTitle = generateTitleFromPlan(plan, 24)
        
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
                    console.log('Syncing title to database...', plan.databaseId)
                    const updateResult = await researchPlanAPI.update(plan.databaseId, {
                        title: newTitle
                    })
                    
                    if (updateResult.success) {
                        console.log('Title successfully synced to database')
                    } else {
                        throw new Error(updateResult.error || 'Database update failed')
                    }
                } catch (dbError) {
                    console.error('Failed to sync title to database:', dbError)
                    // 恢复原标题
                    plan.title = originalTitle
                    if (selectedPlan.value && selectedPlan.value.id === plan.id) {
                        selectedPlan.value.title = originalTitle
                    }
                    if (planIndex !== -1) {
                        historyState.historyPlans[planIndex].title = originalTitle
                    }
                    
                    alert(`Title update failed: ${dbError.message}\nOriginal title has been restored.`)
                    return
                }
            }
            
            console.log('Auto rename completed:', newTitle)
            alert(`Title has been updated to: "${newTitle}"`)
        } else {
            console.log('Generated title is same as original or generation failed')
            alert('Title generation failed or is the same as the original title')
        }
        
    } catch (error) {
        console.error('Auto rename failed:', error)
        alert(`Auto rename failed: ${error.message}`)
    } finally {
        isRegeneratingTitle.value = false
    }
}

// Manual Rename功能 - 手动输入标题
const manualRename = (plan) => {
    if (!plan) return
    
    // 关闭下拉菜单
    showMoreActions.value = null
    
    // 显示手动重命名对话框
    manualRenameDialog.value = {
        show: true,
        plan: plan,
        newTitle: plan.title
    }
}

// 确认手动重命名
const confirmManualRename = async () => {
    const { plan, newTitle } = manualRenameDialog.value
    
    if (!plan || !newTitle.trim()) {
        alert('Please enter a valid title.')
        return
    }
    
    if (newTitle.trim().length > 24) {
        alert('Title cannot exceed 24 characters.')
        return
    }
    
    if (newTitle.trim() === plan.title) {
        alert('The new title is the same as the current title.')
        cancelManualRename()
        return
    }
    
    try {
        const originalTitle = plan.title
        const trimmedTitle = newTitle.trim()
        
        // 先更新前端显示
        plan.title = trimmedTitle
        
        // 如果当前选中的是这个方案，也要更新
        if (selectedPlan.value && selectedPlan.value.id === plan.id) {
            selectedPlan.value.title = trimmedTitle
        }
        
        // 更新本地存储中的标题
        const planIndex = historyState.historyPlans.findIndex(p => p.id === plan.id)
        if (planIndex !== -1) {
            historyState.historyPlans[planIndex].title = trimmedTitle
        }
        
        // 如果用户已登录且方案有数据库ID，同步更新数据库
        if (userStore.isAuthenticated && plan.databaseId) {
            try {
                console.log('Syncing manual title to database...', plan.databaseId)
                const updateResult = await researchPlanAPI.update(plan.databaseId, {
                    title: trimmedTitle
                })
                
                if (updateResult.success) {
                    console.log('Manual title successfully synced to database')
                } else {
                    throw new Error(updateResult.error || 'Database update failed')
                }
            } catch (dbError) {
                console.error('Failed to sync manual title to database:', dbError)
                // 恢复原标题
                plan.title = originalTitle
                if (selectedPlan.value && selectedPlan.value.id === plan.id) {
                    selectedPlan.value.title = originalTitle
                }
                if (planIndex !== -1) {
                    historyState.historyPlans[planIndex].title = originalTitle
                }
                
                alert(`Title update failed: ${dbError.message}\nOriginal title has been restored.`)
                cancelManualRename()
                return
            }
        }
        
        console.log('Manual rename completed:', trimmedTitle)
        alert(`Title has been updated to: "${trimmedTitle}"`)
        
    } catch (error) {
        console.error('Manual rename failed:', error)
        alert(`Manual rename failed: ${error.message}`)
    } finally {
        cancelManualRename()
    }
}

// 取消手动重命名
const cancelManualRename = () => {
    manualRenameDialog.value = { show: false, plan: null, newTitle: '' }
}

// 重新生成单个方案标题 (保留原函数用于兼容性)
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
                    
                    alert(`Title update failed: ${dbError.message}\nOriginal title has been restored.`)
                    return
                }
            }
            
            console.log('标题重新生成完成:', newTitle)
            alert(`Title has been updated to: "${newTitle}"`)
        } else {
            console.log('生成的标题与原标题相同或生成失败')
            alert('Title generation failed or is the same as the original title')
        }
        
    } catch (error) {
        console.error('重新生成标题失败:', error)
        alert(`Title regeneration failed: ${error.message}`)
    } finally {
        isRegeneratingTitle.value = false
    }
}

// 批量重新生成所有方案标题
const regenerateAllTitles = async () => {
    if (isRegeneratingTitle.value || historyState.historyPlans.length === 0) return
    
    const planCount = historyState.historyPlans.length
    if (!confirm(`Are you sure you want to regenerate titles for all ${planCount} plans? This operation cannot be undone.`)) {
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
        alert(`Batch title regeneration failed: ${error.message}`)
    } finally {
        isRegeneratingTitle.value = false
    }
}

// 从方案内容生成标题的函数
const generateTitleFromPlan = (plan, maxLength = 50) => {
    if (!plan || !plan.fullPlan) {
        return null
    }
    
    console.log('Starting title generation from plan content...')
    
    // Strategy 1: Extract keywords from research hypothesis
    if (plan.fullPlan.hypotheses && plan.fullPlan.hypotheses.length > 0) {
        const hypothesesText = plan.fullPlan.hypotheses.join(' ')
        const titleFromHypotheses = extractTitleFromContent(hypothesesText, maxLength)
        if (titleFromHypotheses) {
            console.log('Title extracted from research hypothesis:', titleFromHypotheses)
            return titleFromHypotheses
        }
    }
    
    // Strategy 2: Extract keywords from experimental design
    if (plan.fullPlan.experimentalDesign) {
        const titleFromDesign = extractTitleFromContent(plan.fullPlan.experimentalDesign, maxLength)
        if (titleFromDesign) {
            console.log('Title extracted from experimental design:', titleFromDesign)
            return titleFromDesign
        }
    }
    
    // Strategy 3: Extract keywords from data analysis
    if (plan.fullPlan.analysisMethod) {
        const titleFromAnalysis = extractTitleFromContent(plan.fullPlan.analysisMethod, maxLength)
        if (titleFromAnalysis) {
            console.log('Title extracted from data analysis:', titleFromAnalysis)
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
            console.log('Title extracted from comprehensive content:', titleFromAll)
            return titleFromAll
        }
    }
    
    // Strategy 5: Generate default English title based on timestamp
    const now = new Date()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const timeStr = `${month}-${day}-${hours}${minutes}`
    const smartTitle = `Research Plan ${timeStr}`
    
    console.log('Using default English title:', smartTitle)
    return smartTitle
}

// Extract English title from content
const extractTitleFromContent = (content, maxLength = 50) => {
    if (!content || content.length < 10) return null
    
    // Extract English keywords and technical terms
    const keywordPatterns = [
        // Technology and method related
        /\b(using|based on|through|via|with)\s+([A-Za-z][A-Za-z0-9\s]{2,15})\b(?:\s+(?:technology|method|algorithm|system|platform|approach|technique))?/gi,
        // Research subjects and domains
        /\b([A-Za-z][A-Za-z0-9\s]{2,15})\s+(?:impact|effect|influence|relationship|application|performance|evaluation)/gi,
        // Experimental and testing related
        /\b(?:experiment|test|validation|evaluation|assessment)\s+(?:of|on|for)\s+([A-Za-z][A-Za-z0-9\s]{2,15})/gi,
        // Interface and interaction related
        /\b([A-Za-z][A-Za-z0-9\s]{2,15})\s+(?:interface|interaction|design|experience|usability)/gi,
        // AI and intelligence related
        /\b(AI|artificial intelligence|machine learning|deep learning|neural network|intelligent)\s+([A-Za-z][A-Za-z0-9\s]{2,15})/gi,
        // Research topics
        /\b(?:study|research|analysis|investigation)\s+(?:of|on|for)\s+([A-Za-z][A-Za-z0-9\s]{2,15})/gi,
        // Comparative research
        /\b(?:comparison|comparing)\s+([A-Za-z][A-Za-z0-9\s]{2,15})\s+(?:and|vs|versus)\s+([A-Za-z][A-Za-z0-9\s]{2,15})/gi,
        // General English technical terms
        /\b([A-Za-z]{3,15})\s+(?:optimization|enhancement|improvement|development|implementation)/gi
    ]
    
    const extractedKeywords = new Set()
    
    for (const pattern of keywordPatterns) {
        let match
        while ((match = pattern.exec(content)) !== null) {
            // Extract meaningful keywords from matches
            for (let i = 1; i < match.length; i++) {
                if (match[i] && match[i].trim().length > 2) {
                    const keyword = match[i].trim()
                    // Clean up the keyword
                    const cleaned = keyword.replace(/\s+/g, ' ').trim()
                    if (cleaned.length >= 3 && cleaned.length <= 15) {
                        extractedKeywords.add(cleaned)
                    }
                }
            }
        }
    }
    
    // Filter and clean keywords
    const cleanedKeywords = Array.from(extractedKeywords)
        .filter(keyword => {
            const lowerKeyword = keyword.toLowerCase()
            return (
                keyword.length >= 3 && 
                keyword.length <= 15 &&
                // Filter out common generic terms
                !lowerKeyword.includes('experiment') &&
                !lowerKeyword.includes('research') &&
                !lowerKeyword.includes('analysis') &&
                !lowerKeyword.includes('method') &&
                !lowerKeyword.includes('study') &&
                !lowerKeyword.includes('test') &&
                !lowerKeyword.includes('evaluation') &&
                !lowerKeyword.includes('validation') &&
                !lowerKeyword.includes('design') &&
                !lowerKeyword.includes('results') &&
                // Ensure it contains at least one letter
                /[A-Za-z]/.test(keyword)
            )
        })
        .slice(0, 2) // Take at most 2 keywords
    
    if (cleanedKeywords.length > 0) {
        let title = cleanedKeywords.join(' & ')
        
        // If title is too long, use only the first keyword
        if (title.length > maxLength * 0.7) {
            title = cleanedKeywords[0]
        }
        
        // Add "Study" suffix if there's room and it doesn't already contain research terms
        const researchTerms = ['study', 'research', 'analysis', 'evaluation', 'investigation']
        const hasResearchTerm = researchTerms.some(term => 
            title.toLowerCase().includes(term)
        )
        
        if (!hasResearchTerm) {
            const withSuffix = title + ' Study'
            if (withSuffix.length <= maxLength) {
                title = withSuffix
            }
        }
        
        // Ensure title doesn't exceed max length
        if (title.length > maxLength) {
            title = title.substring(0, maxLength - 3) + '...'
        }
        
        // Capitalize first letter of each word
        title = title.split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(' ')
        
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
        console.log('Starting PDF generation:', plan.title)
        
        // Create a new page for PDF generation
        const printWindow = window.open('', '_blank')
        if (!printWindow) {
            throw new Error('Unable to open new window, please allow popups and try again')
        }
        
        // Build complete HTML content
        let htmlContent = `
            <!DOCTYPE html>
            <html lang="en-US">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${plan.title || 'Research Plan'}</title>
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
                <h1>${plan.title || 'Research Plan'}</h1>
                
                <div class="meta-info">
                    <p><strong>Creation Time:</strong>${plan.createdAt || 'Unknown'}</p>
                    <p><strong>Author:</strong>${plan.author || 'Unknown'}</p>
                    <p><strong>Status:</strong>${plan.status || 'Unknown'}</p>
                    ${plan.description ? `<p><strong>Description:</strong>${plan.description}</p>` : ''}
                </div>
        `
        
        // Add research hypothesis
        if (plan.fullPlan && plan.fullPlan.hypotheses && plan.fullPlan.hypotheses.length > 0) {
            htmlContent += `
                <div class="content-section">
                    <h2>Research Hypothesis</h2>
            `
            plan.fullPlan.hypotheses.forEach((hypothesis, index) => {
                const cleanHypothesis = hypothesis.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                htmlContent += `
                    <div class="hypothesis-item">
                        <h3>Hypothesis ${index + 1}</h3>
                        <p>${cleanHypothesis}</p>
                    </div>
                `
            })
            htmlContent += `</div>`
        }
        
        // Add experimental design
        if (plan.fullPlan && plan.fullPlan.experimentalDesign) {
            const cleanDesign = plan.fullPlan.experimentalDesign
                .replace(/\n/g, '<br>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
            htmlContent += `
                <div class="content-section">
                    <h2>Experimental Design</h2>
                    <p>${cleanDesign}</p>
                </div>
            `
        }
        
        // Add data analysis
        if (plan.fullPlan && plan.fullPlan.analysisMethod) {
            const cleanAnalysis = plan.fullPlan.analysisMethod
                .replace(/\n/g, '<br>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
            htmlContent += `
                <div class="content-section">
                    <h2>Data Analysis</h2>
                    <p>${cleanAnalysis}</p>
                </div>
            `
        }
        
        // Add results presentation
        if (plan.fullPlan && plan.fullPlan.expectedResults) {
            const cleanResults = plan.fullPlan.expectedResults
                .replace(/\n/g, '<br>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
            htmlContent += `
                <div class="content-section">
                    <h2>Results Presentation</h2>
                    <p>${cleanResults}</p>
                </div>
            `
        }
        
        // 如果没有内容，添加提示
        if (!plan.fullPlan || (!plan.fullPlan.hypotheses && !plan.fullPlan.experimentalDesign && !plan.fullPlan.analysisMethod && !plan.fullPlan.expectedResults)) {
            htmlContent += `
                <div class="content-section" style="background: #fff3cd; border-color: #ffeaa7;">
                    <h2 style="color: #856404;">Notice</h2>
                    <p style="color: #856404;">This plan has no detailed content, which may be due to data format issues or incomplete plan generation.</p>
                </div>
            `
        }
        
        // 添加页脚
        htmlContent += `
                <div class="footer">
                    <p>This document was generated by MethodMate system</p>
                    <p>Generation time: ${new Date().toLocaleString('en-US')}</p>
                </div>
            </body>
            </html>
        `
        
        // Write to new window
        printWindow.document.write(htmlContent)
        printWindow.document.close()
        
        // Wait for content to load
        await new Promise(resolve => {
            printWindow.onload = resolve
            setTimeout(resolve, 1000) // Backup timeout
        })
        
        console.log('Starting PDF generation...')
        
        // Configure html2pdf options
        const opt = {
            margin: [20, 15, 20, 15],
            filename: `${(plan.title || 'Research Plan').replace(/[<>:"/\\|?*]/g, '_')}.pdf`,
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
        
        // Generate PDF from new window
        await html2pdf().set(opt).from(printWindow.document.body).save()
        
        // Close new window
        setTimeout(() => {
            printWindow.close()
        }, 500)
        
        console.log('PDF generation completed')
        alert('PDF file has been successfully generated and download started!')
        
    } catch (error) {
        console.error('PDF generation failed:', error)
        alert(`PDF generation failed: ${error.message}`)
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