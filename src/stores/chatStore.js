// 全局聊天状态管理
import { reactive, ref } from 'vue'
import { sendStreamMessage } from '../services/aiServiceAdapter.js'
import { getApiBaseUrl } from '../config/environment.js'

// 获取认证头
const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  }
}

// 检查用户是否已登录
const isUserAuthenticated = () => {
  return !!localStorage.getItem('token')
}

// API请求辅助函数
const apiRequest = async (url, options = {}) => {
  try {
    const response = await fetch(`${getApiBaseUrl()}${url}`, {
      ...options,
      headers: {
        ...getAuthHeaders(),
        ...options.headers
      }
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: '网络错误' }))
      throw new Error(errorData.error || `HTTP错误: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API请求失败:', error)
    throw error
  }
}

// 聊天状态
export const chatState = reactive({
  messages: [
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I am MethodMate AI Assistant. How can I help you today?',
      isComplete: true
    }
  ],
  isLoading: false,
  conversationId: null,
  forceUpdateFlag: 0, // Force update flag
  currentUser: null,
  isTyping: false,
  error: null,
  // Page switching state management
  isInitialized: false, // Whether initialized
  lastPageContext: null // Last page context
})

// 监听conversationId的变化，帮助调试
import { watch } from 'vue'
watch(
  () => chatState.conversationId,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      console.warn(`🔄 conversationId 发生变化: ${oldVal} → ${newVal}`)
      console.trace('变化调用堆栈:')
    }
  },
  { immediate: false }
)

// 推荐文献状态
export const papersState = reactive({
  recommendedPapers: [], // 推荐文献列表
  selectedPaper: null, // 当前选中的文献
  referencedPapers: new Set(), // 被选为参考的文献ID集合（保持兼容性）
  referencedPapersList: [], // 引用文献的完整信息列表
  isLoadingRecommendations: false, // 是否正在获取推荐
  recommendationError: '', // 推荐错误信息
  // 搜索相关状态
  searchResults: [], // 搜索结果
  lastSearchQuery: '', // 最后一次搜索的关键词
  searchLoading: false, // 搜索加载状态
  searchError: null, // 搜索错误信息
  searchFilters: { // 搜索过滤器状态
    filterTopVenues: false, // 默认只搜索顶会顶刊（false=只搜索顶会顶刊，true=扩大范围）
    showOnlyTopVenues: false,
    numResults: 10
  },
  // 全局已显示论文跟踪
  displayedPapers: new Set(), // 记录所有已显示过的论文缓存ID
  sessionDisplayedPapers: new Map(), // 会话级别的已显示论文记录 (缓存ID -> 论文标题)
  displayedPaperTitles: new Set(), // 记录所有已显示过的论文标题（用于去重）
  // 外部论文池：一次性获取20篇，然后根据需要扩展
  externalPaperPool: {
    papers: [], // 外部论文池
    currentKeywords: '', // 当前关键词
    totalFetched: 0, // 已获取总数
    isPoolEmpty: false, // 论文池是否已空
    lastFetchTime: null, // 上次获取时间
    remainingInPool: 0 // 后端返回的精确剩余数量
  }
})

// 历史方案状态
export const historyState = reactive({
  historyPlans: [], // 本轮对话的历史方案
  currentViewingPlan: null, // 当前正在查看的历史方案
  currentAppliedPlanId: null // 当前应用中的方案ID
})

// 消息处理队列，防止重复请求
const messageProcessingQueue = new Map()

// ==================== 数据库操作辅助函数 ====================

// 对话相关API
export const conversationAPI = {
  // 获取对话列表
  async getAll() {
    if (!isUserAuthenticated()) return { success: true, conversations: [] }
    return await apiRequest('/conversations')
  },

  // 创建新对话
  async create(title, description = '') {
    if (!isUserAuthenticated()) return { success: false, error: '用户未登录' }
    return await apiRequest('/conversations', {
      method: 'POST',
      body: JSON.stringify({ title, description })
    })
  },

  // 获取对话详情
  async getById(id) {
    if (!isUserAuthenticated()) return { success: false, error: '用户未登录' }
    return await apiRequest(`/conversations/${id}`)
  },

  // 添加消息到对话
  async addMessage(conversationId, role, content) {
    if (!isUserAuthenticated()) return { success: false, error: '用户未登录' }
    return await apiRequest(`/conversations/${conversationId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ role, content })
    })
  },

  // 删除对话
  async delete(id) {
    if (!isUserAuthenticated()) return { success: false, error: '用户未登录' }
    return await apiRequest(`/conversations/${id}`, {
      method: 'DELETE'
    })
  }
}

// 引用文献相关API
export const referencePaperAPI = {
  // 获取用户的引用文献
  async getAll() {
    if (!isUserAuthenticated()) return { success: true, papers: [] }
    return await apiRequest('/reference-papers')
  },

  // 添加引用文献
  async add(paperData) {
    if (!isUserAuthenticated()) return { success: false, error: '用户未登录' }
    return await apiRequest('/reference-papers', {
      method: 'POST',
      body: JSON.stringify(paperData)
    })
  },

  // 删除引用文献
  async delete(id) {
    if (!isUserAuthenticated()) return { success: false, error: '用户未登录' }
    return await apiRequest(`/reference-papers/${id}`, {
      method: 'DELETE'
    })
  }
}

// 研究方案相关API
export const researchPlanAPI = {
  // 获取用户的研究方案
  async getAll() {
    if (!isUserAuthenticated()) return { success: true, plans: [] }
    return await apiRequest('/research-plans')
  },

  // 创建研究方案
  async create(planData) {
    if (!isUserAuthenticated()) return { success: false, error: '用户未登录' }
    return await apiRequest('/research-plans', {
      method: 'POST',
      body: JSON.stringify(planData)
    })
  },

  // 获取研究方案详情
  async getById(id) {
    if (!isUserAuthenticated()) return { success: false, error: '用户未登录' }
    return await apiRequest(`/research-plans/${id}`)
  },

  // 更新研究方案
  async update(id, planData) {
    if (!isUserAuthenticated()) return { success: false, error: '用户未登录' }
    return await apiRequest(`/research-plans/${id}`, {
      method: 'PUT',
      body: JSON.stringify(planData)
    })
  },

  // 删除研究方案
  async delete(id) {
    if (!isUserAuthenticated()) return { success: false, error: '用户未登录' }
    return await apiRequest(`/research-plans/${id}`, {
      method: 'DELETE'
    })
  }
}

// 数据加载函数
export const loadUserData = async () => {
  if (!isUserAuthenticated()) {
    console.log('用户未登录，跳过数据加载')
    return
  }

  try {
    console.log('开始加载用户数据...')
    
    // 并行加载用户数据
    const [conversationsResult, papersResult, plansResult] = await Promise.all([
      conversationAPI.getAll(),
      referencePaperAPI.getAll(),
      researchPlanAPI.getAll()
    ])

    // 加载引用文献
    if (papersResult.success && papersResult.papers) {
      papersState.referencedPapersList = papersResult.papers.map(paper => ({
        id: paper.paper_id || paper.id, // 使用paper_id作为前端ID，如果没有则使用数据库ID
        title: paper.title,
        authors: paper.authors ? paper.authors.split(', ') : [],
        abstract: paper.abstract || '',
        summary: paper.abstract || '',
        doi: paper.doi || '',
        url: paper.url || '',
        scholar_url: paper.url || '',
        year: paper.year,
        journal: paper.journal || '',
        venue: paper.journal || '',
        referencedAt: paper.created_at,
        source: 'database',
        databaseId: paper.id // 保存数据库ID
      }))
      
      // 更新引用文献ID集合，使用paper_id或数据库ID
      papersState.referencedPapers.clear()
      papersResult.papers.forEach(paper => {
        const frontendId = paper.paper_id || paper.id
        papersState.referencedPapers.add(frontendId)
        
        // 同时标记为已显示，避免重复推荐
        if (paper.title) {
          papersState.displayedPaperTitles.add(paper.title.toLowerCase())
        }
      })
      
      console.log(`已加载 ${papersResult.papers.length} 篇引用文献，并标记为已显示`)
    }

    // 加载历史方案
    if (plansResult.success && plansResult.plans) {
      historyState.historyPlans = plansResult.plans.map(plan => {
        // 解析hypotheses字段中的JSON数据
        let parsedHypotheses = []
        try {
          if (plan.hypotheses) {
            parsedHypotheses = JSON.parse(plan.hypotheses)
          }
        } catch (error) {
          console.warn(`解析方案 ${plan.title} 的hypotheses字段失败:`, error)
        }
        
        // 尝试解析resources字段中的JSON数据（生成上下文）
        let parsedContext = null
        try {
          if (plan.resources) {
            parsedContext = JSON.parse(plan.resources)
          }
        } catch (error) {
          console.warn(`解析方案 ${plan.title} 的resources字段失败:`, error)
        }
        
        // 尝试解析source_introductions字段中的JSON数据
        let parsedSourceIntroductions = {}
        try {
          if (plan.source_introductions) {
            parsedSourceIntroductions = JSON.parse(plan.source_introductions)
          }
        } catch (error) {
          console.warn(`解析方案 ${plan.title} 的source_introductions字段失败:`, error)
        }
        
        return {
          id: plan.id,
          title: plan.title,
          description: plan.description,
          createdAt: new Date(plan.created_at).toLocaleString('zh-CN'),
          updatedAt: new Date(plan.updated_at).toLocaleString('zh-CN'),
          author: 'AI智能体',
          status: plan.status === 'active' ? '已应用' : '已生成',
          fullPlan: {
            title: plan.title,
            researchQuestions: plan.description,
            methodology: plan.methodology,
            timeline: plan.timeline,
            resources: plan.resources,
            // 从数据库字段直接提取
            hypotheses: parsedHypotheses,
            experimentalDesign: plan.experimental_design || '',
            analysisMethod: plan.analysis_method || '',
            expectedResults: plan.expected_results || '',
            isGenerated: true,
            lastUpdated: plan.updated_at
          },
          generationContext: parsedContext,
          sourceIntroductions: parsedSourceIntroductions,
          databaseId: plan.id // 保存数据库ID
        }
      })
      
      console.log(`已加载 ${plansResult.plans.length} 个历史方案`)
    }

    console.log('用户数据加载完成')
  } catch (error) {
    console.error('加载用户数据失败:', error)
  }
}

