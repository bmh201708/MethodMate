import express from 'express';
import cors from 'cors';
import https from 'https';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 加载.env文件
dotenv.config({ path: join(__dirname, '..', '.env') });

const app = express();
const PORT = 3002;

// API配置
const SEMANTIC_API_BASE = 'https://api.semanticscholar.org/graph/v1';
const CORE_API_BASE = 'https://api.core.ac.uk/v3';
const CORE_API_KEY = process.env.CORE_API_KEY;
const SEMANTIC_API_KEY = process.env.SEMANTIC_API_KEY || '';

// 简单的重试函数
const fetchWithRetry = async (url, options, retries = 3, delay = 1000) => {
  try {
    return await fetch(url, options);
  } catch (err) {
    if (retries <= 1) throw err;
    await new Promise(resolve => setTimeout(resolve, delay));
    return fetchWithRetry(url, options, retries - 1, delay * 2);
  }
};

if (!CORE_API_KEY) {
  console.warn('CORE_API_KEY not found in environment variables');
  console.log('Available environment variables:', Object.keys(process.env).filter(key => !key.includes('SECRET')));
} else {
  console.log('CORE_API_KEY found:', CORE_API_KEY.substring(0, 4) + '...');
}

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname, '..', 'public')));

// 添加根路由重定向到测试页面
app.get('/', (req, res) => {
  res.redirect('/test-core-api.html');
});

// 从CORE API获取论文全文
const getFullTextFromCore = async (title) => {
  try {
    console.log(`正在从CORE API获取论文全文，标题: "${title}"`);
    
    // 使用标题搜索论文
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
      })
    });

    if (!searchResponse.ok) {
      const errorText = await searchResponse.text();
      console.error(`CORE API错误响应 (${searchResponse.status}):`, errorText);
      throw new Error(`CORE API responded with status: ${searchResponse.status}`);
    }

    const result = await searchResponse.json();
    console.log('CORE API搜索结果:', JSON.stringify(result, null, 2));
    
    if (result.results && result.results.length > 0) {
      // 如果有全文就返回全文，否则返回摘要
      const paper = result.results[0];
      if (paper.fullText) {
        console.log('找到论文全文');
        return paper.fullText;
      } else if (paper.abstract) {
        console.log('未找到全文，使用摘要代替');
        return paper.abstract;
      }
    }
    
    console.log('未找到相关论文信息');
    return null;
  } catch (error) {
    console.error('从CORE获取全文时出错:', error);
    console.error('错误堆栈:', error.stack);
    return null;
  }
};

// 解析语义学术API响应
const parseSemanticResponse = async (papers) => {
  const parsedPapers = [];
  
  for (const paper of papers) {
    // 添加延迟，避免请求过于频繁
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 获取论文全文
    const fullText = await getFullTextFromCore(paper.title);
    
    parsedPapers.push({
      title: paper.title,
      abstract: paper.abstract || '暂无摘要',
      downloadUrl: (paper.openAccessPdf && paper.openAccessPdf.url) || paper.url || null,
      // 添加额外的语义学术特有信息
      year: paper.year,
      citationCount: paper.citationCount,
      authors: (paper.authors && paper.authors.map(author => author.name).join(', ')) || '未知作者',
      // 添加全文字段
      fullText: fullText || null
    });
  }
  
  return parsedPapers;
};

