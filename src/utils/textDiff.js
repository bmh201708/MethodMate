/**
 * 文本差异比较工具
 * 用于比较迭代前后的方案内容，生成带有颜色标记的差异显示
 */

// 改进的文本差异比较函数 - 支持多级对比
export function compareText(oldText, newText) {
  if (!oldText && !newText) return { added: [], removed: [], unchanged: [] }
  if (!oldText) return { added: [newText], removed: [], unchanged: [] }
  if (!newText) return { added: [], removed: [oldText], unchanged: [] }
  
  // 首先尝试行级比较
  const lineResult = compareByLines(oldText, newText)
  
  // 如果行级比较发现大量变化，尝试句子级比较
  const totalLines = lineResult.added.length + lineResult.removed.length + lineResult.unchanged.length
  const changeRate = (lineResult.added.length + lineResult.removed.length) / totalLines
  
  if (changeRate > 0.6) { // 如果超过60%的行发生变化，尝试句子级比较
    const sentenceResult = compareBySentences(oldText, newText)
    
    // 如果句子级比较效果更好，使用句子级结果
    const sentenceTotal = sentenceResult.added.length + sentenceResult.removed.length + sentenceResult.unchanged.length
    const sentenceChangeRate = (sentenceResult.added.length + sentenceResult.removed.length) / sentenceTotal
    
    if (sentenceChangeRate < changeRate) {
      return sentenceResult
    }
  }
  
  return lineResult
}

// 行级比较（原有逻辑）
function compareByLines(oldText, newText) {
  const oldLines = oldText.split('\n').filter(line => line.trim() !== '')
  const newLines = newText.split('\n').filter(line => line.trim() !== '')
  
  const result = {
    added: [],
    removed: [],
    unchanged: []
  }
  
  const oldSet = new Set(oldLines)
  const newSet = new Set(newLines)
  
  // 找出新增的行
  for (const line of newLines) {
    if (!oldSet.has(line)) {
      result.added.push(line)
    }
  }
  
  // 找出删除的行
  for (const line of oldLines) {
    if (!newSet.has(line)) {
      result.removed.push(line)
    }
  }
  
  // 找出保持不变的行
  for (const line of oldLines) {
    if (newSet.has(line)) {
      result.unchanged.push(line)
    }
  }
  
  return result
}

// 句子级比较
function compareBySentences(oldText, newText) {
  // 按句子分割（考虑中英文句号、问号、感叹号）
  const sentenceRegex = /[.!?。！？]+\s*/g
  const oldSentences = oldText.split(sentenceRegex).filter(s => s.trim() !== '')
  const newSentences = newText.split(sentenceRegex).filter(s => s.trim() !== '')
  
  const result = {
    added: [],
    removed: [],
    unchanged: []
  }
  
  // 使用相似度比较来匹配句子
  const oldMatched = new Set()
  const newMatched = new Set()
  
  // 首先找完全匹配的句子
  for (let i = 0; i < oldSentences.length; i++) {
    const oldSentence = oldSentences[i].trim()
    for (let j = 0; j < newSentences.length; j++) {
      const newSentence = newSentences[j].trim()
      if (oldSentence === newSentence && !oldMatched.has(i) && !newMatched.has(j)) {
        result.unchanged.push(oldSentence)
        oldMatched.add(i)
        newMatched.add(j)
        break
      }
    }
  }
  
  // 然后找高相似度的句子（相似度 > 0.8）
  for (let i = 0; i < oldSentences.length; i++) {
    if (oldMatched.has(i)) continue
    
    const oldSentence = oldSentences[i].trim()
    let bestMatch = -1
    let bestSimilarity = 0
    
    for (let j = 0; j < newSentences.length; j++) {
      if (newMatched.has(j)) continue
      
      const newSentence = newSentences[j].trim()
      const similarity = calculateSimilarity(oldSentence, newSentence)
      
      if (similarity > 0.8 && similarity > bestSimilarity) {
        bestSimilarity = similarity
        bestMatch = j
      }
    }
    
    if (bestMatch !== -1) {
      // 如果相似度很高但不完全相同，标记为修改（删除旧的，添加新的）
      result.removed.push(oldSentences[i].trim())
      result.added.push(newSentences[bestMatch].trim())
      oldMatched.add(i)
      newMatched.add(bestMatch)
    }
  }
  
  // 剩余的句子标记为删除或新增
  for (let i = 0; i < oldSentences.length; i++) {
    if (!oldMatched.has(i)) {
      result.removed.push(oldSentences[i].trim())
    }
  }
  
  for (let j = 0; j < newSentences.length; j++) {
    if (!newMatched.has(j)) {
      result.added.push(newSentences[j].trim())
    }
  }
  
  return result
}

