#!/usr/bin/env node

// 分析被过滤论文的OpenAlex分类

const OPENALEX_API_BASE = 'https://api.openalex.org';

const filteredPapers = [
  "Understanding and Supporting Formal Email Exchange by Answering AI-Generated Questions",
  "Synthetic Human Memories: AI-Edited Images and Videos Can Implant False Memories and Distort Recollection"
];

async function analyzePaperClassification(title) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`📄 论文: ${title}`);
  console.log(`${'='.repeat(80)}`);
  
  try {
    // 搜索论文（不带过滤条件）
    const searchUrl = `${OPENALEX_API_BASE}/works?search=${encodeURIComponent(`"${title}"`)}&per-page=5&select=id,title,display_name,publication_year,primary_topic,topics`;
    
    console.log('🔍 搜索论文分类信息...');
    
    const response = await fetch(searchUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'MethodMate/1.0 (Research Tool Test)'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const paper = data.results[0]; // 取第一个最匹配的结果
      
      console.log('\n📊 论文分类信息:');
      console.log(`   📝 标题: ${paper.title || paper.display_name}`);
      console.log(`   📅 年份: ${paper.publication_year || '未知'}`);
      
      if (paper.primary_topic) {
        console.log('\n🎯 主要主题 (Primary Topic):');
        console.log(`   🏷️  主题: ${paper.primary_topic.display_name || '未知'}`);
        console.log(`   🔢 主题ID: ${paper.primary_topic.id || '未知'}`);
        
        if (paper.primary_topic.field) {
          console.log(`   🌐 领域: ${paper.primary_topic.field.display_name || '未知'}`);
          console.log(`   🔢 领域ID: ${paper.primary_topic.field.id || '未知'}`);
        }
        
        if (paper.primary_topic.subfield) {
          console.log(`   📂 子领域: ${paper.primary_topic.subfield.display_name || '未知'}`);
          console.log(`   🔢 子领域ID: ${paper.primary_topic.subfield.id || '未知'}`);
        }
      }
      
      // 检查是否符合我们的过滤条件
      const targetFieldIds = ['17', '12', '32', '33'];
      const paperFieldId = paper.primary_topic?.field?.id;
      const isInTargetFields = targetFieldIds.includes(paperFieldId);
      
      console.log('\n🔍 过滤条件分析:');
      console.log(`   🎯 目标领域IDs: ${targetFieldIds.join(', ')} (CS, Arts, Psychology, Social Sciences)`);
      console.log(`   📍 论文领域ID: ${paperFieldId || '未知'}`);
      console.log(`   ✅ 符合过滤条件: ${isInTargetFields ? '是' : '否'}`);
      
      if (!isInTargetFields) {
        console.log('\n❌ 被过滤原因:');
        console.log(`   该论文的主要领域 (${paper.primary_topic?.field?.display_name || '未知'}) 不在目标领域范围内`);
        
        // 提供可能的解决方案
        console.log('\n💡 可能的解决方案:');
        if (paperFieldId) {
          console.log(`   1. 将领域ID ${paperFieldId} 添加到过滤条件中`);
        }
        console.log(`   2. 检查论文是否有其他相关主题分类`);
        console.log(`   3. 考虑放宽过滤条件或使用主题级别过滤`);
      }
      
      // 显示所有相关主题
      if (paper.topics && paper.topics.length > 0) {
        console.log('\n🏷️  所有相关主题:');
        paper.topics.slice(0, 5).forEach((topic, index) => {
          console.log(`   ${index + 1}. ${topic.display_name} (${topic.id})`);
          if (topic.field) {
            console.log(`      领域: ${topic.field.display_name} (${topic.field.id})`);
          }
        });
      }
      
    } else {
      console.log('❌ 未找到论文');
    }
    
  } catch (error) {
    console.error(`❌ 分析失败: ${error.message}`);
  }
}

async function main() {
  console.log('🔍 分析被过滤论文的OpenAlex分类');
  console.log('📊 目标: 理解为什么HCI论文被领域过滤排除');
  
  for (const title of filteredPapers) {
    await analyzePaperClassification(title);
    
    // 添加延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n📋 总结:');
  console.log('通过分析可以了解OpenAlex如何分类这些论文，以及为什么它们不符合当前的领域过滤条件。');
}

main().catch(console.error);