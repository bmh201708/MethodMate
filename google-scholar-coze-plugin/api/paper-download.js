export const config = {
  runtime: 'edge',
}

// 文献下载API
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
    const { paper_url, doi, title } = data

    if (!paper_url && !doi) {
      return new Response(JSON.stringify({ error: 'Paper URL or DOI is required' }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
    }

    // 尝试从多个来源获取全文
    const downloadSources = await findPaperSources(paper_url, doi, title)

    return new Response(JSON.stringify({
      success: true,
      title: title,
      download_sources: downloadSources,
      message: downloadSources.length > 0 ? '找到可用的下载源' : '未找到免费的全文下载源'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })

  } catch (error) {
    console.error('Paper Download Error:', error)
    
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

// 查找文献的多个下载源
async function findPaperSources(paperUrl, doi, title) {
  const sources = []

  // 1. 直接PDF链接
  if (paperUrl && paperUrl.endsWith('.pdf')) {
    sources.push({
      source: 'Direct PDF',
      url: paperUrl,
      type: 'pdf',
      free: true,
      description: '直接PDF下载链接'
    })
  }

  // 2. Sci-Hub (镜像站点)
  if (doi) {
    const scihubMirrors = [
      'https://sci-hub.se/',
      'https://sci-hub.st/',
      'https://sci-hub.ru/'
    ]
    
    for (const mirror of scihubMirrors) {
      sources.push({
        source: 'Sci-Hub',
        url: `${mirror}${doi}`,
        type: 'pdf',
        free: true,
        description: 'Sci-Hub免费下载'
      })
    }
  }

  // 3. arXiv (如果是arXiv论文)
  if (paperUrl && paperUrl.includes('arxiv.org')) {
    const arxivId = extractArxivId(paperUrl)
    if (arxivId) {
      sources.push({
        source: 'arXiv',
        url: `https://arxiv.org/pdf/${arxivId}.pdf`,
        type: 'pdf',
        free: true,
        description: 'arXiv免费下载'
      })
    }
  }

  // 4. PubMed Central
  if (doi) {
    sources.push({
      source: 'PubMed Central',
      url: `https://www.ncbi.nlm.nih.gov/pmc/articles/pmid/${doi}`,
      type: 'html',
      free: true,
      description: 'PubMed Central免费阅读'
    })
  }

  // 5. ResearchGate
  if (title) {
    const searchQuery = encodeURIComponent(title)
    sources.push({
      source: 'ResearchGate',
      url: `https://www.researchgate.net/search/publication?q=${searchQuery}`,
      type: 'search',
      free: false,
      description: 'ResearchGate搜索结果'
    })
  }

  // 6. 学术搜索引擎
  sources.push({
    source: 'Semantic Scholar',
    url: `https://www.semanticscholar.org/search?q=${encodeURIComponent(title || doi)}`,
    type: 'search',
    free: false,
    description: 'Semantic Scholar搜索'
  })

  // 7. 开放获取检查
  if (doi) {
    sources.push({
      source: 'Unpaywall',
      url: `https://api.unpaywall.org/v2/${doi}?email=your-email@example.com`,
      type: 'api',
      free: true,
      description: '检查开放获取版本'
    })
  }

  return sources
}

// 提取arXiv ID
function extractArxivId(url) {
  const match = url.match(/arxiv\.org\/(?:abs\/|pdf\/)?(\d+\.\d+)/);
  return match ? match[1] : null;
}

// 生成文献阅读器URL
export function generateReaderUrl(pdfUrl, title) {
  // 可以集成PDF.js或其他在线PDF阅读器
  return {
    reader_url: `/pdf-reader?url=${encodeURIComponent(pdfUrl)}&title=${encodeURIComponent(title)}`,
    viewer_options: [
      {
        name: 'PDF.js Viewer',
        url: `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(pdfUrl)}`
      },
      {
        name: 'Google Docs Viewer',
        url: `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`
      }
    ]
  }
} 