// 使用 node-fetch 如果需要的话，或者使用内置 fetch (Node 18+)
const fetchFunction = globalThis.fetch || require('node-fetch');

// 测试远程服务器的API
async function testRemoteAPI() {
  console.log('测试远程服务器API...');
  
  // 测试1: 健康检查
  console.log('\n1. 测试健康检查端点...');
  try {
    const healthResponse = await fetchFunction('https://ftrmjlrpxxgi.sealoshzh.site/api/health');
    console.log('健康检查状态:', healthResponse.status);
    const healthText = await healthResponse.text();
    console.log('健康检查响应:', healthText);
  } catch (error) {
    console.error('健康检查失败:', error.message);
  }
  
  // 测试2: semantic-recommend端点
  console.log('\n2. 测试semantic-recommend端点...');
  try {
    const response = await fetchFunction('https://ftrmjlrpxxgi.sealoshzh.site/api/semantic-recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatHistory: [{
          type: 'user',
          content: '推荐一些机器学习相关的文献'
        }],
        filter_venues: false,
        session_id: 'test-123'
      })
    });
    
    console.log('semantic-recommend状态:', response.status);
    console.log('响应头:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('错误响应:', errorText);
    } else {
      const result = await response.json();
      console.log('成功响应:', result);
    }
  } catch (error) {
    console.error('semantic-recommend测试失败:', error.message);
  }
  
  // 测试3: 基础连接
  console.log('\n3. 测试基础连接...');
  try {
    const baseResponse = await fetchFunction('https://ftrmjlrpxxgi.sealoshzh.site/');
    console.log('基础连接状态:', baseResponse.status);
    const baseText = await baseResponse.text();
    console.log('基础连接响应长度:', baseText.length);
  } catch (error) {
    console.error('基础连接失败:', error.message);
  }
}

testRemoteAPI().catch(console.error); 