// 从localStorage恢复当前方案状态
const loadCurrentPlanFromStorage = () => {
  try {
    const saved = localStorage.getItem('methodmate_current_plan')
    if (saved) {
      const parsed = JSON.parse(saved)
      return {
        title: parsed.title || 'AI-Edited Images and Videos Impact on Human Memory',
        researchQuestions: parsed.researchQuestions || 'How do AI-edited images and videos impact human memory formation and recall accuracy? How does this effect differ from traditional media?',
        methodology: parsed.methodology || 'A mixed-methods research approach combining experimental research and questionnaire surveys. Experimental and control groups will be exposed to AI-edited and traditionally edited media content respectively.',
        dataCollection: parsed.dataCollection || 'Data collection through online experimental platforms where participants complete memory tests and questionnaire surveys. Eye-tracking technology records participants\' attention allocation while viewing content.',
        analysisMethod: parsed.analysisMethod || 'Quantitative analysis using SPSS including Analysis of Variance (ANOVA) and multiple regression analysis. Qualitative data will be coded and analyzed through thematic analysis methods.',
        hypotheses: parsed.hypotheses || [
          'H1: Exposure to AI-edited media content will lead to higher false memory formation rates.',
          'H2: Uncertainty characteristics of AI-edited content will increase the degree of memory distortion.',
          'H3: Participants\' media literacy level will moderate the impact of AI-edited content on memory.'
        ],
        experimentalDesign: parsed.experimentalDesign || 'Adopt a 2x2 mixed experimental design, manipulating media type (AI-edited vs. traditional editing) and presentation style (static vs. dynamic).',
        variables: parsed.variables || 'Independent variables: media type, presentation method; Dependent variables: memory accuracy, false memory ratio; Control variables: media literacy, age, educational background.',
        statisticalTools: parsed.statisticalTools || 'SPSS 26.0, R Studio, Python data analysis packages (pandas, numpy, scipy)',
        expectedResults: parsed.expectedResults || 'Expected that AI-edited media content will lead to higher false memory formation rates, and this effect will be moderated by participants\' media literacy level.',
        visualization: parsed.visualization || 'Create interaction effect plots using ggplot2, draw correlation heatmaps and box plots using Python\'s seaborn library.',
        references: parsed.references || [
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
        full: parsed.full || {
          sourceIntro: 'This paper examines the role that enchantment plays in the design of AI things by constructing a taxonomy of design approaches that increase or decrease the perception of magic and enchantment. We start from the design discourse surrounding recent developments in AI technologies, highlighting specific interaction qualities such as algorithmic uncertainties and errors and articulating relations to the rhetoric of magic and supernatural thinking.',
          methodIntro: 'The research methodology follows a mixed-methods approach, combining experimental research with survey methods. The experimental group and control group will be exposed to AI-edited and traditionally edited media content respectively.'
        },
        hypothesis: parsed.hypothesis || {
          sourceIntro: 'The formation of research hypotheses is based on a systematic review of existing literature, particularly research on the impact of AI technology on human cognition. We integrated the latest findings from cognitive science, artificial intelligence, and human-computer interaction.',
          methodIntro: 'Hypothesis validation will use experimental research methods to test the impact of AI-edited content on memory formation through a strictly controlled experimental environment. The experimental design includes pre-tests and post-tests to ensure result reliability.'
        },
        design: parsed.design || {
          sourceIntro: 'The experimental design references multiple classic memory research paradigms and incorporates the latest AI technology development characteristics. The design proposal has been optimized through expert reviews and pilot experiments.',
          methodIntro: 'Adopt a 2x2 mixed experimental design, manipulating media type (AI-edited vs. traditional editing) and presentation style (static vs. dynamic). All experimental materials have been standardized.'
        },
        analysis: parsed.analysis || {
          sourceIntro: 'The selection of data analysis methods is based on recently published similar studies and considers the characteristics of the data and research objectives. The analysis framework has been reviewed and validated by methodological experts.',
          methodIntro: 'Use SPSS 26.0 for quantitative analysis, including descriptive statistics, analysis of variance, and regression analysis. Qualitative data uses thematic coding methods with NVivo software for assisted analysis.'
        },
        results: parsed.results || {
          sourceIntro: 'The presentation of research results references standards from top journals in the field, ensuring clarity and scientific rigor in data visualization.',
          methodIntro: 'Results presentation uses multiple visualization methods, including interaction effect plots, heat maps, and box plots. All charts follow APA formatting standards.'
        },
        isGenerated: parsed.isGenerated || false,
        sourceIntroductions: parsed.sourceIntroductions || {
          full: '',
          hypothesis: '',
          design: '',
          analysis: '',
          results: ''
        },
        lastUpdated: parsed.lastUpdated || null,
        iterationHistory: parsed.iterationHistory || [],
        // 迭代快照持久化字段
        lastIterationSnapshot: parsed.lastIterationSnapshot || null,
        lastIterationAfterSnapshot: parsed.lastIterationAfterSnapshot || null,
        lastIterationSection: parsed.lastIterationSection || null,
        lastIterationSuggestion: parsed.lastIterationSuggestion || null,
        lastIterationMessageId: parsed.lastIterationMessageId || null
      }
    }
  } catch (error) {
    console.error('从localStorage恢复方案状态失败:', error)
  }
  
  // 返回默认值
  return {
    title: 'AI-Edited Images and Videos Impact on Human Memory',
    researchQuestions: 'How do AI-edited images and videos impact human memory formation and recall accuracy? How does this effect differ from traditional media?',
    methodology: 'A mixed-methods research approach combining experimental research and questionnaire surveys. Experimental and control groups will be exposed to AI-edited and traditionally edited media content respectively.',
    dataCollection: 'Data collection through online experimental platforms where participants complete memory tests and questionnaire surveys. Eye-tracking technology records participants\' attention allocation while viewing content.',
    analysisMethod: 'Quantitative analysis using SPSS including Analysis of Variance (ANOVA) and multiple regression analysis. Qualitative data will be coded and analyzed through thematic analysis methods.',
    hypotheses: [
      'H1: Exposure to AI-edited media content will lead to higher false memory formation rates.',
      'H2: Uncertainty characteristics of AI-edited content will increase the degree of memory distortion.',
      'H3: Participants\' media literacy level will moderate the impact of AI-edited content on memory.'
    ],
    experimentalDesign: 'Adopt a 2x2 mixed experimental design, manipulating media type (AI-edited vs. traditional editing) and presentation style (static vs. dynamic).',
    variables: 'Independent variables: media type, presentation method; Dependent variables: memory accuracy, false memory ratio; Control variables: media literacy, age, educational background.',
    statisticalTools: 'SPSS 26.0, R Studio, Python data analysis packages (pandas, numpy, scipy)',
    expectedResults: 'Expected that AI-edited media content will lead to higher false memory formation rates, and this effect will be moderated by participants\' media literacy level.',
    visualization: 'Create interaction effect plots using ggplot2, draw correlation heatmaps and box plots using Python\'s seaborn library.',
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
      sourceIntro: 'The formation of research hypotheses is based on a systematic review of existing literature, particularly research on the impact of AI technology on human cognition. We integrated the latest findings from cognitive science, artificial intelligence, and human-computer interaction.',
      methodIntro: 'Hypothesis validation will use experimental research methods to test the impact of AI-edited content on memory formation through a strictly controlled experimental environment. The experimental design includes pre-tests and post-tests to ensure result reliability.'
    },
    design: {
      sourceIntro: 'The experimental design references multiple classic memory research paradigms and incorporates the latest AI technology development characteristics. The design proposal has been optimized through expert reviews and pilot experiments.',
      methodIntro: 'Adopt a 2x2 mixed experimental design, manipulating media type (AI-edited vs. traditional editing) and presentation style (static vs. dynamic). All experimental materials have been standardized.'
    },
    analysis: {
      sourceIntro: 'The selection of data analysis methods is based on recently published similar studies and considers the characteristics of the data and research objectives. The analysis framework has been reviewed and validated by methodological experts.',
      methodIntro: 'Use SPSS 26.0 for quantitative analysis, including descriptive statistics, analysis of variance, and regression analysis. Qualitative data uses thematic coding methods with NVivo software for assisted analysis.'
    },
    results: {
      sourceIntro: 'The presentation of research results references standards from top journals in the field, ensuring clarity and scientific rigor in data visualization.',
      methodIntro: 'Results presentation uses multiple visualization methods, including interaction effect plots, heat maps, and box plots. All charts follow APA formatting standards.'
    },
    isGenerated: false,
    sourceIntroductions: {
      full: '',
      hypothesis: '',
      design: '',
      analysis: '',
      results: ''
    },
    lastUpdated: null,
    iterationHistory: [],
    lastIterationSnapshot: null,
    lastIterationAfterSnapshot: null,
    lastIterationSection: null,
    lastIterationSuggestion: null,
    lastIterationMessageId: null
  }
}

