import fetch from 'node-fetch';
import crypto from 'crypto';

// 有道翻译API 配置
const YOUDAO_API_URL = 'https://openapi.youdao.com/api';
const YOUDAO_APP_KEY = process.env.YOUDAO_APP_KEY || '1f3536d0d3dce4f8';
const YOUDAO_APP_SECRET = process.env.YOUDAO_APP_SECRET || 'i9qjyoHVJ3hv0n3Fu2LDzSxs23PWbIUL';

// 检查API配置
if (!YOUDAO_APP_KEY || !YOUDAO_APP_SECRET) {
  console.warn('警告: 有道翻译API密钥未完整设置');
}

/**
 * 截取文本用于签名计算（根据有道API文档）
 * @param {string} q 待翻译文本
 * @returns {string} 处理后的input
 */
function truncate(q) {
  const len = q.length;
  if (len <= 20) return q;
  return q.substring(0, 10) + len + q.substring(len - 10, len);
}

/**
 * 生成有道翻译API签名
 * @param {string} appKey 应用ID
 * @param {string} input 处理后的输入文本
 * @param {string} salt 随机字符串
 * @param {string} curtime 当前时间戳
 * @param {string} appSecret 应用密钥
 * @returns {string} 签名
 */
function generateSign(appKey, input, salt, curtime, appSecret) {
  const str = appKey + input + salt + curtime + appSecret;
  return crypto.createHash('sha256').update(str).digest('hex');
}

/**
 * 将语言代码转换为有道API支持的格式
 * @param {string} langCode 语言代码
 * @returns {string} 有道API支持的语言代码
 */
function convertLanguageCode(langCode) {
  const langMap = {
    'zh-CN': 'zh-CHS',
    'zh': 'zh-CHS',
    'en': 'en',
    'ja': 'ja',
    'ko': 'ko',
    'fr': 'fr',
    'es': 'es',
    'pt': 'pt',
    'it': 'it',
    'vi': 'vi',
    'de': 'de',
    'tr': 'tr',
    'ru': 'ru',
    'ar': 'ar',
    'th': 'th',
    'af': 'af',
    'am': 'am',
    'az': 'az',
    'be': 'be',
    'bg': 'bg',
    'bn': 'bn',
    'bs': 'bs',
    'ca': 'ca',
    'ceb': 'ceb',
    'co': 'co',
    'cs': 'cs',
    'cy': 'cy',
    'da': 'da',
    'el': 'el',
    'eo': 'eo',
    'et': 'et',
    'eu': 'eu',
    'fa': 'fa',
    'fi': 'fi',
    'fj': 'fj',
    'fy': 'fy',
    'ga': 'ga',
    'gd': 'gd',
    'gl': 'gl',
    'gu': 'gu',
    'ha': 'ha',
    'haw': 'haw',
    'he': 'he',
    'hi': 'hi',
    'hmn': 'hmn',
    'hr': 'hr',
    'ht': 'ht',
    'hu': 'hu',
    'hy': 'hy',
    'id': 'id',
    'ig': 'ig',
    'is': 'is',
    'jw': 'jw',
    'ka': 'ka',
    'kk': 'kk',
    'km': 'km',
    'kn': 'kn',
    'ku': 'ku',
    'ky': 'ky',
    'la': 'la',
    'lb': 'lb',
    'lo': 'lo',
    'lt': 'lt',
    'lv': 'lv',
    'mg': 'mg',
    'mi': 'mi',
    'mk': 'mk',
    'ml': 'ml',
    'mn': 'mn',
    'mr': 'mr',
    'ms': 'ms',
    'mt': 'mt',
    'my': 'my',
    'ne': 'ne',
    'nl': 'nl',
    'no': 'no',
    'ny': 'ny',
    'pa': 'pa',
    'pl': 'pl',
    'ps': 'ps',
    'ro': 'ro',
    'si': 'si',
    'sk': 'sk',
    'sl': 'sl',
    'sm': 'sm',
    'sn': 'sn',
    'so': 'so',
    'sq': 'sq',
    'sr': 'sr',
    'st': 'st',
    'su': 'su',
    'sv': 'sv',
    'sw': 'sw',
    'ta': 'ta',
    'te': 'te',
    'tg': 'tg',
    'tl': 'tl',
    'to': 'to',
    'uk': 'uk',
    'ur': 'ur',
    'uz': 'uz',
    'xh': 'xh',
    'yi': 'yi',
    'yo': 'yo',
    'zu': 'zu'
  };
  
  return langMap[langCode] || langCode;
}

