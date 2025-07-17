import { initDatabase } from './database.js';

/**
 * 迁移messages表，将content字段从TEXT改为LONGTEXT
 */
const migrateMessagesTable = async () => {
  const pool = await initDatabase();
  const connection = await pool.getConnection();
  
  try {
    console.log('🔄 开始迁移messages表...');
    
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
    
  } catch (error) {
    console.error('❌ 迁移messages表失败:', error);
    throw error;
  } finally {
    connection.release();
  }
};

// 如果直接运行此脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  (async () => {
    try {
      await migrateMessagesTable();
      console.log('🎉 迁移脚本执行完成');
      process.exit(0);
    } catch (error) {
      console.error('❌ 迁移失败:', error);
      process.exit(1);
    }
  })();
}

export { migrateMessagesTable }; 