// 计算两个字符串的相似度（使用编辑距离）
function calculateSimilarity(str1, str2) {
  const len1 = str1.length
  const len2 = str2.length
  
  if (len1 === 0) return len2 === 0 ? 1 : 0
  if (len2 === 0) return 0
  
  const matrix = Array(len1 + 1).fill().map(() => Array(len2 + 1).fill(0))
  
  for (let i = 0; i <= len1; i++) matrix[i][0] = i
  for (let j = 0; j <= len2; j++) matrix[0][j] = j
  
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,      // deletion
        matrix[i][j - 1] + 1,      // insertion
        matrix[i - 1][j - 1] + cost // substitution
      )
    }
  }
  
  const maxLen = Math.max(len1, len2)
  return (maxLen - matrix[len1][len2]) / maxLen
}

// 生成带颜色标记的HTML差异显示
export function generateDiffHTML(oldText, newText) {
  const diff = compareText(oldText, newText)
  
  let html = '<div class="text-diff">'
  
  // 显示删除的内容（红色）
  if (diff.removed.length > 0) {
    html += '<div class="diff-section">'
    html += '<h4 class="diff-title removed">Deleted Content</h4>'
    html += '<div class="diff-content removed">'
    diff.removed.forEach(line => {
      html += `<div class="diff-line removed">- ${escapeHtml(line)}</div>`
    })
    html += '</div></div>'
  }
  
  // 显示新增的内容（绿色）
  if (diff.added.length > 0) {
    html += '<div class="diff-section">'
    html += '<h4 class="diff-title added">Added Content</h4>'
    html += '<div class="diff-content added">'
    diff.added.forEach(line => {
      html += `<div class="diff-line added">+ ${escapeHtml(line)}</div>`
    })
    html += '</div></div>'
  }
  
  // 显示保持不变的内容（灰色）
  if (diff.unchanged.length > 0) {
    html += '<div class="diff-section">'
    html += '<h4 class="diff-title unchanged">Unchanged Content</h4>'
    html += '<div class="diff-content unchanged">'
    diff.unchanged.forEach(line => {
      html += `<div class="diff-line unchanged">  ${escapeHtml(line)}</div>`
    })
    html += '</div></div>'
  }
  
  html += '</div>'
  return html
}

// 生成简化的差异摘要
export function generateDiffSummary(oldText, newText) {
  const diff = compareText(oldText, newText)
  
  const summary = {
    addedLines: diff.added.length,
    removedLines: diff.removed.length,
    unchangedLines: diff.unchanged.length,
    totalChanges: diff.added.length + diff.removed.length,
    changePercentage: 0
  }
  
  const totalLines = diff.added.length + diff.removed.length + diff.unchanged.length
  if (totalLines > 0) {
    summary.changePercentage = Math.round((summary.totalChanges / totalLines) * 100)
  }
  
  return summary
}

