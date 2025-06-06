# Google Scholar Coze 插件

一个功能强大的 Coze 插件，支持在 Google Scholar 上搜索学术文献并提供多种下载渠道。

## ✨ 功能特性

### 🔍 智能文献搜索
- 支持中文、英文、日文、韩文搜索
- 可配置返回结果数量（5-50篇）
- 智能相关性排序
- 丰富的文献信息展示

### 📚 全文获取
- 多源下载链接聚合
- Sci-Hub镜像站点支持
- arXiv直接下载
- PubMed Central集成
- 开放获取检测

### 🎨 用户友好界面
- 现代化响应式设计
- 实时加载状态反馈
- 详细的文献信息展示

## 🚀 快速开始

### 1. 环境准备

```bash
# 安装依赖
npm install

# 运行插件设置向导
npm run setup
```

### 2. 部署到 Vercel

```bash
# 初始化 Git 仓库
git init
git add .
git commit -m "Initial commit"

# 推送到 GitHub 并在 Vercel 中导入项目
```

### 3. 在 Coze 中创建插件

1. 登录 [Coze平台](https://www.coze.cn/)
2. 进入插件管理页面
3. 选择"导入"方式
4. 上传 `coze-plugins/google-scholar-plugin.yaml`
5. 修改配置中的域名为您的 Vercel 域名

### 4. 测试插件

```bash
# 测试 API 端点
npm run test
```

## 📖 使用指南

### 作为 Web 应用使用

将前端组件集成到 Vue 应用中：

```vue
<template>
  <ScholarSearch />
</template>

<script>
import ScholarSearch from './components/ScholarSearch.vue'

export default {
  components: {
    ScholarSearch
  }
}
</script>
```

### 作为 Coze 插件使用

在 Coze Bot 中添加插件后，用户可以这样交互：

```
用户: 帮我搜索关于"深度学习"的最新论文
Bot: 我来为您搜索相关论文...
[调用插件搜索]
Bot: 找到了以下相关论文：
1. 深度学习在自然语言处理中的应用研究
   - 作者：张三，李四
   - 年份：2023年
   - 引用：156次

用户: 请获取第一篇论文的全文
Bot: 我来为您查找下载资源...
[调用下载插件]
Bot: 已找到以下下载渠道：
- Sci-Hub (免费)
- arXiv (免费)
```

## 🔧 API 接口

### 搜索接口

```http
POST /api/scholar-search
Content-Type: application/json

{
  "query": "深度学习",
  "num_results": 10,
  "lang": "zh-CN"
}
```

**响应示例：**

```json
{
  "success": true,
  "query": "深度学习",
  "results": [
    {
      "title": "深度学习在自然语言处理中的应用研究",
      "authors": ["张三", "李四", "王五"],
      "journal": "计算机科学",
      "year": "2023",
      "citations": 156,
      "summary": "本文综述了深度学习技术...",
      "pdf_url": "https://example.com/paper.pdf",
      "scholar_url": "https://scholar.google.com/...",
      "doi": "10.1234/example.2023.001",
      "relevance_score": 0.95
    }
  ],
  "total_results": 10
}
```

### 下载接口

```http
POST /api/paper-download
Content-Type: application/json

{
  "paper_url": "https://scholar.google.com/...",
  "doi": "10.1234/example.2023.001",
  "title": "论文标题"
}
```

**响应示例：**

```json
{
  "success": true,
  "title": "论文标题",
  "download_sources": [
    {
      "source": "Sci-Hub",
      "url": "https://sci-hub.se/10.1234/example.2023.001",
      "type": "pdf",
      "free": true,
      "description": "Sci-Hub免费下载"
    }
  ],
  "message": "找到可用的下载源"
}
```

## 📁 项目结构

```
google-scholar-coze-plugin/
├── api/                          # Vercel Edge Functions
│   ├── scholar-search.js         # 文献搜索API
│   └── paper-download.js         # 文献下载API
├── src/
│   └── components/
│       └── ScholarSearch.vue     # 搜索组件
├── coze-plugins/
│   └── google-scholar-plugin.yaml # Coze插件配置
├── scripts/
│   └── setup-plugin.js           # 插件设置脚本
├── docs/
│   └── README.md                 # 本文档
├── package.json                  # 项目配置
├── vercel.json                   # Vercel配置
└── test-plugin.js               # 测试脚本
```

## 🛠️ 开发指南

### 自定义搜索源

修改 `api/scholar-search.js` 添加更多搜索源：

```javascript
const additionalSources = [
  'IEEE Xplore',
  'ACM Digital Library',
  'SpringerLink'
]
```

### 增强下载功能

在 `api/paper-download.js` 中添加更多下载源：

```javascript
const institutionalRepos = [
  'MIT OpenCourseWare',
  'Stanford Digital Repository'
]
```

### 集成真实搜索API

建议集成以下服务获取真实数据：

- **SerpAPI**: Google Scholar API访问
- **ScraperAPI**: 网页抓取服务
- **Semantic Scholar API**: 免费学术搜索API

## 🧪 测试

```bash
# 运行所有测试
npm run test

# 测试搜索功能
curl -X POST http://localhost:3000/api/scholar-search \
  -H "Content-Type: application/json" \
  -d '{"query":"machine learning","num_results":5}'

# 测试下载功能
curl -X POST http://localhost:3000/api/paper-download \
  -H "Content-Type: application/json" \
  -d '{"doi":"10.1234/example.2023.001","title":"Example Paper"}'
```

## 🤖 Coze Bot 配置示例

```yaml
# Bot 提示词配置
角色设定: |
  你是一个专业的学术研究助手，能够帮助用户搜索和获取学术文献。

技能:
1. 文献搜索：根据用户的研究主题搜索相关学术论文
2. 全文获取：为用户提供论文的多种下载渠道
3. 研究建议：基于搜索结果提供研究建议

限制:
- 只处理学术相关的查询
- 尊重版权，优先推荐开放获取资源
- 不提供盗版内容的直接链接
```

## 🚨 故障排除

### 常见问题

1. **插件无法调用**
   - 检查 Vercel 部署状态
   - 确认 API 端点正确
   - 验证 CORS 设置

2. **搜索结果为空**
   - 检查搜索关键词
   - 确认语言设置
   - 查看 API 响应日志

3. **下载链接失效**
   - Sci-Hub 镜像站点可能变更
   - arXiv 链接格式检查
   - DOI 格式验证

### 调试模式

启用调试模式查看详细日志：

```javascript
// 在 API 文件中添加
console.log('Debug:', { query, results })
```

## 📝 更新日志

### v1.0.0 (2025-01-XX)

- ✅ 初始版本发布
- ✅ 支持 Google Scholar 搜索
- ✅ 多源下载链接聚合
- ✅ Coze 插件集成
- ✅ Vue.js 前端组件

## 🤝 贡献指南

1. Fork 本项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目基于 MIT 许可证开源。

## ⚠️ 免责声明

本项目仅供学术研究和教育目的使用。请遵守：

- 学术道德和版权法律
- 各平台的使用条款
- 优先使用开放获取资源
- 尊重知识产权

## 📞 联系我们

- 🐛 [报告问题](https://github.com/your-username/google-scholar-coze-plugin/issues)
- 💡 [功能建议](https://github.com/your-username/google-scholar-coze-plugin/issues)
- 📧 邮箱：support@example.com

---

**⭐ 如果这个插件对您有帮助，请给我们一个星标！** 