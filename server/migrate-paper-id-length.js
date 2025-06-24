// 数据库迁移脚本：更新paper_id字段长度
import { initDatabase, getPool, closeDatabase } from './database.js';

async function migratePaperIdLength() {
  console.log('🔄 开始数据库迁移：更新paper_id字段长度...\n');

  try {
    // 初始化数据库连接
    await initDatabase();
    const pool = getPool();
    const connection = await pool.getConnection();

    console.log('✅ 数据库连接成功');

    try {
      // 检查当前表结构
      console.log('🔍 检查当前表结构...');

      // 检查paper_cache表
      const [paperCacheColumns] = await connection.execute('DESCRIBE paper_cache');
      const paperCachePaperIdColumn = paperCacheColumns.find(col => col.Field === 'paper_id');
      
      if (paperCachePaperIdColumn) {
        console.log(`📋 paper_cache.paper_id 当前类型: ${paperCachePaperIdColumn.Type}`);
        
        if (paperCachePaperIdColumn.Type === 'varchar(100)') {
          console.log('🔧 更新 paper_cache.paper_id 字段长度...');
          await connection.execute('ALTER TABLE paper_cache MODIFY COLUMN paper_id VARCHAR(255)');
          console.log('✅ paper_cache.paper_id 更新成功');
        } else {
          console.log('ℹ️ paper_cache.paper_id 已经是正确的长度');
        }
      }

      // 检查reference_papers表
      const [refPapersColumns] = await connection.execute('DESCRIBE reference_papers');
      const refPapersPaperIdColumn = refPapersColumns.find(col => col.Field === 'paper_id');
      
      if (refPapersPaperIdColumn) {
        console.log(`📋 reference_papers.paper_id 当前类型: ${refPapersPaperIdColumn.Type}`);
        
        if (refPapersPaperIdColumn.Type === 'varchar(100)') {
          console.log('🔧 更新 reference_papers.paper_id 字段长度...');
          await connection.execute('ALTER TABLE reference_papers MODIFY COLUMN paper_id VARCHAR(255)');
          console.log('✅ reference_papers.paper_id 更新成功');
        } else {
          console.log('ℹ️ reference_papers.paper_id 已经是正确的长度');
        }
      }

      // 验证更新结果
      console.log('\n📊 验证更新结果...');
      
      const [updatedPaperCacheColumns] = await connection.execute('DESCRIBE paper_cache');
      const updatedPaperCachePaperIdColumn = updatedPaperCacheColumns.find(col => col.Field === 'paper_id');
      console.log(`✅ paper_cache.paper_id 更新后类型: ${updatedPaperCachePaperIdColumn.Type}`);

      const [updatedRefPapersColumns] = await connection.execute('DESCRIBE reference_papers');
      const updatedRefPapersPaperIdColumn = updatedRefPapersColumns.find(col => col.Field === 'paper_id');
      console.log(`✅ reference_papers.paper_id 更新后类型: ${updatedRefPapersPaperIdColumn.Type}`);

      console.log('\n🎉 数据库迁移完成！paper_id字段长度已更新为VARCHAR(255)');

    } catch (migrationError) {
      console.error('❌ 迁移过程中出错:', migrationError);
      throw migrationError;
    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('❌ 数据库迁移失败:', error);
    throw error;
  } finally {
    await closeDatabase();
  }
}

// 运行迁移
migratePaperIdLength()
  .then(() => {
    console.log('\n✅ 迁移脚本执行完成');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ 迁移脚本执行失败:', error);
    console.error('详细错误:', error.stack);
    process.exit(1);
  });

export { migratePaperIdLength }; 