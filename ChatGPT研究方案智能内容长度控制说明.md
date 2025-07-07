# ChatGPT研究方案智能内容长度控制说明

## 功能概述
为ChatGPT模式的研究方案生成功能添加了智能内容长度控制机制，确保在最大消息长度限制下提供最优的参考文献内容。

## 实现逻辑

### 智能选择策略
当环境调试工具中选择ChatGPT服务时：

1. **全文优先策略**：系统首先尝试构建包含参考文献全文的消息
2. **长度检测**：检查消息总长度是否 <= 250,000字符
3. **智能降级**：如果超过限制，自动切换为只包含研究方法提炼的版本

### 具体实现细节

#### 修改文件
- `src/views/ResearchPlanDetail.vue` - `generateResearchPlan` 函数

#### 关键代码逻辑

```javascript
// ChatGPT模式下的智能内容长度控制
if (currentAIService === 'chatgpt') {
  console.log('🎯 ChatGPT模式：检查消息长度，智能选择参考文献内容')
  
  // 先尝试构建包含全文的版本
  let messageWithFullText = message;
  let fullTextContents = [];
  
  paperContents.forEach((content, index) => {
    let paperFullInfo = content.paperInfo;
    
    // 如果有全文，添加到信息中
    if (content.fullText) {
      paperFullInfo += `\n   全文内容：${content.fullText}`;
    }
    
    fullTextContents.push(paperFullInfo + "\n");
  });
  
  messageWithFullText += fullTextContents.join("");
  
  // 检查包含全文的消息长度
  if (messageWithFullText.length <= 250000) {
    console.log(`✅ 消息长度 ${messageWithFullText.length} 字符，在限制内，使用全文版本`)
    message = messageWithFullText;
  } else {
    console.log(`⚠️ 消息长度 ${messageWithFullText.length} 字符，超出限制，使用研究方法版本`)
    // 使用只包含研究方法的版本
    const methodOnlyContents = paperContents.map(content => content.paperInfo + "\n");
    message += methodOnlyContents.join("");
  }
} else {
  console.log('🔧 Coze模式：使用标准参考文献处理')
  // Coze模式：使用原有逻辑，只包含研究方法和摘要
  const standardContents = paperContents.map(content => content.paperInfo + "\n");
  message += standardContents.join("");
}
```

## 功能特点

### 1. 智能适应性
- **动态检测**：实时检测消息长度
- **自动切换**：无需用户手动选择，系统智能判断
- **最优体验**：优先提供最丰富的内容，必要时自动降级

### 2. 服务区分
- **ChatGPT模式**：启用智能长度控制，优先使用全文内容
- **Coze模式**：保持原有逻辑，专注于研究方法提炼
- **独立处理**：不同AI服务采用最适合的内容策略

### 3. 用户体验优化
- **透明处理**：通过控制台日志显示处理过程
- **无感知切换**：用户无需关心技术细节，自动获得最佳体验
- **稳定性保障**：避免因内容过长导致的API调用失败

## 内容策略对比

| 场景 | AI服务 | 消息长度 | 参考文献内容 | 说明 |
|------|--------|----------|-------------|------|
| 理想情况 | ChatGPT | ≤ 250,000字符 | 全文 + 研究方法 | 最丰富的分析依据 |
| 长度限制 | ChatGPT | > 250,000字符 | 仅研究方法 | 确保API调用成功 |
| 标准模式 | Coze | 任意长度 | 仅研究方法 | 保持原有处理逻辑 |

## 技术优势

### 1. 性能优化
- **避免截断**：防止内容被API强制截断
- **减少重试**：避免因内容过长导致的请求失败
- **智能缓存**：复用已获取的论文内容

### 2. 兼容性保障
- **向后兼容**：不影响现有Coze模式功能
- **平滑升级**：现有用户体验无变化
- **独立切换**：AI服务切换时自动适应

### 3. 扩展性设计
- **参数化配置**：长度限制可调整（当前：250,000字符）
- **策略可扩展**：可轻松添加新的内容选择策略
- **监控友好**：详细的日志记录便于问题排查

## 日志说明

### ChatGPT模式日志
```
🎯 ChatGPT模式：检查消息长度，智能选择参考文献内容
✅ 消息长度 123456 字符，在限制内，使用全文版本
```

或

```
🎯 ChatGPT模式：检查消息长度，智能选择参考文献内容
⚠️ 消息长度 267890 字符，超出限制，使用研究方法版本
```

### Coze模式日志
```
🔧 Coze模式：使用标准参考文献处理
```

## 更新时间
2024年12月

## 技术负责人
系统开发团队 