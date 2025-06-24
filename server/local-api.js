import express from 'express';
import cors from 'cors';
import https from 'https';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { initDatabase, getPool } from './database.js';
import { getJWTConfig, getServerConfig } from './config.js';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 加载.env文件 - 从项目根目录加载
dotenv.config({ path: join(__dirname, '..', '.env') });

const app = express();
const serverConfig = getServerConfig();
const jwtConfig = getJWTConfig();
const PORT = serverConfig.port;

// 初始化数据库
let database = null;
const initServer = async () => {
  try {
    database = await initDatabase();
    console.log('✅ 数据库初始化成功');
  } catch (error) {
    console.error('❌ 数据库初始化失败:', error);
    process.exit(1);
  }
};

// 启动时初始化数据库
initServer();

// CORS配置 - 支持生产环境
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://method-mate.vercel.app', 'https://methodmate.vercel.app','http://118.195.129.161','http://118.195.129.161:3002'] 
    : ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// API配置
const SEMANTIC_API_BASE = 'https://api.semanticscholar.org/graph/v1';
const CORE_API_BASE = 'https://api.core.ac.uk/v3';
const CORE_API_KEY = process.env.CORE_API_KEY;
const SEMANTIC_API_KEY = process.env.SEMANTIC_API_KEY || '';

// Coze API配置 - 从cozeApi.js获取
const COZE_API_KEY = process.env.COZE_API_KEY || 'pat_Q06cU8OsiWefqJHG2ed8GlV1al9WRGRVNAfkNmpG567hDXVbcHeyLHWtMLciNj37';
const COZE_API_URL = process.env.COZE_API_URL || 'https://api.coze.com';
const COZE_BOT_ID = process.env.COZE_BOT_ID || '7513529977745915905';
const COZE_BOT_ID_Reference = process.env.COZE_BOT_ID_Reference || '7511024998740754448';  
const COZE_USER_ID = process.env.COZE_USER_ID || '7505301221562023954';

// 检查Coze API是否可用
let COZE_API_AVAILABLE = true;

// 测试Coze API连接
const testCozeAPI = async () => {
  try {
    const response = await fetch(`${COZE_API_URL}/open_api/v2/chat`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${COZE_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        bot_id: COZE_BOT_ID,
        user: COZE_USER_ID,
        query: 'test',
        stream: false,
        conversation_id: `test_${Date.now()}`
      })
    });

    const result = await response.json();
    if (result.code && result.code !== 0) {
      console.warn('Coze API不可用，将使用备用方法:', result.msg);
      COZE_API_AVAILABLE = false;
      return false;
    }
    
    console.log('Coze API连接正常');
    COZE_API_AVAILABLE = true;
    return true;
  } catch (error) {
    console.warn('Coze API连接失败，将使用备用方法:', error.message);
    COZE_API_AVAILABLE = false;
    return false;
  }
};

// 启动时测试API
testCozeAPI();

// 设置环境变量，确保其他模块可以访问
process.env.COZE_API_KEY = COZE_API_KEY;
process.env.COZE_API_URL = COZE_API_URL;
process.env.COZE_BOT_ID = COZE_BOT_ID;
process.env.COZE_USER_ID = COZE_USER_ID;

// 导入翻译服务
import translate, { translateWithGoogleUnofficial } from './translate-service.js';
import { translateWithCoze, translateWithSilentCoze } from './coze-translate-service.js';

// 翻译函数 - 使用Coze API进行中文到英文的翻译
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

    // 如果Coze API不可用，使用备用方法
    if (!COZE_API_AVAILABLE) {
      console.log('Coze API不可用，使用备用翻译方法');
      return cleanedText; // 暂时返回原文，或者可以使用其他翻译服务
    }

    try {
      console.log('使用Coze API翻译...');
      const translatedText = await translateWithCoze(cleanedText, 'zh-CN', 'en');
      
      if (!translatedText || translatedText.length < 5) {
        throw new Error('Coze返回的翻译结果为空或过短');
      }
      
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
      if (retries > 0) {
        console.log(`翻译失败，${error.message}，剩余重试次数: ${retries - 1}`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        return translateToEnglish(text, retries - 1);
      }
      console.warn('翻译失败，使用原文:', text);
      return text;
    }
  } catch (error) {
    console.error('翻译过程中发生未处理的错误:', error);
    return text;
  }
};

// 论文研究方法提取函数 - 改进版，处理长文本
const extractResearchMethod = async (fullText, retries = 3) => {
  try {
    if (!fullText || typeof fullText !== 'string') {
      console.log('无效的论文全文');
      return null;
    }

    // 计算文本长度，用于判断是否需要分段处理
    const textLength = fullText.length;
    console.log(`论文全文长度: ${textLength} 字符`);

    // 定义最大段落长度（约8000个字符，大约是GPT模型处理能力的1/3）
    const MAX_CHUNK_LENGTH = 8000;
    
    // 如果文本较短，直接处理
    if (textLength <= MAX_CHUNK_LENGTH) {
      console.log('论文长度适中，直接处理全文');
      return await processFullText(fullText, retries);
    }
    
    // 如果文本较长，先尝试定位方法部分
    console.log('论文较长，尝试定位研究方法部分');
    
    // 1. 首先尝试定位可能包含研究方法的部分
    const methodSection = locateMethodSection(fullText);
    
    if (methodSection) {
      console.log('找到可能的方法部分，长度:', methodSection.length);
      // 如果找到的方法部分仍然太长，进行分段处理
      if (methodSection.length > MAX_CHUNK_LENGTH) {
        console.log('找到的方法部分仍然较长，进行分段处理');
        return await processTextInChunks(methodSection, retries);
      } else {
        // 如果方法部分长度适中，直接处理
        console.log('找到的方法部分长度适中，直接处理');
        return await processFullText(methodSection, retries);
      }
    }
    
    // 2. 如果没有找到明确的方法部分，将全文分段处理
    console.log('未找到明确的方法部分，对全文进行分段处理');
    return await processTextInChunks(fullText, retries);
    
  } catch (error) {
    console.error('提取研究方法过程中发生未处理的错误:', error);
    return null;
  }
};

// 处理完整文本块
const processFullText = async (text, retries = 3) => {
  try {
    const prompt = `You are a research methodology expert. Your task is to identify and extract the methodology section from this academic paper.

Look for sections that describe:
1. Research design or methodology
2. Data collection methods
3. Analysis procedures
4. Experimental setup

Simply locate and extract these sections from the text. If you find them, return the relevant text passages. If you don't find explicit methodology sections, return null.

Paper text:
${text}

Remember: Just extract and return the relevant text. No need to analyze, summarize, or modify it.`;

    console.log('使用Coze API提取研究方法...');
    const response = await fetch(`${COZE_API_URL}/open_api/v2/chat`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${COZE_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        bot_id: COZE_BOT_ID,
        user: COZE_USER_ID,
        query: prompt,
        stream: false,
        conversation_id: `extract_method_${Date.now()}`
      })
    });

    if (!response.ok) {
      throw new Error(`Coze API responded with status: ${response.status}`);
    }

    const result = await response.json();
    let methodText = '';
    
    if (result.messages && Array.isArray(result.messages)) {
      const answerMessages = result.messages.filter(m => m.role === 'assistant' && m.type === 'answer');
      if (answerMessages.length > 0) {
        methodText = answerMessages[0].content;
      }
    } else if (result.answer) {
      methodText = result.answer;
    }

    if (methodText.toLowerCase().includes("i'm sorry") || 
        methodText.toLowerCase().includes("cannot assist") ||
        methodText.toLowerCase().includes("can't assist")) {
      console.log('Coze拒绝响应，尝试使用备用方法');
      return await generateMethodSummary(text);
    }

    if (!methodText) {
      throw new Error('未能从Coze响应中提取研究方法');
    }

    methodText = methodText
      .replace(/^(Here is the research methodology section:|I've extracted the research methodology section:|The research methodology section is as follows:)/i, '')
      .trim();

    return methodText;
  } catch (error) {
    if (retries > 0) {
      console.log(`处理文本块失败，${error.message}，剩余重试次数: ${retries - 1}`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return processFullText(text, retries - 1);
    }
    console.warn('处理文本块失败，尝试使用备用方法');
    return await generateMethodSummary(text);
  }
};

// 分段处理长文本
const processTextInChunks = async (text, retries = 3) => {
  try {
    // 将文本分成较小的块
    const MAX_CHUNK_LENGTH = 8000;
    const chunks = [];
    let currentChunk = '';
    
    // 按段落分割文本
    const paragraphs = text.split(/\n\s*\n/);
    
    for (const paragraph of paragraphs) {
      if (currentChunk.length + paragraph.length + 2 <= MAX_CHUNK_LENGTH) {
        currentChunk += (currentChunk ? '\n\n' : '') + paragraph;
      } else {
        if (currentChunk) {
          chunks.push(currentChunk);
        }
        currentChunk = paragraph;
      }
    }
    
    if (currentChunk) {
      chunks.push(currentChunk);
    }
    
    console.log(`将文本分成 ${chunks.length} 个块进行处理`);
    
    // 处理每个块并收集结果
    const results = [];
    for (let i = 0; i < chunks.length; i++) {
      console.log(`处理第 ${i + 1}/${chunks.length} 个文本块`);
      const result = await processFullText(chunks[i], retries);
      if (result) {
        results.push(result);
      }
      
      // 在处理块之间添加延迟，避免API限制
      if (i < chunks.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    // 如果没有找到任何方法相关内容，返回null
    if (results.length === 0) {
      console.log('未从任何文本块中找到研究方法');
      return null;
    }
    
    // 合并所有结果
    const combinedResult = results.join('\n\n');
    console.log(`成功从 ${results.length} 个文本块中提取研究方法`);
    
    // 如果合并后的结果过长，可能需要进行总结
    if (combinedResult.length > MAX_CHUNK_LENGTH) {
      console.log('合并结果过长，尝试生成摘要');
      return await generateMethodSummary(combinedResult);
    }
    
    return combinedResult;
  } catch (error) {
    console.error('分段处理文本时出错:', error);
    return null;
  }
};

// 定位可能包含研究方法的部分
const locateMethodSection = (fullText) => {
  try {
    // 转换为小写以进行不区分大小写的搜索
    const lowerText = fullText.toLowerCase();
    
    // 定义可能表示方法部分的标题关键词
    const methodTitles = [
      'method', 'methodology', 'research design', 'experimental design',
      'research methodology', 'data collection', 'procedure', 'experimental setup',
      'research approach', 'study design', 'research procedure', 'materials and methods',
      '方法', '研究方法', '实验方法', '实验设计', '研究设计', '数据收集', '实验程序'
    ];
    
    // 查找可能的方法部分标题
    let bestMatch = null;
    let bestPosition = -1;
    
    for (const title of methodTitles) {
      // 查找可能的标题格式（如 "3. Method" 或 "Method" 或 "III. Method"）
      const patterns = [
        new RegExp(`\\b\\d+\\.?\\s+${title}\\b`, 'i'),  // 数字编号格式
        new RegExp(`\\b${title}\\b`, 'i'),              // 普通单词格式
        new RegExp(`\\b[ivxlcdm]+\\.?\\s+${title}\\b`, 'i'), // 罗马数字格式
      ];
      
      for (const pattern of patterns) {
        const match = lowerText.match(pattern);
        if (match && (bestPosition === -1 || match.index < bestPosition)) {
          bestMatch = match[0];
          bestPosition = match.index;
        }
      }
    }
    
    // 如果找到方法部分标题
    if (bestPosition !== -1) {
      console.log(`找到可能的方法部分标题: "${bestMatch}" 在位置 ${bestPosition}`);
      
      // 查找下一个可能的章节标题，作为方法部分的结束
      const nextSectionPattern = /\b(\d+\.\s+|\b[IVX]+\.\s+|Chapter\s+\d+\s*[:\.]\s*|\d+\s*[:\.]\s*)[A-Z]/;
      const nextSection = lowerText.substring(bestPosition + bestMatch.length).match(nextSectionPattern);
      
      let endPosition;
      if (nextSection) {
        endPosition = bestPosition + bestMatch.length + nextSection.index;
        console.log(`找到下一个章节标题，方法部分结束于位置 ${endPosition}`);
      } else {
        // 如果找不到下一个章节标题，取后续的一部分文本（最多10000字符）
        endPosition = Math.min(bestPosition + bestMatch.length + 10000, fullText.length);
        console.log(`未找到下一个章节标题，取后续 10000 字符作为方法部分`);
      }
      
      // 提取方法部分文本
      return fullText.substring(bestPosition, endPosition);
    }
    
    // 如果没有找到明确的方法部分标题，尝试查找包含方法关键词的段落
    console.log('未找到明确的方法部分标题，尝试查找包含方法关键词的段落');
    
    // 将文本分割成段落
    const paragraphs = fullText.split(/\n\s*\n/);
    
    // 定义方法相关的关键词
    const methodKeywords = [
      'participant', 'procedure', 'measure', 'analysis', 'collect data', 'sample',
      'experiment', 'survey', 'interview', 'questionnaire', 'observation',
      'statistical analysis', 'research design', 'study design', 'method',
      '参与者', '程序', '测量', '分析', '收集数据', '样本', '实验', '调查', '访谈',
      '问卷', '观察', '统计分析', '研究设计', '研究方法'
    ];
    
    // 查找包含多个方法关键词的段落
    const methodParagraphs = paragraphs.filter(para => {
      const lowerPara = para.toLowerCase();
      // 计算段落中包含的方法关键词数量
      const keywordCount = methodKeywords.filter(keyword => 
        lowerPara.includes(keyword.toLowerCase())
      ).length;
      
      // 如果包含至少3个关键词，认为是方法相关段落
      return keywordCount >= 3;
    });
    
    if (methodParagraphs.length > 0) {
      console.log(`找到 ${methodParagraphs.length} 个可能包含方法的段落`);
      // 合并这些段落
      return methodParagraphs.join('\n\n');
    }
    
    // 如果仍然找不到，返回null
    console.log('未能定位到明确的方法部分');
    return null;
    
  } catch (error) {
    console.error('定位方法部分时出错:', error);
    return null;
  }
};

// 备用的研究方法生成函数
const generateMethodSummary = async (fullText) => {
  try {
    if (!fullText || typeof fullText !== 'string') {
      return null;
    }

    const prompt = `As a research assistant, help me understand the methodology used in this paper. 
Please read the text and create a brief summary of the research methods used.
Focus on identifying:
- The type of research (e.g., experimental, survey, case study)
- Data collection methods
- Analysis approaches
- Key methodological steps

Text:
${fullText}

Please provide a concise summary of the methodology.`;

    console.log('使用备用方法生成研究方法概要...');
    const response = await fetch(`${COZE_API_URL}/open_api/v2/chat`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${COZE_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        bot_id: COZE_BOT_ID,
        user: COZE_USER_ID,
        query: prompt,
        stream: false,
        conversation_id: `generate_summary_${Date.now()}`
      })
    });

    if (!response.ok) {
      throw new Error(`Coze API responded with status: ${response.status}`);
    }

    const result = await response.json();
    let summaryText = '';
    
    if (result.messages && Array.isArray(result.messages)) {
      const answerMessages = result.messages.filter(m => m.role === 'assistant' && m.type === 'answer');
      if (answerMessages.length > 0) {
        summaryText = answerMessages[0].content;
      }
    } else if (result.answer) {
      summaryText = result.answer;
    }

    if (!summaryText || 
        summaryText.toLowerCase().includes("i'm sorry") || 
        summaryText.toLowerCase().includes("cannot assist") ||
        summaryText.toLowerCase().includes("can't assist")) {
      return null;
    }

    return summaryText.trim();
  } catch (error) {
    console.error('生成研究方法概要失败:', error);
    return null;
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
app.use(express.json());
app.use(express.static(join(__dirname, '..', 'public')));

// JWT认证中间件
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: '访问令牌未提供' });
  }

  jwt.verify(token, jwtConfig.secret, (err, user) => {
    if (err) {
      return res.status(403).json({ error: '访问令牌无效' });
    }
    req.user = user;
    next();
  });
};

