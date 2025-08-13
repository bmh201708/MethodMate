/**
 * Prompt Service Class
 * 
 * Responsible for handling prompt template filling and dynamic generation
 * Uses a simple template engine to replace placeholders
 */

import {
  RESEARCH_PLAN_GENERATION_TEMPLATE,
  PLAN_EVALUATION_TEMPLATE,
  SECTION_EVALUATION_TEMPLATE,
  FULL_PLAN_ITERATION_TEMPLATE,
  SECTION_ITERATION_TEMPLATE,
  SOURCE_INTRODUCTION_HYPOTHESIS_TEMPLATE,
  SOURCE_INTRODUCTION_DESIGN_TEMPLATE,
  SOURCE_INTRODUCTION_ANALYSIS_TEMPLATE,
  SOURCE_INTRODUCTION_RESULTS_TEMPLATE,
  SOURCE_INTRODUCTION_DEFAULT_TEMPLATE,
  METHOD_INTRODUCTION_CHATGPT_TEMPLATE,
  METHOD_INTRODUCTION_COZE_TEMPLATE,
  OPTIMIZATION_SPECS,
  VALIDATION_SPECS,
  PRESET_SUGGESTIONS,
  SECTION_GUIDANCE
} from './promptTemplates.js'

/**
 * Improved template engine that supports nested conditional statements and variable replacement
 */
class SimpleTemplateEngine {
  /**
   * 渲染模板
   * @param {string} template - 模板字符串
   * @param {object} data - 数据对象
   * @returns {string} - 渲染后的字符串
   */
  static render(template, data = {}) {
    // 首先处理条件语句（支持嵌套）
    let result = this._processConditionals(template, data)
    
    // 然后处理变量替换
    result = this._processVariables(result, data)

    return result
  }

  /**
   * 处理条件语句（支持嵌套）
   * @private
   */
  static _processConditionals(template, data) {
    // 使用递归方式处理嵌套的条件语句
    while (template.includes('{{#if')) {
      const processed = this._processOneConditionalLevel(template, data)
      if (processed === template) {
        // 如果没有变化，说明处理完成或存在语法错误
        break
      }
      template = processed
    }
    return template
  }

  /**
   * 处理一层条件语句
   * @private
   */
  static _processOneConditionalLevel(template, data) {
    // 找到最内层的if语句（没有嵌套的）
    const tokens = this._tokenize(template)
    return this._processTokens(tokens, data)
  }

  /**
   * 将模板分解为token
   * @private
   */
  static _tokenize(template) {
    const tokens = []
    let current = ''
    let i = 0
    
    while (i < template.length) {
      if (template.substr(i, 2) === '{{') {
        // 保存当前文本
        if (current) {
          tokens.push({ type: 'text', value: current })
          current = ''
        }
        
        // 查找匹配的 }}
        let j = i + 2
        let braceCount = 1
        while (j < template.length - 1 && braceCount > 0) {
          if (template.substr(j, 2) === '{{') {
            braceCount++
            j += 2
          } else if (template.substr(j, 2) === '}}') {
            braceCount--
            j += 2
          } else {
            j++
          }
        }
        
        if (braceCount === 0) {
          const tokenContent = template.substring(i + 2, j - 2).trim()
          tokens.push(this._parseToken(tokenContent))
          i = j
        } else {
          // 语法错误，当作普通文本处理
          current += template[i]
          i++
        }
      } else {
        current += template[i]
        i++
      }
    }
    
    if (current) {
      tokens.push({ type: 'text', value: current })
    }
    
    return tokens
  }

  /**
   * 解析单个token
   * @private
   */
  static _parseToken(content) {
    if (content.startsWith('#if ')) {
      return { type: 'if', condition: content.substring(4).trim() }
    } else if (content === 'else') {
      return { type: 'else' }
    } else if (content === '/if') {
      return { type: 'endif' }
    } else {
      return { type: 'variable', name: content }
    }
  }

  /**
   * 处理token数组
   * @private
   */
  static _processTokens(tokens, data) {
    let result = ''
    let i = 0
    
    while (i < tokens.length) {
      const token = tokens[i]
      
      if (token.type === 'text') {
        result += token.value
      } else if (token.type === 'variable') {
        result += data[token.name] !== undefined ? data[token.name] : `{{${token.name}}}`
      } else if (token.type === 'if') {
        // 处理if语句块
        const ifBlock = this._extractIfBlock(tokens, i)
        if (ifBlock) {
          result += this._processIfBlock(ifBlock, data)
          i = ifBlock.endIndex
        } else {
          // 语法错误，当作普通文本处理
          result += `{{#if ${token.condition}}}`
        }
      } else {
        // 其他类型的token，当作普通文本处理
        result += `{{${token.type === 'else' ? 'else' : '/if'}}}`
      }
      
      i++
    }
    
    return result
  }

