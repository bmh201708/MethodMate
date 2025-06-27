import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 加载环境变量
dotenv.config({ path: join(__dirname, '..', '.env') });
console.log('✅ 从项目根目录加载.env文件');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'methodmate',
  charset: 'utf8mb4'
};

async function migrateEmailOptional() {
  let connection;
  
  try {
    console.log('开始迁移users表的email字段...');
    console.log('数据库配置:', {
      host: dbConfig.host,
      user: dbConfig.user,
      database: dbConfig.database
    });
    
    // 创建数据库连接
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ 数据库连接成功');
    
    // 检查表是否存在
    const [tables] = await connection.execute(
      `SELECT TABLE_NAME FROM information_schema.TABLES 
       WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'users'`,
      [dbConfig.database]
    );
    
    if (tables.length === 0) {
      console.log('⚠️ users表不存在，无需迁移');
      return;
    }
    
    // 检查email字段的当前配置
    const [columns] = await connection.execute(
      `SELECT COLUMN_NAME, IS_NULLABLE, COLUMN_DEFAULT 
       FROM information_schema.COLUMNS 
       WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'users' AND COLUMN_NAME = 'email'`,
      [dbConfig.database]
    );
    
    if (columns.length === 0) {
      console.log('⚠️ email字段不存在，无需迁移');
      return;
    }
    
    const emailColumn = columns[0];
    console.log('当前email字段配置:', emailColumn);
    
    // 如果已经是可空的，则无需迁移
    if (emailColumn.IS_NULLABLE === 'YES') {
      console.log('✅ email字段已经是可空的，无需迁移');
      return;
    }
    
    console.log('开始修改email字段为可空...');
    
    // 修改email字段为可空
    await connection.execute(
      `ALTER TABLE users MODIFY COLUMN email VARCHAR(100) UNIQUE NULL`
    );
    
    console.log('✅ email字段成功修改为可空');
    
    // 验证修改结果
    const [updatedColumns] = await connection.execute(
      `SELECT COLUMN_NAME, IS_NULLABLE, COLUMN_DEFAULT 
       FROM information_schema.COLUMNS 
       WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'users' AND COLUMN_NAME = 'email'`,
      [dbConfig.database]
    );
    
    if (updatedColumns.length > 0) {
      console.log('修改后的email字段配置:', updatedColumns[0]);
    }
    
    console.log('🎉 迁移完成！');
    
  } catch (error) {
    console.error('❌ 迁移失败:', error);
    console.error('错误详情:', error.message);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
      console.log('数据库连接已关闭');
    }
  }
}

// 如果直接运行此脚本
if (import.meta.url.startsWith('file:')) {
  const modulePath = fileURLToPath(import.meta.url);
  const scriptPath = process.argv[1];
  
  if (modulePath === scriptPath) {
    migrateEmailOptional().catch(error => {
      console.error('迁移脚本执行失败:', error);
      process.exit(1);
    });
  }
}

export { migrateEmailOptional }; 