/**
 * 使用有道翻译API进行翻译
 * @param {string} text 要翻译的文本
 * @param {string} from 源语言代码
 * @param {string} to 目标语言代码
 * @returns {Promise<string>} 翻译后的文本
 */
export async function translateWithCoze(text, from = 'zh-CN', to = 'en') {
  try {
    if (!text || !text.trim()) {
      console.log('翻译文本为空');
      return '';
    }

    console.log(`开始翻译文本 (${from} => ${to})`, text.length > 50 ? text.substring(0, 50) + '...' : text);

    // 清理文本
    const cleanedText = text
      .replace(/[\r\n]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    // 转换语言代码为有道API支持的格式
    const fromLang = convertLanguageCode(from);
    const toLang = convertLanguageCode(to);

    // 生成请求参数
    const salt = Date.now().toString();
    const curtime = Math.round(Date.now() / 1000).toString();
    const input = truncate(cleanedText);
    const sign = generateSign(YOUDAO_APP_KEY, input, salt, curtime, YOUDAO_APP_SECRET);

    const params = new URLSearchParams({
      q: cleanedText,
      appKey: YOUDAO_APP_KEY,
      salt: salt,
      from: fromLang,
      to: toLang,
      sign: sign,
      signType: 'v3',
      curtime: curtime
    });

    console.log('发送有道翻译API请求...');
    const response = await fetch(YOUDAO_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    });

    if (!response.ok) {
      throw new Error(`有道翻译API响应错误: ${response.status}`);
    }

    const result = await response.json();
    console.log('有道翻译API响应:', result);

    // 检查API错误响应
    if (result.errorCode && result.errorCode !== '0') {
      const errorMessages = {
        '101': 'API密钥或应用ID无效',
        '102': '不支持的语言类型',
        '103': '翻译文本过长',
        '104': '不支持的API类型',
        '105': '不支持的签名类型',
        '106': '不支持的响应类型',
        '107': '不支持的传输加密类型',
        '108': 'API密钥已过期',
        '109': 'batchLog格式不正确',
        '110': '无相关服务的有效实例',
        '111': '开发者账号无效',
        '201': '解密失败',
        '202': '签名检验失败',
        '203': '访问IP地址不在可访问IP列表',
        '205': '请求的接口与应用的平台类型不一致',
        '206': '因为时间戳无效导致签名校验失败',
        '207': '重放请求',
        '301': '辞典查询失败',
        '302': '翻译查询失败',
        '303': '服务端的其它异常',
        '401': '账户已经欠费',
        '411': '访问频率受限',
        '412': '长请求过于频繁',
        '1411': '访问频率受限',
        '2003': '不支持的语言类型',
        '2004': '合成字符过长',
        '2005': '不支持的音频文件格式',
        '2006': '不支持的发音类型'
      };
      
      const errorMsg = errorMessages[result.errorCode] || `未知错误 (${result.errorCode})`;
      throw new Error(`有道翻译API错误: ${errorMsg}`);
    }

    // 提取翻译结果
    if (!result.translation || !Array.isArray(result.translation) || result.translation.length === 0) {
      throw new Error('有道翻译API未返回有效的翻译结果');
    }

    const translatedText = result.translation[0].trim();

    if (!translatedText || translatedText.length < 1) {
      throw new Error('翻译结果为空');
    }

    console.log('翻译成功:', {
      original: text.substring(0, 30) + (text.length > 30 ? '...' : ''),
      translated: translatedText.substring(0, 30) + (translatedText.length > 30 ? '...' : '')
    });

    return translatedText;

  } catch (error) {
    console.error('有道翻译错误:', error);
    throw error;
  }
}

/**
 * 使用有道翻译API进行翻译（兼容原有的静默翻译函数接口）
 * @param {string} text 要翻译的文本
 * @param {string} from 源语言代码
 * @param {string} to 目标语言代码
 * @returns {Promise<string>} 翻译后的文本
 */
export async function translateWithSilentCoze(text, from = 'zh-CN', to = 'en') {
  // 直接调用有道翻译，保持接口兼容性
  return await translateWithCoze(text, from, to);
}

/**
 * 批量翻译功能
 * @param {string[]} texts 要翻译的文本数组
 * @param {string} from 源语言代码
 * @param {string} to 目标语言代码
 * @returns {Promise<string[]>} 翻译后的文本数组
 */
export async function batchTranslate(texts, from = 'zh-CN', to = 'en') {
  const results = [];
  
  for (const text of texts) {
    try {
      const translatedText = await translateWithCoze(text, from, to);
      results.push(translatedText);
      // 添加延迟以避免频率限制
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`批量翻译失败: ${text}`, error);
      results.push(text); // 失败时返回原文
    }
  }
  
  return results;
}

