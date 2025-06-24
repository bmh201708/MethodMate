// 检查数据库状态
const mysql = require('mysql2/promise');

const config = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'methodmate'
};

async function checkDatabase() {
  try {
    console.log('🔍 检查数据库状态...');
    
    const connection = await mysql.createConnection(config);
    console.log('✅ 数据库连接成功');
    
    // 检查所有表
    const [tables] = await connection.execute('SHOW TABLES');
    console.log('\n📋 现有数据表:');
    tables.forEach(table => {
      const tableName = Object.values(table)[0];
      console.log('- ' + tableName);
    });
    
    // 检查paper_cache表是否存在
    const hasPaperCache = tables.some(table => Object.values(table)[0] === 'paper_cache');
    
    if (hasPaperCache) {
      console.log('\n🗂️ paper_cache表结构:');
      const [columns] = await connection.execute('DESCRIBE paper_cache');
      columns.forEach(col => {
        console.log(`- ${col.Field}: ${col.Type} ${col.Null === 'NO' ? '(必需)' : '(可选)'}`);
      });
      
      // 检查表中现有数据
      const [count] = await connection.execute('SELECT COUNT(*) as count FROM paper_cache');
      console.log(`\n📊 缓存中现有论文数量: ${count[0].count}`);
      
      if (count[0].count > 0) {
        const [samples] = await connection.execute('SELECT title, created_at FROM paper_cache LIMIT 3');
        console.log('\n📚 缓存示例:');
        samples.forEach((paper, index) => {
          console.log(`  ${index + 1}. ${paper.title} (${paper.created_at})`);
        });
      }
    } else {
      console.log('\n❌ paper_cache表不存在！');
    }
    
    await connection.end();
    console.log('\n✅ 数据库检查完成');
    
  } catch (error) {
    console.error('\n❌ 数据库检查失败:', error.message);
    console.error('详细错误:', error);
  }
}

checkDatabase(); 