// 简单的缓存功能测试
const fetch = require('node-fetch');
const baseUrl = 'http://localhost:3004';

async function testBasicCache() {
  console.log('🧪 开始基本缓存功能测试...\n');

  try {
    // 测试1：尝试保存最简单的论文
    console.log('📝 测试1：保存最简单的论文数据...');
    
    const simplePaper = {
      title: "Test Paper for Cache",
      authors: "Test Author",
      abstract: "This is a test paper about research methods.",
      source: "manual"
    };

    console.log('发送数据:', JSON.stringify(simplePaper, null, 2));

    const saveResponse = await fetch(`${baseUrl}/api/paper-cache/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(simplePaper)
    });

    console.log('保存响应状态:', saveResponse.status);
    const saveResult = await saveResponse.text(); // 先获取原始响应
    console.log('保存响应内容:', saveResult);

    let parsedResult;
    try {
      parsedResult = JSON.parse(saveResult);
    } catch (parseError) {
      console.error('无法解析响应JSON:', parseError);
      return;
    }

    if (parsedResult.success) {
      console.log('✅ 论文保存成功！');
      
      // 测试2：搜索刚保存的论文
      console.log('\n📊 测试2：搜索刚保存的论文...');
      
      const searchResponse = await fetch(`${baseUrl}/api/paper-cache/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: "test research",
          limit: 5
        })
      });

      console.log('搜索响应状态:', searchResponse.status);
      const searchResult = await searchResponse.text();
      console.log('搜索响应内容:', searchResult);

      let parsedSearchResult;
      try {
        parsedSearchResult = JSON.parse(searchResult);
      } catch (parseError) {
        console.error('无法解析搜索响应JSON:', parseError);
        return;
      }

      if (parsedSearchResult.success && parsedSearchResult.papers.length > 0) {
        console.log('✅ 缓存搜索成功！');
        console.log('找到的论文:');
        parsedSearchResult.papers.forEach((paper, index) => {
          console.log(`  ${index + 1}. ${paper.title}`);
        });

        // 测试3：测试Scholar Search本地优先
        console.log('\n🔍 测试3：测试Scholar Search本地优先...');
        
        const scholarResponse = await fetch(`${baseUrl}/api/scholar-search`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: "test research",
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
          console.log('找到的论文:');
          scholarResult.results.forEach((paper, index) => {
            console.log(`  ${index + 1}. ${paper.title} (来源: ${paper.from_cache ? '缓存' : '外部'})`);
          });
        } else {
          console.log('⚠️ 本地缓存优先需要调整 - 没有缓存命中');
        }

      } else {
        console.log('❌ 缓存搜索失败或无结果');
        console.log('搜索结果:', parsedSearchResult);
      }

    } else {
      console.log('❌ 论文保存失败:', parsedResult.error);
    }

  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    console.error('详细错误:', error);
  }
}

// 运行测试
testBasicCache(); 