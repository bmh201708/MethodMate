import { getPool } from './database.js';

// 从数据库中搜索统计方法
const searchStatisticalMethodFromDB = async (queryMethod) => {
  try {
    if (!queryMethod || typeof queryMethod !== 'string') {
      return null;
    }

    const pool = getPool();
    const query = queryMethod.toLowerCase().trim();
    
    console.log('从数据库搜索统计方法:', query);

    // 第一优先级：精确匹配标题
    let searchSQL = `
      SELECT id, title, keywords, content, file_source, created_at, updated_at
      FROM statistical_methods 
      WHERE LOWER(title) = ?
      LIMIT 1
    `;
    
    let [results] = await pool.execute(searchSQL, [query]);
    
    if (results.length > 0) {
      console.log('✅ 精确匹配找到方法:', results[0].title);
      return formatMethodResult(results[0]);
    }

    // 第二优先级：标题包含查询词
    searchSQL = `
      SELECT id, title, keywords, content, file_source, created_at, updated_at
      FROM statistical_methods 
      WHERE LOWER(title) LIKE ?
      ORDER BY 
        CASE 
          WHEN LOWER(title) LIKE ? THEN 1
          ELSE 2 
        END,
        LENGTH(title)
      LIMIT 1
    `;
    
    const titleLikePattern = `%${query}%`;
    const titleStartPattern = `${query}%`;
    
    [results] = await pool.execute(searchSQL, [titleLikePattern, titleStartPattern]);
    
    if (results.length > 0) {
      console.log('✅ 标题匹配找到方法:', results[0].title);
      return formatMethodResult(results[0]);
    }

    // 第三优先级：关键词匹配
    searchSQL = `
      SELECT id, title, keywords, content, file_source, created_at, updated_at
      FROM statistical_methods 
      WHERE LOWER(keywords) LIKE ?
      ORDER BY 
        CASE 
          WHEN LOWER(keywords) LIKE ? THEN 1
          ELSE 2 
        END,
        LENGTH(title)
      LIMIT 1
    `;
    
    [results] = await pool.execute(searchSQL, [titleLikePattern, titleStartPattern]);
    
    if (results.length > 0) {
      console.log('✅ 关键词匹配找到方法:', results[0].title);
      return formatMethodResult(results[0]);
    }

    // 第四优先级：全文搜索（如果支持）
    try {
      searchSQL = `
        SELECT id, title, keywords, content, file_source, created_at, updated_at,
               MATCH(title, keywords, content) AGAINST(? IN NATURAL LANGUAGE MODE) as relevance
        FROM statistical_methods 
        WHERE MATCH(title, keywords, content) AGAINST(? IN NATURAL LANGUAGE MODE)
        ORDER BY relevance DESC
        LIMIT 1
      `;
      
      [results] = await pool.execute(searchSQL, [query, query]);
      
      if (results.length > 0) {
        console.log('✅ 全文搜索找到方法:', results[0].title, '相关性:', results[0].relevance);
        return formatMethodResult(results[0]);
      }
    } catch (fullTextError) {
      console.log('全文搜索不支持，跳过:', fullTextError.message);
    }

    // 第五优先级：模糊匹配（处理一些常见的变体）
    const fuzzyQueries = generateFuzzyQueries(query);
    
    for (const fuzzyQuery of fuzzyQueries) {
      searchSQL = `
        SELECT id, title, keywords, content, file_source, created_at, updated_at
        FROM statistical_methods 
        WHERE LOWER(title) LIKE ? OR LOWER(keywords) LIKE ?
        ORDER BY LENGTH(title)
        LIMIT 1
      `;
      
      const fuzzyPattern = `%${fuzzyQuery}%`;
      [results] = await pool.execute(searchSQL, [fuzzyPattern, fuzzyPattern]);
      
      if (results.length > 0) {
        console.log('✅ 模糊匹配找到方法:', results[0].title, '查询词:', fuzzyQuery);
        return formatMethodResult(results[0]);
      }
    }

    console.log('❌ 数据库中未找到匹配的统计方法');
    return null;

  } catch (error) {
    console.error('数据库搜索统计方法时出错:', error);
    return null;
  }
};

