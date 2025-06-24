// 测试本地缓存优先功能
const baseUrl = 'http://localhost:3004';

async function testLocalCachePriority() {
  console.log('🧪 开始测试本地缓存优先功能...\n');

  try {
    // 步骤1：清空现有缓存（可选）
    console.log('📝 步骤1：准备测试数据');
    
    // 步骤2：向缓存中添加一些测试论文
    console.log('📚 步骤2：向本地缓存添加测试论文...');
    
    const testPapers = [
      {
        title: "Advanced Research Methods in Machine Learning",
        authors: "Zhang Wei, Li Ming, Wang Lei",
        abstract: "This paper presents advanced research methods for machine learning applications, including data collection, feature engineering, model selection, and evaluation techniques.",
        doi: "10.1000/test.ml.2023.001",
        url: "https://example.com/ml-paper1",
        download_url: "https://example.com/ml-paper1.pdf",
        year: 2023,
        journal: "Journal of Machine Learning Research",
        venue: "Journal of Machine Learning Research",
        citation_count: 156,
        research_method: "This study employs a comprehensive approach combining supervised learning with unsupervised feature extraction.",
        source: "manual",
        is_top_venue: true
      },
      {
        title: "Quantitative Analysis Methods for Data Science Research",
        authors: "Chen Xiaoli, Liu Hua, Zhou Jian",
        abstract: "A comprehensive guide to quantitative analysis methods in data science research, covering statistical techniques, experimental design, and data interpretation.",
        doi: "10.1000/test.ds.2023.002",
        url: "https://example.com/ds-paper1",
        download_url: "https://example.com/ds-paper1.pdf",
        year: 2023,
        journal: "Data Science Review",
        venue: "Data Science Review",
        citation_count: 89,
        research_method: "Mixed-methods approach combining quantitative statistical analysis with qualitative case studies.",
        source: "manual",
        is_top_venue: false
      },
      {
        title: "Experimental Design Principles for AI Research",
        authors: "Wang Mei, Liu Gang, Zhang Hong",
        abstract: "This paper outlines fundamental experimental design principles specifically tailored for artificial intelligence research methodologies.",
        doi: "10.1000/test.ai.2023.003",
        url: "https://example.com/ai-paper1",
        download_url: "https://example.com/ai-paper1.pdf",
        year: 2023,
        journal: "AI Research Quarterly",
        venue: "AI Research Quarterly",
        citation_count: 234,
        research_method: "Systematic experimental design using randomized controlled trials and cross-validation techniques.",
        source: "manual",
        is_top_venue: true
      }
    ];

    // 保存测试论文到缓存
    for (let i = 0; i < testPapers.length; i++) {
      const paper = testPapers[i];
      console.log(`  💾 保存论文 ${i + 1}: "${paper.title}"`);
      
      const saveResponse = await fetch(`${baseUrl}/api/paper-cache/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paper)
      });

      const saveResult = await saveResponse.json();
      if (!saveResult.success) {
        console.error(`  ❌ 保存论文 ${i + 1} 失败:`, saveResult.error);
      } else {
        console.log(`  ✅ 论文 ${i + 1} 保存成功`);
      }
      
      // 避免请求过快
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('\n📊 步骤3：测试缓存搜索功能...');
    
    // 步骤3：直接测试缓存搜索
    const cacheSearchResponse = await fetch(`${baseUrl}/api/paper-cache/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: "research methods",
        limit: 5
      })
    });

    const cacheSearchResult = await cacheSearchResponse.json();
    console.log('缓存搜索结果:', {
      success: cacheSearchResult.success,
      papers_count: cacheSearchResult.papers?.length || 0,
      from_cache: cacheSearchResult.from_cache
    });

    if (cacheSearchResult.papers && cacheSearchResult.papers.length > 0) {
      console.log('找到的缓存论文:');
      cacheSearchResult.papers.forEach((paper, index) => {
        console.log(`  ${index + 1}. ${paper.title} (引用数: ${paper.citation_count})`);
      });
    }

    console.log('\n🔍 步骤4：测试Scholar Search API的本地缓存优先功能...');
    
    // 步骤4：测试Scholar Search API（应该优先返回本地缓存）
    const scholarSearchResponse = await fetch(`${baseUrl}/api/scholar-search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: "research methods",
        num_results: 5,
        lang: "zh-CN",
        filter_venues: false
      })
    });

    const scholarSearchResult = await scholarSearchResponse.json();
    console.log('Scholar Search结果:', {
      success: scholarSearchResult.success,
      total_results: scholarSearchResult.total_results,
      cache_hits: scholarSearchResult.cache_hits,
      external_hits: scholarSearchResult.external_hits
    });

    if (scholarSearchResult.results && scholarSearchResult.results.length > 0) {
      console.log('返回的论文结果:');
      scholarSearchResult.results.forEach((paper, index) => {
        console.log(`  ${index + 1}. ${paper.title}`);
        console.log(`      来源: ${paper.from_cache ? '📚本地缓存' : '🌐外部API'}`);
        if (paper.citations || paper.citationCount) {
          console.log(`      引用数: ${paper.citations || paper.citationCount}`);
        }
        console.log('');
      });
    }

    // 验证结果
    console.log('🎯 验证结果:');
    
    if (scholarSearchResult.cache_hits > 0) {
      console.log(`✅ 成功！从本地缓存找到 ${scholarSearchResult.cache_hits} 篇论文`);
    } else {
      console.log('⚠️  警告：没有从本地缓存找到论文');
    }
    
    if (scholarSearchResult.external_hits > 0) {
      console.log(`📡 从外部API补充了 ${scholarSearchResult.external_hits} 篇论文`);
    } else {
      console.log('📚 完全使用本地缓存，无需外部API调用');
    }

    // 步骤5：测试语义推荐API
    console.log('\n🤖 步骤5：测试语义推荐API的本地缓存优先功能...');
    
    const semanticRecommendResponse = await fetch(`${baseUrl}/api/semantic-recommend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        keywords: "experimental design methods",
        filter_venues: false,
        session_id: Date.now().toString()
      })
    });

    const semanticResult = await semanticRecommendResponse.json();
    console.log('语义推荐结果:', {
      success: semanticResult.success,
      papers_count: semanticResult.papers?.length || 0
    });

    if (semanticResult.papers && semanticResult.papers.length > 0) {
      console.log('推荐的论文:');
      semanticResult.papers.forEach((paper, index) => {
        console.log(`  ${index + 1}. ${paper.title}`);
        if (paper.from_cache) {
          console.log(`      🎯 来自本地缓存！`);
        }
      });
    }

    console.log('\n🎉 测试完成！');
    console.log('\n📋 测试总结:');
    console.log(`• 缓存搜索找到论文数: ${cacheSearchResult.papers?.length || 0}`);
    console.log(`• Scholar Search缓存命中: ${scholarSearchResult.cache_hits || 0}`);
    console.log(`• Scholar Search外部调用: ${scholarSearchResult.external_hits || 0}`);
    
    const priorityWorking = (scholarSearchResult.cache_hits || 0) > 0;
    console.log(`• 本地缓存优先功能: ${priorityWorking ? '✅ 正常工作' : '❌ 需要检查'}`);

  } catch (error) {
    console.error('\n❌ 测试过程中发生错误:', error.message);
    console.error('详细错误信息:', error);
  }
}

// 运行测试
testLocalCachePriority(); 