// 可选的认证中间件（如果有token则验证，没有则跳过）
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    jwt.verify(token, jwtConfig.secret, (err, user) => {
      if (!err) {
        req.user = user;
      }
    });
  }
  next();
};

// 用户注册API
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        error: '用户名、邮箱和密码都是必需的' 
      });
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        error: '邮箱格式不正确' 
      });
    }

    // 验证密码长度
    if (password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        error: '密码长度至少为6位' 
      });
    }

    const pool = getPool();
    
    // 检查用户名是否已存在
    const [existingUsers] = await pool.execute(
      'SELECT id FROM users WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ 
        success: false, 
        error: '用户名或邮箱已存在' 
      });
    }

    // 加密密码
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 创建用户
    const [result] = await pool.execute(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    const userId = result.insertId;

    // 生成JWT token
    const token = jwt.sign(
      { id: userId, username, email },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    res.status(201).json({
      success: true,
      message: '用户注册成功',
      user: {
        id: userId,
        username,
        email
      },
      token
    });
  } catch (error) {
    console.error('用户注册错误:', error);
    res.status(500).json({ 
      success: false, 
      error: '服务器内部错误' 
    });
  }
});

// 用户登录API
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        error: '用户名和密码都是必需的' 
      });
    }

    const pool = getPool();
    
    // 查找用户（支持用户名或邮箱登录）
    const [users] = await pool.execute(
      'SELECT id, username, email, password_hash FROM users WHERE username = ? OR email = ?',
      [username, username]
    );

    if (users.length === 0) {
      return res.status(401).json({ 
        success: false, 
        error: '用户名或密码错误' 
      });
    }

    const user = users[0];

    // 验证密码
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ 
        success: false, 
        error: '用户名或密码错误' 
      });
    }

    // 生成JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    res.json({
      success: true,
      message: '登录成功',
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      },
      token
    });
  } catch (error) {
    console.error('用户登录错误:', error);
    res.status(500).json({ 
      success: false, 
      error: '服务器内部错误' 
    });
  }
});

// 获取用户信息API
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const pool = getPool();
    const [users] = await pool.execute(
      'SELECT id, username, email, created_at FROM users WHERE id = ?',
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: '用户不存在' 
      });
    }

    const user = users[0];
    res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.created_at
      }
    });
  } catch (error) {
    console.error('获取用户信息错误:', error);
    res.status(500).json({ 
      success: false, 
      error: '服务器内部错误' 
    });
  }
});

// 添加根路由重定向到测试页面
app.get('/', (req, res) => {
  res.redirect('/test-core-api.html');
});

// 从CORE API获取论文全文，添加重试机制和请求间隔
const getFullTextFromCore = async (title, doi = null, retries = 3, delay = 1000) => {
  try {
    console.log(`正在从CORE API获取论文全文，标题: "${title}"${doi ? `，DOI: "${doi}"` : ''}，剩余重试次数: ${retries}`);
    
    // 添加请求间隔，避免API限流
    await new Promise(resolve => setTimeout(resolve, delay));
    
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
    
    // 如果是超时或网络错误，并且还有重试次数，则重试
    if ((error.name === 'AbortError' || error.code === 'ETIMEDOUT' || error.code === 'ECONNRESET') && retries > 0) {
      console.log(`CORE API请求超时或网络错误，${delay/1000}秒后重试，剩余重试次数: ${retries - 1}`);
      return getFullTextFromCore(title, doi, retries - 1, delay * 2); // 指数退避策略
    }
    
    console.error('错误堆栈:', error.stack);
    return null;
  }
};

// 使用标题搜索CORE API的辅助函数
const searchCoreByTitle = async (title) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000); // 10秒超时
  
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
      signal: controller.signal
    });
    
    clearTimeout(timeout);
    
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
  } catch (fetchError) {
    clearTimeout(timeout);
    console.error('标题搜索出错:', fetchError);
    return null;
  }
};

