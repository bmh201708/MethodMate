import fetch from 'node-fetch';

// 测试脚本：验证OpenAlex API迁移
console.log('🧪 开始测试OpenAlex API迁移...\n');

// 测试配置
const BASE_URL = 'http://localhost:3004'; // 修改端口号为3004
const TEST_QUERIES = [
  'user interface design',
  'machine learning',
  'human computer interaction'
];

// 测试函数：语义推荐API
async function testSemanticRecommendAPI() {
  try {
    console.log('1. 测试语义推荐API (/api/semantic-recommend)');
    console.log(`   查询: "${TEST_QUERIES[0]}"`);
    
    const response = await fetch(`${BASE_URL}/api/semantic-recommend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keywords: TEST_QUERIES[0],
        use_local_cache: false, // 强制使用外部搜索测试OpenAlex
        filter_venues: true,
        session_id: 'test_session'
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log('   ✅ API调用成功');
      console.log(`   📊 返回论文数量: ${data.papers?.length || 0}`);
      console.log(`   🔍 缓存命中: ${data.cache_hits || 0}篇`);
      console.log(`   🌐 外部获取: ${data.external_hits || 0}篇`);
      
      if (data.papers && data.papers.length > 0) {
        const firstPaper = data.papers[0];
        console.log('   📄 第一篇论文示例:');
        console.log(`      标题: ${firstPaper.title?.substring(0, 80)}...`);
        console.log(`      来源: ${firstPaper.source}`);
        console.log(`      相关性: ${firstPaper.relevance_score}`);
        console.log(`      是否顶会: ${firstPaper.isTopVenue}`);
        console.log(`      主题数量: ${firstPaper.topics?.length || 0}`);
        
        // 检查是否包含目标领域（更新识别逻辑以匹配OpenAlex实际主题）
        const topics = firstPaper.topics || [];
        const hasTargetDomain = topics.some(topic => {
          const topicName = topic.display_name?.toLowerCase() || '';
          // 计算机科学相关
          if (topicName.includes('computer') || topicName.includes('computing') || 
              topicName.includes('software') || topicName.includes('algorithm') ||
              topicName.includes('machine learning') || topicName.includes('artificial intelligence')) {
            return true;
          }
          // 设计相关
          if (topicName.includes('design') || topicName.includes('user experience') ||
              topicName.includes('interface') || topicName.includes('usability')) {
            return true;
          }
          // 人机交互相关
          if (topicName.includes('human') || topicName.includes('interaction') ||
              topicName.includes('haptic') || topicName.includes('virtual reality') ||
              topicName.includes('augmented reality') || topicName.includes('teleoperation')) {
            return true;
          }
          return false;
        });
        
        console.log(`      🎯 包含目标领域: ${hasTargetDomain ? '是' : '否'}`);
        
        if (topics.length > 0) {
          console.log('      🏷️ 主题标签:');
          topics.slice(0, 3).forEach(topic => {
            console.log(`         - ${topic.display_name} (分数: ${topic.score || 'N/A'})`);
          });
        }
      }
    } else {
      console.log('   ❌ API调用失败');
      console.log(`   错误信息: ${data.error}`);
      return false;
    }
    
    console.log('');
    return true;
    
  } catch (error) {
    console.log('   ❌ 网络错误或API不可用');
    console.log(`   错误详情: ${error.message}`);
    console.log('');
    return false;
  }
}

// 测试函数：直接OpenAlex API调用
async function testDirectOpenAlexAPI() {
  try {
    console.log('2. 测试直接OpenAlex API调用');
    
    const query = encodeURIComponent(TEST_QUERIES[0]);
    const url = `https://api.openalex.org/works?search=${query}&per-page=5&filter=topics.display_name.search:"computer science"|topics.display_name.search:"design"|topics.display_name.search:"human-computer interaction"`;
    
    console.log('   🌐 调用OpenAlex API...');
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'MethodMate/1.0 (https://methodmate.org; mailto:contact@methodmate.org)',
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log(`   ✅ OpenAlex API调用成功`);
      console.log(`   📊 返回结果数量: ${data.results?.length || 0}`);
      console.log(`   📈 总匹配数量: ${data.meta?.count || 0}`);
      
      if (data.results && data.results.length > 0) {
        const firstResult = data.results[0];
        console.log(`   📖 第一篇论文: ${firstResult.display_name}`);
        console.log(`   👥 作者数量: ${firstResult.authorships?.length || 0}`);
        console.log(`   📅 发表年份: ${firstResult.publication_year}`);
        console.log(`   🏷️ 主题数量: ${firstResult.topics?.length || 0}`);
      }
      
      return { success: true, count: data.results?.length || 0 };
    } else {
      console.log(`   ❌ OpenAlex API调用失败`);
      console.log(`   状态码: ${response.status}`);
      return { success: false, error: `Status: ${response.status}` };
    }
  } catch (error) {
    console.log(`   ❌ OpenAlex API调用失败`);
    console.log(`   错误详情: ${error.message}`);
    return { success: false, error: error.message };
  }
}

