const { getPool, initDatabase } = require('./database.js');

async function updateTypeDanceVenue() {
  let pool;
  
  try {
    console.log('初始化数据库...');
    await initDatabase();
    
    console.log('获取数据库连接池...');
    pool = getPool();
    
    // 查找TypeDance论文
    console.log('\n🔍 查找TypeDance论文...');
    const [rows] = await pool.execute(`
      SELECT id, title, venue, journal, is_top_venue
      FROM paper_cache 
      WHERE title LIKE '%TypeDance%'
    `);
    
    if (rows.length > 0) {
      const paper = rows[0];
      console.log(`\n找到论文: ${paper.title}`);
      console.log(`当前期刊/会议: ${paper.venue || paper.journal}`);
      console.log(`当前顶会状态: ${paper.is_top_venue}`);
      
      // CHI是顶级会议，应该标记为顶会
      if (paper.venue && paper.venue.includes('Human Factors in Computing Systems')) {
        console.log('\n✅ CHI是顶级会议，正在更新为顶会状态...');
        
        const [result] = await pool.execute(`
          UPDATE paper_cache 
          SET is_top_venue = TRUE, updated_at = NOW()
          WHERE id = ?
        `, [paper.id]);
        
        if (result.affectedRows > 0) {
          console.log('✅ 论文状态更新成功！');
          
          // 验证更新
          const [updatedRows] = await pool.execute(`
            SELECT id, title, is_top_venue 
            FROM paper_cache 
            WHERE id = ?
          `, [paper.id]);
          
          if (updatedRows.length > 0) {
            console.log(`\n验证结果:`);
            console.log(`  标题: ${updatedRows[0].title}`);
            console.log(`  新的顶会状态: ${updatedRows[0].is_top_venue}`);
          }
        } else {
          console.log('❌ 更新失败');
        }
      } else {
        console.log('\n⚠️ 论文的期刊/会议信息不明确，请手动检查');
      }
    } else {
      console.log('\n❌ 没有找到TypeDance论文');
    }
    
  } catch (error) {
    console.error('更新论文时出错:', error);
  }
}

updateTypeDanceVenue(); 