// 使用DOI搜索CORE API的辅助函数
const searchCoreByDOI = async (doi) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000); // 10秒超时
  
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
      signal: controller.signal
    });
    
    clearTimeout(timeout);
    
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
  } catch (fetchError) {
    clearTimeout(timeout);
    console.error('DOI搜索出错:', fetchError);
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
    
    // 生成唯一ID，用于后续异步获取全文和研究方法
    const paperId = `paper_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
    
    parsedPapers.push({
      id: paperId,
      title: paper.title,
      abstract: paper.abstract || '暂无摘要',
      downloadUrl: (paper.openAccessPdf && paper.openAccessPdf.url) || paper.url || null,
      // 添加额外的语义学术特有信息
      year: paper.year,
      citationCount: paper.citationCount,
      authors: (paper.authors && paper.authors.map(author => author.name).join(', ')) || '未知作者',
      venue: venue,
      // 不再同步获取全文，初始化为null
      fullText: null,
      researchMethod: null,
      isLoadingFullText: false,
      // 添加是否是顶会顶刊的标记
      isTopVenue: isTopVenue
    });
    
    // 异步获取全文和研究方法，不阻塞主流程
    (async () => {
      try {
        const paperIndex = parsedPapers.length - 1;
        console.log(`开始异步获取论文全文: "${paper.title}"`);
        
        // 标记为正在加载
        parsedPapers[paperIndex].isLoadingFullText = true;
        
        // 异步获取全文，传递DOI信息
        const doi = paper.externalIds?.DOI || null;
        const fullText = await getFullTextFromCore(paper.title, doi, 3, 1000);
        
        if (fullText) {
          console.log(`成功获取论文全文，开始提取研究方法: "${paper.title}"`);
          parsedPapers[paperIndex].fullText = fullText;
          
          // 提取研究方法
          const researchMethod = await extractResearchMethod(fullText);
          if (researchMethod) {
            console.log(`成功提取研究方法: "${paper.title}"`);
            parsedPapers[paperIndex].researchMethod = researchMethod;
          }
        }
      } catch (error) {
        console.error(`异步获取论文全文或研究方法失败: "${paper.title}"`, error);
      } finally {
        // 无论成功失败，都标记为加载完成
        const paperIndex = parsedPapers.findIndex(p => p.title === paper.title);
        if (paperIndex !== -1) {
          parsedPapers[paperIndex].isLoadingFullText = false;
        }
      }
    })();
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
    
    // 首先从本地缓存搜索
    console.log('🔍 首先从本地缓存搜索...');
    const cacheResults = await searchFromCache(query, num_results, filter_venues);
    console.log(`📚 本地缓存找到 ${cacheResults.length} 篇论文`);
    
    let allResults = [];
    let needExternalSearch = true;
    
    if (cacheResults.length > 0) {
      // 将缓存结果转换为统一格式
      const formattedCacheResults = cacheResults.map(paper => ({
        title: paper.title || '',
        authors: paper.authors ? (typeof paper.authors === 'string' ? paper.authors.split(', ') : paper.authors) : [],
        journal: paper.venue || paper.journal || '',
        year: paper.year?.toString() || '',
        citations: paper.citation_count || 0,
        summary: paper.abstract || '',
        pdf_url: paper.download_url || null,
        scholar_url: paper.url || '',
        doi: paper.doi || '',
        relevance_score: paper.relevance_score || 0.9,
        isTopVenue: paper.is_top_venue || false,
        from_cache: true,
        cache_id: paper.id,
        research_method: paper.research_method,
        full_text: paper.full_text,
        translated_abstract: paper.translated_abstract,
        translated_method: paper.translated_method
      }));
      
      allResults = formattedCacheResults;
      
      // 如果缓存结果已经足够，就不需要外部搜索
      if (cacheResults.length >= num_results) {
        needExternalSearch = false;
        console.log('📚 本地缓存结果充足，无需外部搜索');
      }
    }
    
    // 如果本地结果不足，继续外部搜索
    if (needExternalSearch) {
      const remainingCount = Math.max(0, num_results - allResults.length);
      console.log(`🌐 本地结果不足，继续外部搜索 ${remainingCount} 篇论文...`);
      
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
      const fields = 'title,authors,abstract,year,citationCount,venue,url,openAccessPdf,externalIds';
      
      let searchUrl = `${SEMANTIC_API_BASE}/paper/search?query=${searchQuery}&limit=${remainingCount}&fields=${fields}`;
      
      // 如果需要过滤期刊/会议，使用venue参数
      if (filter_venues) {
        const venueParam = allowedVenues.join(',');
        searchUrl += `&venue=${venueParam}`;
      }
      
      console.log('外部搜索URL:', searchUrl);
      
      const headers = {
        'Accept': 'application/json',
      };
      
      try {
        // 使用重试机制发送请求
        const response = await fetchWithRetry(searchUrl, {
          headers: headers
        }, 3, 1000);

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Semantic Scholar API错误响应 (${response.status}):`, errorText);
          throw new Error(`Semantic Scholar API responded with status: ${response.status}`);
        }

        const searchData = await response.json();
        console.log('Semantic Scholar API响应论文数量:', searchData.data?.length || 0);
        
        // 处理外部搜索结果
        if (searchData.data && searchData.data.length > 0) {
          const externalResults = searchData.data.map(paper => {
            const venue = paper.venue || '';
            
            // 判断是否是顶会顶刊
            const isTopVenue = allowedVenues.some(allowedVenue => {
              const allowedLower = allowedVenue.toLowerCase();
              const venueLower = venue.toLowerCase();
              
              if (venueLower === allowedLower) return true;
              
              if (allowedLower === 'cscw' && (venueLower === 'cscw' || venueLower.includes('computer-supported cooperative work'))) return true;
              if (allowedLower === 'chi' && (venueLower === 'chi' || venueLower.includes('human factors in computing systems'))) return true;
              if (allowedLower === 'ubicomp' && (venueLower === 'ubicomp' || venueLower.includes('pervasive and ubiquitous computing'))) return true;
              if (allowedLower === 'uist' && (venueLower === 'uist' || venueLower.includes('user interface software and technology'))) return true;
              if (allowedLower === 'tochi' && (venueLower === 'tochi' || venueLower.includes('transactions on computer-human interaction'))) return true;
              
              const words = allowedLower.split(' ');
              if (words.length > 1) {
                return venueLower === allowedLower || 
                       venueLower.includes(` ${allowedLower} `) || 
                       venueLower.startsWith(`${allowedLower} `) || 
                       venueLower.endsWith(` ${allowedLower}`);
              }
              
              return venueLower === allowedLower || 
                     venueLower.includes(` ${allowedLower} `) || 
                     venueLower.startsWith(`${allowedLower} `) || 
                     venueLower.endsWith(` ${allowedLower}`);
            });
            
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
              relevance_score: 0.9,
              isTopVenue: isTopVenue,
              from_cache: false
            };
          });

          // 合并结果，去重（基于标题）
          const existingTitles = new Set(allResults.map(r => r.title.toLowerCase()));
          const newResults = externalResults.filter(r => 
            r.title && !existingTitles.has(r.title.toLowerCase())
          );
          
          allResults = allResults.concat(newResults);
          console.log(`🌐 外部搜索新增 ${newResults.length} 篇论文`);
        }
      } catch (externalError) {
        console.error('外部搜索失败:', externalError);
        // 外部搜索失败不影响返回缓存结果
      }
    }

    // 限制结果数量并排序
    allResults = allResults
      .slice(0, num_results)
      .sort((a, b) => {
        // 优先显示缓存结果，然后按相关性和引用次数排序
        if (a.from_cache && !b.from_cache) return -1;
        if (!a.from_cache && b.from_cache) return 1;
        if (a.relevance_score !== b.relevance_score) return b.relevance_score - a.relevance_score;
        return b.citations - a.citations;
      });

    console.log(`✅ 最终返回 ${allResults.length} 篇论文 (缓存: ${allResults.filter(r => r.from_cache).length}, 外部: ${allResults.filter(r => !r.from_cache).length})`);

    res.json({
      success: true,
      query: query,
      results: allResults,
      total_results: allResults.length,
      cache_hits: allResults.filter(r => r.from_cache).length,
      external_hits: allResults.filter(r => !r.from_cache).length
    });
  } catch (error) {
    console.error('Scholar Search Error:', error);
    console.error('Error stack:', error.stack);
    
    let statusCode = 500;
    let errorMessage = error.message;

    if (error.message && error.message.includes('status:')) {
      const match = error.message.match(/status: (\d+)/);
      if (match && match[1]) {
        const apiStatus = parseInt(match[1], 10);
        if (apiStatus === 429) {
          statusCode = 429;
          errorMessage = '请求过于频繁，请稍后再试。';
        } else if (apiStatus >= 400 && apiStatus < 500) {
          statusCode = apiStatus;
        } else if (apiStatus >= 500) {
          statusCode = 502;
          errorMessage = `上游服务错误: ${apiStatus}`;
        }
      }
    }
    
    res.status(statusCode).json({ 
      success: false,
      error: errorMessage
    });
  }
});

// 辅助函数：从缓存搜索论文
const searchFromCache = async (query, limit = 10, filter_venues = false) => {
  try {
    const pool = getPool();
    const searchQuery = query.trim();
    
    if (!searchQuery || searchQuery.length < 2) {
      console.log('🔍 搜索查询过短，返回空结果');
      return [];
    }
    
    console.log(`🔍 开始缓存搜索，查询: "${searchQuery}", 限制: ${limit}, 过滤顶会: ${filter_venues}`);
    
    // 第一步：检测并翻译中文关键词
    let translatedQuery = searchQuery;
    if (/[\u4e00-\u9fa5]/.test(searchQuery)) {
      try {
        console.log('🈯 检测到中文，开始翻译关键词...');
        translatedQuery = await translateToEnglish(searchQuery);
        console.log(`🔄 翻译结果: "${searchQuery}" => "${translatedQuery}"`);
      } catch (error) {
        console.warn('⚠️ 翻译失败，使用原始查询:', error.message);
        translatedQuery = searchQuery;
      }
    }
    
    // 第二步：按逗号分割关键词并清理，保留短语中的空格
    const keywords = translatedQuery
      .split(',')
      .map(kw => kw.trim())
      .filter(kw => kw.length > 1)
      .slice(0, 5); // 最多5个关键词，避免查询过于复杂
    
    console.log('🔍 原始查询:', query);
    console.log('🔄 翻译后查询:', translatedQuery);
    console.log('🔑 按逗号分割的关键词:', keywords);
    console.log('📊 关键词数量:', keywords.length);
    
    if (keywords.length === 0) {
      console.log('⚠️ 没有有效的搜索关键词');
      return [];
    }
    
    // 第三步：构建SQL查询 - 要求论文标题必须包含所有关键词
    console.log('🎯 搜索策略：论文标题必须包含所有关键词');
    
    let sqlQuery = `
      SELECT id, title, authors, abstract, doi, url, download_url, year, journal, venue,
             citation_count, research_method, full_text, translated_abstract, translated_method,
             paper_id, source, is_top_venue, quality_score, download_sources, metadata,
             created_at, updated_at
      FROM paper_cache 
      WHERE 1=1
    `;
    
    // 构建参数数组 - 每个关键词都需要匹配
    const params = [];
    
    // 为每个关键词添加AND条件
    keywords.forEach((keyword, index) => {
      sqlQuery += ` AND title LIKE ?`;
      params.push(`%${keyword.toLowerCase()}%`);
    });
    
    console.log('🔧 构建的SQL查询条件数量:', keywords.length);
    console.log('🔧 关键词:', keywords);
    
    // 如果需要过滤顶会顶刊
    if (filter_venues) {
      sqlQuery += ' AND is_top_venue = TRUE';
    }
    
    // 按创建时间排序，使用简单的数字限制
    sqlQuery += ' ORDER BY created_at DESC';
    sqlQuery += ` LIMIT ${parseInt(limit)}`;  // 直接写入SQL，不使用参数
    
    console.log('🔍 执行最简化搜索...');
    console.log('📝 SQL查询:', sqlQuery.replace(/\s+/g, ' ').trim());
    console.log('📋 搜索参数数量:', params.length);
    console.log('📋 预期参数数量: 1'); // 只有一个LIKE参数
    console.log('🔧 构建的参数:', params);
    
    const [results] = await pool.execute(sqlQuery, params);
    console.log(`✅ 最简化搜索成功，找到 ${results.length} 篇论文`);
    
    // 处理结果，只解析必要的JSON字段
    const processedResults = results.map(paper => ({
      ...paper,
      download_sources: paper.download_sources ? 
        (typeof paper.download_sources === 'string' ? JSON.parse(paper.download_sources) : paper.download_sources) : null,
      metadata: paper.metadata ? 
        (typeof paper.metadata === 'string' ? JSON.parse(paper.metadata) : paper.metadata) : null,
      relevance_score: 1.0,
      matched_term: firstTerm // 添加匹配的搜索词信息
    }));
    
    return processedResults;
    
  } catch (error) {
    console.error('❌ 缓存搜索失败:', error);
    console.error('错误详情:', error.stack);
    
    // 如果新搜索失败，使用简化的备用搜索
    try {
      console.log('🆘 使用备用搜索方案...');
      return await fallbackSearch(query, limit, filter_venues);
    } catch (fallbackError) {
      console.error('❌ 备用搜索也失败了:', fallbackError);
      return [];
    }
  }
};

// 简化的备用搜索函数 - 只搜索标题
const fallbackSearch = async (query, limit = 10, filter_venues = false) => {
  try {
    const pool = getPool();
    console.log('🆘 执行备用搜索（仅搜索标题）...');
    
    // 按逗号分割关键词（保留短语中的空格）
    const keywords = query
      .split(',')
      .map(kw => kw.trim())
      .filter(kw => kw.length > 1)
      .slice(0, 3); // 备用搜索限制为3个关键词
    
    if (keywords.length === 0) {
      console.log('⚠️ 备用搜索：没有有效关键词，返回最新论文');
      return await getLatestPapers(limit, filter_venues);
    }
    
    console.log('🔑 备用搜索关键词:', keywords);
    
    // 备用搜索 - 要求包含所有关键词
    console.log('🎯 备用搜索策略：标题必须包含所有关键词');
    
    let sqlQuery = `
      SELECT id, title, authors, abstract, doi, url, download_url, year, journal, venue,
             citation_count, research_method, full_text, translated_abstract, translated_method,
             paper_id, source, is_top_venue, quality_score, download_sources, metadata,
             created_at, updated_at
      FROM paper_cache 
      WHERE 1=1
    `;
    
    const params = [];
    
    // 为每个关键词添加AND条件
    keywords.forEach((keyword, index) => {
      sqlQuery += ` AND title LIKE ?`;
      params.push(`%${keyword.toLowerCase()}%`);
    });
    
    if (filter_venues) {
      sqlQuery += ' AND is_top_venue = 1';
    }
    
    sqlQuery += ` ORDER BY created_at DESC LIMIT ${parseInt(limit)}`;
    
    console.log('🔧 备用搜索SQL:', sqlQuery.replace(/\s+/g, ' ').trim());
    console.log('🔧 备用搜索参数:', params);
    
    const [results] = await pool.execute(sqlQuery, params);
    console.log(`✅ 备用搜索找到 ${results.length} 篇论文`);
    
    return results.map(paper => ({
      ...paper,
      download_sources: paper.download_sources ? JSON.parse(paper.download_sources) : null,
      metadata: paper.metadata ? JSON.parse(paper.metadata) : null,
      relevance_score: 0.6
    }));
    
  } catch (error) {
    console.error('❌ 备用搜索失败:', error);
    // 最后返回最新论文
    return await getLatestPapers(limit, filter_venues);
  }
};

