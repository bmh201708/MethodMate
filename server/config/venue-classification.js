/**
 * HCI领域期刊和会议分类数据
 * 根据学术影响力和重要性进行分类
 * 
 * 分类说明：
 * A类：顶级期刊/会议，学术影响力最高
 * B类：优秀期刊/会议，学术影响力较高  
 * C类：良好期刊/会议，有一定学术影响力
 */

// A类期刊（顶级）
const A_CLASS_JOURNALS = [
  {
    序号: 1,
    刊物简称: 'TOCHI',
    刊物全称: 'ACM Transactions on Computer-Human Interaction',
    出版社: 'ACM',
    网址: 'http://dblp.uni-trier.de/db/journals/tochi/'
  },
  {
    序号: 2,
    刊物简称: 'IJHCS',
    刊物全称: 'International Journal of Human-Computer Studies',
    出版社: 'Elsevier',
    网址: 'http://dblp.uni-trier.de/db/journals/ijmms/'
  },
  {
    序号: 3,
    刊物简称: 'PACM IMWUT',
    刊物全称: 'Proceedings of the ACM on Interactive, Mobile, Wearable and Ubiquitous Technologies',
    出版社: 'ACM',
    网址: ''
  }
];

// B类期刊（优秀）
const B_CLASS_JOURNALS = [
  {
    序号: 1,
    刊物简称: 'CSCW',
    刊物全称: 'Computer Supported Cooperative Work',
    出版社: 'Springer',
    网址: 'http://dblp.uni-trier.de/db/journals/cscw/'
  },
  {
    序号: 2,
    刊物简称: 'HCI',
    刊物全称: 'Human-Computer Interaction',
    出版社: 'Taylor & Francis',
    网址: 'http://dblp.uni-trier.de/db/journals/hhci/'
  },
  {
    序号: 3,
    刊物简称: '',
    刊物全称: 'IEEE Transactions on Human-Machine Systems',
    出版社: 'IEEE',
    网址: 'http://dblp.uni-trier.de/db/journals/thms/'
  },
  {
    序号: 4,
    刊物简称: 'IWC',
    刊物全称: 'Interacting with Computers',
    出版社: 'Oxford University Press',
    网址: 'http://dblp.uni-trier.de/db/journals/iwc/'
  },
  {
    序号: 5,
    刊物简称: 'IJHCI',
    刊物全称: 'International Journal of Human-Computer Interaction',
    出版社: 'Taylor & Francis',
    网址: 'http://dblp.uni-trier.de/db/journals/ijhci/'
  },
  {
    序号: 6,
    刊物简称: 'UMUAI',
    刊物全称: 'User Modeling and User-Adapted Interaction',
    出版社: 'Springer',
    网址: 'http://dblp.uni-trier.de/db/journals/umuai/'
  },
  {
    序号: 7,
    刊物简称: 'TSMC',
    刊物全称: 'IEEE Transactions on Systems, Man, and Cybernetics: Systems',
    出版社: 'IEEE',
    网址: 'https://dblp.org/db/journals/tsmc/tsmc12.html',
    标注: '红色标注'
  },
  {
    序号: 8,
    刊物简称: 'TAC',
    刊物全称: 'IEEE Transactions on Affective Computing',
    出版社: 'IEEE',
    网址: ''
  },
  {
    序号: 9,
    刊物简称: 'VR',
    刊物全称: 'Virtual Reality',
    出版社: 'Springer',
    网址: ''
  }
];

