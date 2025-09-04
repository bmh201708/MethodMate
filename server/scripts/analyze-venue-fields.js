/**
 * 分析venue-classification.js中期刊在OpenAlex数据库中的实际领域分布
 * 查询2020-2025年间的论文数据，统计各期刊的主要研究领域
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES模块中获取__dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 导入期刊分类数据
import venueConfig from '../config/venue-classification.js';

// OpenAlex API配置
const OPENALEX_API_BASE = 'https://api.openalex.org';
const REQUEST_DELAY = 100; // 请求间隔，避免API限制
const MAX_RESULTS_PER_QUERY = 200; // 每次查询最大结果数

// 结果存储
const venueFieldAnalysis = {
  timestamp: new Date().toISOString(),
  query_period: '2020-2025',
  total_venues: 0,
  analyzed_venues: 0,
  venues: {},
  field_summary: {},
  errors: []
};

/**
 * 发送HTTP GET请求
 */
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (error) {
          reject(new Error(`JSON解析错误: ${error.message}`));
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

/**
 * 延迟函数
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 清理期刊名称，用于OpenAlex查询
 */
function cleanVenueName(name) {
  return name
    .replace(/^ACM\s+/i, '') // 移除开头的ACM
    .replace(/^IEEE\s+/i, '') // 移除开头的IEEE
    .replace(/^International\s+/i, '') // 移除开头的International
    .replace(/\s+Transactions\s+on\s+/i, ' ') // 简化Transactions on
    .replace(/\s+Journal\s+of\s+/i, ' ') // 简化Journal of
    .replace(/\s+Conference\s+on\s+/i, ' ') // 简化Conference on
    .replace(/[^\w\s-]/g, '') // 移除特殊字符
    .trim();
}

/**
 * 查询单个期刊的论文和领域信息
 */
async function analyzeVenue(venue) {
  const venueName = venue.刊物全称 || venue.会议全称;
  const venueShort = venue.刊物简称 || venue.会议简称;
  const venueType = venue.类型;
  
  console.log(`\n正在分析: ${venueName} (${venueShort})`);
  
  try {
    // 第一步：查找期刊/会议的OpenAlex ID
    const searchName = encodeURIComponent(venueName);
    const sourceSearchUrl = `${OPENALEX_API_BASE}/sources?filter=display_name.search:${searchName}&per-page=10`;
    
    console.log(`  🔍 搜索期刊源: ${sourceSearchUrl}`);
    
    const sourceResponse = await makeRequest(sourceSearchUrl);
    
    if (!sourceResponse.results || sourceResponse.results.length === 0) {
      console.log(`  ❌ 未找到期刊源`);
      venueFieldAnalysis.errors.push({
        venue: venueName,
        error: '未找到期刊源'
      });
      return;
    }
    
    // 选择最匹配的期刊源
    let bestMatch = sourceResponse.results[0];
    for (const source of sourceResponse.results) {
      if (source.display_name.toLowerCase().includes(venueName.toLowerCase().split(' ')[0])) {
        bestMatch = source;
        break;
      }
    }
    
    const sourceId = bestMatch.id.replace('https://openalex.org/S', 'S');
    console.log(`  ✅ 找到期刊源: ${bestMatch.display_name} (${sourceId})`);
    
    await delay(REQUEST_DELAY);
    
    // 第二步：查询该期刊的论文
    const worksUrl = `${OPENALEX_API_BASE}/works?filter=primary_location.source.id:${sourceId},publication_year:2020-2025&per-page=${MAX_RESULTS_PER_QUERY}&select=id,title,publication_year,concepts,primary_location`;
    
    console.log(`  📄 查询论文: ${worksUrl}`);
    
    const response = await makeRequest(worksUrl);
    
    if (!response.results || response.results.length === 0) {
      console.log(`  ❌ 未找到相关论文`);
      venueFieldAnalysis.errors.push({
        venue: venueName,
        error: '未找到相关论文'
      });
      return;
    }
    
    console.log(`  ✅ 找到 ${response.results.length} 篇论文 (总计: ${response.meta?.count || 'unknown'})`);
    
    // 分析论文的概念/领域分布
    const conceptStats = {};
    const fieldStats = {};
    let totalPapers = 0;
    
    for (const work of response.results) {
      totalPapers++;
      
      if (work.concepts && Array.isArray(work.concepts)) {
        for (const concept of work.concepts) {
          // 统计所有概念
          const conceptId = concept.id?.replace('https://openalex.org/C', 'C') || 'unknown';
          const conceptName = concept.display_name || 'unknown';
          const level = concept.level || 0;
          const score = concept.score || 0;
          
          if (!conceptStats[conceptId]) {
            conceptStats[conceptId] = {
              id: conceptId,
              name: conceptName,
              level: level,
              count: 0,
              total_score: 0,
              avg_score: 0
            };
          }
          
          conceptStats[conceptId].count++;
          conceptStats[conceptId].total_score += score;
          conceptStats[conceptId].avg_score = conceptStats[conceptId].total_score / conceptStats[conceptId].count;
          
          // 统计所有领域（移除level和score限制）
          if (!fieldStats[conceptId]) {
            fieldStats[conceptId] = {
              id: conceptId,
              name: conceptName,
              level: level,
              count: 0,
              total_score: 0,
              avg_score: 0,
              percentage: 0
            };
          }
          fieldStats[conceptId].count++;
          fieldStats[conceptId].total_score += score;
        }
      }
    }
    
    // 计算百分比和平均分数
    Object.values(fieldStats).forEach(field => {
      field.avg_score = field.total_score / field.count;
      field.percentage = (field.count / totalPapers) * 100;
    });
    
    // 按出现频率排序
    const allConcepts = Object.values(conceptStats)
      .sort((a, b) => b.count - a.count);
      
    const allFields = Object.values(fieldStats)
      .sort((a, b) => b.percentage - a.percentage);

    // 获取前20个概念和前10个领域用于显示
    const topConcepts = allConcepts.slice(0, 20);
    const topFields = allFields.slice(0, 10);
    
    // 存储结果（包含所有领域信息）
    venueFieldAnalysis.venues[venueShort || venueName] = {
      venue_name: venueName,
      venue_short: venueShort,
      venue_type: venueType,
      venue_class: venue.分类,
      total_papers: totalPapers,
      total_concepts: Object.keys(conceptStats).length,
      total_fields: Object.keys(fieldStats).length,
      all_concepts: allConcepts,
      all_fields: allFields,
      top_concepts: topConcepts,
      main_fields: topFields,
      works_query_url: worksUrl,
      source_id: sourceId
    };
    
    // 更新全局领域统计（使用所有领域）
    allFields.forEach(field => {
      if (!venueFieldAnalysis.field_summary[field.id]) {
        venueFieldAnalysis.field_summary[field.id] = {
          id: field.id,
          name: field.name,
          level: field.level,
          venues: [],
          total_papers: 0,
          avg_percentage: 0
        };
      }
      
      venueFieldAnalysis.field_summary[field.id].venues.push({
        venue: venueShort || venueName,
        papers: field.count,
        percentage: field.percentage,
        avg_score: field.avg_score
      });
      venueFieldAnalysis.field_summary[field.id].total_papers += field.count;
    });
    
    venueFieldAnalysis.analyzed_venues++;
    
    console.log(`  📊 领域总数: ${allFields.length}, 主要领域: ${topFields.slice(0, 3).map(f => `${f.name}(${f.percentage.toFixed(1)}%)`).join(', ')}`);
    
  } catch (error) {
    console.error(`  ❌ 查询失败: ${error.message}`);
    venueFieldAnalysis.errors.push({
      venue: venueName,
      error: error.message
    });
  }
  
  // 请求间隔
  await delay(REQUEST_DELAY);
}

/**
 * 主分析函数
 */
async function analyzeAllVenues() {
  console.log('🚀 开始分析venue-classification.js中的期刊领域分布...');
  console.log(`📊 总计期刊数量: ${venueConfig.ALL_JOURNALS.length}`);
  console.log(`📊 查询时间范围: 2020-2025`);
  
  venueFieldAnalysis.total_venues = venueConfig.ALL_JOURNALS.length;
  
  // 分析所有期刊
  for (const journal of venueConfig.ALL_JOURNALS) {
    await analyzeVenue(journal);
  }
  
  // 计算全局领域统计的平均值
  Object.values(venueFieldAnalysis.field_summary).forEach(field => {
    field.avg_percentage = field.venues.reduce((sum, v) => sum + v.percentage, 0) / field.venues.length;
    field.venues.sort((a, b) => b.percentage - a.percentage);
  });
  
  // 保存结果到JSON文件
  const outputPath = path.join(__dirname, '../data/venue-field-analysis.json');
  
  // 确保data目录存在
  const dataDir = path.dirname(outputPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, JSON.stringify(venueFieldAnalysis, null, 2), 'utf8');
  
  console.log('\n✅ 分析完成!');
  console.log(`📁 结果保存到: ${outputPath}`);
  console.log(`📊 成功分析: ${venueFieldAnalysis.analyzed_venues}/${venueFieldAnalysis.total_venues} 个期刊`);
  console.log(`❌ 失败数量: ${venueFieldAnalysis.errors.length}`);
  
  // 显示前10个最常见的领域
  const topGlobalFields = Object.values(venueFieldAnalysis.field_summary)
    .sort((a, b) => b.total_papers - a.total_papers)
    .slice(0, 10);
    
  console.log('\n🏆 最常见的研究领域:');
  topGlobalFields.forEach((field, index) => {
    console.log(`${index + 1}. ${field.name} (${field.id}) - ${field.venues.length}个期刊, ${field.total_papers}篇论文`);
  });
  
  if (venueFieldAnalysis.errors.length > 0) {
    console.log('\n❌ 查询失败的期刊:');
    venueFieldAnalysis.errors.forEach(error => {
      console.log(`  - ${error.venue}: ${error.error}`);
    });
  }
}

// 运行分析
const currentFile = fileURLToPath(import.meta.url);
const scriptFile = path.resolve(process.argv[1]);
const isMainModule = currentFile === scriptFile;

if (isMainModule) {
  console.log('🚀 开始分析venue-classification.js中的期刊领域分布...');
  analyzeAllVenues().catch(console.error);
}

export {
  analyzeAllVenues,
  analyzeVenue
};
