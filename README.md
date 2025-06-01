# MethodMate Frontend

一个智能学术研究助手平台，集成了Google Scholar文献搜索和Coze AI对话功能。

## 🚀 新功能：Google Scholar 插件

我们新增了一个强大的Coze插件，支持在Google Scholar上搜索学术文献并提供多种下载渠道！

### ✨ 主要功能

- 🔍 **智能文献搜索**：支持中英日韩多语言搜索
- 📚 **全文获取**：集成Sci-Hub、arXiv、PubMed等多个下载源
- 🎯 **相关性排序**：智能算法确保搜索结果的相关性
- 🔗 **一键下载**：提供多种免费和付费下载渠道
- 🤖 **Coze集成**：可作为Coze插件在聊天机器人中使用

### 📸 功能截图

```
🔍 搜索界面
┌─────────────────────────────────────────┐
│ Google Scholar 文献搜索                    │
│ ┌─────────────────────────────────────┐ │
│ │ 输入搜索关键词...                      │ │
│ └─────────────────────────────────────┘ │
│ [10篇] [中文] [搜索]                      │
└─────────────────────────────────────────┘

📄 搜索结果
┌─────────────────────────────────────────┐
│ 深度学习在自然语言处理中的应用研究        │
│ 作者：张三，李四 | 期刊：计算机科学       │
│ 年份：2023 | 引用：156次               │
│ ┌─────────────────────────────────────┐ │
│ │ 论文摘要内容...                      │ │
│ └─────────────────────────────────────┘ │
│ [查看原文] [获取全文] 相关性：95%        │
│                                       │
│ 📥 可用下载源：                        │
│ • Sci-Hub (免费)                      │
│ • arXiv (免费)                        │
│ • 期刊官网 (付费)                     │
└─────────────────────────────────────────┘
```

## 🛠️ 技术栈

- **前端**: Vue 3 + Vite + Tailwind CSS
- **后端**: Vercel Edge Functions
- **AI集成**: Coze API
- **插件系统**: OpenAPI 3.0规范

## 📦 快速开始

### 1. 环境设置

```bash
# 克隆项目
git clone <repository-url>
cd methodmate-frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 2. 设置Google Scholar插件

```bash
# 运行插件设置向导
node scripts/setup-plugin.js
```

这个脚本会：
- 询问您的Vercel域名
- 生成插件配置文件
- 创建测试脚本
- 提供详细的部署指南

### 3. 部署到Vercel

```bash
# 提交代码
git add .
git commit -m "Add Google Scholar plugin"
git push

# 在Vercel控制台导入项目
# https://vercel.com/
```

### 4. 测试插件功能

```bash
# 测试API端点
node test-plugin.js
```

### 5. 在Coze中创建插件

1. 登录 [Coze平台](https://www.coze.cn/)
2. 进入插件管理页面
3. 选择"导入"方式
4. 上传 `coze-plugins/google-scholar-plugin.yaml`
5. 修改配置中的域名为您的Vercel域名
6. 测试并发布插件

## 📖 使用指南

### 作为Web应用使用

访问 `/scholar-search` 页面直接使用搜索功能：

```javascript
// 搜索示例
{
  "query": "机器学习",
  "num_results": 10,
  "lang": "zh-CN"
}
```

### 作为Coze插件使用

在Coze Bot中添加插件后，用户可以这样交互：

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
  "query": "搜索关键词",
  "num_results": 10,
  "lang": "zh-CN"
}
```

### 下载接口

```http
POST /api/paper-download
Content-Type: application/json

{
  "paper_url": "论文URL",
  "doi": "DOI号",
  "title": "论文标题"
}
```

## 📁 项目结构

```
methodmate-frontend/
├── api/                          # Vercel Edge Functions
│   ├── scholar-search.js         # 文献搜索API
│   ├── paper-download.js         # 文献下载API
│   └── chat.js                   # 聊天API
├── src/
│   ├── components/
│   │   └── ScholarSearch.vue     # 搜索组件
│   ├── views/
│   │   └── ScholarSearchView.vue # 搜索页面
│   └── router/index.js           # 路由配置
├── coze-plugins/
│   └── google-scholar-plugin.yaml # Coze插件配置
├── scripts/
│   └── setup-plugin.js           # 插件设置脚本
├── docs/
│   └── COZE_PLUGIN_GUIDE.md      # 详细开发指南
└── README.md                     # 本文件
```

## 🌟 功能特性

### 智能搜索
- ✅ 多语言支持（中、英、日、韩）
- ✅ 结果数量自定义（5-50篇）
- ✅ 相关性智能排序
- ✅ 丰富的文献元数据

### 全文获取
- ✅ Sci-Hub镜像站点集成
- ✅ arXiv直接下载
- ✅ PubMed Central支持
- ✅ 开放获取检测
- ✅ 多源链接聚合

### 用户体验
- ✅ 响应式设计
- ✅ 实时加载状态
- ✅ 错误处理机制
- ✅ 直观的界面设计

## 🔍 示例用法

### 1. 基础搜索

```javascript
// 搜索深度学习相关论文
const searchResult = await fetch('/api/scholar-search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: '深度学习',
    num_results: 5,
    lang: 'zh-CN'
  })
});
```

### 2. 获取下载链接

```javascript
// 获取论文下载源
const downloadResult = await fetch('/api/paper-download', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    doi: '10.1234/example.2023.001',
    title: '深度学习在自然语言处理中的应用研究'
  })
});
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

## 📚 详细文档

- [完整开发指南](docs/COZE_PLUGIN_GUIDE.md)
- [API文档](#-api-接口)
- [部署教程](#-快速开始)

## 🤝 贡献指南

我们欢迎所有形式的贡献！

1. Fork 本项目
2. 创建您的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📝 待办事项

- [ ] 集成真实的Google Scholar API
- [ ] 添加引用格式生成功能
- [ ] 支持批量下载
- [ ] 添加用户收藏功能
- [ ] 优化搜索算法
- [ ] 添加更多学术数据库支持

## ⚠️ 免责声明

本项目仅供学术研究和教育目的使用。请遵守：

- 学术道德和版权法律
- 各平台的使用条款
- 优先使用开放获取资源
- 尊重知识产权

## 📄 许可证

本项目基于 MIT 许可证开源 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系我们

- 🐛 [报告问题](https://github.com/your-repo/issues)
- 💡 [功能建议](https://github.com/your-repo/issues)
- 📧 邮箱：support@example.com

---

**⭐ 如果这个项目对您有帮助，请给我们一个星标！**