#!/usr/bin/env node

/**
 * Coze Google Scholar 插件设置脚本
 * 帮助用户快速配置和测试插件
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class PluginSetup {
  constructor() {
    this.config = {
      domain: '',
      pluginName: 'Google Scholar 文献搜索',
      pluginDescription: '在Google Scholar上搜索学术文献，支持下载和阅读全文'
    };
  }

  async run() {
    console.log('🚀 欢迎使用 Coze Google Scholar 插件设置工具');
    console.log('===================================\n');

    try {
      await this.collectUserInput();
      await this.generateConfig();
      await this.showInstructions();
    } catch (error) {
      console.error('❌ 设置过程中出现错误:', error.message);
    } finally {
      rl.close();
    }
  }

  async collectUserInput() {
    this.config.domain = await this.question('📝 请输入你的Vercel域名 (例如: your-app.vercel.app): ');
    
    const customName = await this.question('📝 插件名称 (直接回车使用默认值): ');
    if (customName.trim()) {
      this.config.pluginName = customName.trim();
    }

    const customDesc = await this.question('📝 插件描述 (直接回车使用默认值): ');
    if (customDesc.trim()) {
      this.config.pluginDescription = customDesc.trim();
    }
  }

  async generateConfig() {
    console.log('\n⚙️  正在生成配置文件...');

    // 生成更新后的YAML配置
    const yamlContent = this.generateYamlConfig();
    
    // 确保目录存在
    const pluginDir = path.join(process.cwd(), 'coze-plugins');
    if (!fs.existsSync(pluginDir)) {
      fs.mkdirSync(pluginDir, { recursive: true });
    }

    // 写入配置文件
    const yamlPath = path.join(pluginDir, 'google-scholar-plugin.yaml');
    fs.writeFileSync(yamlPath, yamlContent, 'utf8');
    
    console.log('✅ 配置文件已生成:', yamlPath);

    // 生成测试脚本
    const testScript = this.generateTestScript();
    const testPath = path.join(process.cwd(), 'test-plugin.js');
    fs.writeFileSync(testPath, testScript, 'utf8');
    
    console.log('✅ 测试脚本已生成:', testPath);
  }

  generateYamlConfig() {
    return `openapi: 3.0.3
info:
  title: ${this.config.pluginName}
  description: ${this.config.pluginDescription}
  version: 1.0.0
  contact:
    name: Google Scholar Plugin
    email: support@example.com

servers:
  - url: https://${this.config.domain}/api
    description: 生产环境API服务器

paths:
  /scholar-search:
    post:
      summary: 搜索学术文献
      description: 在Google Scholar上搜索学术文献，返回相关论文列表
      operationId: searchScholarPapers
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - query
              properties:
                query:
                  type: string
                  description: 搜索关键词或论文标题
                  example: "深度学习 自然语言处理"
                num_results:
                  type: integer
                  description: 返回结果数量，默认10篇
                  minimum: 1
                  maximum: 50
                  default: 10
                  example: 10
                lang:
                  type: string
                  description: 搜索语言，默认中文
                  enum: ["zh-CN", "en", "ja", "ko"]
                  default: "zh-CN"
                  example: "zh-CN"
      responses:
        '200':
          description: 搜索成功

  /paper-download:
    post:
      summary: 获取文献下载链接
      description: 获取学术论文的多种下载渠道和阅读方式
      operationId: downloadPaper
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                paper_url:
                  type: string
                  description: 论文原始URL
                doi:
                  type: string
                  description: 论文DOI号
                title:
                  type: string
                  description: 论文标题
      responses:
        '200':
          description: 获取下载链接成功

x-plugin-manifest:
  name_for_human: "${this.config.pluginName}"
  name_for_model: "google_scholar_search"
  description_for_human: "${this.config.pluginDescription}"
  description_for_model: "这是一个学术文献搜索插件，可以搜索Google Scholar数据库中的论文，并提供多种下载渠道包括Sci-Hub、arXiv、PubMed等。"
  auth:
    type: none
  api:
    type: openapi
    url: https://${this.config.domain}/api/scholar-search
  logo_url: https://scholar.google.com/favicon.ico
  contact_email: support@example.com
  legal_info_url: https://${this.config.domain}/legal`;
  }

  generateTestScript() {
    return `#!/usr/bin/env node

/**
 * 插件测试脚本
 * 用于测试 Google Scholar 插件的功能
 */

