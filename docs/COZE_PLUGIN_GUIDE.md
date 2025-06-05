# Coze Google Scholar 插件开发指南

## 概述

这是一个功能强大的Coze插件，支持在Google Scholar上搜索学术文献，并提供多种下载渠道。插件包含两个主要功能：

1. **文献搜索**：在Google Scholar上搜索学术论文
2. **全文下载**：提供多种下载源包括Sci-Hub、arXiv、PubMed等

## 功能特性

### 🔍 智能搜索
- 支持中文、英文、日文、韩文搜索
- 可配置返回结果数量（5-50篇）
- 智能相关性排序
- 丰富的文献信息展示

### 📚 全文获取
- 多源下载链接聚合
- 免费开放获取检测
- Sci-Hub镜像站点支持
- arXiv直接下载
- PubMed Central集成

### 🎨 用户友好界面
- 现代化响应式设计
- 实时加载状态反馈
- 详细的文献信息展示
- 一键复制引用信息

## 项目结构

```
├── api/
│   ├── scholar-search.js       # 文献搜索API
│   ├── paper-download.js       # 文献下载API
│   └── chat.js                 # 现有聊天API
├── src/
│   ├── components/
│   │   └── ScholarSearch.vue   # 搜索组件
│   ├── views/
│   │   └── ScholarSearchView.vue # 搜索页面
│   └── router/index.js         # 路由配置
├── coze-plugins/
│   └── google-scholar-plugin.yaml # Coze插件配置
└── docs/
    └── COZE_PLUGIN_GUIDE.md    # 本文档
```

## 快速开始

### 1. 环境准备

确保你已经安装了以下依赖：

```bash
npm install
```

### 2. 部署到Vercel

1. 将代码推送到GitHub仓库
2. 在Vercel中导入项目
3. 配置环境变量（如果需要）
4. 部署完成后获取域名

### 3. 在Coze中创建插件

#### 方法一：使用YAML配置文件

1. 登录Coze平台：https://www.coze.cn/
2. 进入插件管理页面
3. 点击"创建插件"
4. 选择"导入"方式
5. 上传 `coze-plugins/google-scholar-plugin.yaml` 文件
6. 修改配置中的域名为你的Vercel域名
7. 测试并发布插件

#### 方法二：手动配置

1. **基本信息配置**
   ```
   插件名称: Google Scholar 文献搜索
   插件描述: 在Google Scholar上搜索学术文献，支持下载和阅读全文
   插件URL: https://your-domain.vercel.app/api
   授权方式: 不需要授权
   ```

2. **添加搜索工具**
   ```
   工具名称: 搜索学术文献
   工具路径: /scholar-search
   请求方法: POST
   ```

   输入参数：
   - `query` (string, 必填): 搜索关键词
   - `num_results` (integer, 可选): 返回结果数量，默认10
   - `lang` (string, 可选): 搜索语言，默认zh-CN

3. **添加下载工具**
   ```
   工具名称: 获取文献下载链接
   工具路径: /paper-download
   请求方法: POST
   ```

   输入参数：
   - `paper_url` (string, 可选): 论文URL
   - `doi` (string, 可选): DOI号
   - `title` (string, 可选): 论文标题

### 4. 测试插件

在Coze平台的插件测试页面中：

1. **测试搜索功能**
   ```json
   {
     "query": "深度学习",
     "num_results": 5,
     "lang": "zh-CN"
   }
   ```

2. **测试下载功能**
   ```json
   {
     "doi": "10.1234/example.2023.001",
     "title": "深度学习在自然语言处理中的应用研究"
   }
   ```

## API 接口文档

### 搜索接口

**POST** `/api/scholar-search`

请求体：
```json
{
  "query": "机器学习",
  "num_results": 10,
  "lang": "zh-CN"
}
```

