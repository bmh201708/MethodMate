// API配置工具
const API_CONFIG = {
  // 生产环境：使用相对路径（Vercel会自动路由）
  // 开发环境：可以选择使用部署的API或本地Vercel Dev
  baseURL: import.meta.env.PROD 
    ? '' // 生产环境使用相对路径
    : 'https://method-mate.vercel.app', // 开发环境使用部署的API
  
  // 如果你想在开发时使用本地Vercel Dev，可以改为：
  // baseURL: import.meta.env.PROD ? '' : 'http://localhost:3001',
}

/**
 * 统一的API调用函数
 * @param {string} endpoint - API端点，如 '/api/scholar-search'
 * @param {object} options - fetch选项
 * @returns {Promise<Response>}
 */
export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_CONFIG.baseURL}${endpoint}`
  
  console.log(`API调用: ${url}`)
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  }
  
  const finalOptions = { ...defaultOptions, ...options }
  
  try {
    const response = await fetch(url, finalOptions)
    
    if (!response.ok) {
      console.error(`API调用失败: ${response.status} - ${response.statusText}`)
    }
    
    return response
  } catch (error) {
    console.error(`API调用错误:`, error)
    throw error
  }
}

/**
 * GET请求
 */
export const apiGet = async (endpoint, options = {}) => {
  return apiCall(endpoint, { ...options, method: 'GET' })
}

/**
 * POST请求
 */
export const apiPost = async (endpoint, data, options = {}) => {
  return apiCall(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data)
  })
}

// 导出配置，供其他地方使用
export { API_CONFIG } 