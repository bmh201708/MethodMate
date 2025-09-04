/**
 * 过滤机制性能测试
 * 测试响应时间、并发处理等性能指标
 */

import axios from 'axios';

const BASE_URL = 'https://api.openalex.org/works';
const TIMEOUT = 20000;

// 性能测试配置
const PERFORMANCE_CONFIG = {
    warmupRequests: 3,
    testRequests: 10,
    concurrentRequests: 5,
    maxAcceptableTime: 5000, // 5秒
    requestDelay: 500
};

// 测试查询
const TEST_QUERIES = [
    'machine learning',
    'artificial intelligence',
    'deep learning',
    'neural networks',
    'computer vision',
    'natural language processing',
    'data science',
    'statistics',
    'psychology',
    'cognitive science'
];

class PerformanceTester {
    constructor() {
        this.results = [];
        this.metrics = {
            totalRequests: 0,
            successfulRequests: 0,
            failedRequests: 0,
            totalResponseTime: 0,
            minResponseTime: Infinity,
            maxResponseTime: 0,
            responseTimes: []
        };
    }
    
    async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // 单个请求性能测试
    async performSingleRequest(query, filter, testName) {
        const url = `${BASE_URL}?search=${encodeURIComponent(query)}&filter=${filter}&per-page=20&select=id,title,publication_year`;
        
        try {
            const startTime = Date.now();
            const response = await axios.get(url, {
                timeout: TIMEOUT,
                headers: { 'User-Agent': 'MethodMate-PerfTest/1.0' }
            });
            const responseTime = Date.now() - startTime;
            
            // 更新性能指标
            this.metrics.totalRequests++;
            this.metrics.successfulRequests++;
            this.metrics.totalResponseTime += responseTime;
            this.metrics.responseTimes.push(responseTime);
            this.metrics.minResponseTime = Math.min(this.metrics.minResponseTime, responseTime);
            this.metrics.maxResponseTime = Math.max(this.metrics.maxResponseTime, responseTime);
            
            return {
                success: true,
                responseTime: responseTime,
                resultCount: response.data.count || 0,
                status: response.status,
                testName: testName,
                query: query
            };
            
        } catch (error) {
            this.metrics.totalRequests++;
            this.metrics.failedRequests++;
            
            return {
                success: false,
                error: error.message,
                testName: testName,
                query: query
            };
        }
    }
    
    // 测试领域过滤性能
    async testDomainFilterPerformance() {
        console.log('🔍 测试领域过滤性能...\n');
        
        const domainFilter = 'primary_topic.field.id:17|12|32|33,publication_year:>2019,is_retracted:false,type:article';
        const results = [];
        
        // 预热请求
        console.log('🔥 预热请求...');
        for (let i = 0; i < PERFORMANCE_CONFIG.warmupRequests; i++) {
            await this.performSingleRequest(TEST_QUERIES[0], domainFilter, 'warmup');
            await this.delay(200);
        }
        
        console.log('📊 开始性能测试...');
        
        // 性能测试请求
        for (let i = 0; i < PERFORMANCE_CONFIG.testRequests; i++) {
            const query = TEST_QUERIES[i % TEST_QUERIES.length];
            const result = await this.performSingleRequest(query, domainFilter, `领域过滤-${i+1}`);
            results.push(result);
            
            if (result.success) {
                console.log(`✅ ${result.testName}: ${result.responseTime}ms (${result.resultCount} 结果)`);
            } else {
                console.log(`❌ ${result.testName}: ${result.error}`);
            }
            
            await this.delay(PERFORMANCE_CONFIG.requestDelay);
        }
        
        return results;
    }
    
    // 测试期刊过滤性能
    async testVenueFilterPerformance() {
        console.log('\n📚 测试期刊过滤性能...\n');
        
        // 使用部分期刊ID进行测试
        const venueIds = [
            'S87067389',   // Nature
            'S4210190811', // Science
            'S4210187492', // Cell
            'S137773608',  // PNAS
            'S4210202800'  // Nature Communications
        ];
        
        const venueFilter = `primary_location.source.id:${venueIds.join('|')},publication_year:>2019,is_retracted:false,type:article`;
        const results = [];
        
        console.log('📊 开始期刊过滤性能测试...');
        
        for (let i = 0; i < Math.min(PERFORMANCE_CONFIG.testRequests, 5); i++) {
            const query = TEST_QUERIES[i % TEST_QUERIES.length];
            const result = await this.performSingleRequest(query, venueFilter, `期刊过滤-${i+1}`);
            results.push(result);
            
            if (result.success) {
                console.log(`✅ ${result.testName}: ${result.responseTime}ms (${result.resultCount} 结果)`);
            } else {
                console.log(`❌ ${result.testName}: ${result.error}`);
            }
            
            await this.delay(PERFORMANCE_CONFIG.requestDelay);
        }
        
        return results;
    }
    
