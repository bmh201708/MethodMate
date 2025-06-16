// CORE API 配置 - 从环境变量获取
const CORE_API_KEY = process.env.CORE_API_KEY
const CORE_API_BASE = 'https://api.core.ac.uk/v3'

// Coze API 配置 - 用于提取研究方法
const COZE_API_TOKEN = process.env.COZE_API_KEY
const COZE_API_BASE = 'https://api.coze.com'
const BOT_ID = process.env.COZE_BOT_ID || '7507577087193710608'
const USER_ID = process.env.COZE_USER_ID || '7505301221562023954'

export const config = {
  runtime: 'edge',
}

// 使用标题搜索CORE API的辅助函数
const searchCoreByTitle = async (title) => {
  try {
    const searchResponse = await fetch(`${CORE_API_BASE}/search/works`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CORE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        q: title,
        limit: 1,
        fields: ['title', 'fullText', 'abstract']
      }),
      signal: AbortSignal.timeout(10000) // 10秒超时
    });
    
    if (!searchResponse.ok) {
      console.error(`CORE API标题搜索错误响应 (${searchResponse.status})`);
      return null;
    }

    const result = await searchResponse.json();
    
    if (result.results && result.results.length > 0) {
      const paper = result.results[0];
      if (paper.fullText) {
        return paper.fullText;
      } else if (paper.abstract) {
        console.log('标题搜索未找到全文，使用摘要代替');
        return paper.abstract;
      }
    }
    
    return null;
  } catch (error) {
    console.error('标题搜索出错:', error);
    return null;
  }
};

// 使用DOI搜索CORE API的辅助函数
const searchCoreByDOI = async (doi) => {
  try {
    // 清理DOI格式，移除可能的前缀
    const cleanDOI = doi.replace(/^(doi:|DOI:)/i, '').trim();
    
    const searchResponse = await fetch(`${CORE_API_BASE}/search/works`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CORE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        q: `doi:"${cleanDOI}"`,
        limit: 1,
        fields: ['title', 'fullText', 'abstract', 'doi']
      }),
      signal: AbortSignal.timeout(10000)
    });
    
    if (!searchResponse.ok) {
      console.error(`CORE API DOI搜索错误响应 (${searchResponse.status})`);
      return null;
    }

    const result = await searchResponse.json();
    
    if (result.results && result.results.length > 0) {
      const paper = result.results[0];
      if (paper.fullText) {
        return paper.fullText;
      } else if (paper.abstract) {
        console.log('DOI搜索未找到全文，使用摘要代替');
        return paper.abstract;
      }
    }
    
    return null;
  } catch (error) {
    console.error('DOI搜索出错:', error);
    return null;
  }
};

// 从CORE API获取论文全文
const getFullTextFromCore = async (title, doi = null, retries = 3) => {
  try {
    console.log(`正在从CORE API获取论文全文，标题: "${title}"${doi ? `，DOI: "${doi}"` : ''}，剩余重试次数: ${retries}`);
    
    // 添加请求间隔，避免API限流
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 首先使用标题搜索论文
    const titleResult = await searchCoreByTitle(title);
    if (titleResult) {
      console.log('通过标题找到论文全文');
      return titleResult;
    }
    
    // 如果标题搜索失败且有DOI，尝试使用DOI搜索
    if (doi) {
      console.log(`标题搜索未找到结果，尝试使用DOI搜索: "${doi}"`);
      const doiResult = await searchCoreByDOI(doi);
      if (doiResult) {
        console.log('通过DOI找到论文全文');
        return doiResult;
      }
    }
    
    console.log('未找到相关论文信息');
    return null;
  } catch (error) {
    console.error('从CORE获取全文时出错:', error);
    
    // 如果还有重试次数，则重试
    if (retries > 0) {
      console.log(`CORE API请求失败，2秒后重试，剩余重试次数: ${retries - 1}`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return getFullTextFromCore(title, doi, retries - 1);
    }
    
    return null;
  }
};

// 使用Coze API提取研究方法
const extractResearchMethod = async (fullText) => {
  try {
    if (!fullText || fullText.length < 100) {
      return null;
    }

    // 限制文本长度，避免API超时
    const textLimit = 8000;
    let processText = fullText.length > textLimit ? fullText.substring(0, textLimit) : fullText;

    const prompt = `请从以下学术论文文本中提取研究方法信息。请重点关注：
1. 研究设计（实验设计、调查设计等）
2. 数据收集方法
3. 样本/参与者信息
4. 数据分析方法
5. 研究工具和测量

请简洁地总结研究方法，控制在200字以内：

${processText}`;

    const response = await fetch(`${COZE_API_BASE}/open_api/v2/chat`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${COZE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversation_id: `method_extract_${Date.now()}`,
        bot_id: BOT_ID,
        user: USER_ID,
        query: prompt,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`Coze API error: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.code !== 0) {
      throw new Error(result.msg || 'Coze API调用失败');
    }

    // 提取回复内容
    let methodSummary = '';
    if (result.messages && result.messages.length > 0) {
      const lastMessage = result.messages[result.messages.length - 1];
      if (lastMessage.type === 'answer' && lastMessage.content) {
        methodSummary = lastMessage.content;
      }
    }

    return methodSummary || null;
  } catch (error) {
    console.error('提取研究方法失败:', error);
    return null;
  }
};

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
    const { title, doi } = data

    if (!title) {
      return new Response(JSON.stringify({
        success: false,
        error: '需要提供论文标题'
      }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
    }

    console.log('开始获取论文全文和研究方法，标题:', title, doi ? `，DOI: ${doi}` : '');
    
    // 获取全文，传递DOI参数
    const fullText = await getFullTextFromCore(title, doi, 3);
    let researchMethod = null;
    
    if (fullText) {
      // 如果成功获取全文，尝试提取研究方法
      researchMethod = await extractResearchMethod(fullText);
    }

    return new Response(JSON.stringify({
      success: true,
      title: title,
      doi: doi,
      fullText: fullText,
      researchMethod: researchMethod,
      hasContent: !!fullText
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })

  } catch (error) {
    console.error('获取论文内容错误:', error)
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message || '获取论文内容失败'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }
} 