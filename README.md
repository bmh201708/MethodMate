# MethodMate - HCI科研新手实验方案制定系统

MethodMate是一个专为HCI（人机交互）领域科研新手设计的智能实验方案制定系统，通过AI智能体帮助用户快速生成科学严谨的定量研究方案。

## ✨ 核心功能

- 🤖 **AI驱动的研究方案生成** - 基于Coze智能体，自动生成完整的定量实验方案
- 📚 **智能文献推荐** - 根据研究主题推荐相关学术文献，支持参考文献选择
- 💬 **对话式交互** - 自然语言对话生成研究方案，支持上下文感知
- 📋 **历史方案管理** - 保存、查看、应用历史生成的研究方案
- 🎯 **HCI领域专业** - 专门针对人机交互研究方法和实验设计优化
- 📊 **结构化输出** - 自动生成研究假设、实验设计、数据分析、结果呈现等完整内容

## 🚀 快速开始

### 本地开发

1. **克隆仓库**
```bash
git clone https://github.com/bmh201708/MethodMate.git
cd MethodMate
```

2. **安装依赖**
```bash
npm install
```

3. **配置环境变量**
```bash
# 复制环境变量模板
cp .env.example .env
# 配置Coze API密钥等必要信息
```

4. **启动开发服务器**
```bash
npm run dev
```

5. **访问应用**
- 前端应用: http://localhost:5173
- 在线演示: https://method-mate.vercel.app

### 生产部署

1. **构建项目**
```bash
npm run build
```

2. **预览构建结果**
```bash
npm run preview
```

## 🔧 技术栈

- **前端框架**: Vue 3 + Composition API
- **UI框架**: TailwindCSS
- **构建工具**: Vite
- **路由**: Vue Router 4
- **状态管理**: 响应式状态管理
- **AI集成**: Coze智能体API
- **部署**: Vercel

## 📖 使用指南

### 1. 文献推荐
- 在"相关文献"页面获取AI推荐的HCI研究方法文献
- 选择相关文献作为研究方案生成的参考
- 支持批量推荐和单篇详情查看

### 2. 研究方案生成
- 进入"定量研究方案"页面
- 方式一：点击"生成定量研究方案"按钮
- 方式二：在聊天框中描述你的研究需求
- AI将基于选择的参考文献生成完整方案

### 3. 方案内容查看
- **研究假设**: 科学的研究假设陈述
- **实验设计**: 详细的实验设计方案
- **数据分析**: 统计分析方法和工具
- **结果呈现**: 数据可视化和报告建议

### 4. 历史方案管理
- 查看所有历史生成的研究方案
- 应用历史方案为当前工作方案
- 删除不需要的方案记录
- 支持方案去重和状态管理

## 🎯 适用场景

- **HCI科研新手**: 刚入门HCI领域，需要学习实验设计方法
- **研究生课程**: 作为HCI研究方法课程的辅助工具
- **快速原型**: 需要快速构建实验方案原型
- **方法学习**: 通过AI生成的方案学习HCI研究方法

## 🔮 系统架构

```
前端 (Vue 3)
    ↓
API服务层
    ↓
Coze智能体平台
    ↓
AI模型 (研究方案生成)
```

## 🤝 贡献

欢迎为MethodMate项目贡献代码！

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 📄 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 🙏 致谢

- [Coze](https://www.coze.com/) - AI智能体平台支持
- [Vue.js](https://vuejs.org/) - 优秀的前端框架
- [TailwindCSS](https://tailwindcss.com/) - 现代化UI框架
- [Vercel](https://vercel.com/) - 可靠的部署平台
- HCI研究社区 - 提供宝贵的方法学指导

## 📞 联系方式

- GitHub: [@bmh201708](https://github.com/bmh201708)
- 项目地址: https://github.com/bmh201708/MethodMate
- 在线演示: https://method-mate.vercel.app

---

*让HCI科研更简单，让实验设计更科学* 🚀