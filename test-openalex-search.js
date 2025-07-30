#!/usr/bin/env node

// 测试 OpenAlex API 搜索特定论文的脚本
// 使用Node.js内置fetch (需要Node.js 18+)

// 从log.txt读取的论文标题列表
const PAPER_TITLES = [
  "TypeDance: Creating Semantic Typographic Logos from Image through Personalized Generation",
  "Understanding and Supporting Formal Email Exchange by Answering AI-Generated Questions",
  "Synthetic Human Memories: AI-Edited Images and Videos Can Implant False Memories and Distort Recollection",
  "Human Creativity in the Age of LLMs: Randomized Experiments on Divergent and Convergent Thinking",
  "SketchFlex: Facilitating Spatial-Semantic Coherence in Text-to-Image Generation with Region-Based Sketches",
  "Letters from Future Self: Augmenting the Letter-Exchange Exercise with LLM-based Agents to Enhance Young Adults' Career Exploration"
];

// OpenAlex API 基础URL
const OPENALEX_API_BASE = 'https://api.openalex.org';

// 使用Node.js内置fetch（Node.js 18+）
console.log('🔗 使用Node.js内置fetch进行直连');

// 项目的领域过滤条件
const buildDomainFilter = () => {
  // 使用项目中的多领域Field过滤
  const fieldIds = ['17', '12', '32', '33']; // Computer Science, Arts & Humanities, Psychology, Social Sciences
  return `primary_topic.field.id:${fieldIds.join('|')}`;
};

// 构建搜索URL的函数
function buildSearchUrl(query, withDomainFilter = false) {
  let url = `${OPENALEX_API_BASE}/works?search=${encodeURIComponent(query)}`;
  url += `&per-page=10`;
  url += `&sort=relevance_score:desc`;
  url += `&select=id,title,display_name,publication_year,authorships,primary_location,doi,topics`;
  
  const filters = [];
  filters.push('is_retracted:false');
  filters.push('is_paratext:false');
  filters.push('publication_year:>2019');
  
  if (withDomainFilter) {
    filters.push(buildDomainFilter());
  }
  
  if (filters.length > 0) {
    url += `&filter=${encodeURIComponent(filters.join(','))}`;
  }
  
  return url;
}

// 测试单篇论文的函数
async function testSinglePaper(paperTitle, paperIndex) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`📄 第${paperIndex + 1}篇论文: ${paperTitle}`);
  console.log(`${'='.repeat(80)}`);
  
  const testCases = [
    { name: '无过滤条件的标题搜索', withDomainFilter: false },
    { name: '带领域过滤的标题搜索', withDomainFilter: true }
  ];
  
  const results = { found: false, foundWithFilter: false };
  
  for (const testCase of testCases) {
    console.log(`\n🎯 ${testCase.name}:`);
    
    try {
      const searchUrl = buildSearchUrl(`"${paperTitle}"`, testCase.withDomainFilter);
      console.log(`📡 请求URL: ${searchUrl.substring(0, 100)}...`);
      
      const response = await fetch(searchUrl, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'MethodMate/1.0 (Research Tool Test)'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`📊 搜索结果: 找到 ${data.results?.length || 0} 篇论文`);
      
      if (data.results && data.results.length > 0) {
        // 检查是否找到目标论文
        let targetFound = false;
        
        for (const work of data.results) {
          const title = work.title || work.display_name || '';
          const similarity = calculateTitleSimilarity(title, paperTitle);
          
          if (similarity > 0.8) {
            targetFound = true;
            const year = work.publication_year || '未知年份';
            const venue = work.primary_location?.source?.display_name || '未知期刊';
            
            console.log(`\n✅ 找到匹配论文 (相似度: ${(similarity * 100).toFixed(1)}%):`);
            console.log(`   📝 标题: ${title}`);
            console.log(`   📅 年份: ${year}`);
            console.log(`   📖 期刊: ${venue}`);
            console.log(`   🔗 OpenAlex ID: ${work.id}`);
            if (work.doi) {
              console.log(`   📄 DOI: ${work.doi}`);
            }
            break;
          }
        }
        
        if (targetFound) {
          if (testCase.withDomainFilter) {
            results.foundWithFilter = true;
          } else {
            results.found = true;
          }
        } else {
          console.log('❌ 未找到完全匹配的目标论文');
        }
      } else {
        console.log('❌ 没有找到任何结果');
      }
      
    } catch (error) {
      console.error(`❌ 搜索失败: ${error.message}`);
    }
  }
  
  return results;
}

// 主测试函数
async function testAllPapers() {
  console.log('🚀 开始测试 OpenAlex API 搜索6篇论文');
  console.log('🔍 测试项目: 标题搜索 + 领域过滤条件');
  
  const testResults = [];
  
  for (let i = 0; i < PAPER_TITLES.length; i++) {
    const results = await testSinglePaper(PAPER_TITLES[i], i);
    testResults.push({
      title: PAPER_TITLES[i],
      ...results
    });
    
    // 添加延迟避免API限制
    if (i < PAPER_TITLES.length - 1) {
      console.log('\n⏳ 等待1秒...');
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  // 显示总结结果
  console.log(`\n\n${'='.repeat(80)}`);
  console.log('📊 测试结果总结');
  console.log(`${'='.repeat(80)}`);
  
  testResults.forEach((result, index) => {
    const statusNormal = result.found ? '✅' : '❌';
    const statusFiltered = result.foundWithFilter ? '✅' : '❌';
    
    console.log(`\n${index + 1}. ${result.title.substring(0, 60)}${result.title.length > 60 ? '...' : ''}`);
    console.log(`   无过滤: ${statusNormal} | 带领域过滤: ${statusFiltered}`);
  });
  
  const foundCount = testResults.filter(r => r.found).length;
  const foundWithFilterCount = testResults.filter(r => r.foundWithFilter).length;
  
  console.log(`\n📈 统计结果:`);
  console.log(`   无过滤条件: ${foundCount}/${PAPER_TITLES.length} 篇论文可搜到`);
  console.log(`   带领域过滤: ${foundWithFilterCount}/${PAPER_TITLES.length} 篇论文可搜到`);
  console.log(`   过滤后保留率: ${foundWithFilterCount > 0 ? ((foundWithFilterCount / foundCount) * 100).toFixed(1) : 0}%`);
}

// 计算标题相似度的简单函数
function calculateTitleSimilarity(title1, title2) {
  const normalize = (str) => str.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
  
  const words1 = normalize(title1).split(' ');
  const words2 = normalize(title2).split(' ');
  
  const intersection = words1.filter(word => words2.includes(word));
  const union = [...new Set([...words1, ...words2])];
  
  return intersection.length / union.length;
}

// 运行测试
testAllPapers()
  .then(() => {
    console.log('\n✅ 所有测试完成');
  })
  .catch((error) => {
    console.error('\n❌ 测试失败:', error);
    process.exit(1);
  });