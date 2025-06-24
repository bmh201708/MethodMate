import { CozeAPI } from '@coze/api'

const API_KEY = 'pat_Q06cU8OsiWefqJHG2ed8GlV1al9WRGRVNAfkNmpG567hDXVbcHeyLHWtMLciNj37'
const BOT_ID = '7513529977745915905'
const USER_ID = '7505301221562023954'

// 推荐智能体配置
const RECOMMEND_BOT_ID = '7510957134268940304'

const apiClient = new CozeAPI({
  token: API_KEY,
  baseURL: 'https://api.coze.com',
  allowPersonalAccessTokenInBrowser: true
})

export const sendMessageToCoze = async (message) => {
  try {
    const res = await apiClient.chat.create({
      bot_id: BOT_ID,
      user_id: USER_ID,
      additional_messages: [
        {
          role: 'user',
          content: message,
          content_type: 'text'
        }
      ],
      auto_save_history: true
    })
    // 官方SDK返回结构体，reply在data.reply
    if (res.status === 'failed') {
      throw new Error(`聊天失败: ${res.last_error?.msg || '未知错误'}`)
    }
    return res.reply || '抱歉，我没有收到有效的回复。'
  } catch (error) {
    console.error('=== 发生错误 ===')
    console.error('错误类型:', error.name)
    console.error('错误消息:', error.message)
    console.error('错误堆栈:', error.stack)
    throw error
  }
}

