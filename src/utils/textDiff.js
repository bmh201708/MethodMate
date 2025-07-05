// 文本差异对比工具
// 基于最长公共子序列算法实现文本差异检测

// 判断文本是否只包含空格或换行符
function isWhitespaceOnly(text) {
  if (!text) return true
  return /^\s*$/.test(text)
}

// 过滤掉只包含空格或换行符的差异项
function filterMeaningfulDiffs(diffs) {
  return diffs.filter(item => {
    // 保留 unchanged 类型的项
    if (item.type === 'unchanged') return true
    
    // 过滤掉只包含空格或换行符的 added 和 removed 项
    if (item.type === 'added' || item.type === 'removed') {
      return !isWhitespaceOnly(item.text)
    }
    
    return true
  })
}

// 计算两个文本的差异
export function computeTextDiff(oldText, newText) {
  if (!oldText && !newText) return []
  if (!oldText) return isWhitespaceOnly(newText) ? [] : [{ type: 'added', text: newText }]
  if (!newText) return isWhitespaceOnly(oldText) ? [] : [{ type: 'removed', text: oldText }]

  // 按行分割文本进行比较
  const oldLines = oldText.split('\n')
  const newLines = newText.split('\n')
  
  const diff = computeLineDiff(oldLines, newLines)
  return filterMeaningfulDiffs(diff)
}

// 计算行级别的差异
function computeLineDiff(oldLines, newLines) {
  const diff = []
  const lcs = longestCommonSubsequence(oldLines, newLines)
  
  let oldIndex = 0
  let newIndex = 0
  let lcsIndex = 0
  
  while (oldIndex < oldLines.length || newIndex < newLines.length) {
    // 如果当前行在LCS中
    if (lcsIndex < lcs.length && 
        oldIndex < oldLines.length && 
        newIndex < newLines.length &&
        oldLines[oldIndex] === lcs[lcsIndex] && 
        newLines[newIndex] === lcs[lcsIndex]) {
      
      diff.push({
        type: 'unchanged',
        text: oldLines[oldIndex]
      })
      oldIndex++
      newIndex++
      lcsIndex++
    }
    // 删除的行
    else if (oldIndex < oldLines.length && 
             (lcsIndex >= lcs.length || oldLines[oldIndex] !== lcs[lcsIndex])) {
      diff.push({
        type: 'removed',
        text: oldLines[oldIndex]
      })
      oldIndex++
    }
    // 新增的行
    else if (newIndex < newLines.length &&
             (lcsIndex >= lcs.length || newLines[newIndex] !== lcs[lcsIndex])) {
      diff.push({
        type: 'added',
        text: newLines[newIndex]
      })
      newIndex++
    }
  }
  
  return diff
}

// 最长公共子序列算法
function longestCommonSubsequence(arr1, arr2) {
  const m = arr1.length
  const n = arr2.length
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0))
  
  // 构建DP表
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (arr1[i - 1] === arr2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }
  
  // 回溯构建LCS
  const lcs = []
  let i = m, j = n
  while (i > 0 && j > 0) {
    if (arr1[i - 1] === arr2[j - 1]) {
      lcs.unshift(arr1[i - 1])
      i--
      j--
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--
    } else {
      j--
    }
  }
  
  return lcs
}

// 将差异转换为HTML
export function diffToHtml(diff) {
  // 过滤掉只包含空格或换行符的差异
  const filteredDiff = filterMeaningfulDiffs(diff)
  
  // 合并连续的未修改内容
  const mergedDiff = mergeUnchangedSections(filteredDiff)
  
  return mergedDiff.map(item => {
    const text = item.text || ''
    const escapedText = escapeHtml(text)
    
    switch (item.type) {
      case 'added':
        return `<div class="diff-added p-2 my-1 rounded-lg bg-green-50 border-l-4 border-green-400">
          <span class="text-green-800 font-medium text-sm">+ 新增：</span>
          <div class="text-green-700 mt-1 whitespace-pre-wrap">${escapedText}</div>
        </div>`
      case 'removed':
        return `<div class="diff-removed p-2 my-1 rounded-lg bg-red-50 border-l-4 border-red-400">
          <span class="text-red-800 font-medium text-sm">- 删除：</span>
          <div class="text-red-700 mt-1 whitespace-pre-wrap line-through">${escapedText}</div>
        </div>`
      case 'unchanged':
        return `<div class="diff-unchanged p-2 my-1 rounded-lg bg-gray-50 border-l-4 border-gray-300">
          <span class="text-gray-600 font-medium text-sm">未修改：</span>
          <div class="text-gray-700 mt-1 whitespace-pre-wrap">${escapedText}</div>
        </div>`
      case 'unchanged-merged':
        return `<div class="diff-unchanged-merged p-2 my-1 rounded-lg bg-gray-50 border-l-4 border-gray-300">
          <button class="unchanged-toggle w-full text-left flex items-center justify-between text-gray-600 font-medium text-sm hover:text-gray-800 transition-colors" 
                  onclick="toggleUnchangedSection(this)">
            <span>未修改：${item.lineCount} 行内容</span>
            <svg class="w-4 h-4 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div class="unchanged-content hidden text-gray-700 mt-2 whitespace-pre-wrap border-t border-gray-200 pt-2">${escapedText}</div>
        </div>`
      default:
        return `<div class="whitespace-pre-wrap">${escapedText}</div>`
    }
  }).join('')
}

