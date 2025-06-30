# MethodMate - 智能学术研究助手

<div align="center">

![MethodMate Logo](public/images/ai-icon.png)

**让HCI科研更简单，让实验设计更科学**

[![GitHub stars](https://img.shields.io/github/stars/bmh201708/MethodMate.svg?style=social&label=Star)](https://github.com/bmh201708/MethodMate)
[![GitHub forks](https://img.shields.io/github/forks/bmh201708/MethodMate.svg?style=social&label=Fork)](https://github.com/bmh201708/MethodMate)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/bmh201708/MethodMate/blob/main/LICENSE)

[在线演示](https://method-mate.vercel.app) | [功能特性](#-功能特性) | [快速开始](#-快速开始) | [本地开发](#-本地开发)

</div>

## 📖 项目简介

MethodMate是一个专为人机交互(HCI)研究设计的智能学术助手，结合了AI技术与学术研究工作流，为研究者提供从文献推荐到研究方案生成的全链路支持。通过集成先进的AI技术、完善的论文管理系统和智能搜索引擎，MethodMate为研究者打造了一个高效、智能的研究工具平台。

### 📊 项目规模

- **项目版本**: v2.0.0
- **总代码行数**: ~15,865 行
  - 前端代码 (Vue.js): 7,881 行
  - 后端代码 (Node.js): 10,051 行  
  - 样式文件 (CSS): 1,908 行
  - 测试页面 (HTML): 5,876 行
- **项目类型**: 全栈Web应用
- **技术架构**: 前后端分离 + MySQL数据库
- **部署环境**: 云服务器 + Vercel

### 🎯 核心价值

- **🤖 智能推荐** - AI驱动的学术文献推荐系统，精准匹配研究需求
- **📝 方案生成** - 自动化的定量研究方案设计，规范化输出
- **📚 论文管理** - 完整的论文缓存、管理和智能搜索系统
- **🗂️ 历史管理** - 完整的研究方案版本控制和比较功能
- **📄 PDF导出** - 专业格式的研究文档输出，支持中文
- **🔧 本地开发** - 完整的前后端开发环境，支持自定义扩展
- **💾 数据持久化** - 完整的用户系统和数据管理功能

## ✨ 功能特性

### 🤖 AI智能对话
- **实时对话** - 基于Coze API的智能学术助手
- **上下文理解** - 记忆对话历史，提供连贯的建议
- **专业回答** - 专注于HCI研究方法和实验设计
- **对话历史** - 完整的对话记录和会话管理

### 📚 智能文献推荐
- **语义搜索** - 基于对话内容的文献智能推荐
- **多维筛选** - 支持顶级期刊会议过滤
- **批量管理** - 文献收藏、引用和导出功能
- **Google Scholar集成** - 直接搜索和获取学术文献
- **本地缓存优先** - 智能缓存系统，毫秒级响应速度

### 🗄️ 论文缓存管理系统
- **📊 论文缓存浏览器** - 专门的论文管理界面 (`/papers`)
  - 表格化显示所有缓存论文
  - 支持按标题、作者、年份、引用数排序
  - 实时统计信息（总论文数、顶会顶刊数量）
  - 高级过滤功能（来源筛选、期刊级别过滤）
  
- **➕ 手动添加论文** - 管理员可手动添加论文到数据库
  - 完整的论文信息表单（标题、作者、期刊、DOI、摘要等）
  - 自动质量评分和重复检测
  - 支持顶级期刊/会议标记
  - 研究方法和贡献类型分类
  
- **🗑️ 论文删除管理** - 认证用户可删除论文
  - JWT token身份验证
  - 确认对话框防止误操作
  - 实时更新列表和统计信息
  - 完整的操作日志记录

- **🔍 智能搜索系统**
  - 全文检索支持（标题、摘要、关键词）
  - 语义相似性搜索
  - 本地缓存优先策略
  - 多维度排序和过滤

### 🔬 研究方案生成
- **自动生成** - AI驱动的定量研究方案设计
- **模块化展示** - 分别展示研究假设、实验设计、数据分析、结果呈现
- **参考整合** - 基于选择的文献生成针对性方案
- **格式规范** - 符合学术标准的方案结构
- **方案关联** - 研究方案与参考文献的完整关联管理

### 📄 专业文档导出
- **PDF生成** - 高质量的研究方案PDF导出
- **中文支持** - 完美支持中文字符和格式
- **Markdown渲染** - 保留格式的文档转换
- **一键下载** - 智能检测并提供下载按钮

### 🗂️ 历史方案管理
- **自动保存** - 每次生成的方案自动归档
- **版本对比** - 查看不同版本的研究方案
- **一键应用** - 历史方案快速应用为当前方案
- **智能去重** - 避免重复保存相同内容
- **状态管理** - 草稿、活跃、完成、归档等状态管理

### 🔐 用户认证系统
- **用户注册/登录** - 完整的用户认证系统
- **JWT Token认证** - 安全的身份验证机制
- **权限管理** - 不同操作需要相应权限
- **个人资料管理** - 用户信息和偏好设置
- **数据隔离** - 用户间数据安全隔离

### 🌐 环境切换系统
- **智能环境检测** - 自动识别本地/云服务器环境
- **一键切换** - 支持界面快速切换后端环境
- **配置持久化** - 环境偏好自动保存
- **调试工具** - 内置环境调试和API测试工具

## 🛠️ 技术栈

### 前端技术
- **Vue 3** - 渐进式JavaScript框架，采用Composition API
- **Vue Router 4** - 现代化单页应用路由
- **Pinia** - Vue 3状态管理解决方案
- **TailwindCSS** - 原子化CSS框架，快速UI构建
- **Vite** - 极速的前端构建工具
- **html2pdf.js** - 客户端PDF生成库
- **marked** - Markdown解析器，支持KaTeX数学公式

### 后端技术
- **Node.js + Express** - 高性能JavaScript后端服务
- **MySQL** - 关系型数据库，使用连接池优化
- **Coze API** - AI智能体平台集成
- **Semantic Scholar API** - 学术文献数据源
- **CORE API** - 开放获取文献平台
- **JWT** - JSON Web Token用户认证
- **bcrypt** - 密码加密存储

### 数据库设计
- **users** - 用户基本信息和认证
- **conversations** - 会话记录和标题
- **messages** - 对话消息内容
- **reference_papers** - 引用文献管理
- **research_plans** - 研究方案存储
- **plan_references** - 方案与文献关联
- **paper_cache** - 论文缓存和全文存储

### 开发工具与部署
- **Git** - 版本控制系统
- **npm** - 包管理器
- **ESLint** - 代码质量检查
- **PostCSS** - CSS后处理器
- **Vercel** - 前端云部署平台
- **云服务器** - 后端API服务部署

## 🚀 快速开始

### 环境要求

- **Node.js** >= 16.0.0
- **npm** >= 8.0.0
- **MySQL** >= 8.0.0
- **Git** >= 2.0.0

### 在线使用

访问在线演示：**[https://method-mate.vercel.app](https://method-mate.vercel.app)**

**主要功能页面：**
- **智能对话**: `/` - AI学术助手
- **文献搜索**: `/scholar-search` - 学术文献搜索
- **引用管理**: `/references` - 文献引用管理
- **研究方案**: `/research-plan/:id` - 研究方案详情
- **历史方案**: `/history-plans` - 历史方案管理
- **论文管理**: `/papers` - 论文缓存浏览器
- **用户登录**: `/login` - 用户认证

### 本地部署

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
# 编辑.env文件，配置必要的API密钥和数据库连接
```

5. **启动应用**

**方式一：同时启动前后端（推荐）**
```bash
npm run dev:all
```

**方式二：分别启动**
```bash
# 终端1 - 启动后端服务
cd server
npm start

# 终端2 - 启动前端（使用本地后端）
npm run dev:local
```

6. **访问应用**
- **前端应用**: http://localhost:3000 (Vue.js开发服务器)
- **后端API**: http://localhost:3002 (Express API服务器)
- **论文管理**: http://localhost:3000/papers (论文缓存浏览器)
- **API测试页面**: http://localhost:3000/test-local-api.html

## 💻 本地开发

### 开发环境配置

项目支持灵活的开发环境配置，可以根据需要切换本地/远程后端：

#### 环境变量配置

```bash
# 使用本地后端（开发调试）
npm run dev:local

# 使用远程后端（生产环境）
npm run dev:remote
# 或者
npm run dev
```

#### 可用的NPM脚本

```json
{
  "dev": "vite",                    // 使用远程后端启动前端
  "dev:local": "cross-env USE_REMOTE_BACKEND=false vite",  // 使用本地后端
  "dev:remote": "vite",             // 明确使用远程后端
  "dev:all": "concurrently \"cd server && npm start\" \"npm run dev:local\"",  // 同时启动前后端
  "build": "vite build",            // 构建生产版本
  "preview": "vite preview"         // 预览构建结果
}
```

### 环境切换系统

项目支持多种环境切换方式：

1. **界面切换** - 使用调试工具（🔧按钮）或导航栏环境指示器
2. **URL参数** - `?env=remote` 或 `?env=local` 直接切换
3. **localStorage** - `localStorage.setItem('methodmate_environment', 'remote')`
4. **环境变量** - `USE_REMOTE_BACKEND=true`

**环境优先级**：URL参数 > localStorage > 环境变量 > 默认值

### 开发服务端口

| 服务 | 端口 | 说明 |
|------|------|------|
| 前端开发服务器 | 3000 | Vue.js应用和开发工具 |
| 本地API服务器 | 3002 | Express服务器和API接口 |
| 云服务器API | 3004 | 生产环境API服务 |

### 代理配置

前端开发服务器配置了智能代理，自动根据环境变量转发API请求：

```javascript
// vite.config.js
proxy: {
  '/api': {
    target: process.env.USE_REMOTE_BACKEND === 'false' 
      ? 'http://localhost:3002'     // 本地后端
      : 'http://1.13.253.97:3004',  // 云服务器后端
    changeOrigin: true,
    secure: false
  }
}
```

## 📁 项目结构

```
MethodMate/ (~15,865 行代码)
├── 📁 前端源码 (7,881 行)
│   ├── public/                    # 静态资源目录
│   │   ├── images/               # 图片资源 (AI图标、操作系统图标等)
│   │   ├── paper-cache-browser.html # 论文缓存浏览器页面
│   │   ├── debug-conversation.html # 对话调试页面
│   │   ├── test-api.html         # API接口测试
│   │   ├── test-conversation.html # 对话功能测试
│   │   ├── test-core-api.html    # CORE API测试
│   │   ├── test-latex-render.html # LaTeX渲染测试
│   │   ├── test-local-search.html # 本地搜索测试
│   │   └── test-recommendations.html # 推荐功能测试
│   ├── src/                      # Vue.js前端源码
│   │   ├── components/          # Vue组件库
│   │   │   ├── ChatBox.vue     # 智能对话组件
│   │   │   ├── ConversationGuide.vue # 对话引导组件
│   │   │   ├── EnvironmentDebugTool.vue # 环境调试工具
│   │   │   ├── EnvironmentSwitcher.vue # 环境切换器
│   │   │   ├── LoadingDots.vue # 加载动画组件
│   │   │   ├── NavigationBar.vue # 顶部导航栏
│   │   │   ├── PromptOptimizeDialog.vue # 提示优化对话框
│   │   │   ├── ReferencedPapersList.vue # 引用文献列表
│   │   │   ├── ScholarSearch.vue # 学术搜索组件
│   │   │   └── TypewriterText.vue # 打字机效果组件
│   │   ├── views/              # 页面组件
│   │   │   ├── HomeView.vue    # 首页 (智能对话)
│   │   │   ├── LoginView.vue   # 用户登录页面
│   │   │   ├── RegisterView.vue # 用户注册页面
│   │   │   ├── PaperDetail.vue # 文献详情页面
│   │   │   ├── ReferencesView.vue # 引用文献管理
│   │   │   ├── ResearchPlanDetail.vue # 研究方案详情
│   │   │   ├── HistoryPlans.vue # 历史方案管理
│   │   │   └── ScholarSearchView.vue # 文献搜索页面
│   │   ├── services/           # API服务层
│   │   │   ├── api.js          # 通用API服务封装
│   │   │   ├── cozeApi.js      # Coze AI API集成
│   │   │   └── cozeService.js  # Coze服务高级封装
│   │   ├── stores/             # Pinia状态管理
│   │   │   ├── chatStore.js    # 聊天和方案状态
│   │   │   └── userStore.js    # 用户认证状态
│   │   ├── config/             # 配置文件
│   │   │   └── environment.js  # 环境配置管理
│   │   ├── router/             # Vue Router配置
│   │   │   └── index.js        # 路由定义和权限控制
│   │   ├── main.js             # 应用入口文件
│   │   ├── App.vue             # 根组件
│   │   └── style.css           # 全局样式定义
│
├── 🗄️ 后端源码 (10,051 行)
│   └── server/                   # Node.js后端服务
│       ├── local-api.js         # 主API服务器 (Express)
│       ├── database.js          # MySQL数据库连接和表结构
│       ├── config.js            # 配置管理 (环境变量、API密钥)
│       ├── routes/              # API路由目录
│       ├── middleware/          # Express中间件
│       ├── cache/               # 缓存目录
│       ├── translate-service.js # 翻译服务模块
│       ├── coze-translate-service.js # Coze翻译服务
│       ├── statistical-methods-data.js # 统计方法数据
│       ├── statistical-methods-db.js # 统计方法数据库操作
│       ├── 🧪 测试文件
│       │   ├── api-test.js         # API功能测试
│       │   ├── quick-test.js       # 快速功能测试
│       │   ├── simple-test.cjs     # 简单测试脚本
│       │   ├── test-apis.cjs       # API接口测试
│       │   ├── test-coze-api.js    # Coze API测试
│       │   ├── test-db-connection.js # 数据库连接测试
│       │   └── test-research-plans.js # 研究方案测试
│       ├── 🔄 数据库迁移
│       │   ├── migrate-email-optional.js # 邮箱字段可选迁移
│       │   ├── migrate-paper-id-length.js # 论文ID长度迁移
│       │   ├── migrate-research-plans.js  # 研究方案迁移
│       │   └── migrate-statistical-methods.js # 统计方法迁移
│       ├── package.json         # 后端依赖配置
│       ├── entrypoint.sh        # Docker入口脚本
│       └── README.md           # 后端使用说明
│
├── 🎨 样式文件 (1,908 行)
│   ├── style.css               # 主样式文件
│   ├── tailwind.config.js      # TailwindCSS配置
│   └── postcss.config.js       # PostCSS配置
│
├── 🧪 测试页面 (5,876 行)
│   ├── test-*.html             # 各种功能测试页面
│   ├── test-*.js               # 测试脚本文件
│   ├── frontend-debug.html     # 前端调试页面
│   ├── cors-fix-temp.js        # CORS修复临时脚本
│   └── debug-semantic-recommend.js # 语义推荐调试脚本
│
├── ⚙️ 配置文件
│   ├── package.json            # 前端依赖和脚本配置
│   ├── vite.config.js          # Vite构建配置 (代理、环境变量)
│   ├── vercel.json            # Vercel部署配置
│   ├── index.html             # 应用入口HTML
│   └── LICENSE                # MIT开源协议
│
└── 📚 项目文档
    ├── README.md              # 项目主文档 (本文件)
    ├── README-环境配置说明.md   # 环境配置详细说明
    ├── manual-verification-guide.md # 手动验证指南
    ├── enhanced-semantic-search-guide.md # 语义搜索指南
    ├── 本地搜索功能验证指南.md    # 本地搜索验证
    └── 验证本地缓存优先功能.md    # 缓存验证指南
```

## 📖 使用指南

### 1. 智能对话

在首页与AI助手对话，描述您的研究需求：
- 研究主题和目标
- 实验设计问题
- 数据分析方法
- 统计技术选择

### 2. 文献推荐与搜索

- **AI推荐** - 基于对话内容自动推荐相关文献
- **主动搜索** - 在"文献搜索"页面搜索特定文献
- **文献管理** - 选择文献添加到引用列表
- **本地缓存** - 高质量论文自动缓存，提高访问速度

### 3. 论文缓存管理

**访问论文管理页面**: `/papers`

- **📊 浏览论文库** - 表格化显示所有缓存论文
- **🔍 智能搜索** - 支持标题、作者、摘要全文搜索
- **📈 统计分析** - 实时显示论文总数、顶会顶刊统计
- **🗂️ 高级过滤** - 按来源、期刊级别、发表年份过滤
- **➕ 手动添加** - 管理员可手动添加新论文到数据库
- **🗑️ 删除管理** - 认证用户可删除不需要的论文

### 4. 研究方案生成

- **自动生成** - 点击"生成定量研究方案"按钮
- **对话生成** - 在聊天中详细描述需求
- **参考文献** - 选择的文献将作为方案生成的参考

### 5. 方案查看与编辑

- **完整查看** - 查看包含所有模块的完整方案
- **分模块查看** - 分别查看研究假设、实验设计、数据分析、结果呈现
- **来源追踪** - 查看方案各部分的文献来源

### 6. 文档导出

- **PDF导出** - 一键生成专业格式的PDF文档
- **格式保留** - 保持Markdown格式和中文显示
- **自动下载** - 智能提示并自动显示下载按钮

### 7. 历史管理

- **查看历史** - 浏览所有历史生成的方案
- **应用方案** - 一键将历史方案设为当前工作方案
- **版本对比** - 比较不同版本的研究方案

### 8. 用户认证

- **注册账号** - 创建个人账户访问高级功能
- **登录系统** - 安全的JWT token认证
- **权限管理** - 不同功能需要相应权限等级

## 💾 论文缓存功能详解

### 智能缓存策略
- **自动保存** - 查看过的高质量论文自动缓存
- **手动保存** - 点击"保存到本地"手动缓存感兴趣的论文
- **去重机制** - 相同论文会更新而非重复保存
- **质量评分** - 基于引用数、期刊级别自动计算质量分

### 本地搜索优先
- **毫秒级响应** - 本地搜索无需网络请求
- **智能补充** - 本地结果不足时自动调用外部API
- **个性化结果** - 优先显示用户关注的研究领域

### 缓存状态提示
- 🟢 **已保存** - 论文首次保存到本地缓存
- 🔵 **已更新** - 论文信息已更新（如新增研究方法）
- ⚪ **保存到本地** - 点击可保存当前论文

### 论文管理功能
- **批量操作** - 支持批量删除、导出等操作
- **高级筛选** - 按发表年份、引用数、期刊级别筛选
- **排序功能** - 支持多种排序方式（时间、引用数、相关性）
- **统计报表** - 详细的缓存论文统计信息

## 🔧 API接口

### 核心API端点

| 端点 | 方法 | 说明 | 权限要求 |
|------|------|------|----------|
| `/api/auth/login` | POST | 用户登录认证 | 公开 |
| `/api/auth/register` | POST | 用户注册 | 公开 |
| `/api/auth/me` | GET | 获取用户信息 | 需要认证 |
| `/api/chat` | POST | 智能对话接口 | 可选认证 |
| `/api/semantic-recommend` | POST | 语义文献推荐 | 可选认证 |
| `/api/scholar-search` | POST | Google Scholar搜索 | 可选认证 |
| `/api/paper/get-full-content` | POST | 获取论文全文 | 可选认证 |
| `/api/paper/generate-method-summary` | POST | 生成方法概要 | 可选认证 |
| `/api/paper-cache/save` | POST | 保存论文到缓存 | 可选认证 |
| `/api/paper-cache/search` | POST | 缓存论文搜索 | 可选认证 |
| `/api/paper-cache/list` | POST | 获取论文列表 | 可选认证 |
| `/api/paper-cache/stats` | GET | 获取缓存统计 | 可选认证 |
| `/api/paper-cache/:id` | DELETE | 删除论文 | **需要认证** |
| `/api/query-statistical-method` | POST | 查询统计方法 | 可选认证 |
| `/api/research-plans` | GET/POST | 研究方案管理 | 需要认证 |
| `/api/conversations` | GET/POST | 对话管理 | 需要认证 |

### 环境配置

#### 云服务器环境
- **API Base URL**: `http://1.13.253.97:3004/api`
- **论文管理页面**: `http://1.13.253.97:3004/papers`
- **健康检查**: `http://1.13.253.97:3004/api/health`

#### 本地开发环境
- **API Base URL**: `http://localhost:3002/api`
- **论文管理页面**: `http://localhost:3000/papers`
- **API测试页面**: `http://localhost:3000/test-local-api.html`

### 环境变量配置

在`server/.env`文件中配置以下变量：

```env
# 🤖 Coze AI API配置
COZE_API_KEY=your_coze_api_key
COZE_API_URL=https://api.coze.com/open_api/v2/chat
COZE_BOT_ID=your_bot_id
COZE_USER_ID=your_user_id

# 📚 外部学术API配置
CORE_API_KEY=your_core_api_key
SEMANTIC_API_KEY=your_semantic_scholar_api_key

# 🗄️ 数据库配置 (MySQL)
DB_HOST=localhost
DB_PORT=3306
DB_NAME=methodmate
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_CHARSET=utf8mb4

# 🔐 JWT认证配置
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# 🌐 服务器配置
PORT=3002
NODE_ENV=development
API_BASE_URL=http://localhost:3002

# 📋 可选配置
ENABLE_LOGGING=true
CACHE_TTL=3600
MAX_POOL_SIZE=10
```

### 数据库初始化

首次运行时，系统会自动创建所需的数据库表：

1. **users** - 用户基本信息和认证
2. **conversations** - 对话会话记录
3. **messages** - 对话消息详情
4. **reference_papers** - 文献引用管理
5. **research_plans** - 研究方案存储
6. **plan_references** - 方案文献关联
7. **paper_cache** - 论文缓存和全文存储

## 🚀 未来发展计划

### 短期计划 (1-3个月)
- **🧠 智能搜索增强** - 集成BERT语义搜索，支持概念理解
- **📊 可视化统计** - 论文趋势分析和研究热点图表
- **🔄 同步优化** - 改进缓存策略和数据同步机制
- **📱 移动端适配** - 响应式设计优化，支持移动设备

### 中期计划 (3-6个月)
- **🤖 AI研究助手** - 更智能的研究方法推荐和实验设计建议
- **🔗 引用网络分析** - 论文引用关系图和影响力分析
- **📈 个性化推荐** - 基于用户研究兴趣的个性化文献推荐
- **🌐 多语言支持** - 英文界面和国际化功能

### 长期计划 (6-12个月)
- **📚 HCI论文库** - 建立完整的近10年HCI领域论文数据库
- **🔬 实验设计向导** - 交互式实验设计指导工具
- **👥 协作功能** - 支持团队协作和研究方案共享
- **🎓 教育模式** - 面向教学的HCI研究方法学习模块

## 🎯 适用场景

- **HCI研究新手** - 学习标准的研究方法和实验设计
- **研究生课程** - 作为HCI研究方法课程的辅助工具
- **学术研究** - 快速构建研究方案原型和文献综述
- **方法学习** - 通过AI生成的案例学习研究范式
- **论文管理** - 管理大量学术文献和研究资料
- **团队协作** - 共享研究资源和方案模板

## 🤝 贡献指南

我们欢迎各种形式的贡献！

### 贡献方式

1. **报告问题** - 在[Issues](https://github.com/bmh201708/MethodMate/issues)中报告bug
2. **功能建议** - 提出新功能的想法和建议
3. **代码贡献** - 提交Pull Request改进代码
4. **文档完善** - 改进项目文档和使用指南

### 开发流程

1. Fork本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启Pull Request

### 代码规范

- 遵循ESLint配置的代码风格
- 编写清晰的提交信息
- 为新功能添加适当的测试
- 更新相关文档

## 📝 更新日志

### v2.0.0 (当前版本) - 论文管理系统
- ✅ **论文缓存浏览器** - 新增专门的论文管理界面
- ✅ **手动添加论文** - 支持管理员手动添加论文到数据库
- ✅ **删除论文功能** - 带权限验证的论文删除管理
- ✅ **智能搜索系统** - 全文检索和语义搜索
- ✅ **环境切换优化** - 完善的本地/云服务器环境切换
- ✅ **用户认证系统** - JWT token认证和权限管理
- ✅ **API接口完善** - 新增多个论文管理相关API
- ✅ **数据库优化** - 论文缓存表结构优化和性能提升

### v1.9.0 - 全栈功能完善
- ✅ **完整用户系统** - 注册、登录、JWT认证、权限管理
- ✅ **MySQL数据库集成** - 7张核心表，完整的数据关系设计
- ✅ **状态管理优化** - Pinia状态管理，用户状态持久化
- ✅ **论文缓存系统** - 本地论文存储，快速检索，质量评分
- ✅ **研究方案关联** - 方案与文献的完整关联管理
- ✅ **数据库迁移** - 支持版本升级和数据迁移
- ✅ **代码规模** - 项目达到 ~15,865 行代码
- ✅ **测试覆盖** - 30+ 个测试文件，覆盖各种功能模块

### v1.8.0 - 本地开发环境支持
- ✅ 新增完整的本地开发环境支持
- ✅ 优化API路由配置，支持本地/远程后端切换
- ✅ 改进开发工作流程和Vite代理配置
- ✅ 增强错误处理和详细的日志记录
- ✅ 添加API测试工具页面
- ✅ 完善server目录结构和后端服务

### v1.0.0 - PDF导出和界面优化
- ✅ 新增PDF导出功能，支持中文和Markdown格式
- ✅ 重构内容解析引擎，解决内容重叠问题  
- ✅ 优化用户界面，增加消息截断和智能提示
- ✅ 完善历史方案管理功能
- ✅ 改进文献推荐算法

## 📄 许可证

本项目采用 [MIT License](https://github.com/bmh201708/MethodMate/blob/main/LICENSE) 开源协议。

## 🙏 致谢

- **[Coze](https://coze.com)** - 提供强大的AI智能体平台
- **[Vue.js](https://vuejs.org)** - 优秀的渐进式前端框架
- **[TailwindCSS](https://tailwindcss.com)** - 现代化的CSS工具类框架
- **[Semantic Scholar](https://semanticscholar.org)** - 免费的学术文献API
- **[CORE](https://core.ac.uk)** - 开放获取的研究论文聚合器
- **[Vercel](https://vercel.com)** - 优秀的云部署平台
- **[MySQL](https://mysql.com)** - 可靠的关系型数据库系统

## 📞 联系方式

- **作者**: bmh201708
- **GitHub**: [@bmh201708](https://github.com/bmh201708)
- **项目地址**: [https://github.com/bmh201708/MethodMate](https://github.com/bmh201708/MethodMate)
- **在线演示**: [https://method-mate.vercel.app](https://method-mate.vercel.app)
- **论文管理**: [https://method-mate.vercel.app/papers](https://method-mate.vercel.app/papers)
- **问题反馈**: [GitHub Issues](https://github.com/bmh201708/MethodMate/issues)

---

<div align="center">

**让HCI科研更简单，让实验设计更科学** 🚀

*MethodMate - 您的智能研究助手*

[⭐ 给项目点个星](https://github.com/bmh201708/MethodMate) | [🍴 Fork项目](https://github.com/bmh201708/MethodMate/fork) | [📝 报告问题](https://github.com/bmh201708/MethodMate/issues)

</div>