// 保存当前方案状态到localStorage
const saveCurrentPlanToStorage = () => {
  try {
    const dataToSave = {
      title: currentPlanState.title,
      researchQuestions: currentPlanState.researchQuestions,
      methodology: currentPlanState.methodology,
      dataCollection: currentPlanState.dataCollection,
      analysisMethod: currentPlanState.analysisMethod,
      hypotheses: currentPlanState.hypotheses,
      experimentalDesign: currentPlanState.experimentalDesign,
      variables: currentPlanState.variables,
      statisticalTools: currentPlanState.statisticalTools,
      expectedResults: currentPlanState.expectedResults,
      visualization: currentPlanState.visualization,
      references: currentPlanState.references,
      full: currentPlanState.full,
      hypothesis: currentPlanState.hypothesis,
      design: currentPlanState.design,
      analysis: currentPlanState.analysis,
      results: currentPlanState.results,
      isGenerated: currentPlanState.isGenerated,
      sourceIntroductions: currentPlanState.sourceIntroductions,
      lastUpdated: currentPlanState.lastUpdated,
      iterationHistory: currentPlanState.iterationHistory,
      lastIterationSnapshot: currentPlanState.lastIterationSnapshot,
      lastIterationAfterSnapshot: currentPlanState.lastIterationAfterSnapshot,
      lastIterationSection: currentPlanState.lastIterationSection,
      lastIterationSuggestion: currentPlanState.lastIterationSuggestion,
      lastIterationMessageId: currentPlanState.lastIterationMessageId
    }
    localStorage.setItem('methodmate_current_plan', JSON.stringify(dataToSave))
  } catch (error) {
    console.error('保存方案状态到localStorage失败:', error)
  }
}

// 当前方案状态
export const currentPlanState = reactive(loadCurrentPlanFromStorage())

// 监听状态变化，自动保存到localStorage
watch(currentPlanState, () => {
  saveCurrentPlanToStorage()
}, { deep: true })

// 迭代前方案状态存储（临时状态，用于当前会话）
export const iterationState = reactive({
  beforeIteration: null, // 存储迭代前的方案状态
  afterIteration: null, // 存储迭代后的方案状态
  iterationSection: null, // 当前迭代的部分
  iterationSuggestion: null, // 迭代建议
  hasComparison: false, // 是否可以进行对比
  lastIterationMessageId: null // 最后一次迭代消息的ID
})

// 推荐文献相关方法
export const addRecommendedPapers = (papers) => {
  // 使用 unshift 将新论文添加到列表顶部
  papersState.recommendedPapers.unshift(...papers)
}

export const selectPaper = (paper) => {
  papersState.selectedPaper = paper
}

export const toggleReference = async (paper) => {
  const paperId = paper.id
  
  if (papersState.referencedPapers.has(paperId)) {
    // 移除引用
    const referencedPaper = papersState.referencedPapersList.find(p => p.id === paperId)
    
    // 从前端状态移除
    papersState.referencedPapers.delete(paperId)
    papersState.referencedPapersList = papersState.referencedPapersList.filter(p => p.id !== paperId)
    
    // 如果用户已登录且论文是从数据库加载的，则从数据库删除
    if (isUserAuthenticated() && referencedPaper && referencedPaper.databaseId) {
      try {
        await referencePaperAPI.delete(referencedPaper.databaseId)
        console.log(`已从数据库删除引用文献: ${paper.title}`)
      } catch (error) {
        console.error('从数据库删除引用文献失败:', error)
        // 即使数据库操作失败，也保持前端状态的更新
      }
    }
    
    console.log(`已移除引用文献: ${paper.title}`)
  } else {
    // 添加引用
    papersState.referencedPapers.add(paperId)
    
    // 创建引用论文对象
    const referencedPaper = {
      ...paper,
      referencedAt: new Date().toISOString(),
      source: paper.source || 'recommendation', // 标记来源
      databaseId: null // 数据库ID，稍后会更新
    }
    
    // 立即添加到引用列表，不等待数据库操作
    papersState.referencedPapersList.push(referencedPaper)
    console.log(`已添加引用文献: ${paper.title}`)
    
    // 如果用户已登录，保存到数据库
    if (isUserAuthenticated()) {
      try {
        const paperData = {
          title: paper.title,
          authors: Array.isArray(paper.authors) ? paper.authors.join(', ') : (paper.authors || ''),
          abstract: paper.abstract || paper.summary || '',
          doi: paper.doi || '',
          url: paper.scholar_url || paper.url || '',
          year: paper.year || null,
          journal: paper.journal || paper.venue || '',
          paper_id: paper.id ? paper.id.toString() : null,
          conversation_id: chatState.conversationId || null
        }
        
        const result = await referencePaperAPI.add(paperData)
        if (result.success) {
          // 更新前端对象的数据库ID
          const refPaper = papersState.referencedPapersList.find(p => p.id === paperId)
          if (refPaper) {
            refPaper.databaseId = result.paper.id
          }
          console.log(`已保存引用文献到数据库: ${paper.title}`)
        }
      } catch (error) {
        console.error('保存引用文献到数据库失败:', error)
        // 不阻止添加引用，只记录错误
      }
    }
    
    // 如果论文没有研究方法，在后台异步获取
    if (!referencedPaper.researchMethod) {
      // 异步获取研究方法，不阻塞UI
      (async () => {
        try {
          console.log(`开始后台获取研究方法: ${paper.title}`)
          
          // 如果有全文，直接尝试提取研究方法
          if (referencedPaper.fullText) {
            const methodResponse = await fetch(`${getApiBaseUrl()}/paper/generate-method-summary`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                title: referencedPaper.title,
                fullText: referencedPaper.fullText
              })
            });

            if (methodResponse.ok) {
              const methodResult = await methodResponse.json();
              if (methodResult.success && methodResult.methodSummary) {
                // 更新引用列表中的论文
                const refPaper = papersState.referencedPapersList.find(p => p.id === paperId);
                if (refPaper) {
                  refPaper.researchMethod = methodResult.methodSummary;
                }
                // 同时更新原始论文对象
                paper.researchMethod = methodResult.methodSummary;
                console.log(`成功获取研究方法: ${paper.title}`)
              }
            }
          } 
          // 如果没有全文，先获取全文再提取研究方法
          else {
            // 获取当前AI服务类型
            const { getCurrentAIService } = await import('./aiServiceStore.js')
            const currentAIService = getCurrentAIService()
            
            const response = await fetch(`${getApiBaseUrl()}/paper/get-full-content`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                title: referencedPaper.title,
                doi: referencedPaper.doi || null,
                aiService: currentAIService === 'chatgpt' ? 'chatgpt' : 'coze'
              })
            });

            if (response.ok) {
              const result = await response.json();
              if (result.success) {
                // 找到引用列表中的论文对象
                const refPaper = papersState.referencedPapersList.find(p => p.id === paperId);
                
                // 保存全文
                if (result.fullText && refPaper) {
                  refPaper.fullText = result.fullText;
                  paper.fullText = result.fullText;
                }
                
                // 如果API直接返回了研究方法
                if (result.researchMethod && refPaper) {
                  refPaper.researchMethod = result.researchMethod;
                  paper.researchMethod = result.researchMethod;
                  console.log(`成功获取研究方法: ${paper.title}`)
                }
                // 如果没有研究方法但有全文，尝试生成研究方法概要
                else if (result.fullText && refPaper) {
                  const methodResponse = await fetch(`${getApiBaseUrl()}/paper/generate-method-summary`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      title: referencedPaper.title,
                      fullText: result.fullText
                    })
                  });

                  if (methodResponse.ok) {
                    const methodResult = await methodResponse.json();
                    if (methodResult.success && methodResult.methodSummary) {
                      refPaper.researchMethod = methodResult.methodSummary;
                      paper.researchMethod = methodResult.methodSummary;
                      console.log(`成功获取研究方法: ${paper.title}`)
                    }
                  }
                }
              }
            }
          }
        } catch (error) {
          console.error(`后台获取研究方法失败: ${paper.title}`, error);
          // 不阻止添加引用，只记录错误
        }
        
        // 更新推荐列表中对应的论文
        const paperInRecommended = papersState.recommendedPapers.find(p => p.id === paperId);
        if (paperInRecommended) {
          const refPaper = papersState.referencedPapersList.find(p => p.id === paperId);
          if (refPaper) {
            if (refPaper.fullText) {
              paperInRecommended.fullText = refPaper.fullText;
            }
            if (refPaper.researchMethod) {
              paperInRecommended.researchMethod = refPaper.researchMethod;
            }
          }
        }
      })();
    }
  }
}

export const isReferenced = (paper) => {
  return papersState.referencedPapers.has(paper.id)
}

export const removePaper = (index) => {
  const paperToRemove = papersState.recommendedPapers[index]
  
  // 如果删除的是当前选中的文献，清除选择状态
  if (papersState.selectedPaper === paperToRemove) {
    papersState.selectedPaper = null
  }
  
  // 如果删除的文献被选为参考，也要从参考集合中移除
  if (paperToRemove && papersState.referencedPapers.has(paperToRemove.id)) {
    papersState.referencedPapers.delete(paperToRemove.id)
    papersState.referencedPapersList = papersState.referencedPapersList.filter(p => p.id !== paperToRemove.id)
  }
  
  // 【新增】从已显示记录中移除删除的论文
  if (paperToRemove) {
    // 如果有缓存ID，从已显示缓存ID记录中移除
    if (paperToRemove.cache_id) {
      papersState.displayedPapers.delete(paperToRemove.cache_id)
      papersState.sessionDisplayedPapers.delete(paperToRemove.cache_id)
    }
    
    // 从已显示标题记录中移除
    if (paperToRemove.title) {
      papersState.displayedPaperTitles.delete(paperToRemove.title.toLowerCase())
    }
    
    console.log(`已从已显示记录中移除论文: ${paperToRemove.title}`)
  }
  
  papersState.recommendedPapers.splice(index, 1)
}

