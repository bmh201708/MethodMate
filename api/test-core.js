// CORE API 配置 - 从环境变量获取
const CORE_API_KEY = process.env.CORE_API_KEY
const CORE_API_BASE = 'https://api.core.ac.uk/v3'

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
      const errorText = await searchResponse.text();
      console.error(`CORE API标题搜索错误响应 (${searchResponse.status}):`, errorText);
      return null;
    }

    const result = await searchResponse.json();
    console.log('CORE API标题搜索结果:', JSON.stringify(result, null, 2));
    
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
      const errorText = await searchResponse.text();
      console.error(`CORE API DOI搜索错误响应 (${searchResponse.status}):`, errorText);
      return null;
    }

    const result = await searchResponse.json();
    console.log('CORE API DOI搜索结果:', JSON.stringify(result, null, 2));
    
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
const getFullTextFromCore = async (title, doi = null) => {
  try {
    console.log(`测试CORE API，搜索标题: "${title}"${doi ? `，DOI: "${doi}"` : ''}`);
    
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

    console.log('测试CORE API，搜索标题:', title, doi ? `，DOI: ${doi}` : '');
    const fullText = await getFullTextFromCore(title, doi);

    return new Response(JSON.stringify({
      success: true,
      title: title,
      doi: doi,
      fullText: fullText,
      hasContent: !!fullText
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })

  } catch (error) {
    console.error('CORE API测试错误:', error)
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'CORE API测试失败'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }
} 