// 获取最新论文的函数 - 最简化版本
const getLatestPapers = async (limit = 10, filter_venues = false) => {
  try {
    const pool = getPool();
    console.log('📅 获取最新论文（最简化查询）...');
    
    let sqlQuery = `
      SELECT id, title, authors, abstract, doi, url, download_url, year, journal, venue,
             citation_count, research_method, full_text, translated_abstract, translated_method,
             paper_id, source, is_top_venue, quality_score, download_sources, metadata,
             created_at, updated_at
      FROM paper_cache
    `;
    
    if (filter_venues) {
      sqlQuery += ' WHERE is_top_venue = 1';
    }
    
    sqlQuery += ` ORDER BY created_at DESC LIMIT ${parseInt(limit)}`;
    
    console.log('🔧 最新论文SQL:', sqlQuery.replace(/\s+/g, ' ').trim());
    
    const [results] = await pool.execute(sqlQuery);  // 不使用任何参数
    console.log(`📚 返回 ${results.length} 篇最新论文`);
    
    return results.map(paper => ({
      ...paper,
      download_sources: paper.download_sources ? 
        (typeof paper.download_sources === 'string' ? JSON.parse(paper.download_sources) : paper.download_sources) : null,
      metadata: paper.metadata ? 
        (typeof paper.metadata === 'string' ? JSON.parse(paper.metadata) : paper.metadata) : null,
      relevance_score: 0.3
    }));
    
  } catch (error) {
    console.error('❌ 获取最新论文失败:', error);
    return [];
  }
};

// 解析Coze API响应，提取关键词
const parseKeywordsFromCozeResponse = (reply) => {
  try {
    console.log('开始解析关键词，原始回复:', reply);
    
    // 检查reply是否是对象或字符串
    if (typeof reply === 'object' && reply !== null) {
      // 如果reply是对象，尝试直接从中提取关键词
      if (reply.content && typeof reply.content === 'string') {
        // 如果是消息对象，使用content字段
        reply = reply.content;
      } else {
        // 转换为字符串以便后续处理
        reply = JSON.stringify(reply);
      }
    }
    
    // 尝试解析JSON格式
    const jsonMatch = reply.match(/```json\s*([\s\S]*?)\s*```/i) || reply.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const jsonStr = jsonMatch[1] || jsonMatch[0];
      console.log('找到JSON格式:', jsonStr);
      try {
        const jsonData = JSON.parse(jsonStr);
        if (jsonData.keywords && Array.isArray(jsonData.keywords)) {
          // 使用逗号分隔关键词，保留短语结构
          const keywords = jsonData.keywords
            .filter(kw => kw && typeof kw === 'string' && kw.trim().length > 0)
            .join(','); // 使用逗号而不是空格
          console.log('从JSON中提取的关键词(逗号分隔):', keywords);
          return keywords;
        }
      } catch (jsonError) {
        console.error('JSON解析错误:', jsonError);
      }
    }
    
    // 如果没有找到JSON格式的关键词，尝试从文本中提取
    const keywordsMatch = reply.match(/关键词[:：]\s*([^\n]+)/i) || 
                          reply.match(/keywords[:：]\s*([^\n]+)/i) ||
                          reply.match(/key\s*words[:：]\s*([^\n]+)/i);
    if (keywordsMatch && keywordsMatch[1]) {
      const textKeywords = keywordsMatch[1].trim();
      console.log('从文本中提取的关键词:', textKeywords);
      return textKeywords;
    }
    
    // 尝试查找列表格式的关键词
    const listMatches = reply.match(/\d+\.\s*([^\n,]+)(?:,|\n|$)/g);
    if (listMatches && listMatches.length > 0) {
      const listKeywords = listMatches
        .map(item => item.replace(/^\d+\.\s*/, '').trim())
        .filter(kw => kw.length > 0)
        .join(' ');
      console.log('从列表中提取的关键词:', listKeywords);
      return listKeywords;
    }
    
    // 如果以上都失败，尝试提取英文单词作为关键词
    const words = reply
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 3 && /^[a-zA-Z]+$/.test(word)) // 只保留纯英文且长度>3的词
      .slice(0, 10)
      .join(' ');
    
    if (words.length > 0) {
      console.log('从文本中提取的英文单词作为关键词:', words);
      return words;
    }
    
    // 最后的备用方案
    console.log('无法提取关键词，使用默认关键词');
    return 'research methodology quantitative analysis experimental design';
  } catch (err) {
    console.error('解析关键词错误:', err);
    return 'research methodology quantitative analysis experimental design';
  }
};

// 获取缓存的研究方法API端点
app.post('/api/paper/get-cached-method', async (req, res) => {
  try {
    const { title, doi } = req.body;
    
    if (!title) {
      return res.status(400).json({ 
        success: false,
        error: '需要提供论文标题' 
      });
    }

    console.log('获取缓存的研究方法，标题:', title);
    
    // 这里可以实现缓存逻辑，目前直接尝试获取
    const fullText = await getFullTextFromCore(title, doi, 1, 500); // 减少重试次数和延迟
    let methodSummary = null;
    
    if (fullText) {
      methodSummary = await extractResearchMethod(fullText);
    }
    
    res.json({
      success: !!methodSummary,
      title: title,
      methodSummary: methodSummary
    });
  } catch (error) {
    console.error('获取缓存研究方法错误:', error);
    res.json({ 
      success: false,
      error: error.message
    });
  }
});

// 独立的关键词提取API端点
app.post('/api/extract-keywords', async (req, res) => {
  try {
    const { chatHistory = [], session_id = Date.now().toString() } = req.body;
    console.log('关键词提取API被调用');
    
    // 构建关键词提取消息
    let messageContent = `Please analyze the following text and extract 2-3 key academic search terms. 
Focus on specific technical terms, methodologies, and core concepts.

Please respond in the following JSON format:
\`\`\`json
{
  "keywords": ["keyword1", "keyword2", "keyword3"]
}
\`\`\`

`;

    // 如果有有效的聊天历史，将其添加到消息中
    if (chatHistory && chatHistory.length > 1) {
      messageContent += 'Conversation history:\n';
      
      // 只取最近的几条对话（避免消息过长）
      const recentHistory = chatHistory.slice(-8); // 取最近8条消息
      
      recentHistory.forEach((msg, index) => {
        if (msg.type === 'user') {
          messageContent += `User ${index + 1}: ${msg.content}\n`;
        } else if (msg.type === 'assistant' && !msg.isError) {
          messageContent += `Assistant ${index + 1}: ${msg.content}\n`;
        }
      });
      
      messageContent += '\nBased on the above conversation, extract the most relevant academic search keywords.';
    } else {
      messageContent += 'Please provide some general academic research method keywords, especially in quantitative research methods, experimental design, data analysis, and related fields.';
    }
    
    console.log('发送给Coze API的关键词提取消息:', messageContent);

    // 调用 Coze API 获取关键词
    const keywordResponse = await fetch(`${COZE_API_URL}/open_api/v2/chat`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${COZE_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        bot_id: COZE_BOT_ID,
        user: COZE_USER_ID,
        query: messageContent,
        stream: false,
        conversation_id: `${session_id}_keywords`
      })
    });

    console.log('Coze API关键词提取响应状态:', keywordResponse.status, keywordResponse.statusText);

    if (!keywordResponse.ok) {
      throw new Error(`Coze API responded with status: ${keywordResponse.status}`);
    }

    const result = await keywordResponse.json();
    console.log('Coze API关键词提取响应:', JSON.stringify(result));

    // 提取机器人回复
    let botReply = '';
    
    // v2 API 响应格式
    if (result.messages && Array.isArray(result.messages)) {
      const answerMessages = result.messages.filter(m => m.role === 'assistant' && m.type === 'answer');
      if (answerMessages.length > 0) {
        botReply = answerMessages[0].content;
      }
    }
    // 直接响应格式
    else if (result.answer) {
      botReply = result.answer;
    }
    
    console.log('提取的机器人回复:', botReply);
    
    if (!botReply) {
      throw new Error('未能从Coze API获取有效回复');
    }

    // 从回复中提取关键词
    const extractedKeywords = parseKeywordsFromCozeResponse(botReply);
    
    if (!extractedKeywords || extractedKeywords.length === 0) {
      throw new Error('未能提取到有效关键词');
    }

    res.json({
      success: true,
      keywords: extractedKeywords,
      session_id: session_id
    });

  } catch (error) {
    console.error('关键词提取API错误:', error);
    
    let statusCode = 500;
    let errorMessage = error.message;

    if (error.message && error.message.includes('status:')) {
      const match = error.message.match(/status: (\d+)/);
      if (match && match[1]) {
        const apiStatus = parseInt(match[1], 10);
        if (apiStatus === 429) {
          statusCode = 429;
          errorMessage = '请求过于频繁，请稍后再试。';
        } else if (apiStatus >= 400 && apiStatus < 500) {
          statusCode = apiStatus;
        } else if (apiStatus >= 500) {
          statusCode = 502; // Bad Gateway
          errorMessage = `上游服务错误: ${apiStatus}`;
        }
      }
    }

    res.status(statusCode).json({ 
      success: false,
      error: errorMessage,
      keywords: '',
      session_id: (req.body && req.body.session_id) || 'default'
    });
  }
});

