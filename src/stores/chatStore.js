// 全局聊天状态管理
import { reactive, ref } from 'vue'
import { sendStreamMessageToCoze } from '../services/cozeApi'

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
  conversationId: null
})

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

// 当前方案状态
export const currentPlanState = reactive({
  title: 'AI-Edited Images and Videos Impact on Human Memory',
  researchQuestions: 'AI编辑的图像与视频如何影响人类记忆形成和回忆的准确性？这种影响与传统媒体的影响有何不同？',
  methodology: '采用混合研究方法，结合实验研究和问卷调查。实验组和对照组将分别接触AI编辑和传统编辑的媒体内容。',
  dataCollection: '通过在线实验平台收集数据，参与者将完成记忆测试和问卷调查。使用眼动追踪技术记录参与者观看内容时的注意力分配。',
  analysisMethod: '根据研究设计和数据特征选择适当的统计分析方法。可通过搜索功能了解具体方法的详细信息。',
  hypotheses: [
    'H1: 接触AI编辑的媒体内容会导致更高的虚假记忆形成率。',
    'H2: AI编辑内容的不确定性特征会增加记忆失真的程度。',
    'H3: 参与者的媒体素养水平会调节AI编辑内容对记忆的影响。'
  ],
  experimentalDesign: '采用2x2混合实验设计，操纵媒体类型（AI编辑 vs. 传统编辑）和呈现方式（静态 vs. 动态）。',
  variables: '自变量：媒体类型、呈现方式；因变量：记忆准确度、虚假记忆比率；控制变量：媒体素养、年龄、教育背景。',
  statisticalTools: '根据研究需要选择合适的统计分析工具和软件包。',
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
    sourceIntro: '',
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
    methodIntro: '通过以下搜索框检索具体方法的详细信息和使用指南。'
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
export const addRecommendedPapers = (newPapers) => {
  // 为新文献添加唯一ID和批次信息
  const papersWithId = newPapers.map((paper, index) => ({
    ...paper,
    id: Date.now() + index, // 使用时间戳+索引作为唯一ID
    batchIndex: Math.floor(papersState.recommendedPapers.length / 3) + 1 // 批次编号
  }))
  
  // 累加到现有文献列表
  papersState.recommendedPapers.push(...papersWithId)
  
  console.log(`成功添加 ${papersWithId.length} 篇新文献，当前共有 ${papersState.recommendedPapers.length} 篇文献`)
}

export const selectPaper = (paper) => {
  papersState.selectedPaper = paper
}

export const toggleReference = async (paper) => {
  const paperId = paper.id
  if (papersState.referencedPapers.has(paperId)) {
    // 移除引用
    papersState.referencedPapers.delete(paperId)
    papersState.referencedPapersList = papersState.referencedPapersList.filter(p => p.id !== paperId)
    console.log(`已移除引用文献: ${paper.title}`)
  } else {
    // 添加引用
    papersState.referencedPapers.add(paperId)
    
    // 创建引用论文对象
    const referencedPaper = {
      ...paper,
      referencedAt: new Date().toISOString(),
      source: paper.batchIndex ? 'recommendation' : 'search' // 标记来源
    }
    
    // 立即添加到引用列表，不等待研究方法获取
    papersState.referencedPapersList.push(referencedPaper)
    console.log(`已添加引用文献: ${paper.title}`)
    
    // 如果论文没有研究方法，在后台异步获取
    if (!referencedPaper.researchMethod) {
      // 异步获取研究方法，不阻塞UI
      (async () => {
        try {
          console.log(`开始后台获取研究方法: ${paper.title}`)
          
          // 如果有全文，直接尝试提取研究方法
          if (referencedPaper.fullText) {
            const methodResponse = await fetch('/api/paper/generate-method-summary', {
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
            const response = await fetch('/api/paper/get-full-content', {
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
                  const methodResponse = await fetch('/api/paper/generate-method-summary', {
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

export const clearReferences = () => {
  papersState.referencedPapers.clear()
  papersState.referencedPapersList = []
  console.log('已清空所有引用文献')
}

export const removePaperFromReferences = (paper) => {
  // 从Set中移除
  papersState.referencedPapers.delete(paper.id || paper.title)
  
  // 从完整列表中移除
  const index = papersState.referencedPapersList.findIndex(p => 
    (p.id && p.id === paper.id) || 
    (p.title === paper.title)
  )
  
  if (index > -1) {
    papersState.referencedPapersList.splice(index, 1)
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
  if (!message.trim() || chatState.isLoading) return

  const messageId = chatState.messages.length + 1
  
  // 添加用户消息（只显示用户输入的消息，不包含上下文）
  chatState.messages.push({
    id: messageId,
    type: 'user',
    content: message,
    isComplete: true
  })

  chatState.isLoading = true

  // 添加助手消息占位
  const assistantMessageId = messageId + 1
  chatState.messages.push({
    id: assistantMessageId,
    type: 'assistant',
    content: '',
    isComplete: false
  })

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

  try {
    await sendStreamMessageToCoze(messageWithContext, (chunk, fullResponse) => {
      // 更新助手消息内容
      const assistantMessage = chatState.messages.find(m => m.id === assistantMessageId)
      if (assistantMessage) {
        assistantMessage.content = fullResponse
      }
    }, chatState.messages)

    // 标记消息完成
    const assistantMessage = chatState.messages.find(m => m.id === assistantMessageId)
    if (assistantMessage) {
      assistantMessage.isComplete = true
    }
  } catch (error) {
    console.error('聊天错误:', error)
    
    // 移除空的助手消息
    chatState.messages = chatState.messages.filter(m => m.id !== assistantMessageId)
    
    // 添加错误消息
    chatState.messages.push({
      id: assistantMessageId,
      type: 'assistant',
      content: '抱歉，我遇到了一些问题。错误信息：' + (error.message || '未知错误') + '\n请稍后再试，或者刷新页面重试。',
      isComplete: true,
      isError: true
    })
  } finally {
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
export const addHistoryPlan = (planData, generationContext = null) => {
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
    // 检查是否有重复的方案（在10分钟内生成的相似方案）
    if (historyState.historyPlans.length > 0) {
      const currentTime = new Date()
      const tenMinutesAgo = new Date(currentTime.getTime() - 10 * 60 * 1000) // 10分钟前
      
      console.log('当前时间:', currentTime.toLocaleString('zh-CN'))
      console.log('10分钟前时间:', tenMinutesAgo.toLocaleString('zh-CN'))
      console.log('当前历史方案数量:', historyState.historyPlans.length)
      
      const isDuplicate = historyState.historyPlans.some((existingPlan, index) => {
        const existingTime = new Date(existingPlan.createdAt)
        const isRecentlyCreated = existingTime > tenMinutesAgo
        
        console.log(`检查历史方案 ${index + 1}:`)
        console.log('- 创建时间:', existingPlan.createdAt)
        console.log('- 是否在10分钟内:', isRecentlyCreated)
        
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
        
        console.log('- 历史方案内容:', {
          hypotheses: existingFullPlan.hypotheses,
          experimentalDesign: existingFullPlan.experimentalDesign,
          analysisMethod: existingFullPlan.analysisMethod,
          expectedResults: existingFullPlan.expectedResults,
          researchQuestions: existingFullPlan.researchQuestions
        })
        
        // 比较核心字段是否完全相同
        const isSameHypotheses = JSON.stringify(existingFullPlan.hypotheses || []) === JSON.stringify(planData.hypotheses || [])
        const isSameDesign = (existingFullPlan.experimentalDesign || '') === (planData.experimentalDesign || '')
        const isSameAnalysis = (existingFullPlan.analysisMethod || '') === (planData.analysisMethod || '')
        const isSameResults = (existingFullPlan.expectedResults || '') === (planData.expectedResults || '')
        const isSameQuestions = (existingFullPlan.researchQuestions || '') === (planData.researchQuestions || '')
        
        console.log('- 字段比较结果:')
        console.log('  * 研究假设相同:', isSameHypotheses)
        if (!isSameHypotheses) {
          console.log('    历史:', JSON.stringify(existingFullPlan.hypotheses || []))
          console.log('    新建:', JSON.stringify(planData.hypotheses || []))
        }
        console.log('  * 实验设计相同:', isSameDesign)
        if (!isSameDesign) {
          console.log('    历史:', existingFullPlan.experimentalDesign || '')
          console.log('    新建:', planData.experimentalDesign || '')
        }
        console.log('  * 数据分析相同:', isSameAnalysis)
        if (!isSameAnalysis) {
          console.log('    历史:', existingFullPlan.analysisMethod || '')
          console.log('    新建:', planData.analysisMethod || '')
        }
        console.log('  * 结果呈现相同:', isSameResults)
        if (!isSameResults) {
          console.log('    历史:', existingFullPlan.expectedResults || '')
          console.log('    新建:', planData.expectedResults || '')
        }
        console.log('  * 研究问题相同:', isSameQuestions)
        if (!isSameQuestions) {
          console.log('    历史:', existingFullPlan.researchQuestions || '')
          console.log('    新建:', planData.researchQuestions || '')
        }
        
        // 如果内容完全相同，不管上下文是否不同，都认为是重复方案
        const isContentSame = isSameHypotheses && isSameDesign && isSameAnalysis && isSameResults && isSameQuestions
        const isDuplicateEntry = isContentSame // 只要内容相同就认为是重复
        
        console.log('- 内容完全相同:', isContentSame)
        console.log('- 是否认为是重复方案:', isDuplicateEntry)
        
        if (isDuplicateEntry) {
          console.log('*** 检测到相同内容的方案，将跳过添加 ***')
          console.log('*** 即使上下文不同，内容相同的方案也不重复添加 ***')
        }
        
        return isDuplicateEntry
      })
      
      if (isDuplicate) {
        console.log('=== 跳过添加重复方案 ===')
        return
      }
    }
  }
  
  const newPlan = {
    id: Date.now(), // 使用时间戳作为ID
    title: planData.title || '未命名研究方案',
    description: planData.researchQuestions || planData.output || '暂无描述',
    createdAt: new Date().toLocaleString('zh-CN'),
    updatedAt: new Date().toLocaleString('zh-CN'),
    author: 'AI智能体',
    status: '已生成',
    fullPlan: JSON.parse(JSON.stringify(planData)), // 保存完整方案数据的深拷贝
    generationContext: generationContext, // 保存生成时的上下文
    sourceIntroductions: currentPlanState.sourceIntroductions ? 
      JSON.parse(JSON.stringify(currentPlanState.sourceIntroductions)) : {} // 保存来源介绍
  }
  
  console.log('保存历史方案时的来源介绍键:', Object.keys(newPlan.sourceIntroductions || {}))
  
  historyState.historyPlans.unshift(newPlan) // 添加到数组开头，最新的在前面
  
  // 如果当前没有应用中的方案，自动将新生成的方案设为应用中
  if (!historyState.currentAppliedPlanId) {
    historyState.currentAppliedPlanId = newPlan.id
    console.log('自动设置新方案为应用中，ID:', newPlan.id)
  }
  
  console.log('=== 成功添加历史方案 ===')
  console.log('新方案ID:', newPlan.id)
  console.log('当前历史方案总数:', historyState.historyPlans.length)
}

export const removeHistoryPlan = (planId) => {
  const index = historyState.historyPlans.findIndex(plan => plan.id === planId)
  if (index > -1) {
    // 如果删除的是当前应用的方案，清除应用状态
    if (historyState.currentAppliedPlanId === planId) {
      historyState.currentAppliedPlanId = null
      console.log('清除当前应用方案状态')
    }
    
    historyState.historyPlans.splice(index, 1)
    console.log('删除历史方案，ID:', planId)
  }
}

export const clearHistoryPlans = () => {
  historyState.historyPlans = []
  historyState.currentViewingPlan = null
  historyState.currentAppliedPlanId = null // 清除应用状态
  console.log('清空所有历史方案')
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
  
  // 如果planData包含来源介绍，也要更新
  if (planData.sourceIntroductions) {
    currentPlanState.sourceIntroductions = JSON.parse(JSON.stringify(planData.sourceIntroductions))
  }
  
  console.log('更新当前方案:', planData)
}

export const resetCurrentPlan = () => {
  // 重置为默认状态，但保留结构化数据
  currentPlanState.title = 'AI-Edited Images and Videos Impact on Human Memory'
  currentPlanState.researchQuestions = 'AI编辑的图像与视频如何影响人类记忆形成和回忆的准确性？这种影响与传统媒体的影响有何不同？'
  currentPlanState.methodology = '采用混合研究方法，结合实验研究和问卷调查。实验组和对照组将分别接触AI编辑和传统编辑的媒体内容。'
  currentPlanState.dataCollection = '通过在线实验平台收集数据，参与者将完成记忆测试和问卷调查。使用眼动追踪技术记录参与者观看内容时的注意力分配。'
  currentPlanState.analysisMethod = '根据研究设计和数据特征选择适当的统计分析方法。可通过搜索功能了解具体方法的详细信息。'
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
  if (!currentPlanState.sourceIntroductions) {
    currentPlanState.sourceIntroductions = {}
  }
  currentPlanState.sourceIntroductions[section] = introduction
  console.log(`更新${section}部分的来源介绍`)
}

export const getSourceIntroduction = (section) => {
  return currentPlanState.sourceIntroductions?.[section] || ''
}

export const clearSourceIntroductions = () => {
  if (!currentPlanState.sourceIntroductions) {
    currentPlanState.sourceIntroductions = {}
  }
  Object.keys(currentPlanState.sourceIntroductions).forEach(key => {
    currentPlanState.sourceIntroductions[key] = ''
  })
  console.log('清空所有来源介绍')
} 