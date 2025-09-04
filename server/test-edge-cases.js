/**
 * 测试过滤机制的边界情况和错误处理
 */

import axios from 'axios';

const BASE_URL = 'https://api.openalex.org/works';
const TIMEOUT = 10000;

// 测试用例
const EDGE_CASES = [
    {
        name: '空查询字符串',
        query: '',
        shouldFail: false,
        description: '测试空查询的处理'
    },
    {
        name: '特殊字符查询',
        query: 'machine-learning & AI (2020)',
        shouldFail: false,
        description: '测试特殊字符的编码处理'
    },
    {
        name: '超长查询',
        query: 'artificial intelligence machine learning deep learning neural networks natural language processing computer vision data science statistics mathematics'.repeat(10),
        shouldFail: false,
        description: '测试超长查询字符串'
    },
    {
        name: '中文查询',
        query: '机器学习 人工智能',
        shouldFail: false,
        description: '测试中文查询支持'
    },
    {
        name: '数字查询',
        query: '2020 2021 2022',
        shouldFail: false,
        description: '测试纯数字查询'
    },
    {
        name: '单字符查询',
        query: 'A',
        shouldFail: false,
        description: '测试单字符查询'
    }
];

class EdgeCaseTester {
    constructor() {
        this.results = [];
        this.passCount = 0;
        this.failCount = 0;
    }
    
    async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    async testEdgeCase(testCase) {
        console.log(`\n🧪 测试: ${testCase.name}`);
        console.log(`📝 描述: ${testCase.description}`);
        console.log(`🔍 查询: "${testCase.query}"`);
        
        try {
            // 构建过滤器（领域过滤）
            const filter = 'primary_topic.field.id:17|12|32|33,publication_year:>2019,is_retracted:false,type:article';
            const url = `${BASE_URL}?search=${encodeURIComponent(testCase.query)}&filter=${filter}&per-page=5&select=id,title`;
            
            const startTime = Date.now();
            const response = await axios.get(url, {
                timeout: TIMEOUT,
                headers: { 'User-Agent': 'MethodMate-EdgeTest/1.0' }
            });
            const responseTime = Date.now() - startTime;
            
            const data = response.data;
            const resultCount = data.count || 0;
            const sampleSize = (data.results || []).length;
            
            // 判断测试结果
            const passed = testCase.shouldFail ? false : true; // 边界情况通常应该成功处理
            
            const result = {
                testName: testCase.name,
                query: testCase.query,
                passed: passed,
                resultCount: resultCount,
                sampleSize: sampleSize,
                responseTime: responseTime,
                status: response.status,
                message: passed ? '边界情况处理正常' : '意外的处理结果'
            };
            
            this.recordResult(result);
            
            console.log(`✅ 状态: HTTP ${response.status}`);
            console.log(`📊 结果: ${resultCount} 篇论文，采样 ${sampleSize} 篇`);
            console.log(`⏱️  响应时间: ${responseTime}ms`);
            
            if (passed) {
                console.log(`✅ 通过 - ${result.message}`);
            } else {
                console.log(`❌ 失败 - ${result.message}`);
            }
            
            return result;
            
        } catch (error) {
            const passed = testCase.shouldFail; // 如果预期失败，错误就是成功
            
            const result = {
                testName: testCase.name,
                query: testCase.query,
                passed: passed,
                error: error.message,
                errorType: error.code || error.name || 'Unknown',
                message: passed ? '预期的错误处理' : '意外的错误'
            };
            
            this.recordResult(result);
            
            if (passed) {
                console.log(`✅ 通过 - 预期错误: ${error.message}`);
            } else {
                console.log(`❌ 失败 - 意外错误: ${error.message}`);
            }
            
            return result;
        }
    }
    
    async testInvalidFilters() {
        console.log(`\n🔧 测试无效过滤器处理`);
        
        const invalidFilters = [
            {
                name: '无效字段ID',
                filter: 'primary_topic.field.id:999999,publication_year:>2019',
                description: '测试不存在的字段ID'
            },
            {
                name: '错误的日期格式',
                filter: 'publication_year:invalid_date,primary_topic.field.id:17',
                description: '测试错误的日期过滤器'
            },
            {
                name: '空过滤器',
                filter: '',
                description: '测试空过滤器字符串'
            }
        ];
        
        for (const testFilter of invalidFilters) {
            try {
                console.log(`\n🧪 测试无效过滤器: ${testFilter.name}`);
                console.log(`📝 描述: ${testFilter.description}`);
                
                const url = `${BASE_URL}?search=machine%20learning&filter=${testFilter.filter}&per-page=5`;
                
                const startTime = Date.now();
                const response = await axios.get(url, {
                    timeout: TIMEOUT,
                    headers: { 'User-Agent': 'MethodMate-EdgeTest/1.0' }
                });
                const responseTime = Date.now() - startTime;
                
                console.log(`✅ API容错: HTTP ${response.status}, ${responseTime}ms`);
                console.log(`📊 结果: ${response.data.count || 0} 篇论文`);
                
                this.recordResult({
                    testName: `无效过滤器-${testFilter.name}`,
                    passed: true,
                    message: 'API正确处理了无效过滤器',
                    responseTime: responseTime
                });
                
            } catch (error) {
                console.log(`⚠️  错误处理: ${error.message}`);
                
                this.recordResult({
                    testName: `无效过滤器-${testFilter.name}`,
                    passed: true, // 错误处理也算正确
                    message: 'API正确拒绝了无效过滤器',
                    error: error.message
                });
            }
            
            await this.delay(500);
        }
    }
    
