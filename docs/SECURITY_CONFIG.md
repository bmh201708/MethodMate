# 环境变量安全配置指南

## 概述

为了提高应用的安全性，项目已将所有硬编码的 API 密钥迁移到环境变量中。请按照以下步骤配置您的环境变量。

## 前端环境变量配置

在项目根目录创建 `.env` 文件（或修改现有文件），添加以下配置：

```env
# 环境配置
NODE_ENV=development
USE_REMOTE_BACKEND="false"

# Coze API配置（前端）
VITE_COZE_API_KEY=your_coze_api_key_here
VITE_COZE_API_URL=https://api.coze.com
VITE_COZE_BOT_ID=your_chat_bot_id_here
VITE_COZE_USER_ID=your_coze_user_id_here
VITE_COZE_RECOMMEND_BOT_ID=your_recommend_bot_id_here

# ChatGPT配置（前端）
VITE_CHATGPT_API_KEY=your_openai_api_key_here
VITE_CHATGPT_BASE_URL=https://api.chatanywhere.tech/v1/chat/completions
VITE_CHATGPT_MODEL=gpt-4o
VITE_CHATGPT_MAX_TOKENS=16384
VITE_CHATGPT_TEMPERATURE=0.8

# Core API配置
CORE_API_KEY=your_core_api_key_here
```

## 后端环境变量配置

在 `server/` 目录创建 `.env` 文件，添加以下配置：

```env
# Coze API配置
COZE_API_TOKEN=your_coze_api_token_here
COZE_API_KEY=your_coze_api_key_here
COZE_API_BASE=https://api.coze.com
COZE_API_URL=https://api.coze.com

# Coze Bot IDs
CHAT_BOT_ID=your_chat_bot_id_here
RECOMMEND_BOT_ID=your_recommend_bot_id_here
COZE_BOT_ID=your_main_bot_id_here
COZE_BOT_ID_REFERENCE=your_reference_bot_id_here

# Coze User ID
COZE_USER_ID=your_coze_user_id_here

# 其他API配置
SEMANTIC_API_BASE=https://api.semanticscholar.org/graph/v1
CORE_API_BASE=https://api.core.ac.uk/v3

# 数据库配置
DB_HOST=localhost
DB_USER=your_db_username_here
DB_PASSWORD=your_db_password_here
DB_NAME=methodmate
DB_PORT=3306

# 远程数据库配置
REMOTE_DB_USER=your_remote_db_username_here
REMOTE_DB_PASSWORD=your_remote_db_password_here
REMOTE_DB_NAME=methodmate

# OpenAI配置
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_API_URL=https://api.chatanywhere.tech/v1
OPENAI_MODEL=gpt-4o
OPENAI_MAX_TOKENS=16384
OPENAI_TEMPERATURE=0.8

# JWT密钥
JWT_SECRET=your_jwt_secret_key_here
```

## 重要提醒

### 🔒 安全注意事项

1. **永远不要提交 `.env` 文件到版本控制系统**
2. **确保 `.gitignore` 文件包含 `.env` 条目**
3. **定期轮换 API 密钥**
4. **使用强随机字符串作为 JWT_SECRET**

### ⚠️ 迁移说明

- 原有硬编码的 API 密钥已被完全移除
- 应用启动时会验证关键环境变量是否设置
- 如果环境变量缺失，将在控制台显示警告

### 🔧 故障排除

如果遇到 API 调用失败：

1. 检查 `.env` 文件是否存在
2. 确认所有必需的环境变量都已设置
3. 验证 API 密钥的有效性
4. 查看控制台是否有环境变量缺失警告

### 📋 环境变量检查清单

前端必需变量：
- [ ] `VITE_COZE_API_KEY`
- [ ] `VITE_COZE_BOT_ID` 
- [ ] `VITE_COZE_USER_ID`
- [ ] `VITE_CHATGPT_API_KEY` (如果使用 ChatGPT)

后端必需变量：
- [ ] `COZE_API_KEY`
- [ ] `COZE_BOT_ID`
- [ ] `COZE_USER_ID`
- [ ] `DB_USER` & `DB_PASSWORD`
- [ ] `JWT_SECRET`

## 环境变量映射表

从您提供的 `.env` 内容，以下是建议的映射：

| 现有变量 | 新变量名 | 用途 |
|---------|---------|------|
| `COZE_API_TOKEN` | `VITE_COZE_API_KEY` | 前端 Coze API 密钥 |
| `COZE_BOT_ID` | `VITE_COZE_BOT_ID` | 前端主聊天机器人 ID |
| `RECOMMEND_BOT_ID` | `VITE_COZE_RECOMMEND_BOT_ID` | 前端推荐机器人 ID |
| `COZE_USER_ID` | `VITE_COZE_USER_ID` | 前端用户 ID |
| `VITE_CHATGPT_API_KEY` | 保持不变 | ChatGPT API 密钥 |

请根据此指南更新您的环境变量配置。