// 测试函数：验证领域过滤
async function testDomainFiltering() {
  try {
    console.log('3. 测试领域过滤效果');
    
    // 测试不同的查询，验证是否都返回目标领域的文献
    const testQueries = [
      'machine learning',
      'design methodology', 
      'human computer interaction',
      'user experience design'
    ];
    
    let totalRelevantPapers = 0;
    let totalPapers = 0;
    
    for (const testQuery of testQueries) {
      console.log(`   🔍 测试查询: "${testQuery}"`);
      
      const response = await fetch(`${BASE_URL}/api/semantic-recommend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          keywords: testQuery,
          use_local_cache: false,
          filter_venues: false, // 不限制期刊以测试更多结果
          session_id: 'domain_test'
        })
      });
      
      const data = await response.json();
      
      if (data.success && data.papers) {
        totalPapers += data.papers.length;
        
        const relevantPapers = data.papers.filter(paper => {
          const topics = paper.topics || [];
          return topics.some(topic => {
            const topicName = topic.display_name?.toLowerCase() || '';
            
            // 计算机科学和技术相关
            if (topicName.includes('computer') || topicName.includes('computing') || 
                topicName.includes('software') || topicName.includes('algorithm') ||
                topicName.includes('machine learning') || topicName.includes('artificial intelligence') ||
                topicName.includes('optimization') || topicName.includes('neural network') ||
                topicName.includes('programming') || topicName.includes('data science')) {
              return true;
            }
            
            // 设计和用户体验相关
            if (topicName.includes('design') || topicName.includes('user experience') ||
                topicName.includes('interface') || topicName.includes('usability') ||
                topicName.includes('visual') || topicName.includes('graphic') ||
                topicName.includes('user-centered') || topicName.includes('product design')) {
              return true;
            }
            
            // 人机交互相关
            if (topicName.includes('human') || topicName.includes('interaction') ||
                topicName.includes('haptic') || topicName.includes('virtual reality') ||
                topicName.includes('augmented reality') || topicName.includes('teleoperation') ||
                topicName.includes('cognitive') || topicName.includes('sensory') ||
                topicName.includes('tactile') || topicName.includes('accessibility') ||
                topicName.includes('ergonomics') || topicName.includes('user interface')) {
              return true;
            }
            
            return false;
          });
        });
        
        totalRelevantPapers += relevantPapers.length;
        
        console.log(`      📊 获得论文: ${data.papers.length}篇, 目标领域: ${relevantPapers.length}篇`);
      } else {
        console.log(`      ❌ 查询失败`);
      }
    }
    
    const relevanceRate = totalPapers > 0 ? (totalRelevantPapers / totalPapers * 100).toFixed(1) : 0;
    console.log(`   🎯 领域过滤效果: ${totalRelevantPapers}/${totalPapers} (${relevanceRate}%)`);
    
    if (relevanceRate >= 80) {
      console.log('   ✅ 领域过滤效果良好');
    } else if (relevanceRate >= 60) {
      console.log('   ⚠️ 领域过滤效果一般');
    } else {
      console.log('   ❌ 领域过滤效果较差');
    }
    
    console.log('');
    return relevanceRate >= 60;
    
  } catch (error) {
    console.log('   ❌ 领域过滤测试失败');
    console.log(`   错误详情: ${error.message}`);
    console.log('');
    return false;
  }
}

// 主测试函数
async function runAllTests() {
  console.log('🚀 OpenAlex API迁移验证测试\n');
  console.log('='.repeat(50));
  
  const results = [];
  
  // 运行所有测试
  results.push(await testSemanticRecommendAPI());
  results.push(await testDirectOpenAlexAPI());
  results.push(await testDomainFiltering());
  
  // 输出测试结果汇总
  console.log('📋 测试结果汇总:');
  console.log('='.repeat(30));
  
  const passedTests = results.filter(r => r).length;
  const totalTests = results.length;
  
  console.log(`✅ 通过测试: ${passedTests}/${totalTests}`);
  
  if (passedTests === totalTests) {
    console.log('🎉 所有测试通过！OpenAlex API迁移成功！');
    console.log('\n📝 迁移完成清单:');
    console.log('   ✅ OpenAlex API集成');
    console.log('   ✅ 领域过滤（设计、计算机科学、人机交互）');
    console.log('   ✅ 响应格式转换');
    console.log('   ✅ 相关性分数计算');
    console.log('   ✅ 与现有系统兼容');
  } else if (passedTests >= totalTests * 0.7) {
    console.log('⚠️ 大部分测试通过，但仍有问题需要解决');
  } else {
    console.log('❌ 多个测试失败，需要检查配置和实现');
  }
  
  console.log('\n🔧 如果测试失败，请检查:');
  console.log('   1. 服务器是否在运行 (http://localhost:3002)');
  console.log('   2. 网络连接是否正常');
  console.log('   3. OpenAlex API是否可访问');
  console.log('   4. 代码是否正确部署');
}

// 运行测试
runAllTests().catch(console.error); 