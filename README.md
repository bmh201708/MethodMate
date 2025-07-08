# MethodMate - 智能学术研究助手

<div align="center">

![MethodMate Logo](public/images/ai-icon.png)

**让HCI科研更简单，让实验设计更科学**

[![GitHub stars](https://img.shields.io/github/stars/bmh201708/MethodMate.svg?style=social&label=Star)](https://github.com/bmh201708/MethodMate)
[![GitHub forks](https://img.shields.io/github/forks/bmh201708/MethodMate.svg?style=social&label=Fork)](https://github.com/bmh201708/MethodMate)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/bmh201708/MethodMate/blob/main/LICENSE)

[在线演示](https://method-mate.vercel.app) | [快速开始](#-快速开始) | [功能特性](#-功能特性)

</div>

## 📖 项目简介

MethodMate是一个专为人机交互(HCI)研究设计的智能学术助手，结合了AI技术与学术研究工作流，为研究者提供从文献推荐到研究方案生成的全链路支持。

### 🎯 核心价值

- **🤖 智能推荐** - AI驱动的学术文献推荐系统，精准匹配研究需求
- **📝 方案生成** - 自动化的定量研究方案设计，规范化输出
- **📚 论文管理** - 完整的论文缓存、管理和智能搜索系统
- **🗂️ 历史管理** - 完整的研究方案版本控制和比较功能
- **📄 PDF导出** - 专业格式的研究文档输出，支持中文

## ✨ 功能特性

### 🤖 AI智能对话
基于Coze API的智能学术助手，提供专业的HCI研究方法和实验设计建议。

### 📚 智能文献推荐
- 语义搜索，基于对话内容推荐相关文献
- 支持顶级期刊会议过滤
- Google Scholar集成，直接搜索学术文献
- 本地缓存优先，毫秒级响应速度

### 📊 论文管理系统
- **论文缓存浏览器** - 专门的论文管理界面
- **智能搜索** - 全文检索支持（标题、摘要、关键词）
- **手动添加论文** - 管理员可手动添加论文到数据库
- **删除管理** - 认证用户可删除论文

### 🔬 研究方案生成
- AI驱动的定量研究方案设计
- 模块化展示（研究假设、实验设计、数据分析、结果呈现）
- 基于选择文献的针对性方案
- 符合学术标准的方案结构

### 🔐 用户认证系统
- 用户注册/登录，JWT Token认证
- 权限管理，数据安全隔离
- 个人资料管理

### 🌐 环境切换系统
- 智能环境检测，自动识别本地/云服务器环境
- 一键切换后端环境
- 配置持久化

## 🛠️ 技术栈

### 前端
- **Vue 3** + **Vue Router 4** + **Pinia**
- **TailwindCSS** - 原子化CSS框架
- **Vite** - 极速前端构建工具
- **html2pdf.js** - PDF生成

### 后端
- **Node.js + Express** - 后端服务
- **MySQL** - 关系型数据库
- **Coze API** - AI智能体平台
- **Semantic Scholar API** - 学术文献数据源
- **JWT** - 用户认证

## 🚀 快速开始

### 在线使用

访问在线演示：**[https://method-mate.vercel.app](https://method-mate.vercel.app)**

### 本地部署

#### 环境要求
- Node.js >= 16.0.0
- MySQL >= 8.0.0
- npm >= 8.0.0

#### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/bmh201708/MethodMate.git
cd MethodMate
```

2. **安装依赖**
```bash
# 安装前端依赖
npm install

# 安装后端依赖
cd server
npm install
cd ..
```

3. **数据库配置**
```bash
# 创建MySQL数据库
mysql -u root -p
CREATE DATABASE methodmate CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
exit
```

4. **环境配置**
```bash
# 在server目录创建.env文件
cd server
cp .env.example .env
# 编辑.env文件，配置API密钥和数据库连接
```

5. **启动应用**
```bash
# 同时启动前后端（推荐）
npm run dev:all

# 或分别启动
# 终端1 - 启动后端
cd server && npm start
# 终端2 - 启动前端
npm run dev:local
```

6. **访问应用**
- 前端应用: http://localhost:3000
- 后端API: http://localhost:3002
- 论文管理: http://localhost:3000/papers

### 环境变量配置

在`server/.env`文件中配置：

```env
# Coze AI API配置
COZE_API_KEY=your_coze_api_key
COZE_BOT_ID=your_bot_id
COZE_USER_ID=your_user_id

# 数据库配置
DB_HOST=localhost
DB_PORT=3306
DB_NAME=methodmate
DB_USER=your_db_username
DB_PASSWORD=your_db_password

# JWT认证配置
JWT_SECRET=your_jwt_secret_key

# 可选API配置
CORE_API_KEY=your_core_api_key
SEMANTIC_API_KEY=your_semantic_scholar_api_key
```

## 📁 项目结构

```
MethodMate/
├── src/                    # Vue.js前端源码
│   ├── components/         # 组件库
│   ├── views/             # 页面组件
│   ├── services/          # API服务
│   ├── stores/            # 状态管理
│   └── router/            # 路由配置
├── server/                # Node.js后端
│   ├── local-api.js       # 主API服务器
│   ├── database.js        # 数据库连接
│   ├── routes/            # API路由
│   └── middleware/        # 中间件
├── public/                # 静态资源
└── package.json           # 依赖配置
```

## 📖 使用指南

### 1. 智能对话
在首页与AI助手对话，描述研究需求和实验设计问题。

### 2. 文献搜索与管理
- 基于对话内容自动推荐相关文献
- 在"文献搜索"页面主动搜索特定文献
- 访问 `/papers` 管理论文缓存

### 3. 研究方案生成
选择相关文献后，点击"生成定量研究方案"按钮，AI将生成完整的研究方案。

### 4. 方案管理
- 查看和编辑完整研究方案
- 导出PDF格式文档
- 管理历史方案版本

## 🤝 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 [MIT License](https://github.com/bmh201708/MethodMate/blob/main/LICENSE) 开源协议。

## 📞 联系方式

- **GitHub**: [@bmh201708](https://github.com/bmh201708)
- **项目地址**: [https://github.com/bmh201708/MethodMate](https://github.com/bmh201708/MethodMate)
- **在线演示**: [https://method-mate.vercel.app](https://method-mate.vercel.app)
- **问题反馈**: [GitHub Issues](https://github.com/bmh201708/MethodMate/issues)

---

<div align="center">

**让HCI科研更简单，让实验设计更科学** 🚀

*MethodMate - 您的智能研究助手*

[⭐ 给项目点个星](https://github.com/bmh201708/MethodMate) | [🍴 Fork项目](https://github.com/bmh201708/MethodMate/fork) | [📝 报告问题](https://github.com/bmh201708/MethodMate/issues)

</div>