const https = require('https');
const http = require('http');

const API_BASE = 'https://${this.config.domain}/api';

class PluginTester {
  async testSearchAPI() {
    console.log('🔍 测试文献搜索API...');
    
    const testData = {
      query: '深度学习',
      num_results: 3,
      lang: 'zh-CN'
    };

    try {
      const result = await this.makeRequest('/scholar-search', testData);
      if (result.success) {
        console.log('✅ 搜索API测试成功');
        console.log(\`找到 \${result.total_results} 篇论文\`);
        result.results.forEach((paper, index) => {
          console.log(\`  \${index + 1}. \${paper.title}\`);
        });
        return result.results[0];
      } else {
        console.log('❌ 搜索API测试失败:', result.error);
        return null;
      }
    } catch (error) {
      console.log('❌ 搜索API测试出错:', error.message);
      return null;
    }
  }

  async testDownloadAPI(paper) {
    if (!paper) return;

    console.log('\\n📥 测试文献下载API...');
    
    const testData = {
      paper_url: paper.scholar_url,
      doi: paper.doi,
      title: paper.title
    };

    try {
      const result = await this.makeRequest('/paper-download', testData);
      if (result.success) {
        console.log('✅ 下载API测试成功');
        console.log(\`找到 \${result.download_sources.length} 个下载源\`);
      } else {
        console.log('❌ 下载API测试失败:', result.error);
      }
    } catch (error) {
      console.log('❌ 下载API测试出错:', error.message);
    }
  }

  async makeRequest(endpoint, data) {
    return new Promise((resolve, reject) => {
      const url = API_BASE + endpoint;
      const urlObj = new URL(url);
      const isHttps = urlObj.protocol === 'https:';
      const client = isHttps ? https : http;

      const postData = JSON.stringify(data);
      
      const options = {
        hostname: urlObj.hostname,
        port: urlObj.port || (isHttps ? 443 : 80),
        path: urlObj.pathname,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      };

      const req = client.request(options, (res) => {
        let responseData = '';
        
        res.on('data', (chunk) => {
          responseData += chunk;
        });
        
        res.on('end', () => {
          try {
            const result = JSON.parse(responseData);
            resolve(result);
          } catch (error) {
            reject(new Error('响应解析失败: ' + error.message));
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.write(postData);
      req.end();
    });
  }

  async run() {
    console.log('🧪 开始测试 Google Scholar 插件');
    console.log('=========================\\n');

    const firstPaper = await this.testSearchAPI();
    await this.testDownloadAPI(firstPaper);

    console.log('\\n🎉 测试完成!');
  }
}

new PluginTester().run().catch(console.error);`;
  }

  async showInstructions() {
    console.log('\n🎯 接下来的步骤:');
    console.log('==============');
    console.log('1. 将代码部署到 Vercel:');
    console.log('   - git init');
    console.log('   - git add .');
    console.log('   - git commit -m "Initial commit"');
    console.log('   - 在 Vercel 中导入项目');
    
    console.log('\n2. 测试 API 端点:');
    console.log('   - npm run test');
    
    console.log('\n3. 在 Coze 中创建插件:');
    console.log('   - 登录 https://www.coze.cn/');
    console.log('   - 进入插件管理页面');
    console.log('   - 选择"导入"方式');
    console.log('   - 上传 coze-plugins/google-scholar-plugin.yaml');
    
    console.log('\n📚 详细文档: docs/README.md');
    console.log('\n✨ 祝您使用愉快！');
  }

  question(prompt) {
    return new Promise((resolve) => {
      rl.question(prompt, (answer) => {
        resolve(answer);
      });
    });
  }
}

// 运行设置程序
new PluginSetup().run(); 