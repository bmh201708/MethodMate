const express = require('express');
const cors = require('cors');
const https = require('https');

const app = express();
const PORT = 3002;

// 中间件
app.use(cors());
app.use(express.json());

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 本地API服务器运行在 http://localhost:${PORT}`);
}); 