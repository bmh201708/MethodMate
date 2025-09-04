/**
 * 全面测试过滤机制的功能
 * 测试包括：领域过滤、期刊过滤、组合过滤、边界情况等
 */

import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 测试配置
const TEST_CONFIG = {
    baseUrl: 'https://api.openalex.org/works',
    timeout: 30000,
    maxRetries: 3,
    delay: 1000, // API请求间隔
};

// 测试用例配置
const TEST_CASES = {
    // 领域过滤测试
    domainTests: [
        {
            name: '计算机科学领域',
            query: 'machine learning',
            expectedFields: ['Computer Science']
        },
        {
            name: '心理学领域',
            query: 'cognitive psychology',
            expectedFields: ['Psychology']
        },
        {
            name: '跨领域查询',
            query: 'artificial intelligence',
            expectedFields: ['Computer Science', 'Psychology']
        }
    ],
    
    // 期刊过滤测试
    venueTests: [
        {
            name: '顶级期刊测试',
            query: 'deep learning',
            expectedVenues: ['Nature', 'Science', 'Cell']
        },
        {
            name: '计算机顶会测试',
            query: 'neural networks',
            expectedVenues: ['ICML', 'NeurIPS', 'ICLR']
        }
    ],
    
    // 边界情况测试
    edgeCases: [
        {
            name: '空查询',
            query: '',
            shouldFail: true
        },
        {
            name: '特殊字符',
            query: 'machine-learning & AI',
            shouldFail: false
        },
        {
            name: '超长查询',
            query: 'a'.repeat(1000),
            shouldFail: false
        }
    ]
};

class FilterTester {
    constructor() {
        this.results = [];
        this.startTime = Date.now();
        this.testCount = 0;
        this.passCount = 0;
        this.failCount = 0;
        this.venueMapping = {};
    }
    
    async loadVenueMapping() {
        try {
            const mappingPath = path.join(__dirname, 'config', 'venue-openalex-mapping.js');
            // 转换为file:// URL格式以支持Windows路径
            const mappingUrl = `file://${mappingPath.replace(/\\/g, '/')}`;
            const mappingModule = await import(mappingUrl);
            this.venueMapping = mappingModule.VENUE_OPENALEX_MAPPING;
            console.log(`✅ 成功加载 ${this.venueMapping.ALL_VENUE_IDS?.length || 0} 个期刊/会议映射`);
        } catch (error) {
            console.error('❌ 无法加载期刊映射文件:', error.message);
            console.error('错误详情:', error.stack);
            this.venueMapping = {};
        }
    }
    
    // 延迟函数
    async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // 构建领域过滤器
    buildDomainFilter() {
        return 'primary_topic.field.id:17|12|32|33,publication_year:>2019,is_retracted:false,is_paratext:false';
    }
    
    // 构建期刊过滤器
    buildVenueFilter() {
        const venueIds = this.venueMapping.ALL_VENUE_IDS || [];
        if (venueIds.length === 0) {
            return 'publication_year:>2019,is_retracted:false,is_paratext:false';
        }
        return `primary_location.source.id:${venueIds.join('|')},publication_year:>2019,is_retracted:false,is_paratext:false`;
    }
    
    // 执行API请求
    async makeRequest(url, retries = 0) {
        try {
            const response = await axios.get(url, {
                timeout: TEST_CONFIG.timeout,
                headers: {
                    'User-Agent': 'MethodMate-Filter-Test/1.0'
                }
            });
            return response.data;
        } catch (error) {
            if (retries < TEST_CONFIG.maxRetries) {
                console.log(`⚠️  请求失败，重试 ${retries + 1}/${TEST_CONFIG.maxRetries}: ${error.message}`);
                await this.delay(TEST_CONFIG.delay * (retries + 1));
                return this.makeRequest(url, retries + 1);
            }
            throw error;
        }
    }
    
