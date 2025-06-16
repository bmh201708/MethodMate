export const config = {
  runtime: 'edge',
}

// API配置
const SEMANTIC_API_BASE = 'https://api.semanticscholar.org/graph/v1'

// Coze API 配置
const COZE_API_TOKEN = process.env.COZE_API_KEY
const COZE_API_BASE = 'https://api.coze.com'
const BOT_ID = process.env.COZE_BOT_ID_SEMANTIC || '7510957134268940304'
const USER_ID = '7505301221562023954'

// 解析Coze API响应，提取关键词
const parseKeywordsFromCozeResponse = (reply) => {
  try {
    console.log('开始解析关键词，原始回复:', reply)
    
    // 尝试解析JSON格式
    const jsonMatch = reply.match(/```json\s*([\s\S]*?)\s*```/i) || reply.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const jsonStr = jsonMatch[1] || jsonMatch[0];
      console.log('找到JSON格式:', jsonStr)
      try {
        const jsonData = JSON.parse(jsonStr);
        if (jsonData.keywords && Array.isArray(jsonData.keywords)) {
          // 使用逗号分隔关键词，保留短语结构
          const keywords = jsonData.keywords
            .filter(kw => kw && typeof kw === 'string' && kw.trim().length > 0)
            .join(','); // 使用逗号而不是空格
          console.log('从JSON中提取的关键词(逗号分隔):', keywords)
          return keywords;
        }
      } catch (jsonError) {
        console.error('JSON解析错误:', jsonError)
      }
    }
    
    // 如果没有找到JSON格式的关键词，尝试从文本中提取
    const keywordsMatch = reply.match(/关键词[:：]\s*([^\n]+)/i) || 
                          reply.match(/keywords[:：]\s*([^\n]+)/i) ||
                          reply.match(/key\s*words[:：]\s*([^\n]+)/i);
    if (keywordsMatch && keywordsMatch[1]) {
      const textKeywords = keywordsMatch[1].trim();
      console.log('从文本中提取的关键词:', textKeywords)
      return textKeywords;
    }
    
    // 尝试查找列表格式的关键词
    const listMatches = reply.match(/\d+\.\s*([^\n,]+)(?:,|\n|$)/g);
    if (listMatches && listMatches.length > 0) {
      const listKeywords = listMatches
        .map(item => item.replace(/^\d+\.\s*/, '').trim())
        .filter(kw => kw.length > 0)
        .join(' ');
      console.log('从列表中提取的关键词:', listKeywords)
      return listKeywords;
    }
    
    // 如果以上都失败，尝试提取英文单词作为关键词
    const words = reply
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 3 && /^[a-zA-Z]+$/.test(word)) // 只保留纯英文且长度>3的词
      .slice(0, 10)
      .join(' ');
    
    if (words.length > 0) {
      console.log('从文本中提取的英文单词作为关键词:', words)
      return words;
    }
    
    // 最后的备用方案
    console.log('无法提取关键词，使用默认关键词')
    return 'research methodology quantitative analysis experimental design';
  } catch (err) {
    console.error('解析关键词错误:', err);
    return 'research methodology quantitative analysis experimental design';
  }
}

// 解析语义学术API响应
const parseSemanticResponse = (papers) => {
  return papers.map(paper => ({
    title: paper.title,
    abstract: paper.abstract || '暂无摘要',
    downloadUrl: paper.openAccessPdf?.url || paper.url || null,
    // 添加额外的语义学术特有信息
    year: paper.year,
    citationCount: paper.citationCount,
    authors: paper.authors?.map(author => author.name).join(', ') || '未知作者'
  }))
}

