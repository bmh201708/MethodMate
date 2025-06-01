export const config = {
  runtime: 'edge',
}

// Google Scholar 搜索API
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

    // 构建Google Scholar搜索URL
    const searchUrl = `https://scholar.google.com/scholar?q=${encodeURIComponent(query)}&hl=${lang}&num=${num_results}`
    
    // 由于跨域限制，我们使用一个代理服务或者爬虫服务
    // 这里我们模拟返回搜索结果
    const mockResults = await mockScholarSearch(query, num_results)

    return new Response(JSON.stringify({
      success: true,
      query: query,
      results: mockResults,
      total_results: mockResults.length
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

// 模拟Google Scholar搜索结果
async function mockScholarSearch(query, numResults) {
  // 在实际应用中，这里应该调用真实的搜索服务
  // 可以使用SerpAPI、ScraperAPI等服务来获取Google Scholar数据
  
  const baseResults = [
    {
      title: "深度学习在自然语言处理中的应用研究",
      authors: ["张三", "李四", "王五"],
      journal: "计算机科学",
      year: "2023",
      citations: 156,
      summary: "本文综述了深度学习技术在自然语言处理领域的最新进展，包括预训练模型、注意力机制等关键技术...",
      pdf_url: "https://example.com/papers/paper1.pdf",
      scholar_url: "https://scholar.google.com/citations?view_op=view_citation&hl=zh-CN&user=example",
      doi: "10.1234/example.2023.001"
    },
    {
      title: "基于机器学习的文献检索系统设计与实现",
      authors: ["赵六", "钱七"],
      journal: "信息科学",
      year: "2022",
      citations: 89,
      summary: "提出了一种基于机器学习的智能文献检索系统，能够根据用户查询意图自动推荐相关文献...",
      pdf_url: "https://example.com/papers/paper2.pdf",
      scholar_url: "https://scholar.google.com/citations?view_op=view_citation&hl=zh-CN&user=example2",
      doi: "10.1234/example.2022.002"
    },
    {
      title: "人工智能技术在学术搜索中的应用",
      authors: ["孙八", "周九", "吴十"],
      journal: "人工智能",
      year: "2023",
      citations: 234,
      summary: "分析了人工智能技术在学术文献搜索和推荐系统中的应用现状和发展趋势...",
      pdf_url: "https://example.com/papers/paper3.pdf",
      scholar_url: "https://scholar.google.com/citations?view_op=view_citation&hl=zh-CN&user=example3",
      doi: "10.1234/example.2023.003"
    }
  ]

  // 根据查询词过滤和调整结果
  return baseResults
    .map(result => ({
      ...result,
      title: result.title.includes(query) ? result.title : `${query}相关研究：${result.title}`,
      relevance_score: Math.random() * 0.3 + 0.7 // 0.7-1.0之间的相关性分数
    }))
    .slice(0, numResults)
    .sort((a, b) => b.relevance_score - a.relevance_score)
} 