export const clearAllPapers = () => {
  papersState.recommendedPapers = []
  papersState.selectedPaper = null
  papersState.referencedPapers.clear()
  papersState.referencedPapersList = []
  
  // 【新增】清空已显示论文记录
  clearDisplayedPapers()
  
  console.log('🧹 已清空所有论文列表和已显示记录')
}

export const clearReferences = async () => {
  // 如果用户已登录，批量删除数据库中的引用文献
  if (isUserAuthenticated()) {
    const deletePromises = papersState.referencedPapersList
      .filter(paper => paper.databaseId)
      .map(paper => referencePaperAPI.delete(paper.databaseId).catch(error => {
        console.error(`删除文献 ${paper.title} 失败:`, error)
      }))
    
    if (deletePromises.length > 0) {
      try {
        await Promise.all(deletePromises)
        console.log('已从数据库删除所有引用文献')
      } catch (error) {
        console.error('批量删除引用文献时出现错误:', error)
      }
    }
  }
  
  // 【新增】从已显示记录中移除所有参考文献
  papersState.referencedPapersList.forEach(paper => {
    if (paper.cache_id) {
      papersState.displayedPapers.delete(paper.cache_id)
      papersState.sessionDisplayedPapers.delete(paper.cache_id)
    }
    
    if (paper.title) {
      papersState.displayedPaperTitles.delete(paper.title.toLowerCase())
    }
  })
  
  // 清空前端状态
  papersState.referencedPapers.clear()
  papersState.referencedPapersList = []
  console.log('🧹 已清空所有引用文献和相关已显示记录')
}

export const removePaperFromReferences = async (paper) => {
  // 从Set中移除
  papersState.referencedPapers.delete(paper.id || paper.title)
  
  // 从完整列表中移除
  const index = papersState.referencedPapersList.findIndex(p => 
    (p.id && p.id === paper.id) || 
    (p.title === paper.title)
  )
  
  if (index > -1) {
    const referencedPaper = papersState.referencedPapersList[index]
    papersState.referencedPapersList.splice(index, 1)
    
    // 【新增】从已显示记录中移除删除的参考文献
    if (referencedPaper.cache_id) {
      papersState.displayedPapers.delete(referencedPaper.cache_id)
      papersState.sessionDisplayedPapers.delete(referencedPaper.cache_id)
    }
    
    if (referencedPaper.title) {
      papersState.displayedPaperTitles.delete(referencedPaper.title.toLowerCase())
    }
    
    // 如果用户已登录且论文有数据库ID，从数据库删除
    if (isUserAuthenticated() && referencedPaper.databaseId) {
      try {
        await referencePaperAPI.delete(referencedPaper.databaseId)
        console.log(`已从数据库删除参考文献: ${paper.title}`)
      } catch (error) {
        console.error('从数据库删除参考文献失败:', error)
        // 即使数据库操作失败，也保持前端状态的更新
      }
    }
    
    console.log('移除参考文献:', paper.title)
  }
}

export const setLoadingRecommendations = (loading) => {
  papersState.isLoadingRecommendations = loading
}

export const setRecommendationError = (error) => {
  papersState.recommendationError = error
}

// 搜索相关方法
export const setSearchResults = (results, query) => {
  papersState.searchResults = results.map((paper, index) => ({
    ...paper,
    id: paper.id || `search_${Date.now()}_${index}`, // 确保每个搜索结果都有唯一ID
    source: 'search' // 标记为搜索来源
  }))
  papersState.lastSearchQuery = query
  console.log(`保存搜索结果: ${results.length} 篇文献，关键词: "${query}"`)
}

export const setSearchLoading = (loading) => {
  papersState.searchLoading = loading
}

export const setSearchError = (error) => {
  papersState.searchError = error
}

export const updateSearchFilters = (filters) => {
  Object.assign(papersState.searchFilters, filters)
}

export const clearSearchResults = () => {
  papersState.searchResults = []
  papersState.lastSearchQuery = ''
  papersState.searchError = null
  
  // 【新增】清空已显示论文记录，允许重新搜索相同论文
  clearDisplayedPapers()
  
  console.log('🧹 已清空搜索结果和已显示记录，可重新搜索')
}

// 发送消息的方法
export const sendMessage = async (message, pageContext = null) => {
  try {
    console.log('🔥 sendMessage开始执行')
    console.log('conversationId在sendMessage开始时:', chatState.conversationId)
    
    const processingId = Date.now() + '_' + Math.random().toString(36).substr(2, 9)
    
    // 检查是否已经在处理相同的消息
    if (messageProcessingQueue.has(message)) {
      console.log('消息正在处理中，跳过重复请求')
      return
    }
    
    // 检查消息是否为空或者正在加载中
    if (!message.trim() || chatState.isLoading) return
    
    // 设置加载状态并添加到处理队列
    chatState.isLoading = true
    messageProcessingQueue.set(message, processingId)
    
    console.log('设置isLoading后，conversationId:', chatState.conversationId)

    // 确保新消息ID不会与现有消息冲突
    const existingIds = new Set(chatState.messages.map(m => m.id))
    let messageId = chatState.messages.length + 1
    while (existingIds.has(messageId)) {
      messageId++
    }
    
    // 添加用户消息（只显示用户输入的消息，不包含上下文）
    const userMessage = {
      id: messageId,
      type: 'user',
      content: message,
      isComplete: true,
      saved: false // 标记为未保存到数据库
    }
    chatState.messages.push(userMessage)

    console.log('=== 准备保存用户消息 ===')
    console.log('用户已登录:', isUserAuthenticated())
    console.log('当前对话ID:', chatState.conversationId)
    console.log('用户消息内容:', message.substring(0, 50) + '...')
    
    // 如果有当前对话且用户已登录，立即保存用户消息
    if (isUserAuthenticated() && chatState.conversationId) {
      try {
        console.log('正在调用API保存用户消息到对话:', chatState.conversationId)
        const result = await conversationAPI.addMessage(chatState.conversationId, 'user', message)
        if (result.success) {
          userMessage.saved = true
          userMessage.databaseId = result.message.id
          console.log('✅ 用户消息已保存到数据库:', message.substring(0, 50) + '...', '数据库ID:', result.message.id)
        } else {
          console.error('❌ 用户消息保存失败:', result.error)
        }
      } catch (error) {
        console.error('保存用户消息时发生异常:', error)
      }
    } else {
      console.warn('⚠️ 用户消息未保存 - 用户登录状态:', isUserAuthenticated(), '对话ID:', chatState.conversationId)
    }

    // 添加助手消息占位
    const assistantMessageId = messageId + 1
    const assistantMessage = {
      id: assistantMessageId,
      type: 'assistant',
      content: '',
      isComplete: false,
      saved: false
    }
    chatState.messages.push(assistantMessage)

    // 构建实际发送给AI的消息（包含上下文）
    let messageWithContext = message
    
    if (pageContext === 'research-plan') {
      // On research plan page, add current plan as context
      const planContext = buildCurrentPlanContext()
      if (planContext) {
        messageWithContext = `${planContext}\n\nUser Question: ${message}`
        console.log('Sending message with current plan context')
      }
    }

    console.log('🚀 开始调用AI服务...')
    
    await sendStreamMessage(messageWithContext, (chunk, fullResponse) => {
      // 更新助手消息内容 - 强制Vue响应式更新
      console.log('📥 chatStore onChunk被调用，内容长度:', fullResponse.length)
      const assistantMsgIndex = chatState.messages.findIndex(m => m.id === assistantMessageId)
      if (assistantMsgIndex !== -1) {
        console.log('找到助手消息，更新内容:', assistantMessageId)
        
        // 创建新的消息数组，确保Vue检测到变化
        const newMessages = [...chatState.messages]
        newMessages[assistantMsgIndex] = {
          ...newMessages[assistantMsgIndex],
          content: fullResponse
        }
        chatState.messages = newMessages
        
        // 强制触发Vue重新渲染
        chatState.forceUpdateFlag = Date.now()
        
        //          console.log('助手消息内容已更新，新长度:', newMessages[assistantMsgIndex].content.length)
        //  console.log('强制更新后的消息数组长度:', chatState.messages.length)
        //  console.log('更新后的消息对象:', { 
        //    id: newMessages[assistantMsgIndex].id,
        //    type: newMessages[assistantMsgIndex].type,
        //    content: newMessages[assistantMsgIndex].content.substring(0, 50) + '...',
        //    isComplete: newMessages[assistantMsgIndex].isComplete
        //  })
      } else {
        console.log('未找到助手消息，ID:', assistantMessageId)
        console.log('当前消息列表:', chatState.messages.map(m => ({ id: m.id, type: m.type })))
      }
    }, chatState.messages)

    console.log('🎉 AI服务调用完成')
    
    // 标记消息完成
    const assistantMsgIndex = chatState.messages.findIndex(m => m.id === assistantMessageId)
    if (assistantMsgIndex !== -1) {
      const newMessages = [...chatState.messages]
      newMessages[assistantMsgIndex] = {
        ...newMessages[assistantMsgIndex],
        isComplete: true
      }
      chatState.messages = newMessages
      
      // 强制触发Vue重新渲染
      chatState.forceUpdateFlag = Date.now()
      
      console.log('=== 准备保存助手消息 ===')
      console.log('用户已登录:', isUserAuthenticated())
      console.log('当前对话ID:', chatState.conversationId)
      console.log('助手消息内容长度:', chatState.messages[assistantMsgIndex].content.length)
      
      // 如果有当前对话且用户已登录，保存助手消息
      if (isUserAuthenticated() && chatState.conversationId) {
        try {
          console.log('正在调用API保存助手消息到对话:', chatState.conversationId)
          const result = await conversationAPI.addMessage(chatState.conversationId, 'assistant', chatState.messages[assistantMsgIndex].content)
          if (result.success) {
            const newMessages = [...chatState.messages]
            newMessages[assistantMsgIndex] = {
              ...newMessages[assistantMsgIndex],
              saved: true,
              databaseId: result.message.id
            }
            chatState.messages = newMessages
            console.log('✅ 助手消息已保存到数据库:', newMessages[assistantMsgIndex].content.substring(0, 50) + '...', '数据库ID:', result.message.id)
          } else {
            console.error('❌ 助手消息保存失败:', result.error)
          }
        } catch (error) {
          console.error('保存助手消息时发生异常:', error)
        }
      } else {
        console.warn('⚠️ 助手消息未保存 - 用户登录状态:', isUserAuthenticated(), '对话ID:', chatState.conversationId)
      }
    }
  } catch (error) {
    console.error('聊天错误:', error)
    
    // 移除空的助手消息
    chatState.messages = chatState.messages.filter(m => m.id !== assistantMessageId)
    
    // 添加错误消息
          const errorMessage = {
        id: assistantMessageId,
        type: 'assistant',
        content: 'Sorry, I encountered some issues. Error message: ' + (error.message || 'Unknown error') + '\nPlease try again later, or refresh the page to retry.',
        isComplete: true,
        isError: true,
        saved: false
      }
    chatState.messages.push(errorMessage)
    
    // 也尝试保存错误消息
    if (isUserAuthenticated() && chatState.conversationId) {
      try {
        await conversationAPI.addMessage(chatState.conversationId, 'assistant', errorMessage.content)
        errorMessage.saved = true
      } catch (saveError) {
        console.error('保存错误消息失败:', saveError)
      }
    }
  } finally {
    // 清理处理队列
    messageProcessingQueue.delete(message)
    chatState.isLoading = false
  }
}

