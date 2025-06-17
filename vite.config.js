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
          ? 'http://localhost:3002'
          : 'https://ftrmjlrpxxgi.sealoshzh.site',
        changeOrigin: true,
        secure: process.env.USE_REMOTE_BACKEND !== 'false',
        rewrite: (path) => path
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