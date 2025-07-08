# ChatGPT 对话功能配置说明

## 功能介绍

MethodMate 现已集成 ChatGPT 对话功能，支持与 GPT-4o 进行智能对话。该功能可通过访问 `/chatgpt` 路径使用。

## 环境变量配置

要使用 ChatGPT 功能，您需要在项目根目录创建 `.env` 文件并配置以下环境变量：

### 必需配置

```bash
# ChatGPT API 密钥（必需）
VITE_CHATGPT_API_KEY=your_openai_api_key_here
```

### 可选配置

```bash
# ChatGPT API 基础URL（可选，默认为 OpenAI 官方API）
VITE_CHATGPT_BASE_URL=https://api.openai.com/v1/chat/completions

# 使用的模型（可选，默认为 gpt-4o）
VITE_CHATGPT_MODEL=gpt-4o

# 最大token数（可选，默认为 2000）
VITE_CHATGPT_MAX_TOKENS=2000

# 温度参数（可选，默认为 0.7）
VITE_CHATGPT_TEMPERATURE=0.7
```

## 配置步骤

1. **获取 OpenAI API 密钥**
   - 访问 [OpenAI Platform](https://platform.openai.com/)
   - 注册并登录账户
   - 在 API Keys 页面创建新的 API 密钥

2. **创建环境变量文件**
   ```bash
   # 在项目根目录创建 .env 文件
   touch .env
   ```

3. **配置环境变量**
   ```bash
   # 编辑 .env 文件，添加您的 API 密钥
   VITE_CHATGPT_API_KEY=sk-your-actual-api-key-here
   ```

4. **重启开发服务器**
   ```bash
   npm run dev
   ```

## 功能特点

- ✅ **智能对话**: 支持与 GPT-4o 进行多轮对话
- ✅ **消息历史**: 自动保存对话历史，支持上下文理解
- ✅ **Markdown 支持**: 支持 Markdown 格式的消息渲染
- ✅ **实时显示**: 显示消息发送状态和时间戳
- ✅ **响应式设计**: 适配桌面端和移动端
- ✅ **快捷键**: 支持 Ctrl+Enter 快速发送消息
- ✅ **清空对话**: 支持一键清空所有对话记录

## 使用方法

1. **访问页面**: 在浏览器中访问 `http://localhost:3000/chatgpt`
2. **开始对话**: 在输入框中输入您的问题
3. **发送消息**: 点击发送按钮或使用 Ctrl+Enter 快捷键
4. **查看回复**: AI 会自动回复您的问题

## 错误处理

如果遇到以下错误，请检查配置：

- **"ChatGPT API密钥未配置"**: 请确保在 `.env` 文件中正确配置了 `VITE_CHATGPT_API_KEY`
- **"ChatGPT API错误: 401"**: API 密钥无效，请检查密钥是否正确
- **"ChatGPT API错误: 429"**: API 请求频率过高，请稍后再试
- **网络错误**: 请检查网络连接和 API 基础URL 配置

## 自定义配置

### 使用自定义 API 端点

如果您使用的是第三方 OpenAI 兼容 API，可以修改基础URL：

```bash
VITE_CHATGPT_BASE_URL=https://your-custom-api.com/v1/chat/completions
```

### 调整模型参数

```bash
# 使用不同的模型
VITE_CHATGPT_MODEL=gpt-3.5-turbo

# 调整创造性（0-1，越高越有创造性）
VITE_CHATGPT_TEMPERATURE=0.9

# 增加回复长度
VITE_CHATGPT_MAX_TOKENS=4000
```

## 安全注意事项

1. **保护 API 密钥**: 
   - 不要将 `.env` 文件提交到版本控制系统
   - 不要在代码中硬编码 API 密钥
   - 定期更换 API 密钥

2. **成本控制**:
   - 监控 API 使用量和费用
   - 设置合理的 `max_tokens` 限制
   - 考虑在生产环境中添加使用频率限制

## 技术实现

- **前端框架**: Vue 3 + Composition API
- **HTTP 客户端**: Fetch API
- **Markdown 渲染**: marked.js
- **样式框架**: Tailwind CSS
- **路由管理**: Vue Router

## 后续扩展

该功能支持以下扩展：

- 流式响应（实时打字效果）
- 对话历史持久化存储
- 多会话管理
- 自定义 System Prompt
- 文件上传和分析

---

如有问题，请查看控制台日志或联系开发团队。 