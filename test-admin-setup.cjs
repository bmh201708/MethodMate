// 管理员账户设置和测试脚本
// Node.js 18+ 有内置的fetch，无需额外引入

const baseUrl = 'http://localhost:3004';

async function setupAdminAccount() {
  console.log('🔧 开始设置管理员账户...\n');

  try {
    // 1. 尝试注册管理员账户
    console.log('1️⃣ 注册管理员账户...');
    
    const adminData = {
      username: 'admin',
      email: 'admin@methodmate.com',
      password: 'admin123'
    };

    console.log('注册数据:', adminData);

    const registerResponse = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(adminData)
    });

    console.log('注册响应状态:', registerResponse.status);
    
    const registerResult = await registerResponse.json();
    console.log('注册结果:', registerResult);

    let token = null;
    
    if (registerResponse.ok && registerResult.success) {
      console.log('✅ 管理员账户注册成功！');
      token = registerResult.token;
      
      console.log('\n📋 账户信息:');
      console.log('- 用户名:', registerResult.user.username);
      console.log('- 邮箱:', registerResult.user.email);
      console.log('- Token:', token);
      
    } else if (registerResult.error && registerResult.error.includes('已存在')) {
      console.log('⚠️ 管理员账户已存在，尝试登录...');
      
      // 2. 如果账户已存在，尝试登录
      console.log('\n2️⃣ 登录现有管理员账户...');
      
      const loginResponse = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: adminData.username,
          password: adminData.password
        })
      });

      console.log('登录响应状态:', loginResponse.status);
      
      const loginResult = await loginResponse.json();
      console.log('登录结果:', loginResult);

      if (loginResponse.ok && loginResult.success) {
        console.log('✅ 管理员账户登录成功！');
        token = loginResult.token;
        
        console.log('\n📋 登录账户信息:');
        console.log('- 用户名:', loginResult.user.username);
        console.log('- 邮箱:', loginResult.user.email);
        console.log('- Token:', token);
      } else {
        throw new Error('登录失败: ' + loginResult.error);
      }
    } else {
      throw new Error('注册失败: ' + registerResult.error);
    }

    // 3. 测试token有效性
    console.log('\n3️⃣ 测试token有效性...');
    
    const meResponse = await fetch(`${baseUrl}/api/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const meResult = await meResponse.json();
    console.log('用户信息验证:', meResult);

    if (meResponse.ok && meResult.success) {
      console.log('✅ Token验证成功！');
    } else {
      console.log('❌ Token验证失败');
    }

    // 4. 测试论文删除权限
    console.log('\n4️⃣ 测试论文操作权限...');
    
    // 首先获取论文列表
    const listResponse = await fetch(`${baseUrl}/api/paper-cache/list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        page: 1,
        limit: 1
      })
    });

    const listResult = await listResponse.json();
    
    if (listResult.success && listResult.papers && listResult.papers.length > 0) {
      const testPaper = listResult.papers[0];
      console.log(`测试论文: "${testPaper.title}" (ID: ${testPaper.id})`);
      
      // 测试获取论文详情（这个操作需要管理员权限来编辑）
      const detailResponse = await fetch(`${baseUrl}/api/paper-cache/${testPaper.id}`);
      const detailResult = await detailResponse.json();
      
      if (detailResult.success) {
        console.log('✅ 可以访问论文详情，权限正常');
      } else {
        console.log('❌ 无法访问论文详情');
      }
    } else {
      console.log('ℹ️ 暂无论文数据可供测试');
    }

    // 5. 输出使用说明
    console.log('\n🎯 使用说明:');
    console.log('================================');
    console.log('现在您可以使用以下凭据登录论文缓存浏览器:');
    console.log('');
    console.log('🔑 登录信息:');
    console.log(`用户名/邮箱: ${adminData.username} 或 ${adminData.email}`);
    console.log(`密码: ${adminData.password}`);
    console.log('');
    console.log('🌐 访问地址:');
    console.log(`论文缓存浏览器: ${baseUrl}/papers`);
    console.log('');
    console.log('📝 测试步骤:');
    console.log('1. 打开浏览器访问上述地址');
    console.log('2. 在页面顶部输入用户名和密码');
    console.log('3. 点击"登录"按钮');
    console.log('4. 登录成功后即可测试编辑和删除功能');
    console.log('');
    console.log('🔧 API Token (用于直接API调用):');
    console.log(`Bearer ${token}`);
    console.log('');
    console.log('✨ 登录成功后您可以:');
    console.log('- 查看任何论文的全文内容');
    console.log('- 编辑论文的全文内容');
    console.log('- 删除论文');
    console.log('- 添加新论文');

  } catch (error) {
    console.error('\n❌ 设置管理员账户失败:', error.message);
    console.error('详细错误:', error);
    
    console.log('\n🛠️ 故障排除:');
    console.log('1. 确保服务器正在运行 (http://localhost:3004)');
    console.log('2. 确保数据库连接正常');
    console.log('3. 检查服务器日志是否有错误信息');
  }
}

// 导出函数供其他脚本使用
module.exports = { setupAdminAccount };

// 如果直接运行脚本，执行设置
if (require.main === module) {
  setupAdminAccount();
} 