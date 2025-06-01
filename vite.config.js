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
    port: 3000
    // 暂时移除API代理，因为我们使用Vercel Edge Functions
    // 在部署到Vercel后，API会自动可用
  }
})