# MethodMate - 智能学术研究助手

<div align="center">

![MethodMate Logo](public/images/ai-icon.png)

**让HCI科研更简单，让实验设计更科学**

</div>

## 📖 项目简介

MethodMate 是一个专为人机交互(HCI)研究设计的智能学术助手，结合了AI技术与学术研究工作流，为研究者提供从文献推荐到研究方案生成的全链路支持。

### ✨ 核心功能

- **🤖 智能对话** - AI驱动的学术助手，提供专业的研究方法建议
- **📚 文献推荐** - 基于对话内容的智能文献推荐系统
- **📊 论文管理** - 完整的论文缓存、搜索和管理功能
- **📝 方案生成** - 自动化的定量研究方案设计
- **📄 PDF导出** - 专业格式的研究文档输出

## 🚀 快速开始

### 环境要求
- Node.js >= 16.0.0
- MySQL >= 8.0.0
- npm >= 8.0.0

### 安装步骤

1. **克隆项目**
```bash
git clone <repository-url>
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

### 环境变量配置

在 `server/.env` 文件中配置：

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

## 🛠️ 技术栈

### 前端
- Vue 3 + Vue Router 4 + Pinia
- TailwindCSS
- Vite
- html2pdf.js

### 后端
- Node.js + Express
- MySQL
- Coze API
- Semantic Scholar API
- JWT

## 📄 许可证

本项目采用 MIT License 开源协议。

---

<div align="center">

**让HCI科研更简单，让实验设计更科学** 🚀

*MethodMate - 您的智能研究助手*

</div>