# 📋 Google Scholar Coze 插件打包说明

## 🎯 插件概述

这是一个完整的 Google Scholar Coze 插件包，已经打包到独立文件夹中，包含所有必要的文件和配置。

**插件功能：**
- 🔍 在 Google Scholar 上搜索学术文献
- 📚 提供多种下载渠道（Sci-Hub、arXiv、PubMed等）
- 🤖 集成到 Coze 平台作为智能助手插件
- 🎨 提供现代化的 Web 界面组件

## 📁 文件结构

```
google-scholar-coze-plugin/
├── 📁 api/                        # API 端点（核心功能）
│   ├── scholar-search.js          # 文献搜索 API
│   └── paper-download.js          # 文献下载 API
├── 📁 src/                        # 前端组件
│   └── components/
│       └── ScholarSearch.vue      # Vue 搜索组件
├── 📁 coze-plugins/               # Coze 插件配置
│   └── google-scholar-plugin.yaml # 插件配置文件
├── 📁 scripts/                    # 工具脚本
│   └── setup-plugin.js           # 自动设置脚本
├── 📁 docs/                       # 文档
│   └── README.md                  # 详细使用文档
├── 📄 package.json                # 项目配置和依赖
├── 📄 vercel.json                 # Vercel 部署配置
├── 📄 INSTALLATION.md             # 详细安装指南
└── 📄 PLUGIN_SUMMARY.md           # 本说明文件
```

## 🚀 快速开始

### 1️⃣ 一键设置
```bash
cd google-scholar-coze-plugin
npm install
npm run setup
```

### 2️⃣ 部署
```bash
git init
git add .
git commit -m "Initial commit"
# 推送到 GitHub 后在 Vercel 中导入
```

### 3️⃣ 在 Coze 中使用
- 上传 `coze-plugins/google-scholar-plugin.yaml`
- 或手动配置 API 端点

## ✨ 核心特性

### 搜索功能
- **多语言支持**：中文、英文、日文、韩文
- **结果控制**：可配置返回 5-50 篇论文
- **智能排序**：按相关性自动排序
- **丰富信息**：包含作者、期刊、引用次数等

### 下载功能
- **Sci-Hub 集成**：多个镜像站点
- **arXiv 支持**：直接 PDF 下载
- **PubMed Central**：免费医学文献
- **开放获取检测**：自动识别免费资源
- **多源聚合**：一键获取所有可用下载源

### 技术特性
- **Vercel Edge Functions**：无服务器部署
- **Vue.js 组件**：现代化前端界面
- **OpenAPI 3.0**：标准 API 文档
- **自动化脚本**：一键配置部署

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

### 下载接口
```http
POST /api/paper-download
Content-Type: application/json

{
  "doi": "10.1234/example.2023.001",
  "title": "论文标题"
}
```

## 🎯 使用场景

### 1. 作为 Coze 插件
- 在聊天机器人中直接搜索文献
- 获取论文下载链接
- 提供学术研究建议

### 2. 作为 Web 应用
- 独立的文献搜索界面
- 集成到现有网站
- 研究机构内部使用

### 3. 作为 API 服务
- 为其他应用提供文献搜索功能
- 批量文献处理
- 学术数据分析

## 📊 技术栈

| 类别 | 技术 | 用途 |
|------|------|------|
| 前端 | Vue 3 | 用户界面组件 |
| 样式 | Tailwind CSS | 现代化样式 |
| 后端 | Vercel Edge Functions | API 服务 |
| 部署 | Vercel | 无服务器托管 |
| 插件 | Coze Platform | AI 助手集成 |
| 配置 | OpenAPI 3.0 | API 文档标准 |

## 🔒 安全考虑

- **无服务器架构**：提高安全性
- **CORS 支持**：跨域访问控制
- **输入验证**：防止恶意请求
- **错误处理**：优雅的错误响应

## 📈 扩展计划

### 即将支持
- [ ] 真实 Google Scholar API 集成
- [ ] 更多学术数据库支持
- [ ] 批量下载功能
- [ ] 用户收藏系统

### 长期规划
- [ ] 引用格式生成
- [ ] 文献管理功能
- [ ] 协作研究工具
- [ ] 移动端适配

## 🆘 支持与帮助

### 文档资源
- **详细文档**：`docs/README.md`
- **安装指南**：`INSTALLATION.md`
- **API 文档**：插件配置文件中

### 技术支持
- 检查 Vercel 部署日志
- 查看 Coze 插件调试信息
- 阅读错误消息和日志

### 常见问题
1. **部署失败**：检查 Node.js 版本和依赖
2. **API 无响应**：验证域名和网络连接
3. **插件无法调用**：确认 Coze 配置正确

## ⚖️ 许可和免责

- **开源许可**：MIT License
- **使用限制**：仅供学术研究和教育使用
- **版权声明**：尊重学术版权和知识产权
- **免费资源优先**：推荐使用开放获取资源

## 🎉 总结

这个插件包提供了：

✅ **完整的解决方案**：从搜索到下载的全流程
✅ **简单的部署**：一键设置和部署
✅ **灵活的使用**：支持多种集成方式
✅ **丰富的功能**：多源聚合和智能排序
✅ **现代化设计**：响应式界面和用户体验

**适合人群：**
- 学术研究人员
- 开发者和技术爱好者
- 需要文献搜索功能的机构
- Coze 平台用户

**立即开始使用，享受智能学术搜索体验！** 🚀

---

*最后更新：2025年1月* 