    // 测试并发请求性能
    async testConcurrentRequests() {
        console.log('\n⚡ 测试并发请求性能...\n');
        
        const domainFilter = 'primary_topic.field.id:17|12|32|33,publication_year:>2019,is_retracted:false,type:article';
        const concurrentPromises = [];
        
        console.log(`发起 ${PERFORMANCE_CONFIG.concurrentRequests} 个并发请求...`);
        
        const startTime = Date.now();
        
        for (let i = 0; i < PERFORMANCE_CONFIG.concurrentRequests; i++) {
            const query = TEST_QUERIES[i % TEST_QUERIES.length];
            const promise = this.performSingleRequest(query, domainFilter, `并发-${i+1}`);
            concurrentPromises.push(promise);
        }
        
        const results = await Promise.all(concurrentPromises);
        const totalTime = Date.now() - startTime;
        
        const successCount = results.filter(r => r.success).length;
        const failCount = results.filter(r => !r.success).length;
        
        console.log(`📊 并发测试结果:`);
        console.log(`   - 成功: ${successCount}/${PERFORMANCE_CONFIG.concurrentRequests}`);
        console.log(`   - 失败: ${failCount}/${PERFORMANCE_CONFIG.concurrentRequests}`);
        console.log(`   - 总时间: ${totalTime}ms`);
        console.log(`   - 平均时间: ${Math.round(totalTime/PERFORMANCE_CONFIG.concurrentRequests)}ms`);
        
        return results;
    }
    
    // 测试组合过滤性能
    async testCombinedFilterPerformance() {
        console.log('\n🔄 测试组合过滤性能...\n');
        
        const results = [];
        const query = 'machine learning';
        
        // 领域过滤
        const domainFilter = 'primary_topic.field.id:17|12|32|33,publication_year:>2019,is_retracted:false,type:article';
        
        // 期刊过滤
        const venueIds = ['S87067389', 'S4210190811', 'S4210187492'];
        const venueFilter = `primary_location.source.id:${venueIds.join('|')},publication_year:>2019,is_retracted:false,type:article`;
        
        console.log('执行组合查询测试...');
        
        for (let i = 0; i < 3; i++) {
            const startTime = Date.now();
            
            // 并行执行两个查询
            const [domainResult, venueResult] = await Promise.all([
                this.performSingleRequest(query, domainFilter, `组合-领域-${i+1}`),
                this.performSingleRequest(query, venueFilter, `组合-期刊-${i+1}`)
            ]);
            
            const totalTime = Date.now() - startTime;
            
            const combinedResult = {
                testName: `组合过滤-${i+1}`,
                totalTime: totalTime,
                domainSuccess: domainResult.success,
                venueSuccess: venueResult.success,
                domainResults: domainResult.success ? domainResult.resultCount : 0,
                venueResults: venueResult.success ? venueResult.resultCount : 0,
                success: domainResult.success && venueResult.success
            };
            
            results.push(combinedResult);
            
            if (combinedResult.success) {
                console.log(`✅ ${combinedResult.testName}: ${combinedResult.totalTime}ms (领域:${combinedResult.domainResults}, 期刊:${combinedResult.venueResults})`);
            } else {
                console.log(`❌ ${combinedResult.testName}: 部分查询失败`);
            }
            
            await this.delay(PERFORMANCE_CONFIG.requestDelay);
        }
        
        return results;
    }
    