// Helper method to build current proposal context
const buildCurrentPlanContext = () => {
  if (!currentPlanState.isGenerated) {
    return null // If no generated proposal, don't add context
  }
  
  let context = 'Current Research Proposal Context:\n'
  
  if (currentPlanState.title) {
    context += `Proposal Title: ${currentPlanState.title}\n`
  }
  
  if (currentPlanState.researchQuestions) {
    context += `Research Questions: ${currentPlanState.researchQuestions}\n`
  }
  
  if (currentPlanState.hypotheses && currentPlanState.hypotheses.length > 0) {
    context += `Research Hypotheses:\n${currentPlanState.hypotheses.map((h, i) => `${i + 1}. ${h}`).join('\n')}\n`
  }
  
  if (currentPlanState.experimentalDesign) {
    context += `Experimental Design: ${currentPlanState.experimentalDesign}\n`
  }
  
  if (currentPlanState.analysisMethod) {
    context += `Data Analysis Method: ${currentPlanState.analysisMethod}\n`
  }
  
  if (currentPlanState.expectedResults) {
    context += `Expected Results: ${currentPlanState.expectedResults}\n`
  }
  
  context += '\nPlease answer the user\'s question based on the above research proposal context.'
  
  return context
}

// 检查是否需要重新初始化（用于页面切换时的状态保持）
export const shouldReinitialize = (pageContext) => {
  // 如果已经初始化过且有对话状态，检查页面上下文是否变化
  if (chatState.isInitialized && chatState.conversationId && chatState.messages.length > 1) {
    const contextChanged = chatState.lastPageContext !== pageContext
    console.log('页面切换检查:', {
      isInitialized: chatState.isInitialized,
      hasConversation: !!chatState.conversationId,
      messageCount: chatState.messages.length,
      lastContext: chatState.lastPageContext,
      currentContext: pageContext,
      contextChanged,
      shouldReinit: contextChanged
    })
    return contextChanged
  }
  return true
}

// 标记已初始化
export const markAsInitialized = (pageContext) => {
  chatState.isInitialized = true
  chatState.lastPageContext = pageContext
  console.log('✅ 标记ChatBox已初始化，页面上下文:', pageContext)
}

// 清空聊天记录
export const clearMessages = () => {
  console.warn('🚨 CLEARMESSAGES被调用! 将重置conversationId为null')
  console.trace('调用堆栈:') // 打印调用堆栈，帮助找到是谁调用的
  
  chatState.messages = [
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I am MethodMate AI Assistant. How can I help you today?',
      isComplete: true
    }
  ]
  chatState.conversationId = null
  
  // 清空已显示论文记录
  clearDisplayedPapers()
  // 清空外部论文池
  clearExternalPaperPool()
  console.log('🧹 已清空所有消息和论文记录')
}

// 历史方案相关方法
export const addHistoryPlan = async (planData, generationContext = null) => {
  console.log('=== 开始添加历史方案 ===')
  console.log('新方案数据:', {
    title: planData.title,
    hypotheses: planData.hypotheses,
    experimentalDesign: planData.experimentalDesign,
    analysisMethod: planData.analysisMethod,
    expectedResults: planData.expectedResults,
    researchQuestions: planData.researchQuestions
  })
  console.log('生成上下文:', generationContext)
  
  // 检查新方案是否有实质内容
  const hasSubstantialContent = (
    (planData.hypotheses && planData.hypotheses.length > 0 && planData.hypotheses.some(h => h && h.trim().length > 10)) ||
    (planData.experimentalDesign && planData.experimentalDesign.trim().length > 10) ||
    (planData.analysisMethod && planData.analysisMethod.trim().length > 10) ||
    (planData.expectedResults && planData.expectedResults.trim().length > 10)
  )
  
  console.log('新方案是否有实质内容:', hasSubstantialContent)
  
  // 只有当新方案有实质内容时才进行重复检查
  if (!hasSubstantialContent) {
    console.log('新方案内容不足，直接添加（可能是默认数据）')
  } else {
    // Check if an identical proposal already exists (based on complete proposal content and creation time range)
    const now = new Date()
    const threeMinutesAgo = new Date(now.getTime() - 3 * 60 * 1000) // 3分钟前
    
    console.log('当前时间:', now.toLocaleString())
    console.log('3分钟前时间:', threeMinutesAgo.toLocaleString())
    console.log('当前历史方案数量:', historyState.historyPlans.length)
    
    const isDuplicate = historyState.historyPlans.some((existingPlan, index) => {
      const existingTime = new Date(existingPlan.createdAt)
      const isRecentlyCreated = existingTime > threeMinutesAgo
      
      console.log(`检查历史方案 ${index + 1}:`)
      console.log('- 创建时间:', existingPlan.createdAt)
      console.log('- 是否在3分钟内:', isRecentlyCreated)
      
      if (!isRecentlyCreated) {
        console.log('- 跳过：不在时间范围内')
        return false
      }
      
      // Compare core content of complete proposals
      const existingFullPlan = existingPlan.fullPlan
      if (!existingFullPlan) {
        console.log('- 跳过：历史方案无完整数据')
        return false
      }
      
      // 检查历史方案是否也有实质内容
      const existingHasSubstantialContent = (
        (existingFullPlan.hypotheses && existingFullPlan.hypotheses.length > 0 && existingFullPlan.hypotheses.some(h => h && h.trim().length > 10)) ||
        (existingFullPlan.experimentalDesign && existingFullPlan.experimentalDesign.trim().length > 10) ||
        (existingFullPlan.analysisMethod && existingFullPlan.analysisMethod.trim().length > 10) ||
        (existingFullPlan.expectedResults && existingFullPlan.expectedResults.trim().length > 10)
      )
      
      if (!existingHasSubstantialContent) {
        console.log('- 跳过：历史方案内容不足')
        return false
      }
      
      // 比较核心字段是否完全相同
      const isSameHypotheses = JSON.stringify(existingFullPlan.hypotheses || []) === JSON.stringify(planData.hypotheses || [])
      const isSameDesign = (existingFullPlan.experimentalDesign || '') === (planData.experimentalDesign || '')
      const isSameAnalysis = (existingFullPlan.analysisMethod || '') === (planData.analysisMethod || '')
      const isSameResults = (existingFullPlan.expectedResults || '') === (planData.expectedResults || '')
      const isSameQuestions = (existingFullPlan.researchQuestions || '') === (planData.researchQuestions || '')
      
      // 检查生成上下文是否相同（比如参考文献）
      const existingContext = existingPlan.generationContext
      const isSameContext = JSON.stringify(existingContext || {}) === JSON.stringify(generationContext || {})
      
      // 如果内容相同但上下文不同（如参考文献不同），则不认为是重复
      const isContentSame = isSameHypotheses && isSameDesign && isSameAnalysis && isSameResults && isSameQuestions
      const isDuplicateEntry = isContentSame && isSameContext
      
      if (isDuplicateEntry) {
        console.log('*** 检测到相同内容且相同上下文的方案，将跳过添加 ***')
      }
      
      return isDuplicateEntry
    })
    
    if (isDuplicate) {
      console.log('=== 跳过添加重复方案 ===')
      return
    }
  }
  
  const newPlan = {
    id: Date.now(), // 使用时间戳作为前端ID
    title: planData.title || 'AI-Generated Quantitative Research Proposal',
    description: planData.researchQuestions || planData.output || 'No description available',
    createdAt: new Date().toLocaleString('en-US'),
    updatedAt: new Date().toLocaleString('en-US'),
    author: 'AI Assistant',
    status: 'Generated',
    fullPlan: JSON.parse(JSON.stringify(planData)), // Save deep copy of complete proposal data
    generationContext: generationContext, // 保存生成时的上下文
    sourceIntroductions: currentPlanState.sourceIntroductions ? 
      JSON.parse(JSON.stringify(currentPlanState.sourceIntroductions)) : {}, // 保存来源介绍
    databaseId: null // 数据库ID，稍后会更新
  }
  
  // 立即添加到前端状态
  historyState.historyPlans.unshift(newPlan) // 添加到数组开头，最新的在前面
  
  // 如果用户已登录，保存到数据库
  if (isUserAuthenticated()) {
    try {
      // 获取关联的引用文献ID
      const referenceIds = papersState.referencedPapersList
        .filter(paper => paper.databaseId)
        .map(paper => paper.databaseId)
      
      const planDataForDB = {
        title: newPlan.title,
        description: newPlan.description,
        hypotheses: JSON.stringify(planData.hypotheses || []),
        experimental_design: planData.experimentalDesign || '',
        analysis_method: planData.analysisMethod || '',
        expected_results: planData.expectedResults || '',
        methodology: planData.methodology || '',
        timeline: planData.timeline || '',
        resources: JSON.stringify(generationContext || {}),
        source_introductions: JSON.stringify(currentPlanState.sourceIntroductions || {}),
        status: 'draft',
        conversation_id: chatState.conversationId || null,
        reference_ids: referenceIds
      }
      
      const result = await researchPlanAPI.create(planDataForDB)
      if (result.success) {
        // 更新前端对象的数据库ID
        newPlan.databaseId = result.plan.id
        console.log(`已保存研究方案到数据库: ${newPlan.title}`)
      }
    } catch (error) {
      console.error('保存研究方案到数据库失败:', error)
      // 不阻止添加方案，只记录错误
    }
  }
  
  // 如果当前没有应用中的方案，自动将新生成的方案设为应用中
  if (!historyState.currentAppliedPlanId) {
    historyState.currentAppliedPlanId = newPlan.id
    console.log('自动设置新方案为应用中，ID:', newPlan.id)
  }
  
  console.log('=== 成功添加历史方案 ===')
  console.log('新方案ID:', newPlan.id)
  console.log('当前历史方案总数:', historyState.historyPlans.length)
}

