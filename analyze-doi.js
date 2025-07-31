#!/usr/bin/env node

// 通过DOI分析论文的期刊/会议信息

// 从之前的结果收集到的DOI信息
const paperDOIs = [
  {
    title: "TypeDance: Creating Semantic Typographic Logos from Image through Personalized Generation",
    doi: "10.1145/3613904.3642185",
    year: 2024
  },
  {
    title: "Understanding and Supporting Formal Email Exchange by Answering AI-Generated Questions",
    doi: "10.48550/arxiv.2502.03804",
    year: 2025
  },
  {
    title: "Synthetic Human Memories: AI-Edited Images and Videos Can Implant False Memories and Distort Recollection",
    doi: "10.48550/arxiv.2409.08895",
    year: 2024
  },
  {
    title: "Human Creativity in the Age of LLMs: Randomized Experiments on Divergent and Convergent Thinking",
    doi: "10.48550/arxiv.2410.03703",
    year: 2024
  },
  {
    title: "SketchFlex: Facilitating Spatial-Semantic Coherence in Text-to-Image Generation with Region-Based Sketches",
    doi: "10.48550/arxiv.2502.07556",
    year: 2025
  },
  {
    title: "Letters from Future Self: Augmenting the Letter-Exchange Exercise with LLM-based Agents to Enhance Young Adults' Career Exploration",
    doi: "10.1145/3706598.3714206",
    year: 2025
  }
];

// ACM会议/期刊识别数据库
const acmVenues = {
  // CHI Conference on Human Factors in Computing Systems
  "3613904": { name: "CHI 2024", fullName: "CHI Conference on Human Factors in Computing Systems", type: "conference", year: 2024 },
  "3586183": { name: "CHI 2023", fullName: "CHI Conference on Human Factors in Computing Systems", type: "conference", year: 2023 },
  "3491102": { name: "CHI 2022", fullName: "CHI Conference on Human Factors in Computing Systems", type: "conference", year: 2022 },
  
  // CSCW
  "3706598": { name: "CSCW 2025", fullName: "Computer Supported Cooperative Work and Social Computing", type: "conference", year: 2025 },
  "3637383": { name: "CSCW 2024", fullName: "Computer Supported Cooperative Work and Social Computing", type: "conference", year: 2024 },
  
  // UIST
  "3701810": { name: "UIST 2024", fullName: "User Interface Software and Technology", type: "conference", year: 2024 },
  "3626570": { name: "UIST 2023", fullName: "User Interface Software and Technology", type: "conference", year: 2023 },
  
  // DIS
  "3656648": { name: "DIS 2024", fullName: "Designing Interactive Systems", type: "conference", year: 2024 },
  
  // SIGGRAPH
  "3687781": { name: "SIGGRAPH 2024", fullName: "Special Interest Group on Computer Graphics", type: "conference", year: 2024 },
  
  // IUI
  "3678823": { name: "IUI 2024", fullName: "Intelligent User Interfaces", type: "conference", year: 2024 },
  
  // TEI
  "3658985": { name: "TEI 2024", fullName: "Tangible, Embedded, and Embodied Interaction", type: "conference", year: 2024 }
};

// arXiv分类信息
const arxivCategories = {
  "cs.": "Computer Science",
  "cs.HC": "Human-Computer Interaction",
  "cs.AI": "Artificial Intelligence",
  "cs.CV": "Computer Vision and Pattern Recognition",
  "cs.CL": "Computation and Language",
  "cs.LG": "Machine Learning",
  "cs.GR": "Graphics",
  "cs.MM": "Multimedia",
  "stat.": "Statistics",
  "eess.": "Electrical Engineering and Systems Science",
  "q-bio.": "Quantitative Biology"
};