// 修改语义推荐API，支持直接使用关键词搜索
app.post('/api/semantic-recommend', async (req, res) => {
  console.log('语义推荐API被调用');
  
  try {
    const { chatHistory = [], filter_venues = false, session_id = Date.now().toString(), keywords = null } = req.body;
    console.log('接收到的数据:', JSON.stringify(req.body, null, 2));
    
    let searchQuery = 'research methodology quantitative analysis experimental design'; // 默认关键词
    
    // 如果提供了直接的关键词，优先使用
    if (keywords && keywords.trim()) {
      console.log('使用直接提供的关键词:', keywords);
      searchQuery = keywords.trim();
      
      // 检测是否包含中文，如果包含则翻译
      if (/[\u4e00-\u9fa5]/.test(searchQuery)) {
        try {
          console.log('检测到中文关键词，进行翻译');
          const translatedKeywords = await translateToEnglish(searchQuery);
          searchQuery = translatedKeywords;
          console.log(`关键词已翻译: "${keywords}" => "${searchQuery}"`);
        } catch (error) {
          console.error('翻译关键词失败:', error);
          // 翻译失败时继续使用原始关键词
        }
      }
    } else {
      // 否则从聊天历史中提取关键词
      console.log('从聊天历史中提取关键词');
      
      // 构建关键词提取消息
      let messageContent = `Please analyze the following text and extract 2-3 key academic search terms. 
Focus on specific technical terms, methodologies, and core concepts.

Please respond in the following JSON format:
\`\`\`json
{
  "keywords": ["keyword1", "keyword2", "keyword3"]
}
\`\`\`

`;

      // 如果有有效的聊天历史，将其添加到消息中
      const validHistory = chatHistory.filter(msg => 
        msg.type === 'user' || (msg.type === 'assistant' && !msg.isError)
      );
      
      if (validHistory.length > 1) {
        messageContent += 'Conversation history:\n';
        
        // 只取最近的几条对话（避免消息过长）
        const recentHistory = validHistory.slice(-8); // 取最近8条消息
        
        recentHistory.forEach((msg, index) => {
          if (msg.type === 'user') {
            messageContent += `User ${index + 1}: ${msg.content}\n`;
          } else if (msg.type === 'assistant' && !msg.isError) {
            messageContent += `Assistant ${index + 1}: ${msg.content}\n`;
          }
        });
        
        messageContent += '\nBased on the above conversation, extract the most relevant academic search keywords.';
      } else {
        messageContent += 'Please provide some general academic research method keywords, especially in quantitative research methods, experimental design, data analysis, and related fields.';
      }
      
      console.log('发送给Coze API的消息:', messageContent);

      // 调用 Coze API 获取关键词
      try {
        const keywordResponse = await fetch(`${COZE_API_URL}/open_api/v2/chat`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${COZE_API_KEY}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            bot_id: COZE_BOT_ID,
            user: COZE_USER_ID,
            query: messageContent,
            stream: false,
            conversation_id: `${session_id}_keywords`
          })
        });

        console.log('Coze API关键词提取响应状态:', keywordResponse.status, keywordResponse.statusText);

        if (keywordResponse.ok) {
          const result = await keywordResponse.json();
          console.log('Coze API关键词提取响应:', JSON.stringify(result));

          // 提取机器人回复
          let botReply = '';
          
          // v2 API 响应格式
          if (result.messages && Array.isArray(result.messages)) {
            const answerMessages = result.messages.filter(m => m.role === 'assistant' && m.type === 'answer');
            if (answerMessages.length > 0) {
              botReply = answerMessages[0].content;
            }
          }
          // 直接响应格式
          else if (result.answer) {
            botReply = result.answer;
          }
          
          console.log('提取的机器人回复:', botReply);
          
          if (botReply) {
            // 从回复中提取关键词
            const extractedKeywords = parseKeywordsFromCozeResponse(botReply);
            if (extractedKeywords && extractedKeywords.length > 0) {
              searchQuery = extractedKeywords;
              console.log('从Coze API提取的关键词:', searchQuery);
            } else {
              console.log('未能从Coze API响应中提取到有效关键词，使用默认关键词');
            }
          }
        } else {
          console.error('Coze API关键词提取错误:', await keywordResponse.text());
        }
      } catch (cozeError) {
        console.error('调用Coze API关键词提取错误:', cozeError);
        // 如果Coze API调用失败，使用备用方法提取关键词
        if (validHistory.length > 1) {
          const recentHistory = validHistory.slice(-4); // 只取最近4条消息
          const backupKeywords = recentHistory
            .map(msg => msg.content)
            .join(' ')
            .replace(/[^\w\s]/g, ' ') // 移除标点符号
            .split(/\s+/)
            .filter(word => word.length > 2) // 过滤掉太短的词
            .slice(0, 10) // 只取前10个关键词
            .join(' ');
          searchQuery = backupKeywords;
          console.log('使用备用方法提取的关键词:', searchQuery);
        }
      }
    }

    console.log('最终构建的搜索查询:', searchQuery);

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

    // 修复关键词处理问题：保留短语结构，只在关键词之间添加逗号
    let formattedSearchQuery = searchQuery;
    
    try {
      // 首先检查searchQuery是否已经是逗号分隔的格式
      if (searchQuery.includes(',')) {
        console.log('检测到已经是逗号分隔的关键词，保持原样');
        formattedSearchQuery = searchQuery; // 保持原样
      }
      // 检查是否是从JSON中提取的关键词列表（包含引号）
      else if (searchQuery.includes('"') || searchQuery.includes("'")) {
        console.log('检测到包含引号的关键词，尝试保留短语结构');
        
        // 尝试将字符串转回数组
        const keywordArray = searchQuery.match(/"([^"]+)"|'([^']+)'|([^\s,]+)/g)
          .map(kw => kw.replace(/^["']|["']$/g, '').trim())
          .filter(kw => kw.length > 0);
          
        console.log('解析后的关键词数组:', keywordArray);
        
        // 使用逗号连接，但不替换短语内的空格
        formattedSearchQuery = keywordArray.join(',');
      } 
      // 处理普通空格分隔的关键词
      else {
        console.log('处理空格分隔的关键词');
        // 尝试识别短语（连续的多个单词）
        const phrases = [];
        const words = searchQuery.split(/\s+/);
        let currentPhrase = [];
        
        for (const word of words) {
          if (word.length <= 2 || /^(and|or|the|in|on|at|to|of|for|with)$/i.test(word)) {
            // 如果是短词或常见连接词，将其添加到当前短语
            if (currentPhrase.length > 0) {
              currentPhrase.push(word);
            }
          } else if (currentPhrase.length === 0) {
            // 开始新短语
            currentPhrase.push(word);
          } else if (currentPhrase[currentPhrase.length - 1].endsWith(',') || 
                    currentPhrase[currentPhrase.length - 1].endsWith('.')) {
            // 如果前一个词以逗号或句号结尾，开始新短语
            phrases.push(currentPhrase.join(' '));
            currentPhrase = [word];
          } else {
            // 继续当前短语
            currentPhrase.push(word);
          }
        }
        
        // 添加最后一个短语
        if (currentPhrase.length > 0) {
          phrases.push(currentPhrase.join(' '));
        }
        
        // 使用逗号连接短语
        formattedSearchQuery = phrases.join(',');
      }
    } catch (parseError) {
      console.error('解析关键词时出错:', parseError);
      // 出错时保持原样
      formattedSearchQuery = searchQuery;
    }
    
    console.log('格式化后的搜索查询:', formattedSearchQuery);
    
    // 第一步：优先从本地缓存搜索
    console.log('🔍 首先从本地缓存搜索推荐论文...');
    const cacheResults = await searchFromCache(formattedSearchQuery, 5, filter_venues);
    console.log(`📚 本地缓存找到 ${cacheResults.length} 篇推荐论文`);
    
    let allPapers = [];
    let needExternalSearch = true;
    let externalSearchResult = null; // 声明外部搜索结果变量
    
    if (cacheResults.length > 0) {
      // 将缓存结果转换为推荐论文格式
      const formattedCacheResults = cacheResults.map(paper => ({
        id: `cache_${paper.id}`,
        title: paper.title || '',
        abstract: paper.abstract || '',
        downloadUrl: paper.download_url || null,
        year: paper.year?.toString() || '',
        citationCount: paper.citation_count || 0,
        authors: paper.authors ? (typeof paper.authors === 'string' ? paper.authors.split(', ') : paper.authors) : [],
        venue: paper.venue || paper.journal || '',
        fullText: paper.full_text || null,
        researchMethod: paper.research_method || null,
        isTopVenue: paper.is_top_venue || false,
        from_cache: true,
        cache_id: paper.id,
        translated_abstract: paper.translated_abstract,
        translated_method: paper.translated_method,
        source: 'cache'
      }));
      
      allPapers = formattedCacheResults;
      
      // 如果缓存结果已经足够，就不需要外部搜索
      if (cacheResults.length >= 5) {
        needExternalSearch = false;
        console.log('📚 本地缓存结果充足，无需外部搜索');
      }
    }
    
    // 第二步：如果本地结果不足，继续外部搜索
    if (needExternalSearch) {
      const remainingCount = Math.max(0, 5 - allPapers.length);
      console.log(`🌐 本地结果不足，继续外部搜索 ${remainingCount} 篇论文...`);
      
      // 构建基本查询参数 - 不对查询进行编码，保持原始格式
      let searchUrl = `${SEMANTIC_API_BASE}/paper/search?query=${formattedSearchQuery}&limit=${remainingCount}&fields=title,abstract,url,openAccessPdf,year,citationCount,authors,venue`;
      
      // 如果需要过滤期刊/会议，使用venue参数
      if (filter_venues) {
        // 使用原始venue名称，用逗号连接但不进行URL编码
        const venueParam = allowedVenues.join(',');
        searchUrl += `&venue=${venueParam}`;
      }
      
      // 输出最终请求URL用于调试
      console.log('最终Semantic Scholar API请求URL:', searchUrl);

      // 准备请求头 - 只使用基本的Accept头，避免API密钥问题
      const headers = {
        'Accept': 'application/json'
      };
      
      // 输出请求信息用于调试
      console.log('请求头:', JSON.stringify(headers));
      console.log('SEMANTIC_API_KEY是否存在:', !!SEMANTIC_API_KEY);

      // 调用Semantic Scholar API搜索相关论文 - 不使用API密钥
      console.log('开始调用Semantic Scholar API...');
      let searchResponse;
      try {
        searchResponse = await fetchWithRetry(searchUrl, {
          headers: headers
        }, 3, 1000); // 最多重试3次，初始延迟1秒
        
        console.log('Semantic Scholar API响应状态:', searchResponse.status, searchResponse.statusText);
        
        if (!searchResponse.ok) {
          const errorText = await searchResponse.text();
          console.error('Semantic Scholar API错误响应:', errorText);
          throw new Error(`Semantic Scholar API responded with status: ${searchResponse.status}`);
        }
      } catch (fetchError) {
        console.error('Semantic Scholar API请求失败:', fetchError);
        throw fetchError;
      }

      // 解析响应
      try {
        externalSearchResult = await searchResponse.json();
        console.log('Semantic Scholar API响应数据结构:', 
          Object.keys(externalSearchResult), 
          '数据项数量:', externalSearchResult.data ? externalSearchResult.data.length : 0
        );
      } catch (jsonError) {
        console.error('解析Semantic Scholar API响应失败:', jsonError);
        throw jsonError;
      }

      // 处理外部搜索结果
      if (externalSearchResult.data && externalSearchResult.data.length > 0) {
        const externalResults = externalSearchResult.data.map(paper => {
          const venue = paper.venue || '';
          
          // 判断是否是顶会顶刊
          const isTopVenue = allowedVenues.some(allowedVenue => {
            const allowedLower = allowedVenue.toLowerCase();
            const venueLower = venue.toLowerCase();
            
            if (venueLower === allowedLower) return true;
            
            if (allowedLower === 'cscw' && (venueLower === 'cscw' || venueLower.includes('computer-supported cooperative work'))) return true;
            if (allowedLower === 'chi' && (venueLower === 'chi' || venueLower.includes('human factors in computing systems'))) return true;
            if (allowedLower === 'ubicomp' && (venueLower === 'ubicomp' || venueLower.includes('pervasive and ubiquitous computing'))) return true;
            if (allowedLower === 'uist' && (venueLower === 'uist' || venueLower.includes('user interface software and technology'))) return true;
            if (allowedLower === 'tochi' && (venueLower === 'tochi' || venueLower.includes('transactions on computer-human interaction'))) return true;
            
            const words = allowedLower.split(' ');
            if (words.length > 1) {
              return venueLower === allowedLower || 
                     venueLower.includes(` ${allowedLower} `) || 
                     venueLower.startsWith(`${allowedLower} `) || 
                     venueLower.endsWith(` ${allowedLower}`);
            }
            
            return venueLower === allowedLower || 
                   venueLower.includes(` ${allowedLower} `) || 
                   venueLower.startsWith(`${allowedLower} `) || 
                   venueLower.endsWith(` ${allowedLower}`);
          });
          
          return {
            id: `external_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`,
            title: paper.title || '',
            abstract: paper.abstract || '暂无摘要',
            downloadUrl: (paper.openAccessPdf && paper.openAccessPdf.url) || paper.url || null,
            year: paper.year?.toString() || '',
            citationCount: paper.citationCount || 0,
            authors: (paper.authors && paper.authors.map(author => author.name)) || [],
            venue: venue,
            fullText: null,
            researchMethod: null,
            isTopVenue: isTopVenue,
            from_cache: false,
            source: 'external'
          };
        });

        // 合并结果，去重（基于标题）
        const existingTitles = new Set(allPapers.map(r => r.title.toLowerCase()));
        const newResults = externalResults.filter(r => 
          r.title && !existingTitles.has(r.title.toLowerCase())
        );
        
        allPapers = allPapers.concat(newResults);
        console.log(`🌐 外部搜索新增 ${newResults.length} 篇论文`);
      }
    }

    // 限制结果数量并排序
    allPapers = allPapers
      .slice(0, 5)
      .sort((a, b) => {
        // 优先显示缓存结果，然后按引用次数排序
        if (a.from_cache && !b.from_cache) return -1;
        if (!a.from_cache && b.from_cache) return 1;
        return b.citationCount - a.citationCount;
      });

    console.log(`✅ 最终返回 ${allPapers.length} 篇推荐论文 (缓存: ${allPapers.filter(r => r.from_cache).length}, 外部: ${allPapers.filter(r => !r.from_cache).length})`);

    res.json({
      success: true,
      papers: allPapers,
      cache_hits: allPapers.filter(r => r.from_cache).length,
      external_hits: allPapers.filter(r => !r.from_cache).length,
      total_papers: allPapers.length,
      rawResponse: needExternalSearch ? JSON.stringify(externalSearchResult?.data || []) : '本地缓存结果',
      session_id: session_id || 'default'
    });
  } catch (error) {
    console.error('推荐API错误:', error);
    console.error('Error stack:', error.stack);
    
    let statusCode = 500;
    let errorMessage = error.message;

    if (error.message && error.message.includes('status:')) {
      const match = error.message.match(/status: (\d+)/);
      if (match && match[1]) {
        const apiStatus = parseInt(match[1], 10);
        if (apiStatus === 429) {
          statusCode = 429;
          errorMessage = '请求过于频繁，请稍后再试。';
        } else if (apiStatus >= 400 && apiStatus < 500) {
          statusCode = apiStatus;
        } else if (apiStatus >= 500) {
          statusCode = 502; // Bad Gateway
          errorMessage = `上游服务错误: ${apiStatus}`;
        }
      }
    }

    res.status(statusCode).json({ 
      success: false,
      error: errorMessage,
      papers: [],
      rawResponse: `错误：${error.message}`,
      session_id: (req.body && req.body.session_id) || 'default'
    });
  }
});