export const removeHistoryPlan = async (planId) => {
  const planIndex = historyState.historyPlans.findIndex(plan => plan.id === planId)
  if (planIndex > -1) {
    const plan = historyState.historyPlans[planIndex]
    
    // 如果删除的是当前应用的方案，清除应用状态
    if (historyState.currentAppliedPlanId === planId) {
      historyState.currentAppliedPlanId = null
      console.log('清除当前应用方案状态')
    }
    
    // 从前端状态移除
    historyState.historyPlans.splice(planIndex, 1)
    
    // 如果用户已登录且方案有数据库ID，从数据库删除
    if (isUserAuthenticated() && plan.databaseId) {
      try {
        await researchPlanAPI.delete(plan.databaseId)
        console.log(`已从数据库删除研究方案: ${plan.title}`)
      } catch (error) {
        console.error('从数据库删除研究方案失败:', error)
        // 即使数据库操作失败，也保持前端状态的更新
      }
    }
    
    console.log('删除历史方案，ID:', planId)
  }
}

export const clearHistoryPlans = async () => {
  console.log('=== 开始清除所有历史方案 ===')
  const plansToDelete = [...historyState.historyPlans] // 创建副本
  console.log(`需要删除 ${plansToDelete.length} 个方案`)
  
  // 如果用户已登录，先从数据库删除所有方案
  if (isUserAuthenticated() && plansToDelete.length > 0) {
    console.log('用户已登录，开始从数据库删除方案...')
    
    // 收集所有有数据库ID的方案
    const plansWithDbId = plansToDelete.filter(plan => plan.databaseId)
    console.log(`其中 ${plansWithDbId.length} 个方案有数据库ID，需要从数据库删除`)
    
    // 逐个删除数据库中的方案
    const deletePromises = plansWithDbId.map(async (plan) => {
      try {
        await researchPlanAPI.delete(plan.databaseId)
        console.log(`✅ 已从数据库删除方案: ${plan.title}`)
        return { success: true, plan }
      } catch (error) {
        console.error(`❌ 从数据库删除方案失败: ${plan.title}`, error)
        return { success: false, plan, error }
      }
    })
    
    // 等待所有删除操作完成
    const deleteResults = await Promise.allSettled(deletePromises)
    
    // 统计删除结果
    const successCount = deleteResults.filter(result => 
      result.status === 'fulfilled' && result.value.success
    ).length
    const failureCount = deleteResults.length - successCount
    
    console.log(`数据库删除完成: 成功 ${successCount} 个，失败 ${failureCount} 个`)
    
    if (failureCount > 0) {
      console.warn('部分方案从数据库删除失败，但前端状态仍会被清空')
    }
  } else if (!isUserAuthenticated()) {
    console.log('用户未登录，跳过数据库删除操作')
  } else {
    console.log('没有方案需要删除')
  }
  
  // 清空前端状态
  historyState.historyPlans = []
  historyState.currentViewingPlan = null
  historyState.currentAppliedPlanId = null
  
  console.log('=== 清除所有历史方案完成 ===')
  console.log('前端状态已清空')
}

export const setCurrentViewingPlan = (plan) => {
  historyState.currentViewingPlan = plan
  console.log('设置当前查看方案:', plan?.title)
}

export const clearCurrentViewingPlan = () => {
  historyState.currentViewingPlan = null
}

// 当前方案相关方法
export const updateCurrentPlan = (planData) => {
  Object.assign(currentPlanState, planData)
  currentPlanState.isGenerated = true
  console.log('更新当前方案:', planData)
}

export const resetCurrentPlan = () => {
  // 重置为默认状态，但保留结构化数据
  currentPlanState.title = 'AI-Edited Images and Videos Impact on Human Memory'
  currentPlanState.researchQuestions = 'How do AI-edited images and videos impact human memory formation and recall accuracy? How does this effect differ from traditional media?'
  currentPlanState.methodology = 'A mixed-methods research approach combining experimental research and questionnaire surveys. Experimental and control groups will be exposed to AI-edited and traditionally edited media content respectively.'
  currentPlanState.dataCollection = 'Data collection through online experimental platforms where participants complete memory tests and questionnaire surveys. Eye-tracking technology records participants\' attention allocation while viewing content.'
  currentPlanState.analysisMethod = 'Quantitative analysis using SPSS including Analysis of Variance (ANOVA) and multiple regression analysis. Qualitative data will be coded and analyzed through thematic analysis methods.'
  currentPlanState.hypotheses = [
    'H1: Exposure to AI-edited media content will lead to higher false memory formation rates.',
    'H2: Uncertainty characteristics of AI-edited content will increase the degree of memory distortion.',
    'H3: Participants\' media literacy level will moderate the impact of AI-edited content on memory.'
  ]
  currentPlanState.experimentalDesign = 'Adopt a 2x2 mixed experimental design, manipulating media type (AI-edited vs. traditional editing) and presentation style (static vs. dynamic).'
  currentPlanState.expectedResults = 'Expected that AI-edited media content will lead to higher false memory formation rates, and this effect will be moderated by participants\' media literacy level.'
  currentPlanState.isGenerated = false
  
  // 清空来源介绍
  clearSourceIntroductions()
  
  console.log('重置当前方案为默认状态')
}

export const applyPlanAsCurrentPlan = (planData, planId = null, sourceIntroductions = null) => {
  // 应用某个方案为当前方案
  Object.assign(currentPlanState, planData)
  currentPlanState.isGenerated = true
  
  // 恢复来源介绍
  if (sourceIntroductions) {
    currentPlanState.sourceIntroductions = JSON.parse(JSON.stringify(sourceIntroductions))
  }
  
  // 保持原始标题，只更新时间戳标记
  if (planData.title) {
    currentPlanState.title = planData.title
  }
  currentPlanState.methodology = `Research methodology based on reference literature (Applied: ${new Date().toLocaleString('en-US')})`
  
  // 标记当前应用的方案ID
  if (planId) {
    historyState.currentAppliedPlanId = planId
    console.log('设置当前应用方案ID:', planId)
  }
  
  console.log('应用方案为当前方案:', planData.title || '未命名方案')
}

// 来源介绍相关方法
export const updateSourceIntroduction = (section, introduction) => {
  if (currentPlanState.sourceIntroductions) {
    currentPlanState.sourceIntroductions[section] = introduction
    console.log(`更新${section}部分的来源介绍`)
  }
}

export const getSourceIntroduction = (section) => {
  return currentPlanState.sourceIntroductions?.[section] || ''
}

export const clearSourceIntroductions = () => {
  if (currentPlanState.sourceIntroductions) {
    Object.keys(currentPlanState.sourceIntroductions).forEach(key => {
      currentPlanState.sourceIntroductions[key] = ''
    })
    console.log('清空所有来源介绍')
  }
}

// ==================== 已显示论文管理 ====================

// 记录论文已被显示
export const markPaperAsDisplayed = (paper) => {
  if (paper.cache_id) {
    papersState.displayedPapers.add(paper.cache_id)
    papersState.sessionDisplayedPapers.set(paper.cache_id, paper.title)
  }
  
  // 无论是否有缓存ID，都记录标题用于去重
  if (paper.title) {
    papersState.displayedPaperTitles.add(paper.title.toLowerCase())
  }
  
  console.log(`标记论文已显示: ${paper.title} (缓存ID: ${paper.cache_id || '无'})`)
}

// 批量记录论文已被显示
export const markPapersAsDisplayed = (papers) => {
  papers.forEach(paper => {
    if (paper.cache_id) {
      papersState.displayedPapers.add(paper.cache_id)
      papersState.sessionDisplayedPapers.set(paper.cache_id, paper.title)
    }
    
    // 无论是否有缓存ID，都记录标题用于去重
    if (paper.title) {
      papersState.displayedPaperTitles.add(paper.title.toLowerCase())
    }
  })
  console.log(`批量标记 ${papers.length} 篇论文已显示 (有缓存ID: ${papers.filter(p => p.cache_id).length} 篇)`)
}

