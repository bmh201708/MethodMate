export const config = {
  runtime: 'edge',
}

// Semantic Scholar 搜索API
export default async function handler(request) {
  // 处理 CORS
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
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
    const { query, num_results = 10, lang = 'zh-CN' } = data

    if (!query) {
      return new Response(JSON.stringify({ error: 'Query parameter is required' }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
    }

    // 构建 Semantic Scholar API 请求
    const fields = 'title,authors,abstract,year,citationCount,venue,url,openAccessPdf,doi'
    const searchUrl = `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(query)}&limit=${num_results}&fields=${fields}`

    const response = await fetch(searchUrl, {
      headers: {
        'Accept': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error(`Semantic Scholar API error: ${response.statusText}`)
    }

    const searchData = await response.json()
    
    // 转换结果格式以匹配前端期望的结构
    const results = searchData.data.map(paper => ({
      title: paper.title || '',
      authors: paper.authors?.map(author => author.name) || [],
      journal: paper.venue || '',
      year: paper.year?.toString() || '',
      citations: paper.citationCount || 0,
      summary: paper.abstract || '',
      pdf_url: paper.openAccessPdf?.url || null,
      scholar_url: paper.url || '',
      doi: paper.doi || '',
      relevance_score: 0.9 // Semantic Scholar API 目前不返回相关性分数
    }))

    return new Response(JSON.stringify({
      success: true,
      query: query,
      results: results,
      total_results: results.length
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })

  } catch (error) {
    console.error('Scholar Search Error:', error)
    
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }
}
