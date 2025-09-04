/**
 * 简化的过滤机制测试运行器
 * 快速验证核心功能
 */

import FilterTester from './test-filter-comprehensive.js';

async function runQuickTests() {
    console.log('🚀 运行快速过滤机制测试...\n');
    
    const tester = new FilterTester();
    
    // 首先加载期刊映射
    await tester.loadVenueMapping();
    
    try {
        // 快速测试核心功能
        console.log('1️⃣ 测试领域过滤...');
        await tester.testDomainFilter({
            name: '机器学习',
            query: 'machine learning',
            expectedFields: ['Computer Science']
        });
        
        await tester.delay(1000);
        
        console.log('\n2️⃣ 测试期刊过滤...');
        await tester.testVenueFilter({
            name: '深度学习期刊',
            query: 'deep learning',
            expectedVenues: ['Nature', 'Science']
        });
        
        await tester.delay(1000);
        
        console.log('\n3️⃣ 测试组合过滤...');
        await tester.testCombinedFilter('artificial intelligence');
        
        // 生成简化报告
        const report = tester.generateReport();
        
        console.log('\n📊 快速测试结果:');
        console.log(`- 总测试: ${report.summary.totalTests}`);
        console.log(`- 通过: ${report.summary.passed} ✅`);
        console.log(`- 失败: ${report.summary.failed} ❌`);
        console.log(`- 成功率: ${report.summary.successRate}`);
        
        if (report.summary.failed === 0) {
            console.log('\n🎉 所有快速测试通过！过滤机制工作正常。');
        } else {
            console.log('\n⚠️  发现问题，建议运行完整测试：');
            console.log('node test-filter-comprehensive.js');
        }
        
    } catch (error) {
        console.error('❌ 测试执行失败:', error.message);
    }
}

// 运行快速测试
if (import.meta.url.startsWith('file:') && process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/'))) {
    runQuickTests().catch(console.error);
}

export { runQuickTests };
