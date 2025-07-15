# OpenAlex API 迁移说明

## 📋 概述

本次迁移将语义推荐服务（`/api/semantic-recommend`）从使用 Semantic Scholar API 改为使用 OpenAlex API，并添加了设计、计算机科学、人机交互领域的智能过滤功能。

## 🎯 迁移目标

1. **替换API服务**: 将 Semantic Scholar API 替换为 OpenAlex API
2. **领域过滤**: 限制搜索结果在设计、计算机科学、人机交互三个目标领域
3. **保持兼容性**: 确保现有功能正常工作，前端无需修改
4. **提升质量**: 利用 OpenAlex 更广泛的数据覆盖和更好的元数据

## 🔄 主要变更

### 1. API配置更新
```javascript
// 新增 OpenAlex API 配置
const OPENALEX_API_BASE = 'https://api.openalex.org';

// 定义目标领域
const TARGET_DOMAINS = {
  COMPUTER_SCIENCE: {
    topics: ['computer science', 'artificial intelligence', 'machine learning', 'software engineering', 'data science'],
    keywords: ['computer science', 'AI', 'machine learning', 'software', 'algorithm', 'programming']
  },
  DESIGN: {
    topics: ['design', 'user experience', 'graphic design', 'industrial design', 'design thinking'],
    keywords: ['design', 'UX', 'UI', 'visual design', 'product design', 'design methodology']
  },
  HCI: {
    topics: ['human-computer interaction', 'user interface', 'usability', 'interaction design'],
    keywords: ['HCI', 'human-computer interaction', 'user interface', 'usability', 'interaction design', 'user experience']
  }
};
```

### 2. 核心函数实现

#### `buildDomainFilter(enableDomainFilter)`
- **功能**: 构建OpenAlex API的领域过滤条件
- **输入**: 是否启用领域过滤（布尔值）
- **输出**: 过滤条件字符串
- **示例**: `topics.display_name.search:"computer science"|topics.display_name.search:"design"`

#### `buildOpenAlexSearchUrl(searchQuery, limit, filterVenues, enableDomainFilter)`
- **功能**: 构建完整的OpenAlex API查询URL
- **参数**:
  - `searchQuery`: 搜索关键词
  - `limit`: 结果数量限制
  - `filterVenues`: 是否过滤顶级期刊/会议
  - `enableDomainFilter`: 是否启用领域过滤
- **特性**:
  - 自动添加质量过滤（排除撤回论文、非正文内容）
  - 支持领域过滤
  - 选择必要字段以优化性能

#### `reconstructAbstract(abstractInvertedIndex)`
- **功能**: 从OpenAlex的倒排索引格式重建摘要文本
- **输入**: OpenAlex的abstract_inverted_index对象
- **输出**: 重建的摘要文本字符串

#### `transformOpenAlexWork(openAlexWork, index)`
- **功能**: 将OpenAlex响应格式转换为项目标准格式
- **特性**:
  - 计算基于位置的相关性分数
  - 提取和格式化作者信息
  - 判断是否为顶级期刊/会议
  - 保持向后兼容性

#### `searchOpenAlexPapers(searchQuery, limit, filterVenues, enableDomainFilter)`
- **功能**: 调用OpenAlex API进行搜索的主函数
- **返回**: 标准化的搜索结果对象

### 3. API端点更新

#### `/api/semantic-recommend` 更新内容
- 将原有的Semantic Scholar API调用替换为OpenAlex API调用
- 保持所有现有参数和响应格式不变
- 添加领域过滤功能（默认启用）
- 增强错误处理和日志记录

## 🎛️ 功能特性

### 1. 智能领域过滤
- **自动过滤**: 所有搜索结果自动限制在目标领域内
- **多层匹配**: 支持主题名称、关键词等多种匹配方式
- **灵活配置**: 可通过参数控制是否启用领域过滤

### 2. 高质量数据源
- **更广覆盖**: OpenAlex拥有比Semantic Scholar更大的数据覆盖
- **更好元数据**: 包含更丰富的主题标签、机构信息等
- **开放获取**: 更好的开放获取文献识别和链接

### 3. 相关性计算
- **位置权重**: 基于搜索结果位置计算相关性分数
- **分层评分**: 前10篇(0.95-0.8)，11-20篇(0.75-0.6)，依此类推
- **OpenAlex原生**: 利用OpenAlex自带的relevance_score

### 4. 期刊/会议过滤
- **保持原有逻辑**: 继续支持顶级期刊/会议过滤
- **增强匹配**: 更准确的期刊名称匹配算法
- **灵活控制**: 可选择是否启用期刊过滤

## 📊 数据格式对比

### Semantic Scholar → OpenAlex 字段映射