// 获取所有已显示的论文缓存ID列表
export const getDisplayedPaperIds = () => {
  return Array.from(papersState.displayedPapers)
}

// 获取所有已显示的论文标题列表
export const getDisplayedPaperTitles = () => {
  return Array.from(papersState.displayedPaperTitles)
}

// 检查论文是否已被显示
export const isPaperDisplayed = (paper) => {
  return paper.cache_id && papersState.displayedPapers.has(paper.cache_id)
}

// 清空已显示论文记录（新对话开始时调用）
export const clearDisplayedPapers = () => {
  papersState.displayedPapers.clear()
  papersState.sessionDisplayedPapers.clear()
  papersState.displayedPaperTitles.clear()
  console.log('已清空本次会话的已显示论文记录')
}

// 获取已显示论文的统计信息
export const getDisplayedPapersStats = () => {
  const totalDisplayedById = papersState.displayedPapers.size
  const totalDisplayedByTitle = papersState.displayedPaperTitles.size
  const currentRecommended = papersState.recommendedPapers.length
  const currentSearched = papersState.searchResults.length
  
  return {
    totalDisplayedById,
    totalDisplayedByTitle,
    currentRecommended,
    currentSearched,
    displayedTitles: Array.from(papersState.sessionDisplayedPapers.values())
  }
}

// 测试去重机制的辅助函数（仅开发时使用）
export const testDeduplicationMechanism = () => {
  console.log('=== 去重机制状态检查 ===')
  console.log('已显示论文缓存ID数量:', papersState.displayedPapers.size)
  console.log('已显示论文标题数量:', papersState.displayedPaperTitles.size)
  console.log('当前推荐论文数量:', papersState.recommendedPapers.length)
  console.log('当前搜索结果数量:', papersState.searchResults.length)
  
  console.log('已显示的论文标题样例:')
  Array.from(papersState.displayedPaperTitles).slice(0, 5).forEach((title, index) => {
    console.log(`  ${index + 1}. ${title}`)
  })
  
  console.log('=== 检查完成 ===')
  
  return {
    displayedIds: Array.from(papersState.displayedPapers),
    displayedTitles: Array.from(papersState.displayedPaperTitles),
    recommendedCount: papersState.recommendedPapers.length,
    searchedCount: papersState.searchResults.length
  }
}

// 外部论文池管理函数
export const clearExternalPaperPool = () => {
  papersState.externalPaperPool.papers = []
  papersState.externalPaperPool.currentKeywords = ''
  papersState.externalPaperPool.totalFetched = 0
  papersState.externalPaperPool.isPoolEmpty = false
  papersState.externalPaperPool.lastFetchTime = null
  papersState.externalPaperPool.remainingInPool = 0
  console.log('🗑️ 外部论文池已清空')
}

export const addToExternalPaperPool = (papers, keywords, poolInfo = null) => {
  if (!Array.isArray(papers) || papers.length === 0) {
    console.warn('⚠️ 尝试添加空论文列表到外部论文池')
    return
  }
  
  // 如果关键词变了，清空现有论文池
  if (papersState.externalPaperPool.currentKeywords !== keywords) {
    console.log('🔄 关键词变化，清空外部论文池:', papersState.externalPaperPool.currentKeywords, '->', keywords)
    clearExternalPaperPool()
    papersState.externalPaperPool.currentKeywords = keywords
  }
  
  // 根据动作类型更新论文池
  const action = poolInfo?.action || 'creating_new_pool'
  
  if (action === 'creating_new_pool' || action === 'pool_exhausted') {
    // 创建新论文池或重建论文池：替换现有论文
    papersState.externalPaperPool.papers = [...papers]
    papersState.externalPaperPool.totalFetched = poolInfo?.totalFetched || papers.length
    console.log(`🆕 ${action === 'creating_new_pool' ? '创建新' : '重建'}论文池，总数: ${papers.length}`)
  } else if (action === 'expanding_pool') {
    // 扩展论文池：使用服务器返回的完整合并后的论文池
    const previousTotal = papersState.externalPaperPool.totalFetched
    papersState.externalPaperPool.papers = [...papers]
    papersState.externalPaperPool.totalFetched = previousTotal + (poolInfo?.totalFetched || 0)
    console.log(`🚀 扩展论文池，新总数: ${papers.length}, 累计获取: ${papersState.externalPaperPool.totalFetched}`)
  } else {
    // 默认行为：追加论文
    papersState.externalPaperPool.papers.push(...papers)
    papersState.externalPaperPool.totalFetched += papers.length
    console.log(`📚 追加论文到池中，新总数: ${papersState.externalPaperPool.papers.length}`)
  }
  
  // 更新后端返回的精确剩余数量
  if (poolInfo && poolInfo.remainingInPool !== undefined) {
    papersState.externalPaperPool.remainingInPool = poolInfo.remainingInPool
    console.log(`📊 更新论文池剩余数量: ${poolInfo.remainingInPool}`)
  }
  
  papersState.externalPaperPool.lastFetchTime = Date.now()
  
  console.log(`✅ 外部论文池更新完成 - 动作: ${action}, 论文数: ${papersState.externalPaperPool.papers.length}, 总获取: ${papersState.externalPaperPool.totalFetched}, 剩余: ${papersState.externalPaperPool.remainingInPool}`)
}

export const getUnusedExternalPapers = (count = 5) => {
  const unusedPapers = papersState.externalPaperPool.papers.filter(paper => {
    // 检查是否已显示
    const titleLower = paper.title?.toLowerCase() || ''
    return !papersState.displayedPaperTitles.has(titleLower)
  })
  
  console.log(`🔍 外部论文池中未使用的论文数量: ${unusedPapers.length}/${papersState.externalPaperPool.papers.length}`)
  
  return unusedPapers.slice(0, count)
}

export const isExternalPoolAvailable = (keywords) => {
  const poolKeywords = papersState.externalPaperPool.currentKeywords
  const keywordsMatch = poolKeywords === keywords || 
                       (poolKeywords && keywords && 
                        (poolKeywords.includes(keywords.split(' ')[0]) || keywords.includes(poolKeywords.split(' ')[0])))
  const hasUnusedPapers = getUnusedExternalPapers(5).length >= 5 // 至少要有5篇可用论文
  const isNotExpired = papersState.externalPaperPool.lastFetchTime && 
                      (Date.now() - papersState.externalPaperPool.lastFetchTime) < 30 * 60 * 1000 // 30分钟有效期
  
  console.log('🧪 论文池可用性详细检查:', {
    poolKeywords,
    inputKeywords: keywords,
    keywordsMatch,
    hasUnusedPapers,
    unusedCount: getUnusedExternalPapers(5).length,
    isNotExpired,
    totalPapers: papersState.externalPaperPool.papers.length,
    lastFetchTime: papersState.externalPaperPool.lastFetchTime
  })
  
  return keywordsMatch && hasUnusedPapers && isNotExpired
}

export const getExternalPoolStatus = () => {
  return {
    totalPapers: papersState.externalPaperPool.papers.length,
    unusedPapers: papersState.externalPaperPool.remainingInPool !== undefined 
      ? papersState.externalPaperPool.remainingInPool 
      : getUnusedExternalPapers().length,
    currentKeywords: papersState.externalPaperPool.currentKeywords,
    isEmpty: papersState.externalPaperPool.isPoolEmpty,
    lastFetchTime: papersState.externalPaperPool.lastFetchTime
  }
}

// 更新外部论文池使用状态
export const updateExternalPaperPoolUsage = (usedCount, skipRemainCountUpdate = false) => {
  if (usedCount <= 0) return
  
  console.log(`📊 更新外部论文池使用状态，标记 ${usedCount} 篇论文为已使用`)
  
  // 获取池中未使用的论文
  const unusedPapers = getUnusedExternalPapers(usedCount)
  
  // 将这些论文标记为已显示（这样它们会被getUnusedExternalPapers过滤掉）
  unusedPapers.forEach(paper => {
    if (paper.title) {
      papersState.displayedPaperTitles.add(paper.title.toLowerCase())
    }
  })
  
  // 只有在没有跳过剩余数量更新时才进行计算（避免重复减少）
  if (!skipRemainCountUpdate && papersState.externalPaperPool.remainingInPool !== undefined) {
    papersState.externalPaperPool.remainingInPool = Math.max(0, papersState.externalPaperPool.remainingInPool - usedCount)
    console.log(`📊 更新精确剩余数量: ${papersState.externalPaperPool.remainingInPool}`)
  }
  
  console.log(`✅ 已标记 ${unusedPapers.length} 篇论文为已使用，剩余可用论文: ${getUnusedExternalPapers().length}`)
}

// 迭代状态管理方法
export const storeIterationSnapshot = (section = null, suggestion = null) => {
  console.log('存储迭代快照，迭代部分:', section)
  
  // 深拷贝当前方案状态
  const snapshot = {
    title: currentPlanState.title,
    researchQuestions: currentPlanState.researchQuestions,
    methodology: currentPlanState.methodology,
    dataCollection: currentPlanState.dataCollection,
    analysisMethod: currentPlanState.analysisMethod,
    hypotheses: [...(currentPlanState.hypotheses || [])],
    experimentalDesign: currentPlanState.experimentalDesign,
    expectedResults: currentPlanState.expectedResults,
    isGenerated: currentPlanState.isGenerated,
    timestamp: new Date().toISOString()
  }
  
  // 存储到临时状态（当前会话）
  iterationState.beforeIteration = snapshot
  iterationState.iterationSection = section
  iterationState.iterationSuggestion = suggestion
  iterationState.hasComparison = false
  
  // 同时存储到持久化状态中
  currentPlanState.lastIterationSnapshot = snapshot
  currentPlanState.lastIterationSection = section
  currentPlanState.lastIterationSuggestion = suggestion
  currentPlanState.lastUpdated = new Date().toISOString()
  
  console.log('迭代前快照已存储（临时和持久化）:', snapshot)
}

