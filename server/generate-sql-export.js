import { loadConfig } from './config.js';
import { readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 加载环境配置
loadConfig();

// SQL转义函数
const escapeSql = (str) => {
  if (str === null || str === undefined) return 'NULL';
  return "'" + String(str).replace(/'/g, "''").replace(/\\/g, '\\\\') + "'";
};

// 生成CREATE TABLE语句
const generateCreateTableSQL = () => {
  return `-- 创建统计方法表
CREATE TABLE IF NOT EXISTS statistical_methods (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  keywords TEXT,
  content LONGTEXT NOT NULL,
  file_source VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_title (title),
  FULLTEXT KEY ft_content (title, keywords, content)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

`;
};

// 生成INSERT语句
const generateInsertSQL = async () => {
  const methods = [
    {
      title: 'Kruskal-Wallis H检验',
      keywords: 'Kruskal-Wallis,H检验,非参数检验,多个独立样本,秩和检验,方差分析,非正态分布,多组比较,统计检验,假设检验',
      file_source: '6.md',
      file_path: '../docs/asset/6.md'
    },
    {
      title: '配对样本Wilcoxon符号秩检验',
      keywords: 'Wilcoxon,符号秩检验,配对样本,非参数检验,相关样本,符号秩,配对设计,中位数检验,统计检验,假设检验',
      file_source: '7.md',
      file_path: '../docs/asset/7.md'
    },
    {
      title: '独立样本Wilcoxon秩和检验',
      keywords: 'Wilcoxon,秩和检验,独立样本,非参数检验,Mann-Whitney,U检验,两样本比较,分布位置,统计检验,假设检验',
      file_source: '8.md',
      file_path: '../docs/asset/8.md'
    },
    {
      title: 'Friedman M检验',
      keywords: 'Friedman,M检验,非参数检验,多个相关样本,随机区组设计,配伍组设计,重复测量,多组比较,统计检验,假设检验',
      file_source: '9.md',
      file_path: '../docs/asset/9.md'
    }
  ];

  let sql = '-- 插入统计方法数据\n';
  sql += '-- 如果数据已存在，可以先删除:\n';
  sql += '-- DELETE FROM statistical_methods WHERE file_source IN (\'6.md\', \'7.md\', \'8.md\', \'9.md\');\n\n';

  for (const method of methods) {
    try {
      const filePath = join(__dirname, method.file_path);
      const content = await readFile(filePath, 'utf8');
      
      sql += `-- 插入: ${method.title}\n`;
      sql += `INSERT INTO statistical_methods (title, keywords, content, file_source) VALUES (\n`;
      sql += `  ${escapeSql(method.title)},\n`;
      sql += `  ${escapeSql(method.keywords)},\n`;
      sql += `  ${escapeSql(content)},\n`;
      sql += `  ${escapeSql(method.file_source)}\n`;
      sql += `);\n\n`;
      
      console.log(`✅ 生成SQL: ${method.title}`);
    } catch (error) {
      console.error(`❌ 处理文件 ${method.file_source} 失败:`, error);
    }
  }

  return sql;
};

// 主函数
const main = async () => {
  try {
    console.log('🚀 开始生成SQL导出文件...');
    
    // 生成完整的SQL
    let fullSQL = '-- MethodMate 统计方法数据库导出\n';
    fullSQL += `-- 生成时间: ${new Date().toISOString()}\n`;
    fullSQL += '-- 远程服务器: http://175.27.251.132/\n\n';
    
    fullSQL += generateCreateTableSQL();
    fullSQL += await generateInsertSQL();
    
    // 添加验证查询
    fullSQL += '-- 验证插入结果\n';
    fullSQL += 'SELECT COUNT(*) as total_methods FROM statistical_methods;\n';
    fullSQL += 'SELECT id, title, file_source, created_at FROM statistical_methods ORDER BY id;\n';
    
    // 写入文件
    const outputPath = join(__dirname, 'statistical_methods_export.sql');
    await writeFile(outputPath, fullSQL, 'utf8');
    
    console.log('\n🎉 SQL导出文件生成完成！');
    console.log(`📁 文件位置: ${outputPath}`);
    console.log('\n📋 使用方法:');
    console.log('1. 将 statistical_methods_export.sql 文件上传到远程服务器');
    console.log('2. 在远程服务器上连接MySQL: mysql -u username -p');
    console.log('3. 选择数据库: USE methodmate;');
    console.log('4. 执行SQL文件: SOURCE /path/to/statistical_methods_export.sql;');
    console.log('\n或者直接执行: mysql -u username -p methodmate < statistical_methods_export.sql');
    
  } catch (error) {
    console.error('❌ 生成SQL导出失败:', error);
  }
};

// 运行生成
if (import.meta.url === `file://${process.argv[1].replace(/\\/g, '/')}` || 
    import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}`) {
  main().catch(console.error);
}

export { main, generateCreateTableSQL, generateInsertSQL }; 