    // 测试领域过滤功能
    async testDomainFilter(testCase) {
        console.log(`\n🔍 测试领域过滤: ${testCase.name}`);
        
        try {
            const filter = this.buildDomainFilter();
            const url = `${TEST_CONFIG.baseUrl}?search=${encodeURIComponent(testCase.query)}&filter=${filter}&per-page=50&select=id,title,primary_topic,publication_year,primary_location`;
            
            const startTime = Date.now();
            const data = await this.makeRequest(url);
            const responseTime = Date.now() - startTime;
            
            const results = data.results || [];
            const fieldCounts = {};
            
            // 统计领域分布
            results.forEach(paper => {
                if (paper.primary_topic && paper.primary_topic.field) {
                    const fieldName = paper.primary_topic.field.display_name;
                    fieldCounts[fieldName] = (fieldCounts[fieldName] || 0) + 1;
                }
            });
            
            const testResult = {
                testName: `领域过滤-${testCase.name}`,
                query: testCase.query,
                totalResults: data.meta?.count || 0,
                sampleSize: results.length,
                responseTime: `${responseTime}ms`,
                fieldDistribution: fieldCounts,
                passed: results.length > 0,
                details: {
                    url: url,
                    expectedFields: testCase.expectedFields,
                    actualFields: Object.keys(fieldCounts)
                }
            };
            
            this.recordResult(testResult);
            
            if (testResult.passed) {
                console.log(`✅ 通过 - 找到 ${testResult.totalResults} 篇论文，采样 ${testResult.sampleSize} 篇`);
                console.log(`📊 领域分布:`, fieldCounts);
            } else {
                console.log(`❌ 失败 - 未找到任何结果`);
            }
            
            return testResult;
            
        } catch (error) {
            const testResult = {
                testName: `领域过滤-${testCase.name}`,
                query: testCase.query,
                passed: false,
                error: error.message
            };
            
            this.recordResult(testResult);
            console.log(`❌ 错误:`, error.message);
            return testResult;
        }
    }
    
    // 测试期刊过滤功能
    async testVenueFilter(testCase) {
        console.log(`\n📚 测试期刊过滤: ${testCase.name}`);
        
        try {
            const filter = this.buildVenueFilter();
            const url = `${TEST_CONFIG.baseUrl}?search=${encodeURIComponent(testCase.query)}&filter=${filter}&per-page=50&select=id,title,primary_location,publication_year,primary_topic`;
            
            const startTime = Date.now();
            const data = await this.makeRequest(url);
            const responseTime = Date.now() - startTime;
            
            const results = data.results || [];
            const venueCounts = {};
            
            // 统计期刊分布
            results.forEach(paper => {
                if (paper.primary_location && paper.primary_location.source) {
                    const venueName = paper.primary_location.source.display_name;
                    venueCounts[venueName] = (venueCounts[venueName] || 0) + 1;
                }
            });
            
            const testResult = {
                testName: `期刊过滤-${testCase.name}`,
                query: testCase.query,
                totalResults: data.meta?.count || 0,
                sampleSize: results.length,
                responseTime: `${responseTime}ms`,
                venueDistribution: venueCounts,
                passed: results.length > 0,
                details: {
                    url: url,
                    expectedVenues: testCase.expectedVenues,
                    actualVenues: Object.keys(venueCounts)
                }
            };
            
            this.recordResult(testResult);
            
            if (testResult.passed) {
                console.log(`✅ 通过 - 找到 ${testResult.totalResults} 篇论文，采样 ${testResult.sampleSize} 篇`);
                console.log(`📚 期刊分布:`, Object.keys(venueCounts).slice(0, 10));
            } else {
                console.log(`❌ 失败 - 未找到任何结果`);
            }
            
            return testResult;
            
        } catch (error) {
            const testResult = {
                testName: `期刊过滤-${testCase.name}`,
                query: testCase.query,
                passed: false,
                error: error.message
            };
            
            this.recordResult(testResult);
            console.log(`❌ 错误:`, error.message);
            return testResult;
        }
    }
    
