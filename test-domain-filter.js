import fetch from 'node-fetch';

// 更精确的领域识别函数
function isTargetDomain(topics) {
  if (!topics || !Array.isArray(topics)) return false;
  
  return topics.some(topic => {
    const topicName = topic.display_name?.toLowerCase() || '';
    
    // 计算机科学和技术相关
    const csKeywords = [
      'computer', 'computing', 'software', 'algorithm', 'programming',
      'machine learning', 'artificial intelligence', 'data science',
      'optimization', 'neural network', 'deep learning'
    ];
    
    // 设计和用户体验相关
    const designKeywords = [
      'design', 'user experience', 'interface', 'usability', 'user-centered',
      'visual design', 'graphic design', 'product design', 'interaction design'
    ];
    
    // 人机交互相关
    const hciKeywords = [
      'human', 'interaction', 'haptic', 'virtual reality', 'augmented reality',
      'teleoperation', 'human-computer', 'user interface', 'accessibility',
      'ergonomics', 'cognitive', 'sensory', 'tactile'
    ];
    
    const allKeywords = [...csKeywords, ...designKeywords, ...hciKeywords];
    
    return allKeywords.some(keyword => topicName.includes(keyword));
  });
}

// 测试函数
async function testDomainFiltering() {
  console.log('🎯 测试改进的领域过滤逻辑\n');
  
  const baseUrl = 'http://localhost:3004/api/semantic-recommend';
  const testQueries = [
    'machine learning',
    'user interface design', 
    'human computer interaction',
    'design thinking',
    'virtual reality',
    'data visualization'
  ];
  
  let totalPapers = 0;
  let targetDomainPapers = 0;
  
  for (const query of testQueries) {
    try {
      console.log(`🔍 测试查询: "${query}"`);
      
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keywords: query,
          use_local_cache: false,
          filter_venues: false,
          limit: 5
        })
      });
      
      const data = await response.json();
      
      if (data.success && data.papers) {
        const papersCount = data.papers.length;
        const targetCount = data.papers.filter(paper => isTargetDomain(paper.topics)).length;
        
        totalPapers += papersCount;
        targetDomainPapers += targetCount;
        
        console.log(`   📊 获得论文: ${papersCount}篇, 目标领域: ${targetCount}篇`);
        
        // 显示前2篇论文的主题分析
        data.papers.slice(0, 2).forEach((paper, index) => {
          const isTarget = isTargetDomain(paper.topics);
          const topics = paper.topics?.slice(0, 2).map(t => t.display_name).join(', ') || '无主题';
          console.log(`   ${index + 1}. ${isTarget ? '✅' : '❌'} ${paper.title?.substring(0, 50)}...`);
          console.log(`      主题: ${topics}`);
        });
        
      } else {
        console.log(`   ❌ 查询失败: ${data.error || '未知错误'}`);
      }
      
      console.log('');
      
    } catch (error) {
      console.log(`   ❌ 网络错误: ${error.message}\n`);
    }
  }
  
  const accuracy = totalPapers > 0 ? (targetDomainPapers / totalPapers * 100).toFixed(1) : 0;
  
  console.log('📊 改进后的过滤效果:');
  console.log(`   总论文数: ${totalPapers}`);
  console.log(`   目标领域论文: ${targetDomainPapers}`);
  console.log(`   准确率: ${accuracy}%`);
  
  if (accuracy >= 60) {
    console.log('   ✅ 领域过滤效果良好');
  } else {
    console.log('   ⚠️ 领域过滤效果需要进一步优化');
  }
}

testDomainFiltering().catch(console.error); 