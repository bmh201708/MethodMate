#!/usr/bin/env node

// 查看6篇论文在OpenAlex中的期刊信息

const OPENALEX_API_BASE = 'https://api.openalex.org';

const papers = [
  "TypeDance: Creating Semantic Typographic Logos from Image through Personalized Generation",
  "Understanding and Supporting Formal Email Exchange by Answering AI-Generated Questions",
  "Synthetic Human Memories: AI-Edited Images and Videos Can Implant False Memories and Distort Recollection",
  "Human Creativity in the Age of LLMs: Randomized Experiments on Divergent and Convergent Thinking",
  "SketchFlex: Facilitating Spatial-Semantic Coherence in Text-to-Image Generation with Region-Based Sketches",
  "Letters from Future Self: Augmenting the Letter-Exchange Exercise with LLM-based Agents to Enhance Young Adults' Career Exploration"
];

async function checkPaperJournal(title, index) {
  console.log(`\n${index + 1}. 📄 ${title.substring(0, 60)}${title.length > 60 ? '...' : ''}`);
  console.log('-'.repeat(80));
  
  try {
    // 搜索论文
    const searchUrl = `${OPENALEX_API_BASE}/works?search=${encodeURIComponent(`"${title}"`)}&per-page=3&select=id,title,display_name,publication_year,primary_location,locations,doi`;
    
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
      // 查找最匹配的论文
      let bestMatch = null;
      let bestSimilarity = 0;
      
      for (const paper of data.results) {
        const paperTitle = paper.title || paper.display_name || '';
        const similarity = calculateTitleSimilarity(paperTitle, title);
        if (similarity > bestSimilarity) {
          bestSimilarity = similarity;
          bestMatch = paper;
        }
      }
      
      if (bestMatch && bestSimilarity > 0.8) {
        console.log(`📝 标题: ${bestMatch.title || bestMatch.display_name}`);
        console.log(`📅 年份: ${bestMatch.publication_year || '未知'}`);
        console.log(`🔗 OpenAlex ID: ${bestMatch.id}`);
        if (bestMatch.doi) {
          console.log(`📄 DOI: ${bestMatch.doi}`);
        }
        
        // 主要发表位置
        if (bestMatch.primary_location) {
          const venue = bestMatch.primary_location.source;
          console.log(`\n📖 主要期刊/会议:`);
          console.log(`   名称: ${venue?.display_name || '未知'}`);
          console.log(`   类型: ${venue?.type || '未知'}`);
          console.log(`   OpenAlex ID: ${venue?.id || '未知'}`);
          if (venue?.issn) {
            console.log(`   ISSN: ${Array.isArray(venue.issn) ? venue.issn.join(', ') : venue.issn}`);
          }
          if (venue?.host_organization_name) {
            console.log(`   出版社: ${venue.host_organization_name}`);
          }
        }
        
        // 所有发表位置
        if (bestMatch.locations && bestMatch.locations.length > 1) {
          console.log(`\n📚 所有发表位置 (${bestMatch.locations.length}个):`);
          bestMatch.locations.forEach((location, idx) => {
            if (location.source) {
              console.log(`   ${idx + 1}. ${location.source.display_name || '未知'} (${location.source.type || '未知类型'})`);
            }
          });
        }
        
      } else {
        console.log('❌ 未找到匹配的论文');
      }
    } else {
      console.log('❌ 搜索无结果');
    }
    
  } catch (error) {
    console.error(`❌ 查询失败: ${error.message}`);
  }
}

// 计算标题相似度
function calculateTitleSimilarity(title1, title2) {
  const normalize = (str) => str.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
  
  const words1 = normalize(title1).split(' ');
  const words2 = normalize(title2).split(' ');
  
  const intersection = words1.filter(word => words2.includes(word));
  const union = [...new Set([...words1, ...words2])];
  
  return intersection.length / union.length;
}

async function main() {
  console.log('📚 查看6篇论文在OpenAlex中的期刊/会议信息');
  console.log('🎯 目标: 了解论文的发表平台和类型');
  
  for (let i = 0; i < papers.length; i++) {
    await checkPaperJournal(papers[i], i);
    
    // 添加延迟避免API限制
    if (i < papers.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  console.log('\n' + '='.repeat(80));
  console.log('📊 总结: 通过期刊信息可以了解论文的发表平台特征');
  console.log('='.repeat(80));
}

main().catch(console.error);