const mysql = require('mysql2/promise');

// 数据库配置
const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root', // 请根据实际情况修改
  password: '123456', // 请根据实际情况修改
  database: 'methodmate',
  charset: 'utf8mb4'
};

// 目标论文标题
const targetTitle = 'Synthetic Human Memories: AI-Edited Images and Videos Can Implant False Memories and Distort Recollection';

async function fetchPaperFromDatabase() {
  let connection;
  
  try {
    console.log('🔍 连接到数据库...');
    connection = await mysql.createConnection(dbConfig);
    
    console.log('📖 搜索论文:', targetTitle);
    
    // 使用多种搜索策略
    const searchQueries = [
      // 精确匹配标题
      {
        sql: 'SELECT * FROM paper_cache WHERE title = ?',
        params: [targetTitle],
        description: '精确匹配标题'
      },
      // 模糊匹配标题
      {
        sql: 'SELECT * FROM paper_cache WHERE title LIKE ?',
        params: [`%${targetTitle}%`],
        description: '模糊匹配标题'
      },
      // 搜索包含关键词的论文
      {
        sql: 'SELECT * FROM paper_cache WHERE title LIKE ? OR abstract LIKE ?',
        params: ['%Synthetic Human Memories%', '%Synthetic Human Memories%'],
        description: '关键词匹配'
      },
      // 搜索包含AI和Memory的论文
      {
        sql: 'SELECT * FROM paper_cache WHERE (title LIKE ? OR abstract LIKE ?) AND (title LIKE ? OR abstract LIKE ?)',
        params: ['%AI%', '%AI%', '%Memory%', '%Memory%'],
        description: 'AI和Memory组合搜索'
      }
    ];
    
    let foundPaper = null;
    
    for (const query of searchQueries) {
      console.log(`\n🔍 尝试${query.description}...`);
      const [results] = await connection.execute(query.sql, query.params);
      
      if (results.length > 0) {
        console.log(`✅ ${query.description}找到 ${results.length} 篇论文`);
        
        // 找到最匹配的论文
        const bestMatch = results.find(paper => 
          paper.title.toLowerCase().includes('synthetic human memories') ||
          paper.title.toLowerCase().includes('ai-edited images')
        ) || results[0];
        
        foundPaper = bestMatch;
        console.log(`📄 选择论文: ${bestMatch.title}`);
        break;
      } else {
        console.log(`❌ ${query.description}未找到匹配论文`);
      }
    }
    
    if (!foundPaper) {
      console.log('\n❌ 未找到目标论文，显示数据库中所有论文的标题...');
      const [allPapers] = await connection.execute('SELECT id, title, year, journal FROM paper_cache ORDER BY created_at DESC LIMIT 20');
      
      console.log('\n📚 数据库中的论文列表:');
      allPapers.forEach((paper, index) => {
        console.log(`${index + 1}. ${paper.title} (${paper.year}, ${paper.journal})`);
      });
      
      return null;
    }
    
    // 格式化论文数据
    const formattedPaper = {
      id: foundPaper.id,
      title: foundPaper.title,
      abstract: foundPaper.abstract,
      authors: foundPaper.authors ? foundPaper.authors.split(', ') : [],
      year: foundPaper.year,
      journal: foundPaper.journal,
      venue: foundPaper.venue,
      citationCount: foundPaper.citation_count,
      doi: foundPaper.doi,
      url: foundPaper.url,
      downloadUrl: foundPaper.download_url,
      researchMethod: foundPaper.research_method,
      fullText: foundPaper.full_text,
      translatedAbstract: foundPaper.translated_abstract,
      translatedMethod: foundPaper.translated_method,
      source: foundPaper.source,
      isTopVenue: foundPaper.is_top_venue,
      qualityScore: foundPaper.quality_score,
      downloadSources: foundPaper.download_sources ? JSON.parse(foundPaper.download_sources) : null,
      metadata: foundPaper.metadata ? JSON.parse(foundPaper.metadata) : null,
      createdAt: foundPaper.created_at,
      updatedAt: foundPaper.updated_at
    };
    
    console.log('\n✅ 成功获取论文信息:');
    console.log('标题:', formattedPaper.title);
    console.log('作者:', formattedPaper.authors.join(', '));
    console.log('年份:', formattedPaper.year);
    console.log('期刊:', formattedPaper.journal);
    console.log('引用次数:', formattedPaper.citationCount);
    console.log('DOI:', formattedPaper.doi);
    console.log('有研究方法:', !!formattedPaper.researchMethod);
    console.log('有全文:', !!formattedPaper.fullText);
    console.log('有翻译摘要:', !!formattedPaper.translatedAbstract);
    console.log('有翻译方法:', !!formattedPaper.translatedMethod);
    
    // 生成Vue组件可用的数据格式
    console.log('\n📋 Vue组件数据格式:');
    console.log(JSON.stringify({
      id: formattedPaper.id,
      title: formattedPaper.title,
      abstract: formattedPaper.abstract,
      authors: formattedPaper.authors,
      year: formattedPaper.year,
      journal: formattedPaper.journal,
      venue: formattedPaper.venue,
      citationCount: formattedPaper.citationCount,
      doi: formattedPaper.doi,
      url: formattedPaper.url,
      downloadUrl: formattedPaper.downloadUrl,
      researchMethod: formattedPaper.researchMethod,
      source: formattedPaper.source,
      relevance_score: 0.95 // 样例数据相关性分数
    }, null, 2));
    
    return formattedPaper;
    
  } catch (error) {
    console.error('❌ 数据库操作失败:', error);
    return null;
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 数据库连接已关闭');
    }
  }
}

// 运行脚本
if (require.main === module) {
  fetchPaperFromDatabase()
    .then(paper => {
      if (paper) {
        console.log('\n🎉 脚本执行成功！');
      } else {
        console.log('\n⚠️ 未找到目标论文');
      }
    })
    .catch(error => {
      console.error('❌ 脚本执行失败:', error);
    });
}

module.exports = { fetchPaperFromDatabase }; 