  /**
   * 提取if语句块
   * @private
   */
  static _extractIfBlock(tokens, startIndex) {
    const ifToken = tokens[startIndex]
    let ifCount = 1
    let elseIndex = -1
    let endIndex = -1
    
    for (let i = startIndex + 1; i < tokens.length; i++) {
      const token = tokens[i]
      
      if (token.type === 'if') {
        ifCount++
      } else if (token.type === 'endif') {
        ifCount--
        if (ifCount === 0) {
          endIndex = i
          break
        }
      } else if (token.type === 'else' && ifCount === 1 && elseIndex === -1) {
        elseIndex = i
      }
    }
    
    if (endIndex === -1) {
      return null // 语法错误
    }
    
    return {
      condition: ifToken.condition,
      ifTokens: tokens.slice(startIndex + 1, elseIndex === -1 ? endIndex : elseIndex),
      elseTokens: elseIndex === -1 ? [] : tokens.slice(elseIndex + 1, endIndex),
      endIndex
    }
  }

  /**
   * 处理if语句块
   * @private
   */
  static _processIfBlock(ifBlock, data) {
    const conditionValue = data[ifBlock.condition]
    const tokensToProcess = conditionValue ? ifBlock.ifTokens : ifBlock.elseTokens
    return this._processTokens(tokensToProcess, data)
  }

  /**
   * 处理变量替换
   * @private
   */
  static _processVariables(template, data) {
    const variableRegex = /\{\{(\w+)\}\}/g
    return template.replace(variableRegex, (match, variable) => {
      return data[variable] !== undefined ? data[variable] : match
    })
  }
}

/**
 * Prompt Service Class
 */
export class PromptService {
  /**
   * 生成研究方案的提示词
   * @param {object} options - 配置选项
   * @returns {string} - 生成的提示词
   */
  static generateResearchPlanPrompt(options = {}) {
    const {
      mode = 'auto',
      customTopic = '',
      userRequirements = '',
      researchContext = '',
      paperContents = '',
      paperCount = 0
    } = options

    const data = {
      customTopic: mode === 'custom' ? customTopic : '',
      hasUserRequirements: Boolean(userRequirements),
      userRequirements,
      researchContext,
      hasPapers: paperCount > 0,
      paperCount,
      paperContents
    }

    return SimpleTemplateEngine.render(RESEARCH_PLAN_GENERATION_TEMPLATE, data)
  }

  /**
   * 生成研究方案（简化接口）
   * @param {object} data - 数据对象
   * @returns {string} - 生成的提示词
   */
  static generateResearchPlan(data = {}) {
    return SimpleTemplateEngine.render(RESEARCH_PLAN_GENERATION_TEMPLATE, data)
  }

  /**
   * 生成方案评估的提示词
   * @param {object} options - 配置选项
   * @returns {string} - 生成的提示词
   */
  static generatePlanEvaluationPrompt(options = {}) {
    const {
      planContent = '',
      userRequirements = '',
      researchContext = ''
    } = options

    const data = {
      planContent,
      hasUserRequirements: Boolean(userRequirements),
      userRequirements,
      researchContext
    }

    return SimpleTemplateEngine.render(PLAN_EVALUATION_TEMPLATE, data)
  }

  /**
   * 生成部分评估的提示词
   * @param {object} options - 配置选项
   * @returns {string} - 生成的提示词
   */
  static generateSectionEvaluationPrompt(options = {}) {
    const {
      sectionName = '',
      sectionContent = '',
      fullPlanContent = '',
      userRequirements = '',
      researchContext = ''
    } = options

    const data = {
      sectionName,
      sectionContent,
      fullPlanContent,
      hasUserRequirements: Boolean(userRequirements),
      userRequirements,
      researchContext
    }

    return SimpleTemplateEngine.render(SECTION_EVALUATION_TEMPLATE, data)
  }