export const completeIteration = async (messageId) => {
  console.log('完成迭代，消息ID:', messageId)
  
  if (iterationState.beforeIteration) {
    // 存储迭代后的状态
    const afterSnapshot = {
      title: currentPlanState.title,
      researchQuestions: currentPlanState.researchQuestions,
      methodology: currentPlanState.methodology,
      dataCollection: currentPlanState.dataCollection,
      analysisMethod: currentPlanState.analysisMethod,
      hypotheses: [...(currentPlanState.hypotheses || [])],
      experimentalDesign: currentPlanState.experimentalDesign,
      expectedResults: currentPlanState.expectedResults,
      variables: currentPlanState.variables,
      statisticalTools: currentPlanState.statisticalTools,
      visualization: currentPlanState.visualization,
      sourceIntroductions: currentPlanState.sourceIntroductions,
      isGenerated: currentPlanState.isGenerated,
      timestamp: new Date().toISOString()
    }
    
    // 更新临时状态
    iterationState.afterIteration = afterSnapshot
    iterationState.hasComparison = true
    iterationState.lastIterationMessageId = messageId
    
    // 更新持久化状态
    currentPlanState.lastIterationAfterSnapshot = afterSnapshot
    currentPlanState.lastIterationMessageId = messageId
    
    // 添加到迭代历史
    const iterationRecord = {
      id: Date.now(),
      section: iterationState.iterationSection,
      suggestion: iterationState.iterationSuggestion,
      before: iterationState.beforeIteration,
      after: afterSnapshot,
      timestamp: new Date().toISOString(),
      messageId: messageId
    }
    
    currentPlanState.iterationHistory.push(iterationRecord)
    currentPlanState.lastUpdated = new Date().toISOString()
    
    // 如果用户已登录，保存到数据库
    if (isUserAuthenticated()) {
      try {
        const iterationData = {
          planId: currentPlanState.id || null, // 如果有方案ID
          iterationType: iterationState.iterationSection ? 'partial' : 'full',
          iterationSection: iterationState.iterationSection,
          iterationSuggestion: iterationState.iterationSuggestion,
          messageId: messageId,
          beforeSnapshot: iterationState.beforeIteration,
          afterSnapshot: afterSnapshot
        }
        
        const response = await fetch(`${getApiBaseUrl()}/api/plan-iterations`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(iterationData)
        })
        
        if (response.ok) {
          const result = await response.json()
          console.log('✅ 迭代历史已保存到数据库，ID:', result.iterationId)
        } else {
          console.warn('⚠️ 保存迭代历史到数据库失败:', response.status)
        }
      } catch (error) {
        console.error('❌ 保存迭代历史到数据库失败:', error)
      }
    }
    
    console.log('迭代完成，对比数据已准备好（临时、持久化和数据库）')
  }
}

export const clearIterationState = () => {
  // 清理临时状态
  iterationState.beforeIteration = null
  iterationState.afterIteration = null
  iterationState.iterationSection = null
  iterationState.iterationSuggestion = null
  iterationState.hasComparison = false
  iterationState.lastIterationMessageId = null
  
  // 清理持久化状态
  currentPlanState.lastIterationSnapshot = null
  currentPlanState.lastIterationAfterSnapshot = null
  currentPlanState.lastIterationSection = null
  currentPlanState.lastIterationSuggestion = null
  currentPlanState.lastIterationMessageId = null
  
  console.log('迭代状态已清理（临时和持久化）')
}

export const getIterationComparison = async (messageId = null) => {
  console.log('🔍 getIterationComparison 开始执行...')
  console.log('📋 参数:', { messageId })
  console.log('👤 用户认证状态:', isUserAuthenticated())
  console.log('📊 当前方案状态:', {
    hasPlan: !!currentPlanState,
    planId: currentPlanState?.id,
    iterationHistoryCount: currentPlanState?.iterationHistory?.length || 0
  })
  console.log('🔄 迭代状态:', {
    hasComparison: iterationState.hasComparison,
    beforeIteration: !!iterationState.beforeIteration,
    afterIteration: !!iterationState.afterIteration,
    lastIterationMessageId: iterationState.lastIterationMessageId
  })
  
  // 如果指定了消息ID，优先从数据库获取
  if (messageId && isUserAuthenticated()) {
    console.log('🔄 尝试根据消息ID从数据库获取迭代数据...')
    try {
      const response = await fetch(`${getApiBaseUrl()}/api/plan-iterations/message/${messageId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      console.log('📡 API响应状态:', response.status)
      
      if (response.ok) {
        const result = await response.json()
        const iteration = result.iteration
        console.log('✅ 从数据库获取到迭代数据:', iteration)
        
        // 恢复临时状态
        iterationState.beforeIteration = iteration.before
        iterationState.afterIteration = iteration.after
        iterationState.iterationSection = iteration.iterationSection
        iterationState.iterationSuggestion = iteration.iterationSuggestion
        iterationState.hasComparison = true
        iterationState.lastIterationMessageId = iteration.messageId
        
        console.log('✅ 从数据库恢复迭代对比数据')
        
        return {
          before: iteration.before,
          after: iteration.after,
          section: iteration.iterationSection,
          suggestion: iteration.iterationSuggestion,
          timestamp: iteration.updatedAt
        }
      } else {
        console.log('⚠️ 数据库API响应失败:', response.status)
      }
    } catch (error) {
      console.error('❌ 从数据库获取迭代历史失败:', error)
    }
  }
  
  // 如果指定了消息ID，尝试从历史记录中查找
  if (messageId) {
    console.log('🔍 尝试从本地历史记录中查找消息ID:', messageId)
    const iterationRecord = currentPlanState.iterationHistory.find(
      record => record.messageId === messageId
    )
    if (iterationRecord) {
      console.log('✅ 在本地历史记录中找到迭代数据')
      return {
        before: iterationRecord.before,
        after: iterationRecord.after,
        section: iterationRecord.section,
        suggestion: iterationRecord.suggestion,
        timestamp: iterationRecord.timestamp
      }
    } else {
      console.log('⚠️ 本地历史记录中未找到该消息ID')
    }
  }
  
  // 首先尝试从临时状态获取
  if (iterationState.hasComparison) {
    console.log('✅ 从临时状态获取迭代对比数据')
    return {
      before: iterationState.beforeIteration,
      after: iterationState.afterIteration,
      section: iterationState.iterationSection,
      suggestion: iterationState.iterationSuggestion,
      timestamp: new Date().toISOString()
    }
  }
  
  // 如果临时状态没有，尝试从持久化状态恢复
  if (currentPlanState.lastIterationSnapshot && currentPlanState.lastIterationAfterSnapshot) {
    console.log('🔄 从持久化状态恢复迭代对比数据')
    // 恢复临时状态
    iterationState.beforeIteration = currentPlanState.lastIterationSnapshot
    iterationState.afterIteration = currentPlanState.lastIterationAfterSnapshot
    iterationState.iterationSection = currentPlanState.lastIterationSection
    iterationState.iterationSuggestion = currentPlanState.lastIterationSuggestion
    iterationState.hasComparison = true
    iterationState.lastIterationMessageId = currentPlanState.lastIterationMessageId
    
    console.log('从持久化状态恢复迭代对比数据')
    
    return {
      before: currentPlanState.lastIterationSnapshot,
      after: currentPlanState.lastIterationAfterSnapshot,
      section: currentPlanState.lastIterationSection,
      suggestion: currentPlanState.lastIterationSuggestion,
      timestamp: currentPlanState.lastIterationAfterSnapshot.timestamp
    }
  }
  
  // 如果用户已登录且有方案ID，尝试从数据库获取最新迭代
  if (isUserAuthenticated() && currentPlanState.id) {
    console.log('🔄 尝试从数据库获取最新迭代数据...')
    try {
      const response = await fetch(`${getApiBaseUrl()}/api/plan-iterations/latest/${currentPlanState.id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      console.log('📡 最新迭代API响应状态:', response.status)
      
      if (response.ok) {
        const result = await response.json()
        const iteration = result.iteration
        console.log('✅ 从数据库获取到最新迭代数据:', iteration)
        
        // 恢复临时状态
        iterationState.beforeIteration = iteration.before
        iterationState.afterIteration = iteration.after
        iterationState.iterationSection = iteration.iterationSection
        iterationState.iterationSuggestion = iteration.iterationSuggestion
        iterationState.hasComparison = true
        iterationState.lastIterationMessageId = iteration.messageId
        
        console.log('✅ 从数据库恢复最新迭代对比数据')
        
        return {
          before: iteration.before,
          after: iteration.after,
          section: iteration.iterationSection,
          suggestion: iteration.iterationSuggestion,
          timestamp: iteration.updatedAt
        }
      } else {
        console.log('⚠️ 获取最新迭代API响应失败:', response.status)
      }
    } catch (error) {
      console.error('❌ 从数据库获取最新迭代历史失败:', error)
    }
  }
  
  console.log('❌ 未找到任何可用的迭代对比数据')
  return null
}

export const isIterationMessage = (messageId) => {
  return iterationState.lastIterationMessageId === messageId ||
         currentPlanState.iterationHistory.some(record => record.messageId === messageId)
}

// 在开发环境中暴露调试函数
if (process.env.NODE_ENV === 'development') {
  window.testDeduplication = testDeduplicationMechanism
  window.papersState = papersState
  console.log('🔧 开发模式：已暴露去重测试函数 window.testDeduplication() 和状态对象 window.papersState')
} 