import fetch from 'node-fetch';

const API_BASE = 'http://localhost:3004';

async function testResearchPlans() {
  try {
    console.log('🧪 开始测试研究方案功能...\n');

    // 1. 用户注册/登录
    console.log('1. 测试用户注册/登录...');
    
    // 尝试先注册用户
    console.log('   尝试注册用户...');
    const registerResponse = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'testuser2',
        email: 'testuser2@test.com',
        password: '123456'
      })
    });

    let token;
    if (registerResponse.ok) {
      const registerResult = await registerResponse.json();
      if (registerResult.success) {
        token = registerResult.token;
        console.log('   ✅ 用户注册成功');
      }
    } else {
      console.log('   ℹ️ 用户已存在，尝试登录...');
    }

    // 如果没有token，则尝试登录
    if (!token) {
      const loginResponse = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'testuser2',
          password: '123456'
        })
      });

      if (!loginResponse.ok) {
        throw new Error(`登录失败: ${loginResponse.status}`);
      }

      const loginResult = await loginResponse.json();
      if (!loginResult.success) {
        throw new Error(`登录失败: ${loginResult.error}`);
      }

      token = loginResult.token;
      console.log('   ✅ 用户登录成功');
    }
    
    console.log('✅ 用户认证完成\n');

    // 2. 创建研究方案
    console.log('2. 测试创建研究方案...');
    const planData = {
      title: '测试研究方案 - Node.js',
      description: '这是通过Node.js脚本创建的测试研究方案',
      hypotheses: JSON.stringify(['H1: 测试假设一', 'H2: 测试假设二']),
      experimental_design: '这是一个测试的实验设计方案，包含对照组和实验组',
      analysis_method: '使用SPSS进行数据分析，包括描述性统计和推论统计',
      expected_results: '预期能够验证所有研究假设，并得出有意义的结论',
      methodology: '采用定量研究方法',
      timeline: '6个月研究计划',
      resources: JSON.stringify({ budget: 10000, participants: 100 }),
      source_introductions: JSON.stringify({ test: '来源介绍测试' }),
      status: 'draft'
    };

    const createResponse = await fetch(`${API_BASE}/api/research-plans`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(planData)
    });

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      console.error(`创建方案HTTP错误 ${createResponse.status}:`, errorText);
      throw new Error(`创建方案失败: ${createResponse.status}`);
    }

    const createResult = await createResponse.json();
    if (!createResult.success) {
      console.error('创建方案详细错误:', createResult);
      throw new Error(`创建方案失败: ${createResult.error}`);
    }

    const planId = createResult.plan.id;
    console.log(`✅ 研究方案创建成功，ID: ${planId}\n`);

    // 3. 获取研究方案列表
    console.log('3. 测试获取研究方案列表...');
    const listResponse = await fetch(`${API_BASE}/api/research-plans`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!listResponse.ok) {
      throw new Error(`获取方案列表失败: ${listResponse.status}`);
    }

    const listResult = await listResponse.json();
    if (!listResult.success) {
      throw new Error(`获取方案列表失败: ${listResult.error}`);
    }

    console.log(`✅ 成功获取 ${listResult.plans.length} 个研究方案`);
    
    // 验证新创建的方案
    const newPlan = listResult.plans.find(p => p.id === planId);
    if (!newPlan) {
      throw new Error('新创建的方案在列表中未找到');
    }

    console.log('📋 新方案详细信息:');
    console.log(`   标题: ${newPlan.title}`);
    console.log(`   描述: ${newPlan.description}`);
    console.log(`   研究假设: ${newPlan.hypotheses}`);
    console.log(`   实验设计: ${newPlan.experimental_design ? '✅ 已保存' : '❌ 未保存'}`);
    console.log(`   数据分析: ${newPlan.analysis_method ? '✅ 已保存' : '❌ 未保存'}`);
    console.log(`   预期结果: ${newPlan.expected_results ? '✅ 已保存' : '❌ 未保存'}`);
    console.log(`   来源介绍: ${newPlan.source_introductions ? '✅ 已保存' : '❌ 未保存'}\n`);

    // 4. 获取方案详情
    console.log('4. 测试获取方案详情...');
    const detailResponse = await fetch(`${API_BASE}/api/research-plans/${planId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!detailResponse.ok) {
      throw new Error(`获取方案详情失败: ${detailResponse.status}`);
    }

    const detailResult = await detailResponse.json();
    if (!detailResult.success) {
      throw new Error(`获取方案详情失败: ${detailResult.error}`);
    }

    console.log('✅ 成功获取方案详情');
    console.log(`   完整方案包含 ${Object.keys(detailResult.plan).length} 个字段`);
    console.log(`   关联引用文献: ${detailResult.references.length} 篇\n`);

    console.log('🎉 所有测试通过！研究方案功能工作正常。');

  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    process.exit(1);
  }
}

// 等待一秒后开始测试，确保服务器启动完成
setTimeout(testResearchPlans, 2000); 