// 获取论文全文和研究方法的API端点
app.post('/api/paper/get-full-content', async (req, res) => {
  try {
    const { title, doi } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: '需要提供论文标题' });
    }

    console.log('开始获取论文全文和研究方法，标题:', title, doi ? `，DOI: ${doi}` : '');
    
    // 获取全文，传递DOI参数
    const fullText = await getFullTextFromCore(title, doi, 3, 1000);
    let researchMethod = null;
    
    if (fullText) {
      // 如果成功获取全文，尝试提取研究方法
      researchMethod = await extractResearchMethod(fullText);
    }
    
    res.json({
      success: true,
      title: title,
      doi: doi,
      fullText: fullText,
      researchMethod: researchMethod,
      hasContent: !!fullText
    });
  } catch (error) {
    console.error('获取论文内容错误:', error);
    
    let statusCode = 500;
    let errorMessage = error.message;

    if (error.message && error.message.includes('status:')) {
      const match = error.message.match(/status: (\d+)/);
      if (match && match[1]) {
        const apiStatus = parseInt(match[1], 10);
        if (apiStatus === 429) {
          statusCode = 429;
          errorMessage = '请求过于频繁，请稍后再试。';
        } else if (apiStatus >= 400 && apiStatus < 500) {
          statusCode = apiStatus;
        } else if (apiStatus >= 500) {
          statusCode = 502; // Bad Gateway
          errorMessage = `上游服务错误: ${apiStatus}`;
        }
      }
    }

    res.status(statusCode).json({ 
      success: false,
      error: errorMessage
    });
  }
});

// 生成研究方法概要的API端点（备用方法）
app.post('/api/paper/generate-method-summary', async (req, res) => {
  try {
    const { title, fullText } = req.body;
    
    if (!title || !fullText) {
      return res.status(400).json({ 
        success: false,
        error: '需要提供论文标题和全文' 
      });
    }

    console.log('开始生成研究方法概要，标题:', title);
    
    // 使用备用方法生成研究方法概要
    const methodSummary = await generateMethodSummary(fullText);
    
    if (!methodSummary) {
      return res.json({
        success: false,
        error: '无法生成研究方法概要',
        title: title
      });
    }
    
    res.json({
      success: true,
      title: title,
      methodSummary: methodSummary
    });
  } catch (error) {
    console.error('生成研究方法概要错误:', error);
    res.status(500).json({ 
      success: false,
      error: error.message
    });
  }
});

// 测试CORE API路由
app.post('/api/test-core', async (req, res) => {
  try {
    const { title, doi } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: '需要提供论文标题' });
    }

    console.log('测试CORE API，搜索标题:', title, doi ? `，DOI: ${doi}` : '');
    const fullText = await getFullTextFromCore(title, doi);
    
    res.json({
      success: true,
      title: title,
      doi: doi,
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

// 查询统计方法的API端点
app.post('/api/query-statistical-method', async (req, res) => {
  try {
    const { method } = req.body;
    
    if (!method) {
      return res.status(400).json({ 
        success: false,
        error: '需要提供统计方法名称' 
      });
    }

    console.log('开始查询统计方法:', method);
    
    // 首先检查本地存储的方法
    const { findStatisticalMethod } = await import('./statistical-methods-data.js');
    const localMethod = findStatisticalMethod(method);
    
    if (localMethod) {
      console.log('找到本地存储的方法:', localMethod.method);
      return res.json({
        success: true,
        method: localMethod.method,
        explanation: localMethod.content,
        isLocalContent: true,
        source: '本地数据库'
      });
    }
    
    // 如果本地没有找到，则调用AI API
    console.log('本地未找到，调用AI API查询:', method);
    
    const prompt = `作为一个统计学专家，请详细解释以下统计方法：${method}
    
请包含以下内容：
1. 方法定义和用途
2. 适用场景
3. 基本假设
4. 计算步骤
5. 结果解释
6. 注意事项

请用通俗易懂的语言解释，并尽可能提供具体的例子。`;

    const response = await fetch(`${COZE_API_URL}/open_api/v2/chat`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${COZE_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        bot_id: COZE_BOT_ID,
        user: COZE_USER_ID,
        query: prompt,
        stream: false,
        conversation_id: `query_method_${Date.now()}`
      })
    });

    if (!response.ok) {
      throw new Error(`Coze API responded with status: ${response.status}`);
    }

    const result = await response.json();
    let explanation = '';
    
    if (result.messages && Array.isArray(result.messages)) {
      const answerMessages = result.messages.filter(m => m.role === 'assistant' && m.type === 'answer');
      if (answerMessages.length > 0) {
        explanation = answerMessages[0].content;
      }
    } else if (result.answer) {
      explanation = result.answer;
    }

    if (!explanation) {
      throw new Error('未能获取统计方法解释');
    }

    res.json({
      success: true,
      method: method,
      explanation: explanation,
      isLocalContent: false,
      source: 'AI生成'
    });
  } catch (error) {
    console.error('查询统计方法错误:', error);
    
    let statusCode = 500;
    let errorMessage = error.message;

    if (error.message && error.message.includes('status:')) {
      const match = error.message.match(/status: (\d+)/);
      if (match && match[1]) {
        const apiStatus = parseInt(match[1], 10);
        if (apiStatus === 429) {
          statusCode = 429;
          errorMessage = '请求过于频繁，请稍后再试。';
        } else if (apiStatus >= 400 && apiStatus < 500) {
          statusCode = apiStatus;
        } else if (apiStatus >= 500) {
          statusCode = 502; // Bad Gateway
          errorMessage = `上游服务错误: ${apiStatus}`;
        }
      }
    }

    res.status(statusCode).json({ 
      success: false,
      error: errorMessage
    });
  }
});

// Coze聊天API端点 - 用于生成来源介绍等
app.post('/api/coze-chat', async (req, res) => {
  try {
    const { message, conversation_id } = req.body;
    
    if (!message) {
      return res.status(400).json({ 
        success: false,
        error: '需要提供消息内容' 
      });
    }

    console.log('Coze聊天API被调用，消息长度:', message.length);
    console.log('对话ID:', conversation_id);
    
    const response = await fetch(`${COZE_API_URL}/open_api/v2/chat`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${COZE_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        bot_id: COZE_BOT_ID_Reference,
        user: COZE_USER_ID,
        query: message,
        stream: false,
        conversation_id: conversation_id || `chat_${Date.now()}`
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Coze API错误响应 (${response.status}):`, errorText);
      throw new Error(`Coze API responded with status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Coze API响应结构:', Object.keys(result));
    
    let reply = '';
    
    if (result.messages && Array.isArray(result.messages)) {
      const answerMessages = result.messages.filter(m => m.role === 'assistant' && m.type === 'answer');
      if (answerMessages.length > 0) {
        reply = answerMessages[0].content;
      }
    } else if (result.answer) {
      reply = result.answer;
    }

    if (!reply) {
      throw new Error('未能从Coze API获取有效回复');
    }

    console.log('成功获取Coze回复，长度:', reply.length);

    res.json({
      success: true,
      reply: reply,
      conversation_id: conversation_id
    });
  } catch (error) {
    console.error('Coze聊天API错误:', error);
    
    let statusCode = 500;
    let errorMessage = error.message;

    if (error.message && error.message.includes('status:')) {
      const match = error.message.match(/status: (\d+)/);
      if (match && match[1]) {
        const apiStatus = parseInt(match[1], 10);
        if (apiStatus === 429) {
          statusCode = 429;
          errorMessage = '请求过于频繁，请稍后再试。';
        } else if (apiStatus >= 400 && apiStatus < 500) {
          statusCode = apiStatus;
        } else if (apiStatus >= 500) {
          statusCode = 502; // Bad Gateway
          errorMessage = `上游服务错误: ${apiStatus}`;
        }
      }
    }

    res.status(statusCode).json({ 
      success: false,
      error: errorMessage
    });
  }
});

// ==================== 对话历史管理API ====================

// 获取用户的对话列表
app.get('/api/conversations', authenticateToken, async (req, res) => {
  try {
    const pool = getPool();
    const [conversations] = await pool.execute(
      `SELECT id, title, description, created_at, updated_at 
       FROM conversations 
       WHERE user_id = ? 
       ORDER BY updated_at DESC`,
      [req.user.id]
    );

    res.json({
      success: true,
      conversations: conversations
    });
  } catch (error) {
    console.error('获取对话列表错误:', error);
    res.status(500).json({ 
      success: false, 
      error: '服务器内部错误' 
    });
  }
});

// 创建新对话
app.post('/api/conversations', authenticateToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!title) {
      return res.status(400).json({ 
        success: false, 
        error: '对话标题是必需的' 
      });
    }

    const pool = getPool();
    const [result] = await pool.execute(
      'INSERT INTO conversations (user_id, title, description) VALUES (?, ?, ?)',
      [req.user.id, title, description || '']
    );

    const conversationId = result.insertId;

    res.status(201).json({
      success: true,
      conversation: {
        id: conversationId,
        title,
        description: description || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('创建对话错误:', error);
    res.status(500).json({ 
      success: false, 
      error: '服务器内部错误' 
    });
  }
});

// 获取对话详情和消息
app.get('/api/conversations/:id', authenticateToken, async (req, res) => {
  try {
    const conversationId = req.params.id;
    const pool = getPool();

    // 验证对话是否属于当前用户
    const [conversations] = await pool.execute(
      'SELECT * FROM conversations WHERE id = ? AND user_id = ?',
      [conversationId, req.user.id]
    );

    if (conversations.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: '对话不存在或无权访问' 
      });
    }

    // 获取对话消息
    const [messages] = await pool.execute(
      `SELECT id, role, content, created_at 
       FROM messages 
       WHERE conversation_id = ? 
       ORDER BY created_at ASC`,
      [conversationId]
    );

    res.json({
      success: true,
      conversation: conversations[0],
      messages: messages
    });
  } catch (error) {
    console.error('获取对话详情错误:', error);
    res.status(500).json({ 
      success: false, 
      error: '服务器内部错误' 
    });
  }
});