响应：
```json
{
  "success": true,
  "query": "机器学习",
  "results": [
    {
      "title": "论文标题",
      "authors": ["作者1", "作者2"],
      "journal": "期刊名称",
      "year": "2023",
      "citations": 156,
      "summary": "论文摘要...",
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

**POST** `/api/paper-download`

请求体：
```json
{
  "paper_url": "https://scholar.google.com/...",
  "doi": "10.1234/example.2023.001",
  "title": "论文标题"
}
```

响应：
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

## 在Bot中使用插件

### 1. 创建Academic Research Bot

```
角色设定:
你是一个专业的学术研究助手，能够帮助用户搜索和获取学术文献。

技能:
1. 文献搜索：根据用户的研究主题或关键词搜索相关学术论文
2. 全文获取：为用户提供论文的多种下载渠道
3. 研究建议：基于搜索结果为用户提供研究建议

限制:
- 只处理学术相关的查询
- 尊重版权，优先推荐开放获取资源
- 不提供盗版内容的直接链接
```

### 2. 添加插件到Bot

在Bot配置页面：
1. 点击"添加插件"
2. 选择"Google Scholar 文献搜索"插件
3. 配置插件的调用方式

### 3. 示例对话

**用户**: 帮我搜索关于"自然语言处理"的最新研究论文

**Bot**: 我来为您搜索关于"自然语言处理"的最新研究论文。

*[调用搜索插件]*

根据搜索结果，我为您找到了以下相关论文：

1. **深度学习在自然语言处理中的应用研究**
   - 作者：张三, 李四, 王五
   - 期刊：计算机科学
   - 年份：2023
   - 引用：156次
   - 摘要：本文综述了深度学习技术在自然语言处理领域的最新进展...

**用户**: 请帮我获取第一篇论文的全文

**Bot**: 我来为您查找这篇论文的下载资源。

*[调用下载插件]*

已为您找到以下下载渠道：
- Sci-Hub (免费)
- arXiv (免费)
- 期刊官网 (可能需要订阅)

## 高级配置

### 1. 自定义搜索源

如果需要添加更多搜索源，可以修改 `api/scholar-search.js`：

```javascript
// 添加更多学术数据库
const additionalSources = [
  'IEEE Xplore',
  'ACM Digital Library',
  'SpringerLink',
  'ScienceDirect'
]
```

### 2. 增强下载功能

在 `api/paper-download.js` 中添加更多下载源：

```javascript
// 添加机构仓库
const institutionalRepos = [
  'MIT OpenCourseWare',
  'Stanford Digital Repository',
  'Harvard DASH'
]
```

### 3. 集成真实搜索API

为了获得真实的Google Scholar数据，建议集成以下服务：

1. **SerpAPI**: 提供Google Scholar API访问
2. **ScraperAPI**: 网页抓取服务
3. **Semantic Scholar API**: 免费的学术搜索API

示例配置：
```javascript
// 在环境变量中配置
const SERPAPI_KEY = process.env.SERPAPI_KEY
const SEMANTIC_SCHOLAR_API = 'https://api.semanticscholar.org/graph/v1'
```

## 故障排除

### 常见问题

1. **插件无法调用**
   - 检查Vercel部署状态
   - 确认API端点正确
   - 验证CORS设置

2. **搜索结果为空**
   - 检查搜索关键词
   - 确认语言设置
   - 查看API响应日志

3. **下载链接失效**
   - Sci-Hub镜像站点可能变更
   - arXiv链接格式检查
   - DOI格式验证

### 调试模式

启用调试模式查看详细日志：

```javascript
// 在API文件中添加
console.log('Debug:', { query, results })
```

## 部署清单

- [ ] 代码推送到GitHub
- [ ] Vercel部署成功
- [ ] API端点测试通过
- [ ] Coze插件创建完成
- [ ] 插件测试通过
- [ ] Bot集成测试
- [ ] 用户文档完善

## 贡献指南

欢迎提交问题和改进建议！

1. Fork 本项目
2. 创建功能分支
3. 提交代码
4. 创建Pull Request

## 许可证

本项目基于MIT许可证开源。

## 联系我们

如有问题，请通过以下方式联系：

- GitHub Issues
- 邮箱：support@example.com

---

**注意事项**:
- 请遵守学术道德和版权法律
- 优先使用开放获取资源
- 尊重各平台的使用条款 