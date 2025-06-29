import express from 'express';
import cors from 'cors';
import https from 'https';
import fetch from 'node-fetch';
import axios from 'axios';
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
    ? ['https://method-mate.vercel.app', 'http://1.13.253.97:3004','http://1.13.253.97','http://1.13.253.97:3002', 'https://1.13.253.97:3004', 'https://1.13.253.97'] 
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

// 导入统计方法数据库查询服务
import { searchStatisticalMethodFromDB, getAllStatisticalMethods, getStatisticalMethodById } from './statistical-methods-db.js';

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

// 论文研究方法提取函数 - 改进版，处理长文本，支持智能段落定位
const extractResearchMethod = async (fullText, retries = 3) => {
  try {
    if (!fullText || typeof fullText !== 'string') {
      console.log('无效的论文全文');
      return null;
    }

    // 计算文本长度，用于判断是否需要分段处理
    const textLength = fullText.length;
    console.log(`论文全文长度: ${textLength} 字符`);

    // 定义最大段落长度（约10000个字符，适合处理较长的研究方法内容）
    const MAX_CHUNK_LENGTH = 10000;
    // 定义Coze API的实际处理上限（约20000字符）
    const COZE_API_LIMIT = 20000;
    
    // 1. 首先尝试智能定位所有相关的研究方法段落
    console.log('开始智能定位研究方法相关段落...');
    const methodSections = locateMethodSection(fullText);
    
    if (methodSections) {
      console.log(`成功定位研究方法段落，合并后长度: ${methodSections.length} 字符`);
      
      // 检查合并后的方法段落长度
      if (methodSections.length <= MAX_CHUNK_LENGTH) {
        console.log('合并的研究方法段落长度适中，直接处理');
        return await processFullText(methodSections, retries);
      } else if (methodSections.length <= COZE_API_LIMIT) {
        console.log('合并的研究方法段落较长但在API限制内，直接处理');
        return await processFullText(methodSections, retries);
      } else {
        console.log(`合并的研究方法段落过长(${methodSections.length}字符)，超出API限制，进行智能分段处理`);
        return await processTextInChunks(methodSections, retries);
      }
    }
    
    // 2. 如果智能定位失败，检查文本总长度决定处理策略
    if (textLength <= MAX_CHUNK_LENGTH) {
      console.log('智能定位失败，但论文长度适中，直接处理全文');
      return await processFullText(fullText, retries);
    } else {
      console.log('智能定位失败且论文较长，对全文进行分段处理');
      return await processTextInChunks(fullText, retries);
    }
    
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

// 分段处理长文本 - 改进版，优化分段策略
const processTextInChunks = async (text, retries = 3) => {
  try {
    // 将文本分成较小的块
    const MAX_CHUNK_LENGTH = 10000;
    const chunks = [];
    let currentChunk = '';
    
    // 应用智能段落分割策略（与locateMethodSection相同）
    let paragraphs = [];
    
    // 首先尝试标准的双换行分割
    paragraphs = text.split(/\n\s*\n/);
    
    // 如果只有1个段落且长度超过10000字符，说明分割失败，使用两阶段优化策略
    if (paragraphs.length === 1 && text.length > 10000) {
      console.log('🚨 检测到单一超长段落，启用两阶段优化策略...');
      console.log(`📏 原始文本长度: ${text.length} 字符`);
      
      // 阶段1：强制按10000字符分段
      const FORCE_CHUNK_SIZE = 10000;
      const forcedChunks = [];
      
      for (let i = 0; i < text.length; i += FORCE_CHUNK_SIZE) {
        const chunk = text.slice(i, i + FORCE_CHUNK_SIZE);
        forcedChunks.push(chunk);
      }
      
      console.log(`🔪 阶段1: 强制分段完成，得到 ${forcedChunks.length} 个文本块`);
      
      // 阶段2：对每个文本块进行研究方法相关性评估
      console.log('🔍 阶段2: 开始评估每个文本块的研究方法相关性...');
      
      const evaluatedChunks = [];
      
      forcedChunks.forEach((chunk, index) => {
        const lowerChunk = chunk.toLowerCase();
        let score = 0;
        const foundKeywords = [];
        
        // 检查标题关键词（高权重）
        const titleKeywordMatches = methodTitles.filter(title => {
          const patterns = [
            new RegExp(`\\b\\d+\\.?\\s+${title}\\b`, 'i'),
            new RegExp(`\\b${title}\\b`, 'i'),
            new RegExp(`\\b[ivxlcdm]+\\.?\\s+${title}\\b`, 'i'),
          ];
          return patterns.some(pattern => pattern.test(lowerChunk));
        });
        
        if (titleKeywordMatches.length > 0) {
          score += titleKeywordMatches.length * 15; // 在强制分段中给予更高权重
          foundKeywords.push(...titleKeywordMatches.map(k => `[TITLE]${k}`));
        }
        
        // 检查内容关键词
        const contentKeywordMatches = methodKeywords.filter(keyword => 
          lowerChunk.includes(keyword.toLowerCase())
        );
        score += contentKeywordMatches.length * 2;
        foundKeywords.push(...contentKeywordMatches.slice(0, 3)); // 限制显示数量
        
        // 检查统计术语
        const statisticalPatterns = [
          /\b(p\s*[<>=]\s*0\.\d+|\bp\s*-?\s*value|\balpha\s*=|\bsignificant|\br\s*=|\bf\s*=|\bt\s*=)\b/i,
          /\b(n\s*=\s*\d+|sample\s+size|\bmean\s*=|\bsd\s*=|\bregression|\bcorrelation)\b/i,
          /\b(anova|t-test|chi-square|spss|r software|stata|participants|procedure)\b/i
        ];
        
        const hasStatisticalTerms = statisticalPatterns.some(pattern => pattern.test(lowerChunk));
        if (hasStatisticalTerms) {
          score += 8; // 在强制分段中给予更高统计术语权重
          foundKeywords.push('[STATS]');
        }
        
        // 检查研究方法相关密度（关键词密度）
        const keywordDensity = (contentKeywordMatches.length + titleKeywordMatches.length) / (chunk.length / 1000);
        if (keywordDensity > 2) { // 每1000字符超过2个关键词
          score += Math.floor(keywordDensity) * 3;
          foundKeywords.push('[HIGH_DENSITY]');
        }
        
        evaluatedChunks.push({
          index,
          chunk,
          score,
          keywords: foundKeywords,
          length: chunk.length,
          density: keywordDensity
        });
        
        console.log(`  文本块 ${index + 1}: 得分=${score}, 长度=${chunk.length}, 密度=${keywordDensity.toFixed(2)}, 关键词=${foundKeywords.slice(0, 3).join(',')}`);
      });
      
      // 阶段3：选择高相关性文本块
      // 设定更严格的阈值：得分 >= 12 或包含标题关键词
      const relevantChunks = evaluatedChunks.filter(item => {
        const hasTitle = item.keywords.some(k => k.startsWith('[TITLE]'));
        const hasHighScore = item.score >= 12;
        const hasHighDensity = item.density > 3;
        
        return hasTitle || hasHighScore || hasHighDensity;
      });
      
      console.log(`📋 阶段3: 筛选出 ${relevantChunks.length}/${forcedChunks.length} 个高相关性文本块`);
      
      if (relevantChunks.length === 0) {
        console.log('⚠️ 强制分段后未找到研究方法相关内容，使用传统分割策略作为备用...');
        // 备用策略：使用传统的分割方法
        paragraphs = fullText.split(/[。！？]\s*\n/);
        if (paragraphs.length <= 5) {
          paragraphs = fullText.split(/\n+/);
        }
      } else {
        // 按得分排序，选择最相关的文本块
        relevantChunks.sort((a, b) => b.score - a.score);
        
        // 选择最多5个高相关性文本块，避免内容过多
        const selectedChunks = relevantChunks.slice(0, Math.min(5, relevantChunks.length));
        
        console.log(`✅ 最终选择 ${selectedChunks.length} 个最相关的文本块:`);
        selectedChunks.forEach((item, idx) => {
          console.log(`  ${idx + 1}. 文本块${item.index + 1} (得分:${item.score}, 长度:${item.length}, 密度:${item.density.toFixed(2)})`);
          console.log(`     关键词: ${item.keywords.join(', ')}`);
        });
        
        // 将选中的文本块作为段落
        paragraphs = selectedChunks.map(item => item.chunk);
        
        console.log(`🎯 两阶段策略完成，将 ${paragraphs.length} 个高相关性文本块作为段落进行后续处理`);
      }
    } else {
      // 传统分割策略
      if (paragraphs.length === 1 && fullText.length > 10000) {
        console.log('标准段落分割失败，尝试其他分割策略...');
        
        // 策略1：按句号+换行分割
        paragraphs = fullText.split(/[。！？]\s*\n/);
        console.log(`按句号+换行分割，得到 ${paragraphs.length} 个段落`);
        
        // 如果还是太少，尝试按单换行分割
        if (paragraphs.length <= 5) {
          paragraphs = fullText.split(/\n+/);
          console.log(`按单换行分割，得到 ${paragraphs.length} 个段落`);
        }
        
        // 如果分割出的段落太多，合并短段落
        if (paragraphs.length > 100) {
          console.log('段落过多，执行段落合并...');
          const mergedParagraphs = [];
          let currentPara = '';
          
          for (const para of paragraphs) {
            if (currentPara.length + para.length < 1000) {
              currentPara += (currentPara ? '\n' : '') + para;
            } else {
              if (currentPara) {
                mergedParagraphs.push(currentPara);
              }
              currentPara = para;
            }
          }
          if (currentPara) {
            mergedParagraphs.push(currentPara);
          }
          paragraphs = mergedParagraphs;
          console.log(`合并后得到 ${paragraphs.length} 个段落`);
        }
      }
    }
    
    // 过滤掉过短的段落（少于50字符）
    const originalCount = paragraphs.length;
    paragraphs = paragraphs.filter(p => p.trim().length >= 50);
    if (paragraphs.length < originalCount) {
      console.log(`🧹 过滤掉 ${originalCount - paragraphs.length} 个过短段落`);
    }
    
    console.log(`📋 准备分段处理，共 ${paragraphs.length} 个有效段落`);
    
    // 如果还是只有1个段落且很长，强制按长度分割
    if (paragraphs.length === 1 && paragraphs[0].length > MAX_CHUNK_LENGTH) {
      console.log(`⚠️ 仍然只有1个超长段落(${paragraphs[0].length}字符)，强制按长度分割`);
      const longParagraph = paragraphs[0];
      paragraphs = [];
      
      // 按MAX_CHUNK_LENGTH强制分割
      for (let i = 0; i < longParagraph.length; i += MAX_CHUNK_LENGTH) {
        const chunk = longParagraph.slice(i, i + MAX_CHUNK_LENGTH);
        paragraphs.push(chunk);
      }
      console.log(`🔪 强制分割后得到 ${paragraphs.length} 个段落`);
    }
    
    // 现在按段落组合成块
    for (let i = 0; i < paragraphs.length; i++) {
      const paragraph = paragraphs[i];
      const nextLength = currentChunk.length + paragraph.length + 2;
      
      if (nextLength <= MAX_CHUNK_LENGTH || currentChunk === '') {
        // 如果加入当前段落不会超出限制，或者当前块为空，则加入
        currentChunk += (currentChunk ? '\n\n' : '') + paragraph;
      } else {
        // 否则，保存当前块并开始新块
        if (currentChunk) {
          chunks.push(currentChunk);
          console.log(`📦 创建文本块 ${chunks.length}，长度: ${currentChunk.length} 字符`);
        }
        currentChunk = paragraph;
      }
    }
    
    // 添加最后一个块
    if (currentChunk) {
      chunks.push(currentChunk);
      console.log(`📦 创建文本块 ${chunks.length}，长度: ${currentChunk.length} 字符`);
    }
    
    console.log(`✅ 文本分段完成，共生成 ${chunks.length} 个文本块`);
    
    // 验证没有超长块
    const oversizedChunks = chunks.filter(chunk => chunk.length > MAX_CHUNK_LENGTH * 1.2);
    if (oversizedChunks.length > 0) {
      console.warn(`⚠️ 发现 ${oversizedChunks.length} 个可能过长的文本块，最大长度: ${Math.max(...oversizedChunks.map(c => c.length))} 字符`);
    }
    
    // 处理每个块并收集结果
    const results = [];
    const successfulChunks = [];
    
    for (let i = 0; i < chunks.length; i++) {
      console.log(`🔄 正在处理第 ${i + 1}/${chunks.length} 个文本块 (长度: ${chunks[i].length} 字符)`);
      
      try {
        const result = await processFullText(chunks[i], retries);
        if (result && result.trim()) {
          results.push(result);
          successfulChunks.push(i + 1);
          console.log(`✅ 文本块 ${i + 1} 处理成功，提取到 ${result.length} 字符的方法内容`);
        } else {
          console.log(`⚠️ 文text块 ${i + 1} 未提取到有效的研究方法内容`);
        }
      } catch (error) {
        console.error(`❌ 文本块 ${i + 1} 处理失败:`, error.message);
      }
      
      // 在处理块之间添加延迟，避免API限制
      if (i < chunks.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
    }
    
    // 检查是否找到了任何方法相关内容
    if (results.length === 0) {
      console.log('❌ 未从任何文本块中找到研究方法内容');
      return null;
    }
    
    console.log(`✅ 成功处理 ${results.length}/${chunks.length} 个文本块，文本块编号: [${successfulChunks.join(', ')}]`);
    
    // 合并所有结果
    const combinedResult = results.join('\n\n--- 分段提取结果合并 ---\n\n');
    console.log(`📋 合并结果长度: ${combinedResult.length} 字符`);
    
    // 如果合并后的结果过长，生成简洁摘要
    if (combinedResult.length > MAX_CHUNK_LENGTH * 1.5) {
      console.log(`⚠️ 合并结果过长(${combinedResult.length}字符)，生成简洁摘要...`);
      const summary = await generateMethodSummary(combinedResult);
      if (summary) {
        console.log(`✅ 摘要生成成功，长度: ${summary.length} 字符`);
        return summary;
      } else {
        console.log('⚠️ 摘要生成失败，返回原始合并结果的前半部分');
        return combinedResult.substring(0, MAX_CHUNK_LENGTH) + '\n\n[内容过长，已截断]';
      }
    }
    
    return combinedResult;
  } catch (error) {
    console.error('❌ 分段处理文本时出错:', error);
    return null;
  }
};

// 定位可能包含研究方法的部分 - 改进版：搜索所有可能的研究方法段落
const locateMethodSection = (fullText) => {
  try {
    // 转换为小写以进行不区分大小写的搜索
    const lowerText = fullText.toLowerCase();
    
    // 定义可能表示方法部分的标题关键词
    const methodTitles = [
      'method', 'methodology', 'research design', 'experimental design',
      'research methodology', 'data collection', 'procedure', 'experimental setup',
      'research approach', 'study design', 'research procedure', 'materials and methods',
      'data analysis', 'statistical analysis', 'statistical method', 'analytical approach',
      '方法', '研究方法', '实验方法', '实验设计', '研究设计', '数据收集', '实验程序',
      '数据分析', '统计分析', '统计方法', '分析方法'
    ];
    
    // 定义方法相关的关键词（用于段落内容检测）
    const methodKeywords = [
      'participant', 'procedure', 'measure', 'analysis', 'collect data', 'sample',
      'experiment', 'survey', 'interview', 'questionnaire', 'observation',
      'statistical analysis', 'research design', 'study design', 'method',
      'quantitative', 'qualitative', 'experimental', 'control group', 'treatment',
      'variable', 'hypothesis', 'regression', 'correlation', 'anova', 't-test',
      '参与者', '程序', '测量', '分析', '收集数据', '样本', '实验', '调查', '访谈',
      '问卷', '观察', '统计分析', '研究设计', '研究方法', '定量', '定性', '实验组',
      '对照组', '变量', '假设', '回归', '相关', '方差分析', 't检验'
    ];
    
    // 改进的段落分割策略：支持多种分割模式
    let paragraphs = [];
    
    // 首先尝试标准的双换行分割
    paragraphs = fullText.split(/\n\s*\n/);
    
    // 如果只有1个段落且长度超过10000字符，说明分割失败，使用两阶段优化策略
    if (paragraphs.length === 1 && fullText.length > 10000) {
      console.log('🚨 检测到单一超长段落，启用两阶段优化策略...');
      console.log(`📏 原始文本长度: ${fullText.length} 字符`);
      
      // 阶段1：强制按10000字符分段
      const FORCE_CHUNK_SIZE = 10000;
      const forcedChunks = [];
      
      for (let i = 0; i < fullText.length; i += FORCE_CHUNK_SIZE) {
        const chunk = fullText.slice(i, i + FORCE_CHUNK_SIZE);
        forcedChunks.push(chunk);
      }
      
      console.log(`🔪 阶段1: 强制分段完成，得到 ${forcedChunks.length} 个文本块`);
      
      // 阶段2：对每个文本块进行研究方法相关性评估
      console.log('🔍 阶段2: 开始评估每个文本块的研究方法相关性...');
      
      const evaluatedChunks = [];
      
      forcedChunks.forEach((chunk, index) => {
        const lowerChunk = chunk.toLowerCase();
        let score = 0;
        const foundKeywords = [];
        
        // 检查标题关键词（高权重）
        const titleKeywordMatches = methodTitles.filter(title => {
          const patterns = [
            new RegExp(`\\b\\d+\\.?\\s+${title}\\b`, 'i'),
            new RegExp(`\\b${title}\\b`, 'i'),
            new RegExp(`\\b[ivxlcdm]+\\.?\\s+${title}\\b`, 'i'),
          ];
          return patterns.some(pattern => pattern.test(lowerChunk));
        });
        
        if (titleKeywordMatches.length > 0) {
          score += titleKeywordMatches.length * 15; // 在强制分段中给予更高权重
          foundKeywords.push(...titleKeywordMatches.map(k => `[TITLE]${k}`));
        }
        
        // 检查内容关键词
        const contentKeywordMatches = methodKeywords.filter(keyword => 
          lowerChunk.includes(keyword.toLowerCase())
        );
        score += contentKeywordMatches.length * 2;
        foundKeywords.push(...contentKeywordMatches.slice(0, 3)); // 限制显示数量
        
        // 检查统计术语
        const statisticalPatterns = [
          /\b(p\s*[<>=]\s*0\.\d+|\bp\s*-?\s*value|\balpha\s*=|\bsignificant|\br\s*=|\bf\s*=|\bt\s*=)\b/i,
          /\b(n\s*=\s*\d+|sample\s+size|\bmean\s*=|\bsd\s*=|\bregression|\bcorrelation)\b/i,
          /\b(anova|t-test|chi-square|spss|r software|stata|participants|procedure)\b/i
        ];
        
        const hasStatisticalTerms = statisticalPatterns.some(pattern => pattern.test(lowerChunk));
        if (hasStatisticalTerms) {
          score += 8; // 在强制分段中给予更高统计术语权重
          foundKeywords.push('[STATS]');
        }
        
        // 检查研究方法相关密度（关键词密度）
        const keywordDensity = (contentKeywordMatches.length + titleKeywordMatches.length) / (chunk.length / 1000);
        if (keywordDensity > 2) { // 每1000字符超过2个关键词
          score += Math.floor(keywordDensity) * 3;
          foundKeywords.push('[HIGH_DENSITY]');
        }
        
        evaluatedChunks.push({
          index,
          chunk,
          score,
          keywords: foundKeywords,
          length: chunk.length,
          density: keywordDensity
        });
        
        console.log(`  文本块 ${index + 1}: 得分=${score}, 长度=${chunk.length}, 密度=${keywordDensity.toFixed(2)}, 关键词=${foundKeywords.slice(0, 3).join(',')}`);
      });
      
      // 阶段3：选择高相关性文本块
      // 设定更严格的阈值：得分 >= 12 或包含标题关键词
      const relevantChunks = evaluatedChunks.filter(item => {
        const hasTitle = item.keywords.some(k => k.startsWith('[TITLE]'));
        const hasHighScore = item.score >= 12;
        const hasHighDensity = item.density > 3;
        
        return hasTitle || hasHighScore || hasHighDensity;
      });
      
      console.log(`📋 阶段3: 筛选出 ${relevantChunks.length}/${forcedChunks.length} 个高相关性文本块`);
      
      if (relevantChunks.length === 0) {
        console.log('⚠️ 强制分段后未找到研究方法相关内容，使用传统分割策略作为备用...');
        // 备用策略：使用传统的分割方法
        paragraphs = fullText.split(/[。！？]\s*\n/);
        if (paragraphs.length <= 5) {
          paragraphs = fullText.split(/\n+/);
        }
      } else {
        // 按得分排序，选择最相关的文本块
        relevantChunks.sort((a, b) => b.score - a.score);
        
        // 选择最多5个高相关性文本块，避免内容过多
        const selectedChunks = relevantChunks.slice(0, Math.min(5, relevantChunks.length));
        
        console.log(`✅ 最终选择 ${selectedChunks.length} 个最相关的文本块:`);
        selectedChunks.forEach((item, idx) => {
          console.log(`  ${idx + 1}. 文本块${item.index + 1} (得分:${item.score}, 长度:${item.length}, 密度:${item.density.toFixed(2)})`);
          console.log(`     关键词: ${item.keywords.join(', ')}`);
        });
        
        // 将选中的文本块作为段落
        paragraphs = selectedChunks.map(item => item.chunk);
        
        console.log(`🎯 两阶段策略完成，将 ${paragraphs.length} 个高相关性文本块作为段落进行后续处理`);
      }
    } else {
      // 传统分割策略
      if (paragraphs.length === 1 && fullText.length > 10000) {
        console.log('标准段落分割失败，尝试其他分割策略...');
        
        // 策略1：按句号+换行分割
        paragraphs = fullText.split(/[。！？]\s*\n/);
        console.log(`按句号+换行分割，得到 ${paragraphs.length} 个段落`);
        
        // 如果还是太少，尝试按单换行分割
        if (paragraphs.length <= 5) {
          paragraphs = fullText.split(/\n+/);
          console.log(`按单换行分割，得到 ${paragraphs.length} 个段落`);
        }
        
        // 如果分割出的段落太多，合并短段落
        if (paragraphs.length > 100) {
          console.log('段落过多，执行段落合并...');
          const mergedParagraphs = [];
          let currentPara = '';
          
          for (const para of paragraphs) {
            if (currentPara.length + para.length < 1000) {
              currentPara += (currentPara ? '\n' : '') + para;
            } else {
              if (currentPara) {
                mergedParagraphs.push(currentPara);
              }
              currentPara = para;
            }
          }
          if (currentPara) {
            mergedParagraphs.push(currentPara);
          }
          paragraphs = mergedParagraphs;
          console.log(`合并后得到 ${paragraphs.length} 个段落`);
        }
      }
    }
    
    // 过滤掉过短的段落（少于50字符）
    paragraphs = paragraphs.filter(p => p.trim().length >= 50);
    
    const methodRelatedParagraphs = [];
    const paragraphScores = [];
    
    console.log(`文档共分为 ${paragraphs.length} 个段落，开始分析每个段落...`);
    
    // 第一步：分析每个段落，计算方法相关性得分
    paragraphs.forEach((paragraph, index) => {
      const lowerPara = paragraph.toLowerCase();
      let score = 0;
      const foundKeywords = [];
      
      // 检查是否包含标题关键词（高权重）
      const titleKeywordMatches = methodTitles.filter(title => {
        const patterns = [
          new RegExp(`\\b\\d+\\.?\\s+${title}\\b`, 'i'),  // 数字编号格式
          new RegExp(`\\b${title}\\b`, 'i'),              // 普通单词格式
          new RegExp(`\\b[ivxlcdm]+\\.?\\s+${title}\\b`, 'i'), // 罗马数字格式
        ];
        
        return patterns.some(pattern => pattern.test(lowerPara));
      });
      
      if (titleKeywordMatches.length > 0) {
        score += titleKeywordMatches.length * 10; // 标题关键词高权重
        foundKeywords.push(...titleKeywordMatches.map(k => `[TITLE]${k}`));
        console.log(`段落 ${index + 1} 包含标题关键词: ${titleKeywordMatches.join(', ')}`);
      }
      
      // 检查内容关键词数量（中等权重）
      const contentKeywordMatches = methodKeywords.filter(keyword => 
        lowerPara.includes(keyword.toLowerCase())
      );
      
      score += contentKeywordMatches.length * 2; // 内容关键词中等权重
      foundKeywords.push(...contentKeywordMatches);
      
      // 检查段落长度（短段落降权）
      if (paragraph.length < 100) {
        score *= 0.5; // 过短段落降权
      }
      
      // 检查是否包含数字和统计术语（加权）
      const statisticalPatterns = [
        /\b(p\s*[<>=]\s*0\.\d+|\bp\s*-?\s*value|\balpha\s*=|\bsignificant|\br\s*=|\bf\s*=|\bt\s*=|\bchi-?square|\bregression|\bcorrelation)\b/i,
        /\b(n\s*=\s*\d+|sample\s+size|\bmean\s*=|\bsd\s*=|\bstd\s*=|\bmedian|\bmode)\b/i,
        /\b(anova|t-test|chi-square|regression|correlation|spss|r software|stata|sas)\b/i
      ];
      
      const hasStatisticalTerms = statisticalPatterns.some(pattern => pattern.test(lowerPara));
      if (hasStatisticalTerms) {
        score += 5; // 统计术语加权
        foundKeywords.push('[STATS]');
      }
      
      paragraphScores.push({
        index,
        paragraph,
        score,
        keywords: foundKeywords,
        length: paragraph.length
      });
    });
    
    // 第二步：根据得分筛选相关段落
    // 设定阈值：包含标题关键词的段落（score >= 10）或包含多个内容关键词的段落（score >= 6）
    const relevantParagraphs = paragraphScores.filter(item => {
      const hasTitle = item.keywords.some(k => k.startsWith('[TITLE]'));
      const hasEnoughContent = item.score >= 6;
      return hasTitle || hasEnoughContent;
    });
    
    // 按得分排序
    relevantParagraphs.sort((a, b) => b.score - a.score);
    
    console.log(`找到 ${relevantParagraphs.length} 个可能包含研究方法的段落:`);
    relevantParagraphs.forEach((item, idx) => {
      console.log(`  ${idx + 1}. 段落 ${item.index + 1} (得分: ${item.score}, 长度: ${item.length})`);
      console.log(`     关键词: ${item.keywords.slice(0, 5).join(', ')}${item.keywords.length > 5 ? '...' : ''}`);
    });
    
    if (relevantParagraphs.length === 0) {
      console.log('未找到包含足够研究方法信息的段落');
      return null;
    }
    
    // 第三步：智能合并段落
    let selectedParagraphs = [];
    
    // 如果有标题段落，优先选择得分最高的标题段落及其相邻段落
    const titleParagraphs = relevantParagraphs.filter(item => 
      item.keywords.some(k => k.startsWith('[TITLE]'))
    );
    
    if (titleParagraphs.length > 0) {
      console.log('找到标题段落，采用基于标题的策略');
      
      // 选择得分最高的标题段落
      const primaryTitle = titleParagraphs[0];
      selectedParagraphs.push(primaryTitle);
      
      // 查找该标题段落之后的相关段落（在一定范围内）
      const maxRange = 10; // 最多向后查找10个段落
      const startIdx = primaryTitle.index + 1;
      const endIdx = Math.min(primaryTitle.index + maxRange, paragraphs.length);
      
      for (let i = startIdx; i < endIdx; i++) {
        const candidateParagraph = paragraphScores.find(p => p.index === i);
        if (candidateParagraph && candidateParagraph.score >= 4) {
          selectedParagraphs.push(candidateParagraph);
        }
      }
      
      // 同时添加其他高得分的标题段落
      titleParagraphs.slice(1).forEach(titlePara => {
        if (titlePara.score >= 15) { // 只添加高得分的其他标题段落
          selectedParagraphs.push(titlePara);
        }
      });
    } else {
      console.log('未找到明确标题段落，采用基于内容的策略');
      // 如果没有标题段落，选择得分最高的几个段落
      selectedParagraphs = relevantParagraphs.slice(0, Math.min(5, relevantParagraphs.length));
    }
    
    // 去重并按原文顺序排序
    const uniqueParagraphs = Array.from(new Set(selectedParagraphs.map(p => p.index)))
      .sort((a, b) => a - b)
      .map(index => paragraphScores.find(p => p.index === index));
    
    console.log(`最终选择 ${uniqueParagraphs.length} 个段落进行合并`);
    
    // 第四步：合并选中的段落
    const combinedText = uniqueParagraphs.map(item => item.paragraph).join('\n\n');
    
    console.log(`合并后文本长度: ${combinedText.length} 字符`);
    
    if (combinedText.length === 0) {
      console.log('合并后文本为空');
      return null;
    }
    
    return combinedText;
    
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

// 中间件 - 增加请求体大小限制以支持论文全文保存
app.use(express.json({ limit: '50mb', parameterLimit: 50000 }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(express.text({ limit: '50mb' }));
app.use(express.raw({ limit: '50mb' }));
// 静态文件服务
app.use(express.static(join(__dirname, '..', 'public')));  // 开发测试文件
app.use(express.static(join(__dirname, '..', 'dist')));    // 前端构建文件

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
    
    // 用户名和密码是必需的，邮箱可选
    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        error: '用户名和密码都是必需的' 
      });
    }

    // 如果提供了邮箱，验证邮箱格式
    if (email && email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return res.status(400).json({ 
          success: false, 
          error: '邮箱格式不正确' 
        });
      }
    }

    // 验证密码长度
    if (password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        error: '密码长度至少为6位' 
      });
    }

    const pool = getPool();
    
    // 处理邮箱：如果为空字符串或未提供，设为null
    const cleanEmail = (email && email.trim()) ? email.trim() : null;
    
    // 检查用户名是否已存在，以及邮箱是否已存在（如果提供了邮箱）
    let checkQuery = 'SELECT id FROM users WHERE username = ?';
    let checkParams = [username];
    
    if (cleanEmail) {
      checkQuery += ' OR email = ?';
      checkParams.push(cleanEmail);
    }
    
    const [existingUsers] = await pool.execute(checkQuery, checkParams);

    if (existingUsers.length > 0) {
      return res.status(400).json({ 
        success: false, 
        error: cleanEmail ? '用户名或邮箱已存在' : '用户名已存在' 
      });
    }

    // 加密密码
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 创建用户
    const [result] = await pool.execute(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, cleanEmail, hashedPassword]
    );

    const userId = result.insertId;

    // 生成JWT token
    const token = jwt.sign(
      { id: userId, username, email: cleanEmail },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    res.status(201).json({
      success: true,
      message: '用户注册成功',
      user: {
        id: userId,
        username,
        email: cleanEmail
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
      'SELECT id, username, email, password_hash FROM users WHERE username = ? OR (email IS NOT NULL AND email = ?)',
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

// 论文缓存浏览器页面路由
app.get('/papers', (req, res) => {
  res.redirect('/paper-cache-browser.html');
});

// 健康检查端点
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    message: 'MethodMate API服务器运行正常',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
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
    const { query, num_results = 10, filter_venues = false } = req.body;
    
    if (!query) {
      return res.status(400).json({ 
        success: false,
        error: 'Query parameter is required' 
      });
    }

          console.log(`执行学术搜索，查询: "${query}", 结果数: ${num_results}`);
    
    // 首先从本地缓存搜索
    console.log('🔍 首先从本地缓存搜索...');
    const excludeIds = req.body.exclude_ids || []; // 从请求中获取要排除的论文ID
    const excludeTitles = req.body.exclude_titles || []; // 从请求中获取要排除的论文标题
    const cacheResults = await searchFromCache(query, num_results, filter_venues, excludeIds);
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
          const existingTitles = new Set([
            ...allResults.map(r => r.title.toLowerCase()),  // 本次搜索的缓存结果
            ...excludeTitles.map(t => t.toLowerCase())      // 全局已显示的论文标题
          ]);
          const newResults = externalResults.filter(r => 
            r.title && !existingTitles.has(r.title.toLowerCase())
          );
          
          console.log(`🔍 外部搜索去重：排除了 ${externalResults.length - newResults.length} 篇重复论文`);
          
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

// 辅助函数：从缓存搜索论文 - 增强语义匹配版本
const searchFromCache = async (query, limit = 10, filter_venues = false, excludeIds = []) => {
  try {
    const pool = getPool();
    const searchQuery = query.trim();
    
    if (!searchQuery || searchQuery.length < 2) {
      console.log('🔍 搜索查询过短，返回空结果');
      return [];
    }
    
    console.log(`🔍 开始增强语义缓存搜索，查询: "${searchQuery}", 限制: ${limit}, 过滤顶会: ${filter_venues}, 排除论文数: ${excludeIds.length}`);
    
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
    
    // 第二步：智能关键词处理和扩展
    const keywords = translatedQuery
      .split(',')
      .map(kw => kw.trim())
      .filter(kw => kw.length > 1)
      .slice(0, 5); // 最多5个关键词，避免查询过于复杂
    
    console.log('🔍 原始查询:', query);
    console.log('🔄 翻译后查询:', translatedQuery);
    console.log('🔑 基础关键词:', keywords);
    
    if (keywords.length === 0) {
      console.log('⚠️ 没有有效的搜索关键词');
      return [];
    }
    
    // 第三步：构建语义关键词扩展映射
    const semanticExpansion = {
      // 研究方法相关
      'method': ['methodology', 'approach', 'technique', 'procedure', 'protocol'],
      'methodology': ['method', 'approach', 'technique', 'framework', 'strategy'],
      'approach': ['method', 'methodology', 'technique', 'strategy', 'framework'],
      'analysis': ['analyze', 'analytical', 'examination', 'evaluation', 'assessment'],
      'research': ['study', 'investigation', 'exploration', 'inquiry', 'examination'],
      'study': ['research', 'investigation', 'exploration', 'analysis', 'examination'],
      
      // 数据分析相关
      'quantitative': ['statistical', 'numerical', 'measurement', 'metrics', 'data'],
      'qualitative': ['interpretive', 'descriptive', 'exploratory', 'interview', 'observation'],
      'experimental': ['experiment', 'trial', 'testing', 'controlled', 'empirical'],
      'statistical': ['quantitative', 'numerical', 'analysis', 'metrics', 'measurement'],
      'data': ['information', 'dataset', 'evidence', 'findings', 'results'],
      
      // 设计相关
      'design': ['framework', 'architecture', 'structure', 'layout', 'interface'],
      'user': ['participant', 'subject', 'individual', 'person', 'human'],
      'interface': ['UI', 'interaction', 'usability', 'experience', 'design'],
      'interaction': ['interface', 'engagement', 'communication', 'behavior', 'activity'],
      
      // 技术相关
      'machine': ['artificial', 'automated', 'computer', 'algorithm', 'AI'],
      'learning': ['training', 'education', 'adaptation', 'improvement', 'development'],
      'algorithm': ['method', 'procedure', 'technique', 'computation', 'process'],
      'model': ['framework', 'structure', 'representation', 'system', 'architecture'],
      'system': ['platform', 'framework', 'infrastructure', 'architecture', 'environment'],
      
      // 评估相关
      'evaluation': ['assessment', 'analysis', 'testing', 'validation', 'measurement'],
      'assessment': ['evaluation', 'testing', 'measurement', 'analysis', 'validation'],
      'validation': ['verification', 'testing', 'confirmation', 'evaluation', 'proof'],
      'performance': ['efficiency', 'effectiveness', 'results', 'outcomes', 'metrics']
    };
    
    // 第四步：为每个关键词生成语义扩展
    const expandedKeywords = [];
    keywords.forEach(keyword => {
      const lowerKeyword = keyword.toLowerCase();
      expandedKeywords.push(keyword); // 保留原始关键词
      
      // 查找完全匹配的扩展词
      if (semanticExpansion[lowerKeyword]) {
        expandedKeywords.push(...semanticExpansion[lowerKeyword]);
      }
      
      // 查找部分匹配的扩展词
      Object.keys(semanticExpansion).forEach(key => {
        if (lowerKeyword.includes(key) || key.includes(lowerKeyword)) {
          expandedKeywords.push(...semanticExpansion[key].slice(0, 2)); // 只取前2个，避免过度扩展
        }
      });
    });
    
    // 去重并限制扩展词数量
    const uniqueExpandedKeywords = [...new Set(expandedKeywords)].slice(0, 15);
    console.log('🚀 扩展后的语义关键词:', uniqueExpandedKeywords);
    
    // 第五步：构建多层次搜索策略
    let results = [];
    
    // 策略1：全文搜索（最精确）
    try {
      console.log('📖 策略1：尝试MySQL全文搜索...');
      const fullTextQuery = keywords.join(' ');
      
      let sqlQuery = `
        SELECT id, title, authors, abstract, doi, url, download_url, year, journal, venue,
               citation_count, research_method, full_text, translated_abstract, translated_method,
               paper_id, source, is_top_venue, quality_score, download_sources, metadata,
               created_at, updated_at,
               MATCH(title, abstract) AGAINST(? IN NATURAL LANGUAGE MODE) as relevance_score
        FROM paper_cache 
        WHERE MATCH(title, abstract) AGAINST(? IN NATURAL LANGUAGE MODE)
      `;
      
      const params = [fullTextQuery, fullTextQuery];
      
      if (filter_venues) {
        sqlQuery += ' AND is_top_venue = TRUE';
      }
      
      // 排除已显示的论文
      if (excludeIds.length > 0) {
        const placeholders = excludeIds.map(() => '?').join(',');
        sqlQuery += ` AND id NOT IN (${placeholders})`;
        params.push(...excludeIds);
      }
      
      sqlQuery += ' ORDER BY relevance_score DESC, citation_count DESC';
      sqlQuery += ` LIMIT ${parseInt(limit)}`;
      
      console.log('📝 全文搜索SQL:', sqlQuery.replace(/\s+/g, ' ').trim());
      console.log('🔧 全文搜索参数:', params);
      
      const [fullTextResults] = await pool.execute(sqlQuery, params);
      
      if (fullTextResults.length > 0) {
        console.log(`✅ 全文搜索成功，找到 ${fullTextResults.length} 篇论文`);
        results = fullTextResults.map(paper => ({
          ...paper,
          download_sources: paper.download_sources ? 
            (typeof paper.download_sources === 'string' ? JSON.parse(paper.download_sources) : paper.download_sources) : null,
          metadata: paper.metadata ? 
            (typeof paper.metadata === 'string' ? JSON.parse(paper.metadata) : paper.metadata) : null,
          matched_strategy: 'fulltext',
          relevance_score: paper.relevance_score || 1.0
        }));
        
        if (results.length >= limit) {
          console.log('📚 全文搜索结果充足，直接返回');
          return results;
        }
      } else {
        console.log('⚠️ 全文搜索无结果，继续尝试其他策略');
      }
    } catch (fullTextError) {
      console.log('⚠️ 全文搜索失败，继续尝试其他策略:', fullTextError.message);
    }
    
    // 策略2：扩展关键词匹配（语义相关）
    if (results.length < limit) {
      console.log('🎯 策略2：扩展关键词语义匹配...');
      
      let sqlQuery = `
        SELECT id, title, authors, abstract, doi, url, download_url, year, journal, venue,
               citation_count, research_method, full_text, translated_abstract, translated_method,
               paper_id, source, is_top_venue, quality_score, download_sources, metadata,
               created_at, updated_at
        FROM paper_cache 
        WHERE 1=1
      `;
      
      const params = [];
      
      // 使用扩展关键词构建OR条件
      const orConditions = [];
      uniqueExpandedKeywords.forEach((keyword) => {
        orConditions.push(`title LIKE ?`);
        orConditions.push(`abstract LIKE ?`);
        params.push(`%${keyword.toLowerCase()}%`);
        params.push(`%${keyword.toLowerCase()}%`);
      });
      
      if (orConditions.length > 0) {
        sqlQuery += ` AND (${orConditions.join(' OR ')})`;
      }
      
      if (filter_venues) {
        sqlQuery += ' AND is_top_venue = TRUE';
      }
      
      // 排除已显示的论文
      if (excludeIds.length > 0) {
        const placeholders = excludeIds.map(() => '?').join(',');
        sqlQuery += ` AND id NOT IN (${placeholders})`;
        params.push(...excludeIds);
      }
      
      // 排除已找到的论文
      if (results.length > 0) {
        const foundIds = results.map(r => r.id);
        sqlQuery += ` AND id NOT IN (${foundIds.map(() => '?').join(',')})`;
        params.push(...foundIds);
      }
      
      sqlQuery += ' ORDER BY citation_count DESC, created_at DESC';
      sqlQuery += ` LIMIT ${parseInt(limit - results.length)}`;
      
      console.log('📝 扩展关键词SQL:', sqlQuery.replace(/\s+/g, ' ').trim());
      console.log('🔧 扩展关键词参数数量:', params.length);
      
      const [expandedResults] = await pool.execute(sqlQuery, params);
      
      if (expandedResults.length > 0) {
        console.log(`✅ 扩展关键词搜索成功，找到 ${expandedResults.length} 篇论文`);
        const processedExpanded = expandedResults.map(paper => ({
          ...paper,
          download_sources: paper.download_sources ? 
            (typeof paper.download_sources === 'string' ? JSON.parse(paper.download_sources) : paper.download_sources) : null,
          metadata: paper.metadata ? 
            (typeof paper.metadata === 'string' ? JSON.parse(paper.metadata) : paper.metadata) : null,
          matched_strategy: 'semantic_expansion',
          relevance_score: 0.8
        }));
        
        results = results.concat(processedExpanded);
      }
    }
    
    // 策略3：基础关键词匹配（回退策略）
    if (results.length < limit) {
      console.log('🔄 策略3：基础关键词匹配（回退策略）...');
      
      let sqlQuery = `
        SELECT id, title, authors, abstract, doi, url, download_url, year, journal, venue,
               citation_count, research_method, full_text, translated_abstract, translated_method,
               paper_id, source, is_top_venue, quality_score, download_sources, metadata,
               created_at, updated_at
        FROM paper_cache 
        WHERE 1=1
      `;
      
      const params = [];
      
      // 使用原始关键词构建OR条件
      const orConditions = [];
      keywords.forEach((keyword) => {
        orConditions.push(`title LIKE ?`);
        orConditions.push(`abstract LIKE ?`);
        params.push(`%${keyword.toLowerCase()}%`);
        params.push(`%${keyword.toLowerCase()}%`);
      });
      
      if (orConditions.length > 0) {
        sqlQuery += ` AND (${orConditions.join(' OR ')})`;
      }
      
      if (filter_venues) {
        sqlQuery += ' AND is_top_venue = TRUE';
      }
      
      // 排除已显示的论文
      if (excludeIds.length > 0) {
        const placeholders = excludeIds.map(() => '?').join(',');
        sqlQuery += ` AND id NOT IN (${placeholders})`;
        params.push(...excludeIds);
      }
      
      // 排除已找到的论文
      if (results.length > 0) {
        const foundIds = results.map(r => r.id);
        sqlQuery += ` AND id NOT IN (${foundIds.map(() => '?').join(',')})`;
        params.push(...foundIds);
      }
      
      sqlQuery += ' ORDER BY citation_count DESC, created_at DESC';
      sqlQuery += ` LIMIT ${parseInt(limit - results.length)}`;
      
      console.log('📝 基础关键词SQL:', sqlQuery.replace(/\s+/g, ' ').trim());
      
      const [basicResults] = await pool.execute(sqlQuery, params);
      
      if (basicResults.length > 0) {
        console.log(`✅ 基础关键词搜索成功，找到 ${basicResults.length} 篇论文`);
        const processedBasic = basicResults.map(paper => ({
          ...paper,
          download_sources: paper.download_sources ? 
            (typeof paper.download_sources === 'string' ? JSON.parse(paper.download_sources) : paper.download_sources) : null,
          metadata: paper.metadata ? 
            (typeof paper.metadata === 'string' ? JSON.parse(paper.metadata) : paper.metadata) : null,
          matched_strategy: 'basic_keywords',
          relevance_score: 0.6
        }));
        
        results = results.concat(processedBasic);
      }
    }
    
    // 最终处理和排序
    const finalResults = results
      .slice(0, limit)
      .sort((a, b) => {
        // 按匹配策略和相关性排序
        const strategyPriority = { 'fulltext': 3, 'semantic_expansion': 2, 'basic_keywords': 1 };
        const aPriority = strategyPriority[a.matched_strategy] || 0;
        const bPriority = strategyPriority[b.matched_strategy] || 0;
        
        if (aPriority !== bPriority) return bPriority - aPriority;
        if (a.relevance_score !== b.relevance_score) return b.relevance_score - a.relevance_score;
        return b.citation_count - a.citation_count;
      });
    
    console.log(`🎉 增强语义搜索完成，总共找到 ${finalResults.length} 篇论文`);
    finalResults.forEach((paper, index) => {
      console.log(`  ${index + 1}. ${paper.title} (策略: ${paper.matched_strategy}, 相关性: ${paper.relevance_score})`);
    });
    
    return finalResults;
    
  } catch (error) {
    console.error('❌ 增强语义缓存搜索失败:', error);
    console.error('错误详情:', error.stack);
    
    // 如果增强搜索失败，使用原始的备用搜索
    try {
      console.log('🆘 使用原始备用搜索方案...');
      return await fallbackSearch(query, limit, filter_venues);
    } catch (fallbackError) {
      console.error('❌ 备用搜索也失败了:', fallbackError);
      return [];
    }
  }
};

// 简化的备用搜索函数 - 只搜索标题
const fallbackSearch = async (query, limit = 10, filter_venues = false, excludeIds = []) => {
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
      return await getLatestPapers(limit, filter_venues, excludeIds);
    }
    
    console.log('🔑 备用搜索关键词:', keywords);
    
    // 备用搜索 - 标题或摘要中包含任意关键词
    console.log('🎯 备用搜索策略：标题或摘要中包含任意关键词');
    
    let sqlQuery = `
      SELECT id, title, authors, abstract, doi, url, download_url, year, journal, venue,
             citation_count, research_method, full_text, translated_abstract, translated_method,
             paper_id, source, is_top_venue, quality_score, download_sources, metadata,
             created_at, updated_at
      FROM paper_cache 
      WHERE 1=1
    `;
    
    const params = [];
    
    // 构建OR条件：标题或摘要中包含任意关键词
    if (keywords.length > 0) {
      const orConditions = [];
      keywords.forEach((keyword) => {
        orConditions.push(`title LIKE ?`);
        orConditions.push(`abstract LIKE ?`);
        params.push(`%${keyword.toLowerCase()}%`);
        params.push(`%${keyword.toLowerCase()}%`);
      });
      sqlQuery += ` AND (${orConditions.join(' OR ')})`;
    }
    
    if (filter_venues) {
      sqlQuery += ' AND is_top_venue = 1';
    }
    
    // 排除已显示的论文
    if (excludeIds.length > 0) {
      const placeholders = excludeIds.map(() => '?').join(',');
      sqlQuery += ` AND id NOT IN (${placeholders})`;
      params.push(...excludeIds);
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
    return await getLatestPapers(limit, filter_venues, excludeIds);
  }
};

// 获取最新论文的函数 - 最简化版本
const getLatestPapers = async (limit = 10, filter_venues = false, excludeIds = []) => {
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
    
    const params = [];
    const conditions = [];
    
    if (filter_venues) {
      conditions.push('is_top_venue = 1');
    }
    
    // 排除已显示的论文
    if (excludeIds.length > 0) {
      const placeholders = excludeIds.map(() => '?').join(',');
      conditions.push(`id NOT IN (${placeholders})`);
      params.push(...excludeIds);
    }
    
    if (conditions.length > 0) {
      sqlQuery += ` WHERE ${conditions.join(' AND ')}`;
    }
    
    sqlQuery += ` ORDER BY created_at DESC LIMIT ${parseInt(limit)}`;
    
    console.log('🔧 最新论文SQL:', sqlQuery.replace(/\s+/g, ' ').trim());
    
    const [results] = await pool.execute(sqlQuery, params);
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
    const { 
      chatHistory = [], 
      filter_venues = false, 
      session_id = Date.now().toString(), 
      keywords = null,
      use_local_cache = true, // 新增：是否使用本地缓存搜索（默认为true）
      useExternalPool = false, // 新增：是否使用外部论文池
      externalPoolData = null, // 新增：外部论文池数据
      poolKeywords = '' // 新增：论文池对应的关键词
    } = req.body;
    
    console.log('接收到的数据:', {
      hasKeywords: !!keywords,
      use_local_cache,
      useExternalPool,
      hasPoolData: !!externalPoolData,
      poolKeywords
    });
    
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
    const excludeIds = req.body.exclude_ids || []; // 从请求中获取要排除的论文ID
    const excludeTitles = req.body.exclude_titles || [];     // 根据use_local_cache参数决定是否搜索本地缓存
    let cacheResults = [];
    if (use_local_cache) {
      cacheResults = await searchFromCache(formattedSearchQuery, 5, filter_venues, excludeIds);
      console.log(`📚 本地缓存找到 ${cacheResults.length} 篇推荐论文`);
    } else {
      console.log(`⚠️ 跳过本地缓存搜索，use_local_cache = ${use_local_cache}`);
    }
    
    let allPapers = [];
    let needExternalSearch = true;
    let externalSearchResult = null; // 声明外部搜索结果变量
    let externalPoolInfo = null; // 外部论文池信息
    
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
    } else {
      // 不使用本地缓存时，始终需要外部搜索
      needExternalSearch = true;
      console.log('🌐 不使用本地缓存，需要外部搜索');
    }
    
    // 第二步：处理外部论文池和搜索
    if (needExternalSearch) {
      const remainingCount = Math.max(0, 5 - allPapers.length);
      console.log(`🌐 本地结果不足，需要从外部获取 ${remainingCount} 篇论文...`);
      
      // 检查是否可以使用外部论文池
      console.log('🔍 论文池使用检查:', {
        useExternalPool,
        hasPoolData: !!externalPoolData,
        hasPapers: externalPoolData?.papers?.length > 0,
        poolPaperCount: externalPoolData?.papers?.length || 0,
        poolKeywords: externalPoolData?.currentKeywords,
        searchKeywords: formattedSearchQuery,
        keywordsMatch: externalPoolData?.currentKeywords === formattedSearchQuery
      })
      
      // 使用更宽松的关键词匹配条件
      let keywordsMatch = false
      if (externalPoolData?.currentKeywords && formattedSearchQuery) {
        const poolWords = externalPoolData.currentKeywords.toLowerCase().split(/[,\s]+/).filter(w => w.length > 2)
        const searchWords = formattedSearchQuery.toLowerCase().split(/[,\s]+/).filter(w => w.length > 2)
        
        // 如果有任何词汇重叠，就认为匹配
        keywordsMatch = poolWords.some(pw => searchWords.some(sw => 
          pw.includes(sw) || sw.includes(pw) || pw === sw
        )) || externalPoolData.currentKeywords === formattedSearchQuery
      }
      
      console.log('🔑 后端关键词匹配检查:', {
        poolKeywords: externalPoolData?.currentKeywords,
        searchKeywords: formattedSearchQuery,
        keywordsMatch,
        poolWords: externalPoolData?.currentKeywords?.toLowerCase().split(/[,\s]+/).filter(w => w.length > 2),
        searchWords: formattedSearchQuery.toLowerCase().split(/[,\s]+/).filter(w => w.length > 2)
      })
      
      if (useExternalPool && externalPoolData && 
          externalPoolData.papers && externalPoolData.papers.length > 0) { // 简化条件：只要有论文池就尝试使用
        
        console.log('✅ 满足论文池使用条件，检查现有外部论文池，池中论文数:', externalPoolData.papers.length);
        
        // 从论文池中筛选未显示的论文
        const existingTitles = new Set([
          ...allPapers.map(r => r.title.toLowerCase()),  // 本次搜索的缓存结果
          ...excludeTitles.map(t => t.toLowerCase())      // 全局已显示的论文标题
        ]);
        
        const unusedPoolPapers = externalPoolData.papers.filter(paper => 
          paper.title && !existingTitles.has(paper.title.toLowerCase())
        );
        
        console.log(`📋 论文池中可用论文数: ${unusedPoolPapers.length}/${externalPoolData.papers.length}`);
        
        if (unusedPoolPapers.length >= remainingCount) {
          // 论文池中有足够的论文，直接使用
          const selectedPapers = unusedPoolPapers.slice(0, remainingCount);
          allPapers = allPapers.concat(selectedPapers);
          needExternalSearch = false; // 关键：标记不需要外部搜索
          
          externalPoolInfo = {
            used: true,
            selectedCount: selectedPapers.length,
            remainingCount: unusedPoolPapers.length - selectedPapers.length,
            totalPoolSize: externalPoolData.papers.length,
            action: 'used_existing_pool'
          };
          
          console.log('✅ 从外部论文池成功获取论文:', selectedPapers.length);
          console.log('✅ 跳过外部API调用，直接使用论文池');
        } else if (unusedPoolPapers.length > 0) {
          // 论文池中有一些论文但不够，先用完现有的，然后扩展论文池
          console.log('📋 论文池部分可用，先使用现有论文，然后扩展论文池');
          
          // 先添加现有的论文
          allPapers = allPapers.concat(unusedPoolPapers);
          const stillNeedCount = remainingCount - unusedPoolPapers.length;
          
          console.log(`🔄 已使用论文池中的 ${unusedPoolPapers.length} 篇，还需要 ${stillNeedCount} 篇`);
          
          // 计算扩展后的论文池大小：当前大小 * 2，最少20篇
          const currentPoolSize = externalPoolData.totalFetched || externalPoolData.papers.length;
          const expandedPoolSize = Math.max(currentPoolSize * 2, 20);
          
          // 标记需要扩展论文池
          externalPoolInfo = {
            used: true,
            selectedCount: unusedPoolPapers.length,
            remainingCount: 0,
            totalPoolSize: externalPoolData.papers.length,
            action: 'expanding_pool',
            expandedPoolSize: expandedPoolSize,
            stillNeedCount: stillNeedCount
          };
          
          console.log(`🚀 论文池将扩展至 ${expandedPoolSize} 篇`);
          // 仍需要外部搜索来扩展论文池
        } else {
          // 论文池已完全耗尽，需要扩展
          console.log('💫 论文池已耗尽，需要扩展论文池');
          
          const currentPoolSize = externalPoolData.totalFetched || externalPoolData.papers.length;
          const expandedPoolSize = Math.max(currentPoolSize * 2, 20);
          
          externalPoolInfo = {
            used: false,
            action: 'pool_exhausted',
            expandedPoolSize: expandedPoolSize,
            previousPoolSize: currentPoolSize
          };
          
          console.log(`🚀 论文池已耗尽，将扩展至 ${expandedPoolSize} 篇`);
          // 需要外部搜索来重建论文池
        }
      } else {
        // 没有可用的论文池，需要建立新的论文池
        console.log('🆕 没有可用的外部论文池，将建立新的论文池');
        
        externalPoolInfo = {
          used: false,
          action: 'creating_new_pool',
          initialPoolSize: 20
        };
      }
      
      // 如果仍需要外部搜索，执行搜索并建立/扩展论文池
      if (needExternalSearch) {
        const action = externalPoolInfo?.action || 'creating_new_pool';
        console.log(`🔍 执行外部搜索，动作: ${action}`);
        
        // 确保查询参数不为空
        let queryParam = formattedSearchQuery || searchQuery || 'research methodology';
        if (!queryParam || queryParam.trim().length === 0) {
          queryParam = 'research methodology experimental design';
          console.log('⚠️ 搜索查询为空，使用默认查询:', queryParam);
        }
        
        console.log('🔧 搜索查询:', queryParam);
        
        // 根据动作确定论文池大小
        let poolLimit;
        if (action === 'creating_new_pool') {
          poolLimit = 20; // 首次创建：20篇
        } else if (action === 'expanding_pool' || action === 'pool_exhausted') {
          poolLimit = externalPoolInfo.expandedPoolSize; // 扩展：翻倍
        } else {
          poolLimit = 20; // 默认
        }
        
        console.log(`📏 论文池目标大小: ${poolLimit} 篇`);
        let searchUrl = `${SEMANTIC_API_BASE}/paper/search?query=${queryParam}&limit=${poolLimit}&fields=title,abstract,url,openAccessPdf,year,citationCount,authors,venue`;
        
        // 如果需要过滤期刊/会议，使用venue参数
        if (filter_venues) {
          // 使用原始venue名称，用逗号连接但不进行URL编码
          const venueParam = allowedVenues.join(',');
          searchUrl += `&venue=${venueParam}`;
        }
        
        // 输出最终请求URL用于调试
        console.log('外部搜索URL (论文池):', searchUrl);

        // 准备请求头 - 只使用基本的Accept头，避免API密钥问题
        const headers = {
          'Accept': 'application/json'
        };
        
        // 输出请求信息用于调试
        console.log('请求头:', JSON.stringify(headers));
        console.log('SEMANTIC_API_KEY是否存在:', !!SEMANTIC_API_KEY);

        // 调用Semantic Scholar API搜索相关论文 - 不使用API密钥
        console.log('开始调用Semantic Scholar API建立论文池...');
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

                 // 处理外部搜索结果并建立/扩展论文池
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

           const action = externalPoolInfo?.action || 'creating_new_pool';
           console.log(`🏊‍♂️ ${action === 'creating_new_pool' ? '建立新的' : '扩展'}外部论文池，总共获取 ${externalResults.length} 篇论文`);

           // 去重（基于标题）- 排除已显示的论文
           const existingTitles = new Set([
             ...allPapers.map(r => r.title.toLowerCase()),  // 本次搜索的缓存结果  
             ...excludeTitles.map(t => t.toLowerCase())     // 全局已显示的论文标题
           ]);
           const newResults = externalResults.filter(r => 
             r.title && !existingTitles.has(r.title.toLowerCase())
           );
           
           console.log(`🔍 外部搜索去重：排除了 ${externalResults.length - newResults.length} 篇重复论文`);
           
           // 如果正在扩展论文池且有现有论文池，需要合并
           let finalPool = newResults;
           if (action === 'expanding_pool' && externalPoolData && externalPoolData.papers) {
             // 合并现有论文池和新获取的论文
             const existingPoolTitles = new Set(externalPoolData.papers.map(p => p.title?.toLowerCase()).filter(Boolean));
             const uniqueNewResults = newResults.filter(r => 
               r.title && !existingPoolTitles.has(r.title.toLowerCase())
             );
             
             finalPool = [...externalPoolData.papers, ...uniqueNewResults];
             console.log(`🔄 合并论文池：现有 ${externalPoolData.papers.length} 篇 + 新增 ${uniqueNewResults.length} 篇 = 总计 ${finalPool.length} 篇`);
           }
           
           // 计算还需要从新论文池中取多少篇论文
           let stillNeedCount = remainingCount;
           if (action === 'expanding_pool' && externalPoolInfo.selectedCount) {
             stillNeedCount = externalPoolInfo.stillNeedCount || (remainingCount - externalPoolInfo.selectedCount);
           }
           
           console.log(`📋 当前还需要 ${stillNeedCount} 篇论文`);
           
           // 从最终论文池中选择需要的论文（排除已显示的）
           const availableForSelection = finalPool.filter(r => 
             r.title && !existingTitles.has(r.title.toLowerCase())
           );
           
           const selectedPapers = availableForSelection.slice(0, stillNeedCount);
           allPapers = allPapers.concat(selectedPapers);
           
           // 更新外部论文池信息
           externalPoolInfo = {
             ...externalPoolInfo,
             totalFetched: externalResults.length,
             deduplicatedCount: newResults.length,
             selectedCount: (externalPoolInfo.selectedCount || 0) + selectedPapers.length,
             pool: finalPool, // 返回整个合并后的论文池给前端
             keywords: formattedSearchQuery,
             finalPoolSize: finalPool.length,
             remainingInPool: availableForSelection.length - selectedPapers.length
           };
           
           console.log(`🌐 外部搜索新增 ${selectedPapers.length} 篇论文，论文池储备 ${finalPool.length} 篇，剩余可用 ${availableForSelection.length - selectedPapers.length} 篇`);
         } else {
           // 外部搜索没有返回结果
           console.log('⚠️ 外部搜索未返回任何结果');
           if (externalPoolInfo) {
             externalPoolInfo.error = '外部搜索未返回结果';
           }
         }
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

    const cacheHits = use_local_cache ? allPapers.filter(r => r.from_cache).length : 0;
    const externalHits = allPapers.filter(r => !r.from_cache).length;
    
    console.log(`✅ 最终返回 ${allPapers.length} 篇推荐论文 (缓存: ${cacheHits}, 外部: ${externalHits}) [use_local_cache: ${use_local_cache}]`);

    res.json({
      success: true,
      papers: allPapers,
      cache_hits: cacheHits,
      external_hits: externalHits,
      total_papers: allPapers.length,
      use_local_cache: use_local_cache,
      rawResponse: needExternalSearch ? JSON.stringify(externalSearchResult?.data || []) : (use_local_cache ? '本地缓存结果' : '跳过本地缓存'),
      session_id: session_id || 'default',
      
      // 新增：外部论文池信息
      externalPoolInfo: externalPoolInfo
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

// 获取所有统计方法列表的API端点
app.get('/api/statistical-methods', optionalAuth, async (req, res) => {
  try {
    console.log('获取所有统计方法列表');
    
    const methods = await getAllStatisticalMethods();
    
    res.json({
      success: true,
      methods: methods,
      total: methods.length
    });
  } catch (error) {
    console.error('获取统计方法列表错误:', error);
    res.status(500).json({ 
      success: false,
      error: '服务器内部错误' 
    });
  }
});

// 根据ID获取统计方法详情的API端点
app.get('/api/statistical-methods/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ 
        success: false,
        error: '需要提供有效的方法ID' 
      });
    }

    console.log('根据ID获取统计方法详情:', id);
    
    const method = await getStatisticalMethodById(parseInt(id));
    
    if (!method) {
      return res.status(404).json({ 
        success: false,
        error: '未找到指定的统计方法' 
      });
    }
    
    res.json({
      success: true,
      method: method
    });
  } catch (error) {
    console.error('根据ID获取统计方法错误:', error);
    res.status(500).json({ 
      success: false,
      error: '服务器内部错误' 
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
    
    // 第一优先级：从数据库查询
    console.log('1️⃣ 从数据库查询统计方法...');
    const dbMethod = await searchStatisticalMethodFromDB(method);
    
    if (dbMethod) {
      console.log('✅ 数据库中找到方法:', dbMethod.method);
      return res.json({
        success: true,
        method: dbMethod.method,
        explanation: dbMethod.content,
        keywords: dbMethod.keywords,
        isLocalContent: true,
        source: '数据库',
        id: dbMethod.id,
        file_source: dbMethod.file_source
      });
    }
    
    // 第二优先级：检查本地静态存储的方法
    console.log('2️⃣ 从本地静态数据查询...');
    const { findStatisticalMethod } = await import('./statistical-methods-data.js');
    const localMethod = findStatisticalMethod(method);
    
    if (localMethod) {
      console.log('✅ 本地静态数据中找到方法:', localMethod.method);
      return res.json({
        success: true,
        method: localMethod.method,
        explanation: localMethod.content,
        isLocalContent: true,
        source: '本地静态数据'
      });
    }
    
    // 第三优先级：调用AI API生成
    console.log('3️⃣ 本地未找到，调用AI API查询:', method);
    
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

    console.log('✅ AI API生成成功');

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
    const allowedSources = ['search', 'recommendation', 'manual', 'database'];
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
          validTitle || null, 
          authors || null, 
          abstract || null, 
          validDoi || null, 
          url || null, 
          download_url || null, 
          year || null, 
          journal || null, 
          venue || null,
          citation_count || 0, 
          research_method || null, 
          full_text || null, 
          translated_abstract || null, 
          translated_method || null, 
          validPaperId || null, 
          validSource || 'manual', 
          is_top_venue || false,
          quality_score || 0.5, 
          download_sources ? JSON.stringify(download_sources) : null,
          metadata ? JSON.stringify(metadata) : null, 
          paperId
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
          validTitle || null, 
          authors || null, 
          abstract || null, 
          validDoi || null, 
          url || null, 
          download_url || null, 
          year || null, 
          journal || null, 
          venue || null,
          citation_count || 0, 
          research_method || null, 
          full_text || null, 
          translated_abstract || null, 
          translated_method || null, 
          validPaperId || null, 
          validSource || 'manual', 
          is_top_venue || false,
          quality_score || 0.5, 
          download_sources ? JSON.stringify(download_sources) : null,
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
      sqlQuery += ' AND is_top_venue = 1';
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

// 获取缓存统计信息（必须在 :id 路由之前定义）
app.get('/api/paper-cache/stats', optionalAuth, async (req, res) => {
  try {
    console.log('📊 开始查询论文缓存统计信息...');
    const pool = getPool();

    const [totalResults] = await pool.execute(
      'SELECT COUNT(*) as total FROM paper_cache'
    );
    console.log('📋 总论文数查询结果:', totalResults[0]);
    
    const [topVenueResults] = await pool.execute(
      'SELECT COUNT(*) as top_venues FROM paper_cache WHERE is_top_venue = 1'
    );
    console.log('🏆 顶会顶刊查询结果:', topVenueResults[0]);
    
    const [recentResults] = await pool.execute(
      'SELECT COUNT(*) as recent FROM paper_cache WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)'
    );
    console.log('📅 最近7天查询结果:', recentResults[0]);

    const statsData = {
      success: true,
      stats: {
        total_papers: totalResults[0].total,
        top_venue_papers: topVenueResults[0].top_venues,
        recent_papers: recentResults[0].recent
      }
    };
    
    console.log('✅ 统计信息API响应:', statsData);
    res.json(statsData);
  } catch (error) {
    console.error('❌ 获取缓存统计错误:', error);
    res.status(500).json({ 
      success: false, 
      error: '服务器内部错误',
      details: error.message
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

// 获取缓存论文列表（分页）
app.post('/api/paper-cache/list', optionalAuth, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 50, 
      sort_by = 'created_at', 
      sort_order = 'DESC',
      filter_top_venue = false,
      filter_source = null
    } = req.body;
    
    // 验证参数
    const validSortFields = ['created_at', 'updated_at', 'title', 'year', 'citation_count', 'quality_score'];
    const validSortOrders = ['ASC', 'DESC'];
    
    const sortField = validSortFields.includes(sort_by) ? sort_by : 'created_at';
    const sortDirection = validSortOrders.includes(sort_order.toUpperCase()) ? sort_order.toUpperCase() : 'DESC';
    const pageNumber = Math.max(1, parseInt(page) || 1);
    const pageLimit = Math.min(1000, Math.max(1, parseInt(limit) || 50)); // 限制最大1000条
    const offset = (pageNumber - 1) * pageLimit;
    
    console.log('分页参数:', { pageNumber, pageLimit, offset, sortField, sortDirection });

    const pool = getPool();
    
    // 构建查询条件
    let whereClause = '';
    let queryParams = [];
    
    const conditions = [];
    
    if (filter_top_venue) {
      conditions.push('is_top_venue = 1');
    }
    
    if (filter_source && typeof filter_source === 'string') {
      conditions.push('source = ?');
      queryParams.push(filter_source);
    }
    
    if (conditions.length > 0) {
      whereClause = ' WHERE ' + conditions.join(' AND ');
    }

    // 获取总数
    const countQuery = `SELECT COUNT(*) as total FROM paper_cache${whereClause}`;
    const [countResults] = await pool.execute(countQuery, queryParams);
    const totalCount = countResults[0].total;
    
    // 获取论文列表 - 注意：由于ORDER BY子句包含动态字段，不能用参数绑定，但字段已经验证过了
    const dataQuery = `
      SELECT id, title, authors, abstract, doi, url, download_url, year, journal, venue,
             citation_count, research_method, full_text, translated_abstract, translated_method,
             paper_id, source, is_top_venue, quality_score, download_sources, metadata,
             created_at, updated_at
      FROM paper_cache
      ${whereClause}
      ORDER BY ${sortField} ${sortDirection}
      LIMIT ${pageLimit} OFFSET ${offset}
    `;
    
    console.log('执行查询:', dataQuery);
    console.log('查询参数:', queryParams);
    
    const [results] = await pool.execute(dataQuery, queryParams);
    
    // 处理结果，解析JSON字段
    const papers = results.map(paper => ({
      ...paper,
      download_sources: paper.download_sources ? 
        (typeof paper.download_sources === 'string' ? JSON.parse(paper.download_sources) : paper.download_sources) : null,
      metadata: paper.metadata ? 
        (typeof paper.metadata === 'string' ? JSON.parse(paper.metadata) : paper.metadata) : null,
      from_cache: true
    }));

    // 计算分页信息
    const totalPages = Math.ceil(totalCount / pageLimit);
    const hasNextPage = pageNumber < totalPages;
    const hasPrevPage = pageNumber > 1;

    console.log(`🔍 论文列表查询：第${pageNumber}页，每页${pageLimit}条，总共${totalCount}条，排序${sortField} ${sortDirection}`);

    res.json({
      success: true,
      papers: papers,
      pagination: {
        current_page: pageNumber,
        per_page: pageLimit,
        total_count: totalCount,
        total_pages: totalPages,
        has_next_page: hasNextPage,
        has_prev_page: hasPrevPage
      },
      query_info: {
        sort_by: sortField,
        sort_order: sortDirection,
        filter_top_venue: filter_top_venue,
        filter_source: filter_source
      }
    });
  } catch (error) {
    console.error('获取论文列表错误:', error);
    res.status(500).json({ 
      success: false, 
      error: '服务器内部错误' 
    });
  }
});

// 图片代理API，用于绕过语雀等外部图片的防盗链限制
app.get('/api/proxy-image', async (req, res) => {
  try {
    const { url } = req.query;
    
    if (!url) {
      return res.status(400).json({ 
        success: false, 
        error: '需要提供图片URL参数' 
      });
    }

    // 验证URL是否为合法的图片链接
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return res.status(400).json({ 
        success: false, 
        error: 'URL必须以http://或https://开头' 
      });
    }

    console.log('代理获取图片:', url);

    // 设置请求头，模拟浏览器访问并去除referrer
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept': 'image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
      // 故意不设置Referer头
    };

    // 获取图片
    const imageResponse = await fetchWithRetry(url, {
      headers: headers,
      timeout: 10000 // 10秒超时
    }, 2, 1000);

    if (!imageResponse.ok) {
      console.error(`获取图片失败，状态码: ${imageResponse.status}`);
      return res.status(imageResponse.status).json({ 
        success: false, 
        error: `获取图片失败: ${imageResponse.status}` 
      });
    }

    // 获取图片的内容类型
    const contentType = imageResponse.headers.get('content-type') || 'image/svg+xml';
    
    // 设置响应头
    res.set({
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=86400', // 缓存1天
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type'
    });

    // 将图片内容流式传输给客户端
    imageResponse.body.pipe(res);

    console.log('✅ 图片代理成功:', url);

  } catch (error) {
    console.error('图片代理错误:', error);
    res.status(500).json({ 
      success: false, 
      error: '获取图片时发生错误' 
    });
  }
});

// 特定页面路由
app.get('/papers', (req, res) => {
  console.log('📄 访问论文缓存浏览器页面');
  res.sendFile(join(__dirname, '..', 'public', 'paper-cache-browser.html'), (err) => {
    if (err) {
      console.error('发送paper-cache-browser.html失败:', err);
      res.status(404).send('页面未找到');
    }
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 MethodMate API服务器运行在端口 ${PORT}`);
  console.log(`环境: ${process.env.NODE_ENV || 'development'}`);
}); 