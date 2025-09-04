import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取分析结果
const analysisPath = path.join(__dirname, '..', 'data', 'venue-field-analysis.json');
const analysisData = JSON.parse(fs.readFileSync(analysisPath, 'utf8'));

console.log('🚀 开始提取所有研究领域...');
console.log(`📊 分析期刊数: ${analysisData.analyzed_venues}`);

// 用于汇总所有领域的Map
const allFieldsMap = new Map();

// 遍历所有期刊
Object.values(analysisData.venues).forEach(venue => {
  if (venue.all_concepts && Array.isArray(venue.all_concepts)) {
    venue.all_concepts.forEach(concept => {
      const fieldId = concept.id;
      const fieldName = concept.name;
      const count = concept.count;
      const totalScore = concept.total_score || 0;
      
      if (allFieldsMap.has(fieldId)) {
        // 如果领域已存在，累加统计
        const existing = allFieldsMap.get(fieldId);
        existing.total_papers += count;
        existing.total_score += totalScore;
        existing.venue_count += 1;
      } else {
        // 新领域
        allFieldsMap.set(fieldId, {
          id: fieldId,
          name: fieldName,
          level: concept.level || 0,
          total_papers: count,
          total_score: totalScore,
          venue_count: 1
        });
      }
    });
  }
});

// 转换为数组并按论文总数排序
const allFieldsArray = Array.from(allFieldsMap.values())
  .map(field => ({
    ...field,
    avg_score: field.total_papers > 0 ? field.total_score / field.total_papers : 0
  }))
  .sort((a, b) => b.total_papers - a.total_papers);

console.log(`📈 总共发现 ${allFieldsArray.length} 个不同的研究领域`);

// 获取前100个最常见的领域
const top100Fields = allFieldsArray.slice(0, 100);

// 创建包含所有领域的JS文件
const allFieldsContent = `// 从期刊论文分析中提取的所有研究领域
// 生成时间: ${new Date().toISOString()}
// 数据来源: OpenAlex API
// 分析期刊数: ${analysisData.analyzed_venues}
// 总领域数: ${allFieldsArray.length}

const allResearchFields = ${JSON.stringify(allFieldsArray, null, 2)};

// 前100个最常见的研究领域
const top100ResearchFields = ${JSON.stringify(top100Fields, null, 2)};

module.exports = {
  allResearchFields,
  top100ResearchFields,
  stats: {
    totalFields: ${allFieldsArray.length},
    analyzedVenues: ${analysisData.analyzed_venues},
    generatedAt: "${new Date().toISOString()}"
  }
};
`;

// 保存文件
const outputPath = path.join(__dirname, '..', 'config', 'research-fields.js');
fs.writeFileSync(outputPath, allFieldsContent);

console.log(`✅ 所有领域数据已保存到: ${outputPath}`);
console.log('\n🏆 前100个最常见的研究领域:');
console.log('排名 | 领域ID | 领域名称 | 论文总数 | 期刊数 | 平均分数');
console.log('-----|--------|----------|----------|--------|----------');

top100Fields.forEach((field, index) => {
  console.log(`${String(index + 1).padStart(4)} | ${field.id.padEnd(12)} | ${field.name.padEnd(35)} | ${String(field.total_papers).padStart(8)} | ${String(field.venue_count).padStart(6)} | ${field.avg_score.toFixed(3)}`);
});

console.log(`\n📊 统计摘要:`);
console.log(`- 总领域数: ${allFieldsArray.length}`);
console.log(`- 分析期刊数: ${analysisData.analyzed_venues}`);
console.log(`- 前10领域覆盖论文数: ${top100Fields.slice(0, 10).reduce((sum, field) => sum + field.total_papers, 0)}`);
console.log(`- 前100领域覆盖论文数: ${top100Fields.reduce((sum, field) => sum + field.total_papers, 0)}`);