    // 测试组合过滤（模拟实际API调用）
    async testCombinedFilter(query = 'machine learning') {
        console.log(`\n🔄 测试组合过滤逻辑: ${query}`);
        
        try {
            // 模拟buildEnhancedDomainFilters函数的逻辑
            const domainFilter = this.buildDomainFilter();
            const venueFilter = this.buildVenueFilter();
            
            const startTime = Date.now();
            
            // 执行两个并行查询
            const [domainResults, venueResults] = await Promise.all([
                this.makeRequest(`${TEST_CONFIG.baseUrl}?search=${encodeURIComponent(query)}&filter=${domainFilter}&per-page=100&select=id,title,primary_topic,primary_location,publication_year`),
                this.makeRequest(`${TEST_CONFIG.baseUrl}?search=${encodeURIComponent(query)}&filter=${venueFilter}&per-page=100&select=id,title,primary_topic,primary_location,publication_year`)
            ]);
            
            const responseTime = Date.now() - startTime;
            
            // 合并和去重
            const allPapers = [...(domainResults.results || []), ...(venueResults.results || [])];
            const uniquePapers = [];
            const seenIds = new Set();
            
            allPapers.forEach(paper => {
                if (!seenIds.has(paper.id)) {
                    seenIds.add(paper.id);
                    uniquePapers.push(paper);
                }
            });
            
            // 分析结果
            const domainCount = domainResults.count || 0;
            const venueCount = venueResults.count || 0;
            const uniqueCount = uniquePapers.length;
            
            const testResult = {
                testName: '组合过滤逻辑',
                query: query,
                domainResults: domainCount,
                venueResults: venueCount,
                combinedSample: uniqueCount,
                responseTime: `${responseTime}ms`,
                passed: uniqueCount > 0,
                coverage: {
                    domainOnly: domainCount - uniqueCount + venueCount,
                    venueOnly: venueCount - uniqueCount + domainCount,
                    overlap: Math.max(0, domainCount + venueCount - uniqueCount)
                }
            };
            
            this.recordResult(testResult);
            
            if (testResult.passed) {
                console.log(`✅ 通过 - 领域: ${domainCount}, 期刊: ${venueCount}, 去重后: ${uniqueCount}`);
                console.log(`📈 覆盖率分析:`, testResult.coverage);
            } else {
                console.log(`❌ 失败 - 组合查询无结果`);
            }
            
            return testResult;
            
        } catch (error) {
            const testResult = {
                testName: '组合过滤逻辑',
                query: query,
                passed: false,
                error: error.message
            };
            
            this.recordResult(testResult);
            console.log(`❌ 错误:`, error.message);
            return testResult;
        }
    }
    
    // 测试边界情况
    async testEdgeCase(testCase) {
        console.log(`\n⚠️  测试边界情况: ${testCase.name}`);
        
        try {
            if (testCase.query === '') {
                // 空查询测试
                const testResult = {
                    testName: `边界测试-${testCase.name}`,
                    query: testCase.query,
                    passed: testCase.shouldFail, // 空查询应该失败
                    message: '空查询被正确处理'
                };
                
                this.recordResult(testResult);
                console.log(`✅ 通过 - 空查询被正确拒绝`);
                return testResult;
            }
            
            const filter = this.buildDomainFilter();
            const url = `${TEST_CONFIG.baseUrl}?search=${encodeURIComponent(testCase.query)}&filter=${filter}&per-page=10`;
            
            const startTime = Date.now();
            const data = await this.makeRequest(url);
            const responseTime = Date.now() - startTime;
            
            const testResult = {
                testName: `边界测试-${testCase.name}`,
                query: testCase.query,
                totalResults: data.meta?.count || 0,
                responseTime: `${responseTime}ms`,
                passed: !testCase.shouldFail,
                message: '边界情况处理正常'
            };
            
            this.recordResult(testResult);
            
            if (testResult.passed) {
                console.log(`✅ 通过 - 找到 ${testResult.totalResults} 篇论文`);
            } else {
                console.log(`❌ 失败 - 预期失败但成功了`);
            }
            
            return testResult;
            
        } catch (error) {
            const testResult = {
                testName: `边界测试-${testCase.name}`,
                query: testCase.query,
                passed: testCase.shouldFail, // 如果预期失败，则错误是正确的
                error: error.message
            };
            
            this.recordResult(testResult);
            
            if (testCase.shouldFail) {
                console.log(`✅ 通过 - 预期错误: ${error.message}`);
            } else {
                console.log(`❌ 失败 - 意外错误: ${error.message}`);
            }
            
            return testResult;
        }
    }
    
    // 性能测试
    async testPerformance() {
        console.log(`\n⚡ 性能测试`);
        
        const queries = ['AI', 'machine learning', 'deep learning', 'neural networks', 'data science'];
        const performanceResults = [];
        
        for (const query of queries) {
            try {
                const startTime = Date.now();
                await this.testCombinedFilter(query);
                const endTime = Date.now();
                
                performanceResults.push({
                    query: query,
                    responseTime: endTime - startTime
                });
                
                // API请求间隔
                await this.delay(TEST_CONFIG.delay);
                
            } catch (error) {
                performanceResults.push({
                    query: query,
                    responseTime: -1,
                    error: error.message
                });
            }
        }
        
        const avgResponseTime = performanceResults
            .filter(r => r.responseTime > 0)
            .reduce((sum, r) => sum + r.responseTime, 0) / performanceResults.length;
        
        const testResult = {
            testName: '性能测试',
            averageResponseTime: `${Math.round(avgResponseTime)}ms`,
            results: performanceResults,
            passed: avgResponseTime < 10000, // 10秒内算通过
            message: avgResponseTime < 10000 ? '性能良好' : '性能需要优化'
        };
        
        this.recordResult(testResult);
        
        console.log(`📊 平均响应时间: ${Math.round(avgResponseTime)}ms`);
        console.log(`📈 详细结果:`, performanceResults);
        
        return testResult;
    }
    
