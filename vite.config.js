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
    // API代理配置
    proxy: {
      '/api/chat': {
        target: 'https://method-mate.vercel.app',
        changeOrigin: true,
        secure: true
      },
      '/api/recommend-papers': {
        target: 'https://method-mate.vercel.app',
        changeOrigin: true,
        secure: true,
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.log('推荐API代理错误:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('发送推荐API请求到:', options.target);
          });
        }
      },
      '/api/semantic-recommend': {
        target: 'http://localhost:3002',
        changeOrigin: true,
        secure: false,
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.log('语义推荐API代理错误:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('发送语义推荐API请求到:', options.target);
          });
        }
      },
      '/api': {
        target: 'http://localhost:3002',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path
      }
    }
  }
})