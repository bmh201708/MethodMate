export const config = {
  runtime: 'edge',
}

// Coze API 配置
const COZE_API_TOKEN = process.env.COZE_API_KEY
const COZE_API_BASE = 'https://api.coze.com'
const BOT_ID = process.env.COZE_BOT_ID_RECOMMEND || '7510957134268940304'
const USER_ID = '7505301221562023954'

// 解析机器人回复 - 专门用于推荐文献
const parseBotReply = (reply) => {
  let papers = []
  
  try {
    // 首先尝试解析JSON格式
    const data = JSON.parse(reply)
    if (typeof data === 'object') {
      papers = data.papers || []
      if (data.output) {
        reply = data.output
      }
    }
  } catch (e) {
    // 尝试从文本中提取文献信息
    try {
      // 查找JSON代码块
      const jsonMatch = reply.match(/```json\s*([\s\S]*?)\s*```/i) || reply.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const jsonStr = jsonMatch[1] || jsonMatch[0];
        const jsonData = JSON.parse(jsonStr);
        if (jsonData.papers && Array.isArray(jsonData.papers)) {
          papers = jsonData.papers;
        }
      } else {
        // 使用正则表达式匹配文献信息
        const paperMatches = reply.match(/(?:文献|论文|Paper)\s*\d+[:：]\s*([^\n]+)/g);
        const titleMatches = reply.match(/(?:标题|Title)[:：]\s*([^\n]+)/g);
        const urlMatches = reply.match(/(?:链接|URL|Link|下载)[:：]\s*(https?:\/\/[^\s\n]+)/g);
        const abstractMatches = reply.match(/(?:摘要|Abstract)[:：]\s*([^\n]+)/g);
        
        if (paperMatches || titleMatches) {
          const titles = titleMatches || paperMatches;
          papers = titles.map((title, index) => {
            const cleanTitle = title.replace(/^(?:文献|论文|Paper)\s*\d+[:：]\s*/, '')
                                   .replace(/^(?:标题|Title)[:：]\s*/, '').trim();
            
            let downloadUrl = null;
            if (urlMatches && urlMatches[index]) {
              downloadUrl = urlMatches[index].replace(/^(?:链接|URL|Link|下载)[:：]\s*/, '').trim();
            }
            
            let abstract = '暂无摘要';
            if (abstractMatches && abstractMatches[index]) {
              abstract = abstractMatches[index].replace(/^(?:摘要|Abstract)[:：]\s*/, '').trim();
            }
            
            return {
              title: cleanTitle,
              abstract: abstract,
              downloadUrl: downloadUrl
            };
          });
        }
      }
    } catch (err) {
      console.error('Parse error:', err);
    }
  }
  
  return { reply, papers }
}

export default async function handler(request) {
  console.log('推荐API被调用，方法:', request.method);
  
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
    console.log('接收到的数据:', JSON.stringify(data, null, 2));
    
    const { chatHistory = [] } = data
    
    // 构建消息列表
    const messages = []
    
    // 添加聊天历史消息（如果有）
    if (chatHistory && Array.isArray(chatHistory)) {
      chatHistory.forEach(msg => {
        if (msg.type && msg.content) {
          messages.push({
            role: msg.type === 'user' ? 'user' : 'assistant',
            content: msg.content,
            content_type: 'text'
          })
        }
      })
    }
    
    // 构建详细的查询消息
    let messageContent = `请推荐3-5篇相关的学术文献。

请严格按照以下JSON格式返回：
\`\`\`json
{
  "papers": [
    {
      "title": "文献标题",
      "abstract": "文献摘要",
      "downloadUrl": "下载链接(如果有)"
    }
  ]
}
\`\`\`

`
    
    // 如果有有效的聊天历史，将其添加到消息中
    const validHistory = chatHistory.filter(msg => 
      msg.type === 'user' || (msg.type === 'assistant' && !msg.isError)
    );
    
    if (validHistory.length > 1) { // 超过1条消息才算有效对话
      messageContent += '\n对话内容：\n'
      
      // 只取最近的几条对话（避免消息过长）
      const recentHistory = validHistory.slice(-8) // 取最近8条消息
      
      recentHistory.forEach((msg, index) => {
        if (msg.type === 'user') {
          messageContent += `用户${index + 1}：${msg.content}\n`
        } else if (msg.type === 'assistant' && !msg.isError) {
          messageContent += `助手${index + 1}：${msg.content}\n`
        }
      })
      
      messageContent += '\n请基于上述对话内容，推荐相关的学术文献。'
    } else {
      messageContent += '请推荐一些通用的学术研究方法相关文献，特别是定量研究方法、实验设计、数据分析等方面的经典文献。'
    }
    
    // 添加当前消息
    messages.push({
      role: 'user',
      content: messageContent,
      content_type: 'text'
    })

    console.log('发送给推荐智能体的消息:', messageContent)

    // 调用 Coze API - 使用正确的端点
    const cozeResponse = await fetch(`${COZE_API_BASE}/open_api/v2/chat`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${COZE_API_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        bot_id: BOT_ID,
        user: USER_ID,
        query: messageContent,
        stream: false,
        conversation_id: data.session_id || Date.now().toString(),
        chat_history: messages.slice(0, -1) // 不包括当前消息
      })
    })

    console.log('Coze API响应状态:', cozeResponse.status, cozeResponse.statusText);

    if (!cozeResponse.ok) {
      const errorText = await cozeResponse.text();
      console.error('Coze API错误响应:', errorText);
      throw new Error(`Coze API responded with status: ${cozeResponse.status}, body: ${errorText}`);
    }

    const result = await cozeResponse.json()
    console.log('推荐智能体响应:', JSON.stringify(result))

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
      throw new Error('No response from recommendation bot')
    }

    console.log('机器人原始回复:', botReply);

    const parsed = parseBotReply(botReply)

    // 如果没有解析到文献，返回提示信息
    if (parsed.papers.length === 0) {
      console.log('未解析到文献信息，原始回复:', botReply)
    } else {
      console.log('成功解析到文献数量:', parsed.papers.length);
    }

    return new Response(JSON.stringify({
      success: true,
      papers: parsed.papers,
      rawResponse: parsed.reply,
      session_id: data.session_id || 'default'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    console.error('推荐API错误:', error)
    console.error('Error stack:', error.stack)
    
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message,
      papers: [],
      rawResponse: `错误：${error.message}`,
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