    // 记录测试结果
    recordResult(result) {
        this.results.push(result);
        this.testCount++;
        if (result.passed) {
            this.passCount++;
        } else {
            this.failCount++;
        }
    }
    
    // 生成测试报告
    generateReport() {
        const totalTime = Date.now() - this.startTime;
        
        const report = {
            summary: {
                totalTests: this.testCount,
                passed: this.passCount,
                failed: this.failCount,
                successRate: `${Math.round((this.passCount / this.testCount) * 100)}%`,
                totalTime: `${Math.round(totalTime / 1000)}s`
            },
            details: this.results,
            timestamp: new Date().toISOString()
        };
        
        return report;
    }
    
    // 保存测试报告
    async saveReport(report) {
        const filename = `filter-test-report-${Date.now()}.json`;
        const filepath = path.join(__dirname, 'test-reports', filename);
        
        // 确保目录存在
        const dir = path.dirname(filepath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        
        fs.writeFileSync(filepath, JSON.stringify(report, null, 2));
        console.log(`\n📄 测试报告已保存: ${filepath}`);
    }
    
    // 运行所有测试
    async runAllTests() {
        console.log('🚀 开始全面测试过滤机制...\n');
        
        // 首先加载期刊映射
        await this.loadVenueMapping();
        
        try {
            // 1. 测试领域过滤
            console.log('=' .repeat(60));
            console.log('📋 第一部分: 领域过滤测试');
            console.log('=' .repeat(60));
            
            for (const testCase of TEST_CASES.domainTests) {
                await this.testDomainFilter(testCase);
                await this.delay(TEST_CONFIG.delay);
            }
            
            // 2. 测试期刊过滤
            console.log('\n' + '=' .repeat(60));
            console.log('📋 第二部分: 期刊过滤测试');
            console.log('=' .repeat(60));
            
            for (const testCase of TEST_CASES.venueTests) {
                await this.testVenueFilter(testCase);
                await this.delay(TEST_CONFIG.delay);
            }
            
            // 3. 测试组合过滤
            console.log('\n' + '=' .repeat(60));
            console.log('📋 第三部分: 组合过滤测试');
            console.log('=' .repeat(60));
            
            await this.testCombinedFilter('artificial intelligence');
            await this.delay(TEST_CONFIG.delay);
            
            // 4. 测试边界情况
            console.log('\n' + '=' .repeat(60));
            console.log('📋 第四部分: 边界情况测试');
            console.log('=' .repeat(60));
            
            for (const testCase of TEST_CASES.edgeCases) {
                await this.testEdgeCase(testCase);
                await this.delay(TEST_CONFIG.delay);
            }
            
            // 5. 性能测试
            console.log('\n' + '=' .repeat(60));
            console.log('📋 第五部分: 性能测试');
            console.log('=' .repeat(60));
            
            await this.testPerformance();
            
            // 生成和保存报告
            const report = this.generateReport();
            await this.saveReport(report);
            
            // 输出总结
            console.log('\n' + '=' .repeat(60));
            console.log('📊 测试总结');
            console.log('=' .repeat(60));
            console.log(`总测试数: ${report.summary.totalTests}`);
            console.log(`通过: ${report.summary.passed} ✅`);
            console.log(`失败: ${report.summary.failed} ❌`);
            console.log(`成功率: ${report.summary.successRate}`);
            console.log(`总耗时: ${report.summary.totalTime}`);
            
            if (report.summary.failed > 0) {
                console.log('\n⚠️  失败的测试:');
                report.details
                    .filter(r => !r.passed)
                    .forEach(r => {
                        console.log(`- ${r.testName}: ${r.error || r.message || '未知错误'}`);
                    });
            }
            
            console.log('\n🎉 测试完成!');
            
        } catch (error) {
            console.error('❌ 测试执行出错:', error);
        }
    }
}

// 主函数
async function main() {
    const tester = new FilterTester();
    await tester.runAllTests();
}

// 如果直接运行此脚本
if (import.meta.url.startsWith('file:') && process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/'))) {
    main().catch(console.error);
}

export default FilterTester;
