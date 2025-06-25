# 研究方法提取功能改进总结

## 改进背景

之前的研究方法段落定位策略存在精确度不够的问题：
- **原策略**：找到第一个可能的方法段落B后，直接取B段落及之后10000字符发送给Coze
- **问题**：可能错过文档中其他分散的重要研究方法段落，定位不够精确

## 改进目标

实现更智能的段落定位策略：
1. **全文扫描**：在整个文档中寻找所有可能的研究方法段落（B,E,G,K...）
2. **智能合并**：将所有相关段落统一合并后发送给Coze处理
3. **长文本处理**：如果合并后文本过长，按原来的分段方法处理

## 主要改进内容

### 1. 重新设计 `locateMethodSection` 函数

#### A. 智能评分系统
```javascript
// 为每个段落计算方法相关性得分
paragraphs.forEach((paragraph, index) => {
  let score = 0;
  
  // 标题关键词（高权重：×10）
  if (包含标题关键词) score += 匹配数量 * 10;
  
  // 内容关键词（中等权重：×2）
  score += 内容关键词数量 * 2;
  
  // 统计术语检测（加权：+5）
  if (包含统计术语) score += 5;
  
  // 段落长度调整（短段落降权：×0.5）
  if (段落长度 < 100) score *= 0.5;
});
```

#### B. 扩展关键词库
- **标题关键词**：增加了 `data analysis`、`statistical analysis`、`participants` 等
- **内容关键词**：新增了 `quantitative`、`randomized`、`factorial design`、`power analysis` 等
- **统计术语**：支持检测 `p值`、`效应量`、`软件名称（SPSS/R）`等

#### C. 智能段落选择策略
```javascript
// 筛选相关段落（阈值：标题段落或得分≥6的段落）
const relevantParagraphs = paragraphScores.filter(item => {
  const hasTitle = item.keywords.some(k => k.startsWith('[TITLE]'));
  const hasEnoughContent = item.score >= 6;
  return hasTitle || hasEnoughContent;
});

// 按得分排序，选择最相关的段落
// 如果有标题段落，优先选择标题段落及其邻近内容
// 否则选择得分最高的段落
```

### 2. 优化 `extractResearchMethod` 函数

#### A. 调整处理流程
```javascript
// 新流程：
// 1. 首先尝试智能定位所有相关段落
const methodSections = locateMethodSection(fullText);

// 2. 检查合并后的长度决定处理策略
if (methodSections.length <= MAX_CHUNK_LENGTH) {
  // 直接处理合并内容
  return await processFullText(methodSections, retries);
} else {
  // 对合并内容进行智能分段
  return await processTextInChunks(methodSections, retries);
}
```

#### B. 增强容错处理
- 智能定位失败时，根据文本总长度选择合适的备用策略
- 更详细的日志输出，便于调试和监控

### 3. 改进 `processTextInChunks` 函数

#### A. 优化分段策略
```javascript
// 保持段落完整性的分段
for (let i = 0; i < paragraphs.length; i++) {
  const nextLength = currentChunk.length + paragraph.length + 2;
  
  if (nextLength <= MAX_CHUNK_LENGTH || currentChunk === '') {
    // 可以安全加入当前段落
    currentChunk += paragraph;
  } else {
    // 保存当前块，开始新块
    chunks.push(currentChunk);
    currentChunk = paragraph;
  }
}
```

#### B. 增强结果处理
- **成功率统计**：记录每个文本块的处理成功情况
- **智能合并**：使用分隔符标识不同块的提取结果
- **长度控制**：合并结果过长时自动生成摘要
- **更详细的日志**：包含进度指示器和emoji标识

## 改进效果

### 1. 定位精确度提升
- **全文扫描**：不再局限于第一个找到的方法段落
- **智能评分**：能准确识别分散在文档各处的研究方法内容
- **多段落合并**：将相关段落统一处理，避免信息遗漏

### 2. 处理效率优化
- **智能分段**：只对真正需要的内容进行分段处理
- **长度控制**：合理的文本块大小，提高API处理成功率
- **错误处理**：更好的容错机制和重试策略

### 3. 结果质量改善
- **内容完整性**：捕获更多研究方法相关信息
- **逻辑连贯性**：按原文顺序组织提取的内容
- **可读性**：清晰的分段标识和结构化输出

## 测试验证

通过模拟测试验证了改进功能：
- ✅ 成功识别分散在不同章节的研究方法段落
- ✅ 智能评分系统准确区分相关性高低
- ✅ 合并策略能有效整合多个段落
- ✅ 长文本分段处理运行正常

## 部署状态

所有改进已应用到 `server/local-api.js` 文件中的相关函数：
- `locateMethodSection()` - 已升级为智能段落定位
- `extractResearchMethod()` - 已优化处理流程
- `processTextInChunks()` - 已改进分段策略

改进后的功能现已可用于生产环境。 