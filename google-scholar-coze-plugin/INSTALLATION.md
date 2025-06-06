# 🚀 Google Scholar Coze 插件安装指南

这是一个完整打包的 Google Scholar Coze 插件，包含所有必要的文件和配置。

## 📦 包含文件

```
google-scholar-coze-plugin/
├── api/                          # API 端点
│   ├── scholar-search.js         # 文献搜索 API
│   └── paper-download.js         # 文献下载 API
├── src/
│   └── components/
│       └── ScholarSearch.vue     # Vue 搜索组件
├── coze-plugins/
│   └── google-scholar-plugin.yaml # Coze 插件配置
├── scripts/
│   └── setup-plugin.js           # 自动设置脚本
├── docs/
│   └── README.md                 # 详细文档
├── package.json                  # 项目配置
├── vercel.json                   # Vercel 部署配置
└── INSTALLATION.md               # 本安装指南
```

## 🛠️ 安装步骤

### 第一步：环境准备

1. **确保已安装 Node.js**（版本 >= 16.0.0）
   ```bash
   node --version
   npm --version
   ```

2. **进入插件目录**
   ```bash
   cd google-scholar-coze-plugin
   ```

3. **安装依赖**
   ```bash
   npm install
   ```

### 第二步：配置插件

1. **运行自动设置脚本**
   ```bash
   npm run setup
   ```

2. **按照提示输入信息**：
   - Vercel 域名（部署后获得）
   - 插件名称（可使用默认值）
   - 插件描述（可使用默认值）

### 第三步：部署到 Vercel

1. **初始化 Git 仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **推送到 GitHub**
   ```bash
   # 创建 GitHub 仓库后
   git remote add origin https://github.com/your-username/google-scholar-plugin.git
   git branch -M main
   git push -u origin main
   ```

3. **在 Vercel 中部署**
   - 访问 [Vercel](https://vercel.com/)
   - 点击 "New Project"
   - 选择你的 GitHub 仓库
   - 点击 "Deploy"

4. **获取域名**
   - 部署完成后，Vercel 会提供一个域名
   - 类似：`your-project.vercel.app`

### 第四步：更新配置

1. **重新运行设置脚本**（使用真实域名）
   ```bash
   npm run setup
   ```

2. **输入真实的 Vercel 域名**

### 第五步：测试 API

```bash
# 测试插件功能
npm run test
```

### 第六步：在 Coze 中创建插件

1. **登录 Coze 平台**
   - 访问 [https://www.coze.cn/](https://www.coze.cn/)
   - 使用您的账号登录

2. **进入插件管理**
   - 点击左侧菜单中的"插件"
   - 点击"创建插件"

3. **导入插件配置**
   - 选择"基于已有服务创建"
   - 上传 `coze-plugins/google-scholar-plugin.yaml` 文件
   - 或者手动配置 API 端点

4. **配置插件信息**
   - 插件名称：Google Scholar 文献搜索
   - API 地址：`https://your-domain.vercel.app/api`
   - 授权方式：不需要授权

5. **添加工具**
   
   **搜索工具：**
   - 工具名称：搜索学术文献
   - 路径：`/scholar-search`
   - 方法：POST
   - 参数：
     - `query` (必填)：搜索关键词
     - `num_results` (可选)：结果数量
     - `lang` (可选)：搜索语言

   **下载工具：**
   - 工具名称：获取文献下载链接
   - 路径：`/paper-download`
   - 方法：POST
   - 参数：
     - `paper_url` (可选)：论文URL
     - `doi` (可选)：DOI号
     - `title` (可选)：论文标题

6. **测试插件**
   - 在测试页面输入测试数据
   - 验证插件功能正常

7. **发布插件**
   - 测试通过后点击"发布"
   - 插件状态变为"已发布"

### 第七步：创建 Bot 并使用插件

1. **创建新的 Bot**
   - 在 Coze 平台点击"创建 Bot"
   - 输入 Bot 名称和描述

2. **添加插件**
   - 在 Bot 配置页面点击"添加插件"
   - 选择刚才创建的 Google Scholar 插件

3. **配置提示词**
   ```
   # 角色
   你是一个专业的学术研究助手，能够帮助用户搜索和获取学术文献。

   ## 技能
   1. 文献搜索：根据用户的研究主题或关键词搜索相关学术论文
   2. 全文获取：为用户提供论文的多种下载渠道
   3. 研究建议：基于搜索结果为用户提供研究建议

   ## 限制
   - 只处理学术相关的查询
   - 尊重版权，优先推荐开放获取资源
   - 不提供盗版内容的直接链接
   ```

4. **测试 Bot**
   - 在调试窗口测试插件调用
   - 例如："帮我搜索关于深度学习的论文"

5. **发布 Bot**
   - 测试通过后发布 Bot

## ✅ 安装完成检查清单

- [ ] Node.js 环境已安装
- [ ] 依赖包已安装
- [ ] 插件配置已生成
- [ ] 代码已部署到 Vercel
- [ ] API 测试通过
- [ ] Coze 插件已创建
- [ ] 插件测试通过
- [ ] Bot 已创建并集成插件
- [ ] Bot 功能测试正常

## 🆘 常见问题

### Q: API 测试失败怎么办？
**A:** 检查以下几点：
- Vercel 部署是否成功
- 域名是否正确配置
- API 端点是否可访问

### Q: 插件在 Coze 中无法调用？
**A:** 可能的原因：
- 插件配置文件中的域名不正确
- API 端点返回格式不符合预期
- 权限配置问题

### Q: 如何更新插件？
**A:** 
1. 修改代码后重新部署到 Vercel
2. 在 Coze 中更新插件配置
3. 重新测试功能

### Q: 如何集成到现有项目？
**A:**
1. 复制 `api/` 目录到你的项目
2. 复制 `src/components/` 中的 Vue 组件
3. 配置路由和依赖

## 📞 技术支持

如果遇到问题，请：

1. 查看 `docs/README.md` 中的详细文档
2. 检查 Vercel 的部署日志
3. 查看 Coze 插件的调试信息
4. 提交 GitHub Issue（如果有仓库）

## 🎉 安装成功！

恭喜您成功安装了 Google Scholar Coze 插件！现在您可以：

- 在 Coze Bot 中搜索学术文献
- 获取多源下载链接
- 享受智能学术助手服务

**祝您使用愉快！** 🚀 