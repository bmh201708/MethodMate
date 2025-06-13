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

// Coze API配置 - 从cozeApi.js获取
const COZE_API_KEY = process.env.COZE_API_KEY || 'pat_xdxRBDKN85QE746XMRQ0hGgKJsVQSrH8VCIvUzlRkW62OTBqZ88ti1eIkTvHbU18';
const COZE_API_URL = process.env.COZE_API_URL || 'https://api.coze.com';
const COZE_BOT_ID = process.env.COZE_BOT_ID || '7513529977745915905';
const COZE_USER_ID = process.env.COZE_USER_ID || '7505301221562023954';
  
// 设置环境变量，确保其他模块可以访问
process.env.COZE_API_KEY = COZE_API_KEY;
process.env.COZE_API_URL = COZE_API_URL;
process.env.COZE_BOT_ID = COZE_BOT_ID;
process.env.COZE_USER_ID = COZE_USER_ID;

// 导入翻译服务
import translate, { translateWithGoogleUnofficial } from './translate-service.js';
import { translateWithCoze, translateWithSilentCoze } from './coze-translate-service.js';

// 翻译函数 - 使用多种翻译服务进行中文到英文的翻译
const translateToEnglish = async (text, retries = 3) => {
  try {
    // 检测是否包含中文字符
    if (!/[\u4e00-\u9fa5]/.test(text)) {
      console.log('文本不包含中文，无需翻译:', text);
      return text;
    }

    // 清理和预处理文本
    const cleanedText = text
      .replace(/[\r\n]+/g, ' ') // 将换行替换为空格
      .replace(/\s+/g, ' ') // 合并多个空格
      .trim();

    console.log('准备翻译文本:', cleanedText);

    // 定义可用的翻译服务及其优先级
    const translationServices = [
      // 首选：使用Coze API进行翻译
      async () => {
        try {
          console.log('尝试使用Coze API翻译...');
          const result = await translateWithCoze(cleanedText, 'zh-CN', 'en');
          if (!result || result.length < 5) throw new Error('Coze返回的翻译结果为空或过短');
          return result;
        } catch (err) {
          console.warn('Coze翻译失败:', err.message);
          throw err;
        }
      },
      
      // 备选1：使用Google非官方API
      async () => {
        try {
          console.log('尝试使用Google非官方API翻译...');
          const result = await translateWithGoogleUnofficial(cleanedText, 'zh-CN', 'en');
          if (!result || result.length < 5) throw new Error('Google返回的翻译结果为空或过短');
          return result;
        } catch (err) {
          console.warn('Google翻译失败:', err.message);
          throw err;
        }
      },
      
      // 备选2：使用Lingva翻译服务
      async () => {
        try {
          console.log('尝试使用Lingva翻译服务...');
          const result = await translate(cleanedText, {
            from: 'zh',
            to: 'en',
            service: 'lingva',
            retries: 1
          });
          if (!result || result.length < 5) throw new Error('Lingva返回的翻译结果为空或过短');
          return result;
        } catch (err) {
          console.warn('Lingva翻译失败:', err.message);
          throw err;
        }
      }
    ];

    // 尝试每个翻译服务，直到成功或全部失败
    let lastError = null;
    for (const translateFn of translationServices) {
      try {
        const translatedText = await translateFn();
        
        // 清理翻译结果，移除可能的提示词或额外说明
        const cleanedTranslation = translatedText
          .replace(/^translation[：:]?\s*/i, '')
          .replace(/^translated text[：:]?\s*/i, '')
          .replace(/^english translation[：:]?\s*/i, '')
          .trim();
        
        console.log('翻译成功:', {
          original: cleanedText.substring(0, 50) + (cleanedText.length > 50 ? '...' : ''),
          translated: cleanedTranslation.substring(0, 50) + (cleanedTranslation.length > 50 ? '...' : '')
        });
        
        return cleanedTranslation;
      } catch (error) {
        lastError = error;
        // 继续尝试下一个服务
      }
    }

    // 如果还有重试次数，等待后重试
    if (retries > 0) {
      console.log(`所有翻译服务都失败，剩余重试次数: ${retries - 1}`);
      await new Promise(resolve => setTimeout(resolve, 2000)); // 等待2秒后重试
      return translateToEnglish(text, retries - 1);
    }
    
    // 所有服务都失败且没有重试次数，返回原文
    console.warn('所有翻译服务都失败，使用原文:', text);
    return text;
  } catch (error) {
    console.error('翻译过程中发生未处理的错误:', error);
    if (retries > 0) {
      console.log(`发生错误，剩余重试次数: ${retries - 1}`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return translateToEnglish(text, retries - 1);
    }
    console.warn('翻译失败，使用原文:', text);
    return text;
  }
};

// 从对话历史中提取关键词
const extractKeywords = (messages) => {
  // 优先从用户最后一条消息中提取关键词
  const userMessages = messages.filter(msg => msg.type === 'user');
  if (userMessages.length > 0) {
    const lastUserMessage = userMessages[userMessages.length - 1].content;
    
    // 移除常见的无意义词和应用名称
    const cleanedMessage = lastUserMessage
      .replace(/methodmate|ai|assistant|我想|请问|如何|什么是/gi, '')
      .replace(/[^\w\s\u4e00-\u9fa5]/g, ' ') // 保留中文字符和英文单词
      .trim();

    if (cleanedMessage.length >= 5) {
      return cleanedMessage;
    }
  }
  
  // 如果最后一条消息提取失败，从所有消息中提取
  const recentMessages = messages.slice(-4); // 只取最近4条消息
  const combinedContent = recentMessages
    .map(msg => msg.content)
    .join(' ')
    .replace(/methodmate|ai|assistant|我想|请问|如何|什么是/gi, '')
    .replace(/[^\w\s\u4e00-\u9fa5]/g, ' ');
  
  // 提取更有意义的关键词
  const keywords = combinedContent
    .split(/\s+/)
    .filter(word => 
      word.length > 2 && 
      !/^(the|and|or|in|on|at|to|from|with|by|for|about|that|this|these|those|is|are|was|were|be|been|being|have|has|had|do|does|did|will|would|shall|should|may|might|must|can|could)$/i.test(word)
    )
    .slice(0, 15); // 取前15个关键词
  
  return keywords.join(' ');
};

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
  // 定义允许的期刊/会议列表
  const allowedVenues = [
    // 顶会
    'Computer-Supported Cooperative Work', 'CSCW',
    'Human Factors in Computing Systems', 'CHI',
    'Pervasive and Ubiquitous Computing', 'UbiComp',
    'User Interface Software and Technology', 'UIST',
    
    // 顶刊
    'Computers in Human Behavior',
    'CoDesign',
    'Technovation',
    'Design Studies',
    'Journal of Mixed Methods Research',
    'ACM Transactions on Computer-Human Interaction', 'TOCHI',
    'International Journal of Human-Computer Studies',
    'Design Issues',
    'Human-Computer Interaction',
    'Computer-Aided Design',
    'Applied Ergonomics',
    'International Journal of Design',
    'Human Factors',
    'Leonardo',
    'The Design Journal'
  ];

  const parsedPapers = [];
  
  for (const paper of papers) {
    // 添加延迟，避免请求过于频繁
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 获取论文全文
    const fullText = await getFullTextFromCore(paper.title);
    
    // 检查是否是顶会顶刊
    const venue = paper.venue || '';
    const venueLower = venue.toLowerCase();
    
    // 更精确的顶会顶刊判断逻辑
    const isTopVenue = allowedVenues.some(allowedVenue => {
      const allowedLower = allowedVenue.toLowerCase();
      
      // 完全匹配
      if (venueLower === allowedLower) return true;
      
      // 处理简写形式的精确匹配
      if (allowedLower === 'cscw' && (venueLower === 'cscw' || venueLower.includes('computer-supported cooperative work'))) return true;
      if (allowedLower === 'chi' && (venueLower === 'chi' || venueLower.includes('human factors in computing systems'))) return true;
      if (allowedLower === 'ubicomp' && (venueLower === 'ubicomp' || venueLower.includes('pervasive and ubiquitous computing'))) return true;
      if (allowedLower === 'uist' && (venueLower === 'uist' || venueLower.includes('user interface software and technology'))) return true;
      if (allowedLower === 'tochi' && (venueLower === 'tochi' || venueLower.includes('transactions on computer-human interaction'))) return true;
      
      // 对于其他期刊，使用更严格的匹配规则
      // 检查是否是完整的子字符串，而不是部分匹配
      const words = allowedLower.split(' ');
      if (words.length > 1) {
        // 对于多词名称，要求完整匹配或作为独立短语出现
        return venueLower === allowedLower || 
               venueLower.includes(` ${allowedLower} `) || 
               venueLower.startsWith(`${allowedLower} `) || 
               venueLower.endsWith(` ${allowedLower}`);
      }
      
      // 对于单词名称，要求是完整的单词匹配
      return venueLower === allowedLower || 
             venueLower.includes(` ${allowedLower} `) || 
             venueLower.startsWith(`${allowedLower} `) || 
             venueLower.endsWith(` ${allowedLower}`);
    });
    
    console.log(`Venue: "${venue}", isTopVenue: ${isTopVenue}`);
    
    parsedPapers.push({
      title: paper.title,
      abstract: paper.abstract || '暂无摘要',
      downloadUrl: (paper.openAccessPdf && paper.openAccessPdf.url) || paper.url || null,
      // 添加额外的语义学术特有信息
      year: paper.year,
      citationCount: paper.citationCount,
      authors: (paper.authors && paper.authors.map(author => author.name).join(', ')) || '未知作者',
      venue: venue,
      // 添加全文字段
      fullText: fullText || null,
      // 添加是否是顶会顶刊的标记
      isTopVenue: isTopVenue
    });
  }
  
  return parsedPapers;
};

