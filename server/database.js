import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { getDatabaseConfig } from './config.js';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 注意：环境变量应该在main应用程序中已经加载，这里不再重复加载
// 如果需要在独立运行时加载环境变量，请取消下面代码的注释
/*
dotenv.config({ path: join(__dirname, '..', '.env') });
console.log('✅ 从项目根目录加载.env文件');
*/

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
        paper_id VARCHAR(255),
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
        hypotheses TEXT,
        experimental_design TEXT,
        analysis_method TEXT,
        expected_results TEXT,
        methodology TEXT,
        timeline TEXT,
        resources TEXT,
        source_introductions TEXT,
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

    // 论文缓存表 - 用于存储高质量论文的详细信息
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS paper_cache (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        authors TEXT,
        abstract TEXT,
        doi VARCHAR(100),
        url VARCHAR(500),
        download_url VARCHAR(500),
        year INT,
        journal VARCHAR(200),
        venue VARCHAR(200),
        citation_count INT DEFAULT 0,
        research_method LONGTEXT,
        full_text LONGTEXT,
        translated_abstract TEXT,
        translated_method LONGTEXT,
        paper_id VARCHAR(255),
        source ENUM('search', 'recommendation', 'manual') DEFAULT 'manual',
        is_top_venue BOOLEAN DEFAULT FALSE,
        quality_score DECIMAL(3,2) DEFAULT 0.00,
        download_sources JSON,
        metadata JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY unique_paper_title_doi (title, doi),
        INDEX idx_title (title),
        INDEX idx_doi (doi),
        INDEX idx_paper_id (paper_id),
        INDEX idx_year (year),
        INDEX idx_citation_count (citation_count),
        INDEX idx_is_top_venue (is_top_venue),
        INDEX idx_quality_score (quality_score),
        INDEX idx_created_at (created_at),
        FULLTEXT KEY ft_title_abstract (title, abstract),
        FULLTEXT KEY ft_content (title, abstract, research_method)
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