  /**
   * 生成完整方案迭代的提示词
   * @param {object} options - 配置选项
   * @returns {string} - 生成的提示词
   */
  static generateFullPlanIterationPrompt(options = {}) {
    const {
      suggestion = '',
      planContent = '',
      userRequirements = '',
      researchContext = ''
    } = options

    // 获取优化规格
    const optimizationSpec = this._getOptimizationSpec(suggestion)
    const validationSpec = this._getValidationSpec(suggestion)

    const data = {
      suggestion,
      planContent,
      tone: optimizationSpec.tone,
      requirements: optimizationSpec.requirements.join('\n'),
      focusAreas: optimizationSpec.focusAreas.map(area => `- ${area}`).join('\n'),
      hasUserRequirements: Boolean(userRequirements),
      userRequirements,
      researchContext,
      validationCriteria: validationSpec.criteria.map((criterion, index) => `${index + 1}. ${criterion}`).join('\n'),
      qualityRequirements: validationSpec.qualityRequirements ? 
        validationSpec.qualityRequirements.map(req => `- ${req}`).join('\n') : '',
      checklist: validationSpec.checklist.map(item => `✓ ${item}是否得到显著改善？`).join('\n')
    }

    return SimpleTemplateEngine.render(FULL_PLAN_ITERATION_TEMPLATE, data)
  }

  /**
   * 生成部分迭代的提示词
   * @param {object} options - 配置选项
   * @returns {string} - 生成的提示词
   */
  static generateSectionIterationPrompt(options = {}) {
    const {
      section = '',
      sectionName = '',
      suggestion = '',
      hypotheses = '',
      experimentalDesign = '',
      analysisMethod = '',
      expectedResults = '',
      userRequirements = '',
      researchContext = ''
    } = options

    // 获取优化规格和验证规格
    const optimizationSpec = this._getOptimizationSpec(suggestion)
    const validationSpec = this._getValidationSpec(suggestion)
    const sectionGuidance = this._getSectionGuidance(section, suggestion)

    const data = {
      section,
      sectionName,
      suggestion,
      hypotheses,
      experimentalDesign,
      analysisMethod,
      expectedResults,
      tone: optimizationSpec.tone,
      requirements: optimizationSpec.requirements.join('\n'),
      focusAreas: optimizationSpec.focusAreas.map(area => `- ${area}`).join('\n'),
      sectionGuidance: sectionGuidance.join('\n'),
      hasUserRequirements: Boolean(userRequirements),
      userRequirements,
      researchContext,
      validationCriteria: validationSpec.criteria.map((criterion, index) => `${index + 1}. ${criterion}`).join('\n'),
      qualityRequirements: validationSpec.qualityRequirements ? 
        validationSpec.qualityRequirements.map(req => `- ${req}`).join('\n') : '',
      checklist: validationSpec.checklist.map(item => `✓ "${sectionName}"部分的${item}是否得到显著改善？`).join('\n')
    }

    return SimpleTemplateEngine.render(SECTION_ITERATION_TEMPLATE, data)
  }

  /**
   * 生成来源介绍的提示词
   * @param {object} options - 配置选项
   * @returns {string} - 生成的提示词
   */
  static generateSourceIntroductionPrompt(options = {}) {
    const {
      activeSection = '',
      sectionName = '',
      currentSectionContent = '',
      referencesInfo = '',
      userRequirements = '',
      researchContext = ''
    } = options

    const data = {
      currentSectionContent,
      referencesInfo,
      hasUserRequirements: Boolean(userRequirements),
      userRequirements,
      researchContext,
      sectionName
    }

    // 根据不同部分选择对应的模板
    let template
    switch (activeSection) {
      case 'hypothesis':
        template = SOURCE_INTRODUCTION_HYPOTHESIS_TEMPLATE
        break
      case 'design':
        template = SOURCE_INTRODUCTION_DESIGN_TEMPLATE
        break
      case 'analysis':
        template = SOURCE_INTRODUCTION_ANALYSIS_TEMPLATE
        break
      case 'results':
        template = SOURCE_INTRODUCTION_RESULTS_TEMPLATE
        break
      default:
        template = SOURCE_INTRODUCTION_DEFAULT_TEMPLATE
        break
    }

    return SimpleTemplateEngine.render(template, data)
  }

  /**
   * 生成方法介绍的提示词
   * @param {object} options - 配置选项
   * @returns {string} - 生成的提示词
   */
  static generateMethodIntroductionPrompt(options = {}) {
    const {
      aiService = 'coze',
      analysisContent = '',
      userRequirements = '',
      researchContext = ''
    } = options

    const data = {
      analysisContent,
      hasUserRequirements: Boolean(userRequirements),
      userRequirements,
      researchContext
    }

    // 根据AI服务类型选择对应的模板
    const template = aiService === 'chatgpt' ? 
      METHOD_INTRODUCTION_CHATGPT_TEMPLATE : 
      METHOD_INTRODUCTION_COZE_TEMPLATE

    return SimpleTemplateEngine.render(template, data)
  }