// 推荐文献函数 - 完全参考chat.js的写法
export const getRecommendedPapers = async (chatHistory = []) => {
  try {
    console.log('=== 准备调用推荐智能体 ===')
    console.log('聊天历史:', chatHistory)
    
    // 构建消息内容
    let messageContent = `请推荐3篇相关的学术文献。

请严格按照以下JSON格式返回：
{
  "papers": [
    {
      "title": "文献标题",
      "abstract": "文献摘要(150字以内)",
      "downloadUrl": "下载链接(如果有)"
    }
  ]
}

注意：
1. 只返回3篇文献
2. 必须使用完整的JSON格式
3. 如果没有下载链接可以设置为null

`

    // 处理聊天历史
    const validHistory = chatHistory.filter(msg => 
      msg.type === 'user' || (msg.type === 'assistant' && !msg.isError)
    );
    
    if (validHistory.length > 1) {
      messageContent += '\n对话内容：\n'
      const recentHistory = validHistory.slice(-8)
      
      recentHistory.forEach((msg, index) => {
        if (msg.type === 'user') {
          messageContent += `用户${index + 1}：${msg.content}\n`
        } else if (msg.type === 'assistant' && !msg.isError) {
          messageContent += `助手${index + 1}：${msg.content}\n`
        }
      })
      
      messageContent += '\n请基于上述对话内容，推荐相关的学术文献。'
    } else {
      messageContent += '请推荐一些人机交互领域（HCI）的学术研究方法相关文献，特别是定量研究方法、实验设计、数据分析等方面的经典文献。'
    }

    console.log('发送给推荐智能体的消息:', messageContent)

    // 完全参考chat.js的API调用方式
    const response = await fetch('https://api.coze.com/open_api/v2/chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        bot_id: RECOMMEND_BOT_ID,
        user: USER_ID,
        query: messageContent,
        stream: false,
        conversation_id: Date.now().toString()
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('推荐API HTTP错误:', response.status, errorText)
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`)
    }

    const result = await response.json()
    console.log('推荐智能体API响应:', JSON.stringify(result, null, 2))

    // 检查错误
    if (result.code && result.code !== 0) {
      throw new Error(result.msg || 'Coze API error')
    }

    // 完全参考chat.js的响应解析方式
    let botReply = ''
    
    // v2 API 响应格式
    if (result.messages && Array.isArray(result.messages)) {
      // 筛选出type为"answer"的assistant消息
      const assistantMessages = result.messages.filter(m => m.role === 'assistant' && m.type === 'answer')
      if (assistantMessages.length > 0) {
        botReply = assistantMessages[assistantMessages.length - 1].content
      }
    }
    // v3 API 响应格式
    else if (result.data && result.data.messages) {
      const assistantMessages = result.data.messages.filter(m => m.role === 'assistant' && m.type === 'answer')
      if (assistantMessages.length > 0) {
        botReply = assistantMessages[assistantMessages.length - 1].content
      }
    }
    // 直接响应格式
    else if (result.answer) {
      botReply = result.answer
    }
    
    console.log('推荐智能体原始回复:', botReply)
    
    if (!botReply) {
      console.log('没有获取到回复，完整响应结构:', result)
      throw new Error('No response from recommendation bot')
    }

    // 解析回复，提取文献信息
    let papers = []
    
    try {
      // 首先尝试直接解析JSON格式（智能体返回的是转义的JSON字符串）
      let data = JSON.parse(botReply)
      console.log('第一次解析后的数据:', data)
      console.log('第一次解析后data的类型:', typeof data)
      
      // 如果解析结果仍然是字符串，说明是双重转义，需要再次解析
      if (typeof data === 'string') {
        console.log('检测到双重转义，进行第二次解析')
        data = JSON.parse(data)
        console.log('第二次解析后的数据:', data)
        console.log('第二次解析后data的类型:', typeof data)
      }
      
      console.log('data.papers存在吗?', !!data.papers)
      console.log('data.papers的内容:', data.papers)
      console.log('data.papers是数组吗?', Array.isArray(data.papers))
      
      if (data && data.papers && Array.isArray(data.papers)) {
        papers = data.papers
        console.log('成功从JSON中提取papers:', papers)
        console.log('提取到的文献数量:', papers.length)
      } else {
        console.log('条件不满足，最终data:', data)
      }
    } catch (e) {
      console.log('JSON解析失败，尝试其他方法:', e.message)
      try {
        // 查找JSON代码块
        const jsonMatch = botReply.match(/```json\s*([\s\S]*?)\s*```/i) || botReply.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          let jsonStr = jsonMatch[1] || jsonMatch[0]
          console.log('从代码块中提取的JSON:', jsonStr)
          
          // 尝试修复不完整的JSON
          if (!jsonStr.trim().endsWith('}')) {
            console.log('检测到不完整的JSON，尝试修复...')
            
            // 找到最后一个完整的文献对象
            const lastCompleteIndex = jsonStr.lastIndexOf('    }')
            if (lastCompleteIndex > 0) {
              // 截取到最后一个完整的文献对象
              const fixedJson = jsonStr.substring(0, lastCompleteIndex + 5) + '\n  ]\n}'
              console.log('修复后的JSON:', fixedJson)
              jsonStr = fixedJson
            } else {
              // 如果找不到完整的文献对象，尝试其他修复方法
              // 移除不完整的最后一个对象
              const papers = jsonStr.match(/\{\s*"title"[\s\S]*?\}/g)
              if (papers && papers.length > 0) {
                // 只保留完整的文献对象
                const completePapers = papers.filter(paper => {
                  try {
                    JSON.parse(paper)
                    return true
                  } catch {
                    return false
                  }
                })
                
                if (completePapers.length > 0) {
                  jsonStr = '{\n  "papers": [\n' + completePapers.map(paper => '    ' + paper).join(',\n') + '\n  ]\n}'
                  console.log('重构后的JSON:', jsonStr)
                }
              }
            }
          }
          
          const jsonData = JSON.parse(jsonStr)
          if (jsonData.papers && Array.isArray(jsonData.papers)) {
            papers = jsonData.papers
            console.log('成功从代码块中提取papers:', papers)
            
            // 过滤掉不完整的文献（没有必要字段的）
            papers = papers.filter(paper => paper.title && paper.abstract)
            console.log('过滤后的完整文献:', papers)
          }
        } else {
          // 使用正则表达式匹配文献信息
          const paperMatches = botReply.match(/(?:文献|论文|Paper)\s*\d+[:：]\s*([^\n]+)/g)
          const titleMatches = botReply.match(/(?:标题|Title)[:：]\s*([^\n]+)/g)
          const urlMatches = botReply.match(/(?:链接|URL|Link|下载)[:：]\s*(https?:\/\/[^\s\n]+)/g)
          const abstractMatches = botReply.match(/(?:摘要|Abstract)[:：]\s*([^\n]+)/g)
          
          if (paperMatches || titleMatches) {
            const titles = titleMatches || paperMatches
            papers = titles.map((title, index) => {
              const cleanTitle = title.replace(/^(?:文献|论文|Paper)\s*\d+[:：]\s*/, '')
                                     .replace(/^(?:标题|Title)[:：]\s*/, '').trim()
              
              let downloadUrl = null
              if (urlMatches && urlMatches[index]) {
                downloadUrl = urlMatches[index].replace(/^(?:链接|URL|Link|下载)[:：]\s*/, '').trim()
              }
              
              let abstract = '暂无摘要'
              if (abstractMatches && abstractMatches[index]) {
                abstract = abstractMatches[index].replace(/^(?:摘要|Abstract)[:：]\s*/, '').trim()
              }
              
              return {
                title: cleanTitle,
                abstract: abstract,
                downloadUrl: downloadUrl
              }
            })
            console.log('成功从正则匹配中提取papers:', papers)
          }
        }
      } catch (parseError) {
        console.error('解析推荐回复失败:', parseError)
        
        // 最后的兜底方案：尝试提取任何可能的文献信息
        try {
          console.log('尝试兜底解析方案...')
          const titlePattern = /"title":\s*"([^"]+)"/g
          const abstractPattern = /"abstract":\s*"([^"]+)"/g
          const urlPattern = /"downloadUrl":\s*"([^"]+)"/g
          
          const titles = []
          const abstracts = []
          const urls = []
          
          let match
          while ((match = titlePattern.exec(botReply)) !== null) {
            titles.push(match[1])
          }
          while ((match = abstractPattern.exec(botReply)) !== null) {
            abstracts.push(match[1])
          }
          while ((match = urlPattern.exec(botReply)) !== null) {
            urls.push(match[1])
          }
          
          if (titles.length > 0) {
            papers = titles.map((title, index) => ({
              title: title,
              abstract: abstracts[index] || '暂无摘要',
              downloadUrl: urls[index] || null
            }))
            console.log('兜底方案成功提取papers:', papers)
          }
        } catch (fallbackError) {
          console.error('兜底解析也失败了:', fallbackError)
        }
      }
    }

    console.log('解析得到的文献列表:', papers)

    return {
      success: true,
      papers: papers,
      rawResponse: botReply
    }

  } catch (error) {
    console.error('=== 推荐功能发生错误 ===')
    console.error('错误类型:', error.name)
    console.error('错误消息:', error.message)
    console.error('错误堆栈:', error.stack)
    
    return {
      success: false,
      error: error.message,
      papers: [],
      rawResponse: `错误：${error.message}`
    }
  }
}

export const sendStreamMessageToCoze = async (message, onChunk, chatHistory = []) => {
  try {
    console.log('=== 准备发送消息到Coze ===')
    console.log('消息内容:', message.substring(0, 200) + (message.length > 200 ? '...' : ''))
    console.log('消息长度:', message.length)
    console.log('聊天历史长度:', chatHistory.length)
    
    // 构建完整的消息上下文
    const messages = []
    
    // 添加历史消息（最近的10条对话）
    const recentHistory = chatHistory
      .filter(msg => (msg.type === 'user' || msg.type === 'assistant') && !msg.isError && msg.isComplete)
      .slice(-10) // 只取最近10条对话，避免token过多
    
    // 转换历史消息格式
    recentHistory.forEach(msg => {
      if (msg.type === 'user') {
        messages.push({
          role: 'user',
          content: msg.content,
          content_type: 'text'
        })
      } else if (msg.type === 'assistant') {
        messages.push({
          role: 'assistant',
          content: msg.content,
          content_type: 'text'
        })
      }
    })
    
    // 添加当前消息
    messages.push({
      role: 'user',
      content: message,
      content_type: 'text'
    })
    
    const params = {
      bot_id: BOT_ID,
      user_id: USER_ID,
      additional_messages: messages,
      stream: true,
      auto_save_history: true
    }
    
    console.log('请求参数（包含上下文）:', params)
    console.log('消息数量:', messages.length)
    
    const stream = await apiClient.chat.stream(params)
    let fullResponse = ''
    let conversationId = null
    
    for await (const data of stream) {
      // 减少日志输出，只在关键事件时输出
      if (data.event !== 'conversation.message.delta') {
        console.log('收到流数据:', data.event, data.data?.type || '')
      }
      
      // 处理会话创建事件
      if (data.event === 'conversation.chat.created') {
        conversationId = data.data?.conversation_id
        console.log('会话已创建，ID:', conversationId)
        continue
      }
      
      // 处理聊天进行中事件
      if (data.event === 'conversation.chat.in_progress') {
        console.log('聊天进行中...')
        continue
      }
      
      // 处理聊天失败事件
      if (data.event === 'conversation.chat.failed') {
        const errorInfo = data.data?.last_error || {}
        console.error('聊天失败详情:', errorInfo)
        console.error('失败的完整数据:', data.data)
        throw new Error(`聊天失败: ${errorInfo.msg || '未知错误'} (错误码: ${errorInfo.code || 'N/A'})`)
      }
      
      // 处理聊天完成事件
      if (data.event === 'conversation.chat.completed') {
        console.log('聊天完成')
        continue
      }
      
      // 处理消息内容 - 根据文档，应该监听 conversation.message.completed
      if (data.event === 'conversation.message.completed') {
        const msgData = data.data
        console.log('收到完整消息:', msgData?.type, '内容长度:', msgData?.content?.length || 0)
        
        // 只处理 type=answer 的消息（agent回复）
        if (msgData?.type === 'answer') {
          const content = msgData.content || ''
          if (content) {
            // 对于完整消息，直接设置而不是追加
            fullResponse = content
            console.log('准备调用onChunk，内容:', content.substring(0, 100) + '...')
            if (onChunk) {
              console.log('调用onChunk回调')
              onChunk(content, fullResponse)
            } else {
              console.log('onChunk回调为空')
            }
          }
        }
      }
      
      // 处理流式消息片段
      if (data.event === 'conversation.message.delta') {
        const msgData = data.data
        // 只处理 type=answer 的消息片段
        if (msgData?.type === 'answer') {
          const content = msgData.content || ''
          if (content) {
            fullResponse += content
            if (onChunk) {
              onChunk(content, fullResponse)
            }
          }
        }
      }
      
      // 处理错误事件
      if (data.event === 'error') {
        const errorMsg = data.data?.msg || data.data?.message || '未知错误'
        console.error('API错误:', data.data)
        throw new Error(`Coze API 错误: ${errorMsg}`)
      }
    }
    
    return fullResponse || '抱歉，我没有收到有效的回复。'
  } catch (error) {
    console.error('=== 发生错误 ===')
    console.error('错误类型:', error.name)
    console.error('错误消息:', error.message)
    console.error('错误堆栈:', error.stack)
    throw error
  }
}

// 静默发送消息到Coze（不显示在聊天框中）
export const sendSilentMessageToCoze = async (message, chatHistory = []) => {
  try {
    console.log('=== 静默发送消息到Coze ===')
    console.log('消息内容:', message)
    
    // 构建完整的消息上下文
    const messages = []
    
    // 添加历史消息（最近的10条对话）
    const recentHistory = chatHistory
      .filter(msg => (msg.type === 'user' || msg.type === 'assistant') && !msg.isError && msg.isComplete)
      .slice(-10)
    
    // 转换历史消息格式
    recentHistory.forEach(msg => {
      if (msg.type === 'user') {
        messages.push({
          role: 'user',
          content: msg.content,
          content_type: 'text'
        })
      } else if (msg.type === 'assistant') {
        messages.push({
          role: 'assistant',
          content: msg.content,
          content_type: 'text'
        })
      }
    })
    
    // 添加当前消息
    messages.push({
      role: 'user',
      content: message,
      content_type: 'text'
    })
    
    const params = {
      bot_id: '7513529977745915905', // 使用指定的润色bot_id
      user_id: USER_ID,
      additional_messages: messages,
      stream: true, // 当auto_save_history=false时，必须设置stream=true
      auto_save_history: false // 不保存历史记录
    }
    
    console.log('静默请求参数:', params)
    
    const stream = await apiClient.chat.stream(params)
    let fullResponse = ''
    
    for await (const data of stream) {
      console.log('静默收到流数据:', data)
      
      // 处理聊天失败事件
      if (data.event === 'conversation.chat.failed') {
        const errorInfo = data.data?.last_error || {}
        console.error('静默聊天失败详情:', errorInfo)
        throw new Error(`聊天失败: ${errorInfo.msg || '未知错误'} (错误码: ${errorInfo.code || 'N/A'})`)
      }
      
      // 处理消息内容 - 完整消息
      if (data.event === 'conversation.message.completed') {
        const msgData = data.data
        console.log('静默收到消息:', msgData)
        
        // 只处理 type=answer 的消息（agent回复）
        if (msgData?.type === 'answer') {
          const content = msgData.content || ''
          if (content) {
            fullResponse = content
          }
        }
      }
      
      // 处理流式消息片段
      if (data.event === 'conversation.message.delta') {
        const msgData = data.data
        // 只处理 type=answer 的消息片段
        if (msgData?.type === 'answer') {
          const content = msgData.content || ''
          if (content) {
            fullResponse += content
          }
        }
      }
      
      // 处理错误事件
      if (data.event === 'error') {
        const errorMsg = data.data?.msg || data.data?.message || '未知错误'
        console.error('静默API错误:', data.data)
        throw new Error(`Coze API 错误: ${errorMsg}`)
      }
    }
    
    return fullResponse || '抱歉，我没有收到有效的回复。'
  } catch (error) {
    console.error('=== 静默发送消息错误 ===')
    console.error('错误类型:', error.name)
    console.error('错误消息:', error.message)
    console.error('错误堆栈:', error.stack)
    throw error
  }
} 