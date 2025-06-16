// Coze API 配置 - 从环境变量获取
const COZE_API_TOKEN = process.env.COZE_API_KEY
const COZE_API_BASE = 'https://api.coze.com'
const BOT_ID = process.env.COZE_BOT_ID || '7507577087193710608'
const USER_ID = process.env.COZE_USER_ID || '7505301221562023954'

export const config = {
  runtime: 'edge',
}

export default async function handler(request) {
  // 处理 CORS
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }

  try {
    const data = await request.json()
    const { message, conversation_id } = data

    if (!message) {
      return new Response(JSON.stringify({
        success: false,
        error: '请提供要发送的消息'
      }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
    }

    // 调用Coze API
    const response = await fetch(`${COZE_API_BASE}/open_api/v2/chat`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${COZE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversation_id: conversation_id || `chat_${Date.now()}`,
        bot_id: BOT_ID,
        user: USER_ID,
        query: message,
        stream: false
      })
    })

    if (!response.ok) {
      throw new Error(`Coze API error: ${response.status}`)
    }

    const result = await response.json()
    
    if (result.code !== 0) {
      throw new Error(result.msg || 'Coze API调用失败')
    }

    // 提取回复内容
    let reply = ''
    if (result.messages && result.messages.length > 0) {
      const lastMessage = result.messages[result.messages.length - 1]
      if (lastMessage.type === 'answer' && lastMessage.content) {
        reply = lastMessage.content
      }
    }

    if (!reply) {
      throw new Error('未获取到有效的回复')
    }

    return new Response(JSON.stringify({
      success: true,
      reply: reply,
      conversation_id: conversation_id
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })

  } catch (error) {
    console.error('Coze聊天错误:', error)
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'Coze聊天失败'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }
} 