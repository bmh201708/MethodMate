// 测试本地搜索功能
const testLocalSearch = async () => {
  console.log('🧪 测试本地搜索功能...\n');

  const testCases = [
    {
      name: '英文关键词测试',
      query: 'machine learning, deep learning',
      description: '测试英文逗号分隔的关键词'
    },
    {
      name: '中文关键词测试',
      query: '机器学习, 深度学习',
      description: '测试中文逗号分隔的关键词（应自动翻译）'
    },
    {
      name: '混合关键词测试',
      query: 'neural network, 神经网络',
      description: '测试中英文混合关键词'
    },
    {
      name: '单一关键词测试',
      query: 'classification',
      description: '测试单个关键词'
    },
    {
      name: '复杂查询测试',
      query: 'computer vision, image processing, CNN',
      description: '测试多个专业术语'
    }
  ];

  for (const testCase of testCases) {
    console.log(`📝 ${testCase.name}`);
    console.log(`🔍 查询: "${testCase.query}"`);
    console.log(`📄 说明: ${testCase.description}`);
    
    try {
      const response = await fetch('http://localhost:3004/api/scholar-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: testCase.query,
          num_results: 5,
          filter_venues: false
        })
      });

      if (!response.ok) {
        console.error(`❌ API错误: ${response.status} ${response.statusText}`);
        const errorText = await response.text();
        console.error('错误详情:', errorText);
        continue;
      }

      const result = await response.json();
      
      if (result.success) {
        console.log(`✅ 搜索成功`);
        console.log(`📊 结果统计:`);
        console.log(`   - 总结果数: ${result.total_results}`);
        console.log(`   - 缓存命中: ${result.cache_hits}`);
        console.log(`   - 外部命中: ${result.external_hits}`);
        
        if (result.results && result.results.length > 0) {
          console.log(`📚 找到的论文:`);
          result.results.slice(0, 3).forEach((paper, index) => {
            console.log(`   ${index + 1}. ${paper.title || 'No title'}`);
            console.log(`      来源: ${paper.from_cache ? '本地缓存' : '外部API'}`);
            if (paper.matched_keywords) {
              console.log(`      匹配关键词: ${paper.matched_keywords.join(', ')}`);
            }
            console.log(`      相关性: ${paper.relevance_score || 'N/A'}`);
          });
        } else {
          console.log(`⚠️ 未找到匹配的论文`);
        }
      } else {
        console.error(`❌ 搜索失败: ${result.error}`);
      }
      
    } catch (error) {
      console.error(`❌ 测试失败:`, error.message);
    }
    
    console.log(''); // 空行分隔
    
    // 添加延迟避免请求过快
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log('🎯 搜索功能测试完成！');
  
  // 额外测试：直接调用paper-cache/search API
  console.log('\n🔬 直接测试本地缓存搜索API...');
  
  try {
    const directResponse = await fetch('http://localhost:3004/api/paper-cache/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: 'machine learning, neural network',
        limit: 5,
        filter_venues: false
      })
    });

    if (directResponse.ok) {
      const directResult = await directResponse.json();
      console.log('✅ 直接缓存搜索结果:');
      console.log(`   - 成功: ${directResult.success}`);
      console.log(`   - 论文数量: ${directResult.papers?.length || 0}`);
      console.log(`   - 查询: ${directResult.query}`);
      
      if (directResult.papers && directResult.papers.length > 0) {
        console.log('📚 缓存中的论文:');
        directResult.papers.slice(0, 2).forEach((paper, index) => {
          console.log(`   ${index + 1}. ${paper.title}`);
          if (paper.matched_keywords) {
            console.log(`      匹配关键词: ${paper.matched_keywords.join(', ')}`);
          }
        });
      }
    } else {
      console.error('❌ 直接缓存搜索失败:', directResponse.status);
    }
    
  } catch (error) {
    console.error('❌ 直接缓存搜索错误:', error.message);
  }
};

// 运行测试
testLocalSearch(); 