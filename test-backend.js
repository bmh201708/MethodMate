#!/usr/bin/env node

import fetch from 'node-fetch';

const REMOTE_SERVER = 'https://ftrmjlrpxxgi.sealoshzh.site';
const LOCAL_SERVER = 'http://localhost:3002';

console.log('🔧 MethodMate 后端连接测试\n');

// 测试远程服务器
async function testRemoteServer() {
    console.log('📡 测试远程服务器...');
    console.log(`地址: ${REMOTE_SERVER}`);
    
    try {
        // 先测试根路径
        const response = await fetch(`${REMOTE_SERVER}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 10000 // 10秒超时
        });
        
        if (response.ok) {
            console.log('✅ 远程服务器正常');
            console.log(`   根路径状态码: ${response.status}\n`);
            return true;
        } else if (response.status === 404) {
            // 404可能是正常的，尝试测试API接口
            console.log('   根路径返回404，测试API接口...');
            return await testRemoteApiEndpoint();
        } else {
            console.log(`❌ 远程服务器响应错误: ${response.status} ${response.statusText}\n`);
            return false;
        }
    } catch (error) {
        console.log(`❌ 远程服务器连接失败: ${error.message}`);
        console.log('   可能原因:');
        console.log('   1. 服务器未运行或网络问题');
        console.log('   2. 网络配置问题');
        console.log('   3. 防火墙阻止访问\n');
        return false;
    }
}

// 测试远程API接口
async function testRemoteApiEndpoint() {
    try {
        // 使用scholar-search API进行简单测试
        const testData = {
            query: "test",
            num_results: 1,
            lang: "zh-CN"
        };
        
        const response = await fetch(`${REMOTE_SERVER}/api/scholar-search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testData),
            timeout: 15000 // 15秒超时
        });
        
        if (response.ok || response.status === 400 || response.status === 500) {
            // 200, 400, 500 都表示服务器在运行
            console.log('✅ 远程服务器API正常');
            console.log(`   API状态码: ${response.status}\n`);
            return true;
        } else {
            console.log(`❌ 远程API响应错误: ${response.status} ${response.statusText}\n`);
            return false;
        }
    } catch (error) {
        console.log(`❌ 远程API测试失败: ${error.message}\n`);
        return false;
    }
}

// 测试本地服务器
async function testLocalServer() {
    console.log('🏠 测试本地服务器...');
    console.log(`地址: ${LOCAL_SERVER}`);
    
    try {
        const response = await fetch(`${LOCAL_SERVER}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 5000 // 5秒超时
        });
        
        if (response.ok) {
            console.log('✅ 本地服务器正常');
            console.log(`   根路径状态码: ${response.status}\n`);
            return true;
        } else {
            console.log(`❌ 本地服务器响应错误: ${response.status} ${response.statusText}\n`);
            return false;
        }
    } catch (error) {
        console.log(`❌ 本地服务器连接失败: ${error.message}`);
        console.log('   可能原因:');
        console.log('   1. 本地服务器未启动');
        console.log('   2. 端口3002被占用');
        console.log('   3. 服务配置错误\n');
        return false;
    }
}

// 主函数
async function main() {
    const remoteOk = await testRemoteServer();
    const localOk = await testLocalServer();
    
    console.log('📋 测试结果总结:');
    console.log(`   远程服务器: ${remoteOk ? '✅ 正常' : '❌ 异常'}`);
    console.log(`   本地服务器: ${localOk ? '✅ 正常' : '❌ 异常'}`);
    
    console.log('\n🚀 建议的启动方式:');
    if (remoteOk) {
        console.log('   npm run dev:remote  (使用远程后端)');
    }
    if (localOk) {
        console.log('   npm run dev:local   (使用本地后端)');
    }
    if (!remoteOk && !localOk) {
        console.log('   ⚠️  两个服务器都无法连接，请检查服务器状态');
    }
    
    if (remoteOk && !localOk) {
        console.log('\n💡 如果要使用远程后端，需要确保远程服务器CORS配置包含:');
        console.log('   http://localhost:3000');
        console.log('   http://localhost:5173');
    }
}

main().catch(console.error); 