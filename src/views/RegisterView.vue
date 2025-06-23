<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
    <div class="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
      <!-- Logo 和标题 -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">MethodMate</h1>
        <p class="text-gray-600">创建您的账户</p>
      </div>

      <!-- 注册表单 -->
      <form @submit.prevent="handleRegister" class="space-y-6">
        <!-- 用户名输入 -->
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700 mb-2">
            用户名 *
          </label>
          <input
            id="username"
            v-model="registerForm.username"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="请输入用户名"
          />
        </div>

        <!-- 邮箱输入 -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
            邮箱 *
          </label>
          <input
            id="email"
            v-model="registerForm.email"
            type="email"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="请输入邮箱地址"
          />
        </div>

        <!-- 密码输入 -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
            密码 *
          </label>
          <input
            id="password"
            v-model="registerForm.password"
            type="password"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="请输入密码（至少6位）"
          />
          <p class="mt-1 text-xs text-gray-500">密码长度至少为6位</p>
        </div>

        <!-- 确认密码输入 -->
        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
            确认密码 *
          </label>
          <input
            id="confirmPassword"
            v-model="registerForm.confirmPassword"
            type="password"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="请再次输入密码"
          />
        </div>

        <!-- 错误信息 -->
        <div v-if="error" class="bg-red-50 border border-red-200 rounded-md p-3">
          <p class="text-red-600 text-sm">{{ error }}</p>
        </div>

        <!-- 成功信息 -->
        <div v-if="success" class="bg-green-50 border border-green-200 rounded-md p-3">
          <p class="text-green-600 text-sm">{{ success }}</p>
        </div>

        <!-- 注册按钮 -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
        >
          <span v-if="loading" class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            注册中...
          </span>
          <span v-else>注册</span>
        </button>
      </form>

      <!-- 登录链接 -->
      <div class="mt-6 text-center">
        <p class="text-gray-600">
          已有账户？
          <router-link 
            to="/login" 
            class="text-blue-600 hover:text-blue-500 font-medium"
          >
            立即登录
          </router-link>
        </p>
      </div>

      <!-- 返回首页链接 -->
      <div class="mt-4 text-center">
        <router-link 
          to="/" 
          class="text-gray-500 hover:text-gray-700 text-sm"
        >
          ← 返回首页
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'

export default {
  name: 'RegisterView',
  setup() {
    const router = useRouter()
    const userStore = useUserStore()
    
    const registerForm = ref({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
    
    const loading = ref(false)
    const error = ref('')
    const success = ref('')
    
    const validateForm = () => {
      if (!registerForm.value.username || !registerForm.value.email || 
          !registerForm.value.password || !registerForm.value.confirmPassword) {
        error.value = '请填写所有必填字段'
        return false
      }
      
      if (registerForm.value.password.length < 6) {
        error.value = '密码长度至少为6位'
        return false
      }
      
      if (registerForm.value.password !== registerForm.value.confirmPassword) {
        error.value = '两次输入的密码不一致'
        return false
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(registerForm.value.email)) {
        error.value = '请输入有效的邮箱地址'
        return false
      }
      
      return true
    }
    
    const handleRegister = async () => {
      error.value = ''
      success.value = ''
      
      if (!validateForm()) {
        return
      }
      
      loading.value = true
      
      try {
        await userStore.register(
          registerForm.value.username,
          registerForm.value.email,
          registerForm.value.password
        )
        
        success.value = '注册成功！正在跳转到首页...'
        
        // 注册成功后等待2秒再跳转，让用户看到成功消息
        setTimeout(() => {
          router.push('/')
        }, 2000)
        
      } catch (err) {
        error.value = err.message || '注册失败，请稍后重试'
      } finally {
        loading.value = false
      }
    }
    
    return {
      registerForm,
      loading,
      error,
      success,
      handleRegister
    }
  }
}
</script> 