    // 计算性能统计
    calculateStatistics() {
        if (this.metrics.responseTimes.length === 0) {
            return null;
        }
        
        const times = this.metrics.responseTimes.sort((a, b) => a - b);
        const count = times.length;
        
        const avg = this.metrics.totalResponseTime / this.metrics.successfulRequests;
        const median = count % 2 === 0 
            ? (times[count/2 - 1] + times[count/2]) / 2
            : times[Math.floor(count/2)];
        
        const p95Index = Math.floor(count * 0.95);
        const p95 = times[p95Index] || times[count - 1];
        
        return {
            totalRequests: this.metrics.totalRequests,
            successfulRequests: this.metrics.successfulRequests,
            failedRequests: this.metrics.failedRequests,
            successRate: `${Math.round((this.metrics.successfulRequests / this.metrics.totalRequests) * 100)}%`,
            averageResponseTime: Math.round(avg),
            medianResponseTime: Math.round(median),
            minResponseTime: this.metrics.minResponseTime,
            maxResponseTime: this.metrics.maxResponseTime,
            p95ResponseTime: Math.round(p95),
            performanceGrade: this.gradePerformance(avg)
        };
    }
    
    // 性能评级
    gradePerformance(avgTime) {
        if (avgTime < 1000) return '优秀 🏆';
        if (avgTime < 2000) return '良好 👍';
        if (avgTime < 3000) return '一般 👌';
        if (avgTime < 5000) return '较慢 ⚠️';
        return '很慢 ❌';
    }
    
    // 运行所有性能测试
    async runAllPerformanceTests() {
        console.log('🚀 开始过滤机制性能测试...\n');
        
        try {
            // 重置性能指标
            this.metrics = {
                totalRequests: 0,
                successfulRequests: 0,
                failedRequests: 0,
                totalResponseTime: 0,
                minResponseTime: Infinity,
                maxResponseTime: 0,
                responseTimes: []
            };
            
            // 1. 领域过滤性能测试
            console.log('=' .repeat(60));
            console.log('📋 第一部分: 领域过滤性能测试');
            console.log('=' .repeat(60));
            await this.testDomainFilterPerformance();
            
            // 2. 期刊过滤性能测试
            console.log('\n' + '=' .repeat(60));
            console.log('📋 第二部分: 期刊过滤性能测试');
            console.log('=' .repeat(60));
            await this.testVenueFilterPerformance();
            
            // 3. 并发请求测试
            console.log('\n' + '=' .repeat(60));
            console.log('📋 第三部分: 并发请求测试');
            console.log('=' .repeat(60));
            await this.testConcurrentRequests();
            
            // 4. 组合过滤性能测试
            console.log('\n' + '=' .repeat(60));
            console.log('📋 第四部分: 组合过滤性能测试');
            console.log('=' .repeat(60));
            await this.testCombinedFilterPerformance();
            
            // 生成性能报告
            const stats = this.calculateStatistics();
            
            console.log('\n' + '=' .repeat(60));
            console.log('📊 性能测试总结');
            console.log('=' .repeat(60));
            
            if (stats) {
                console.log(`总请求数: ${stats.totalRequests}`);
                console.log(`成功请求: ${stats.successfulRequests}`);
                console.log(`失败请求: ${stats.failedRequests}`);
                console.log(`成功率: ${stats.successRate}`);
                console.log(`平均响应时间: ${stats.averageResponseTime}ms`);
                console.log(`中位响应时间: ${stats.medianResponseTime}ms`);
                console.log(`最快响应时间: ${stats.minResponseTime}ms`);
                console.log(`最慢响应时间: ${stats.maxResponseTime}ms`);
                console.log(`95%响应时间: ${stats.p95ResponseTime}ms`);
                console.log(`性能评级: ${stats.performanceGrade}`);
                
                // 性能建议
                if (stats.averageResponseTime > PERFORMANCE_CONFIG.maxAcceptableTime) {
                    console.log('\n⚠️  性能建议:');
                    console.log('- 响应时间超过预期，建议优化查询条件');
                    console.log('- 考虑增加缓存机制');
                    console.log('- 检查网络连接状况');
                } else {
                    console.log('\n🎉 性能表现良好！');
                }
            }
            
            console.log('\n🏁 性能测试完成!');
            
            return stats;
            
        } catch (error) {
            console.error('❌ 性能测试执行出错:', error);
            throw error;
        }
    }
}

// 主函数
async function main() {
    const tester = new PerformanceTester();
    await tester.runAllPerformanceTests();
}

// 如果直接运行此脚本
if (import.meta.url.startsWith('file:') && process.argv[1] && import.meta.url.includes(process.argv[1].replace(/\\/g, '/'))) {
    main().catch(error => {
        console.error('❌ 性能测试失败:', error);
        process.exit(1);
    });
}

export default PerformanceTester;
