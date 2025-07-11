# API路由修改完成总结

## 修改内容

已将所有相对API路由改为绝对路由，指向您的云服务器: http://175.27.251.132:3004

## 修改的文件:

### 1. 存储配置文件
- src/stores/userStore.js - 更新 API_BASE_URL
- src/stores/chatStore.js - 更新 API_BASE_URL

### 2. 视图文件
- src/views/ResearchPlanDetail.vue - 修改 7 个API调用
- src/views/PaperDetail.vue - 修改 6 个API调用

### 3. 组件文件
- src/components/ScholarSearch.vue - 修改 2 个API调用
- src/components/ReferencedPapersList.vue - 修改 3 个API调用

### 4. 服务文件
- src/services/api.js - 修改 1 个API调用

## 修改的API端点:
- /api/auth/register
- /api/auth/login
- /api/auth/me
- /api/scholar-search
- /api/paper-download
- /api/paper/get-full-content
- /api/paper/generate-method-summary
- /api/extract-keywords
- /api/semantic-recommend
- /api/paper-cache/save
- /api/paper-cache/check
- /api/query-statistical-method
- /api/paper/get-cached-method
- /api/coze-chat
- /api/proxy-image
- /api/chat

所有相对路径已成功更改为绝对路径，前端现在直接连接到您的云服务器后端！

## 下一步:
可以启动前端应用测试连接是否正常工作。
