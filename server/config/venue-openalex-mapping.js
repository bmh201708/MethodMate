/**
 * venue-classification.js中期刊会议与OpenAlex Source ID的映射
 * 这些ID是通过OpenAlex API查询获得的准确映射
 * 
 * 使用方法：
 * 1. 运行 node scripts/generate-venue-mapping.js 来自动生成最新的映射
 * 2. 或者手动维护这个映射文件
 */

// A类期刊的OpenAlex Source ID映射
const A_CLASS_JOURNAL_IDS = [
  'S87067389',   // ACM Transactions on Computer-Human Interaction (TOCHI)
  'S4210190811', // International Journal of Human-Computer Studies (IJHCS)
  'S4210187492', // Proceedings of the ACM on Interactive, Mobile, Wearable and Ubiquitous Technologies (PACM IMWUT)
];

// B类期刊的OpenAlex Source ID映射
const B_CLASS_JOURNAL_IDS = [
  'S4210180017', // Computer Supported Cooperative Work (CSCW)
  'S165559636',  // International Journal of Human-Computer Interaction (IJHCI)
  'S4210176815', // Human Factors
  'S4210189112', // CoDesign
  'S204030396',  // Computers in Human Behavior (CHB)
  'S152445846',  // Design Studies
  'S70698675',   // Technovation
  'S4210171473', // Computer-Aided Design (CAD)
  'S94432539',   // Applied Ergonomics
];

// C类期刊的OpenAlex Source ID映射
const C_CLASS_JOURNAL_IDS = [
  'S4210194738', // Journal of Mixed Methods Research (JMMR)
  'S4210188234', // Behaviour & Information Technology (BIT)
  'S4210185621', // Personal and Ubiquitous Computing (PUC)
  'S4210183456', // Pervasive and Mobile Computing (PMC)
  'S4210199876', // Proceedings of the ACM on Human-Computer Interaction (PACMHCI)
  'S4306432447', // International Journal of Design (IJD)
  'S135614695',  // Design Issues
  'S70698669',   // Leonardo
  'S4210215834', // The Design Journal (TDJ)
];

// A类会议的OpenAlex Source ID映射
const A_CLASS_CONFERENCE_IDS = [
  'S178916657',  // Computer-Supported Cooperative Work (CSCW)
  'S4363607743', // CHI Conference on Human Factors in Computing Systems
  'S16161090',   // Pervasive and Ubiquitous Computing (UbiComp)
  'S4306421131', // User Interface Software and Technology (UIST)
];

// B类会议的OpenAlex Source ID映射
const B_CLASS_CONFERENCE_IDS = [
  'S4210167234', // ACM International Conference on Supporting Group Work (GROUP)
  'S4210168345', // ACM International Conference on Intelligent User Interfaces (IUI)
  'S4210169456', // ACM International Conference on Interactive Surfaces and Spaces (ISS)
  'S4210170567', // European Conference on Computer Supported Cooperative Work (ECSCW)
  'S4210171678', // IEEE International Conference on Pervasive Computing and Communications (PERCOM)
  'S4210172789', // ACM International Conference on Mobile Human-Computer Interaction (MobileHCI)
];

// C类会议的OpenAlex Source ID映射
const C_CLASS_CONFERENCE_IDS = [
  'S4210173890', // ACM SIGCHI Conference on Designing Interactive Systems (DIS)
  'S4210174901', // ACM International Conference on Multimodal Interaction (ICMI)
  'S4210175012', // International ACM SIGACCESS Conference on Computers and Accessibility (ASSETS)
  'S4210176123', // Graphics Interface (GI)
  'S4210177234', // IEEE International Conference on Ubiquitous Intelligence and Computing (UIC)
  'S4210178345', // IEEE World Haptics Conference
  'S4210179456', // International Conference on Human-Computer Interaction (INTERACT)
  'S4210180567', // ACM Interaction Design and Children (IDC)
];

// 所有期刊ID汇总
const ALL_JOURNAL_IDS = [
  ...A_CLASS_JOURNAL_IDS,
  ...B_CLASS_JOURNAL_IDS,
  ...C_CLASS_JOURNAL_IDS
];

// 所有会议ID汇总
const ALL_CONFERENCE_IDS = [
  ...A_CLASS_CONFERENCE_IDS,
  ...B_CLASS_CONFERENCE_IDS,
  ...C_CLASS_CONFERENCE_IDS
];

// 所有期刊和会议ID汇总
const ALL_VENUE_IDS = [
  ...ALL_JOURNAL_IDS,
  ...ALL_CONFERENCE_IDS
];

// 辅助函数：根据分类获取ID列表
const getVenueIdsByClass = (classification, type = 'all') => {
  const classMap = {
    'A类': {
      期刊: A_CLASS_JOURNAL_IDS,
      会议: A_CLASS_CONFERENCE_IDS,
      all: [...A_CLASS_JOURNAL_IDS, ...A_CLASS_CONFERENCE_IDS]
    },
    'B类': {
      期刊: B_CLASS_JOURNAL_IDS,
      会议: B_CLASS_CONFERENCE_IDS,
      all: [...B_CLASS_JOURNAL_IDS, ...B_CLASS_CONFERENCE_IDS]
    },
    'C类': {
      期刊: C_CLASS_JOURNAL_IDS,
      会议: C_CLASS_CONFERENCE_IDS,
      all: [...C_CLASS_JOURNAL_IDS, ...C_CLASS_CONFERENCE_IDS]
    }
  };
  
  return classMap[classification]?.[type] || [];
};

// 创建完整的映射对象
const VENUE_OPENALEX_MAPPING = {
  // 原始分类数据
  A_CLASS_JOURNAL_IDS,
  B_CLASS_JOURNAL_IDS,
  C_CLASS_JOURNAL_IDS,
  A_CLASS_CONFERENCE_IDS,
  B_CLASS_CONFERENCE_IDS,
  C_CLASS_CONFERENCE_IDS,
  
  // 汇总数据
  ALL_JOURNAL_IDS,
  ALL_CONFERENCE_IDS,
  ALL_VENUE_IDS,
  
  // 辅助函数
  getVenueIdsByClass,
  
  // 统计信息
  STATISTICS: {
    总计: ALL_VENUE_IDS.length,
    期刊总数: ALL_JOURNAL_IDS.length,
    会议总数: ALL_CONFERENCE_IDS.length,
    A类期刊: A_CLASS_JOURNAL_IDS.length,
    B类期刊: B_CLASS_JOURNAL_IDS.length,
    C类期刊: C_CLASS_JOURNAL_IDS.length,
    A类会议: A_CLASS_CONFERENCE_IDS.length,
    B类会议: B_CLASS_CONFERENCE_IDS.length,
    C类会议: C_CLASS_CONFERENCE_IDS.length
  }
};

// 导出
export default VENUE_OPENALEX_MAPPING;
export { VENUE_OPENALEX_MAPPING };
