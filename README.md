# MethodMate - HCI智能研究方案制定系统

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D.svg)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.x-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC.svg)](https://tailwindcss.com/)

> 专为HCI（人机交互）领域科研新手设计的智能实验方案制定系统，通过AI智能体帮助用户快速生成科学严谨的定量研究方案，并提供完整的方案管理和PDF导出功能。

## ✨ 核心功能

### 🤖 AI驱动的研究方案生成
- **智能解析**: 基于Coze智能体，自动解析AI回复并提取结构化研究方案
- **格式识别**: 支持多种Markdown格式的研究方案自动识别
- **内容分割**: 精确分离研究假设、实验设计、数据分析、结果呈现四大模块
- **实时生成**: 对话式交互，支持上下文感知的方案生成

### 📊 结构化方案展示
- **模块化显示**: 独立展示每个研究模块的内容，避免内容重叠
- **Markdown渲染**: 完美支持加粗、斜体、列表、代码等格式
- **响应式布局**: 适配不同屏幕尺寸的设备
- **一键切换**: 支持完整方案和分模块查看

### 📄 PDF导出功能
- **中文支持**: 完美支持中文字符显示，解决乱码问题
- **格式保留**: 保持原有的Markdown格式（加粗、斜体、列表等）
- **专业排版**: 清晰的标题、分节和页面布局
- **一键下载**: 智能检测研究方案内容，自动显示下载按钮

### 📚 智能文献推荐
- **HCI专业**: 针对人机交互领域的文献推荐
- **参考整合**: 选择的文献将作为方案生成的参考依据
- **批量管理**: 支持多篇文献的选择和管理

### 🗂️ 历史方案管理
- **自动保存**: 每次生成的方案自动保存到历史记录
- **快速查看**: 浏览所有历史生成的研究方案
- **方案应用**: 一键将历史方案应用为当前工作方案
- **智能去重**: 避免重复保存相同内容的方案

### 💬 智能对话系统
- **消息截断**: 研究方案消息显示前200字符+省略号，保持界面整洁
- **内容检测**: 自动识别包含研究方案的消息内容
- **PDF提醒**: 智能提示用户下载生成的PDF文件

## 🚀 技术特性

### 前端技术栈
- **Vue 3**: 采用Composition API，提供更好的TypeScript支持
- **TailwindCSS**: 现代化CSS框架，快速构建美观界面
- **Vite**: 快速的构建工具和开发服务器
- **Vue Router 4**: 现代化的路由管理
- **html2pdf.js**: 高质量PDF生成库，支持中文

### 核心算法
- **智能解析引擎**: 使用正则表达式和位置算法精确分割研究方案内容
- **格式转换器**: Markdown到HTML的智能转换，保留所有格式
- **内容检测器**: 基于关键词密度的研究方案自动识别

## 📖 快速开始

### 环境要求
- Node.js 16.0 或更高版本
- npm 8.0 或更高版本

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
- 本地开发: http://localhost:5173
- 在线演示: https://method-mate.vercel.app

### 生产部署

```bash
# 构建项目
npm run build

# 预览构建结果
npm run preview
```

## 🎯 使用指南

### 1. 文献选择
1. 进入"相关文献"页面
2. 浏览AI推荐的HCI研究方法文献
3. 选择相关文献作为研究方案生成的参考

### 2. 生成研究方案
1. 进入"定量研究方案"页面
2. 选择生成方式：
   - **按钮生成**: 点击"生成定量研究方案"按钮
   - **对话生成**: 在聊天框中描述研究需求
3. 等待AI生成完整的研究方案

### 3. 查看方案内容
- **完整方案**: 查看包含所有模块的完整方案
- **研究假设**: 独立查看科学的研究假设陈述
- **实验设计**: 查看详细的实验设计方案
- **数据分析**: 了解统计分析方法和工具
- **结果呈现**: 获取数据可视化和报告建议

### 4. 导出PDF
1. 生成方案后，聊天框中会自动显示下载按钮
2. 点击下载按钮即可获取格式化的PDF文件
3. PDF包含完整的方案内容和专业排版

### 5. 管理历史方案
1. 点击"历史方案"查看所有保存的方案
2. 选择任意历史方案进行查看
3. 一键应用历史方案为当前工作方案

## 🎯 适用场景

- **HCI科研新手**: 学习实验设计方法和规范
- **研究生课程**: 作为HCI研究方法课程的辅助工具  
- **学术研究**: 快速构建实验方案原型
- **方法学习**: 通过AI生成的方案学习HCI研究范式

## 🔧 项目结构

```
MethodMate/
├── src/
│   ├── components/           # 组件目录
│   │   ├── ChatBox.vue      # 对话框组件（含PDF生成）
│   │   └── LoadingDots.vue  # 加载动画组件
│   ├── views/               # 页面目录
│   │   ├── Home.vue         # 首页
│   │   ├── Papers.vue       # 文献推荐页
│   │   ├── ResearchPlanDetail.vue  # 研究方案详情页
│   │   └── HistoryPlans.vue # 历史方案页
│   ├── stores/              # 状态管理
│   │   └── chatStore.js     # 聊天和方案状态
│   ├── router/              # 路由配置
│   └── assets/              # 静态资源
├── public/                  # 公共文件
├── server/                  # 后端API
└── package.json            # 项目配置
```

## 🔮 系统架构

```
前端界面 (Vue 3 + TailwindCSS)
        ↓
状态管理 (Reactive Store)
        ↓
API服务层 (RESTful API)
        ↓
Coze智能体平台
        ↓
AI模型 (GPT-based)
```

## 🔄 版本更新

### v2.0.0 (最新版本)
- ✅ 新增PDF导出功能，支持中文和Markdown格式
- ✅ 重构内容解析引擎，解决内容重叠问题
- ✅ 优化用户界面，增加消息截断和智能提示
- ✅ 完善历史方案管理功能

### v1.0.0
- ✅ 基础的AI对话和方案生成功能
- ✅ 文献推荐和选择功能
- ✅ 基本的历史记录功能

## 🤝 贡献指南

我们欢迎各种形式的贡献！

### 贡献方式
1. **Bug报告**: 在Issues中报告遇到的问题
2. **功能建议**: 提出新功能的想法和建议
3. **代码贡献**: 提交Pull Request改进代码
4. **文档改进**: 完善项目文档和使用指南

### 开发流程
1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 📄 许可证

本项目采用 [MIT License](https://github.com/bmh201708/MethodMate/blob/main/LICENSE) 开源协议。

## 🙏 致谢

- **[Coze](https://www.coze.com/)** - 提供强大的AI智能体平台支持
- **[Vue.js](https://vuejs.org/)** - 优秀的渐进式前端框架
- **[TailwindCSS](https://tailwindcss.com/)** - 现代化的CSS工具类框架
- **[html2pdf.js](https://github.com/eKoopmans/html2pdf.js)** - 高质量的PDF生成库
- **[Vercel](https://vercel.com/)** - 可靠的云部署平台
- **HCI研究社区** - 提供宝贵的方法学指导和反馈

## 📞 联系方式

- **GitHub**: [@bmh201708](https://github.com/bmh201708)
- **项目地址**: [https://github.com/bmh201708/MethodMate](https://github.com/bmh201708/MethodMate)
- **在线演示**: [https://method-mate.vercel.app](https://method-mate.vercel.app)
- **问题反馈**: [Issues](https://github.com/bmh201708/MethodMate/issues)

## 📊 项目统计

![GitHub stars](https://img.shields.io/github/stars/bmh201708/MethodMate)
![GitHub forks](https://img.shields.io/github/forks/bmh201708/MethodMate)
![GitHub issues](https://img.shields.io/github/issues/bmh201708/MethodMate)
![GitHub license](https://img.shields.io/github/license/bmh201708/MethodMate)

---

<div align="center">

**让HCI科研更简单，让实验设计更科学** 🚀

*MethodMate - 您的智能研究助手*

</div>