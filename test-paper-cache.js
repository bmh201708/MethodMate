// 测试论文缓存功能
const baseUrl = 'http://localhost:3004';

async function testPaperCacheAPIs() {
  console.log('🧪 开始测试论文缓存API...\n');

  // 测试数据
  const testPaper = {
    title: "Test Paper: Advanced Research Methods in AI",
    authors: "John Doe, Jane Smith",
    abstract: "This paper presents advanced research methods for artificial intelligence applications.",
    doi: "10.1234/test.2023.01",
    url: "https://example.com/paper",
    download_url: "https://example.com/paper.pdf",
    year: 2023,
    journal: "AI Research Journal",
    venue: "AI Research Journal",
    citation_count: 42,
    research_method: "This study employs a mixed-methods approach combining quantitative analysis with qualitative interviews.",
    source: "recommendation",
    is_top_venue: true
  };

  try {
    // 1. 测试保存论文到缓存
    console.log('1️⃣ 测试保存论文到缓存...');
    const saveResponse = await fetch(`${baseUrl}/api/paper-cache/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testPaper)
    });

    const saveResult = await saveResponse.json();
    console.log('保存结果:', saveResult);
    
    if (!saveResult.success) {
      throw new Error('保存失败: ' + saveResult.error);
    }
    
    const paperId = saveResult.paper_id;
    console.log('✅ 论文保存成功，ID:', paperId);

    // 2. 测试检查论文是否已缓存
    console.log('\n2️⃣ 测试检查论文缓存状态...');
    const checkResponse = await fetch(`${baseUrl}/api/paper-cache/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: testPaper.title,
        doi: testPaper.doi
      })
    });

    const checkResult = await checkResponse.json();
    console.log('检查结果:', checkResult);
    
    if (!checkResult.cached) {
      throw new Error('论文应该已被缓存');
    }
    console.log('✅ 论文缓存状态检查成功');

    // 3. 测试从缓存搜索论文
    console.log('\n3️⃣ 测试从缓存搜索论文...');
    const searchResponse = await fetch(`${baseUrl}/api/paper-cache/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: "advanced research methods AI",
        limit: 5
      })
    });

    const searchResult = await searchResponse.json();
    console.log('搜索结果:', searchResult);
    
    if (!searchResult.success || searchResult.papers.length === 0) {
      throw new Error('搜索应该找到至少一篇论文');
    }
    console.log('✅ 缓存搜索成功，找到', searchResult.papers.length, '篇论文');

    // 4. 测试获取论文详情
    console.log('\n4️⃣ 测试获取论文详情...');
    const detailResponse = await fetch(`${baseUrl}/api/paper-cache/${paperId}`);
    const detailResult = await detailResponse.json();
    console.log('详情结果:', detailResult);
    
    if (!detailResult.success) {
      throw new Error('获取论文详情失败');
    }
    console.log('✅ 获取论文详情成功');

    // 5. 测试更新论文信息
    console.log('\n5️⃣ 测试更新论文信息...');
    const updatedPaper = {
      ...testPaper,
      research_method: "Updated research method with new insights and methodology improvements."
    };

    const updateResponse = await fetch(`${baseUrl}/api/paper-cache/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedPaper)
    });

    const updateResult = await updateResponse.json();
    console.log('更新结果:', updateResult);
    
    if (!updateResult.success || !updateResult.is_update) {
      throw new Error('更新论文应该成功并标记为更新');
    }
    console.log('✅ 论文更新成功');

    // 6. 测试缓存统计
    console.log('\n6️⃣ 测试获取缓存统计...');
    const statsResponse = await fetch(`${baseUrl}/api/paper-cache/stats`);
    const statsResult = await statsResponse.json();
    console.log('统计结果:', statsResult);
    
    if (!statsResult.success) {
      throw new Error('获取统计信息失败');
    }
    console.log('✅ 获取缓存统计成功');

    console.log('\n🎉 所有论文缓存API测试通过！');

  } catch (error) {
    console.error('\n❌ 测试失败:', error.message);
    console.error('错误详情:', error);
  }
}

// 运行测试
testPaperCacheAPIs(); 