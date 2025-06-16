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
    // 本地开发时不使用代理，直接访问/api路径
    // 这样可以让Vite的开发服务器直接处理API请求
    // 配合Vercel Dev或部署环境使用
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