| Semantic Scholar | OpenAlex | 转换逻辑 |
|------------------|----------|----------|
| `title` | `display_name` | 直接映射 |
| `authors[].name` | `authorships[].author.display_name` | 提取显示名称 |
| `abstract` | `abstract_inverted_index` | 重建倒排索引 |
| `year` | `publication_year` | 转换为字符串 |
| `citationCount` | `cited_by_count` | 直接映射 |
| `venue` | `primary_location.source.display_name` | 提取期刊名称 |
| `url` | `id` | OpenAlex URL |
| `openAccessPdf.url` | `open_access.oa_url` | 开放获取链接 |

### 新增字段

| 字段名 | 描述 | 来源 |
|--------|------|------|
| `topics` | 主题标签 | OpenAlex topics |
| `openalex_id` | OpenAlex ID | OpenAlex id |
| `is_oa` | 是否开放获取 | OpenAlex open_access |
| `publication_date` | 发表日期 | OpenAlex publication_date |

## 🧪 测试验证

### 测试脚本
使用提供的 `test-openalex-migration.js` 脚本进行验证：

```bash
node test-openalex-migration.js
```

### 测试内容
1. **语义推荐API测试**: 验证API调用和响应格式
2. **直接OpenAlex API测试**: 验证外部API连接
3. **领域过滤效果测试**: 验证领域过滤的准确性

### 成功标准
- 所有API调用成功
- 返回论文数量符合预期
- 领域过滤准确率 ≥ 60%
- 响应格式与原有系统兼容

## 🔧 部署说明

### 1. 环境要求
- Node.js 16+
- 网络连接到OpenAlex API (https://api.openalex.org)

### 2. 配置变更
无需修改环境变量，OpenAlex API完全免费且无需认证。

### 3. 部署步骤
1. 更新服务器代码
2. 重启服务
3. 运行测试脚本验证
4. 监控日志确保正常运行

## 📈 性能优化

### 1. API效率
- **无认证**: OpenAlex API无需API密钥，减少认证开销
- **字段选择**: 只请求必要字段，减少传输量
- **批量处理**: 支持批量搜索和处理

### 2. 响应时间
- **更快API**: OpenAlex通常比Semantic Scholar响应更快
- **更少请求**: 一次请求获得更多信息
- **智能缓存**: 继续利用现有的本地缓存机制

### 3. 数据质量
- **更准确**: OpenAlex的主题分类更准确
- **更全面**: 包含更多非英文和全球南方的研究
- **更新及时**: 数据更新更频繁

## 🚨 注意事项

### 1. 向后兼容性
- 所有现有API接口保持不变
- 前端代码无需修改
- 数据库结构无需变更

### 2. 错误处理
- 保留原有的错误处理逻辑
- 增加OpenAlex特定的错误处理
- 失败时自动回退到本地缓存

### 3. 监控要点
- OpenAlex API可用性
- 领域过滤效果
- 响应时间变化
- 数据质量对比

## 📝 使用示例

### 基本调用
```javascript
// 前端调用保持不变
const response = await fetch('/api/semantic-recommend', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    keywords: 'user interface design',
    use_local_cache: false,
    filter_venues: true
  })
});

const data = await response.json();
// data.papers 包含按领域过滤的OpenAlex结果
```

### 响应示例
```javascript
{
  "success": true,
  "papers": [
    {
      "id": "openalex_W1234567890",
      "title": "A Study of User Interface Design Principles",
      "abstract": "This paper explores modern UI design...",
      "authors": ["Jane Doe", "John Smith"],
      "year": "2023",
      "citationCount": 45,
      "venue": "CHI Conference on Human Factors in Computing Systems",
      "isTopVenue": true,
      "relevance_score": 0.95,
      "source": "openalex",
      "topics": [
        {
          "id": "https://openalex.org/T10110",
          "display_name": "Human-Computer Interaction",
          "score": 0.9
        }
      ],
      "is_oa": true,
      "downloadUrl": "https://example.com/paper.pdf"
    }
  ],
  "cache_hits": 0,
  "external_hits": 5,
  "total_papers": 5
}
```

## 🎉 预期收益

### 1. 数据质量提升
- **覆盖范围**: 约2倍于Semantic Scholar的数据覆盖
- **领域专业性**: 更准确的HCI、设计、计算机科学文献
- **元数据丰富性**: 更详细的主题、机构、作者信息

### 2. 用户体验改进
- **更相关结果**: 智能领域过滤确保结果相关性
- **更快响应**: OpenAlex API通常更快
- **更多开放获取**: 更好的免费PDF链接

### 3. 系统稳定性
- **无依赖外部密钥**: 减少认证失败风险
- **更高可用性**: OpenAlex承诺99.9%可用性
- **更好错误处理**: 完善的降级机制

## 🔮 未来规划

### 1. 功能扩展
- 支持更多学科领域的过滤
- 增加更细粒度的主题分类
- 集成OpenAlex的作者消歧功能

### 2. 性能优化
- 实现OpenAlex结果的本地缓存
- 添加智能预加载机制
- 优化批量搜索策略

### 3. 分析增强
- 利用OpenAlex的引用网络数据
- 添加研究趋势分析
- 实现跨机构合作分析

---

*本迁移于 2024年 完成，如有问题请查看测试脚本或联系开发团队。* 