// Scholar Search API路由
app.post('/api/scholar-search', async (req, res) => {
  console.log('Scholar Search API被调用');
  
  try {
    const { query, num_results = 10, lang = 'zh-CN', filter_venues = false } = req.body;
    
    if (!query) {
      return res.status(400).json({ 
        success: false,
        error: 'Query parameter is required' 
      });
    }

    console.log(`执行学术搜索，查询: "${query}", 结果数: ${num_results}, 语言: ${lang}`);
    
    // 检测是否包含中文，如果包含则翻译
    let searchQuery = query;
    if (/[\u4e00-\u9fa5]/.test(query)) {
      try {
        console.log('检测到中文查询，进行翻译');
        searchQuery = await translateToEnglish(query);
        console.log(`查询已翻译: "${query}" => "${searchQuery}"`);
      } catch (error) {
        console.error('翻译查询失败:', error);
        // 翻译失败时继续使用原始查询
        searchQuery = query;
      }
    }
    
    // 定义允许的期刊/会议列表
    const allowedVenues = [
      // 顶会
      'Computer-Supported Cooperative Work', 'CSCW',
      'Human Factors in Computing Systems', 'CHI',
      'Pervasive and Ubiquitous Computing', 'UbiComp',
      'User Interface Software and Technology', 'UIST',
      
      // 顶刊
      'Computers in Human Behavior',
      'CoDesign',
      'Technovation',
      'Design Studies',
      'Journal of Mixed Methods Research',
      'ACM Transactions on Computer-Human Interaction', 'TOCHI',
      'International Journal of Human-Computer Studies',
      'Design Issues',
      'Human-Computer Interaction',
      'Computer-Aided Design',
      'Applied Ergonomics',
      'International Journal of Design',
      'Human Factors',
      'Leonardo',
      'The Design Journal'
    ];
    
    // 构建 Semantic Scholar API 请求
    // 根据最新的API文档调整字段，移除不支持的doi字段
    const fields = 'title,authors,abstract,year,citationCount,venue,url,openAccessPdf,externalIds';
    
    // 构建基本查询参数，使用翻译后的查询但不进行URL编码
    let searchUrl = `${SEMANTIC_API_BASE}/paper/search?query=${searchQuery}&limit=${num_results}&fields=${fields}`;
    
    // 如果需要过滤期刊/会议，使用venue参数
    if (filter_venues) {
      // 直接使用原始venue名称，用逗号连接
      const venueParam = allowedVenues.join(',');
      // 直接添加到URL中，不进行编码
      searchUrl += `&venue=${venueParam}`;
    }
    
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
    
    // 检查是否有搜索结果
    if (!searchData.data || searchData.data.length === 0) {
      console.log('没有找到匹配的论文');
      return res.json({
        success: true,
        query: query,
        results: [],
        total_results: 0
      });
    }
    
    // 转换结果
    const results = searchData.data.map(paper => {
      const venue = paper.venue || '';
      
      // 更精确的顶会顶刊判断逻辑
      const isTopVenue = allowedVenues.some(allowedVenue => {
        const allowedLower = allowedVenue.toLowerCase();
        const venueLower = venue.toLowerCase();
        
        // 完全匹配
        if (venueLower === allowedLower) return true;
        
        // 处理简写形式的精确匹配
        if (allowedLower === 'cscw' && (venueLower === 'cscw' || venueLower.includes('computer-supported cooperative work'))) return true;
        if (allowedLower === 'chi' && (venueLower === 'chi' || venueLower.includes('human factors in computing systems'))) return true;
        if (allowedLower === 'ubicomp' && (venueLower === 'ubicomp' || venueLower.includes('pervasive and ubiquitous computing'))) return true;
        if (allowedLower === 'uist' && (venueLower === 'uist' || venueLower.includes('user interface software and technology'))) return true;
        if (allowedLower === 'tochi' && (venueLower === 'tochi' || venueLower.includes('transactions on computer-human interaction'))) return true;
        
        // 对于其他期刊，使用更严格的匹配规则
        // 检查是否是完整的子字符串，而不是部分匹配
        // 例如，"design studies"应该匹配"design studies"，但不应该匹配"design studies in earth science"
        const words = allowedLower.split(' ');
        if (words.length > 1) {
          // 对于多词名称，要求完整匹配或作为独立短语出现
          return venueLower === allowedLower || 
                 venueLower.includes(` ${allowedLower} `) || 
                 venueLower.startsWith(`${allowedLower} `) || 
                 venueLower.endsWith(` ${allowedLower}`);
        }
        
        // 对于单词名称，要求是完整的单词匹配
        return venueLower === allowedLower || 
               venueLower.includes(` ${allowedLower} `) || 
               venueLower.startsWith(`${allowedLower} `) || 
               venueLower.endsWith(` ${allowedLower}`);
      });
      
      console.log(`Scholar Search - Venue: "${venue}", isTopVenue: ${isTopVenue}`);
      
      return {
        title: paper.title || '',
        authors: paper.authors?.map(author => author.name) || [],
        journal: venue,
        year: paper.year?.toString() || '',
        citations: paper.citationCount || 0,
        summary: paper.abstract || '',
        pdf_url: paper.openAccessPdf?.url || null,
        scholar_url: paper.url || '',
        doi: paper.externalIds?.DOI || '',
        relevance_score: 0.9, // Semantic Scholar API 目前不返回相关性分数
        isTopVenue: isTopVenue // 标记是否来自顶会顶刊
      };
    });

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
    const { chatHistory = [], filter_venues = false } = req.body;
    console.log('接收到的数据:', JSON.stringify(req.body, null, 2));
    
    // 从聊天历史中提取关键词
    let searchQuery = '';
    
    // 如果有有效的聊天历史，从中提取关键信息
    const validHistory = chatHistory.filter(msg => 
      msg.type === 'user' || (msg.type === 'assistant' && !msg.isError)
    );
    
    if (validHistory.length > 0) {
      // 使用提取关键词函数
      searchQuery = extractKeywords(validHistory);
      
      // 检测是否包含中文
      const containsChinese = /[\u4e00-\u9fa5]/.test(searchQuery);
      
      // 如果包含中文，尝试翻译
      if (containsChinese) {
        try {
          console.log('检测到中文查询，进行翻译:', searchQuery);
          searchQuery = await translateToEnglish(searchQuery);
          console.log('翻译后的查询:', searchQuery);
        } catch (error) {
          console.error('翻译查询失败:', error);
          // 翻译失败时继续使用原始查询
        }
      }
    }
    
    // 如果仍然没有有效查询，使用默认查询
    if (!searchQuery || searchQuery.trim().length < 5) {
      searchQuery = 'research methodology quantitative analysis experimental design';
      console.log('使用默认查询:', searchQuery);
    }

    console.log('最终搜索查询:', searchQuery);

    // 定义允许的期刊/会议列表
    const allowedVenues = [
      // 顶会
      'Computer-Supported Cooperative Work', 'CSCW',
      'Human Factors in Computing Systems', 'CHI',
      'Pervasive and Ubiquitous Computing', 'UbiComp',
      'User Interface Software and Technology', 'UIST',
      
      // 顶刊
      'Computers in Human Behavior',
      'CoDesign',
      'Technovation',
      'Design Studies',
      'Journal of Mixed Methods Research',
      'ACM Transactions on Computer-Human Interaction', 'TOCHI',
      'International Journal of Human-Computer Studies',
      'Design Issues',
      'Human-Computer Interaction',
      'Computer-Aided Design',
      'Applied Ergonomics',
      'International Journal of Design',
      'Human Factors',
      'Leonardo',
      'The Design Journal'
    ];

    // 构建基本查询参数，不进行URL编码
    let searchUrl = `${SEMANTIC_API_BASE}/paper/search?query=${searchQuery}&limit=5&fields=title,abstract,url,openAccessPdf,year,citationCount,authors,venue`;
    
    // 如果需要过滤期刊/会议，使用venue参数
    if (filter_venues) {
      // 直接使用原始venue名称，用逗号连接
      const venueParam = allowedVenues.join(',');
      // 直接添加到URL中，不进行编码
      searchUrl += `&venue=${venueParam}`;
    }

    // 调用Semantic Scholar API搜索相关论文
    const searchResponse = await fetch(
      searchUrl,
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

    // 检查是否有搜索结果
    if (!result.data || result.data.length === 0) {
      console.log('没有找到匹配的论文');
      return res.json({
        success: true,
        papers: [],
        rawResponse: JSON.stringify(result),
        session_id: (req.body && req.body.session_id) || 'default'
      });
    }

    // 解析返回的论文数据
    const papers = await parseSemanticResponse(result.data);

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