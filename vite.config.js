import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000,
    // 本地开发时的API代理配置
    // 使用环境变量来控制后端地址：USE_REMOTE_BACKEND=false 使用本地，否则默认使用远程
    proxy: {
      '/api': {
        target: process.env.USE_REMOTE_BACKEND === 'false' 
          ? 'http://localhost:3004'  // 本地后端服务器
          : 'http://118.195.129.161:3004',  // 远程后端服务器
        changeOrigin: true,
        secure: false,  // 本地开发时不需要secure
        rewrite: (path) => path,
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.error('代理错误:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('代理请求:', req.method, req.url, '-> ', options.target + req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('服务器响应:', proxyRes.statusCode, req.url);
          });
        }
      }
    }
  },
  // 构建配置
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router'],
          vendor: ['@vueuse/core', 'marked', 'html2pdf.js']
        }
      }
    }
  }
})