// 生成模糊查询变体
const generateFuzzyQueries = (query) => {
  const fuzzyQueries = [];
  
  // 移除常见的前缀后缀
  const cleanedQuery = query
    .replace(/检验$/, '')
    .replace(/分析$/, '')
    .replace(/方法$/, '')
    .replace(/test$/, '')
    .replace(/analysis$/, '')
    .replace(/method$/, '')
    .trim();
  
  if (cleanedQuery !== query) {
    fuzzyQueries.push(cleanedQuery);
  }
  
  // 处理中英文对应
  const translations = {
    't检验': 't-test',
    't-test': 't检验',
    'anova': '方差分析',
    '方差分析': 'anova',
    '卡方': 'chi-square',
    'chi-square': '卡方',
    'wilcoxon': '威尔科克森',
    '威尔科克森': 'wilcoxon',
    '非参数': 'nonparametric',
    'nonparametric': '非参数',
    '配对': 'paired',
    'paired': '配对',
    '独立': 'independent',
    'independent': '独立',
    '单样本': 'one sample',
    'one sample': '单样本'
  };
  
  for (const [chinese, english] of Object.entries(translations)) {
    if (query.includes(chinese)) {
      fuzzyQueries.push(query.replace(chinese, english));
    }
    if (query.includes(english)) {
      fuzzyQueries.push(query.replace(english, chinese));
    }
  }
  
  // 处理空格和连字符
  if (query.includes(' ')) {
    fuzzyQueries.push(query.replace(/\s+/g, ''));
    fuzzyQueries.push(query.replace(/\s+/g, '-'));
  }
  
  if (query.includes('-')) {
    fuzzyQueries.push(query.replace(/-/g, ' '));
    fuzzyQueries.push(query.replace(/-/g, ''));
  }
  
  // 去重并过滤
  return [...new Set(fuzzyQueries)].filter(q => q.length > 1);
};

// 格式化方法结果
const formatMethodResult = (dbResult) => {
  return {
    method: dbResult.title,
    content: dbResult.content,
    keywords: dbResult.keywords,
    isLocalContent: true,
    source: 'database',
    file_source: dbResult.file_source,
    id: dbResult.id,
    created_at: dbResult.created_at,
    updated_at: dbResult.updated_at
  };
};

// 获取所有统计方法列表
const getAllStatisticalMethods = async () => {
  try {
    const pool = getPool();
    const [results] = await pool.execute(`
      SELECT id, title, keywords, file_source, created_at, updated_at
      FROM statistical_methods 
      ORDER BY title
    `);
    
    return results.map(method => ({
      id: method.id,
      title: method.title,
      keywords: method.keywords,
      file_source: method.file_source,
      created_at: method.created_at,
      updated_at: method.updated_at
    }));
  } catch (error) {
    console.error('获取统计方法列表时出错:', error);
    return [];
  }
};

// 根据ID获取统计方法详情
const getStatisticalMethodById = async (id) => {
  try {
    const pool = getPool();
    const [results] = await pool.execute(`
      SELECT id, title, keywords, content, file_source, created_at, updated_at
      FROM statistical_methods 
      WHERE id = ?
    `, [id]);
    
    if (results.length > 0) {
      return formatMethodResult(results[0]);
    }
    
    return null;
  } catch (error) {
    console.error('根据ID获取统计方法时出错:', error);
    return null;
  }
};

// 添加或更新统计方法
const upsertStatisticalMethod = async (methodData) => {
  try {
    const pool = getPool();
    const { title, keywords, content, file_source } = methodData;
    
    // 检查是否已存在
    const [existing] = await pool.execute(`
      SELECT id FROM statistical_methods WHERE title = ? OR file_source = ?
    `, [title, file_source]);
    
    if (existing.length > 0) {
      // 更新现有记录
      await pool.execute(`
        UPDATE statistical_methods 
        SET title = ?, keywords = ?, content = ?, file_source = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `, [title, keywords, content, file_source, existing[0].id]);
      
      console.log('✅ 更新统计方法:', title);
      return existing[0].id;
    } else {
      // 插入新记录
      const [result] = await pool.execute(`
        INSERT INTO statistical_methods (title, keywords, content, file_source)
        VALUES (?, ?, ?, ?)
      `, [title, keywords, content, file_source]);
      
      console.log('✅ 新增统计方法:', title);
      return result.insertId;
    }
  } catch (error) {
    console.error('保存统计方法时出错:', error);
    throw error;
  }
};

export {
  searchStatisticalMethodFromDB,
  getAllStatisticalMethods,
  getStatisticalMethodById,
  upsertStatisticalMethod
}; 