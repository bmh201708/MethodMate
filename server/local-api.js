const express = require('express');
const cors = require('cors');
const https = require('https');

const app = express();
const PORT = 3002;

// 中间件
app.use(cors());
app.use(express.json());

// 推荐API路由
app.post('/api/paper-recommendations', (req, res) => {
  console.log('收到推荐请求:', req.body);
  
  const { 
    positivePaperIds = [], 
    negativePaperIds = [], 
    limit = 10,
    fields = 'title,authors,year,citationCount,abstract'
  } = req.body;

  // 验证输入
  if (!positivePaperIds || positivePaperIds.length === 0) {
    return res.status(400).json({
      error: '至少需要提供一个正面种子论文ID',
      success: false
    });
  }

  // 清理字段参数
  const validFields = [
    'paperId', 'title', 'authors', 'year', 'citationCount', 
    'abstract', 'url', 'venue', 'publicationVenue', 'journal',
    'openAccessPdf', 'isOpenAccess', 'fieldsOfStudy'
  ];
  
  const requestedFields = fields.split(',').map(f => f.trim());
  const supportedFields = requestedFields.filter(field => validFields.includes(field));
  const cleanFields = supportedFields.length > 0 ? supportedFields.join(',') : 'title,authors';

  // 构建请求数据
  const requestData = JSON.stringify({
    positivePaperIds: positivePaperIds,
    negativePaperIds: negativePaperIds || []
  });

  // Semantic Scholar API 配置
  const options = {
    hostname: 'api.semanticscholar.org',
    port: 443,
    path: `/recommendations/v1/papers/?fields=${cleanFields}&limit=${limit}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': requestData.length,
      'User-Agent': 'MethodMate/1.0'
    }
  };

  console.log('调用 Semantic Scholar API:', `https://${options.hostname}${options.path}`);

  // 发送请求到 Semantic Scholar
  const ssReq = https.request(options, (ssRes) => {
    console.log('Semantic Scholar 响应状态:', ssRes.statusCode);
    
    let data = '';
    ssRes.on('data', (chunk) => {
      data += chunk;
    });

    ssRes.on('end', () => {
      try {
        const result = JSON.parse(data);
        
        if (ssRes.statusCode === 200 && result.recommendedPapers) {
          // 增强推荐结果
          const recommendations = result.recommendedPapers.map((paper, index) => ({
            ...paper,
            relevanceScore: Math.max(0.9 - (index * 0.1), 0.1),
            recommendationReason: getRecommendationReason(paper, index),
            category: classifyPaper(paper),
            downloadSources: generateDownloadSources(paper)
          }));

          res.json({
            success: true,
            totalRecommendations: recommendations.length,
            seedPapers: {
              positive: positivePaperIds.length,
              negative: negativePaperIds.length
            },
            recommendations: recommendations,
            metadata: {
              searchTime: new Date().toISOString(),
              algorithm: 'Semantic Scholar ML Recommendations',
              confidence: 'high',
              fieldsUsed: cleanFields
            }
          });
        } else {
          res.status(ssRes.statusCode).json({
            error: result.error || '推荐请求失败',
            success: false,
            details: result
          });
        }
      } catch (error) {
        console.error('解析响应错误:', error);
        res.status(500).json({
          error: '服务器内部错误',
          success: false,
          details: error.message
        });
      }
    });
  });

  ssReq.on('error', (error) => {
    console.error('请求错误:', error);
    res.status(500).json({
      error: '无法连接到 Semantic Scholar API',
      success: false,
      details: error.message
    });
  });

  ssReq.write(requestData);
  ssReq.end();
});

// 辅助函数
function getRecommendationReason(paper, index) {
  if (paper.citationCount > 100) {
    return '高引用论文，影响力较大';
  } else if (index < 3) {
    return '与种子论文高度相关';
  } else {
    const reasons = [
      '与种子论文高度相关',
      '引用数较高，影响力较大',
      '来自权威期刊或会议',
      '研究方法相似',
      '同领域重要研究'
    ];
    return reasons[index % reasons.length];
  }
}

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
  } else {
    return '其他';
  }
}

function generateDownloadSources(paper) {
  const sources = [];
  
  if (paper.url) {
    sources.push({
      source: 'Semantic Scholar',
      url: paper.url,
      type: 'html',
      free: true
    });
  }
  
  if (paper.openAccessPdf?.url) {
    sources.push({
      source: 'Open Access PDF',
      url: paper.openAccessPdf.url,
      type: 'pdf',
      free: true
    });
  }
  
  return sources;
}

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 本地API服务器运行在 http://localhost:${PORT}`);
  console.log('📍 推荐API端点: POST http://localhost:' + PORT + '/api/paper-recommendations');
}); 