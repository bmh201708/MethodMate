<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
    <div class="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
      <!-- Logo 和标题 -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">MethodMate</h1>
        <p class="text-gray-600">登录您的账户</p>
      </div>

      <!-- 登录表单 -->
      <form @submit.prevent="handleLogin" class="space-y-6">
        <!-- 用户名/邮箱输入 -->
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700 mb-2">
            用户名或邮箱
          </label>
          <input
            id="username"
            v-model="loginForm.username"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="请输入用户名或邮箱"
          />
        </div>

        <!-- 密码输入 -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
            密码
          </label>
          <input
            id="password"
            v-model="loginForm.password"
            type="password"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="请输入密码"
          />
        </div>

        <!-- 错误信息 -->
        <div v-if="error" class="bg-red-50 border border-red-200 rounded-md p-3">
          <p class="text-red-600 text-sm">{{ error }}</p>
        </div>

        <!-- 登录按钮 -->
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
            登录中...
          </span>
          <span v-else>登录</span>
        </button>
      </form>

      <!-- 注册链接 -->
      <div class="mt-6 text-center">
        <p class="text-gray-600">
          还没有账户？
          <router-link 
            to="/register" 
            class="text-blue-600 hover:text-blue-500 font-medium"
          >
            立即注册
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
  name: 'LoginView',
  setup() {
    const router = useRouter()
    const userStore = useUserStore()
    
    const loginForm = ref({
      username: '',
      password: ''
    })
    
    const loading = ref(false)
    const error = ref('')
    
    const handleLogin = async () => {
      if (!loginForm.value.username || !loginForm.value.password) {
        error.value = '请填写所有必填字段'
        return
      }
      
      loading.value = true
      error.value = ''
      
      try {
        await userStore.login(loginForm.value.username, loginForm.value.password)
        
        // 登录成功，重定向到首页
        router.push('/')
      } catch (err) {
        error.value = err.message || '登录失败，请检查用户名和密码'
      } finally {
        loading.value = false
      }
    }
    
    return {
      loginForm,
      loading,
      error,
      handleLogin
    }
  }
}
</script> 