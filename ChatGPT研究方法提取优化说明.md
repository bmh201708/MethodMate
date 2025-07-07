# ChatGPT研究方法提取优化说明

## 功能概述

针对ChatGPT和Coze在研究方法提取中的不同特点，系统现在根据选择的AI服务采用不同的处理策略：

- **ChatGPT**：跳过智能段落定位，直接处理论文全文，利用其强大的长文本理解能力
- **Coze**：继续使用智能段落定位算法，提高处理效率和精确度

## 核心改进

### 1. AI服务类型感知

系统现在能够：
- 自动检测当前选择的AI服务类型
- 根据AI服务特点调整处理策略
- 前端和后端协同传递AI服务信息

### 2. ChatGPT全文处理策略

当使用ChatGPT时：
```javascript
// 跳过智能段落定位
if (aiService === 'chatgpt') {
  console.log('使用ChatGPT，跳过智能段落定位，直接处理全文');
  
  if (textLength <= CHATGPT_LIMIT) {
    return await processFullText(fullText, retries, aiService);
  } else {
    return await processTextInChunks(fullText, retries, aiService);
  }
}
```

**优势：**
- 充分利用ChatGPT的长文本理解能力
- 保留完整的上下文信息
- 避免关键信息在段落定位中丢失

### 3. 增强的提示优化

ChatGPT获得专门优化的提示，包括：
- 必要时引用原文内容支持提炼结果
- 保留原文专业术语
- 增强的研究方法识别能力

```javascript
const chatgptAdditionalRequirement = `
6. 必要时请引用原文内容来支持你的提炼结果
7. 对于关键的方法描述，可以适当保留原文的专业术语`;
```

### 4. Coze智能定位保持

Coze继续使用优化的智能段落定位：
- 多层次关键词评分
- 统计术语检测
- 段落长度权重调整

## 技术实现

### 后端修改

1. **extractResearchMethod函数**
   - 增加`aiService`参数
   - ChatGPT路径：直接全文处理
   - Coze路径：智能段落定位

2. **processFullText函数**
   - 根据AI服务类型调用不同API
   - ChatGPT专用提示优化

3. **API端点更新**
   - `/api/paper/get-full-content`接收`aiService`参数
   - 传递AI服务类型到核心函数

### 前端修改

所有调用研究方法提取的地方都已更新：

1. **PaperDetail.vue**
   - `fetchPaperContent`
   - `reanalyzeResearchMethod`

2. **ReferencedPapersList.vue**
   - `fetchPaperContent`
   - `retryExtractMethod`

3. **chatStore.js**
   - `toggleReference`中的论文处理

4. **ResearchPlanDetail.vue**
   - 论文内容获取流程

**获取AI服务类型：**
```javascript
const { getCurrentAIService } = await import('../services/aiServiceAdapter.js')
const currentAIService = getCurrentAIService()

// 传递给API
aiService: currentAIService === 'chatgpt' ? 'chatgpt' : 'coze'
```

## 处理流程对比

### ChatGPT流程

```
用户点击"尝试获取研究方法"
    ↓
检测AI服务类型 = ChatGPT
    ↓
跳过智能段落定位
    ↓
直接将全文发送给ChatGPT
    ↓
ChatGPT处理完整内容（包含引用要求）
    ↓
按四部分框架输出结果
```

### Coze流程

```
用户点击"尝试获取研究方法"
    ↓
检测AI服务类型 = Coze
    ↓
启用智能段落定位算法
    ↓
评分和筛选相关段落
    ↓
将相关段落发送给Coze
    ↓
Coze处理定位后的内容
    ↓
按四部分框架输出结果
```

## 性能优化

### ChatGPT处理限制

- **单次处理上限**：250,000字符（比Coze更高）
- **分段策略**：仅对超长文本进行分段
- **成本考虑**：直接全文处理，减少API调用次数

### Coze处理保持

- **智能定位**：继续使用段落相关性算法
- **处理上限**：20,000字符
- **效率优化**：只处理相关段落，节省资源

## 质量提升

### ChatGPT优势

1. **完整上下文**：获得论文的完整信息
2. **原文引用**：支持关键信息的原文引用
3. **专业术语保留**：更好地处理学术术语
4. **长文本理解**：处理复杂的论文结构

### Coze保持

1. **精确定位**：专注于方法相关内容
2. **高效处理**：快速响应和处理
3. **智能筛选**：过滤无关信息

## 使用建议

### 选择ChatGPT时机

- 论文结构复杂，方法分散在多个部分
- 需要完整的上下文理解
- 希望保留原文的专业表述
- 对处理质量要求较高

### 选择Coze时机

- 论文结构清晰，方法部分明确
- 追求快速处理
- 成本敏感的批量处理
- 标准化的方法提取需求

## 兼容性

- **向后兼容**：现有的Coze处理逻辑完全保持
- **默认行为**：未指定AI服务时默认使用Coze
- **渐进升级**：可以逐步切换到ChatGPT模式测试

## 监控和调试

系统提供详细的日志信息：

```
console.log(`使用AI服务: ${aiService}`);
console.log('使用ChatGPT，跳过智能段落定位，直接处理全文');
console.log('使用Coze，开始智能定位研究方法相关段落...');
```

便于开发者了解处理流程和调试问题。

## 总结

这次优化充分发挥了不同AI服务的优势：
- ChatGPT的长文本理解和全文处理能力
- Coze的高效段落定位和快速响应

用户可以根据具体需求和AI服务选择，获得最适合的研究方法提取体验。 