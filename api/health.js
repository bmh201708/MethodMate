export const config = {
  runtime: 'edge',
}

export default async function handler(request) {
  // 处理 CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers,
    })
  }

  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers,
    })
  }

  try {
    // 检查环境变量是否配置
    const envChecks = {
      COZE_API_KEY: !!process.env.COZE_API_KEY,
      COZE_BOT_ID: !!process.env.COZE_BOT_ID,
      COZE_USER_ID: !!process.env.COZE_USER_ID,
      CORE_API_KEY: !!process.env.CORE_API_KEY,
    }

    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: 'production', // Vercel环境
      runtime: 'edge',
      version: '1.0.0',
      services: {
        coze_api: envChecks.COZE_API_KEY ? 'configured' : 'missing_key',
        core_api: envChecks.CORE_API_KEY ? 'configured' : 'missing_key',
        semantic_scholar: 'available', // 不需要API密钥
      },
      checks: envChecks
    }

    return new Response(JSON.stringify(healthStatus, null, 2), {
      status: 200,
      headers,
    })

  } catch (error) {
    console.error('健康检查错误:', error)
    
    return new Response(JSON.stringify({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: error.message
    }), {
      status: 500,
      headers,
    })
  }
} 