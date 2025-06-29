// 诊断 semantic-recommend 接口问题
import fetch from 'node-fetch';

const SERVER_URL = 'http://1.13.253.97:3004';

async function testSemanticRecommend() {
  console.log('🔍 开始诊断 semantic-recommend 接口...\n');
  
  // 测试1: 健康检查
  console.log('1. 测试服务器健康状态...');
  try {
    const healthResponse = await fetch(`${SERVER_URL}/api/health`);
    const healthData = await healthResponse.json();
    console.log('✅ 健康检查正常:', healthData.message);
  } catch (error) {
    console.log('❌ 健康检查失败:', error.message);
    return;
  }
  
  // 测试2: OPTIONS预检请求
  console.log('\n2. 测试CORS预检请求...');
  try {
    const optionsResponse = await fetch(`${SERVER_URL}/api/semantic-recommend`, {
      method: 'OPTIONS',
      headers: {
        'Origin': 'http://1.13.253.97:3004',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type'
      }
    });
    console.log('✅ CORS预检状态码:', optionsResponse.status);
    console.log('Allow Methods:', optionsResponse.headers.get('Access-Control-Allow-Methods'));
  } catch (error) {
    console.log('❌ CORS预检失败:', error.message);
  }
  
  // 测试3: 简单POST请求
  console.log('\n3. 测试POST请求...');
  try {
    const postResponse = await fetch(`${SERVER_URL}/api/semantic-recommend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://1.13.253.97:3004'
      },
      body: JSON.stringify({
        chatHistory: [],
        keywords: 'design',
        session_id: 'debug_test_' + Date.now()
      })
    });
    
    console.log('POST请求状态码:', postResponse.status);
    console.log('响应头:', Object.fromEntries(postResponse.headers.entries()));
    
    if (postResponse.ok) {
      const data = await postResponse.json();
      console.log('✅ POST请求成功，返回论文数量:', data.papers?.length || 0);
    } else {
      const errorText = await postResponse.text();
      console.log('❌ POST请求失败，响应内容:', errorText);
    }
  } catch (error) {
    console.log('❌ POST请求异常:', error.message);
  }
  
  console.log('\n🔍 诊断完成');
}

// 运行诊断
testSemanticRecommend().catch(console.error); 