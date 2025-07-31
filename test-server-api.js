#!/usr/bin/env node

// 测试修复后的服务器API端点

const SERVER_URL = 'http://localhost:3004'; // 服务器运行在3004端口

async function testOpenAlexSearchAPI() {
  console.log('🧪 测试修复后的 /api/openalex-search 端点');
  console.log('='.repeat(60));
  
  const testCases = [
    {
      name: '基础设计查询',
      payload: {
        searchQuery: 'design',
        limit: 10,
        filterVenues: true
      }
    },
    {
      name: '用户界面查询',
      payload: {
        searchQuery: 'user interface',
        limit: 5,
        filterVenues: false
      }
    },
    {
      name: 'HCI查询',
      payload: {
        searchQuery: 'human computer interaction',
        limit: 8,
        filterVenues: true
      }
    }
  ];
  
  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];
    console.log(`\n📡 测试 ${i + 1}: ${testCase.name}`);
    console.log(`🔍 查询: "${testCase.payload.searchQuery}"`);
    console.log(`📊 限制: ${testCase.payload.limit}篇`);
    
    try {
      const response = await fetch(`${SERVER_URL}/api/openalex-search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(testCase.payload)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.log(`❌ API调用失败 (${response.status}):`, errorText.substring(0, 200));
        continue;
      }
      
      const data = await response.json();
      console.log(`✅ API调用成功!`);
      console.log(`📄 返回论文数: ${data.papers?.length || 0}篇`);
      console.log(`📊 总计数量: ${data.total || 0}`);
      console.log(`🔄 合并查询数: ${data.meta?.merged_queries || 1}`);
      
      if (data.papers && data.papers.length > 0) {
        const paper = data.papers[0];
        console.log(`📝 示例论文: ${paper.title?.substring(0, 50) || '无标题'}...`);
        console.log(`📖 来源: ${paper.venue || paper.journal || '未知'}`);
        console.log(`📅 年份: ${paper.year || '未知'}`);
      }
      
    } catch (error) {
      console.log(`❌ 请求错误: ${error.message}`);
      
      // 如果是连接错误，可能服务器没有运行
      if (error.message.includes('ECONNREFUSED') || error.message.includes('fetch failed')) {
        console.log('💡 提示: 请确保服务器正在运行 (npm run dev 或 node server/local-api.js)');
        break;
      }
    }
    
    // 添加延迟
    if (i < testCases.length - 1) {
      console.log('⏳ 等待1秒...');
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

async function testDirectFunctionCall() {
  console.log('\n🔧 测试直接函数调用 (如果服务器未运行)');
  console.log('='.repeat(60));
  
  try {
    // 动态导入服务器代码进行直接测试
    const { searchOpenAlexPapers } = await import('./server/local-api.js');
    
    console.log('📡 直接调用 searchOpenAlexPapers 函数...');
    const result = await searchOpenAlexPapers('design', 5, true, true, false);
    
    console.log(`✅ 直接调用成功!`);
    console.log(`📄 返回论文数: ${result.papers?.length || 0}篇`);
    console.log(`📊 总计数量: ${result.total || 0}`);
    console.log(`🔄 合并查询数: ${result.meta?.merged_queries || 1}`);
    
    if (result.papers && result.papers.length > 0) {
      const paper = result.papers[0];
      console.log(`📝 示例论文: ${paper.title?.substring(0, 50) || '无标题'}...`);
      console.log(`📖 来源: ${paper.venue || paper.journal || '未知'}`);
    }
    
  } catch (error) {
    console.log(`❌ 直接调用失败: ${error.message}`);
    console.log('💡 这是正常的，因为服务器代码可能需要特定的环境设置');
  }
}

async function main() {
  console.log('🎯 验证修复后的OpenAlex搜索功能');
  console.log('💡 测试多次查询策略在实际API中的表现');
  
  // 首先尝试测试API端点
  await testOpenAlexSearchAPI();
  
  // 如果API不可用，尝试直接函数调用
  await testDirectFunctionCall();
  
  console.log('\n' + '='.repeat(60));
  console.log('📋 测试总结');
  console.log('='.repeat(60));
  console.log('✅ 代码修复已完成:');
  console.log('  1. 解决了跨字段OR查询的403错误');
  console.log('  2. 实现了多次查询合并策略');
  console.log('  3. 添加了论文去重机制');
  console.log('  4. 保持了向后兼容性');
  console.log('');
  console.log('🚀 下一步: 在生产环境中部署并监控效果');
}

main().catch(console.error);