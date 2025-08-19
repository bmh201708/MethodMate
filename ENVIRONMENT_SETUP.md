# 环境变量配置指南

## 🚨 重要提示

由于前端代码需要使用 `VITE_` 前缀才能在浏览器中访问环境变量，您需要将 `.env` 文件中的环境变量名称改为以下格式：

## 📝 .env 文件配置

请将您的 `.env` 文件内容修改为：

```bash
# Coze API 配置 - 注意必须使用 VITE_ 前缀
VITE_COZE_API_KEY=pat_JbivMTTLDl2EQkzyFPDJ0PvIrUlDcIRgLClE65kT568CFQ81pBDR82AZzsz39Jec
VITE_COZE_BOT_ID=your_main_bot_id_here
VITE_COZE_USER_ID=your_coze_user_id_here
VITE_COZE_RECOMMEND_BOT_ID=your_recommend_bot_id_here
VITE_COZE_API_URL=https://api.coze.com
```

## 🔧 修改步骤

1. 打开您的 `.env` 文件
2. 将所有 `COZE_` 开头的变量名改为 `VITE_COZE_` 开头
3. 保存文件
4. 重启开发服务器

## ✅ 验证配置

配置完成后，在浏览器开发者工具的控制台中，您应该能看到：
- 🌍 当前环境信息
- 没有 "环境变量未定义" 的错误信息

## 📋 完整的环境变量列表

| 变量名 | 描述 | 必需 |
|--------|------|------|
| `VITE_COZE_API_KEY` | Coze API 密钥 | ✅ |
| `VITE_COZE_BOT_ID` | 主要对话机器人 ID | ✅ |
| `VITE_COZE_USER_ID` | Coze 用户 ID | ✅ |
| `VITE_COZE_RECOMMEND_BOT_ID` | 推荐机器人 ID | ❌ |
| `VITE_COZE_API_URL` | Coze API 基础 URL | ❌ |

## 🛠️ 故障排除

如果您遇到问题：

1. **确保环境变量名称正确**: 必须使用 `VITE_` 前缀
2. **重启服务器**: 修改 `.env` 文件后需要重启开发服务器
3. **检查文件位置**: `.env` 文件应该在项目根目录
4. **查看控制台**: 检查浏览器控制台是否有相关错误信息

## 📞 获取 Coze 配置信息

如果您需要获取 Coze 的配置信息：

1. **BOT_ID**: 在 Coze 平台中，进入您的机器人设置页面，URL 中包含的 ID
2. **USER_ID**: 您的 Coze 账户 ID
3. **API_KEY**: 在 Coze 平台的 API 设置中生成
