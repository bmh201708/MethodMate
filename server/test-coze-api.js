import fetch from 'node-fetch';

// Coze API 配置
const COZE_API_KEY = 'pat_Q06cU8OsiWefqJHG2ed8GlV1al9WRGRVNAfkNmpG567hDXVbcHeyLHWtMLciNj37';
const COZE_API_URL = 'https://api.coze.com';
const COZE_BOT_ID = '7513529977745915905';
const COZE_USER_ID = '7505301221562023954';

async function testCozeAPI() {
  try {
    console.log('开始测试Coze API...');
    console.log('API URL:', `${COZE_API_URL}/open_api/v2/chat`);
    console.log('API Key:', COZE_API_KEY.substring(0, 10) + '...');
    console.log('Bot ID:', COZE_BOT_ID);
    console.log('User ID:', COZE_USER_ID);

    const response = await fetch(`${COZE_API_URL}/open_api/v2/chat`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${COZE_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        bot_id: COZE_BOT_ID,
        user: COZE_USER_ID,
        query: 'Hello, please respond with "API test successful"',
        stream: false,
        conversation_id: `test_${Date.now()}`
      })
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Success response:', JSON.stringify(result, null, 2));

    // 检查API错误响应
    if (result.code && result.code !== 0) {
      console.error('API error:', result.msg, 'code:', result.code);
      return false;
    }

    console.log('✅ Coze API测试成功！');
    return true;

  } catch (error) {
    console.error('❌ Coze API测试失败:', error.message);
    return false;
  }
}

// 运行测试
testCozeAPI().then(success => {
  if (success) {
    console.log('API密钥有效');
  } else {
    console.log('API密钥无效或配置错误');
  }
  process.exit(success ? 0 : 1);
});