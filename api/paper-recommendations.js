/**
 * Semantic Scholar 智能文献推荐 API
 * 基于种子论文推荐相关文献
 */

export default async function handler(req, res) {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: '仅支持 POST 方法',
      success: false 
    });
  }

  try {
    const { 
      positivePaperIds = [], 
      negativePaperIds = [], 
      limit = 10,
      fields = 'title,authors,year,citationCount,abstract'
    } = req.body;

    console.log('收到推荐请求:', { 
      positivePaperIds, 
      negativePaperIds, 
      limit, 
      fields,
      requestBody: req.body 
    });

    // 验证输入参数
    if (!positivePaperIds || positivePaperIds.length === 0) {
      return res.status(400).json({
        error: '至少需要提供一个正面种子论文ID',
        success: false
      });
    }

    if (limit > 500) {
      return res.status(400).json({
        error: '推荐数量不能超过500篇',
        success: false
      });
    }

    // 清理并验证字段参数，只使用API支持的字段
    const validFields = [
      'paperId', 'title', 'authors', 'year', 'citationCount', 
      'abstract', 'url', 'venue', 'publicationVenue', 'journal',
      'openAccessPdf', 'isOpenAccess', 'fieldsOfStudy'
    ];
    
    const requestedFields = fields.split(',').map(f => f.trim());
    const supportedFields = requestedFields.filter(field => validFields.includes(field));
    
    if (supportedFields.length === 0) {
      supportedFields.push('title', 'authors');
    }
    
    const cleanFields = supportedFields.join(',');
    console.log('原始字段:', fields);
    console.log('清理后字段:', cleanFields);

    // 根据官方API规范构建正确的URL
    const baseUrl = 'https://api.semanticscholar.org/recommendations/v1/papers/';
    const queryParams = new URLSearchParams({
      fields: cleanFields,
      limit: limit.toString()
    });

    const requestBody = {
      positivePaperIds: positivePaperIds,
      negativePaperIds: negativePaperIds || []
    };

    console.log('调用 Semantic Scholar 推荐 API:', {
      url: `${baseUrl}?${queryParams}`,
      body: requestBody
    });

    // 准备请求头
    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': 'MethodMate/1.0 (https://method-mate.vercel.app)',
      'Accept': 'application/json'
    };

    // 如果有API密钥，则使用
    if (process.env.SEMANTIC_SCHOLAR_API_KEY) {
      headers['x-api-key'] = process.env.SEMANTIC_SCHOLAR_API_KEY;
      console.log('使用API密钥');
    } else {
      console.log('未配置API密钥，使用匿名访问');
    }

    // 调用 Semantic Scholar Recommendations API（注意URL末尾的斜杠）
    console.log('开始调用API...');
    const response = await fetch(`${baseUrl}?${queryParams}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody),
      timeout: 30000 // 30秒超时
    });

    console.log('Semantic Scholar API 响应状态:', response.status, response.statusText);
    console.log('响应头:', Object.fromEntries([...response.headers.entries()]));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Semantic Scholar API 错误详情:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries([...response.headers.entries()]),
        body: errorText
      });
      
      if (response.status === 429) {
        return res.status(429).json({
          error: '请求频率过高，请稍后再试',
          success: false,
          details: 'API请求频率限制'
        });
      } else if (response.status === 401 || response.status === 403) {
        return res.status(500).json({
          error: 'API访问需要认证，推荐功能可能需要API密钥',
          success: false,
          details: `认证错误 (${response.status}): ${errorText}`,
          suggestion: '请联系管理员配置Semantic Scholar API密钥'
        });
      } else if (response.status === 400) {
        return res.status(400).json({
          error: '请求参数错误',
          success: false,
          details: errorText,
          requestBody: requestBody,
          fields: cleanFields
        });
      } else if (response.status === 404) {
        return res.status(400).json({
          error: '种子论文未找到，请检查论文ID是否正确',
          success: false,
          details: errorText,
          positivePaperIds: positivePaperIds
        });
      } else {
        return res.status(500).json({
          error: `推荐 API 调用失败 (${response.status})`,
          success: false,
          details: errorText,
          apiUrl: `${baseUrl}?${queryParams}`,
          requestHeaders: headers,
          requestBody: requestBody
        });
      }
    }

    console.log('开始解析响应...');
    const data = await response.json();
    console.log('API 响应数据结构:', { 
      hasRecommendations: !!data.recommendedPapers,
      count: data.recommendedPapers?.length || 0,
      keys: Object.keys(data)
    });
    
    // 处理推荐结果
    const recommendations = data.recommendedPapers || [];
    
    if (recommendations.length === 0) {
      return res.status(200).json({
        success: true,
        totalRecommendations: 0,
        seedPapers: {
          positive: positivePaperIds.length,
          negative: negativePaperIds.length
        },
        recommendations: [],
        metadata: {
          searchTime: new Date().toISOString(),
          algorithm: 'Semantic Scholar ML Recommendations',
          confidence: 'low',
          message: '未找到相关推荐，请尝试使用不同的种子论文',
          fieldsUsed: cleanFields
        }
      });
    }
    
    // 按引用数排序（可选）
    const sortedRecommendations = recommendations.sort((a, b) => {
      return (b.citationCount || 0) - (a.citationCount || 0);
    });

    // 增强推荐结果，添加相关性得分和分类
    const enhancedRecommendations = sortedRecommendations.map((paper, index) => ({
      ...paper,
      relevanceScore: Math.max(0.9 - (index * 0.1), 0.1), // 模拟相关性得分
      recommendationReason: getRecommendationReason(paper, index),
      category: classifyPaper(paper),
      downloadSources: generateDownloadSources(paper)
    }));

    console.log('成功处理推荐请求，返回', enhancedRecommendations.length, '篇论文');

    return res.status(200).json({
      success: true,
      totalRecommendations: enhancedRecommendations.length,
      seedPapers: {
        positive: positivePaperIds.length,
        negative: negativePaperIds.length
      },
      recommendations: enhancedRecommendations,
      metadata: {
        searchTime: new Date().toISOString(),
        algorithm: 'Semantic Scholar ML Recommendations',
        confidence: 'high',
        fieldsUsed: cleanFields
      }
    });

  } catch (error) {
    console.error('推荐 API 内部错误:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    return res.status(500).json({
      error: '服务器内部错误，请稍后重试',
      success: false,
      details: error.message,
      errorType: error.name,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

/**
 * 生成推荐理由
 */
function getRecommendationReason(paper, index) {
  const reasons = [
    '与种子论文高度相关',
    '引用数较高，影响力较大',
    '来自权威期刊或会议',
    '研究方法相似',
    '同领域重要研究',
    '最新相关研究成果',
    '相关作者的其他工作',
    '交叉引用频繁'
  ];
  
  if (paper.citationCount > 100) {
    return '高引用论文，影响力较大';
  } else if (index < 3) {
    return '与种子论文高度相关';
  } else {
    return reasons[index % reasons.length];
  }
}

/**
 * 论文分类
 */
function classifyPaper(paper) {
  const title = (paper.title || '').toLowerCase();
  const abstract = (paper.abstract || '').toLowerCase();
  const text = title + ' ' + abstract;

  if (text.includes('deep learning') || text.includes('neural network')) {
    return '深度学习';
  } else if (text.includes('machine learning') || text.includes('artificial intelligence')) {
    return '机器学习';
  } else if (text.includes('natural language') || text.includes('nlp')) {
    return '自然语言处理';
  } else if (text.includes('computer vision') || text.includes('image')) {
    return '计算机视觉';
  } else if (text.includes('data mining') || text.includes('big data')) {
    return '数据挖掘';
  } else {
    return '其他';
  }
}

/**
 * 生成下载源链接
 */
function generateDownloadSources(paper) {
  const sources = [];
  
  // 添加 Semantic Scholar 链接
  if (paper.url) {
    sources.push({
      source: 'Semantic Scholar',
      url: paper.url,
      type: 'html',
      free: true,
      description: '查看论文详情和引用信息'
    });
  }
  
  // 添加开放获取 PDF
  if (paper.openAccessPdf?.url) {
    sources.push({
      source: 'Open Access PDF',
      url: paper.openAccessPdf.url,
      type: 'pdf',
      free: true,
      description: '免费 PDF 全文'
    });
  }
  
  // 添加 DOI 链接
  if (paper.doi) {
    sources.push({
      source: 'DOI',
      url: `https://doi.org/${paper.doi}`,
      type: 'html',
      free: false,
      description: '官方发布页面'
    });
  }
  
  return sources;
} 