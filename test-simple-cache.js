// 简化版本的缓存测试
const baseUrl = 'http://localhost:3004';

async function testSimpleCache() {
  console.log('🧪 开始简化缓存测试...\n');

  try {
    // 测试1：简单的论文数据
    console.log('📝 测试1：保存简单的论文数据...');
    
    const simplePaper = {
      title: "Test Research Methods Paper",
      authors: "Test Author",
      abstract: "This is a test paper about research methods.",
      year: 2023,
      journal: "Test Journal",
      source: "manual"  // 明确指定为manual
    };

    console.log('发送的数据:', JSON.stringify(simplePaper, null, 2));

    const saveResponse = await fetch(`${baseUrl}/api/paper-cache/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(simplePaper)
    });

    console.log('响应状态:', saveResponse.status, saveResponse.statusText);
    
    const saveResult = await saveResponse.json();
    console.log('保存结果:', saveResult);

    if (saveResult.success) {
      console.log('✅ 论文保存成功！');
      
      // 测试2：搜索刚保存的论文
      console.log('\n📊 测试2：搜索刚保存的论文...');
      
      const searchResponse = await fetch(`${baseUrl}/api/paper-cache/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: "research methods",
          limit: 5
        })
      });

      const searchResult = await searchResponse.json();
      console.log('搜索结果:', searchResult);

      if (searchResult.success && searchResult.papers.length > 0) {
        console.log('✅ 缓存搜索成功！');
        console.log('找到的论文:');
        searchResult.papers.forEach((paper, index) => {
          console.log(`  ${index + 1}. ${paper.title}`);
        });

        // 测试3：测试Scholar Search的本地优先
        console.log('\n🔍 测试3：测试Scholar Search本地优先...');
        
        const scholarResponse = await fetch(`${baseUrl}/api/scholar-search`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: "research methods",
            num_results: 3,
            lang: "zh-CN"
          })
        });

        const scholarResult = await scholarResponse.json();
        console.log('Scholar Search结果:');
        console.log('- 总结果数:', scholarResult.total_results);
        console.log('- 缓存命中:', scholarResult.cache_hits);
        console.log('- 外部调用:', scholarResult.external_hits);

        if (scholarResult.cache_hits > 0) {
          console.log('🎉 本地缓存优先功能正常工作！');
        } else {
          console.log('⚠️ 本地缓存优先可能需要调整');
        }

      } else {
        console.log('❌ 缓存搜索失败');
      }

    } else {
      console.log('❌ 论文保存失败:', saveResult.error);
    }

    // 测试4：获取缓存统计
    console.log('\n📈 测试4：获取缓存统计...');
    
    const statsResponse = await fetch(`${baseUrl}/api/paper-cache/stats`);
    const statsResult = await statsResponse.json();
    console.log('缓存统计:', statsResult);

  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    console.error('详细错误:', error);
  }
}

// 运行测试
testSimpleCache(); 