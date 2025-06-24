// 测试论文保存功能的修复
const testPaperSave = async () => {
  try {
    console.log('🧪 测试论文保存功能的paper_id长度修复...\n');

    // 构造测试数据，包括一个超长的paper_id
    const testPaperData = {
      title: "Test Paper: Investigating the Long Paper ID Issue",
      authors: "Test Author 1, Test Author 2",
      abstract: "This is a test abstract to verify that the paper_id length issue has been fixed properly.",
      doi: "10.1000/test.2025.001",
      url: "https://example.com/test-paper",
      download_url: "https://example.com/test-paper.pdf",
      year: 2025,
      journal: "Test Journal",
      venue: "Test Conference",
      citation_count: 5,
      research_method: "Test research methodology content.",
      full_text: "This is a test full text content.",
      paper_id: "this_is_a_very_long_paper_id_that_used_to_cause_database_errors_because_it_was_longer_than_the_original_varchar_100_limit_but_should_now_work_with_varchar_255_limit_which_is_much_more_reasonable_for_storing_academic_paper_identifiers_from_various_sources_like_semantic_scholar_and_other_apis",
      source: "recommendation",
      is_top_venue: false,
      metadata: {
        test: true,
        timestamp: new Date().toISOString()
      }
    };

    console.log('📊 测试数据:');
    console.log(`- 标题: ${testPaperData.title}`);
    console.log(`- Paper ID 长度: ${testPaperData.paper_id.length} 字符`);
    console.log(`- Paper ID: ${testPaperData.paper_id.substring(0, 100)}...`);
    console.log('');

    // 发送API请求
    const response = await fetch('http://localhost:3004/api/paper-cache/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPaperData)
    });

    console.log(`📡 API响应状态: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorResult = await response.json().catch(() => ({}));
      throw new Error(`API错误: ${response.status} - ${errorResult.error || '未知错误'}`);
    }

    const result = await response.json();
    console.log('✅ API响应成功:');
    console.log(JSON.stringify(result, null, 2));

    if (result.success) {
      console.log('\n🎉 测试成功！论文保存功能已修复');
      console.log(`- 操作类型: ${result.is_update ? '更新' : '新增'}`);
      console.log(`- 论文ID: ${result.paper_id}`);
      
      // 验证保存的数据
      console.log('\n🔍 验证保存的数据...');
      const verifyResponse = await fetch(`http://localhost:3004/api/paper-cache/${result.paper_id}`);
      
      if (verifyResponse.ok) {
        const savedPaper = await verifyResponse.json();
        console.log('✅ 数据验证成功:');
        console.log(`- 保存的标题: ${savedPaper.paper.title}`);
        console.log(`- 保存的Paper ID长度: ${savedPaper.paper.paper_id ? savedPaper.paper.paper_id.length : 0} 字符`);
        console.log(`- 保存的Paper ID: ${savedPaper.paper.paper_id ? savedPaper.paper.paper_id.substring(0, 100) + '...' : 'null'}`);
      } else {
        console.warn('⚠️ 验证数据时出错，但保存操作成功');
      }
      
    } else {
      console.error('❌ 测试失败:', result.error);
    }

  } catch (error) {
    console.error('❌ 测试过程中发生错误:', error.message);
    console.error('详细错误:', error);
  }
};

// 运行测试
testPaperSave(); 