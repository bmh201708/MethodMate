// 全局聊天状态管理
import { reactive, ref } from 'vue'
import { sendStreamMessageToCoze } from '../services/cozeApi'
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
      content: '你好！我是 MethodMate AI 助手，请问有什么我可以帮助你的吗？',
      isComplete: true
    }
  ],
  isLoading: false,
  conversationId: null,
  forceUpdateFlag: 0 // 强制更新标志
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
    filterTopVenues: false,
    showOnlyTopVenues: false,
    numResults: 10,
    language: 'zh-CN'
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
      })
      
      console.log(`已加载 ${papersResult.papers.length} 篇引用文献`)
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

// 当前方案状态
export const currentPlanState = reactive({
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
  },
  isGenerated: false, // 标记是否为AI生成的方案
  // 来源介绍存储
  sourceIntroductions: {
    full: '',
    hypothesis: '',
    design: '',
    analysis: '',
    results: ''
  }
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
      source: paper.batchIndex ? 'recommendation' : 'search', // 标记来源
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
            const response = await fetch(`${getApiBaseUrl()}/paper/get-full-content`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                title: referencedPaper.title,
                doi: referencedPaper.doi || null
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
  
  papersState.recommendedPapers.splice(index, 1)
}

export const clearAllPapers = () => {
  papersState.recommendedPapers = []
  papersState.selectedPaper = null
  papersState.referencedPapers.clear()
  papersState.referencedPapersList = []
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
  
  // 清空前端状态
  papersState.referencedPapers.clear()
  papersState.referencedPapersList = []
  console.log('已清空所有引用文献')
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
  console.log('清空搜索结果')
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
      // 在研究方案页面，添加当前方案作为上下文
      const planContext = buildCurrentPlanContext()
      if (planContext) {
        messageWithContext = `${planContext}\n\n用户问题：${message}`
        console.log('发送包含当前方案上下文的消息')
      }
    }

    await sendStreamMessageToCoze(messageWithContext, (chunk, fullResponse) => {
      // 更新助手消息内容 - 强制Vue响应式更新
      console.log('chatStore onChunk被调用，内容长度:', fullResponse.length)
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
        
                 console.log('助手消息内容已更新，新长度:', newMessages[assistantMsgIndex].content.length)
         console.log('强制更新后的消息数组长度:', chatState.messages.length)
         console.log('更新后的消息对象:', { 
           id: newMessages[assistantMsgIndex].id,
           type: newMessages[assistantMsgIndex].type,
           content: newMessages[assistantMsgIndex].content.substring(0, 50) + '...',
           isComplete: newMessages[assistantMsgIndex].isComplete
         })
      } else {
        console.log('未找到助手消息，ID:', assistantMessageId)
        console.log('当前消息列表:', chatState.messages.map(m => ({ id: m.id, type: m.type })))
      }
    }, chatState.messages)

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
      content: '抱歉，我遇到了一些问题。错误信息：' + (error.message || '未知错误') + '\n请稍后再试，或者刷新页面重试。',
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

// 构建当前方案上下文的辅助方法
const buildCurrentPlanContext = () => {
  if (!currentPlanState.isGenerated) {
    return null // 如果没有生成的方案，不添加上下文
  }
  
  let context = '当前研究方案上下文：\n'
  
  if (currentPlanState.title) {
    context += `方案标题：${currentPlanState.title}\n`
  }
  
  if (currentPlanState.researchQuestions) {
    context += `研究问题：${currentPlanState.researchQuestions}\n`
  }
  
  if (currentPlanState.hypotheses && currentPlanState.hypotheses.length > 0) {
    context += `研究假设：\n${currentPlanState.hypotheses.map((h, i) => `${i + 1}. ${h}`).join('\n')}\n`
  }
  
  if (currentPlanState.experimentalDesign) {
    context += `实验设计：${currentPlanState.experimentalDesign}\n`
  }
  
  if (currentPlanState.analysisMethod) {
    context += `数据分析方法：${currentPlanState.analysisMethod}\n`
  }
  
  if (currentPlanState.expectedResults) {
    context += `预期结果：${currentPlanState.expectedResults}\n`
  }
  
  context += '\n请基于以上研究方案上下文回答用户的问题。'
  
  return context
}

// 清空聊天记录
export const clearMessages = () => {
  console.warn('🚨 CLEARMESSAGES被调用! 将重置conversationId为null')
  console.trace('调用堆栈:') // 打印调用堆栈，帮助找到是谁调用的
  
  chatState.messages = [
    {
      id: 1,
      type: 'assistant',
      content: '你好！我是 MethodMate AI 助手，请问有什么我可以帮助你的吗？',
      isComplete: true
    }
  ]
  chatState.conversationId = null
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
    // 检查是否已经存在相同的方案（基于完整方案内容和创建时间范围）
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
      
      // 比较完整方案的核心内容
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
    title: planData.title || '基于AI智能体生成的定量研究方案',
    description: planData.researchQuestions || planData.output || '暂无描述',
    createdAt: new Date().toLocaleString('zh-CN'),
    updatedAt: new Date().toLocaleString('zh-CN'),
    author: 'AI智能体',
    status: '已生成',
    fullPlan: JSON.parse(JSON.stringify(planData)), // 保存完整方案数据的深拷贝
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
  currentPlanState.researchQuestions = 'AI编辑的图像与视频如何影响人类记忆形成和回忆的准确性？这种影响与传统媒体的影响有何不同？'
  currentPlanState.methodology = '采用混合研究方法，结合实验研究和问卷调查。实验组和对照组将分别接触AI编辑和传统编辑的媒体内容。'
  currentPlanState.dataCollection = '通过在线实验平台收集数据，参与者将完成记忆测试和问卷调查。使用眼动追踪技术记录参与者观看内容时的注意力分配。'
  currentPlanState.analysisMethod = '使用SPSS进行定量分析，包括方差分析(ANOVA)和多元回归分析。质性数据将通过主题分析方法进行编码和分析。'
  currentPlanState.hypotheses = [
    'H1: 接触AI编辑的媒体内容会导致更高的虚假记忆形成率。',
    'H2: AI编辑内容的不确定性特征会增加记忆失真的程度。',
    'H3: 参与者的媒体素养水平会调节AI编辑内容对记忆的影响。'
  ]
  currentPlanState.experimentalDesign = '采用2x2混合实验设计，操纵媒体类型（AI编辑 vs. 传统编辑）和呈现方式（静态 vs. 动态）。'
  currentPlanState.expectedResults = '预期AI编辑的媒体内容会导致更高的虚假记忆形成率，且这种效应会被参与者的媒体素养水平调节。'
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
  
  // 重新生成时间戳，标记为新的当前方案
  currentPlanState.title = '基于AI智能体生成的定量研究方案'
  currentPlanState.methodology = `基于参考文献生成的研究方法 (应用时间: ${new Date().toLocaleString('zh-CN')})`
  
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