export default async function handler(request) {
  console.log('语义推荐API被调用，方法:', request.method)
  
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
    console.log('接收到的数据:', JSON.stringify(data, null, 2))
    
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
    
    // 首先检查是否需要翻译
    let translatedQuery = ''
    let needsTranslation = false
    
    // 检查最后一条用户消息是否包含中文字符
    const lastUserMessage = validHistory.length > 0 ? 
      validHistory.find(msg => msg.type === 'user') : null
    
    if (lastUserMessage) {
      const hasChinese = /[\u4e00-\u9fa5]/.test(lastUserMessage.content)
      if (hasChinese) {
        needsTranslation = true
        console.log('检测到中文查询，进行翻译:', lastUserMessage.content)
        
        // 构建翻译请求
        const translationContent = `Translate the following Chinese text to English, focusing on academic and technical accuracy:

"${lastUserMessage.content}"

Please respond with the English translation only, no explanations or additional text.`

        try {
          const translationResponse = await fetch(`${COZE_API_BASE}/open_api/v2/chat`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${COZE_API_TOKEN}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              bot_id: BOT_ID,
              user: USER_ID,
              query: translationContent,
              stream: false,
              conversation_id: `${data.session_id || Date.now().toString()}_translation`
            })
          })

          if (translationResponse.ok) {
            const translationResult = await translationResponse.json()
            if (translationResult.messages && Array.isArray(translationResult.messages)) {
              const translationMessage = translationResult.messages.find(m => m.role === 'assistant')
              if (translationMessage) {
                translatedQuery = translationMessage.content.trim()
                console.log('翻译成功:', {
                  original: lastUserMessage.content,
                  translated: translatedQuery
                })
              }
            }
          }
        } catch (translationError) {
          console.error('翻译失败:', translationError)
        }
      }
    }

    // 构建关键词提取消息
    let messageContent = `Please analyze the following text and extract 5-10 key academic search terms. 
Focus on specific technical terms, methodologies, and core concepts.

Please respond in the following JSON format:
\`\`\`json
{
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
}
\`\`\`

Text to analyze: "${needsTranslation && translatedQuery ? translatedQuery : ''}"

`
    
    // 如果有有效的聊天历史，将其添加到消息中
    const validHistory = chatHistory.filter(msg => 
      msg.type === 'user' || (msg.type === 'assistant' && !msg.isError)
    )
    
    if (needsTranslation && translatedQuery) {
      // 如果已经翻译了查询，直接使用翻译后的文本
      console.log('使用翻译后的查询进行关键词提取:', translatedQuery)
    } else if (validHistory.length > 1) { // 超过1条消息才算有效对话
      messageContent += '\nConversation history:\n'
      
      // 只取最近的几条对话（避免消息过长）
      const recentHistory = validHistory.slice(-8) // 取最近8条消息
      
      recentHistory.forEach((msg, index) => {
        if (msg.type === 'user') {
          messageContent += `User ${index + 1}: ${msg.content}\n`
        } else if (msg.type === 'assistant' && !msg.isError) {
          messageContent += `Assistant ${index + 1}: ${msg.content}\n`
        }
      })
      
      messageContent += '\nBased on the above conversation, extract the most relevant academic search keywords.'
    } else {
      messageContent += 'Please provide some general academic research method keywords, especially in quantitative research methods, experimental design, data analysis, and related fields.'
    }
    
    // 添加当前消息
    messages.push({
      role: 'user',
      content: messageContent,
      content_type: 'text'
    })

    console.log('发送给Coze API的消息:', messageContent)

    // 调用 Coze API 获取关键词
    let searchQuery = 'research methodology quantitative analysis experimental design' // 默认关键词
    
    try {
      const keywordResponse = await fetch(`${COZE_API_BASE}/open_api/v2/chat`, {
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
          conversation_id: `${data.session_id || Date.now().toString()}_keywords`,
          chat_history: [] // 不需要聊天历史，因为我们已经在消息中包含了所需信息
        })
      })

      console.log('Coze API关键词提取响应状态:', keywordResponse.status, keywordResponse.statusText)

      if (keywordResponse.ok) {
        const result = await keywordResponse.json()
        console.log('Coze API关键词提取响应:', JSON.stringify(result))

        // 提取机器人回复
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
        
        if (botReply) {
          // 从回复中提取关键词
          const extractedKeywords = parseKeywordsFromCozeResponse(botReply)
          if (extractedKeywords && extractedKeywords.length > 0) {
            searchQuery = extractedKeywords
            console.log('从Coze API提取的关键词:', searchQuery)
          } else {
            console.log('未能从Coze API响应中提取到有效关键词，使用默认关键词')
          }
        }
      } else {
        console.error('Coze API关键词提取错误:', await keywordResponse.text())
      }
    } catch (cozeError) {
      console.error('调用Coze API关键词提取错误:', cozeError)
      // 如果Coze API调用失败，使用备用方法提取关键词
      if (validHistory.length > 1) {
        const recentHistory = validHistory.slice(-4) // 只取最近4条消息
        const backupKeywords = recentHistory
          .map(msg => msg.content)
          .join(' ')
          .replace(/[^\w\s]/g, ' ') // 移除标点符号
          .split(/\s+/)
          .filter(word => word.length > 2) // 过滤掉太短的词
          .slice(0, 10) // 只取前10个关键词
          .join(' ')
        searchQuery = backupKeywords
        console.log('使用备用方法提取的关键词:', searchQuery)
      }
    }

    console.log('最终构建的搜索查询:', searchQuery)

    // 调用Semantic Scholar API搜索相关论文
    // 处理搜索查询，保留短语结构
    let formattedSearchQuery = searchQuery;
    
    // 如果已经是逗号分隔的格式，直接使用，不进行URL编码
    // 这样可以保留短语结构，如"machine learning"不会变成"machine,learning"
    const searchUrl = `${SEMANTIC_API_BASE}/paper/search?query=${formattedSearchQuery}&limit=5&fields=title,abstract,url,openAccessPdf,year,citationCount,authors`;
    
    console.log('最终Semantic Scholar API请求URL:', searchUrl);
    
    const searchResponse = await fetch(searchUrl, {
      headers: {
        'Accept': 'application/json',
      }
    })

    if (!searchResponse.ok) {
      const errorText = await searchResponse.text()
      console.error('Semantic Scholar API错误响应:', errorText)
      throw new Error(`Semantic Scholar API responded with status: ${searchResponse.status}`)
    }

    const result = await searchResponse.json()
    console.log('语义学术API响应:', JSON.stringify(result))

    // 解析返回的论文数据
    const papers = parseSemanticResponse(result.data || [])

    return new Response(JSON.stringify({
      success: true,
      papers: papers,
      rawResponse: JSON.stringify(result.data),
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