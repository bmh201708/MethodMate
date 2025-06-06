import { createApp } from 'vue'
import router from './router'
import './style.css'
import App from './App.vue'

// 全局错误处理器 - 忽略浏览器扩展引起的错误
window.addEventListener('error', (event) => {
  // 忽略 exmid 相关的错误（通常由浏览器扩展引起）
  if (event.error && event.error.message && event.error.message.includes('exmid')) {
    event.preventDefault()
    console.log('忽略浏览器扩展错误:', event.error.message)
    return
  }
  
  // 忽略 all.js 文件的错误（通常是第三方脚本）
  if (event.filename && event.filename.includes('all.js')) {
    event.preventDefault()
    console.log('忽略第三方脚本错误:', event.filename)
    return
  }
})

// 处理未捕获的Promise拒绝
window.addEventListener('unhandledrejection', (event) => {
  // 忽略特定的错误
  if (event.reason && event.reason.message && event.reason.message.includes('exmid')) {
    event.preventDefault()
    console.log('忽略Promise拒绝:', event.reason.message)
    return
  }
})

const app = createApp(App)
app.use(router)

// Vue应用错误处理器
app.config.errorHandler = (err, instance, info) => {
  // 忽略 exmid 相关的错误
  if (err.message && err.message.includes('exmid')) {
    console.log('Vue应用忽略错误:', err.message)
    return
  }
  // 其他错误正常处理
  console.error('Vue错误:', err, info)
}

app.mount('#app')