function analyzeDOI(paper) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`📄 ${paper.title.substring(0, 60)}${paper.title.length > 60 ? '...' : ''}`);
  console.log(`📄 DOI: ${paper.doi}`);
  console.log(`${'='.repeat(80)}`);
  
  if (paper.doi.startsWith("10.1145/")) {
    // ACM数字图书馆
    const doiPart = paper.doi.replace("10.1145/", ""); // 移除前缀
    const parts = doiPart.split("."); // 按点分割
    const proceeding = parts[0]; // 例如: 3613904
    const articleId = parts[1];   // 例如: 3642185
    
    console.log(`🏛️  发表平台: ACM Digital Library`);
    console.log(`📚 会议ID: ${proceeding}`);
    console.log(`📄 论文ID: ${articleId}`);
    
    // 查找具体会议
    if (acmVenues[proceeding]) {
      const venue = acmVenues[proceeding];
      console.log(`\n🎯 识别的会议:`);
      console.log(`   📋 会议名称: ${venue.name}`);
      console.log(`   📝 完整名称: ${venue.fullName}`);
      console.log(`   🏷️  类型: ${venue.type}`);
      console.log(`   📅 年份: ${venue.year}`);
      
      // 判断会议级别
      if (venue.name.includes("CHI") || venue.name.includes("UIST") || venue.name.includes("SIGGRAPH")) {
        console.log(`   ⭐ 级别: 顶级会议 (A类)`);
      } else if (venue.name.includes("CSCW") || venue.name.includes("DIS") || venue.name.includes("IUI")) {
        console.log(`   ⭐ 级别: 高质量会议 (A/B类)`);
      }
      
    } else {
      console.log(`\n❓ 未识别的ACM会议 (会议ID: ${proceeding})`);
      console.log(`   💡 这可能是一个新会议或期刊`);
      console.log(`   🔍 建议查询: https://dl.acm.org/doi/${paper.doi}`);
    }
    
  } else if (paper.doi.startsWith("10.48550/arxiv.")) {
    // arXiv预印本
    const arxivId = paper.doi.split("arxiv.")[1]; // 例如: 2502.03804
    const year = "20" + arxivId.substring(0, 2);   // 例如: 2025
    const month = arxivId.substring(2, 4);         // 例如: 02
    
    console.log(`🏛️  发表平台: arXiv (Cornell University)`);
    console.log(`📋 arXiv ID: ${arxivId}`);
    console.log(`📅 提交时间: ${year}年${month}月`);
    console.log(`🏷️  类型: 预印本 (preprint)`);
    
    // 分析可能的分类
    console.log(`\n🔍 可能的研究领域:`);
    console.log(`   💻 计算机科学相关 (cs.*)`);
    console.log(`   🤖 可能涉及: AI, HCI, CV, CL等子领域`);
    console.log(`   📊 状态: 可能正在同行评议或准备会议投稿`);
    
  } else {
    console.log(`❓ 未识别的DOI格式`);
    console.log(`📋 发表商: ${paper.doi.split("/")[0]}`);
  }
  
  // 预测实际会议
  console.log(`\n💡 预测分析:`);
  if (paper.title.toLowerCase().includes("typographic") || paper.title.toLowerCase().includes("logo")) {
    console.log(`   🎨 可能适合: CHI, SIGGRAPH, DIS (设计相关)`);
  }
  if (paper.title.toLowerCase().includes("email") || paper.title.toLowerCase().includes("communication")) {
    console.log(`   💬 可能适合: CSCW, CHI (协作通信)`);
  }
  if (paper.title.toLowerCase().includes("memory") || paper.title.toLowerCase().includes("cognitive")) {
    console.log(`   🧠 可能适合: CHI, CogSci (认知科学)`);
  }
  if (paper.title.toLowerCase().includes("creativity") || paper.title.toLowerCase().includes("llm")) {
    console.log(`   🤖 可能适合: CHI, IUI, AAAI (AI+HCI)`);
  }
  if (paper.title.toLowerCase().includes("sketch") || paper.title.toLowerCase().includes("image generation")) {
    console.log(`   🎨 可能适合: SIGGRAPH, CHI, UIST (图形交互)`);
  }
  if (paper.title.toLowerCase().includes("career") || paper.title.toLowerCase().includes("education")) {
    console.log(`   🎓 可能适合: CHI, CSCW, L@S (教育技术)`);
  }
}

function main() {
  console.log('🔍 通过DOI分析论文期刊/会议信息');
  console.log('🎯 目标: 识别具体的发表平台和会议级别\n');
  
  paperDOIs.forEach(paper => {
    analyzeDOI(paper);
  });
  
  console.log(`\n\n${'='.repeat(80)}`);
  console.log('📊 DOI分析总结');
  console.log(`${'='.repeat(80)}`);
  
  const acmCount = paperDOIs.filter(p => p.doi.startsWith("10.1145/")).length;
  const arxivCount = paperDOIs.filter(p => p.doi.startsWith("10.48550/arxiv.")).length;
  
  console.log(`📈 平台分布:`);
  console.log(`   🏛️  ACM Digital Library: ${acmCount} 篇 (${(acmCount/paperDOIs.length*100).toFixed(1)}%)`);
  console.log(`   📋 arXiv 预印本: ${arxivCount} 篇 (${(arxivCount/paperDOIs.length*100).toFixed(1)}%)`);
  
  console.log(`\n💡 关键洞察:`);
  console.log(`   • ACM DOI表明这些论文来自高质量HCI会议`);
  console.log(`   • arXiv论文可能正在准备正式发表`);
  console.log(`   • 大部分论文都是2024-2025年的最新研究`);
  console.log(`   • 研究领域集中在HCI、AI、设计交叉领域`);
}

main();