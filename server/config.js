import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * 加载环境变量配置
 * 优先级：项目根目录 .env > server目录 .env > 默认值
 */
export const loadConfig = () => {
  const rootEnvPath = join(__dirname, '..', '.env');
  const serverEnvPath = join(__dirname, '.env');
  
  let configLoaded = false;
  
  // 尝试从项目根目录加载
  if (fs.existsSync(rootEnvPath)) {
    dotenv.config({ path: rootEnvPath });
    console.log('✅ 从项目根目录加载.env文件');
    configLoaded = true;
  }
  // 如果根目录没有.env文件，尝试从server目录加载
  else if (fs.existsSync(serverEnvPath)) {
    dotenv.config({ path: serverEnvPath });
    console.log('✅ 从server目录加载.env文件');
    configLoaded = true;
  }
  // 如果都没有找到，使用默认配置
  else {
    console.warn('⚠️ 未找到.env文件，使用默认配置');
    // 加载默认的.env文件（如果存在）
    dotenv.config();
  }
  
  return configLoaded;
};

/**
 * 获取数据库配置
 */
export const getDatabaseConfig = () => {
  return {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'methodmate',
    port: process.env.DB_PORT || 3306,
    charset: 'utf8mb4',
    timezone: '+08:00',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  };
};

/**
 * 获取JWT配置
 */
export const getJWTConfig = () => {
  return {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: '7d'
  };
};

/**
 * 获取服务器配置
 */
export const getServerConfig = () => {
  return {
    port: process.env.PORT || 3004,
    nodeEnv: process.env.NODE_ENV || 'development'
  };
};

/**
 * 获取Coze API配置
 */
export const getCozeConfig = () => {
  return {
    apiKey: process.env.COZE_API_KEY,
    apiUrl: process.env.COZE_API_URL || 'https://api.coze.com',
    botId: process.env.COZE_BOT_ID,
    botIdReference: process.env.COZE_BOT_ID_Reference,
    userId: process.env.COZE_USER_ID
  };
};

/**
 * 获取有道翻译API配置
 */
export const getYoudaoConfig = () => {
  return {
    appKey: process.env.YOUDAO_APP_KEY || '1f3536d0d3dce4f8',
    appSecret: process.env.YOUDAO_APP_SECRET || 'i9qjyoHVJ3hv0n3Fu2LDzSxs23PWbIUL',
    apiUrl: process.env.YOUDAO_API_URL || 'https://openapi.youdao.com/api'
  };
};

/**
 * 获取ChatGPT配置
 */
export const getChatGPTConfig = () => {
  return {
    apiKey: process.env.OPENAI_API_KEY || '',
    apiUrl: process.env.OPENAI_API_URL || 'https://api.openai.com/v1',
    model: process.env.OPENAI_MODEL || 'gpt-4o',
    maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS || '16384'),
    temperature: parseFloat(process.env.OPENAI_TEMPERATURE || '0.7')
  };
};

/**
 * 获取其他API配置
 */
export const getOtherAPIConfig = () => {
  return {
    coreApiKey: process.env.CORE_API_KEY,
    semanticApiKey: process.env.SEMANTIC_API_KEY || ''
  };
};

// 自动加载配置
loadConfig();

export default {
  loadConfig,
  getDatabaseConfig,
  getJWTConfig,
  getServerConfig,
  getCozeConfig,
  getChatGPTConfig,
  getYoudaoConfig,
  getOtherAPIConfig
}; 