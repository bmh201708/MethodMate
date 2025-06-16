export const config = {
  runtime: 'edge',
}

// Coze API 配置 - 从环境变量获取
const COZE_API_TOKEN = process.env.COZE_API_KEY
const COZE_API_BASE = 'https://api.coze.com'
const BOT_ID = process.env.COZE_BOT_ID
const USER_ID = process.env.COZE_USER_ID || '7505301221562023954'

// 解析机器人回复
const parseBotReply = (reply) => {
  let papers = []
  let plan = ""
  let history_plan = []
  
  try {
    const data = JSON.parse(reply)
    if (typeof data === 'object') {
      papers = data.papers || []
      plan = data.plan || ""
      history_plan = data.history_plan || []
      if (data.output) {
        reply = data.output
      }
    }
  } catch (e) {
    // 尝试用分隔符分段
    if (reply.includes("【推荐文献】") && reply.includes("【研究方案】")) {
      try {
        const paperSection = reply.split("【推荐文献】")[1].split("【研究方案】")[0].trim()
        const planSection = reply.split("【研究方案】")[1].split("【历史研究方案】")[0].trim()
        papers = paperSection ? [paperSection] : []
        plan = planSection
        if (reply.includes("【历史研究方案】")) {
          history_plan = [{ plans: reply.split("【历史研究方案】")[1].trim() }]
        }
      } catch (err) {
        console.error('Parse error:', err)
      }
    }
  }
  
  return { reply, papers, plan, history_plan }
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
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const data = await request.json()
    
    // 构建消息列表
    const messages = []
    
    // 添加历史消息（如果有）
    if (data.history && Array.isArray(data.history)) {
      data.history.forEach(msg => {
        messages.push({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content,
          content_type: 'text'
        })
      })
    }
    
    // 添加当前消息
    messages.push({
      role: 'user',
      content: data.message,
      content_type: 'text'
    })

    // 调用 Coze API - 使用正确的端点
    const response = await fetch(`${COZE_API_BASE}/open_api/v2/chat`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${COZE_API_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        bot_id: BOT_ID,
        user: USER_ID,
        query: data.message,
        stream: false,
        conversation_id: data.session_id || undefined,
        chat_history: messages.slice(0, -1) // 不包括当前消息
      })
    })

    const result = await response.json()
    console.log('Coze API response:', JSON.stringify(result))

    // 检查错误
    if (result.code && result.code !== 0) {
      throw new Error(result.msg || 'Coze API error')
    }

    // 根据不同的响应格式处理
    let botReply = ''
    
    // v2 API 响应格式
    if (result.messages && Array.isArray(result.messages)) {
      const assistantMessages = result.messages.filter(m => m.role === 'assistant')
      if (assistantMessages.length > 0) {
        botReply = assistantMessages[assistantMessages.length - 1].content
      }
    }
    // v3 API 响应格式
    else if (result.data && result.data.messages) {
      const assistantMessages = result.data.messages.filter(m => m.role === 'assistant')
      if (assistantMessages.length > 0) {
        botReply = assistantMessages[assistantMessages.length - 1].content
      }
    }
    // 直接响应格式
    else if (result.answer) {
      botReply = result.answer
    }
    
    if (!botReply) {
      throw new Error('No response from Coze API')
    }

    const parsed = parseBotReply(botReply)

    return new Response(JSON.stringify({
      ...parsed,
      session_id: data.session_id || 'default'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    console.error('Edge Function Error:', error)
    console.error('Error stack:', error.stack)
    
    return new Response(JSON.stringify({ 
      error: error.message,
      reply: `错误：${error.message}`,
      papers: [],
      plan: '',
      history_plan: [],
      session_id: data?.session_id || 'default'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }
}