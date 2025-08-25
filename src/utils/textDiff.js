/**
 * 文本差异比较工具
 * 用于比较迭代前后的方案内容，生成带有颜色标记的差异显示
 */

// 简单的文本差异比较函数
export function compareText(oldText, newText) {
  if (!oldText && !newText) return { added: [], removed: [], unchanged: [] }
  if (!oldText) return { added: [newText], removed: [], unchanged: [] }
  if (!newText) return { added: [], removed: [oldText], unchanged: [] }
  
  // 将文本按行分割
  const oldLines = oldText.split('\n')
  const newLines = newText.split('\n')
  
  const result = {
    added: [],
    removed: [],
    unchanged: []
  }
  
  // 简单的行级比较
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

// 生成完整的方案对比HTML（左右分栏布局）
export function generatePlanComparisonHTML(beforePlan, afterPlan) {
  let html = '<div class="plan-comparison-side-by-side">'
  
  // 标题对比
  if (beforePlan.title !== afterPlan.title) {
    html += '<div class="comparison-section">'
    html += '<h3 class="section-title">Research Title</h3>'
    html += generateSideBySideDiffHTML(beforePlan.title || '', afterPlan.title || '')
    html += '</div>'
  }
  
  // 研究假设对比
  const hypothesesDiff = compareArrays(beforePlan.hypotheses || [], afterPlan.hypotheses || [])
  if (hypothesesDiff.added.length > 0 || hypothesesDiff.removed.length > 0) {
    html += '<div class="comparison-section">'
    html += generateSideBySideArrayDiffHTML(beforePlan.hypotheses || [], afterPlan.hypotheses || [], 'Research Hypotheses')
    html += '</div>'
  } else if (beforePlan.hypotheses && afterPlan.hypotheses && 
             JSON.stringify(beforePlan.hypotheses) !== JSON.stringify(afterPlan.hypotheses)) {
    // 如果数组内容相同但顺序不同，也显示对比
    html += '<div class="comparison-section">'
    html += generateSideBySideArrayDiffHTML(beforePlan.hypotheses, afterPlan.hypotheses, 'Research Hypotheses')
    html += '</div>'
  } else if (beforePlan.hypotheses || afterPlan.hypotheses) {
    // 如果其中一个有假设，另一个没有，也显示对比
    html += '<div class="comparison-section">'
    html += generateSideBySideArrayDiffHTML(beforePlan.hypotheses || [], afterPlan.hypotheses || [], 'Research Hypotheses')
    html += '</div>'
  }
  
  // 实验设计对比
  if (beforePlan.experimentalDesign !== afterPlan.experimentalDesign) {
    html += '<div class="comparison-section">'
    html += '<h3 class="section-title">Experimental Design</h3>'
    html += generateSideBySideDiffHTML(beforePlan.experimentalDesign || '', afterPlan.experimentalDesign || '')
    html += '</div>'
  }
  
  // 数据分析对比
  if (beforePlan.analysisMethod !== afterPlan.analysisMethod) {
    html += '<div class="comparison-section">'
    html += '<h3 class="section-title">Data Analysis</h3>'
    html += generateSideBySideDiffHTML(beforePlan.analysisMethod || '', afterPlan.analysisMethod || '')
    html += '</div>'
  }
  
  // 结果呈现对比
  if (beforePlan.expectedResults !== afterPlan.expectedResults) {
    html += '<div class="comparison-section">'
    html += '<h3 class="section-title">Expected Results</h3>'
    html += generateSideBySideDiffHTML(beforePlan.expectedResults || '', afterPlan.expectedResults || '')
    html += '</div>'
  }
  
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
export function generateLeftRightComparisonHTML(beforePlan, afterPlan) {
  // 参数验证
  if (!beforePlan || !afterPlan) {
    return '<div class="text-center text-red-500 py-8">Comparison data is incomplete</div>'
  }
  
  let html = '<div class="left-right-comparison">'
  let hasChanges = false
  
  // 标题对比
  if (beforePlan.title !== afterPlan.title) {
    html += '<div class="comparison-section">'
    html += '<h3 class="section-title">Research Title</h3>'
    html += generateLeftRightDiffHTML(beforePlan.title || '', afterPlan.title || '')
    html += '</div>'
    hasChanges = true
  }
  
  // 研究假设对比
  const beforeHypotheses = Array.isArray(beforePlan.hypotheses) ? beforePlan.hypotheses : []
  const afterHypotheses = Array.isArray(afterPlan.hypotheses) ? afterPlan.hypotheses : []
  const hypothesesDiff = compareArrays(beforeHypotheses, afterHypotheses)
  
  if (hypothesesDiff.added.length > 0 || hypothesesDiff.removed.length > 0 || 
      JSON.stringify(beforeHypotheses) !== JSON.stringify(afterHypotheses)) {
    html += '<div class="comparison-section">'
    html += generateLeftRightArrayDiffHTML(beforeHypotheses, afterHypotheses, 'Research Hypotheses')
    html += '</div>'
    hasChanges = true
  }
  
  // 实验设计对比
  if (beforePlan.experimentalDesign !== afterPlan.experimentalDesign) {
    html += '<div class="comparison-section">'
    html += '<h3 class="section-title">Experimental Design</h3>'
    html += generateLeftRightDiffHTML(beforePlan.experimentalDesign || '', afterPlan.experimentalDesign || '')
    html += '</div>'
    hasChanges = true
  }
  
  // 数据分析对比
  if (beforePlan.analysisMethod !== afterPlan.analysisMethod) {
    html += '<div class="comparison-section">'
    html += '<h3 class="section-title">Data Analysis</h3>'
    html += generateLeftRightDiffHTML(beforePlan.analysisMethod || '', afterPlan.analysisMethod || '')
    html += '</div>'
    hasChanges = true
  }
  
  // 结果呈现对比
  if (beforePlan.expectedResults !== afterPlan.expectedResults) {
    html += '<div class="comparison-section">'
    html += '<h3 class="section-title">Expected Results</h3>'
    html += generateLeftRightDiffHTML(beforePlan.expectedResults || '', afterPlan.expectedResults || '')
    html += '</div>'
    hasChanges = true
  }
  
  // 如果没有变化，显示提示信息
  if (!hasChanges) {
    html += '<div class="text-center text-gray-500 py-8">The two plans have identical content, no differences found</div>'
  }
  
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