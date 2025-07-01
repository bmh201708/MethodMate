const { getPool } = require('./database.js');

async function checkTypeDancePaper() {
  let pool;
  
  try {
    console.log('获取数据库连接池...');
    pool = getPool();
    
    // 搜索包含TypeDance的论文
    console.log('\n🔍 搜索包含TypeDance的论文...');
    const [rows] = await pool.execute(`
      SELECT id, title, authors, venue, journal, year, is_top_venue, 
             citation_count, source, created_at, updated_at
      FROM paper_cache 
      WHERE title LIKE '%TypeDance%' OR title LIKE '%typedance%'
      ORDER BY created_at DESC
    `);
    
    if (rows.length > 0) {
      console.log(`\n✅ 找到 ${rows.length} 篇相关论文:`);
      rows.forEach((paper, index) => {
        console.log(`\n论文 ${index + 1}:`);
        console.log(`  ID: ${paper.id}`);
        console.log(`  标题: ${paper.title}`);
        console.log(`  作者: ${paper.authors}`);
        console.log(`  期刊/会议: ${paper.venue || paper.journal || '未知'}`);
        console.log(`  年份: ${paper.year}`);
        console.log(`  是否顶会: ${paper.is_top_venue} (${typeof paper.is_top_venue})`);
        console.log(`  引用次数: ${paper.citation_count}`);
        console.log(`  来源: ${paper.source}`);
        console.log(`  创建时间: ${paper.created_at}`);
        console.log(`  更新时间: ${paper.updated_at}`);
      });
      
      // 测试全文搜索
      console.log('\n🔍 测试MySQL全文搜索...');
      const [fullTextRows] = await pool.execute(`
        SELECT id, title, 
               MATCH(title, abstract) AGAINST(? IN NATURAL LANGUAGE MODE) as relevance_score
        FROM paper_cache 
        WHERE MATCH(title, abstract) AGAINST(? IN NATURAL LANGUAGE MODE)
        ORDER BY relevance_score DESC
        LIMIT 5
      `, ['TypeDance', 'TypeDance']);
      
      console.log(`全文搜索结果: ${fullTextRows.length} 篇`);
      fullTextRows.forEach((paper, index) => {
        console.log(`  ${index + 1}. ${paper.title} (相关性: ${paper.relevance_score})`);
      });
      
      // 测试LIKE搜索
      console.log('\n🔍 测试LIKE搜索...');
      const [likeRows] = await pool.execute(`
        SELECT id, title, is_top_venue
        FROM paper_cache 
        WHERE (title LIKE ? OR title LIKE ?)
        ORDER BY citation_count DESC
        LIMIT 5
      `, ['%TypeDance%', '%typedance%']);
      
      console.log(`LIKE搜索结果: ${likeRows.length} 篇`);
      likeRows.forEach((paper, index) => {
        console.log(`  ${index + 1}. ${paper.title} (顶会: ${paper.is_top_venue})`);
      });
      
      // 测试带顶会过滤的LIKE搜索
      console.log('\n🔍 测试带顶会过滤的LIKE搜索...');
      const [topVenueLikeRows] = await pool.execute(`
        SELECT id, title, is_top_venue
        FROM paper_cache 
        WHERE (title LIKE ? OR title LIKE ?) AND is_top_venue = TRUE
        ORDER BY citation_count DESC
        LIMIT 5
      `, ['%TypeDance%', '%typedance%']);
      
      console.log(`顶会过滤LIKE搜索结果: ${topVenueLikeRows.length} 篇`);
      topVenueLikeRows.forEach((paper, index) => {
        console.log(`  ${index + 1}. ${paper.title} (顶会: ${paper.is_top_venue})`);
      });
      
    } else {
      console.log('\n❌ 没有找到包含TypeDance的论文');
      
      // 检查是否有类似的论文
      console.log('\n🔍 搜索类似的论文标题...');
      const [similarRows] = await pool.execute(`
        SELECT id, title
        FROM paper_cache 
        WHERE title LIKE '%type%' OR title LIKE '%dance%' OR title LIKE '%logo%'
        ORDER BY created_at DESC
        LIMIT 10
      `);
      
      console.log(`找到 ${similarRows.length} 篇类似论文:`);
      similarRows.forEach((paper, index) => {
        console.log(`  ${index + 1}. ${paper.title}`);
      });
    }
    
  } catch (error) {
    console.error('检查论文时出错:', error);
  }
}

checkTypeDancePaper(); 