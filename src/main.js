import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './style.css'
import App from './App.vue'

// Global error handler - ignore errors caused by browser extensions
window.addEventListener('error', (event) => {
  // Ignore exmid related errors (usually caused by browser extensions)
  if (event.error && event.error.message && event.error.message.includes('exmid')) {
    event.preventDefault()
    console.log('Ignoring browser extension error:', event.error.message)
    return
  }
  
  // Ignore all.js file errors (usually third-party scripts)
  if (event.filename && event.filename.includes('all.js')) {
    event.preventDefault()
    console.log('Ignoring third-party script error:', event.filename)
    return
  }
})

// Handle uncaught Promise rejections
window.addEventListener('unhandledrejection', (event) => {
  // Ignore specific errors
  if (event.reason && event.reason.message && event.reason.message.includes('exmid')) {
    event.preventDefault()
    console.log('Ignoring Promise rejection:', event.reason.message)
    return
  }
})

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Vue application error handler
app.config.errorHandler = (err, instance, info) => {
  // Ignore exmid related errors
  if (err.message && err.message.includes('exmid')) {
    console.log('Vue app ignoring error:', err.message)
    return
  }
  // Handle other errors normally
  console.error('Vue error:', err, info)
}

app.mount('#app')