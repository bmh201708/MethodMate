// 临时CORS修复配置 - 仅用于诊断问题
// 在 server/local-api.js 中替换CORS配置（诊断完成后记得改回来）

// 原始配置（保存备用）：
/*
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://method-mate.vercel.app', 'http://1.13.253.97:3004','http://1.13.253.97','http://1.13.253.97:3002', 'https://1.13.253.97:3004', 'https://1.13.253.97'] 
    : ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
*/

// 临时配置（允许所有来源 - 仅用于诊断）：
const corsOptions = {
  origin: true, // 允许所有来源
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200 // 某些浏览器需要
};

// 使用方法：
// 1. 将上述临时配置替换 server/local-api.js 中的 corsOptions
// 2. 重启服务器
// 3. 测试文献推荐功能
// 4. 如果正常工作，说明是CORS问题
// 5. 测试完成后，改回原始配置并添加正确的源地址 