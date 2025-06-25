import { initDatabase, getPool } from './database.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 创建统计方法表
const createStatisticalMethodsTable = async (pool) => {
  console.log('创建统计方法表...');
  
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS statistical_methods (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      keywords TEXT,
      content LONGTEXT NOT NULL,
      file_source VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_title (title),
      FULLTEXT(title, keywords, content)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;
  
  await pool.execute(createTableSQL);
  console.log('✅ 统计方法表创建成功');
};

// 解析markdown文件，提取标题和关键词
const parseMarkdownFile = (content, filename) => {
  // 提取主标题（第一个 # 标题）
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : filename.replace('.md', '');
  
  // 提取关键词 - 从标题和内容中
  const keywords = extractKeywords(title, content);
  
  return {
    title,
    keywords: keywords.join(', '),
    content,
    file_source: filename
  };
};

// 从标题和内容中提取关键词
const extractKeywords = (title, content) => {
  const keywords = new Set();
  
  // 从标题中提取关键词
  const titleKeywords = title.toLowerCase()
    .replace(/[()（）]/g, '')
    .split(/[\s,，、\/]+/)
    .filter(word => word.length > 1);
  
  titleKeywords.forEach(keyword => keywords.add(keyword));
  
  // 从内容中提取统计相关的关键词
  const statisticalTerms = [
    '检验', 'test', '分析', 'analysis', '方差', 'variance', 
    '回归', 'regression', '相关', 'correlation', '显著性', 'significance',
    't检验', 'anova', '卡方', 'chi-square', 'wilcoxon', '非参数',
    '假设检验', 'hypothesis test', '置信区间', 'confidence interval',
    '正态分布', 'normal distribution', '标准差', 'standard deviation',
    '均值', 'mean', '中位数', 'median', '方差齐性', 'homogeneity',
    '独立性', 'independence', '配对', 'paired', '单样本', 'one sample',
    '双样本', 'two sample', '多样本', 'multiple sample'
  ];
  
  const contentLower = content.toLowerCase();
  statisticalTerms.forEach(term => {
    if (contentLower.includes(term.toLowerCase())) {
      keywords.add(term);
    }
  });
  
  // 从markdown标题中提取关键词
  const headingMatches = content.match(/^#{1,6}\s+(.+)$/gm);
  if (headingMatches) {
    headingMatches.forEach(heading => {
      const headingText = heading.replace(/^#+\s+/, '').toLowerCase();
      const headingWords = headingText.split(/[\s,，、\/]+/)
        .filter(word => word.length > 1);
      headingWords.forEach(word => keywords.add(word));
    });
  }
  
  return Array.from(keywords);
};

// 读取asset目录下的所有md文件
const readAssetFiles = async () => {
  const assetDir = join(__dirname, '..', 'asset');
  console.log('读取asset目录:', assetDir);
  
  try {
    const files = await fs.readdir(assetDir);
    const mdFiles = files.filter(file => file.endsWith('.md'));
    
    console.log(`找到 ${mdFiles.length} 个markdown文件:`, mdFiles);
    
    const methods = [];
    
    for (const file of mdFiles) {
      const filePath = join(assetDir, file);
      try {
        const content = await fs.readFile(filePath, 'utf-8');
        const methodData = parseMarkdownFile(content, file);
        methods.push(methodData);
        console.log(`✅ 解析文件 ${file}: ${methodData.title}`);
      } catch (error) {
        console.error(`❌ 读取文件 ${file} 失败:`, error);
      }
    }
    
    return methods;
  } catch (error) {
    console.error('❌ 读取asset目录失败:', error);
    return [];
  }
};

// 导入统计方法数据到数据库
const importStatisticalMethods = async (pool, methods) => {
  console.log(`开始导入 ${methods.length} 个统计方法...`);
  
  // 清空现有数据
  await pool.execute('DELETE FROM statistical_methods WHERE file_source IS NOT NULL');
  console.log('已清空现有的文件数据');
  
  const insertSQL = `
    INSERT INTO statistical_methods (title, keywords, content, file_source)
    VALUES (?, ?, ?, ?)
  `;
  
  let successCount = 0;
  
  for (const method of methods) {
    try {
      await pool.execute(insertSQL, [
        method.title,
        method.keywords,
        method.content,
        method.file_source
      ]);
      successCount++;
      console.log(`✅ 导入成功: ${method.title}`);
    } catch (error) {
      console.error(`❌ 导入失败 ${method.title}:`, error);
    }
  }
  
  console.log(`🎉 成功导入 ${successCount}/${methods.length} 个统计方法`);
};

// 主函数
const main = async () => {
  console.log('🚀 开始统计方法数据迁移...');
  
  try {
    // 初始化数据库
    const database = await initDatabase();
    const pool = getPool();
    
    // 创建表
    await createStatisticalMethodsTable(pool);
    
    // 读取asset文件
    const methods = await readAssetFiles();
    
    if (methods.length === 0) {
      console.log('⚠️ 没有找到可导入的方法数据');
      return;
    }
    
    // 导入数据
    await importStatisticalMethods(pool, methods);
    
    // 验证导入结果
    const [result] = await pool.execute('SELECT COUNT(*) as count FROM statistical_methods');
    console.log(`📊 数据库中共有 ${result[0].count} 个统计方法`);
    
    console.log('✅ 统计方法数据迁移完成！');
    
  } catch (error) {
    console.error('❌ 迁移过程中出现错误:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
};

// 运行迁移
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main as migrateStatisticalMethods }; 