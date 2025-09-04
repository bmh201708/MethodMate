/**
 * 简单的过滤机制测试
 * 直接测试核心API调用
 */

import axios from 'axios';

// 测试配置
const BASE_URL = 'https://api.openalex.org/works';
const TIMEOUT = 15000;

// 测试函数
async function testDomainFilter() {
    console.log('🔍 测试领域过滤...');
    
    try {
        const query = 'machine learning';
        const filter = 'primary_topic.field.id:17|12|32|33,publication_year:>2019,is_retracted:false,type:article';
        const url = `${BASE_URL}?search=${encodeURIComponent(query)}&filter=${filter}&per-page=10&select=id,title,primary_topic,publication_year`;
        
        console.log('请求URL:', url);
        
        const startTime = Date.now();
        const response = await axios.get(url, { 
            timeout: TIMEOUT,
            headers: { 'User-Agent': 'MethodMate-Test/1.0' }
        });
        const responseTime = Date.now() - startTime;
        
        const data = response.data;
        const results = data.results || [];
        
        console.log(`✅ 领域过滤测试成功:`);
        console.log(`   - 总结果数: ${data.count || 0}`);
        console.log(`   - 采样数量: ${results.length}`);
        console.log(`   - 响应时间: ${responseTime}ms`);
        
        if (results.length > 0) {
            console.log(`   - 示例论文: "${results[0].title}"`);
            if (results[0].primary_topic) {
                console.log(`   - 论文领域: ${results[0].primary_topic.field?.display_name || '未知'}`);
            }
        }
        
        return true;
        
    } catch (error) {
        console.log(`❌ 领域过滤测试失败: ${error.message}`);
        return false;
    }
}

async function testVenueFilter() {
    console.log('\n📚 测试期刊过滤...');
    
    try {
        // 使用几个知名期刊的ID进行测试
        const venueIds = [
            'S87067389',  // Nature
            'S4210190811', // Science
            'S4210187492'  // Cell
        ];
        
        const query = 'deep learning';
        const filter = `primary_location.source.id:${venueIds.join('|')},publication_year:>2019,is_retracted:false,type:article`;
        const url = `${BASE_URL}?search=${encodeURIComponent(query)}&filter=${filter}&per-page=10&select=id,title,primary_location,publication_year`;
        
        console.log('请求URL:', url);
        
        const startTime = Date.now();
        const response = await axios.get(url, { 
            timeout: TIMEOUT,
            headers: { 'User-Agent': 'MethodMate-Test/1.0' }
        });
        const responseTime = Date.now() - startTime;
        
        const data = response.data;
        const results = data.results || [];
        
        console.log(`✅ 期刊过滤测试成功:`);
        console.log(`   - 总结果数: ${data.count || 0}`);
        console.log(`   - 采样数量: ${results.length}`);
        console.log(`   - 响应时间: ${responseTime}ms`);
        
        if (results.length > 0) {
            console.log(`   - 示例论文: "${results[0].title}"`);
            if (results[0].primary_location) {
                console.log(`   - 发表期刊: ${results[0].primary_location.source?.display_name || '未知'}`);
            }
        }
        
        return true;
        
    } catch (error) {
        console.log(`❌ 期刊过滤测试失败: ${error.message}`);
        return false;
    }
}

async function testCombinedLogic() {
    console.log('\n🔄 测试组合过滤逻辑...');
    
    try {
        const query = 'artificial intelligence';
        
        // 领域过滤查询
        const domainFilter = 'primary_topic.field.id:17|12|32|33,publication_year:>2019,is_retracted:false,type:article';
        const domainUrl = `${BASE_URL}?search=${encodeURIComponent(query)}&filter=${domainFilter}&per-page=50&select=id`;
        
        // 期刊过滤查询
        const venueIds = ['S87067389', 'S4210190811', 'S4210187492'];
        const venueFilter = `primary_location.source.id:${venueIds.join('|')},publication_year:>2019,is_retracted:false,type:article`;
        const venueUrl = `${BASE_URL}?search=${encodeURIComponent(query)}&filter=${venueFilter}&per-page=50&select=id`;
        
        console.log('执行并行查询...');
        
        const startTime = Date.now();
        const [domainResponse, venueResponse] = await Promise.all([
            axios.get(domainUrl, { timeout: TIMEOUT, headers: { 'User-Agent': 'MethodMate-Test/1.0' } }),
            axios.get(venueUrl, { timeout: TIMEOUT, headers: { 'User-Agent': 'MethodMate-Test/1.0' } })
        ]);
        const responseTime = Date.now() - startTime;
        
        const domainResults = domainResponse.data.results || [];
        const venueResults = venueResponse.data.results || [];
        
        // 模拟去重逻辑
        const allIds = new Set();
        domainResults.forEach(paper => allIds.add(paper.id));
        venueResults.forEach(paper => allIds.add(paper.id));
        
        console.log(`✅ 组合过滤测试成功:`);
        console.log(`   - 领域查询结果: ${domainResponse.data.count || 0}`);
        console.log(`   - 期刊查询结果: ${venueResponse.data.count || 0}`);
        console.log(`   - 去重后总数: ${allIds.size}`);
        console.log(`   - 总响应时间: ${responseTime}ms`);
        
        return true;
        
    } catch (error) {
        console.log(`❌ 组合过滤测试失败: ${error.message}`);
        return false;
    }
}

// 主测试函数
async function runTests() {
    console.log('🚀 开始过滤机制测试...\n');
    
    const results = [];
    
    // 执行测试
    results.push(await testDomainFilter());
    results.push(await testVenueFilter());
    results.push(await testCombinedLogic());
    
    // 总结结果
    const passed = results.filter(r => r).length;
    const total = results.length;
    
    console.log('\n' + '='.repeat(50));
    console.log('📊 测试总结');
    console.log('='.repeat(50));
    console.log(`总测试: ${total}`);
    console.log(`通过: ${passed} ✅`);
    console.log(`失败: ${total - passed} ❌`);
    console.log(`成功率: ${Math.round((passed / total) * 100)}%`);
    
    if (passed === total) {
        console.log('\n🎉 所有测试通过！过滤机制工作正常。');
    } else {
        console.log('\n⚠️  部分测试失败，请检查网络连接和API状态。');
    }
}

// 运行测试
runTests().catch(error => {
    console.error('❌ 测试执行出错:', error);
    process.exit(1);
});
