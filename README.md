# MethodMate - 智能文献推荐系统

MethodMate是一个基于Semantic Scholar API的智能文献推荐系统，帮助研究人员快速发现相关的高质量学术论文。

## ✨ 特点

- 🤖 基于AI的智能推荐算法
- 📚 支持正面和负面种子论文筛选
- 🔍 多维度论文分类和分析
- 📊 引用数量和相关性评分
- 📥 多源论文下载链接
- 🌐 集成Semantic Scholar API

## 🚀 快速开始

### 本地开发

1. **克隆仓库**
```bash
git clone https://github.com/yourusername/methodmate-frontend.git
cd methodmate-frontend
```

2. **安装依赖**
```bash
npm install
```

3. **启动开发服务器**
```bash
# 同时启动前端和API服务器
npm run dev:all

# 或分别启动
npm run api    # 启动API服务器
npm run dev    # 启动前端开发服务器
```

4. **访问应用**
- 前端: http://localhost:3000
- API服务器: http://localhost:3002

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

- **前端框架**: Vue 3
- **UI框架**: TailwindCSS
- **构建工具**: Vite
- **API集成**: Semantic Scholar
- **服务端**: Express
- **部署**: Vercel

## 📖 使用指南

1. **获取论文ID**
   - 访问 [Semantic Scholar](https://www.semanticscholar.org/)
   - 搜索并打开目标论文
   - 复制URL中的ID部分或使用完整URL

2. **获取推荐**
   - 输入1-5个正面种子论文ID
   - 可选择添加负面种子论文
   - 设置推荐数量和排序方式
   - 点击"获取推荐"

3. **查看结果**
   - 查看推荐论文列表
   - 按引用数或相关性排序
   - 获取论文下载链接
   - 查看分类和推荐原因

## 🤝 贡献

欢迎提交问题和改进建议！

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 📄 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 🙏 致谢

- [Semantic Scholar](https://www.semanticscholar.org/) - 提供API支持
- [Vue.js](https://vuejs.org/) - 前端框架
- [TailwindCSS](https://tailwindcss.com/) - UI框架
- [Vercel](https://vercel.com/) - 部署平台