// C类期刊（良好）
const C_CLASS_JOURNALS = [
  {
    序号: 1,
    刊物简称: 'BIT',
    刊物全称: 'Behaviour & Information Technology',
    出版社: 'Taylor & Francis',
    网址: 'http://dblp.uni-trier.de/db/journals/behaviourIT/'
  },
  {
    序号: 2,
    刊物简称: 'PUC',
    刊物全称: 'Personal and Ubiquitous Computing',
    出版社: 'Springer',
    网址: 'http://dblp.uni-trier.de/db/journals/puc/'
  },
  {
    序号: 3,
    刊物简称: 'PMC',
    刊物全称: 'Pervasive and Mobile Computing',
    出版社: 'Elsevier',
    网址: 'http://dblp.uni-trier.de/db/journals/percom/'
  },
  {
    序号: 4,
    刊物简称: 'PACMHCI',
    刊物全称: 'Proceedings of the ACM on Human-Computer Interaction',
    出版社: 'ACM',
    网址: 'https://dblp.org/db/journals/pacmhci/index.html',
    标注: '红色标注'
  },
  {
    序号: 5,
    刊物简称: 'CHB',
    刊物全称: 'Computers in Human Behavior',
    出版社: 'Elsevier',
    网址: ''
  },
  {
    序号: 6,
    刊物简称: 'CoDesign',
    刊物全称: 'CoDesign-International Journal of CoCreation in Design and the Arts',
    出版社: 'Taylor & Francis',
    网址: ''
  },
  {
    序号: 7,
    刊物简称: '',
    刊物全称: 'Technovation',
    出版社: 'Elsevier',
    网址: ''
  },
  {
    序号: 8,
    刊物简称: '',
    刊物全称: 'Design Studies',
    出版社: 'Elsevier',
    网址: ''
  },
  {
    序号: 9,
    刊物简称: 'JMMR',
    刊物全称: 'Journal of Mixed Methods Research',
    出版社: 'SAGE',
    网址: ''
  },
  {
    序号: 10,
    刊物简称: '',
    刊物全称: 'Design Issues',
    出版社: 'MIT Press',
    网址: ''
  },
  {
    序号: 11,
    刊物简称: 'CAD',
    刊物全称: 'Computer-Aided Design',
    出版社: 'Elsevier',
    网址: ''
  },
  {
    序号: 12,
    刊物简称: '',
    刊物全称: 'Applied Ergonomics',
    出版社: 'Elsevier',
    网址: ''
  },
  {
    序号: 13,
    刊物简称: 'IJD',
    刊物全称: 'International Journal of Design',
    出版社: 'National Taiwan University of Science and Technology',
    网址: ''
  },
  {
    序号: 14,
    刊物简称: '',
    刊物全称: 'Human Factors',
    出版社: 'SAGE',
    网址: ''
  },
  {
    序号: 15,
    刊物简称: '',
    刊物全称: 'Leonardo',
    出版社: 'MIT Press',
    网址: ''
  },
  {
    序号: 16,
    刊物简称: 'TDJ',
    刊物全称: 'The Design Journal',
    出版社: 'Taylor & Francis',
    网址: ''
  },
  {
    序号: 17,
    刊物简称: 'IJIMT',
    刊物全称: 'International Journal of Interactive Mobile Technologies',
    出版社: 'International Association of Online Engineering',
    网址: ''
  },
  {
    序号: 18,
    刊物简称: 'Frontiers VR',
    刊物全称: 'Frontiers in Virtual Reality',
    出版社: 'Frontiers Media',
    网址: ''
  },
  {
    序号: 19,
    刊物简称: 'UAIS',
    刊物全称: 'Universal Access in the Information Society',
    出版社: 'Springer',
    网址: ''
  },
  {
    序号: 20,
    刊物简称: 'MTI',
    刊物全称: 'Multimodal Technologies and Interaction',
    出版社: 'MDPI',
    网址: ''
  }
];

// A类会议（顶级）
const A_CLASS_CONFERENCES = [
  {
    序号: 1,
    会议简称: 'CSCW',
    会议全称: 'ACM Conference On Computer-Supported Cooperative Work And Social Computing',
    出版社: 'ACM',
    网址: 'http://dblp.uni-trier.de/db/conf/cscw'
  },
  {
    序号: 2,
    会议简称: 'CHI',
    会议全称: 'ACM Conference on Human Factors in Computing Systems',
    出版社: 'ACM',
    网址: 'http://dblp.uni-trier.de/db/conf/chi'
  },
  {
    序号: 3,
    会议简称: 'UbiComp',
    会议全称: 'ACM international joint conference on Pervasive and Ubiquitous Computing',
    出版社: 'ACM',
    网址: 'https://dblp.uni-trier.de/db/conf/huc/'
  },
  {
    序号: 4,
    会议简称: 'UIST',
    会议全称: 'ACM Symposium on User Interface Software and Technology',
    出版社: 'ACM',
    网址: 'http://dblp.uni-trier.de/db/conf/uist/',
    标注: '黄色标注'
  }
];

