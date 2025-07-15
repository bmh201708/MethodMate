#!/usr/bin/env node

console.log('🧪 测试年份过滤功能：验证是否只获取2019年以后的文献\n');

import fetch from 'node-fetch';

// 模拟修复后的过滤器构建函数
const buildVenueFilter = (filterVenues = true) => {
  if (!filterVenues) {
    return '';
  }
  
  const venueSourceIds = [
    'S4363607743', // CHI Conference
    'S4306421131', // UIST
    'S204030396',  // Computers in Human Behavior
    'S4210190811', // International Journal of Human-Computer Studies  
    'S165559636',  // International Journal of Human-Computer Interaction
    'S152445846',  // Design Studies
    'S70698675',   // Technovation
    'S4210189112', // CoDesign
    'S94432539',   // Applied Ergonomics
    'S4210171473', // Computer-Aided Design
  ];
  
  return `primary_location.source.id:${venueSourceIds.join('|')}`;
};

const buildDomainFilter = (enableDomainFilter = true, hciOnly = false) => {
  if (!enableDomainFilter) {
    return '';
  }
  
  return 'primary_topic.field.id:17'; // Computer Science领域
};

const buildOpenAlexSearchUrl = (searchQuery, limit = 20, filterVenues = true, enableDomainFilter = true, hciOnly = false) => {
  let url = `https://api.openalex.org/works?search=${encodeURIComponent(searchQuery)}`;
  url += `&per-page=${limit}`;
  url += `&sort=relevance_score:desc`;
  
  const fields = [
    'id', 'title', 'display_name', 'publication_year', 'publication_date',
    'primary_location', 'primary_topic'
  ].join(',');
  url += `&select=${fields}`;
  
  const filters = [];
  
  if (filterVenues) {
    const venueFilter = buildVenueFilter(true);
    if (venueFilter) {
      filters.push(venueFilter);
    }
  }
  
  filters.push('is_retracted:false');
  filters.push('is_paratext:false');
  
  // 添加领域过滤
  if (enableDomainFilter) {
    const domainFilter = buildDomainFilter(true, hciOnly);
    if (domainFilter) {
      filters.push(domainFilter);
    }
  }
  
  // 始终添加年份过滤（2019年以后）
  filters.push('publication_year:>2019');
  
  if (filters.length > 0) {
    url += `&filter=${encodeURIComponent(filters.join(','))}`;
  }
  
  return url;
};

// 测试年份过滤效果
async function testYearFiltering() {
  const testCases = [
    {
      name: '启用所有过滤器',
      query: 'user interface',
      filterVenues: true,
      enableDomainFilter: true,
      expectedResult: 'HCI期刊 + 计算机科学 + 2019年以后'
    },
    {
      name: '只启用年份和领域过滤',
      query: 'machine learning',
      filterVenues: false,
      enableDomainFilter: true,
      expectedResult: '所有期刊 + 计算机科学 + 2019年以后'
    },
    {
      name: '只启用年份过滤',
      query: 'artificial intelligence',
      filterVenues: false,
      enableDomainFilter: false,
      expectedResult: '所有期刊 + 所有领域 + 2019年以后'
    }
  ];

  for (const testCase of testCases) {
    console.log(`\n🔍 测试案例: ${testCase.name}`);
    console.log(`   查询: "${testCase.query}"`);
    console.log(`   预期结果: ${testCase.expectedResult}`);
    
    try {
      const url = buildOpenAlexSearchUrl(
        testCase.query, 
        10, 
        testCase.filterVenues, 
        testCase.enableDomainFilter,
        false // 不只要HCI
      );
      
      console.log(`   🌐 请求URL: ${url}`);
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'MethodMate/1.0 (mailto:test@example.com)'
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.log(`   ❌ 错误响应 (${response.status}): ${errorText}`);
        continue;
      }
      
      const data = await response.json();
      console.log(`   ✅ 成功! 获取到 ${data.results?.length || 0} 篇论文`);
      console.log(`   📊 总计可用: ${data.meta?.count || 0} 篇`);
      
      // 分析年份分布
      if (data.results && data.results.length > 0) {
        const years = data.results.map(r => r.publication_year).filter(Boolean);
        const yearCounts = {};
        years.forEach(y => yearCounts[y] = (yearCounts[y] || 0) + 1);
        
        const minYear = Math.min(...years);
        const maxYear = Math.max(...years);
        const validYears = years.filter(y => y > 2019);
        const yearCompliance = years.length > 0 ? (validYears.length / years.length * 100).toFixed(1) : 0;
        
        console.log(`   📅 年份范围: ${minYear} - ${maxYear}`);
        console.log(`   📊 年份分布: ${Object.entries(yearCounts)
          .sort(([a], [b]) => b - a)
          .slice(0, 5)
          .map(([k,v]) => `${k}(${v})`)
          .join(', ')}`);
        console.log(`   🎯 2019年以后占比: ${yearCompliance}% (${validYears.length}/${years.length})`);
        
        if (yearCompliance == 100) {
          console.log(`   ✅ 年份过滤完美！所有论文都是2019年以后`);
        } else if (yearCompliance >= 90) {
          console.log(`   ✅ 年份过滤良好！绝大部分论文是2019年以后`);
        } else {
          console.log(`   ❌ 年份过滤失效！存在2019年及之前的论文`);
        }
        
        // 显示前5篇论文的详细信息
        console.log(`   📚 前5篇论文年份详情:`);
        for (let i = 0; i < Math.min(5, data.results.length); i++) {
          const paper = data.results[i];
          const year = paper.publication_year || '未知';
          const field = paper.primary_topic?.field?.display_name || '未知领域';
          const venue = paper.primary_location?.source?.display_name || '未知期刊';
          
          console.log(`      ${i+1}. ${year}年 - ${field}`);
          console.log(`         ${paper.title?.substring(0, 60)}...`);
          console.log(`         期刊: ${venue.substring(0, 40)}...`);
        }
      }
      
    } catch (error) {
      console.log(`   ❌ 请求失败: ${error.message}`);
    }
  }
}