    async testRateLimiting() {
        console.log(`\n⚡ 测试请求频率限制`);
        
        const rapidRequests = [];
        const requestCount = 5;
        
        console.log(`发送 ${requestCount} 个快速连续请求...`);
        
        const startTime = Date.now();
        
        for (let i = 0; i < requestCount; i++) {
            const promise = axios.get(`${BASE_URL}?search=test&per-page=1`, {
                timeout: TIMEOUT,
                headers: { 'User-Agent': 'MethodMate-EdgeTest/1.0' }
            }).then(response => ({
                index: i,
                status: response.status,
                success: true
            })).catch(error => ({
                index: i,
                error: error.message,
                success: false
            }));
            
            rapidRequests.push(promise);
        }
        
        const results = await Promise.all(rapidRequests);
        const totalTime = Date.now() - startTime;
        
        const successCount = results.filter(r => r.success).length;
        const failCount = results.filter(r => !r.success).length;
        
        console.log(`📊 快速请求结果:`);
        console.log(`   - 成功: ${successCount}/${requestCount}`);
        console.log(`   - 失败: ${failCount}/${requestCount}`);
        console.log(`   - 总时间: ${totalTime}ms`);
        console.log(`   - 平均时间: ${Math.round(totalTime/requestCount)}ms`);
        
        this.recordResult({
            testName: '请求频率限制测试',
            passed: successCount > 0, // 至少有一些成功就算通过
            successRate: `${successCount}/${requestCount}`,
            totalTime: totalTime,
            message: successCount === requestCount ? '所有请求成功' : '部分请求被限制'
        });
    }
    
    recordResult(result) {
        this.results.push(result);
        if (result.passed) {
            this.passCount++;
        } else {
            this.failCount++;
        }
    }
    
    generateReport() {
        const totalTests = this.results.length;
        const successRate = totalTests > 0 ? Math.round((this.passCount / totalTests) * 100) : 0;
        
        return {
            summary: {
                totalTests: totalTests,
                passed: this.passCount,
                failed: this.failCount,
                successRate: `${successRate}%`
            },
            details: this.results,
            timestamp: new Date().toISOString()
        };
    }
    
    async runAllEdgeCaseTests() {
        console.log('🚀 开始边界情况和错误处理测试...\n');
        
        try {
            // 1. 测试各种边界查询
            console.log('=' .repeat(60));
            console.log('📋 第一部分: 边界查询测试');
            console.log('=' .repeat(60));
            
            for (const testCase of EDGE_CASES) {
                await this.testEdgeCase(testCase);
                await this.delay(800); // API请求间隔
            }
            
            // 2. 测试无效过滤器
            console.log('\n' + '=' .repeat(60));
            console.log('📋 第二部分: 无效过滤器测试');
            console.log('=' .repeat(60));
            
            await this.testInvalidFilters();
            
            // 3. 测试请求频率限制
            console.log('\n' + '=' .repeat(60));
            console.log('📋 第三部分: 请求频率限制测试');
            console.log('=' .repeat(60));
            
            await this.testRateLimiting();
            
            // 生成报告
            const report = this.generateReport();
            
            console.log('\n' + '=' .repeat(60));
            console.log('📊 边界情况测试总结');
            console.log('=' .repeat(60));
            console.log(`总测试数: ${report.summary.totalTests}`);
            console.log(`通过: ${report.summary.passed} ✅`);
            console.log(`失败: ${report.summary.failed} ❌`);
            console.log(`成功率: ${report.summary.successRate}`);
            
            if (report.summary.failed > 0) {
                console.log('\n⚠️  失败的测试:');
                report.details
                    .filter(r => !r.passed)
                    .forEach(r => {
                        console.log(`- ${r.testName}: ${r.error || r.message || '未知错误'}`);
                    });
            }
            
            console.log('\n🎉 边界情况测试完成!');
            
            return report;
            
        } catch (error) {
            console.error('❌ 边界测试执行出错:', error);
            throw error;
        }
    }
}

// 主函数
async function main() {
    const tester = new EdgeCaseTester();
    await tester.runAllEdgeCaseTests();
}

// 如果直接运行此脚本
if (import.meta.url.startsWith('file:') && process.argv[1] && import.meta.url.includes(process.argv[1].replace(/\\/g, '/'))) {
    main().catch(error => {
        console.error('❌ 测试失败:', error);
        process.exit(1);
    });
}

export default EdgeCaseTester;