// 合并连续的未修改内容
function mergeUnchangedSections(diffs) {
  const merged = []
  let currentUnchanged = []
  
  for (let i = 0; i < diffs.length; i++) {
    const item = diffs[i]
    
    if (item.type === 'unchanged') {
      currentUnchanged.push(item)
    } else {
      // 处理累积的未修改内容
      if (currentUnchanged.length > 0) {
        if (currentUnchanged.length >= 3) {
          // 合并多行未修改内容
          const mergedText = currentUnchanged.map(u => u.text).join('\n')
          merged.push({
            type: 'unchanged-merged',
            text: mergedText,
            lineCount: currentUnchanged.length
          })
        } else {
          // 少于3行的未修改内容保持原样
          merged.push(...currentUnchanged)
        }
        currentUnchanged = []
      }
      
      // 添加当前的修改项
      merged.push(item)
    }
  }
  
  // 处理最后剩余的未修改内容
  if (currentUnchanged.length > 0) {
    if (currentUnchanged.length >= 3) {
      const mergedText = currentUnchanged.map(u => u.text).join('\n')
      merged.push({
        type: 'unchanged-merged',
        text: mergedText,
        lineCount: currentUnchanged.length
      })
    } else {
      merged.push(...currentUnchanged)
    }
  }
  
  return merged
}

// 计算字段级别的差异
export function computeFieldDiff(oldPlan, newPlan) {
  const fieldMapping = {
    'hypotheses': '研究假设',
    'experimentalDesign': '实验设计', 
    'analysisMethod': '数据分析',
    'expectedResults': '结果呈现'
  }
  
  const diffs = {}
  
  Object.keys(fieldMapping).forEach(field => {
    const oldValue = getFieldValue(oldPlan, field)
    const newValue = getFieldValue(newPlan, field)
    
    if (oldValue !== newValue) {
      diffs[field] = {
        name: fieldMapping[field],
        diff: computeTextDiff(oldValue, newValue),
        hasChanges: true
      }
    } else {
      diffs[field] = {
        name: fieldMapping[field],
        diff: [{ type: 'unchanged', text: oldValue }],
        hasChanges: false
      }
    }
  })
  
  return diffs
}

// 获取字段值
function getFieldValue(plan, field) {
  if (!plan) return ''
  
  if (field === 'hypotheses') {
    return Array.isArray(plan.hypotheses) ? plan.hypotheses.join('\n') : (plan.hypotheses || '')
  }
  
  return plan[field] || ''
}

// HTML转义
function escapeHtml(text) {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

// 获取差异统计
export function getDiffStats(diffs) {
  let totalChanges = 0
  let changedFields = 0
  
  Object.values(diffs).forEach(fieldDiff => {
    if (fieldDiff.hasChanges) {
      changedFields++
      totalChanges += fieldDiff.diff.filter(item => 
        item.type === 'added' || item.type === 'removed'
      ).length
    }
  })
  
  return {
    totalChanges,
    changedFields,
    totalFields: Object.keys(diffs).length
  }
}

// 计算简单的词级别差异（用于短文本）
export function computeWordDiff(oldText, newText) {
  if (!oldText && !newText) return []
  if (!oldText) return isWhitespaceOnly(newText) ? [] : [{ type: 'added', text: newText }]
  if (!newText) return isWhitespaceOnly(oldText) ? [] : [{ type: 'removed', text: oldText }]

  const oldWords = oldText.split(/(\s+)/)
  const newWords = newText.split(/(\s+)/)
  
  const diff = []
  const lcs = longestCommonSubsequence(oldWords, newWords)
  
  let oldIndex = 0
  let newIndex = 0
  let lcsIndex = 0
  
  while (oldIndex < oldWords.length || newIndex < newWords.length) {
    if (lcsIndex < lcs.length && 
        oldIndex < oldWords.length && 
        newIndex < newWords.length &&
        oldWords[oldIndex] === lcs[lcsIndex] && 
        newWords[newIndex] === lcs[lcsIndex]) {
      
      diff.push({
        type: 'unchanged',
        text: oldWords[oldIndex]
      })
      oldIndex++
      newIndex++
      lcsIndex++
    }
    else if (oldIndex < oldWords.length && 
             (lcsIndex >= lcs.length || oldWords[oldIndex] !== lcs[lcsIndex])) {
      diff.push({
        type: 'removed',
        text: oldWords[oldIndex]
      })
      oldIndex++
    }
    else if (newIndex < newWords.length &&
             (lcsIndex >= lcs.length || newWords[newIndex] !== lcs[lcsIndex])) {
      diff.push({
        type: 'added',
        text: newWords[newIndex]
      })
      newIndex++
    }
  }
  
  return filterMeaningfulDiffs(diff)
}

// 将词级别差异转换为HTML
export function wordDiffToHtml(diff) {
  // 过滤掉只包含空格的差异
  const filteredDiff = filterMeaningfulDiffs(diff)
  
  return filteredDiff.map(item => {
    const escapedText = escapeHtml(item.text)
    
    switch (item.type) {
      case 'added':
        return `<span class="text-green-700 bg-green-100 px-1 rounded">${escapedText}</span>`
      case 'removed':
        return `<span class="text-red-700 bg-red-100 px-1 rounded line-through">${escapedText}</span>`
      case 'unchanged':
        return escapedText
      default:
        return escapedText
    }
  }).join('')
} 