// B类会议（优秀）
const B_CLASS_CONFERENCES = [
  {
    序号: 1,
    会议简称: 'GROUP',
    会议全称: 'ACM International Conference on Supporting Group Work',
    出版社: 'ACM',
    网址: 'http://dblp.uni-trier.de/db/conf/group/'
  },
  {
    序号: 2,
    会议简称: 'IUI',
    会议全称: 'ACM International Conference on Intelligent User Interfaces',
    出版社: 'ACM',
    网址: 'http://dblp.uni-trier.de/db/conf/iui/'
  },
  {
    序号: 3,
    会议简称: 'ISS',
    会议全称: 'ACM International Conference on Interactive Surfaces and Spaces',
    出版社: 'ACM',
    网址: 'http://dblp.uni-trier.de/db/conf/tabletop/',
    标注: '绿色标注，上标[2]'
  },
  {
    序号: 4,
    会议简称: 'ECSCW',
    会议全称: 'European Conference on Computer Supported Cooperative Work',
    出版社: 'Springer',
    网址: 'http://dblp.uni-trier.de/db/conf/ecscw/'
  },
  {
    序号: 5,
    会议简称: 'PERCOM',
    会议全称: 'IEEE International Conference on Pervasive Computing and Communications',
    出版社: 'IEEE',
    网址: 'http://dblp.uni-trier.de/db/conf/percom/'
  },
  {
    序号: 6,
    会议简称: 'MobileHCI',
    会议全称: 'ACM International Conference on Mobile Human-Computer Interaction',
    出版社: 'ACM',
    网址: 'http://dblp.uni-trier.de/db/conf/mhci/'
  },
  {
    序号: 7,
    会议简称: 'ICWSM',
    会议全称: 'The International AAAI Conference on Web and Social Media',
    出版社: 'AAAI',
    网址: 'https://dblp.org/db/conf/icwsm/index.html',
    标注: '红色标注'
  },
  {
    序号: 8,
    会议简称: 'HRI',
    会议全称: 'ACM/IEEE International Conference on Human Robot Interaction',
    出版社: 'ACM/IEEE',
    网址: ''
  },
  {
    序号: 9,
    会议简称: 'IEEE VR',
    会议全称: 'IEEE Virtual Reality Conference',
    出版社: 'IEEE',
    网址: ''
  }
];

// C类会议（良好）
const C_CLASS_CONFERENCES = [
  {
    序号: 1,
    会议简称: 'DIS',
    会议全称: 'ACM SIGCHI Conference on Designing Interactive Systems',
    出版社: 'ACM',
    网址: 'http://dblp.uni-trier.de/db/conf/ACMdis'
  },
  {
    序号: 2,
    会议简称: 'ICMI',
    会议全称: 'ACM International Conference on Multimodal Interaction',
    出版社: 'ACM',
    网址: 'http://dblp.uni-trier.de/db/conf/icmi/'
  },
  {
    序号: 3,
    会议简称: 'ASSETS',
    会议全称: 'International ACM SIGACCESS Conference on Computers and Accessibility',
    出版社: 'ACM',
    网址: 'http://dblp.uni-trier.de/db/conf/assets'
  },
  {
    序号: 4,
    会议简称: 'GI',
    会议全称: 'Graphics Interface',
    出版社: 'ACM',
    网址: 'http://dblp.uni-trier.de/db/conf/graphicsinterface/'
  },
  {
    序号: 5,
    会议简称: 'UIC',
    会议全称: 'IEEE International Conference on Ubiquitous Intelligence and Computing',
    出版社: 'IEEE',
    网址: 'http://dblp.uni-trier.de/db/conf/uic/'
  },
  {
    序号: 6,
    会议简称: '',
    会议全称: 'IEEE World Haptics Conference',
    出版社: 'IEEE',
    网址: 'http://dblp.uni-trier.de/db/conf/haptics/'
  },
  {
    序号: 7,
    会议简称: 'INTERACT',
    会议全称: 'International Conference on Human-Computer Interaction of International Federation for Information Processing',
    出版社: 'IFIP',
    网址: 'http://dblp.uni-trier.de/db/conf/interact/'
  },
  {
    序号: 8,
    会议简称: 'IDC',
    会议全称: 'ACM Interaction Design and Children',
    出版社: 'ACM',
    网址: 'http://dblp.uni-trier.de/db/conf/acmidc/'
  },
  {
    序号: 9,
    会议简称: 'CollaborateCom',
    会议全称: 'International Conference on Collaborative Computing: Networking, Applications and Worksharing',
    出版社: 'Springer',
    网址: 'https://dblp.uni-trier.de/db/conf/colcom/'
  },
  {
    序号: 10,
    会议简称: 'CSCWD',
    会议全称: 'International Conference on Computer Supported Cooperative Work in Design',
    出版社: 'Springer',
    网址: 'http://dblp.uni-trier.de/db/conf/cscwd/'
  },
  {
    序号: 11,
    会议简称: 'CoopIS',
    会议全称: 'International Conference on Cooperative Information Systems',
    出版社: 'Springer',
    网址: 'http://dblp.uni-trier.de/db/conf/coopis/'
  },
  {
    序号: 12,
    会议简称: 'MobiQuitous',
    会议全称: 'International Conference on Mobile and Ubiquitous Systems: Computing, Networking and Services',
    出版社: 'Springer',
    网址: 'http://dblp.uni-trier.de/db/conf/mobiquitous/'
  },
  {
    序号: 13,
    会议简称: 'AVI',
    会议全称: 'International Working Conference on Advanced Visual Interfaces',
    出版社: 'ACM',
    网址: 'http://dblp.uni-trier.de/db/conf/avi/'
  }
];