// 专门测试年份边界情况
async function testYearBoundary() {
  console.log(`\n\n🎯 专项测试：验证年份边界（2019年以后）\n`);
  
  // 测试一些应该有大量2019年前后论文的关键词
  const testQueries = [
    'deep learning', // 应该有很多2019年前的论文
    'artificial intelligence', // 经典领域，2019年前应该有大量论文
    'machine learning' // 同样有很多历史论文
  ];
  
  for (const query of testQueries) {
    console.log(`🔍 测试关键词: "${query}"`);
    
    try {
      const urlWithYearFilter = buildOpenAlexSearchUrl(query, 20, false, true, false);
      console.log(`   🌐 URL: ${urlWithYearFilter}`);
      
      const response = await fetch(urlWithYearFilter);
      if (response.ok) {
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
          // 分析所有返回论文的年份
          const years = data.results.map(r => r.publication_year).filter(Boolean);
          const pre2020Count = years.filter(y => y <= 2019).length;
          const post2019Count = years.filter(y => y > 2019).length;
          
          console.log(`     📊 找到 ${data.meta?.count || 0} 篇相关论文`);
          console.log(`     📅 样本中年份分布:`);
          console.log(`        2019年及之前: ${pre2020Count} 篇`);
          console.log(`        2020年及之后: ${post2019Count} 篇`);
          
          if (pre2020Count === 0) {
            console.log(`     ✅ 年份过滤成功！没有2019年及之前的论文`);
          } else {
            console.log(`     ❌ 年份过滤失败！存在 ${pre2020Count} 篇2019年及之前的论文`);
            
            // 显示违规论文
            const violatingPapers = data.results.filter(r => r.publication_year <= 2019);
            console.log(`     🚨 违规论文示例:`);
            for (let i = 0; i < Math.min(3, violatingPapers.length); i++) {
              const paper = violatingPapers[i];
              console.log(`        - ${paper.publication_year}年: ${paper.title?.substring(0, 50)}...`);
            }
          }
        }
      }
    } catch (error) {
      console.log(`     ❌ 测试失败: ${error.message}`);
    }
    
    console.log('');
  }
}

// 运行测试
async function runTests() {
  console.log('🚀 开始测试年份过滤功能\n');
  
  await testYearFiltering();
  await testYearBoundary();
  
  console.log('\n🎉 年份过滤测试完成!');
  console.log('如果所有测试显示100%或接近100%的2019年以后论文，说明年份过滤成功');
}

runTests().catch(console.error); 