  /**
   * Get preset suggestion list
   * @param {string} section - Section name
   * @returns {array} - Suggestion list
   */
  static getPresetSuggestions(section = 'full') {
    const baseSuggestions = PRESET_SUGGESTIONS.base || []
    const sectionSuggestions = PRESET_SUGGESTIONS[section] || []
    return [...baseSuggestions, ...sectionSuggestions]
  }

  /**
   * Get English mapping of section names
   * @param {string} section - English section name
   * @returns {string} - English name
   */
  static getSectionNameInEnglish(section) {
    const sectionMap = {
      'full': 'Complete Plan',
      'hypothesis': 'Research Hypotheses',
      'design': 'Experimental Design',
      'analysis': 'Data Analysis',
      'results': 'Results Presentation'
    }
    return sectionMap[section] || section
  }

  /**
   * 获取优化规格
   * @private
   * @param {string} suggestion - 优化建议
   * @returns {object} - 优化规格对象
   */
  static _getOptimizationSpec(suggestion) {
    // 检查是否匹配预定义的优化类型
    for (const [key, spec] of Object.entries(OPTIMIZATION_SPECS)) {
      if (suggestion.includes(key)) {
        return spec
      }
    }

    // Default optimization specifications
    return {
      tone: 'You are a senior HCI research expert who needs to conduct targeted optimization based on specific suggestions',
      requirements: [
        '**Targeted Improvement**: Focus on specific issues and improvement directions mentioned in the suggestions',
        '**Maintain Balance**: While improving, maintain the overall coordination and integrity of the plan',
        '**Quality Enhancement**: Ensure that the optimized plan has significant quality improvements in specified areas'
      ],
      focusAreas: ['Targeted implementation of suggestions', 'Overall plan coordination', 'Significance of improvement effects']
    }
  }

  /**
   * 获取验证规格
   * @private
   * @param {string} suggestion - 优化建议
   * @returns {object} - 验证规格对象
   */
  static _getValidationSpec(suggestion) {
    // 检查是否匹配预定义的验证类型
    for (const [key, spec] of Object.entries(VALIDATION_SPECS)) {
      if (suggestion.includes(key)) {
        return spec
      }
    }

    // Default validation specifications
    return {
      criteria: [
        '**Improvement Targeting Check**: The optimization content accurately responds to the user\'s specific suggestions',
        '**Quality Enhancement Verification**: There are obvious improvement effects in the direction of the suggestions',
        '**Overall Coordination Confirmation**: The improvements maintain the overall coordination of the plan'
      ],
      checklist: ['Suggestion responsiveness', 'Improvement significance', 'Overall coordination']
    }
  }

  /**
   * 获取部分特定指导
   * @private
   * @param {string} section - 部分名称
   * @param {string} suggestion - 优化建议
   * @returns {array} - 指导内容数组
   */
  static _getSectionGuidance(section, suggestion) {
    const sectionConfig = SECTION_GUIDANCE[section]
    if (!sectionConfig) return []

    const suggestionLower = suggestion.toLowerCase()
    let guidance = []

    // Check suggestion type and return corresponding guidance
    if ((suggestionLower.includes('rigor') || suggestionLower.includes('严谨性')) && sectionConfig['rigor']) {
      guidance.push(...sectionConfig['rigor'])
    }
    if ((suggestionLower.includes('detail') || suggestionLower.includes('细节') || suggestionLower.includes('详细')) && sectionConfig['detail']) {
      guidance.push(...sectionConfig['detail'])
    }
    if ((suggestionLower.includes('simplify') || suggestionLower.includes('简化')) && sectionConfig['simplify']) {
      guidance.push(...sectionConfig['simplify'])
    }
    if ((suggestionLower.includes('statistical method') || suggestionLower.includes('统计方法')) && sectionConfig['statistical_method']) {
      guidance.push(...sectionConfig['statistical_method'])
    }
    if ((suggestionLower.includes('effect size') || suggestionLower.includes('效应量')) && sectionConfig['effect_size']) {
      guidance.push(...sectionConfig['effect_size'])
    }
    if ((suggestionLower.includes('hypothesis test') || suggestionLower.includes('假设检验')) && sectionConfig['hypothesis_test']) {
      guidance.push(...sectionConfig['hypothesis_test'])
    }
    if ((suggestionLower.includes('data processing') || suggestionLower.includes('数据处理')) && sectionConfig['data_processing']) {
      guidance.push(...sectionConfig['data_processing'])
    }

    return guidance
  }