// Scholar Search API路由
app.post('/api/scholar-search', async (req, res) => {
  console.log('Scholar Search API被调用');
  
  try {
    const { query, num_results = 10, lang = 'zh-CN' } = req.body;
    
    if (!query) {
      return res.status(400).json({ 
        success: false,
        error: 'Query parameter is required' 
      });
    }

    console.log(`执行学术搜索，查询: "${query}", 结果数: ${num_results}, 语言: ${lang}`);
    
    // 构建 Semantic Scholar API 请求
    // 根据最新的API文档调整字段，移除不支持的doi字段
    const fields = 'title,authors,abstract,year,citationCount,venue,url,openAccessPdf,externalIds';
    const searchUrl = `${SEMANTIC_API_BASE}/paper/search?query=${encodeURIComponent(query)}&limit=${num_results}&fields=${fields}`;
    
    console.log('请求URL:', searchUrl);
    
    // 准备请求头
    const headers = {
      'Accept': 'application/json',
    };
    
    
    
    // 使用重试机制发送请求
    const response = await fetchWithRetry(searchUrl, {
      headers: headers
    }, 3, 1000); // 最多重试3次，初始延迟1秒

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Semantic Scholar API错误响应 (${response.status}):`, errorText);
      throw new Error(`Semantic Scholar API responded with status: ${response.status}`);
    }

    const searchData = await response.json();
    console.log('Semantic Scholar API响应:', JSON.stringify(searchData, null, 2));
    
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
      doi: paper.externalIds?.DOI || '',
      relevance_score: 0.9 // Semantic Scholar API 目前不返回相关性分数
    }));

    res.json({
      success: true,
      query: query,
      results: results,
      total_results: results.length
    });
  } catch (error) {
    console.error('Scholar Search Error:', error);
    console.error('Error stack:', error.stack);
    
    res.status(500).json({ 
      success: false,
      error: error.message
    });
  }
});

// 语义推荐API路由
app.post('/api/semantic-recommend', async (req, res) => {
  console.log('语义推荐API被调用');
  
  try {
    const { chatHistory = [] } = req.body;
    console.log('接收到的数据:', JSON.stringify(req.body, null, 2));
    
    // 从聊天历史中提取关键词
    let searchQuery = '';
    
    // 如果有有效的聊天历史，从中提取关键信息
    const validHistory = chatHistory.filter(msg => 
      msg.type === 'user' || (msg.type === 'assistant' && !msg.isError)
    );
    
    if (validHistory.length > 1) {
      // 从最近的对话中提取关键词
      const recentHistory = validHistory.slice(-4); // 只取最近4条消息
      searchQuery = recentHistory
        .map(msg => msg.content)
        .join(' ')
        .replace(/[^\w\s]/g, ' ') // 移除标点符号
        .split(/\s+/)
        .filter(word => word.length > 2) // 过滤掉太短的词
        .slice(0, 10) // 只取前10个关键词
        .join(' ');
    } else {
      // 默认搜索研究方法相关文献
      searchQuery = 'research methodology quantitative analysis experimental design';
    }

    console.log('构建的搜索查询:', searchQuery);

    // 调用Semantic Scholar API搜索相关论文
    const searchResponse = await fetch(
      `${SEMANTIC_API_BASE}/paper/search?query=${encodeURIComponent(searchQuery)}&limit=5&fields=title,abstract,url,openAccessPdf,year,citationCount,authors`,
      {
        headers: {
          'Accept': 'application/json',
        }
      }
    );

    if (!searchResponse.ok) {
      const errorText = await searchResponse.text();
      console.error('Semantic Scholar API错误响应:', errorText);
      throw new Error(`Semantic Scholar API responded with status: ${searchResponse.status}`);
    }

    const result = await searchResponse.json();
    console.log('语义学术API响应:', JSON.stringify(result, null, 2));

    if (!result.data) {
      throw new Error('Semantic Scholar API返回的数据格式不正确');
    }

    // 解析返回的论文数据
    const papers = await parseSemanticResponse(result.data || []);

    res.json({
      success: true,
      papers: papers,
      rawResponse: JSON.stringify(result.data),
      session_id: (req.body && req.body.session_id) || 'default'
    });
  } catch (error) {
    console.error('推荐API错误:', error);
    console.error('Error stack:', error.stack);
    
    res.status(500).json({ 
      success: false,
      error: error.message,
      papers: [],
      rawResponse: `错误：${error.message}`,
      session_id: (req.body && req.body.session_id) || 'default'
    });
  }
});

// 测试CORE API路由
app.post('/api/test-core', async (req, res) => {
  try {
    const { title } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: '需要提供论文标题' });
    }

    console.log('测试CORE API，搜索标题:', title);
    const fullText = await getFullTextFromCore(title);
    
    res.json({
      success: true,
      title: title,
      fullText: fullText,
      hasContent: !!fullText
    });
  } catch (error) {
    console.error('CORE API测试错误:', error);
    res.status(500).json({ 
      success: false,
      error: error.message
    });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 本地API服务器运行在 http://localhost:${PORT}`);
}); 