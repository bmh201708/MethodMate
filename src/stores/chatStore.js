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
  recommendationError: '' // 推荐错误信息
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
  isGenerated: false // 标记是否为AI生成的方案
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

export const toggleReference = (paper) => {
  const paperId = paper.id
  if (papersState.referencedPapers.has(paperId)) {
    // 移除引用
    papersState.referencedPapers.delete(paperId)
    papersState.referencedPapersList = papersState.referencedPapersList.filter(p => p.id !== paperId)
    console.log(`已移除引用文献: ${paper.title}`)
  } else {
    // 添加引用
    papersState.referencedPapers.add(paperId)
    // 保存完整的文献信息，添加引用时间和来源标记
    const referencedPaper = {
      ...paper,
      referencedAt: new Date().toISOString(),
      source: paper.batchIndex ? 'recommendation' : 'search' // 标记来源
    }
    papersState.referencedPapersList.push(referencedPaper)
    console.log(`已添加引用文献: ${paper.title}`)
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
      
      // 检查生成上下文是否相同（比如参考文献）
      const existingContext = existingPlan.generationContext
      const isSameContext = JSON.stringify(existingContext || {}) === JSON.stringify(generationContext || {})
      
      console.log('- 生成上下文比较:')
      console.log('  * 历史方案上下文:', existingContext)
      console.log('  * 新方案上下文:', generationContext)
      console.log('  * 上下文相同:', isSameContext)
      
      // 如果内容相同但上下文不同（如参考文献不同），则不认为是重复
      const isContentSame = isSameHypotheses && isSameDesign && isSameAnalysis && isSameResults && isSameQuestions
      const isDuplicateEntry = isContentSame && isSameContext
      
      console.log('- 内容完全相同:', isContentSame)
      console.log('- 是否认为是重复方案:', isDuplicateEntry)
      
      if (isDuplicateEntry) {
        console.log('*** 检测到相同内容且相同上下文的方案，将跳过添加 ***')
      } else if (isContentSame && !isSameContext) {
        console.log('*** 内容相同但上下文不同，将保留此方案 ***')
      }
      
      return isDuplicateEntry
    })
    
    if (isDuplicate) {
      console.log('=== 跳过添加重复方案 ===')
      return
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
    generationContext: generationContext // 保存生成时的上下文
  }
  
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
  console.log('重置当前方案为默认状态')
}

export const applyPlanAsCurrentPlan = (planData, planId = null) => {
  // 应用某个方案为当前方案
  Object.assign(currentPlanState, planData)
  currentPlanState.isGenerated = true
  
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