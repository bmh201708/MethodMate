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
        email VARCHAR(100) UNIQUE NULL,
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
        content LONGTEXT NOT NULL,
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
        source ENUM('search', 'recommendation', 'manual', 'database') DEFAULT 'manual',
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

    // 方案迭代历史表 - 用于存储方案的迭代前后对比数据
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS plan_iterations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        plan_id INT NOT NULL,
        user_id INT NOT NULL,
        iteration_type ENUM('full', 'partial') NOT NULL COMMENT '迭代类型：整体迭代或部分迭代',
        iteration_section VARCHAR(50) COMMENT '迭代的部分（如：hypotheses, methodology等）',
        iteration_suggestion TEXT COMMENT '迭代建议或说明',
        message_id VARCHAR(255) COMMENT '关联的AI消息ID',
        
        -- 迭代前的方案数据
        before_title VARCHAR(255),
        before_research_questions TEXT,
        before_methodology TEXT,
        before_data_collection TEXT,
        before_analysis_method TEXT,
        before_hypotheses TEXT,
        before_experimental_design TEXT,
        before_expected_results TEXT,
        before_variables TEXT,
        before_statistical_tools TEXT,
        before_visualization TEXT,
        before_source_introductions JSON,
        
        -- 迭代后的方案数据
        after_title VARCHAR(255),
        after_research_questions TEXT,
        after_methodology TEXT,
        after_data_collection TEXT,
        after_analysis_method TEXT,
        after_hypotheses TEXT,
        after_experimental_design TEXT,
        after_expected_results TEXT,
        after_variables TEXT,
        after_statistical_tools TEXT,
        after_visualization TEXT,
        after_source_introductions JSON,
        
        -- 元数据
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        
        FOREIGN KEY (plan_id) REFERENCES research_plans(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_plan_id (plan_id),
        INDEX idx_user_id (user_id),
        INDEX idx_iteration_type (iteration_type),
        INDEX idx_iteration_section (iteration_section),
        INDEX idx_message_id (message_id),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    console.log('✅ 数据库表创建成功');
    
    // 执行数据库迁移 - 确保messages表的content字段为LONGTEXT
    await migrateMessagesContentField(connection);
    
  } catch (error) {
    console.error('❌ 创建数据库表失败:', error);
    throw error;
  } finally {
    connection.release();
  }
};

// 迁移messages表的content字段
const migrateMessagesContentField = async (connection) => {
  try {
    console.log('🔄 检查messages表字段类型...');
    
    // 检查当前content字段的类型
    const [columns] = await connection.execute(`
      SHOW COLUMNS FROM messages WHERE Field = 'content'
    `);
    
    if (columns.length > 0) {
      const currentType = columns[0].Type.toLowerCase();
      
      if (currentType.includes('text') && !currentType.includes('longtext')) {
        console.log('🔄 正在将content字段从TEXT升级为LONGTEXT...');
        
        // 执行ALTER TABLE语句
        await connection.execute(`
          ALTER TABLE messages 
          MODIFY COLUMN content LONGTEXT NOT NULL
        `);
        
        console.log('✅ messages表迁移完成！content字段已升级为LONGTEXT');
      } else if (currentType.includes('longtext')) {
        console.log('✅ content字段已经是LONGTEXT类型，无需迁移');
      }
    }
  } catch (error) {
    console.log('⚠️ 迁移messages表字段时出现问题（可能是表不存在）:', error.message);
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