  /**
   * 构建论文内容字符串
   * @param {array} referencedPapers - 参考文献数组
   * @param {string} aiService - AI服务类型
   * @returns {object} - 包含论文内容和数量的对象
   */
  static async buildPaperContents(referencedPapers, aiService = 'coze') {
    if (!referencedPapers || referencedPapers.length === 0) {
      return { paperContents: '', paperCount: 0 }
    }

    let paperContents = ''
    let actualPaperCount = 0

    for (let i = 0; i < referencedPapers.length; i++) {
      const paper = referencedPapers[i]
      let fullText = paper.fullText

      // 如果没有全文，尝试获取
      if (!fullText) {
        try {
          const { getApiBaseUrl } = await import('../config/environment.js')
          const getContentApiUrl = `${getApiBaseUrl()}/paper/get-full-content`
          
          const response = await fetch(getContentApiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: paper.title,
              doi: paper.doi || null,
              aiService: aiService === 'chatgpt' ? 'chatgpt' : 'coze'
            })
          })
          
          if (response.ok) {
            const result = await response.json()
            if (result.success && result.fullText) {
              fullText = result.fullText
              paper.fullText = fullText // 更新论文对象
            }
          }
        } catch (error) {
          console.error(`Failed to get full text for paper "${paper.title}":`, error)
        }
      }

      if (fullText) {
        paperContents += `\n参考文献${actualPaperCount + 1}全文内容：\n${fullText}\n`
        actualPaperCount++
      }
    }

    return { paperContents, paperCount: actualPaperCount }
  }

  /**
   * 构建参考文献信息字符串（用于来源介绍）
   * @param {array} referencedPapers - 参考文献数组
   * @param {string} aiService - AI服务类型
   * @returns {string} - 参考文献信息字符串
   */
  static async buildReferencesInfo(referencedPapers, aiService = 'coze') {
    if (!referencedPapers || referencedPapers.length === 0) {
      return ''
    }

    let referencesInfo = ''
    
    for (let i = 0; i < referencedPapers.length; i++) {
      const paper = referencedPapers[i]
      let paperInfo = `\nReference ${i + 1}:`
      paperInfo += `\nTitle: ${paper.title}`
      paperInfo += `\nAbstract: ${paper.abstract || paper.summary || 'No abstract available'}`
      
      let fullText = paper.fullText
      
      // 如果没有全文，尝试获取
      if (!fullText) {
        try {
          const { getApiBaseUrl } = await import('../config/environment.js')
          const getContentApiUrl = `${getApiBaseUrl()}/paper/get-full-content`
          
          const response = await fetch(getContentApiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: paper.title,
              doi: paper.doi || null,
              aiService: aiService === 'chatgpt' ? 'chatgpt' : 'coze'
            })
          })
          
          if (response.ok) {
            const result = await response.json()
            if (result.success && result.fullText) {
              fullText = result.fullText
              paper.fullText = fullText // 更新论文对象
            }
          }
        } catch (error) {
          console.error(`Failed to get full text for paper "${paper.title}":`, error)
        }
      }

      // 优先使用全文内容
      if (fullText) {
        paperInfo += `\nFull Text Content: ${fullText}`
      } else {
        // 如果没有全文，退回到研究方法总结
        if (paper.researchMethod) {
          paperInfo += `\nResearch Method Summary: ${paper.researchMethod}`
        } else {
          // 如果没有研究方法总结，尝试从缓存中获取
          try {
            const { getApiBaseUrl } = await import('../config/environment.js')
            const getCachedMethodApiUrl = `${getApiBaseUrl()}/paper/get-cached-method`
            
            const response = await fetch(getCachedMethodApiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                title: paper.title,
                doi: paper.doi || null
              })
            })
            
            if (response.ok) {
              const result = await response.json()
              if (result.success && result.methodSummary) {
                paperInfo += `\nResearch Method Summary: ${result.methodSummary}`
                paper.researchMethod = result.methodSummary
              } else {
                paperInfo += `\nResearch Method Summary: Not available`
              }
            } else {
              paperInfo += `\nResearch Method Summary: Not available`
            }
          } catch (error) {
            console.error('Failed to get research method summary:', error)
            paperInfo += `\nResearch Method Summary: Not available`
          }
        }
      }
      
      paperInfo += '\n'
      referencesInfo += paperInfo
    }

    return referencesInfo
  }
} 