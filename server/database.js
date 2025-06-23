import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { getDatabaseConfig } from './config.js';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 加载.env文件 - 优先从项目根目录加载，如果不存在则从server目录加载
const rootEnvPath = join(__dirname, '..', '.env');
const serverEnvPath = join(__dirname, '.env');

try {
  // 尝试从项目根目录加载
  dotenv.config({ path: rootEnvPath });
  console.log('✅ 从项目根目录加载.env文件');
} catch (error) {
  // 如果根目录没有.env文件，尝试从server目录加载
  try {
    dotenv.config({ path: serverEnvPath });
    console.log('✅ 从server目录加载.env文件');
  } catch (serverError) {
    console.warn('⚠️ 未找到.env文件，使用默认配置');
  }
}

// 数据库配置
const dbConfig = getDatabaseConfig();

// 创建连接池
let pool = null;

// 初始化数据库连接
export const initDatabase = async () => {
  try {
    pool = mysql.createPool(dbConfig);
    
    // 测试连接
    const connection = await pool.getConnection();
    console.log('✅ MySQL数据库连接成功');
    connection.release();
    
    // 创建数据库表
    await createTables();
    
    return pool;
  } catch (error) {
    console.error('❌ MySQL数据库连接失败:', error.message);
    throw error;
  }
};

// 获取数据库连接池
export const getPool = () => {
  if (!pool) {
    throw new Error('数据库未初始化，请先调用 initDatabase()');
  }
  return pool;
};

// 创建数据库表
const createTables = async () => {
  const connection = await pool.getConnection();
  
  try {
    // 用户表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_username (username),
        INDEX idx_email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // 对话会话表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS conversations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_user_id (user_id),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // 对话消息表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        conversation_id INT NOT NULL,
        role ENUM('user', 'assistant') NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
        INDEX idx_conversation_id (conversation_id),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // 引用文献表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS reference_papers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        conversation_id INT,
        title VARCHAR(500) NOT NULL,
        authors TEXT,
        abstract TEXT,
        doi VARCHAR(100),
        url VARCHAR(500),
        year INT,
        journal VARCHAR(200),
        paper_id VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE SET NULL,
        INDEX idx_user_id (user_id),
        INDEX idx_conversation_id (conversation_id),
        INDEX idx_doi (doi),
        INDEX idx_paper_id (paper_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // 研究方案表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS research_plans (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        conversation_id INT,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        methodology TEXT,
        timeline TEXT,
        resources TEXT,
        status ENUM('draft', 'active', 'completed', 'archived') DEFAULT 'draft',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE SET NULL,
        INDEX idx_user_id (user_id),
        INDEX idx_conversation_id (conversation_id),
        INDEX idx_status (status),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // 方案与文献关联表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS plan_references (
        id INT AUTO_INCREMENT PRIMARY KEY,
        plan_id INT NOT NULL,
        reference_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (plan_id) REFERENCES research_plans(id) ON DELETE CASCADE,
        FOREIGN KEY (reference_id) REFERENCES reference_papers(id) ON DELETE CASCADE,
        UNIQUE KEY unique_plan_reference (plan_id, reference_id),
        INDEX idx_plan_id (plan_id),
        INDEX idx_reference_id (reference_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    console.log('✅ 数据库表创建成功');
  } catch (error) {
    console.error('❌ 创建数据库表失败:', error);
    throw error;
  } finally {
    connection.release();
  }
};

// 关闭数据库连接
export const closeDatabase = async () => {
  if (pool) {
    await pool.end();
    console.log('数据库连接已关闭');
  }
};

export default { initDatabase, getPool, closeDatabase }; 