// 转义HTML字符
function escapeHtml(text) {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

// 比较两个对象数组（如研究假设）
export function compareArrays(oldArray, newArray) {
  if (!oldArray && !newArray) return { added: [], removed: [], unchanged: [] }
  if (!oldArray) return { added: newArray, removed: [], unchanged: [] }
  if (!newArray) return { added: [], removed: oldArray, unchanged: [] }
  
  const result = {
    added: [],
    removed: [],
    unchanged: []
  }
  
  // 处理数组为空的情况
  if (oldArray.length === 0 && newArray.length === 0) {
    return result
  }
  
  // 如果其中一个为空，另一个不为空，则全部为新增或删除
  if (oldArray.length === 0) {
    result.added = [...newArray]
    return result
  }
  
  if (newArray.length === 0) {
    result.removed = [...oldArray]
    return result
  }
  
  const oldSet = new Set(oldArray)
  const newSet = new Set(newArray)
  
  // 找出新增的项目
  for (const item of newArray) {
    if (!oldSet.has(item)) {
      result.added.push(item)
    }
  }
  
  // 找出删除的项目
  for (const item of oldArray) {
    if (!newSet.has(item)) {
      result.removed.push(item)
    }
  }
  
  // 找出保持不变的项目
  for (const item of oldArray) {
    if (newSet.has(item)) {
      result.unchanged.push(item)
    }
  }
  
  return result
}

// 生成数组差异的HTML显示
export function generateArrayDiffHTML(oldArray, newArray, title = '') {
  const diff = compareArrays(oldArray, newArray)
  
  let html = `<div class="array-diff">`
  if (title) {
    html += `<h3 class="array-diff-title">${title}</h3>`
  }
  
  // 显示删除的项目（红色）
  if (diff.removed.length > 0) {
    html += '<div class="diff-section">'
    html += '<h4 class="diff-title removed">Deleted Items</h4>'
    html += '<div class="diff-content removed">'
    diff.removed.forEach(item => {
      html += `<div class="diff-item removed">- ${escapeHtml(item)}</div>`
    })
    html += '</div></div>'
  }
  
  // 显示新增的项目（绿色）
  if (diff.added.length > 0) {
    html += '<div class="diff-section">'
    html += '<h4 class="diff-title added">Added Items</h4>'
    html += '<div class="diff-content added">'
    diff.added.forEach(item => {
      html += `<div class="diff-item added">+ ${escapeHtml(item)}</div>`
    })
    html += '</div></div>'
  }
  
  // 显示保持不变的项目（灰色）
  if (diff.unchanged.length > 0) {
    html += '<div class="diff-section">'
    html += '<h4 class="diff-title unchanged">Unchanged Items</h4>'
    html += '<div class="diff-content unchanged">'
    diff.unchanged.forEach(item => {
      html += `<div class="diff-item unchanged">  ${escapeHtml(item)}</div>`
    })
    html += '</div></div>'
  }
  
  html += '</div>'
  return html
}

// 生成完整的方案对比HTML（左右分栏布局）- 总是显示所有部分
export function generatePlanComparisonHTML(beforePlan, afterPlan) {
  let html = '<div class="plan-comparison-side-by-side">'
  
  // 标题对比 - 总是显示
  html += '<div class="comparison-section">'
  html += '<h3 class="section-title">Research Title</h3>'
  if (beforePlan.title !== afterPlan.title) {
    html += generateSideBySideDiffHTML(beforePlan.title || '', afterPlan.title || '')
  } else {
    html += generateNoChangeHTML(beforePlan.title || 'No title', 'title')
  }
  html += '</div>'
  
  // 研究假设对比 - 总是显示
  html += '<div class="comparison-section">'
  html += '<h3 class="section-title">Research Hypotheses</h3>'
  const hypothesesDiff = compareArrays(beforePlan.hypotheses || [], afterPlan.hypotheses || [])
  if (hypothesesDiff.added.length > 0 || hypothesesDiff.removed.length > 0 || 
      JSON.stringify(beforePlan.hypotheses || []) !== JSON.stringify(afterPlan.hypotheses || [])) {
    html += generateSideBySideArrayDiffHTML(beforePlan.hypotheses || [], afterPlan.hypotheses || [], '')
  } else {
    html += generateNoChangeArrayHTML(beforePlan.hypotheses || [], 'hypotheses')
  }
  html += '</div>'
  
  // 实验设计对比 - 总是显示
  html += '<div class="comparison-section">'
  html += '<h3 class="section-title">Experimental Design</h3>'
  if (beforePlan.experimentalDesign !== afterPlan.experimentalDesign) {
    html += generateSideBySideDiffHTML(beforePlan.experimentalDesign || '', afterPlan.experimentalDesign || '')
  } else {
    html += generateNoChangeHTML(beforePlan.experimentalDesign || 'No experimental design', 'experimental-design')
  }
  html += '</div>'
  
  // 数据分析对比 - 总是显示
  html += '<div class="comparison-section">'
  html += '<h3 class="section-title">Data Analysis</h3>'
  if (beforePlan.analysisMethod !== afterPlan.analysisMethod) {
    html += generateSideBySideDiffHTML(beforePlan.analysisMethod || '', afterPlan.analysisMethod || '')
  } else {
    html += generateNoChangeHTML(beforePlan.analysisMethod || 'No analysis method', 'analysis-method')
  }
  html += '</div>'
  
  // 结果呈现对比 - 总是显示
  html += '<div class="comparison-section">'
  html += '<h3 class="section-title">Expected Results</h3>'
  if (beforePlan.expectedResults !== afterPlan.expectedResults) {
    html += generateSideBySideDiffHTML(beforePlan.expectedResults || '', afterPlan.expectedResults || '')
  } else {
    html += generateNoChangeHTML(beforePlan.expectedResults || 'No expected results', 'expected-results')
  }
  html += '</div>'
  
  html += '</div>'
  return html
}

// 生成左右分栏的文本差异HTML
export function generateSideBySideDiffHTML(oldText, newText) {
  const diff = compareText(oldText, newText)
  
  let html = '<div class="side-by-side-diff">'
  html += '<div class="diff-columns">'
  
  // 左侧：原文
  html += '<div class="diff-column old-column">'
  html += '<h4 class="column-title removed">Original</h4>'
  html += '<div class="column-content">'
  
  // 显示删除的内容（红色）
  if (diff.removed.length > 0) {
    diff.removed.forEach(line => {
      html += `<div class="diff-line removed">${escapeHtml(line)}</div>`
    })
  }
  
  // 显示保持不变的内容
  if (diff.unchanged.length > 0) {
    diff.unchanged.forEach(line => {
      html += `<div class="diff-line unchanged">${escapeHtml(line)}</div>`
    })
  }
  
  html += '</div></div>'
  
  // 右侧：新文
  html += '<div class="diff-column new-column">'
  html += '<h4 class="column-title added">After Iteration</h4>'
  html += '<div class="column-content">'
  
  // 显示新增的内容（绿色）
  if (diff.added.length > 0) {
    diff.added.forEach(line => {
      html += `<div class="diff-line added">${escapeHtml(line)}</div>`
    })
  }
  
  // 显示保持不变的内容
  if (diff.unchanged.length > 0) {
    diff.unchanged.forEach(line => {
      html += `<div class="diff-line unchanged">${escapeHtml(line)}</div>`
    })
  }
  
  html += '</div></div>'
  
  html += '</div></div>'
  return html
}

// 生成左右分栏的数组差异HTML
export function generateSideBySideArrayDiffHTML(oldArray, newArray, title = '') {
  const diff = compareArrays(oldArray, newArray)
  
  let html = `<div class="side-by-side-array-diff">`
  if (title) {
    html += `<h3 class="array-diff-title">${title}</h3>`
  }
  
  html += '<div class="diff-columns">'
  
  // 左侧：原文
  html += '<div class="diff-column old-column">'
  html += '<h4 class="column-title removed">Original</h4>'
  html += '<div class="column-content">'
  
  // 显示删除的项目（红色）
  if (diff.removed.length > 0) {
    diff.removed.forEach(item => {
      html += `<div class="diff-item removed">${escapeHtml(item)}</div>`
    })
  }
  
  // 显示保持不变的项目
  if (diff.unchanged.length > 0) {
    diff.unchanged.forEach(item => {
      html += `<div class="diff-item unchanged">${escapeHtml(item)}</div>`
    })
  }
  
  html += '</div></div>'
  
  // 右侧：新文
  html += '<div class="diff-column new-column">'
  html += '<h4 class="column-title added">After Iteration</h4>'
  html += '<div class="column-content">'
  
  // 显示新增的项目（绿色）
  if (diff.added.length > 0) {
    diff.added.forEach(item => {
      html += `<div class="diff-item added">${escapeHtml(item)}</div>`
    })
  }
  
  // 显示保持不变的项目
  if (diff.unchanged.length > 0) {
    diff.unchanged.forEach(item => {
      html += `<div class="diff-item unchanged">${escapeHtml(item)}</div>`
    })
  }
  
  html += '</div></div>'
  
  html += '</div></div>'
  return html
}

// 生成左右分栏的完整方案对比HTML（左边原文，右边修改后）
// 生成左右分栏的完整方案对比HTML - 总是显示所有部分
export function generateLeftRightComparisonHTML(beforePlan, afterPlan) {
  // 参数验证
  if (!beforePlan || !afterPlan) {
    return '<div class="text-center text-red-500 py-8">Comparison data is incomplete</div>'
  }
  
  let html = '<div class="left-right-comparison">'
  
  // 标题对比 - 总是显示
  html += '<div class="comparison-section">'
  html += '<h3 class="section-title">Research Title</h3>'
  if (beforePlan.title !== afterPlan.title) {
    html += generateLeftRightDiffHTML(beforePlan.title || '', afterPlan.title || '')
  } else {
    html += generateNoChangeHTML(beforePlan.title || 'No title', 'title')
  }
  html += '</div>'
  
  // 研究假设对比 - 总是显示
  html += '<div class="comparison-section">'
  html += '<h3 class="section-title">Research Hypotheses</h3>'
  const beforeHypotheses = Array.isArray(beforePlan.hypotheses) ? beforePlan.hypotheses : []
  const afterHypotheses = Array.isArray(afterPlan.hypotheses) ? afterPlan.hypotheses : []
  const hypothesesDiff = compareArrays(beforeHypotheses, afterHypotheses)
  
  if (hypothesesDiff.added.length > 0 || hypothesesDiff.removed.length > 0 || 
      JSON.stringify(beforeHypotheses) !== JSON.stringify(afterHypotheses)) {
    html += generateLeftRightArrayDiffHTML(beforeHypotheses, afterHypotheses, '')
  } else {
    html += generateNoChangeArrayHTML(beforeHypotheses, 'hypotheses')
  }
  html += '</div>'
  
  // 实验设计对比 - 总是显示
  html += '<div class="comparison-section">'
  html += '<h3 class="section-title">Experimental Design</h3>'
  if (beforePlan.experimentalDesign !== afterPlan.experimentalDesign) {
    html += generateLeftRightDiffHTML(beforePlan.experimentalDesign || '', afterPlan.experimentalDesign || '')
  } else {
    html += generateNoChangeHTML(beforePlan.experimentalDesign || 'No experimental design', 'experimental-design')
  }
  html += '</div>'
  
  // 数据分析对比 - 总是显示
  html += '<div class="comparison-section">'
  html += '<h3 class="section-title">Data Analysis</h3>'
  if (beforePlan.analysisMethod !== afterPlan.analysisMethod) {
    html += generateLeftRightDiffHTML(beforePlan.analysisMethod || '', afterPlan.analysisMethod || '')
  } else {
    html += generateNoChangeHTML(beforePlan.analysisMethod || 'No analysis method', 'analysis-method')
  }
  html += '</div>'
  
  // 结果呈现对比 - 总是显示
  html += '<div class="comparison-section">'
  html += '<h3 class="section-title">Expected Results</h3>'
  if (beforePlan.expectedResults !== afterPlan.expectedResults) {
    html += generateLeftRightDiffHTML(beforePlan.expectedResults || '', afterPlan.expectedResults || '')
  } else {
    html += generateNoChangeHTML(beforePlan.expectedResults || 'No expected results', 'expected-results')
  }
  html += '</div>'
  
  html += '</div>'
  return html
}

// 生成左右分栏的文本差异HTML（左边原文，右边修改后）
export function generateLeftRightDiffHTML(oldText, newText) {
  const diff = compareText(oldText, newText)
  
  let html = '<div class="left-right-diff">'
  html += '<div class="diff-columns">'
  
  // 左侧：原文（显示删除的内容为红色，保持不变的内容为正常）
  html += '<div class="diff-column old-column">'
  html += '<h4 class="column-title">Original</h4>'
  html += '<div class="column-content">'
  
  // 显示删除的内容（红色）
  if (diff.removed.length > 0) {
    diff.removed.forEach(line => {
      html += `<div class="diff-line removed">${escapeHtml(line)}</div>`
    })
  }
  
  // 显示保持不变的内容
  if (diff.unchanged.length > 0) {
    diff.unchanged.forEach(line => {
      html += `<div class="diff-line unchanged">${escapeHtml(line)}</div>`
    })
  }
  
  html += '</div></div>'
  
  // 右侧：修改后（显示新增的内容为绿色，保持不变的内容为正常）
  html += '<div class="diff-column new-column">'
  html += '<h4 class="column-title">After Iteration</h4>'
  html += '<div class="column-content">'
  
  // 显示新增的内容（绿色）
  if (diff.added.length > 0) {
    diff.added.forEach(line => {
      html += `<div class="diff-line added">${escapeHtml(line)}</div>`
    })
  }
  
  // 显示保持不变的内容
  if (diff.unchanged.length > 0) {
    diff.unchanged.forEach(line => {
      html += `<div class="diff-line unchanged">${escapeHtml(line)}</div>`
    })
  }
  
  html += '</div></div>'
  
  html += '</div></div>'
  return html
}

// 生成左右分栏的数组差异HTML（左边原文，右边修改后）
export function generateLeftRightArrayDiffHTML(oldArray, newArray, title = '') {
  const diff = compareArrays(oldArray, newArray)
  
  let html = `<div class="left-right-array-diff">`
  if (title) {
    html += `<h3 class="array-diff-title">${title}</h3>`
  }
  
  html += '<div class="diff-columns">'
  
  // 左侧：原文（显示删除的项目为红色，保持不变的项目为正常）
  html += '<div class="diff-column old-column">'
  html += '<h4 class="column-title">Original</h4>'
  html += '<div class="column-content">'
  
  // 显示删除的项目（红色）
  if (diff.removed.length > 0) {
    diff.removed.forEach(item => {
      html += `<div class="diff-item removed">${escapeHtml(item)}</div>`
    })
  }
  
  // 显示保持不变的项目
  if (diff.unchanged.length > 0) {
    diff.unchanged.forEach(item => {
      html += `<div class="diff-item unchanged">${escapeHtml(item)}</div>`
    })
  }
  
  html += '</div></div>'
  
  // 右侧：修改后（显示新增的项目为绿色，保持不变的项目为正常）
  html += '<div class="diff-column new-column">'
  html += '<h4 class="column-title">After Iteration</h4>'
  html += '<div class="column-content">'
  
  // 显示新增的项目（绿色）
  if (diff.added.length > 0) {
    diff.added.forEach(item => {
      html += `<div class="diff-item added">${escapeHtml(item)}</div>`
    })
  }
  
  // 显示保持不变的项目
  if (diff.unchanged.length > 0) {
    diff.unchanged.forEach(item => {
      html += `<div class="diff-item unchanged">${escapeHtml(item)}</div>`
    })
  }
  
  html += '</div></div>'
  
  html += '</div></div>'
  return html
}

// 生成无变化文本内容的HTML显示
export function generateNoChangeHTML(content, sectionType = '') {
  let html = '<div class="no-change-display">'
  html += '<div class="no-change-indicator">'
  html += '<span class="no-change-badge">No Changes</span>'
  html += '</div>'
  html += '<div class="no-change-content">'
  
  // 分割内容为行并显示
  const lines = content.split('\n').filter(line => line.trim() !== '')
  if (lines.length > 0) {
    lines.forEach(line => {
      html += `<div class="diff-line no-change">${escapeHtml(line.trim())}</div>`
    })
  } else {
    html += `<div class="diff-line no-change empty">No content available</div>`
  }
  
  html += '</div></div>'
  return html
}

// 生成无变化数组内容的HTML显示
export function generateNoChangeArrayHTML(array, sectionType = '') {
  let html = '<div class="no-change-array-display">'
  html += '<div class="no-change-indicator">'
  html += '<span class="no-change-badge">No Changes</span>'
  html += '</div>'
  html += '<div class="no-change-content">'
  
  if (array && array.length > 0) {
    array.forEach(item => {
      html += `<div class="diff-item no-change">${escapeHtml(item)}</div>`
    })
  } else {
    html += `<div class="diff-item no-change empty">No content available</div>`
  }
  
  html += '</div></div>'
  return html
}

// 生成差异统计摘要
export function generateDiffStatistics(beforePlan, afterPlan) {
  const stats = {
    titleChanged: beforePlan.title !== afterPlan.title,
    hypothesesChanged: false,
    experimentalDesignChanged: beforePlan.experimentalDesign !== afterPlan.experimentalDesign,
    analysisMethodChanged: beforePlan.analysisMethod !== afterPlan.analysisMethod,
    expectedResultsChanged: beforePlan.expectedResults !== afterPlan.expectedResults,
    totalChanges: 0
  }
  
  // 检查研究假设变化
  const hypothesesDiff = compareArrays(beforePlan.hypotheses || [], afterPlan.hypotheses || [])
  stats.hypothesesChanged = hypothesesDiff.added.length > 0 || hypothesesDiff.removed.length > 0
  
  // 计算总变化数
  if (stats.titleChanged) stats.totalChanges++
  if (stats.hypothesesChanged) stats.totalChanges++
  if (stats.experimentalDesignChanged) stats.totalChanges++
  if (stats.analysisMethodChanged) stats.totalChanges++
  if (stats.expectedResultsChanged) stats.totalChanges++
  
  return stats
} 