// 向对话添加消息
app.post('/api/conversations/:id/messages', authenticateToken, async (req, res) => {
  try {
    const conversationId = req.params.id;
    const { role, content } = req.body;
    
    if (!role || !content) {
      return res.status(400).json({ 
        success: false, 
        error: '角色和内容都是必需的' 
      });
    }

    if (!['user', 'assistant'].includes(role)) {
      return res.status(400).json({ 
        success: false, 
        error: '角色必须是user或assistant' 
      });
    }

    const pool = getPool();

    // 验证对话是否属于当前用户
    const [conversations] = await pool.execute(
      'SELECT id FROM conversations WHERE id = ? AND user_id = ?',
      [conversationId, req.user.id]
    );

    if (conversations.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: '对话不存在或无权访问' 
      });
    }

    // 添加消息
    const [result] = await pool.execute(
      'INSERT INTO messages (conversation_id, role, content) VALUES (?, ?, ?)',
      [conversationId, role, content]
    );

    // 更新对话的最后更新时间
    await pool.execute(
      'UPDATE conversations SET updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [conversationId]
    );

    res.status(201).json({
      success: true,
      message: {
        id: result.insertId,
        conversation_id: parseInt(conversationId),
        role,
        content,
        created_at: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('添加消息错误:', error);
    res.status(500).json({ 
      success: false, 
      error: '服务器内部错误' 
    });
  }
});

// 删除对话
app.delete('/api/conversations/:id', authenticateToken, async (req, res) => {
  try {
    const conversationId = req.params.id;
    const pool = getPool();

    // 验证对话是否属于当前用户
    const [conversations] = await pool.execute(
      'SELECT id FROM conversations WHERE id = ? AND user_id = ?',
      [conversationId, req.user.id]
    );

    if (conversations.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: '对话不存在或无权访问' 
      });
    }

    // 删除对话（会自动删除相关消息，因为有外键约束）
    await pool.execute(
      'DELETE FROM conversations WHERE id = ? AND user_id = ?',
      [conversationId, req.user.id]
    );

    res.json({
      success: true,
      message: '对话删除成功'
    });
  } catch (error) {
    console.error('删除对话错误:', error);
    res.status(500).json({ 
      success: false, 
      error: '服务器内部错误' 
    });
  }
});

// ==================== 引用文献管理API ====================

// 获取用户的引用文献
app.get('/api/reference-papers', authenticateToken, async (req, res) => {
  try {
    const pool = getPool();
    const [papers] = await pool.execute(
      `SELECT id, title, authors, abstract, doi, url, year, journal, paper_id, created_at 
       FROM reference_papers 
       WHERE user_id = ? 
       ORDER BY created_at DESC`,
      [req.user.id]
    );

    res.json({
      success: true,
      papers: papers
    });
  } catch (error) {
    console.error('获取引用文献错误:', error);
    res.status(500).json({ 
      success: false, 
      error: '服务器内部错误' 
    });
  }
});

// 添加引用文献
app.post('/api/reference-papers', authenticateToken, async (req, res) => {
  try {
    const { title, authors, abstract, doi, url, year, journal, paper_id, conversation_id } = req.body;
    
    if (!title) {
      return res.status(400).json({ 
        success: false, 
        error: '论文标题是必需的' 
      });
    }

    const pool = getPool();

    // 如果指定了conversation_id，验证是否属于当前用户
    if (conversation_id) {
      const [conversations] = await pool.execute(
        'SELECT id FROM conversations WHERE id = ? AND user_id = ?',
        [conversation_id, req.user.id]
      );

      if (conversations.length === 0) {
        return res.status(400).json({ 
          success: false, 
          error: '指定的对话不存在或无权访问' 
        });
      }
    }

    // 检查是否已存在相同的文献（基于标题或DOI）
    let existingCheck = 'SELECT id FROM reference_papers WHERE user_id = ? AND (title = ?';
    let checkParams = [req.user.id, title];
    
    if (doi) {
      existingCheck += ' OR doi = ?';
      checkParams.push(doi);
    }
    existingCheck += ')';

    const [existing] = await pool.execute(existingCheck, checkParams);
    
    if (existing.length > 0) {
      return res.status(400).json({ 
        success: false, 
        error: '该文献已存在于您的引用列表中' 
      });
    }

    // 添加引用文献
    const [result] = await pool.execute(
      `INSERT INTO reference_papers 
       (user_id, conversation_id, title, authors, abstract, doi, url, year, journal, paper_id) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [req.user.id, conversation_id || null, title, authors || '', abstract || '', 
       doi || null, url || '', year || null, journal || '', paper_id || null]
    );

    res.status(201).json({
      success: true,
      paper: {
        id: result.insertId,
        title,
        authors: authors || '',
        abstract: abstract || '',
        doi: doi || null,
        url: url || '',
        year: year || null,
        journal: journal || '',
        paper_id: paper_id || null,
        created_at: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('添加引用文献错误:', error);
    res.status(500).json({ 
      success: false, 
      error: '服务器内部错误' 
    });
  }
});

// 删除引用文献
app.delete('/api/reference-papers/:id', authenticateToken, async (req, res) => {
  try {
    const paperId = req.params.id;
    const pool = getPool();

    // 验证文献是否属于当前用户
    const [papers] = await pool.execute(
      'SELECT id FROM reference_papers WHERE id = ? AND user_id = ?',
      [paperId, req.user.id]
    );

    if (papers.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: '文献不存在或无权访问' 
      });
    }

    // 删除引用文献
    await pool.execute(
      'DELETE FROM reference_papers WHERE id = ? AND user_id = ?',
      [paperId, req.user.id]
    );

    res.json({
      success: true,
      message: '文献删除成功'
    });
  } catch (error) {
    console.error('删除引用文献错误:', error);
    res.status(500).json({ 
      success: false, 
      error: '服务器内部错误' 
    });
  }
});

// ==================== 研究方案管理API ====================

// 获取用户的研究方案
app.get('/api/research-plans', authenticateToken, async (req, res) => {
  try {
    const pool = getPool();
    const [plans] = await pool.execute(
      `SELECT id, title, description, hypotheses, experimental_design, analysis_method, 
              expected_results, methodology, timeline, resources, source_introductions, 
              status, created_at, updated_at 
       FROM research_plans 
       WHERE user_id = ? 
       ORDER BY updated_at DESC`,
      [req.user.id]
    );

    res.json({
      success: true,
      plans: plans
    });
  } catch (error) {
    console.error('获取研究方案错误:', error);
    res.status(500).json({ 
      success: false, 
      error: '服务器内部错误' 
    });
  }
});

    // 创建研究方案
app.post('/api/research-plans', authenticateToken, async (req, res) => {
  try {
    const { 
      title, 
      description, 
      hypotheses, 
      experimental_design, 
      analysis_method, 
      expected_results,
      methodology, 
      timeline, 
      resources, 
      source_introductions,
      status, 
      conversation_id, 
      reference_ids 
    } = req.body;
    
    if (!title) {
      return res.status(400).json({ 
        success: false, 
        error: '方案标题是必需的' 
      });
    }

    const pool = getPool();

    // 如果指定了conversation_id，验证是否属于当前用户
    if (conversation_id) {
      const [conversations] = await pool.execute(
        'SELECT id FROM conversations WHERE id = ? AND user_id = ?',
        [conversation_id, req.user.id]
      );

      if (conversations.length === 0) {
        return res.status(400).json({ 
          success: false, 
          error: '指定的对话不存在或无权访问' 
        });
      }
    }

    // 获取连接并开始事务
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();

      // 创建研究方案
      const [result] = await connection.execute(
        `INSERT INTO research_plans 
         (user_id, conversation_id, title, description, hypotheses, experimental_design, 
          analysis_method, expected_results, methodology, timeline, resources, source_introductions, status) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [req.user.id, conversation_id || null, title, description || '', 
         hypotheses || '', experimental_design || '', analysis_method || '', expected_results || '',
         methodology || '', timeline || '', resources || '', source_introductions || '', status || 'draft']
      );

      const planId = result.insertId;

      // 如果指定了reference_ids，建立关联关系
      if (reference_ids && Array.isArray(reference_ids) && reference_ids.length > 0) {
        // 验证所有引用文献都属于当前用户
        const placeholders = reference_ids.map(() => '?').join(',');
        const [userPapers] = await connection.execute(
          `SELECT id FROM reference_papers WHERE id IN (${placeholders}) AND user_id = ?`,
          [...reference_ids, req.user.id]
        );

        if (userPapers.length !== reference_ids.length) {
          throw new Error('部分引用文献不属于当前用户');
        }

        // 建立关联关系
        for (const refId of reference_ids) {
          await connection.execute(
            'INSERT INTO plan_references (plan_id, reference_id) VALUES (?, ?)',
            [planId, refId]
          );
        }
      }

      // 提交事务
      await connection.commit();

      res.status(201).json({
        success: true,
        plan: {
          id: planId,
          title,
          description: description || '',
          methodology: methodology || '',
          timeline: timeline || '',
          resources: resources || '',
          status: status || 'draft',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      });
    } catch (error) {
      // 回滚事务
      await connection.rollback();
      throw error;
    } finally {
      // 释放连接
      connection.release();
    }
  } catch (error) {
    console.error('创建研究方案错误:', error);
    console.error('错误堆栈:', error.stack);
    console.error('错误代码:', error.code);
    console.error('错误信息:', error.message);
    res.status(500).json({ 
      success: false, 
      error: error.message === '部分引用文献不属于当前用户' ? error.message : '服务器内部错误',
      debug: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// 获取研究方案详情和关联的引用文献
app.get('/api/research-plans/:id', authenticateToken, async (req, res) => {
  try {
    const planId = req.params.id;
    const pool = getPool();

    // 验证方案是否属于当前用户
    const [plans] = await pool.execute(
      `SELECT id, title, description, hypotheses, experimental_design, analysis_method, 
              expected_results, methodology, timeline, resources, source_introductions, 
              status, created_at, updated_at, user_id, conversation_id
       FROM research_plans WHERE id = ? AND user_id = ?`,
      [planId, req.user.id]
    );

    if (plans.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: '研究方案不存在或无权访问' 
      });
    }

    // 获取关联的引用文献
    const [references] = await pool.execute(
      `SELECT rp.id, rp.title, rp.authors, rp.abstract, rp.doi, rp.url, rp.year, rp.journal, rp.paper_id
       FROM reference_papers rp
       INNER JOIN plan_references pr ON rp.id = pr.reference_id
       WHERE pr.plan_id = ?`,
      [planId]
    );

    res.json({
      success: true,
      plan: plans[0],
      references: references
    });
  } catch (error) {
    console.error('获取研究方案详情错误:', error);
    res.status(500).json({ 
      success: false, 
      error: '服务器内部错误' 
    });
  }
});

// 更新研究方案
app.put('/api/research-plans/:id', authenticateToken, async (req, res) => {
  try {
    const planId = req.params.id;
    const { title, description, methodology, timeline, resources, status } = req.body;
    
    const pool = getPool();

    // 验证方案是否属于当前用户
    const [plans] = await pool.execute(
      'SELECT id FROM research_plans WHERE id = ? AND user_id = ?',
      [planId, req.user.id]
    );

    if (plans.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: '研究方案不存在或无权访问' 
      });
    }

    // 构建更新SQL
    const updates = [];
    const values = [];

    if (title !== undefined) {
      updates.push('title = ?');
      values.push(title);
    }
    if (description !== undefined) {
      updates.push('description = ?');
      values.push(description);
    }
    if (methodology !== undefined) {
      updates.push('methodology = ?');
      values.push(methodology);
    }
    if (timeline !== undefined) {
      updates.push('timeline = ?');
      values.push(timeline);
    }
    if (resources !== undefined) {
      updates.push('resources = ?');
      values.push(resources);
    }
    if (status !== undefined) {
      updates.push('status = ?');
      values.push(status);
    }

    if (updates.length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: '至少需要提供一个要更新的字段' 
      });
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');
    values.push(planId, req.user.id);

    await pool.execute(
      `UPDATE research_plans SET ${updates.join(', ')} WHERE id = ? AND user_id = ?`,
      values
    );

    res.json({
      success: true,
      message: '研究方案更新成功'
    });
  } catch (error) {
    console.error('更新研究方案错误:', error);
    res.status(500).json({ 
      success: false, 
      error: '服务器内部错误' 
    });
  }
});

