import { initDatabase } from './database.js';

console.log('🚀 开始执行数据库迁移测试...');

try {
  console.log('📡 初始化数据库连接...');
  const pool = await initDatabase();
  
  console.log('✅ 数据库连接成功');
  
  const connection = await pool.getConnection();
  
  try {
    console.log('🔍 检查messages表的content字段类型...');
    
    // 检查当前content字段的类型
    const [columns] = await connection.execute(`
      SHOW COLUMNS FROM messages WHERE Field = 'content'
    `);
    
    if (columns.length > 0) {
      const currentType = columns[0].Type.toLowerCase();
      console.log(`📋 当前content字段类型: ${currentType}`);
      
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
      } else {
        console.log(`⚠️ content字段类型为 ${currentType}，请手动检查`);
      }
    } else {
      console.log('❌ 未找到content字段');
    }
    
  } finally {
    connection.release();
  }
  
  console.log('🎉 迁移测试完成');
  
} catch (error) {
  console.error('❌ 迁移测试失败:', error);
}

process.exit(0); 