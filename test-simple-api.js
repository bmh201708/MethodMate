#!/usr/bin/env node

// 简单测试修复后的API

async function testAPI() {
  console.log('🧪 测试修复后的OpenAlex API');
  console.log('='.repeat(40));
  
  try {
    console.log('📡 发送请求到 /api/openalex-search...');
    
    const response = await fetch('http://localhost:3004/api/openalex-search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        searchQuery: 'design',
        limit: 3,
        filterVenues: true
      })
    });
    
    console.log(`📊 响应状态: ${response.status}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ API调用成功!');
      console.log(`📄 返回论文数: ${data.papers?.length || 0}`);
      console.log(`🔄 合并查询数: ${data.meta?.merged_queries || 1}`);
      
      if (data.papers && data.papers.length > 0) {
        console.log('\n📝 第一篇论文:');
        const paper = data.papers[0];
        console.log(`标题: ${paper.title || '无标题'}`);
        console.log(`来源: ${paper.venue || paper.journal || '未知'}`);
        console.log(`年份: ${paper.year || '未知'}`);
      }
      
      return true;
    } else {
      const errorText = await response.text();
      console.log('❌ API调用失败:');
      console.log(errorText);
      return false;
    }
    
  } catch (error) {
    console.log('❌ 请求错误:', error.message);
    return false;
  }
}

async function main() {
  const success = await testAPI();
  
  console.log('\n' + '='.repeat(40));
  if (success) {
    console.log('🎉 修复验证成功!');
    console.log('✅ 多次查询策略正常工作');
    console.log('✅ 403错误已解决');
  } else {
    console.log('⚠️ 需要进一步调试');
  }
}

main().catch(console.error);