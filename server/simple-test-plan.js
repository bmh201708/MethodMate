import fetch from 'node-fetch';

const API_BASE = 'http://localhost:3004';

async function simpleTest() {
  try {
    console.log('简单测试开始...\n');

    // 登录获取token
    const loginResponse = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'testuser2',
        password: '123456'
      })
    });

    const loginResult = await loginResponse.json();
    const token = loginResult.token;
    console.log('✅ 登录成功');

    // 创建最简单的研究方案
    console.log('测试创建最简单的研究方案...');
    const minimalPlan = {
      title: '最简测试方案'
    };

    const createResponse = await fetch(`${API_BASE}/api/research-plans`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(minimalPlan)
    });

    console.log('响应状态:', createResponse.status);
    console.log('响应状态文本:', createResponse.statusText);
    
    const responseText = await createResponse.text();
    console.log('响应内容:', responseText);
    console.log('响应内容长度:', responseText.length);

    if (createResponse.ok) {
      console.log('✅ 创建成功！');
    } else {
      console.log('❌ 创建失败');
    }

  } catch (error) {
    console.error('测试出错:', error.message);
  }
}

simpleTest(); 