// 删除研究方案
app.delete('/api/research-plans/:id', authenticateToken, async (req, res) => {
  try {
    const planId = req.params.id;
    const pool = getPool();

    // 验证方案是否属于当前用户
    const [plans] = await pool.execute(
      'SELECT id FROM research_plans WHERE id = ? AND user_id = ?',
      [planId, req.user.id]
    );

    if (plans.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: '研究方案不存在或无权访问' 
      });
    }

    // 删除研究方案（会自动删除关联的引用关系，因为有外键约束）
    await pool.execute(
      'DELETE FROM research_plans WHERE id = ? AND user_id = ?',
      [planId, req.user.id]
    );

    res.json({
      success: true,
      message: '研究方案删除成功'
    });
  } catch (error) {
    console.error('删除研究方案错误:', error);
    res.status(500).json({ 
      success: false, 
      error: '服务器内部错误' 
    });
  }
});

// ==================== 论文缓存管理API ====================

// 保存或更新论文到缓存
app.post('/api/paper-cache/save', optionalAuth, async (req, res) => {
  try {
    const { 
      title, 
      authors, 
      abstract, 
      doi, 
      url, 
      download_url, 
      year, 
      journal, 
      venue,
      citation_count, 
      research_method, 
      full_text, 
      translated_abstract, 
      translated_method,
      paper_id, 
      source, 
      is_top_venue,
      download_sources,
      metadata 
    } = req.body;
    
    if (!title) {
      return res.status(400).json({ 
        success: false, 
        error: '论文标题是必需的' 
      });
    }

    // 验证和处理source值
    const allowedSources = ['search', 'recommendation', 'manual'];
    let validSource = 'manual'; // 默认值
    
    if (source && typeof source === 'string') {
      console.log('🔍 收到的source值:', JSON.stringify(source));
      const trimmedSource = source.trim().toLowerCase();
      if (allowedSources.includes(trimmedSource)) {
        validSource = trimmedSource;
      } else {
        console.warn('⚠️ 无效的source值:', source, '使用默认值:', validSource);
      }
    }
    
    console.log('✅ 使用的source值:', validSource);

    // 验证和处理paper_id长度
    let validPaperId = paper_id;
    if (paper_id && typeof paper_id === 'string') {
      if (paper_id.length > 255) {
        console.warn('⚠️ paper_id过长，进行截断:', paper_id.length, '字符');
        validPaperId = paper_id.substring(0, 255);
        console.log('✂️ 截断后的paper_id长度:', validPaperId.length);
      }
    }
    
    // 验证其他字段长度
    let validTitle = title;
    if (title && title.length > 500) {
      console.warn('⚠️ 标题过长，进行截断:', title.length, '字符');
      validTitle = title.substring(0, 500);
    }
    
    let validDoi = doi;
    if (doi && doi.length > 100) {
      console.warn('⚠️ DOI过长，进行截断:', doi.length, '字符');
      validDoi = doi.substring(0, 100);
    }

    const pool = getPool();
    
    // 计算质量评分 (基于引用次数、是否顶会顶刊等)
    let quality_score = 0.5; // 基础分
    if (citation_count) {
      quality_score += Math.min(citation_count / 1000, 0.3); // 引用次数加分，最多0.3
    }
    if (is_top_venue) {
      quality_score += 0.2; // 顶会顶刊加分
    }
    quality_score = Math.min(quality_score, 1.0); // 最高1.0分

    // 检查论文是否已存在（基于标题和DOI）
    let existingPaper = null;
    if (validDoi) {
      const [doiResults] = await pool.execute(
        'SELECT id FROM paper_cache WHERE doi = ? AND doi IS NOT NULL AND doi != ""',
        [validDoi]
      );
      if (doiResults.length > 0) {
        existingPaper = doiResults[0];
      }
    }
    
    if (!existingPaper) {
      const [titleResults] = await pool.execute(
        'SELECT id FROM paper_cache WHERE title = ?',
        [validTitle]
      );
      if (titleResults.length > 0) {
        existingPaper = titleResults[0];
      }
    }

    let paperId;
    
    if (existingPaper) {
      // 更新现有论文
      paperId = existingPaper.id;
      await pool.execute(
        `UPDATE paper_cache SET 
         title = ?, authors = ?, abstract = ?, doi = ?, url = ?, download_url = ?,
         year = ?, journal = ?, venue = ?, citation_count = ?, research_method = ?,
         full_text = ?, translated_abstract = ?, translated_method = ?, paper_id = ?,
         source = ?, is_top_venue = ?, quality_score = ?, download_sources = ?, metadata = ?,
         updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`,
        [
          validTitle, authors, abstract, validDoi, url, download_url, year, journal, venue,
          citation_count || 0, research_method, full_text, translated_abstract, 
          translated_method, validPaperId, validSource, is_top_venue || false,
          quality_score, download_sources ? JSON.stringify(download_sources) : null,
          metadata ? JSON.stringify(metadata) : null, paperId
        ]
      );
      console.log(`✅ 更新论文缓存: ${validTitle}`);
    } else {
      // 创建新论文缓存
      const [result] = await pool.execute(
        `INSERT INTO paper_cache 
         (title, authors, abstract, doi, url, download_url, year, journal, venue,
          citation_count, research_method, full_text, translated_abstract, translated_method,
          paper_id, source, is_top_venue, quality_score, download_sources, metadata) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          validTitle, authors, abstract, validDoi, url, download_url, year, journal, venue,
          citation_count || 0, research_method, full_text, translated_abstract, 
          translated_method, validPaperId, validSource, is_top_venue || false,
          quality_score, download_sources ? JSON.stringify(download_sources) : null,
          metadata ? JSON.stringify(metadata) : null
        ]
      );
      paperId = result.insertId;
      console.log(`✅ 新增论文缓存: ${validTitle}`);
    }

    res.json({
      success: true,
      message: existingPaper ? '论文缓存更新成功' : '论文缓存保存成功',
      paper_id: paperId,
      is_update: !!existingPaper
    });
  } catch (error) {
    console.error('保存论文缓存错误:', error);
    res.status(500).json({ 
      success: false, 
      error: '服务器内部错误' 
    });
  }
});

// 检查论文是否已缓存
app.post('/api/paper-cache/check', optionalAuth, async (req, res) => {
  try {
    const { title, doi } = req.body;
    
    if (!title && !doi) {
      return res.status(400).json({ 
        success: false, 
        error: '需要提供论文标题或DOI' 
      });
    }

    const pool = getPool();
    let query = 'SELECT id, title, updated_at FROM paper_cache WHERE ';
    let params = [];
    
    if (doi) {
      query += 'doi = ? AND doi IS NOT NULL AND doi != ""';
      params.push(doi);
    } else {
      query += 'title = ?';
      params.push(title);
    }

    const [results] = await pool.execute(query, params);
    
    res.json({
      success: true,
      cached: results.length > 0,
      paper: results.length > 0 ? results[0] : null
    });
  } catch (error) {
    console.error('检查论文缓存错误:', error);
    res.status(500).json({ 
      success: false, 
      error: '服务器内部错误' 
    });
  }
});

// 从本地缓存搜索论文
app.post('/api/paper-cache/search', optionalAuth, async (req, res) => {
  try {
    const { query, limit = 10, filter_venues = false } = req.body;
    
    if (!query || query.trim().length < 2) {
      return res.json({
        success: true,
        papers: [],
        total: 0,
        from_cache: true
      });
    }

    const pool = getPool();
    const searchQuery = query.trim();
    
    // 构建SQL查询
    let sqlQuery = `
      SELECT id, title, authors, abstract, doi, url, download_url, year, journal, venue,
             citation_count, research_method, full_text, translated_abstract, translated_method,
             paper_id, source, is_top_venue, quality_score, download_sources, metadata,
             created_at, updated_at,
             MATCH(title, abstract) AGAINST(? IN NATURAL LANGUAGE MODE) as relevance_score
      FROM paper_cache 
      WHERE MATCH(title, abstract) AGAINST(? IN NATURAL LANGUAGE MODE)
    `;
    
    let params = [searchQuery, searchQuery];
    
    // 如果需要过滤顶会顶刊
    if (filter_venues) {
      sqlQuery += ' AND is_top_venue = TRUE';
    }
    
    // 按相关性和质量评分排序
    sqlQuery += ' ORDER BY relevance_score DESC, quality_score DESC, citation_count DESC';
    sqlQuery += ' LIMIT ?';
    params.push(parseInt(limit));

    const [results] = await pool.execute(sqlQuery, params);
    
    // 处理结果，解析JSON字段
    const papers = results.map(paper => ({
      ...paper,
      download_sources: paper.download_sources ? JSON.parse(paper.download_sources) : null,
      metadata: paper.metadata ? JSON.parse(paper.metadata) : null,
      from_cache: true
    }));

    console.log(`🔍 本地缓存搜索到 ${papers.length} 篇论文，查询: "${searchQuery}"`);

    res.json({
      success: true,
      papers: papers,
      total: papers.length,
      from_cache: true,
      query: searchQuery
    });
  } catch (error) {
    console.error('本地缓存搜索错误:', error);
    res.status(500).json({ 
      success: false, 
      error: '服务器内部错误' 
    });
  }
});

// 获取缓存的论文详情
app.get('/api/paper-cache/:id', optionalAuth, async (req, res) => {
  try {
    const paperId = req.params.id;
    const pool = getPool();

    const [results] = await pool.execute(
      `SELECT * FROM paper_cache WHERE id = ?`,
      [paperId]
    );

    if (results.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: '论文不存在' 
      });
    }

    const paper = results[0];
    
    // 解析JSON字段
    paper.download_sources = paper.download_sources ? JSON.parse(paper.download_sources) : null;
    paper.metadata = paper.metadata ? JSON.parse(paper.metadata) : null;
    paper.from_cache = true;

    res.json({
      success: true,
      paper: paper
    });
  } catch (error) {
    console.error('获取缓存论文详情错误:', error);
    res.status(500).json({ 
      success: false, 
      error: '服务器内部错误' 
    });
  }
});

// 删除缓存的论文
app.delete('/api/paper-cache/:id', authenticateToken, async (req, res) => {
  try {
    const paperId = req.params.id;
    const pool = getPool();

    const [result] = await pool.execute(
      'DELETE FROM paper_cache WHERE id = ?',
      [paperId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false, 
        error: '论文不存在' 
      });
    }

    res.json({
      success: true,
      message: '论文删除成功'
    });
  } catch (error) {
    console.error('删除缓存论文错误:', error);
    res.status(500).json({ 
      success: false, 
      error: '服务器内部错误' 
    });
  }
});

// 获取缓存统计信息
app.get('/api/paper-cache/stats', optionalAuth, async (req, res) => {
  try {
    const pool = getPool();

    const [totalResults] = await pool.execute(
      'SELECT COUNT(*) as total FROM paper_cache'
    );
    
    const [topVenueResults] = await pool.execute(
      'SELECT COUNT(*) as top_venues FROM paper_cache WHERE is_top_venue = TRUE'
    );
    
    const [recentResults] = await pool.execute(
      'SELECT COUNT(*) as recent FROM paper_cache WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)'
    );

    res.json({
      success: true,
      stats: {
        total_papers: totalResults[0].total,
        top_venue_papers: topVenueResults[0].top_venues,
        recent_papers: recentResults[0].recent
      }
    });
  } catch (error) {
    console.error('获取缓存统计错误:', error);
    res.status(500).json({ 
      success: false, 
      error: '服务器内部错误' 
    });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 MethodMate API服务器运行在端口 ${PORT}`);
  console.log(`环境: ${process.env.NODE_ENV || 'development'}`);
}); 