// 所有期刊汇总
const ALL_JOURNALS = [
  ...A_CLASS_JOURNALS.map(item => ({ ...item, 分类: 'A类' })),
  ...B_CLASS_JOURNALS.map(item => ({ ...item, 分类: 'B类' })),
  ...C_CLASS_JOURNALS.map(item => ({ ...item, 分类: 'C类' }))
];

// 所有会议汇总
const ALL_CONFERENCES = [
  ...A_CLASS_CONFERENCES.map(item => ({ ...item, 分类: 'A类' })),
  ...B_CLASS_CONFERENCES.map(item => ({ ...item, 分类: 'B类' })),
  ...C_CLASS_CONFERENCES.map(item => ({ ...item, 分类: 'C类' }))
];

// 所有期刊和会议汇总
const ALL_VENUES = [
  ...ALL_JOURNALS.map(item => ({ ...item, 类型: '期刊' })),
  ...ALL_CONFERENCES.map(item => ({ ...item, 类型: '会议' }))
];

// 辅助函数：根据简称查找详细信息
const findVenueByShortName = (shortName) => {
  return ALL_VENUES.find(venue => 
    venue.刊物简称 === shortName || venue.会议简称 === shortName
  );
};

// 辅助函数：根据分类和类型获取列表
const getVenuesByClassAndType = (classification, type) => {
  return ALL_VENUES.filter(venue => 
    venue.分类 === classification && venue.类型 === type
  );
};

// 辅助函数：获取所有期刊名称列表（用于OpenAlex API查询）
const getAllJournalNames = () => {
  return ALL_JOURNALS.map(journal => journal.刊物全称);
};

// 辅助函数：获取所有会议名称列表（用于OpenAlex API查询）
const getAllConferenceNames = () => {
  return ALL_CONFERENCES.map(conference => conference.会议全称);
};

// 导出所有数据和函数
export default {
  // 原始分类数据
  A_CLASS_JOURNALS,
  B_CLASS_JOURNALS,
  C_CLASS_JOURNALS,
  A_CLASS_CONFERENCES,
  B_CLASS_CONFERENCES,
  C_CLASS_CONFERENCES,
  
  // 汇总数据
  ALL_JOURNALS,
  ALL_CONFERENCES,
  ALL_VENUES,
  
  // 辅助函数
  findVenueByShortName,
  getVenuesByClassAndType,
  getAllJournalNames,
  getAllConferenceNames,
  
  // 统计信息
  STATISTICS: {
    总计: ALL_VENUES.length,
    期刊总数: ALL_JOURNALS.length,
    会议总数: ALL_CONFERENCES.length,
    A类期刊: A_CLASS_JOURNALS.length,
    B类期刊: B_CLASS_JOURNALS.length,
    C类期刊: C_CLASS_JOURNALS.length,
    A类会议: A_CLASS_CONFERENCES.length,
    B类会议: B_CLASS_CONFERENCES.length,
    C类会议: C_CLASS_CONFERENCES.length
  }
};
