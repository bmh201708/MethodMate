// 从期刊论文分析中提取的所有研究领域
// 生成时间: 2025-09-04T04:39:18.121Z
// 数据来源: OpenAlex API
// 分析期刊数: 29
// 总领域数: 4967

const allResearchFields = [
  {
    "id": "C41008148",
    "name": "Computer science",
    "level": 0,
    "total_papers": 4878,
    "total_score": 2361.306393306,
    "venue_count": 29,
    "avg_score": 0.4840726513542435
  },
  {
    "id": "C15744967",
    "name": "Psychology",
    "level": 0,
    "total_papers": 2641,
    "total_score": 1050.2672568310004,
    "venue_count": 29,
    "avg_score": 0.3976778708182508
  },
  {
    "id": "C154945302",
    "name": "Artificial intelligence",
    "level": 1,
    "total_papers": 1967,
    "total_score": 591.595927819,
    "venue_count": 29,
    "avg_score": 0.3007605123634977
  },
  {
    "id": "C107457646",
    "name": "Human–computer interaction",
    "level": 1,
    "total_papers": 1694,
    "total_score": 682.1737945659997,
    "venue_count": 29,
    "avg_score": 0.40269999679220764
  },
  {
    "id": "C127413603",
    "name": "Engineering",
    "level": 0,
    "total_papers": 1671,
    "total_score": 339.324780011,
    "venue_count": 29,
    "avg_score": 0.20306689408198683
  },
  {
    "id": "C144024400",
    "name": "Sociology",
    "level": 0,
    "total_papers": 1151,
    "total_score": 333.03810062,
    "venue_count": 29,
    "avg_score": 0.28934674250217207
  },
  {
    "id": "C33923547",
    "name": "Mathematics",
    "level": 0,
    "total_papers": 1116,
    "total_score": 111.60593760700002,
    "venue_count": 29,
    "avg_score": 0.10000532043637994
  },
  {
    "id": "C17744445",
    "name": "Political science",
    "level": 0,
    "total_papers": 1114,
    "total_score": 162.80203608,
    "venue_count": 28,
    "avg_score": 0.14614186362657092
  },
  {
    "id": "C138885662",
    "name": "Philosophy",
    "level": 0,
    "total_papers": 1042,
    "total_score": 28.521801228,
    "venue_count": 29,
    "avg_score": 0.027372170084452977
  },
  {
    "id": "C77805123",
    "name": "Social psychology",
    "level": 1,
    "total_papers": 995,
    "total_score": 275.23158468200006,
    "venue_count": 28,
    "avg_score": 0.27661465797185936
  },
  {
    "id": "C199539241",
    "name": "Law",
    "level": 1,
    "total_papers": 991,
    "total_score": 24.299841900999997,
    "venue_count": 28,
    "avg_score": 0.0245205266407669
  },
  {
    "id": "C71924100",
    "name": "Medicine",
    "level": 0,
    "total_papers": 936,
    "total_score": 179.310107942,
    "venue_count": 29,
    "avg_score": 0.1915706281431624
  },
  {
    "id": "C136764020",
    "name": "World Wide Web",
    "level": 1,
    "total_papers": 924,
    "total_score": 210.22475750899994,
    "venue_count": 28,
    "avg_score": 0.22751597133008652
  },
  {
    "id": "C111919701",
    "name": "Operating system",
    "level": 1,
    "total_papers": 916,
    "total_score": 15.144000736000002,
    "venue_count": 29,
    "avg_score": 0.01653275189519651
  },
  {
    "id": "C144133560",
    "name": "Business",
    "level": 0,
    "total_papers": 812,
    "total_score": 272.9659907150001,
    "venue_count": 28,
    "avg_score": 0.33616501319581293
  },
  {
    "id": "C86803240",
    "name": "Biology",
    "level": 0,
    "total_papers": 800,
    "total_score": 9.682082056999997,
    "venue_count": 29,
    "avg_score": 0.012102602571249996
  },
  {
    "id": "C199360897",
    "name": "Programming language",
    "level": 1,
    "total_papers": 703,
    "total_score": 17.33755817,
    "venue_count": 29,
    "avg_score": 0.02466224490753912
  },
  {
    "id": "C56739046",
    "name": "Knowledge management",
    "level": 1,
    "total_papers": 703,
    "total_score": 289.388929461,
    "venue_count": 26,
    "avg_score": 0.4116485483086771
  },
  {
    "id": "C121332964",
    "name": "Physics",
    "level": 0,
    "total_papers": 676,
    "total_score": 19.907848655,
    "venue_count": 29,
    "avg_score": 0.029449480258875737
  },
  {
    "id": "C169760540",
    "name": "Neuroscience",
    "level": 1,
    "total_papers": 648,
    "total_score": 22.274905667,
    "venue_count": 27,
    "avg_score": 0.03437485442438271
  },
  {
    "id": "C49774154",
    "name": "Multimedia",
    "level": 1,
    "total_papers": 589,
    "total_score": 216.70100991099994,
    "venue_count": 28,
    "avg_score": 0.36791342939049226
  },
  {
    "id": "C194969405",
    "name": "Virtual reality",
    "level": 2,
    "total_papers": 587,
    "total_score": 363.01855237899997,
    "venue_count": 26,
    "avg_score": 0.6184302425536626
  },
  {
    "id": "C111472728",
    "name": "Epistemology",
    "level": 1,
    "total_papers": 581,
    "total_score": 90.192743426,
    "venue_count": 29,
    "avg_score": 0.15523707990705682
  },
  {
    "id": "C36289849",
    "name": "Social science",
    "level": 1,
    "total_papers": 569,
    "total_score": 47.08706543700001,
    "venue_count": 29,
    "avg_score": 0.0827540693093146
  },
  {
    "id": "C162324750",
    "name": "Economics",
    "level": 0,
    "total_papers": 567,
    "total_score": 44.98002341,
    "venue_count": 28,
    "avg_score": 0.07932984728395062
  },
  {
    "id": "C119857082",
    "name": "Machine learning",
    "level": 1,
    "total_papers": 563,
    "total_score": 137.88591627999998,
    "venue_count": 28,
    "avg_score": 0.24491281754884542
  },
  {
    "id": "C78519656",
    "name": "Mechanical engineering",
    "level": 1,
    "total_papers": 552,
    "total_score": 22.251297627999996,
    "venue_count": 29,
    "avg_score": 0.040310321789855066
  },
  {
    "id": "C41895202",
    "name": "Linguistics",
    "level": 1,
    "total_papers": 475,
    "total_score": 32.344991446,
    "venue_count": 29,
    "avg_score": 0.06809471883368422
  },
  {
    "id": "C38652104",
    "name": "Computer security",
    "level": 1,
    "total_papers": 470,
    "total_score": 115.987777733,
    "venue_count": 28,
    "avg_score": 0.2467825058148936
  },
  {
    "id": "C2522767166",
    "name": "Data science",
    "level": 1,
    "total_papers": 465,
    "total_score": 184.204693114,
    "venue_count": 28,
    "avg_score": 0.3961391249763441
  },
  {
    "id": "C142362112",
    "name": "Art",
    "level": 0,
    "total_papers": 465,
    "total_score": 97.15929097900002,
    "venue_count": 29,
    "avg_score": 0.20894471178279575
  },
  {
    "id": "C151730666",
    "name": "Paleontology",
    "level": 1,
    "total_papers": 440,
    "total_score": 0.22930467300000001,
    "venue_count": 28,
    "avg_score": 0.0005211469840909091
  },
  {
    "id": "C2779343474",
    "name": "Context (archaeology)",
    "level": 2,
    "total_papers": 433,
    "total_score": 248.93910026000003,
    "venue_count": 28,
    "avg_score": 0.5749170906697461
  },
  {
    "id": "C180747234",
    "name": "Cognitive psychology",
    "level": 1,
    "total_papers": 418,
    "total_score": 147.33665174000004,
    "venue_count": 27,
    "avg_score": 0.3524800280861245
  },
  {
    "id": "C98045186",
    "name": "Process (computing)",
    "level": 2,
    "total_papers": 412,
    "total_score": 207.90859192999997,
    "venue_count": 29,
    "avg_score": 0.504632504684466
  },
  {
    "id": "C162853370",
    "name": "Marketing",
    "level": 1,
    "total_papers": 383,
    "total_score": 104.286412264,
    "venue_count": 27,
    "avg_score": 0.27228828267362926
  },
  {
    "id": "C75630572",
    "name": "Applied psychology",
    "level": 1,
    "total_papers": 374,
    "total_score": 147.30704366499998,
    "venue_count": 26,
    "avg_score": 0.3938691007085561
  },
  {
    "id": "C118552586",
    "name": "Psychiatry",
    "level": 1,
    "total_papers": 365,
    "total_score": 22.106440147999997,
    "venue_count": 27,
    "avg_score": 0.060565589446575335
  },
  {
    "id": "C145420912",
    "name": "Mathematics education",
    "level": 1,
    "total_papers": 339,
    "total_score": 119.57624303899998,
    "venue_count": 24,
    "avg_score": 0.3527322803510324
  },
  {
    "id": "C108827166",
    "name": "Internet privacy",
    "level": 1,
    "total_papers": 334,
    "total_score": 146.16503938000002,
    "venue_count": 26,
    "avg_score": 0.43761987838323363
  },
  {
    "id": "C2780451532",
    "name": "Task (project management)",
    "level": 2,
    "total_papers": 334,
    "total_score": 188.55028445,
    "venue_count": 25,
    "avg_score": 0.5645218097305389
  },
  {
    "id": "C2524010",
    "name": "Geometry",
    "level": 1,
    "total_papers": 334,
    "total_score": 26.410467954999994,
    "venue_count": 29,
    "avg_score": 0.07907325735029938
  },
  {
    "id": "C201995342",
    "name": "Systems engineering",
    "level": 1,
    "total_papers": 324,
    "total_score": 32.96090641099999,
    "venue_count": 27,
    "avg_score": 0.10173119262654318
  },
  {
    "id": "C62520636",
    "name": "Quantum mechanics",
    "level": 1,
    "total_papers": 318,
    "total_score": 0.454796763,
    "venue_count": 29,
    "avg_score": 0.0014301785
  },
  {
    "id": "C202444582",
    "name": "Pure mathematics",
    "level": 1,
    "total_papers": 311,
    "total_score": 1.9201194140000002,
    "venue_count": 29,
    "avg_score": 0.006174017408360129
  },
  {
    "id": "C205649164",
    "name": "Geography",
    "level": 0,
    "total_papers": 297,
    "total_score": 39.244486466999994,
    "venue_count": 28,
    "avg_score": 0.13213631807070705
  },
  {
    "id": "C26760741",
    "name": "Perception",
    "level": 2,
    "total_papers": 283,
    "total_score": 152.82898846999998,
    "venue_count": 27,
    "avg_score": 0.5400317613780918
  },
  {
    "id": "C166957645",
    "name": "Archaeology",
    "level": 1,
    "total_papers": 282,
    "total_score": 9.297648945,
    "venue_count": 29,
    "avg_score": 0.03297038632978724
  },
  {
    "id": "C153349607",
    "name": "Visual arts",
    "level": 1,
    "total_papers": 282,
    "total_score": 67.73672413300001,
    "venue_count": 28,
    "avg_score": 0.24020114940780146
  },
  {
    "id": "C18762648",
    "name": "Work (physics)",
    "level": 2,
    "total_papers": 279,
    "total_score": 139.70573971999997,
    "venue_count": 28,
    "avg_score": 0.5007374183512544
  },
  {
    "id": "C142724271",
    "name": "Pathology",
    "level": 1,
    "total_papers": 278,
    "total_score": 1.631814997,
    "venue_count": 28,
    "avg_score": 0.005869838118705036
  },
  {
    "id": "C539667460",
    "name": "Management science",
    "level": 1,
    "total_papers": 275,
    "total_score": 111.90793796000001,
    "venue_count": 25,
    "avg_score": 0.40693795621818185
  },
  {
    "id": "C169900460",
    "name": "Cognition",
    "level": 2,
    "total_papers": 272,
    "total_score": 130.59359652,
    "venue_count": 24,
    "avg_score": 0.4801235166176471
  },
  {
    "id": "C19417346",
    "name": "Pedagogy",
    "level": 1,
    "total_papers": 269,
    "total_score": 44.71976117200002,
    "venue_count": 27,
    "avg_score": 0.16624446532342016
  },
  {
    "id": "C170130773",
    "name": "Usability",
    "level": 2,
    "total_papers": 261,
    "total_score": 165.38336192,
    "venue_count": 22,
    "avg_score": 0.6336527276628352
  },
  {
    "id": "C185592680",
    "name": "Chemistry",
    "level": 0,
    "total_papers": 261,
    "total_score": 4.220922849,
    "venue_count": 29,
    "avg_score": 0.016172118195402298
  },
  {
    "id": "C134306372",
    "name": "Mathematical analysis",
    "level": 1,
    "total_papers": 254,
    "total_score": 8.578745510000001,
    "venue_count": 29,
    "avg_score": 0.03377458862204725
  },
  {
    "id": "C44154836",
    "name": "Simulation",
    "level": 1,
    "total_papers": 252,
    "total_score": 92.59561876999999,
    "venue_count": 20,
    "avg_score": 0.3674429316269841
  },
  {
    "id": "C39549134",
    "name": "Public relations",
    "level": 1,
    "total_papers": 249,
    "total_score": 93.88337868900001,
    "venue_count": 23,
    "avg_score": 0.37704168148192774
  },
  {
    "id": "C76155785",
    "name": "Telecommunications",
    "level": 1,
    "total_papers": 243,
    "total_score": 24.553517448000008,
    "venue_count": 27,
    "avg_score": 0.10104328167901237
  },
  {
    "id": "C105795698",
    "name": "Statistics",
    "level": 1,
    "total_papers": 242,
    "total_score": 16.994065573000004,
    "venue_count": 28,
    "avg_score": 0.0702234114586777
  },
  {
    "id": "C55587333",
    "name": "Engineering ethics",
    "level": 1,
    "total_papers": 235,
    "total_score": 94.88649726000001,
    "venue_count": 22,
    "avg_score": 0.4037723287659575
  },
  {
    "id": "C94625758",
    "name": "Politics",
    "level": 2,
    "total_papers": 224,
    "total_score": 34.516377373000005,
    "venue_count": 26,
    "avg_score": 0.15409097041517858
  },
  {
    "id": "C31972630",
    "name": "Computer vision",
    "level": 1,
    "total_papers": 223,
    "total_score": 82.965877495,
    "venue_count": 27,
    "avg_score": 0.37204429369955155
  },
  {
    "id": "C31258907",
    "name": "Computer network",
    "level": 1,
    "total_papers": 221,
    "total_score": 49.620830807,
    "venue_count": 27,
    "avg_score": 0.22452864618552035
  },
  {
    "id": "C9652623",
    "name": "Field (mathematics)",
    "level": 2,
    "total_papers": 219,
    "total_score": 111.73778802999999,
    "venue_count": 29,
    "avg_score": 0.5102182101826483
  },
  {
    "id": "C46312422",
    "name": "Communication",
    "level": 1,
    "total_papers": 215,
    "total_score": 31.036893457000005,
    "venue_count": 28,
    "avg_score": 0.14435764398604653
  },
  {
    "id": "C153180895",
    "name": "Pattern recognition (psychology)",
    "level": 2,
    "total_papers": 206,
    "total_score": 95.44160229999999,
    "venue_count": 13,
    "avg_score": 0.46330874902912617
  },
  {
    "id": "C518677369",
    "name": "Social media",
    "level": 2,
    "total_papers": 204,
    "total_score": 109.92731073,
    "venue_count": 24,
    "avg_score": 0.5388593663235294
  },
  {
    "id": "C10138342",
    "name": "Finance",
    "level": 1,
    "total_papers": 203,
    "total_score": 5.5481016389999995,
    "venue_count": 25,
    "avg_score": 0.027330549945812806
  },
  {
    "id": "C12713177",
    "name": "Perspective (graphical)",
    "level": 2,
    "total_papers": 199,
    "total_score": 114.2191218,
    "venue_count": 26,
    "avg_score": 0.5739654361809045
  },
  {
    "id": "C195094911",
    "name": "Process management",
    "level": 1,
    "total_papers": 199,
    "total_score": 79.5217128,
    "venue_count": 25,
    "avg_score": 0.3996065969849246
  },
  {
    "id": "C11413529",
    "name": "Algorithm",
    "level": 1,
    "total_papers": 192,
    "total_score": 60.43603035699999,
    "venue_count": 25,
    "avg_score": 0.3147709914427083
  },
  {
    "id": "C177264268",
    "name": "Set (abstract data type)",
    "level": 2,
    "total_papers": 187,
    "total_score": 89.54790483000001,
    "venue_count": 28,
    "avg_score": 0.47886580122994654
  },
  {
    "id": "C18903297",
    "name": "Ecology",
    "level": 1,
    "total_papers": 180,
    "total_score": 11.236114315,
    "venue_count": 28,
    "avg_score": 0.06242285730555556
  },
  {
    "id": "C2779134260",
    "name": "Disease",
    "level": 2,
    "total_papers": 179,
    "total_score": 4.365832994,
    "venue_count": 27,
    "avg_score": 0.024390128458100558
  },
  {
    "id": "C153715457",
    "name": "Augmented reality",
    "level": 2,
    "total_papers": 165,
    "total_score": 105.50110366000001,
    "venue_count": 22,
    "avg_score": 0.6394006282424243
  },
  {
    "id": "C121684516",
    "name": "Computer graphics (images)",
    "level": 1,
    "total_papers": 165,
    "total_score": 54.40817854399999,
    "venue_count": 25,
    "avg_score": 0.32974653663030296
  },
  {
    "id": "C524204448",
    "name": "Infectious disease (medical specialty)",
    "level": 3,
    "total_papers": 163,
    "total_score": 2.866792155,
    "venue_count": 23,
    "avg_score": 0.01758768193251534
  },
  {
    "id": "C3008058167",
    "name": "Coronavirus disease 2019 (COVID-19)",
    "level": 4,
    "total_papers": 162,
    "total_score": 85.9962512,
    "venue_count": 23,
    "avg_score": 0.5308410567901235
  },
  {
    "id": "C99508421",
    "name": "Physical medicine and rehabilitation",
    "level": 1,
    "total_papers": 161,
    "total_score": 70.69330838,
    "venue_count": 16,
    "avg_score": 0.43908887192546586
  },
  {
    "id": "C19165224",
    "name": "Anthropology",
    "level": 1,
    "total_papers": 160,
    "total_score": 6.867633951000001,
    "venue_count": 28,
    "avg_score": 0.042922712193750004
  },
  {
    "id": "C28490314",
    "name": "Speech recognition",
    "level": 1,
    "total_papers": 160,
    "total_score": 66.19774732500001,
    "venue_count": 17,
    "avg_score": 0.41373592078125004
  },
  {
    "id": "C188147891",
    "name": "Cognitive science",
    "level": 1,
    "total_papers": 159,
    "total_score": 51.61272837599999,
    "venue_count": 23,
    "avg_score": 0.3246083545660377
  },
  {
    "id": "C95457728",
    "name": "History",
    "level": 0,
    "total_papers": 159,
    "total_score": 21.656156668999998,
    "venue_count": 28,
    "avg_score": 0.13620224320125784
  },
  {
    "id": "C149635348",
    "name": "Embedded system",
    "level": 1,
    "total_papers": 159,
    "total_score": 17.147433055000004,
    "venue_count": 27,
    "avg_score": 0.10784549091194971
  },
  {
    "id": "C107038049",
    "name": "Aesthetics",
    "level": 1,
    "total_papers": 157,
    "total_score": 49.412245926000004,
    "venue_count": 21,
    "avg_score": 0.31472768105732485
  },
  {
    "id": "C90509273",
    "name": "Robot",
    "level": 2,
    "total_papers": 156,
    "total_score": 76.158063106,
    "venue_count": 24,
    "avg_score": 0.48819271221794874
  },
  {
    "id": "C187736073",
    "name": "Management",
    "level": 1,
    "total_papers": 154,
    "total_score": 10.597750893000002,
    "venue_count": 26,
    "avg_score": 0.06881656424025975
  },
  {
    "id": "C156393514",
    "name": "Multimethodology",
    "level": 2,
    "total_papers": 154,
    "total_score": 96.55464369999999,
    "venue_count": 1,
    "avg_score": 0.6269782058441558
  },
  {
    "id": "C2779530757",
    "name": "Quality (philosophy)",
    "level": 2,
    "total_papers": 151,
    "total_score": 73.75596706000002,
    "venue_count": 28,
    "avg_score": 0.4884501129801326
  },
  {
    "id": "C542102704",
    "name": "Psychotherapist",
    "level": 1,
    "total_papers": 149,
    "total_score": 17.376890145999997,
    "venue_count": 28,
    "avg_score": 0.1166234237986577
  },
  {
    "id": "C138496976",
    "name": "Developmental psychology",
    "level": 1,
    "total_papers": 145,
    "total_score": 37.919722629,
    "venue_count": 23,
    "avg_score": 0.26151532847586206
  },
  {
    "id": "C124101348",
    "name": "Data mining",
    "level": 1,
    "total_papers": 143,
    "total_score": 44.25842457,
    "venue_count": 24,
    "avg_score": 0.30949947251748255
  },
  {
    "id": "C55493867",
    "name": "Biochemistry",
    "level": 1,
    "total_papers": 140,
    "total_score": 0,
    "venue_count": 25,
    "avg_score": 0
  },
  {
    "id": "C190248442",
    "name": "Qualitative research",
    "level": 2,
    "total_papers": 138,
    "total_score": 53.86673251399999,
    "venue_count": 21,
    "avg_score": 0.39033864140579705
  },
  {
    "id": "C77088390",
    "name": "Database",
    "level": 1,
    "total_papers": 132,
    "total_score": 10.623241969999999,
    "venue_count": 25,
    "avg_score": 0.08047910583333333
  },
  {
    "id": "C110875604",
    "name": "The Internet",
    "level": 2,
    "total_papers": 131,
    "total_score": 53.432793614999994,
    "venue_count": 23,
    "avg_score": 0.4078839207251908
  },
  {
    "id": "C160735492",
    "name": "Health care",
    "level": 2,
    "total_papers": 128,
    "total_score": 63.01145429399999,
    "venue_count": 22,
    "avg_score": 0.4922769866718749
  },
  {
    "id": "C2779473830",
    "name": "MEDLINE",
    "level": 2,
    "total_papers": 125,
    "total_score": 19.579519464,
    "venue_count": 24,
    "avg_score": 0.156636155712
  },
  {
    "id": "C120665830",
    "name": "Optics",
    "level": 1,
    "total_papers": 124,
    "total_score": 3.46794844,
    "venue_count": 26,
    "avg_score": 0.027967326129032258
  },
  {
    "id": "C1862650",
    "name": "Physical therapy",
    "level": 1,
    "total_papers": 124,
    "total_score": 43.920081231000005,
    "venue_count": 17,
    "avg_score": 0.3541942034758065
  },
  {
    "id": "C50522688",
    "name": "Economic growth",
    "level": 1,
    "total_papers": 120,
    "total_score": 6.382475928999999,
    "venue_count": 27,
    "avg_score": 0.053187299408333326
  },
  {
    "id": "C126322002",
    "name": "Internal medicine",
    "level": 1,
    "total_papers": 119,
    "total_score": 5.163981140000001,
    "venue_count": 27,
    "avg_score": 0.043394799495798324
  },
  {
    "id": "C112698675",
    "name": "Advertising",
    "level": 1,
    "total_papers": 115,
    "total_score": 43.107845735,
    "venue_count": 18,
    "avg_score": 0.37485083247826084
  },
  {
    "id": "C2780378061",
    "name": "Service (business)",
    "level": 2,
    "total_papers": 115,
    "total_score": 56.395707949999995,
    "venue_count": 24,
    "avg_score": 0.49039746043478255
  },
  {
    "id": "C115903868",
    "name": "Software engineering",
    "level": 1,
    "total_papers": 114,
    "total_score": 23.737651133999996,
    "venue_count": 23,
    "avg_score": 0.2082250099473684
  },
  {
    "id": "C509550671",
    "name": "Medical education",
    "level": 1,
    "total_papers": 113,
    "total_score": 43.72667571,
    "venue_count": 24,
    "avg_score": 0.3869617319469027
  },
  {
    "id": "C90673727",
    "name": "Product (mathematics)",
    "level": 2,
    "total_papers": 113,
    "total_score": 58.30200978,
    "venue_count": 21,
    "avg_score": 0.5159469892035398
  },
  {
    "id": "C27415008",
    "name": "Psychological intervention",
    "level": 2,
    "total_papers": 111,
    "total_score": 60.538863299999996,
    "venue_count": 24,
    "avg_score": 0.5453951648648648
  },
  {
    "id": "C2908647359",
    "name": "Population",
    "level": 2,
    "total_papers": 111,
    "total_score": 31.655091306000003,
    "venue_count": 28,
    "avg_score": 0.2851810027567568
  },
  {
    "id": "C66938386",
    "name": "Structural engineering",
    "level": 1,
    "total_papers": 111,
    "total_score": 10.400245205,
    "venue_count": 19,
    "avg_score": 0.09369590274774774
  },
  {
    "id": "C23123220",
    "name": "Information retrieval",
    "level": 1,
    "total_papers": 110,
    "total_score": 42.64103368999999,
    "venue_count": 21,
    "avg_score": 0.38764576081818175
  },
  {
    "id": "C104317684",
    "name": "Gene",
    "level": 2,
    "total_papers": 108,
    "total_score": 0,
    "venue_count": 25,
    "avg_score": 0
  },
  {
    "id": "C2776035688",
    "name": "Affect (linguistics)",
    "level": 2,
    "total_papers": 106,
    "total_score": 61.14996437999999,
    "venue_count": 26,
    "avg_score": 0.5768864564150943
  },
  {
    "id": "C70410870",
    "name": "Clinical psychology",
    "level": 1,
    "total_papers": 105,
    "total_score": 27.416816156,
    "venue_count": 18,
    "avg_score": 0.2611125348190476
  },
  {
    "id": "C204321447",
    "name": "Natural language processing",
    "level": 1,
    "total_papers": 105,
    "total_score": 44.09888316999999,
    "venue_count": 23,
    "avg_score": 0.41998936352380944
  },
  {
    "id": "C119599485",
    "name": "Electrical engineering",
    "level": 1,
    "total_papers": 104,
    "total_score": 3.916882145,
    "venue_count": 22,
    "avg_score": 0.037662328317307696
  },
  {
    "id": "C2778476105",
    "name": "Workload",
    "level": 2,
    "total_papers": 103,
    "total_score": 74.34954926,
    "venue_count": 16,
    "avg_score": 0.72184028407767
  },
  {
    "id": "C2775924081",
    "name": "Control (management)",
    "level": 2,
    "total_papers": 102,
    "total_score": 44.412229810999996,
    "venue_count": 24,
    "avg_score": 0.4354140177549019
  },
  {
    "id": "C21547014",
    "name": "Operations management",
    "level": 1,
    "total_papers": 100,
    "total_score": 9.937265455,
    "venue_count": 22,
    "avg_score": 0.09937265455000001
  },
  {
    "id": "C36503486",
    "name": "Domain (mathematical analysis)",
    "level": 2,
    "total_papers": 97,
    "total_score": 49.779260629999996,
    "venue_count": 25,
    "avg_score": 0.5131882539175258
  },
  {
    "id": "C150594956",
    "name": "Wearable computer",
    "level": 2,
    "total_papers": 97,
    "total_score": 57.63201095,
    "venue_count": 21,
    "avg_score": 0.5941444427835052
  },
  {
    "id": "C89623803",
    "name": "Pandemic",
    "level": 5,
    "total_papers": 96,
    "total_score": 55.769443819999985,
    "venue_count": 21,
    "avg_score": 0.5809317064583331
  },
  {
    "id": "C146978453",
    "name": "Aerospace engineering",
    "level": 1,
    "total_papers": 96,
    "total_score": 1.6401638600000001,
    "venue_count": 25,
    "avg_score": 0.017085040208333336
  },
  {
    "id": "C26517878",
    "name": "Key (lock)",
    "level": 2,
    "total_papers": 95,
    "total_score": 47.82177267,
    "venue_count": 25,
    "avg_score": 0.5033870807368421
  },
  {
    "id": "C71104824",
    "name": "Structural equation modeling",
    "level": 2,
    "total_papers": 94,
    "total_score": 52.81182475599999,
    "venue_count": 14,
    "avg_score": 0.5618279229361701
  },
  {
    "id": "C199033989",
    "name": "Narrative",
    "level": 2,
    "total_papers": 93,
    "total_score": 48.925740097,
    "venue_count": 24,
    "avg_score": 0.5260832268494624
  },
  {
    "id": "C189708586",
    "name": "Systematic review",
    "level": 3,
    "total_papers": 92,
    "total_score": 45.33794105999999,
    "venue_count": 22,
    "avg_score": 0.492803707173913
  },
  {
    "id": "C124952713",
    "name": "Literature",
    "level": 1,
    "total_papers": 92,
    "total_score": 7.362905207,
    "venue_count": 22,
    "avg_score": 0.08003157833695652
  },
  {
    "id": "C2776401178",
    "name": "Feature (linguistics)",
    "level": 2,
    "total_papers": 92,
    "total_score": 48.55506570000001,
    "venue_count": 15,
    "avg_score": 0.5277724532608696
  },
  {
    "id": "C522805319",
    "name": "Electroencephalography",
    "level": 2,
    "total_papers": 92,
    "total_score": 51.50322376199999,
    "venue_count": 12,
    "avg_score": 0.5598176495869565
  },
  {
    "id": "C40700",
    "name": "Industrial organization",
    "level": 1,
    "total_papers": 92,
    "total_score": 42.39318426999999,
    "venue_count": 6,
    "avg_score": 0.4607954811956521
  },
  {
    "id": "C159110408",
    "name": "Nursing",
    "level": 1,
    "total_papers": 90,
    "total_score": 20.046146651999997,
    "venue_count": 20,
    "avg_score": 0.22273496279999996
  },
  {
    "id": "C99454951",
    "name": "Environmental health",
    "level": 1,
    "total_papers": 89,
    "total_score": 5.65645533,
    "venue_count": 23,
    "avg_score": 0.06355567786516854
  },
  {
    "id": "C153294291",
    "name": "Meteorology",
    "level": 1,
    "total_papers": 89,
    "total_score": 1.703536296,
    "venue_count": 22,
    "avg_score": 0.019140857258426968
  },
  {
    "id": "C161191863",
    "name": "Library science",
    "level": 1,
    "total_papers": 88,
    "total_score": 25.017198480000005,
    "venue_count": 19,
    "avg_score": 0.2842863463636364
  },
  {
    "id": "C170154142",
    "name": "Architectural engineering",
    "level": 1,
    "total_papers": 88,
    "total_score": 29.425663283000006,
    "venue_count": 18,
    "avg_score": 0.3343825373068183
  },
  {
    "id": "C120936955",
    "name": "Empirical research",
    "level": 2,
    "total_papers": 86,
    "total_score": 40.41125044,
    "venue_count": 21,
    "avg_score": 0.4698982609302326
  },
  {
    "id": "C50644808",
    "name": "Artificial neural network",
    "level": 2,
    "total_papers": 86,
    "total_score": 37.80972483,
    "venue_count": 12,
    "avg_score": 0.4396479631395349
  },
  {
    "id": "C163258240",
    "name": "Power (physics)",
    "level": 2,
    "total_papers": 84,
    "total_score": 11.679459976,
    "venue_count": 22,
    "avg_score": 0.1390411901904762
  },
  {
    "id": "C173608175",
    "name": "Parallel computing",
    "level": 1,
    "total_papers": 83,
    "total_score": 1.96270101,
    "venue_count": 20,
    "avg_score": 0.023647000120481928
  },
  {
    "id": "C115901376",
    "name": "Automation",
    "level": 2,
    "total_papers": 83,
    "total_score": 53.37378348,
    "venue_count": 16,
    "avg_score": 0.6430576322891566
  },
  {
    "id": "C108583219",
    "name": "Deep learning",
    "level": 2,
    "total_papers": 83,
    "total_score": 41.67630435,
    "venue_count": 14,
    "avg_score": 0.5021241487951807
  },
  {
    "id": "C52119013",
    "name": "Art history",
    "level": 1,
    "total_papers": 82,
    "total_score": 26.016277780000003,
    "venue_count": 14,
    "avg_score": 0.31727168024390245
  },
  {
    "id": "C186967261",
    "name": "Mobile device",
    "level": 2,
    "total_papers": 82,
    "total_score": 38.57114044,
    "venue_count": 15,
    "avg_score": 0.47037976146341465
  },
  {
    "id": "C557471498",
    "name": "Recommender system",
    "level": 2,
    "total_papers": 82,
    "total_score": 55.54185885,
    "venue_count": 8,
    "avg_score": 0.6773397420731707
  },
  {
    "id": "C2777267654",
    "name": "Test (biology)",
    "level": 2,
    "total_papers": 82,
    "total_score": 41.519504039999994,
    "venue_count": 19,
    "avg_score": 0.5063354151219511
  },
  {
    "id": "C56461940",
    "name": "Eye tracking",
    "level": 2,
    "total_papers": 81,
    "total_score": 46.75633927999999,
    "venue_count": 18,
    "avg_score": 0.5772387565432098
  },
  {
    "id": "C2778755073",
    "name": "Scale (ratio)",
    "level": 2,
    "total_papers": 81,
    "total_score": 41.621926859999995,
    "venue_count": 23,
    "avg_score": 0.5138509488888888
  },
  {
    "id": "C113843644",
    "name": "Interface (matter)",
    "level": 4,
    "total_papers": 80,
    "total_score": 40.87006328,
    "venue_count": 18,
    "avg_score": 0.5108757909999999
  },
  {
    "id": "C157915830",
    "name": "Bubble",
    "level": 2,
    "total_papers": 80,
    "total_score": 0,
    "venue_count": 18,
    "avg_score": 0
  },
  {
    "id": "C129307140",
    "name": "Maximum bubble pressure method",
    "level": 3,
    "total_papers": 80,
    "total_score": 0,
    "venue_count": 18,
    "avg_score": 0
  },
  {
    "id": "C192209626",
    "name": "Focus (optics)",
    "level": 2,
    "total_papers": 80,
    "total_score": 39.96029266000001,
    "venue_count": 22,
    "avg_score": 0.4995036582500001
  },
  {
    "id": "C115961682",
    "name": "Image (mathematics)",
    "level": 2,
    "total_papers": 80,
    "total_score": 15.151974398999998,
    "venue_count": 22,
    "avg_score": 0.18939967998749999
  },
  {
    "id": "C203663800",
    "name": "Citizen journalism",
    "level": 2,
    "total_papers": 80,
    "total_score": 42.33175567999999,
    "venue_count": 16,
    "avg_score": 0.5291469459999999
  },
  {
    "id": "C114614502",
    "name": "Combinatorics",
    "level": 1,
    "total_papers": 79,
    "total_score": 3.5081779899999996,
    "venue_count": 16,
    "avg_score": 0.04440731632911392
  },
  {
    "id": "C2776359362",
    "name": "Representation (politics)",
    "level": 3,
    "total_papers": 79,
    "total_score": 41.72884031,
    "venue_count": 22,
    "avg_score": 0.5282131684810127
  },
  {
    "id": "C2776291640",
    "name": "Value (mathematics)",
    "level": 2,
    "total_papers": 79,
    "total_score": 41.61222197,
    "venue_count": 21,
    "avg_score": 0.5267369869620253
  },
  {
    "id": "C2777904410",
    "name": "Software",
    "level": 2,
    "total_papers": 78,
    "total_score": 28.456089814,
    "venue_count": 21,
    "avg_score": 0.36482166428205126
  },
  {
    "id": "C2779041454",
    "name": "Chatbot",
    "level": 2,
    "total_papers": 78,
    "total_score": 63.20197821,
    "venue_count": 16,
    "avg_score": 0.8102817719230769
  },
  {
    "id": "C149923435",
    "name": "Demography",
    "level": 1,
    "total_papers": 77,
    "total_score": 4.0811144640000006,
    "venue_count": 24,
    "avg_score": 0.05300148654545455
  },
  {
    "id": "C183003079",
    "name": "Personalization",
    "level": 2,
    "total_papers": 77,
    "total_score": 53.34570569,
    "venue_count": 21,
    "avg_score": 0.6928013725974026
  },
  {
    "id": "C2778572836",
    "name": "Space (punctuation)",
    "level": 2,
    "total_papers": 76,
    "total_score": 40.03936122,
    "venue_count": 25,
    "avg_score": 0.5268337002631579
  },
  {
    "id": "C39890363",
    "name": "Generative grammar",
    "level": 2,
    "total_papers": 76,
    "total_score": 46.96701512,
    "venue_count": 22,
    "avg_score": 0.6179870410526316
  },
  {
    "id": "C207347870",
    "name": "Gesture",
    "level": 2,
    "total_papers": 75,
    "total_score": 52.352397010000004,
    "venue_count": 20,
    "avg_score": 0.6980319601333334
  },
  {
    "id": "C2780233690",
    "name": "Transparency (behavior)",
    "level": 2,
    "total_papers": 75,
    "total_score": 52.02090211,
    "venue_count": 22,
    "avg_score": 0.6936120281333333
  },
  {
    "id": "C81860439",
    "name": "Internet of Things",
    "level": 2,
    "total_papers": 74,
    "total_score": 34.37060841500001,
    "venue_count": 13,
    "avg_score": 0.46446768128378385
  },
  {
    "id": "C192562407",
    "name": "Materials science",
    "level": 0,
    "total_papers": 73,
    "total_score": 14.006771177999994,
    "venue_count": 21,
    "avg_score": 0.19187357778082184
  },
  {
    "id": "C139719470",
    "name": "Macroeconomics",
    "level": 1,
    "total_papers": 72,
    "total_score": 0.766497194,
    "venue_count": 22,
    "avg_score": 0.010645794361111112
  },
  {
    "id": "C558461103",
    "name": "Anxiety",
    "level": 2,
    "total_papers": 72,
    "total_score": 40.74340222,
    "venue_count": 17,
    "avg_score": 0.5658805863888889
  },
  {
    "id": "C122980154",
    "name": "Feeling",
    "level": 2,
    "total_papers": 72,
    "total_score": 44.128258990000006,
    "venue_count": 21,
    "avg_score": 0.6128924859722223
  },
  {
    "id": "C201025465",
    "name": "User experience design",
    "level": 2,
    "total_papers": 71,
    "total_score": 33.32470426,
    "venue_count": 21,
    "avg_score": 0.46936203183098585
  },
  {
    "id": "C136197465",
    "name": "Variety (cybernetics)",
    "level": 2,
    "total_papers": 71,
    "total_score": 41.13770232,
    "venue_count": 28,
    "avg_score": 0.5794042580281691
  },
  {
    "id": "C2777211547",
    "name": "Training (meteorology)",
    "level": 2,
    "total_papers": 69,
    "total_score": 38.8009695,
    "venue_count": 16,
    "avg_score": 0.5623328913043478
  },
  {
    "id": "C3017944768",
    "name": "Poison control",
    "level": 2,
    "total_papers": 69,
    "total_score": 27.057008000000003,
    "venue_count": 9,
    "avg_score": 0.3921305507246377
  },
  {
    "id": "C112930515",
    "name": "Risk analysis (engineering)",
    "level": 1,
    "total_papers": 68,
    "total_score": 26.65889352,
    "venue_count": 18,
    "avg_score": 0.39204255176470587
  },
  {
    "id": "C120314980",
    "name": "Distributed computing",
    "level": 1,
    "total_papers": 67,
    "total_score": 28.9050703,
    "venue_count": 9,
    "avg_score": 0.4314189597014925
  },
  {
    "id": "C2780665704",
    "name": "Intervention (counseling)",
    "level": 2,
    "total_papers": 66,
    "total_score": 36.35940646,
    "venue_count": 25,
    "avg_score": 0.5509000978787879
  },
  {
    "id": "C81363708",
    "name": "Convolutional neural network",
    "level": 2,
    "total_papers": 66,
    "total_score": 38.00240049000001,
    "venue_count": 10,
    "avg_score": 0.575793946818182
  },
  {
    "id": "C126838900",
    "name": "Radiology",
    "level": 1,
    "total_papers": 65,
    "total_score": 1.29719764,
    "venue_count": 25,
    "avg_score": 0.01995688676923077
  },
  {
    "id": "C175444787",
    "name": "Microeconomics",
    "level": 1,
    "total_papers": 64,
    "total_score": 4.762425212,
    "venue_count": 22,
    "avg_score": 0.0744128939375
  },
  {
    "id": "C29595303",
    "name": "Media studies",
    "level": 1,
    "total_papers": 64,
    "total_score": 20.52703579,
    "venue_count": 12,
    "avg_score": 0.32073493421875
  },
  {
    "id": "C43617362",
    "name": "Chromatography",
    "level": 1,
    "total_papers": 64,
    "total_score": 0.1493223,
    "venue_count": 20,
    "avg_score": 0.0023331609375
  },
  {
    "id": "C108170787",
    "name": "Agency (philosophy)",
    "level": 2,
    "total_papers": 63,
    "total_score": 37.39228312999999,
    "venue_count": 19,
    "avg_score": 0.5935283036507935
  },
  {
    "id": "C199068039",
    "name": "Immersion (mathematics)",
    "level": 2,
    "total_papers": 63,
    "total_score": 36.89438923,
    "venue_count": 12,
    "avg_score": 0.5856252258730159
  },
  {
    "id": "C198531522",
    "name": "Sample (material)",
    "level": 2,
    "total_papers": 63,
    "total_score": 31.227241119999995,
    "venue_count": 19,
    "avg_score": 0.4956704939682539
  },
  {
    "id": "C28719098",
    "name": "Point (geometry)",
    "level": 2,
    "total_papers": 63,
    "total_score": 31.280759400000004,
    "venue_count": 20,
    "avg_score": 0.49651999047619055
  },
  {
    "id": "C24890656",
    "name": "Acoustics",
    "level": 1,
    "total_papers": 63,
    "total_score": 6.66187019,
    "venue_count": 22,
    "avg_score": 0.10574397126984127
  },
  {
    "id": "C36464697",
    "name": "Visualization",
    "level": 2,
    "total_papers": 62,
    "total_score": 34.498519439999995,
    "venue_count": 22,
    "avg_score": 0.5564277329032258
  },
  {
    "id": "C127313418",
    "name": "Geology",
    "level": 0,
    "total_papers": 62,
    "total_score": 4.502688643000001,
    "venue_count": 21,
    "avg_score": 0.07262401037096776
  },
  {
    "id": "C79974875",
    "name": "Cloud computing",
    "level": 2,
    "total_papers": 62,
    "total_score": 32.51897610599999,
    "venue_count": 11,
    "avg_score": 0.5244996146129031
  },
  {
    "id": "C2779916870",
    "name": "Gaze",
    "level": 2,
    "total_papers": 61,
    "total_score": 40.400834890000006,
    "venue_count": 19,
    "avg_score": 0.6623087686885247
  },
  {
    "id": "C22212356",
    "name": "Transport engineering",
    "level": 1,
    "total_papers": 61,
    "total_score": 17.79331675,
    "venue_count": 14,
    "avg_score": 0.2916937172131147
  },
  {
    "id": "C195704467",
    "name": "Facial expression",
    "level": 2,
    "total_papers": 61,
    "total_score": 35.39513797,
    "venue_count": 8,
    "avg_score": 0.580248163442623
  },
  {
    "id": "C80444323",
    "name": "Theoretical computer science",
    "level": 1,
    "total_papers": 61,
    "total_score": 16.252455756,
    "venue_count": 12,
    "avg_score": 0.26643370091803276
  },
  {
    "id": "C2777438025",
    "name": "Emotion recognition",
    "level": 2,
    "total_papers": 61,
    "total_score": 32.32124922999999,
    "venue_count": 5,
    "avg_score": 0.5298565447540983
  },
  {
    "id": "C204787440",
    "name": "Alternative medicine",
    "level": 2,
    "total_papers": 60,
    "total_score": 2.02457384,
    "venue_count": 20,
    "avg_score": 0.033742897333333334
  },
  {
    "id": "C11012388",
    "name": "Creativity",
    "level": 2,
    "total_papers": 59,
    "total_score": 39.65789106999999,
    "venue_count": 16,
    "avg_score": 0.6721676452542371
  },
  {
    "id": "C146549078",
    "name": "Exoskeleton",
    "level": 2,
    "total_papers": 59,
    "total_score": 48.827065219999994,
    "venue_count": 4,
    "avg_score": 0.8275773766101694
  },
  {
    "id": "C59822182",
    "name": "Botany",
    "level": 1,
    "total_papers": 58,
    "total_score": 0.201027185,
    "venue_count": 24,
    "avg_score": 0.003465985948275862
  },
  {
    "id": "C187288502",
    "name": "Personality",
    "level": 2,
    "total_papers": 57,
    "total_score": 30.374131081,
    "venue_count": 18,
    "avg_score": 0.5328794926491228
  },
  {
    "id": "C79403827",
    "name": "Real-time computing",
    "level": 1,
    "total_papers": 57,
    "total_score": 24.589119030000003,
    "venue_count": 6,
    "avg_score": 0.4313880531578948
  },
  {
    "id": "C100609095",
    "name": "Embodied cognition",
    "level": 2,
    "total_papers": 56,
    "total_score": 39.20101073000001,
    "venue_count": 20,
    "avg_score": 0.7000180487500002
  },
  {
    "id": "C2777365542",
    "name": "Avatar",
    "level": 2,
    "total_papers": 56,
    "total_score": 42.02865469,
    "venue_count": 17,
    "avg_score": 0.7505116908928572
  },
  {
    "id": "C43214815",
    "name": "Reliability (semiconductor)",
    "level": 3,
    "total_papers": 56,
    "total_score": 32.34679172,
    "venue_count": 19,
    "avg_score": 0.5776212807142856
  },
  {
    "id": "C184720557",
    "name": "Topology (electrical circuits)",
    "level": 2,
    "total_papers": 56,
    "total_score": 26.104477250000002,
    "venue_count": 3,
    "avg_score": 0.46615137946428575
  },
  {
    "id": "C2779903281",
    "name": "Modalities",
    "level": 2,
    "total_papers": 55,
    "total_score": 32.25492688,
    "venue_count": 19,
    "avg_score": 0.586453216
  },
  {
    "id": "C123657996",
    "name": "Architecture",
    "level": 2,
    "total_papers": 55,
    "total_score": 29.632805529999995,
    "venue_count": 20,
    "avg_score": 0.5387782823636362
  },
  {
    "id": "C139807058",
    "name": "Adaptation (eye)",
    "level": 2,
    "total_papers": 55,
    "total_score": 32.01563934,
    "venue_count": 20,
    "avg_score": 0.5821025334545454
  },
  {
    "id": "C135628077",
    "name": "Finite element method",
    "level": 2,
    "total_papers": 55,
    "total_score": 16.464479775999997,
    "venue_count": 4,
    "avg_score": 0.2993541777454545
  },
  {
    "id": "C134362201",
    "name": "Mental health",
    "level": 2,
    "total_papers": 54,
    "total_score": 31.453692560000004,
    "venue_count": 20,
    "avg_score": 0.5824757881481483
  },
  {
    "id": "C159985019",
    "name": "Composite material",
    "level": 1,
    "total_papers": 54,
    "total_score": 3.4451444,
    "venue_count": 18,
    "avg_score": 0.06379897037037037
  },
  {
    "id": "C2780586970",
    "name": "Popularity",
    "level": 2,
    "total_papers": 54,
    "total_score": 35.98359181,
    "venue_count": 19,
    "avg_score": 0.6663628112962963
  },
  {
    "id": "C141071460",
    "name": "Surgery",
    "level": 1,
    "total_papers": 54,
    "total_score": 5.558093778000001,
    "venue_count": 11,
    "avg_score": 0.10292766255555558
  },
  {
    "id": "C65414064",
    "name": "Autonomy",
    "level": 2,
    "total_papers": 53,
    "total_score": 30.56694473,
    "venue_count": 19,
    "avg_score": 0.576734806226415
  },
  {
    "id": "C545542383",
    "name": "Medical emergency",
    "level": 1,
    "total_papers": 53,
    "total_score": 12.54514466,
    "venue_count": 10,
    "avg_score": 0.23670084264150942
  },
  {
    "id": "C2776185967",
    "name": "Technology acceptance model",
    "level": 3,
    "total_papers": 53,
    "total_score": 32.076209420000005,
    "venue_count": 9,
    "avg_score": 0.6052114984905661
  },
  {
    "id": "C11171543",
    "name": "Psychoanalysis",
    "level": 1,
    "total_papers": 51,
    "total_score": 3.8689509220000002,
    "venue_count": 21,
    "avg_score": 0.07586178278431373
  },
  {
    "id": "C2777212361",
    "name": "Class (philosophy)",
    "level": 2,
    "total_papers": 51,
    "total_score": 25.9493937,
    "venue_count": 14,
    "avg_score": 0.5088116411764706
  },
  {
    "id": "C182306322",
    "name": "Order (exchange)",
    "level": 2,
    "total_papers": 51,
    "total_score": 24.85994874,
    "venue_count": 22,
    "avg_score": 0.48744997529411765
  },
  {
    "id": "C2775922551",
    "name": "Parallels",
    "level": 2,
    "total_papers": 51,
    "total_score": 0.6653505,
    "venue_count": 14,
    "avg_score": 0.013046088235294117
  },
  {
    "id": "C97355855",
    "name": "Thermodynamics",
    "level": 1,
    "total_papers": 51,
    "total_score": 0.280536357,
    "venue_count": 19,
    "avg_score": 0.005500712882352941
  },
  {
    "id": "C152086174",
    "name": "Haptic technology",
    "level": 2,
    "total_papers": 50,
    "total_score": 34.16038084,
    "venue_count": 16,
    "avg_score": 0.6832076168000001
  },
  {
    "id": "C78458016",
    "name": "Evolutionary biology",
    "level": 1,
    "total_papers": 50,
    "total_score": 0,
    "venue_count": 22,
    "avg_score": 0
  },
  {
    "id": "C53332860",
    "name": "Metaverse",
    "level": 3,
    "total_papers": 50,
    "total_score": 32.00785563,
    "venue_count": 14,
    "avg_score": 0.6401571126000001
  },
  {
    "id": "C2777455480",
    "name": "Participatory design",
    "level": 3,
    "total_papers": 50,
    "total_score": 29.226951079999996,
    "venue_count": 13,
    "avg_score": 0.5845390215999999
  },
  {
    "id": "C58640448",
    "name": "Cartography",
    "level": 1,
    "total_papers": 50,
    "total_score": 3.083091385,
    "venue_count": 22,
    "avg_score": 0.0616618277
  },
  {
    "id": "C126255220",
    "name": "Mathematical optimization",
    "level": 1,
    "total_papers": 50,
    "total_score": 18.906272420000004,
    "venue_count": 5,
    "avg_score": 0.37812544840000006
  },
  {
    "id": "C74196892",
    "name": "Thematic analysis",
    "level": 3,
    "total_papers": 49,
    "total_score": 27.66620605,
    "venue_count": 20,
    "avg_score": 0.5646164499999999
  },
  {
    "id": "C206345919",
    "name": "Resource (disambiguation)",
    "level": 2,
    "total_papers": 49,
    "total_score": 24.171488869999997,
    "venue_count": 22,
    "avg_score": 0.49329569122448974
  },
  {
    "id": "C206776904",
    "name": "Mixed reality",
    "level": 3,
    "total_papers": 49,
    "total_score": 24.4667281,
    "venue_count": 16,
    "avg_score": 0.4993209816326531
  },
  {
    "id": "C2778137410",
    "name": "Government (linguistics)",
    "level": 2,
    "total_papers": 48,
    "total_score": 24.659653979999998,
    "venue_count": 15,
    "avg_score": 0.51374279125
  },
  {
    "id": "C199639397",
    "name": "Engineering drawing",
    "level": 1,
    "total_papers": 48,
    "total_score": 17.489798500000003,
    "venue_count": 9,
    "avg_score": 0.3643708020833334
  },
  {
    "id": "C110354214",
    "name": "Engineering management",
    "level": 1,
    "total_papers": 48,
    "total_score": 17.04363659,
    "venue_count": 16,
    "avg_score": 0.35507576229166665
  },
  {
    "id": "C2781238097",
    "name": "Object (grammar)",
    "level": 2,
    "total_papers": 48,
    "total_score": 25.01987978,
    "venue_count": 19,
    "avg_score": 0.5212474954166667
  },
  {
    "id": "C2780801425",
    "name": "Construct (python library)",
    "level": 2,
    "total_papers": 48,
    "total_score": 27.146941240000007,
    "venue_count": 25,
    "avg_score": 0.5655612758333335
  },
  {
    "id": "C13280743",
    "name": "Geodesy",
    "level": 1,
    "total_papers": 48,
    "total_score": 0.40030447,
    "venue_count": 17,
    "avg_score": 0.008339676458333334
  },
  {
    "id": "C166735990",
    "name": "Human factors and ergonomics",
    "level": 3,
    "total_papers": 48,
    "total_score": 23.610431430000006,
    "venue_count": 6,
    "avg_score": 0.4918839881250001
  },
  {
    "id": "C555944384",
    "name": "Wireless",
    "level": 2,
    "total_papers": 47,
    "total_score": 15.523639826,
    "venue_count": 8,
    "avg_score": 0.3302902090638298
  },
  {
    "id": "C107993555",
    "name": "Gender studies",
    "level": 1,
    "total_papers": 46,
    "total_score": 12.20340764,
    "venue_count": 13,
    "avg_score": 0.26529147043478263
  },
  {
    "id": "C105339364",
    "name": "Software deployment",
    "level": 2,
    "total_papers": 46,
    "total_score": 26.799466480000003,
    "venue_count": 19,
    "avg_score": 0.5825970973913044
  },
  {
    "id": "C74909509",
    "name": "Gerontology",
    "level": 1,
    "total_papers": 46,
    "total_score": 13.391965699999998,
    "venue_count": 17,
    "avg_score": 0.29112968913043474
  },
  {
    "id": "C132829578",
    "name": "Situated",
    "level": 2,
    "total_papers": 45,
    "total_score": 30.53819873,
    "venue_count": 18,
    "avg_score": 0.6786266384444445
  },
  {
    "id": "C2780791683",
    "name": "Action (physics)",
    "level": 2,
    "total_papers": 45,
    "total_score": 24.2578232,
    "venue_count": 21,
    "avg_score": 0.5390627377777778
  },
  {
    "id": "C205778803",
    "name": "Autism",
    "level": 2,
    "total_papers": 45,
    "total_score": 26.12785539,
    "venue_count": 15,
    "avg_score": 0.5806190086666667
  },
  {
    "id": "C158154518",
    "name": "Relevance (law)",
    "level": 2,
    "total_papers": 45,
    "total_score": 26.34127432,
    "venue_count": 18,
    "avg_score": 0.5853616515555555
  },
  {
    "id": "C109359841",
    "name": "Inclusion (mineral)",
    "level": 2,
    "total_papers": 45,
    "total_score": 23.59754014,
    "venue_count": 16,
    "avg_score": 0.5243897808888889
  },
  {
    "id": "C145460709",
    "name": "Human–robot interaction",
    "level": 3,
    "total_papers": 45,
    "total_score": 24.382029169999996,
    "venue_count": 14,
    "avg_score": 0.5418228704444443
  },
  {
    "id": "C66204764",
    "name": "Sustainability",
    "level": 2,
    "total_papers": 44,
    "total_score": 26.038512424999997,
    "venue_count": 16,
    "avg_score": 0.5917843732954545
  },
  {
    "id": "C159047783",
    "name": "Virology",
    "level": 1,
    "total_papers": 44,
    "total_score": 5.003480174000001,
    "venue_count": 18,
    "avg_score": 0.11371545850000002
  },
  {
    "id": "C104114177",
    "name": "Motion (physics)",
    "level": 2,
    "total_papers": 44,
    "total_score": 17.34231821,
    "venue_count": 14,
    "avg_score": 0.39414359568181817
  },
  {
    "id": "C2779318504",
    "name": "Research design",
    "level": 2,
    "total_papers": 43,
    "total_score": 20.798205200000005,
    "venue_count": 10,
    "avg_score": 0.48367919069767457
  },
  {
    "id": "C178790620",
    "name": "Organic chemistry",
    "level": 1,
    "total_papers": 43,
    "total_score": 0.097450644,
    "venue_count": 20,
    "avg_score": 0.002266294046511628
  },
  {
    "id": "C77660652",
    "name": "Computer graphics",
    "level": 2,
    "total_papers": 43,
    "total_score": 20.624831009999998,
    "venue_count": 4,
    "avg_score": 0.4796472327906976
  },
  {
    "id": "C2778355321",
    "name": "Identity (music)",
    "level": 2,
    "total_papers": 42,
    "total_score": 23.43428256,
    "venue_count": 18,
    "avg_score": 0.5579591085714286
  },
  {
    "id": "C95623464",
    "name": "Classifier (UML)",
    "level": 2,
    "total_papers": 42,
    "total_score": 18.59561237,
    "venue_count": 12,
    "avg_score": 0.4427526754761905
  },
  {
    "id": "C100521375",
    "name": "Competence (human resources)",
    "level": 2,
    "total_papers": 42,
    "total_score": 25.932853869999995,
    "venue_count": 19,
    "avg_score": 0.6174489016666665
  },
  {
    "id": "C2779885105",
    "name": "Empathy",
    "level": 2,
    "total_papers": 42,
    "total_score": 29.245518769999997,
    "venue_count": 20,
    "avg_score": 0.6963218754761904
  },
  {
    "id": "C2779304628",
    "name": "Face (sociological concept)",
    "level": 2,
    "total_papers": 42,
    "total_score": 21.092462779999995,
    "venue_count": 21,
    "avg_score": 0.5022014947619047
  },
  {
    "id": "C132525143",
    "name": "Graph",
    "level": 2,
    "total_papers": 42,
    "total_score": 20.179247529999998,
    "venue_count": 10,
    "avg_score": 0.48045827452380946
  },
  {
    "id": "C116675565",
    "name": "Outbreak",
    "level": 2,
    "total_papers": 41,
    "total_score": 1.31605639,
    "venue_count": 16,
    "avg_score": 0.032098936341463415
  },
  {
    "id": "C19351080",
    "name": "New product development",
    "level": 2,
    "total_papers": 41,
    "total_score": 20.292957936,
    "venue_count": 7,
    "avg_score": 0.49495019356097564
  },
  {
    "id": "C116834253",
    "name": "Identification (biology)",
    "level": 2,
    "total_papers": 41,
    "total_score": 21.188694579999996,
    "venue_count": 22,
    "avg_score": 0.5167974287804877
  },
  {
    "id": "C2778818304",
    "name": "Rehabilitation",
    "level": 2,
    "total_papers": 41,
    "total_score": 22.856818510000004,
    "venue_count": 9,
    "avg_score": 0.557483378292683
  },
  {
    "id": "C3006700255",
    "name": "2019-20 coronavirus outbreak",
    "level": 3,
    "total_papers": 40,
    "total_score": 20.337034159999998,
    "venue_count": 16,
    "avg_score": 0.508425854
  },
  {
    "id": "C90559484",
    "name": "Expression (computer science)",
    "level": 2,
    "total_papers": 40,
    "total_score": 21.08516464,
    "venue_count": 13,
    "avg_score": 0.527129116
  },
  {
    "id": "C93225998",
    "name": "Moderation",
    "level": 2,
    "total_papers": 39,
    "total_score": 29.32838559,
    "venue_count": 10,
    "avg_score": 0.7520098869230769
  },
  {
    "id": "C2779182362",
    "name": "Session (web analytics)",
    "level": 2,
    "total_papers": 39,
    "total_score": 25.14998187,
    "venue_count": 13,
    "avg_score": 0.6448713300000001
  },
  {
    "id": "C2780689630",
    "name": "Driving simulator",
    "level": 2,
    "total_papers": 39,
    "total_score": 20.501371940000002,
    "venue_count": 8,
    "avg_score": 0.5256762035897437
  },
  {
    "id": "C2778447006",
    "name": "Icon",
    "level": 2,
    "total_papers": 39,
    "total_score": 30.125813909999998,
    "venue_count": 6,
    "avg_score": 0.7724567669230769
  },
  {
    "id": "C144430266",
    "name": "Interactivity",
    "level": 2,
    "total_papers": 38,
    "total_score": 26.414445160000003,
    "venue_count": 14,
    "avg_score": 0.6951169778947369
  },
  {
    "id": "C85973986",
    "name": "Exploratory research",
    "level": 2,
    "total_papers": 38,
    "total_score": 19.212189219999996,
    "venue_count": 17,
    "avg_score": 0.5055839268421052
  },
  {
    "id": "C2777200299",
    "name": "Conversation",
    "level": 2,
    "total_papers": 38,
    "total_score": 26.116420910000002,
    "venue_count": 18,
    "avg_score": 0.6872742344736843
  },
  {
    "id": "C153083717",
    "name": "Leverage (statistics)",
    "level": 2,
    "total_papers": 38,
    "total_score": 23.142328189999997,
    "venue_count": 19,
    "avg_score": 0.6090086365789473
  },
  {
    "id": "C179420905",
    "name": "Mediation",
    "level": 2,
    "total_papers": 38,
    "total_score": 22.955864670000004,
    "venue_count": 13,
    "avg_score": 0.6041017018421053
  },
  {
    "id": "C52622490",
    "name": "Feature extraction",
    "level": 2,
    "total_papers": 38,
    "total_score": 18.72400416,
    "venue_count": 9,
    "avg_score": 0.49273695157894737
  },
  {
    "id": "C177212765",
    "name": "Workflow",
    "level": 2,
    "total_papers": 37,
    "total_score": 24.44242536,
    "venue_count": 16,
    "avg_score": 0.6606060908108109
  },
  {
    "id": "C554936623",
    "name": "Reading (process)",
    "level": 2,
    "total_papers": 37,
    "total_score": 21.829683829999997,
    "venue_count": 15,
    "avg_score": 0.5899914548648648
  },
  {
    "id": "C27206212",
    "name": "Theology",
    "level": 1,
    "total_papers": 37,
    "total_score": 0.6855122039999999,
    "venue_count": 19,
    "avg_score": 0.018527356864864862
  },
  {
    "id": "C74650414",
    "name": "Classical mechanics",
    "level": 1,
    "total_papers": 37,
    "total_score": 0.583176514,
    "venue_count": 10,
    "avg_score": 0.015761527405405408
  },
  {
    "id": "C60671577",
    "name": "Cultural heritage",
    "level": 2,
    "total_papers": 37,
    "total_score": 22.29895463,
    "venue_count": 13,
    "avg_score": 0.6026744494594595
  },
  {
    "id": "C83867959",
    "name": "Scopus",
    "level": 3,
    "total_papers": 37,
    "total_score": 22.27428093,
    "venue_count": 10,
    "avg_score": 0.6020075927027027
  },
  {
    "id": "C95190672",
    "name": "Meta-analysis",
    "level": 2,
    "total_papers": 37,
    "total_score": 19.983539349999997,
    "venue_count": 13,
    "avg_score": 0.540095658108108
  },
  {
    "id": "C194995250",
    "name": "Affordance",
    "level": 2,
    "total_papers": 37,
    "total_score": 25.565844610000003,
    "venue_count": 16,
    "avg_score": 0.6909687732432434
  },
  {
    "id": "C2775936607",
    "name": "Tracking (education)",
    "level": 2,
    "total_papers": 36,
    "total_score": 18.43121097,
    "venue_count": 16,
    "avg_score": 0.5119780825
  },
  {
    "id": "C81917197",
    "name": "Selection (genetic algorithm)",
    "level": 2,
    "total_papers": 36,
    "total_score": 19.262700050000003,
    "venue_count": 17,
    "avg_score": 0.535075001388889
  },
  {
    "id": "C2777601897",
    "name": "Presentation (obstetrics)",
    "level": 2,
    "total_papers": 36,
    "total_score": 21.651945929999997,
    "venue_count": 20,
    "avg_score": 0.6014429424999999
  },
  {
    "id": "C182321512",
    "name": "Web standards",
    "level": 3,
    "total_papers": 36,
    "total_score": 10.21796456,
    "venue_count": 6,
    "avg_score": 0.2838323488888889
  },
  {
    "id": "C89505385",
    "name": "User interface",
    "level": 2,
    "total_papers": 35,
    "total_score": 16.36087288,
    "venue_count": 15,
    "avg_score": 0.4674535108571428
  },
  {
    "id": "C2778061430",
    "name": "Scholarship",
    "level": 2,
    "total_papers": 35,
    "total_score": 21.227298639999997,
    "venue_count": 13,
    "avg_score": 0.6064942468571428
  },
  {
    "id": "C34972735",
    "name": "Engineering design process",
    "level": 2,
    "total_papers": 35,
    "total_score": 16.086098630000002,
    "venue_count": 11,
    "avg_score": 0.4596028180000001
  },
  {
    "id": "C54355233",
    "name": "Genetics",
    "level": 1,
    "total_papers": 35,
    "total_score": 0.5931330349999999,
    "venue_count": 17,
    "avg_score": 0.01694665814285714
  },
  {
    "id": "C3007834351",
    "name": "Severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2)",
    "level": 5,
    "total_papers": 35,
    "total_score": 17.634423820000002,
    "venue_count": 17,
    "avg_score": 0.5038406805714286
  },
  {
    "id": "C194669863",
    "name": "Web accessibility",
    "level": 4,
    "total_papers": 35,
    "total_score": 23.890749710000005,
    "venue_count": 5,
    "avg_score": 0.682592848857143
  },
  {
    "id": "C105702510",
    "name": "Anatomy",
    "level": 1,
    "total_papers": 35,
    "total_score": 3.7476296650000003,
    "venue_count": 10,
    "avg_score": 0.10707513328571429
  },
  {
    "id": "C2779687700",
    "name": "Blockchain",
    "level": 2,
    "total_papers": 35,
    "total_score": 25.236209119999998,
    "venue_count": 8,
    "avg_score": 0.7210345462857143
  },
  {
    "id": "C2865642",
    "name": "Big Five personality traits",
    "level": 3,
    "total_papers": 35,
    "total_score": 18.048893654000004,
    "venue_count": 13,
    "avg_score": 0.5156826758285715
  },
  {
    "id": "C2780226545",
    "name": "Modality (human–computer interaction)",
    "level": 2,
    "total_papers": 35,
    "total_score": 19.840257040000004,
    "venue_count": 12,
    "avg_score": 0.566864486857143
  },
  {
    "id": "C37531588",
    "name": "Exhibition",
    "level": 2,
    "total_papers": 35,
    "total_score": 28.83815067,
    "venue_count": 13,
    "avg_score": 0.8239471620000001
  },
  {
    "id": "C12267149",
    "name": "Support vector machine",
    "level": 2,
    "total_papers": 35,
    "total_score": 15.409905444000001,
    "venue_count": 14,
    "avg_score": 0.44028301268571435
  },
  {
    "id": "C2780876879",
    "name": "Meaning (existential)",
    "level": 2,
    "total_papers": 34,
    "total_score": 19.477515490000002,
    "venue_count": 16,
    "avg_score": 0.5728681026470589
  },
  {
    "id": "C3018412434",
    "name": "Video game",
    "level": 2,
    "total_papers": 34,
    "total_score": 18.435901970000003,
    "venue_count": 16,
    "avg_score": 0.5422324108823531
  },
  {
    "id": "C120912362",
    "name": "Higher education",
    "level": 2,
    "total_papers": 34,
    "total_score": 16.743813839999998,
    "venue_count": 8,
    "avg_score": 0.4924651129411764
  },
  {
    "id": "C63479239",
    "name": "Robustness (evolution)",
    "level": 3,
    "total_papers": 34,
    "total_score": 19.298427140000005,
    "venue_count": 11,
    "avg_score": 0.5676007982352943
  },
  {
    "id": "C185798385",
    "name": "Benchmark (surveying)",
    "level": 2,
    "total_papers": 34,
    "total_score": 19.35487582,
    "venue_count": 10,
    "avg_score": 0.5692610535294118
  },
  {
    "id": "C47177190",
    "name": "Curriculum",
    "level": 2,
    "total_papers": 34,
    "total_score": 14.779927395999998,
    "venue_count": 12,
    "avg_score": 0.4347037469411764
  },
  {
    "id": "C162307627",
    "name": "Enhanced Data Rates for GSM Evolution",
    "level": 2,
    "total_papers": 34,
    "total_score": 18.223264589999996,
    "venue_count": 7,
    "avg_score": 0.5359783702941175
  },
  {
    "id": "C2780224610",
    "name": "Credibility",
    "level": 2,
    "total_papers": 33,
    "total_score": 23.56743902,
    "venue_count": 15,
    "avg_score": 0.7141648187878787
  },
  {
    "id": "C176217482",
    "name": "Metric (unit)",
    "level": 2,
    "total_papers": 33,
    "total_score": 9.655370790000001,
    "venue_count": 16,
    "avg_score": 0.29258699363636365
  },
  {
    "id": "C121955636",
    "name": "Accounting",
    "level": 1,
    "total_papers": 33,
    "total_score": 3.4478433249999996,
    "venue_count": 19,
    "avg_score": 0.10448010075757574
  },
  {
    "id": "C2781249084",
    "name": "Preference",
    "level": 2,
    "total_papers": 33,
    "total_score": 18.97169646,
    "venue_count": 17,
    "avg_score": 0.5748998927272727
  },
  {
    "id": "C54290928",
    "name": "Wearable technology",
    "level": 3,
    "total_papers": 33,
    "total_score": 17.10336056,
    "venue_count": 14,
    "avg_score": 0.5182836533333333
  },
  {
    "id": "C198439703",
    "name": "Computer-supported cooperative work",
    "level": 3,
    "total_papers": 33,
    "total_score": 21.017391139999997,
    "venue_count": 5,
    "avg_score": 0.6368906406060605
  },
  {
    "id": "C84309077",
    "name": "Entrepreneurship",
    "level": 2,
    "total_papers": 33,
    "total_score": 18.481355219999998,
    "venue_count": 7,
    "avg_score": 0.5600410672727272
  },
  {
    "id": "C127162648",
    "name": "Channel (broadcasting)",
    "level": 2,
    "total_papers": 33,
    "total_score": 10.70684185,
    "venue_count": 12,
    "avg_score": 0.32444975303030305
  },
  {
    "id": "C66402592",
    "name": "Sentiment analysis",
    "level": 2,
    "total_papers": 33,
    "total_score": 20.817017720000006,
    "venue_count": 5,
    "avg_score": 0.630818718787879
  },
  {
    "id": "C169087156",
    "name": "Framing (construction)",
    "level": 2,
    "total_papers": 32,
    "total_score": 19.78274877,
    "venue_count": 12,
    "avg_score": 0.6182108990625
  },
  {
    "id": "C14224292",
    "name": "Conceptual framework",
    "level": 2,
    "total_papers": 32,
    "total_score": 15.040927029999999,
    "venue_count": 11,
    "avg_score": 0.47002896968749996
  },
  {
    "id": "C67363961",
    "name": "Information and Communications Technology",
    "level": 2,
    "total_papers": 32,
    "total_score": 15.595315440000002,
    "venue_count": 14,
    "avg_score": 0.48735360750000006
  },
  {
    "id": "C120823896",
    "name": "Product design",
    "level": 3,
    "total_papers": 32,
    "total_score": 16.36356335,
    "venue_count": 9,
    "avg_score": 0.5113613546875
  },
  {
    "id": "C16443162",
    "name": "Educational technology",
    "level": 2,
    "total_papers": 32,
    "total_score": 11.89432733,
    "venue_count": 7,
    "avg_score": 0.3716977290625
  },
  {
    "id": "C106306483",
    "name": "Futures contract",
    "level": 2,
    "total_papers": 31,
    "total_score": 23.04957042,
    "venue_count": 8,
    "avg_score": 0.7435345296774193
  },
  {
    "id": "C204983608",
    "name": "Productivity",
    "level": 2,
    "total_papers": 31,
    "total_score": 16.903456430000002,
    "venue_count": 14,
    "avg_score": 0.5452727880645162
  },
  {
    "id": "C164850336",
    "name": "Interpersonal communication",
    "level": 2,
    "total_papers": 31,
    "total_score": 17.01719436,
    "venue_count": 16,
    "avg_score": 0.5489417535483871
  },
  {
    "id": "C2778805511",
    "name": "Citation",
    "level": 2,
    "total_papers": 31,
    "total_score": 18.45344733,
    "venue_count": 5,
    "avg_score": 0.5952724945161291
  },
  {
    "id": "C61641136",
    "name": "Cognitive load",
    "level": 3,
    "total_papers": 31,
    "total_score": 17.81957149,
    "venue_count": 11,
    "avg_score": 0.5748248867741936
  },
  {
    "id": "C87156501",
    "name": "Qualitative property",
    "level": 2,
    "total_papers": 31,
    "total_score": 15.421524020000001,
    "venue_count": 6,
    "avg_score": 0.49746851677419357
  },
  {
    "id": "C201305675",
    "name": "Stakeholder",
    "level": 2,
    "total_papers": 31,
    "total_score": 18.61860758,
    "venue_count": 12,
    "avg_score": 0.600600244516129
  },
  {
    "id": "C21036866",
    "name": "Stress (linguistics)",
    "level": 2,
    "total_papers": 31,
    "total_score": 15.323415339999999,
    "venue_count": 12,
    "avg_score": 0.49430372064516126
  },
  {
    "id": "C2776872670",
    "name": "Simulator sickness",
    "level": 3,
    "total_papers": 31,
    "total_score": 22.360087099999998,
    "venue_count": 7,
    "avg_score": 0.7212931322580645
  },
  {
    "id": "C25343380",
    "name": "Relation (database)",
    "level": 2,
    "total_papers": 30,
    "total_score": 16.38388398,
    "venue_count": 14,
    "avg_score": 0.546129466
  },
  {
    "id": "C70587473",
    "name": "Transformative learning",
    "level": 2,
    "total_papers": 30,
    "total_score": 21.12370799,
    "venue_count": 13,
    "avg_score": 0.7041235996666667
  },
  {
    "id": "C18918823",
    "name": "Tourism",
    "level": 2,
    "total_papers": 30,
    "total_score": 17.23768769,
    "venue_count": 15,
    "avg_score": 0.5745895896666667
  },
  {
    "id": "C79158427",
    "name": "Analytics",
    "level": 2,
    "total_papers": 30,
    "total_score": 15.977911399999998,
    "venue_count": 15,
    "avg_score": 0.5325970466666666
  },
  {
    "id": "C142778471",
    "name": "Design thinking",
    "level": 2,
    "total_papers": 30,
    "total_score": 16.19092934,
    "venue_count": 10,
    "avg_score": 0.5396976446666667
  },
  {
    "id": "C2778738651",
    "name": "Novelty",
    "level": 2,
    "total_papers": 30,
    "total_score": 20.06384804,
    "venue_count": 15,
    "avg_score": 0.6687949346666666
  },
  {
    "id": "C48856860",
    "name": "Addiction",
    "level": 2,
    "total_papers": 30,
    "total_score": 17.84761644,
    "venue_count": 6,
    "avg_score": 0.5949205479999999
  },
  {
    "id": "C133462117",
    "name": "Data collection",
    "level": 2,
    "total_papers": 30,
    "total_score": 15.33024326,
    "venue_count": 13,
    "avg_score": 0.5110081086666667
  },
  {
    "id": "C2781316041",
    "name": "Diversity (politics)",
    "level": 2,
    "total_papers": 30,
    "total_score": 18.00805418,
    "venue_count": 15,
    "avg_score": 0.6002684726666666
  },
  {
    "id": "C127627568",
    "name": "Sociotechnical system",
    "level": 2,
    "total_papers": 29,
    "total_score": 22.57513781,
    "venue_count": 11,
    "avg_score": 0.7784530279310345
  },
  {
    "id": "C9751117",
    "name": "Optical head-mounted display",
    "level": 2,
    "total_papers": 29,
    "total_score": 15.07545721,
    "venue_count": 13,
    "avg_score": 0.5198433520689655
  },
  {
    "id": "C22467394",
    "name": "Multidisciplinary approach",
    "level": 2,
    "total_papers": 29,
    "total_score": 18.77369771,
    "venue_count": 15,
    "avg_score": 0.6473688865517242
  },
  {
    "id": "C75684735",
    "name": "Big data",
    "level": 2,
    "total_papers": 29,
    "total_score": 16.15626636,
    "venue_count": 11,
    "avg_score": 0.5571126331034483
  },
  {
    "id": "C25344961",
    "name": "Virtual machine",
    "level": 2,
    "total_papers": 29,
    "total_score": 13.64293029,
    "venue_count": 10,
    "avg_score": 0.47044587206896554
  },
  {
    "id": "C97931131",
    "name": "Discriminative model",
    "level": 2,
    "total_papers": 29,
    "total_score": 21.5931137,
    "venue_count": 3,
    "avg_score": 0.7445901275862069
  },
  {
    "id": "C2780598303",
    "name": "Flexibility (engineering)",
    "level": 2,
    "total_papers": 29,
    "total_score": 16.763494110000003,
    "venue_count": 15,
    "avg_score": 0.5780515210344829
  },
  {
    "id": "C547764534",
    "name": "Literacy",
    "level": 2,
    "total_papers": 28,
    "total_score": 14.514300100000002,
    "venue_count": 17,
    "avg_score": 0.5183678607142858
  },
  {
    "id": "C149782125",
    "name": "Econometrics",
    "level": 1,
    "total_papers": 28,
    "total_score": 7.075360355,
    "venue_count": 9,
    "avg_score": 0.25269144125
  },
  {
    "id": "C159437735",
    "name": "Gesture recognition",
    "level": 3,
    "total_papers": 28,
    "total_score": 16.88632617,
    "venue_count": 9,
    "avg_score": 0.6030830775
  },
  {
    "id": "C1276947",
    "name": "Astronomy",
    "level": 1,
    "total_papers": 28,
    "total_score": 1.6374079850000003,
    "venue_count": 16,
    "avg_score": 0.058478856607142866
  },
  {
    "id": "C173201364",
    "name": "Brain–computer interface",
    "level": 3,
    "total_papers": 28,
    "total_score": 18.43134144,
    "venue_count": 8,
    "avg_score": 0.6582621942857143
  },
  {
    "id": "C56995899",
    "name": "Focus group",
    "level": 2,
    "total_papers": 28,
    "total_score": 14.813264480000003,
    "venue_count": 12,
    "avg_score": 0.5290451600000001
  },
  {
    "id": "C2776459999",
    "name": "Fidelity",
    "level": 2,
    "total_papers": 28,
    "total_score": 16.52998581,
    "venue_count": 15,
    "avg_score": 0.5903566360714285
  },
  {
    "id": "C174998907",
    "name": "Work in process",
    "level": 2,
    "total_papers": 28,
    "total_score": 4.150092786,
    "venue_count": 9,
    "avg_score": 0.1482175995
  },
  {
    "id": "C48044578",
    "name": "Scalability",
    "level": 2,
    "total_papers": 28,
    "total_score": 17.55732867,
    "venue_count": 8,
    "avg_score": 0.6270474525
  },
  {
    "id": "C14036430",
    "name": "Function (biology)",
    "level": 2,
    "total_papers": 27,
    "total_score": 13.068883400000002,
    "venue_count": 16,
    "avg_score": 0.4840327185185186
  },
  {
    "id": "C123201435",
    "name": "Information privacy",
    "level": 2,
    "total_papers": 27,
    "total_score": 13.044706170000001,
    "venue_count": 13,
    "avg_score": 0.4831372655555556
  },
  {
    "id": "C191935318",
    "name": "China",
    "level": 2,
    "total_papers": 27,
    "total_score": 16.1639299,
    "venue_count": 11,
    "avg_score": 0.5986640703703704
  },
  {
    "id": "C2780733359",
    "name": "Mood",
    "level": 2,
    "total_papers": 27,
    "total_score": 16.28275431,
    "venue_count": 14,
    "avg_score": 0.6030649744444445
  },
  {
    "id": "C207267971",
    "name": "Emerging technologies",
    "level": 2,
    "total_papers": 27,
    "total_score": 13.25941523,
    "venue_count": 10,
    "avg_score": 0.49108945296296297
  },
  {
    "id": "C512170562",
    "name": "Entertainment",
    "level": 2,
    "total_papers": 27,
    "total_score": 14.54608271,
    "venue_count": 13,
    "avg_score": 0.5387438040740741
  },
  {
    "id": "C2776538412",
    "name": "Storytelling",
    "level": 3,
    "total_papers": 27,
    "total_score": 17.260846450000003,
    "venue_count": 15,
    "avg_score": 0.6392906092592594
  },
  {
    "id": "C2780081655",
    "name": "Continuance",
    "level": 2,
    "total_papers": 27,
    "total_score": 23.857286080000005,
    "venue_count": 5,
    "avg_score": 0.8836031881481483
  },
  {
    "id": "C95124753",
    "name": "Environmental ethics",
    "level": 1,
    "total_papers": 26,
    "total_score": 9.013131210000001,
    "venue_count": 8,
    "avg_score": 0.3466588926923077
  },
  {
    "id": "C147176958",
    "name": "Civil engineering",
    "level": 1,
    "total_papers": 26,
    "total_score": 2.379850806,
    "venue_count": 14,
    "avg_score": 0.0915327233076923
  },
  {
    "id": "C34447519",
    "name": "Market economy",
    "level": 1,
    "total_papers": 26,
    "total_score": 2.2013335450000002,
    "venue_count": 15,
    "avg_score": 0.08466667480769231
  },
  {
    "id": "C557433098",
    "name": "Android (operating system)",
    "level": 2,
    "total_papers": 26,
    "total_score": 17.01545927,
    "venue_count": 6,
    "avg_score": 0.6544407411538462
  },
  {
    "id": "C548259974",
    "name": "Audiology",
    "level": 1,
    "total_papers": 26,
    "total_score": 10.3768599,
    "venue_count": 11,
    "avg_score": 0.3991099961538461
  },
  {
    "id": "C8795937",
    "name": "Discipline",
    "level": 2,
    "total_papers": 26,
    "total_score": 14.763603699999997,
    "venue_count": 13,
    "avg_score": 0.5678309115384614
  },
  {
    "id": "C111226992",
    "name": "Teamwork",
    "level": 2,
    "total_papers": 26,
    "total_score": 17.01277155,
    "venue_count": 12,
    "avg_score": 0.6543373673076923
  },
  {
    "id": "C145804949",
    "name": "Situation awareness",
    "level": 2,
    "total_papers": 26,
    "total_score": 14.34824391,
    "venue_count": 10,
    "avg_score": 0.5518555350000001
  },
  {
    "id": "C140988679",
    "name": "Participatory action research",
    "level": 2,
    "total_papers": 26,
    "total_score": 13.675594010000001,
    "venue_count": 8,
    "avg_score": 0.525984385
  },
  {
    "id": "C64543145",
    "name": "Intersection (aeronautics)",
    "level": 2,
    "total_papers": 26,
    "total_score": 15.027253409999997,
    "venue_count": 13,
    "avg_score": 0.5779712849999998
  },
  {
    "id": "C126082660",
    "name": "Digital transformation",
    "level": 2,
    "total_papers": 26,
    "total_score": 15.533912390000001,
    "venue_count": 7,
    "avg_score": 0.5974581688461539
  },
  {
    "id": "C31510193",
    "name": "Facial recognition system",
    "level": 3,
    "total_papers": 26,
    "total_score": 10.633598469999999,
    "venue_count": 6,
    "avg_score": 0.4089845565384615
  },
  {
    "id": "C3020068454",
    "name": "Editorial board",
    "level": 2,
    "total_papers": 26,
    "total_score": 13.966122460000001,
    "venue_count": 3,
    "avg_score": 0.5371585561538462
  },
  {
    "id": "C189216461",
    "name": "Topology optimization",
    "level": 3,
    "total_papers": 26,
    "total_score": 16.97496871,
    "venue_count": 1,
    "avg_score": 0.6528834119230769
  },
  {
    "id": "C2776799497",
    "name": "Surface (topology)",
    "level": 2,
    "total_papers": 26,
    "total_score": 12.889247970000001,
    "venue_count": 1,
    "avg_score": 0.4957403065384616
  },
  {
    "id": "C170477896",
    "name": "Ideation",
    "level": 2,
    "total_papers": 25,
    "total_score": 16.217416359999998,
    "venue_count": 8,
    "avg_score": 0.6486966543999999
  },
  {
    "id": "C2778152352",
    "name": "Content (measure theory)",
    "level": 2,
    "total_papers": 25,
    "total_score": 12.843340629999998,
    "venue_count": 11,
    "avg_score": 0.5137336252
  },
  {
    "id": "C148730421",
    "name": "Encryption",
    "level": 2,
    "total_papers": 25,
    "total_score": 12.043586929999998,
    "venue_count": 5,
    "avg_score": 0.48174347719999994
  },
  {
    "id": "C2778538070",
    "name": "Autism spectrum disorder",
    "level": 3,
    "total_papers": 25,
    "total_score": 14.594294279999998,
    "venue_count": 11,
    "avg_score": 0.5837717711999999
  },
  {
    "id": "C62354387",
    "name": "Boundary (topology)",
    "level": 2,
    "total_papers": 25,
    "total_score": 12.902849219999998,
    "venue_count": 10,
    "avg_score": 0.5161139687999999
  },
  {
    "id": "C199776023",
    "name": "Negotiation",
    "level": 2,
    "total_papers": 25,
    "total_score": 13.492065909999999,
    "venue_count": 10,
    "avg_score": 0.5396826363999999
  },
  {
    "id": "C19966478",
    "name": "Mobile robot",
    "level": 3,
    "total_papers": 25,
    "total_score": 4.808206655999999,
    "venue_count": 14,
    "avg_score": 0.19232826624
  },
  {
    "id": "C94124525",
    "name": "Categorization",
    "level": 2,
    "total_papers": 25,
    "total_score": 15.12064035,
    "venue_count": 14,
    "avg_score": 0.604825614
  },
  {
    "id": "C62230096",
    "name": "Crowdsourcing",
    "level": 2,
    "total_papers": 25,
    "total_score": 18.55830725,
    "venue_count": 8,
    "avg_score": 0.7423322899999999
  },
  {
    "id": "C503285160",
    "name": "Game design",
    "level": 2,
    "total_papers": 25,
    "total_score": 12.360271369999996,
    "venue_count": 12,
    "avg_score": 0.49441085479999985
  },
  {
    "id": "C88610354",
    "name": "Teaching method",
    "level": 2,
    "total_papers": 25,
    "total_score": 6.530022504,
    "venue_count": 14,
    "avg_score": 0.26120090015999997
  },
  {
    "id": "C6557445",
    "name": "Agronomy",
    "level": 1,
    "total_papers": 25,
    "total_score": 0.28573132,
    "venue_count": 8,
    "avg_score": 0.011429252800000001
  },
  {
    "id": "C2777515770",
    "name": "Electromyography",
    "level": 2,
    "total_papers": 25,
    "total_score": 11.5749053,
    "venue_count": 4,
    "avg_score": 0.46299621199999996
  },
  {
    "id": "C6438553",
    "name": "Affective computing",
    "level": 2,
    "total_papers": 25,
    "total_score": 12.346465870000001,
    "venue_count": 4,
    "avg_score": 0.49385863480000003
  },
  {
    "id": "C24590314",
    "name": "Wireless sensor network",
    "level": 2,
    "total_papers": 25,
    "total_score": 15.207214660000002,
    "venue_count": 2,
    "avg_score": 0.6082885864
  },
  {
    "id": "C2780154274",
    "name": "Download",
    "level": 2,
    "total_papers": 25,
    "total_score": 14.36329489,
    "venue_count": 3,
    "avg_score": 0.5745317956
  },
  {
    "id": "C527412718",
    "name": "Interpretation (philosophy)",
    "level": 2,
    "total_papers": 24,
    "total_score": 13.746334739999998,
    "venue_count": 10,
    "avg_score": 0.5727639474999999
  },
  {
    "id": "C65682993",
    "name": "Reflection (computer programming)",
    "level": 2,
    "total_papers": 24,
    "total_score": 13.282473259999998,
    "venue_count": 13,
    "avg_score": 0.5534363858333332
  },
  {
    "id": "C2778012447",
    "name": "Scope (computer science)",
    "level": 2,
    "total_papers": 24,
    "total_score": 14.152658229999998,
    "venue_count": 16,
    "avg_score": 0.5896940929166666
  },
  {
    "id": "C148417208",
    "name": "Authentication (law)",
    "level": 2,
    "total_papers": 24,
    "total_score": 13.253611589999998,
    "venue_count": 7,
    "avg_score": 0.5522338162499999
  },
  {
    "id": "C2776608160",
    "name": "Natural (archaeology)",
    "level": 2,
    "total_papers": 24,
    "total_score": 11.849623430000001,
    "venue_count": 17,
    "avg_score": 0.49373430958333336
  },
  {
    "id": "C37228920",
    "name": "Experiential learning",
    "level": 2,
    "total_papers": 24,
    "total_score": 13.807297949999999,
    "venue_count": 14,
    "avg_score": 0.57530408125
  },
  {
    "id": "C89611455",
    "name": "Mechanism (biology)",
    "level": 2,
    "total_papers": 24,
    "total_score": 13.175731700000002,
    "venue_count": 11,
    "avg_score": 0.5489888208333334
  },
  {
    "id": "C153050134",
    "name": "Eye movement",
    "level": 2,
    "total_papers": 24,
    "total_score": 13.4449897,
    "venue_count": 12,
    "avg_score": 0.5602079041666667
  },
  {
    "id": "C73555534",
    "name": "Cluster analysis",
    "level": 2,
    "total_papers": 24,
    "total_score": 15.247315269999998,
    "venue_count": 10,
    "avg_score": 0.6353048029166666
  },
  {
    "id": "C178802073",
    "name": "Aeronautics",
    "level": 1,
    "total_papers": 24,
    "total_score": 8.21723729,
    "venue_count": 10,
    "avg_score": 0.3423848870833333
  },
  {
    "id": "C131979681",
    "name": "Point cloud",
    "level": 2,
    "total_papers": 24,
    "total_score": 17.99294631,
    "venue_count": 5,
    "avg_score": 0.7497060962500001
  },
  {
    "id": "C4216890",
    "name": "Business model",
    "level": 2,
    "total_papers": 24,
    "total_score": 10.517521146000002,
    "venue_count": 3,
    "avg_score": 0.4382300477500001
  },
  {
    "id": "C117251300",
    "name": "Parametric statistics",
    "level": 2,
    "total_papers": 24,
    "total_score": 13.06689398,
    "venue_count": 4,
    "avg_score": 0.5444539158333334
  },
  {
    "id": "C153701036",
    "name": "Trustworthiness",
    "level": 2,
    "total_papers": 23,
    "total_score": 14.307866880000002,
    "venue_count": 13,
    "avg_score": 0.6220811686956523
  },
  {
    "id": "C42475967",
    "name": "Operations research",
    "level": 1,
    "total_papers": 23,
    "total_score": 6.453547940000002,
    "venue_count": 16,
    "avg_score": 0.2805890408695653
  },
  {
    "id": "C2776378700",
    "name": "Distraction",
    "level": 2,
    "total_papers": 23,
    "total_score": 17.081119469999997,
    "venue_count": 8,
    "avg_score": 0.7426573682608695
  },
  {
    "id": "C179454799",
    "name": "Ethnography",
    "level": 2,
    "total_papers": 23,
    "total_score": 12.815778590000003,
    "venue_count": 9,
    "avg_score": 0.5572077647826088
  },
  {
    "id": "C103278499",
    "name": "Similarity (geometry)",
    "level": 3,
    "total_papers": 23,
    "total_score": 13.122075800000001,
    "venue_count": 12,
    "avg_score": 0.5705250347826087
  },
  {
    "id": "C3020106864",
    "name": "Visually impaired",
    "level": 2,
    "total_papers": 23,
    "total_score": 12.438000379999998,
    "venue_count": 7,
    "avg_score": 0.5407826252173912
  },
  {
    "id": "C168563851",
    "name": "Randomized controlled trial",
    "level": 2,
    "total_papers": 23,
    "total_score": 13.65605076,
    "venue_count": 6,
    "avg_score": 0.5937413373913043
  },
  {
    "id": "C121687571",
    "name": "Activity recognition",
    "level": 2,
    "total_papers": 23,
    "total_score": 13.50707201,
    "venue_count": 5,
    "avg_score": 0.5872640004347826
  },
  {
    "id": "C165801399",
    "name": "Voltage",
    "level": 2,
    "total_papers": 23,
    "total_score": 0.78074986,
    "venue_count": 8,
    "avg_score": 0.03394564608695652
  },
  {
    "id": "C2780165032",
    "name": "Energy consumption",
    "level": 2,
    "total_papers": 23,
    "total_score": 12.26855192,
    "venue_count": 5,
    "avg_score": 0.5334153008695652
  },
  {
    "id": "C2780615836",
    "name": "USable",
    "level": 2,
    "total_papers": 22,
    "total_score": 13.52640303,
    "venue_count": 12,
    "avg_score": 0.6148365013636364
  },
  {
    "id": "C9354725",
    "name": "Operationalization",
    "level": 2,
    "total_papers": 22,
    "total_score": 16.862074,
    "venue_count": 10,
    "avg_score": 0.766457909090909
  },
  {
    "id": "C21959979",
    "name": "Web page",
    "level": 2,
    "total_papers": 22,
    "total_score": 8.56199868,
    "venue_count": 6,
    "avg_score": 0.3891817581818182
  },
  {
    "id": "C178300618",
    "name": "Extant taxon",
    "level": 2,
    "total_papers": 22,
    "total_score": 12.63608756,
    "venue_count": 10,
    "avg_score": 0.5743676163636363
  },
  {
    "id": "C2780657452",
    "name": "Headset",
    "level": 2,
    "total_papers": 22,
    "total_score": 16.8731151,
    "venue_count": 7,
    "avg_score": 0.7669597772727272
  },
  {
    "id": "C165696696",
    "name": "Exploit",
    "level": 2,
    "total_papers": 22,
    "total_score": 12.81718176,
    "venue_count": 11,
    "avg_score": 0.582599170909091
  },
  {
    "id": "C2778348673",
    "name": "Production (economics)",
    "level": 2,
    "total_papers": 22,
    "total_score": 11.171940459999998,
    "venue_count": 8,
    "avg_score": 0.5078154754545454
  },
  {
    "id": "C39389867",
    "name": "Corporate governance",
    "level": 2,
    "total_papers": 22,
    "total_score": 12.56266824,
    "venue_count": 8,
    "avg_score": 0.5710303745454546
  },
  {
    "id": "C203479927",
    "name": "Controller (irrigation)",
    "level": 2,
    "total_papers": 22,
    "total_score": 11.454816749999999,
    "venue_count": 6,
    "avg_score": 0.5206734886363636
  },
  {
    "id": "C206310091",
    "name": "Emotion classification",
    "level": 2,
    "total_papers": 22,
    "total_score": 10.510566780000001,
    "venue_count": 4,
    "avg_score": 0.4777530354545455
  },
  {
    "id": "C523214423",
    "name": "Machining",
    "level": 2,
    "total_papers": 22,
    "total_score": 13.191139190000001,
    "venue_count": 2,
    "avg_score": 0.599597235909091
  },
  {
    "id": "C2779018934",
    "name": "Everyday life",
    "level": 2,
    "total_papers": 21,
    "total_score": 11.15121602,
    "venue_count": 14,
    "avg_score": 0.5310102866666666
  },
  {
    "id": "C179518139",
    "name": "Coding (social sciences)",
    "level": 2,
    "total_papers": 21,
    "total_score": 11.41239103,
    "venue_count": 14,
    "avg_score": 0.5434471919047619
  },
  {
    "id": "C9114305",
    "name": "Situational ethics",
    "level": 2,
    "total_papers": 21,
    "total_score": 11.699898009999998,
    "venue_count": 13,
    "avg_score": 0.5571380004761904
  },
  {
    "id": "C2780385302",
    "name": "Protocol (science)",
    "level": 3,
    "total_papers": 21,
    "total_score": 11.274015320000002,
    "venue_count": 12,
    "avg_score": 0.5368578723809525
  },
  {
    "id": "C106131492",
    "name": "Filter (signal processing)",
    "level": 2,
    "total_papers": 21,
    "total_score": 4.96865896,
    "venue_count": 13,
    "avg_score": 0.23660280761904762
  },
  {
    "id": "C127705205",
    "name": "Heuristics",
    "level": 2,
    "total_papers": 21,
    "total_score": 13.863500019999998,
    "venue_count": 13,
    "avg_score": 0.6601666676190475
  },
  {
    "id": "C33676613",
    "name": "Dimension (graph theory)",
    "level": 2,
    "total_papers": 21,
    "total_score": 10.85183418,
    "venue_count": 14,
    "avg_score": 0.5167540085714286
  },
  {
    "id": "C171606756",
    "name": "Psychometrics",
    "level": 2,
    "total_papers": 21,
    "total_score": 4.493125517999999,
    "venue_count": 10,
    "avg_score": 0.21395835799999996
  },
  {
    "id": "C39920418",
    "name": "Kinematics",
    "level": 2,
    "total_papers": 21,
    "total_score": 12.13701747,
    "venue_count": 7,
    "avg_score": 0.5779532128571429
  },
  {
    "id": "C2777210771",
    "name": "Block (permutation group theory)",
    "level": 2,
    "total_papers": 21,
    "total_score": 11.373909290000002,
    "venue_count": 12,
    "avg_score": 0.5416147280952381
  },
  {
    "id": "C188353592",
    "name": "Expectancy theory",
    "level": 2,
    "total_papers": 21,
    "total_score": 13.75988691,
    "venue_count": 10,
    "avg_score": 0.65523271
  },
  {
    "id": "C17632256",
    "name": "Digital media",
    "level": 2,
    "total_papers": 21,
    "total_score": 10.57189631,
    "venue_count": 10,
    "avg_score": 0.5034236338095238
  },
  {
    "id": "C31487907",
    "name": "Polygon mesh",
    "level": 2,
    "total_papers": 21,
    "total_score": 12.654724069999999,
    "venue_count": 1,
    "avg_score": 0.6026059080952381
  },
  {
    "id": "C511192102",
    "name": "Comprehension",
    "level": 2,
    "total_papers": 20,
    "total_score": 10.941269239999999,
    "venue_count": 13,
    "avg_score": 0.5470634619999999
  },
  {
    "id": "C42525527",
    "name": "Formative assessment",
    "level": 2,
    "total_papers": 20,
    "total_score": 11.93977736,
    "venue_count": 14,
    "avg_score": 0.5969888680000001
  },
  {
    "id": "C2777363581",
    "name": "Harm",
    "level": 2,
    "total_papers": 20,
    "total_score": 12.831963859999998,
    "venue_count": 11,
    "avg_score": 0.6415981929999999
  },
  {
    "id": "C2780522230",
    "name": "Ambiguity",
    "level": 2,
    "total_papers": 20,
    "total_score": 12.77588683,
    "venue_count": 8,
    "avg_score": 0.6387943414999999
  },
  {
    "id": "C100776233",
    "name": "Bridge (graph theory)",
    "level": 2,
    "total_papers": 20,
    "total_score": 10.542303219999999,
    "venue_count": 13,
    "avg_score": 0.527115161
  },
  {
    "id": "C15336307",
    "name": "Lens (geology)",
    "level": 2,
    "total_papers": 20,
    "total_score": 5.40428456,
    "venue_count": 10,
    "avg_score": 0.270214228
  },
  {
    "id": "C111368507",
    "name": "Oceanography",
    "level": 1,
    "total_papers": 20,
    "total_score": 0.9588515400000001,
    "venue_count": 15,
    "avg_score": 0.047942577
  },
  {
    "id": "C130064352",
    "name": "Social relation",
    "level": 2,
    "total_papers": 20,
    "total_score": 9.49243828,
    "venue_count": 12,
    "avg_score": 0.474621914
  },
  {
    "id": "C2776990098",
    "name": "Misinformation",
    "level": 2,
    "total_papers": 20,
    "total_score": 17.168974319999997,
    "venue_count": 6,
    "avg_score": 0.8584487159999998
  },
  {
    "id": "C2777855551",
    "name": "Subject (documents)",
    "level": 2,
    "total_papers": 20,
    "total_score": 10.15675909,
    "venue_count": 14,
    "avg_score": 0.5078379545
  },
  {
    "id": "C84393581",
    "name": "Blood pressure",
    "level": 2,
    "total_papers": 20,
    "total_score": 1.7677249999999998,
    "venue_count": 9,
    "avg_score": 0.08838624999999999
  },
  {
    "id": "C48947383",
    "name": "Visitor pattern",
    "level": 2,
    "total_papers": 20,
    "total_score": 15.576524549999998,
    "venue_count": 13,
    "avg_score": 0.7788262275
  },
  {
    "id": "C150966472",
    "name": "Psychosocial",
    "level": 2,
    "total_papers": 20,
    "total_score": 13.29088047,
    "venue_count": 11,
    "avg_score": 0.6645440235
  },
  {
    "id": "C200601418",
    "name": "Reliability engineering",
    "level": 1,
    "total_papers": 20,
    "total_score": 6.888724150000001,
    "venue_count": 9,
    "avg_score": 0.34443620750000004
  },
  {
    "id": "C48262172",
    "name": "Design process",
    "level": 3,
    "total_papers": 20,
    "total_score": 9.481819110000002,
    "venue_count": 7,
    "avg_score": 0.4740909555000001
  },
  {
    "id": "C2781310500",
    "name": "Persuasion",
    "level": 2,
    "total_papers": 20,
    "total_score": 9.684014910000002,
    "venue_count": 10,
    "avg_score": 0.4842007455000001
  },
  {
    "id": "C2777113093",
    "name": "Pedestrian",
    "level": 2,
    "total_papers": 20,
    "total_score": 13.510866029999999,
    "venue_count": 7,
    "avg_score": 0.6755433015
  },
  {
    "id": "C2779336972",
    "name": "Motion sickness",
    "level": 2,
    "total_papers": 20,
    "total_score": 14.079986790000001,
    "venue_count": 6,
    "avg_score": 0.7039993395
  },
  {
    "id": "C148415826",
    "name": "Open innovation",
    "level": 2,
    "total_papers": 20,
    "total_score": 12.195992470000002,
    "venue_count": 2,
    "avg_score": 0.6097996235
  },
  {
    "id": "C15724806",
    "name": "Graphic design",
    "level": 2,
    "total_papers": 20,
    "total_score": 11.22004557,
    "venue_count": 3,
    "avg_score": 0.5610022785
  },
  {
    "id": "C139621336",
    "name": "Economic Justice",
    "level": 2,
    "total_papers": 19,
    "total_score": 9.53200973,
    "venue_count": 8,
    "avg_score": 0.5016847226315789
  },
  {
    "id": "C56666940",
    "name": "Documentation",
    "level": 2,
    "total_papers": 19,
    "total_score": 13.19165769,
    "venue_count": 11,
    "avg_score": 0.6942977731578948
  },
  {
    "id": "C39432304",
    "name": "Environmental science",
    "level": 0,
    "total_papers": 19,
    "total_score": 6.225432050000001,
    "venue_count": 11,
    "avg_score": 0.3276543184210527
  },
  {
    "id": "C117671659",
    "name": "Manufacturing engineering",
    "level": 1,
    "total_papers": 19,
    "total_score": 6.0893497100000005,
    "venue_count": 8,
    "avg_score": 0.32049209
  },
  {
    "id": "C133731056",
    "name": "Control engineering",
    "level": 1,
    "total_papers": 19,
    "total_score": 6.07102775,
    "venue_count": 5,
    "avg_score": 0.3195277763157895
  },
  {
    "id": "C3017715821",
    "name": "Assistive technology",
    "level": 2,
    "total_papers": 19,
    "total_score": 10.150878650000001,
    "venue_count": 8,
    "avg_score": 0.5342567710526316
  },
  {
    "id": "C2777735758",
    "name": "Path (computing)",
    "level": 2,
    "total_papers": 19,
    "total_score": 9.689076469999998,
    "venue_count": 9,
    "avg_score": 0.5099513931578946
  },
  {
    "id": "C2777953023",
    "name": "Heart rate",
    "level": 3,
    "total_papers": 19,
    "total_score": 5.935579660999999,
    "venue_count": 8,
    "avg_score": 0.31239892952631576
  },
  {
    "id": "C2779891985",
    "name": "Telemedicine",
    "level": 3,
    "total_papers": 19,
    "total_score": 10.262930370000001,
    "venue_count": 13,
    "avg_score": 0.5401542300000001
  },
  {
    "id": "C522192633",
    "name": "Sign language",
    "level": 2,
    "total_papers": 19,
    "total_score": 12.85790637,
    "venue_count": 7,
    "avg_score": 0.6767319142105264
  },
  {
    "id": "C558565934",
    "name": "Musical",
    "level": 2,
    "total_papers": 19,
    "total_score": 9.141317560000001,
    "venue_count": 10,
    "avg_score": 0.48112197684210534
  },
  {
    "id": "C2780428219",
    "name": "Cover (algebra)",
    "level": 2,
    "total_papers": 19,
    "total_score": 12.3297562,
    "venue_count": 4,
    "avg_score": 0.6489345368421052
  },
  {
    "id": "C2779998236",
    "name": "Loneliness",
    "level": 2,
    "total_papers": 19,
    "total_score": 16.254389070000002,
    "venue_count": 8,
    "avg_score": 0.8554941615789474
  },
  {
    "id": "C136264566",
    "name": "Economy",
    "level": 1,
    "total_papers": 19,
    "total_score": 0.4819671,
    "venue_count": 9,
    "avg_score": 0.02536668947368421
  },
  {
    "id": "C2778456923",
    "name": "Edge computing",
    "level": 3,
    "total_papers": 19,
    "total_score": 9.74946924,
    "venue_count": 3,
    "avg_score": 0.51312996
  },
  {
    "id": "C2777551076",
    "name": "Front (military)",
    "level": 2,
    "total_papers": 19,
    "total_score": 11.14047092,
    "venue_count": 3,
    "avg_score": 0.5863405747368421
  },
  {
    "id": "C2777601683",
    "name": "Vocabulary",
    "level": 2,
    "total_papers": 18,
    "total_score": 11.1222245,
    "venue_count": 13,
    "avg_score": 0.617901361111111
  },
  {
    "id": "C174348530",
    "name": "Bridging (networking)",
    "level": 2,
    "total_papers": 18,
    "total_score": 11.28164114,
    "venue_count": 13,
    "avg_score": 0.6267578411111111
  },
  {
    "id": "C34413123",
    "name": "Robotics",
    "level": 3,
    "total_papers": 18,
    "total_score": 10.044569169999997,
    "venue_count": 12,
    "avg_score": 0.5580316205555554
  },
  {
    "id": "C79373723",
    "name": "Web development",
    "level": 3,
    "total_papers": 18,
    "total_score": 4.44090409,
    "venue_count": 6,
    "avg_score": 0.2467168938888889
  },
  {
    "id": "C95713431",
    "name": "Vulnerability (computing)",
    "level": 2,
    "total_papers": 18,
    "total_score": 10.442534760000001,
    "venue_count": 13,
    "avg_score": 0.58014082
  },
  {
    "id": "C90734943",
    "name": "Conceptualization",
    "level": 2,
    "total_papers": 18,
    "total_score": 12.807983210000002,
    "venue_count": 15,
    "avg_score": 0.7115546227777778
  },
  {
    "id": "C2779918689",
    "name": "Stimulus (psychology)",
    "level": 2,
    "total_papers": 18,
    "total_score": 10.74320663,
    "venue_count": 9,
    "avg_score": 0.5968448127777778
  },
  {
    "id": "C198082294",
    "name": "Position (finance)",
    "level": 2,
    "total_papers": 18,
    "total_score": 9.11106119,
    "venue_count": 11,
    "avg_score": 0.506170066111111
  },
  {
    "id": "C51672120",
    "name": "Cooperative learning",
    "level": 3,
    "total_papers": 18,
    "total_score": 4.83631772,
    "venue_count": 11,
    "avg_score": 0.2686843177777778
  },
  {
    "id": "C99527880",
    "name": "Universal design",
    "level": 2,
    "total_papers": 18,
    "total_score": 9.5671617,
    "venue_count": 7,
    "avg_score": 0.5315089833333333
  },
  {
    "id": "C204241405",
    "name": "Transformation (genetics)",
    "level": 3,
    "total_papers": 18,
    "total_score": 9.40354514,
    "venue_count": 12,
    "avg_score": 0.5224191744444444
  },
  {
    "id": "C61063171",
    "name": "Service design",
    "level": 4,
    "total_papers": 18,
    "total_score": 9.469429770000001,
    "venue_count": 6,
    "avg_score": 0.5260794316666667
  },
  {
    "id": "C94375191",
    "name": "Arithmetic",
    "level": 1,
    "total_papers": 18,
    "total_score": 2.013925284,
    "venue_count": 10,
    "avg_score": 0.111884738
  },
  {
    "id": "C150899416",
    "name": "Transfer of learning",
    "level": 2,
    "total_papers": 18,
    "total_score": 9.93882837,
    "venue_count": 8,
    "avg_score": 0.5521571316666667
  },
  {
    "id": "C187155963",
    "name": "Occupational safety and health",
    "level": 2,
    "total_papers": 18,
    "total_score": 8.93600338,
    "venue_count": 4,
    "avg_score": 0.49644463222222224
  },
  {
    "id": "C168900304",
    "name": "Valence (chemistry)",
    "level": 2,
    "total_papers": 18,
    "total_score": 9.55789718,
    "venue_count": 7,
    "avg_score": 0.5309942877777778
  },
  {
    "id": "C70789860",
    "name": "The arts",
    "level": 2,
    "total_papers": 18,
    "total_score": 11.093020199999998,
    "venue_count": 3,
    "avg_score": 0.6162788999999999
  },
  {
    "id": "C547195049",
    "name": "Terminology",
    "level": 2,
    "total_papers": 17,
    "total_score": 11.84205513,
    "venue_count": 13,
    "avg_score": 0.6965914782352941
  },
  {
    "id": "C2777617010",
    "name": "Mainstream",
    "level": 2,
    "total_papers": 17,
    "total_score": 10.15505633,
    "venue_count": 12,
    "avg_score": 0.5973562547058824
  },
  {
    "id": "C2776867660",
    "name": "Depression (economics)",
    "level": 2,
    "total_papers": 17,
    "total_score": 9.334596499999998,
    "venue_count": 8,
    "avg_score": 0.5490939117647058
  },
  {
    "id": "C2780226923",
    "name": "Movement (music)",
    "level": 2,
    "total_papers": 17,
    "total_score": 8.66613592,
    "venue_count": 10,
    "avg_score": 0.5097727011764706
  },
  {
    "id": "C126042441",
    "name": "Frame (networking)",
    "level": 2,
    "total_papers": 17,
    "total_score": 7.0446542700000006,
    "venue_count": 13,
    "avg_score": 0.41439142764705883
  },
  {
    "id": "C156325361",
    "name": "Grounded theory",
    "level": 3,
    "total_papers": 17,
    "total_score": 9.246831480000003,
    "venue_count": 9,
    "avg_score": 0.5439312635294119
  },
  {
    "id": "C161759796",
    "name": "Teleoperation",
    "level": 3,
    "total_papers": 17,
    "total_score": 14.084324370000001,
    "venue_count": 5,
    "avg_score": 0.8284896688235295
  },
  {
    "id": "C192975520",
    "name": "Marketing management",
    "level": 2,
    "total_papers": 17,
    "total_score": 0.8472734040000001,
    "venue_count": 7,
    "avg_score": 0.049839612000000005
  },
  {
    "id": "C197973564",
    "name": "Web Accessibility Initiative",
    "level": 5,
    "total_papers": 17,
    "total_score": 8.95627657,
    "venue_count": 4,
    "avg_score": 0.5268397982352941
  },
  {
    "id": "C2778999518",
    "name": "Happiness",
    "level": 2,
    "total_papers": 17,
    "total_score": 10.66535571,
    "venue_count": 12,
    "avg_score": 0.6273738652941176
  },
  {
    "id": "C61797465",
    "name": "Term (time)",
    "level": 2,
    "total_papers": 17,
    "total_score": 9.23722899,
    "venue_count": 11,
    "avg_score": 0.5433664111764706
  },
  {
    "id": "C107418235",
    "name": "Human multitasking",
    "level": 2,
    "total_papers": 17,
    "total_score": 12.19692765,
    "venue_count": 8,
    "avg_score": 0.7174663323529411
  },
  {
    "id": "C139676723",
    "name": "Sign (mathematics)",
    "level": 2,
    "total_papers": 17,
    "total_score": 9.461558149999998,
    "venue_count": 6,
    "avg_score": 0.556562244117647
  },
  {
    "id": "C66322947",
    "name": "Transformer",
    "level": 3,
    "total_papers": 17,
    "total_score": 9.44747281,
    "venue_count": 6,
    "avg_score": 0.5557336947058824
  },
  {
    "id": "C146249460",
    "name": "Fixation (population genetics)",
    "level": 3,
    "total_papers": 17,
    "total_score": 10.18569347,
    "venue_count": 10,
    "avg_score": 0.5991584394117647
  },
  {
    "id": "C203718221",
    "name": "Sound (geography)",
    "level": 2,
    "total_papers": 17,
    "total_score": 8.78976904,
    "venue_count": 7,
    "avg_score": 0.5170452376470588
  },
  {
    "id": "C178489894",
    "name": "Cryptography",
    "level": 2,
    "total_papers": 17,
    "total_score": 7.833250040000001,
    "venue_count": 3,
    "avg_score": 0.4607794141176471
  },
  {
    "id": "C194789388",
    "name": "CAD",
    "level": 2,
    "total_papers": 17,
    "total_score": 11.332977909999999,
    "venue_count": 3,
    "avg_score": 0.6666457594117646
  },
  {
    "id": "C13854087",
    "name": "Interaction design",
    "level": 2,
    "total_papers": 16,
    "total_score": 7.424232570000001,
    "venue_count": 9,
    "avg_score": 0.46401453562500006
  },
  {
    "id": "C55439883",
    "name": "Correctness",
    "level": 2,
    "total_papers": 16,
    "total_score": 11.500746269999999,
    "venue_count": 8,
    "avg_score": 0.7187966418749999
  },
  {
    "id": "C2777146004",
    "name": "CLARITY",
    "level": 2,
    "total_papers": 16,
    "total_score": 10.618493090000001,
    "venue_count": 9,
    "avg_score": 0.6636558181250001
  },
  {
    "id": "C26713055",
    "name": "Implementation",
    "level": 2,
    "total_papers": 16,
    "total_score": 9.351700820000001,
    "venue_count": 11,
    "avg_score": 0.5844813012500001
  },
  {
    "id": "C73282008",
    "name": "Coping (psychology)",
    "level": 2,
    "total_papers": 16,
    "total_score": 8.32316879,
    "venue_count": 8,
    "avg_score": 0.520198049375
  },
  {
    "id": "C144229578",
    "name": "Design education",
    "level": 2,
    "total_papers": 16,
    "total_score": 7.71771303,
    "venue_count": 7,
    "avg_score": 0.482357064375
  },
  {
    "id": "C144237770",
    "name": "Mathematical economics",
    "level": 1,
    "total_papers": 16,
    "total_score": 1.57536099,
    "venue_count": 11,
    "avg_score": 0.098460061875
  },
  {
    "id": "C555826173",
    "name": "Democracy",
    "level": 3,
    "total_papers": 16,
    "total_score": 8.24686739,
    "venue_count": 10,
    "avg_score": 0.515429211875
  },
  {
    "id": "C78762247",
    "name": "Petroleum engineering",
    "level": 1,
    "total_papers": 16,
    "total_score": 0,
    "venue_count": 9,
    "avg_score": 0
  },
  {
    "id": "C313442",
    "name": "Persona",
    "level": 2,
    "total_papers": 16,
    "total_score": 13.49585665,
    "venue_count": 11,
    "avg_score": 0.843491040625
  },
  {
    "id": "C26011011",
    "name": "Influencer marketing",
    "level": 4,
    "total_papers": 16,
    "total_score": 14.22984905,
    "venue_count": 6,
    "avg_score": 0.889365565625
  },
  {
    "id": "C54649085",
    "name": "Relationship marketing",
    "level": 3,
    "total_papers": 16,
    "total_score": 1.024489756,
    "venue_count": 6,
    "avg_score": 0.06403060975
  },
  {
    "id": "C2777303404",
    "name": "Convergence (economics)",
    "level": 2,
    "total_papers": 16,
    "total_score": 8.52661131,
    "venue_count": 9,
    "avg_score": 0.532913206875
  },
  {
    "id": "C2776445246",
    "name": "Style (visual arts)",
    "level": 2,
    "total_papers": 16,
    "total_score": 9.053299860000001,
    "venue_count": 10,
    "avg_score": 0.5658312412500001
  },
  {
    "id": "C4237393",
    "name": "Web usability",
    "level": 3,
    "total_papers": 16,
    "total_score": 7.2926180800000004,
    "venue_count": 5,
    "avg_score": 0.45578863000000003
  },
  {
    "id": "C2986087404",
    "name": "Online learning",
    "level": 2,
    "total_papers": 16,
    "total_score": 7.562249700000001,
    "venue_count": 6,
    "avg_score": 0.47264060625000004
  },
  {
    "id": "C134560507",
    "name": "Environmental economics",
    "level": 1,
    "total_papers": 16,
    "total_score": 5.018722370000001,
    "venue_count": 10,
    "avg_score": 0.31367014812500005
  },
  {
    "id": "C43521106",
    "name": "Pipeline (software)",
    "level": 2,
    "total_papers": 16,
    "total_score": 8.65516606,
    "venue_count": 8,
    "avg_score": 0.54094787875
  },
  {
    "id": "C36951298",
    "name": "Arousal",
    "level": 2,
    "total_papers": 16,
    "total_score": 9.926680410000001,
    "venue_count": 8,
    "avg_score": 0.6204175256250001
  },
  {
    "id": "C158592959",
    "name": "Blended learning",
    "level": 3,
    "total_papers": 16,
    "total_score": 8.78337611,
    "venue_count": 6,
    "avg_score": 0.548961006875
  },
  {
    "id": "C114793014",
    "name": "Geomorphology",
    "level": 1,
    "total_papers": 16,
    "total_score": 0,
    "venue_count": 7,
    "avg_score": 0
  },
  {
    "id": "C116537",
    "name": "Service provider",
    "level": 3,
    "total_papers": 16,
    "total_score": 5.742435339999999,
    "venue_count": 8,
    "avg_score": 0.35890220874999995
  },
  {
    "id": "C188027245",
    "name": "Polymer chemistry",
    "level": 1,
    "total_papers": 16,
    "total_score": 0,
    "venue_count": 5,
    "avg_score": 0
  },
  {
    "id": "C2779585090",
    "name": "Resilience (materials science)",
    "level": 2,
    "total_papers": 16,
    "total_score": 10.132355219999999,
    "venue_count": 5,
    "avg_score": 0.6332722012499999
  },
  {
    "id": "C529173508",
    "name": "Software development",
    "level": 3,
    "total_papers": 15,
    "total_score": 4.79449751,
    "venue_count": 12,
    "avg_score": 0.31963316733333336
  },
  {
    "id": "C507571656",
    "name": "Home automation",
    "level": 2,
    "total_papers": 15,
    "total_score": 8.63176696,
    "venue_count": 9,
    "avg_score": 0.5754511306666666
  },
  {
    "id": "C530175646",
    "name": "Clothing",
    "level": 2,
    "total_papers": 15,
    "total_score": 8.27132249,
    "venue_count": 7,
    "avg_score": 0.5514214993333333
  },
  {
    "id": "C50335755",
    "name": "Phenomenon",
    "level": 2,
    "total_papers": 15,
    "total_score": 8.265278930000001,
    "venue_count": 13,
    "avg_score": 0.5510185953333334
  },
  {
    "id": "C2780084366",
    "name": "Demographics",
    "level": 2,
    "total_papers": 15,
    "total_score": 9.455445950000001,
    "venue_count": 11,
    "avg_score": 0.6303630633333335
  },
  {
    "id": "C97854310",
    "name": "Search engine",
    "level": 2,
    "total_papers": 15,
    "total_score": 5.406942910000001,
    "venue_count": 6,
    "avg_score": 0.3604628606666667
  },
  {
    "id": "C196083921",
    "name": "Variance (accounting)",
    "level": 2,
    "total_papers": 15,
    "total_score": 7.696342959999999,
    "venue_count": 11,
    "avg_score": 0.5130895306666666
  },
  {
    "id": "C2776214188",
    "name": "Inference",
    "level": 2,
    "total_papers": 15,
    "total_score": 8.10027518,
    "venue_count": 8,
    "avg_score": 0.5400183453333334
  },
  {
    "id": "C47446073",
    "name": "Control theory (sociology)",
    "level": 3,
    "total_papers": 15,
    "total_score": 6.40140209,
    "venue_count": 4,
    "avg_score": 0.42676013933333334
  },
  {
    "id": "C99498987",
    "name": "Noise (video)",
    "level": 3,
    "total_papers": 15,
    "total_score": 7.757532970000001,
    "venue_count": 9,
    "avg_score": 0.5171688646666667
  },
  {
    "id": "C142853389",
    "name": "Association (psychology)",
    "level": 2,
    "total_papers": 15,
    "total_score": 7.444058890000001,
    "venue_count": 8,
    "avg_score": 0.49627059266666673
  },
  {
    "id": "C59241245",
    "name": "Web application security",
    "level": 4,
    "total_papers": 15,
    "total_score": 3.2000149700000007,
    "venue_count": 5,
    "avg_score": 0.21333433133333338
  },
  {
    "id": "C127816348",
    "name": "Extraversion and introversion",
    "level": 4,
    "total_papers": 15,
    "total_score": 6.387423965999999,
    "venue_count": 9,
    "avg_score": 0.42582826439999993
  },
  {
    "id": "C2780312720",
    "name": "Head (geology)",
    "level": 2,
    "total_papers": 15,
    "total_score": 8.29959182,
    "venue_count": 7,
    "avg_score": 0.5533061213333333
  },
  {
    "id": "C18555067",
    "name": "Joint (building)",
    "level": 2,
    "total_papers": 15,
    "total_score": 8.09255931,
    "venue_count": 6,
    "avg_score": 0.5395039540000001
  },
  {
    "id": "C123403432",
    "name": "Visibility",
    "level": 2,
    "total_papers": 15,
    "total_score": 8.762061200000002,
    "venue_count": 12,
    "avg_score": 0.5841374133333335
  },
  {
    "id": "C102132729",
    "name": "Immersive technology",
    "level": 3,
    "total_papers": 15,
    "total_score": 7.69201507,
    "venue_count": 9,
    "avg_score": 0.5128010046666667
  },
  {
    "id": "C172656115",
    "name": "Social distance",
    "level": 5,
    "total_papers": 15,
    "total_score": 8.79454045,
    "venue_count": 10,
    "avg_score": 0.5863026966666667
  },
  {
    "id": "C77618280",
    "name": "Scheme (mathematics)",
    "level": 2,
    "total_papers": 15,
    "total_score": 8.30794438,
    "venue_count": 6,
    "avg_score": 0.5538629586666667
  },
  {
    "id": "C168167062",
    "name": "Component (thermodynamics)",
    "level": 2,
    "total_papers": 15,
    "total_score": 7.92887174,
    "venue_count": 10,
    "avg_score": 0.5285914493333334
  },
  {
    "id": "C187691185",
    "name": "Grid",
    "level": 2,
    "total_papers": 15,
    "total_score": 4.76219739,
    "venue_count": 10,
    "avg_score": 0.31747982599999997
  },
  {
    "id": "C2987714656",
    "name": "Facial expression recognition",
    "level": 4,
    "total_papers": 15,
    "total_score": 7.563835669999999,
    "venue_count": 3,
    "avg_score": 0.5042557113333332
  },
  {
    "id": "C2779960059",
    "name": "Overhead (engineering)",
    "level": 2,
    "total_papers": 15,
    "total_score": 7.03924609,
    "venue_count": 5,
    "avg_score": 0.46928307266666663
  },
  {
    "id": "C28826006",
    "name": "Applied mathematics",
    "level": 1,
    "total_papers": 15,
    "total_score": 4.87719492,
    "venue_count": 3,
    "avg_score": 0.325146328
  },
  {
    "id": "C71139939",
    "name": "Modal",
    "level": 2,
    "total_papers": 15,
    "total_score": 9.4666902,
    "venue_count": 4,
    "avg_score": 0.63111268
  },
  {
    "id": "C45374587",
    "name": "Computation",
    "level": 2,
    "total_papers": 15,
    "total_score": 7.54321191,
    "venue_count": 3,
    "avg_score": 0.502880794
  },
  {
    "id": "C2742236",
    "name": "Efficient energy use",
    "level": 2,
    "total_papers": 15,
    "total_score": 6.602003460000001,
    "venue_count": 5,
    "avg_score": 0.44013356400000003
  },
  {
    "id": "C62611344",
    "name": "Node (physics)",
    "level": 2,
    "total_papers": 15,
    "total_score": 8.268785900000001,
    "venue_count": 3,
    "avg_score": 0.5512523933333334
  },
  {
    "id": "C2993473104",
    "name": "Front cover",
    "level": 3,
    "total_papers": 15,
    "total_score": 13.449235059999998,
    "venue_count": 1,
    "avg_score": 0.8966156706666665
  },
  {
    "id": "C2776760102",
    "name": "Code (set theory)",
    "level": 3,
    "total_papers": 14,
    "total_score": 7.51119458,
    "venue_count": 10,
    "avg_score": 0.5365138985714285
  },
  {
    "id": "C2779732396",
    "name": "Craft",
    "level": 2,
    "total_papers": 14,
    "total_score": 11.446305700000002,
    "venue_count": 6,
    "avg_score": 0.8175932642857144
  },
  {
    "id": "C3020255362",
    "name": "Physical activity",
    "level": 2,
    "total_papers": 14,
    "total_score": 6.36258655,
    "venue_count": 9,
    "avg_score": 0.45447046785714285
  },
  {
    "id": "C2776007630",
    "name": "Accountability",
    "level": 2,
    "total_papers": 14,
    "total_score": 9.183466789999999,
    "venue_count": 10,
    "avg_score": 0.6559619135714285
  },
  {
    "id": "C132651083",
    "name": "Climate change",
    "level": 2,
    "total_papers": 14,
    "total_score": 5.355067365,
    "venue_count": 7,
    "avg_score": 0.38250481178571427
  },
  {
    "id": "C29122968",
    "name": "Incentive",
    "level": 2,
    "total_papers": 14,
    "total_score": 7.693026534,
    "venue_count": 6,
    "avg_score": 0.5495018952857144
  },
  {
    "id": "C107327155",
    "name": "Decision support system",
    "level": 2,
    "total_papers": 14,
    "total_score": 7.105263190000001,
    "venue_count": 10,
    "avg_score": 0.5075187992857144
  },
  {
    "id": "C2987143623",
    "name": "Sense of presence",
    "level": 3,
    "total_papers": 14,
    "total_score": 8.56665937,
    "venue_count": 6,
    "avg_score": 0.6119042407142857
  },
  {
    "id": "C3255780",
    "name": "Heuristic evaluation",
    "level": 3,
    "total_papers": 14,
    "total_score": 6.263188309999999,
    "venue_count": 8,
    "avg_score": 0.44737059357142855
  },
  {
    "id": "C89600930",
    "name": "Segmentation",
    "level": 2,
    "total_papers": 14,
    "total_score": 6.520741545,
    "venue_count": 4,
    "avg_score": 0.4657672532142857
  },
  {
    "id": "C204323151",
    "name": "Range (aeronautics)",
    "level": 2,
    "total_papers": 14,
    "total_score": 6.759315970000001,
    "venue_count": 9,
    "avg_score": 0.48280828357142863
  },
  {
    "id": "C177291462",
    "name": "Active listening",
    "level": 2,
    "total_papers": 14,
    "total_score": 9.915199900000001,
    "venue_count": 10,
    "avg_score": 0.7082285642857143
  },
  {
    "id": "C16345878",
    "name": "Orientation (vector space)",
    "level": 2,
    "total_papers": 14,
    "total_score": 7.765660170000001,
    "venue_count": 8,
    "avg_score": 0.5546900121428572
  },
  {
    "id": "C2988145974",
    "name": "Mobile apps",
    "level": 2,
    "total_papers": 14,
    "total_score": 7.338786900000001,
    "venue_count": 9,
    "avg_score": 0.5241990642857143
  },
  {
    "id": "C33276779",
    "name": "Design elements and principles",
    "level": 2,
    "total_papers": 14,
    "total_score": 6.592167280000001,
    "venue_count": 6,
    "avg_score": 0.4708690914285715
  },
  {
    "id": "C189430467",
    "name": "Ranking (information retrieval)",
    "level": 2,
    "total_papers": 14,
    "total_score": 7.413312744,
    "venue_count": 6,
    "avg_score": 0.5295223388571428
  },
  {
    "id": "C2780719617",
    "name": "Salient",
    "level": 2,
    "total_papers": 14,
    "total_score": 8.10302927,
    "venue_count": 10,
    "avg_score": 0.578787805
  },
  {
    "id": "C138020889",
    "name": "Collaborative learning",
    "level": 2,
    "total_papers": 14,
    "total_score": 7.461038220000001,
    "venue_count": 7,
    "avg_score": 0.5329313014285715
  },
  {
    "id": "C48103436",
    "name": "State (computer science)",
    "level": 2,
    "total_papers": 14,
    "total_score": 6.97622434,
    "venue_count": 10,
    "avg_score": 0.49830173857142857
  },
  {
    "id": "C75795011",
    "name": "Typology",
    "level": 2,
    "total_papers": 14,
    "total_score": 9.56600956,
    "venue_count": 9,
    "avg_score": 0.6832863971428571
  },
  {
    "id": "C68595000",
    "name": "Service delivery framework",
    "level": 3,
    "total_papers": 14,
    "total_score": 4.8242797799999995,
    "venue_count": 8,
    "avg_score": 0.34459141285714284
  },
  {
    "id": "C2779662365",
    "name": "Event (particle physics)",
    "level": 2,
    "total_papers": 14,
    "total_score": 7.388782140000001,
    "venue_count": 10,
    "avg_score": 0.5277701528571429
  },
  {
    "id": "C97541855",
    "name": "Reinforcement learning",
    "level": 2,
    "total_papers": 14,
    "total_score": 9.33798922,
    "venue_count": 9,
    "avg_score": 0.66699923
  },
  {
    "id": "C158379750",
    "name": "Network packet",
    "level": 2,
    "total_papers": 14,
    "total_score": 5.33086517,
    "venue_count": 4,
    "avg_score": 0.38077608357142856
  },
  {
    "id": "C100302975",
    "name": "Usability engineering",
    "level": 3,
    "total_papers": 14,
    "total_score": 5.84379378,
    "venue_count": 9,
    "avg_score": 0.41741384142857146
  },
  {
    "id": "C2778813691",
    "name": "Purchasing",
    "level": 2,
    "total_papers": 14,
    "total_score": 5.01447925,
    "venue_count": 7,
    "avg_score": 0.3581770892857143
  },
  {
    "id": "C75434695",
    "name": "Product innovation",
    "level": 2,
    "total_papers": 14,
    "total_score": 6.706548069999999,
    "venue_count": 3,
    "avg_score": 0.4790391478571428
  },
  {
    "id": "C110872660",
    "name": "Ecosystem",
    "level": 2,
    "total_papers": 14,
    "total_score": 7.2797721399999995,
    "venue_count": 4,
    "avg_score": 0.5199837242857143
  },
  {
    "id": "C13200473",
    "name": "Reflexivity",
    "level": 2,
    "total_papers": 13,
    "total_score": 9.0860469,
    "venue_count": 8,
    "avg_score": 0.6989266846153845
  },
  {
    "id": "C106159729",
    "name": "Financial economics",
    "level": 1,
    "total_papers": 13,
    "total_score": 0.73709726,
    "venue_count": 7,
    "avg_score": 0.05669978923076923
  },
  {
    "id": "C2780009758",
    "name": "Measure (data warehouse)",
    "level": 2,
    "total_papers": 13,
    "total_score": 7.206983590000002,
    "venue_count": 11,
    "avg_score": 0.5543833530769232
  },
  {
    "id": "C184408114",
    "name": "Generative Design",
    "level": 3,
    "total_papers": 13,
    "total_score": 7.98969056,
    "venue_count": 8,
    "avg_score": 0.6145915815384615
  },
  {
    "id": "C165064840",
    "name": "Matching (statistics)",
    "level": 2,
    "total_papers": 13,
    "total_score": 6.80077797,
    "venue_count": 7,
    "avg_score": 0.523136766923077
  },
  {
    "id": "C173853756",
    "name": "Dialog box",
    "level": 2,
    "total_papers": 13,
    "total_score": 5.968733889999999,
    "venue_count": 12,
    "avg_score": 0.4591333761538461
  },
  {
    "id": "C9390403",
    "name": "Computer hardware",
    "level": 1,
    "total_papers": 13,
    "total_score": 1.46660327,
    "venue_count": 7,
    "avg_score": 0.11281563615384615
  },
  {
    "id": "C169093310",
    "name": "Personally identifiable information",
    "level": 2,
    "total_papers": 13,
    "total_score": 6.974908549999999,
    "venue_count": 9,
    "avg_score": 0.5365314269230769
  },
  {
    "id": "C199521495",
    "name": "Audit",
    "level": 2,
    "total_papers": 13,
    "total_score": 8.59134244,
    "venue_count": 5,
    "avg_score": 0.6608724953846153
  },
  {
    "id": "C119767625",
    "name": "Optometry",
    "level": 1,
    "total_papers": 13,
    "total_score": 2.47211363,
    "venue_count": 8,
    "avg_score": 0.19016258692307692
  },
  {
    "id": "C161772715",
    "name": "User-centered design",
    "level": 2,
    "total_papers": 13,
    "total_score": 6.75504992,
    "venue_count": 9,
    "avg_score": 0.5196192246153847
  },
  {
    "id": "C2778449503",
    "name": "Appeal",
    "level": 2,
    "total_papers": 13,
    "total_score": 8.30701711,
    "venue_count": 9,
    "avg_score": 0.6390013161538461
  },
  {
    "id": "C2779483572",
    "name": "Dementia",
    "level": 3,
    "total_papers": 13,
    "total_score": 8.58570836,
    "venue_count": 10,
    "avg_score": 0.6604391046153846
  },
  {
    "id": "C40722632",
    "name": "Confirmatory factor analysis",
    "level": 3,
    "total_papers": 13,
    "total_score": 7.62525118,
    "venue_count": 8,
    "avg_score": 0.5865577830769231
  },
  {
    "id": "C167966045",
    "name": "Generative model",
    "level": 3,
    "total_papers": 13,
    "total_score": 6.64728121,
    "venue_count": 9,
    "avg_score": 0.5113293238461538
  },
  {
    "id": "C173801870",
    "name": "Heuristic",
    "level": 2,
    "total_papers": 13,
    "total_score": 6.972249,
    "venue_count": 10,
    "avg_score": 0.5363268461538462
  },
  {
    "id": "C65401140",
    "name": "Robot control",
    "level": 4,
    "total_papers": 13,
    "total_score": 1.6037192500000002,
    "venue_count": 11,
    "avg_score": 0.12336301923076924
  },
  {
    "id": "C158495155",
    "name": "Visual search",
    "level": 2,
    "total_papers": 13,
    "total_score": 6.943292230000001,
    "venue_count": 4,
    "avg_score": 0.5340994023076924
  },
  {
    "id": "C139225968",
    "name": "System usability scale",
    "level": 4,
    "total_papers": 13,
    "total_score": 6.890351430000001,
    "venue_count": 7,
    "avg_score": 0.5300270330769231
  },
  {
    "id": "C2777526511",
    "name": "Pace",
    "level": 2,
    "total_papers": 13,
    "total_score": 8.215418819999998,
    "venue_count": 11,
    "avg_score": 0.6319552938461537
  },
  {
    "id": "C145097563",
    "name": "Payment",
    "level": 2,
    "total_papers": 13,
    "total_score": 5.40212945,
    "venue_count": 8,
    "avg_score": 0.41554841923076924
  },
  {
    "id": "C55958113",
    "name": "Indigenous",
    "level": 2,
    "total_papers": 13,
    "total_score": 7.8717264799999995,
    "venue_count": 8,
    "avg_score": 0.6055174215384616
  },
  {
    "id": "C2779308522",
    "name": "Digitization",
    "level": 2,
    "total_papers": 13,
    "total_score": 8.44948956,
    "venue_count": 10,
    "avg_score": 0.6499607353846154
  },
  {
    "id": "C668760",
    "name": "Vocational education",
    "level": 2,
    "total_papers": 13,
    "total_score": 8.25892837,
    "venue_count": 7,
    "avg_score": 0.6353021823076923
  },
  {
    "id": "C154775046",
    "name": "German",
    "level": 2,
    "total_papers": 13,
    "total_score": 8.14684796,
    "venue_count": 10,
    "avg_score": 0.6266806123076923
  },
  {
    "id": "C2779843651",
    "name": "SIGNAL (programming language)",
    "level": 2,
    "total_papers": 13,
    "total_score": 6.308557039999999,
    "venue_count": 5,
    "avg_score": 0.4852736184615384
  },
  {
    "id": "C148483581",
    "name": "Feature selection",
    "level": 2,
    "total_papers": 13,
    "total_score": 7.129991259999999,
    "venue_count": 8,
    "avg_score": 0.548460866153846
  },
  {
    "id": "C145912823",
    "name": "Dynamics (music)",
    "level": 2,
    "total_papers": 13,
    "total_score": 7.95251229,
    "venue_count": 8,
    "avg_score": 0.6117317146153846
  },
  {
    "id": "C41608201",
    "name": "Embedding",
    "level": 2,
    "total_papers": 13,
    "total_score": 6.914912000000001,
    "venue_count": 7,
    "avg_score": 0.5319163076923078
  },
  {
    "id": "C2777103469",
    "name": "Smart city",
    "level": 3,
    "total_papers": 13,
    "total_score": 7.328476820000001,
    "venue_count": 8,
    "avg_score": 0.5637289861538461
  },
  {
    "id": "C170700871",
    "name": "Biomechanics",
    "level": 2,
    "total_papers": 13,
    "total_score": 6.230659930000001,
    "venue_count": 3,
    "avg_score": 0.4792815330769231
  },
  {
    "id": "C2776436953",
    "name": "Consistency (knowledge bases)",
    "level": 2,
    "total_papers": 13,
    "total_score": 6.82726925,
    "venue_count": 8,
    "avg_score": 0.5251745576923077
  },
  {
    "id": "C137176749",
    "name": "Psychological resilience",
    "level": 2,
    "total_papers": 13,
    "total_score": 6.2077355,
    "venue_count": 7,
    "avg_score": 0.4775181153846154
  },
  {
    "id": "C13606891",
    "name": "Conceptual model",
    "level": 2,
    "total_papers": 13,
    "total_score": 6.5430394100000004,
    "venue_count": 9,
    "avg_score": 0.5033107238461538
  },
  {
    "id": "C84976871",
    "name": "Openness to experience",
    "level": 2,
    "total_papers": 13,
    "total_score": 9.28568594,
    "venue_count": 8,
    "avg_score": 0.7142835338461538
  },
  {
    "id": "C108713360",
    "name": "Supply chain",
    "level": 2,
    "total_papers": 13,
    "total_score": 8.03693754,
    "venue_count": 3,
    "avg_score": 0.6182259646153846
  },
  {
    "id": "C533356498",
    "name": "Critical thinking",
    "level": 2,
    "total_papers": 13,
    "total_score": 7.996128379999999,
    "venue_count": 4,
    "avg_score": 0.6150867984615384
  },
  {
    "id": "C2780504989",
    "name": "Dynamic capabilities",
    "level": 2,
    "total_papers": 13,
    "total_score": 7.76422203,
    "venue_count": 1,
    "avg_score": 0.5972478484615384
  },
  {
    "id": "C2994386881",
    "name": "Front page",
    "level": 2,
    "total_papers": 13,
    "total_score": 7.185245330000001,
    "venue_count": 1,
    "avg_score": 0.5527111792307693
  },
  {
    "id": "C2779328685",
    "name": "Patient safety",
    "level": 3,
    "total_papers": 13,
    "total_score": 6.70418981,
    "venue_count": 3,
    "avg_score": 0.5157069084615384
  },
  {
    "id": "C2781197403",
    "name": "Trunk",
    "level": 2,
    "total_papers": 13,
    "total_score": 8.64166733,
    "venue_count": 2,
    "avg_score": 0.6647436407692309
  },
  {
    "id": "C2778311575",
    "name": "Metaphor",
    "level": 2,
    "total_papers": 12,
    "total_score": 7.0381288799999995,
    "venue_count": 8,
    "avg_score": 0.5865107399999999
  },
  {
    "id": "C548081761",
    "name": "Waste management",
    "level": 1,
    "total_papers": 12,
    "total_score": 1.66992637,
    "venue_count": 8,
    "avg_score": 0.13916053083333332
  },
  {
    "id": "C166052673",
    "name": "Empirical evidence",
    "level": 2,
    "total_papers": 12,
    "total_score": 5.7140656000000005,
    "venue_count": 8,
    "avg_score": 0.47617213333333336
  },
  {
    "id": "C73484699",
    "name": "Criminology",
    "level": 1,
    "total_papers": 12,
    "total_score": 3.68261851,
    "venue_count": 6,
    "avg_score": 0.30688487583333335
  },
  {
    "id": "C2777648619",
    "name": "Learning analytics",
    "level": 2,
    "total_papers": 12,
    "total_score": 7.16982987,
    "venue_count": 8,
    "avg_score": 0.5974858225
  },
  {
    "id": "C124304363",
    "name": "Abstraction",
    "level": 2,
    "total_papers": 12,
    "total_score": 7.29360705,
    "venue_count": 10,
    "avg_score": 0.6078005875
  },
  {
    "id": "C2780586882",
    "name": "Simple (philosophy)",
    "level": 2,
    "total_papers": 12,
    "total_score": 5.4756773800000005,
    "venue_count": 9,
    "avg_score": 0.4563064483333334
  },
  {
    "id": "C2777545354",
    "name": "Social anxiety",
    "level": 3,
    "total_papers": 12,
    "total_score": 6.313176930000001,
    "venue_count": 4,
    "avg_score": 0.5260980775
  },
  {
    "id": "C44725695",
    "name": "Normative",
    "level": 2,
    "total_papers": 12,
    "total_score": 7.205823480000001,
    "venue_count": 9,
    "avg_score": 0.6004852900000001
  },
  {
    "id": "C43091099",
    "name": "Through-the-lens metering",
    "level": 3,
    "total_papers": 12,
    "total_score": 5.9169024,
    "venue_count": 8,
    "avg_score": 0.4930752
  },
  {
    "id": "C151319957",
    "name": "Asynchronous communication",
    "level": 2,
    "total_papers": 12,
    "total_score": 6.9317091600000005,
    "venue_count": 8,
    "avg_score": 0.57764243
  },
  {
    "id": "C2779302386",
    "name": "Anger",
    "level": 2,
    "total_papers": 12,
    "total_score": 5.98071367,
    "venue_count": 9,
    "avg_score": 0.49839280583333334
  },
  {
    "id": "C148220186",
    "name": "Outcome (game theory)",
    "level": 2,
    "total_papers": 12,
    "total_score": 5.77601116,
    "venue_count": 10,
    "avg_score": 0.48133426333333335
  },
  {
    "id": "C2778701210",
    "name": "Constructive",
    "level": 3,
    "total_papers": 12,
    "total_score": 8.106374540000001,
    "venue_count": 10,
    "avg_score": 0.6755312116666667
  },
  {
    "id": "C118524514",
    "name": "Computer architecture",
    "level": 1,
    "total_papers": 12,
    "total_score": 0.8696243000000001,
    "venue_count": 8,
    "avg_score": 0.07246869166666668
  },
  {
    "id": "C79061980",
    "name": "Inertial measurement unit",
    "level": 2,
    "total_papers": 12,
    "total_score": 7.6558297,
    "venue_count": 6,
    "avg_score": 0.6379858083333333
  },
  {
    "id": "C22561748",
    "name": "Videoconferencing",
    "level": 2,
    "total_papers": 12,
    "total_score": 8.23468697,
    "venue_count": 9,
    "avg_score": 0.6862239141666667
  },
  {
    "id": "C94487597",
    "name": "Sensory system",
    "level": 2,
    "total_papers": 12,
    "total_score": 5.71407194,
    "venue_count": 8,
    "avg_score": 0.47617266166666666
  },
  {
    "id": "C31173074",
    "name": "Attractiveness",
    "level": 2,
    "total_papers": 12,
    "total_score": 8.66062177,
    "venue_count": 7,
    "avg_score": 0.7217184808333333
  },
  {
    "id": "C17020691",
    "name": "Operator (biology)",
    "level": 5,
    "total_papers": 12,
    "total_score": 5.97216344,
    "venue_count": 7,
    "avg_score": 0.4976802866666667
  },
  {
    "id": "C158448853",
    "name": "Repressor",
    "level": 4,
    "total_papers": 12,
    "total_score": 0,
    "venue_count": 7,
    "avg_score": 0
  },
  {
    "id": "C86339819",
    "name": "Transcription factor",
    "level": 3,
    "total_papers": 12,
    "total_score": 0,
    "venue_count": 7,
    "avg_score": 0
  },
  {
    "id": "C162947575",
    "name": "Social robot",
    "level": 5,
    "total_papers": 12,
    "total_score": 5.6120145699999995,
    "venue_count": 11,
    "avg_score": 0.46766788083333327
  },
  {
    "id": "C82876162",
    "name": "Latency (audio)",
    "level": 2,
    "total_papers": 12,
    "total_score": 6.9021406800000005,
    "venue_count": 5,
    "avg_score": 0.57517839
  },
  {
    "id": "C187029079",
    "name": "Cognitive reframing",
    "level": 2,
    "total_papers": 12,
    "total_score": 9.53406166,
    "venue_count": 8,
    "avg_score": 0.7945051383333334
  },
  {
    "id": "C186370098",
    "name": "Energy (signal processing)",
    "level": 2,
    "total_papers": 12,
    "total_score": 5.742147150000001,
    "venue_count": 6,
    "avg_score": 0.47851226250000006
  },
  {
    "id": "C176777502",
    "name": "Anticipation (artificial intelligence)",
    "level": 2,
    "total_papers": 12,
    "total_score": 8.09919173,
    "venue_count": 8,
    "avg_score": 0.6749326441666667
  },
  {
    "id": "C2780513914",
    "name": "Bottleneck",
    "level": 2,
    "total_papers": 12,
    "total_score": 3.59634423,
    "venue_count": 9,
    "avg_score": 0.2996953525
  },
  {
    "id": "C118505674",
    "name": "Encoder",
    "level": 2,
    "total_papers": 12,
    "total_score": 6.167207729999999,
    "venue_count": 5,
    "avg_score": 0.5139339774999999
  },
  {
    "id": "C173655357",
    "name": "Digital divide",
    "level": 3,
    "total_papers": 12,
    "total_score": 6.490469259999999,
    "venue_count": 5,
    "avg_score": 0.5408724383333333
  },
  {
    "id": "C21569690",
    "name": "Collaborative filtering",
    "level": 3,
    "total_papers": 12,
    "total_score": 6.788492969999999,
    "venue_count": 3,
    "avg_score": 0.5657077475
  },
  {
    "id": "C179737136",
    "name": "Design technology",
    "level": 2,
    "total_papers": 12,
    "total_score": 5.41432093,
    "venue_count": 5,
    "avg_score": 0.4511934108333333
  },
  {
    "id": "C169258074",
    "name": "Random forest",
    "level": 2,
    "total_papers": 12,
    "total_score": 6.50117044,
    "venue_count": 9,
    "avg_score": 0.5417642033333333
  },
  {
    "id": "C23213687",
    "name": "Consumer behaviour",
    "level": 2,
    "total_papers": 12,
    "total_score": 5.282552099999999,
    "venue_count": 7,
    "avg_score": 0.44021267499999994
  },
  {
    "id": "C172195944",
    "name": "Ubiquitous computing",
    "level": 2,
    "total_papers": 12,
    "total_score": 6.46192768,
    "venue_count": 4,
    "avg_score": 0.5384939733333333
  },
  {
    "id": "C131158328",
    "name": "Social influence",
    "level": 2,
    "total_papers": 12,
    "total_score": 4.67016827,
    "venue_count": 6,
    "avg_score": 0.38918068916666665
  },
  {
    "id": "C2780346085",
    "name": "Unified theory of acceptance and use of technology",
    "level": 3,
    "total_papers": 12,
    "total_score": 7.9269951,
    "venue_count": 8,
    "avg_score": 0.660582925
  },
  {
    "id": "C178624890",
    "name": "Instructional simulation",
    "level": 3,
    "total_papers": 12,
    "total_score": 6.27729977,
    "venue_count": 6,
    "avg_score": 0.5231083141666667
  },
  {
    "id": "C3019565508",
    "name": "Virtual world",
    "level": 2,
    "total_papers": 12,
    "total_score": 5.74841464,
    "venue_count": 6,
    "avg_score": 0.47903455333333333
  },
  {
    "id": "C184337299",
    "name": "Semantics (computer science)",
    "level": 2,
    "total_papers": 12,
    "total_score": 5.93185662,
    "venue_count": 8,
    "avg_score": 0.49432138499999995
  },
  {
    "id": "C59404180",
    "name": "Feature learning",
    "level": 2,
    "total_papers": 12,
    "total_score": 5.93968762,
    "venue_count": 3,
    "avg_score": 0.49497396833333335
  },
  {
    "id": "C58546491",
    "name": "Competitive advantage",
    "level": 2,
    "total_papers": 12,
    "total_score": 5.333621394,
    "venue_count": 3,
    "avg_score": 0.4444684495
  },
  {
    "id": "C138236772",
    "name": "Edge device",
    "level": 3,
    "total_papers": 12,
    "total_score": 5.91573321,
    "venue_count": 2,
    "avg_score": 0.4929777675
  },
  {
    "id": "C459310",
    "name": "Computational science",
    "level": 1,
    "total_papers": 12,
    "total_score": 4.482118399999999,
    "venue_count": 1,
    "avg_score": 0.3735098666666666
  },
  {
    "id": "C502989409",
    "name": "Animation",
    "level": 2,
    "total_papers": 12,
    "total_score": 6.646809429999999,
    "venue_count": 9,
    "avg_score": 0.5539007858333332
  },
  {
    "id": "C98147612",
    "name": "Promotion (chess)",
    "level": 3,
    "total_papers": 11,
    "total_score": 5.55364838,
    "venue_count": 8,
    "avg_score": 0.5048771254545454
  },
  {
    "id": "C184047640",
    "name": "Illusion",
    "level": 2,
    "total_papers": 11,
    "total_score": 7.57083386,
    "venue_count": 4,
    "avg_score": 0.6882576236363636
  },
  {
    "id": "C2777895361",
    "name": "Longitudinal study",
    "level": 2,
    "total_papers": 11,
    "total_score": 5.69379663,
    "venue_count": 5,
    "avg_score": 0.5176178754545454
  },
  {
    "id": "C205711294",
    "name": "Rendering (computer graphics)",
    "level": 2,
    "total_papers": 11,
    "total_score": 6.624615530000001,
    "venue_count": 8,
    "avg_score": 0.6022377754545455
  },
  {
    "id": "C19527891",
    "name": "Medical physics",
    "level": 1,
    "total_papers": 11,
    "total_score": 4.06407722,
    "venue_count": 8,
    "avg_score": 0.36946156545454545
  },
  {
    "id": "C761482",
    "name": "Transmission (telecommunications)",
    "level": 2,
    "total_papers": 11,
    "total_score": 4.015214,
    "venue_count": 8,
    "avg_score": 0.3650194545454546
  },
  {
    "id": "C2780433410",
    "name": "Digital health",
    "level": 3,
    "total_papers": 11,
    "total_score": 5.88743522,
    "venue_count": 7,
    "avg_score": 0.5352213836363636
  },
  {
    "id": "C12725497",
    "name": "Baseline (sea)",
    "level": 2,
    "total_papers": 11,
    "total_score": 6.15661943,
    "venue_count": 10,
    "avg_score": 0.5596926754545455
  },
  {
    "id": "C136229726",
    "name": "Biomedical engineering",
    "level": 1,
    "total_papers": 11,
    "total_score": 0.9349041749999999,
    "venue_count": 7,
    "avg_score": 0.08499128863636363
  },
  {
    "id": "C118518473",
    "name": "Agriculture",
    "level": 2,
    "total_papers": 11,
    "total_score": 2.07935472,
    "venue_count": 9,
    "avg_score": 0.18903224727272727
  },
  {
    "id": "C2779545769",
    "name": "Closeness",
    "level": 2,
    "total_papers": 11,
    "total_score": 8.31851884,
    "venue_count": 8,
    "avg_score": 0.7562289854545454
  },
  {
    "id": "C180198813",
    "name": "Information system",
    "level": 2,
    "total_papers": 11,
    "total_score": 3.70961227,
    "venue_count": 8,
    "avg_score": 0.3372374790909091
  },
  {
    "id": "C138816342",
    "name": "Public health",
    "level": 2,
    "total_papers": 11,
    "total_score": 4.74870539,
    "venue_count": 7,
    "avg_score": 0.43170048999999994
  },
  {
    "id": "C4727928",
    "name": "Social network (sociolinguistics)",
    "level": 3,
    "total_papers": 11,
    "total_score": 5.23124465,
    "venue_count": 9,
    "avg_score": 0.4755676954545454
  },
  {
    "id": "C58642233",
    "name": "Taxonomy (biology)",
    "level": 2,
    "total_papers": 11,
    "total_score": 6.46640587,
    "venue_count": 9,
    "avg_score": 0.5878550790909091
  },
  {
    "id": "C162446236",
    "name": "Content analysis",
    "level": 2,
    "total_papers": 11,
    "total_score": 5.348561069999999,
    "venue_count": 5,
    "avg_score": 0.4862328245454544
  },
  {
    "id": "C2775945657",
    "name": "Structuring",
    "level": 2,
    "total_papers": 11,
    "total_score": 6.33477883,
    "venue_count": 10,
    "avg_score": 0.5758889845454546
  },
  {
    "id": "C2778707766",
    "name": "Phone",
    "level": 2,
    "total_papers": 11,
    "total_score": 4.8674760599999995,
    "venue_count": 6,
    "avg_score": 0.4424978236363636
  },
  {
    "id": "C2776741261",
    "name": "Live streaming",
    "level": 2,
    "total_papers": 11,
    "total_score": 6.836295759999999,
    "venue_count": 6,
    "avg_score": 0.6214814327272726
  },
  {
    "id": "C149364088",
    "name": "Translation (biology)",
    "level": 4,
    "total_papers": 11,
    "total_score": 5.588338820000001,
    "venue_count": 7,
    "avg_score": 0.5080308018181818
  },
  {
    "id": "C105580179",
    "name": "Messenger RNA",
    "level": 3,
    "total_papers": 11,
    "total_score": 0,
    "venue_count": 7,
    "avg_score": 0
  },
  {
    "id": "C144543869",
    "name": "Mobile computing",
    "level": 2,
    "total_papers": 11,
    "total_score": 4.52948509,
    "venue_count": 5,
    "avg_score": 0.4117713718181818
  },
  {
    "id": "C89423630",
    "name": "Microbiology",
    "level": 1,
    "total_papers": 11,
    "total_score": 0.33041108,
    "venue_count": 10,
    "avg_score": 0.03003737090909091
  },
  {
    "id": "C48007421",
    "name": "Motion capture",
    "level": 3,
    "total_papers": 11,
    "total_score": 5.334331550000001,
    "venue_count": 7,
    "avg_score": 0.4849392318181819
  },
  {
    "id": "C2780980858",
    "name": "Dual (grammatical number)",
    "level": 2,
    "total_papers": 11,
    "total_score": 6.82895818,
    "venue_count": 6,
    "avg_score": 0.62081438
  },
  {
    "id": "C177148314",
    "name": "Generalization",
    "level": 2,
    "total_papers": 11,
    "total_score": 6.39482194,
    "venue_count": 4,
    "avg_score": 0.5813474490909091
  },
  {
    "id": "C184297639",
    "name": "Biometrics",
    "level": 2,
    "total_papers": 11,
    "total_score": 6.132382660000001,
    "venue_count": 6,
    "avg_score": 0.5574893327272729
  },
  {
    "id": "C58166",
    "name": "Fuzzy logic",
    "level": 2,
    "total_papers": 11,
    "total_score": 5.15981032,
    "venue_count": 8,
    "avg_score": 0.4690736654545455
  },
  {
    "id": "C205783811",
    "name": "Painting",
    "level": 2,
    "total_papers": 11,
    "total_score": 5.504704943,
    "venue_count": 6,
    "avg_score": 0.5004277220909091
  },
  {
    "id": "C107673813",
    "name": "Bayesian probability",
    "level": 2,
    "total_papers": 11,
    "total_score": 3.214337156,
    "venue_count": 6,
    "avg_score": 0.29221246872727275
  },
  {
    "id": "C2778539339",
    "name": "Touchscreen",
    "level": 2,
    "total_papers": 11,
    "total_score": 8.99349004,
    "venue_count": 6,
    "avg_score": 0.8175900036363636
  },
  {
    "id": "C125370674",
    "name": "Stressor",
    "level": 2,
    "total_papers": 11,
    "total_score": 6.33734318,
    "venue_count": 5,
    "avg_score": 0.5761221072727273
  },
  {
    "id": "C163355716",
    "name": "Risk perception",
    "level": 3,
    "total_papers": 11,
    "total_score": 5.61575402,
    "venue_count": 4,
    "avg_score": 0.5105230927272727
  },
  {
    "id": "C30772137",
    "name": "Consumption (sociology)",
    "level": 2,
    "total_papers": 11,
    "total_score": 5.73025212,
    "venue_count": 8,
    "avg_score": 0.5209320109090909
  },
  {
    "id": "C178218473",
    "name": "Search engine optimization",
    "level": 3,
    "total_papers": 11,
    "total_score": 5.478914550000001,
    "venue_count": 3,
    "avg_score": 0.49808314090909095
  },
  {
    "id": "C203062551",
    "name": "Public-key cryptography",
    "level": 3,
    "total_papers": 11,
    "total_score": 3.7251021800000004,
    "venue_count": 2,
    "avg_score": 0.33864565272727276
  },
  {
    "id": "C39896193",
    "name": "Descriptive statistics",
    "level": 2,
    "total_papers": 11,
    "total_score": 4.80961454,
    "venue_count": 7,
    "avg_score": 0.43723768545454544
  },
  {
    "id": "C552854447",
    "name": "Sustainable development",
    "level": 2,
    "total_papers": 11,
    "total_score": 5.29849729,
    "venue_count": 6,
    "avg_score": 0.48168157181818183
  },
  {
    "id": "C158573231",
    "name": "Pragmatism",
    "level": 2,
    "total_papers": 11,
    "total_score": 9.04873399,
    "venue_count": 3,
    "avg_score": 0.8226121809090909
  },
  {
    "id": "C57473165",
    "name": "Resistance (ecology)",
    "level": 2,
    "total_papers": 10,
    "total_score": 6.250790970000001,
    "venue_count": 7,
    "avg_score": 0.6250790970000001
  },
  {
    "id": "C58581272",
    "name": "Workspace",
    "level": 3,
    "total_papers": 10,
    "total_score": 7.32843057,
    "venue_count": 10,
    "avg_score": 0.732843057
  },
  {
    "id": "C148609458",
    "name": "Nexus (standard)",
    "level": 2,
    "total_papers": 10,
    "total_score": 6.90653613,
    "venue_count": 5,
    "avg_score": 0.690653613
  },
  {
    "id": "C20555606",
    "name": "Empowerment",
    "level": 2,
    "total_papers": 10,
    "total_score": 6.045972020000001,
    "venue_count": 8,
    "avg_score": 0.6045972020000001
  },
  {
    "id": "C29794715",
    "name": "Smartwatch",
    "level": 3,
    "total_papers": 10,
    "total_score": 7.61965729,
    "venue_count": 8,
    "avg_score": 0.761965729
  },
  {
    "id": "C198477413",
    "name": "Survey data collection",
    "level": 2,
    "total_papers": 10,
    "total_score": 4.47727831,
    "venue_count": 7,
    "avg_score": 0.447727831
  },
  {
    "id": "C543847140",
    "name": "Realism",
    "level": 2,
    "total_papers": 10,
    "total_score": 5.611736090000001,
    "venue_count": 6,
    "avg_score": 0.5611736090000001
  },
  {
    "id": "C14185376",
    "name": "Agile software development",
    "level": 2,
    "total_papers": 10,
    "total_score": 6.56969798,
    "venue_count": 10,
    "avg_score": 0.656969798
  },
  {
    "id": "C2776931063",
    "name": "Appropriation",
    "level": 2,
    "total_papers": 10,
    "total_score": 7.05870316,
    "venue_count": 8,
    "avg_score": 0.705870316
  },
  {
    "id": "C180962459",
    "name": "Co-design",
    "level": 2,
    "total_papers": 10,
    "total_score": 5.1405135600000005,
    "venue_count": 7,
    "avg_score": 0.5140513560000001
  },
  {
    "id": "C42360764",
    "name": "Chemical engineering",
    "level": 1,
    "total_papers": 10,
    "total_score": 0,
    "venue_count": 7,
    "avg_score": 0
  },
  {
    "id": "C2779227376",
    "name": "Layer (electronics)",
    "level": 2,
    "total_papers": 10,
    "total_score": 4.00759021,
    "venue_count": 7,
    "avg_score": 0.400759021
  },
  {
    "id": "C2780444219",
    "name": "Mindfulness",
    "level": 2,
    "total_papers": 10,
    "total_score": 7.4350339199999995,
    "venue_count": 7,
    "avg_score": 0.7435033919999999
  },
  {
    "id": "C146849305",
    "name": "Ground truth",
    "level": 2,
    "total_papers": 10,
    "total_score": 5.24425644,
    "venue_count": 7,
    "avg_score": 0.524425644
  },
  {
    "id": "C31352089",
    "name": "Systems design",
    "level": 2,
    "total_papers": 10,
    "total_score": 1.7961122649999999,
    "venue_count": 7,
    "avg_score": 0.1796112265
  },
  {
    "id": "C35578498",
    "name": "Web service",
    "level": 2,
    "total_papers": 10,
    "total_score": 2.32284047,
    "venue_count": 5,
    "avg_score": 0.232284047
  },
  {
    "id": "C91034043",
    "name": "Interpersonal relationship",
    "level": 2,
    "total_papers": 10,
    "total_score": 5.03290058,
    "venue_count": 7,
    "avg_score": 0.5032900579999999
  },
  {
    "id": "C164913051",
    "name": "Poetry",
    "level": 2,
    "total_papers": 10,
    "total_score": 3.71506034,
    "venue_count": 6,
    "avg_score": 0.371506034
  },
  {
    "id": "C143110190",
    "name": "Emotional expression",
    "level": 2,
    "total_papers": 10,
    "total_score": 4.6247322099999995,
    "venue_count": 6,
    "avg_score": 0.46247322099999993
  },
  {
    "id": "C77967617",
    "name": "Active learning (machine learning)",
    "level": 2,
    "total_papers": 10,
    "total_score": 4.8697836,
    "venue_count": 8,
    "avg_score": 0.48697836
  },
  {
    "id": "C83860907",
    "name": "Phishing",
    "level": 3,
    "total_papers": 10,
    "total_score": 7.84090195,
    "venue_count": 7,
    "avg_score": 0.784090195
  },
  {
    "id": "C2775841894",
    "name": "Sleep (system call)",
    "level": 2,
    "total_papers": 10,
    "total_score": 5.92360565,
    "venue_count": 8,
    "avg_score": 0.592360565
  },
  {
    "id": "C91607612",
    "name": "Sonification",
    "level": 2,
    "total_papers": 10,
    "total_score": 8.38164412,
    "venue_count": 5,
    "avg_score": 0.838164412
  },
  {
    "id": "C49261128",
    "name": "Hazard",
    "level": 2,
    "total_papers": 10,
    "total_score": 5.620316720000001,
    "venue_count": 7,
    "avg_score": 0.562031672
  },
  {
    "id": "C2780984029",
    "name": "Stakeholder engagement",
    "level": 2,
    "total_papers": 10,
    "total_score": 5.14126416,
    "venue_count": 7,
    "avg_score": 0.5141264160000001
  },
  {
    "id": "C194232998",
    "name": "Transition (genetics)",
    "level": 3,
    "total_papers": 10,
    "total_score": 5.1882407399999995,
    "venue_count": 9,
    "avg_score": 0.518824074
  },
  {
    "id": "C2775941552",
    "name": "Isolation (microbiology)",
    "level": 2,
    "total_papers": 10,
    "total_score": 5.64050458,
    "venue_count": 9,
    "avg_score": 0.564050458
  },
  {
    "id": "C98184364",
    "name": "Argument (complex analysis)",
    "level": 2,
    "total_papers": 10,
    "total_score": 5.870952090000001,
    "venue_count": 7,
    "avg_score": 0.5870952090000001
  },
  {
    "id": "C15122004",
    "name": "Open learning",
    "level": 4,
    "total_papers": 10,
    "total_score": 2.2244967460000002,
    "venue_count": 8,
    "avg_score": 0.22244967460000004
  },
  {
    "id": "C135343436",
    "name": "Rhythm",
    "level": 2,
    "total_papers": 10,
    "total_score": 4.2898229599999995,
    "venue_count": 8,
    "avg_score": 0.42898229599999993
  },
  {
    "id": "C2776650193",
    "name": "Obstacle",
    "level": 2,
    "total_papers": 10,
    "total_score": 6.01513373,
    "venue_count": 7,
    "avg_score": 0.601513373
  },
  {
    "id": "C126057942",
    "name": "Stereoscopy",
    "level": 2,
    "total_papers": 10,
    "total_score": 6.87969986,
    "venue_count": 5,
    "avg_score": 0.6879699859999999
  },
  {
    "id": "C2776660947",
    "name": "Upper limb",
    "level": 2,
    "total_papers": 10,
    "total_score": 4.84200593,
    "venue_count": 4,
    "avg_score": 0.484200593
  },
  {
    "id": "C171146098",
    "name": "Automotive engineering",
    "level": 1,
    "total_papers": 10,
    "total_score": 2.66000148,
    "venue_count": 7,
    "avg_score": 0.266000148
  },
  {
    "id": "C183115368",
    "name": "Weighting",
    "level": 2,
    "total_papers": 10,
    "total_score": 6.24937414,
    "venue_count": 7,
    "avg_score": 0.6249374139999999
  },
  {
    "id": "C57493831",
    "name": "Projection (relational algebra)",
    "level": 2,
    "total_papers": 10,
    "total_score": 5.25562679,
    "venue_count": 4,
    "avg_score": 0.525562679
  },
  {
    "id": "C134202134",
    "name": "Computer-mediated reality",
    "level": 4,
    "total_papers": 10,
    "total_score": 3.7841288799999995,
    "venue_count": 4,
    "avg_score": 0.37841288799999995
  },
  {
    "id": "C206729178",
    "name": "Scheduling (production processes)",
    "level": 2,
    "total_papers": 10,
    "total_score": 3.6682396199999996,
    "venue_count": 6,
    "avg_score": 0.36682396199999995
  },
  {
    "id": "C2776502983",
    "name": "Contrast (vision)",
    "level": 2,
    "total_papers": 10,
    "total_score": 5.03555883,
    "venue_count": 8,
    "avg_score": 0.503555883
  },
  {
    "id": "C60952562",
    "name": "Mobile technology",
    "level": 3,
    "total_papers": 10,
    "total_score": 4.46437461,
    "venue_count": 4,
    "avg_score": 0.44643746100000004
  },
  {
    "id": "C2779363104",
    "name": "mHealth",
    "level": 3,
    "total_papers": 10,
    "total_score": 7.77084768,
    "venue_count": 7,
    "avg_score": 0.777084768
  },
  {
    "id": "C49937458",
    "name": "Probabilistic logic",
    "level": 2,
    "total_papers": 10,
    "total_score": 5.46025532,
    "venue_count": 5,
    "avg_score": 0.546025532
  },
  {
    "id": "C170828538",
    "name": "Game mechanics",
    "level": 2,
    "total_papers": 10,
    "total_score": 4.44273643,
    "venue_count": 7,
    "avg_score": 0.444273643
  },
  {
    "id": "C195065555",
    "name": "Curvature",
    "level": 2,
    "total_papers": 10,
    "total_score": 5.63813607,
    "venue_count": 3,
    "avg_score": 0.5638136069999999
  },
  {
    "id": "C25810664",
    "name": "Ontology",
    "level": 2,
    "total_papers": 10,
    "total_score": 5.209487139999999,
    "venue_count": 8,
    "avg_score": 0.520948714
  },
  {
    "id": "C2776748549",
    "name": "Status quo",
    "level": 2,
    "total_papers": 9,
    "total_score": 5.811763839999999,
    "venue_count": 7,
    "avg_score": 0.6457515377777777
  },
  {
    "id": "C134141054",
    "name": "Performative utterance",
    "level": 2,
    "total_papers": 9,
    "total_score": 5.4237715799999995,
    "venue_count": 6,
    "avg_score": 0.6026412866666666
  },
  {
    "id": "C2779010991",
    "name": "Artifact (error)",
    "level": 2,
    "total_papers": 9,
    "total_score": 5.39565387,
    "venue_count": 6,
    "avg_score": 0.5995170966666667
  },
  {
    "id": "C90805587",
    "name": "Word (group theory)",
    "level": 2,
    "total_papers": 9,
    "total_score": 4.65192607,
    "venue_count": 6,
    "avg_score": 0.5168806744444444
  },
  {
    "id": "C39300077",
    "name": "Breathing",
    "level": 2,
    "total_papers": 9,
    "total_score": 5.08670842,
    "venue_count": 8,
    "avg_score": 0.5651898244444444
  },
  {
    "id": "C149229913",
    "name": "User interface design",
    "level": 3,
    "total_papers": 9,
    "total_score": 3.6054012800000006,
    "venue_count": 7,
    "avg_score": 0.4006001422222223
  },
  {
    "id": "C2780395129",
    "name": "Rapid prototyping",
    "level": 2,
    "total_papers": 9,
    "total_score": 5.061870259999999,
    "venue_count": 4,
    "avg_score": 0.5624300288888888
  },
  {
    "id": "C179254644",
    "name": "Moment (physics)",
    "level": 2,
    "total_papers": 9,
    "total_score": 5.09664643,
    "venue_count": 6,
    "avg_score": 0.5662940477777778
  },
  {
    "id": "C188087704",
    "name": "Standardization",
    "level": 2,
    "total_papers": 9,
    "total_score": 5.17225301,
    "venue_count": 9,
    "avg_score": 0.574694778888889
  },
  {
    "id": "C57501372",
    "name": "BitTorrent tracker",
    "level": 3,
    "total_papers": 9,
    "total_score": 5.77355314,
    "venue_count": 7,
    "avg_score": 0.6415059044444444
  },
  {
    "id": "C44870925",
    "name": "Astrophysics",
    "level": 1,
    "total_papers": 9,
    "total_score": 0.34396148,
    "venue_count": 9,
    "avg_score": 0.03821794222222222
  },
  {
    "id": "C105409693",
    "name": "Human intelligence",
    "level": 2,
    "total_papers": 9,
    "total_score": 4.39216475,
    "venue_count": 7,
    "avg_score": 0.4880183055555556
  },
  {
    "id": "C172367668",
    "name": "Data visualization",
    "level": 3,
    "total_papers": 9,
    "total_score": 4.46659128,
    "venue_count": 6,
    "avg_score": 0.49628792000000005
  },
  {
    "id": "C2778976716",
    "name": "Harassment",
    "level": 2,
    "total_papers": 9,
    "total_score": 6.398154669999999,
    "venue_count": 4,
    "avg_score": 0.7109060744444444
  },
  {
    "id": "C107826830",
    "name": "Environmental resource management",
    "level": 1,
    "total_papers": 9,
    "total_score": 3.5408094,
    "venue_count": 4,
    "avg_score": 0.39342326666666666
  },
  {
    "id": "C63882131",
    "name": "Strengths and weaknesses",
    "level": 2,
    "total_papers": 9,
    "total_score": 4.6185672900000005,
    "venue_count": 9,
    "avg_score": 0.5131741433333334
  },
  {
    "id": "C190954187",
    "name": "Dialog system",
    "level": 3,
    "total_papers": 9,
    "total_score": 4.63221404,
    "venue_count": 9,
    "avg_score": 0.5146904488888889
  },
  {
    "id": "C143916079",
    "name": "Burnout",
    "level": 2,
    "total_papers": 9,
    "total_score": 4.11147337,
    "venue_count": 6,
    "avg_score": 0.4568303744444444
  },
  {
    "id": "C158525013",
    "name": "Fusion",
    "level": 2,
    "total_papers": 9,
    "total_score": 4.2699966,
    "venue_count": 5,
    "avg_score": 0.47444406666666666
  },
  {
    "id": "C2982907496",
    "name": "Collaborative design",
    "level": 3,
    "total_papers": 9,
    "total_score": 4.42200053,
    "venue_count": 5,
    "avg_score": 0.4913333922222222
  },
  {
    "id": "C2781067378",
    "name": "Interpretability",
    "level": 2,
    "total_papers": 9,
    "total_score": 7.95422361,
    "venue_count": 4,
    "avg_score": 0.8838026233333333
  },
  {
    "id": "C68062652",
    "name": "Social capital",
    "level": 2,
    "total_papers": 9,
    "total_score": 3.37098194,
    "venue_count": 8,
    "avg_score": 0.3745535488888889
  },
  {
    "id": "C145633318",
    "name": "Nonverbal communication",
    "level": 2,
    "total_papers": 9,
    "total_score": 5.36599296,
    "venue_count": 6,
    "avg_score": 0.59622144
  },
  {
    "id": "C110131835",
    "name": "Self-efficacy",
    "level": 2,
    "total_papers": 9,
    "total_score": 5.1825746,
    "venue_count": 6,
    "avg_score": 0.5758416222222222
  },
  {
    "id": "C49453240",
    "name": "Construct validity",
    "level": 3,
    "total_papers": 9,
    "total_score": 4.42957423,
    "venue_count": 8,
    "avg_score": 0.49217491444444444
  },
  {
    "id": "C2776321320",
    "name": "Annotation",
    "level": 2,
    "total_papers": 9,
    "total_score": 5.51132793,
    "venue_count": 4,
    "avg_score": 0.61236977
  },
  {
    "id": "C48798503",
    "name": "Reputation",
    "level": 2,
    "total_papers": 9,
    "total_score": 4.67390096,
    "venue_count": 8,
    "avg_score": 0.5193223288888889
  },
  {
    "id": "C27548731",
    "name": "Investment (military)",
    "level": 3,
    "total_papers": 9,
    "total_score": 4.53106465,
    "venue_count": 4,
    "avg_score": 0.5034516277777779
  },
  {
    "id": "C118147538",
    "name": "Metacognition",
    "level": 3,
    "total_papers": 9,
    "total_score": 6.5833420899999995,
    "venue_count": 6,
    "avg_score": 0.7314824544444444
  },
  {
    "id": "C168031717",
    "name": "Balance (ability)",
    "level": 2,
    "total_papers": 9,
    "total_score": 5.50433864,
    "venue_count": 7,
    "avg_score": 0.6115931822222223
  },
  {
    "id": "C118643609",
    "name": "Web application",
    "level": 2,
    "total_papers": 9,
    "total_score": 4.13642096,
    "venue_count": 5,
    "avg_score": 0.45960232888888886
  },
  {
    "id": "C2780343955",
    "name": "Surprise",
    "level": 2,
    "total_papers": 9,
    "total_score": 5.956310459999999,
    "venue_count": 8,
    "avg_score": 0.6618122733333333
  },
  {
    "id": "C3018023364",
    "name": "Significant difference",
    "level": 2,
    "total_papers": 9,
    "total_score": 3.2692527999999994,
    "venue_count": 5,
    "avg_score": 0.36325031111111106
  },
  {
    "id": "C91375879",
    "name": "Environmental planning",
    "level": 1,
    "total_papers": 9,
    "total_score": 2.72565517,
    "venue_count": 7,
    "avg_score": 0.30285057444444446
  },
  {
    "id": "C2776604539",
    "name": "Knowledge sharing",
    "level": 2,
    "total_papers": 9,
    "total_score": 4.7949151699999994,
    "venue_count": 6,
    "avg_score": 0.5327683522222222
  },
  {
    "id": "C147859227",
    "name": "Public sector",
    "level": 2,
    "total_papers": 9,
    "total_score": 5.03913919,
    "venue_count": 6,
    "avg_score": 0.5599043544444444
  },
  {
    "id": "C2778165684",
    "name": "Online community",
    "level": 2,
    "total_papers": 9,
    "total_score": 4.40542678,
    "venue_count": 3,
    "avg_score": 0.4894918644444444
  },
  {
    "id": "C91262260",
    "name": "End user",
    "level": 2,
    "total_papers": 9,
    "total_score": 4.05010037,
    "venue_count": 8,
    "avg_score": 0.4500111522222222
  },
  {
    "id": "C31957729",
    "name": "Distancing",
    "level": 5,
    "total_papers": 9,
    "total_score": 4.92867357,
    "venue_count": 8,
    "avg_score": 0.5476303966666667
  },
  {
    "id": "C45012715",
    "name": "Studio",
    "level": 2,
    "total_papers": 9,
    "total_score": 6.129294160000001,
    "venue_count": 5,
    "avg_score": 0.6810326844444445
  },
  {
    "id": "C184356942",
    "name": "Best practice",
    "level": 2,
    "total_papers": 9,
    "total_score": 4.5760698600000005,
    "venue_count": 8,
    "avg_score": 0.5084522066666667
  },
  {
    "id": "C2776893239",
    "name": "Social isolation",
    "level": 2,
    "total_papers": 9,
    "total_score": 4.85463184,
    "venue_count": 8,
    "avg_score": 0.5394035377777777
  },
  {
    "id": "C2780668467",
    "name": "Personal protective equipment",
    "level": 5,
    "total_papers": 9,
    "total_score": 4.507715709999999,
    "venue_count": 5,
    "avg_score": 0.500857301111111
  },
  {
    "id": "C2776035091",
    "name": "Viewpoints",
    "level": 2,
    "total_papers": 9,
    "total_score": 5.95500037,
    "venue_count": 6,
    "avg_score": 0.6616667077777777
  },
  {
    "id": "C503872463",
    "name": "Distance education",
    "level": 2,
    "total_papers": 9,
    "total_score": 4.34102118,
    "venue_count": 5,
    "avg_score": 0.4823356866666667
  },
  {
    "id": "C151800584",
    "name": "Gait",
    "level": 2,
    "total_papers": 9,
    "total_score": 5.33391287,
    "venue_count": 4,
    "avg_score": 0.5926569855555556
  },
  {
    "id": "C59519942",
    "name": "Drone",
    "level": 2,
    "total_papers": 9,
    "total_score": 6.59437036,
    "venue_count": 4,
    "avg_score": 0.7327078177777778
  },
  {
    "id": "C27158222",
    "name": "Generalizability theory",
    "level": 2,
    "total_papers": 9,
    "total_score": 6.052028320000001,
    "venue_count": 7,
    "avg_score": 0.6724475911111112
  },
  {
    "id": "C195324797",
    "name": "Natural language",
    "level": 2,
    "total_papers": 9,
    "total_score": 3.81428905,
    "venue_count": 8,
    "avg_score": 0.42380989444444445
  },
  {
    "id": "C132964779",
    "name": "Raw data",
    "level": 2,
    "total_papers": 9,
    "total_score": 4.367894549999999,
    "venue_count": 7,
    "avg_score": 0.48532161666666657
  },
  {
    "id": "C2778112365",
    "name": "Sequence (biology)",
    "level": 2,
    "total_papers": 9,
    "total_score": 4.784888690000001,
    "venue_count": 6,
    "avg_score": 0.5316542988888889
  },
  {
    "id": "C2779913896",
    "name": "Notice",
    "level": 2,
    "total_papers": 9,
    "total_score": 5.27798701,
    "venue_count": 6,
    "avg_score": 0.5864430011111111
  },
  {
    "id": "C2781155252",
    "name": "Co-creation",
    "level": 2,
    "total_papers": 9,
    "total_score": 4.59188619,
    "venue_count": 6,
    "avg_score": 0.5102095766666667
  },
  {
    "id": "C71750763",
    "name": "General partnership",
    "level": 2,
    "total_papers": 9,
    "total_score": 5.65512357,
    "venue_count": 9,
    "avg_score": 0.6283470633333333
  },
  {
    "id": "C159456220",
    "name": "Instructional design",
    "level": 2,
    "total_papers": 9,
    "total_score": 4.531211859999999,
    "venue_count": 6,
    "avg_score": 0.5034679844444443
  },
  {
    "id": "C2385561",
    "name": "RSS",
    "level": 2,
    "total_papers": 9,
    "total_score": 6.59978774,
    "venue_count": 3,
    "avg_score": 0.7333097488888889
  },
  {
    "id": "C108037233",
    "name": "Wireless network",
    "level": 3,
    "total_papers": 9,
    "total_score": 3.0976073100000003,
    "venue_count": 4,
    "avg_score": 0.34417859000000006
  },
  {
    "id": "C2776036281",
    "name": "Constraint (computer-aided design)",
    "level": 2,
    "total_papers": 9,
    "total_score": 4.42430262,
    "venue_count": 3,
    "avg_score": 0.49158917999999996
  },
  {
    "id": "C2984567223",
    "name": "E learning",
    "level": 3,
    "total_papers": 9,
    "total_score": 4.35193286,
    "venue_count": 2,
    "avg_score": 0.48354809555555556
  },
  {
    "id": "C9417928",
    "name": "Image processing",
    "level": 3,
    "total_papers": 9,
    "total_score": 2.3355959,
    "venue_count": 4,
    "avg_score": 0.2595106555555555
  },
  {
    "id": "C5119721",
    "name": "Quality of service",
    "level": 2,
    "total_papers": 9,
    "total_score": 4.3416150899999995,
    "venue_count": 3,
    "avg_score": 0.4824016766666666
  },
  {
    "id": "C94617000",
    "name": "Qualitative comparative analysis",
    "level": 2,
    "total_papers": 9,
    "total_score": 5.01488554,
    "venue_count": 6,
    "avg_score": 0.5572095044444444
  },
  {
    "id": "C186037533",
    "name": "Innovation management",
    "level": 2,
    "total_papers": 9,
    "total_score": 4.31160621,
    "venue_count": 1,
    "avg_score": 0.47906735666666667
  },
  {
    "id": "C138852830",
    "name": "Design methods",
    "level": 2,
    "total_papers": 9,
    "total_score": 3.96583883,
    "venue_count": 5,
    "avg_score": 0.4406487588888889
  },
  {
    "id": "C24574437",
    "name": "Parametric model",
    "level": 3,
    "total_papers": 9,
    "total_score": 4.379427529999999,
    "venue_count": 2,
    "avg_score": 0.4866030588888888
  },
  {
    "id": "C181145010",
    "name": "Mesh generation",
    "level": 3,
    "total_papers": 9,
    "total_score": 3.73057078,
    "venue_count": 1,
    "avg_score": 0.41450786444444443
  },
  {
    "id": "C2780737243",
    "name": "Isogeometric analysis",
    "level": 3,
    "total_papers": 9,
    "total_score": 6.37147658,
    "venue_count": 1,
    "avg_score": 0.7079418422222222
  },
  {
    "id": "C2776370487",
    "name": "Sitting",
    "level": 2,
    "total_papers": 9,
    "total_score": 6.61874765,
    "venue_count": 2,
    "avg_score": 0.7354164055555557
  },
  {
    "id": "C2779153526",
    "name": "ADDIE Model",
    "level": 3,
    "total_papers": 9,
    "total_score": 5.49365949,
    "venue_count": 1,
    "avg_score": 0.61040661
  },
  {
    "id": "C2985564149",
    "name": "Intrinsic motivation",
    "level": 2,
    "total_papers": 8,
    "total_score": 5.01790107,
    "venue_count": 3,
    "avg_score": 0.62723763375
  },
  {
    "id": "C164767435",
    "name": "Textile",
    "level": 2,
    "total_papers": 8,
    "total_score": 5.1899792,
    "venue_count": 4,
    "avg_score": 0.6487474
  },
  {
    "id": "C2777742833",
    "name": "Reciprocal",
    "level": 2,
    "total_papers": 8,
    "total_score": 4.451220619999999,
    "venue_count": 6,
    "avg_score": 0.5564025774999999
  },
  {
    "id": "C171250308",
    "name": "Nanotechnology",
    "level": 1,
    "total_papers": 8,
    "total_score": 1.8643308760000001,
    "venue_count": 6,
    "avg_score": 0.23304135950000002
  },
  {
    "id": "C186846655",
    "name": "Software construction",
    "level": 4,
    "total_papers": 8,
    "total_score": 0.43378913,
    "venue_count": 8,
    "avg_score": 0.05422364125
  },
  {
    "id": "C2778491294",
    "name": "Mindset",
    "level": 2,
    "total_papers": 8,
    "total_score": 6.14685932,
    "venue_count": 6,
    "avg_score": 0.768357415
  },
  {
    "id": "C199728807",
    "name": "Equity (law)",
    "level": 2,
    "total_papers": 8,
    "total_score": 4.70062212,
    "venue_count": 6,
    "avg_score": 0.587577765
  },
  {
    "id": "C175202939",
    "name": "Self-disclosure",
    "level": 2,
    "total_papers": 8,
    "total_score": 4.90945192,
    "venue_count": 6,
    "avg_score": 0.61368149
  },
  {
    "id": "C3018587665",
    "name": "Qualitative analysis",
    "level": 3,
    "total_papers": 8,
    "total_score": 4.03169352,
    "venue_count": 3,
    "avg_score": 0.50396169
  },
  {
    "id": "C2984870255",
    "name": "User engagement",
    "level": 2,
    "total_papers": 8,
    "total_score": 4.9870873300000005,
    "venue_count": 6,
    "avg_score": 0.6233859162500001
  },
  {
    "id": "C2776377089",
    "name": "Biofeedback",
    "level": 2,
    "total_papers": 8,
    "total_score": 6.05896792,
    "venue_count": 6,
    "avg_score": 0.75737099
  },
  {
    "id": "C31170391",
    "name": "Hierarchy",
    "level": 2,
    "total_papers": 8,
    "total_score": 4.19718997,
    "venue_count": 6,
    "avg_score": 0.52464874625
  },
  {
    "id": "C177606310",
    "name": "Adaptability",
    "level": 2,
    "total_papers": 8,
    "total_score": 4.5886781899999995,
    "venue_count": 8,
    "avg_score": 0.5735847737499999
  },
  {
    "id": "C146854351",
    "name": "Self-determination theory",
    "level": 3,
    "total_papers": 8,
    "total_score": 4.44047848,
    "venue_count": 5,
    "avg_score": 0.55505981
  },
  {
    "id": "C9719361",
    "name": "Vignette",
    "level": 2,
    "total_papers": 8,
    "total_score": 5.398530200000001,
    "venue_count": 6,
    "avg_score": 0.6748162750000001
  },
  {
    "id": "C120208923",
    "name": "Conceptual design",
    "level": 2,
    "total_papers": 8,
    "total_score": 3.8988803499999998,
    "venue_count": 4,
    "avg_score": 0.48736004374999997
  },
  {
    "id": "C147446459",
    "name": "Dance",
    "level": 2,
    "total_papers": 8,
    "total_score": 4.00541693,
    "venue_count": 6,
    "avg_score": 0.50067711625
  },
  {
    "id": "C123307717",
    "name": "Materiality (auditing)",
    "level": 2,
    "total_papers": 8,
    "total_score": 5.49853875,
    "venue_count": 7,
    "avg_score": 0.68731734375
  },
  {
    "id": "C60692881",
    "name": "Humanoid robot",
    "level": 3,
    "total_papers": 8,
    "total_score": 5.10547616,
    "venue_count": 4,
    "avg_score": 0.63818452
  },
  {
    "id": "C100660578",
    "name": "Recall",
    "level": 2,
    "total_papers": 8,
    "total_score": 4.47931636,
    "venue_count": 5,
    "avg_score": 0.559914545
  },
  {
    "id": "C121608353",
    "name": "Cancer",
    "level": 2,
    "total_papers": 8,
    "total_score": 2.3265427400000003,
    "venue_count": 6,
    "avg_score": 0.29081784250000003
  },
  {
    "id": "C554144382",
    "name": "Performance art",
    "level": 2,
    "total_papers": 8,
    "total_score": 0.46049148,
    "venue_count": 7,
    "avg_score": 0.057561435
  },
  {
    "id": "C143299363",
    "name": "Attribution",
    "level": 2,
    "total_papers": 8,
    "total_score": 5.739820309999999,
    "venue_count": 6,
    "avg_score": 0.7174775387499999
  },
  {
    "id": "C526921623",
    "name": "Automotive industry",
    "level": 2,
    "total_papers": 8,
    "total_score": 4.59193613,
    "venue_count": 6,
    "avg_score": 0.57399201625
  },
  {
    "id": "C3018459673",
    "name": "Smartphone addiction",
    "level": 3,
    "total_papers": 8,
    "total_score": 4.58235417,
    "venue_count": 3,
    "avg_score": 0.57279427125
  },
  {
    "id": "C117220453",
    "name": "Correlation",
    "level": 2,
    "total_papers": 8,
    "total_score": 4.441958379999999,
    "venue_count": 6,
    "avg_score": 0.5552447974999999
  },
  {
    "id": "C165957694",
    "name": "Exploratory factor analysis",
    "level": 3,
    "total_papers": 8,
    "total_score": 4.87841458,
    "venue_count": 6,
    "avg_score": 0.6098018225
  },
  {
    "id": "C3018868096",
    "name": "Internal consistency",
    "level": 3,
    "total_papers": 8,
    "total_score": 1.350447,
    "venue_count": 6,
    "avg_score": 0.168805875
  },
  {
    "id": "C87355193",
    "name": "Astrobiology",
    "level": 1,
    "total_papers": 8,
    "total_score": 2.19708143,
    "venue_count": 5,
    "avg_score": 0.27463517875
  },
  {
    "id": "C2779337067",
    "name": "Articulation (sociology)",
    "level": 3,
    "total_papers": 8,
    "total_score": 5.13612992,
    "venue_count": 7,
    "avg_score": 0.64201624
  },
  {
    "id": "C2776505523",
    "name": "Plan (archaeology)",
    "level": 2,
    "total_papers": 8,
    "total_score": 4.40476891,
    "venue_count": 8,
    "avg_score": 0.55059611375
  },
  {
    "id": "C201943243",
    "name": "Social connectedness",
    "level": 2,
    "total_papers": 8,
    "total_score": 5.26624414,
    "venue_count": 7,
    "avg_score": 0.6582805175
  },
  {
    "id": "C2779363792",
    "name": "Coaching",
    "level": 2,
    "total_papers": 8,
    "total_score": 5.58317284,
    "venue_count": 8,
    "avg_score": 0.697896605
  },
  {
    "id": "C42219234",
    "name": "Anesthesia",
    "level": 1,
    "total_papers": 8,
    "total_score": 2.14007865,
    "venue_count": 6,
    "avg_score": 0.26750983125
  },
  {
    "id": "C51575053",
    "name": "Bureaucracy",
    "level": 3,
    "total_papers": 8,
    "total_score": 4.63725226,
    "venue_count": 4,
    "avg_score": 0.5796565325
  },
  {
    "id": "C93518851",
    "name": "Metadata",
    "level": 2,
    "total_papers": 8,
    "total_score": 5.16992529,
    "venue_count": 6,
    "avg_score": 0.64624066125
  },
  {
    "id": "C2988170871",
    "name": "Healthcare system",
    "level": 3,
    "total_papers": 8,
    "total_score": 3.68926015,
    "venue_count": 5,
    "avg_score": 0.46115751875
  },
  {
    "id": "C57035238",
    "name": "Team effectiveness",
    "level": 2,
    "total_papers": 8,
    "total_score": 4.31779035,
    "venue_count": 6,
    "avg_score": 0.53972379375
  },
  {
    "id": "C2781372952",
    "name": "Visual impairment",
    "level": 2,
    "total_papers": 8,
    "total_score": 4.06304867,
    "venue_count": 5,
    "avg_score": 0.50788108375
  },
  {
    "id": "C2164484",
    "name": "Core (optical fiber)",
    "level": 2,
    "total_papers": 8,
    "total_score": 4.45491107,
    "venue_count": 7,
    "avg_score": 0.55686388375
  },
  {
    "id": "C86772948",
    "name": "Social skills",
    "level": 2,
    "total_papers": 8,
    "total_score": 4.47750219,
    "venue_count": 5,
    "avg_score": 0.55968777375
  },
  {
    "id": "C106934330",
    "name": "Trait",
    "level": 2,
    "total_papers": 8,
    "total_score": 4.350214530000001,
    "venue_count": 7,
    "avg_score": 0.5437768162500001
  },
  {
    "id": "C87833898",
    "name": "Advanced driver assistance systems",
    "level": 2,
    "total_papers": 8,
    "total_score": 3.9955730000000003,
    "venue_count": 3,
    "avg_score": 0.49944662500000003
  },
  {
    "id": "C94915269",
    "name": "Detector",
    "level": 2,
    "total_papers": 8,
    "total_score": 1.0692678039999999,
    "venue_count": 6,
    "avg_score": 0.13365847549999998
  },
  {
    "id": "C31395832",
    "name": "Testbed",
    "level": 2,
    "total_papers": 8,
    "total_score": 5.341881460000001,
    "venue_count": 4,
    "avg_score": 0.6677351825000001
  },
  {
    "id": "C86251818",
    "name": "Benchmarking",
    "level": 2,
    "total_papers": 8,
    "total_score": 5.34512057,
    "venue_count": 7,
    "avg_score": 0.66814007125
  },
  {
    "id": "C101738243",
    "name": "Autoencoder",
    "level": 3,
    "total_papers": 8,
    "total_score": 5.12130983,
    "venue_count": 5,
    "avg_score": 0.64016372875
  },
  {
    "id": "C79544238",
    "name": "Activities of daily living",
    "level": 2,
    "total_papers": 8,
    "total_score": 3.7640730000000002,
    "venue_count": 7,
    "avg_score": 0.47050912500000003
  },
  {
    "id": "C2776257435",
    "name": "Bandwidth (computing)",
    "level": 2,
    "total_papers": 8,
    "total_score": 1.50023221,
    "venue_count": 5,
    "avg_score": 0.18752902625
  },
  {
    "id": "C2779812673",
    "name": "Sadness",
    "level": 3,
    "total_papers": 8,
    "total_score": 5.52831581,
    "venue_count": 7,
    "avg_score": 0.69103947625
  },
  {
    "id": "C91306197",
    "name": "Competition (biology)",
    "level": 2,
    "total_papers": 8,
    "total_score": 4.50231944,
    "venue_count": 5,
    "avg_score": 0.56278993
  },
  {
    "id": "C2778143727",
    "name": "Readability",
    "level": 2,
    "total_papers": 8,
    "total_score": 6.0028594900000005,
    "venue_count": 6,
    "avg_score": 0.7503574362500001
  },
  {
    "id": "C89785696",
    "name": "Theory of planned behavior",
    "level": 3,
    "total_papers": 8,
    "total_score": 5.35622086,
    "venue_count": 5,
    "avg_score": 0.6695276075
  },
  {
    "id": "C74672266",
    "name": "Language acquisition",
    "level": 2,
    "total_papers": 8,
    "total_score": 3.6662757800000003,
    "venue_count": 6,
    "avg_score": 0.45828447250000004
  },
  {
    "id": "C93996380",
    "name": "Server",
    "level": 2,
    "total_papers": 8,
    "total_score": 4.4137622400000005,
    "venue_count": 3,
    "avg_score": 0.5517202800000001
  },
  {
    "id": "C2777646416",
    "name": "Digital literacy",
    "level": 2,
    "total_papers": 8,
    "total_score": 4.3252665299999995,
    "venue_count": 8,
    "avg_score": 0.5406583162499999
  },
  {
    "id": "C140781008",
    "name": "Service quality",
    "level": 3,
    "total_papers": 8,
    "total_score": 4.092147089999999,
    "venue_count": 4,
    "avg_score": 0.5115183862499999
  },
  {
    "id": "C87105883",
    "name": "Cognitive walkthrough",
    "level": 4,
    "total_papers": 8,
    "total_score": 4.6622290500000005,
    "venue_count": 6,
    "avg_score": 0.5827786312500001
  },
  {
    "id": "C11324603",
    "name": "Usability lab",
    "level": 4,
    "total_papers": 8,
    "total_score": 3.9018775599999995,
    "venue_count": 6,
    "avg_score": 0.48773469499999994
  },
  {
    "id": "C41376638",
    "name": "Flight simulator",
    "level": 2,
    "total_papers": 8,
    "total_score": 4.22729089,
    "venue_count": 6,
    "avg_score": 0.52841136125
  },
  {
    "id": "C2781311116",
    "name": "Group (periodic table)",
    "level": 2,
    "total_papers": 8,
    "total_score": 4.10568662,
    "venue_count": 4,
    "avg_score": 0.5132108275
  },
  {
    "id": "C46686674",
    "name": "Boosting (machine learning)",
    "level": 2,
    "total_papers": 8,
    "total_score": 4.91227431,
    "venue_count": 4,
    "avg_score": 0.61403428875
  },
  {
    "id": "C52001869",
    "name": "Naive Bayes classifier",
    "level": 3,
    "total_papers": 8,
    "total_score": 4.25462587,
    "venue_count": 7,
    "avg_score": 0.53182823375
  },
  {
    "id": "C48372109",
    "name": "Binary number",
    "level": 2,
    "total_papers": 8,
    "total_score": 3.8791667199999997,
    "venue_count": 6,
    "avg_score": 0.48489583999999997
  },
  {
    "id": "C2988148770",
    "name": "Emotion detection",
    "level": 3,
    "total_papers": 8,
    "total_score": 4.21507705,
    "venue_count": 2,
    "avg_score": 0.52688463125
  },
  {
    "id": "C33954974",
    "name": "Sensor fusion",
    "level": 2,
    "total_papers": 8,
    "total_score": 3.91071859,
    "venue_count": 4,
    "avg_score": 0.48883982375
  },
  {
    "id": "C57879066",
    "name": "Mechanics",
    "level": 1,
    "total_papers": 8,
    "total_score": 1.3501995299999998,
    "venue_count": 5,
    "avg_score": 0.16877494124999998
  },
  {
    "id": "C44877443",
    "name": "Science education",
    "level": 2,
    "total_papers": 8,
    "total_score": 2.74926339,
    "venue_count": 5,
    "avg_score": 0.34365792375
  },
  {
    "id": "C53059260",
    "name": "Multilevel model",
    "level": 2,
    "total_papers": 8,
    "total_score": 4.09063639,
    "venue_count": 5,
    "avg_score": 0.51132954875
  },
  {
    "id": "C85345410",
    "name": "Business process",
    "level": 3,
    "total_papers": 8,
    "total_score": 2.49618435,
    "venue_count": 4,
    "avg_score": 0.31202304375
  },
  {
    "id": "C527648132",
    "name": "Information security",
    "level": 2,
    "total_papers": 8,
    "total_score": 3.72894983,
    "venue_count": 5,
    "avg_score": 0.46611872875
  },
  {
    "id": "C24326235",
    "name": "Electronic engineering",
    "level": 1,
    "total_papers": 8,
    "total_score": 0.557279404,
    "venue_count": 5,
    "avg_score": 0.0696599255
  },
  {
    "id": "C2779114481",
    "name": "Learning Management",
    "level": 2,
    "total_papers": 8,
    "total_score": 4.20444655,
    "venue_count": 4,
    "avg_score": 0.52555581875
  },
  {
    "id": "C100363876",
    "name": "Nonprobability sampling",
    "level": 3,
    "total_papers": 8,
    "total_score": 4.35824111,
    "venue_count": 5,
    "avg_score": 0.54478013875
  },
  {
    "id": "C6422946",
    "name": "Panel data",
    "level": 2,
    "total_papers": 8,
    "total_score": 4.319756959999999,
    "venue_count": 1,
    "avg_score": 0.5399696199999999
  },
  {
    "id": "C13736549",
    "name": "Industrial engineering",
    "level": 1,
    "total_papers": 8,
    "total_score": 2.59383018,
    "venue_count": 6,
    "avg_score": 0.3242287725
  },
  {
    "id": "C2776190703",
    "name": "Slicing",
    "level": 2,
    "total_papers": 8,
    "total_score": 5.696917870000001,
    "venue_count": 1,
    "avg_score": 0.7121147337500001
  },
  {
    "id": "C2780395675",
    "name": "Flank",
    "level": 2,
    "total_papers": 8,
    "total_score": 5.894798420000001,
    "venue_count": 1,
    "avg_score": 0.7368498025000001
  },
  {
    "id": "C175457265",
    "name": "Numerical control",
    "level": 3,
    "total_papers": 8,
    "total_score": 3.6696347099999995,
    "venue_count": 2,
    "avg_score": 0.45870433874999994
  },
  {
    "id": "C112313634",
    "name": "Complement (music)",
    "level": 5,
    "total_papers": 7,
    "total_score": 3.6757955600000005,
    "venue_count": 4,
    "avg_score": 0.5251136514285715
  },
  {
    "id": "C127716648",
    "name": "Phenotype",
    "level": 3,
    "total_papers": 7,
    "total_score": 0,
    "venue_count": 4,
    "avg_score": 0
  },
  {
    "id": "C188082640",
    "name": "Complementation",
    "level": 4,
    "total_papers": 7,
    "total_score": 0,
    "venue_count": 4,
    "avg_score": 0
  },
  {
    "id": "C136525101",
    "name": "Fabrication",
    "level": 3,
    "total_papers": 7,
    "total_score": 4.17365388,
    "venue_count": 3,
    "avg_score": 0.5962362685714285
  },
  {
    "id": "C109297577",
    "name": "Password",
    "level": 2,
    "total_papers": 7,
    "total_score": 4.40441902,
    "venue_count": 6,
    "avg_score": 0.6292027171428571
  },
  {
    "id": "C141633740",
    "name": "Sense of agency",
    "level": 2,
    "total_papers": 7,
    "total_score": 4.25881219,
    "venue_count": 5,
    "avg_score": 0.6084017414285715
  },
  {
    "id": "C49545453",
    "name": "Urban planning",
    "level": 2,
    "total_papers": 7,
    "total_score": 2.23741718,
    "venue_count": 6,
    "avg_score": 0.3196310257142857
  },
  {
    "id": "C8858961",
    "name": "Nudge theory",
    "level": 2,
    "total_papers": 7,
    "total_score": 5.292833980000001,
    "venue_count": 6,
    "avg_score": 0.7561191400000001
  },
  {
    "id": "C2778334786",
    "name": "Variation (astronomy)",
    "level": 2,
    "total_papers": 7,
    "total_score": 3.43904743,
    "venue_count": 7,
    "avg_score": 0.49129249
  },
  {
    "id": "C139838865",
    "name": "Racism",
    "level": 2,
    "total_papers": 7,
    "total_score": 4.761518530000001,
    "venue_count": 6,
    "avg_score": 0.680216932857143
  },
  {
    "id": "C2778029271",
    "name": "Extension (predicate logic)",
    "level": 2,
    "total_papers": 7,
    "total_score": 4.21339998,
    "venue_count": 6,
    "avg_score": 0.6019142828571429
  },
  {
    "id": "C184670325",
    "name": "Loop (graph theory)",
    "level": 2,
    "total_papers": 7,
    "total_score": 3.62029032,
    "venue_count": 5,
    "avg_score": 0.5171843314285715
  },
  {
    "id": "C78821406",
    "name": "Think aloud protocol",
    "level": 3,
    "total_papers": 7,
    "total_score": 3.7539381799999996,
    "venue_count": 6,
    "avg_score": 0.5362768828571428
  },
  {
    "id": "C158071213",
    "name": "Ideology",
    "level": 3,
    "total_papers": 7,
    "total_score": 4.20045069,
    "venue_count": 7,
    "avg_score": 0.6000643842857143
  },
  {
    "id": "C206588197",
    "name": "Reuse",
    "level": 2,
    "total_papers": 7,
    "total_score": 4.56617309,
    "venue_count": 5,
    "avg_score": 0.6523104414285715
  },
  {
    "id": "C101780184",
    "name": "Dissemination",
    "level": 2,
    "total_papers": 7,
    "total_score": 4.06658397,
    "venue_count": 5,
    "avg_score": 0.5809405671428571
  },
  {
    "id": "C539828613",
    "name": "Public transport",
    "level": 2,
    "total_papers": 7,
    "total_score": 3.28339882,
    "venue_count": 4,
    "avg_score": 0.4690569742857143
  },
  {
    "id": "C148383697",
    "name": "Regional science",
    "level": 1,
    "total_papers": 7,
    "total_score": 2.12021774,
    "venue_count": 5,
    "avg_score": 0.3028882485714286
  },
  {
    "id": "C33566652",
    "name": "Theme (computing)",
    "level": 2,
    "total_papers": 7,
    "total_score": 3.9225682600000003,
    "venue_count": 6,
    "avg_score": 0.5603668942857143
  },
  {
    "id": "C112758219",
    "name": "Duration (music)",
    "level": 2,
    "total_papers": 7,
    "total_score": 3.8491106599999996,
    "venue_count": 5,
    "avg_score": 0.5498729514285714
  },
  {
    "id": "C2778648169",
    "name": "Compatibility (geochemistry)",
    "level": 2,
    "total_papers": 7,
    "total_score": 0.9882000599999999,
    "venue_count": 6,
    "avg_score": 0.14117143714285713
  },
  {
    "id": "C150303390",
    "name": "Virtual actor",
    "level": 3,
    "total_papers": 7,
    "total_score": 3.7748413700000003,
    "venue_count": 5,
    "avg_score": 0.5392630528571429
  },
  {
    "id": "C2781460075",
    "name": "Compliance (psychology)",
    "level": 2,
    "total_papers": 7,
    "total_score": 4.0725951,
    "venue_count": 4,
    "avg_score": 0.5817993
  },
  {
    "id": "C2781054738",
    "name": "Athletes",
    "level": 2,
    "total_papers": 7,
    "total_score": 4.20046945,
    "venue_count": 5,
    "avg_score": 0.6000670642857143
  },
  {
    "id": "C2778321746",
    "name": "Distrust",
    "level": 2,
    "total_papers": 7,
    "total_score": 5.94927732,
    "venue_count": 6,
    "avg_score": 0.84989676
  },
  {
    "id": "C2781195155",
    "name": "Prefrontal cortex",
    "level": 3,
    "total_papers": 7,
    "total_score": 2.45055058,
    "venue_count": 5,
    "avg_score": 0.3500786542857143
  },
  {
    "id": "C172141706",
    "name": "Conscientiousness",
    "level": 5,
    "total_papers": 7,
    "total_score": 5.14606618,
    "venue_count": 7,
    "avg_score": 0.7351523114285714
  },
  {
    "id": "C207685749",
    "name": "Domain knowledge",
    "level": 2,
    "total_papers": 7,
    "total_score": 3.14986583,
    "venue_count": 7,
    "avg_score": 0.44998083285714285
  },
  {
    "id": "C2776857766",
    "name": "Training system",
    "level": 2,
    "total_papers": 7,
    "total_score": 3.34027904,
    "venue_count": 5,
    "avg_score": 0.47718272
  },
  {
    "id": "C2781354396",
    "name": "Enthusiasm",
    "level": 2,
    "total_papers": 7,
    "total_score": 2.53116348,
    "venue_count": 6,
    "avg_score": 0.36159478285714286
  },
  {
    "id": "C3017893058",
    "name": "User satisfaction",
    "level": 2,
    "total_papers": 7,
    "total_score": 3.39228549,
    "venue_count": 4,
    "avg_score": 0.48461221285714284
  },
  {
    "id": "C2779602242",
    "name": "Cognitive training",
    "level": 3,
    "total_papers": 7,
    "total_score": 3.8967517899999997,
    "venue_count": 4,
    "avg_score": 0.5566788271428571
  },
  {
    "id": "C21442007",
    "name": "Graphics",
    "level": 2,
    "total_papers": 7,
    "total_score": 3.17731007,
    "venue_count": 7,
    "avg_score": 0.45390143857142856
  },
  {
    "id": "C84114770",
    "name": "Quantum",
    "level": 2,
    "total_papers": 7,
    "total_score": 0.96008519,
    "venue_count": 6,
    "avg_score": 0.13715502714285716
  },
  {
    "id": "C2777413886",
    "name": "Fluency",
    "level": 2,
    "total_papers": 7,
    "total_score": 5.200801490000001,
    "venue_count": 6,
    "avg_score": 0.7429716414285715
  },
  {
    "id": "C193934123",
    "name": "Privacy by Design",
    "level": 3,
    "total_papers": 7,
    "total_score": 3.5736382399999997,
    "venue_count": 5,
    "avg_score": 0.5105197485714286
  },
  {
    "id": "C2781050511",
    "name": "Telehealth",
    "level": 4,
    "total_papers": 7,
    "total_score": 4.33211499,
    "venue_count": 6,
    "avg_score": 0.61887357
  },
  {
    "id": "C75949130",
    "name": "Database transaction",
    "level": 2,
    "total_papers": 7,
    "total_score": 2.75632306,
    "venue_count": 5,
    "avg_score": 0.3937604371428572
  },
  {
    "id": "C185874996",
    "name": "Interdependence",
    "level": 2,
    "total_papers": 7,
    "total_score": 4.702337849999999,
    "venue_count": 6,
    "avg_score": 0.6717625499999998
  },
  {
    "id": "C178005623",
    "name": "Anonymity",
    "level": 2,
    "total_papers": 7,
    "total_score": 3.9557317700000003,
    "venue_count": 6,
    "avg_score": 0.5651045385714286
  },
  {
    "id": "C128654540",
    "name": "Team composition",
    "level": 2,
    "total_papers": 7,
    "total_score": 4.06150232,
    "venue_count": 7,
    "avg_score": 0.5802146171428572
  },
  {
    "id": "C191897082",
    "name": "Metallurgy",
    "level": 1,
    "total_papers": 7,
    "total_score": 0.5572101199999999,
    "venue_count": 4,
    "avg_score": 0.0796014457142857
  },
  {
    "id": "C2780821482",
    "name": "Crowdsensing",
    "level": 2,
    "total_papers": 7,
    "total_score": 4.76823632,
    "venue_count": 3,
    "avg_score": 0.6811766171428572
  },
  {
    "id": "C2779231336",
    "name": "Sketch",
    "level": 2,
    "total_papers": 7,
    "total_score": 4.94385492,
    "venue_count": 4,
    "avg_score": 0.7062649885714285
  },
  {
    "id": "C101468663",
    "name": "Modular design",
    "level": 2,
    "total_papers": 7,
    "total_score": 4.18583221,
    "venue_count": 7,
    "avg_score": 0.59797603
  },
  {
    "id": "C2776175482",
    "name": "Transfer (computing)",
    "level": 2,
    "total_papers": 7,
    "total_score": 3.1690099800000002,
    "venue_count": 5,
    "avg_score": 0.4527157114285715
  },
  {
    "id": "C2780008327",
    "name": "Laptop",
    "level": 2,
    "total_papers": 7,
    "total_score": 4.38315083,
    "venue_count": 5,
    "avg_score": 0.6261644042857143
  },
  {
    "id": "C96250715",
    "name": "Estimation",
    "level": 2,
    "total_papers": 7,
    "total_score": 3.4135314600000006,
    "venue_count": 4,
    "avg_score": 0.4876473514285715
  },
  {
    "id": "C554190296",
    "name": "Radar",
    "level": 2,
    "total_papers": 7,
    "total_score": 1.6946960199999999,
    "venue_count": 4,
    "avg_score": 0.2420994314285714
  },
  {
    "id": "C45347329",
    "name": "Convolution (computer science)",
    "level": 3,
    "total_papers": 7,
    "total_score": 3.50856623,
    "venue_count": 3,
    "avg_score": 0.5012237471428571
  },
  {
    "id": "C45357846",
    "name": "Notation",
    "level": 2,
    "total_papers": 7,
    "total_score": 4.06923967,
    "venue_count": 3,
    "avg_score": 0.5813199528571429
  },
  {
    "id": "C106301342",
    "name": "Entropy (arrow of time)",
    "level": 2,
    "total_papers": 7,
    "total_score": 3.60721498,
    "venue_count": 4,
    "avg_score": 0.5153164257142857
  },
  {
    "id": "C34736171",
    "name": "Preprocessor",
    "level": 2,
    "total_papers": 7,
    "total_score": 4.06182746,
    "venue_count": 5,
    "avg_score": 0.5802610657142857
  },
  {
    "id": "C70437156",
    "name": "Pooling",
    "level": 2,
    "total_papers": 7,
    "total_score": 4.7177346600000005,
    "venue_count": 2,
    "avg_score": 0.6739620942857144
  },
  {
    "id": "C158622935",
    "name": "Nonlinear system",
    "level": 2,
    "total_papers": 7,
    "total_score": 1.9931717999999998,
    "venue_count": 4,
    "avg_score": 0.28473882857142857
  },
  {
    "id": "C155512373",
    "name": "Residual",
    "level": 2,
    "total_papers": 7,
    "total_score": 4.211747610000001,
    "venue_count": 4,
    "avg_score": 0.6016782300000001
  },
  {
    "id": "C2718322",
    "name": "Job satisfaction",
    "level": 2,
    "total_papers": 7,
    "total_score": 2.84829335,
    "venue_count": 5,
    "avg_score": 0.40689905
  },
  {
    "id": "C74448152",
    "name": "Aviation",
    "level": 2,
    "total_papers": 7,
    "total_score": 3.39292561,
    "venue_count": 4,
    "avg_score": 0.48470365857142855
  },
  {
    "id": "C42407357",
    "name": "Physiology",
    "level": 1,
    "total_papers": 7,
    "total_score": 0.5387886399999999,
    "venue_count": 6,
    "avg_score": 0.0769698057142857
  },
  {
    "id": "C2780861071",
    "name": "Character (mathematics)",
    "level": 2,
    "total_papers": 7,
    "total_score": 4.784876779999999,
    "venue_count": 6,
    "avg_score": 0.6835538257142856
  },
  {
    "id": "C67953723",
    "name": "Workstation",
    "level": 2,
    "total_papers": 7,
    "total_score": 5.063305,
    "venue_count": 4,
    "avg_score": 0.7233292857142857
  },
  {
    "id": "C152478114",
    "name": "Neurophysiology",
    "level": 2,
    "total_papers": 7,
    "total_score": 4.04453017,
    "venue_count": 4,
    "avg_score": 0.5777900242857142
  },
  {
    "id": "C2777394604",
    "name": "Pupil",
    "level": 2,
    "total_papers": 7,
    "total_score": 3.21724716,
    "venue_count": 5,
    "avg_score": 0.4596067371428571
  },
  {
    "id": "C3019806175",
    "name": "Health professionals",
    "level": 3,
    "total_papers": 7,
    "total_score": 3.63136422,
    "venue_count": 5,
    "avg_score": 0.5187663171428571
  },
  {
    "id": "C4438859",
    "name": "Timeline",
    "level": 2,
    "total_papers": 7,
    "total_score": 4.9391289800000004,
    "venue_count": 5,
    "avg_score": 0.7055898542857143
  },
  {
    "id": "C2776967331",
    "name": "Loyalty",
    "level": 2,
    "total_papers": 7,
    "total_score": 3.93430952,
    "venue_count": 4,
    "avg_score": 0.5620442171428571
  },
  {
    "id": "C94612546",
    "name": "Neuroticism",
    "level": 3,
    "total_papers": 7,
    "total_score": 4.30664763,
    "venue_count": 6,
    "avg_score": 0.6152353757142857
  },
  {
    "id": "C2776029896",
    "name": "Relaxation (psychology)",
    "level": 2,
    "total_papers": 7,
    "total_score": 3.95810445,
    "venue_count": 3,
    "avg_score": 0.5654434928571429
  },
  {
    "id": "C2780297707",
    "name": "Landmark",
    "level": 2,
    "total_papers": 7,
    "total_score": 4.84388566,
    "venue_count": 4,
    "avg_score": 0.6919836657142857
  },
  {
    "id": "C186720457",
    "name": "Consciousness",
    "level": 2,
    "total_papers": 7,
    "total_score": 4.5096847,
    "venue_count": 3,
    "avg_score": 0.6442406714285714
  },
  {
    "id": "C2781121862",
    "name": "Turkish",
    "level": 2,
    "total_papers": 7,
    "total_score": 3.9685046900000005,
    "venue_count": 5,
    "avg_score": 0.5669292414285715
  },
  {
    "id": "C2776620684",
    "name": "Source credibility",
    "level": 3,
    "total_papers": 7,
    "total_score": 3.62845208,
    "venue_count": 5,
    "avg_score": 0.5183502971428572
  },
  {
    "id": "C2776289891",
    "name": "Neglect",
    "level": 2,
    "total_papers": 7,
    "total_score": 4.003054329999999,
    "venue_count": 6,
    "avg_score": 0.5718649042857142
  },
  {
    "id": "C41022531",
    "name": "Communication design",
    "level": 2,
    "total_papers": 7,
    "total_score": 3.14299244,
    "venue_count": 5,
    "avg_score": 0.44899892
  },
  {
    "id": "C138673069",
    "name": "Tracing",
    "level": 2,
    "total_papers": 7,
    "total_score": 3.83936762,
    "venue_count": 5,
    "avg_score": 0.5484810885714285
  },
  {
    "id": "C53371666",
    "name": "Need for cognition",
    "level": 3,
    "total_papers": 7,
    "total_score": 3.5684256999999997,
    "venue_count": 4,
    "avg_score": 0.5097750999999999
  },
  {
    "id": "C98214594",
    "name": "Conformal map",
    "level": 2,
    "total_papers": 7,
    "total_score": 3.95515018,
    "venue_count": 4,
    "avg_score": 0.5650214542857143
  },
  {
    "id": "C194519906",
    "name": "Student engagement",
    "level": 2,
    "total_papers": 7,
    "total_score": 3.9350422800000002,
    "venue_count": 6,
    "avg_score": 0.5621488971428572
  },
  {
    "id": "C174107131",
    "name": "Emotional intelligence",
    "level": 2,
    "total_papers": 7,
    "total_score": 3.8916431800000004,
    "venue_count": 5,
    "avg_score": 0.5559490257142857
  },
  {
    "id": "C140779682",
    "name": "Sampling (signal processing)",
    "level": 3,
    "total_papers": 7,
    "total_score": 3.5618732499999997,
    "venue_count": 5,
    "avg_score": 0.5088390357142857
  },
  {
    "id": "C147168706",
    "name": "Recurrent neural network",
    "level": 3,
    "total_papers": 7,
    "total_score": 3.65832778,
    "venue_count": 4,
    "avg_score": 0.5226182542857143
  },
  {
    "id": "C71635504",
    "name": "Heart rate variability",
    "level": 4,
    "total_papers": 7,
    "total_score": 4.15530047,
    "venue_count": 3,
    "avg_score": 0.5936143528571429
  },
  {
    "id": "C2781350754",
    "name": "Virtual training",
    "level": 3,
    "total_papers": 7,
    "total_score": 3.3818502099999996,
    "venue_count": 3,
    "avg_score": 0.4831214585714285
  },
  {
    "id": "C24614281",
    "name": "Moderated mediation",
    "level": 2,
    "total_papers": 7,
    "total_score": 4.522663850000001,
    "venue_count": 3,
    "avg_score": 0.6460948357142858
  },
  {
    "id": "C2778399959",
    "name": "Technostress",
    "level": 2,
    "total_papers": 7,
    "total_score": 6.25766575,
    "venue_count": 2,
    "avg_score": 0.89395225
  },
  {
    "id": "C3020250448",
    "name": "Smartphone application",
    "level": 2,
    "total_papers": 7,
    "total_score": 3.4145011899999997,
    "venue_count": 5,
    "avg_score": 0.48778588428571423
  },
  {
    "id": "C157764524",
    "name": "Throughput",
    "level": 3,
    "total_papers": 7,
    "total_score": 3.5070793,
    "venue_count": 2,
    "avg_score": 0.5010113285714286
  },
  {
    "id": "C121704057",
    "name": "Collision",
    "level": 2,
    "total_papers": 7,
    "total_score": 3.5545536,
    "venue_count": 4,
    "avg_score": 0.5077933714285715
  },
  {
    "id": "C151956035",
    "name": "Logistic regression",
    "level": 2,
    "total_papers": 7,
    "total_score": 3.1992123699999997,
    "venue_count": 6,
    "avg_score": 0.45703033857142855
  },
  {
    "id": "C167908162",
    "name": "Business ecosystem",
    "level": 2,
    "total_papers": 7,
    "total_score": 3.99690928,
    "venue_count": 1,
    "avg_score": 0.57098704
  },
  {
    "id": "C3307092",
    "name": "Service innovation",
    "level": 3,
    "total_papers": 7,
    "total_score": 3.60422586,
    "venue_count": 2,
    "avg_score": 0.5148894085714286
  },
  {
    "id": "C2777448596",
    "name": "Circular economy",
    "level": 2,
    "total_papers": 7,
    "total_score": 4.96755474,
    "venue_count": 3,
    "avg_score": 0.7096506771428571
  },
  {
    "id": "C2780966255",
    "name": "Foundation (evidence)",
    "level": 2,
    "total_papers": 7,
    "total_score": 3.4476630999999998,
    "venue_count": 4,
    "avg_score": 0.49252329999999994
  },
  {
    "id": "C2777325788",
    "name": "Shoulders",
    "level": 2,
    "total_papers": 7,
    "total_score": 4.9419222099999995,
    "venue_count": 3,
    "avg_score": 0.7059888871428571
  },
  {
    "id": "C2781204021",
    "name": "Lattice (music)",
    "level": 2,
    "total_papers": 7,
    "total_score": 4.185141850000001,
    "venue_count": 2,
    "avg_score": 0.5978774071428573
  },
  {
    "id": "C137711082",
    "name": "Deltoid curve",
    "level": 2,
    "total_papers": 7,
    "total_score": 4.29341291,
    "venue_count": 1,
    "avg_score": 0.6133447014285714
  },
  {
    "id": "C2781425419",
    "name": "Biceps",
    "level": 2,
    "total_papers": 7,
    "total_score": 4.2593013299999996,
    "venue_count": 2,
    "avg_score": 0.6084716185714285
  },
  {
    "id": "C105776082",
    "name": "Likert scale",
    "level": 2,
    "total_papers": 7,
    "total_score": 4.47885237,
    "venue_count": 3,
    "avg_score": 0.6398360528571428
  },
  {
    "id": "C2780001913",
    "name": "Intersectionality",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.45863516,
    "venue_count": 4,
    "avg_score": 0.5764391933333334
  },
  {
    "id": "C2982832299",
    "name": "Social justice",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.02682831,
    "venue_count": 3,
    "avg_score": 0.504471385
  },
  {
    "id": "C9496109",
    "name": "Experience design",
    "level": 3,
    "total_papers": 6,
    "total_score": 2.8458329,
    "venue_count": 5,
    "avg_score": 0.47430548333333333
  },
  {
    "id": "C2777256151",
    "name": "Unpacking",
    "level": 2,
    "total_papers": 6,
    "total_score": 4.55895094,
    "venue_count": 5,
    "avg_score": 0.7598251566666666
  },
  {
    "id": "C108650721",
    "name": "Counterfactual thinking",
    "level": 2,
    "total_papers": 6,
    "total_score": 4.5064850299999994,
    "venue_count": 5,
    "avg_score": 0.7510808383333333
  },
  {
    "id": "C188198153",
    "name": "Limiting",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.1297798199999995,
    "venue_count": 5,
    "avg_score": 0.5216299699999999
  },
  {
    "id": "C202269582",
    "name": "Complementarity (molecular biology)",
    "level": 2,
    "total_papers": 6,
    "total_score": 4.41443434,
    "venue_count": 5,
    "avg_score": 0.7357390566666666
  },
  {
    "id": "C139265228",
    "name": "Distress",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.25886532,
    "venue_count": 5,
    "avg_score": 0.54314422
  },
  {
    "id": "C141679102",
    "name": "Temporality",
    "level": 2,
    "total_papers": 6,
    "total_score": 4.42143627,
    "venue_count": 4,
    "avg_score": 0.736906045
  },
  {
    "id": "C50637493",
    "name": "Morphing",
    "level": 2,
    "total_papers": 6,
    "total_score": 4.48123866,
    "venue_count": 3,
    "avg_score": 0.74687311
  },
  {
    "id": "C2778584255",
    "name": "Queer",
    "level": 2,
    "total_papers": 6,
    "total_score": 4.64043594,
    "venue_count": 3,
    "avg_score": 0.77340599
  },
  {
    "id": "C125468537",
    "name": "Improvisation",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.60232439,
    "venue_count": 5,
    "avg_score": 0.6003873983333333
  },
  {
    "id": "C2780871342",
    "name": "Underpinning",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.63011419,
    "venue_count": 5,
    "avg_score": 0.6050190316666667
  },
  {
    "id": "C2780554381",
    "name": "Sensemaking",
    "level": 2,
    "total_papers": 6,
    "total_score": 5.02774821,
    "venue_count": 5,
    "avg_score": 0.8379580350000001
  },
  {
    "id": "C2982912361",
    "name": "Mental model",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.15048388,
    "venue_count": 4,
    "avg_score": 0.5250806466666667
  },
  {
    "id": "C205112559",
    "name": "Public engagement",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.02084265,
    "venue_count": 5,
    "avg_score": 0.503473775
  },
  {
    "id": "C2781188222",
    "name": "Grassroots",
    "level": 3,
    "total_papers": 6,
    "total_score": 4.893086469999999,
    "venue_count": 4,
    "avg_score": 0.8155144116666665
  },
  {
    "id": "C145236788",
    "name": "Labour economics",
    "level": 1,
    "total_papers": 6,
    "total_score": 2.53523992,
    "venue_count": 5,
    "avg_score": 0.42253998666666664
  },
  {
    "id": "C3116431",
    "name": "Public administration",
    "level": 1,
    "total_papers": 6,
    "total_score": 1.05622467,
    "venue_count": 6,
    "avg_score": 0.176037445
  },
  {
    "id": "C169903001",
    "name": "Reciprocity (cultural anthropology)",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.4867887800000004,
    "venue_count": 4,
    "avg_score": 0.5811314633333334
  },
  {
    "id": "C78597825",
    "name": "E-commerce",
    "level": 2,
    "total_papers": 6,
    "total_score": 2.7946722500000005,
    "venue_count": 4,
    "avg_score": 0.4657787083333334
  },
  {
    "id": "C2781162219",
    "name": "Replicate",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.9568790399999996,
    "venue_count": 5,
    "avg_score": 0.6594798399999999
  },
  {
    "id": "C519991488",
    "name": "Python (programming language)",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.2431002799999997,
    "venue_count": 5,
    "avg_score": 0.5405167133333333
  },
  {
    "id": "C124913957",
    "name": "Zoom",
    "level": 3,
    "total_papers": 6,
    "total_score": 3.16657715,
    "venue_count": 5,
    "avg_score": 0.5277628583333334
  },
  {
    "id": "C524769229",
    "name": "3D printing",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.4492059299999998,
    "venue_count": 3,
    "avg_score": 0.5748676549999999
  },
  {
    "id": "C521822307",
    "name": "Meditation",
    "level": 2,
    "total_papers": 6,
    "total_score": 4.294506800000001,
    "venue_count": 5,
    "avg_score": 0.7157511333333334
  },
  {
    "id": "C136501162",
    "name": "Arduino",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.5977536599999995,
    "venue_count": 2,
    "avg_score": 0.5996256099999999
  },
  {
    "id": "C2365568",
    "name": "Uncanny valley",
    "level": 3,
    "total_papers": 6,
    "total_score": 3.60438365,
    "venue_count": 4,
    "avg_score": 0.6007306083333334
  },
  {
    "id": "C2987082051",
    "name": "Human interaction",
    "level": 2,
    "total_papers": 6,
    "total_score": 2.92783683,
    "venue_count": 4,
    "avg_score": 0.487972805
  },
  {
    "id": "C2778736484",
    "name": "Friendship",
    "level": 2,
    "total_papers": 6,
    "total_score": 4.15626061,
    "venue_count": 3,
    "avg_score": 0.6927101016666667
  },
  {
    "id": "C3019887659",
    "name": "Older people",
    "level": 2,
    "total_papers": 6,
    "total_score": 2.51214352,
    "venue_count": 4,
    "avg_score": 0.41869058666666664
  },
  {
    "id": "C67439701",
    "name": "Head-up display",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.4052091300000003,
    "venue_count": 4,
    "avg_score": 0.567534855
  },
  {
    "id": "C33499554",
    "name": "Dashboard",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.61892924,
    "venue_count": 5,
    "avg_score": 0.6031548733333333
  },
  {
    "id": "C2781256819",
    "name": "Antecedent (behavioral psychology)",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.19831211,
    "venue_count": 5,
    "avg_score": 0.5330520183333333
  },
  {
    "id": "C202645933",
    "name": "eHealth",
    "level": 3,
    "total_papers": 6,
    "total_score": 5.01440908,
    "venue_count": 4,
    "avg_score": 0.8357348466666666
  },
  {
    "id": "C2780910867",
    "name": "Multimodality",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.60951468,
    "venue_count": 3,
    "avg_score": 0.6015857800000001
  },
  {
    "id": "C146047270",
    "name": "Human–machine system",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.35579763,
    "venue_count": 5,
    "avg_score": 0.559299605
  },
  {
    "id": "C2985021205",
    "name": "Virtual space",
    "level": 2,
    "total_papers": 6,
    "total_score": 2.93199543,
    "venue_count": 5,
    "avg_score": 0.488665905
  },
  {
    "id": "C133112747",
    "name": "Protocol analysis",
    "level": 2,
    "total_papers": 6,
    "total_score": 2.67047175,
    "venue_count": 5,
    "avg_score": 0.445078625
  },
  {
    "id": "C54808283",
    "name": "Motor imagery",
    "level": 4,
    "total_papers": 6,
    "total_score": 4.09783434,
    "venue_count": 3,
    "avg_score": 0.6829723900000001
  },
  {
    "id": "C169806903",
    "name": "Human error",
    "level": 2,
    "total_papers": 6,
    "total_score": 2.49870694,
    "venue_count": 4,
    "avg_score": 0.41645115666666666
  },
  {
    "id": "C2780342009",
    "name": "Perspective-taking",
    "level": 3,
    "total_papers": 6,
    "total_score": 2.94017774,
    "venue_count": 5,
    "avg_score": 0.4900296233333334
  },
  {
    "id": "C2778023277",
    "name": "Premise",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.99914563,
    "venue_count": 5,
    "avg_score": 0.6665242716666667
  },
  {
    "id": "C180152950",
    "name": "Software development process",
    "level": 4,
    "total_papers": 6,
    "total_score": 1.73088053,
    "venue_count": 5,
    "avg_score": 0.28848008833333333
  },
  {
    "id": "C62649853",
    "name": "Remote sensing",
    "level": 1,
    "total_papers": 6,
    "total_score": 1.00021424,
    "venue_count": 5,
    "avg_score": 0.16670237333333335
  },
  {
    "id": "C165838908",
    "name": "Calibration",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.64509852,
    "venue_count": 6,
    "avg_score": 0.60751642
  },
  {
    "id": "C24998067",
    "name": "Stimulation",
    "level": 2,
    "total_papers": 6,
    "total_score": 2.9281378899999995,
    "venue_count": 6,
    "avg_score": 0.4880229816666666
  },
  {
    "id": "C2777113389",
    "name": "Pleasure",
    "level": 2,
    "total_papers": 6,
    "total_score": 4.1932581,
    "venue_count": 5,
    "avg_score": 0.69887635
  },
  {
    "id": "C509729295",
    "name": "Privacy software",
    "level": 3,
    "total_papers": 6,
    "total_score": 2.90922737,
    "venue_count": 6,
    "avg_score": 0.48487122833333335
  },
  {
    "id": "C2775899829",
    "name": "Globe",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.5741982,
    "venue_count": 4,
    "avg_score": 0.5956997
  },
  {
    "id": "C173145845",
    "name": "Refugee",
    "level": 2,
    "total_papers": 6,
    "total_score": 4.7290339,
    "venue_count": 5,
    "avg_score": 0.7881723166666667
  },
  {
    "id": "C157085824",
    "name": "TRIPS architecture",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.4713438900000004,
    "venue_count": 4,
    "avg_score": 0.5785573150000001
  },
  {
    "id": "C139569457",
    "name": "Intermediary",
    "level": 2,
    "total_papers": 6,
    "total_score": 4.21626914,
    "venue_count": 3,
    "avg_score": 0.7027115233333333
  },
  {
    "id": "C205300905",
    "name": "Urban design",
    "level": 3,
    "total_papers": 6,
    "total_score": 3.4041794499999996,
    "venue_count": 5,
    "avg_score": 0.5673632416666666
  },
  {
    "id": "C175700187",
    "name": "Manufacturing",
    "level": 2,
    "total_papers": 6,
    "total_score": 2.72994506,
    "venue_count": 3,
    "avg_score": 0.45499084333333334
  },
  {
    "id": "C151719136",
    "name": "Publishing",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.31723178,
    "venue_count": 4,
    "avg_score": 0.5528719633333333
  },
  {
    "id": "C191795146",
    "name": "Norm (philosophy)",
    "level": 2,
    "total_papers": 6,
    "total_score": 2.7991048199999997,
    "venue_count": 6,
    "avg_score": 0.46651746999999993
  },
  {
    "id": "C2777530160",
    "name": "Sentence",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.29959165,
    "venue_count": 5,
    "avg_score": 0.5499319416666667
  },
  {
    "id": "C2778712445",
    "name": "Design knowledge",
    "level": 3,
    "total_papers": 6,
    "total_score": 3.1335006699999997,
    "venue_count": 4,
    "avg_score": 0.5222501116666666
  },
  {
    "id": "C177142836",
    "name": "Game theory",
    "level": 2,
    "total_papers": 6,
    "total_score": 2.3910103,
    "venue_count": 6,
    "avg_score": 0.39850171666666667
  },
  {
    "id": "C24756922",
    "name": "Data quality",
    "level": 3,
    "total_papers": 6,
    "total_score": 2.49742347,
    "venue_count": 4,
    "avg_score": 0.41623724500000003
  },
  {
    "id": "C31903555",
    "name": "Food science",
    "level": 1,
    "total_papers": 6,
    "total_score": 0.6142721800000001,
    "venue_count": 6,
    "avg_score": 0.10237869666666667
  },
  {
    "id": "C2984404570",
    "name": "Educational game",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.20647238,
    "venue_count": 5,
    "avg_score": 0.5344120633333334
  },
  {
    "id": "C6683253",
    "name": "Obstacle avoidance",
    "level": 4,
    "total_papers": 6,
    "total_score": 3.60695647,
    "venue_count": 4,
    "avg_score": 0.6011594116666666
  },
  {
    "id": "C112972136",
    "name": "Stability (learning theory)",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.3077164899999993,
    "venue_count": 4,
    "avg_score": 0.5512860816666666
  },
  {
    "id": "C2777382242",
    "name": "Index (typography)",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.58575555,
    "venue_count": 2,
    "avg_score": 0.597625925
  },
  {
    "id": "C523889960",
    "name": "Torso",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.49186231,
    "venue_count": 4,
    "avg_score": 0.5819770516666667
  },
  {
    "id": "C527821871",
    "name": "Access control",
    "level": 2,
    "total_papers": 6,
    "total_score": 2.70416482,
    "venue_count": 5,
    "avg_score": 0.45069413666666663
  },
  {
    "id": "C2781042323",
    "name": "Wheelchair",
    "level": 2,
    "total_papers": 6,
    "total_score": 4.2443731,
    "venue_count": 6,
    "avg_score": 0.7073955166666667
  },
  {
    "id": "C135641252",
    "name": "Multimodal interaction",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.48760766,
    "venue_count": 4,
    "avg_score": 0.5812679433333333
  },
  {
    "id": "C19012869",
    "name": "Response time",
    "level": 2,
    "total_papers": 6,
    "total_score": 2.96904923,
    "venue_count": 4,
    "avg_score": 0.49484153833333333
  },
  {
    "id": "C163294075",
    "name": "Noise reduction",
    "level": 2,
    "total_papers": 6,
    "total_score": 2.69885973,
    "venue_count": 3,
    "avg_score": 0.44980995500000004
  },
  {
    "id": "C182365436",
    "name": "Variable (mathematics)",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.26437183,
    "venue_count": 6,
    "avg_score": 0.5440619716666667
  },
  {
    "id": "C89805583",
    "name": "Accelerometer",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.3356354700000006,
    "venue_count": 3,
    "avg_score": 0.5559392450000001
  },
  {
    "id": "C136389625",
    "name": "Supervised learning",
    "level": 3,
    "total_papers": 6,
    "total_score": 2.78455164,
    "venue_count": 5,
    "avg_score": 0.46409194000000004
  },
  {
    "id": "C137800194",
    "name": "Interpolation (computer graphics)",
    "level": 3,
    "total_papers": 6,
    "total_score": 3.18989563,
    "venue_count": 3,
    "avg_score": 0.5316492716666666
  },
  {
    "id": "C739882",
    "name": "Anomaly detection",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.56447126,
    "venue_count": 3,
    "avg_score": 0.5940785433333333
  },
  {
    "id": "C2777371692",
    "name": "Spatial cognition",
    "level": 3,
    "total_papers": 6,
    "total_score": 3.3901888099999997,
    "venue_count": 3,
    "avg_score": 0.5650314683333333
  },
  {
    "id": "C30322324",
    "name": "Cockpit",
    "level": 2,
    "total_papers": 6,
    "total_score": 4.80343508,
    "venue_count": 5,
    "avg_score": 0.8005725133333333
  },
  {
    "id": "C2779864741",
    "name": "Auditory feedback",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.13038282,
    "venue_count": 5,
    "avg_score": 0.52173047
  },
  {
    "id": "C2779955035",
    "name": "Advice (programming)",
    "level": 2,
    "total_papers": 6,
    "total_score": 4.0458693100000005,
    "venue_count": 4,
    "avg_score": 0.6743115516666668
  },
  {
    "id": "C2723826",
    "name": "Game studies",
    "level": 2,
    "total_papers": 6,
    "total_score": 2.93224787,
    "venue_count": 2,
    "avg_score": 0.4887079783333333
  },
  {
    "id": "C198352243",
    "name": "Line (geometry)",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.1801094699999997,
    "venue_count": 5,
    "avg_score": 0.5300182449999999
  },
  {
    "id": "C2779344036",
    "name": "Digital content",
    "level": 2,
    "total_papers": 6,
    "total_score": 2.97807754,
    "venue_count": 5,
    "avg_score": 0.4963462566666667
  },
  {
    "id": "C171179263",
    "name": "Auditory display",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.8262040500000003,
    "venue_count": 3,
    "avg_score": 0.637700675
  },
  {
    "id": "C126388530",
    "name": "Imitation",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.71939041,
    "venue_count": 5,
    "avg_score": 0.6198984016666667
  },
  {
    "id": "C118487528",
    "name": "Ophthalmology",
    "level": 1,
    "total_papers": 6,
    "total_score": 0.513470164,
    "venue_count": 5,
    "avg_score": 0.08557836066666667
  },
  {
    "id": "C2986089797",
    "name": "Visual attention",
    "level": 3,
    "total_papers": 6,
    "total_score": 2.86215546,
    "venue_count": 5,
    "avg_score": 0.47702591
  },
  {
    "id": "C191511416",
    "name": "Customer satisfaction",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.4503883799999997,
    "venue_count": 3,
    "avg_score": 0.5750647299999999
  },
  {
    "id": "C65067816",
    "name": "Computer-assisted web interviewing",
    "level": 2,
    "total_papers": 6,
    "total_score": 2.62411191,
    "venue_count": 4,
    "avg_score": 0.437351985
  },
  {
    "id": "C3020513065",
    "name": "Online teaching",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.14115931,
    "venue_count": 4,
    "avg_score": 0.5235265516666666
  },
  {
    "id": "C22607594",
    "name": "Enabling",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.612261,
    "venue_count": 4,
    "avg_score": 0.6020435000000001
  },
  {
    "id": "C2778757428",
    "name": "Realm",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.00411925,
    "venue_count": 5,
    "avg_score": 0.5006865416666667
  },
  {
    "id": "C2776950860",
    "name": "Originality",
    "level": 3,
    "total_papers": 6,
    "total_score": 3.87033457,
    "venue_count": 4,
    "avg_score": 0.6450557616666667
  },
  {
    "id": "C132010649",
    "name": "Intuition",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.9402112899999997,
    "venue_count": 4,
    "avg_score": 0.6567018816666667
  },
  {
    "id": "C62993174",
    "name": "Usability goals",
    "level": 4,
    "total_papers": 6,
    "total_score": 3.0178017,
    "venue_count": 4,
    "avg_score": 0.50296695
  },
  {
    "id": "C200288055",
    "name": "Element (criminal law)",
    "level": 2,
    "total_papers": 6,
    "total_score": 2.82673526,
    "venue_count": 6,
    "avg_score": 0.4711225433333333
  },
  {
    "id": "C180916674",
    "name": "Diversification (marketing strategy)",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.6775617,
    "venue_count": 6,
    "avg_score": 0.61292695
  },
  {
    "id": "C2779119418",
    "name": "Serendipity",
    "level": 2,
    "total_papers": 6,
    "total_score": 4.97829162,
    "venue_count": 3,
    "avg_score": 0.82971527
  },
  {
    "id": "C180872759",
    "name": "Social group",
    "level": 2,
    "total_papers": 6,
    "total_score": 1.4772770800000001,
    "venue_count": 6,
    "avg_score": 0.24621284666666668
  },
  {
    "id": "C2776434776",
    "name": "Domain adaptation",
    "level": 3,
    "total_papers": 6,
    "total_score": 3.3590997600000003,
    "venue_count": 3,
    "avg_score": 0.5598499600000001
  },
  {
    "id": "C2778365744",
    "name": "Learning environment",
    "level": 2,
    "total_papers": 6,
    "total_score": 2.9068441199999997,
    "venue_count": 4,
    "avg_score": 0.48447401999999995
  },
  {
    "id": "C177713679",
    "name": "Intensive care medicine",
    "level": 1,
    "total_papers": 6,
    "total_score": 2.3572946299999997,
    "venue_count": 5,
    "avg_score": 0.3928824383333333
  },
  {
    "id": "C101433766",
    "name": "Maturity (psychological)",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.5655867399999996,
    "venue_count": 5,
    "avg_score": 0.5942644566666666
  },
  {
    "id": "C83546350",
    "name": "Regression",
    "level": 2,
    "total_papers": 6,
    "total_score": 2.8277401,
    "venue_count": 5,
    "avg_score": 0.4712900166666667
  },
  {
    "id": "C66905080",
    "name": "Binary classification",
    "level": 3,
    "total_papers": 6,
    "total_score": 2.82511796,
    "venue_count": 3,
    "avg_score": 0.47085299333333336
  },
  {
    "id": "C65059942",
    "name": "Argumentation theory",
    "level": 2,
    "total_papers": 6,
    "total_score": 4.46587316,
    "venue_count": 6,
    "avg_score": 0.7443121933333333
  },
  {
    "id": "C22019652",
    "name": "Overfitting",
    "level": 3,
    "total_papers": 6,
    "total_score": 4.32091738,
    "venue_count": 1,
    "avg_score": 0.7201528966666667
  },
  {
    "id": "C2775852435",
    "name": "Utterance",
    "level": 2,
    "total_papers": 6,
    "total_score": 4.05530591,
    "venue_count": 1,
    "avg_score": 0.6758843183333334
  },
  {
    "id": "C4641261",
    "name": "Face detection",
    "level": 4,
    "total_papers": 6,
    "total_score": 2.077559485,
    "venue_count": 4,
    "avg_score": 0.3462599141666667
  },
  {
    "id": "C142795923",
    "name": "Soundscape",
    "level": 3,
    "total_papers": 6,
    "total_score": 4.7712952,
    "venue_count": 4,
    "avg_score": 0.7952158666666667
  },
  {
    "id": "C2778139618",
    "name": "Workforce",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.6405841,
    "venue_count": 6,
    "avg_score": 0.6067640166666667
  },
  {
    "id": "C2983189541",
    "name": "Sleep quality",
    "level": 3,
    "total_papers": 6,
    "total_score": 2.6486430500000004,
    "venue_count": 5,
    "avg_score": 0.4414405083333334
  },
  {
    "id": "C45555294",
    "name": "Inequality",
    "level": 2,
    "total_papers": 6,
    "total_score": 4.1228023799999995,
    "venue_count": 4,
    "avg_score": 0.6871337299999999
  },
  {
    "id": "C15708023",
    "name": "Humanities",
    "level": 1,
    "total_papers": 6,
    "total_score": 1.260132953,
    "venue_count": 4,
    "avg_score": 0.21002215883333333
  },
  {
    "id": "C557945733",
    "name": "Data transmission",
    "level": 2,
    "total_papers": 6,
    "total_score": 2.6500649899999997,
    "venue_count": 2,
    "avg_score": 0.4416774983333333
  },
  {
    "id": "C499572226",
    "name": "Sound design",
    "level": 3,
    "total_papers": 6,
    "total_score": 3.4734506999999994,
    "venue_count": 3,
    "avg_score": 0.5789084499999999
  },
  {
    "id": "C44104985",
    "name": "Supply chain management",
    "level": 3,
    "total_papers": 6,
    "total_score": 3.19718644,
    "venue_count": 3,
    "avg_score": 0.5328644066666667
  },
  {
    "id": "C546215728",
    "name": "Bluetooth",
    "level": 3,
    "total_papers": 6,
    "total_score": 3.8042855599999994,
    "venue_count": 3,
    "avg_score": 0.6340475933333333
  },
  {
    "id": "C2781221063",
    "name": "Mutual authentication",
    "level": 3,
    "total_papers": 6,
    "total_score": 3.49750746,
    "venue_count": 2,
    "avg_score": 0.58291791
  },
  {
    "id": "C138187205",
    "name": "Tangent",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.62545403,
    "venue_count": 2,
    "avg_score": 0.6042423383333334
  },
  {
    "id": "C2776874296",
    "name": "Muscle fatigue",
    "level": 3,
    "total_papers": 6,
    "total_score": 3.15137516,
    "venue_count": 3,
    "avg_score": 0.5252291933333334
  },
  {
    "id": "C21963081",
    "name": "Working memory",
    "level": 3,
    "total_papers": 6,
    "total_score": 2.77109155,
    "venue_count": 3,
    "avg_score": 0.46184859166666664
  },
  {
    "id": "C119657128",
    "name": "Photography",
    "level": 2,
    "total_papers": 6,
    "total_score": 4.24538304,
    "venue_count": 3,
    "avg_score": 0.70756384
  },
  {
    "id": "C21200559",
    "name": "Sensitivity (control systems)",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.17156823,
    "venue_count": 3,
    "avg_score": 0.528594705
  },
  {
    "id": "C2776552730",
    "name": "Disinformation",
    "level": 3,
    "total_papers": 6,
    "total_score": 4.3937152,
    "venue_count": 5,
    "avg_score": 0.7322858666666666
  },
  {
    "id": "C147077947",
    "name": "Socioeconomic status",
    "level": 3,
    "total_papers": 6,
    "total_score": 2.96806544,
    "venue_count": 5,
    "avg_score": 0.49467757333333334
  },
  {
    "id": "C2780623907",
    "name": "Disadvantaged",
    "level": 2,
    "total_papers": 6,
    "total_score": 4.0846874,
    "venue_count": 6,
    "avg_score": 0.6807812333333333
  },
  {
    "id": "C51067260",
    "name": "Professional development",
    "level": 2,
    "total_papers": 6,
    "total_score": 2.8317811600000002,
    "venue_count": 2,
    "avg_score": 0.4719635266666667
  },
  {
    "id": "C26271046",
    "name": "Economic geography",
    "level": 1,
    "total_papers": 6,
    "total_score": 2.2877474400000004,
    "venue_count": 2,
    "avg_score": 0.3812912400000001
  },
  {
    "id": "C2986652750",
    "name": "Value creation",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.18454646,
    "venue_count": 2,
    "avg_score": 0.5307577433333334
  },
  {
    "id": "C542192845",
    "name": "Designtheory",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.02286739,
    "venue_count": 3,
    "avg_score": 0.5038112316666666
  },
  {
    "id": "C2988206411",
    "name": "Creative thinking",
    "level": 3,
    "total_papers": 6,
    "total_score": 2.63935853,
    "venue_count": 4,
    "avg_score": 0.43989308833333335
  },
  {
    "id": "C135981907",
    "name": "Triangulation",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.43395005,
    "venue_count": 4,
    "avg_score": 0.5723250083333333
  },
  {
    "id": "C1370556",
    "name": "Rhetoric",
    "level": 2,
    "total_papers": 6,
    "total_score": 4.34046477,
    "venue_count": 2,
    "avg_score": 0.7234107949999999
  },
  {
    "id": "C106487976",
    "name": "Matrix (chemical analysis)",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.07440115,
    "venue_count": 3,
    "avg_score": 0.5124001916666666
  },
  {
    "id": "C2780510313",
    "name": "Institution",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.19635252,
    "venue_count": 3,
    "avg_score": 0.53272542
  },
  {
    "id": "C119823426",
    "name": "Computer Aided Design",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.0119985299999996,
    "venue_count": 1,
    "avg_score": 0.5019997549999999
  },
  {
    "id": "C2781052500",
    "name": "Shell (structure)",
    "level": 2,
    "total_papers": 6,
    "total_score": 3.13363811,
    "venue_count": 1,
    "avg_score": 0.5222730183333334
  },
  {
    "id": "C50962388",
    "name": "Invisibility",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.3692097299999997,
    "venue_count": 3,
    "avg_score": 0.6738419459999999
  },
  {
    "id": "C2780821815",
    "name": "Portfolio",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.93664669,
    "venue_count": 3,
    "avg_score": 0.587329338
  },
  {
    "id": "C21564112",
    "name": "Authentication protocol",
    "level": 3,
    "total_papers": 5,
    "total_score": 2.1599695,
    "venue_count": 2,
    "avg_score": 0.4319939
  },
  {
    "id": "C127882523",
    "name": "Existentialism",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.94058144,
    "venue_count": 3,
    "avg_score": 0.788116288
  },
  {
    "id": "C28858896",
    "name": "Special education",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.29463173,
    "venue_count": 3,
    "avg_score": 0.458926346
  },
  {
    "id": "C50817715",
    "name": "Regret",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.11077764,
    "venue_count": 4,
    "avg_score": 0.622155528
  },
  {
    "id": "C2988504831",
    "name": "Text entry",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.92255083,
    "venue_count": 4,
    "avg_score": 0.584510166
  },
  {
    "id": "C38710091",
    "name": "Frustration",
    "level": 2,
    "total_papers": 5,
    "total_score": 4.18300004,
    "venue_count": 4,
    "avg_score": 0.8366000079999999
  },
  {
    "id": "C2780641677",
    "name": "Solidarity",
    "level": 3,
    "total_papers": 5,
    "total_score": 3.4468834399999997,
    "venue_count": 3,
    "avg_score": 0.689376688
  },
  {
    "id": "C519580073",
    "name": "Movie theater",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.50522561,
    "venue_count": 3,
    "avg_score": 0.5010451220000001
  },
  {
    "id": "C75291252",
    "name": "TRACE (psycholinguistics)",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.7352232699999997,
    "venue_count": 4,
    "avg_score": 0.5470446539999999
  },
  {
    "id": "C70836080",
    "name": "Impulse (physics)",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.75054388,
    "venue_count": 4,
    "avg_score": 0.550108776
  },
  {
    "id": "C190253527",
    "name": "Law and economics",
    "level": 1,
    "total_papers": 5,
    "total_score": 1.92740851,
    "venue_count": 5,
    "avg_score": 0.385481702
  },
  {
    "id": "C14262774",
    "name": "Behavior change",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.55862176,
    "venue_count": 5,
    "avg_score": 0.511724352
  },
  {
    "id": "C203014093",
    "name": "Immunology",
    "level": 1,
    "total_papers": 5,
    "total_score": 0.09710473,
    "venue_count": 4,
    "avg_score": 0.019420946
  },
  {
    "id": "C71008984",
    "name": "Rigour",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.2057747,
    "venue_count": 5,
    "avg_score": 0.6411549400000001
  },
  {
    "id": "C531593650",
    "name": "Colonialism",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.8876378700000003,
    "venue_count": 3,
    "avg_score": 0.5775275740000001
  },
  {
    "id": "C176856949",
    "name": "Offensive",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.4354525799999998,
    "venue_count": 4,
    "avg_score": 0.6870905159999999
  },
  {
    "id": "C80944243",
    "name": "Situated cognition",
    "level": 3,
    "total_papers": 5,
    "total_score": 2.4888797,
    "venue_count": 4,
    "avg_score": 0.49777594000000003
  },
  {
    "id": "C2779267917",
    "name": "Deception",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.9228542,
    "venue_count": 4,
    "avg_score": 0.78457084
  },
  {
    "id": "C2776215170",
    "name": "Emotive",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.6014002599999997,
    "venue_count": 5,
    "avg_score": 0.7202800519999999
  },
  {
    "id": "C2777615720",
    "name": "Prioritization",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.90074204,
    "venue_count": 5,
    "avg_score": 0.580148408
  },
  {
    "id": "C2780182762",
    "name": "Guideline",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.6944711,
    "venue_count": 4,
    "avg_score": 0.53889422
  },
  {
    "id": "C157657479",
    "name": "Closed captioning",
    "level": 3,
    "total_papers": 5,
    "total_score": 3.2006925400000004,
    "venue_count": 5,
    "avg_score": 0.640138508
  },
  {
    "id": "C7807463",
    "name": "Anthropocentrism",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.60122846,
    "venue_count": 5,
    "avg_score": 0.720245692
  },
  {
    "id": "C65499552",
    "name": "Experience sampling method",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.2119125100000003,
    "venue_count": 5,
    "avg_score": 0.642382502
  },
  {
    "id": "C23131810",
    "name": "Observational study",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.7525821600000002,
    "venue_count": 5,
    "avg_score": 0.550516432
  },
  {
    "id": "C176544851",
    "name": "Sociality",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.8957257999999997,
    "venue_count": 3,
    "avg_score": 0.5791451599999999
  },
  {
    "id": "C111902132",
    "name": "Skin conductance",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.75380904,
    "venue_count": 5,
    "avg_score": 0.5507618080000001
  },
  {
    "id": "C197640229",
    "name": "Predictability",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.68214633,
    "venue_count": 4,
    "avg_score": 0.5364292660000001
  },
  {
    "id": "C180706569",
    "name": "Cryptocurrency",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.74878622,
    "venue_count": 4,
    "avg_score": 0.749757244
  },
  {
    "id": "C143141573",
    "name": "Sense (electronics)",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.0578209700000003,
    "venue_count": 5,
    "avg_score": 0.6115641940000001
  },
  {
    "id": "C549605437",
    "name": "Food security",
    "level": 3,
    "total_papers": 5,
    "total_score": 2.1290169899999998,
    "venue_count": 5,
    "avg_score": 0.42580339799999994
  },
  {
    "id": "C60229501",
    "name": "Global Positioning System",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.23136036,
    "venue_count": 3,
    "avg_score": 0.446272072
  },
  {
    "id": "C48677424",
    "name": "Mode (computer interface)",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.89961476,
    "venue_count": 4,
    "avg_score": 0.579922952
  },
  {
    "id": "C522180918",
    "name": "Public speaking",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.19318322,
    "venue_count": 5,
    "avg_score": 0.638636644
  },
  {
    "id": "C2778310968",
    "name": "Exertion",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.68808004,
    "venue_count": 3,
    "avg_score": 0.537616008
  },
  {
    "id": "C159842133",
    "name": "Fitts's law",
    "level": 3,
    "total_papers": 5,
    "total_score": 3.0616319899999995,
    "venue_count": 5,
    "avg_score": 0.6123263979999999
  },
  {
    "id": "C197129107",
    "name": "Merge (version control)",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.32298144,
    "venue_count": 5,
    "avg_score": 0.664596288
  },
  {
    "id": "C2777882294",
    "name": "Textile design",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.5220737399999997,
    "venue_count": 3,
    "avg_score": 0.504414748
  },
  {
    "id": "C138921699",
    "name": "Political economy",
    "level": 1,
    "total_papers": 5,
    "total_score": 1.92938417,
    "venue_count": 3,
    "avg_score": 0.385876834
  },
  {
    "id": "C192769605",
    "name": "Vigilance (psychology)",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.62700491,
    "venue_count": 2,
    "avg_score": 0.725400982
  },
  {
    "id": "C157170001",
    "name": "Applications of artificial intelligence",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.36026029,
    "venue_count": 3,
    "avg_score": 0.47205205799999994
  },
  {
    "id": "C33435437",
    "name": "Curiosity",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.2750671000000002,
    "venue_count": 5,
    "avg_score": 0.6550134200000001
  },
  {
    "id": "C520049643",
    "name": "Voting",
    "level": 3,
    "total_papers": 5,
    "total_score": 2.61925397,
    "venue_count": 3,
    "avg_score": 0.523850794
  },
  {
    "id": "C148043351",
    "name": "Current (fluid)",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.9745326600000004,
    "venue_count": 5,
    "avg_score": 0.5949065320000001
  },
  {
    "id": "C2779951463",
    "name": "Quality of life (healthcare)",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.33617065,
    "venue_count": 5,
    "avg_score": 0.46723413
  },
  {
    "id": "C87345402",
    "name": "Analytic hierarchy process",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.71775708,
    "venue_count": 4,
    "avg_score": 0.7435514160000001
  },
  {
    "id": "C13662910",
    "name": "Trajectory",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.62067777,
    "venue_count": 5,
    "avg_score": 0.524135554
  },
  {
    "id": "C206836424",
    "name": "Social change",
    "level": 2,
    "total_papers": 5,
    "total_score": 1.4005217399999998,
    "venue_count": 5,
    "avg_score": 0.28010434799999995
  },
  {
    "id": "C130796691",
    "name": "Functional near-infrared spectroscopy",
    "level": 4,
    "total_papers": 5,
    "total_score": 2.6868583,
    "venue_count": 5,
    "avg_score": 0.53737166
  },
  {
    "id": "C58328972",
    "name": "Expert system",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.02000342,
    "venue_count": 5,
    "avg_score": 0.404000684
  },
  {
    "id": "C111370547",
    "name": "Sensory cue",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.4248613299999997,
    "venue_count": 4,
    "avg_score": 0.48497226599999993
  },
  {
    "id": "C152747807",
    "name": "Summative assessment",
    "level": 3,
    "total_papers": 5,
    "total_score": 2.90413812,
    "venue_count": 5,
    "avg_score": 0.580827624
  },
  {
    "id": "C2777589236",
    "name": "Boredom",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.7443685999999996,
    "venue_count": 4,
    "avg_score": 0.74887372
  },
  {
    "id": "C51970089",
    "name": "Virtual image",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.41407419,
    "venue_count": 5,
    "avg_score": 0.482814838
  },
  {
    "id": "C2776990265",
    "name": "Cursor (databases)",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.7838079299999996,
    "venue_count": 4,
    "avg_score": 0.5567615859999999
  },
  {
    "id": "C64848388",
    "name": "Futures studies",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.4883791200000003,
    "venue_count": 2,
    "avg_score": 0.49767582400000004
  },
  {
    "id": "C32605310",
    "name": "Virtuality (gaming)",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.92138153,
    "venue_count": 4,
    "avg_score": 0.584276306
  },
  {
    "id": "C2987238706",
    "name": "Stress reduction",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.6553127,
    "venue_count": 4,
    "avg_score": 0.53106254
  },
  {
    "id": "C120843803",
    "name": "Brain activity and meditation",
    "level": 3,
    "total_papers": 5,
    "total_score": 2.33521246,
    "venue_count": 4,
    "avg_score": 0.46704249200000003
  },
  {
    "id": "C512399662",
    "name": "Family medicine",
    "level": 1,
    "total_papers": 5,
    "total_score": 0.74552965,
    "venue_count": 4,
    "avg_score": 0.14910593
  },
  {
    "id": "C107690735",
    "name": "Motor learning",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.64326952,
    "venue_count": 5,
    "avg_score": 0.528653904
  },
  {
    "id": "C45235069",
    "name": "Table (database)",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.09120268,
    "venue_count": 5,
    "avg_score": 0.618240536
  },
  {
    "id": "C2781017355",
    "name": "Flourishing",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.89998804,
    "venue_count": 5,
    "avg_score": 0.7799976080000001
  },
  {
    "id": "C29202148",
    "name": "Resource allocation",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.34606748,
    "venue_count": 2,
    "avg_score": 0.46921349599999995
  },
  {
    "id": "C147494362",
    "name": "Troubleshooting",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.8793828100000005,
    "venue_count": 3,
    "avg_score": 0.7758765620000001
  },
  {
    "id": "C5274069",
    "name": "Categorical variable",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.41550276,
    "venue_count": 2,
    "avg_score": 0.683100552
  },
  {
    "id": "C2779390178",
    "name": "Cybercrime",
    "level": 3,
    "total_papers": 5,
    "total_score": 4.01405458,
    "venue_count": 4,
    "avg_score": 0.802810916
  },
  {
    "id": "C164226766",
    "name": "Rank (graph theory)",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.7596342700000003,
    "venue_count": 4,
    "avg_score": 0.5519268540000001
  },
  {
    "id": "C160949748",
    "name": "Mobile payment",
    "level": 3,
    "total_papers": 5,
    "total_score": 3.1266897900000004,
    "venue_count": 4,
    "avg_score": 0.625337958
  },
  {
    "id": "C139043278",
    "name": "Financial services",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.6273675699999997,
    "venue_count": 4,
    "avg_score": 0.525473514
  },
  {
    "id": "C52146309",
    "name": "Schema (genetic algorithms)",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.9666813700000003,
    "venue_count": 4,
    "avg_score": 0.5933362740000001
  },
  {
    "id": "C25032326",
    "name": "Socialization",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.1085176,
    "venue_count": 5,
    "avg_score": 0.62170352
  },
  {
    "id": "C2778496695",
    "name": "Dilemma",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.57802341,
    "venue_count": 5,
    "avg_score": 0.715604682
  },
  {
    "id": "C86844869",
    "name": "Hacker",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.09608784,
    "venue_count": 5,
    "avg_score": 0.619217568
  },
  {
    "id": "C201650216",
    "name": "Procurement",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.07597641,
    "venue_count": 4,
    "avg_score": 0.615195282
  },
  {
    "id": "C2779549840",
    "name": "Posthuman",
    "level": 2,
    "total_papers": 5,
    "total_score": 4.02712187,
    "venue_count": 2,
    "avg_score": 0.805424374
  },
  {
    "id": "C2776157432",
    "name": "Normality",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.68863843,
    "venue_count": 3,
    "avg_score": 0.537727686
  },
  {
    "id": "C49040817",
    "name": "Optoelectronics",
    "level": 1,
    "total_papers": 5,
    "total_score": 0.38520819,
    "venue_count": 4,
    "avg_score": 0.077041638
  },
  {
    "id": "C52102323",
    "name": "Pose",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.32955927,
    "venue_count": 3,
    "avg_score": 0.665911854
  },
  {
    "id": "C2780704645",
    "name": "Observer (physics)",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.59466537,
    "venue_count": 3,
    "avg_score": 0.518933074
  },
  {
    "id": "C69738355",
    "name": "Linear discriminant analysis",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.27482233,
    "venue_count": 3,
    "avg_score": 0.654964466
  },
  {
    "id": "C2776303644",
    "name": "Interfacing",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.1571377099999998,
    "venue_count": 4,
    "avg_score": 0.631427542
  },
  {
    "id": "C118615104",
    "name": "Discrete mathematics",
    "level": 1,
    "total_papers": 5,
    "total_score": 0.11071542,
    "venue_count": 4,
    "avg_score": 0.022143084
  },
  {
    "id": "C117896860",
    "name": "Acceleration",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.44904917,
    "venue_count": 3,
    "avg_score": 0.489809834
  },
  {
    "id": "C2780929884",
    "name": "Blindness",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.34838696,
    "venue_count": 4,
    "avg_score": 0.469677392
  },
  {
    "id": "C155202549",
    "name": "International trade",
    "level": 1,
    "total_papers": 5,
    "total_score": 0.6455196999999999,
    "venue_count": 3,
    "avg_score": 0.12910393999999997
  },
  {
    "id": "C79337645",
    "name": "Outlier",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.4223467999999997,
    "venue_count": 3,
    "avg_score": 0.6844693599999999
  },
  {
    "id": "C2778751112",
    "name": "Window (computing)",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.142993895,
    "venue_count": 4,
    "avg_score": 0.428598779
  },
  {
    "id": "C25908422",
    "name": "Personality psychology",
    "level": 3,
    "total_papers": 5,
    "total_score": 3.17992936,
    "venue_count": 4,
    "avg_score": 0.635985872
  },
  {
    "id": "C82990744",
    "name": "RGB color model",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.9011861700000003,
    "venue_count": 5,
    "avg_score": 0.580237234
  },
  {
    "id": "C152124472",
    "name": "Redundancy (engineering)",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.17993683,
    "venue_count": 4,
    "avg_score": 0.435987366
  },
  {
    "id": "C45391945",
    "name": "Powered exoskeleton",
    "level": 3,
    "total_papers": 5,
    "total_score": 2.91051988,
    "venue_count": 3,
    "avg_score": 0.582103976
  },
  {
    "id": "C59732488",
    "name": "Visual analytics",
    "level": 3,
    "total_papers": 5,
    "total_score": 2.40243949,
    "venue_count": 5,
    "avg_score": 0.48048789799999997
  },
  {
    "id": "C111335779",
    "name": "Reduction (mathematics)",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.6314933099999998,
    "venue_count": 5,
    "avg_score": 0.526298662
  },
  {
    "id": "C2780645631",
    "name": "Stroke (engine)",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.59710843,
    "venue_count": 4,
    "avg_score": 0.519421686
  },
  {
    "id": "C74193536",
    "name": "Kernel (algebra)",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.77350106,
    "venue_count": 4,
    "avg_score": 0.554700212
  },
  {
    "id": "C32022120",
    "name": "Interference (communication)",
    "level": 3,
    "total_papers": 5,
    "total_score": 2.6502876300000002,
    "venue_count": 3,
    "avg_score": 0.530057526
  },
  {
    "id": "C2780179797",
    "name": "Crew",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.9281058399999997,
    "venue_count": 3,
    "avg_score": 0.585621168
  },
  {
    "id": "C2776654903",
    "name": "SAFER",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.01830368,
    "venue_count": 5,
    "avg_score": 0.6036607359999999
  },
  {
    "id": "C8642999",
    "name": "Hyperparameter",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.7899692600000003,
    "venue_count": 4,
    "avg_score": 0.757993852
  },
  {
    "id": "C2780463512",
    "name": "Trainer",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.8175700000000004,
    "venue_count": 3,
    "avg_score": 0.5635140000000001
  },
  {
    "id": "C25740722",
    "name": "Disengagement theory",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.58346635,
    "venue_count": 2,
    "avg_score": 0.71669327
  },
  {
    "id": "C506058694",
    "name": "Dyslexia",
    "level": 3,
    "total_papers": 5,
    "total_score": 3.89436724,
    "venue_count": 4,
    "avg_score": 0.7788734479999999
  },
  {
    "id": "C2776372474",
    "name": "Simplicity",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.1571662600000003,
    "venue_count": 4,
    "avg_score": 0.6314332520000001
  },
  {
    "id": "C5563205",
    "name": "Card sorting",
    "level": 3,
    "total_papers": 5,
    "total_score": 3.7652681,
    "venue_count": 4,
    "avg_score": 0.75305362
  },
  {
    "id": "C111696304",
    "name": "Sorting",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.9910053699999994,
    "venue_count": 4,
    "avg_score": 0.5982010739999999
  },
  {
    "id": "C170760736",
    "name": "Agreeableness",
    "level": 5,
    "total_papers": 5,
    "total_score": 3.26065321,
    "venue_count": 4,
    "avg_score": 0.652130642
  },
  {
    "id": "C2776647852",
    "name": "Virtual team",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.09814468,
    "venue_count": 5,
    "avg_score": 0.619628936
  },
  {
    "id": "C104054115",
    "name": "Cohesion (chemistry)",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.06659393,
    "venue_count": 5,
    "avg_score": 0.613318786
  },
  {
    "id": "C169468491",
    "name": "Middleware (distributed applications)",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.28521,
    "venue_count": 3,
    "avg_score": 0.657042
  },
  {
    "id": "C137403100",
    "name": "Ethnic group",
    "level": 2,
    "total_papers": 5,
    "total_score": 1.8713077549999997,
    "venue_count": 5,
    "avg_score": 0.3742615509999999
  },
  {
    "id": "C37789001",
    "name": "Graphical user interface",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.78861496,
    "venue_count": 4,
    "avg_score": 0.557722992
  },
  {
    "id": "C544335954",
    "name": "Web intelligence",
    "level": 4,
    "total_papers": 5,
    "total_score": 0.72629186,
    "venue_count": 3,
    "avg_score": 0.145258372
  },
  {
    "id": "C203005215",
    "name": "Machine translation",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.7134045800000006,
    "venue_count": 2,
    "avg_score": 0.7426809160000001
  },
  {
    "id": "C2778535757",
    "name": "Screen reader",
    "level": 3,
    "total_papers": 5,
    "total_score": 2.5777067199999997,
    "venue_count": 2,
    "avg_score": 0.515541344
  },
  {
    "id": "C143587482",
    "name": "Iterative and incremental development",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.4069798700000002,
    "venue_count": 5,
    "avg_score": 0.48139597400000006
  },
  {
    "id": "C139997677",
    "name": "Semiotics",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.34063676,
    "venue_count": 2,
    "avg_score": 0.6681273520000001
  },
  {
    "id": "C2776548248",
    "name": "Judgement",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.9274790499999996,
    "venue_count": 5,
    "avg_score": 0.58549581
  },
  {
    "id": "C2777152325",
    "name": "Proposition",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.6213633,
    "venue_count": 4,
    "avg_score": 0.5242726600000001
  },
  {
    "id": "C2987325470",
    "name": "Social commerce",
    "level": 3,
    "total_papers": 5,
    "total_score": 2.9912577799999998,
    "venue_count": 2,
    "avg_score": 0.5982515559999999
  },
  {
    "id": "C106906290",
    "name": "Cronbach's alpha",
    "level": 3,
    "total_papers": 5,
    "total_score": 3.4439700500000003,
    "venue_count": 4,
    "avg_score": 0.6887940100000001
  },
  {
    "id": "C23456302",
    "name": "Usability inspection",
    "level": 4,
    "total_papers": 5,
    "total_score": 2.5924123999999997,
    "venue_count": 4,
    "avg_score": 0.51848248
  },
  {
    "id": "C184898388",
    "name": "Pairwise comparison",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.40996076,
    "venue_count": 2,
    "avg_score": 0.6819921520000001
  },
  {
    "id": "C2778371403",
    "name": "TUTOR",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.10239799,
    "venue_count": 4,
    "avg_score": 0.620479598
  },
  {
    "id": "C169976356",
    "name": "Motor skill",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.47483318,
    "venue_count": 4,
    "avg_score": 0.494966636
  },
  {
    "id": "C2780148112",
    "name": "Proxy (statistics)",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.817782,
    "venue_count": 5,
    "avg_score": 0.5635564
  },
  {
    "id": "C186625053",
    "name": "Information overload",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.54616039,
    "venue_count": 3,
    "avg_score": 0.709232078
  },
  {
    "id": "C44670240",
    "name": "Habit",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.15426978,
    "venue_count": 4,
    "avg_score": 0.6308539559999999
  },
  {
    "id": "C2779756789",
    "name": "Fake news",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.08405393,
    "venue_count": 5,
    "avg_score": 0.616810786
  },
  {
    "id": "C2776503756",
    "name": "Self-regulated learning",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.7120236,
    "venue_count": 3,
    "avg_score": 0.5424047200000001
  },
  {
    "id": "C160331591",
    "name": "Occupancy",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.3447125399999997,
    "venue_count": 4,
    "avg_score": 0.668942508
  },
  {
    "id": "C182310444",
    "name": "Boundary value problem",
    "level": 2,
    "total_papers": 5,
    "total_score": 1.3611242000000001,
    "venue_count": 2,
    "avg_score": 0.27222484
  },
  {
    "id": "C112680207",
    "name": "Regular polygon",
    "level": 2,
    "total_papers": 5,
    "total_score": 1.9793832500000001,
    "venue_count": 3,
    "avg_score": 0.39587665000000005
  },
  {
    "id": "C151406439",
    "name": "Time series",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.23975047,
    "venue_count": 3,
    "avg_score": 0.447950094
  },
  {
    "id": "C70518039",
    "name": "Dimensionality reduction",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.47320388,
    "venue_count": 5,
    "avg_score": 0.49464077599999995
  },
  {
    "id": "C2777938197",
    "name": "Transfer of training",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.23098884,
    "venue_count": 3,
    "avg_score": 0.44619776800000005
  },
  {
    "id": "C2910959060",
    "name": "Virtual Reality Exposure Therapy",
    "level": 3,
    "total_papers": 5,
    "total_score": 2.62190302,
    "venue_count": 2,
    "avg_score": 0.524380604
  },
  {
    "id": "C133925201",
    "name": "Life expectancy",
    "level": 3,
    "total_papers": 5,
    "total_score": 2.45779623,
    "venue_count": 4,
    "avg_score": 0.491559246
  },
  {
    "id": "C2777359053",
    "name": "Face-to-face",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.48396299,
    "venue_count": 4,
    "avg_score": 0.49679259800000003
  },
  {
    "id": "C2993527604",
    "name": "Perceived exertion",
    "level": 4,
    "total_papers": 5,
    "total_score": 2.44858499,
    "venue_count": 3,
    "avg_score": 0.489716998
  },
  {
    "id": "C162118730",
    "name": "Actuarial science",
    "level": 1,
    "total_papers": 5,
    "total_score": 1.201343245,
    "venue_count": 4,
    "avg_score": 0.24026864899999997
  },
  {
    "id": "C3020774429",
    "name": "Web of science",
    "level": 3,
    "total_papers": 5,
    "total_score": 2.39948417,
    "venue_count": 5,
    "avg_score": 0.479896834
  },
  {
    "id": "C98447023",
    "name": "Social identity theory",
    "level": 3,
    "total_papers": 5,
    "total_score": 2.26507682,
    "venue_count": 5,
    "avg_score": 0.453015364
  },
  {
    "id": "C55527203",
    "name": "Spillover effect",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.1970270299999997,
    "venue_count": 2,
    "avg_score": 0.639405406
  },
  {
    "id": "C526869908",
    "name": "Suicide prevention",
    "level": 3,
    "total_papers": 5,
    "total_score": 1.9042123,
    "venue_count": 4,
    "avg_score": 0.38084246
  },
  {
    "id": "C2985059025",
    "name": "Social worlds",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.97931283,
    "venue_count": 4,
    "avg_score": 0.595862566
  },
  {
    "id": "C101293273",
    "name": "User-generated content",
    "level": 3,
    "total_papers": 5,
    "total_score": 2.3632412400000002,
    "venue_count": 4,
    "avg_score": 0.47264824800000005
  },
  {
    "id": "C2775836275",
    "name": "Dynamism",
    "level": 2,
    "total_papers": 5,
    "total_score": 4.181941439999999,
    "venue_count": 2,
    "avg_score": 0.8363882879999999
  },
  {
    "id": "C88737568",
    "name": "Body area network",
    "level": 3,
    "total_papers": 5,
    "total_score": 2.63582262,
    "venue_count": 2,
    "avg_score": 0.527164524
  },
  {
    "id": "C35525427",
    "name": "Intrusion detection system",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.8379077,
    "venue_count": 2,
    "avg_score": 0.56758154
  },
  {
    "id": "C124504099",
    "name": "Image segmentation",
    "level": 3,
    "total_papers": 5,
    "total_score": 1.3557063,
    "venue_count": 2,
    "avg_score": 0.27114126
  },
  {
    "id": "C175801342",
    "name": "Data analysis",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.4594944599999997,
    "venue_count": 4,
    "avg_score": 0.4918988919999999
  },
  {
    "id": "C2982948194",
    "name": "Game based learning",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.48187966,
    "venue_count": 4,
    "avg_score": 0.496375932
  },
  {
    "id": "C81669768",
    "name": "Precision and recall",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.25425196,
    "venue_count": 4,
    "avg_score": 0.450850392
  },
  {
    "id": "C71901391",
    "name": "Upload",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.6594831699999997,
    "venue_count": 4,
    "avg_score": 0.531896634
  },
  {
    "id": "C94523657",
    "name": "Wireless ad hoc network",
    "level": 3,
    "total_papers": 5,
    "total_score": 2.0207199200000003,
    "venue_count": 3,
    "avg_score": 0.40414398400000007
  },
  {
    "id": "C199104240",
    "name": "Marine engineering",
    "level": 1,
    "total_papers": 5,
    "total_score": 1.3195479300000001,
    "venue_count": 5,
    "avg_score": 0.26390958600000003
  },
  {
    "id": "C541664917",
    "name": "Malware",
    "level": 2,
    "total_papers": 5,
    "total_score": 4.1037123399999995,
    "venue_count": 3,
    "avg_score": 0.820742468
  },
  {
    "id": "C20136886",
    "name": "Interoperability",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.4682413800000003,
    "venue_count": 4,
    "avg_score": 0.49364827600000005
  },
  {
    "id": "C68649174",
    "name": "Base station",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.9264482899999997,
    "venue_count": 2,
    "avg_score": 0.585289658
  },
  {
    "id": "C74172769",
    "name": "Routing (electronic design automation)",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.32577567,
    "venue_count": 2,
    "avg_score": 0.465155134
  },
  {
    "id": "C104954878",
    "name": "Routing protocol",
    "level": 3,
    "total_papers": 5,
    "total_score": 2.89423772,
    "venue_count": 2,
    "avg_score": 0.578847544
  },
  {
    "id": "C152877465",
    "name": "Regression analysis",
    "level": 2,
    "total_papers": 5,
    "total_score": 1.99798358,
    "venue_count": 4,
    "avg_score": 0.399596716
  },
  {
    "id": "C199845137",
    "name": "Network topology",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.41432147,
    "venue_count": 3,
    "avg_score": 0.48286429399999997
  },
  {
    "id": "C2777351106",
    "name": "Legislation",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.2436442199999997,
    "venue_count": 3,
    "avg_score": 0.648728844
  },
  {
    "id": "C2776639384",
    "name": "Ideal (ethics)",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.4989026,
    "venue_count": 4,
    "avg_score": 0.49978052
  },
  {
    "id": "C100001284",
    "name": "Public economics",
    "level": 1,
    "total_papers": 5,
    "total_score": 2.1907934460000003,
    "venue_count": 2,
    "avg_score": 0.43815868920000006
  },
  {
    "id": "C149091818",
    "name": "Software system",
    "level": 3,
    "total_papers": 5,
    "total_score": 0.29368218999999995,
    "venue_count": 5,
    "avg_score": 0.05873643799999999
  },
  {
    "id": "C97508593",
    "name": "Contingency",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.86736136,
    "venue_count": 3,
    "avg_score": 0.573472272
  },
  {
    "id": "C49848784",
    "name": "Archetype",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.8207248,
    "venue_count": 3,
    "avg_score": 0.5641449599999999
  },
  {
    "id": "C122642867",
    "name": "Product-service system",
    "level": 3,
    "total_papers": 5,
    "total_score": 2.73531168,
    "venue_count": 2,
    "avg_score": 0.547062336
  },
  {
    "id": "C2777986313",
    "name": "Industry 4.0",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.79935136,
    "venue_count": 4,
    "avg_score": 0.5598702720000001
  },
  {
    "id": "C178315738",
    "name": "Bibliometrics",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.32549349,
    "venue_count": 3,
    "avg_score": 0.465098698
  },
  {
    "id": "C2776583511",
    "name": "Design studio",
    "level": 3,
    "total_papers": 5,
    "total_score": 2.5989240799999997,
    "venue_count": 2,
    "avg_score": 0.5197848159999999
  },
  {
    "id": "C2778370241",
    "name": "Parametric design",
    "level": 3,
    "total_papers": 5,
    "total_score": 2.6540366300000002,
    "venue_count": 3,
    "avg_score": 0.530807326
  },
  {
    "id": "C138777275",
    "name": "Mixing (physics)",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.7929305799999997,
    "venue_count": 2,
    "avg_score": 0.558586116
  },
  {
    "id": "C529099274",
    "name": "Comics",
    "level": 2,
    "total_papers": 5,
    "total_score": 4.5114383799999995,
    "venue_count": 3,
    "avg_score": 0.9022876759999999
  },
  {
    "id": "C117258860",
    "name": "Boundary representation",
    "level": 3,
    "total_papers": 5,
    "total_score": 3.09143808,
    "venue_count": 1,
    "avg_score": 0.618287616
  },
  {
    "id": "C10390562",
    "name": "Spline (mechanical)",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.42568696,
    "venue_count": 1,
    "avg_score": 0.48513739200000006
  },
  {
    "id": "C29513896",
    "name": "Shape optimization",
    "level": 3,
    "total_papers": 5,
    "total_score": 2.63842225,
    "venue_count": 1,
    "avg_score": 0.52768445
  },
  {
    "id": "C202615002",
    "name": "Differentiable function",
    "level": 2,
    "total_papers": 5,
    "total_score": 3.1351478499999996,
    "venue_count": 1,
    "avg_score": 0.6270295699999999
  },
  {
    "id": "C170589453",
    "name": "Volume mesh",
    "level": 4,
    "total_papers": 5,
    "total_score": 2.44609621,
    "venue_count": 1,
    "avg_score": 0.489219242
  },
  {
    "id": "C44575665",
    "name": "Lumbar",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.8169174999999997,
    "venue_count": 2,
    "avg_score": 0.5633834999999999
  },
  {
    "id": "C2780724011",
    "name": "Emergency department",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.76551393,
    "venue_count": 2,
    "avg_score": 0.553102786
  },
  {
    "id": "C185711340",
    "name": "Effects of sleep deprivation on cognitive performance",
    "level": 3,
    "total_papers": 5,
    "total_score": 2.18771197,
    "venue_count": 2,
    "avg_score": 0.437542394
  },
  {
    "id": "C2776545233",
    "name": "Desk",
    "level": 2,
    "total_papers": 5,
    "total_score": 2.9208603099999997,
    "venue_count": 3,
    "avg_score": 0.5841720619999999
  },
  {
    "id": "C2776465824",
    "name": "Distracted driving",
    "level": 3,
    "total_papers": 5,
    "total_score": 2.55843272,
    "venue_count": 1,
    "avg_score": 0.511686544
  },
  {
    "id": "C133979268",
    "name": "Vision",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.5545972999999997,
    "venue_count": 3,
    "avg_score": 0.6386493249999999
  },
  {
    "id": "C2777266375",
    "name": "Injustice",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.92624333,
    "venue_count": 2,
    "avg_score": 0.7315608325
  },
  {
    "id": "C2778780117",
    "name": "Reading comprehension",
    "level": 3,
    "total_papers": 4,
    "total_score": 2.16758,
    "venue_count": 3,
    "avg_score": 0.541895
  },
  {
    "id": "C168285401",
    "name": "Stigma (botany)",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.56279507,
    "venue_count": 3,
    "avg_score": 0.6406987675
  },
  {
    "id": "C2987423310",
    "name": "Wizard of oz",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.33710735,
    "venue_count": 3,
    "avg_score": 0.5842768375
  },
  {
    "id": "C2777688943",
    "name": "Feminism",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.39882745,
    "venue_count": 3,
    "avg_score": 0.3497068625
  },
  {
    "id": "C27081682",
    "name": "Placebo",
    "level": 3,
    "total_papers": 4,
    "total_score": 1.1487173800000001,
    "venue_count": 4,
    "avg_score": 0.28717934500000003
  },
  {
    "id": "C2776526686",
    "name": "Oppression",
    "level": 3,
    "total_papers": 4,
    "total_score": 2.87191701,
    "venue_count": 3,
    "avg_score": 0.7179792525
  },
  {
    "id": "C13184196",
    "name": "Dialectic",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.42150593,
    "venue_count": 4,
    "avg_score": 0.6053764825
  },
  {
    "id": "C204036174",
    "name": "Stock (firearms)",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.2042203799999998,
    "venue_count": 3,
    "avg_score": 0.5510550949999999
  },
  {
    "id": "C189645446",
    "name": "Mirroring",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.7531254,
    "venue_count": 4,
    "avg_score": 0.68828135
  },
  {
    "id": "C2779671885",
    "name": "Transgender",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.69547557,
    "venue_count": 3,
    "avg_score": 0.6738688925
  },
  {
    "id": "C3018552312",
    "name": "Assisted living",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.56192272,
    "venue_count": 2,
    "avg_score": 0.64048068
  },
  {
    "id": "C47941915",
    "name": "Speculation",
    "level": 2,
    "total_papers": 4,
    "total_score": 3.43024973,
    "venue_count": 3,
    "avg_score": 0.8575624325
  },
  {
    "id": "C2780502288",
    "name": "Expansive",
    "level": 3,
    "total_papers": 4,
    "total_score": 2.5942903800000003,
    "venue_count": 4,
    "avg_score": 0.6485725950000001
  },
  {
    "id": "C30407753",
    "name": "Compressive strength",
    "level": 2,
    "total_papers": 4,
    "total_score": 0,
    "venue_count": 4,
    "avg_score": 0
  },
  {
    "id": "C125209646",
    "name": "Cultural diversity",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.7858992200000001,
    "venue_count": 4,
    "avg_score": 0.44647480500000003
  },
  {
    "id": "C109747225",
    "name": "Scarcity",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.03585552,
    "venue_count": 4,
    "avg_score": 0.50896388
  },
  {
    "id": "C2778391849",
    "name": "Neurotypical",
    "level": 4,
    "total_papers": 4,
    "total_score": 3.28055186,
    "venue_count": 4,
    "avg_score": 0.820137965
  },
  {
    "id": "C66746571",
    "name": "ENCODE",
    "level": 3,
    "total_papers": 4,
    "total_score": 2.025298,
    "venue_count": 3,
    "avg_score": 0.5063245
  },
  {
    "id": "C2225880",
    "name": "Journaling file system",
    "level": 3,
    "total_papers": 4,
    "total_score": 3.5579438000000003,
    "venue_count": 4,
    "avg_score": 0.8894859500000001
  },
  {
    "id": "C172707124",
    "name": "Actuator",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.6951483400000003,
    "venue_count": 4,
    "avg_score": 0.42378708500000006
  },
  {
    "id": "C204366326",
    "name": "Deformation (meteorology)",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.9427286000000001,
    "venue_count": 2,
    "avg_score": 0.48568215000000003
  },
  {
    "id": "C4924752",
    "name": "Plug-in",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.5080212399999997,
    "venue_count": 3,
    "avg_score": 0.6270053099999999
  },
  {
    "id": "C29848774",
    "name": "Management information systems",
    "level": 3,
    "total_papers": 4,
    "total_score": 1.09665981,
    "venue_count": 3,
    "avg_score": 0.2741649525
  },
  {
    "id": "C2777880217",
    "name": "Acknowledgement",
    "level": 2,
    "total_papers": 4,
    "total_score": 3.29488649,
    "venue_count": 2,
    "avg_score": 0.8237216225
  },
  {
    "id": "C106246047",
    "name": "Iterative design",
    "level": 3,
    "total_papers": 4,
    "total_score": 2.02162368,
    "venue_count": 4,
    "avg_score": 0.50540592
  },
  {
    "id": "C183553116",
    "name": "Eye contact",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.23147938,
    "venue_count": 4,
    "avg_score": 0.557869845
  },
  {
    "id": "C54525549",
    "name": "Weaving",
    "level": 2,
    "total_papers": 4,
    "total_score": 3.29869485,
    "venue_count": 4,
    "avg_score": 0.8246737125
  },
  {
    "id": "C191630685",
    "name": "Informatics",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.13058808,
    "venue_count": 4,
    "avg_score": 0.53264702
  },
  {
    "id": "C74363100",
    "name": "Economic system",
    "level": 1,
    "total_papers": 4,
    "total_score": 1.3697921,
    "venue_count": 2,
    "avg_score": 0.342448025
  },
  {
    "id": "C1337776",
    "name": "Facilitation",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.76924306,
    "venue_count": 4,
    "avg_score": 0.692310765
  },
  {
    "id": "C158608086",
    "name": "Prosocial behavior",
    "level": 2,
    "total_papers": 4,
    "total_score": 3.32040999,
    "venue_count": 3,
    "avg_score": 0.8301024975
  },
  {
    "id": "C168725872",
    "name": "Sophistication",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.9016323900000005,
    "venue_count": 3,
    "avg_score": 0.7254080975000001
  },
  {
    "id": "C513874922",
    "name": "Digital library",
    "level": 3,
    "total_papers": 4,
    "total_score": 1.85596573,
    "venue_count": 3,
    "avg_score": 0.4639914325
  },
  {
    "id": "C59488412",
    "name": "Requirements analysis",
    "level": 3,
    "total_papers": 4,
    "total_score": 1.04345483,
    "venue_count": 3,
    "avg_score": 0.2608637075
  },
  {
    "id": "C3020716817",
    "name": "Visual feedback",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.28541499,
    "venue_count": 4,
    "avg_score": 0.5713537475
  },
  {
    "id": "C161584116",
    "name": "Multivariate statistics",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.25542683,
    "venue_count": 3,
    "avg_score": 0.5638567075
  },
  {
    "id": "C30539005",
    "name": "Human communication",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.9191867200000001,
    "venue_count": 3,
    "avg_score": 0.47979668000000003
  },
  {
    "id": "C107645774",
    "name": "Human resources",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.03272646,
    "venue_count": 4,
    "avg_score": 0.508181615
  },
  {
    "id": "C2776542497",
    "name": "Development (topology)",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.79816454,
    "venue_count": 4,
    "avg_score": 0.449541135
  },
  {
    "id": "C2984915365",
    "name": "Cognitive impairment",
    "level": 3,
    "total_papers": 4,
    "total_score": 2.1666169699999998,
    "venue_count": 3,
    "avg_score": 0.5416542424999999
  },
  {
    "id": "C2777891301",
    "name": "Navigation system",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.07055752,
    "venue_count": 4,
    "avg_score": 0.51763938
  },
  {
    "id": "C12426560",
    "name": "Basis (linear algebra)",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.38531733,
    "venue_count": 4,
    "avg_score": 0.5963293325
  },
  {
    "id": "C521332185",
    "name": "Analogy",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.40015671,
    "venue_count": 3,
    "avg_score": 0.6000391775
  },
  {
    "id": "C2778044066",
    "name": "Amateur",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.8788503700000003,
    "venue_count": 4,
    "avg_score": 0.7197125925000001
  },
  {
    "id": "C6387636",
    "name": "Activity tracker",
    "level": 3,
    "total_papers": 4,
    "total_score": 2.47718213,
    "venue_count": 3,
    "avg_score": 0.6192955325
  },
  {
    "id": "C2780626000",
    "name": "Human-in-the-loop",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.51595054,
    "venue_count": 3,
    "avg_score": 0.628987635
  },
  {
    "id": "C68387754",
    "name": "Schedule",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.96310853,
    "venue_count": 3,
    "avg_score": 0.4907771325
  },
  {
    "id": "C175154964",
    "name": "Task analysis",
    "level": 3,
    "total_papers": 4,
    "total_score": 1.69020533,
    "venue_count": 2,
    "avg_score": 0.4225513325
  },
  {
    "id": "C118562606",
    "name": "Escapism",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.97353166,
    "venue_count": 4,
    "avg_score": 0.743382915
  },
  {
    "id": "C2777362162",
    "name": "Grand Challenges",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.38359751,
    "venue_count": 2,
    "avg_score": 0.5958993775
  },
  {
    "id": "C2780589192",
    "name": "Raising (metalworking)",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.6343385699999997,
    "venue_count": 3,
    "avg_score": 0.6585846424999999
  },
  {
    "id": "C168127410",
    "name": "Stereotype (UML)",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.36795327,
    "venue_count": 4,
    "avg_score": 0.5919883175
  },
  {
    "id": "C63428231",
    "name": "Norwegian",
    "level": 2,
    "total_papers": 4,
    "total_score": 3.61621303,
    "venue_count": 4,
    "avg_score": 0.9040532575
  },
  {
    "id": "C151913843",
    "name": "Dominance (genetics)",
    "level": 3,
    "total_papers": 4,
    "total_score": 1.83053964,
    "venue_count": 4,
    "avg_score": 0.45763491
  },
  {
    "id": "C29825287",
    "name": "Warning system",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.38851967,
    "venue_count": 4,
    "avg_score": 0.5971299175
  },
  {
    "id": "C2775930393",
    "name": "Mobile banking",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.41882792,
    "venue_count": 3,
    "avg_score": 0.60470698
  },
  {
    "id": "C2983409430",
    "name": "Virtual agent",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.02195775,
    "venue_count": 4,
    "avg_score": 0.5054894375
  },
  {
    "id": "C96439379",
    "name": "Joystick",
    "level": 2,
    "total_papers": 4,
    "total_score": 3.3003046,
    "venue_count": 4,
    "avg_score": 0.82507615
  },
  {
    "id": "C154255573",
    "name": "Teleportation",
    "level": 5,
    "total_papers": 4,
    "total_score": 2.81376863,
    "venue_count": 3,
    "avg_score": 0.7034421575
  },
  {
    "id": "C187486625",
    "name": "Quantum channel",
    "level": 4,
    "total_papers": 4,
    "total_score": 0.07116535,
    "venue_count": 3,
    "avg_score": 0.0177913375
  },
  {
    "id": "C2778126366",
    "name": "Unemployment",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.27697346,
    "venue_count": 3,
    "avg_score": 0.569243365
  },
  {
    "id": "C33199155",
    "name": "Sharing economy",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.26531987,
    "venue_count": 3,
    "avg_score": 0.5663299675
  },
  {
    "id": "C2777425269",
    "name": "Foregrounding",
    "level": 2,
    "total_papers": 4,
    "total_score": 3.06252365,
    "venue_count": 4,
    "avg_score": 0.7656309125
  },
  {
    "id": "C2781426162",
    "name": "Casual",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.43095113,
    "venue_count": 4,
    "avg_score": 0.6077377825
  },
  {
    "id": "C577917",
    "name": "Turing test",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.54631024,
    "venue_count": 4,
    "avg_score": 0.63657756
  },
  {
    "id": "C53811970",
    "name": "Centrality",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.36379963,
    "venue_count": 4,
    "avg_score": 0.5909499075
  },
  {
    "id": "C53173841",
    "name": "Action research",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.94010924,
    "venue_count": 4,
    "avg_score": 0.48502731
  },
  {
    "id": "C162127614",
    "name": "Ambivalence",
    "level": 2,
    "total_papers": 4,
    "total_score": 3.0402631700000002,
    "venue_count": 4,
    "avg_score": 0.7600657925000001
  },
  {
    "id": "C188191115",
    "name": "Social reality",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.8996334300000002,
    "venue_count": 4,
    "avg_score": 0.47490835750000004
  },
  {
    "id": "C2778121359",
    "name": "Lexicon",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.55051409,
    "venue_count": 4,
    "avg_score": 0.6376285225
  },
  {
    "id": "C130217890",
    "name": "Biodiversity",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.0369211,
    "venue_count": 3,
    "avg_score": 0.259230275
  },
  {
    "id": "C102938260",
    "name": "Privacy policy",
    "level": 3,
    "total_papers": 4,
    "total_score": 1.9346604600000001,
    "venue_count": 4,
    "avg_score": 0.48366511500000003
  },
  {
    "id": "C62555980",
    "name": "Emergency management",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.28851801,
    "venue_count": 4,
    "avg_score": 0.5721295025
  },
  {
    "id": "C2779561248",
    "name": "Tacit knowledge",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.9947605,
    "venue_count": 4,
    "avg_score": 0.748690125
  },
  {
    "id": "C2778173179",
    "name": "Attendance",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.81451061,
    "venue_count": 4,
    "avg_score": 0.7036276525
  },
  {
    "id": "C38775462",
    "name": "Transformational leadership",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.3592769899999997,
    "venue_count": 3,
    "avg_score": 0.5898192474999999
  },
  {
    "id": "C24845683",
    "name": "Interview",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.54527416,
    "venue_count": 4,
    "avg_score": 0.63631854
  },
  {
    "id": "C1668388",
    "name": "Data management",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.82172817,
    "venue_count": 3,
    "avg_score": 0.4554320425
  },
  {
    "id": "C153997805",
    "name": "Research ethics",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.9680966999999998,
    "venue_count": 4,
    "avg_score": 0.49202417499999995
  },
  {
    "id": "C122783720",
    "name": "Interpreter",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.64878631,
    "venue_count": 4,
    "avg_score": 0.6621965775
  },
  {
    "id": "C4249254",
    "name": "Demographic economics",
    "level": 1,
    "total_papers": 4,
    "total_score": 1.4698227899999998,
    "venue_count": 4,
    "avg_score": 0.36745569749999996
  },
  {
    "id": "C128487930",
    "name": "Information management",
    "level": 2,
    "total_papers": 4,
    "total_score": 0.85855517,
    "venue_count": 3,
    "avg_score": 0.2146387925
  },
  {
    "id": "C147675338",
    "name": "Actor–network theory",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.11189234,
    "venue_count": 4,
    "avg_score": 0.527973085
  },
  {
    "id": "C142039133",
    "name": "Personalized learning",
    "level": 5,
    "total_papers": 4,
    "total_score": 2.20705015,
    "venue_count": 4,
    "avg_score": 0.5517625375
  },
  {
    "id": "C100143864",
    "name": "Persuasive technology",
    "level": 3,
    "total_papers": 4,
    "total_score": 2.0343976,
    "venue_count": 3,
    "avg_score": 0.5085994
  },
  {
    "id": "C124216869",
    "name": "Design strategy",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.9563129799999999,
    "venue_count": 4,
    "avg_score": 0.48907824499999997
  },
  {
    "id": "C2776420229",
    "name": "Well-being",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.75944156,
    "venue_count": 4,
    "avg_score": 0.43986039
  },
  {
    "id": "C3019463085",
    "name": "Media use",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.71427527,
    "venue_count": 3,
    "avg_score": 0.4285688175
  },
  {
    "id": "C2780783007",
    "name": "Attention deficit hyperactivity disorder",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.9589924899999998,
    "venue_count": 3,
    "avg_score": 0.48974812249999994
  },
  {
    "id": "C110367647",
    "name": "Metamaterial",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.9399656,
    "venue_count": 3,
    "avg_score": 0.7349914
  },
  {
    "id": "C2779930795",
    "name": "Gratitude",
    "level": 2,
    "total_papers": 4,
    "total_score": 3.2364613,
    "venue_count": 4,
    "avg_score": 0.809115325
  },
  {
    "id": "C17500928",
    "name": "Control system",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.75187176,
    "venue_count": 1,
    "avg_score": 0.43796794
  },
  {
    "id": "C2778216619",
    "name": "Wrist",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.20472183,
    "venue_count": 2,
    "avg_score": 0.5511804575
  },
  {
    "id": "C85617194",
    "name": "Particle swarm optimization",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.1341481399999997,
    "venue_count": 2,
    "avg_score": 0.5335370349999999
  },
  {
    "id": "C57273362",
    "name": "Decoding methods",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.4566863299999997,
    "venue_count": 3,
    "avg_score": 0.6141715824999999
  },
  {
    "id": "C36376990",
    "name": "Psychological safety",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.11243726,
    "venue_count": 4,
    "avg_score": 0.528109315
  },
  {
    "id": "C10558101",
    "name": "Smart grid",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.99612136,
    "venue_count": 3,
    "avg_score": 0.49903034
  },
  {
    "id": "C2775896111",
    "name": "Router",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.04736778,
    "venue_count": 3,
    "avg_score": 0.511841945
  },
  {
    "id": "C174954385",
    "name": "Job performance",
    "level": 3,
    "total_papers": 4,
    "total_score": 1.23001259,
    "venue_count": 4,
    "avg_score": 0.3075031475
  },
  {
    "id": "C2776151529",
    "name": "Object detection",
    "level": 3,
    "total_papers": 4,
    "total_score": 1.88776601,
    "venue_count": 3,
    "avg_score": 0.4719415025
  },
  {
    "id": "C134537474",
    "name": "Naturalness",
    "level": 2,
    "total_papers": 4,
    "total_score": 3.08240389,
    "venue_count": 3,
    "avg_score": 0.7706009725
  },
  {
    "id": "C187191949",
    "name": "Profiling (computer programming)",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.2909503499999997,
    "venue_count": 4,
    "avg_score": 0.5727375874999999
  },
  {
    "id": "C1517167",
    "name": "Sight",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.2752769600000002,
    "venue_count": 3,
    "avg_score": 0.5688192400000001
  },
  {
    "id": "C2779332521",
    "name": "Legibility",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.8170837499999997,
    "venue_count": 3,
    "avg_score": 0.7042709374999999
  },
  {
    "id": "C185578843",
    "name": "Information visualization",
    "level": 3,
    "total_papers": 4,
    "total_score": 1.97569353,
    "venue_count": 3,
    "avg_score": 0.4939233825
  },
  {
    "id": "C2781089630",
    "name": "Realization (probability)",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.4413348700000004,
    "venue_count": 3,
    "avg_score": 0.6103337175000001
  },
  {
    "id": "C89992363",
    "name": "Track (disk drive)",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.0582577,
    "venue_count": 4,
    "avg_score": 0.514564425
  },
  {
    "id": "C32834561",
    "name": "Subspace topology",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.20318913,
    "venue_count": 4,
    "avg_score": 0.5507972825
  },
  {
    "id": "C154586513",
    "name": "Tracking system",
    "level": 3,
    "total_papers": 4,
    "total_score": 1.89805289,
    "venue_count": 4,
    "avg_score": 0.4745132225
  },
  {
    "id": "C146357865",
    "name": "Stage (stratigraphy)",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.3221483000000003,
    "venue_count": 3,
    "avg_score": 0.5805370750000001
  },
  {
    "id": "C206658404",
    "name": "Electricity",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.6286716099999998,
    "venue_count": 2,
    "avg_score": 0.40716790249999996
  },
  {
    "id": "C166955791",
    "name": "Macro",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.9301603699999998,
    "venue_count": 4,
    "avg_score": 0.48254009249999996
  },
  {
    "id": "C2434490",
    "name": "Neurofeedback",
    "level": 3,
    "total_papers": 4,
    "total_score": 2.41325456,
    "venue_count": 4,
    "avg_score": 0.60331364
  },
  {
    "id": "C67203356",
    "name": "Reinforcement",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.02583722,
    "venue_count": 4,
    "avg_score": 0.506459305
  },
  {
    "id": "C170494330",
    "name": "Cognitive map",
    "level": 3,
    "total_papers": 4,
    "total_score": 2.1006441000000002,
    "venue_count": 4,
    "avg_score": 0.5251610250000001
  },
  {
    "id": "C2780457017",
    "name": "Shoulder joint",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.1824790800000002,
    "venue_count": 2,
    "avg_score": 0.5456197700000001
  },
  {
    "id": "C30038468",
    "name": "Memorization",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.8685649499999997,
    "venue_count": 4,
    "avg_score": 0.7171412374999999
  },
  {
    "id": "C44280652",
    "name": "Phase (matter)",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.00062067,
    "venue_count": 2,
    "avg_score": 0.5001551675
  },
  {
    "id": "C88548561",
    "name": "sort",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.92031297,
    "venue_count": 3,
    "avg_score": 0.7300782425
  },
  {
    "id": "C170003942",
    "name": "Display size",
    "level": 3,
    "total_papers": 4,
    "total_score": 2.25533224,
    "venue_count": 3,
    "avg_score": 0.56383306
  },
  {
    "id": "C164597639",
    "name": "Display device",
    "level": 2,
    "total_papers": 4,
    "total_score": 0.5341121,
    "venue_count": 3,
    "avg_score": 0.133528025
  },
  {
    "id": "C2778627824",
    "name": "Battle",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.11532732,
    "venue_count": 4,
    "avg_score": 0.52883183
  },
  {
    "id": "C158016649",
    "name": "Multinational corporation",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.23540176,
    "venue_count": 3,
    "avg_score": 0.55885044
  },
  {
    "id": "C110269972",
    "name": "Recreation",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.65518991,
    "venue_count": 3,
    "avg_score": 0.6637974775
  },
  {
    "id": "C124086623",
    "name": "Piano",
    "level": 2,
    "total_papers": 4,
    "total_score": 3.05659712,
    "venue_count": 4,
    "avg_score": 0.76414928
  },
  {
    "id": "C71745522",
    "name": "Confidentiality",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.38150709,
    "venue_count": 4,
    "avg_score": 0.5953767725
  },
  {
    "id": "C551499885",
    "name": "Intellectual disability",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.5347376,
    "venue_count": 4,
    "avg_score": 0.6336844
  },
  {
    "id": "C66699896",
    "name": "Virtual learning environment",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.8607186099999997,
    "venue_count": 4,
    "avg_score": 0.46517965249999993
  },
  {
    "id": "C2777852691",
    "name": "Crowds",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.96786935,
    "venue_count": 4,
    "avg_score": 0.4919673375
  },
  {
    "id": "C74177177",
    "name": "Belongingness",
    "level": 2,
    "total_papers": 4,
    "total_score": 3.05265507,
    "venue_count": 4,
    "avg_score": 0.7631637675
  },
  {
    "id": "C117893075",
    "name": "Narrative inquiry",
    "level": 3,
    "total_papers": 4,
    "total_score": 1.92274345,
    "venue_count": 2,
    "avg_score": 0.4806858625
  },
  {
    "id": "C130436687",
    "name": "Web modeling",
    "level": 3,
    "total_papers": 4,
    "total_score": 1.45951842,
    "venue_count": 3,
    "avg_score": 0.364879605
  },
  {
    "id": "C2780583480",
    "name": "Tone (literature)",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.9488037999999999,
    "venue_count": 4,
    "avg_score": 0.48720094999999997
  },
  {
    "id": "C43211506",
    "name": "Museology",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.94163587,
    "venue_count": 4,
    "avg_score": 0.4854089675
  },
  {
    "id": "C157286648",
    "name": "Kalman filter",
    "level": 2,
    "total_papers": 4,
    "total_score": 0.52462432,
    "venue_count": 4,
    "avg_score": 0.13115608
  },
  {
    "id": "C2780368719",
    "name": "Computational thinking",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.77601559,
    "venue_count": 3,
    "avg_score": 0.6940038975
  },
  {
    "id": "C62402345",
    "name": "Interaction technique",
    "level": 3,
    "total_papers": 4,
    "total_score": 2.2287646,
    "venue_count": 4,
    "avg_score": 0.55719115
  },
  {
    "id": "C2781291010",
    "name": "Period (music)",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.7020855,
    "venue_count": 4,
    "avg_score": 0.675521375
  },
  {
    "id": "C74050887",
    "name": "Rotation (mathematics)",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.27231725,
    "venue_count": 3,
    "avg_score": 0.5680793125
  },
  {
    "id": "C82793941",
    "name": "Path analysis (statistics)",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.8632392,
    "venue_count": 4,
    "avg_score": 0.4658098
  },
  {
    "id": "C146834321",
    "name": "Closure (psychology)",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.76169125,
    "venue_count": 4,
    "avg_score": 0.4404228125
  },
  {
    "id": "C60641444",
    "name": "Delphi method",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.1522217799999996,
    "venue_count": 3,
    "avg_score": 0.5380554449999999
  },
  {
    "id": "C91672089",
    "name": "Fashion design",
    "level": 3,
    "total_papers": 4,
    "total_score": 2.3051537800000004,
    "venue_count": 2,
    "avg_score": 0.5762884450000001
  },
  {
    "id": "C2777352838",
    "name": "Excellence",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.43823564,
    "venue_count": 3,
    "avg_score": 0.60955891
  },
  {
    "id": "C2982735371",
    "name": "Mental fatigue",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.7844520400000001,
    "venue_count": 3,
    "avg_score": 0.44611301000000003
  },
  {
    "id": "C3018311702",
    "name": "Motivation to learn",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.9658222300000001,
    "venue_count": 2,
    "avg_score": 0.49145555750000003
  },
  {
    "id": "C67712803",
    "name": "User modeling",
    "level": 3,
    "total_papers": 4,
    "total_score": 1.86506323,
    "venue_count": 2,
    "avg_score": 0.4662658075
  },
  {
    "id": "C179717631",
    "name": "Multilayer perceptron",
    "level": 3,
    "total_papers": 4,
    "total_score": 2.1694850399999996,
    "venue_count": 3,
    "avg_score": 0.5423712599999999
  },
  {
    "id": "C195487862",
    "name": "Revenue",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.36627954,
    "venue_count": 3,
    "avg_score": 0.591569885
  },
  {
    "id": "C122507166",
    "name": "Crossover",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.97083875,
    "venue_count": 3,
    "avg_score": 0.7427096875
  },
  {
    "id": "C4679612",
    "name": "Aggregate (composite)",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.7842295700000002,
    "venue_count": 4,
    "avg_score": 0.44605739250000004
  },
  {
    "id": "C164953862",
    "name": "Psychomotor learning",
    "level": 3,
    "total_papers": 4,
    "total_score": 2.91354945,
    "venue_count": 4,
    "avg_score": 0.7283873625
  },
  {
    "id": "C79416737",
    "name": "Social learning",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.88629549,
    "venue_count": 4,
    "avg_score": 0.4715738725
  },
  {
    "id": "C72634772",
    "name": "Data integration",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.10864017,
    "venue_count": 4,
    "avg_score": 0.5271600425
  },
  {
    "id": "C23224414",
    "name": "Hidden Markov model",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.476834,
    "venue_count": 4,
    "avg_score": 0.6192085
  },
  {
    "id": "C155911762",
    "name": "Blueprint",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.524833,
    "venue_count": 4,
    "avg_score": 0.63120825
  },
  {
    "id": "C125014702",
    "name": "Adaptive learning",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.94831527,
    "venue_count": 4,
    "avg_score": 0.4870788175
  },
  {
    "id": "C37736160",
    "name": "Adversarial system",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.17499643,
    "venue_count": 3,
    "avg_score": 0.5437491075
  },
  {
    "id": "C28006648",
    "name": "Multi-task learning",
    "level": 3,
    "total_papers": 4,
    "total_score": 2.32104575,
    "venue_count": 1,
    "avg_score": 0.5802614375
  },
  {
    "id": "C2780660688",
    "name": "Multimodal learning",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.8542338,
    "venue_count": 2,
    "avg_score": 0.46355845
  },
  {
    "id": "C3020014160",
    "name": "Negative emotion",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.80217814,
    "venue_count": 3,
    "avg_score": 0.450544535
  },
  {
    "id": "C37914503",
    "name": "Mathematical physics",
    "level": 1,
    "total_papers": 4,
    "total_score": 0,
    "venue_count": 2,
    "avg_score": 0
  },
  {
    "id": "C2781140086",
    "name": "Confusion",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.0301156600000003,
    "venue_count": 4,
    "avg_score": 0.5075289150000001
  },
  {
    "id": "C113174947",
    "name": "Tree (set theory)",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.16574053,
    "venue_count": 4,
    "avg_score": 0.5414351325
  },
  {
    "id": "C2777375102",
    "name": "Disgust",
    "level": 3,
    "total_papers": 4,
    "total_score": 3.08587727,
    "venue_count": 4,
    "avg_score": 0.7714693175
  },
  {
    "id": "C2775997480",
    "name": "Degree (music)",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.4864427300000003,
    "venue_count": 3,
    "avg_score": 0.6216106825000001
  },
  {
    "id": "C175291020",
    "name": "Offset (computer science)",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.4018108,
    "venue_count": 3,
    "avg_score": 0.6004527
  },
  {
    "id": "C2778753846",
    "name": "Link (geometry)",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.26309526,
    "venue_count": 3,
    "avg_score": 0.565773815
  },
  {
    "id": "C2780198215",
    "name": "Informal learning",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.0772914300000003,
    "venue_count": 4,
    "avg_score": 0.5193228575000001
  },
  {
    "id": "C2984419406",
    "name": "Science learning",
    "level": 3,
    "total_papers": 4,
    "total_score": 1.98204726,
    "venue_count": 4,
    "avg_score": 0.495511815
  },
  {
    "id": "C2781038967",
    "name": "Neck pain",
    "level": 3,
    "total_papers": 4,
    "total_score": 2.5858445999999997,
    "venue_count": 3,
    "avg_score": 0.6464611499999999
  },
  {
    "id": "C164866538",
    "name": "Cluster (spacecraft)",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.09165955,
    "venue_count": 4,
    "avg_score": 0.5229148875
  },
  {
    "id": "C124978682",
    "name": "Proof of concept",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.88415212,
    "venue_count": 4,
    "avg_score": 0.47103803
  },
  {
    "id": "C2780402292",
    "name": "Elaboration likelihood model",
    "level": 3,
    "total_papers": 4,
    "total_score": 2.3671279,
    "venue_count": 2,
    "avg_score": 0.591781975
  },
  {
    "id": "C17022365",
    "name": "Individualism",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.42365974,
    "venue_count": 2,
    "avg_score": 0.355914935
  },
  {
    "id": "C200113983",
    "name": "Morality",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.5622088,
    "venue_count": 3,
    "avg_score": 0.6405522
  },
  {
    "id": "C207505557",
    "name": "Business process modeling",
    "level": 4,
    "total_papers": 4,
    "total_score": 0.87288034,
    "venue_count": 3,
    "avg_score": 0.218220085
  },
  {
    "id": "C2776193868",
    "name": "Community engagement",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.8198228399999998,
    "venue_count": 3,
    "avg_score": 0.45495570999999996
  },
  {
    "id": "C2781210498",
    "name": "Insomnia",
    "level": 2,
    "total_papers": 4,
    "total_score": 0.8928924199999999,
    "venue_count": 4,
    "avg_score": 0.22322310499999998
  },
  {
    "id": "C118084267",
    "name": "Positive economics",
    "level": 1,
    "total_papers": 4,
    "total_score": 1.40360049,
    "venue_count": 4,
    "avg_score": 0.3509001225
  },
  {
    "id": "C2777626052",
    "name": "Bachelor",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.65087548,
    "venue_count": 3,
    "avg_score": 0.66271887
  },
  {
    "id": "C107482638",
    "name": "Hospitality",
    "level": 3,
    "total_papers": 4,
    "total_score": 2.64914797,
    "venue_count": 3,
    "avg_score": 0.6622869925
  },
  {
    "id": "C2988045736",
    "name": "Android app",
    "level": 3,
    "total_papers": 4,
    "total_score": 1.7186245,
    "venue_count": 4,
    "avg_score": 0.429656125
  },
  {
    "id": "C2780620123",
    "name": "Beauty",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.4147680300000003,
    "venue_count": 4,
    "avg_score": 0.6036920075000001
  },
  {
    "id": "C134018914",
    "name": "Endocrinology",
    "level": 1,
    "total_papers": 4,
    "total_score": 0,
    "venue_count": 2,
    "avg_score": 0
  },
  {
    "id": "C41971633",
    "name": "Key distribution in wireless sensor networks",
    "level": 4,
    "total_papers": 4,
    "total_score": 2.0276424499999997,
    "venue_count": 2,
    "avg_score": 0.5069106124999999
  },
  {
    "id": "C76178495",
    "name": "Asset (computer security)",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.2810208999999997,
    "venue_count": 2,
    "avg_score": 0.5702552249999999
  },
  {
    "id": "C158338273",
    "name": "Homomorphic encryption",
    "level": 3,
    "total_papers": 4,
    "total_score": 3.04042491,
    "venue_count": 2,
    "avg_score": 0.7601062275
  },
  {
    "id": "C2780202397",
    "name": "Smart objects",
    "level": 3,
    "total_papers": 4,
    "total_score": 2.11988775,
    "venue_count": 2,
    "avg_score": 0.5299719375
  },
  {
    "id": "C2779965156",
    "name": "Data sharing",
    "level": 3,
    "total_papers": 4,
    "total_score": 2.07453572,
    "venue_count": 3,
    "avg_score": 0.51863393
  },
  {
    "id": "C3017597292",
    "name": "Privacy protection",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.00557364,
    "venue_count": 2,
    "avg_score": 0.50139341
  },
  {
    "id": "C153646914",
    "name": "Cellular network",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.95550778,
    "venue_count": 2,
    "avg_score": 0.488876945
  },
  {
    "id": "C187713609",
    "name": "Default gateway",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.36210253,
    "venue_count": 3,
    "avg_score": 0.5905256325
  },
  {
    "id": "C167615521",
    "name": "Elliptic curve cryptography",
    "level": 4,
    "total_papers": 4,
    "total_score": 2.11687271,
    "venue_count": 1,
    "avg_score": 0.5292181775
  },
  {
    "id": "C38369872",
    "name": "Security analysis",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.71636399,
    "venue_count": 1,
    "avg_score": 0.4290909975
  },
  {
    "id": "C47798520",
    "name": "Transmitter",
    "level": 3,
    "total_papers": 4,
    "total_score": 1.9471342299999999,
    "venue_count": 1,
    "avg_score": 0.48678355749999996
  },
  {
    "id": "C2781018962",
    "name": "Container (type theory)",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.16574579,
    "venue_count": 2,
    "avg_score": 0.5414364475
  },
  {
    "id": "C147764199",
    "name": "Minification",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.92611632,
    "venue_count": 2,
    "avg_score": 0.48152908
  },
  {
    "id": "C3017891749",
    "name": "Android application",
    "level": 3,
    "total_papers": 4,
    "total_score": 1.8601315500000002,
    "venue_count": 2,
    "avg_score": 0.46503288750000005
  },
  {
    "id": "C173018170",
    "name": "Microcontroller",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.1852341099999997,
    "venue_count": 2,
    "avg_score": 0.5463085274999999
  },
  {
    "id": "C165818556",
    "name": "Geodesic",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.65538124,
    "venue_count": 2,
    "avg_score": 0.66384531
  },
  {
    "id": "C2777421447",
    "name": "Mobile phone",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.18621394,
    "venue_count": 4,
    "avg_score": 0.546553485
  },
  {
    "id": "C13774568",
    "name": "Population ageing",
    "level": 3,
    "total_papers": 4,
    "total_score": 2.01963133,
    "venue_count": 2,
    "avg_score": 0.5049078325
  },
  {
    "id": "C2777582232",
    "name": "CONTEST",
    "level": 2,
    "total_papers": 4,
    "total_score": 3.45256259,
    "venue_count": 2,
    "avg_score": 0.8631406475
  },
  {
    "id": "C2780310539",
    "name": "Imperfect",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.71494218,
    "venue_count": 4,
    "avg_score": 0.678735545
  },
  {
    "id": "C2777704519",
    "name": "MAGIC (telescope)",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.42380124,
    "venue_count": 4,
    "avg_score": 0.60595031
  },
  {
    "id": "C2988167200",
    "name": "Online video",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.1696487600000003,
    "venue_count": 3,
    "avg_score": 0.5424121900000001
  },
  {
    "id": "C12174686",
    "name": "Risk assessment",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.04650712,
    "venue_count": 2,
    "avg_score": 0.51162678
  },
  {
    "id": "C2778679518",
    "name": "Dialogic",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.69025696,
    "venue_count": 3,
    "avg_score": 0.67256424
  },
  {
    "id": "C2777609615",
    "name": "Virtual Laboratory",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.9969665399999998,
    "venue_count": 3,
    "avg_score": 0.49924163499999996
  },
  {
    "id": "C19122763",
    "name": "Synchronous learning",
    "level": 4,
    "total_papers": 4,
    "total_score": 1.8915773400000002,
    "venue_count": 2,
    "avg_score": 0.47289433500000005
  },
  {
    "id": "C121087249",
    "name": "Emerging markets",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.17048813,
    "venue_count": 1,
    "avg_score": 0.5426220325
  },
  {
    "id": "C34974158",
    "name": "Intellectual property",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.9792149,
    "venue_count": 1,
    "avg_score": 0.744803725
  },
  {
    "id": "C2777527080",
    "name": "Digital ecosystem",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.9589166599999999,
    "venue_count": 1,
    "avg_score": 0.48972916499999997
  },
  {
    "id": "C137996800",
    "name": "Technological change",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.9973443,
    "venue_count": 1,
    "avg_score": 0.499336075
  },
  {
    "id": "C68991459",
    "name": "Value proposition",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.12549203,
    "venue_count": 1,
    "avg_score": 0.5313730075
  },
  {
    "id": "C2780625559",
    "name": "Commercialization",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.74453213,
    "venue_count": 2,
    "avg_score": 0.6861330325
  },
  {
    "id": "C2910001868",
    "name": "European union",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.56442381,
    "venue_count": 3,
    "avg_score": 0.3911059525
  },
  {
    "id": "C2984241579",
    "name": "Architectural design",
    "level": 3,
    "total_papers": 4,
    "total_score": 1.95274385,
    "venue_count": 2,
    "avg_score": 0.4881859625
  },
  {
    "id": "C87736272",
    "name": "Strategic design",
    "level": 3,
    "total_papers": 4,
    "total_score": 2.2493498,
    "venue_count": 3,
    "avg_score": 0.56233745
  },
  {
    "id": "C152541439",
    "name": "Critical appraisal",
    "level": 3,
    "total_papers": 4,
    "total_score": 2.00054521,
    "venue_count": 4,
    "avg_score": 0.5001363025
  },
  {
    "id": "C192562157",
    "name": "Rhetorical question",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.77041795,
    "venue_count": 2,
    "avg_score": 0.6926044875
  },
  {
    "id": "C121217528",
    "name": "Sustainable design",
    "level": 3,
    "total_papers": 4,
    "total_score": 2.00309214,
    "venue_count": 2,
    "avg_score": 0.500773035
  },
  {
    "id": "C2779863119",
    "name": "Knot (papermaking)",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.6172913799999997,
    "venue_count": 2,
    "avg_score": 0.6543228449999999
  },
  {
    "id": "C134535237",
    "name": "Industrial design",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.29638009,
    "venue_count": 4,
    "avg_score": 0.5740950225
  },
  {
    "id": "C66102695",
    "name": "Cognitive flexibility",
    "level": 3,
    "total_papers": 4,
    "total_score": 2.34045458,
    "venue_count": 4,
    "avg_score": 0.585113645
  },
  {
    "id": "C2778969656",
    "name": "Participatory evaluation",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.87668583,
    "venue_count": 1,
    "avg_score": 0.4691714575
  },
  {
    "id": "C87858587",
    "name": "Quantitative research",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.88839033,
    "venue_count": 2,
    "avg_score": 0.4720975825
  },
  {
    "id": "C2777038452",
    "name": "Tribute",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.9449725300000003,
    "venue_count": 2,
    "avg_score": 0.7362431325000001
  },
  {
    "id": "C9770341",
    "name": "Geospatial analysis",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.7609594,
    "venue_count": 2,
    "avg_score": 0.69023985
  },
  {
    "id": "C2993191867",
    "name": "Cross disciplinary",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.76843121,
    "venue_count": 2,
    "avg_score": 0.6921078025
  },
  {
    "id": "C166422571",
    "name": "Typography",
    "level": 2,
    "total_papers": 4,
    "total_score": 3.6142867,
    "venue_count": 3,
    "avg_score": 0.903571675
  },
  {
    "id": "C41826821",
    "name": "Game Developer",
    "level": 3,
    "total_papers": 4,
    "total_score": 1.73178807,
    "venue_count": 3,
    "avg_score": 0.4329470175
  },
  {
    "id": "C205845201",
    "name": "Landscape architecture",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.41878713,
    "venue_count": 2,
    "avg_score": 0.6046967825
  },
  {
    "id": "C2778770139",
    "name": "Solver",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.62793759,
    "venue_count": 1,
    "avg_score": 0.6569843975
  },
  {
    "id": "C2779521785",
    "name": "Geometry processing",
    "level": 3,
    "total_papers": 4,
    "total_score": 2.0859583,
    "venue_count": 1,
    "avg_score": 0.521489575
  },
  {
    "id": "C62064638",
    "name": "Design for manufacturability",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.8634979300000003,
    "venue_count": 1,
    "avg_score": 0.7158744825000001
  },
  {
    "id": "C3019099447",
    "name": "Tool path",
    "level": 3,
    "total_papers": 4,
    "total_score": 1.9058887,
    "venue_count": 1,
    "avg_score": 0.476472175
  },
  {
    "id": "C14166107",
    "name": "Net (polyhedron)",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.93176779,
    "venue_count": 1,
    "avg_score": 0.4829419475
  },
  {
    "id": "C57489055",
    "name": "Ellipsoid",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.25217671,
    "venue_count": 1,
    "avg_score": 0.5630441775
  },
  {
    "id": "C163716315",
    "name": "Gaussian",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.71935064,
    "venue_count": 2,
    "avg_score": 0.42983766
  },
  {
    "id": "C3017433307",
    "name": "Lumbar spine",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.2562262100000003,
    "venue_count": 1,
    "avg_score": 0.5640565525000001
  },
  {
    "id": "C2778820510",
    "name": "Squat",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.8585551,
    "venue_count": 2,
    "avg_score": 0.714638775
  },
  {
    "id": "C2781145037",
    "name": "CINAHL",
    "level": 3,
    "total_papers": 4,
    "total_score": 2.70502852,
    "venue_count": 3,
    "avg_score": 0.67625713
  },
  {
    "id": "C2779549880",
    "name": "PsycINFO",
    "level": 3,
    "total_papers": 4,
    "total_score": 3.04800487,
    "venue_count": 3,
    "avg_score": 0.7620012175
  },
  {
    "id": "C21457203",
    "name": "Process automation system",
    "level": 3,
    "total_papers": 4,
    "total_score": 1.8235664600000001,
    "venue_count": 2,
    "avg_score": 0.45589161500000003
  },
  {
    "id": "C180016635",
    "name": "Compression (physics)",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.1265527300000002,
    "venue_count": 3,
    "avg_score": 0.5316381825000001
  },
  {
    "id": "C2983467063",
    "name": "Media arts",
    "level": 2,
    "total_papers": 4,
    "total_score": 2.0569585499999996,
    "venue_count": 1,
    "avg_score": 0.5142396374999999
  },
  {
    "id": "C68476402",
    "name": "Table of contents",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.8135039599999998,
    "venue_count": 1,
    "avg_score": 0.45337598999999995
  },
  {
    "id": "C143267671",
    "name": "User requirements document",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.8872973100000001,
    "venue_count": 3,
    "avg_score": 0.47182432750000003
  },
  {
    "id": "C108801101",
    "name": "Steganography",
    "level": 3,
    "total_papers": 4,
    "total_score": 2.4581242,
    "venue_count": 1,
    "avg_score": 0.61453105
  },
  {
    "id": "C2781285556",
    "name": "Learning styles",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.73448842,
    "venue_count": 1,
    "avg_score": 0.433622105
  },
  {
    "id": "C2780909375",
    "name": "Problem-based learning",
    "level": 2,
    "total_papers": 4,
    "total_score": 1.94865969,
    "venue_count": 2,
    "avg_score": 0.4871649225
  },
  {
    "id": "C2779617337",
    "name": "Soma",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.07018742,
    "venue_count": 1,
    "avg_score": 0.6900624733333333
  },
  {
    "id": "C2776674806",
    "name": "Mental illness",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.33331409,
    "venue_count": 2,
    "avg_score": 0.44443803
  },
  {
    "id": "C43126263",
    "name": "Source code",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.41742818,
    "venue_count": 2,
    "avg_score": 0.47247606
  },
  {
    "id": "C534262118",
    "name": "Medical diagnosis",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.48466018,
    "venue_count": 2,
    "avg_score": 0.4948867266666667
  },
  {
    "id": "C2780669880",
    "name": "Technoscience",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.98548925,
    "venue_count": 2,
    "avg_score": 0.66182975
  },
  {
    "id": "C66024118",
    "name": "Computational model",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.46194639,
    "venue_count": 2,
    "avg_score": 0.48731546333333337
  },
  {
    "id": "C200380349",
    "name": "Situated learning",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.45991627,
    "venue_count": 2,
    "avg_score": 0.4866387566666666
  },
  {
    "id": "C163286209",
    "name": "Performing arts",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.0859995,
    "venue_count": 2,
    "avg_score": 0.6953331666666666
  },
  {
    "id": "C2780129364",
    "name": "Distributive justice",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.7135546,
    "venue_count": 3,
    "avg_score": 0.5711848666666667
  },
  {
    "id": "C3019858935",
    "name": "Depressive symptoms",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.4627262,
    "venue_count": 3,
    "avg_score": 0.48757540000000005
  },
  {
    "id": "C3020672099",
    "name": "Longitudinal data",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.7185423000000002,
    "venue_count": 2,
    "avg_score": 0.5728474333333334
  },
  {
    "id": "C2991839931",
    "name": "Gender identity",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.6425696799999998,
    "venue_count": 2,
    "avg_score": 0.5475232266666666
  },
  {
    "id": "C2777737414",
    "name": "Font",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.77558734,
    "venue_count": 3,
    "avg_score": 0.92519578
  },
  {
    "id": "C176700471",
    "name": "Stereotaxy",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.52626091,
    "venue_count": 2,
    "avg_score": 0.5087536366666666
  },
  {
    "id": "C185656870",
    "name": "Technocracy",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.9125252000000001,
    "venue_count": 3,
    "avg_score": 0.6375084000000001
  },
  {
    "id": "C2776831358",
    "name": "Facilitator",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.12595891,
    "venue_count": 3,
    "avg_score": 0.70865297
  },
  {
    "id": "C103683099",
    "name": "Embodied agent",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.35955775,
    "venue_count": 3,
    "avg_score": 0.4531859166666667
  },
  {
    "id": "C2780422510",
    "name": "Humanity",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.64505866,
    "venue_count": 2,
    "avg_score": 0.5483528866666666
  },
  {
    "id": "C2993503261",
    "name": "Sense of control",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.76831007,
    "venue_count": 3,
    "avg_score": 0.58943669
  },
  {
    "id": "C74893574",
    "name": "Food systems",
    "level": 4,
    "total_papers": 3,
    "total_score": 1.29189903,
    "venue_count": 3,
    "avg_score": 0.43063301
  },
  {
    "id": "C2777082460",
    "name": "Early childhood",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.30429587,
    "venue_count": 3,
    "avg_score": 0.43476529
  },
  {
    "id": "C2777366796",
    "name": "Indeterminacy (philosophy)",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.7415470400000004,
    "venue_count": 2,
    "avg_score": 0.9138490133333335
  },
  {
    "id": "C2776728590",
    "name": "Contradiction",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.9384925499999999,
    "venue_count": 3,
    "avg_score": 0.6461641833333333
  },
  {
    "id": "C2778087770",
    "name": "Social support",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.5970058000000003,
    "venue_count": 3,
    "avg_score": 0.5323352666666668
  },
  {
    "id": "C171730128",
    "name": "Data file",
    "level": 2,
    "total_papers": 3,
    "total_score": 0,
    "venue_count": 3,
    "avg_score": 0
  },
  {
    "id": "C2780753109",
    "name": "Multi-touch",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.3849659,
    "venue_count": 3,
    "avg_score": 0.46165530000000005
  },
  {
    "id": "C194695470",
    "name": "Personal information management",
    "level": 4,
    "total_papers": 3,
    "total_score": 1.8600715,
    "venue_count": 2,
    "avg_score": 0.6200238333333333
  },
  {
    "id": "C101097943",
    "name": "Counterintuitive",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.13468587,
    "venue_count": 3,
    "avg_score": 0.7115619566666668
  },
  {
    "id": "C150202949",
    "name": "Pointer (user interface)",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.04596314,
    "venue_count": 3,
    "avg_score": 0.6819877133333333
  },
  {
    "id": "C2777655017",
    "name": "Toolbox",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.17255207,
    "venue_count": 3,
    "avg_score": 0.7241840233333333
  },
  {
    "id": "C151233233",
    "name": "Units of measurement",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.47148426,
    "venue_count": 3,
    "avg_score": 0.4904947533333333
  },
  {
    "id": "C2780023022",
    "name": "Compensation (psychology)",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.9625169100000002,
    "venue_count": 3,
    "avg_score": 0.6541723033333334
  },
  {
    "id": "C5339829",
    "name": "Machine vision",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.49329316,
    "venue_count": 3,
    "avg_score": 0.4977643866666666
  },
  {
    "id": "C183920142",
    "name": "Choreography",
    "level": 3,
    "total_papers": 3,
    "total_score": 2.1956946200000003,
    "venue_count": 3,
    "avg_score": 0.7318982066666667
  },
  {
    "id": "C2780329122",
    "name": "Fused deposition modeling",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.80100624,
    "venue_count": 2,
    "avg_score": 0.6003354133333333
  },
  {
    "id": "C514928085",
    "name": "Capitalism",
    "level": 3,
    "total_papers": 3,
    "total_score": 2.29980364,
    "venue_count": 3,
    "avg_score": 0.7666012133333333
  },
  {
    "id": "C2777432744",
    "name": "Compassion",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.01872543,
    "venue_count": 3,
    "avg_score": 0.6729084766666666
  },
  {
    "id": "C2780775679",
    "name": "Laughter",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.36932745,
    "venue_count": 3,
    "avg_score": 0.7897758166666667
  },
  {
    "id": "C9701087",
    "name": "Social engagement",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.33687195,
    "venue_count": 3,
    "avg_score": 0.4456239833333333
  },
  {
    "id": "C45384764",
    "name": "Requirements elicitation",
    "level": 4,
    "total_papers": 3,
    "total_score": 1.59805343,
    "venue_count": 3,
    "avg_score": 0.5326844766666666
  },
  {
    "id": "C2984334869",
    "name": "Customer service",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.29989642,
    "venue_count": 2,
    "avg_score": 0.4332988066666667
  },
  {
    "id": "C56397880",
    "name": "Intelligent decision support system",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.19084407,
    "venue_count": 3,
    "avg_score": 0.39694802333333334
  },
  {
    "id": "C25148115",
    "name": "Social competence",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.2573034500000002,
    "venue_count": 3,
    "avg_score": 0.4191011500000001
  },
  {
    "id": "C163214680",
    "name": "Olfaction",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.8497241599999998,
    "venue_count": 3,
    "avg_score": 0.6165747199999999
  },
  {
    "id": "C7863114",
    "name": "Mimicry",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.61856241,
    "venue_count": 3,
    "avg_score": 0.5395208033333333
  },
  {
    "id": "C26326936",
    "name": "Construal level theory",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.90648584,
    "venue_count": 2,
    "avg_score": 0.63549528
  },
  {
    "id": "C2986913963",
    "name": "Critical reflection",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.4030154000000001,
    "venue_count": 3,
    "avg_score": 0.4676718
  },
  {
    "id": "C2777716012",
    "name": "Dyad",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.5963879300000001,
    "venue_count": 3,
    "avg_score": 0.5321293100000001
  },
  {
    "id": "C164705383",
    "name": "Cardiology",
    "level": 1,
    "total_papers": 3,
    "total_score": 0.21728593,
    "venue_count": 3,
    "avg_score": 0.07242864333333333
  },
  {
    "id": "C59364581",
    "name": "Questionnaire",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.47888418,
    "venue_count": 3,
    "avg_score": 0.4929613933333334
  },
  {
    "id": "C122434488",
    "name": "Eye–hand coordination",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.7104779300000001,
    "venue_count": 3,
    "avg_score": 0.5701593100000001
  },
  {
    "id": "C151637689",
    "name": "Dwell time",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.65442162,
    "venue_count": 2,
    "avg_score": 0.5514738733333333
  },
  {
    "id": "C120107772",
    "name": "Discriminant validity",
    "level": 4,
    "total_papers": 3,
    "total_score": 1.57417797,
    "venue_count": 3,
    "avg_score": 0.52472599
  },
  {
    "id": "C128019096",
    "name": "Liquid-crystal display",
    "level": 2,
    "total_papers": 3,
    "total_score": 0.2074089,
    "venue_count": 3,
    "avg_score": 0.0691363
  },
  {
    "id": "C61123122",
    "name": "Politeness",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.9967236699999997,
    "venue_count": 3,
    "avg_score": 0.6655745566666665
  },
  {
    "id": "C3017957056",
    "name": "Game play",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.38961762,
    "venue_count": 3,
    "avg_score": 0.46320587333333335
  },
  {
    "id": "C36837802",
    "name": "Agile usability engineering",
    "level": 5,
    "total_papers": 3,
    "total_score": 1.71761439,
    "venue_count": 3,
    "avg_score": 0.57253813
  },
  {
    "id": "C87813535",
    "name": "Agile Unified Process",
    "level": 5,
    "total_papers": 3,
    "total_score": 1.79498143,
    "venue_count": 3,
    "avg_score": 0.5983271433333334
  },
  {
    "id": "C178253425",
    "name": "Visual perception",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.01770995,
    "venue_count": 3,
    "avg_score": 0.33923665
  },
  {
    "id": "C500499127",
    "name": "Ageing",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.41593838,
    "venue_count": 3,
    "avg_score": 0.47197946
  },
  {
    "id": "C63880386",
    "name": "Computer user satisfaction",
    "level": 4,
    "total_papers": 3,
    "total_score": 1.48029528,
    "venue_count": 3,
    "avg_score": 0.49343176
  },
  {
    "id": "C2909801347",
    "name": "Cognitive Intervention",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.47791254,
    "venue_count": 3,
    "avg_score": 0.49263751333333333
  },
  {
    "id": "C139366241",
    "name": "Interface design",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.36814263,
    "venue_count": 3,
    "avg_score": 0.4560475433333333
  },
  {
    "id": "C169699857",
    "name": "Quantum information",
    "level": 3,
    "total_papers": 3,
    "total_score": 0,
    "venue_count": 3,
    "avg_score": 0
  },
  {
    "id": "C2994309678",
    "name": "Food delivery",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.7974190700000001,
    "venue_count": 1,
    "avg_score": 0.59913969
  },
  {
    "id": "C2780623531",
    "name": "Irish",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.85530147,
    "venue_count": 2,
    "avg_score": 0.6184338233333333
  },
  {
    "id": "C100243477",
    "name": "Welfare",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.54577651,
    "venue_count": 2,
    "avg_score": 0.5152588366666667
  },
  {
    "id": "C49427245",
    "name": "Commons",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.61982911,
    "venue_count": 2,
    "avg_score": 0.5399430366666667
  },
  {
    "id": "C2778971194",
    "name": "Insider",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.41739299,
    "venue_count": 3,
    "avg_score": 0.47246433
  },
  {
    "id": "C83646750",
    "name": "Capital (architecture)",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.5749092500000001,
    "venue_count": 3,
    "avg_score": 0.52496975
  },
  {
    "id": "C196187386",
    "name": "Sociocultural evolution",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.8199589,
    "venue_count": 3,
    "avg_score": 0.6066529666666667
  },
  {
    "id": "C183759332",
    "name": "Action learning",
    "level": 4,
    "total_papers": 3,
    "total_score": 1.55972953,
    "venue_count": 3,
    "avg_score": 0.5199098433333333
  },
  {
    "id": "C2776854237",
    "name": "Information sharing",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.47057247,
    "venue_count": 3,
    "avg_score": 0.49019082333333336
  },
  {
    "id": "C177774035",
    "name": "Granularity",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.4239827,
    "venue_count": 2,
    "avg_score": 0.4746609
  },
  {
    "id": "C14669888",
    "name": "Creative visualization",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.42258665,
    "venue_count": 3,
    "avg_score": 0.47419554999999997
  },
  {
    "id": "C2777932401",
    "name": "Collective action",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.59410304,
    "venue_count": 3,
    "avg_score": 0.53136768
  },
  {
    "id": "C2776932993",
    "name": "Ethos",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.9231526100000003,
    "venue_count": 3,
    "avg_score": 0.64105087
  },
  {
    "id": "C29598333",
    "name": "Historiography",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.70416494,
    "venue_count": 2,
    "avg_score": 0.56805498
  },
  {
    "id": "C535291247",
    "name": "Amazon rainforest",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.01677176,
    "venue_count": 3,
    "avg_score": 0.6722572533333334
  },
  {
    "id": "C35219183",
    "name": "Portuguese",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.30653563,
    "venue_count": 3,
    "avg_score": 0.43551187666666663
  },
  {
    "id": "C109986646",
    "name": "Public policy",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.45286187,
    "venue_count": 3,
    "avg_score": 0.48428729
  },
  {
    "id": "C194541083",
    "name": "Workaround",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.25575568,
    "venue_count": 3,
    "avg_score": 0.75191856
  },
  {
    "id": "C10646191",
    "name": "Dialogical self",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.08758123,
    "venue_count": 3,
    "avg_score": 0.69586041
  },
  {
    "id": "C2777205345",
    "name": "Project team",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.33804965,
    "venue_count": 2,
    "avg_score": 0.44601655
  },
  {
    "id": "C5570062",
    "name": "Behavioural sciences",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.6833735,
    "venue_count": 2,
    "avg_score": 0.5611245
  },
  {
    "id": "C123108692",
    "name": "Social movement",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.59858484,
    "venue_count": 3,
    "avg_score": 0.5328616133333334
  },
  {
    "id": "C554579003",
    "name": "Collaborative software",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.78380552,
    "venue_count": 2,
    "avg_score": 0.59460184
  },
  {
    "id": "C3017588708",
    "name": "Audio visual",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.53058019,
    "venue_count": 2,
    "avg_score": 0.5101933966666666
  },
  {
    "id": "C2777375223",
    "name": "Service-dominant logic",
    "level": 3,
    "total_papers": 3,
    "total_score": 2.01975184,
    "venue_count": 3,
    "avg_score": 0.6732506133333334
  },
  {
    "id": "C87717796",
    "name": "Environmental engineering",
    "level": 1,
    "total_papers": 3,
    "total_score": 0,
    "venue_count": 3,
    "avg_score": 0
  },
  {
    "id": "C2776889888",
    "name": "Unintended consequences",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.36937575,
    "venue_count": 3,
    "avg_score": 0.4564585833333333
  },
  {
    "id": "C2777388388",
    "name": "Wage",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.58482349,
    "venue_count": 2,
    "avg_score": 0.5282744966666667
  },
  {
    "id": "C2779726722",
    "name": "Posthumanism",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.88831212,
    "venue_count": 1,
    "avg_score": 0.6294373733333333
  },
  {
    "id": "C2776493517",
    "name": "Seekers",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.70491983,
    "venue_count": 2,
    "avg_score": 0.5683066099999999
  },
  {
    "id": "C83030740",
    "name": "Organizational commitment",
    "level": 2,
    "total_papers": 3,
    "total_score": 0.40964001,
    "venue_count": 3,
    "avg_score": 0.13654667
  },
  {
    "id": "C2778562939",
    "name": "Synchronization (alternating current)",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.57028383,
    "venue_count": 3,
    "avg_score": 0.5234279433333333
  },
  {
    "id": "C202372285",
    "name": "Human resource management",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.48880336,
    "venue_count": 3,
    "avg_score": 0.49626778666666665
  },
  {
    "id": "C2776836400",
    "name": "Calculator",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.9856121,
    "venue_count": 3,
    "avg_score": 0.6618707
  },
  {
    "id": "C23677625",
    "name": "Psychophysiology",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.99548311,
    "venue_count": 3,
    "avg_score": 0.6651610366666666
  },
  {
    "id": "C13852961",
    "name": "Heartbeat",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.19120604,
    "venue_count": 3,
    "avg_score": 0.7304020133333333
  },
  {
    "id": "C15107229",
    "name": "Learning disability",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.48661118,
    "venue_count": 3,
    "avg_score": 0.49553706
  },
  {
    "id": "C2983586703",
    "name": "Cognitive disabilities",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.5123693500000002,
    "venue_count": 3,
    "avg_score": 0.5041231166666668
  },
  {
    "id": "C131419983",
    "name": "Deep time",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.06777939,
    "venue_count": 3,
    "avg_score": 0.6892597966666667
  },
  {
    "id": "C3020759390",
    "name": "Behaviour change",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.7462145099999997,
    "venue_count": 3,
    "avg_score": 0.5820715033333332
  },
  {
    "id": "C120452360",
    "name": "Nature versus nurture",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.6074785,
    "venue_count": 2,
    "avg_score": 0.5358261666666667
  },
  {
    "id": "C2781092381",
    "name": "Hoarding (animal behavior)",
    "level": 3,
    "total_papers": 3,
    "total_score": 2.6826439,
    "venue_count": 3,
    "avg_score": 0.8942146333333333
  },
  {
    "id": "C3017650416",
    "name": "Feeding behavior",
    "level": 2,
    "total_papers": 3,
    "total_score": 0,
    "venue_count": 3,
    "avg_score": 0
  },
  {
    "id": "C197947376",
    "name": "Comparability",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.20814274,
    "venue_count": 3,
    "avg_score": 0.73604758
  },
  {
    "id": "C65440619",
    "name": "Atmosphere (unit)",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.78424035,
    "venue_count": 2,
    "avg_score": 0.5947467833333333
  },
  {
    "id": "C55020928",
    "name": "Image quality",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.5665277,
    "venue_count": 2,
    "avg_score": 0.5221759
  },
  {
    "id": "C8652668",
    "name": "Robot end effector",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.40339935,
    "venue_count": 2,
    "avg_score": 0.46779978333333333
  },
  {
    "id": "C3770464",
    "name": "Smoothing",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.71236694,
    "venue_count": 2,
    "avg_score": 0.57078898
  },
  {
    "id": "C171268870",
    "name": "GRASP",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.0202966499999997,
    "venue_count": 3,
    "avg_score": 0.6734322166666665
  },
  {
    "id": "C124681953",
    "name": "Decomposition",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.5340312699999998,
    "venue_count": 2,
    "avg_score": 0.5113437566666666
  },
  {
    "id": "C40231798",
    "name": "Composition (language)",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.6005396,
    "venue_count": 3,
    "avg_score": 0.5335132
  },
  {
    "id": "C33724603",
    "name": "Bayesian network",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.20240137,
    "venue_count": 3,
    "avg_score": 0.4008004566666667
  },
  {
    "id": "C116390426",
    "name": "Photoplethysmogram",
    "level": 3,
    "total_papers": 3,
    "total_score": 2.55411573,
    "venue_count": 2,
    "avg_score": 0.85137191
  },
  {
    "id": "C173906292",
    "name": "Gait analysis",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.40826448,
    "venue_count": 3,
    "avg_score": 0.46942149333333333
  },
  {
    "id": "C2780813799",
    "name": "Zero (linguistics)",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.37247345,
    "venue_count": 3,
    "avg_score": 0.45749115
  },
  {
    "id": "C98083399",
    "name": "Underwater",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.48102753,
    "venue_count": 3,
    "avg_score": 0.8270091766666666
  },
  {
    "id": "C148063708",
    "name": "Channel state information",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.59131189,
    "venue_count": 2,
    "avg_score": 0.5304372966666667
  },
  {
    "id": "C141353440",
    "name": "Fuse (electrical)",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.94207304,
    "venue_count": 3,
    "avg_score": 0.6473576799999999
  },
  {
    "id": "C139140526",
    "name": "Job design",
    "level": 4,
    "total_papers": 3,
    "total_score": 1.50480102,
    "venue_count": 3,
    "avg_score": 0.50160034
  },
  {
    "id": "C207467116",
    "name": "Inverse",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.5913295600000001,
    "venue_count": 2,
    "avg_score": 0.5304431866666667
  },
  {
    "id": "C139945424",
    "name": "Mean squared error",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.7320632000000002,
    "venue_count": 2,
    "avg_score": 0.5773544
  },
  {
    "id": "C165021410",
    "name": "Lossy compression",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.8788133,
    "venue_count": 2,
    "avg_score": 0.6262711
  },
  {
    "id": "C143724316",
    "name": "Series (stratigraphy)",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.76112932,
    "venue_count": 3,
    "avg_score": 0.5870431066666667
  },
  {
    "id": "C83849319",
    "name": "Rating scale",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.48943467,
    "venue_count": 3,
    "avg_score": 0.49647822333333336
  },
  {
    "id": "C160521178",
    "name": "Computational trust",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.4045307999999999,
    "venue_count": 3,
    "avg_score": 0.46817693333333327
  },
  {
    "id": "C26486553",
    "name": "Stimulus modality",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.4799964,
    "venue_count": 3,
    "avg_score": 0.49333213333333337
  },
  {
    "id": "C12380541",
    "name": "Geovisualization",
    "level": 4,
    "total_papers": 3,
    "total_score": 1.53318817,
    "venue_count": 3,
    "avg_score": 0.5110627233333334
  },
  {
    "id": "C83665646",
    "name": "Feature vector",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.6505297,
    "venue_count": 3,
    "avg_score": 0.5501765666666667
  },
  {
    "id": "C2776890885",
    "name": "Vital signs",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.95623115,
    "venue_count": 3,
    "avg_score": 0.65207705
  },
  {
    "id": "C166961238",
    "name": "Air traffic control",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.7570999999999999,
    "venue_count": 3,
    "avg_score": 0.5857
  },
  {
    "id": "C2779439875",
    "name": "Natural language understanding",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.33553043,
    "venue_count": 3,
    "avg_score": 0.44517681
  },
  {
    "id": "C93226319",
    "name": "Differential (mechanical device)",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.7649432200000001,
    "venue_count": 3,
    "avg_score": 0.5883144066666667
  },
  {
    "id": "C10551718",
    "name": "Data pre-processing",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.38602988,
    "venue_count": 3,
    "avg_score": 0.46200996
  },
  {
    "id": "C9679016",
    "name": "Principle of maximum entropy",
    "level": 2,
    "total_papers": 3,
    "total_score": 0.89860003,
    "venue_count": 3,
    "avg_score": 0.2995333433333333
  },
  {
    "id": "C158693339",
    "name": "Eigenvalues and eigenvectors",
    "level": 2,
    "total_papers": 3,
    "total_score": 0.6152032,
    "venue_count": 2,
    "avg_score": 0.2050677333333333
  },
  {
    "id": "C2983447183",
    "name": "Low vision",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.44489747,
    "venue_count": 3,
    "avg_score": 0.48163248999999997
  },
  {
    "id": "C146599234",
    "name": "Centroid",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.64006285,
    "venue_count": 3,
    "avg_score": 0.5466876166666667
  },
  {
    "id": "C2780069185",
    "name": "Equivalence (formal languages)",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.6913348099999999,
    "venue_count": 3,
    "avg_score": 0.5637782699999999
  },
  {
    "id": "C86532276",
    "name": "Delegation",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.22623311,
    "venue_count": 3,
    "avg_score": 0.7420777033333333
  },
  {
    "id": "C171878925",
    "name": "Cave",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.9040131599999999,
    "venue_count": 3,
    "avg_score": 0.6346710533333333
  },
  {
    "id": "C161615301",
    "name": "Keystroke logging",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.43428063,
    "venue_count": 3,
    "avg_score": 0.8114268766666667
  },
  {
    "id": "C79540074",
    "name": "Keystroke dynamics",
    "level": 4,
    "total_papers": 3,
    "total_score": 1.7948089299999999,
    "venue_count": 3,
    "avg_score": 0.5982696433333333
  },
  {
    "id": "C4957475",
    "name": "S/KEY",
    "level": 3,
    "total_papers": 3,
    "total_score": 0.6090449,
    "venue_count": 3,
    "avg_score": 0.20301496666666666
  },
  {
    "id": "C114938261",
    "name": "Signage",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.59368431,
    "venue_count": 2,
    "avg_score": 0.8645614366666666
  },
  {
    "id": "C98369314",
    "name": "Narratology",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.76014687,
    "venue_count": 2,
    "avg_score": 0.5867156233333334
  },
  {
    "id": "C54039966",
    "name": "Stress management",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.4664245900000001,
    "venue_count": 3,
    "avg_score": 0.4888081966666667
  },
  {
    "id": "C2776960227",
    "name": "Knowledge transfer",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.56243108,
    "venue_count": 3,
    "avg_score": 0.52081036
  },
  {
    "id": "C2985890590",
    "name": "Digital inclusion",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.6613473300000001,
    "venue_count": 2,
    "avg_score": 0.5537824433333334
  },
  {
    "id": "C2779754051",
    "name": "Interactive storytelling",
    "level": 4,
    "total_papers": 3,
    "total_score": 1.45370276,
    "venue_count": 2,
    "avg_score": 0.4845675866666667
  },
  {
    "id": "C2776977519",
    "name": "3D interaction",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.69015862,
    "venue_count": 3,
    "avg_score": 0.5633862066666667
  },
  {
    "id": "C2776900844",
    "name": "Witness",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.32969333,
    "venue_count": 2,
    "avg_score": 0.7765644433333333
  },
  {
    "id": "C144348335",
    "name": "Kinship",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.81039912,
    "venue_count": 3,
    "avg_score": 0.6034663733333333
  },
  {
    "id": "C89429830",
    "name": "Scaffold",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.82381094,
    "venue_count": 3,
    "avg_score": 0.60793698
  },
  {
    "id": "C86297840",
    "name": "Interactive design",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.56837639,
    "venue_count": 3,
    "avg_score": 0.52279213
  },
  {
    "id": "C2777801307",
    "name": "Spelling",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.13567706,
    "venue_count": 3,
    "avg_score": 0.7118923533333333
  },
  {
    "id": "C203043789",
    "name": "Digital economy",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.35121679,
    "venue_count": 3,
    "avg_score": 0.4504055966666667
  },
  {
    "id": "C2779494480",
    "name": "Information Dissemination",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.7337432000000002,
    "venue_count": 3,
    "avg_score": 0.5779144
  },
  {
    "id": "C2778156053",
    "name": "Flipped classroom",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.34549049,
    "venue_count": 3,
    "avg_score": 0.44849683
  },
  {
    "id": "C12505134",
    "name": "Positive psychology",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.37765084,
    "venue_count": 3,
    "avg_score": 0.4592169466666667
  },
  {
    "id": "C59046462",
    "name": "Scrolling",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.79166356,
    "venue_count": 3,
    "avg_score": 0.5972211866666667
  },
  {
    "id": "C200518788",
    "name": "Hough transform",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.63228517,
    "venue_count": 2,
    "avg_score": 0.5440950566666667
  },
  {
    "id": "C53533937",
    "name": "Histogram",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.6063441,
    "venue_count": 2,
    "avg_score": 0.5354480333333334
  },
  {
    "id": "C14838553",
    "name": "Search analytics",
    "level": 4,
    "total_papers": 3,
    "total_score": 1.6001537199999998,
    "venue_count": 3,
    "avg_score": 0.5333845733333332
  },
  {
    "id": "C164120249",
    "name": "Web search query",
    "level": 3,
    "total_papers": 3,
    "total_score": 0.86698565,
    "venue_count": 3,
    "avg_score": 0.28899521666666667
  },
  {
    "id": "C20556612",
    "name": "Volume (thermodynamics)",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.6534535300000002,
    "venue_count": 2,
    "avg_score": 0.5511511766666667
  },
  {
    "id": "C2778838397",
    "name": "Uses and gratifications theory",
    "level": 3,
    "total_papers": 3,
    "total_score": 2.12922896,
    "venue_count": 2,
    "avg_score": 0.7097429866666666
  },
  {
    "id": "C2776354556",
    "name": "Health information technology",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.3462098500000002,
    "venue_count": 3,
    "avg_score": 0.4487366166666667
  },
  {
    "id": "C98495876",
    "name": "Digital marketing",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.2266419100000001,
    "venue_count": 3,
    "avg_score": 0.4088806366666667
  },
  {
    "id": "C55282118",
    "name": "Snapshot (computer storage)",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.95517667,
    "venue_count": 3,
    "avg_score": 0.6517255566666666
  },
  {
    "id": "C2776892586",
    "name": "Brand engagement",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.54485852,
    "venue_count": 3,
    "avg_score": 0.51495284
  },
  {
    "id": "C152455256",
    "name": "Brand awareness",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.5955019099999999,
    "venue_count": 3,
    "avg_score": 0.53183397
  },
  {
    "id": "C2778772087",
    "name": "Gratification",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.41969438,
    "venue_count": 3,
    "avg_score": 0.8065647933333334
  },
  {
    "id": "C99844830",
    "name": "Scaling",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.44418482,
    "venue_count": 3,
    "avg_score": 0.48139494
  },
  {
    "id": "C188688815",
    "name": "Pluralistic walkthrough",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.6409183999999999,
    "venue_count": 3,
    "avg_score": 0.5469727999999999
  },
  {
    "id": "C99394141",
    "name": "Great Rift",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.9831845499999998,
    "venue_count": 3,
    "avg_score": 0.6610615166666666
  },
  {
    "id": "C132758656",
    "name": "Dreyfus model of skill acquisition",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.63869744,
    "venue_count": 2,
    "avg_score": 0.54623248
  },
  {
    "id": "C204017024",
    "name": "Optimism",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.418711,
    "venue_count": 2,
    "avg_score": 0.806237
  },
  {
    "id": "C10431821",
    "name": "Learning effect",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.36464318,
    "venue_count": 3,
    "avg_score": 0.45488106
  },
  {
    "id": "C2778956030",
    "name": "Cold start (automotive)",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.19230733,
    "venue_count": 1,
    "avg_score": 0.7307691100000001
  },
  {
    "id": "C86037889",
    "name": "Learning to rank",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.29175733,
    "venue_count": 1,
    "avg_score": 0.4305857766666667
  },
  {
    "id": "C2780700307",
    "name": "Independent living",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.50591174,
    "venue_count": 2,
    "avg_score": 0.5019705799999999
  },
  {
    "id": "C2781306805",
    "name": "Argumentative",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.4060619,
    "venue_count": 2,
    "avg_score": 0.8020206333333334
  },
  {
    "id": "C129361004",
    "name": "Profitability index",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.92273425,
    "venue_count": 2,
    "avg_score": 0.6409114166666666
  },
  {
    "id": "C48209547",
    "name": "Controllability",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.62332269,
    "venue_count": 3,
    "avg_score": 0.5411075633333333
  },
  {
    "id": "C2987255567",
    "name": "Knowledge graph",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.55107357,
    "venue_count": 3,
    "avg_score": 0.5170245233333334
  },
  {
    "id": "C176730311",
    "name": "Multiple choice",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.27435589,
    "venue_count": 2,
    "avg_score": 0.4247852966666667
  },
  {
    "id": "C10090317",
    "name": "Social cue",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.55149293,
    "venue_count": 3,
    "avg_score": 0.51716431
  },
  {
    "id": "C159877910",
    "name": "Autoregressive model",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.03871307,
    "venue_count": 3,
    "avg_score": 0.6795710233333333
  },
  {
    "id": "C2780801066",
    "name": "Hearing aid",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.7718807699999999,
    "venue_count": 3,
    "avg_score": 0.5906269233333333
  },
  {
    "id": "C27574286",
    "name": "Variables",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.34345367,
    "venue_count": 3,
    "avg_score": 0.44781789
  },
  {
    "id": "C2777790407",
    "name": "Flight training",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.38639373,
    "venue_count": 2,
    "avg_score": 0.46213124333333333
  },
  {
    "id": "C20353970",
    "name": "Simple random sample",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.36702994,
    "venue_count": 3,
    "avg_score": 0.4556766466666667
  },
  {
    "id": "C2778827112",
    "name": "Feature engineering",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.73570957,
    "venue_count": 1,
    "avg_score": 0.5785698566666667
  },
  {
    "id": "C19768560",
    "name": "Dependency (UML)",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.3308407199999999,
    "venue_count": 1,
    "avg_score": 0.4436135733333333
  },
  {
    "id": "C2780051608",
    "name": "Major depressive disorder",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.68911764,
    "venue_count": 1,
    "avg_score": 0.5630392133333334
  },
  {
    "id": "C137293760",
    "name": "Language model",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.3058009099999999,
    "venue_count": 2,
    "avg_score": 0.43526697
  },
  {
    "id": "C190470478",
    "name": "Invariant (physics)",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.37192245,
    "venue_count": 2,
    "avg_score": 0.4573074833333333
  },
  {
    "id": "C2776207355",
    "name": "Sarcasm",
    "level": 3,
    "total_papers": 3,
    "total_score": 2.51735806,
    "venue_count": 2,
    "avg_score": 0.8391193533333333
  },
  {
    "id": "C2779975665",
    "name": "Irony",
    "level": 2,
    "total_papers": 3,
    "total_score": 0.39443680999999997,
    "venue_count": 2,
    "avg_score": 0.13147893666666666
  },
  {
    "id": "C2776141551",
    "name": "Emotion perception",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.25155894,
    "venue_count": 2,
    "avg_score": 0.41718631333333334
  },
  {
    "id": "C190812933",
    "name": "Chart",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.29111072,
    "venue_count": 3,
    "avg_score": 0.43037024
  },
  {
    "id": "C2779808786",
    "name": "Locality",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.7426152899999998,
    "venue_count": 3,
    "avg_score": 0.5808717633333332
  },
  {
    "id": "C48145219",
    "name": "Security token",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.9655007,
    "venue_count": 3,
    "avg_score": 0.6551669
  },
  {
    "id": "C177769412",
    "name": "Prior probability",
    "level": 3,
    "total_papers": 3,
    "total_score": 2.01247934,
    "venue_count": 2,
    "avg_score": 0.6708264466666667
  },
  {
    "id": "C45942800",
    "name": "Ensemble learning",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.4768128900000002,
    "venue_count": 3,
    "avg_score": 0.49227096333333337
  },
  {
    "id": "C9357733",
    "name": "Missing data",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.32469055,
    "venue_count": 3,
    "avg_score": 0.44156351666666666
  },
  {
    "id": "C88799230",
    "name": "Three-dimensional face recognition",
    "level": 5,
    "total_papers": 3,
    "total_score": 1.6420744899999997,
    "venue_count": 3,
    "avg_score": 0.5473581633333332
  },
  {
    "id": "C34388435",
    "name": "Bounded function",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.43615625,
    "venue_count": 2,
    "avg_score": 0.47871875
  },
  {
    "id": "C108154423",
    "name": "Salience (neuroscience)",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.3747347,
    "venue_count": 3,
    "avg_score": 0.4582449
  },
  {
    "id": "C2780580889",
    "name": "Panorama",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.8184959000000003,
    "venue_count": 2,
    "avg_score": 0.9394986333333334
  },
  {
    "id": "C2781118164",
    "name": "Chronic pain",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.43609336,
    "venue_count": 2,
    "avg_score": 0.4786977866666667
  },
  {
    "id": "C557531904",
    "name": "Firefighting",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.71630671,
    "venue_count": 2,
    "avg_score": 0.5721022366666667
  },
  {
    "id": "C2776060345",
    "name": "Rumination",
    "level": 3,
    "total_papers": 3,
    "total_score": 2.28048295,
    "venue_count": 3,
    "avg_score": 0.7601609833333334
  },
  {
    "id": "C2778251122",
    "name": "Exposure therapy",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.5965886999999999,
    "venue_count": 3,
    "avg_score": 0.5321962333333333
  },
  {
    "id": "C513985346",
    "name": "Virtualization",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.7819825199999997,
    "venue_count": 3,
    "avg_score": 0.5939941733333333
  },
  {
    "id": "C2775937380",
    "name": "Replica",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.45615749,
    "venue_count": 3,
    "avg_score": 0.48538583
  },
  {
    "id": "C164086593",
    "name": "Stylus",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.3151044699999996,
    "venue_count": 3,
    "avg_score": 0.7717014899999999
  },
  {
    "id": "C14216870",
    "name": "Neuropsychology",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.51441544,
    "venue_count": 3,
    "avg_score": 0.5048051466666666
  },
  {
    "id": "C162967406",
    "name": "Stroop effect",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.8826043700000001,
    "venue_count": 3,
    "avg_score": 0.62753479
  },
  {
    "id": "C126669455",
    "name": "Teleconference",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.4614774,
    "venue_count": 3,
    "avg_score": 0.4871591333333333
  },
  {
    "id": "C32362775",
    "name": "Self-control",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.27685076,
    "venue_count": 1,
    "avg_score": 0.42561692
  },
  {
    "id": "C2778515922",
    "name": "Computer-supported collaborative learning",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.33241362,
    "venue_count": 2,
    "avg_score": 0.4441378733333334
  },
  {
    "id": "C516187249",
    "name": "Web analytics",
    "level": 5,
    "total_papers": 3,
    "total_score": 1.2930934399999998,
    "venue_count": 2,
    "avg_score": 0.4310311466666666
  },
  {
    "id": "C88519622",
    "name": "Emotional exhaustion",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.57225203,
    "venue_count": 2,
    "avg_score": 0.52408401
  },
  {
    "id": "C2776298855",
    "name": "Ostracism",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.5917916300000003,
    "venue_count": 2,
    "avg_score": 0.8639305433333334
  },
  {
    "id": "C2781424646",
    "name": "SWORD",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.4538633,
    "venue_count": 2,
    "avg_score": 0.8179544333333334
  },
  {
    "id": "C201717286",
    "name": "Rationality",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.21991701,
    "venue_count": 2,
    "avg_score": 0.7399723366666667
  },
  {
    "id": "C122308676",
    "name": "Decision-making",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.29654989,
    "venue_count": 3,
    "avg_score": 0.4321832966666667
  },
  {
    "id": "C194943564",
    "name": "Participant observation",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.26588127,
    "venue_count": 3,
    "avg_score": 0.42196042333333333
  },
  {
    "id": "C177605951",
    "name": "Herding",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.5528764,
    "venue_count": 3,
    "avg_score": 0.5176254666666666
  },
  {
    "id": "C97137747",
    "name": "Forestry",
    "level": 1,
    "total_papers": 3,
    "total_score": 0.14467072,
    "venue_count": 2,
    "avg_score": 0.04822357333333333
  },
  {
    "id": "C93474598",
    "name": "Information ethics",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.32344626,
    "venue_count": 3,
    "avg_score": 0.44114875333333337
  },
  {
    "id": "C135068731",
    "name": "The Imaginary",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.59637284,
    "venue_count": 3,
    "avg_score": 0.8654576133333333
  },
  {
    "id": "C172256602",
    "name": "Social exchange theory",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.6069883699999998,
    "venue_count": 3,
    "avg_score": 0.5356627899999999
  },
  {
    "id": "C2777723229",
    "name": "Learnability",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.07356967,
    "venue_count": 3,
    "avg_score": 0.69118989
  },
  {
    "id": "C2779356329",
    "name": "Checklist",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.8436371,
    "venue_count": 3,
    "avg_score": 0.6145457
  },
  {
    "id": "C2779495148",
    "name": "Delphi",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.53901818,
    "venue_count": 2,
    "avg_score": 0.51300606
  },
  {
    "id": "C172467417",
    "name": "Neurocognitive",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.88976953,
    "venue_count": 2,
    "avg_score": 0.6299231766666666
  },
  {
    "id": "C2780015235",
    "name": "Microsimulation",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.45947327,
    "venue_count": 1,
    "avg_score": 0.8198244233333334
  },
  {
    "id": "C2779208394",
    "name": "Participatory sensing",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.5148094300000001,
    "venue_count": 2,
    "avg_score": 0.5049364766666667
  },
  {
    "id": "C47796450",
    "name": "Intelligent transportation system",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.5593929599999998,
    "venue_count": 2,
    "avg_score": 0.5197976533333333
  },
  {
    "id": "C141141315",
    "name": "Guard (computer science)",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.6869677199999997,
    "venue_count": 2,
    "avg_score": 0.5623225733333332
  },
  {
    "id": "C179768478",
    "name": "Cyber-physical system",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.7843353999999998,
    "venue_count": 2,
    "avg_score": 0.5947784666666666
  },
  {
    "id": "C153876917",
    "name": "Traceability",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.9319870799999999,
    "venue_count": 3,
    "avg_score": 0.6439956933333333
  },
  {
    "id": "C99138194",
    "name": "Hash function",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.3459113200000001,
    "venue_count": 2,
    "avg_score": 0.44863710666666673
  },
  {
    "id": "C33884865",
    "name": "Cryptographic protocol",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.21197028,
    "venue_count": 2,
    "avg_score": 0.40399009333333336
  },
  {
    "id": "C113162765",
    "name": "Contact tracing",
    "level": 5,
    "total_papers": 3,
    "total_score": 2.50298011,
    "venue_count": 3,
    "avg_score": 0.8343267033333334
  },
  {
    "id": "C2778156585",
    "name": "Relay",
    "level": 3,
    "total_papers": 3,
    "total_score": 2.1181128,
    "venue_count": 3,
    "avg_score": 0.7060376
  },
  {
    "id": "C3090818",
    "name": "General Data Protection Regulation",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.7976804,
    "venue_count": 3,
    "avg_score": 0.5992268
  },
  {
    "id": "C69360830",
    "name": "Data Protection Act 1998",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.20907287,
    "venue_count": 3,
    "avg_score": 0.40302429
  },
  {
    "id": "C58973888",
    "name": "Semi-supervised learning",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.34735293,
    "venue_count": 3,
    "avg_score": 0.4491176433333333
  },
  {
    "id": "C2776687071",
    "name": "Destinations",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.62303154,
    "venue_count": 3,
    "avg_score": 0.5410105133333333
  },
  {
    "id": "C70721500",
    "name": "Computational biology",
    "level": 1,
    "total_papers": 3,
    "total_score": 0.83788522,
    "venue_count": 2,
    "avg_score": 0.2792950733333333
  },
  {
    "id": "C2778464652",
    "name": "Open research",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.5244945799999998,
    "venue_count": 2,
    "avg_score": 0.5081648599999999
  },
  {
    "id": "C162319229",
    "name": "Data structure",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.3465240299999999,
    "venue_count": 2,
    "avg_score": 0.4488413433333333
  },
  {
    "id": "C2780967490",
    "name": "Mobile malware",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.49957001,
    "venue_count": 2,
    "avg_score": 0.49985667
  },
  {
    "id": "C54108766",
    "name": "Packet loss",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.4026021,
    "venue_count": 3,
    "avg_score": 0.4675340333333333
  },
  {
    "id": "C2778745096",
    "name": "Dignity",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.92283443,
    "venue_count": 3,
    "avg_score": 0.64094481
  },
  {
    "id": "C165136773",
    "name": "Single point of failure",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.87715672,
    "venue_count": 2,
    "avg_score": 0.6257189066666666
  },
  {
    "id": "C54276265",
    "name": "Video game development",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.3987142399999999,
    "venue_count": 3,
    "avg_score": 0.46623807999999994
  },
  {
    "id": "C3017619522",
    "name": "Smartphone app",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.66120747,
    "venue_count": 2,
    "avg_score": 0.5537358233333333
  },
  {
    "id": "C2776999362",
    "name": "Planner",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.46899334,
    "venue_count": 3,
    "avg_score": 0.48966444666666664
  },
  {
    "id": "C162462552",
    "name": "Portrait",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.1938261299999997,
    "venue_count": 2,
    "avg_score": 0.7312753766666665
  },
  {
    "id": "C2776061582",
    "name": "Mobile edge computing",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.72495199,
    "venue_count": 2,
    "avg_score": 0.5749839966666667
  },
  {
    "id": "C202889954",
    "name": "Subjectivity",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.90469755,
    "venue_count": 3,
    "avg_score": 0.6348991833333334
  },
  {
    "id": "C2776376669",
    "name": "Intensive care unit",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.83475134,
    "venue_count": 2,
    "avg_score": 0.61158378
  },
  {
    "id": "C94284585",
    "name": "Random oracle",
    "level": 4,
    "total_papers": 3,
    "total_score": 1.52977794,
    "venue_count": 2,
    "avg_score": 0.50992598
  },
  {
    "id": "C13355873",
    "name": "Connection (principal bundle)",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.6768108899999998,
    "venue_count": 3,
    "avg_score": 0.5589369633333333
  },
  {
    "id": "C2780560020",
    "name": "License",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.13082285,
    "venue_count": 3,
    "avg_score": 0.7102742833333333
  },
  {
    "id": "C126780896",
    "name": "Distortion (music)",
    "level": 4,
    "total_papers": 3,
    "total_score": 1.5242568300000001,
    "venue_count": 3,
    "avg_score": 0.5080856100000001
  },
  {
    "id": "C194257627",
    "name": "Amplifier",
    "level": 3,
    "total_papers": 3,
    "total_score": 0,
    "venue_count": 3,
    "avg_score": 0
  },
  {
    "id": "C2779950589",
    "name": "Smart contract",
    "level": 3,
    "total_papers": 3,
    "total_score": 2.00264237,
    "venue_count": 1,
    "avg_score": 0.6675474566666666
  },
  {
    "id": "C40128228",
    "name": "Ant colony optimization algorithms",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.6774987099999998,
    "venue_count": 1,
    "avg_score": 0.5591662366666666
  },
  {
    "id": "C138959212",
    "name": "Load balancing (electrical power)",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.64731585,
    "venue_count": 1,
    "avg_score": 0.5491052833333333
  },
  {
    "id": "C2989133298",
    "name": "Android malware",
    "level": 3,
    "total_papers": 3,
    "total_score": 2.2336823,
    "venue_count": 1,
    "avg_score": 0.7445607666666666
  },
  {
    "id": "C2781041963",
    "name": "Computation offloading",
    "level": 4,
    "total_papers": 3,
    "total_score": 1.95119989,
    "venue_count": 1,
    "avg_score": 0.6503999633333334
  },
  {
    "id": "C2986652147",
    "name": "Fog computing",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.74659825,
    "venue_count": 1,
    "avg_score": 0.5821994166666666
  },
  {
    "id": "C2776384856",
    "name": "Trust management (information system)",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.26198205,
    "venue_count": 2,
    "avg_score": 0.7539940166666667
  },
  {
    "id": "C2983222225",
    "name": "Consensus algorithm",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.76925737,
    "venue_count": 2,
    "avg_score": 0.5897524566666666
  },
  {
    "id": "C21880701",
    "name": "Process engineering",
    "level": 1,
    "total_papers": 3,
    "total_score": 0.5731493400000001,
    "venue_count": 3,
    "avg_score": 0.19104978000000003
  },
  {
    "id": "C192448918",
    "name": "Vehicular ad hoc network",
    "level": 4,
    "total_papers": 3,
    "total_score": 1.67744435,
    "venue_count": 2,
    "avg_score": 0.5591481166666666
  },
  {
    "id": "C97686452",
    "name": "Static analysis",
    "level": 2,
    "total_papers": 3,
    "total_score": 0.53951514,
    "venue_count": 2,
    "avg_score": 0.17983838
  },
  {
    "id": "C132868160",
    "name": "MQTT",
    "level": 3,
    "total_papers": 3,
    "total_score": 2.46510888,
    "venue_count": 2,
    "avg_score": 0.82170296
  },
  {
    "id": "C137836250",
    "name": "Optimization problem",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.26212922,
    "venue_count": 2,
    "avg_score": 0.42070974
  },
  {
    "id": "C197352329",
    "name": "Citizen science",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.38731388,
    "venue_count": 3,
    "avg_score": 0.46243796
  },
  {
    "id": "C2776946740",
    "name": "Deliberation",
    "level": 3,
    "total_papers": 3,
    "total_score": 2.01048961,
    "venue_count": 1,
    "avg_score": 0.6701632033333333
  },
  {
    "id": "C76509639",
    "name": "Race (biology)",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.7960523800000001,
    "venue_count": 3,
    "avg_score": 0.5986841266666667
  },
  {
    "id": "C2778080475",
    "name": "Health communication",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.49859205,
    "venue_count": 3,
    "avg_score": 0.49953068333333334
  },
  {
    "id": "C125209513",
    "name": "Doors",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.02690504,
    "venue_count": 3,
    "avg_score": 0.6756350133333333
  },
  {
    "id": "C2776788475",
    "name": "Occupational stress",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.35412412,
    "venue_count": 3,
    "avg_score": 0.4513747066666667
  },
  {
    "id": "C41458344",
    "name": "Publication",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.8193060499999998,
    "venue_count": 3,
    "avg_score": 0.6064353499999999
  },
  {
    "id": "C201280247",
    "name": "Newspaper",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.2485682000000002,
    "venue_count": 3,
    "avg_score": 0.7495227333333334
  },
  {
    "id": "C2985487447",
    "name": "Instant messaging",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.23461866,
    "venue_count": 2,
    "avg_score": 0.7448728866666667
  },
  {
    "id": "C93692415",
    "name": "Thematic map",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.66300859,
    "venue_count": 2,
    "avg_score": 0.5543361966666667
  },
  {
    "id": "C46304622",
    "name": "Certification",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.57347283,
    "venue_count": 3,
    "avg_score": 0.5244909433333333
  },
  {
    "id": "C2986817661",
    "name": "Research methodology",
    "level": 3,
    "total_papers": 3,
    "total_score": 0.8922327400000001,
    "venue_count": 2,
    "avg_score": 0.29741091333333336
  },
  {
    "id": "C100906024",
    "name": "Poisson distribution",
    "level": 2,
    "total_papers": 3,
    "total_score": 0.489534,
    "venue_count": 3,
    "avg_score": 0.16317800000000002
  },
  {
    "id": "C165148211",
    "name": "Social inequality",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.46208023,
    "venue_count": 2,
    "avg_score": 0.48736007666666664
  },
  {
    "id": "C199343813",
    "name": "Dentistry",
    "level": 1,
    "total_papers": 3,
    "total_score": 0.07386306,
    "venue_count": 2,
    "avg_score": 0.024621019999999997
  },
  {
    "id": "C2778308277",
    "name": "21st century skills",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.77767053,
    "venue_count": 2,
    "avg_score": 0.5925568433333334
  },
  {
    "id": "C132074034",
    "name": "Congruence (geometry)",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.1061907,
    "venue_count": 3,
    "avg_score": 0.7020635666666667
  },
  {
    "id": "C91586092",
    "name": "Atmospheric sciences",
    "level": 1,
    "total_papers": 3,
    "total_score": 0.211856454,
    "venue_count": 2,
    "avg_score": 0.070618818
  },
  {
    "id": "C152223200",
    "name": "Smart environment",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.3973364,
    "venue_count": 2,
    "avg_score": 0.4657788
  },
  {
    "id": "C198446146",
    "name": "Chemistry education",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.40007138,
    "venue_count": 3,
    "avg_score": 0.46669046
  },
  {
    "id": "C2776916960",
    "name": "Warrant",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.6747423599999998,
    "venue_count": 3,
    "avg_score": 0.5582474533333333
  },
  {
    "id": "C2767350",
    "name": "Business intelligence",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.49198144,
    "venue_count": 1,
    "avg_score": 0.49732714666666666
  },
  {
    "id": "C2779669084",
    "name": "Resource-based view",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.53800581,
    "venue_count": 1,
    "avg_score": 0.5126686033333333
  },
  {
    "id": "C2780711244",
    "name": "Entrepreneurial orientation",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.85402011,
    "venue_count": 1,
    "avg_score": 0.6180067033333333
  },
  {
    "id": "C33842695",
    "name": "Foreign direct investment",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.39748733,
    "venue_count": 1,
    "avg_score": 0.46582911
  },
  {
    "id": "C106033793",
    "name": "Ambidexterity",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.32915518,
    "venue_count": 1,
    "avg_score": 0.4430517266666667
  },
  {
    "id": "C127576917",
    "name": "Competitor analysis",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.48620726,
    "venue_count": 1,
    "avg_score": 0.8287357533333334
  },
  {
    "id": "C2781408873",
    "name": "Intrapreneurship",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.93560014,
    "venue_count": 1,
    "avg_score": 0.6452000466666666
  },
  {
    "id": "C2777724570",
    "name": "Absorptive capacity",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.5260879,
    "venue_count": 1,
    "avg_score": 0.8420293
  },
  {
    "id": "C2983189667",
    "name": "Innovation process",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.45086789,
    "venue_count": 1,
    "avg_score": 0.48362263
  },
  {
    "id": "C84265765",
    "name": "Subsidy",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.3195832000000003,
    "venue_count": 1,
    "avg_score": 0.7731944000000001
  },
  {
    "id": "C2779777834",
    "name": "Enforcement",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.99716923,
    "venue_count": 2,
    "avg_score": 0.6657230766666666
  },
  {
    "id": "C86275758",
    "name": "Strategic management",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.5147287,
    "venue_count": 2,
    "avg_score": 0.5049095666666666
  },
  {
    "id": "C2779143981",
    "name": "Intermediation",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.2686333,
    "venue_count": 2,
    "avg_score": 0.7562110999999999
  },
  {
    "id": "C32946077",
    "name": "Network analysis",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.383153,
    "venue_count": 2,
    "avg_score": 0.46105100000000004
  },
  {
    "id": "C119701452",
    "name": "Control reconfiguration",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.00765724,
    "venue_count": 3,
    "avg_score": 0.66921908
  },
  {
    "id": "C178550888",
    "name": "Business administration",
    "level": 1,
    "total_papers": 3,
    "total_score": 0.45961660000000004,
    "venue_count": 3,
    "avg_score": 0.15320553333333334
  },
  {
    "id": "C2989086416",
    "name": "Healthcare industry",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.70029518,
    "venue_count": 3,
    "avg_score": 0.5667650599999999
  },
  {
    "id": "C194304873",
    "name": "Product lifecycle",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.57264816,
    "venue_count": 2,
    "avg_score": 0.5242160533333333
  },
  {
    "id": "C920782",
    "name": "Team learning",
    "level": 5,
    "total_papers": 3,
    "total_score": 1.71015518,
    "venue_count": 3,
    "avg_score": 0.5700517266666667
  },
  {
    "id": "C40149104",
    "name": "Factory (object-oriented programming)",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.6996583699999999,
    "venue_count": 3,
    "avg_score": 0.5665527899999999
  },
  {
    "id": "C2779835924",
    "name": "Plural",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.37396705,
    "venue_count": 2,
    "avg_score": 0.7913223500000001
  },
  {
    "id": "C26466937",
    "name": "Design management",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.65373845,
    "venue_count": 2,
    "avg_score": 0.55124615
  },
  {
    "id": "C26022165",
    "name": "Grammar",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.7383508,
    "venue_count": 2,
    "avg_score": 0.5794502666666667
  },
  {
    "id": "C2780920095",
    "name": "Boundary object",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.41881153,
    "venue_count": 3,
    "avg_score": 0.4729371766666666
  },
  {
    "id": "C85363599",
    "name": "Contemporary art",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.05680117,
    "venue_count": 3,
    "avg_score": 0.35226705666666663
  },
  {
    "id": "C53893814",
    "name": "Rule-based machine translation",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.84604967,
    "venue_count": 2,
    "avg_score": 0.61534989
  },
  {
    "id": "C84269361",
    "name": "Phenomenology (philosophy)",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.64107578,
    "venue_count": 3,
    "avg_score": 0.54702526
  },
  {
    "id": "C2781215313",
    "name": "SPARK (programming language)",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.52373815,
    "venue_count": 3,
    "avg_score": 0.5079127166666667
  },
  {
    "id": "C32464470",
    "name": "Emic and etic",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.39858571,
    "venue_count": 1,
    "avg_score": 0.4661952366666667
  },
  {
    "id": "C105289051",
    "name": "Pillar",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.8027487499999997,
    "venue_count": 1,
    "avg_score": 0.6009162499999999
  },
  {
    "id": "C16012445",
    "name": "Mixed model",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.63581027,
    "venue_count": 1,
    "avg_score": 0.5452700899999999
  },
  {
    "id": "C2776225092",
    "name": "Autoethnography",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.66801139,
    "venue_count": 1,
    "avg_score": 0.88933713
  },
  {
    "id": "C2779909229",
    "name": "Community-based participatory research",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.6152377999999998,
    "venue_count": 1,
    "avg_score": 0.5384125999999999
  },
  {
    "id": "C2779713723",
    "name": "Photo elicitation",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.8770129,
    "venue_count": 1,
    "avg_score": 0.6256709666666667
  },
  {
    "id": "C167699689",
    "name": "Naturalistic observation",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.3450052000000001,
    "venue_count": 2,
    "avg_score": 0.4483350666666667
  },
  {
    "id": "C2993048729",
    "name": "Visual methods",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.40540518,
    "venue_count": 2,
    "avg_score": 0.46846839333333334
  },
  {
    "id": "C2993942811",
    "name": "Longitudinal field",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.75770994,
    "venue_count": 3,
    "avg_score": 0.5859033133333333
  },
  {
    "id": "C115260700",
    "name": "Magnetic field",
    "level": 2,
    "total_papers": 3,
    "total_score": 0,
    "venue_count": 3,
    "avg_score": 0
  },
  {
    "id": "C63075964",
    "name": "Visual rhetoric",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.42574542,
    "venue_count": 2,
    "avg_score": 0.4752484733333333
  },
  {
    "id": "C105842133",
    "name": "Visual communication",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.47605965,
    "venue_count": 1,
    "avg_score": 0.49201988333333335
  },
  {
    "id": "C2780386941",
    "name": "Vernacular",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.20106026,
    "venue_count": 1,
    "avg_score": 0.7336867533333334
  },
  {
    "id": "C137355542",
    "name": "World War II",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.35782234,
    "venue_count": 2,
    "avg_score": 0.4526074466666667
  },
  {
    "id": "C105639569",
    "name": "Economic policy",
    "level": 1,
    "total_papers": 3,
    "total_score": 0,
    "venue_count": 2,
    "avg_score": 0
  },
  {
    "id": "C195244886",
    "name": "Ancient history",
    "level": 1,
    "total_papers": 3,
    "total_score": 1.15788615,
    "venue_count": 3,
    "avg_score": 0.38596205
  },
  {
    "id": "C102634674",
    "name": "Smoothness",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.6265690099999999,
    "venue_count": 1,
    "avg_score": 0.54218967
  },
  {
    "id": "C73000952",
    "name": "Discretization",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.7078648,
    "venue_count": 1,
    "avg_score": 0.5692882666666667
  },
  {
    "id": "C113775141",
    "name": "Computer engineering",
    "level": 1,
    "total_papers": 3,
    "total_score": 1.09234845,
    "venue_count": 1,
    "avg_score": 0.36411615
  },
  {
    "id": "C202887219",
    "name": "Parametrization (atmospheric modeling)",
    "level": 3,
    "total_papers": 3,
    "total_score": 2.31635255,
    "venue_count": 1,
    "avg_score": 0.7721175166666666
  },
  {
    "id": "C74902906",
    "name": "Radiative transfer",
    "level": 2,
    "total_papers": 3,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C199668693",
    "name": "Collision detection",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.37705222,
    "venue_count": 1,
    "avg_score": 0.4590174066666666
  },
  {
    "id": "C81074085",
    "name": "Motion planning",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.67734655,
    "venue_count": 1,
    "avg_score": 0.5591155166666667
  },
  {
    "id": "C15945459",
    "name": "B-spline",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.43154753,
    "venue_count": 1,
    "avg_score": 0.47718251
  },
  {
    "id": "C6648577",
    "name": "Porosity",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.6007405000000001,
    "venue_count": 1,
    "avg_score": 0.5335801666666667
  },
  {
    "id": "C87976508",
    "name": "Microstructure",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.66248914,
    "venue_count": 1,
    "avg_score": 0.5541630466666666
  },
  {
    "id": "C71169176",
    "name": "Signed distance function",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.60518207,
    "venue_count": 1,
    "avg_score": 0.53506069
  },
  {
    "id": "C136119220",
    "name": "Algebra over a field",
    "level": 2,
    "total_papers": 3,
    "total_score": 0.96286859,
    "venue_count": 1,
    "avg_score": 0.3209561966666667
  },
  {
    "id": "C200925200",
    "name": "STRIPS",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.8731507500000002,
    "venue_count": 1,
    "avg_score": 0.6243835833333334
  },
  {
    "id": "C164660894",
    "name": "Piecewise",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.6808860700000001,
    "venue_count": 1,
    "avg_score": 0.5602953566666667
  },
  {
    "id": "C167196314",
    "name": "Gaussian quadrature",
    "level": 4,
    "total_papers": 3,
    "total_score": 1.53734578,
    "venue_count": 1,
    "avg_score": 0.5124485933333334
  },
  {
    "id": "C62869609",
    "name": "Quadrature (astronomy)",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.73953017,
    "venue_count": 1,
    "avg_score": 0.5798433900000001
  },
  {
    "id": "C48265008",
    "name": "Nyström method",
    "level": 3,
    "total_papers": 3,
    "total_score": 0.7481728000000001,
    "venue_count": 1,
    "avg_score": 0.24939093333333337
  },
  {
    "id": "C123635137",
    "name": "Ruled surface",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.69151314,
    "venue_count": 1,
    "avg_score": 0.5638377133333333
  },
  {
    "id": "C151756577",
    "name": "Quadrilateral",
    "level": 3,
    "total_papers": 3,
    "total_score": 2.1524003,
    "venue_count": 1,
    "avg_score": 0.7174667666666666
  },
  {
    "id": "C198394728",
    "name": "Vibration",
    "level": 2,
    "total_papers": 3,
    "total_score": 0.7527480200000001,
    "venue_count": 1,
    "avg_score": 0.2509160066666667
  },
  {
    "id": "C135302770",
    "name": "Work systems",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.69056428,
    "venue_count": 1,
    "avg_score": 0.5635214266666667
  },
  {
    "id": "C2777414892",
    "name": "Musculoskeletal disorder",
    "level": 4,
    "total_papers": 3,
    "total_score": 1.40219435,
    "venue_count": 1,
    "avg_score": 0.4673981166666667
  },
  {
    "id": "C2778022156",
    "name": "Strain (injury)",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.45196464,
    "venue_count": 2,
    "avg_score": 0.4839882133333333
  },
  {
    "id": "C2779151272",
    "name": "Erector spinae muscles",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.55263353,
    "venue_count": 2,
    "avg_score": 0.51754451
  },
  {
    "id": "C2775852389",
    "name": "Work-related musculoskeletal disorders",
    "level": 4,
    "total_papers": 3,
    "total_score": 1.70851847,
    "venue_count": 2,
    "avg_score": 0.5695061566666667
  },
  {
    "id": "C35064395",
    "name": "Cognitive ergonomics",
    "level": 4,
    "total_papers": 3,
    "total_score": 1.74283159,
    "venue_count": 2,
    "avg_score": 0.5809438633333334
  },
  {
    "id": "C2780354894",
    "name": "Steering wheel",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.365858,
    "venue_count": 2,
    "avg_score": 0.455286
  },
  {
    "id": "C2776478404",
    "name": "Cochrane Library",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.4638122,
    "venue_count": 2,
    "avg_score": 0.4879374
  },
  {
    "id": "C3019054092",
    "name": "Pupil size",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.9119916700000001,
    "venue_count": 2,
    "avg_score": 0.6373305566666667
  },
  {
    "id": "C2780580376",
    "name": "Nausea",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.7409240000000001,
    "venue_count": 3,
    "avg_score": 0.580308
  },
  {
    "id": "C103203806",
    "name": "Robotic surgery",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.4715465600000002,
    "venue_count": 2,
    "avg_score": 0.49051552000000004
  },
  {
    "id": "C3019136136",
    "name": "Office workers",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.52258831,
    "venue_count": 2,
    "avg_score": 0.5075294366666666
  },
  {
    "id": "C3020240193",
    "name": "Manual handling",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.7380688599999998,
    "venue_count": 2,
    "avg_score": 0.5793562866666666
  },
  {
    "id": "C2780907711",
    "name": "Low back pain",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.63065274,
    "venue_count": 2,
    "avg_score": 0.5435509133333333
  },
  {
    "id": "C190385971",
    "name": "Injury prevention",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.48248432,
    "venue_count": 1,
    "avg_score": 0.49416144
  },
  {
    "id": "C18020424",
    "name": "Autopilot",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.5042781299999999,
    "venue_count": 1,
    "avg_score": 0.5014260433333333
  },
  {
    "id": "C2777819797",
    "name": "Pedestrian crossing",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.50411491,
    "venue_count": 2,
    "avg_score": 0.5013716366666666
  },
  {
    "id": "C523546767",
    "name": "Bacteria",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.13613773,
    "venue_count": 3,
    "avg_score": 0.37871257666666663
  },
  {
    "id": "C14641543",
    "name": "Group cohesiveness",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.72800242,
    "venue_count": 3,
    "avg_score": 0.5760008066666666
  },
  {
    "id": "C93500599",
    "name": "Task switching",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.3665468699999999,
    "venue_count": 3,
    "avg_score": 0.4555156233333333
  },
  {
    "id": "C67805463",
    "name": "Sculpture",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.6462202,
    "venue_count": 1,
    "avg_score": 0.5487400666666666
  },
  {
    "id": "C136894858",
    "name": "Sea ice",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.00830227,
    "venue_count": 2,
    "avg_score": 0.33610075666666667
  },
  {
    "id": "C61423126",
    "name": "Scripting language",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.75097805,
    "venue_count": 3,
    "avg_score": 0.58365935
  },
  {
    "id": "C2777552389",
    "name": "Course (navigation)",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.87542952,
    "venue_count": 2,
    "avg_score": 0.6251431733333334
  },
  {
    "id": "C59201141",
    "name": "GSM",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.70415334,
    "venue_count": 1,
    "avg_score": 0.5680511133333334
  },
  {
    "id": "C183380357",
    "name": "Cluster sampling",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.8782750100000003,
    "venue_count": 1,
    "avg_score": 0.6260916700000001
  },
  {
    "id": "C35292069",
    "name": "Validator",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.3598605,
    "venue_count": 2,
    "avg_score": 0.7866201666666667
  },
  {
    "id": "C2780468074",
    "name": "Digital learning",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.58636966,
    "venue_count": 2,
    "avg_score": 0.5287898866666666
  },
  {
    "id": "C2779207338",
    "name": "Indonesian",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.19593189,
    "venue_count": 2,
    "avg_score": 0.7319772966666668
  },
  {
    "id": "C114010052",
    "name": "Foreign language",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.5842128,
    "venue_count": 2,
    "avg_score": 0.5280709333333333
  },
  {
    "id": "C203004452",
    "name": "Interactive media",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.6745045,
    "venue_count": 2,
    "avg_score": 0.5581681666666667
  },
  {
    "id": "C522325796",
    "name": "Identity theft",
    "level": 2,
    "total_papers": 3,
    "total_score": 1.46619144,
    "venue_count": 3,
    "avg_score": 0.48873048
  },
  {
    "id": "C43729271",
    "name": "Spatial memory",
    "level": 4,
    "total_papers": 3,
    "total_score": 1.44446618,
    "venue_count": 1,
    "avg_score": 0.4814887266666667
  },
  {
    "id": "C8678698",
    "name": "Artificial reality",
    "level": 5,
    "total_papers": 3,
    "total_score": 1.49154931,
    "venue_count": 2,
    "avg_score": 0.4971831033333333
  },
  {
    "id": "C2776743756",
    "name": "Safeguarding",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.0256132300000003,
    "venue_count": 2,
    "avg_score": 0.6752044100000001
  },
  {
    "id": "C55457006",
    "name": "Kinesthetic learning",
    "level": 2,
    "total_papers": 3,
    "total_score": 2.2330275000000004,
    "venue_count": 2,
    "avg_score": 0.7443425000000001
  },
  {
    "id": "C170007233",
    "name": "E-Government",
    "level": 3,
    "total_papers": 3,
    "total_score": 1.5323844,
    "venue_count": 1,
    "avg_score": 0.5107948
  },
  {
    "id": "C2777122596",
    "name": "Praxis",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.3873655500000002,
    "venue_count": 1,
    "avg_score": 0.6936827750000001
  },
  {
    "id": "C3020000205",
    "name": "Narrative review",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.89353885,
    "venue_count": 2,
    "avg_score": 0.446769425
  },
  {
    "id": "C52641369",
    "name": "Creativity technique",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.00662425,
    "venue_count": 2,
    "avg_score": 0.503312125
  },
  {
    "id": "C158600405",
    "name": "Causal inference",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.17038186,
    "venue_count": 2,
    "avg_score": 0.58519093
  },
  {
    "id": "C2777705401",
    "name": "LEAPS",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.67730127,
    "venue_count": 2,
    "avg_score": 0.838650635
  },
  {
    "id": "C2985684807",
    "name": "Text generation",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.95016134,
    "venue_count": 2,
    "avg_score": 0.47508067
  },
  {
    "id": "C2777466982",
    "name": "Data extraction",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.05380345,
    "venue_count": 2,
    "avg_score": 0.526901725
  },
  {
    "id": "C53813258",
    "name": "Human sexuality",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.11994297,
    "venue_count": 2,
    "avg_score": 0.559971485
  },
  {
    "id": "C157660682",
    "name": "Accommodation",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.470181,
    "venue_count": 2,
    "avg_score": 0.7350905
  },
  {
    "id": "C140396857",
    "name": "Internal documentation",
    "level": 5,
    "total_papers": 2,
    "total_score": 1.1222928799999998,
    "venue_count": 2,
    "avg_score": 0.5611464399999999
  },
  {
    "id": "C25688753",
    "name": "Technical documentation",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.8727881900000001,
    "venue_count": 2,
    "avg_score": 0.43639409500000004
  },
  {
    "id": "C44291984",
    "name": "Question answering",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.96406427,
    "venue_count": 2,
    "avg_score": 0.482032135
  },
  {
    "id": "C2780362631",
    "name": "Uncanny",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.9750909000000001,
    "venue_count": 2,
    "avg_score": 0.48754545000000005
  },
  {
    "id": "C41065033",
    "name": "Adversary",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.03470173,
    "venue_count": 2,
    "avg_score": 0.517350865
  },
  {
    "id": "C3503070",
    "name": "Living lab",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.46870136,
    "venue_count": 2,
    "avg_score": 0.73435068
  },
  {
    "id": "C2776184637",
    "name": "Living systems",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.8848937,
    "venue_count": 2,
    "avg_score": 0.44244685
  },
  {
    "id": "C72161134",
    "name": "Expert elicitation",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.35105304,
    "venue_count": 2,
    "avg_score": 0.67552652
  },
  {
    "id": "C174063052",
    "name": "Pair programming",
    "level": 4,
    "total_papers": 2,
    "total_score": 1.06436127,
    "venue_count": 2,
    "avg_score": 0.532180635
  },
  {
    "id": "C2779011373",
    "name": "Notification system",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.94600372,
    "venue_count": 2,
    "avg_score": 0.47300186
  },
  {
    "id": "C38858127",
    "name": "Feed forward",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.37268141,
    "venue_count": 2,
    "avg_score": 0.686340705
  },
  {
    "id": "C38976095",
    "name": "Asymmetry",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.13923775,
    "venue_count": 2,
    "avg_score": 0.569618875
  },
  {
    "id": "C157150851",
    "name": "Feminist theory",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.93163631,
    "venue_count": 2,
    "avg_score": 0.465818155
  },
  {
    "id": "C165609540",
    "name": "Data breach",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.13778845,
    "venue_count": 2,
    "avg_score": 0.568894225
  },
  {
    "id": "C206705377",
    "name": "Goal theory",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.371488,
    "venue_count": 2,
    "avg_score": 0.685744
  },
  {
    "id": "C91632574",
    "name": "Data curation",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.07091481,
    "venue_count": 2,
    "avg_score": 0.535457405
  },
  {
    "id": "C14279187",
    "name": "GNSS applications",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.5547718,
    "venue_count": 2,
    "avg_score": 0.2773859
  },
  {
    "id": "C161921814",
    "name": "SMA*",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.49850512,
    "venue_count": 2,
    "avg_score": 0.74925256
  },
  {
    "id": "C197115733",
    "name": "Forcing (mathematics)",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.22251982,
    "venue_count": 2,
    "avg_score": 0.61125991
  },
  {
    "id": "C49204034",
    "name": "Climatology",
    "level": 1,
    "total_papers": 2,
    "total_score": 0,
    "venue_count": 2,
    "avg_score": 0
  },
  {
    "id": "C2776545253",
    "name": "Folding (DSP implementation)",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.12649996,
    "venue_count": 2,
    "avg_score": 0.56324998
  },
  {
    "id": "C115786838",
    "name": "Unconscious mind",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.1880571,
    "venue_count": 2,
    "avg_score": 0.59402855
  },
  {
    "id": "C2777906739",
    "name": "Self-reflection",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.0869005,
    "venue_count": 2,
    "avg_score": 0.54345025
  },
  {
    "id": "C100368936",
    "name": "Crawling",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.3841890000000001,
    "venue_count": 2,
    "avg_score": 0.6920945000000001
  },
  {
    "id": "C207390915",
    "name": "Divergence (linguistics)",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.09123182,
    "venue_count": 2,
    "avg_score": 0.54561591
  },
  {
    "id": "C2780367331",
    "name": "Virtual keyboard",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.0061361,
    "venue_count": 2,
    "avg_score": 0.50306805
  },
  {
    "id": "C173386949",
    "name": "Inertial frame of reference",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.90315422,
    "venue_count": 2,
    "avg_score": 0.45157711
  },
  {
    "id": "C179799912",
    "name": "Computational complexity theory",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.90184116,
    "venue_count": 2,
    "avg_score": 0.45092058
  },
  {
    "id": "C2781168091",
    "name": "Audience response",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.9223151700000001,
    "venue_count": 2,
    "avg_score": 0.46115758500000004
  },
  {
    "id": "C14228908",
    "name": "Protein filament",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.01829974,
    "venue_count": 2,
    "avg_score": 0.50914987
  },
  {
    "id": "C2777297030",
    "name": "Woven fabric",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.3735480999999998,
    "venue_count": 2,
    "avg_score": 0.6867740499999999
  },
  {
    "id": "C145642194",
    "name": "Health informatics",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.1537311,
    "venue_count": 2,
    "avg_score": 0.57686555
  },
  {
    "id": "C2776784076",
    "name": "Wizard",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.17438603,
    "venue_count": 2,
    "avg_score": 0.587193015
  },
  {
    "id": "C75606506",
    "name": "Formal methods",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.144939,
    "venue_count": 2,
    "avg_score": 0.5724695
  },
  {
    "id": "C2777336010",
    "name": "Sensibility",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.16635,
    "venue_count": 2,
    "avg_score": 0.583175
  },
  {
    "id": "C178288346",
    "name": "Contemplation",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.6935293,
    "venue_count": 2,
    "avg_score": 0.84676465
  },
  {
    "id": "C34585555",
    "name": "Learning curve",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.8421142699999999,
    "venue_count": 2,
    "avg_score": 0.42105713499999997
  },
  {
    "id": "C130093455",
    "name": "Sensation",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.1926033,
    "venue_count": 2,
    "avg_score": 0.59630165
  },
  {
    "id": "C138331895",
    "name": "Electronics",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.11753307,
    "venue_count": 2,
    "avg_score": 0.558766535
  },
  {
    "id": "C128644962",
    "name": "Visual programming language",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.91178432,
    "venue_count": 2,
    "avg_score": 0.45589216
  },
  {
    "id": "C34165917",
    "name": "Programming paradigm",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.02558452,
    "venue_count": 2,
    "avg_score": 0.51279226
  },
  {
    "id": "C2989099063",
    "name": "Learning design",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.93556415,
    "venue_count": 2,
    "avg_score": 0.467782075
  },
  {
    "id": "C2986528223",
    "name": "Game engine",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.82484328,
    "venue_count": 2,
    "avg_score": 0.41242164
  },
  {
    "id": "C530470458",
    "name": "Breast cancer",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.10969603,
    "venue_count": 2,
    "avg_score": 0.554848015
  },
  {
    "id": "C159737794",
    "name": "Azimuth",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.0796297400000001,
    "venue_count": 2,
    "avg_score": 0.5398148700000001
  },
  {
    "id": "C105002631",
    "name": "Subject-matter expert",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.98185996,
    "venue_count": 2,
    "avg_score": 0.49092998
  },
  {
    "id": "C519222250",
    "name": "Digital art",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.30997674,
    "venue_count": 2,
    "avg_score": 0.65498837
  },
  {
    "id": "C2780900520",
    "name": "Denial",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.37112802,
    "venue_count": 2,
    "avg_score": 0.68556401
  },
  {
    "id": "C60048249",
    "name": "Syntax",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.99483966,
    "venue_count": 2,
    "avg_score": 0.49741983
  },
  {
    "id": "C44249647",
    "name": "Confidence interval",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.10678998,
    "venue_count": 2,
    "avg_score": 0.55339499
  },
  {
    "id": "C162027153",
    "name": "Artificial general intelligence",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.11092945,
    "venue_count": 2,
    "avg_score": 0.555464725
  },
  {
    "id": "C195813598",
    "name": "Stakeholder analysis",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.96854565,
    "venue_count": 2,
    "avg_score": 0.484272825
  },
  {
    "id": "C41407105",
    "name": "Eye tracking on the ISS",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.01198496,
    "venue_count": 2,
    "avg_score": 0.50599248
  },
  {
    "id": "C2985612853",
    "name": "Analogical reasoning",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.9913136,
    "venue_count": 2,
    "avg_score": 0.4956568
  },
  {
    "id": "C177321328",
    "name": "Goldilocks principle",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.36299752,
    "venue_count": 2,
    "avg_score": 0.68149876
  },
  {
    "id": "C52407799",
    "name": "Social sustainability",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.74735643,
    "venue_count": 2,
    "avg_score": 0.373678215
  },
  {
    "id": "C46363204",
    "name": "Personal distress",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.38832904,
    "venue_count": 2,
    "avg_score": 0.69416452
  },
  {
    "id": "C196467688",
    "name": "Telerobotics",
    "level": 4,
    "total_papers": 2,
    "total_score": 1.15259635,
    "venue_count": 2,
    "avg_score": 0.576298175
  },
  {
    "id": "C3020234875",
    "name": "Media content",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.86421796,
    "venue_count": 2,
    "avg_score": 0.43210898
  },
  {
    "id": "C2776694159",
    "name": "Viewing angle",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.9202444000000001,
    "venue_count": 2,
    "avg_score": 0.46012220000000004
  },
  {
    "id": "C138268822",
    "name": "Resolution (logic)",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.8940164500000001,
    "venue_count": 2,
    "avg_score": 0.44700822500000004
  },
  {
    "id": "C11189718",
    "name": "User story",
    "level": 4,
    "total_papers": 2,
    "total_score": 1.01537426,
    "venue_count": 2,
    "avg_score": 0.50768713
  },
  {
    "id": "C8868529",
    "name": "Taste",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.4382784,
    "venue_count": 2,
    "avg_score": 0.7191392
  },
  {
    "id": "C2780328332",
    "name": "Multisensory integration",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.0674812999999999,
    "venue_count": 2,
    "avg_score": 0.5337406499999999
  },
  {
    "id": "C2776974102",
    "name": "Active ageing",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.61943685,
    "venue_count": 2,
    "avg_score": 0.809718425
  },
  {
    "id": "C3019892597",
    "name": "Healthy ageing",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.83977077,
    "venue_count": 2,
    "avg_score": 0.419885385
  },
  {
    "id": "C2776640315",
    "name": "Respondent",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.44580017,
    "venue_count": 2,
    "avg_score": 0.722900085
  },
  {
    "id": "C2984132187",
    "name": "Virtual classroom",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.86986685,
    "venue_count": 2,
    "avg_score": 0.434933425
  },
  {
    "id": "C134387633",
    "name": "Domestication",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.3795360300000001,
    "venue_count": 2,
    "avg_score": 0.6897680150000001
  },
  {
    "id": "C2777311342",
    "name": "Shared space",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.19615473,
    "venue_count": 2,
    "avg_score": 0.598077365
  },
  {
    "id": "C2778223634",
    "name": "Suspect",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.35934724,
    "venue_count": 2,
    "avg_score": 0.67967362
  },
  {
    "id": "C115343472",
    "name": "Global warming",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.27868274,
    "venue_count": 2,
    "avg_score": 0.63934137
  },
  {
    "id": "C150420422",
    "name": "Cognitive resource theory",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.99549993,
    "venue_count": 2,
    "avg_score": 0.497749965
  },
  {
    "id": "C67359045",
    "name": "Event-related potential",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.818803,
    "venue_count": 2,
    "avg_score": 0.4094015
  },
  {
    "id": "C2780595226",
    "name": "Affection",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.36267986,
    "venue_count": 2,
    "avg_score": 0.68133993
  },
  {
    "id": "C164622146",
    "name": "Danish",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.63362414,
    "venue_count": 2,
    "avg_score": 0.81681207
  },
  {
    "id": "C2987946170",
    "name": "Social relationship",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.98788276,
    "venue_count": 2,
    "avg_score": 0.49394138
  },
  {
    "id": "C6177178",
    "name": "Discounting",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.33115604,
    "venue_count": 2,
    "avg_score": 0.66557802
  },
  {
    "id": "C2777893452",
    "name": "Temporal discounting",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.21493065,
    "venue_count": 2,
    "avg_score": 0.607465325
  },
  {
    "id": "C56230252",
    "name": "Ethnomethodology",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.6490322599999998,
    "venue_count": 1,
    "avg_score": 0.8245161299999999
  },
  {
    "id": "C2777909354",
    "name": "Production planning",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.88863143,
    "venue_count": 1,
    "avg_score": 0.444315715
  },
  {
    "id": "C2909583634",
    "name": "Political activism",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.13067246,
    "venue_count": 1,
    "avg_score": 0.56533623
  },
  {
    "id": "C2777632292",
    "name": "Discretion",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.67934106,
    "venue_count": 2,
    "avg_score": 0.83967053
  },
  {
    "id": "C2991927077",
    "name": "Place making",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.1256141,
    "venue_count": 2,
    "avg_score": 0.56280705
  },
  {
    "id": "C2780829048",
    "name": "Conversation analysis",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.1148192,
    "venue_count": 2,
    "avg_score": 0.5574096
  },
  {
    "id": "C11693617",
    "name": "Pragmatics",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.9487469199999999,
    "venue_count": 2,
    "avg_score": 0.47437345999999997
  },
  {
    "id": "C47385372",
    "name": "Optimal distinctiveness theory",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.0428283,
    "venue_count": 2,
    "avg_score": 0.52141415
  },
  {
    "id": "C91302708",
    "name": "Ledger",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.17556971,
    "venue_count": 2,
    "avg_score": 0.587784855
  },
  {
    "id": "C2780565519",
    "name": "Multitude",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.01540432,
    "venue_count": 2,
    "avg_score": 0.50770216
  },
  {
    "id": "C2779251847",
    "name": "Financial inclusion",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.4747173,
    "venue_count": 2,
    "avg_score": 0.73735865
  },
  {
    "id": "C2777764128",
    "name": "Loan",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.97488003,
    "venue_count": 2,
    "avg_score": 0.487440015
  },
  {
    "id": "C2780656832",
    "name": "Online discussion",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.11390654,
    "venue_count": 2,
    "avg_score": 0.55695327
  },
  {
    "id": "C136103064",
    "name": "Emotional labor",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.21818023,
    "venue_count": 2,
    "avg_score": 0.609090115
  },
  {
    "id": "C2775884135",
    "name": "Mandate",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.23202613,
    "venue_count": 2,
    "avg_score": 0.616013065
  },
  {
    "id": "C509133132",
    "name": "Community organization",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.0254127,
    "venue_count": 2,
    "avg_score": 0.51270635
  },
  {
    "id": "C539944628",
    "name": "Community building",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.90731343,
    "venue_count": 2,
    "avg_score": 0.453656715
  },
  {
    "id": "C183373512",
    "name": "Taxis",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.16371496,
    "venue_count": 2,
    "avg_score": 0.58185748
  },
  {
    "id": "C121017731",
    "name": "Information technology",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.91659611,
    "venue_count": 2,
    "avg_score": 0.458298055
  },
  {
    "id": "C191920346",
    "name": "High tech",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.95434734,
    "venue_count": 2,
    "avg_score": 0.47717367
  },
  {
    "id": "C56814567",
    "name": "Explicit knowledge",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.06511355,
    "venue_count": 2,
    "avg_score": 0.532556775
  },
  {
    "id": "C89074322",
    "name": "Telematics",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.1667845,
    "venue_count": 2,
    "avg_score": 0.58339225
  },
  {
    "id": "C3987366",
    "name": "Livelihood",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.33994327,
    "venue_count": 2,
    "avg_score": 0.669971635
  },
  {
    "id": "C2991761844",
    "name": "Social activism",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.1056430800000001,
    "venue_count": 2,
    "avg_score": 0.5528215400000001
  },
  {
    "id": "C16920402",
    "name": "Social work",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.15778822,
    "venue_count": 2,
    "avg_score": 0.57889411
  },
  {
    "id": "C3020501284",
    "name": "Multidisciplinary team",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.07217597,
    "venue_count": 2,
    "avg_score": 0.536087985
  },
  {
    "id": "C49831778",
    "name": "Pluralism (philosophy)",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.2526386,
    "venue_count": 2,
    "avg_score": 0.6263193
  },
  {
    "id": "C195910791",
    "name": "Medical record",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.8474353800000001,
    "venue_count": 2,
    "avg_score": 0.42371769000000004
  },
  {
    "id": "C2776933761",
    "name": "Self-management",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.94621586,
    "venue_count": 2,
    "avg_score": 0.47310793
  },
  {
    "id": "C2777877512",
    "name": "Common ground",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.9007774500000001,
    "venue_count": 2,
    "avg_score": 0.45038872500000005
  },
  {
    "id": "C2776663400",
    "name": "Publics",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.72245975,
    "venue_count": 2,
    "avg_score": 0.861229875
  },
  {
    "id": "C64922751",
    "name": "Audio signal",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.4189764,
    "venue_count": 2,
    "avg_score": 0.2094882
  },
  {
    "id": "C13895895",
    "name": "Speech coding",
    "level": 2,
    "total_papers": 2,
    "total_score": 0,
    "venue_count": 2,
    "avg_score": 0
  },
  {
    "id": "C2780505938",
    "name": "Unavailability",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.2675693,
    "venue_count": 2,
    "avg_score": 0.63378465
  },
  {
    "id": "C3018448503",
    "name": "Community health workers",
    "level": 4,
    "total_papers": 2,
    "total_score": 0.9289769,
    "venue_count": 2,
    "avg_score": 0.46448845
  },
  {
    "id": "C2986740045",
    "name": "Health services",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.36362311999999997,
    "venue_count": 2,
    "avg_score": 0.18181155999999998
  },
  {
    "id": "C141441539",
    "name": "Boom",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.91575134,
    "venue_count": 2,
    "avg_score": 0.45787567
  },
  {
    "id": "C82279013",
    "name": "Real estate",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.88447767,
    "venue_count": 2,
    "avg_score": 0.442238835
  },
  {
    "id": "C2777548347",
    "name": "Flagging",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.85703554,
    "venue_count": 2,
    "avg_score": 0.92851777
  },
  {
    "id": "C38786816",
    "name": "Personal information manager",
    "level": 5,
    "total_papers": 2,
    "total_score": 1.23291925,
    "venue_count": 1,
    "avg_score": 0.616459625
  },
  {
    "id": "C2780301145",
    "name": "Surrender",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.7240954400000001,
    "venue_count": 1,
    "avg_score": 0.8620477200000001
  },
  {
    "id": "C2779359184",
    "name": "Organizational justice",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.3046263,
    "venue_count": 2,
    "avg_score": 0.65231315
  },
  {
    "id": "C166235249",
    "name": "Time management",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.2108577600000001,
    "venue_count": 2,
    "avg_score": 0.6054288800000001
  },
  {
    "id": "C2776943663",
    "name": "Human capital",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.98562178,
    "venue_count": 2,
    "avg_score": 0.49281089
  },
  {
    "id": "C107269508",
    "name": "Reminiscence",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.8818349,
    "venue_count": 2,
    "avg_score": 0.94091745
  },
  {
    "id": "C2779284498",
    "name": "Music therapy",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.1105361,
    "venue_count": 2,
    "avg_score": 0.55526805
  },
  {
    "id": "C2781439373",
    "name": "Moral agency",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.17672623,
    "venue_count": 2,
    "avg_score": 0.588363115
  },
  {
    "id": "C60083737",
    "name": "Etiquette",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.7670067399999998,
    "venue_count": 2,
    "avg_score": 0.8835033699999999
  },
  {
    "id": "C2777798969",
    "name": "Assemblage (archaeology)",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.34976604,
    "venue_count": 2,
    "avg_score": 0.67488302
  },
  {
    "id": "C196879817",
    "name": "Data governance",
    "level": 4,
    "total_papers": 2,
    "total_score": 1.24394113,
    "venue_count": 2,
    "avg_score": 0.621970565
  },
  {
    "id": "C2776636917",
    "name": "Information seeking",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.85573941,
    "venue_count": 2,
    "avg_score": 0.427869705
  },
  {
    "id": "C2775968953",
    "name": "Executive functions",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.0274401800000001,
    "venue_count": 2,
    "avg_score": 0.5137200900000001
  },
  {
    "id": "C60644358",
    "name": "Bioinformatics",
    "level": 1,
    "total_papers": 2,
    "total_score": 0.086966276,
    "venue_count": 2,
    "avg_score": 0.043483138
  },
  {
    "id": "C2780138299",
    "name": "Privilege (computing)",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.4484430000000001,
    "venue_count": 2,
    "avg_score": 0.7242215000000001
  },
  {
    "id": "C3018769082",
    "name": "Serious game",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.85867973,
    "venue_count": 2,
    "avg_score": 0.429339865
  },
  {
    "id": "C2779978724",
    "name": "Worry",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.6829996,
    "venue_count": 2,
    "avg_score": 0.8414998
  },
  {
    "id": "C2780400661",
    "name": "Wishful thinking",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.88853866,
    "venue_count": 2,
    "avg_score": 0.94426933
  },
  {
    "id": "C2777808570",
    "name": "Massive open online course",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.96562189,
    "venue_count": 2,
    "avg_score": 0.482810945
  },
  {
    "id": "C70770792",
    "name": "Preferred walking speed",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.95138606,
    "venue_count": 1,
    "avg_score": 0.47569303
  },
  {
    "id": "C201247586",
    "name": "Binaural recording",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.26171095,
    "venue_count": 1,
    "avg_score": 0.630855475
  },
  {
    "id": "C150415221",
    "name": "Robotic arm",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.01578852,
    "venue_count": 1,
    "avg_score": 0.50789426
  },
  {
    "id": "C2778715743",
    "name": "Prosthesis",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.64326768,
    "venue_count": 1,
    "avg_score": 0.32163384
  },
  {
    "id": "C134066672",
    "name": "Payload (computing)",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.66938626,
    "venue_count": 1,
    "avg_score": 0.83469313
  },
  {
    "id": "C2779429828",
    "name": "Mental state",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.0663698,
    "venue_count": 2,
    "avg_score": 0.5331849
  },
  {
    "id": "C2982962833",
    "name": "Information fusion",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.0855887,
    "venue_count": 2,
    "avg_score": 0.54279435
  },
  {
    "id": "C84525736",
    "name": "Decision tree",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.92475915,
    "venue_count": 2,
    "avg_score": 0.462379575
  },
  {
    "id": "C60640748",
    "name": "Lyapunov function",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.83184713,
    "venue_count": 2,
    "avg_score": 0.415923565
  },
  {
    "id": "C40969351",
    "name": "Word error rate",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.9181767700000001,
    "venue_count": 2,
    "avg_score": 0.45908838500000004
  },
  {
    "id": "C18007350",
    "name": "STRIDE",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.61860744,
    "venue_count": 2,
    "avg_score": 0.80930372
  },
  {
    "id": "C115076146",
    "name": "Foot (prosody)",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.95446348,
    "venue_count": 2,
    "avg_score": 0.47723174
  },
  {
    "id": "C119653847",
    "name": "Elementary cognitive task",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.89584159,
    "venue_count": 2,
    "avg_score": 0.447920795
  },
  {
    "id": "C2776453491",
    "name": "Harmony (color)",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.3032436,
    "venue_count": 2,
    "avg_score": 0.6516218
  },
  {
    "id": "C178635117",
    "name": "RADIUS",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.61559594,
    "venue_count": 2,
    "avg_score": 0.30779797
  },
  {
    "id": "C147789679",
    "name": "Physical chemistry",
    "level": 1,
    "total_papers": 2,
    "total_score": 0.060566366,
    "venue_count": 2,
    "avg_score": 0.030283183
  },
  {
    "id": "C102392041",
    "name": "Sliding window protocol",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.9867830799999999,
    "venue_count": 2,
    "avg_score": 0.49339153999999996
  },
  {
    "id": "C21822782",
    "name": "Antenna (radio)",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.64104056,
    "venue_count": 2,
    "avg_score": 0.32052028
  },
  {
    "id": "C2781258422",
    "name": "Headphones",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.60823383,
    "venue_count": 2,
    "avg_score": 0.804116915
  },
  {
    "id": "C2776182073",
    "name": "Speech enhancement",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.7150196,
    "venue_count": 2,
    "avg_score": 0.3575098
  },
  {
    "id": "C140479938",
    "name": "Iterated function",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.3786057,
    "venue_count": 2,
    "avg_score": 0.68930285
  },
  {
    "id": "C21308566",
    "name": "Permutation (music)",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.9299599000000001,
    "venue_count": 2,
    "avg_score": 0.46497995000000003
  },
  {
    "id": "C96332660",
    "name": "Ground reaction force",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.01046059,
    "venue_count": 2,
    "avg_score": 0.505230295
  },
  {
    "id": "C19766214",
    "name": "Behavior-based robotics",
    "level": 4,
    "total_papers": 2,
    "total_score": 0.96538493,
    "venue_count": 2,
    "avg_score": 0.482692465
  },
  {
    "id": "C2778067643",
    "name": "Interval (graph theory)",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.949492,
    "venue_count": 2,
    "avg_score": 0.474746
  },
  {
    "id": "C17829176",
    "name": "Electrical impedance",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.59934455,
    "venue_count": 2,
    "avg_score": 0.299672275
  },
  {
    "id": "C2780928941",
    "name": "Rating of perceived exertion",
    "level": 4,
    "total_papers": 2,
    "total_score": 1.1610242400000002,
    "venue_count": 2,
    "avg_score": 0.5805121200000001
  },
  {
    "id": "C2781184374",
    "name": "Elbow",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.97358584,
    "venue_count": 2,
    "avg_score": 0.48679292
  },
  {
    "id": "C2776145971",
    "name": "Labeled data",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.94132528,
    "venue_count": 2,
    "avg_score": 0.47066264
  },
  {
    "id": "C2776937971",
    "name": "Heading (navigation)",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.39786572,
    "venue_count": 2,
    "avg_score": 0.69893286
  },
  {
    "id": "C2778640784",
    "name": "Ankle",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.1904319,
    "venue_count": 2,
    "avg_score": 0.59521595
  },
  {
    "id": "C2781427961",
    "name": "Human eye",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.95544067,
    "venue_count": 2,
    "avg_score": 0.477720335
  },
  {
    "id": "C191178318",
    "name": "Thresholding",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.2584803,
    "venue_count": 2,
    "avg_score": 0.62924015
  },
  {
    "id": "C2777766275",
    "name": "Functional electrical stimulation",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.90579835,
    "venue_count": 2,
    "avg_score": 0.452899175
  },
  {
    "id": "C156321",
    "name": "Sensorimotor rhythm",
    "level": 4,
    "total_papers": 2,
    "total_score": 0.8589432,
    "venue_count": 2,
    "avg_score": 0.4294716
  },
  {
    "id": "C197323446",
    "name": "Oversampling",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.2263738499999999,
    "venue_count": 2,
    "avg_score": 0.6131869249999999
  },
  {
    "id": "C47432892",
    "name": "Wavelet",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.0353691999999999,
    "venue_count": 2,
    "avg_score": 0.5176845999999999
  },
  {
    "id": "C2779503344",
    "name": "IRIS (biosensor)",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.22379869,
    "venue_count": 2,
    "avg_score": 0.611899345
  },
  {
    "id": "C2779372316",
    "name": "Stiffness",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.03378106,
    "venue_count": 2,
    "avg_score": 0.51689053
  },
  {
    "id": "C55830036",
    "name": "Cave automatic virtual environment",
    "level": 5,
    "total_papers": 2,
    "total_score": 1.09226026,
    "venue_count": 2,
    "avg_score": 0.54613013
  },
  {
    "id": "C3020701032",
    "name": "Computer game",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.96875958,
    "venue_count": 2,
    "avg_score": 0.48437979
  },
  {
    "id": "C70530487",
    "name": "Password strength",
    "level": 4,
    "total_papers": 2,
    "total_score": 1.02811915,
    "venue_count": 2,
    "avg_score": 0.514059575
  },
  {
    "id": "C89479133",
    "name": "One-time password",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.89918879,
    "venue_count": 2,
    "avg_score": 0.449594395
  },
  {
    "id": "C8651855",
    "name": "Sensory substitution",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.09599385,
    "venue_count": 2,
    "avg_score": 0.547996925
  },
  {
    "id": "C2781265381",
    "name": "Helpfulness",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.3119643,
    "venue_count": 1,
    "avg_score": 0.65598215
  },
  {
    "id": "C2780262971",
    "name": "Law enforcement",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.93209635,
    "venue_count": 2,
    "avg_score": 0.466048175
  },
  {
    "id": "C141121606",
    "name": "Currency",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.03001985,
    "venue_count": 2,
    "avg_score": 0.515009925
  },
  {
    "id": "C556758197",
    "name": "Monetary economics",
    "level": 1,
    "total_papers": 2,
    "total_score": 0.10218814,
    "venue_count": 2,
    "avg_score": 0.05109407
  },
  {
    "id": "C2779542340",
    "name": "Learning object",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.92292697,
    "venue_count": 2,
    "avg_score": 0.461463485
  },
  {
    "id": "C121040770",
    "name": "Quantum entanglement",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.87592562,
    "venue_count": 2,
    "avg_score": 0.43796281
  },
  {
    "id": "C111030470",
    "name": "Curse of dimensionality",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.1537875999999998,
    "venue_count": 2,
    "avg_score": 0.5768937999999999
  },
  {
    "id": "C83415579",
    "name": "Arc (geometry)",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.37462354,
    "venue_count": 2,
    "avg_score": 0.68731177
  },
  {
    "id": "C2779089590",
    "name": "Knowledge worker",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.92279157,
    "venue_count": 2,
    "avg_score": 0.461395785
  },
  {
    "id": "C96455323",
    "name": "Arabic",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.07323386,
    "venue_count": 2,
    "avg_score": 0.53661693
  },
  {
    "id": "C2777499484",
    "name": "Food waste",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.3392839,
    "venue_count": 2,
    "avg_score": 0.66964195
  },
  {
    "id": "C180505990",
    "name": "News aggregator",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.00607926,
    "venue_count": 2,
    "avg_score": 0.50303963
  },
  {
    "id": "C114466953",
    "name": "Initialization",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.54092505,
    "venue_count": 2,
    "avg_score": 0.770462525
  },
  {
    "id": "C108094655",
    "name": "Sorting algorithm",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.04814847,
    "venue_count": 2,
    "avg_score": 0.524074235
  },
  {
    "id": "C47187476",
    "name": "Video game design",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.61528057,
    "venue_count": 2,
    "avg_score": 0.307640285
  },
  {
    "id": "C47175762",
    "name": "Non-cooperative game",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.54695743,
    "venue_count": 2,
    "avg_score": 0.273478715
  },
  {
    "id": "C48052980",
    "name": "Context-aware pervasive systems",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.9729483699999999,
    "venue_count": 2,
    "avg_score": 0.48647418499999995
  },
  {
    "id": "C2780712732",
    "name": "Panic",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.1320555300000001,
    "venue_count": 2,
    "avg_score": 0.5660277650000001
  },
  {
    "id": "C111498074",
    "name": "Formal verification",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.8982714599999999,
    "venue_count": 2,
    "avg_score": 0.44913572999999996
  },
  {
    "id": "C2777020290",
    "name": "Boss",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.14396659,
    "venue_count": 2,
    "avg_score": 0.571983295
  },
  {
    "id": "C2988118254",
    "name": "Rating system",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.03837963,
    "venue_count": 2,
    "avg_score": 0.519189815
  },
  {
    "id": "C2776915394",
    "name": "Customer engagement",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.1820341600000002,
    "venue_count": 1,
    "avg_score": 0.5910170800000001
  },
  {
    "id": "C137913393",
    "name": "Word of mouth",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.3665545,
    "venue_count": 1,
    "avg_score": 0.68327725
  },
  {
    "id": "C121244757",
    "name": "Convergent validity",
    "level": 4,
    "total_papers": 2,
    "total_score": 0.9973142500000001,
    "venue_count": 2,
    "avg_score": 0.49865712500000003
  },
  {
    "id": "C151416629",
    "name": "Teaching and learning center",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.9758751299999999,
    "venue_count": 2,
    "avg_score": 0.48793756499999996
  },
  {
    "id": "C87868495",
    "name": "Information processing",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.09191281,
    "venue_count": 2,
    "avg_score": 0.545956405
  },
  {
    "id": "C136085584",
    "name": "Overlay",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.00027147,
    "venue_count": 2,
    "avg_score": 0.500135735
  },
  {
    "id": "C545102676",
    "name": "Product management",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.72212284,
    "venue_count": 2,
    "avg_score": 0.36106142
  },
  {
    "id": "C54750564",
    "name": "Commerce",
    "level": 1,
    "total_papers": 2,
    "total_score": 0.7516037799999999,
    "venue_count": 2,
    "avg_score": 0.37580188999999997
  },
  {
    "id": "C197378717",
    "name": "Mobile commerce",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.0661987,
    "venue_count": 2,
    "avg_score": 0.53309935
  },
  {
    "id": "C58916136",
    "name": "Content validity",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.28933459,
    "venue_count": 2,
    "avg_score": 0.644667295
  },
  {
    "id": "C129353971",
    "name": "Comprehension approach",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.28132882000000003,
    "venue_count": 2,
    "avg_score": 0.14066441000000002
  },
  {
    "id": "C2781206393",
    "name": "Academic achievement",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.95316484,
    "venue_count": 2,
    "avg_score": 0.47658242
  },
  {
    "id": "C136172866",
    "name": "Possible world",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.09395834,
    "venue_count": 2,
    "avg_score": 0.54697917
  },
  {
    "id": "C2986663376",
    "name": "Ethical issues",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.97378787,
    "venue_count": 2,
    "avg_score": 0.486893935
  },
  {
    "id": "C119477188",
    "name": "Attachment theory",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.16106927,
    "venue_count": 2,
    "avg_score": 0.580534635
  },
  {
    "id": "C519982507",
    "name": "Hindi",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.2044675,
    "venue_count": 2,
    "avg_score": 0.60223375
  },
  {
    "id": "C2781466463",
    "name": "Blame",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.5943719399999998,
    "venue_count": 2,
    "avg_score": 0.7971859699999999
  },
  {
    "id": "C61904560",
    "name": "Grey literature",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.05496236,
    "venue_count": 2,
    "avg_score": 0.52748118
  },
  {
    "id": "C2777219063",
    "name": "Servant",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.5449609,
    "venue_count": 2,
    "avg_score": 0.77248045
  },
  {
    "id": "C137822555",
    "name": "Information sensitivity",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.03844993,
    "venue_count": 2,
    "avg_score": 0.519224965
  },
  {
    "id": "C2778319590",
    "name": "Self-esteem",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.44835026,
    "venue_count": 2,
    "avg_score": 0.72417513
  },
  {
    "id": "C142172996",
    "name": "Conformity",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.31461115,
    "venue_count": 2,
    "avg_score": 0.657305575
  },
  {
    "id": "C2779812341",
    "name": "Homophily",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.73585307,
    "venue_count": 2,
    "avg_score": 0.867926535
  },
  {
    "id": "C13553968",
    "name": "Music education",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.0437661999999999,
    "venue_count": 2,
    "avg_score": 0.5218830999999999
  },
  {
    "id": "C2781235140",
    "name": "Scratch",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.43168509,
    "venue_count": 2,
    "avg_score": 0.715842545
  },
  {
    "id": "C2777220311",
    "name": "Knowledge acquisition",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.89348166,
    "venue_count": 2,
    "avg_score": 0.44674083
  },
  {
    "id": "C2777286243",
    "name": "Grading (engineering)",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.5032346699999999,
    "venue_count": 2,
    "avg_score": 0.7516173349999999
  },
  {
    "id": "C49777639",
    "name": "Design language",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.8529738200000001,
    "venue_count": 2,
    "avg_score": 0.42648691000000005
  },
  {
    "id": "C2779460620",
    "name": "Intangible cultural heritage",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.33105286,
    "venue_count": 2,
    "avg_score": 0.66552643
  },
  {
    "id": "C77513098",
    "name": "Cognitive dissonance",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.98056316,
    "venue_count": 2,
    "avg_score": 0.49028158
  },
  {
    "id": "C2778583943",
    "name": "Digital storytelling",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.3421230899999999,
    "venue_count": 2,
    "avg_score": 0.6710615449999999
  },
  {
    "id": "C188255311",
    "name": "Psychological research",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.97428033,
    "venue_count": 2,
    "avg_score": 0.487140165
  },
  {
    "id": "C2777868144",
    "name": "Preference elicitation",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.0472514,
    "venue_count": 1,
    "avg_score": 0.5236257
  },
  {
    "id": "C181204326",
    "name": "Preference learning",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.02891723,
    "venue_count": 1,
    "avg_score": 0.514458615
  },
  {
    "id": "C125411270",
    "name": "Encoding (memory)",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.98572371,
    "venue_count": 1,
    "avg_score": 0.492861855
  },
  {
    "id": "C121194460",
    "name": "Random walk",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.04460108,
    "venue_count": 1,
    "avg_score": 0.52230054
  },
  {
    "id": "C8880873",
    "name": "Genetic algorithm",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.0746105400000001,
    "venue_count": 2,
    "avg_score": 0.5373052700000001
  },
  {
    "id": "C20701700",
    "name": "Group decision-making",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.20256394,
    "venue_count": 2,
    "avg_score": 0.60128197
  },
  {
    "id": "C170858558",
    "name": "Automatic summarization",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.2836975800000001,
    "venue_count": 2,
    "avg_score": 0.6418487900000001
  },
  {
    "id": "C2776187449",
    "name": "Natural language generation",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.84383605,
    "venue_count": 2,
    "avg_score": 0.421918025
  },
  {
    "id": "C139992725",
    "name": "Entrainment (biomusicology)",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.43998968,
    "venue_count": 2,
    "avg_score": 0.71999484
  },
  {
    "id": "C66882249",
    "name": "Homogeneous",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.07163877,
    "venue_count": 2,
    "avg_score": 0.535819385
  },
  {
    "id": "C7149132",
    "name": "Forgetting",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.21709839,
    "venue_count": 2,
    "avg_score": 0.608549195
  },
  {
    "id": "C63527458",
    "name": "Clinical decision support system",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.02006544,
    "venue_count": 2,
    "avg_score": 0.51003272
  },
  {
    "id": "C158207573",
    "name": "Heterogeneous network",
    "level": 4,
    "total_papers": 2,
    "total_score": 1.08772993,
    "venue_count": 2,
    "avg_score": 0.543864965
  },
  {
    "id": "C149810388",
    "name": "Emulation",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.86818138,
    "venue_count": 2,
    "avg_score": 0.43409069
  },
  {
    "id": "C2779421357",
    "name": "Cerebral palsy",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.1797289800000001,
    "venue_count": 2,
    "avg_score": 0.5898644900000001
  },
  {
    "id": "C197934379",
    "name": "Adverse effect",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.28782715,
    "venue_count": 2,
    "avg_score": 0.643913575
  },
  {
    "id": "C2776135515",
    "name": "Regularization (linguistics)",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.23945994,
    "venue_count": 2,
    "avg_score": 0.61972997
  },
  {
    "id": "C3020552372",
    "name": "Typically developing",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.9686668,
    "venue_count": 2,
    "avg_score": 0.4843334
  },
  {
    "id": "C170334801",
    "name": "Proxemics",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.8085755,
    "venue_count": 2,
    "avg_score": 0.90428775
  },
  {
    "id": "C1667742",
    "name": "Image retrieval",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.35101375,
    "venue_count": 2,
    "avg_score": 0.175506875
  },
  {
    "id": "C67356462",
    "name": "Hofstede's cultural dimensions theory",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.73372076,
    "venue_count": 2,
    "avg_score": 0.86686038
  },
  {
    "id": "C89198739",
    "name": "Data stream mining",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.6891414600000001,
    "venue_count": 2,
    "avg_score": 0.34457073000000005
  },
  {
    "id": "C115286129",
    "name": "Cybernetics",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.33227064,
    "venue_count": 2,
    "avg_score": 0.66613532
  },
  {
    "id": "C99221444",
    "name": "Private information retrieval",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.83385122,
    "venue_count": 2,
    "avg_score": 0.41692561
  },
  {
    "id": "C2778024590",
    "name": "Cheating",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.5833789999999999,
    "venue_count": 2,
    "avg_score": 0.7916894999999999
  },
  {
    "id": "C157972887",
    "name": "Convex optimization",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.83028731,
    "venue_count": 2,
    "avg_score": 0.415143655
  },
  {
    "id": "C140146324",
    "name": "Predicate (mathematical logic)",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.3619398999999999,
    "venue_count": 2,
    "avg_score": 0.6809699499999999
  },
  {
    "id": "C51167844",
    "name": "Latent variable",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.23057449,
    "venue_count": 2,
    "avg_score": 0.615287245
  },
  {
    "id": "C2776085556",
    "name": "Chen",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.21962736,
    "venue_count": 2,
    "avg_score": 0.60981368
  },
  {
    "id": "C2780167933",
    "name": "Pulse (music)",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.9301777999999999,
    "venue_count": 1,
    "avg_score": 0.46508889999999997
  },
  {
    "id": "C177284502",
    "name": "Adapter (computing)",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.11683438,
    "venue_count": 1,
    "avg_score": 0.55841719
  },
  {
    "id": "C110484373",
    "name": "Adjacency list",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.99215487,
    "venue_count": 2,
    "avg_score": 0.496077435
  },
  {
    "id": "C774472",
    "name": "Margin (machine learning)",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.10087014,
    "venue_count": 2,
    "avg_score": 0.55043507
  },
  {
    "id": "C2779405079",
    "name": "Jigsaw",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.5451912700000001,
    "venue_count": 2,
    "avg_score": 0.7725956350000001
  },
  {
    "id": "C8038995",
    "name": "Unsupervised learning",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.8585317800000001,
    "venue_count": 2,
    "avg_score": 0.42926589000000004
  },
  {
    "id": "C2993577864",
    "name": "Physiological stress",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.86589418,
    "venue_count": 2,
    "avg_score": 0.43294709
  },
  {
    "id": "C82327399",
    "name": "Music history",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.428440004,
    "venue_count": 2,
    "avg_score": 0.214220002
  },
  {
    "id": "C2777462759",
    "name": "Word embedding",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.13913125,
    "venue_count": 2,
    "avg_score": 0.569565625
  },
  {
    "id": "C2776330181",
    "name": "Maximization",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.19884396,
    "venue_count": 2,
    "avg_score": 0.59942198
  },
  {
    "id": "C6183727",
    "name": "Facial electromyography",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.12001216,
    "venue_count": 2,
    "avg_score": 0.56000608
  },
  {
    "id": "C153180980",
    "name": "Commit",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.24807578,
    "venue_count": 2,
    "avg_score": 0.62403789
  },
  {
    "id": "C108010975",
    "name": "Pruning",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.00195524,
    "venue_count": 2,
    "avg_score": 0.50097762
  },
  {
    "id": "C2779803651",
    "name": "Discriminator",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.9848166199999999,
    "venue_count": 2,
    "avg_score": 0.49240830999999996
  },
  {
    "id": "C4441509",
    "name": "Multimodal therapy",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.9473888300000001,
    "venue_count": 2,
    "avg_score": 0.47369441500000004
  },
  {
    "id": "C121864883",
    "name": "Statistical physics",
    "level": 1,
    "total_papers": 2,
    "total_score": 0.70812323,
    "venue_count": 2,
    "avg_score": 0.354061615
  },
  {
    "id": "C3020774634",
    "name": "Emotional valence",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.9317210899999999,
    "venue_count": 2,
    "avg_score": 0.46586054499999996
  },
  {
    "id": "C74296488",
    "name": "End-to-end principle",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.11487434,
    "venue_count": 2,
    "avg_score": 0.55743717
  },
  {
    "id": "C18552078",
    "name": "Code-switching",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.7848255,
    "venue_count": 2,
    "avg_score": 0.39241275
  },
  {
    "id": "C160633673",
    "name": "Pixel",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.9514611,
    "venue_count": 2,
    "avg_score": 0.47573055
  },
  {
    "id": "C186644900",
    "name": "Parsing",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.1024824,
    "venue_count": 2,
    "avg_score": 0.5512412
  },
  {
    "id": "C30542707",
    "name": "Commonsense knowledge",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.4318475099999999,
    "venue_count": 2,
    "avg_score": 0.7159237549999999
  },
  {
    "id": "C122637931",
    "name": "Unit (ring theory)",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.97199277,
    "venue_count": 2,
    "avg_score": 0.485996385
  },
  {
    "id": "C529865628",
    "name": "Manifold (fluid mechanics)",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.0598272,
    "venue_count": 2,
    "avg_score": 0.5299136
  },
  {
    "id": "C2776394216",
    "name": "Eating disorders",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.9893766399999999,
    "venue_count": 2,
    "avg_score": 0.49468831999999996
  },
  {
    "id": "C54654163",
    "name": "Face hallucination",
    "level": 5,
    "total_papers": 2,
    "total_score": 0.8578543999999999,
    "venue_count": 2,
    "avg_score": 0.42892719999999995
  },
  {
    "id": "C122123141",
    "name": "Random variable",
    "level": 2,
    "total_papers": 2,
    "total_score": 0,
    "venue_count": 2,
    "avg_score": 0
  },
  {
    "id": "C2781160688",
    "name": "Work engagement",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.1991469499999998,
    "venue_count": 2,
    "avg_score": 0.5995734749999999
  },
  {
    "id": "C2779226451",
    "name": "Functional magnetic resonance imaging",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.12001506,
    "venue_count": 2,
    "avg_score": 0.56000753
  },
  {
    "id": "C2776987312",
    "name": "First responder",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.21459503,
    "venue_count": 1,
    "avg_score": 0.607297515
  },
  {
    "id": "C150627866",
    "name": "Field of view",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.09349489,
    "venue_count": 1,
    "avg_score": 0.546747445
  },
  {
    "id": "C2778398512",
    "name": "Orientation and Mobility",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.32392007,
    "venue_count": 1,
    "avg_score": 0.661960035
  },
  {
    "id": "C68015696",
    "name": "Cognitive rehabilitation therapy",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.90599247,
    "venue_count": 2,
    "avg_score": 0.452996235
  },
  {
    "id": "C134290984",
    "name": "Cognitive skill",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.89760954,
    "venue_count": 2,
    "avg_score": 0.44880477
  },
  {
    "id": "C163175372",
    "name": "Linear model",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.9579082999999999,
    "venue_count": 2,
    "avg_score": 0.47895414999999997
  },
  {
    "id": "C2779829227",
    "name": "Vitality",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.694991,
    "venue_count": 2,
    "avg_score": 0.8474955
  },
  {
    "id": "C2778826615",
    "name": "Bathing",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.94380252,
    "venue_count": 2,
    "avg_score": 0.47190126
  },
  {
    "id": "C2780966972",
    "name": "Headaches",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.99838094,
    "venue_count": 2,
    "avg_score": 0.49919047
  },
  {
    "id": "C137858568",
    "name": "Organism",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.1297287,
    "venue_count": 2,
    "avg_score": 0.56486435
  },
  {
    "id": "C5041995",
    "name": "Engineering education",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.94047433,
    "venue_count": 2,
    "avg_score": 0.470237165
  },
  {
    "id": "C194051981",
    "name": "Economic shortage",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.2276381,
    "venue_count": 2,
    "avg_score": 0.61381905
  },
  {
    "id": "C2779338814",
    "name": "Covert",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.46505223,
    "venue_count": 2,
    "avg_score": 0.732526115
  },
  {
    "id": "C113364801",
    "name": "High fidelity",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.0565049499999999,
    "venue_count": 2,
    "avg_score": 0.5282524749999999
  },
  {
    "id": "C3018222959",
    "name": "Simulation training",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.87588921,
    "venue_count": 2,
    "avg_score": 0.437944605
  },
  {
    "id": "C38956757",
    "name": "Audio feedback",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.9803316,
    "venue_count": 2,
    "avg_score": 0.4901658
  },
  {
    "id": "C52970973",
    "name": "Adaptive system",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.9652525599999999,
    "venue_count": 2,
    "avg_score": 0.48262627999999996
  },
  {
    "id": "C30181142",
    "name": "Foveal",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.1846710599999999,
    "venue_count": 2,
    "avg_score": 0.5923355299999999
  },
  {
    "id": "C2780827179",
    "name": "Retinal",
    "level": 2,
    "total_papers": 2,
    "total_score": 0,
    "venue_count": 2,
    "avg_score": 0
  },
  {
    "id": "C95743889",
    "name": "Virtual representation",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.9284441999999999,
    "venue_count": 2,
    "avg_score": 0.46422209999999997
  },
  {
    "id": "C2780319250",
    "name": "Brick and mortar",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.0015143,
    "venue_count": 2,
    "avg_score": 0.50075715
  },
  {
    "id": "C100533687",
    "name": "Metronome",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.28860964,
    "venue_count": 2,
    "avg_score": 0.64430482
  },
  {
    "id": "C164380108",
    "name": "Attractor",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.2665047,
    "venue_count": 2,
    "avg_score": 0.63325235
  },
  {
    "id": "C87813604",
    "name": "Crossover study",
    "level": 4,
    "total_papers": 2,
    "total_score": 1.3706086000000002,
    "venue_count": 2,
    "avg_score": 0.6853043000000001
  },
  {
    "id": "C2777756574",
    "name": "Virtual community",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.02207654,
    "venue_count": 1,
    "avg_score": 0.51103827
  },
  {
    "id": "C2779942219",
    "name": "Sense of community",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.08508284,
    "venue_count": 1,
    "avg_score": 0.54254142
  },
  {
    "id": "C2781195723",
    "name": "Goal setting",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.2260333,
    "venue_count": 1,
    "avg_score": 0.61301665
  },
  {
    "id": "C2781329482",
    "name": "Conceptual change",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.87112638,
    "venue_count": 2,
    "avg_score": 0.43556319
  },
  {
    "id": "C2781241145",
    "name": "Cyberspace",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.43815555,
    "venue_count": 2,
    "avg_score": 0.719077775
  },
  {
    "id": "C102235558",
    "name": "Herd behavior",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.99634266,
    "venue_count": 2,
    "avg_score": 0.49817133
  },
  {
    "id": "C42972112",
    "name": "Veterinary medicine",
    "level": 1,
    "total_papers": 2,
    "total_score": 0.3311561,
    "venue_count": 2,
    "avg_score": 0.16557805
  },
  {
    "id": "C14184104",
    "name": "Visual analogue scale",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.9333562,
    "venue_count": 2,
    "avg_score": 0.4666781
  },
  {
    "id": "C191925411",
    "name": "Psychology of self",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.08183039,
    "venue_count": 2,
    "avg_score": 0.540915195
  },
  {
    "id": "C138368954",
    "name": "Peer review",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.1364970799999998,
    "venue_count": 2,
    "avg_score": 0.5682485399999999
  },
  {
    "id": "C2778638050",
    "name": "Explanatory model",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.8862387,
    "venue_count": 2,
    "avg_score": 0.44311935
  },
  {
    "id": "C2780945536",
    "name": "Life satisfaction",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.3238212,
    "venue_count": 2,
    "avg_score": 0.6619106
  },
  {
    "id": "C2777042776",
    "name": "Preparedness",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.1082214000000001,
    "venue_count": 2,
    "avg_score": 0.5541107000000001
  },
  {
    "id": "C186528591",
    "name": "Body of knowledge",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.86768753,
    "venue_count": 2,
    "avg_score": 0.433843765
  },
  {
    "id": "C2986834420",
    "name": "Age groups",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.93613309,
    "venue_count": 2,
    "avg_score": 0.468066545
  },
  {
    "id": "C205545832",
    "name": "Young adult",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.94917642,
    "venue_count": 2,
    "avg_score": 0.47458821
  },
  {
    "id": "C2119116",
    "name": "Globalization",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.05069357,
    "venue_count": 2,
    "avg_score": 0.525346785
  },
  {
    "id": "C2779974597",
    "name": "Clinical Practice",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.8463109,
    "venue_count": 2,
    "avg_score": 0.42315545
  },
  {
    "id": "C525551149",
    "name": "Hospitality industry",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.9551548299999999,
    "venue_count": 2,
    "avg_score": 0.47757741499999995
  },
  {
    "id": "C3018457447",
    "name": "Healthcare delivery",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.1565634999999999,
    "venue_count": 2,
    "avg_score": 0.5782817499999999
  },
  {
    "id": "C3018279614",
    "name": "Healthcare service",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.91747103,
    "venue_count": 2,
    "avg_score": 0.458735515
  },
  {
    "id": "C18483071",
    "name": "Anchoring",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.510599,
    "venue_count": 2,
    "avg_score": 0.7552995
  },
  {
    "id": "C2993069335",
    "name": "Empirical examination",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.91186291,
    "venue_count": 2,
    "avg_score": 0.455931455
  },
  {
    "id": "C2780781376",
    "name": "Citizenship",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.4114912099999999,
    "venue_count": 2,
    "avg_score": 0.7057456049999999
  },
  {
    "id": "C136699151",
    "name": "Web 2.0",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.88000056,
    "venue_count": 2,
    "avg_score": 0.44000028
  },
  {
    "id": "C15845906",
    "name": "Data exchange",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.8811471,
    "venue_count": 1,
    "avg_score": 0.44057355
  },
  {
    "id": "C555293320",
    "name": "Diabetes mellitus",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.60963329,
    "venue_count": 1,
    "avg_score": 0.304816645
  },
  {
    "id": "C7545210",
    "name": "Data redundancy",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.2386832,
    "venue_count": 1,
    "avg_score": 0.6193416
  },
  {
    "id": "C2776452267",
    "name": "Secrecy",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.96306057,
    "venue_count": 1,
    "avg_score": 0.481530285
  },
  {
    "id": "C148976360",
    "name": "Information security management",
    "level": 5,
    "total_papers": 2,
    "total_score": 1.29568127,
    "venue_count": 1,
    "avg_score": 0.647840635
  },
  {
    "id": "C103377522",
    "name": "Security information and event management",
    "level": 4,
    "total_papers": 2,
    "total_score": 0.9493294400000001,
    "venue_count": 1,
    "avg_score": 0.47466472000000004
  },
  {
    "id": "C184842701",
    "name": "Cloud computing security",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.59371474,
    "venue_count": 1,
    "avg_score": 0.29685737
  },
  {
    "id": "C2775988433",
    "name": "VisSim",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.75145425,
    "venue_count": 1,
    "avg_score": 0.875727125
  },
  {
    "id": "C207512268",
    "name": "Traffic flow (computer networking)",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.31407693,
    "venue_count": 1,
    "avg_score": 0.657038465
  },
  {
    "id": "C2778391309",
    "name": "Traffic simulation",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.21747577,
    "venue_count": 1,
    "avg_score": 0.608737885
  },
  {
    "id": "C108921912",
    "name": "Transmission delay",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.8470622999999999,
    "venue_count": 1,
    "avg_score": 0.42353114999999997
  },
  {
    "id": "C95349148",
    "name": "Web of Things",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.21421164,
    "venue_count": 1,
    "avg_score": 0.60710582
  },
  {
    "id": "C159423971",
    "name": "Associative property",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.02175984,
    "venue_count": 1,
    "avg_score": 0.51087992
  },
  {
    "id": "C3017997152",
    "name": "Emergency response",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.9992846799999999,
    "venue_count": 2,
    "avg_score": 0.49964233999999996
  },
  {
    "id": "C2779888511",
    "name": "Traffic congestion",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.13200574,
    "venue_count": 2,
    "avg_score": 0.56600287
  },
  {
    "id": "C160333310",
    "name": "Key distribution",
    "level": 4,
    "total_papers": 2,
    "total_score": 0.74385452,
    "venue_count": 2,
    "avg_score": 0.37192726
  },
  {
    "id": "C2779185108",
    "name": "Onboarding",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.17207394,
    "venue_count": 2,
    "avg_score": 0.58603697
  },
  {
    "id": "C2781127519",
    "name": "Monopoly",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.65315975,
    "venue_count": 2,
    "avg_score": 0.826579875
  },
  {
    "id": "C190793597",
    "name": "Application layer",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.83948402,
    "venue_count": 2,
    "avg_score": 0.41974201
  },
  {
    "id": "C2775892892",
    "name": "Revocation",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.0370817799999998,
    "venue_count": 2,
    "avg_score": 0.5185408899999999
  },
  {
    "id": "C2780103759",
    "name": "Design science",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.9575044699999999,
    "venue_count": 2,
    "avg_score": 0.47875223499999997
  },
  {
    "id": "C2776554220",
    "name": "Prosperity",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.3757915600000001,
    "venue_count": 2,
    "avg_score": 0.6878957800000001
  },
  {
    "id": "C83209312",
    "name": "Predictive analytics",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.04008797,
    "venue_count": 2,
    "avg_score": 0.520043985
  },
  {
    "id": "C2780864053",
    "name": "Collision avoidance",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.3967308,
    "venue_count": 2,
    "avg_score": 0.6983654
  },
  {
    "id": "C23130292",
    "name": "Differential privacy",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.30879074,
    "venue_count": 2,
    "avg_score": 0.65439537
  },
  {
    "id": "C18396474",
    "name": "Secure multi-party computation",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.85998025,
    "venue_count": 2,
    "avg_score": 0.429990125
  },
  {
    "id": "C57869625",
    "name": "Rate of convergence",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.9392119800000001,
    "venue_count": 2,
    "avg_score": 0.46960599000000003
  },
  {
    "id": "C2779240695",
    "name": "Headway",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.42486957,
    "venue_count": 2,
    "avg_score": 0.712434785
  },
  {
    "id": "C2984842247",
    "name": "Deep neural networks",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.92478464,
    "venue_count": 2,
    "avg_score": 0.46239232
  },
  {
    "id": "C31858485",
    "name": "Excavation",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.23022895,
    "venue_count": 2,
    "avg_score": 0.615114475
  },
  {
    "id": "C73752529",
    "name": "Object-oriented programming",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.60763618,
    "venue_count": 2,
    "avg_score": 0.30381809
  },
  {
    "id": "C163797641",
    "name": "Tree structure",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.8347081300000001,
    "venue_count": 2,
    "avg_score": 0.41735406500000005
  },
  {
    "id": "C3018950346",
    "name": "Disabled people",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.8826083499999999,
    "venue_count": 2,
    "avg_score": 0.44130417499999997
  },
  {
    "id": "C2987512134",
    "name": "Life style",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.068017274,
    "venue_count": 2,
    "avg_score": 0.034008637
  },
  {
    "id": "C123436394",
    "name": "Proof-of-work system",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.01366019,
    "venue_count": 2,
    "avg_score": 0.506830095
  },
  {
    "id": "C48243021",
    "name": "Strategic planning",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.92756912,
    "venue_count": 2,
    "avg_score": 0.46378456
  },
  {
    "id": "C2780288562",
    "name": "Keyword extraction",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.01392264,
    "venue_count": 2,
    "avg_score": 0.50696132
  },
  {
    "id": "C125112378",
    "name": "Randomness",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.33440928,
    "venue_count": 2,
    "avg_score": 0.66720464
  },
  {
    "id": "C38349280",
    "name": "Flow (mathematics)",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.9582259399999999,
    "venue_count": 2,
    "avg_score": 0.47911296999999997
  },
  {
    "id": "C2779897013",
    "name": "Jumping",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.88217755,
    "venue_count": 2,
    "avg_score": 0.441088775
  },
  {
    "id": "C118530786",
    "name": "Instrumentation (computer programming)",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.93021677,
    "venue_count": 2,
    "avg_score": 0.465108385
  },
  {
    "id": "C97200028",
    "name": "Web engineering",
    "level": 5,
    "total_papers": 2,
    "total_score": 1.18599285,
    "venue_count": 2,
    "avg_score": 0.592996425
  },
  {
    "id": "C172191483",
    "name": "Provisioning",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.30816124,
    "venue_count": 2,
    "avg_score": 0.65408062
  },
  {
    "id": "C29983905",
    "name": "Security service",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.60613772,
    "venue_count": 2,
    "avg_score": 0.30306886
  },
  {
    "id": "C529278444",
    "name": "Central nervous system",
    "level": 2,
    "total_papers": 2,
    "total_score": 0,
    "venue_count": 2,
    "avg_score": 0
  },
  {
    "id": "C63000827",
    "name": "Software portability",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.20939106,
    "venue_count": 2,
    "avg_score": 0.60469553
  },
  {
    "id": "C115051666",
    "name": "Ranging",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.0615094699999998,
    "venue_count": 2,
    "avg_score": 0.5307547349999999
  },
  {
    "id": "C194828623",
    "name": "Emergency medicine",
    "level": 1,
    "total_papers": 2,
    "total_score": 0.85313498,
    "venue_count": 2,
    "avg_score": 0.42656749
  },
  {
    "id": "C141404830",
    "name": "AdaBoost",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.01623522,
    "venue_count": 2,
    "avg_score": 0.50811761
  },
  {
    "id": "C191197275",
    "name": "Session key",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.98011236,
    "venue_count": 2,
    "avg_score": 0.49005618
  },
  {
    "id": "C65155139",
    "name": "Envelope (radar)",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.10325209,
    "venue_count": 2,
    "avg_score": 0.551626045
  },
  {
    "id": "C136810230",
    "name": "Decentralization",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.2345313999999998,
    "venue_count": 1,
    "avg_score": 0.6172656999999999
  },
  {
    "id": "C2775973920",
    "name": "Selection algorithm",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.92358989,
    "venue_count": 1,
    "avg_score": 0.461794945
  },
  {
    "id": "C176808163",
    "name": "Signal strength",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.95217985,
    "venue_count": 1,
    "avg_score": 0.476089925
  },
  {
    "id": "C106365562",
    "name": "Radio access network",
    "level": 4,
    "total_papers": 2,
    "total_score": 1.27750968,
    "venue_count": 1,
    "avg_score": 0.63875484
  },
  {
    "id": "C207029474",
    "name": "Mobile station",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.35297723999999997,
    "venue_count": 1,
    "avg_score": 0.17648861999999998
  },
  {
    "id": "C2779191767",
    "name": "Mobile cloud computing",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.1695664,
    "venue_count": 1,
    "avg_score": 0.5847832
  },
  {
    "id": "C2781368080",
    "name": "Context awareness",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.9602523199999999,
    "venue_count": 1,
    "avg_score": 0.48012615999999997
  },
  {
    "id": "C115537543",
    "name": "Cache",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.3448917900000001,
    "venue_count": 1,
    "avg_score": 0.6724458950000001
  },
  {
    "id": "C140547941",
    "name": "Threat model",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.8490307,
    "venue_count": 1,
    "avg_score": 0.42451535
  },
  {
    "id": "C2777710495",
    "name": "Gateway (web page)",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.9576072099999999,
    "venue_count": 1,
    "avg_score": 0.47880360499999997
  },
  {
    "id": "C205533965",
    "name": "Key escrow",
    "level": 4,
    "total_papers": 2,
    "total_score": 1.34394563,
    "venue_count": 1,
    "avg_score": 0.671972815
  },
  {
    "id": "C144097018",
    "name": "Service discovery",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.1395274,
    "venue_count": 1,
    "avg_score": 0.5697637
  },
  {
    "id": "C149946192",
    "name": "Cognitive radio",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.0832641,
    "venue_count": 1,
    "avg_score": 0.54163205
  },
  {
    "id": "C106251023",
    "name": "Porting",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.9562512400000001,
    "venue_count": 1,
    "avg_score": 0.47812562000000003
  },
  {
    "id": "C2992525071",
    "name": "Federated learning",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.2139966599999998,
    "venue_count": 1,
    "avg_score": 0.6069983299999999
  },
  {
    "id": "C2780767217",
    "name": "Generality",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.04441156,
    "venue_count": 1,
    "avg_score": 0.52220578
  },
  {
    "id": "C94966114",
    "name": "Black box",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.2735219999999998,
    "venue_count": 2,
    "avg_score": 0.6367609999999999
  },
  {
    "id": "C88516994",
    "name": "Dynamic time warping",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.2221171000000002,
    "venue_count": 2,
    "avg_score": 0.6110585500000001
  },
  {
    "id": "C78639753",
    "name": "Behavioral modeling",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.9749576799999999,
    "venue_count": 2,
    "avg_score": 0.48747883999999997
  },
  {
    "id": "C2777810591",
    "name": "Credential",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.67184084,
    "venue_count": 2,
    "avg_score": 0.83592042
  },
  {
    "id": "C187212893",
    "name": "Pediatrics",
    "level": 1,
    "total_papers": 2,
    "total_score": 0.49801481,
    "venue_count": 2,
    "avg_score": 0.249007405
  },
  {
    "id": "C513059894",
    "name": "Food industry",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.93019563,
    "venue_count": 2,
    "avg_score": 0.465097815
  },
  {
    "id": "C185429906",
    "name": "Estimator",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.63324285,
    "venue_count": 2,
    "avg_score": 0.316621425
  },
  {
    "id": "C191485582",
    "name": "Mobility model",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.38845484,
    "venue_count": 2,
    "avg_score": 0.69422742
  },
  {
    "id": "C74912251",
    "name": "Memory footprint",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.29709996,
    "venue_count": 2,
    "avg_score": 0.64854998
  },
  {
    "id": "C2776898695",
    "name": "Smart device",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.96783093,
    "venue_count": 2,
    "avg_score": 0.483915465
  },
  {
    "id": "C516764902",
    "name": "Mobile Web",
    "level": 4,
    "total_papers": 2,
    "total_score": 0.9548315700000001,
    "venue_count": 2,
    "avg_score": 0.47741578500000004
  },
  {
    "id": "C2776224158",
    "name": "Phrase",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.20294076,
    "venue_count": 2,
    "avg_score": 0.60147038
  },
  {
    "id": "C2988147884",
    "name": "Energy expenditure",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.4247007,
    "venue_count": 2,
    "avg_score": 0.71235035
  },
  {
    "id": "C77019957",
    "name": "Dependability",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.13280516,
    "venue_count": 2,
    "avg_score": 0.56640258
  },
  {
    "id": "C187320778",
    "name": "Geotechnical engineering",
    "level": 1,
    "total_papers": 2,
    "total_score": 0.1082724,
    "venue_count": 2,
    "avg_score": 0.0541362
  },
  {
    "id": "C45804977",
    "name": "Predictive modelling",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.89219257,
    "venue_count": 2,
    "avg_score": 0.446096285
  },
  {
    "id": "C39853841",
    "name": "Urbanization",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.01635266,
    "venue_count": 2,
    "avg_score": 0.50817633
  },
  {
    "id": "C2779422653",
    "name": "Aphasia",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.88648513,
    "venue_count": 2,
    "avg_score": 0.443242565
  },
  {
    "id": "C2780542009",
    "name": "Online identity",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.99203012,
    "venue_count": 1,
    "avg_score": 0.49601506
  },
  {
    "id": "C517757529",
    "name": "e-Science",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.02398392,
    "venue_count": 2,
    "avg_score": 0.51199196
  },
  {
    "id": "C163877629",
    "name": "Social constructionism",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.05389928,
    "venue_count": 2,
    "avg_score": 0.52694964
  },
  {
    "id": "C148863701",
    "name": "Encyclopedia",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.52973823,
    "venue_count": 2,
    "avg_score": 0.764869115
  },
  {
    "id": "C46934059",
    "name": "Outsourcing",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.3476496,
    "venue_count": 2,
    "avg_score": 0.6738248
  },
  {
    "id": "C97944126",
    "name": "Business decision mapping",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.89699583,
    "venue_count": 2,
    "avg_score": 0.448497915
  },
  {
    "id": "C2777293324",
    "name": "Honesty",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.46209368,
    "venue_count": 2,
    "avg_score": 0.73104684
  },
  {
    "id": "C135121143",
    "name": "Hegemony",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.43505933,
    "venue_count": 2,
    "avg_score": 0.717529665
  },
  {
    "id": "C2780771206",
    "name": "Safeguard",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.26044088,
    "venue_count": 2,
    "avg_score": 0.63022044
  },
  {
    "id": "C44210515",
    "name": "Bespoke",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.2381730499999999,
    "venue_count": 2,
    "avg_score": 0.6190865249999999
  },
  {
    "id": "C2776294918",
    "name": "Aging in place",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.1511521299999998,
    "venue_count": 2,
    "avg_score": 0.5755760649999999
  },
  {
    "id": "C13558536",
    "name": "Cropping",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.2694542599999998,
    "venue_count": 2,
    "avg_score": 0.6347271299999999
  },
  {
    "id": "C2776050585",
    "name": "Scrutiny",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.1655409300000001,
    "venue_count": 2,
    "avg_score": 0.5827704650000001
  },
  {
    "id": "C33643355",
    "name": "Count data",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.3529579,
    "venue_count": 2,
    "avg_score": 0.67647895
  },
  {
    "id": "C2776228582",
    "name": "Service robot",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.87743365,
    "venue_count": 1,
    "avg_score": 0.438716825
  },
  {
    "id": "C9870796",
    "name": "Turing",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.0375025,
    "venue_count": 2,
    "avg_score": 0.51875125
  },
  {
    "id": "C68767595",
    "name": "Contiguity",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.17350434,
    "venue_count": 2,
    "avg_score": 0.58675217
  },
  {
    "id": "C36462376",
    "name": "Enculturation",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.17619677,
    "venue_count": 2,
    "avg_score": 0.588098385
  },
  {
    "id": "C43246008",
    "name": "Tertiary sector of the economy",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.93383092,
    "venue_count": 2,
    "avg_score": 0.46691546
  },
  {
    "id": "C547646559",
    "name": "Hygiene",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.0440108000000001,
    "venue_count": 2,
    "avg_score": 0.5220054000000001
  },
  {
    "id": "C2781253360",
    "name": "Screen time",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.0975213,
    "venue_count": 2,
    "avg_score": 0.54876065
  },
  {
    "id": "C181622380",
    "name": "Profit (economics)",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.5602973,
    "venue_count": 2,
    "avg_score": 0.28014865
  },
  {
    "id": "C2780573756",
    "name": "Wonder",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.29282066,
    "venue_count": 2,
    "avg_score": 0.64641033
  },
  {
    "id": "C994952",
    "name": "Mooring",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.11215712,
    "venue_count": 2,
    "avg_score": 0.55607856
  },
  {
    "id": "C2778329345",
    "name": "Prestige",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.6749081000000001,
    "venue_count": 2,
    "avg_score": 0.8374540500000001
  },
  {
    "id": "C114713312",
    "name": "Social network analysis",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.971872,
    "venue_count": 2,
    "avg_score": 0.485936
  },
  {
    "id": "C144559511",
    "name": "Principal (computer security)",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.12918185,
    "venue_count": 2,
    "avg_score": 0.564590925
  },
  {
    "id": "C189634115",
    "name": "Face-to-face interaction",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.2724876,
    "venue_count": 2,
    "avg_score": 0.6362438
  },
  {
    "id": "C109778625",
    "name": "Computer-mediated communication",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.92867762,
    "venue_count": 2,
    "avg_score": 0.46433881
  },
  {
    "id": "C2776641880",
    "name": "Suicidal ideation",
    "level": 4,
    "total_papers": 2,
    "total_score": 1.68265955,
    "venue_count": 2,
    "avg_score": 0.841329775
  },
  {
    "id": "C173481278",
    "name": "Survey research",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.8448202,
    "venue_count": 2,
    "avg_score": 0.4224101
  },
  {
    "id": "C2780203653",
    "name": "Dual process theory (moral psychology)",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.84000648,
    "venue_count": 2,
    "avg_score": 0.42000324
  },
  {
    "id": "C57996006",
    "name": "Moral disengagement",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.4904973,
    "venue_count": 2,
    "avg_score": 0.24524865
  },
  {
    "id": "C2779027411",
    "name": "Trademark",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.0635287,
    "venue_count": 1,
    "avg_score": 0.53176435
  },
  {
    "id": "C2779696404",
    "name": "Market orientation",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.06716957,
    "venue_count": 1,
    "avg_score": 0.533584785
  },
  {
    "id": "C2777216475",
    "name": "Coopetition",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.97792104,
    "venue_count": 1,
    "avg_score": 0.98896052
  },
  {
    "id": "C2993150066",
    "name": "Green innovation",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.24039778,
    "venue_count": 1,
    "avg_score": 0.62019889
  },
  {
    "id": "C33009525",
    "name": "Coevolution",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.33840534,
    "venue_count": 1,
    "avg_score": 0.66920267
  },
  {
    "id": "C2779962586",
    "name": "Policy mix",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.4042071200000001,
    "venue_count": 1,
    "avg_score": 0.7021035600000001
  },
  {
    "id": "C176239081",
    "name": "Stakeholder theory",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.16324097,
    "venue_count": 1,
    "avg_score": 0.581620485
  },
  {
    "id": "C2776589375",
    "name": "Microfoundations",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.4996525,
    "venue_count": 1,
    "avg_score": 0.74982625
  },
  {
    "id": "C162754035",
    "name": "Artifact-centric business process model",
    "level": 5,
    "total_papers": 2,
    "total_score": 0.85872432,
    "venue_count": 1,
    "avg_score": 0.42936216
  },
  {
    "id": "C34630208",
    "name": "New business development",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.9401330999999999,
    "venue_count": 1,
    "avg_score": 0.47006654999999997
  },
  {
    "id": "C2776601338",
    "name": "New Ventures",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.9008994,
    "venue_count": 1,
    "avg_score": 0.4504497
  },
  {
    "id": "C165672731",
    "name": "Organizational performance",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.99614917,
    "venue_count": 1,
    "avg_score": 0.498074585
  },
  {
    "id": "C2777785971",
    "name": "Disruptive innovation",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.98361315,
    "venue_count": 1,
    "avg_score": 0.491806575
  },
  {
    "id": "C36829320",
    "name": "Service product management",
    "level": 5,
    "total_papers": 2,
    "total_score": 1.04408654,
    "venue_count": 1,
    "avg_score": 0.52204327
  },
  {
    "id": "C137335462",
    "name": "Lean manufacturing",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.45321032,
    "venue_count": 2,
    "avg_score": 0.22660516
  },
  {
    "id": "C134121241",
    "name": "Yield (engineering)",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.89353023,
    "venue_count": 2,
    "avg_score": 0.446765115
  },
  {
    "id": "C77854861",
    "name": "Advanced manufacturing",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.8263522,
    "venue_count": 2,
    "avg_score": 0.4131761
  },
  {
    "id": "C21333345",
    "name": "Health technology",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.89417035,
    "venue_count": 2,
    "avg_score": 0.447085175
  },
  {
    "id": "C88482812",
    "name": "Modular programming",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.1154204,
    "venue_count": 2,
    "avg_score": 0.5577102
  },
  {
    "id": "C43540301",
    "name": "Paradigm shift",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.06288469,
    "venue_count": 2,
    "avg_score": 0.531442345
  },
  {
    "id": "C60297154",
    "name": "Contingency theory",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.0317415,
    "venue_count": 2,
    "avg_score": 0.51587075
  },
  {
    "id": "C2777946921",
    "name": "Semantic analysis (machine learning)",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.82360056,
    "venue_count": 2,
    "avg_score": 0.41180028
  },
  {
    "id": "C2778800418",
    "name": "TRIZ",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.8387102,
    "venue_count": 2,
    "avg_score": 0.9193551
  },
  {
    "id": "C138101251",
    "name": "Thread (computing)",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.09045815,
    "venue_count": 2,
    "avg_score": 0.545229075
  },
  {
    "id": "C2780535194",
    "name": "Open data",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.8505464300000001,
    "venue_count": 2,
    "avg_score": 0.42527321500000004
  },
  {
    "id": "C199168358",
    "name": "Orchestration",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.49244274,
    "venue_count": 2,
    "avg_score": 0.74622137
  },
  {
    "id": "C41866144",
    "name": "Industrialisation",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.93998268,
    "venue_count": 2,
    "avg_score": 0.46999134
  },
  {
    "id": "C2779478453",
    "name": "Modularity (biology)",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.46001732,
    "venue_count": 2,
    "avg_score": 0.73000866
  },
  {
    "id": "C58941895",
    "name": "Ecosystem services",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.02739366,
    "venue_count": 2,
    "avg_score": 0.51369683
  },
  {
    "id": "C121426985",
    "name": "Private sector",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.91351849,
    "venue_count": 2,
    "avg_score": 0.456759245
  },
  {
    "id": "C18296254",
    "name": "Skepticism",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.30361206,
    "venue_count": 2,
    "avg_score": 0.65180603
  },
  {
    "id": "C175605778",
    "name": "Natural resource economics",
    "level": 1,
    "total_papers": 2,
    "total_score": 0.67527073,
    "venue_count": 2,
    "avg_score": 0.337635365
  },
  {
    "id": "C133425853",
    "name": "Neoclassical economics",
    "level": 1,
    "total_papers": 2,
    "total_score": 0.61054415,
    "venue_count": 2,
    "avg_score": 0.305272075
  },
  {
    "id": "C2776809989",
    "name": "Adaptive reuse",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.09801067,
    "venue_count": 1,
    "avg_score": 0.549005335
  },
  {
    "id": "C9664280",
    "name": "Sociocultural anthropology",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.00318861,
    "venue_count": 1,
    "avg_score": 0.501594305
  },
  {
    "id": "C75373757",
    "name": "Sampling design",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.2288721,
    "venue_count": 2,
    "avg_score": 0.61443605
  },
  {
    "id": "C2780991453",
    "name": "Virtual prototyping",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.90299867,
    "venue_count": 2,
    "avg_score": 0.451499335
  },
  {
    "id": "C114115404",
    "name": "Divergent thinking",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.167403,
    "venue_count": 2,
    "avg_score": 0.5837015
  },
  {
    "id": "C171560490",
    "name": "Convergent thinking",
    "level": 4,
    "total_papers": 2,
    "total_score": 1.08671496,
    "venue_count": 2,
    "avg_score": 0.54335748
  },
  {
    "id": "C2777402642",
    "name": "Explanatory power",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.10092539,
    "venue_count": 2,
    "avg_score": 0.550462695
  },
  {
    "id": "C2778734332",
    "name": "Research development",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.92823548,
    "venue_count": 2,
    "avg_score": 0.46411774
  },
  {
    "id": "C53016008",
    "name": "Front and back ends",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.0053156300000001,
    "venue_count": 2,
    "avg_score": 0.5026578150000001
  },
  {
    "id": "C150672426",
    "name": "Brainstorming",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.1580829400000001,
    "venue_count": 2,
    "avg_score": 0.5790414700000001
  },
  {
    "id": "C2778119611",
    "name": "Problematization",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.82778655,
    "venue_count": 2,
    "avg_score": 0.913893275
  },
  {
    "id": "C38022665",
    "name": "Disposition",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.43156701,
    "venue_count": 2,
    "avg_score": 0.715783505
  },
  {
    "id": "C2909745347",
    "name": "Postage Stamps",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.8181270999999999,
    "venue_count": 2,
    "avg_score": 0.9090635499999999
  },
  {
    "id": "C2781374135",
    "name": "Explication",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.5465916000000002,
    "venue_count": 2,
    "avg_score": 0.7732958000000001
  },
  {
    "id": "C104247647",
    "name": "Environmental graphic design",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.88584772,
    "venue_count": 2,
    "avg_score": 0.44292386
  },
  {
    "id": "C2776327626",
    "name": "Performativity",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.15289213,
    "venue_count": 2,
    "avg_score": 0.576446065
  },
  {
    "id": "C27362006",
    "name": "Gestalt psychology",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.07974144,
    "venue_count": 2,
    "avg_score": 0.53987072
  },
  {
    "id": "C2780728851",
    "name": "Tile",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.02369373,
    "venue_count": 2,
    "avg_score": 0.511846865
  },
  {
    "id": "C73440236",
    "name": "Psyche",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.19421415,
    "venue_count": 2,
    "avg_score": 0.597107075
  },
  {
    "id": "C121446783",
    "name": "Circadian rhythm",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.67950565,
    "venue_count": 2,
    "avg_score": 0.339752825
  },
  {
    "id": "C32230216",
    "name": "Uncertainty quantification",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.09616798,
    "venue_count": 2,
    "avg_score": 0.54808399
  },
  {
    "id": "C29717899",
    "name": "Critical realism (philosophy of perception)",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.2404172500000001,
    "venue_count": 1,
    "avg_score": 0.6202086250000001
  },
  {
    "id": "C36727532",
    "name": "Educational research",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.84290203,
    "venue_count": 1,
    "avg_score": 0.421451015
  },
  {
    "id": "C2909376813",
    "name": "Coronavirus Infections",
    "level": 5,
    "total_papers": 2,
    "total_score": 0.87850255,
    "venue_count": 1,
    "avg_score": 0.439251275
  },
  {
    "id": "C155108698",
    "name": "Randomized experiment",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.90972751,
    "venue_count": 1,
    "avg_score": 0.454863755
  },
  {
    "id": "C172400760",
    "name": "Survivorship curve",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.1382529799999999,
    "venue_count": 1,
    "avg_score": 0.5691264899999999
  },
  {
    "id": "C2993482122",
    "name": "Cancer survivorship",
    "level": 4,
    "total_papers": 2,
    "total_score": 1.0634194,
    "venue_count": 1,
    "avg_score": 0.5317097
  },
  {
    "id": "C95986675",
    "name": "Quantitative analysis (chemistry)",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.91102102,
    "venue_count": 1,
    "avg_score": 0.45551051
  },
  {
    "id": "C168646138",
    "name": "Cross-cultural",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.93882769,
    "venue_count": 1,
    "avg_score": 0.469413845
  },
  {
    "id": "C2776496909",
    "name": "Repertory grid",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.84703635,
    "venue_count": 1,
    "avg_score": 0.923518175
  },
  {
    "id": "C2986550218",
    "name": "Mixed mode",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.88082266,
    "venue_count": 1,
    "avg_score": 0.44041133
  },
  {
    "id": "C2776845398",
    "name": "Legitimation",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.6039463500000002,
    "venue_count": 2,
    "avg_score": 0.8019731750000001
  },
  {
    "id": "C33332235",
    "name": "Theoretical physics",
    "level": 1,
    "total_papers": 2,
    "total_score": 0.9152723,
    "venue_count": 2,
    "avg_score": 0.45763615
  },
  {
    "id": "C552651612",
    "name": "Visual thinking",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.17049056,
    "venue_count": 2,
    "avg_score": 0.58524528
  },
  {
    "id": "C63108463",
    "name": "Complex adaptive system",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.03690958,
    "venue_count": 2,
    "avg_score": 0.51845479
  },
  {
    "id": "C68122502",
    "name": "Informed consent",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.9734396,
    "venue_count": 2,
    "avg_score": 0.4867198
  },
  {
    "id": "C2776831955",
    "name": "Somali",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.23347622,
    "venue_count": 2,
    "avg_score": 0.61673811
  },
  {
    "id": "C2778456462",
    "name": "Humility",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.54215516,
    "venue_count": 2,
    "avg_score": 0.77107758
  },
  {
    "id": "C185544564",
    "name": "Nuclear physics",
    "level": 1,
    "total_papers": 2,
    "total_score": 0,
    "venue_count": 2,
    "avg_score": 0
  },
  {
    "id": "C2776285698",
    "name": "Exposition (narrative)",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.01723444,
    "venue_count": 2,
    "avg_score": 0.50861722
  },
  {
    "id": "C137878579",
    "name": "Joint attention",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.02863309,
    "venue_count": 2,
    "avg_score": 0.514316545
  },
  {
    "id": "C472806",
    "name": "Science communication",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.14140276,
    "venue_count": 1,
    "avg_score": 0.57070138
  },
  {
    "id": "C2781334022",
    "name": "Professionalization",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.5222714000000002,
    "venue_count": 1,
    "avg_score": 0.7611357000000001
  },
  {
    "id": "C7991579",
    "name": "Criticism",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.216334,
    "venue_count": 1,
    "avg_score": 0.608167
  },
  {
    "id": "C79615585",
    "name": "Civics",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.73680046,
    "venue_count": 2,
    "avg_score": 0.86840023
  },
  {
    "id": "C2778896172",
    "name": "Manifesto",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.74375984,
    "venue_count": 2,
    "avg_score": 0.87187992
  },
  {
    "id": "C132413290",
    "name": "Reflective practice",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.2925046999999998,
    "venue_count": 2,
    "avg_score": 0.6462523499999999
  },
  {
    "id": "C2776154427",
    "name": "Constitution",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.1203381399999999,
    "venue_count": 2,
    "avg_score": 0.5601690699999999
  },
  {
    "id": "C2778360550",
    "name": "Transdisciplinarity",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.28964915,
    "venue_count": 2,
    "avg_score": 0.644824575
  },
  {
    "id": "C142259097",
    "name": "Homogeneity (statistics)",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.01467771,
    "venue_count": 2,
    "avg_score": 0.507338855
  },
  {
    "id": "C161840515",
    "name": "Terrain",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.2175713,
    "venue_count": 2,
    "avg_score": 0.60878565
  },
  {
    "id": "C80797182",
    "name": "Typeface",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.32967924,
    "venue_count": 2,
    "avg_score": 0.66483962
  },
  {
    "id": "C108865711",
    "name": "Landscape design",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.37113276,
    "venue_count": 2,
    "avg_score": 0.68556638
  },
  {
    "id": "C156812175",
    "name": "Organizational architecture",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.88112604,
    "venue_count": 2,
    "avg_score": 0.44056302
  },
  {
    "id": "C4445939",
    "name": "Islam",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.28311176,
    "venue_count": 2,
    "avg_score": 0.64155588
  },
  {
    "id": "C2779151265",
    "name": "Copying",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.0790572,
    "venue_count": 2,
    "avg_score": 0.5395286
  },
  {
    "id": "C2992860105",
    "name": "Subject matter",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.08600411,
    "venue_count": 2,
    "avg_score": 0.543002055
  },
  {
    "id": "C56273599",
    "name": "White (mutation)",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.0530057,
    "venue_count": 2,
    "avg_score": 0.52650285
  },
  {
    "id": "C2984692916",
    "name": "Website design",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.9736287699999999,
    "venue_count": 2,
    "avg_score": 0.48681438499999996
  },
  {
    "id": "C542530943",
    "name": "Multiculturalism",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.22647225,
    "venue_count": 2,
    "avg_score": 0.613236125
  },
  {
    "id": "C131675550",
    "name": "Surrogate model",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.09752107,
    "venue_count": 1,
    "avg_score": 0.548760535
  },
  {
    "id": "C129641003",
    "name": "Active shape model",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.57289979,
    "venue_count": 1,
    "avg_score": 0.286449895
  },
  {
    "id": "C150799807",
    "name": "Subtractive color",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.3395081100000001,
    "venue_count": 1,
    "avg_score": 0.6697540550000001
  },
  {
    "id": "C519885992",
    "name": "Fiber",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.04773614,
    "venue_count": 1,
    "avg_score": 0.52386807
  },
  {
    "id": "C192939610",
    "name": "Differential geometry",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.88622163,
    "venue_count": 1,
    "avg_score": 0.443110815
  },
  {
    "id": "C182950735",
    "name": "Tensegrity",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.46128957,
    "venue_count": 1,
    "avg_score": 0.730644785
  },
  {
    "id": "C2780186347",
    "name": "Subnetwork",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.5646363,
    "venue_count": 1,
    "avg_score": 0.78231815
  },
  {
    "id": "C2781219549",
    "name": "Infill",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.67086494,
    "venue_count": 1,
    "avg_score": 0.83543247
  },
  {
    "id": "C56200935",
    "name": "Nozzle",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.13220924,
    "venue_count": 1,
    "avg_score": 0.56610462
  },
  {
    "id": "C15001198",
    "name": "Toroid",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.25100705,
    "venue_count": 1,
    "avg_score": 0.625503525
  },
  {
    "id": "C82706917",
    "name": "Plasma",
    "level": 2,
    "total_papers": 2,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C184389593",
    "name": "Curve fitting",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.15116777,
    "venue_count": 1,
    "avg_score": 0.575583885
  },
  {
    "id": "C190694206",
    "name": "Polygon (computer graphics)",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.21817959,
    "venue_count": 1,
    "avg_score": 0.609089795
  },
  {
    "id": "C80899671",
    "name": "Vertex (graph theory)",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.98703277,
    "venue_count": 1,
    "avg_score": 0.493516385
  },
  {
    "id": "C185877587",
    "name": "Medial axis",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.09281221,
    "venue_count": 1,
    "avg_score": 0.546406105
  },
  {
    "id": "C2778722038",
    "name": "Homogenization (climate)",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.3831309,
    "venue_count": 1,
    "avg_score": 0.69156545
  },
  {
    "id": "C40319758",
    "name": "Geometric design",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.9980806200000001,
    "venue_count": 1,
    "avg_score": 0.49904031000000004
  },
  {
    "id": "C90119067",
    "name": "Polynomial",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.04557516,
    "venue_count": 1,
    "avg_score": 0.52278758
  },
  {
    "id": "C184050105",
    "name": "Isotropy",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.2718322,
    "venue_count": 1,
    "avg_score": 0.6359161
  },
  {
    "id": "C35441770",
    "name": "Statics",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.07417082,
    "venue_count": 1,
    "avg_score": 0.53708541
  },
  {
    "id": "C173534245",
    "name": "Truss",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.4490935999999999,
    "venue_count": 1,
    "avg_score": 0.7245467999999999
  },
  {
    "id": "C22411076",
    "name": "Hexahedron",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.57714297,
    "venue_count": 1,
    "avg_score": 0.788571485
  },
  {
    "id": "C85725439",
    "name": "Anisotropy",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.95184365,
    "venue_count": 1,
    "avg_score": 0.475921825
  },
  {
    "id": "C57691317",
    "name": "Scalar (mathematics)",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.0259403,
    "venue_count": 1,
    "avg_score": 0.51297015
  },
  {
    "id": "C112604564",
    "name": "Shape analysis (program analysis)",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.1512390399999999,
    "venue_count": 1,
    "avg_score": 0.5756195199999999
  },
  {
    "id": "C124961601",
    "name": "Conical surface",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.3270947899999999,
    "venue_count": 1,
    "avg_score": 0.6635473949999999
  },
  {
    "id": "C186450821",
    "name": "Euclidean space",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.1147069699999999,
    "venue_count": 1,
    "avg_score": 0.5573534849999999
  },
  {
    "id": "C42812",
    "name": "Partition (number theory)",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.9732787,
    "venue_count": 1,
    "avg_score": 0.48663935
  },
  {
    "id": "C165464430",
    "name": "Parameterized complexity",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.2865541299999999,
    "venue_count": 1,
    "avg_score": 0.6432770649999999
  },
  {
    "id": "C99636146",
    "name": "Parametric equation",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.94510173,
    "venue_count": 1,
    "avg_score": 0.472550865
  },
  {
    "id": "C29081049",
    "name": "Image stitching",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.35820872,
    "venue_count": 1,
    "avg_score": 0.67910436
  },
  {
    "id": "C141297171",
    "name": "Octree",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.50407099,
    "venue_count": 1,
    "avg_score": 0.752035495
  },
  {
    "id": "C105569014",
    "name": "Porous medium",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.94236433,
    "venue_count": 1,
    "avg_score": 0.471182165
  },
  {
    "id": "C2777880405",
    "name": "Cutter location",
    "level": 4,
    "total_papers": 2,
    "total_score": 1.07480154,
    "venue_count": 1,
    "avg_score": 0.53740077
  },
  {
    "id": "C91188154",
    "name": "Vector field",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.89962548,
    "venue_count": 1,
    "avg_score": 0.44981274
  },
  {
    "id": "C143392562",
    "name": "Subdivision",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.4447631699999999,
    "venue_count": 1,
    "avg_score": 0.7223815849999999
  },
  {
    "id": "C17825722",
    "name": "Plane (geometry)",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.9436374900000001,
    "venue_count": 1,
    "avg_score": 0.47181874500000004
  },
  {
    "id": "C2779219049",
    "name": "Quadric",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.2699406500000001,
    "venue_count": 1,
    "avg_score": 0.6349703250000001
  },
  {
    "id": "C172657837",
    "name": "Clenshaw–Curtis quadrature",
    "level": 5,
    "total_papers": 2,
    "total_score": 1.3207650000000002,
    "venue_count": 1,
    "avg_score": 0.6603825000000001
  },
  {
    "id": "C14103991",
    "name": "Gauss–Kronrod quadrature formula",
    "level": 4,
    "total_papers": 2,
    "total_score": 1.28598986,
    "venue_count": 1,
    "avg_score": 0.64299493
  },
  {
    "id": "C162046254",
    "name": "Tanh-sinh quadrature",
    "level": 5,
    "total_papers": 2,
    "total_score": 1.2686067,
    "venue_count": 1,
    "avg_score": 0.63430335
  },
  {
    "id": "C54691486",
    "name": "Gauss–Jacobi quadrature",
    "level": 5,
    "total_papers": 2,
    "total_score": 1.29103583,
    "venue_count": 1,
    "avg_score": 0.645517915
  },
  {
    "id": "C127349201",
    "name": "Numerical integration",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.2549809,
    "venue_count": 1,
    "avg_score": 0.62749045
  },
  {
    "id": "C6866599",
    "name": "Gauss–Laguerre quadrature",
    "level": 5,
    "total_papers": 2,
    "total_score": 0.93018247,
    "venue_count": 1,
    "avg_score": 0.465091235
  },
  {
    "id": "C167590341",
    "name": "Gauss–Hermite quadrature",
    "level": 5,
    "total_papers": 2,
    "total_score": 0.9171876,
    "venue_count": 1,
    "avg_score": 0.4585938
  },
  {
    "id": "C27016315",
    "name": "Integral equation",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.3200196,
    "venue_count": 1,
    "avg_score": 0.1600098
  },
  {
    "id": "C125269122",
    "name": "Level set method",
    "level": 4,
    "total_papers": 2,
    "total_score": 0.93840319,
    "venue_count": 1,
    "avg_score": 0.469201595
  },
  {
    "id": "C153008295",
    "name": "Level set (data structures)",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.01911826,
    "venue_count": 1,
    "avg_score": 0.50955913
  },
  {
    "id": "C54170458",
    "name": "Voxel",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.4064879,
    "venue_count": 1,
    "avg_score": 0.70324395
  },
  {
    "id": "C56951928",
    "name": "Trimming",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.98127094,
    "venue_count": 1,
    "avg_score": 0.49063547
  },
  {
    "id": "C98343798",
    "name": "Curvilinear coordinates",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.85676993,
    "venue_count": 1,
    "avg_score": 0.428384965
  },
  {
    "id": "C2778753569",
    "name": "Span (engineering)",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.8642410700000001,
    "venue_count": 2,
    "avg_score": 0.43212053500000003
  },
  {
    "id": "C181605269",
    "name": "Jerk",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.8402257,
    "venue_count": 2,
    "avg_score": 0.92011285
  },
  {
    "id": "C175017881",
    "name": "Mean curvature",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.15366125,
    "venue_count": 2,
    "avg_score": 0.076830625
  },
  {
    "id": "C13393347",
    "name": "Aerodynamics",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.61372226,
    "venue_count": 2,
    "avg_score": 0.30686113
  },
  {
    "id": "C58103923",
    "name": "Silhouette",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.8739255100000001,
    "venue_count": 2,
    "avg_score": 0.43696275500000004
  },
  {
    "id": "C69357855",
    "name": "Diffusion",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.19898718,
    "venue_count": 2,
    "avg_score": 0.59949359
  },
  {
    "id": "C2777006462",
    "name": "Adaptive capacity",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.2577164299999999,
    "venue_count": 1,
    "avg_score": 0.6288582149999999
  },
  {
    "id": "C60465272",
    "name": "Range of motion",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.8513481700000001,
    "venue_count": 1,
    "avg_score": 0.42567408500000004
  },
  {
    "id": "C3019666875",
    "name": "Assembly line",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.13804166,
    "venue_count": 1,
    "avg_score": 0.56902083
  },
  {
    "id": "C2779685841",
    "name": "Transitional care",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.31020212,
    "venue_count": 1,
    "avg_score": 0.65510106
  },
  {
    "id": "C77595967",
    "name": "Forensic engineering",
    "level": 1,
    "total_papers": 2,
    "total_score": 0.73694956,
    "venue_count": 1,
    "avg_score": 0.36847478
  },
  {
    "id": "C188816634",
    "name": "Prospective cohort study",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.30093276,
    "venue_count": 1,
    "avg_score": 0.65046638
  },
  {
    "id": "C2777512617",
    "name": "Staffing",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.5106918,
    "venue_count": 1,
    "avg_score": 0.7553459
  },
  {
    "id": "C2776870768",
    "name": "Whole body vibration",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.63288354,
    "venue_count": 1,
    "avg_score": 0.81644177
  },
  {
    "id": "C176400912",
    "name": "Cluster randomised controlled trial",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.1660778,
    "venue_count": 1,
    "avg_score": 0.5830389
  },
  {
    "id": "C22140971",
    "name": "Shear force",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.97035008,
    "venue_count": 1,
    "avg_score": 0.48517504
  },
  {
    "id": "C2776746162",
    "name": "Navy",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.54599266,
    "venue_count": 1,
    "avg_score": 0.77299633
  },
  {
    "id": "C3019079563",
    "name": "Skin temperature",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.00103193,
    "venue_count": 2,
    "avg_score": 0.500515965
  },
  {
    "id": "C2780493683",
    "name": "Hearing loss",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.5174085,
    "venue_count": 2,
    "avg_score": 0.25870425
  },
  {
    "id": "C61511704",
    "name": "Incidence (geometry)",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.18473225,
    "venue_count": 2,
    "avg_score": 0.592366125
  },
  {
    "id": "C201903717",
    "name": "Cohort study",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.9795574199999999,
    "venue_count": 2,
    "avg_score": 0.48977870999999995
  },
  {
    "id": "C72563966",
    "name": "Cohort",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.20485597,
    "venue_count": 2,
    "avg_score": 0.602427985
  },
  {
    "id": "C77350462",
    "name": "Confounding",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.96069894,
    "venue_count": 2,
    "avg_score": 0.48034947
  },
  {
    "id": "C2777522676",
    "name": "Kneeling",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.2807886800000001,
    "venue_count": 2,
    "avg_score": 0.6403943400000001
  },
  {
    "id": "C119971845",
    "name": "Squatting position",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.57211912,
    "venue_count": 2,
    "avg_score": 0.78605956
  },
  {
    "id": "C2778448659",
    "name": "Overtaking",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.41144873,
    "venue_count": 2,
    "avg_score": 0.705724365
  },
  {
    "id": "C3020535179",
    "name": "Medical device",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.9292095,
    "venue_count": 2,
    "avg_score": 0.46460475
  },
  {
    "id": "C104060986",
    "name": "Space exploration",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.95081426,
    "venue_count": 2,
    "avg_score": 0.47540713
  },
  {
    "id": "C2910045404",
    "name": "Neck muscles",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.05117694,
    "venue_count": 2,
    "avg_score": 0.52558847
  },
  {
    "id": "C113616995",
    "name": "Nurse education",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.06451402,
    "venue_count": 2,
    "avg_score": 0.53225701
  },
  {
    "id": "C104863432",
    "name": "Pharmacy",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.1835871400000002,
    "venue_count": 2,
    "avg_score": 0.5917935700000001
  },
  {
    "id": "C2426938",
    "name": "Medical prescription",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.2894700000000001,
    "venue_count": 2,
    "avg_score": 0.6447350000000001
  },
  {
    "id": "C29694066",
    "name": "Orthodontics",
    "level": 1,
    "total_papers": 2,
    "total_score": 0.92268897,
    "venue_count": 2,
    "avg_score": 0.461344485
  },
  {
    "id": "C2983137510",
    "name": "Material handling",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.01604315,
    "venue_count": 2,
    "avg_score": 0.508021575
  },
  {
    "id": "C855514",
    "name": "Interaction",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.90519264,
    "venue_count": 2,
    "avg_score": 0.45259632
  },
  {
    "id": "C172081034",
    "name": "Time perception",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.0696084799999999,
    "venue_count": 2,
    "avg_score": 0.5348042399999999
  },
  {
    "id": "C2776501849",
    "name": "Back pain",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.92740665,
    "venue_count": 2,
    "avg_score": 0.463703325
  },
  {
    "id": "C2778996325",
    "name": "Actigraphy",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.3621631299999999,
    "venue_count": 2,
    "avg_score": 0.6810815649999999
  },
  {
    "id": "C81667532",
    "name": "ISA100.11a",
    "level": 4,
    "total_papers": 2,
    "total_score": 0.99626795,
    "venue_count": 1,
    "avg_score": 0.498133975
  },
  {
    "id": "C2780033181",
    "name": "Decision aids",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.85395875,
    "venue_count": 1,
    "avg_score": 0.426979375
  },
  {
    "id": "C111852164",
    "name": "Handover",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.01476875,
    "venue_count": 1,
    "avg_score": 0.507384375
  },
  {
    "id": "C2776422217",
    "name": "Electric vehicle",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.00745023,
    "venue_count": 1,
    "avg_score": 0.503725115
  },
  {
    "id": "C43075056",
    "name": "Soft skills",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.32981223,
    "venue_count": 2,
    "avg_score": 0.664906115
  },
  {
    "id": "C192424360",
    "name": "Multivariate analysis of variance",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.19659818,
    "venue_count": 2,
    "avg_score": 0.59829909
  },
  {
    "id": "C200678441",
    "name": "Alertness",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.2044014299999999,
    "venue_count": 2,
    "avg_score": 0.6022007149999999
  },
  {
    "id": "C51244244",
    "name": "Planet",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.75015134,
    "venue_count": 2,
    "avg_score": 0.37507567
  },
  {
    "id": "C149288182",
    "name": "Pupillary response",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.01992005,
    "venue_count": 2,
    "avg_score": 0.509960025
  },
  {
    "id": "C2780865100",
    "name": "Sentience",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.9736044700000002,
    "venue_count": 1,
    "avg_score": 0.9868022350000001
  },
  {
    "id": "C2780326160",
    "name": "Enlightenment",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.7131291599999998,
    "venue_count": 1,
    "avg_score": 0.8565645799999999
  },
  {
    "id": "C185933670",
    "name": "Habitat",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.79778823,
    "venue_count": 1,
    "avg_score": 0.398894115
  },
  {
    "id": "C34048319",
    "name": "Autopoiesis",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.2687931,
    "venue_count": 2,
    "avg_score": 0.13439655
  },
  {
    "id": "C120324620",
    "name": "Chai",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.30952568,
    "venue_count": 2,
    "avg_score": 0.65476284
  },
  {
    "id": "C2778541695",
    "name": "Migraine",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.56561697,
    "venue_count": 2,
    "avg_score": 0.282808485
  },
  {
    "id": "C3019221131",
    "name": "Lived experience",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.2403519,
    "venue_count": 2,
    "avg_score": 0.62017595
  },
  {
    "id": "C2778949103",
    "name": "Staring",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.4921034,
    "venue_count": 2,
    "avg_score": 0.7460517
  },
  {
    "id": "C530479602",
    "name": "Opera",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.61886236,
    "venue_count": 2,
    "avg_score": 0.80943118
  },
  {
    "id": "C121615247",
    "name": "Product engineering",
    "level": 4,
    "total_papers": 2,
    "total_score": 1.03425649,
    "venue_count": 1,
    "avg_score": 0.517128245
  },
  {
    "id": "C2777397297",
    "name": "User Research",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.88910753,
    "venue_count": 1,
    "avg_score": 0.444553765
  },
  {
    "id": "C83725634",
    "name": "Qualitative reasoning",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.8792021,
    "venue_count": 1,
    "avg_score": 0.43960105
  },
  {
    "id": "C2781095916",
    "name": "Dream",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.5676485900000001,
    "venue_count": 1,
    "avg_score": 0.7838242950000001
  },
  {
    "id": "C2778360479",
    "name": "Haptic perception",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.0117717800000001,
    "venue_count": 2,
    "avg_score": 0.5058858900000001
  },
  {
    "id": "C2986750623",
    "name": "Knowledge creation",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.08735977,
    "venue_count": 2,
    "avg_score": 0.543679885
  },
  {
    "id": "C2776207758",
    "name": "Downstream (manufacturing)",
    "level": 2,
    "total_papers": 2,
    "total_score": 0,
    "venue_count": 2,
    "avg_score": 0
  },
  {
    "id": "C2777655877",
    "name": "Design science research",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.9681763299999999,
    "venue_count": 2,
    "avg_score": 0.48408816499999996
  },
  {
    "id": "C41606952",
    "name": "Attention span",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.9236678700000001,
    "venue_count": 1,
    "avg_score": 0.46183393500000003
  },
  {
    "id": "C183889225",
    "name": "Educational robotics",
    "level": 4,
    "total_papers": 2,
    "total_score": 1.1747866,
    "venue_count": 1,
    "avg_score": 0.5873933
  },
  {
    "id": "C2780747020",
    "name": "Credit card fraud",
    "level": 4,
    "total_papers": 2,
    "total_score": 1.7415395999999999,
    "venue_count": 1,
    "avg_score": 0.8707697999999999
  },
  {
    "id": "C2983355114",
    "name": "Credit card",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.5139873,
    "venue_count": 1,
    "avg_score": 0.75699365
  },
  {
    "id": "C3073032",
    "name": "Information hiding",
    "level": 3,
    "total_papers": 2,
    "total_score": 1.0241382700000001,
    "venue_count": 1,
    "avg_score": 0.5120691350000001
  },
  {
    "id": "C2779106483",
    "name": "M-learning",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.94717971,
    "venue_count": 1,
    "avg_score": 0.473589855
  },
  {
    "id": "C204739117",
    "name": "Optimized Link State Routing Protocol",
    "level": 4,
    "total_papers": 2,
    "total_score": 1.38490176,
    "venue_count": 1,
    "avg_score": 0.69245088
  },
  {
    "id": "C47318570",
    "name": "Wireless Routing Protocol",
    "level": 4,
    "total_papers": 2,
    "total_score": 1.08684097,
    "venue_count": 1,
    "avg_score": 0.543420485
  },
  {
    "id": "C89305328",
    "name": "Link-state routing protocol",
    "level": 4,
    "total_papers": 2,
    "total_score": 1.09975803,
    "venue_count": 1,
    "avg_score": 0.549879015
  },
  {
    "id": "C65567647",
    "name": "Internet protocol suite",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.7346381799999999,
    "venue_count": 1,
    "avg_score": 0.36731908999999996
  },
  {
    "id": "C96427005",
    "name": "Learning sciences",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.84252286,
    "venue_count": 2,
    "avg_score": 0.42126143
  },
  {
    "id": "C2987496018",
    "name": "English language",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.01360756,
    "venue_count": 2,
    "avg_score": 0.50680378
  },
  {
    "id": "C139793654",
    "name": "Optical illusion",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.85293433,
    "venue_count": 1,
    "avg_score": 0.426467165
  },
  {
    "id": "C2778662690",
    "name": "Spatial ability",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.8818030400000001,
    "venue_count": 1,
    "avg_score": 0.44090152000000005
  },
  {
    "id": "C190210774",
    "name": "Ecological validity",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.9546671,
    "venue_count": 1,
    "avg_score": 0.47733355
  },
  {
    "id": "C190041318",
    "name": "Vestibular system",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.45191694,
    "venue_count": 1,
    "avg_score": 0.72595847
  },
  {
    "id": "C137813230",
    "name": "Motor control",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.84727156,
    "venue_count": 1,
    "avg_score": 0.42363578
  },
  {
    "id": "C46110900",
    "name": "Software walkthrough",
    "level": 5,
    "total_papers": 2,
    "total_score": 1.44708018,
    "venue_count": 2,
    "avg_score": 0.72354009
  },
  {
    "id": "C83849155",
    "name": "Internet access",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.87304697,
    "venue_count": 1,
    "avg_score": 0.436523485
  },
  {
    "id": "C72280650",
    "name": "Language interpretation",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.9652279800000001,
    "venue_count": 1,
    "avg_score": 0.48261399000000005
  },
  {
    "id": "C2986165187",
    "name": "Autistic spectrum disorder",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.85897329,
    "venue_count": 1,
    "avg_score": 0.429486645
  },
  {
    "id": "C2779547435",
    "name": "Directive",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.2064554099999998,
    "venue_count": 1,
    "avg_score": 0.6032277049999999
  },
  {
    "id": "C521306242",
    "name": "Web design",
    "level": 3,
    "total_papers": 2,
    "total_score": 0.9663696,
    "venue_count": 1,
    "avg_score": 0.4831848
  },
  {
    "id": "C18806943",
    "name": "Critical success factor",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.53756055,
    "venue_count": 1,
    "avg_score": 0.268780275
  },
  {
    "id": "C2776206778",
    "name": "Special needs",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.03489464,
    "venue_count": 1,
    "avg_score": 0.51744732
  },
  {
    "id": "C172966039",
    "name": "Fundamental human needs",
    "level": 2,
    "total_papers": 2,
    "total_score": 0.99723062,
    "venue_count": 2,
    "avg_score": 0.49861531
  },
  {
    "id": "C2776145597",
    "name": "Dropout (neural networks)",
    "level": 2,
    "total_papers": 2,
    "total_score": 1.5540032,
    "venue_count": 2,
    "avg_score": 0.7770016
  },
  {
    "id": "C2779426996",
    "name": "Echo (communications protocol)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.47048903,
    "venue_count": 1,
    "avg_score": 0.47048903
  },
  {
    "id": "C198912144",
    "name": "Creative writing",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4840964,
    "venue_count": 1,
    "avg_score": 0.4840964
  },
  {
    "id": "C2781188878",
    "name": "Degrowth",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.8106565,
    "venue_count": 1,
    "avg_score": 0.8106565
  },
  {
    "id": "C2776615708",
    "name": "Inclusive growth",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5272571,
    "venue_count": 1,
    "avg_score": 0.5272571
  },
  {
    "id": "C2779152076",
    "name": "Smart growth",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4352052,
    "venue_count": 1,
    "avg_score": 0.4352052
  },
  {
    "id": "C189326681",
    "name": "Poverty",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.15148914,
    "venue_count": 1,
    "avg_score": 0.15148914
  },
  {
    "id": "C2780458788",
    "name": "Hollywood",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.95382667,
    "venue_count": 1,
    "avg_score": 0.95382667
  },
  {
    "id": "C54040653",
    "name": "Film industry",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5811348,
    "venue_count": 1,
    "avg_score": 0.5811348
  },
  {
    "id": "C3018176237",
    "name": "First person",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6596225,
    "venue_count": 1,
    "avg_score": 0.6596225
  },
  {
    "id": "C3019064422",
    "name": "Third person",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.47000915,
    "venue_count": 1,
    "avg_score": 0.47000915
  },
  {
    "id": "C131129157",
    "name": "Challenge–response authentication",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.45526245,
    "venue_count": 1,
    "avg_score": 0.45526245
  },
  {
    "id": "C2779235478",
    "name": "Register (sociolinguistics)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.75279,
    "venue_count": 1,
    "avg_score": 0.75279
  },
  {
    "id": "C3018944925",
    "name": "Reading level",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4404138,
    "venue_count": 1,
    "avg_score": 0.4404138
  },
  {
    "id": "C2777083192",
    "name": "Plain language",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8749932,
    "venue_count": 1,
    "avg_score": 0.8749932
  },
  {
    "id": "C2780957164",
    "name": "Plain English",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8078474,
    "venue_count": 1,
    "avg_score": 0.8078474
  },
  {
    "id": "C46503548",
    "name": "Plain text",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.57585335,
    "venue_count": 1,
    "avg_score": 0.57585335
  },
  {
    "id": "C2777551473",
    "name": "Tube (container)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6203193,
    "venue_count": 1,
    "avg_score": 0.6203193
  },
  {
    "id": "C59462968",
    "name": "Dichotomy",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6361805,
    "venue_count": 1,
    "avg_score": 0.6361805
  },
  {
    "id": "C2778566535",
    "name": "Diathesis",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.44750983,
    "venue_count": 1,
    "avg_score": 0.44750983
  },
  {
    "id": "C2778626061",
    "name": "Monster",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6029279,
    "venue_count": 1,
    "avg_score": 0.6029279
  },
  {
    "id": "C2775952039",
    "name": "Heteronormativity",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.76635253,
    "venue_count": 1,
    "avg_score": 0.76635253
  },
  {
    "id": "C2780540011",
    "name": "Lesbian",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.67249155,
    "venue_count": 1,
    "avg_score": 0.67249155
  },
  {
    "id": "C2781330901",
    "name": "Restorative justice",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.9409559,
    "venue_count": 1,
    "avg_score": 0.9409559
  },
  {
    "id": "C83645499",
    "name": "Punitive damages",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6534453,
    "venue_count": 1,
    "avg_score": 0.6534453
  },
  {
    "id": "C2781164615",
    "name": "Climate justice",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.7972539,
    "venue_count": 1,
    "avg_score": 0.7972539
  },
  {
    "id": "C2776818064",
    "name": "Agreement",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4552504,
    "venue_count": 1,
    "avg_score": 0.4552504
  },
  {
    "id": "C169222746",
    "name": "Factorial experiment",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4479541,
    "venue_count": 1,
    "avg_score": 0.4479541
  },
  {
    "id": "C168065819",
    "name": "Debugging",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.64512885,
    "venue_count": 1,
    "avg_score": 0.64512885
  },
  {
    "id": "C180652500",
    "name": "Push technology",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7349249,
    "venue_count": 1,
    "avg_score": 0.7349249
  },
  {
    "id": "C41661131",
    "name": "Interrupt",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.7137047,
    "venue_count": 1,
    "avg_score": 0.7137047
  },
  {
    "id": "C90805937",
    "name": "Territoriality",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.77290547,
    "venue_count": 1,
    "avg_score": 0.77290547
  },
  {
    "id": "C2779471601",
    "name": "Euphemism",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46048248,
    "venue_count": 1,
    "avg_score": 0.46048248
  },
  {
    "id": "C76743934",
    "name": "Kettle (birds)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7521155,
    "venue_count": 1,
    "avg_score": 0.7521155
  },
  {
    "id": "C50610925",
    "name": "Habituation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5688287,
    "venue_count": 1,
    "avg_score": 0.5688287
  },
  {
    "id": "C2780213375",
    "name": "XPath",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.6807934,
    "venue_count": 1,
    "avg_score": 0.6807934
  },
  {
    "id": "C44519122",
    "name": "Medical laboratory",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42534322,
    "venue_count": 1,
    "avg_score": 0.42534322
  },
  {
    "id": "C8797682",
    "name": "XML",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.13792717,
    "venue_count": 1,
    "avg_score": 0.13792717
  },
  {
    "id": "C55348073",
    "name": "XML validation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C43199551",
    "name": "Touchpad",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7788018,
    "venue_count": 1,
    "avg_score": 0.7788018
  },
  {
    "id": "C167327282",
    "name": "Cognitive evaluation theory",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.4435536,
    "venue_count": 1,
    "avg_score": 0.4435536
  },
  {
    "id": "C157021035",
    "name": "Biodegradation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.78201824,
    "venue_count": 1,
    "avg_score": 0.78201824
  },
  {
    "id": "C154482161",
    "name": "Mainstreaming",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.43897074,
    "venue_count": 1,
    "avg_score": 0.43897074
  },
  {
    "id": "C168072608",
    "name": "Direct and indirect realism",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.55239165,
    "venue_count": 1,
    "avg_score": 0.55239165
  },
  {
    "id": "C2777559092",
    "name": "Ambiguity resolution",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.43857762,
    "venue_count": 1,
    "avg_score": 0.43857762
  },
  {
    "id": "C2778022998",
    "name": "Transit (satellite)",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6064484,
    "venue_count": 1,
    "avg_score": 0.6064484
  },
  {
    "id": "C2991670904",
    "name": "Public university",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.44305652,
    "venue_count": 1,
    "avg_score": 0.44305652
  },
  {
    "id": "C514793146",
    "name": "Spirituality",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4855287,
    "venue_count": 1,
    "avg_score": 0.4855287
  },
  {
    "id": "C194699767",
    "name": "Multi-factor authentication",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.8586782,
    "venue_count": 1,
    "avg_score": 0.8586782
  },
  {
    "id": "C2781039887",
    "name": "Factor (programming language)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.44553733,
    "venue_count": 1,
    "avg_score": 0.44553733
  },
  {
    "id": "C2780021488",
    "name": "Task management",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.57106733,
    "venue_count": 1,
    "avg_score": 0.57106733
  },
  {
    "id": "C2778506969",
    "name": "Legalization",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.84927875,
    "venue_count": 1,
    "avg_score": 0.84927875
  },
  {
    "id": "C2777748543",
    "name": "Feminist epistemology",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41748044,
    "venue_count": 1,
    "avg_score": 0.41748044
  },
  {
    "id": "C61272859",
    "name": "Transferability",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.64739054,
    "venue_count": 1,
    "avg_score": 0.64739054
  },
  {
    "id": "C44074806",
    "name": "Inscribed figure",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.53983194,
    "venue_count": 1,
    "avg_score": 0.53983194
  },
  {
    "id": "C140331021",
    "name": "Logit",
    "level": 2,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C165205368",
    "name": "Functional illiteracy",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.86820495,
    "venue_count": 1,
    "avg_score": 0.86820495
  },
  {
    "id": "C2775930972",
    "name": "Electronic waste",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4973915,
    "venue_count": 1,
    "avg_score": 0.4973915
  },
  {
    "id": "C2776716606",
    "name": "Embarrassment",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6594169,
    "venue_count": 1,
    "avg_score": 0.6594169
  },
  {
    "id": "C2778447849",
    "name": "Obligation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.64968497,
    "venue_count": 1,
    "avg_score": 0.64968497
  },
  {
    "id": "C2778121785",
    "name": "Augmentative and alternative communication",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.62470347,
    "venue_count": 1,
    "avg_score": 0.62470347
  },
  {
    "id": "C2779623668",
    "name": "SwIPe",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.61978054,
    "venue_count": 1,
    "avg_score": 0.61978054
  },
  {
    "id": "C121449826",
    "name": "Input device",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42139393,
    "venue_count": 1,
    "avg_score": 0.42139393
  },
  {
    "id": "C2777510241",
    "name": "Fused filament fabrication",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6148058,
    "venue_count": 1,
    "avg_score": 0.6148058
  },
  {
    "id": "C2778787235",
    "name": "Yarn",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.60646045,
    "venue_count": 1,
    "avg_score": 0.60646045
  },
  {
    "id": "C2777340749",
    "name": "Lottery",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5898977,
    "venue_count": 1,
    "avg_score": 0.5898977
  },
  {
    "id": "C2779077324",
    "name": "Dictation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.9897493,
    "venue_count": 1,
    "avg_score": 0.9897493
  },
  {
    "id": "C15792166",
    "name": "Avionics",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5496701,
    "venue_count": 1,
    "avg_score": 0.5496701
  },
  {
    "id": "C163707989",
    "name": "Life-critical system",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.54124117,
    "venue_count": 1,
    "avg_score": 0.54124117
  },
  {
    "id": "C2776126399",
    "name": "Immutability",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6953643,
    "venue_count": 1,
    "avg_score": 0.6953643
  },
  {
    "id": "C548217200",
    "name": "Java",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45344028,
    "venue_count": 1,
    "avg_score": 0.45344028
  },
  {
    "id": "C75699723",
    "name": "Buddhism",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.65106285,
    "venue_count": 1,
    "avg_score": 0.65106285
  },
  {
    "id": "C37310437",
    "name": "Social facilitation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.44275084,
    "venue_count": 1,
    "avg_score": 0.44275084
  },
  {
    "id": "C2994130222",
    "name": "Social care",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43554324,
    "venue_count": 1,
    "avg_score": 0.43554324
  },
  {
    "id": "C15569618",
    "name": "Liveness",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7061364,
    "venue_count": 1,
    "avg_score": 0.7061364
  },
  {
    "id": "C169590947",
    "name": "Compiler",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.54162407,
    "venue_count": 1,
    "avg_score": 0.54162407
  },
  {
    "id": "C2779247141",
    "name": "Emoji",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.50884205,
    "venue_count": 1,
    "avg_score": 0.50884205
  },
  {
    "id": "C36668950",
    "name": "Free recall",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.44736692,
    "venue_count": 1,
    "avg_score": 0.44736692
  },
  {
    "id": "C2991816873",
    "name": "Emotional memory",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41997036,
    "venue_count": 1,
    "avg_score": 0.41997036
  },
  {
    "id": "C2779144063",
    "name": "Amygdala",
    "level": 2,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C2777432617",
    "name": "Breast imaging",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.44737542,
    "venue_count": 1,
    "avg_score": 0.44737542
  },
  {
    "id": "C2780472235",
    "name": "Mammography",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.1983875,
    "venue_count": 1,
    "avg_score": 0.1983875
  },
  {
    "id": "C2778692574",
    "name": "Faith",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.62938607,
    "venue_count": 1,
    "avg_score": 0.62938607
  },
  {
    "id": "C2985797017",
    "name": "Social trust",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.45327792,
    "venue_count": 1,
    "avg_score": 0.45327792
  },
  {
    "id": "C131722271",
    "name": "Sniffing",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.80357814,
    "venue_count": 1,
    "avg_score": 0.80357814
  },
  {
    "id": "C2781249023",
    "name": "Art therapy",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.69272864,
    "venue_count": 1,
    "avg_score": 0.69272864
  },
  {
    "id": "C193081819",
    "name": "Video feedback",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41180462,
    "venue_count": 1,
    "avg_score": 0.41180462
  },
  {
    "id": "C2983704927",
    "name": "Social communication",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46234766,
    "venue_count": 1,
    "avg_score": 0.46234766
  },
  {
    "id": "C163007329",
    "name": "Social emotional learning",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43918565,
    "venue_count": 1,
    "avg_score": 0.43918565
  },
  {
    "id": "C39920170",
    "name": "Soundness",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.699101,
    "venue_count": 1,
    "avg_score": 0.699101
  },
  {
    "id": "C3018726217",
    "name": "Gender relations",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5061335,
    "venue_count": 1,
    "avg_score": 0.5061335
  },
  {
    "id": "C2780621315",
    "name": "Middle temporal gyrus",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5122706,
    "venue_count": 1,
    "avg_score": 0.5122706
  },
  {
    "id": "C178853913",
    "name": "Hemodynamics",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4402643,
    "venue_count": 1,
    "avg_score": 0.4402643
  },
  {
    "id": "C142944206",
    "name": "Proactivity",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42491156,
    "venue_count": 1,
    "avg_score": 0.42491156
  },
  {
    "id": "C2778505590",
    "name": "Eclipse",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.51638705,
    "venue_count": 1,
    "avg_score": 0.51638705
  },
  {
    "id": "C2778208468",
    "name": "Clicker",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7563692,
    "venue_count": 1,
    "avg_score": 0.7563692
  },
  {
    "id": "C2780068402",
    "name": "Nepali",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.95356655,
    "venue_count": 1,
    "avg_score": 0.95356655
  },
  {
    "id": "C101595628",
    "name": "Socioemotional selectivity theory",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6379615,
    "venue_count": 1,
    "avg_score": 0.6379615
  },
  {
    "id": "C32848918",
    "name": "Observable",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.57673824,
    "venue_count": 1,
    "avg_score": 0.57673824
  },
  {
    "id": "C47737302",
    "name": "Greenhouse gas",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4702491,
    "venue_count": 1,
    "avg_score": 0.4702491
  },
  {
    "id": "C2778132726",
    "name": "Digital Revolution",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41505468,
    "venue_count": 1,
    "avg_score": 0.41505468
  },
  {
    "id": "C20908052",
    "name": "Sustainability science",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.53559566,
    "venue_count": 1,
    "avg_score": 0.53559566
  },
  {
    "id": "C2778251646",
    "name": "Empathic concern",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.7005294,
    "venue_count": 1,
    "avg_score": 0.7005294
  },
  {
    "id": "C2984621161",
    "name": "Information display",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42929852,
    "venue_count": 1,
    "avg_score": 0.42929852
  },
  {
    "id": "C2778660142",
    "name": "Media consumption",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.48296943,
    "venue_count": 1,
    "avg_score": 0.48296943
  },
  {
    "id": "C83195618",
    "name": "Cued speech",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46498913,
    "venue_count": 1,
    "avg_score": 0.46498913
  },
  {
    "id": "C82307848",
    "name": "Audience measurement",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5964919,
    "venue_count": 1,
    "avg_score": 0.5964919
  },
  {
    "id": "C2777746568",
    "name": "Food studies",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42219424,
    "venue_count": 1,
    "avg_score": 0.42219424
  },
  {
    "id": "C2778220009",
    "name": "Cervical cancer",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6990544,
    "venue_count": 1,
    "avg_score": 0.6990544
  },
  {
    "id": "C2993522905",
    "name": "Cervical cancer screening",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.565134,
    "venue_count": 1,
    "avg_score": 0.565134
  },
  {
    "id": "C2780647465",
    "name": "Cervical screening",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.48649853,
    "venue_count": 1,
    "avg_score": 0.48649853
  },
  {
    "id": "C29456083",
    "name": "Gynecology",
    "level": 1,
    "total_papers": 1,
    "total_score": 0.3597019,
    "venue_count": 1,
    "avg_score": 0.3597019
  },
  {
    "id": "C21711469",
    "name": "Conflict resolution",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.71235585,
    "venue_count": 1,
    "avg_score": 0.71235585
  },
  {
    "id": "C60115397",
    "name": "Crossmodal",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.84573066,
    "venue_count": 1,
    "avg_score": 0.84573066
  },
  {
    "id": "C38693133",
    "name": "Gastronomy",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.7004025,
    "venue_count": 1,
    "avg_score": 0.7004025
  },
  {
    "id": "C2779923759",
    "name": "Classroom management",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42765886,
    "venue_count": 1,
    "avg_score": 0.42765886
  },
  {
    "id": "C2779944411",
    "name": "Deskilling",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5190978,
    "venue_count": 1,
    "avg_score": 0.5190978
  },
  {
    "id": "C89057211",
    "name": "Collective intelligence",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5068417,
    "venue_count": 1,
    "avg_score": 0.5068417
  },
  {
    "id": "C2780193096",
    "name": "Possession (linguistics)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6122979,
    "venue_count": 1,
    "avg_score": 0.6122979
  },
  {
    "id": "C160798450",
    "name": "Concordance",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.49813342,
    "venue_count": 1,
    "avg_score": 0.49813342
  },
  {
    "id": "C117438556",
    "name": "Beneficence",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.89085144,
    "venue_count": 1,
    "avg_score": 0.89085144
  },
  {
    "id": "C141643422",
    "name": "P3a",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.7141712,
    "venue_count": 1,
    "avg_score": 0.7141712
  },
  {
    "id": "C2777420710",
    "name": "Shared reading",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.7136694,
    "venue_count": 1,
    "avg_score": 0.7136694
  },
  {
    "id": "C2778874215",
    "name": "Mindfulness meditation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5350384,
    "venue_count": 1,
    "avg_score": 0.5350384
  },
  {
    "id": "C2984408293",
    "name": "Math education",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5875944,
    "venue_count": 1,
    "avg_score": 0.5875944
  },
  {
    "id": "C2781209916",
    "name": "Typing",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.73647445,
    "venue_count": 1,
    "avg_score": 0.73647445
  },
  {
    "id": "C2777803708",
    "name": "Transcranial direct-current stimulation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.87591386,
    "venue_count": 1,
    "avg_score": 0.87591386
  },
  {
    "id": "C2985799443",
    "name": "Brain stimulation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5745344,
    "venue_count": 1,
    "avg_score": 0.5745344
  },
  {
    "id": "C2985024408",
    "name": "Social acceptance",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4630658,
    "venue_count": 1,
    "avg_score": 0.4630658
  },
  {
    "id": "C2777547206",
    "name": "Pain tolerance",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5982652,
    "venue_count": 1,
    "avg_score": 0.5982652
  },
  {
    "id": "C3673659",
    "name": "Threshold of pain",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.2339153,
    "venue_count": 1,
    "avg_score": 0.2339153
  },
  {
    "id": "C135544838",
    "name": "Decolonization",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.88338923,
    "venue_count": 1,
    "avg_score": 0.88338923
  },
  {
    "id": "C2985105721",
    "name": "Incident response",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5359019,
    "venue_count": 1,
    "avg_score": 0.5359019
  },
  {
    "id": "C2777415597",
    "name": "Grice",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5214695,
    "venue_count": 1,
    "avg_score": 0.5214695
  },
  {
    "id": "C186068551",
    "name": "Tension (geology)",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.48380154,
    "venue_count": 1,
    "avg_score": 0.48380154
  },
  {
    "id": "C112950240",
    "name": "Ultimate tensile strength",
    "level": 2,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C2777541363",
    "name": "Distributed ledger",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.44127747,
    "venue_count": 1,
    "avg_score": 0.44127747
  },
  {
    "id": "C2778358470",
    "name": "Unrest",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.85278606,
    "venue_count": 1,
    "avg_score": 0.85278606
  },
  {
    "id": "C2994499861",
    "name": "Social unrest",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.51285625,
    "venue_count": 1,
    "avg_score": 0.51285625
  },
  {
    "id": "C513891491",
    "name": "Civil society",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41597208,
    "venue_count": 1,
    "avg_score": 0.41597208
  },
  {
    "id": "C2777305734",
    "name": "Participatory budgeting",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.7452285,
    "venue_count": 1,
    "avg_score": 0.7452285
  },
  {
    "id": "C2993342163",
    "name": "Food insecurity",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.63477325,
    "venue_count": 1,
    "avg_score": 0.63477325
  },
  {
    "id": "C2778682666",
    "name": "Modernity",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5115489,
    "venue_count": 1,
    "avg_score": 0.5115489
  },
  {
    "id": "C164516710",
    "name": "Financial transaction",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.47956008,
    "venue_count": 1,
    "avg_score": 0.47956008
  },
  {
    "id": "C3017634809",
    "name": "Risk communication",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.53256285,
    "venue_count": 1,
    "avg_score": 0.53256285
  },
  {
    "id": "C39410599",
    "name": "Natural hazard",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4542518,
    "venue_count": 1,
    "avg_score": 0.4542518
  },
  {
    "id": "C143275388",
    "name": "Microblogging",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4311547,
    "venue_count": 1,
    "avg_score": 0.4311547
  },
  {
    "id": "C2780945871",
    "name": "Backup",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6133521,
    "venue_count": 1,
    "avg_score": 0.6133521
  },
  {
    "id": "C165556158",
    "name": "Keynesian economics",
    "level": 1,
    "total_papers": 1,
    "total_score": 0.34057748,
    "venue_count": 1,
    "avg_score": 0.34057748
  },
  {
    "id": "C2775887326",
    "name": "Prenatal care",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4734366,
    "venue_count": 1,
    "avg_score": 0.4734366
  },
  {
    "id": "C9893847",
    "name": "Reproducibility",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7059545,
    "venue_count": 1,
    "avg_score": 0.7059545
  },
  {
    "id": "C2776636807",
    "name": "Mutual aid",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.73163116,
    "venue_count": 1,
    "avg_score": 0.73163116
  },
  {
    "id": "C2992285028",
    "name": "Work time",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.61231375,
    "venue_count": 1,
    "avg_score": 0.61231375
  },
  {
    "id": "C2991980166",
    "name": "Food service",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.48011303,
    "venue_count": 1,
    "avg_score": 0.48011303
  },
  {
    "id": "C147579259",
    "name": "Scrum",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.6826828,
    "venue_count": 1,
    "avg_score": 0.6826828
  },
  {
    "id": "C2778880076",
    "name": "Brazilian Portuguese",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6390872,
    "venue_count": 1,
    "avg_score": 0.6390872
  },
  {
    "id": "C31652620",
    "name": "Information infrastructure",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5488695,
    "venue_count": 1,
    "avg_score": 0.5488695
  },
  {
    "id": "C2779379281",
    "name": "Externalization",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6392031,
    "venue_count": 1,
    "avg_score": 0.6392031
  },
  {
    "id": "C189922023",
    "name": "Information governance",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.4434465,
    "venue_count": 1,
    "avg_score": 0.4434465
  },
  {
    "id": "C2779527642",
    "name": "Happening",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.44299087,
    "venue_count": 1,
    "avg_score": 0.44299087
  },
  {
    "id": "C146778888",
    "name": "Installation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.60197294,
    "venue_count": 1,
    "avg_score": 0.60197294
  },
  {
    "id": "C534932454",
    "name": "Peer-to-peer",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5245959,
    "venue_count": 1,
    "avg_score": 0.5245959
  },
  {
    "id": "C551386961",
    "name": "File sharing",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4791088,
    "venue_count": 1,
    "avg_score": 0.4791088
  },
  {
    "id": "C2778368411",
    "name": "Retrofitting",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4427831,
    "venue_count": 1,
    "avg_score": 0.4427831
  },
  {
    "id": "C2778071103",
    "name": "Precarity",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.9143535,
    "venue_count": 1,
    "avg_score": 0.9143535
  },
  {
    "id": "C118846928",
    "name": "Project stakeholder",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.47262713,
    "venue_count": 1,
    "avg_score": 0.47262713
  },
  {
    "id": "C15952604",
    "name": "Project management",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.33772936,
    "venue_count": 1,
    "avg_score": 0.33772936
  },
  {
    "id": "C74510933",
    "name": "Project portfolio management",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.20211083,
    "venue_count": 1,
    "avg_score": 0.20211083
  },
  {
    "id": "C58223718",
    "name": "Project charter",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.19349495,
    "venue_count": 1,
    "avg_score": 0.19349495
  },
  {
    "id": "C2984642479",
    "name": "Sales forecasting",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6458385,
    "venue_count": 1,
    "avg_score": 0.6458385
  },
  {
    "id": "C167017271",
    "name": "Sales and operations planning",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4636494,
    "venue_count": 1,
    "avg_score": 0.4636494
  },
  {
    "id": "C193809577",
    "name": "Demand forecasting",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41824993,
    "venue_count": 1,
    "avg_score": 0.41824993
  },
  {
    "id": "C3020038283",
    "name": "Research data",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.48951232,
    "venue_count": 1,
    "avg_score": 0.48951232
  },
  {
    "id": "C2775890777",
    "name": "Ethical dilemma",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6622423,
    "venue_count": 1,
    "avg_score": 0.6622423
  },
  {
    "id": "C163401089",
    "name": "Undue influence",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4364536,
    "venue_count": 1,
    "avg_score": 0.4364536
  },
  {
    "id": "C2781093426",
    "name": "Deliberative democracy",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.49866915,
    "venue_count": 1,
    "avg_score": 0.49866915
  },
  {
    "id": "C3019351904",
    "name": "Mental health service",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5164614,
    "venue_count": 1,
    "avg_score": 0.5164614
  },
  {
    "id": "C3020144179",
    "name": "Electronic health record",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6833687,
    "venue_count": 1,
    "avg_score": 0.6833687
  },
  {
    "id": "C3019952477",
    "name": "Health records",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.58459055,
    "venue_count": 1,
    "avg_score": 0.58459055
  },
  {
    "id": "C83804111",
    "name": "Behavioral pattern",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41518363,
    "venue_count": 1,
    "avg_score": 0.41518363
  },
  {
    "id": "C73380752",
    "name": "Gatekeeping",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5074982,
    "venue_count": 1,
    "avg_score": 0.5074982
  },
  {
    "id": "C143273055",
    "name": "Delegate",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41048717,
    "venue_count": 1,
    "avg_score": 0.41048717
  },
  {
    "id": "C2776034101",
    "name": "Commission",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5992014,
    "venue_count": 1,
    "avg_score": 0.5992014
  },
  {
    "id": "C2780102126",
    "name": "Online and offline",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.44003755,
    "venue_count": 1,
    "avg_score": 0.44003755
  },
  {
    "id": "C104806805",
    "name": "Steelmaking",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4540154,
    "venue_count": 1,
    "avg_score": 0.4540154
  },
  {
    "id": "C2776541429",
    "name": "Osteoporosis",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.47257912,
    "venue_count": 1,
    "avg_score": 0.47257912
  },
  {
    "id": "C2777644567",
    "name": "Intersubjectivity",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.88282585,
    "venue_count": 1,
    "avg_score": 0.88282585
  },
  {
    "id": "C158066952",
    "name": "Work order",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.59197664,
    "venue_count": 1,
    "avg_score": 0.59197664
  },
  {
    "id": "C87687168",
    "name": "Digital audio",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.6670642,
    "venue_count": 1,
    "avg_score": 0.6670642
  },
  {
    "id": "C160372630",
    "name": "Audio analyzer",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.42366993,
    "venue_count": 1,
    "avg_score": 0.42366993
  },
  {
    "id": "C33741171",
    "name": "Participatory GIS",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4395392,
    "venue_count": 1,
    "avg_score": 0.4395392
  },
  {
    "id": "C2777179996",
    "name": "Mistake",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.933999,
    "venue_count": 1,
    "avg_score": 0.933999
  },
  {
    "id": "C13801280",
    "name": "Kingdom",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.55723315,
    "venue_count": 1,
    "avg_score": 0.55723315
  },
  {
    "id": "C2777554338",
    "name": "Gentrification",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.90707606,
    "venue_count": 1,
    "avg_score": 0.90707606
  },
  {
    "id": "C57380593",
    "name": "Volunteered geographic information",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.60475343,
    "venue_count": 1,
    "avg_score": 0.60475343
  },
  {
    "id": "C52130261",
    "name": "Census",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.57516885,
    "venue_count": 1,
    "avg_score": 0.57516885
  },
  {
    "id": "C2779820595",
    "name": "Listing (finance)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5429466,
    "venue_count": 1,
    "avg_score": 0.5429466
  },
  {
    "id": "C2781013037",
    "name": "Nowcasting",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.52206916,
    "venue_count": 1,
    "avg_score": 0.52206916
  },
  {
    "id": "C2779838221",
    "name": "Turnout",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.4491883,
    "venue_count": 1,
    "avg_score": 0.4491883
  },
  {
    "id": "C127722929",
    "name": "Transaction data",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4349471,
    "venue_count": 1,
    "avg_score": 0.4349471
  },
  {
    "id": "C67277372",
    "name": "Semantic role labeling",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41881853,
    "venue_count": 1,
    "avg_score": 0.41881853
  },
  {
    "id": "C2776515129",
    "name": "Redress",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.87549734,
    "venue_count": 1,
    "avg_score": 0.87549734
  },
  {
    "id": "C2779149496",
    "name": "Procedural justice",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4285475,
    "venue_count": 1,
    "avg_score": 0.4285475
  },
  {
    "id": "C2778412681",
    "name": "Interactional justice",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.41385466,
    "venue_count": 1,
    "avg_score": 0.41385466
  },
  {
    "id": "C2781283594",
    "name": "Mind-wandering",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.8771252,
    "venue_count": 1,
    "avg_score": 0.8771252
  },
  {
    "id": "C2779560602",
    "name": "Theory of mind",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.42583793,
    "venue_count": 1,
    "avg_score": 0.42583793
  },
  {
    "id": "C3018898988",
    "name": "Working hours",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.48170692,
    "venue_count": 1,
    "avg_score": 0.48170692
  },
  {
    "id": "C2778058428",
    "name": "Collegiality",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8070469,
    "venue_count": 1,
    "avg_score": 0.8070469
  },
  {
    "id": "C2779464495",
    "name": "Proteus",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.6609608,
    "venue_count": 1,
    "avg_score": 0.6609608
  },
  {
    "id": "C547475151",
    "name": "Escherichia coli",
    "level": 3,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C2992801459",
    "name": "Interpersonal interaction",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.48332715,
    "venue_count": 1,
    "avg_score": 0.48332715
  },
  {
    "id": "C2779463800",
    "name": "Center (category theory)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4607251,
    "venue_count": 1,
    "avg_score": 0.4607251
  },
  {
    "id": "C8010536",
    "name": "Crystallography",
    "level": 1,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C13687954",
    "name": "Autonomous agent",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.49650937,
    "venue_count": 1,
    "avg_score": 0.49650937
  },
  {
    "id": "C124103261",
    "name": "Group information management",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.4534351,
    "venue_count": 1,
    "avg_score": 0.4534351
  },
  {
    "id": "C47487241",
    "name": "Data access",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4175412,
    "venue_count": 1,
    "avg_score": 0.4175412
  },
  {
    "id": "C105152847",
    "name": "Call to action",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42339516,
    "venue_count": 1,
    "avg_score": 0.42339516
  },
  {
    "id": "C70388272",
    "name": "IBM",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.72492045,
    "venue_count": 1,
    "avg_score": 0.72492045
  },
  {
    "id": "C2986578859",
    "name": "Human motion",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.45306712,
    "venue_count": 1,
    "avg_score": 0.45306712
  },
  {
    "id": "C35280785",
    "name": "System lifecycle",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.6469284,
    "venue_count": 1,
    "avg_score": 0.6469284
  },
  {
    "id": "C30452754",
    "name": "Application lifecycle management",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.44833878,
    "venue_count": 1,
    "avg_score": 0.44833878
  },
  {
    "id": "C2779055241",
    "name": "Biosignal",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.7919378,
    "venue_count": 1,
    "avg_score": 0.7919378
  },
  {
    "id": "C134589348",
    "name": "Babbling",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5035028,
    "venue_count": 1,
    "avg_score": 0.5035028
  },
  {
    "id": "C111476811",
    "name": "Moral responsibility",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.47050163,
    "venue_count": 1,
    "avg_score": 0.47050163
  },
  {
    "id": "C2993955422",
    "name": "Science and engineering",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41654214,
    "venue_count": 1,
    "avg_score": 0.41654214
  },
  {
    "id": "C66045256",
    "name": "Artificial psychology",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41394395,
    "venue_count": 1,
    "avg_score": 0.41394395
  },
  {
    "id": "C30112582",
    "name": "Artificial Intelligence System",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.21434721,
    "venue_count": 1,
    "avg_score": 0.21434721
  },
  {
    "id": "C2780188709",
    "name": "Lifeworld",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4407913,
    "venue_count": 1,
    "avg_score": 0.4407913
  },
  {
    "id": "C67677051",
    "name": "Fear appeal",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45145735,
    "venue_count": 1,
    "avg_score": 0.45145735
  },
  {
    "id": "C2778439541",
    "name": "Oscillation (cell signaling)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.63213515,
    "venue_count": 1,
    "avg_score": 0.63213515
  },
  {
    "id": "C193293595",
    "name": "Human body",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5398812,
    "venue_count": 1,
    "avg_score": 0.5398812
  },
  {
    "id": "C2988948121",
    "name": "Human values",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4566187,
    "venue_count": 1,
    "avg_score": 0.4566187
  },
  {
    "id": "C2777059624",
    "name": "Cloud storage",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.55493784,
    "venue_count": 1,
    "avg_score": 0.55493784
  },
  {
    "id": "C2779302622",
    "name": "Mandala",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.979727,
    "venue_count": 1,
    "avg_score": 0.979727
  },
  {
    "id": "C46762472",
    "name": "Peripheral",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4491869,
    "venue_count": 1,
    "avg_score": 0.4491869
  },
  {
    "id": "C136968873",
    "name": "Historicity (philosophy)",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.8977027,
    "venue_count": 1,
    "avg_score": 0.8977027
  },
  {
    "id": "C14103023",
    "name": "Pairing",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.7531508,
    "venue_count": 1,
    "avg_score": 0.7531508
  },
  {
    "id": "C54101563",
    "name": "Superconductivity",
    "level": 2,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C2778531742",
    "name": "Discoverability",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.99128026,
    "venue_count": 1,
    "avg_score": 0.99128026
  },
  {
    "id": "C190136086",
    "name": "Zeitgeist",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.96625304,
    "venue_count": 1,
    "avg_score": 0.96625304
  },
  {
    "id": "C2779904517",
    "name": "CATS",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.47351885,
    "venue_count": 1,
    "avg_score": 0.47351885
  },
  {
    "id": "C2780340563",
    "name": "Immediacy",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.73573864,
    "venue_count": 1,
    "avg_score": 0.73573864
  },
  {
    "id": "C2779116948",
    "name": "Help-seeking",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6409592,
    "venue_count": 1,
    "avg_score": 0.6409592
  },
  {
    "id": "C2780719635",
    "name": "Flavor",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.583186,
    "venue_count": 1,
    "avg_score": 0.583186
  },
  {
    "id": "C134698397",
    "name": "Public opinion",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6310271,
    "venue_count": 1,
    "avg_score": 0.6310271
  },
  {
    "id": "C95637964",
    "name": "Computer file",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.08099672,
    "venue_count": 1,
    "avg_score": 0.08099672
  },
  {
    "id": "C2780249654",
    "name": "Shit",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.524896,
    "venue_count": 1,
    "avg_score": 0.524896
  },
  {
    "id": "C143121216",
    "name": "Microbiome",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.49033785,
    "venue_count": 1,
    "avg_score": 0.49033785
  },
  {
    "id": "C3017694942",
    "name": "Attention deficit",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.56640106,
    "venue_count": 1,
    "avg_score": 0.56640106
  },
  {
    "id": "C2994076013",
    "name": "Social production",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4550165,
    "venue_count": 1,
    "avg_score": 0.4550165
  },
  {
    "id": "C74080474",
    "name": "Redistribution (election)",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.67435,
    "venue_count": 1,
    "avg_score": 0.67435
  },
  {
    "id": "C2779227343",
    "name": "Demon",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.9922081,
    "venue_count": 1,
    "avg_score": 0.9922081
  },
  {
    "id": "C108292794",
    "name": "Maxwell's demon",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.575441,
    "venue_count": 1,
    "avg_score": 0.575441
  },
  {
    "id": "C54531595",
    "name": "Dualism",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8866012,
    "venue_count": 1,
    "avg_score": 0.8866012
  },
  {
    "id": "C130497676",
    "name": "Industrial and organizational psychology",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.49816036,
    "venue_count": 1,
    "avg_score": 0.49816036
  },
  {
    "id": "C166623013",
    "name": "Industrial sociology",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4443778,
    "venue_count": 1,
    "avg_score": 0.4443778
  },
  {
    "id": "C2985745059",
    "name": "Raspberry pi",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.45645544,
    "venue_count": 1,
    "avg_score": 0.45645544
  },
  {
    "id": "C45567728",
    "name": "Role-based access control",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.84535193,
    "venue_count": 1,
    "avg_score": 0.84535193
  },
  {
    "id": "C82142266",
    "name": "Dynamic Bayesian network",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.51845425,
    "venue_count": 1,
    "avg_score": 0.51845425
  },
  {
    "id": "C125245961",
    "name": "Brightness",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.44216412,
    "venue_count": 1,
    "avg_score": 0.44216412
  },
  {
    "id": "C20220851",
    "name": "Effect of gait parameters on energetic cost",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.5202238,
    "venue_count": 1,
    "avg_score": 0.5202238
  },
  {
    "id": "C120415902",
    "name": "Zero crossing",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4330992,
    "venue_count": 1,
    "avg_score": 0.4330992
  },
  {
    "id": "C155281189",
    "name": "Tensor (intrinsic definition)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.54441893,
    "venue_count": 1,
    "avg_score": 0.54441893
  },
  {
    "id": "C33099171",
    "name": "Harmony search",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.9305948,
    "venue_count": 1,
    "avg_score": 0.9305948
  },
  {
    "id": "C68781425",
    "name": "Multi-objective optimization",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4238567,
    "venue_count": 1,
    "avg_score": 0.4238567
  },
  {
    "id": "C85522705",
    "name": "Line search",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.42252815,
    "venue_count": 1,
    "avg_score": 0.42252815
  },
  {
    "id": "C174683762",
    "name": "Component-based software engineering",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.48264247,
    "venue_count": 1,
    "avg_score": 0.48264247
  },
  {
    "id": "C102931765",
    "name": "Dissociation (chemistry)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6650975,
    "venue_count": 1,
    "avg_score": 0.6650975
  },
  {
    "id": "C204421591",
    "name": "Implicit attitude",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43792257,
    "venue_count": 1,
    "avg_score": 0.43792257
  },
  {
    "id": "C159620131",
    "name": "Spatial analysis",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.51622605,
    "venue_count": 1,
    "avg_score": 0.51622605
  },
  {
    "id": "C67212190",
    "name": "Firmware",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6942389,
    "venue_count": 1,
    "avg_score": 0.6942389
  },
  {
    "id": "C2993899435",
    "name": "Mutual recognition",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.518719,
    "venue_count": 1,
    "avg_score": 0.518719
  },
  {
    "id": "C2777601987",
    "name": "Disturbance (geology)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6131551,
    "venue_count": 1,
    "avg_score": 0.6131551
  },
  {
    "id": "C2987834672",
    "name": "Action recognition",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6018422,
    "venue_count": 1,
    "avg_score": 0.6018422
  },
  {
    "id": "C44464901",
    "name": "Marketing and artificial intelligence",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.47454605,
    "venue_count": 1,
    "avg_score": 0.47454605
  },
  {
    "id": "C45801056",
    "name": "Social intelligence",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46266866,
    "venue_count": 1,
    "avg_score": 0.46266866
  },
  {
    "id": "C74216064",
    "name": "Social computing",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4615877,
    "venue_count": 1,
    "avg_score": 0.4615877
  },
  {
    "id": "C139502532",
    "name": "Computational intelligence",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42343196,
    "venue_count": 1,
    "avg_score": 0.42343196
  },
  {
    "id": "C140073362",
    "name": "Soft computing",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4212214,
    "venue_count": 1,
    "avg_score": 0.4212214
  },
  {
    "id": "C27181475",
    "name": "Cross-validation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5771016,
    "venue_count": 1,
    "avg_score": 0.5771016
  },
  {
    "id": "C2781464450",
    "name": "Treadmill",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6248396,
    "venue_count": 1,
    "avg_score": 0.6248396
  },
  {
    "id": "C24027999",
    "name": "Omnidirectional antenna",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.50948364,
    "venue_count": 1,
    "avg_score": 0.50948364
  },
  {
    "id": "C107464732",
    "name": "Adaptive control",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.44757938,
    "venue_count": 1,
    "avg_score": 0.44757938
  },
  {
    "id": "C140631703",
    "name": "Stereophonic sound",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6825326,
    "venue_count": 1,
    "avg_score": 0.6825326
  },
  {
    "id": "C2780092901",
    "name": "Correlation coefficient",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45357597,
    "venue_count": 1,
    "avg_score": 0.45357597
  },
  {
    "id": "C60048801",
    "name": "Intelligibility (philosophy)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.86194015,
    "venue_count": 1,
    "avg_score": 0.86194015
  },
  {
    "id": "C45273575",
    "name": "Spectrogram",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.49760345,
    "venue_count": 1,
    "avg_score": 0.49760345
  },
  {
    "id": "C2780813298",
    "name": "Percutaneous",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6398193,
    "venue_count": 1,
    "avg_score": 0.6398193
  },
  {
    "id": "C187590223",
    "name": "Holography",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6244796,
    "venue_count": 1,
    "avg_score": 0.6244796
  },
  {
    "id": "C534529494",
    "name": "Respiratory system",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5191926,
    "venue_count": 1,
    "avg_score": 0.5191926
  },
  {
    "id": "C169345407",
    "name": "Uncorrelated",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4606085,
    "venue_count": 1,
    "avg_score": 0.4606085
  },
  {
    "id": "C3020781530",
    "name": "Prosthetic hand",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45545074,
    "venue_count": 1,
    "avg_score": 0.45545074
  },
  {
    "id": "C2987467780",
    "name": "Artificial limbs",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.44714886,
    "venue_count": 1,
    "avg_score": 0.44714886
  },
  {
    "id": "C40743351",
    "name": "Neural decoding",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4254635,
    "venue_count": 1,
    "avg_score": 0.4254635
  },
  {
    "id": "C42357961",
    "name": "Open set",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4305677,
    "venue_count": 1,
    "avg_score": 0.4305677
  },
  {
    "id": "C104267543",
    "name": "Signal processing",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.42293867,
    "venue_count": 1,
    "avg_score": 0.42293867
  },
  {
    "id": "C139002025",
    "name": "Lift (data mining)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6756043,
    "venue_count": 1,
    "avg_score": 0.6756043
  },
  {
    "id": "C38180746",
    "name": "Multivariate analysis",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4203505,
    "venue_count": 1,
    "avg_score": 0.4203505
  },
  {
    "id": "C2989316616",
    "name": "Lower limb",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42608976,
    "venue_count": 1,
    "avg_score": 0.42608976
  },
  {
    "id": "C2779860262",
    "name": "Touchdown",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5128498,
    "venue_count": 1,
    "avg_score": 0.5128498
  },
  {
    "id": "C2992583082",
    "name": "Upper body",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.44648033,
    "venue_count": 1,
    "avg_score": 0.44648033
  },
  {
    "id": "C153396756",
    "name": "Physical strength",
    "level": 2,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C111151474",
    "name": "iCub",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.7222237,
    "venue_count": 1,
    "avg_score": 0.7222237
  },
  {
    "id": "C188888258",
    "name": "Robot learning",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.5926993,
    "venue_count": 1,
    "avg_score": 0.5926993
  },
  {
    "id": "C55786151",
    "name": "Level of measurement",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5288946,
    "venue_count": 1,
    "avg_score": 0.5288946
  },
  {
    "id": "C2776737515",
    "name": "American Sign Language",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6583718,
    "venue_count": 1,
    "avg_score": 0.6583718
  },
  {
    "id": "C2777984285",
    "name": "Impedance control",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6934026,
    "venue_count": 1,
    "avg_score": 0.6934026
  },
  {
    "id": "C2780345887",
    "name": "Backpack",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6823532,
    "venue_count": 1,
    "avg_score": 0.6823532
  },
  {
    "id": "C2777045574",
    "name": "Slipping",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.66409796,
    "venue_count": 1,
    "avg_score": 0.66409796
  },
  {
    "id": "C3019131375",
    "name": "Elbow flexion",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41538534,
    "venue_count": 1,
    "avg_score": 0.41538534
  },
  {
    "id": "C2780999251",
    "name": "Brake",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5469851,
    "venue_count": 1,
    "avg_score": 0.5469851
  },
  {
    "id": "C2780240375",
    "name": "Car seat",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.48923278,
    "venue_count": 1,
    "avg_score": 0.48923278
  },
  {
    "id": "C25457674",
    "name": "Sensory stimulation therapy",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.44614026,
    "venue_count": 1,
    "avg_score": 0.44614026
  },
  {
    "id": "C2984899217",
    "name": "Tactile display",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.410883,
    "venue_count": 1,
    "avg_score": 0.410883
  },
  {
    "id": "C156365220",
    "name": "Infographic",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6011059,
    "venue_count": 1,
    "avg_score": 0.6011059
  },
  {
    "id": "C2986805488",
    "name": "Contact lens",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.74693567,
    "venue_count": 1,
    "avg_score": 0.74693567
  },
  {
    "id": "C154910267",
    "name": "Non-line-of-sight propagation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.8067452,
    "venue_count": 1,
    "avg_score": 0.8067452
  },
  {
    "id": "C2779119184",
    "name": "ALARM",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43318188,
    "venue_count": 1,
    "avg_score": 0.43318188
  },
  {
    "id": "C2777027219",
    "name": "Constant (computer programming)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42420888,
    "venue_count": 1,
    "avg_score": 0.42420888
  },
  {
    "id": "C2776881184",
    "name": "Thumb",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.63534594,
    "venue_count": 1,
    "avg_score": 0.63534594
  },
  {
    "id": "C94957134",
    "name": "Numerical digit",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.50091887,
    "venue_count": 1,
    "avg_score": 0.50091887
  },
  {
    "id": "C2777781587",
    "name": "Finger joint",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4872948,
    "venue_count": 1,
    "avg_score": 0.4872948
  },
  {
    "id": "C23125352",
    "name": "Photodetector",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43197262,
    "venue_count": 1,
    "avg_score": 0.43197262
  },
  {
    "id": "C90790637",
    "name": "Binocular disparity",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.58740765,
    "venue_count": 1,
    "avg_score": 0.58740765
  },
  {
    "id": "C121958486",
    "name": "Binocular vision",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.53158695,
    "venue_count": 1,
    "avg_score": 0.53158695
  },
  {
    "id": "C173414695",
    "name": "Fusion mechanism",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.5112629,
    "venue_count": 1,
    "avg_score": 0.5112629
  },
  {
    "id": "C103038307",
    "name": "Lipid bilayer fusion",
    "level": 3,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C65909025",
    "name": "Monocular",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4146699,
    "venue_count": 1,
    "avg_score": 0.4146699
  },
  {
    "id": "C208081375",
    "name": "Degrees of freedom (physics and chemistry)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45123065,
    "venue_count": 1,
    "avg_score": 0.45123065
  },
  {
    "id": "C3019251811",
    "name": "Closed loop",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.48015374,
    "venue_count": 1,
    "avg_score": 0.48015374
  },
  {
    "id": "C2779006483",
    "name": "Differential game",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4652361,
    "venue_count": 1,
    "avg_score": 0.4652361
  },
  {
    "id": "C36613465",
    "name": "3D pose estimation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41554934,
    "venue_count": 1,
    "avg_score": 0.41554934
  },
  {
    "id": "C2778324724",
    "name": "Electrification",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.520324,
    "venue_count": 1,
    "avg_score": 0.520324
  },
  {
    "id": "C45764600",
    "name": "Extremely high frequency",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.763674,
    "venue_count": 1,
    "avg_score": 0.763674
  },
  {
    "id": "C109792285",
    "name": "Millimeter",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.44756168,
    "venue_count": 1,
    "avg_score": 0.44756168
  },
  {
    "id": "C2221639",
    "name": "Discrete cosine transform",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4249414,
    "venue_count": 1,
    "avg_score": 0.4249414
  },
  {
    "id": "C40506919",
    "name": "Sequence learning",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43210667,
    "venue_count": 1,
    "avg_score": 0.43210667
  },
  {
    "id": "C203595873",
    "name": "Change detection",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4548422,
    "venue_count": 1,
    "avg_score": 0.4548422
  },
  {
    "id": "C2778236678",
    "name": "Ontic",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4712033,
    "venue_count": 1,
    "avg_score": 0.4712033
  },
  {
    "id": "C79379906",
    "name": "Dynamical systems theory",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41044933,
    "venue_count": 1,
    "avg_score": 0.41044933
  },
  {
    "id": "C55078378",
    "name": "Pearson product-moment correlation coefficient",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7009773,
    "venue_count": 1,
    "avg_score": 0.7009773
  },
  {
    "id": "C25570617",
    "name": "Hilbert–Huang transform",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.49865484,
    "venue_count": 1,
    "avg_score": 0.49865484
  },
  {
    "id": "C124551494",
    "name": "Differential entropy",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.45135674,
    "venue_count": 1,
    "avg_score": 0.45135674
  },
  {
    "id": "C142611142",
    "name": "Rényi entropy",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.11618221,
    "venue_count": 1,
    "avg_score": 0.11618221
  },
  {
    "id": "C2776252893",
    "name": "FLEX",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.74255663,
    "venue_count": 1,
    "avg_score": 0.74255663
  },
  {
    "id": "C77246614",
    "name": "Gramian matrix",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.70460296,
    "venue_count": 1,
    "avg_score": 0.70460296
  },
  {
    "id": "C17511633",
    "name": "SMT placement equipment",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.42720723,
    "venue_count": 1,
    "avg_score": 0.42720723
  },
  {
    "id": "C144171764",
    "name": "Torque",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6119424,
    "venue_count": 1,
    "avg_score": 0.6119424
  },
  {
    "id": "C142757262",
    "name": "Doppler effect",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41323525,
    "venue_count": 1,
    "avg_score": 0.41323525
  },
  {
    "id": "C77637269",
    "name": "Neural coding",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42799896,
    "venue_count": 1,
    "avg_score": 0.42799896
  },
  {
    "id": "C2781415944",
    "name": "Joint stiffness",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4308481,
    "venue_count": 1,
    "avg_score": 0.4308481
  },
  {
    "id": "C2779075496",
    "name": "Mondrian",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5532481,
    "venue_count": 1,
    "avg_score": 0.5532481
  },
  {
    "id": "C2780323453",
    "name": "Overshoot (microwave communication)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.676512,
    "venue_count": 1,
    "avg_score": 0.676512
  },
  {
    "id": "C2778002699",
    "name": "Multi-user",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4929838,
    "venue_count": 1,
    "avg_score": 0.4929838
  },
  {
    "id": "C57830394",
    "name": "Posterior probability",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5590759,
    "venue_count": 1,
    "avg_score": 0.5590759
  },
  {
    "id": "C113324615",
    "name": "Login",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.63411903,
    "venue_count": 1,
    "avg_score": 0.63411903
  },
  {
    "id": "C23875713",
    "name": "Cognitive password",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.79736984,
    "venue_count": 1,
    "avg_score": 0.79736984
  },
  {
    "id": "C98705547",
    "name": "Password policy",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.4703149,
    "venue_count": 1,
    "avg_score": 0.4703149
  },
  {
    "id": "C19474535",
    "name": "Welding",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.61221844,
    "venue_count": 1,
    "avg_score": 0.61221844
  },
  {
    "id": "C20480867",
    "name": "Arc welding",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.462864,
    "venue_count": 1,
    "avg_score": 0.462864
  },
  {
    "id": "C2777489503",
    "name": "Temporal scales",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.47310925,
    "venue_count": 1,
    "avg_score": 0.47310925
  },
  {
    "id": "C2776141515",
    "name": "Repetition (rhetorical device)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.62060004,
    "venue_count": 1,
    "avg_score": 0.62060004
  },
  {
    "id": "C95851461",
    "name": "Reverberation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46145734,
    "venue_count": 1,
    "avg_score": 0.46145734
  },
  {
    "id": "C190727649",
    "name": "Mobile manipulator",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.54957306,
    "venue_count": 1,
    "avg_score": 0.54957306
  },
  {
    "id": "C534859617",
    "name": "Fantasy",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.51781374,
    "venue_count": 1,
    "avg_score": 0.51781374
  },
  {
    "id": "C518914266",
    "name": "Romance",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.9120197,
    "venue_count": 1,
    "avg_score": 0.9120197
  },
  {
    "id": "C95667121",
    "name": "Symbolic communication",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43714383,
    "venue_count": 1,
    "avg_score": 0.43714383
  },
  {
    "id": "C3020114046",
    "name": "American football",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5537987,
    "venue_count": 1,
    "avg_score": 0.5537987
  },
  {
    "id": "C2778444522",
    "name": "Football",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.33739048,
    "venue_count": 1,
    "avg_score": 0.33739048
  },
  {
    "id": "C2993546093",
    "name": "Dead body",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.44053015,
    "venue_count": 1,
    "avg_score": 0.44053015
  },
  {
    "id": "C2779504383",
    "name": "Autopsy",
    "level": 2,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C2993273291",
    "name": "New normal",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.6249161,
    "venue_count": 1,
    "avg_score": 0.6249161
  },
  {
    "id": "C110586980",
    "name": "Provocation test",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.58862406,
    "venue_count": 1,
    "avg_score": 0.58862406
  },
  {
    "id": "C2775935561",
    "name": "Alterity",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.9231638,
    "venue_count": 1,
    "avg_score": 0.9231638
  },
  {
    "id": "C42090638",
    "name": "STREAMS",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5546031,
    "venue_count": 1,
    "avg_score": 0.5546031
  },
  {
    "id": "C2779758577",
    "name": "Middle age",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5007405,
    "venue_count": 1,
    "avg_score": 0.5007405
  },
  {
    "id": "C119489759",
    "name": "Functional reactive programming",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.7228768,
    "venue_count": 1,
    "avg_score": 0.7228768
  },
  {
    "id": "C50033165",
    "name": "Inductive programming",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6862606,
    "venue_count": 1,
    "avg_score": 0.6862606
  },
  {
    "id": "C150762246",
    "name": "Reactive programming",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.67695594,
    "venue_count": 1,
    "avg_score": 0.67695594
  },
  {
    "id": "C120558287",
    "name": "Procedural programming",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.6442299,
    "venue_count": 1,
    "avg_score": 0.6442299
  },
  {
    "id": "C77362995",
    "name": "Event-driven programming",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.57254446,
    "venue_count": 1,
    "avg_score": 0.57254446
  },
  {
    "id": "C119263510",
    "name": "Programming domain",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.51487553,
    "venue_count": 1,
    "avg_score": 0.51487553
  },
  {
    "id": "C205333247",
    "name": "Self-assessment",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5590378,
    "venue_count": 1,
    "avg_score": 0.5590378
  },
  {
    "id": "C2986711855",
    "name": "Public healthcare",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.42043924,
    "venue_count": 1,
    "avg_score": 0.42043924
  },
  {
    "id": "C186229450",
    "name": "Sovereignty",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.51150477,
    "venue_count": 1,
    "avg_score": 0.51150477
  },
  {
    "id": "C177324205",
    "name": "Voting behavior",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.5697222,
    "venue_count": 1,
    "avg_score": 0.5697222
  },
  {
    "id": "C2779581591",
    "name": "Vowel",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4982345,
    "venue_count": 1,
    "avg_score": 0.4982345
  },
  {
    "id": "C2778864079",
    "name": "Digital data",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.419808,
    "venue_count": 1,
    "avg_score": 0.419808
  },
  {
    "id": "C2993130379",
    "name": "Food preparation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.47608247,
    "venue_count": 1,
    "avg_score": 0.47608247
  },
  {
    "id": "C88199923",
    "name": "Food processing",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.19338754,
    "venue_count": 1,
    "avg_score": 0.19338754
  },
  {
    "id": "C482391",
    "name": "Acronym",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6535958,
    "venue_count": 1,
    "avg_score": 0.6535958
  },
  {
    "id": "C22070199",
    "name": "Vaccination",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5355283,
    "venue_count": 1,
    "avg_score": 0.5355283
  },
  {
    "id": "C53839665",
    "name": "Peer assessment",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7797948,
    "venue_count": 1,
    "avg_score": 0.7797948
  },
  {
    "id": "C2776020993",
    "name": "Group work",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6575234,
    "venue_count": 1,
    "avg_score": 0.6575234
  },
  {
    "id": "C42058189",
    "name": "Peer feedback",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.47319385,
    "venue_count": 1,
    "avg_score": 0.47319385
  },
  {
    "id": "C2985357376",
    "name": "Aged care",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42666122,
    "venue_count": 1,
    "avg_score": 0.42666122
  },
  {
    "id": "C60908668",
    "name": "Perceptron",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5925973,
    "venue_count": 1,
    "avg_score": 0.5925973
  },
  {
    "id": "C48105269",
    "name": "Header",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.70466727,
    "venue_count": 1,
    "avg_score": 0.70466727
  },
  {
    "id": "C159334719",
    "name": "Activity theory",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4111508,
    "venue_count": 1,
    "avg_score": 0.4111508
  },
  {
    "id": "C167925730",
    "name": "Borderline intellectual functioning",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.52243704,
    "venue_count": 1,
    "avg_score": 0.52243704
  },
  {
    "id": "C2780760462",
    "name": "Video modeling",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.4598132,
    "venue_count": 1,
    "avg_score": 0.4598132
  },
  {
    "id": "C2781240822",
    "name": "Williams syndrome",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.45400238,
    "venue_count": 1,
    "avg_score": 0.45400238
  },
  {
    "id": "C2779954681",
    "name": "Down syndrome",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43913046,
    "venue_count": 1,
    "avg_score": 0.43913046
  },
  {
    "id": "C163549269",
    "name": "Modelling",
    "level": 3,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C162861558",
    "name": "Placemaking",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.9688611,
    "venue_count": 1,
    "avg_score": 0.9688611
  },
  {
    "id": "C2776775011",
    "name": "Vacuum cleaner",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.44881055,
    "venue_count": 1,
    "avg_score": 0.44881055
  },
  {
    "id": "C23795335",
    "name": "Suction",
    "level": 2,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C2779726219",
    "name": "Target acquisition",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.53691477,
    "venue_count": 1,
    "avg_score": 0.53691477
  },
  {
    "id": "C119279833",
    "name": "Sentence completion tests",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43068534,
    "venue_count": 1,
    "avg_score": 0.43068534
  },
  {
    "id": "C113470044",
    "name": "Interpretative phenomenological analysis",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5974095,
    "venue_count": 1,
    "avg_score": 0.5974095
  },
  {
    "id": "C2777769502",
    "name": "Making-of",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46667162,
    "venue_count": 1,
    "avg_score": 0.46667162
  },
  {
    "id": "C201960208",
    "name": "Geopolitics",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.8696493,
    "venue_count": 1,
    "avg_score": 0.8696493
  },
  {
    "id": "C2778056439",
    "name": "e-participation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.48541626,
    "venue_count": 1,
    "avg_score": 0.48541626
  },
  {
    "id": "C25796384",
    "name": "Metagaming",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.45870268,
    "venue_count": 1,
    "avg_score": 0.45870268
  },
  {
    "id": "C63985673",
    "name": "Narrative network",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.44433683,
    "venue_count": 1,
    "avg_score": 0.44433683
  },
  {
    "id": "C12772571",
    "name": "Narrative criticism",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.33965456,
    "venue_count": 1,
    "avg_score": 0.33965456
  },
  {
    "id": "C95940807",
    "name": "Simultaneous game",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.10114062,
    "venue_count": 1,
    "avg_score": 0.10114062
  },
  {
    "id": "C339426",
    "name": "Prospect theory",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7179533,
    "venue_count": 1,
    "avg_score": 0.7179533
  },
  {
    "id": "C136714292",
    "name": "Framing effect",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.55724704,
    "venue_count": 1,
    "avg_score": 0.55724704
  },
  {
    "id": "C28901747",
    "name": "Decision theory",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4695877,
    "venue_count": 1,
    "avg_score": 0.4695877
  },
  {
    "id": "C2779449553",
    "name": "Cumulative prospect theory",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.46187592,
    "venue_count": 1,
    "avg_score": 0.46187592
  },
  {
    "id": "C205706631",
    "name": "Expected utility hypothesis",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45064127,
    "venue_count": 1,
    "avg_score": 0.45064127
  },
  {
    "id": "C95837238",
    "name": "Ubiquitous commerce",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4244982,
    "venue_count": 1,
    "avg_score": 0.4244982
  },
  {
    "id": "C167135981",
    "name": "Retrospective cohort study",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.444882,
    "venue_count": 1,
    "avg_score": 0.444882
  },
  {
    "id": "C133489148",
    "name": "Pointing device",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45400286,
    "venue_count": 1,
    "avg_score": 0.45400286
  },
  {
    "id": "C137546455",
    "name": "Trigram",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43357974,
    "venue_count": 1,
    "avg_score": 0.43357974
  },
  {
    "id": "C40866790",
    "name": "Interactive computing",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.54280365,
    "venue_count": 1,
    "avg_score": 0.54280365
  },
  {
    "id": "C2777100477",
    "name": "Sclera",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4641873,
    "venue_count": 1,
    "avg_score": 0.4641873
  },
  {
    "id": "C112356035",
    "name": "Iris recognition",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.46232465,
    "venue_count": 1,
    "avg_score": 0.46232465
  },
  {
    "id": "C3232509",
    "name": "Instinct",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.69003856,
    "venue_count": 1,
    "avg_score": 0.69003856
  },
  {
    "id": "C2778712213",
    "name": "Calmness",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5977929,
    "venue_count": 1,
    "avg_score": 0.5977929
  },
  {
    "id": "C150706916",
    "name": "Job attitude",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.6765197,
    "venue_count": 1,
    "avg_score": 0.6765197
  },
  {
    "id": "C58346731",
    "name": "Job analysis",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5335845,
    "venue_count": 1,
    "avg_score": 0.5335845
  },
  {
    "id": "C2780616401",
    "name": "Cornerstone",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.53685665,
    "venue_count": 1,
    "avg_score": 0.53685665
  },
  {
    "id": "C17319257",
    "name": "Statute",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45990038,
    "venue_count": 1,
    "avg_score": 0.45990038
  },
  {
    "id": "C182406803",
    "name": "Capability Maturity Model Integration",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.9338052,
    "venue_count": 1,
    "avg_score": 0.9338052
  },
  {
    "id": "C160145156",
    "name": "Executable",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8321148,
    "venue_count": 1,
    "avg_score": 0.8321148
  },
  {
    "id": "C116253237",
    "name": "Formal specification",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43586424,
    "venue_count": 1,
    "avg_score": 0.43586424
  },
  {
    "id": "C2780519836",
    "name": "Telecare",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.9818914,
    "venue_count": 1,
    "avg_score": 0.9818914
  },
  {
    "id": "C2779778163",
    "name": "Implicit-association test",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46593753,
    "venue_count": 1,
    "avg_score": 0.46593753
  },
  {
    "id": "C3473561",
    "name": "Design rationale",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.47842938,
    "venue_count": 1,
    "avg_score": 0.47842938
  },
  {
    "id": "C2776459075",
    "name": "Interpersonal Reactivity Index",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.7992069,
    "venue_count": 1,
    "avg_score": 0.7992069
  },
  {
    "id": "C2776933542",
    "name": "Information behavior",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43051112,
    "venue_count": 1,
    "avg_score": 0.43051112
  },
  {
    "id": "C3019401138",
    "name": "Teaching assistant",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.67056066,
    "venue_count": 1,
    "avg_score": 0.67056066
  },
  {
    "id": "C154556556",
    "name": "Computer multitasking",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46317154,
    "venue_count": 1,
    "avg_score": 0.46317154
  },
  {
    "id": "C2992420184",
    "name": "Brand experience",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.433684,
    "venue_count": 1,
    "avg_score": 0.433684
  },
  {
    "id": "C149333683",
    "name": "Crowding",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5621563,
    "venue_count": 1,
    "avg_score": 0.5621563
  },
  {
    "id": "C182325601",
    "name": "Learner autonomy",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.44215965,
    "venue_count": 1,
    "avg_score": 0.44215965
  },
  {
    "id": "C123960582",
    "name": "Language education",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.3133065,
    "venue_count": 1,
    "avg_score": 0.3133065
  },
  {
    "id": "C2778083465",
    "name": "Cash",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43432844,
    "venue_count": 1,
    "avg_score": 0.43432844
  },
  {
    "id": "C2776529864",
    "name": "Novelty seeking",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.4574148,
    "venue_count": 1,
    "avg_score": 0.4574148
  },
  {
    "id": "C2778967200",
    "name": "Perceived control",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.53786147,
    "venue_count": 1,
    "avg_score": 0.53786147
  },
  {
    "id": "C2909622525",
    "name": "Psychometric testing",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.48890796,
    "venue_count": 1,
    "avg_score": 0.48890796
  },
  {
    "id": "C2776650110",
    "name": "Seriousness",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8639859,
    "venue_count": 1,
    "avg_score": 0.8639859
  },
  {
    "id": "C169796023",
    "name": "Direct Anonymous Attestation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.45760608,
    "venue_count": 1,
    "avg_score": 0.45760608
  },
  {
    "id": "C2776831232",
    "name": "Trusted Computing",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.20301351,
    "venue_count": 1,
    "avg_score": 0.20301351
  },
  {
    "id": "C2779114464",
    "name": "Cynicism",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.914584,
    "venue_count": 1,
    "avg_score": 0.914584
  },
  {
    "id": "C2777591371",
    "name": "Brand relationship",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.42089802,
    "venue_count": 1,
    "avg_score": 0.42089802
  },
  {
    "id": "C3019428158",
    "name": "Delay of gratification",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5518997,
    "venue_count": 1,
    "avg_score": 0.5518997
  },
  {
    "id": "C91682802",
    "name": "Multidimensional scaling",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6941792,
    "venue_count": 1,
    "avg_score": 0.6941792
  },
  {
    "id": "C92835128",
    "name": "Hierarchical clustering",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.55654126,
    "venue_count": 1,
    "avg_score": 0.55654126
  },
  {
    "id": "C35555965",
    "name": "Merge sort",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.43113387,
    "venue_count": 1,
    "avg_score": 0.43113387
  },
  {
    "id": "C2778972660",
    "name": "Navigability",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.72687733,
    "venue_count": 1,
    "avg_score": 0.72687733
  },
  {
    "id": "C2776086947",
    "name": "Physical attractiveness",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6355463,
    "venue_count": 1,
    "avg_score": 0.6355463
  },
  {
    "id": "C2776509339",
    "name": "Academic advising",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5448014,
    "venue_count": 1,
    "avg_score": 0.5448014
  },
  {
    "id": "C91557362",
    "name": "Music and artificial intelligence",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6353239,
    "venue_count": 1,
    "avg_score": 0.6353239
  },
  {
    "id": "C196754913",
    "name": "Music technology",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.51747376,
    "venue_count": 1,
    "avg_score": 0.51747376
  },
  {
    "id": "C2986160907",
    "name": "Video streaming",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.48046416,
    "venue_count": 1,
    "avg_score": 0.48046416
  },
  {
    "id": "C200046510",
    "name": "Design brief",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41931772,
    "venue_count": 1,
    "avg_score": 0.41931772
  },
  {
    "id": "C2984601542",
    "name": "Vocabulary learning",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.48338193,
    "venue_count": 1,
    "avg_score": 0.48338193
  },
  {
    "id": "C113445564",
    "name": "Self-perception theory",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.49233735,
    "venue_count": 1,
    "avg_score": 0.49233735
  },
  {
    "id": "C26869875",
    "name": "Beneficiary",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.54097,
    "venue_count": 1,
    "avg_score": 0.54097
  },
  {
    "id": "C2778979077",
    "name": "Receipt",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.77118397,
    "venue_count": 1,
    "avg_score": 0.77118397
  },
  {
    "id": "C2779296788",
    "name": "Early warning system",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41465393,
    "venue_count": 1,
    "avg_score": 0.41465393
  },
  {
    "id": "C63584917",
    "name": "Bounding overwatch",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6540055,
    "venue_count": 1,
    "avg_score": 0.6540055
  },
  {
    "id": "C2779079380",
    "name": "Falling (accident)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.53030944,
    "venue_count": 1,
    "avg_score": 0.53030944
  },
  {
    "id": "C2910200283",
    "name": "Psychological Theory",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42401692,
    "venue_count": 1,
    "avg_score": 0.42401692
  },
  {
    "id": "C185822510",
    "name": "Payment service provider",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.45808923,
    "venue_count": 1,
    "avg_score": 0.45808923
  },
  {
    "id": "C67597806",
    "name": "Layperson",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4247636,
    "venue_count": 1,
    "avg_score": 0.4247636
  },
  {
    "id": "C41661277",
    "name": "External variable",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.423002,
    "venue_count": 1,
    "avg_score": 0.423002
  },
  {
    "id": "C2779668609",
    "name": "Rapid serial visual presentation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.51826024,
    "venue_count": 1,
    "avg_score": 0.51826024
  },
  {
    "id": "C68784500",
    "name": "Adaptive behavior",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43215233,
    "venue_count": 1,
    "avg_score": 0.43215233
  },
  {
    "id": "C20254490",
    "name": "Biasing",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.7113044,
    "venue_count": 1,
    "avg_score": 0.7113044
  },
  {
    "id": "C115219716",
    "name": "International Classification of Functioning, Disability and Health",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5741607,
    "venue_count": 1,
    "avg_score": 0.5741607
  },
  {
    "id": "C2775862927",
    "name": "Rehabilitation robotics",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4423617,
    "venue_count": 1,
    "avg_score": 0.4423617
  },
  {
    "id": "C110326360",
    "name": "Metadata modeling",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.41480786,
    "venue_count": 1,
    "avg_score": 0.41480786
  },
  {
    "id": "C153048206",
    "name": "Metadata repository",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.25364774,
    "venue_count": 1,
    "avg_score": 0.25364774
  },
  {
    "id": "C2776314989",
    "name": "Consumer choice",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46377057,
    "venue_count": 1,
    "avg_score": 0.46377057
  },
  {
    "id": "C2779223135",
    "name": "Choice modelling",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4268026,
    "venue_count": 1,
    "avg_score": 0.4268026
  },
  {
    "id": "C189352744",
    "name": "Social choice theory",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5737882,
    "venue_count": 1,
    "avg_score": 0.5737882
  },
  {
    "id": "C32172795",
    "name": "Aggregation problem",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.48897612,
    "venue_count": 1,
    "avg_score": 0.48897612
  },
  {
    "id": "C97385483",
    "name": "Deep belief network",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5525859,
    "venue_count": 1,
    "avg_score": 0.5525859
  },
  {
    "id": "C23161992",
    "name": "Hum",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41599363,
    "venue_count": 1,
    "avg_score": 0.41599363
  },
  {
    "id": "C2778671685",
    "name": "Recipe",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6962093,
    "venue_count": 1,
    "avg_score": 0.6962093
  },
  {
    "id": "C150286290",
    "name": "Big Five personality traits and culture",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.41289306,
    "venue_count": 1,
    "avg_score": 0.41289306
  },
  {
    "id": "C2780035454",
    "name": "Drug",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7059541,
    "venue_count": 1,
    "avg_score": 0.7059541
  },
  {
    "id": "C2910466267",
    "name": "Drug-drug interaction",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5183807,
    "venue_count": 1,
    "avg_score": 0.5183807
  },
  {
    "id": "C98274493",
    "name": "Pharmacology",
    "level": 1,
    "total_papers": 1,
    "total_score": 0.28489417,
    "venue_count": 1,
    "avg_score": 0.28489417
  },
  {
    "id": "C2776003135",
    "name": "Publicity",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.48441297,
    "venue_count": 1,
    "avg_score": 0.48441297
  },
  {
    "id": "C2910988560",
    "name": "Biological sex",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42966866,
    "venue_count": 1,
    "avg_score": 0.42966866
  },
  {
    "id": "C110384440",
    "name": "Upsampling",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.8701016,
    "venue_count": 1,
    "avg_score": 0.8701016
  },
  {
    "id": "C71611378",
    "name": "Contextual design",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.42528027,
    "venue_count": 1,
    "avg_score": 0.42528027
  },
  {
    "id": "C2778136018",
    "name": "Predictive power",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.47519934,
    "venue_count": 1,
    "avg_score": 0.47519934
  },
  {
    "id": "C126139899",
    "name": "Attentional control",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.414744,
    "venue_count": 1,
    "avg_score": 0.414744
  },
  {
    "id": "C2986563244",
    "name": "Learning to learn",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43340153,
    "venue_count": 1,
    "avg_score": 0.43340153
  },
  {
    "id": "C93586867",
    "name": "Negative feedback",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.441935,
    "venue_count": 1,
    "avg_score": 0.441935
  },
  {
    "id": "C2780695315",
    "name": "Unobservable",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5284324,
    "venue_count": 1,
    "avg_score": 0.5284324
  },
  {
    "id": "C1893757",
    "name": "Inversion (geology)",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.43851632,
    "venue_count": 1,
    "avg_score": 0.43851632
  },
  {
    "id": "C109007969",
    "name": "Structural basin",
    "level": 2,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C81758059",
    "name": "tf–idf",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.55660343,
    "venue_count": 1,
    "avg_score": 0.55660343
  },
  {
    "id": "C2779532271",
    "name": "Relevance feedback",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.44278663,
    "venue_count": 1,
    "avg_score": 0.44278663
  },
  {
    "id": "C2777487392",
    "name": "Absolute (philosophy)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7064539,
    "venue_count": 1,
    "avg_score": 0.7064539
  },
  {
    "id": "C2778484313",
    "name": "Data stream",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5976031,
    "venue_count": 1,
    "avg_score": 0.5976031
  },
  {
    "id": "C2776910235",
    "name": "Reactivity (psychology)",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4913799,
    "venue_count": 1,
    "avg_score": 0.4913799
  },
  {
    "id": "C183763965",
    "name": "Proportionality (law)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.44410115,
    "venue_count": 1,
    "avg_score": 0.44410115
  },
  {
    "id": "C2779607372",
    "name": "Argumentation framework",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.58571404,
    "venue_count": 1,
    "avg_score": 0.58571404
  },
  {
    "id": "C168862018",
    "name": "Emotionality",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.63091326,
    "venue_count": 1,
    "avg_score": 0.63091326
  },
  {
    "id": "C136536468",
    "name": "Undersampling",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.9346885,
    "venue_count": 1,
    "avg_score": 0.9346885
  },
  {
    "id": "C2781280628",
    "name": "Dirichlet process",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.63145757,
    "venue_count": 1,
    "avg_score": 0.63145757
  },
  {
    "id": "C187819001",
    "name": "Thermostat",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.61609143,
    "venue_count": 1,
    "avg_score": 0.61609143
  },
  {
    "id": "C102366305",
    "name": "Nonparametric statistics",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6058967,
    "venue_count": 1,
    "avg_score": 0.6058967
  },
  {
    "id": "C158424031",
    "name": "Gibbs sampling",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.50437367,
    "venue_count": 1,
    "avg_score": 0.50437367
  },
  {
    "id": "C2776156558",
    "name": "MovieLens",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.80990857,
    "venue_count": 1,
    "avg_score": 0.80990857
  },
  {
    "id": "C2779089604",
    "name": "Permission",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5680377,
    "venue_count": 1,
    "avg_score": 0.5680377
  },
  {
    "id": "C33507282",
    "name": "Adaptive response",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5837902,
    "venue_count": 1,
    "avg_score": 0.5837902
  },
  {
    "id": "C169214877",
    "name": "Dirichlet distribution",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.56168395,
    "venue_count": 1,
    "avg_score": 0.56168395
  },
  {
    "id": "C196921405",
    "name": "Online algorithm",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.47460002,
    "venue_count": 1,
    "avg_score": 0.47460002
  },
  {
    "id": "C194387892",
    "name": "Stochastic optimization",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.47335052,
    "venue_count": 1,
    "avg_score": 0.47335052
  },
  {
    "id": "C77553402",
    "name": "Upper and lower bounds",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45416197,
    "venue_count": 1,
    "avg_score": 0.45416197
  },
  {
    "id": "C65965080",
    "name": "Latent variable model",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5954363,
    "venue_count": 1,
    "avg_score": 0.5954363
  },
  {
    "id": "C70727504",
    "name": "Latent class model",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42840832,
    "venue_count": 1,
    "avg_score": 0.42840832
  },
  {
    "id": "C180356752",
    "name": "Adjacency matrix",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.71651274,
    "venue_count": 1,
    "avg_score": 0.71651274
  },
  {
    "id": "C77277458",
    "name": "Temporal database",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.44287533,
    "venue_count": 1,
    "avg_score": 0.44287533
  },
  {
    "id": "C86034646",
    "name": "Semantic gap",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.5907783,
    "venue_count": 1,
    "avg_score": 0.5907783
  },
  {
    "id": "C10864753",
    "name": "Music and emotion",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.51835734,
    "venue_count": 1,
    "avg_score": 0.51835734
  },
  {
    "id": "C146902061",
    "name": "Music psychology",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.477646,
    "venue_count": 1,
    "avg_score": 0.477646
  },
  {
    "id": "C127220857",
    "name": "Audio signal processing",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.4141575,
    "venue_count": 1,
    "avg_score": 0.4141575
  },
  {
    "id": "C40346341",
    "name": "Facial Action Coding System",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.73783773,
    "venue_count": 1,
    "avg_score": 0.73783773
  },
  {
    "id": "C2778597338",
    "name": "Trier social stress test",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.76501966,
    "venue_count": 1,
    "avg_score": 0.76501966
  },
  {
    "id": "C78604142",
    "name": "Fight-or-flight response",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.19034055,
    "venue_count": 1,
    "avg_score": 0.19034055
  },
  {
    "id": "C16311509",
    "name": "Dependency graph",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.52303946,
    "venue_count": 1,
    "avg_score": 0.52303946
  },
  {
    "id": "C164883195",
    "name": "Dependency grammar",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4341375,
    "venue_count": 1,
    "avg_score": 0.4341375
  },
  {
    "id": "C517642484",
    "name": "Intelligence analysis",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41918096,
    "venue_count": 1,
    "avg_score": 0.41918096
  },
  {
    "id": "C2777629044",
    "name": "Contrastive analysis",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5781947,
    "venue_count": 1,
    "avg_score": 0.5781947
  },
  {
    "id": "C64357122",
    "name": "Causality (physics)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.67560595,
    "venue_count": 1,
    "avg_score": 0.67560595
  },
  {
    "id": "C87619178",
    "name": "Concatenation (mathematics)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41497526,
    "venue_count": 1,
    "avg_score": 0.41497526
  },
  {
    "id": "C172025690",
    "name": "Echo state network",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.6456516,
    "venue_count": 1,
    "avg_score": 0.6456516
  },
  {
    "id": "C135796866",
    "name": "Reservoir computing",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.5840578,
    "venue_count": 1,
    "avg_score": 0.5840578
  },
  {
    "id": "C2779506182",
    "name": "Spotting",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.73583573,
    "venue_count": 1,
    "avg_score": 0.73583573
  },
  {
    "id": "C2776240099",
    "name": "Interrogation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.548869,
    "venue_count": 1,
    "avg_score": 0.548869
  },
  {
    "id": "C2781213101",
    "name": "Keyword spotting",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46567768,
    "venue_count": 1,
    "avg_score": 0.46567768
  },
  {
    "id": "C138602881",
    "name": "Confusion matrix",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.59047735,
    "venue_count": 1,
    "avg_score": 0.59047735
  },
  {
    "id": "C161301231",
    "name": "Knowledge representation and reasoning",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.35172173,
    "venue_count": 1,
    "avg_score": 0.35172173
  },
  {
    "id": "C153874254",
    "name": "Canonical correlation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4935528,
    "venue_count": 1,
    "avg_score": 0.4935528
  },
  {
    "id": "C17231256",
    "name": "Completeness (order theory)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.54441327,
    "venue_count": 1,
    "avg_score": 0.54441327
  },
  {
    "id": "C2983787585",
    "name": "Feature matching",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.50545526,
    "venue_count": 1,
    "avg_score": 0.50545526
  },
  {
    "id": "C119898033",
    "name": "Ensemble forecasting",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4844313,
    "venue_count": 1,
    "avg_score": 0.4844313
  },
  {
    "id": "C142433447",
    "name": "Time–frequency analysis",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5046946,
    "venue_count": 1,
    "avg_score": 0.5046946
  },
  {
    "id": "C151876577",
    "name": "Nonlinear dimensionality reduction",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.58580565,
    "venue_count": 1,
    "avg_score": 0.58580565
  },
  {
    "id": "C128534915",
    "name": "Affective science",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.45396125,
    "venue_count": 1,
    "avg_score": 0.45396125
  },
  {
    "id": "C199364081",
    "name": "Nova (rocket)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.505374,
    "venue_count": 1,
    "avg_score": 0.505374
  },
  {
    "id": "C2778654693",
    "name": "Anorexia",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.69468594,
    "venue_count": 1,
    "avg_score": 0.69468594
  },
  {
    "id": "C2780055620",
    "name": "Autism Diagnostic Observation Schedule",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.45186573,
    "venue_count": 1,
    "avg_score": 0.45186573
  },
  {
    "id": "C2781002164",
    "name": "Meta learning (computer science)",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5374753,
    "venue_count": 1,
    "avg_score": 0.5374753
  },
  {
    "id": "C20854674",
    "name": "Cognitive architecture",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.53091794,
    "venue_count": 1,
    "avg_score": 0.53091794
  },
  {
    "id": "C86658582",
    "name": "Social cognition",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.45280245,
    "venue_count": 1,
    "avg_score": 0.45280245
  },
  {
    "id": "C2984493583",
    "name": "Mental stress",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42209494,
    "venue_count": 1,
    "avg_score": 0.42209494
  },
  {
    "id": "C174010058",
    "name": "Personality Assessment Inventory",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.43124712,
    "venue_count": 1,
    "avg_score": 0.43124712
  },
  {
    "id": "C165637930",
    "name": "Mathematical anxiety",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.53808093,
    "venue_count": 1,
    "avg_score": 0.53808093
  },
  {
    "id": "C44042526",
    "name": "Crowd psychology",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8372631,
    "venue_count": 1,
    "avg_score": 0.8372631
  },
  {
    "id": "C100339178",
    "name": "Collective behavior",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.50074196,
    "venue_count": 1,
    "avg_score": 0.50074196
  },
  {
    "id": "C5041914",
    "name": "Fuzzy cognitive map",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.46402436,
    "venue_count": 1,
    "avg_score": 0.46402436
  },
  {
    "id": "C29470771",
    "name": "Neuro-fuzzy",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.19182676,
    "venue_count": 1,
    "avg_score": 0.19182676
  },
  {
    "id": "C195975749",
    "name": "Fuzzy control system",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.171292,
    "venue_count": 1,
    "avg_score": 0.171292
  },
  {
    "id": "C43555835",
    "name": "Conditional probability distribution",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.47407618,
    "venue_count": 1,
    "avg_score": 0.47407618
  },
  {
    "id": "C165216359",
    "name": "Marginal distribution",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4437838,
    "venue_count": 1,
    "avg_score": 0.4437838
  },
  {
    "id": "C3826847",
    "name": "FLOPS",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5202404,
    "venue_count": 1,
    "avg_score": 0.5202404
  },
  {
    "id": "C2944601119",
    "name": "Residual neural network",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.45006266,
    "venue_count": 1,
    "avg_score": 0.45006266
  },
  {
    "id": "C203357204",
    "name": "Chunking (psychology)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.78595185,
    "venue_count": 1,
    "avg_score": 0.78595185
  },
  {
    "id": "C2778971668",
    "name": "Fusion rules",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.52024496,
    "venue_count": 1,
    "avg_score": 0.52024496
  },
  {
    "id": "C69744172",
    "name": "Image fusion",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.17290804,
    "venue_count": 1,
    "avg_score": 0.17290804
  },
  {
    "id": "C136886441",
    "name": "Normalization (sociology)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6730603,
    "venue_count": 1,
    "avg_score": 0.6730603
  },
  {
    "id": "C200127275",
    "name": "Quaternion",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7931523,
    "venue_count": 1,
    "avg_score": 0.7931523
  },
  {
    "id": "C45424060",
    "name": "Ministate",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.99252045,
    "venue_count": 1,
    "avg_score": 0.99252045
  },
  {
    "id": "C104996578",
    "name": "Insula",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4715752,
    "venue_count": 1,
    "avg_score": 0.4715752
  },
  {
    "id": "C2778402161",
    "name": "Anterior cingulate cortex",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4445158,
    "venue_count": 1,
    "avg_score": 0.4445158
  },
  {
    "id": "C2775956885",
    "name": "Superior frontal gyrus",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.42790443,
    "venue_count": 1,
    "avg_score": 0.42790443
  },
  {
    "id": "C2778143943",
    "name": "Expressed emotion",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41727775,
    "venue_count": 1,
    "avg_score": 0.41727775
  },
  {
    "id": "C88230418",
    "name": "Graph theory",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43299878,
    "venue_count": 1,
    "avg_score": 0.43299878
  },
  {
    "id": "C104286136",
    "name": "Modal analysis",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4305677,
    "venue_count": 1,
    "avg_score": 0.4305677
  },
  {
    "id": "C92936396",
    "name": "Social constructivism",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.51090807,
    "venue_count": 1,
    "avg_score": 0.51090807
  },
  {
    "id": "C133281099",
    "name": "Constructivism (international relations)",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.42492622,
    "venue_count": 1,
    "avg_score": 0.42492622
  },
  {
    "id": "C34355311",
    "name": "International relations",
    "level": 3,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C3018395757",
    "name": "Evaluation methods",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42554903,
    "venue_count": 1,
    "avg_score": 0.42554903
  },
  {
    "id": "C3017426381",
    "name": "Negative mood",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4332032,
    "venue_count": 1,
    "avg_score": 0.4332032
  },
  {
    "id": "C207821765",
    "name": "Instability",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4386962,
    "venue_count": 1,
    "avg_score": 0.4386962
  },
  {
    "id": "C2781214261",
    "name": "Hostility",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.84243286,
    "venue_count": 1,
    "avg_score": 0.84243286
  },
  {
    "id": "C2780573568",
    "name": "Fist",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6255027,
    "venue_count": 1,
    "avg_score": 0.6255027
  },
  {
    "id": "C95038775",
    "name": "Climbing",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5077487,
    "venue_count": 1,
    "avg_score": 0.5077487
  },
  {
    "id": "C2776882386",
    "name": "Hemiparesis",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.79833573,
    "venue_count": 1,
    "avg_score": 0.79833573
  },
  {
    "id": "C3018579778",
    "name": "Chronic stroke",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.42333046,
    "venue_count": 1,
    "avg_score": 0.42333046
  },
  {
    "id": "C2781156865",
    "name": "Lesion",
    "level": 2,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C75947009",
    "name": "Fresco",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5671569,
    "venue_count": 1,
    "avg_score": 0.5671569
  },
  {
    "id": "C2778739829",
    "name": "Hospital Anxiety and Depression Scale",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.52801627,
    "venue_count": 1,
    "avg_score": 0.52801627
  },
  {
    "id": "C2776760841",
    "name": "Geriatric Depression Scale",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.46757844,
    "venue_count": 1,
    "avg_score": 0.46757844
  },
  {
    "id": "C2909807104",
    "name": "Computer-Assisted Instruction",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45148972,
    "venue_count": 1,
    "avg_score": 0.45148972
  },
  {
    "id": "C155542232",
    "name": "Optical flow",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5815187,
    "venue_count": 1,
    "avg_score": 0.5815187
  },
  {
    "id": "C20463939",
    "name": "Diaphragmatic breathing",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.7173303,
    "venue_count": 1,
    "avg_score": 0.7173303
  },
  {
    "id": "C2780319597",
    "name": "Impulsivity",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5776212,
    "venue_count": 1,
    "avg_score": 0.5776212
  },
  {
    "id": "C2776566319",
    "name": "Interactive video",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.47459194,
    "venue_count": 1,
    "avg_score": 0.47459194
  },
  {
    "id": "C74414138",
    "name": "Venipuncture",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8595824,
    "venue_count": 1,
    "avg_score": 0.8595824
  },
  {
    "id": "C2779541405",
    "name": "Craving",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.60803187,
    "venue_count": 1,
    "avg_score": 0.60803187
  },
  {
    "id": "C52672216",
    "name": "Depth perception",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.47417057,
    "venue_count": 1,
    "avg_score": 0.47417057
  },
  {
    "id": "C88199966",
    "name": "Vergence (optics)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.62224007,
    "venue_count": 1,
    "avg_score": 0.62224007
  },
  {
    "id": "C536788834",
    "name": "Neuropsychological assessment",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.4425311,
    "venue_count": 1,
    "avg_score": 0.4425311
  },
  {
    "id": "C6057870",
    "name": "Cognitive test",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.43170467,
    "venue_count": 1,
    "avg_score": 0.43170467
  },
  {
    "id": "C2779125066",
    "name": "International Affective Picture System",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4803756,
    "venue_count": 1,
    "avg_score": 0.4803756
  },
  {
    "id": "C206041023",
    "name": "Wilcoxon signed-rank test",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4377876,
    "venue_count": 1,
    "avg_score": 0.4377876
  },
  {
    "id": "C12868164",
    "name": "Mann–Whitney U test",
    "level": 2,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C95020103",
    "name": "Match moving",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.57599705,
    "venue_count": 1,
    "avg_score": 0.57599705
  },
  {
    "id": "C162932704",
    "name": "Synchronizing",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.48494485,
    "venue_count": 1,
    "avg_score": 0.48494485
  },
  {
    "id": "C202695956",
    "name": "Debriefing",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.69163644,
    "venue_count": 1,
    "avg_score": 0.69163644
  },
  {
    "id": "C2777051993",
    "name": "Rifle",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.9712813,
    "venue_count": 1,
    "avg_score": 0.9712813
  },
  {
    "id": "C68537008",
    "name": "Stereopsis",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.52604246,
    "venue_count": 1,
    "avg_score": 0.52604246
  },
  {
    "id": "C203165030",
    "name": "Booster (rocketry)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.48462066,
    "venue_count": 1,
    "avg_score": 0.48462066
  },
  {
    "id": "C47177892",
    "name": "Neurorehabilitation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.71060824,
    "venue_count": 1,
    "avg_score": 0.71060824
  },
  {
    "id": "C96024061",
    "name": "Self-image",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4566071,
    "venue_count": 1,
    "avg_score": 0.4566071
  },
  {
    "id": "C2779984560",
    "name": "Experiential avoidance",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.72569644,
    "venue_count": 1,
    "avg_score": 0.72569644
  },
  {
    "id": "C181282483",
    "name": "Business transformation",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.504455,
    "venue_count": 1,
    "avg_score": 0.504455
  },
  {
    "id": "C2776845425",
    "name": "Stereotype threat",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.83507925,
    "venue_count": 1,
    "avg_score": 0.83507925
  },
  {
    "id": "C152443987",
    "name": "Attentional bias",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.46477607,
    "venue_count": 1,
    "avg_score": 0.46477607
  },
  {
    "id": "C96420161",
    "name": "Collectivism",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.47887653,
    "venue_count": 1,
    "avg_score": 0.47887653
  },
  {
    "id": "C2780587575",
    "name": "Misconduct",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.74087745,
    "venue_count": 1,
    "avg_score": 0.74087745
  },
  {
    "id": "C171687745",
    "name": "Physical fitness",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43774277,
    "venue_count": 1,
    "avg_score": 0.43774277
  },
  {
    "id": "C87863119",
    "name": "Subculture (biology)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41874078,
    "venue_count": 1,
    "avg_score": 0.41874078
  },
  {
    "id": "C2775834023",
    "name": "Brand community",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.7906165,
    "venue_count": 1,
    "avg_score": 0.7906165
  },
  {
    "id": "C57375061",
    "name": "Brand management",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.64385164,
    "venue_count": 1,
    "avg_score": 0.64385164
  },
  {
    "id": "C205971072",
    "name": "Brand equity",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.515966,
    "venue_count": 1,
    "avg_score": 0.515966
  },
  {
    "id": "C136006765",
    "name": "Corporate branding",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.48196146,
    "venue_count": 1,
    "avg_score": 0.48196146
  },
  {
    "id": "C19106626",
    "name": "Bystander effect",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.78681695,
    "venue_count": 1,
    "avg_score": 0.78681695
  },
  {
    "id": "C2776886188",
    "name": "Victimisation",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.73195803,
    "venue_count": 1,
    "avg_score": 0.73195803
  },
  {
    "id": "C2776431611",
    "name": "Civic engagement",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.62164205,
    "venue_count": 1,
    "avg_score": 0.62164205
  },
  {
    "id": "C60136833",
    "name": "Social media optimization",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.47606915,
    "venue_count": 1,
    "avg_score": 0.47606915
  },
  {
    "id": "C167275870",
    "name": "Media system dependency theory",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4321013,
    "venue_count": 1,
    "avg_score": 0.4321013
  },
  {
    "id": "C529147693",
    "name": "News media",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4134339,
    "venue_count": 1,
    "avg_score": 0.4134339
  },
  {
    "id": "C67037518",
    "name": "Media relations",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.32005602,
    "venue_count": 1,
    "avg_score": 0.32005602
  },
  {
    "id": "C194775826",
    "name": "Herd",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4184727,
    "venue_count": 1,
    "avg_score": 0.4184727
  },
  {
    "id": "C178233286",
    "name": "Social comparison theory",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4696041,
    "venue_count": 1,
    "avg_score": 0.4696041
  },
  {
    "id": "C2780279448",
    "name": "Altruism (biology)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8822134,
    "venue_count": 1,
    "avg_score": 0.8822134
  },
  {
    "id": "C125553218",
    "name": "Ethical egoism",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.82548916,
    "venue_count": 1,
    "avg_score": 0.82548916
  },
  {
    "id": "C63477270",
    "name": "Dictator game",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42376518,
    "venue_count": 1,
    "avg_score": 0.42376518
  },
  {
    "id": "C2250968",
    "name": "Health equity",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.49288917,
    "venue_count": 1,
    "avg_score": 0.49288917
  },
  {
    "id": "C207665656",
    "name": "Ethics of technology",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.44593078,
    "venue_count": 1,
    "avg_score": 0.44593078
  },
  {
    "id": "C197549326",
    "name": "Meta-ethics",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.21442768,
    "venue_count": 1,
    "avg_score": 0.21442768
  },
  {
    "id": "C171089853",
    "name": "Online search",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.52484065,
    "venue_count": 1,
    "avg_score": 0.52484065
  },
  {
    "id": "C505070042",
    "name": "Narcissism",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.927783,
    "venue_count": 1,
    "avg_score": 0.927783
  },
  {
    "id": "C90048612",
    "name": "Acculturation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.72301507,
    "venue_count": 1,
    "avg_score": 0.72301507
  },
  {
    "id": "C2775906791",
    "name": "Self-service",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.78855014,
    "venue_count": 1,
    "avg_score": 0.78855014
  },
  {
    "id": "C2992695702",
    "name": "Mental healthcare",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.71064925,
    "venue_count": 1,
    "avg_score": 0.71064925
  },
  {
    "id": "C2992545881",
    "name": "Mental health care",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4822848,
    "venue_count": 1,
    "avg_score": 0.4822848
  },
  {
    "id": "C2987857752",
    "name": "Human health",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4415004,
    "venue_count": 1,
    "avg_score": 0.4415004
  },
  {
    "id": "C71889745",
    "name": "Counterfactual conditional",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.54206586,
    "venue_count": 1,
    "avg_score": 0.54206586
  },
  {
    "id": "C2777393702",
    "name": "Career counseling",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7431724,
    "venue_count": 1,
    "avg_score": 0.7431724
  },
  {
    "id": "C50556499",
    "name": "Cognitive Information Processing",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.67377675,
    "venue_count": 1,
    "avg_score": 0.67377675
  },
  {
    "id": "C170276225",
    "name": "Career portfolio",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.47492582,
    "venue_count": 1,
    "avg_score": 0.47492582
  },
  {
    "id": "C2777247013",
    "name": "Career development",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45124882,
    "venue_count": 1,
    "avg_score": 0.45124882
  },
  {
    "id": "C2777868252",
    "name": "Urban village",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.53260154,
    "venue_count": 1,
    "avg_score": 0.53260154
  },
  {
    "id": "C129047720",
    "name": "Rural area",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.50365084,
    "venue_count": 1,
    "avg_score": 0.50365084
  },
  {
    "id": "C2778719706",
    "name": "Local government",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45724726,
    "venue_count": 1,
    "avg_score": 0.45724726
  },
  {
    "id": "C45355965",
    "name": "Socioeconomics",
    "level": 1,
    "total_papers": 1,
    "total_score": 0.4322104,
    "venue_count": 1,
    "avg_score": 0.4322104
  },
  {
    "id": "C2778364177",
    "name": "Attraction",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.62841964,
    "venue_count": 1,
    "avg_score": 0.62841964
  },
  {
    "id": "C2992000405",
    "name": "Persuasive communication",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.52881813,
    "venue_count": 1,
    "avg_score": 0.52881813
  },
  {
    "id": "C2776962539",
    "name": "Lagging",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.48858342,
    "venue_count": 1,
    "avg_score": 0.48858342
  },
  {
    "id": "C2776154706",
    "name": "Health Information National Trends Survey",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.48111954,
    "venue_count": 1,
    "avg_score": 0.48111954
  },
  {
    "id": "C2982795734",
    "name": "Health information",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.40558186,
    "venue_count": 1,
    "avg_score": 0.40558186
  },
  {
    "id": "C17435882",
    "name": "HOL",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.571938,
    "venue_count": 1,
    "avg_score": 0.571938
  },
  {
    "id": "C14564219",
    "name": "Social cognitive theory",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.63218415,
    "venue_count": 1,
    "avg_score": 0.63218415
  },
  {
    "id": "C15046100",
    "name": "Social learning theory",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4639914,
    "venue_count": 1,
    "avg_score": 0.4639914
  },
  {
    "id": "C2780532074",
    "name": "Derogation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.47171208,
    "venue_count": 1,
    "avg_score": 0.47171208
  },
  {
    "id": "C134659438",
    "name": "Social exclusion",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5278387,
    "venue_count": 1,
    "avg_score": 0.5278387
  },
  {
    "id": "C2779760435",
    "name": "Minor (academic)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5495917,
    "venue_count": 1,
    "avg_score": 0.5495917
  },
  {
    "id": "C51845450",
    "name": "Team software process",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.43131655,
    "venue_count": 1,
    "avg_score": 0.43131655
  },
  {
    "id": "C2780508717",
    "name": "Dorsolateral prefrontal cortex",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.6402445,
    "venue_count": 1,
    "avg_score": 0.6402445
  },
  {
    "id": "C2779295839",
    "name": "Punishment (psychology)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5034439,
    "venue_count": 1,
    "avg_score": 0.5034439
  },
  {
    "id": "C2910738102",
    "name": "Avoidance behaviour",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6599447,
    "venue_count": 1,
    "avg_score": 0.6599447
  },
  {
    "id": "C146926590",
    "name": "Avoidance response",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.48132646,
    "venue_count": 1,
    "avg_score": 0.48132646
  },
  {
    "id": "C3020031316",
    "name": "Psychological distress",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6987365,
    "venue_count": 1,
    "avg_score": 0.6987365
  },
  {
    "id": "C176661527",
    "name": "Reactance",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.9304558,
    "venue_count": 1,
    "avg_score": 0.9304558
  },
  {
    "id": "C2986582350",
    "name": "Mobile marketing",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.42854375,
    "venue_count": 1,
    "avg_score": 0.42854375
  },
  {
    "id": "C2778048844",
    "name": "Malaria",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5206846,
    "venue_count": 1,
    "avg_score": 0.5206846
  },
  {
    "id": "C2779458634",
    "name": "Debiasing",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.95989895,
    "venue_count": 1,
    "avg_score": 0.95989895
  },
  {
    "id": "C33002781",
    "name": "Automaticity",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.9397769,
    "venue_count": 1,
    "avg_score": 0.9397769
  },
  {
    "id": "C84653758",
    "name": "Goal orientation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5450495,
    "venue_count": 1,
    "avg_score": 0.5450495
  },
  {
    "id": "C2992225742",
    "name": "Panel survey",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42021385,
    "venue_count": 1,
    "avg_score": 0.42021385
  },
  {
    "id": "C2780583389",
    "name": "Glory",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.73070776,
    "venue_count": 1,
    "avg_score": 0.73070776
  },
  {
    "id": "C126583095",
    "name": "Organizational citizenship behavior",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5865036,
    "venue_count": 1,
    "avg_score": 0.5865036
  },
  {
    "id": "C48189365",
    "name": "Hybrid",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5835496,
    "venue_count": 1,
    "avg_score": 0.5835496
  },
  {
    "id": "C2779070825",
    "name": "Augment",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8361933,
    "venue_count": 1,
    "avg_score": 0.8361933
  },
  {
    "id": "C2776095079",
    "name": "The Symbolic",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45880145,
    "venue_count": 1,
    "avg_score": 0.45880145
  },
  {
    "id": "C203906138",
    "name": "Ego depletion",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.49996614,
    "venue_count": 1,
    "avg_score": 0.49996614
  },
  {
    "id": "C141841376",
    "name": "New Interfaces for Musical Expression",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.45272875,
    "venue_count": 1,
    "avg_score": 0.45272875
  },
  {
    "id": "C109568592",
    "name": "Musical composition",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.24290597,
    "venue_count": 1,
    "avg_score": 0.24290597
  },
  {
    "id": "C2986840890",
    "name": "Financial sector",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5012083,
    "venue_count": 1,
    "avg_score": 0.5012083
  },
  {
    "id": "C2779382077",
    "name": "Trade finance",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.49535525,
    "venue_count": 1,
    "avg_score": 0.49535525
  },
  {
    "id": "C178283979",
    "name": "Public finance",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.09850034,
    "venue_count": 1,
    "avg_score": 0.09850034
  },
  {
    "id": "C2779618896",
    "name": "Paralysis",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4314885,
    "venue_count": 1,
    "avg_score": 0.4314885
  },
  {
    "id": "C96865113",
    "name": "Certificate",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.49618798,
    "venue_count": 1,
    "avg_score": 0.49618798
  },
  {
    "id": "C133710760",
    "name": "Exponential smoothing",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5719721,
    "venue_count": 1,
    "avg_score": 0.5719721
  },
  {
    "id": "C188897",
    "name": "Economic impact analysis",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.51330155,
    "venue_count": 1,
    "avg_score": 0.51330155
  },
  {
    "id": "C154193497",
    "name": "Economic sector",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.44751406,
    "venue_count": 1,
    "avg_score": 0.44751406
  },
  {
    "id": "C47768531",
    "name": "Development economics",
    "level": 1,
    "total_papers": 1,
    "total_score": 0.3713343,
    "venue_count": 1,
    "avg_score": 0.3713343
  },
  {
    "id": "C152361515",
    "name": "Bernoulli's principle",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.51150906,
    "venue_count": 1,
    "avg_score": 0.51150906
  },
  {
    "id": "C2776324614",
    "name": "Web content",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41765577,
    "venue_count": 1,
    "avg_score": 0.41765577
  },
  {
    "id": "C2778309149",
    "name": "Emergency evacuation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.52047276,
    "venue_count": 1,
    "avg_score": 0.52047276
  },
  {
    "id": "C188441871",
    "name": "Softmax function",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6706738,
    "venue_count": 1,
    "avg_score": 0.6706738
  },
  {
    "id": "C2777648638",
    "name": "Coronavirus",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.5125961,
    "venue_count": 1,
    "avg_score": 0.5125961
  },
  {
    "id": "C2779829184",
    "name": "Diabetic retinopathy",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.74139965,
    "venue_count": 1,
    "avg_score": 0.74139965
  },
  {
    "id": "C2776391266",
    "name": "Fundus (uterus)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5721689,
    "venue_count": 1,
    "avg_score": 0.5721689
  },
  {
    "id": "C184660509",
    "name": "Shared secret",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.43425018,
    "venue_count": 1,
    "avg_score": 0.43425018
  },
  {
    "id": "C510870077",
    "name": "Secure communication",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41808262,
    "venue_count": 1,
    "avg_score": 0.41808262
  },
  {
    "id": "C65302260",
    "name": "Symmetric-key algorithm",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.41503775,
    "venue_count": 1,
    "avg_score": 0.41503775
  },
  {
    "id": "C183763347",
    "name": "Factorial",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42728493,
    "venue_count": 1,
    "avg_score": 0.42728493
  },
  {
    "id": "C2778705799",
    "name": "Financial asset",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.53198326,
    "venue_count": 1,
    "avg_score": 0.53198326
  },
  {
    "id": "C2776465043",
    "name": "Augmentative",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6267109,
    "venue_count": 1,
    "avg_score": 0.6267109
  },
  {
    "id": "C78834623",
    "name": "Mobile broadband",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4554512,
    "venue_count": 1,
    "avg_score": 0.4554512
  },
  {
    "id": "C2776509796",
    "name": "Content creation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.49507394,
    "venue_count": 1,
    "avg_score": 0.49507394
  },
  {
    "id": "C2778034918",
    "name": "Topology control",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.48478907,
    "venue_count": 1,
    "avg_score": 0.48478907
  },
  {
    "id": "C7091991",
    "name": "Mobile wireless sensor network",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.47660393,
    "venue_count": 1,
    "avg_score": 0.47660393
  },
  {
    "id": "C149102469",
    "name": "Visual sensor network",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.42914408,
    "venue_count": 1,
    "avg_score": 0.42914408
  },
  {
    "id": "C2777946086",
    "name": "Music information retrieval",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.42307413,
    "venue_count": 1,
    "avg_score": 0.42307413
  },
  {
    "id": "C82578977",
    "name": "Data aggregator",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.47862285,
    "venue_count": 1,
    "avg_score": 0.47862285
  },
  {
    "id": "C192835768",
    "name": "Data link layer",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.41321585,
    "venue_count": 1,
    "avg_score": 0.41321585
  },
  {
    "id": "C19247436",
    "name": "Physical layer",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.3520952,
    "venue_count": 1,
    "avg_score": 0.3520952
  },
  {
    "id": "C71681937",
    "name": "Object-class detection",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.6513078,
    "venue_count": 1,
    "avg_score": 0.6513078
  },
  {
    "id": "C2779407163",
    "name": "YCbCr",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.6466363,
    "venue_count": 1,
    "avg_score": 0.6466363
  },
  {
    "id": "C142616399",
    "name": "Color image",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.1776995,
    "venue_count": 1,
    "avg_score": 0.1776995
  },
  {
    "id": "C151635116",
    "name": "Chinese remainder theorem",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4370603,
    "venue_count": 1,
    "avg_score": 0.4370603
  },
  {
    "id": "C37952496",
    "name": "Business analytics",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.43291542,
    "venue_count": 1,
    "avg_score": 0.43291542
  },
  {
    "id": "C189076506",
    "name": "Business analysis",
    "level": 3,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C144072006",
    "name": "Travel behavior",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.56656593,
    "venue_count": 1,
    "avg_score": 0.56656593
  },
  {
    "id": "C2780465443",
    "name": "Champion",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.847906,
    "venue_count": 1,
    "avg_score": 0.847906
  },
  {
    "id": "C2778652015",
    "name": "Security awareness",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6400158,
    "venue_count": 1,
    "avg_score": 0.6400158
  },
  {
    "id": "C2778537899",
    "name": "Bedtime",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.67145896,
    "venue_count": 1,
    "avg_score": 0.67145896
  },
  {
    "id": "C2780746774",
    "name": "Functional encryption",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.50603575,
    "venue_count": 1,
    "avg_score": 0.50603575
  },
  {
    "id": "C93974786",
    "name": "Ciphertext",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.1055378,
    "venue_count": 1,
    "avg_score": 0.1055378
  },
  {
    "id": "C187482481",
    "name": "Natural user interface",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.43394423,
    "venue_count": 1,
    "avg_score": 0.43394423
  },
  {
    "id": "C98856871",
    "name": "Radial basis function",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.67193997,
    "venue_count": 1,
    "avg_score": 0.67193997
  },
  {
    "id": "C38365724",
    "name": "Activation function",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4842479,
    "venue_count": 1,
    "avg_score": 0.4842479
  },
  {
    "id": "C132917294",
    "name": "Radial basis function network",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.42834735,
    "venue_count": 1,
    "avg_score": 0.42834735
  },
  {
    "id": "C188414643",
    "name": "Harmonics",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5604089,
    "venue_count": 1,
    "avg_score": 0.5604089
  },
  {
    "id": "C127934551",
    "name": "Harmonic",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4963854,
    "venue_count": 1,
    "avg_score": 0.4963854
  },
  {
    "id": "C189206191",
    "name": "Genomics",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.4854968,
    "venue_count": 1,
    "avg_score": 0.4854968
  },
  {
    "id": "C141231307",
    "name": "Genome",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.16932511,
    "venue_count": 1,
    "avg_score": 0.16932511
  },
  {
    "id": "C3018027319",
    "name": "Convalescent plasma",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.6128766,
    "venue_count": 1,
    "avg_score": 0.6128766
  },
  {
    "id": "C204264503",
    "name": "Basic reproduction number",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5262569,
    "venue_count": 1,
    "avg_score": 0.5262569
  },
  {
    "id": "C19444555",
    "name": "Flattening",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.52536285,
    "venue_count": 1,
    "avg_score": 0.52536285
  },
  {
    "id": "C167928553",
    "name": "Estimation theory",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4609727,
    "venue_count": 1,
    "avg_score": 0.4609727
  },
  {
    "id": "C2780952636",
    "name": "Incident management",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5496531,
    "venue_count": 1,
    "avg_score": 0.5496531
  },
  {
    "id": "C2776876444",
    "name": "Crime analysis",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4386025,
    "venue_count": 1,
    "avg_score": 0.4386025
  },
  {
    "id": "C2778435480",
    "name": "Colonoscopy",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.5404909,
    "venue_count": 1,
    "avg_score": 0.5404909
  },
  {
    "id": "C2777333622",
    "name": "Capsule endoscopy",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42515674,
    "venue_count": 1,
    "avg_score": 0.42515674
  },
  {
    "id": "C526805850",
    "name": "Colorectal cancer",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.25558817,
    "venue_count": 1,
    "avg_score": 0.25558817
  },
  {
    "id": "C38822068",
    "name": "Denial-of-service attack",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.8383976,
    "venue_count": 1,
    "avg_score": 0.8383976
  },
  {
    "id": "C169988225",
    "name": "Traffic classification",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4399412,
    "venue_count": 1,
    "avg_score": 0.4399412
  },
  {
    "id": "C120865594",
    "name": "Application layer DDoS attack",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.4376463,
    "venue_count": 1,
    "avg_score": 0.4376463
  },
  {
    "id": "C199163554",
    "name": "Univariate",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4234804,
    "venue_count": 1,
    "avg_score": 0.4234804
  },
  {
    "id": "C2780299701",
    "name": "Stock market",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6782668,
    "venue_count": 1,
    "avg_score": 0.6782668
  },
  {
    "id": "C19244329",
    "name": "Financial market",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42105636,
    "venue_count": 1,
    "avg_score": 0.42105636
  },
  {
    "id": "C2781363737",
    "name": "Forwarder",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.78951925,
    "venue_count": 1,
    "avg_score": 0.78951925
  },
  {
    "id": "C111185680",
    "name": "Sensor node",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.42176437,
    "venue_count": 1,
    "avg_score": 0.42176437
  },
  {
    "id": "C143050476",
    "name": "Sink (geography)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41165218,
    "venue_count": 1,
    "avg_score": 0.41165218
  },
  {
    "id": "C155292070",
    "name": "Location-based service",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4174345,
    "venue_count": 1,
    "avg_score": 0.4174345
  },
  {
    "id": "C114735433",
    "name": "Gross motor skill",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5546104,
    "venue_count": 1,
    "avg_score": 0.5546104
  },
  {
    "id": "C108811297",
    "name": "Admittance",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6800593,
    "venue_count": 1,
    "avg_score": 0.6800593
  },
  {
    "id": "C2776768071",
    "name": "Ethical decision",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5920052,
    "venue_count": 1,
    "avg_score": 0.5920052
  },
  {
    "id": "C2777745021",
    "name": "Consequentialism",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5505267,
    "venue_count": 1,
    "avg_score": 0.5505267
  },
  {
    "id": "C119232533",
    "name": "Business ethics",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.417762,
    "venue_count": 1,
    "avg_score": 0.417762
  },
  {
    "id": "C191267431",
    "name": "Honeypot",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.47340426,
    "venue_count": 1,
    "avg_score": 0.47340426
  },
  {
    "id": "C2776126113",
    "name": "Industrial robot",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4104505,
    "venue_count": 1,
    "avg_score": 0.4104505
  },
  {
    "id": "C183030095",
    "name": "Equifinality",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8556138,
    "venue_count": 1,
    "avg_score": 0.8556138
  },
  {
    "id": "C176632266",
    "name": "Strategic fit",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4727681,
    "venue_count": 1,
    "avg_score": 0.4727681
  },
  {
    "id": "C75294576",
    "name": "Contextual image classification",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.57041734,
    "venue_count": 1,
    "avg_score": 0.57041734
  },
  {
    "id": "C2776715762",
    "name": "Pneumoconiosis",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.56215394,
    "venue_count": 1,
    "avg_score": 0.56215394
  },
  {
    "id": "C2779549770",
    "name": "Computer-aided diagnosis",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45700964,
    "venue_count": 1,
    "avg_score": 0.45700964
  },
  {
    "id": "C169761439",
    "name": "Mobile QoS",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.44525605,
    "venue_count": 1,
    "avg_score": 0.44525605
  },
  {
    "id": "C115121344",
    "name": "Mobile interaction",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.46144122,
    "venue_count": 1,
    "avg_score": 0.46144122
  },
  {
    "id": "C36914074",
    "name": "nobody",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.66588914,
    "venue_count": 1,
    "avg_score": 0.66588914
  },
  {
    "id": "C125252325",
    "name": "Entropy rate",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.46690518,
    "venue_count": 1,
    "avg_score": 0.46690518
  },
  {
    "id": "C66696666",
    "name": "Sample entropy",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41130853,
    "venue_count": 1,
    "avg_score": 0.41130853
  },
  {
    "id": "C44415725",
    "name": "Binary entropy function",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.103087574,
    "venue_count": 1,
    "avg_score": 0.103087574
  },
  {
    "id": "C551230270",
    "name": "Data retrieval",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46944448,
    "venue_count": 1,
    "avg_score": 0.46944448
  },
  {
    "id": "C179366874",
    "name": "Demand management",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5070729,
    "venue_count": 1,
    "avg_score": 0.5070729
  },
  {
    "id": "C2780873155",
    "name": "Agent-based model",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.47297254,
    "venue_count": 1,
    "avg_score": 0.47297254
  },
  {
    "id": "C108759981",
    "name": "Authorization",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5944818,
    "venue_count": 1,
    "avg_score": 0.5944818
  },
  {
    "id": "C36434225",
    "name": "Polypharmacy",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.851794,
    "venue_count": 1,
    "avg_score": 0.851794
  },
  {
    "id": "C160403385",
    "name": "Queue",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.71036464,
    "venue_count": 1,
    "avg_score": 0.71036464
  },
  {
    "id": "C22684755",
    "name": "Queueing theory",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45069462,
    "venue_count": 1,
    "avg_score": 0.45069462
  },
  {
    "id": "C158251709",
    "name": "Intrusion",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5174356,
    "venue_count": 1,
    "avg_score": 0.5174356
  },
  {
    "id": "C17409809",
    "name": "Geochemistry",
    "level": 1,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C100158260",
    "name": "Dynamic web page",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.46124405,
    "venue_count": 1,
    "avg_score": 0.46124405
  },
  {
    "id": "C2776548393",
    "name": "Unmanned ground vehicle",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6954051,
    "venue_count": 1,
    "avg_score": 0.6954051
  },
  {
    "id": "C543511877",
    "name": "Educational software",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41371796,
    "venue_count": 1,
    "avg_score": 0.41371796
  },
  {
    "id": "C2989335485",
    "name": "Transmission rate",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.48226792,
    "venue_count": 1,
    "avg_score": 0.48226792
  },
  {
    "id": "C159176650",
    "name": "Horizon",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.44723678,
    "venue_count": 1,
    "avg_score": 0.44723678
  },
  {
    "id": "C2984309518",
    "name": "Human trafficking",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43320763,
    "venue_count": 1,
    "avg_score": 0.43320763
  },
  {
    "id": "C152623178",
    "name": "Network delay",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5275041,
    "venue_count": 1,
    "avg_score": 0.5275041
  },
  {
    "id": "C37624559",
    "name": "End-to-end delay",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.43161672,
    "venue_count": 1,
    "avg_score": 0.43161672
  },
  {
    "id": "C193524817",
    "name": "Association rule learning",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6429329,
    "venue_count": 1,
    "avg_score": 0.6429329
  },
  {
    "id": "C180823521",
    "name": "Certified Information Security Manager",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.51587546,
    "venue_count": 1,
    "avg_score": 0.51587546
  },
  {
    "id": "C83163435",
    "name": "Security management",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5038869,
    "venue_count": 1,
    "avg_score": 0.5038869
  },
  {
    "id": "C39358052",
    "name": "Information security audit",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.4379566,
    "venue_count": 1,
    "avg_score": 0.4379566
  },
  {
    "id": "C195518309",
    "name": "Security testing",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.4367865,
    "venue_count": 1,
    "avg_score": 0.4367865
  },
  {
    "id": "C121822524",
    "name": "Computer security model",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41771448,
    "venue_count": 1,
    "avg_score": 0.41771448
  },
  {
    "id": "C139547956",
    "name": "Information security standards",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.4114762,
    "venue_count": 1,
    "avg_score": 0.4114762
  },
  {
    "id": "C117110713",
    "name": "Network security policy",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.15601519,
    "venue_count": 1,
    "avg_score": 0.15601519
  },
  {
    "id": "C533869091",
    "name": "Cerebrum",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41364715,
    "venue_count": 1,
    "avg_score": 0.41364715
  },
  {
    "id": "C2778527123",
    "name": "Punching",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46665072,
    "venue_count": 1,
    "avg_score": 0.46665072
  },
  {
    "id": "C157138929",
    "name": "Loudspeaker",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43894935,
    "venue_count": 1,
    "avg_score": 0.43894935
  },
  {
    "id": "C2776429412",
    "name": "Aerial image",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6269326,
    "venue_count": 1,
    "avg_score": 0.6269326
  },
  {
    "id": "C2779481623",
    "name": "Disaster area",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45783877,
    "venue_count": 1,
    "avg_score": 0.45783877
  },
  {
    "id": "C205372480",
    "name": "Image resolution",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4559326,
    "venue_count": 1,
    "avg_score": 0.4559326
  },
  {
    "id": "C3020199158",
    "name": "High resolution",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43685853,
    "venue_count": 1,
    "avg_score": 0.43685853
  },
  {
    "id": "C2777611316",
    "name": "Streaming data",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4134885,
    "venue_count": 1,
    "avg_score": 0.4134885
  },
  {
    "id": "C16282426",
    "name": "Digital photography",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6147543,
    "venue_count": 1,
    "avg_score": 0.6147543
  },
  {
    "id": "C55166926",
    "name": "Oracle",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.841848,
    "venue_count": 1,
    "avg_score": 0.841848
  },
  {
    "id": "C21916231",
    "name": "Ultra-wideband",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.48250818,
    "venue_count": 1,
    "avg_score": 0.48250818
  },
  {
    "id": "C179755657",
    "name": "Mortality rate",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.50150347,
    "venue_count": 1,
    "avg_score": 0.50150347
  },
  {
    "id": "C2987404301",
    "name": "Intensive care",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4703871,
    "venue_count": 1,
    "avg_score": 0.4703871
  },
  {
    "id": "C6295992",
    "name": "Cryptosystem",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.500721,
    "venue_count": 1,
    "avg_score": 0.500721
  },
  {
    "id": "C100515483",
    "name": "Filter bank",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5504931,
    "venue_count": 1,
    "avg_score": 0.5504931
  },
  {
    "id": "C2780407094",
    "name": "IEEE 802.15",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6135914,
    "venue_count": 1,
    "avg_score": 0.6135914
  },
  {
    "id": "C137607620",
    "name": "Superframe",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5140894,
    "venue_count": 1,
    "avg_score": 0.5140894
  },
  {
    "id": "C643704",
    "name": "Network allocation vector",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.44436955,
    "venue_count": 1,
    "avg_score": 0.44436955
  },
  {
    "id": "C185298936",
    "name": "IEEE 802.11",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.20888034,
    "venue_count": 1,
    "avg_score": 0.20888034
  },
  {
    "id": "C2780523633",
    "name": "Labelling",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45695615,
    "venue_count": 1,
    "avg_score": 0.45695615
  },
  {
    "id": "C38129911",
    "name": "Auditory scene analysis",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.47322643,
    "venue_count": 1,
    "avg_score": 0.47322643
  },
  {
    "id": "C54926389",
    "name": "Spectral envelope",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43023223,
    "venue_count": 1,
    "avg_score": 0.43023223
  },
  {
    "id": "C181335050",
    "name": "Swarm behaviour",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41690445,
    "venue_count": 1,
    "avg_score": 0.41690445
  },
  {
    "id": "C109718341",
    "name": "Metaheuristic",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45615804,
    "venue_count": 1,
    "avg_score": 0.45615804
  },
  {
    "id": "C196216189",
    "name": "Wavelet transform",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.66717476,
    "venue_count": 1,
    "avg_score": 0.66717476
  },
  {
    "id": "C46286280",
    "name": "Discrete wavelet transform",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.57175326,
    "venue_count": 1,
    "avg_score": 0.57175326
  },
  {
    "id": "C95722684",
    "name": "Continuous wavelet transform",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.47710186,
    "venue_count": 1,
    "avg_score": 0.47710186
  },
  {
    "id": "C74064498",
    "name": "Radio frequency",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46009985,
    "venue_count": 1,
    "avg_score": 0.46009985
  },
  {
    "id": "C98559332",
    "name": "Recall bias",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.44278193,
    "venue_count": 1,
    "avg_score": 0.44278193
  },
  {
    "id": "C153740404",
    "name": "Data center",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.525337,
    "venue_count": 1,
    "avg_score": 0.525337
  },
  {
    "id": "C84525096",
    "name": "Cryptovirology",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.55890214,
    "venue_count": 1,
    "avg_score": 0.55890214
  },
  {
    "id": "C26993612",
    "name": "Panacea (medicine)",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.588558,
    "venue_count": 1,
    "avg_score": 0.588558
  },
  {
    "id": "C22111027",
    "name": "Internet security",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.5239023,
    "venue_count": 1,
    "avg_score": 0.5239023
  },
  {
    "id": "C157202957",
    "name": "Image warping",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41194323,
    "venue_count": 1,
    "avg_score": 0.41194323
  },
  {
    "id": "C80291951",
    "name": "Design by contract",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.44389796,
    "venue_count": 1,
    "avg_score": 0.44389796
  },
  {
    "id": "C110251889",
    "name": "Model checking",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4185326,
    "venue_count": 1,
    "avg_score": 0.4185326
  },
  {
    "id": "C126314574",
    "name": "Air quality index",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4864068,
    "venue_count": 1,
    "avg_score": 0.4864068
  },
  {
    "id": "C161218011",
    "name": "Multipath propagation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6228286,
    "venue_count": 1,
    "avg_score": 0.6228286
  },
  {
    "id": "C2777826928",
    "name": "Fingerprint (computing)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5064913,
    "venue_count": 1,
    "avg_score": 0.5064913
  },
  {
    "id": "C2777486483",
    "name": "Indoor positioning system",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.47236782,
    "venue_count": 1,
    "avg_score": 0.47236782
  },
  {
    "id": "C101541887",
    "name": "Remote radio head",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.5691568,
    "venue_count": 1,
    "avg_score": 0.5691568
  },
  {
    "id": "C2779765720",
    "name": "C-RAN",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.5288787,
    "venue_count": 1,
    "avg_score": 0.5288787
  },
  {
    "id": "C193415008",
    "name": "Network architecture",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.48015136,
    "venue_count": 1,
    "avg_score": 0.48015136
  },
  {
    "id": "C182448111",
    "name": "Radio resource management",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.4139058,
    "venue_count": 1,
    "avg_score": 0.4139058
  },
  {
    "id": "C2779423816",
    "name": "Wireless power transfer",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.72284293,
    "venue_count": 1,
    "avg_score": 0.72284293
  },
  {
    "id": "C2778774385",
    "name": "Power management",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41197258,
    "venue_count": 1,
    "avg_score": 0.41197258
  },
  {
    "id": "C2778505942",
    "name": "Microservices",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.75785124,
    "venue_count": 1,
    "avg_score": 0.75785124
  },
  {
    "id": "C2776945810",
    "name": "Data anonymization",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.42083365,
    "venue_count": 1,
    "avg_score": 0.42083365
  },
  {
    "id": "C69398868",
    "name": "Lightning (connector)",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.65837675,
    "venue_count": 1,
    "avg_score": 0.65837675
  },
  {
    "id": "C52421305",
    "name": "Particle filter",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.55501086,
    "venue_count": 1,
    "avg_score": 0.55501086
  },
  {
    "id": "C186379835",
    "name": "Mile",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.77073467,
    "venue_count": 1,
    "avg_score": 0.77073467
  },
  {
    "id": "C52121051",
    "name": "Truck",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.69356155,
    "venue_count": 1,
    "avg_score": 0.69356155
  },
  {
    "id": "C45440154",
    "name": "Last mile (transportation)",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6398275,
    "venue_count": 1,
    "avg_score": 0.6398275
  },
  {
    "id": "C117978034",
    "name": "Extractor",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.56417143,
    "venue_count": 1,
    "avg_score": 0.56417143
  },
  {
    "id": "C56052488",
    "name": "Amorphous solid",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.54887754,
    "venue_count": 1,
    "avg_score": 0.54887754
  },
  {
    "id": "C2780156472",
    "name": "Pedestrian detection",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5057256,
    "venue_count": 1,
    "avg_score": 0.5057256
  },
  {
    "id": "C51399673",
    "name": "Lidar",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4698958,
    "venue_count": 1,
    "avg_score": 0.4698958
  },
  {
    "id": "C33762810",
    "name": "Data integrity",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4807377,
    "venue_count": 1,
    "avg_score": 0.4807377
  },
  {
    "id": "C38556500",
    "name": "Cache algorithms",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.42991033,
    "venue_count": 1,
    "avg_score": 0.42991033
  },
  {
    "id": "C189783530",
    "name": "CPU cache",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.291899,
    "venue_count": 1,
    "avg_score": 0.291899
  },
  {
    "id": "C152745839",
    "name": "Fault detection and isolation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.42006445,
    "venue_count": 1,
    "avg_score": 0.42006445
  },
  {
    "id": "C555379026",
    "name": "Identity management",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5713628,
    "venue_count": 1,
    "avg_score": 0.5713628
  },
  {
    "id": "C102168758",
    "name": "Beacon",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7116509,
    "venue_count": 1,
    "avg_score": 0.7116509
  },
  {
    "id": "C2776174506",
    "name": "Bipolar disorder",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.45852864,
    "venue_count": 1,
    "avg_score": 0.45852864
  },
  {
    "id": "C2777091541",
    "name": "Neonatal intensive care unit",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5009911,
    "venue_count": 1,
    "avg_score": 0.5009911
  },
  {
    "id": "C155032097",
    "name": "Backpropagation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4274798,
    "venue_count": 1,
    "avg_score": 0.4274798
  },
  {
    "id": "C31447003",
    "name": "Spline interpolation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.42104936,
    "venue_count": 1,
    "avg_score": 0.42104936
  },
  {
    "id": "C205203396",
    "name": "Bilinear interpolation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C51592225",
    "name": "Food quality",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.61757255,
    "venue_count": 1,
    "avg_score": 0.61757255
  },
  {
    "id": "C2780191829",
    "name": "Food distribution",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4714048,
    "venue_count": 1,
    "avg_score": 0.4714048
  },
  {
    "id": "C202629362",
    "name": "Scalable Vector Graphics",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.74436593,
    "venue_count": 1,
    "avg_score": 0.74436593
  },
  {
    "id": "C2776418194",
    "name": "Bluetooth Low Energy",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.6241,
    "venue_count": 1,
    "avg_score": 0.6241
  },
  {
    "id": "C65422117",
    "name": "Transmitter power output",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.5345366,
    "venue_count": 1,
    "avg_score": 0.5345366
  },
  {
    "id": "C2779757391",
    "name": "Image translation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4162149,
    "venue_count": 1,
    "avg_score": 0.4162149
  },
  {
    "id": "C136643341",
    "name": "Reachability",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5455742,
    "venue_count": 1,
    "avg_score": 0.5455742
  },
  {
    "id": "C173362246",
    "name": "Visibility graph",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5229138,
    "venue_count": 1,
    "avg_score": 0.5229138
  },
  {
    "id": "C108710211",
    "name": "Mathematical proof",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42973503,
    "venue_count": 1,
    "avg_score": 0.42973503
  },
  {
    "id": "C99674996",
    "name": "Key exchange",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.53826016,
    "venue_count": 1,
    "avg_score": 0.53826016
  },
  {
    "id": "C207968372",
    "name": "k-means clustering",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.7823382,
    "venue_count": 1,
    "avg_score": 0.7823382
  },
  {
    "id": "C46576248",
    "name": "DBSCAN",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.44349685,
    "venue_count": 1,
    "avg_score": 0.44349685
  },
  {
    "id": "C17212007",
    "name": "Fuzzy clustering",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.20253068,
    "venue_count": 1,
    "avg_score": 0.20253068
  },
  {
    "id": "C33704608",
    "name": "CURE data clustering algorithm",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.17975947,
    "venue_count": 1,
    "avg_score": 0.17975947
  },
  {
    "id": "C14961307",
    "name": "Energy minimization",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42455062,
    "venue_count": 1,
    "avg_score": 0.42455062
  },
  {
    "id": "C147597530",
    "name": "Computational chemistry",
    "level": 1,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C168110828",
    "name": "Spectral density",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.54504687,
    "venue_count": 1,
    "avg_score": 0.54504687
  },
  {
    "id": "C90652560",
    "name": "Minimum mean square error",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.45921987,
    "venue_count": 1,
    "avg_score": 0.45921987
  },
  {
    "id": "C202477664",
    "name": "Client-side",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.59837246,
    "venue_count": 1,
    "avg_score": 0.59837246
  },
  {
    "id": "C103613024",
    "name": "Stateless protocol",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5474031,
    "venue_count": 1,
    "avg_score": 0.5474031
  },
  {
    "id": "C14414571",
    "name": "Server-side",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4731884,
    "venue_count": 1,
    "avg_score": 0.4731884
  },
  {
    "id": "C64452783",
    "name": "Ternary operation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.55399215,
    "venue_count": 1,
    "avg_score": 0.55399215
  },
  {
    "id": "C9616225",
    "name": "Semantic reasoner",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5791745,
    "venue_count": 1,
    "avg_score": 0.5791745
  },
  {
    "id": "C202839342",
    "name": "Industrial Internet",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.60457337,
    "venue_count": 1,
    "avg_score": 0.60457337
  },
  {
    "id": "C2778555145",
    "name": "Mobility management",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4576456,
    "venue_count": 1,
    "avg_score": 0.4576456
  },
  {
    "id": "C155527597",
    "name": "Signcryption",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.8963709,
    "venue_count": 1,
    "avg_score": 0.8963709
  },
  {
    "id": "C72648740",
    "name": "Public key infrastructure",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.4926477,
    "venue_count": 1,
    "avg_score": 0.4926477
  },
  {
    "id": "C130120984",
    "name": "Distributed algorithm",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.57780063,
    "venue_count": 1,
    "avg_score": 0.57780063
  },
  {
    "id": "C123745756",
    "name": "Interconnection",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4332732,
    "venue_count": 1,
    "avg_score": 0.4332732
  },
  {
    "id": "C160562895",
    "name": "Precoding",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.4444395,
    "venue_count": 1,
    "avg_score": 0.4444395
  },
  {
    "id": "C207987634",
    "name": "MIMO",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.117132634,
    "venue_count": 1,
    "avg_score": 0.117132634
  },
  {
    "id": "C3261483",
    "name": "Frame rate",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5497048,
    "venue_count": 1,
    "avg_score": 0.5497048
  },
  {
    "id": "C8213797",
    "name": "Respiratory rate",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.41267094,
    "venue_count": 1,
    "avg_score": 0.41267094
  },
  {
    "id": "C22927095",
    "name": "Stateful firewall",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6329854,
    "venue_count": 1,
    "avg_score": 0.6329854
  },
  {
    "id": "C16160715",
    "name": "Traffic engineering",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.13828042,
    "venue_count": 1,
    "avg_score": 0.13828042
  },
  {
    "id": "C2776104089",
    "name": "Location awareness",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.48954973,
    "venue_count": 1,
    "avg_score": 0.48954973
  },
  {
    "id": "C32295351",
    "name": "Multicast",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.79819506,
    "venue_count": 1,
    "avg_score": 0.79819506
  },
  {
    "id": "C44892269",
    "name": "Protocol Independent Multicast",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6041033,
    "venue_count": 1,
    "avg_score": 0.6041033
  },
  {
    "id": "C192059732",
    "name": "Xcast",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5500183,
    "venue_count": 1,
    "avg_score": 0.5500183
  },
  {
    "id": "C42272142",
    "name": "Distance Vector Multicast Routing Protocol",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.48457038,
    "venue_count": 1,
    "avg_score": 0.48457038
  },
  {
    "id": "C18787934",
    "name": "Source-specific multicast",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.46976328,
    "venue_count": 1,
    "avg_score": 0.46976328
  },
  {
    "id": "C2779768198",
    "name": "Kindness",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.56358296,
    "venue_count": 1,
    "avg_score": 0.56358296
  },
  {
    "id": "C150759737",
    "name": "OLED",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.60705,
    "venue_count": 1,
    "avg_score": 0.60705
  },
  {
    "id": "C168970074",
    "name": "Data Authentication Algorithm",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.4757975,
    "venue_count": 1,
    "avg_score": 0.4757975
  },
  {
    "id": "C15927051",
    "name": "Cryptographic primitive",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.45116878,
    "venue_count": 1,
    "avg_score": 0.45116878
  },
  {
    "id": "C63540848",
    "name": "Fault tolerance",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.50111985,
    "venue_count": 1,
    "avg_score": 0.50111985
  },
  {
    "id": "C2777513581",
    "name": "Group key",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.94135535,
    "venue_count": 1,
    "avg_score": 0.94135535
  },
  {
    "id": "C44871818",
    "name": "Communication in small groups",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.62205493,
    "venue_count": 1,
    "avg_score": 0.62205493
  },
  {
    "id": "C135530808",
    "name": "Key-agreement protocol",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.56925154,
    "venue_count": 1,
    "avg_score": 0.56925154
  },
  {
    "id": "C17886624",
    "name": "Key management",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5259243,
    "venue_count": 1,
    "avg_score": 0.5259243
  },
  {
    "id": "C205009425",
    "name": "Forward secrecy",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.48859912,
    "venue_count": 1,
    "avg_score": 0.48859912
  },
  {
    "id": "C135257023",
    "name": "Domain-specific language",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.47503215,
    "venue_count": 1,
    "avg_score": 0.47503215
  },
  {
    "id": "C106544461",
    "name": "Block cipher",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.76017165,
    "venue_count": 1,
    "avg_score": 0.76017165
  },
  {
    "id": "C156529985",
    "name": "CBC-MAC",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.41761172,
    "venue_count": 1,
    "avg_score": 0.41761172
  },
  {
    "id": "C190362976",
    "name": "Caloric theory",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8027432,
    "venue_count": 1,
    "avg_score": 0.8027432
  },
  {
    "id": "C40438245",
    "name": "Calorie",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.65850115,
    "venue_count": 1,
    "avg_score": 0.65850115
  },
  {
    "id": "C198613851",
    "name": "Assisted GPS",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.49774626,
    "venue_count": 1,
    "avg_score": 0.49774626
  },
  {
    "id": "C46637626",
    "name": "Low latency (capital markets)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5006118,
    "venue_count": 1,
    "avg_score": 0.5006118
  },
  {
    "id": "C9903902",
    "name": "DevOps",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5809428,
    "venue_count": 1,
    "avg_score": 0.5809428
  },
  {
    "id": "C2780032489",
    "name": "Sustainable city",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4483121,
    "venue_count": 1,
    "avg_score": 0.4483121
  },
  {
    "id": "C76177295",
    "name": "Groundwater",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8184669,
    "venue_count": 1,
    "avg_score": 0.8184669
  },
  {
    "id": "C112570922",
    "name": "Contamination",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5320006,
    "venue_count": 1,
    "avg_score": 0.5320006
  },
  {
    "id": "C2776384668",
    "name": "Nitrate",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5003123,
    "venue_count": 1,
    "avg_score": 0.5003123
  },
  {
    "id": "C76886044",
    "name": "Hydrology (agriculture)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.35179088,
    "venue_count": 1,
    "avg_score": 0.35179088
  },
  {
    "id": "C2984118289",
    "name": "Power consumption",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.50554204,
    "venue_count": 1,
    "avg_score": 0.50554204
  },
  {
    "id": "C2780210587",
    "name": "Speed limit",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6200284,
    "venue_count": 1,
    "avg_score": 0.6200284
  },
  {
    "id": "C2780042925",
    "name": "Road surface",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46115446,
    "venue_count": 1,
    "avg_score": 0.46115446
  },
  {
    "id": "C2987320957",
    "name": "Speed measurement",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4255593,
    "venue_count": 1,
    "avg_score": 0.4255593
  },
  {
    "id": "C2777062904",
    "name": "Toolchain",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4242254,
    "venue_count": 1,
    "avg_score": 0.4242254
  },
  {
    "id": "C2778712577",
    "name": "Retraining",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8930173,
    "venue_count": 1,
    "avg_score": 0.8930173
  },
  {
    "id": "C60777511",
    "name": "Concept drift",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5887527,
    "venue_count": 1,
    "avg_score": 0.5887527
  },
  {
    "id": "C97256817",
    "name": "Spurious relationship",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4350465,
    "venue_count": 1,
    "avg_score": 0.4350465
  },
  {
    "id": "C98763669",
    "name": "Markov chain",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6344391,
    "venue_count": 1,
    "avg_score": 0.6344391
  },
  {
    "id": "C195563490",
    "name": "Network congestion",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.47061592,
    "venue_count": 1,
    "avg_score": 0.47061592
  },
  {
    "id": "C141513077",
    "name": "Independent and identically distributed random variables",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.44267133,
    "venue_count": 1,
    "avg_score": 0.44267133
  },
  {
    "id": "C2779199153",
    "name": "Quadcopter",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8764956,
    "venue_count": 1,
    "avg_score": 0.8764956
  },
  {
    "id": "C12997251",
    "name": "Anomaly (physics)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46215135,
    "venue_count": 1,
    "avg_score": 0.46215135
  },
  {
    "id": "C26873012",
    "name": "Condensed matter physics",
    "level": 1,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C85847156",
    "name": "Verifiable secret sharing",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.9298735,
    "venue_count": 1,
    "avg_score": 0.9298735
  },
  {
    "id": "C179733262",
    "name": "Message broker",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42036325,
    "venue_count": 1,
    "avg_score": 0.42036325
  },
  {
    "id": "C2775935494",
    "name": "Search and rescue",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4394934,
    "venue_count": 1,
    "avg_score": 0.4394934
  },
  {
    "id": "C2775936636",
    "name": "CubeSat",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.76531976,
    "venue_count": 1,
    "avg_score": 0.76531976
  },
  {
    "id": "C19269812",
    "name": "Satellite",
    "level": 2,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C2780799671",
    "name": "Transient (computer programming)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.56184787,
    "venue_count": 1,
    "avg_score": 0.56184787
  },
  {
    "id": "C22041718",
    "name": "Geolocation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7114209,
    "venue_count": 1,
    "avg_score": 0.7114209
  },
  {
    "id": "C182566",
    "name": "Organizational structure",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42101938,
    "venue_count": 1,
    "avg_score": 0.42101938
  },
  {
    "id": "C189216375",
    "name": "Cognitive bias",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5891128,
    "venue_count": 1,
    "avg_score": 0.5891128
  },
  {
    "id": "C185618831",
    "name": "Health promotion",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41638407,
    "venue_count": 1,
    "avg_score": 0.41638407
  },
  {
    "id": "C2781380061",
    "name": "Prewriting",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.92766577,
    "venue_count": 1,
    "avg_score": 0.92766577
  },
  {
    "id": "C2778695844",
    "name": "Collaborative writing",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5395642,
    "venue_count": 1,
    "avg_score": 0.5395642
  },
  {
    "id": "C2781341000",
    "name": "Writing process",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5047964,
    "venue_count": 1,
    "avg_score": 0.5047964
  },
  {
    "id": "C72868586",
    "name": "Great Moderation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.47204053,
    "venue_count": 1,
    "avg_score": 0.47204053
  },
  {
    "id": "C91602232",
    "name": "Volatility (finance)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C2986275291",
    "name": "Group behavior",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5377114,
    "venue_count": 1,
    "avg_score": 0.5377114
  },
  {
    "id": "C2776639814",
    "name": "Black women",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4278358,
    "venue_count": 1,
    "avg_score": 0.4278358
  },
  {
    "id": "C2779507501",
    "name": "Peer production",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.62313545,
    "venue_count": 1,
    "avg_score": 0.62313545
  },
  {
    "id": "C179879699",
    "name": "Split labor market theory",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.4158245,
    "venue_count": 1,
    "avg_score": 0.4158245
  },
  {
    "id": "C164019391",
    "name": "Piece work",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4126173,
    "venue_count": 1,
    "avg_score": 0.4126173
  },
  {
    "id": "C80984254",
    "name": "Labor relations",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.28733683,
    "venue_count": 1,
    "avg_score": 0.28733683
  },
  {
    "id": "C72614640",
    "name": "Secondary labor market",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.19868776,
    "venue_count": 1,
    "avg_score": 0.19868776
  },
  {
    "id": "C171773132",
    "name": "Alienation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.47859216,
    "venue_count": 1,
    "avg_score": 0.47859216
  },
  {
    "id": "C2780409804",
    "name": "Apprehension",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.47508684,
    "venue_count": 1,
    "avg_score": 0.47508684
  },
  {
    "id": "C159719751",
    "name": "Presentism",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5234087,
    "venue_count": 1,
    "avg_score": 0.5234087
  },
  {
    "id": "C36629368",
    "name": "Historicism",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4117462,
    "venue_count": 1,
    "avg_score": 0.4117462
  },
  {
    "id": "C46295352",
    "name": "Legitimacy",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.7878099,
    "venue_count": 1,
    "avg_score": 0.7878099
  },
  {
    "id": "C59577422",
    "name": "False accusation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4606225,
    "venue_count": 1,
    "avg_score": 0.4606225
  },
  {
    "id": "C29730261",
    "name": "Toxicity",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4762333,
    "venue_count": 1,
    "avg_score": 0.4762333
  },
  {
    "id": "C51632099",
    "name": "Training set",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41843396,
    "venue_count": 1,
    "avg_score": 0.41843396
  },
  {
    "id": "C135115379",
    "name": "Decision engineering",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.48914364,
    "venue_count": 1,
    "avg_score": 0.48914364
  },
  {
    "id": "C59719044",
    "name": "R-CAST",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.41461805,
    "venue_count": 1,
    "avg_score": 0.41461805
  },
  {
    "id": "C2781225136",
    "name": "CCPA",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.5042237,
    "venue_count": 1,
    "avg_score": 0.5042237
  },
  {
    "id": "C2778656907",
    "name": "Consumer privacy",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.44868883,
    "venue_count": 1,
    "avg_score": 0.44868883
  },
  {
    "id": "C67907053",
    "name": "Adenosine receptor",
    "level": 4,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C170493617",
    "name": "Receptor",
    "level": 2,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C2778938600",
    "name": "Agonist",
    "level": 3,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C2778514511",
    "name": "Programmer",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.80534965,
    "venue_count": 1,
    "avg_score": 0.80534965
  },
  {
    "id": "C2779267337",
    "name": "Character evolution",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.41169629,
    "venue_count": 1,
    "avg_score": 0.41169629
  },
  {
    "id": "C44465124",
    "name": "Clade",
    "level": 4,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C193252679",
    "name": "Phylogenetic tree",
    "level": 3,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C153578388",
    "name": "Theoretical linguistics",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.51202995,
    "venue_count": 1,
    "avg_score": 0.51202995
  },
  {
    "id": "C2777673361",
    "name": "Disadvantage",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4998343,
    "venue_count": 1,
    "avg_score": 0.4998343
  },
  {
    "id": "C1304207",
    "name": "Physical access",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.47367483,
    "venue_count": 1,
    "avg_score": 0.47367483
  },
  {
    "id": "C3017995491",
    "name": "Organizational change",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4626831,
    "venue_count": 1,
    "avg_score": 0.4626831
  },
  {
    "id": "C156004811",
    "name": "Multiplicity (mathematics)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5440636,
    "venue_count": 1,
    "avg_score": 0.5440636
  },
  {
    "id": "C19891933",
    "name": "Normative social influence",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.45092672,
    "venue_count": 1,
    "avg_score": 0.45092672
  },
  {
    "id": "C2781400479",
    "name": "Outreach",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6424697,
    "venue_count": 1,
    "avg_score": 0.6424697
  },
  {
    "id": "C510893854",
    "name": "Fandom",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.95578325,
    "venue_count": 1,
    "avg_score": 0.95578325
  },
  {
    "id": "C191015642",
    "name": "Fragmentation (computing)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41619983,
    "venue_count": 1,
    "avg_score": 0.41619983
  },
  {
    "id": "C2779902066",
    "name": "Health coaching",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.7749478,
    "venue_count": 1,
    "avg_score": 0.7749478
  },
  {
    "id": "C13077596",
    "name": "Deixis",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5737922,
    "venue_count": 1,
    "avg_score": 0.5737922
  },
  {
    "id": "C2781397288",
    "name": "Deterritorialization",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.59733814,
    "venue_count": 1,
    "avg_score": 0.59733814
  },
  {
    "id": "C151915780",
    "name": "Collective identity",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.49533454,
    "venue_count": 1,
    "avg_score": 0.49533454
  },
  {
    "id": "C67448173",
    "name": "Collective memory",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.49227324,
    "venue_count": 1,
    "avg_score": 0.49227324
  },
  {
    "id": "C3020641676",
    "name": "Pacific islanders",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.48993796,
    "venue_count": 1,
    "avg_score": 0.48993796
  },
  {
    "id": "C207456731",
    "name": "League",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.531965,
    "venue_count": 1,
    "avg_score": 0.531965
  },
  {
    "id": "C2992199184",
    "name": "Emotional regulation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.44591287,
    "venue_count": 1,
    "avg_score": 0.44591287
  },
  {
    "id": "C2778069335",
    "name": "Sanctions",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5943896,
    "venue_count": 1,
    "avg_score": 0.5943896
  },
  {
    "id": "C137863202",
    "name": "Psychometrics of racism",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.46065968,
    "venue_count": 1,
    "avg_score": 0.46065968
  },
  {
    "id": "C2908688394",
    "name": "Online forum",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5000272,
    "venue_count": 1,
    "avg_score": 0.5000272
  },
  {
    "id": "C2777113924",
    "name": "Radicalization",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.64844,
    "venue_count": 1,
    "avg_score": 0.64844
  },
  {
    "id": "C203133693",
    "name": "Terrorism",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.08716187,
    "venue_count": 1,
    "avg_score": 0.08716187
  },
  {
    "id": "C2781384022",
    "name": "Datasheet",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5573035,
    "venue_count": 1,
    "avg_score": 0.5573035
  },
  {
    "id": "C142189719",
    "name": "Interpersonal ties",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.63866824,
    "venue_count": 1,
    "avg_score": 0.63866824
  },
  {
    "id": "C37381756",
    "name": "Representativeness heuristic",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6142408,
    "venue_count": 1,
    "avg_score": 0.6142408
  },
  {
    "id": "C2777132994",
    "name": "Boundary-work",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4304216,
    "venue_count": 1,
    "avg_score": 0.4304216
  },
  {
    "id": "C15224491",
    "name": "Permissive",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.63331527,
    "venue_count": 1,
    "avg_score": 0.63331527
  },
  {
    "id": "C2779661023",
    "name": "Parenting styles",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.505974,
    "venue_count": 1,
    "avg_score": 0.505974
  },
  {
    "id": "C2780100914",
    "name": "Sex work",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.74647754,
    "venue_count": 1,
    "avg_score": 0.74647754
  },
  {
    "id": "C2994142485",
    "name": "Sex workers",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.4591782,
    "venue_count": 1,
    "avg_score": 0.4591782
  },
  {
    "id": "C3013748606",
    "name": "Human immunodeficiency virus (HIV)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C2778900529",
    "name": "Family caregivers",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.51308596,
    "venue_count": 1,
    "avg_score": 0.51308596
  },
  {
    "id": "C133320665",
    "name": "RAID",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6316977,
    "venue_count": 1,
    "avg_score": 0.6316977
  },
  {
    "id": "C105446022",
    "name": "Legacy system",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.7340175,
    "venue_count": 1,
    "avg_score": 0.7340175
  },
  {
    "id": "C102003337",
    "name": "Care work",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5312457,
    "venue_count": 1,
    "avg_score": 0.5312457
  },
  {
    "id": "C2780602052",
    "name": "Monetization",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7296814,
    "venue_count": 1,
    "avg_score": 0.7296814
  },
  {
    "id": "C2780105190",
    "name": "Boycott",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5203714,
    "venue_count": 1,
    "avg_score": 0.5203714
  },
  {
    "id": "C2776129789",
    "name": "Presidential election",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.56596935,
    "venue_count": 1,
    "avg_score": 0.56596935
  },
  {
    "id": "C2986445992",
    "name": "Gig economy",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.75580317,
    "venue_count": 1,
    "avg_score": 0.75580317
  },
  {
    "id": "C2778215748",
    "name": "Work–life balance",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.46356353,
    "venue_count": 1,
    "avg_score": 0.46356353
  },
  {
    "id": "C2780469804",
    "name": "Rumor",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8768959,
    "venue_count": 1,
    "avg_score": 0.8768959
  },
  {
    "id": "C27286358",
    "name": "Information cascade",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5682216,
    "venue_count": 1,
    "avg_score": 0.5682216
  },
  {
    "id": "C159237981",
    "name": "Emotional contagion",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4153316,
    "venue_count": 1,
    "avg_score": 0.4153316
  },
  {
    "id": "C110754006",
    "name": "Technical peer review",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.62190336,
    "venue_count": 1,
    "avg_score": 0.62190336
  },
  {
    "id": "C2778362435",
    "name": "Amenity",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5280353,
    "venue_count": 1,
    "avg_score": 0.5280353
  },
  {
    "id": "C2985250679",
    "name": "Customer experience",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.515543,
    "venue_count": 1,
    "avg_score": 0.515543
  },
  {
    "id": "C2776134716",
    "name": "Sacrifice",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46603057,
    "venue_count": 1,
    "avg_score": 0.46603057
  },
  {
    "id": "C98825075",
    "name": "Customer relationship management",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43126908,
    "venue_count": 1,
    "avg_score": 0.43126908
  },
  {
    "id": "C2992189166",
    "name": "Entrepreneurial education",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.6092776,
    "venue_count": 1,
    "avg_score": 0.6092776
  },
  {
    "id": "C2987553829",
    "name": "Entrepreneurship education",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.43673113,
    "venue_count": 1,
    "avg_score": 0.43673113
  },
  {
    "id": "C3019512768",
    "name": "Positive attitude",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41750547,
    "venue_count": 1,
    "avg_score": 0.41750547
  },
  {
    "id": "C48010095",
    "name": "Immunoglobulin D",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.43520635,
    "venue_count": 1,
    "avg_score": 0.43520635
  },
  {
    "id": "C2778453870",
    "name": "B cell",
    "level": 3,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C159654299",
    "name": "Antibody",
    "level": 2,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C161394823",
    "name": "Synchronicity",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5162356,
    "venue_count": 1,
    "avg_score": 0.5162356
  },
  {
    "id": "C2778025104",
    "name": "Toll",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7071796,
    "venue_count": 1,
    "avg_score": 0.7071796
  },
  {
    "id": "C179335157",
    "name": "Maya",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6443556,
    "venue_count": 1,
    "avg_score": 0.6443556
  },
  {
    "id": "C2778310160",
    "name": "Meaningful learning",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4296259,
    "venue_count": 1,
    "avg_score": 0.4296259
  },
  {
    "id": "C81444415",
    "name": "Priming (agriculture)",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.51319414,
    "venue_count": 1,
    "avg_score": 0.51319414
  },
  {
    "id": "C100701293",
    "name": "Germination",
    "level": 2,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C110379092",
    "name": "Social environment",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.50569916,
    "venue_count": 1,
    "avg_score": 0.50569916
  },
  {
    "id": "C2985756769",
    "name": "Knowledge retention",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6006091,
    "venue_count": 1,
    "avg_score": 0.6006091
  },
  {
    "id": "C175968658",
    "name": "Privacy laws of the United States",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41820097,
    "venue_count": 1,
    "avg_score": 0.41820097
  },
  {
    "id": "C2776343822",
    "name": "ICTS",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5322516,
    "venue_count": 1,
    "avg_score": 0.5322516
  },
  {
    "id": "C2775902765",
    "name": "Service recovery",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.42846787,
    "venue_count": 1,
    "avg_score": 0.42846787
  },
  {
    "id": "C74558129",
    "name": "Short Message Service",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.51700366,
    "venue_count": 1,
    "avg_score": 0.51700366
  },
  {
    "id": "C124936440",
    "name": "Meta-regression",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.46533552,
    "venue_count": 1,
    "avg_score": 0.46533552
  },
  {
    "id": "C2780439572",
    "name": "Publication bias",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.46043956,
    "venue_count": 1,
    "avg_score": 0.46043956
  },
  {
    "id": "C2778799817",
    "name": "Addictive behavior",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.47271556,
    "venue_count": 1,
    "avg_score": 0.47271556
  },
  {
    "id": "C130537919",
    "name": "Human physical appearance",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42537606,
    "venue_count": 1,
    "avg_score": 0.42537606
  },
  {
    "id": "C2777594839",
    "name": "Restorative dentistry",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41750294,
    "venue_count": 1,
    "avg_score": 0.41750294
  },
  {
    "id": "C162725370",
    "name": "Daytime",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7900331,
    "venue_count": 1,
    "avg_score": 0.7900331
  },
  {
    "id": "C3020423824",
    "name": "School teachers",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45237148,
    "venue_count": 1,
    "avg_score": 0.45237148
  },
  {
    "id": "C137405303",
    "name": "Online participation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4369254,
    "venue_count": 1,
    "avg_score": 0.4369254
  },
  {
    "id": "C2780975770",
    "name": "Sleep hygiene",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.69407874,
    "venue_count": 1,
    "avg_score": 0.69407874
  },
  {
    "id": "C540751848",
    "name": "Internship",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7105477,
    "venue_count": 1,
    "avg_score": 0.7105477
  },
  {
    "id": "C40986600",
    "name": "Social information processing",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6472865,
    "venue_count": 1,
    "avg_score": 0.6472865
  },
  {
    "id": "C2778899633",
    "name": "Sedentary lifestyle",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.44193947,
    "venue_count": 1,
    "avg_score": 0.44193947
  },
  {
    "id": "C2985066332",
    "name": "Customer value",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.50904936,
    "venue_count": 1,
    "avg_score": 0.50904936
  },
  {
    "id": "C108771440",
    "name": "Lifelong learning",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5045756,
    "venue_count": 1,
    "avg_score": 0.5045756
  },
  {
    "id": "C2778177712",
    "name": "Haiku",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.9935167,
    "venue_count": 1,
    "avg_score": 0.9935167
  },
  {
    "id": "C164749845",
    "name": "Environmental impact assessment",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5283823,
    "venue_count": 1,
    "avg_score": 0.5283823
  },
  {
    "id": "C3019440502",
    "name": "Dual role",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41189033,
    "venue_count": 1,
    "avg_score": 0.41189033
  },
  {
    "id": "C21951064",
    "name": "Combinatorial chemistry",
    "level": 1,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C2777207495",
    "name": "Personnel selection",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5417938,
    "venue_count": 1,
    "avg_score": 0.5417938
  },
  {
    "id": "C68489960",
    "name": "Transactional leadership",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4871921,
    "venue_count": 1,
    "avg_score": 0.4871921
  },
  {
    "id": "C2779159551",
    "name": "Comorbidity",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7596392,
    "venue_count": 1,
    "avg_score": 0.7596392
  },
  {
    "id": "C2778941446",
    "name": "Anhedonia",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5616126,
    "venue_count": 1,
    "avg_score": 0.5616126
  },
  {
    "id": "C2776412080",
    "name": "Schizophrenia (object-oriented programming)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.0884023,
    "venue_count": 1,
    "avg_score": 0.0884023
  },
  {
    "id": "C2778589607",
    "name": "Animacy",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.56138414,
    "venue_count": 1,
    "avg_score": 0.56138414
  },
  {
    "id": "C2777678268",
    "name": "Receptivity",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.716761,
    "venue_count": 1,
    "avg_score": 0.716761
  },
  {
    "id": "C2780565504",
    "name": "Willingness to communicate",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42284837,
    "venue_count": 1,
    "avg_score": 0.42284837
  },
  {
    "id": "C16320812",
    "name": "Idle",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.80264044,
    "venue_count": 1,
    "avg_score": 0.80264044
  },
  {
    "id": "C2777003363",
    "name": "Willingness to accept",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.47713566,
    "venue_count": 1,
    "avg_score": 0.47713566
  },
  {
    "id": "C2777364431",
    "name": "Willingness to pay",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.24792504,
    "venue_count": 1,
    "avg_score": 0.24792504
  },
  {
    "id": "C2778807096",
    "name": "Dissociative",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8092598,
    "venue_count": 1,
    "avg_score": 0.8092598
  },
  {
    "id": "C2779432360",
    "name": "Instant",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5832578,
    "venue_count": 1,
    "avg_score": 0.5832578
  },
  {
    "id": "C3018949938",
    "name": "Text messaging",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4384285,
    "venue_count": 1,
    "avg_score": 0.4384285
  },
  {
    "id": "C45983554",
    "name": "Information quality",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.42544368,
    "venue_count": 1,
    "avg_score": 0.42544368
  },
  {
    "id": "C3017618536",
    "name": "Innovation diffusion",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6019336,
    "venue_count": 1,
    "avg_score": 0.6019336
  },
  {
    "id": "C192481860",
    "name": "Psychographic",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.55685145,
    "venue_count": 1,
    "avg_score": 0.55685145
  },
  {
    "id": "C97082442",
    "name": "Skills management",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4928336,
    "venue_count": 1,
    "avg_score": 0.4928336
  },
  {
    "id": "C48164120",
    "name": "Concept learning",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4267592,
    "venue_count": 1,
    "avg_score": 0.4267592
  },
  {
    "id": "C27052491",
    "name": "Environmental communication",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43863207,
    "venue_count": 1,
    "avg_score": 0.43863207
  },
  {
    "id": "C2778456998",
    "name": "Instructional leadership",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.48544222,
    "venue_count": 1,
    "avg_score": 0.48544222
  },
  {
    "id": "C111366508",
    "name": "Educational leadership",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.48470473,
    "venue_count": 1,
    "avg_score": 0.48470473
  },
  {
    "id": "C2780553607",
    "name": "Attrition",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7032932,
    "venue_count": 1,
    "avg_score": 0.7032932
  },
  {
    "id": "C2776678367",
    "name": "Shopping mall",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.72827846,
    "venue_count": 1,
    "avg_score": 0.72827846
  },
  {
    "id": "C2777454149",
    "name": "Selfie",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8929282,
    "venue_count": 1,
    "avg_score": 0.8929282
  },
  {
    "id": "C2776031354",
    "name": "Choice architecture",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.85376996,
    "venue_count": 1,
    "avg_score": 0.85376996
  },
  {
    "id": "C97928714",
    "name": "Protective factor",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42185837,
    "venue_count": 1,
    "avg_score": 0.42185837
  },
  {
    "id": "C2776376825",
    "name": "Cognitive reappraisal",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5291515,
    "venue_count": 1,
    "avg_score": 0.5291515
  },
  {
    "id": "C2775933685",
    "name": "Donation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7654762,
    "venue_count": 1,
    "avg_score": 0.7654762
  },
  {
    "id": "C191160116",
    "name": "Regulatory focus theory",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.7496167,
    "venue_count": 1,
    "avg_score": 0.7496167
  },
  {
    "id": "C29143872",
    "name": "Business process reengineering",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.65964586,
    "venue_count": 1,
    "avg_score": 0.65964586
  },
  {
    "id": "C2780215875",
    "name": "Big business",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.44924846,
    "venue_count": 1,
    "avg_score": 0.44924846
  },
  {
    "id": "C2988642114",
    "name": "Smart manufacturing",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41318694,
    "venue_count": 1,
    "avg_score": 0.41318694
  },
  {
    "id": "C2777381055",
    "name": "Damages",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.57762194,
    "venue_count": 1,
    "avg_score": 0.57762194
  },
  {
    "id": "C80316258",
    "name": "Thunderstorm",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5370333,
    "venue_count": 1,
    "avg_score": 0.5370333
  },
  {
    "id": "C168741863",
    "name": "Sowing",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5335909,
    "venue_count": 1,
    "avg_score": 0.5335909
  },
  {
    "id": "C126343540",
    "name": "Crop yield",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.47896054,
    "venue_count": 1,
    "avg_score": 0.47896054
  },
  {
    "id": "C205537798",
    "name": "Extreme weather",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4372884,
    "venue_count": 1,
    "avg_score": 0.4372884
  },
  {
    "id": "C137580998",
    "name": "Crop",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43093765,
    "venue_count": 1,
    "avg_score": 0.43093765
  },
  {
    "id": "C2776822937",
    "name": "Bibliographic coupling",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.57472974,
    "venue_count": 1,
    "avg_score": 0.57472974
  },
  {
    "id": "C103423482",
    "name": "Competitive intelligence",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5503541,
    "venue_count": 1,
    "avg_score": 0.5503541
  },
  {
    "id": "C2778430866",
    "name": "Unbanked",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.8771852,
    "venue_count": 1,
    "avg_score": 0.8771852
  },
  {
    "id": "C540431452",
    "name": "FinTech",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5373498,
    "venue_count": 1,
    "avg_score": 0.5373498
  },
  {
    "id": "C29985473",
    "name": "Natural resource",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6266556,
    "venue_count": 1,
    "avg_score": 0.6266556
  },
  {
    "id": "C33556415",
    "name": "Product differentiation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.533509,
    "venue_count": 1,
    "avg_score": 0.533509
  },
  {
    "id": "C2779136266",
    "name": "Relational view",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4515903,
    "venue_count": 1,
    "avg_score": 0.4515903
  },
  {
    "id": "C16520705",
    "name": "Cournot competition",
    "level": 2,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C500882744",
    "name": "Latent Dirichlet allocation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.73689145,
    "venue_count": 1,
    "avg_score": 0.73689145
  },
  {
    "id": "C171686336",
    "name": "Topic model",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.40311313,
    "venue_count": 1,
    "avg_score": 0.40311313
  },
  {
    "id": "C98965940",
    "name": "Transaction cost",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7100954,
    "venue_count": 1,
    "avg_score": 0.7100954
  },
  {
    "id": "C2779082914",
    "name": "Social entrepreneurship",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4986372,
    "venue_count": 1,
    "avg_score": 0.4986372
  },
  {
    "id": "C110599986",
    "name": "Innovation economics",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46491867,
    "venue_count": 1,
    "avg_score": 0.46491867
  },
  {
    "id": "C22354355",
    "name": "Partial least squares regression",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4318645,
    "venue_count": 1,
    "avg_score": 0.4318645
  },
  {
    "id": "C2778047466",
    "name": "Hedonism",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.694117,
    "venue_count": 1,
    "avg_score": 0.694117
  },
  {
    "id": "C2985272809",
    "name": "Digital government",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.8009623,
    "venue_count": 1,
    "avg_score": 0.8009623
  },
  {
    "id": "C144661447",
    "name": "Autocracy",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.849972,
    "venue_count": 1,
    "avg_score": 0.849972
  },
  {
    "id": "C2776098720",
    "name": "Service-orientation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6698153,
    "venue_count": 1,
    "avg_score": 0.6698153
  },
  {
    "id": "C167063184",
    "name": "Vulnerability assessment",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41093102,
    "venue_count": 1,
    "avg_score": 0.41093102
  },
  {
    "id": "C2780440489",
    "name": "Data-driven",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41141337,
    "venue_count": 1,
    "avg_score": 0.41141337
  },
  {
    "id": "C2781083858",
    "name": "Scientific literature",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6587291,
    "venue_count": 1,
    "avg_score": 0.6587291
  },
  {
    "id": "C2775906566",
    "name": "Trade war",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.59666705,
    "venue_count": 1,
    "avg_score": 0.59666705
  },
  {
    "id": "C75027835",
    "name": "Green computing",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.46413347,
    "venue_count": 1,
    "avg_score": 0.46413347
  },
  {
    "id": "C207609745",
    "name": "Bootstrapping (finance)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42999446,
    "venue_count": 1,
    "avg_score": 0.42999446
  },
  {
    "id": "C141845432",
    "name": "Multifactor productivity",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.5147302,
    "venue_count": 1,
    "avg_score": 0.5147302
  },
  {
    "id": "C120009192",
    "name": "Total factor productivity",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.24251628,
    "venue_count": 1,
    "avg_score": 0.24251628
  },
  {
    "id": "C202632270",
    "name": "Threshold model",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4609739,
    "venue_count": 1,
    "avg_score": 0.4609739
  },
  {
    "id": "C2777569040",
    "name": "Value capture",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4992032,
    "venue_count": 1,
    "avg_score": 0.4992032
  },
  {
    "id": "C130318100",
    "name": "Semantic similarity",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.49515954,
    "venue_count": 1,
    "avg_score": 0.49515954
  },
  {
    "id": "C85407183",
    "name": "Semantic network",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.47289053,
    "venue_count": 1,
    "avg_score": 0.47289053
  },
  {
    "id": "C511149849",
    "name": "Semantic computing",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.45882344,
    "venue_count": 1,
    "avg_score": 0.45882344
  },
  {
    "id": "C2129575",
    "name": "Semantic Web",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.1880438,
    "venue_count": 1,
    "avg_score": 0.1880438
  },
  {
    "id": "C3020782553",
    "name": "European commission",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4225086,
    "venue_count": 1,
    "avg_score": 0.4225086
  },
  {
    "id": "C118916094",
    "name": "Technological convergence",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.56250226,
    "venue_count": 1,
    "avg_score": 0.56250226
  },
  {
    "id": "C2778727218",
    "name": "Structural holes",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.54932594,
    "venue_count": 1,
    "avg_score": 0.54932594
  },
  {
    "id": "C2988224531",
    "name": "Network structure",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41224036,
    "venue_count": 1,
    "avg_score": 0.41224036
  },
  {
    "id": "C159717818",
    "name": "Prima facie",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.68633676,
    "venue_count": 1,
    "avg_score": 0.68633676
  },
  {
    "id": "C2777064627",
    "name": "Financial innovation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5088713,
    "venue_count": 1,
    "avg_score": 0.5088713
  },
  {
    "id": "C191172861",
    "name": "Upstream (networking)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6589402,
    "venue_count": 1,
    "avg_score": 0.6589402
  },
  {
    "id": "C108383078",
    "name": "Open platform",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.52897376,
    "venue_count": 1,
    "avg_score": 0.52897376
  },
  {
    "id": "C162144332",
    "name": "Instrumental variable",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6710534,
    "venue_count": 1,
    "avg_score": 0.6710534
  },
  {
    "id": "C2989271921",
    "name": "Environmental policy",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.48987216,
    "venue_count": 1,
    "avg_score": 0.48987216
  },
  {
    "id": "C123587114",
    "name": "Policy analysis",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.47263047,
    "venue_count": 1,
    "avg_score": 0.47263047
  },
  {
    "id": "C120757647",
    "name": "Shareholder",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5268501,
    "venue_count": 1,
    "avg_score": 0.5268501
  },
  {
    "id": "C143177785",
    "name": "Corporate venture capital",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.9088265,
    "venue_count": 1,
    "avg_score": 0.9088265
  },
  {
    "id": "C114419676",
    "name": "Patent visualisation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.48004353,
    "venue_count": 1,
    "avg_score": 0.48004353
  },
  {
    "id": "C2778029865",
    "name": "Patent analysis",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45574072,
    "venue_count": 1,
    "avg_score": 0.45574072
  },
  {
    "id": "C2776936074",
    "name": "Knowledge spillover",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6195281,
    "venue_count": 1,
    "avg_score": 0.6195281
  },
  {
    "id": "C162696548",
    "name": "Knowledge economy",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.55722255,
    "venue_count": 1,
    "avg_score": 0.55722255
  },
  {
    "id": "C58053490",
    "name": "Quantum computer",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.58775365,
    "venue_count": 1,
    "avg_score": 0.58775365
  },
  {
    "id": "C2988118331",
    "name": "Technology development",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.50213265,
    "venue_count": 1,
    "avg_score": 0.50213265
  },
  {
    "id": "C176379880",
    "name": "TEC",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.73826385,
    "venue_count": 1,
    "avg_score": 0.73826385
  },
  {
    "id": "C116403925",
    "name": "Ionosphere",
    "level": 2,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C97509610",
    "name": "Internationalization",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.75121,
    "venue_count": 1,
    "avg_score": 0.75121
  },
  {
    "id": "C2988671617",
    "name": "Business development",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.51826763,
    "venue_count": 1,
    "avg_score": 0.51826763
  },
  {
    "id": "C64341305",
    "name": "Bivariate analysis",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5361089,
    "venue_count": 1,
    "avg_score": 0.5361089
  },
  {
    "id": "C610760",
    "name": "Endogeneity",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43421108,
    "venue_count": 1,
    "avg_score": 0.43421108
  },
  {
    "id": "C72362118",
    "name": "Exaptation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.9621227,
    "venue_count": 1,
    "avg_score": 0.9621227
  },
  {
    "id": "C2780888560",
    "name": "R&D intensity",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4754978,
    "venue_count": 1,
    "avg_score": 0.4754978
  },
  {
    "id": "C21279758",
    "name": "Venture capital",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4230469,
    "venue_count": 1,
    "avg_score": 0.4230469
  },
  {
    "id": "C56289545",
    "name": "Knowledge integration",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6568812,
    "venue_count": 1,
    "avg_score": 0.6568812
  },
  {
    "id": "C184992742",
    "name": "Prime (order theory)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4488259,
    "venue_count": 1,
    "avg_score": 0.4488259
  },
  {
    "id": "C2781133158",
    "name": "Survivability",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6476685,
    "venue_count": 1,
    "avg_score": 0.6476685
  },
  {
    "id": "C141261163",
    "name": "Corporate social responsibility",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6369126,
    "venue_count": 1,
    "avg_score": 0.6369126
  },
  {
    "id": "C80309976",
    "name": "Business process management",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.50666004,
    "venue_count": 1,
    "avg_score": 0.50666004
  },
  {
    "id": "C2779513410",
    "name": "Credence",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.64312685,
    "venue_count": 1,
    "avg_score": 0.64312685
  },
  {
    "id": "C63817138",
    "name": "Quantile regression",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.60698587,
    "venue_count": 1,
    "avg_score": 0.60698587
  },
  {
    "id": "C86511162",
    "name": "Property rights",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.48159358,
    "venue_count": 1,
    "avg_score": 0.48159358
  },
  {
    "id": "C118671147",
    "name": "Quantile",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43377814,
    "venue_count": 1,
    "avg_score": 0.43377814
  },
  {
    "id": "C2777463520",
    "name": "Porter hypothesis",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4633131,
    "venue_count": 1,
    "avg_score": 0.4633131
  },
  {
    "id": "C48807843",
    "name": "Environmental scanning",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.44078964,
    "venue_count": 1,
    "avg_score": 0.44078964
  },
  {
    "id": "C2985274072",
    "name": "Environmental regulation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.28921977,
    "venue_count": 1,
    "avg_score": 0.28921977
  },
  {
    "id": "C51832835",
    "name": "Environmental management system",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.18534106,
    "venue_count": 1,
    "avg_score": 0.18534106
  },
  {
    "id": "C88862950",
    "name": "Irrigation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C2776229149",
    "name": "Eco-innovation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.46056634,
    "venue_count": 1,
    "avg_score": 0.46056634
  },
  {
    "id": "C3020225985",
    "name": "State owned",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7373281,
    "venue_count": 1,
    "avg_score": 0.7373281
  },
  {
    "id": "C172886114",
    "name": "Economic interventionism",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.44560635,
    "venue_count": 1,
    "avg_score": 0.44560635
  },
  {
    "id": "C2780748813",
    "name": "Sustainable management",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.44539714,
    "venue_count": 1,
    "avg_score": 0.44539714
  },
  {
    "id": "C2779645999",
    "name": "Frugality",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.9184509,
    "venue_count": 1,
    "avg_score": 0.9184509
  },
  {
    "id": "C143095724",
    "name": "Odds",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.44171512,
    "venue_count": 1,
    "avg_score": 0.44171512
  },
  {
    "id": "C17058734",
    "name": "Democratization",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.48014566,
    "venue_count": 1,
    "avg_score": 0.48014566
  },
  {
    "id": "C7465953",
    "name": "Product life-cycle management",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.54678565,
    "venue_count": 1,
    "avg_score": 0.54678565
  },
  {
    "id": "C48840187",
    "name": "Service management",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.44960243,
    "venue_count": 1,
    "avg_score": 0.44960243
  },
  {
    "id": "C2776838236",
    "name": "Creative destruction",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43154207,
    "venue_count": 1,
    "avg_score": 0.43154207
  },
  {
    "id": "C48879800",
    "name": "Small and medium-sized enterprises",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43040615,
    "venue_count": 1,
    "avg_score": 0.43040615
  },
  {
    "id": "C59218005",
    "name": "Horizontal and vertical",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.52027327,
    "venue_count": 1,
    "avg_score": 0.52027327
  },
  {
    "id": "C2989454216",
    "name": "Technology innovation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41948444,
    "venue_count": 1,
    "avg_score": 0.41948444
  },
  {
    "id": "C74545648",
    "name": "Inflection point",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7611203,
    "venue_count": 1,
    "avg_score": 0.7611203
  },
  {
    "id": "C51110983",
    "name": "Overconfidence effect",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.69718564,
    "venue_count": 1,
    "avg_score": 0.69718564
  },
  {
    "id": "C11671645",
    "name": "Causal model",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.47200868,
    "venue_count": 1,
    "avg_score": 0.47200868
  },
  {
    "id": "C107053488",
    "name": "Construction engineering",
    "level": 1,
    "total_papers": 1,
    "total_score": 0.33375576,
    "venue_count": 1,
    "avg_score": 0.33375576
  },
  {
    "id": "C65257409",
    "name": "Electronic business",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5298659,
    "venue_count": 1,
    "avg_score": 0.5298659
  },
  {
    "id": "C3019921246",
    "name": "Differential effects",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4130103,
    "venue_count": 1,
    "avg_score": 0.4130103
  },
  {
    "id": "C2985380958",
    "name": "Market competition",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.48330402,
    "venue_count": 1,
    "avg_score": 0.48330402
  },
  {
    "id": "C41291067",
    "name": "Photovoltaic system",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46828908,
    "venue_count": 1,
    "avg_score": 0.46828908
  },
  {
    "id": "C2985879086",
    "name": "Technology transfer",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5806486,
    "venue_count": 1,
    "avg_score": 0.5806486
  },
  {
    "id": "C2992649737",
    "name": "Spin offs",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.62613106,
    "venue_count": 1,
    "avg_score": 0.62613106
  },
  {
    "id": "C42704618",
    "name": "Spin (aerodynamics)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4492867,
    "venue_count": 1,
    "avg_score": 0.4492867
  },
  {
    "id": "C2777738643",
    "name": "Tax incentive",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6295013,
    "venue_count": 1,
    "avg_score": 0.6295013
  },
  {
    "id": "C162077342",
    "name": "Tax credit",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43230587,
    "venue_count": 1,
    "avg_score": 0.43230587
  },
  {
    "id": "C2780370025",
    "name": "Labor mobility",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7391186,
    "venue_count": 1,
    "avg_score": 0.7391186
  },
  {
    "id": "C164065428",
    "name": "Core competency",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46637112,
    "venue_count": 1,
    "avg_score": 0.46637112
  },
  {
    "id": "C2776505452",
    "name": "Entrepreneurial finance",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.58367383,
    "venue_count": 1,
    "avg_score": 0.58367383
  },
  {
    "id": "C2779613991",
    "name": "Equity crowdfunding",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.54552144,
    "venue_count": 1,
    "avg_score": 0.54552144
  },
  {
    "id": "C191093397",
    "name": "Seed money",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.478125,
    "venue_count": 1,
    "avg_score": 0.478125
  },
  {
    "id": "C54725748",
    "name": "Process integration",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.08200362,
    "venue_count": 1,
    "avg_score": 0.08200362
  },
  {
    "id": "C2776780178",
    "name": "COPD",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.86947376,
    "venue_count": 1,
    "avg_score": 0.86947376
  },
  {
    "id": "C2992779976",
    "name": "Pulmonary disease",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8641466,
    "venue_count": 1,
    "avg_score": 0.8641466
  },
  {
    "id": "C71405471",
    "name": "Quality management",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41031548,
    "venue_count": 1,
    "avg_score": 0.41031548
  },
  {
    "id": "C198783460",
    "name": "Management system",
    "level": 2,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C18035950",
    "name": "Process theory",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.46006218,
    "venue_count": 1,
    "avg_score": 0.46006218
  },
  {
    "id": "C162919384",
    "name": "Development theory",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6663043,
    "venue_count": 1,
    "avg_score": 0.6663043
  },
  {
    "id": "C65146658",
    "name": "Financial intermediary",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4716857,
    "venue_count": 1,
    "avg_score": 0.4716857
  },
  {
    "id": "C190831278",
    "name": "Building design",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5580262,
    "venue_count": 1,
    "avg_score": 0.5580262
  },
  {
    "id": "C150681269",
    "name": "Cognitive style",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.493241,
    "venue_count": 1,
    "avg_score": 0.493241
  },
  {
    "id": "C2778544944",
    "name": "Architectural model",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.45425203,
    "venue_count": 1,
    "avg_score": 0.45425203
  },
  {
    "id": "C2482559",
    "name": "Objectivity (philosophy)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6789336,
    "venue_count": 1,
    "avg_score": 0.6789336
  },
  {
    "id": "C188573790",
    "name": "Renewable energy",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6927845,
    "venue_count": 1,
    "avg_score": 0.6927845
  },
  {
    "id": "C2781395907",
    "name": "Peacebuilding",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.97143173,
    "venue_count": 1,
    "avg_score": 0.97143173
  },
  {
    "id": "C108578832",
    "name": "Strategic financial management",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5897978,
    "venue_count": 1,
    "avg_score": 0.5897978
  },
  {
    "id": "C102944935",
    "name": "Bracketing (phenomenology)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.56554645,
    "venue_count": 1,
    "avg_score": 0.56554645
  },
  {
    "id": "C152563557",
    "name": "Strategic thinking",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.49720314,
    "venue_count": 1,
    "avg_score": 0.49720314
  },
  {
    "id": "C552378276",
    "name": "Strategic control",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.42297196,
    "venue_count": 1,
    "avg_score": 0.42297196
  },
  {
    "id": "C2982711077",
    "name": "Team building",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5026617,
    "venue_count": 1,
    "avg_score": 0.5026617
  },
  {
    "id": "C2777720028",
    "name": "Responsible Research and Innovation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.48798078,
    "venue_count": 1,
    "avg_score": 0.48798078
  },
  {
    "id": "C117409633",
    "name": "Emotion work",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42606062,
    "venue_count": 1,
    "avg_score": 0.42606062
  },
  {
    "id": "C155662757",
    "name": "Applied anthropology",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4915701,
    "venue_count": 1,
    "avg_score": 0.4915701
  },
  {
    "id": "C31091802",
    "name": "Ecological anthropology",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.44521365,
    "venue_count": 1,
    "avg_score": 0.44521365
  },
  {
    "id": "C102690226",
    "name": "Cultural anthropology",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43259445,
    "venue_count": 1,
    "avg_score": 0.43259445
  },
  {
    "id": "C77368203",
    "name": "Anthropology of art",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.23943585,
    "venue_count": 1,
    "avg_score": 0.23943585
  },
  {
    "id": "C2780822299",
    "name": "Soul",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.711191,
    "venue_count": 1,
    "avg_score": 0.711191
  },
  {
    "id": "C45237549",
    "name": "Restructuring",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.54019415,
    "venue_count": 1,
    "avg_score": 0.54019415
  },
  {
    "id": "C2776221188",
    "name": "Design space exploration",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41231915,
    "venue_count": 1,
    "avg_score": 0.41231915
  },
  {
    "id": "C2993829489",
    "name": "Common core",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5558713,
    "venue_count": 1,
    "avg_score": 0.5558713
  },
  {
    "id": "C70036468",
    "name": "Immigration",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.77674305,
    "venue_count": 1,
    "avg_score": 0.77674305
  },
  {
    "id": "C2777766583",
    "name": "Digital signage",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4311767,
    "venue_count": 1,
    "avg_score": 0.4311767
  },
  {
    "id": "C3017649214",
    "name": "Sri lanka",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6728958,
    "venue_count": 1,
    "avg_score": 0.6728958
  },
  {
    "id": "C2776147852",
    "name": "Mura",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.58985084,
    "venue_count": 1,
    "avg_score": 0.58985084
  },
  {
    "id": "C113954288",
    "name": "Timestamp",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.52032256,
    "venue_count": 1,
    "avg_score": 0.52032256
  },
  {
    "id": "C3020349426",
    "name": "Package design",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46943286,
    "venue_count": 1,
    "avg_score": 0.46943286
  },
  {
    "id": "C3019281177",
    "name": "South asia",
    "level": 2,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C2778571376",
    "name": "Frontier",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7723446,
    "venue_count": 1,
    "avg_score": 0.7723446
  },
  {
    "id": "C2779559920",
    "name": "Thickening",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.66603875,
    "venue_count": 1,
    "avg_score": 0.66603875
  },
  {
    "id": "C528095902",
    "name": "Pulp and paper industry",
    "level": 1,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C89648432",
    "name": "Ecological design",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42870516,
    "venue_count": 1,
    "avg_score": 0.42870516
  },
  {
    "id": "C2776825360",
    "name": "Vagueness",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.75653136,
    "venue_count": 1,
    "avg_score": 0.75653136
  },
  {
    "id": "C2780110086",
    "name": "Public service",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5134195,
    "venue_count": 1,
    "avg_score": 0.5134195
  },
  {
    "id": "C2780155792",
    "name": "Redevelopment",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8433162,
    "venue_count": 1,
    "avg_score": 0.8433162
  },
  {
    "id": "C2779819341",
    "name": "Spatial design",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4523356,
    "venue_count": 1,
    "avg_score": 0.4523356
  },
  {
    "id": "C69298649",
    "name": "Emergent grammar",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4417993,
    "venue_count": 1,
    "avg_score": 0.4417993
  },
  {
    "id": "C2780344732",
    "name": "Vault (architecture)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43230796,
    "venue_count": 1,
    "avg_score": 0.43230796
  },
  {
    "id": "C128706718",
    "name": "Positivism",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.485866,
    "venue_count": 1,
    "avg_score": 0.485866
  },
  {
    "id": "C43450049",
    "name": "Psychoanalytic theory",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5883841,
    "venue_count": 1,
    "avg_score": 0.5883841
  },
  {
    "id": "C2778880379",
    "name": "Timeless",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.9806645,
    "venue_count": 1,
    "avg_score": 0.9806645
  },
  {
    "id": "C177803969",
    "name": "Uncertainty analysis",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45355612,
    "venue_count": 1,
    "avg_score": 0.45355612
  },
  {
    "id": "C186116695",
    "name": "Decision analysis",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45804638,
    "venue_count": 1,
    "avg_score": 0.45804638
  },
  {
    "id": "C2776195157",
    "name": "Blessing",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.70101136,
    "venue_count": 1,
    "avg_score": 0.70101136
  },
  {
    "id": "C2780273121",
    "name": "Curse",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.49429178,
    "venue_count": 1,
    "avg_score": 0.49429178
  },
  {
    "id": "C186399060",
    "name": "Diagram",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4610682,
    "venue_count": 1,
    "avg_score": 0.4610682
  },
  {
    "id": "C135692309",
    "name": "Square (algebra)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41651943,
    "venue_count": 1,
    "avg_score": 0.41651943
  },
  {
    "id": "C97364631",
    "name": "Deductive reasoning",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43957278,
    "venue_count": 1,
    "avg_score": 0.43957278
  },
  {
    "id": "C166088908",
    "name": "Abductive reasoning",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5148327,
    "venue_count": 1,
    "avg_score": 0.5148327
  },
  {
    "id": "C2778202681",
    "name": "Workbook",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.9530782,
    "venue_count": 1,
    "avg_score": 0.9530782
  },
  {
    "id": "C146303308",
    "name": "Frame analysis",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4148484,
    "venue_count": 1,
    "avg_score": 0.4148484
  },
  {
    "id": "C139172840",
    "name": "Philosophical methodology",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.56135476,
    "venue_count": 1,
    "avg_score": 0.56135476
  },
  {
    "id": "C146079980",
    "name": "Philosophical theory",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.49884248,
    "venue_count": 1,
    "avg_score": 0.49884248
  },
  {
    "id": "C2780817299",
    "name": "Samoan",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8896943,
    "venue_count": 1,
    "avg_score": 0.8896943
  },
  {
    "id": "C2910401296",
    "name": "Transgender people",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4122861,
    "venue_count": 1,
    "avg_score": 0.4122861
  },
  {
    "id": "C2777732099",
    "name": "Affirmative action",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4453995,
    "venue_count": 1,
    "avg_score": 0.4453995
  },
  {
    "id": "C517208234",
    "name": "Queer theory",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.56414676,
    "venue_count": 1,
    "avg_score": 0.56414676
  },
  {
    "id": "C2777805874",
    "name": "Bricolage",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7976387,
    "venue_count": 1,
    "avg_score": 0.7976387
  },
  {
    "id": "C91998498",
    "name": "Contingency table",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6152766,
    "venue_count": 1,
    "avg_score": 0.6152766
  },
  {
    "id": "C105867702",
    "name": "Contingency management",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5349931,
    "venue_count": 1,
    "avg_score": 0.5349931
  },
  {
    "id": "C14331377",
    "name": "Contingency plan",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41182333,
    "venue_count": 1,
    "avg_score": 0.41182333
  },
  {
    "id": "C55508974",
    "name": "Venn diagram",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5501722,
    "venue_count": 1,
    "avg_score": 0.5501722
  },
  {
    "id": "C2777921204",
    "name": "Knowledge translation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4769253,
    "venue_count": 1,
    "avg_score": 0.4769253
  },
  {
    "id": "C141330323",
    "name": "Evidence-based practice",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.44337165,
    "venue_count": 1,
    "avg_score": 0.44337165
  },
  {
    "id": "C153720581",
    "name": "Generalized linear mixed model",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.69785047,
    "venue_count": 1,
    "avg_score": 0.69785047
  },
  {
    "id": "C144986985",
    "name": "Hierarchical database model",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46132153,
    "venue_count": 1,
    "avg_score": 0.46132153
  },
  {
    "id": "C2992879847",
    "name": "Multilevel modelling",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.44362208,
    "venue_count": 1,
    "avg_score": 0.44362208
  },
  {
    "id": "C85404239",
    "name": "Complementarity theory",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.53872085,
    "venue_count": 1,
    "avg_score": 0.53872085
  },
  {
    "id": "C83864248",
    "name": "Developing country",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.69986755,
    "venue_count": 1,
    "avg_score": 0.69986755
  },
  {
    "id": "C154350673",
    "name": "Strict constructionism",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7643118,
    "venue_count": 1,
    "avg_score": 0.7643118
  },
  {
    "id": "C2856821",
    "name": "Constructionism",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5462903,
    "venue_count": 1,
    "avg_score": 0.5462903
  },
  {
    "id": "C126349790",
    "name": "Computational sociology",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4617856,
    "venue_count": 1,
    "avg_score": 0.4617856
  },
  {
    "id": "C52416528",
    "name": "Bandwagon effect",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.9870589,
    "venue_count": 1,
    "avg_score": 0.9870589
  },
  {
    "id": "C2987052865",
    "name": "Visual media",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46016595,
    "venue_count": 1,
    "avg_score": 0.46016595
  },
  {
    "id": "C2778120531",
    "name": "Connotation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.48108527,
    "venue_count": 1,
    "avg_score": 0.48108527
  },
  {
    "id": "C186835682",
    "name": "Graffiti",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.79849195,
    "venue_count": 1,
    "avg_score": 0.79849195
  },
  {
    "id": "C2994405062",
    "name": "Berlin wall",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.48094124,
    "venue_count": 1,
    "avg_score": 0.48094124
  },
  {
    "id": "C113522999",
    "name": "Fall of man",
    "level": 3,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C2781095836",
    "name": "Photovoice",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.85432804,
    "venue_count": 1,
    "avg_score": 0.85432804
  },
  {
    "id": "C2778037673",
    "name": "Atlanta",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6683877,
    "venue_count": 1,
    "avg_score": 0.6683877
  },
  {
    "id": "C158739034",
    "name": "Metropolitan area",
    "level": 2,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C40422974",
    "name": "Assertion",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7815906,
    "venue_count": 1,
    "avg_score": 0.7815906
  },
  {
    "id": "C41856607",
    "name": "Geographic information system",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.566216,
    "venue_count": 1,
    "avg_score": 0.566216
  },
  {
    "id": "C2992130261",
    "name": "Human research",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4845823,
    "venue_count": 1,
    "avg_score": 0.4845823
  },
  {
    "id": "C68874143",
    "name": "Mangrove",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.450727,
    "venue_count": 1,
    "avg_score": 0.450727
  },
  {
    "id": "C2778022972",
    "name": "Cultural humility",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.65266097,
    "venue_count": 1,
    "avg_score": 0.65266097
  },
  {
    "id": "C169536714",
    "name": "Cultural competence",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.31221354,
    "venue_count": 1,
    "avg_score": 0.31221354
  },
  {
    "id": "C2776084483",
    "name": "Treasure",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8082241,
    "venue_count": 1,
    "avg_score": 0.8082241
  },
  {
    "id": "C2775870830",
    "name": "SAGE",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.86480564,
    "venue_count": 1,
    "avg_score": 0.86480564
  },
  {
    "id": "C3018945416",
    "name": "Doctoral dissertation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4307515,
    "venue_count": 1,
    "avg_score": 0.4307515
  },
  {
    "id": "C198327121",
    "name": "Sampling frame",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6621586,
    "venue_count": 1,
    "avg_score": 0.6621586
  },
  {
    "id": "C2780837026",
    "name": "Grief",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5768632,
    "venue_count": 1,
    "avg_score": 0.5768632
  },
  {
    "id": "C2778702256",
    "name": "Collective efficacy",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5049322,
    "venue_count": 1,
    "avg_score": 0.5049322
  },
  {
    "id": "C5395021",
    "name": "Program evaluation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4556376,
    "venue_count": 1,
    "avg_score": 0.4556376
  },
  {
    "id": "C59282198",
    "name": "Maxwell's equations",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.522413,
    "venue_count": 1,
    "avg_score": 0.522413
  },
  {
    "id": "C2777686260",
    "name": "Calculus (dental)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.35090932,
    "venue_count": 1,
    "avg_score": 0.35090932
  },
  {
    "id": "C2986160967",
    "name": "Business management",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4243901,
    "venue_count": 1,
    "avg_score": 0.4243901
  },
  {
    "id": "C2781181686",
    "name": "Coherence (philosophical gambling strategy)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.49679115,
    "venue_count": 1,
    "avg_score": 0.49679115
  },
  {
    "id": "C2910913117",
    "name": "Horseback riding",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.75847113,
    "venue_count": 1,
    "avg_score": 0.75847113
  },
  {
    "id": "C2775977372",
    "name": "Visual research",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.53657544,
    "venue_count": 1,
    "avg_score": 0.53657544
  },
  {
    "id": "C148298330",
    "name": "Correspondence analysis",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6953057,
    "venue_count": 1,
    "avg_score": 0.6953057
  },
  {
    "id": "C169191187",
    "name": "Multidimensional analysis",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5439619,
    "venue_count": 1,
    "avg_score": 0.5439619
  },
  {
    "id": "C2779103072",
    "name": "Masculinity",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.64959466,
    "venue_count": 1,
    "avg_score": 0.64959466
  },
  {
    "id": "C1691868",
    "name": "Life course approach",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41262537,
    "venue_count": 1,
    "avg_score": 0.41262537
  },
  {
    "id": "C2777438998",
    "name": "Tribunal",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.9077593,
    "venue_count": 1,
    "avg_score": 0.9077593
  },
  {
    "id": "C204342414",
    "name": "Genocide",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.79769844,
    "venue_count": 1,
    "avg_score": 0.79769844
  },
  {
    "id": "C544040105",
    "name": "Torture",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.79701257,
    "venue_count": 1,
    "avg_score": 0.79701257
  },
  {
    "id": "C169437150",
    "name": "Human rights",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.17527145,
    "venue_count": 1,
    "avg_score": 0.17527145
  },
  {
    "id": "C2776202085",
    "name": "The Thing",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4117083,
    "venue_count": 1,
    "avg_score": 0.4117083
  },
  {
    "id": "C136560751",
    "name": "Virtual work",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.54886097,
    "venue_count": 1,
    "avg_score": 0.54886097
  },
  {
    "id": "C2779621748",
    "name": "Carr",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.60817826,
    "venue_count": 1,
    "avg_score": 0.60817826
  },
  {
    "id": "C2776234999",
    "name": "Patriarchy",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.94810736,
    "venue_count": 1,
    "avg_score": 0.94810736
  },
  {
    "id": "C2779470537",
    "name": "Urban studies",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5002377,
    "venue_count": 1,
    "avg_score": 0.5002377
  },
  {
    "id": "C2778257484",
    "name": "Visual acuity",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.54661006,
    "venue_count": 1,
    "avg_score": 0.54661006
  },
  {
    "id": "C53073257",
    "name": "Object-oriented design",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5136039,
    "venue_count": 1,
    "avg_score": 0.5136039
  },
  {
    "id": "C2777742874",
    "name": "Humanitarian crisis",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4747722,
    "venue_count": 1,
    "avg_score": 0.4747722
  },
  {
    "id": "C2778745634",
    "name": "Refugee crisis",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.42377123,
    "venue_count": 1,
    "avg_score": 0.42377123
  },
  {
    "id": "C2778339503",
    "name": "Community project",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5339277,
    "venue_count": 1,
    "avg_score": 0.5339277
  },
  {
    "id": "C2993911517",
    "name": "Legal service",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.49871874,
    "venue_count": 1,
    "avg_score": 0.49871874
  },
  {
    "id": "C2993365623",
    "name": "Community service",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45268407,
    "venue_count": 1,
    "avg_score": 0.45268407
  },
  {
    "id": "C170692843",
    "name": "Legal profession",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.54440475,
    "venue_count": 1,
    "avg_score": 0.54440475
  },
  {
    "id": "C522695570",
    "name": "Legal research",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.50369114,
    "venue_count": 1,
    "avg_score": 0.50369114
  },
  {
    "id": "C150506046",
    "name": "Logos Bible Software",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.60726863,
    "venue_count": 1,
    "avg_score": 0.60726863
  },
  {
    "id": "C2780903317",
    "name": "Complicity",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5973666,
    "venue_count": 1,
    "avg_score": 0.5973666
  },
  {
    "id": "C113706210",
    "name": "Critical theory",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42668667,
    "venue_count": 1,
    "avg_score": 0.42668667
  },
  {
    "id": "C2911089638",
    "name": "Landscape architect",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.42981848,
    "venue_count": 1,
    "avg_score": 0.42981848
  },
  {
    "id": "C147598955",
    "name": "Social responsibility",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.48005044,
    "venue_count": 1,
    "avg_score": 0.48005044
  },
  {
    "id": "C2781061807",
    "name": "Universalism",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.43883592,
    "venue_count": 1,
    "avg_score": 0.43883592
  },
  {
    "id": "C67666897",
    "name": "Prism",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.47832346,
    "venue_count": 1,
    "avg_score": 0.47832346
  },
  {
    "id": "C556248259",
    "name": "Poetics",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.9482734,
    "venue_count": 1,
    "avg_score": 0.9482734
  },
  {
    "id": "C51364203",
    "name": "HERO",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.82764375,
    "venue_count": 1,
    "avg_score": 0.82764375
  },
  {
    "id": "C99377836",
    "name": "Indexicality",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.92340815,
    "venue_count": 1,
    "avg_score": 0.92340815
  },
  {
    "id": "C10511252",
    "name": "Emblem",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.50929654,
    "venue_count": 1,
    "avg_score": 0.50929654
  },
  {
    "id": "C80646779",
    "name": "Game art design",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.46549213,
    "venue_count": 1,
    "avg_score": 0.46549213
  },
  {
    "id": "C3017853095",
    "name": "Big game",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4262822,
    "venue_count": 1,
    "avg_score": 0.4262822
  },
  {
    "id": "C526734887",
    "name": "Environmental protection",
    "level": 1,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C2775884927",
    "name": "Design history",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.51327205,
    "venue_count": 1,
    "avg_score": 0.51327205
  },
  {
    "id": "C128979739",
    "name": "Polyphony",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46994263,
    "venue_count": 1,
    "avg_score": 0.46994263
  },
  {
    "id": "C198087647",
    "name": "Instrumentalism",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7132214,
    "venue_count": 1,
    "avg_score": 0.7132214
  },
  {
    "id": "C190703774",
    "name": "Graphic communication",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41349518,
    "venue_count": 1,
    "avg_score": 0.41349518
  },
  {
    "id": "C2779115301",
    "name": "Sympathy",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8170617,
    "venue_count": 1,
    "avg_score": 0.8170617
  },
  {
    "id": "C2777765086",
    "name": "Co-citation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.7021307,
    "venue_count": 1,
    "avg_score": 0.7021307
  },
  {
    "id": "C105345328",
    "name": "Citation analysis",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.49729326,
    "venue_count": 1,
    "avg_score": 0.49729326
  },
  {
    "id": "C2781413104",
    "name": "Antinomy",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.927492,
    "venue_count": 1,
    "avg_score": 0.927492
  },
  {
    "id": "C2779192218",
    "name": "Elaboration",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.62216747,
    "venue_count": 1,
    "avg_score": 0.62216747
  },
  {
    "id": "C32506930",
    "name": "Hegelianism",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.603344,
    "venue_count": 1,
    "avg_score": 0.603344
  },
  {
    "id": "C2776756274",
    "name": "Stress (linguistics)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8318087,
    "venue_count": 1,
    "avg_score": 0.8318087
  },
  {
    "id": "C5616717",
    "name": "Nazism",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.76720345,
    "venue_count": 1,
    "avg_score": 0.76720345
  },
  {
    "id": "C2779367526",
    "name": "Hybridity",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.55546373,
    "venue_count": 1,
    "avg_score": 0.55546373
  },
  {
    "id": "C78780964",
    "name": "Position paper",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41772863,
    "venue_count": 1,
    "avg_score": 0.41772863
  },
  {
    "id": "C3018428822",
    "name": "Chinese language",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5553964,
    "venue_count": 1,
    "avg_score": 0.5553964
  },
  {
    "id": "C2778746772",
    "name": "Coproduction",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.626032,
    "venue_count": 1,
    "avg_score": 0.626032
  },
  {
    "id": "C93453677",
    "name": "Business process discovery",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.4209227,
    "venue_count": 1,
    "avg_score": 0.4209227
  },
  {
    "id": "C167651023",
    "name": "Plot (graphics)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42346597,
    "venue_count": 1,
    "avg_score": 0.42346597
  },
  {
    "id": "C2777159308",
    "name": "Formality",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.76540655,
    "venue_count": 1,
    "avg_score": 0.76540655
  },
  {
    "id": "C78173224",
    "name": "Theory of the firm",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.65140206,
    "venue_count": 1,
    "avg_score": 0.65140206
  },
  {
    "id": "C92064499",
    "name": "Production theory",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.414049,
    "venue_count": 1,
    "avg_score": 0.414049
  },
  {
    "id": "C2777526259",
    "name": "Flash (photography)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41538858,
    "venue_count": 1,
    "avg_score": 0.41538858
  },
  {
    "id": "C2992906163",
    "name": "Popular science",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.7008934,
    "venue_count": 1,
    "avg_score": 0.7008934
  },
  {
    "id": "C59740354",
    "name": "Scientific visualization",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.42452288,
    "venue_count": 1,
    "avg_score": 0.42452288
  },
  {
    "id": "C2982819384",
    "name": "Off the shelf",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7585943,
    "venue_count": 1,
    "avg_score": 0.7585943
  },
  {
    "id": "C193427332",
    "name": "Etymology",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6456793,
    "venue_count": 1,
    "avg_score": 0.6456793
  },
  {
    "id": "C29912816",
    "name": "Sanskrit",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6293883,
    "venue_count": 1,
    "avg_score": 0.6293883
  },
  {
    "id": "C126808245",
    "name": "Colloquialism",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46652564,
    "venue_count": 1,
    "avg_score": 0.46652564
  },
  {
    "id": "C2776323365",
    "name": "Taboo",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7946688,
    "venue_count": 1,
    "avg_score": 0.7946688
  },
  {
    "id": "C2781283010",
    "name": "Shame",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6854753,
    "venue_count": 1,
    "avg_score": 0.6854753
  },
  {
    "id": "C82714645",
    "name": "Template",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5794392,
    "venue_count": 1,
    "avg_score": 0.5794392
  },
  {
    "id": "C517468935",
    "name": "Industrial Revolution",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.58776355,
    "venue_count": 1,
    "avg_score": 0.58776355
  },
  {
    "id": "C130762594",
    "name": "Ambush marketing",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4246911,
    "venue_count": 1,
    "avg_score": 0.4246911
  },
  {
    "id": "C2780617661",
    "name": "Subcategory",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.494924,
    "venue_count": 1,
    "avg_score": 0.494924
  },
  {
    "id": "C2780175911",
    "name": "CONQUEST",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.823178,
    "venue_count": 1,
    "avg_score": 0.823178
  },
  {
    "id": "C2778495208",
    "name": "Empire",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6609347,
    "venue_count": 1,
    "avg_score": 0.6609347
  },
  {
    "id": "C6303427",
    "name": "Economic history",
    "level": 1,
    "total_papers": 1,
    "total_score": 0.34589416,
    "venue_count": 1,
    "avg_score": 0.34589416
  },
  {
    "id": "C201377581",
    "name": "Reification (Marxism)",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.8672906,
    "venue_count": 1,
    "avg_score": 0.8672906
  },
  {
    "id": "C120588126",
    "name": "Information design",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41186076,
    "venue_count": 1,
    "avg_score": 0.41186076
  },
  {
    "id": "C38377331",
    "name": "Meritocracy",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5125277,
    "venue_count": 1,
    "avg_score": 0.5125277
  },
  {
    "id": "C111640148",
    "name": "Rubric",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46659517,
    "venue_count": 1,
    "avg_score": 0.46659517
  },
  {
    "id": "C7955714",
    "name": "Structure and agency",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5132906,
    "venue_count": 1,
    "avg_score": 0.5132906
  },
  {
    "id": "C187395273",
    "name": "Interactionism",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.9295353,
    "venue_count": 1,
    "avg_score": 0.9295353
  },
  {
    "id": "C128850910",
    "name": "Symbolic interactionism",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.9096959,
    "venue_count": 1,
    "avg_score": 0.9096959
  },
  {
    "id": "C100694443",
    "name": "Philosophy of design",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.8523772,
    "venue_count": 1,
    "avg_score": 0.8523772
  },
  {
    "id": "C31005864",
    "name": "Philosophy of computer science",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.43483064,
    "venue_count": 1,
    "avg_score": 0.43483064
  },
  {
    "id": "C170143251",
    "name": "Western philosophy",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41600868,
    "venue_count": 1,
    "avg_score": 0.41600868
  },
  {
    "id": "C134400042",
    "name": "Symbol (formal)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.49879646,
    "venue_count": 1,
    "avg_score": 0.49879646
  },
  {
    "id": "C2994303106",
    "name": "Program director",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42773798,
    "venue_count": 1,
    "avg_score": 0.42773798
  },
  {
    "id": "C2778222013",
    "name": "Alice (programming language)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.56520593,
    "venue_count": 1,
    "avg_score": 0.56520593
  },
  {
    "id": "C2606647",
    "name": "Miami",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6459895,
    "venue_count": 1,
    "avg_score": 0.6459895
  },
  {
    "id": "C159390177",
    "name": "Soil science",
    "level": 1,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C172100665",
    "name": "Thermal conduction",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45828122,
    "venue_count": 1,
    "avg_score": 0.45828122
  },
  {
    "id": "C81692654",
    "name": "Kriging",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5643766,
    "venue_count": 1,
    "avg_score": 0.5643766
  },
  {
    "id": "C61326573",
    "name": "Gaussian process",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4538485,
    "venue_count": 1,
    "avg_score": 0.4538485
  },
  {
    "id": "C45089102",
    "name": "Heat kernel signature",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.44779962,
    "venue_count": 1,
    "avg_score": 0.44779962
  },
  {
    "id": "C180863505",
    "name": "Feature recognition",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6534248,
    "venue_count": 1,
    "avg_score": 0.6534248
  },
  {
    "id": "C2781162966",
    "name": "Polylactic acid",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.65827334,
    "venue_count": 1,
    "avg_score": 0.65827334
  },
  {
    "id": "C2780841128",
    "name": "Characterization (materials science)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5488688,
    "venue_count": 1,
    "avg_score": 0.5488688
  },
  {
    "id": "C2778958987",
    "name": "Extrusion",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5299046,
    "venue_count": 1,
    "avg_score": 0.5299046
  },
  {
    "id": "C2781247691",
    "name": "Thermoplastic",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.48515874,
    "venue_count": 1,
    "avg_score": 0.48515874
  },
  {
    "id": "C521977710",
    "name": "Polymer",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.13564122,
    "venue_count": 1,
    "avg_score": 0.13564122
  },
  {
    "id": "C114744707",
    "name": "RANSAC",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.7426941,
    "venue_count": 1,
    "avg_score": 0.7426941
  },
  {
    "id": "C44000306",
    "name": "Hinge",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.44809818,
    "venue_count": 1,
    "avg_score": 0.44809818
  },
  {
    "id": "C79772673",
    "name": "Compliant mechanism",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.43427247,
    "venue_count": 1,
    "avg_score": 0.43427247
  },
  {
    "id": "C2780365114",
    "name": "MATLAB",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.49985766,
    "venue_count": 1,
    "avg_score": 0.49985766
  },
  {
    "id": "C190699663",
    "name": "Timoshenko beam theory",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.48655835,
    "venue_count": 1,
    "avg_score": 0.48655835
  },
  {
    "id": "C168834538",
    "name": "Beam (structure)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.47723913,
    "venue_count": 1,
    "avg_score": 0.47723913
  },
  {
    "id": "C148047603",
    "name": "Parallelizable manifold",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4679365,
    "venue_count": 1,
    "avg_score": 0.4679365
  },
  {
    "id": "C2779772531",
    "name": "Void (composites)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.57902503,
    "venue_count": 1,
    "avg_score": 0.57902503
  },
  {
    "id": "C53256841",
    "name": "Fiber-reinforced composite",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.48303494,
    "venue_count": 1,
    "avg_score": 0.48303494
  },
  {
    "id": "C181095308",
    "name": "Geometric primitive",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.736594,
    "venue_count": 1,
    "avg_score": 0.736594
  },
  {
    "id": "C2993928531",
    "name": "Geometric pattern",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.48835275,
    "venue_count": 1,
    "avg_score": 0.48835275
  },
  {
    "id": "C22251595",
    "name": "Arc length",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6868406,
    "venue_count": 1,
    "avg_score": 0.6868406
  },
  {
    "id": "C51544822",
    "name": "Ordinary differential equation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6270678,
    "venue_count": 1,
    "avg_score": 0.6270678
  },
  {
    "id": "C78045399",
    "name": "Differential equation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.29855812,
    "venue_count": 1,
    "avg_score": 0.29855812
  },
  {
    "id": "C99102927",
    "name": "Scale space",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.47457695,
    "venue_count": 1,
    "avg_score": 0.47457695
  },
  {
    "id": "C64297162",
    "name": "Deposition (geology)",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5745908,
    "venue_count": 1,
    "avg_score": 0.5745908
  },
  {
    "id": "C109386097",
    "name": "Bead",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46445605,
    "venue_count": 1,
    "avg_score": 0.46445605
  },
  {
    "id": "C2816523",
    "name": "Sediment",
    "level": 2,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C200398353",
    "name": "Turbomachinery",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.85117733,
    "venue_count": 1,
    "avg_score": 0.85117733
  },
  {
    "id": "C2776132848",
    "name": "Blade (archaeology)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6408319,
    "venue_count": 1,
    "avg_score": 0.6408319
  },
  {
    "id": "C102519508",
    "name": "Fourier transform",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43999267,
    "venue_count": 1,
    "avg_score": 0.43999267
  },
  {
    "id": "C91575142",
    "name": "Optimal control",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4155778,
    "venue_count": 1,
    "avg_score": 0.4155778
  },
  {
    "id": "C114289077",
    "name": "Statistical model",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43085605,
    "venue_count": 1,
    "avg_score": 0.43085605
  },
  {
    "id": "C107706546",
    "name": "Heat exchanger",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6367668,
    "venue_count": 1,
    "avg_score": 0.6367668
  },
  {
    "id": "C50517652",
    "name": "Heat transfer",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.44336176,
    "venue_count": 1,
    "avg_score": 0.44336176
  },
  {
    "id": "C43058520",
    "name": "Eulerian path",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.72132206,
    "venue_count": 1,
    "avg_score": 0.72132206
  },
  {
    "id": "C62884695",
    "name": "Euler's formula",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5166238,
    "venue_count": 1,
    "avg_score": 0.5166238
  },
  {
    "id": "C53469067",
    "name": "Lagrangian",
    "level": 2,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C179428855",
    "name": "Microscale chemistry",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7701793,
    "venue_count": 1,
    "avg_score": 0.7701793
  },
  {
    "id": "C2781448156",
    "name": "Coating",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5641067,
    "venue_count": 1,
    "avg_score": 0.5641067
  },
  {
    "id": "C2778493900",
    "name": "Cloak",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5914447,
    "venue_count": 1,
    "avg_score": 0.5914447
  },
  {
    "id": "C118732077",
    "name": "Normal",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.60911644,
    "venue_count": 1,
    "avg_score": 0.60911644
  },
  {
    "id": "C157157409",
    "name": "Tangent space",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.47200796,
    "venue_count": 1,
    "avg_score": 0.47200796
  },
  {
    "id": "C160343418",
    "name": "Rigidity (electromagnetism)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5026212,
    "venue_count": 1,
    "avg_score": 0.5026212
  },
  {
    "id": "C62438384",
    "name": "Simplex",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8098557,
    "venue_count": 1,
    "avg_score": 0.8098557
  },
  {
    "id": "C193536780",
    "name": "Edge detection",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.4422942,
    "venue_count": 1,
    "avg_score": 0.4422942
  },
  {
    "id": "C104065381",
    "name": "Geometric modeling",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5082957,
    "venue_count": 1,
    "avg_score": 0.5082957
  },
  {
    "id": "C150921843",
    "name": "Resampling",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7016949,
    "venue_count": 1,
    "avg_score": 0.7016949
  },
  {
    "id": "C21080849",
    "name": "Data point",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5138243,
    "venue_count": 1,
    "avg_score": 0.5138243
  },
  {
    "id": "C28704281",
    "name": "Mechatronics",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8377198,
    "venue_count": 1,
    "avg_score": 0.8377198
  },
  {
    "id": "C21285288",
    "name": "Systems Modeling Language",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.75238323,
    "venue_count": 1,
    "avg_score": 0.75238323
  },
  {
    "id": "C205976826",
    "name": "Computer-automated design",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.42722237,
    "venue_count": 1,
    "avg_score": 0.42722237
  },
  {
    "id": "C145644426",
    "name": "Unified Modeling Language",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.14321998,
    "venue_count": 1,
    "avg_score": 0.14321998
  },
  {
    "id": "C186060115",
    "name": "Biological system",
    "level": 1,
    "total_papers": 1,
    "total_score": 0.48546556,
    "venue_count": 1,
    "avg_score": 0.48546556
  },
  {
    "id": "C61437842",
    "name": "User Friendly",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.71224666,
    "venue_count": 1,
    "avg_score": 0.71224666
  },
  {
    "id": "C4725764",
    "name": "Extraction (chemistry)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6566006,
    "venue_count": 1,
    "avg_score": 0.6566006
  },
  {
    "id": "C23951316",
    "name": "Skeletonization",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.65627646,
    "venue_count": 1,
    "avg_score": 0.65627646
  },
  {
    "id": "C108882727",
    "name": "Solid modeling",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42652524,
    "venue_count": 1,
    "avg_score": 0.42652524
  },
  {
    "id": "C45340560",
    "name": "Disjoint sets",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.50216675,
    "venue_count": 1,
    "avg_score": 0.50216675
  },
  {
    "id": "C7305733",
    "name": "Geometric shape",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.48317137,
    "venue_count": 1,
    "avg_score": 0.48317137
  },
  {
    "id": "C12362212",
    "name": "Linear subspace",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4205875,
    "venue_count": 1,
    "avg_score": 0.4205875
  },
  {
    "id": "C62799726",
    "name": "Hilbert space",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41104138,
    "venue_count": 1,
    "avg_score": 0.41104138
  },
  {
    "id": "C2992317946",
    "name": "De facto",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.44248217,
    "venue_count": 1,
    "avg_score": 0.44248217
  },
  {
    "id": "C2776100724",
    "name": "Milling cutter",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.44095302,
    "venue_count": 1,
    "avg_score": 0.44095302
  },
  {
    "id": "C2992293187",
    "name": "Cnc milling",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.41385835,
    "venue_count": 1,
    "avg_score": 0.41385835
  },
  {
    "id": "C37423430",
    "name": "Hull",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7925135,
    "venue_count": 1,
    "avg_score": 0.7925135
  },
  {
    "id": "C161064598",
    "name": "Waterline",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.51542246,
    "venue_count": 1,
    "avg_score": 0.51542246
  },
  {
    "id": "C147898140",
    "name": "Conformal geometric algebra",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.68682706,
    "venue_count": 1,
    "avg_score": 0.68682706
  },
  {
    "id": "C180671464",
    "name": "Geometric algebra",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.43583235,
    "venue_count": 1,
    "avg_score": 0.43583235
  },
  {
    "id": "C14394260",
    "name": "Algebra representation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.12171376,
    "venue_count": 1,
    "avg_score": 0.12171376
  },
  {
    "id": "C110521144",
    "name": "Scalar field",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5381665,
    "venue_count": 1,
    "avg_score": 0.5381665
  },
  {
    "id": "C2987653016",
    "name": "Free form",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4595318,
    "venue_count": 1,
    "avg_score": 0.4595318
  },
  {
    "id": "C75564084",
    "name": "Graph embedding",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.498528,
    "venue_count": 1,
    "avg_score": 0.498528
  },
  {
    "id": "C145580432",
    "name": "Lattice graph",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.4426984,
    "venue_count": 1,
    "avg_score": 0.4426984
  },
  {
    "id": "C203776342",
    "name": "Line graph",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.24723786,
    "venue_count": 1,
    "avg_score": 0.24723786
  },
  {
    "id": "C22149727",
    "name": "Voltage graph",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.19351983,
    "venue_count": 1,
    "avg_score": 0.19351983
  },
  {
    "id": "C34559072",
    "name": "Design of experiments",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42061818,
    "venue_count": 1,
    "avg_score": 0.42061818
  },
  {
    "id": "C84211073",
    "name": "Floating point",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6651508,
    "venue_count": 1,
    "avg_score": 0.6651508
  },
  {
    "id": "C129844170",
    "name": "Quadratic equation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.50942975,
    "venue_count": 1,
    "avg_score": 0.50942975
  },
  {
    "id": "C207850805",
    "name": "Reverse engineering",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5796256,
    "venue_count": 1,
    "avg_score": 0.5796256
  },
  {
    "id": "C163985040",
    "name": "Data acquisition",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.44794607,
    "venue_count": 1,
    "avg_score": 0.44794607
  },
  {
    "id": "C73301696",
    "name": "Formalism (music)",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.45408136,
    "venue_count": 1,
    "avg_score": 0.45408136
  },
  {
    "id": "C109839438",
    "name": "Cutting-plane method",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6758498,
    "venue_count": 1,
    "avg_score": 0.6758498
  },
  {
    "id": "C206194317",
    "name": "Convex hull",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4682981,
    "venue_count": 1,
    "avg_score": 0.4682981
  },
  {
    "id": "C56086750",
    "name": "Integer programming",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.20758751,
    "venue_count": 1,
    "avg_score": 0.20758751
  },
  {
    "id": "C75553542",
    "name": "A priori and a posteriori",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5057492,
    "venue_count": 1,
    "avg_score": 0.5057492
  },
  {
    "id": "C65885262",
    "name": "Scale-space segmentation",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.4581444,
    "venue_count": 1,
    "avg_score": 0.4581444
  },
  {
    "id": "C25694479",
    "name": "Segmentation-based object categorization",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.4217446,
    "venue_count": 1,
    "avg_score": 0.4217446
  },
  {
    "id": "C72414096",
    "name": "Mass customization",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6125743,
    "venue_count": 1,
    "avg_score": 0.6125743
  },
  {
    "id": "C22679943",
    "name": "Standard deviation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45598084,
    "venue_count": 1,
    "avg_score": 0.45598084
  },
  {
    "id": "C61427482",
    "name": "Anthropometry",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45470506,
    "venue_count": 1,
    "avg_score": 0.45470506
  },
  {
    "id": "C133512626",
    "name": "Automatic differentiation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5790127,
    "venue_count": 1,
    "avg_score": 0.5790127
  },
  {
    "id": "C197855036",
    "name": "Binary tree",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.14881492,
    "venue_count": 1,
    "avg_score": 0.14881492
  },
  {
    "id": "C51255310",
    "name": "Tensor product",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.60797644,
    "venue_count": 1,
    "avg_score": 0.60797644
  },
  {
    "id": "C16171025",
    "name": "Singularity",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.86494404,
    "venue_count": 1,
    "avg_score": 0.86494404
  },
  {
    "id": "C134912446",
    "name": "Convex body",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.53992313,
    "venue_count": 1,
    "avg_score": 0.53992313
  },
  {
    "id": "C145446738",
    "name": "Convex function",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.48425266,
    "venue_count": 1,
    "avg_score": 0.48425266
  },
  {
    "id": "C158843486",
    "name": "Complex geometry",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46001905,
    "venue_count": 1,
    "avg_score": 0.46001905
  },
  {
    "id": "C43173174",
    "name": "Regular grid",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.443877,
    "venue_count": 1,
    "avg_score": 0.443877
  },
  {
    "id": "C24810621",
    "name": "Extended finite element method",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4158442,
    "venue_count": 1,
    "avg_score": 0.4158442
  },
  {
    "id": "C37292000",
    "name": "Residual stress",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.750839,
    "venue_count": 1,
    "avg_score": 0.750839
  },
  {
    "id": "C2776748203",
    "name": "Roof",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4193356,
    "venue_count": 1,
    "avg_score": 0.4193356
  },
  {
    "id": "C10485038",
    "name": "Hyperparameter optimization",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.74627805,
    "venue_count": 1,
    "avg_score": 0.74627805
  },
  {
    "id": "C147663694",
    "name": "Curl (programming language)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.64445126,
    "venue_count": 1,
    "avg_score": 0.64445126
  },
  {
    "id": "C193828747",
    "name": "Binary image",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.42719182,
    "venue_count": 1,
    "avg_score": 0.42719182
  },
  {
    "id": "C60439489",
    "name": "Streamlines, streaklines, and pathlines",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5862263,
    "venue_count": 1,
    "avg_score": 0.5862263
  },
  {
    "id": "C76563973",
    "name": "Laminar flow",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.55875003,
    "venue_count": 1,
    "avg_score": 0.55875003
  },
  {
    "id": "C90278072",
    "name": "Fluid dynamics",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.468182,
    "venue_count": 1,
    "avg_score": 0.468182
  },
  {
    "id": "C199631012",
    "name": "Perpendicular",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42032516,
    "venue_count": 1,
    "avg_score": 0.42032516
  },
  {
    "id": "C199686383",
    "name": "Subdivision surface",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.58369285,
    "venue_count": 1,
    "avg_score": 0.58369285
  },
  {
    "id": "C151201525",
    "name": "Limit (mathematics)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46739158,
    "venue_count": 1,
    "avg_score": 0.46739158
  },
  {
    "id": "C194401833",
    "name": "Triangle mesh",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5724102,
    "venue_count": 1,
    "avg_score": 0.5724102
  },
  {
    "id": "C174128100",
    "name": "Spiral (railway)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.63732886,
    "venue_count": 1,
    "avg_score": 0.63732886
  },
  {
    "id": "C164830781",
    "name": "Automated optical inspection",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.488129,
    "venue_count": 1,
    "avg_score": 0.488129
  },
  {
    "id": "C146920229",
    "name": "Automated X-ray inspection",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.45391563,
    "venue_count": 1,
    "avg_score": 0.45391563
  },
  {
    "id": "C195958017",
    "name": "Iterative closest point",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5939426,
    "venue_count": 1,
    "avg_score": 0.5939426
  },
  {
    "id": "C2780391921",
    "name": "Free-form deformation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4547512,
    "venue_count": 1,
    "avg_score": 0.4547512
  },
  {
    "id": "C79464548",
    "name": "Minkowski space",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8580338,
    "venue_count": 1,
    "avg_score": 0.8580338
  },
  {
    "id": "C10233890",
    "name": "Minkowski addition",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.8093513,
    "venue_count": 1,
    "avg_score": 0.8093513
  },
  {
    "id": "C129782007",
    "name": "Euclidean geometry",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43365097,
    "venue_count": 1,
    "avg_score": 0.43365097
  },
  {
    "id": "C79013991",
    "name": "Minkowski's theorem",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.42007074,
    "venue_count": 1,
    "avg_score": 0.42007074
  },
  {
    "id": "C184551148",
    "name": "Spherical trigonometry",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.72198045,
    "venue_count": 1,
    "avg_score": 0.72198045
  },
  {
    "id": "C94239619",
    "name": "Dodecahedron",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6594071,
    "venue_count": 1,
    "avg_score": 0.6594071
  },
  {
    "id": "C137665795",
    "name": "Spherical mean",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6109144,
    "venue_count": 1,
    "avg_score": 0.6109144
  },
  {
    "id": "C97402662",
    "name": "Frustum",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.49094728,
    "venue_count": 1,
    "avg_score": 0.49094728
  },
  {
    "id": "C108280814",
    "name": "Spherical shell",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.44884193,
    "venue_count": 1,
    "avg_score": 0.44884193
  },
  {
    "id": "C148189969",
    "name": "Great circle",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4242296,
    "venue_count": 1,
    "avg_score": 0.4242296
  },
  {
    "id": "C77730005",
    "name": "Spherical geometry",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41217774,
    "venue_count": 1,
    "avg_score": 0.41217774
  },
  {
    "id": "C68693459",
    "name": "Hyperplane",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.80107033,
    "venue_count": 1,
    "avg_score": 0.80107033
  },
  {
    "id": "C114410712",
    "name": "Hypersurface",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7090459,
    "venue_count": 1,
    "avg_score": 0.7090459
  },
  {
    "id": "C108586683",
    "name": "Self-healing hydrogels",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6203182,
    "venue_count": 1,
    "avg_score": 0.6203182
  },
  {
    "id": "C24872484",
    "name": "Dimensionless quantity",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.49652058,
    "venue_count": 1,
    "avg_score": 0.49652058
  },
  {
    "id": "C188032258",
    "name": "Constructive solid geometry",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6967915,
    "venue_count": 1,
    "avg_score": 0.6967915
  },
  {
    "id": "C54829058",
    "name": "Polyhedron",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5878837,
    "venue_count": 1,
    "avg_score": 0.5878837
  },
  {
    "id": "C110332635",
    "name": "Genetic programming",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42102033,
    "venue_count": 1,
    "avg_score": 0.42102033
  },
  {
    "id": "C75023562",
    "name": "Line integral",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41503197,
    "venue_count": 1,
    "avg_score": 0.41503197
  },
  {
    "id": "C72422203",
    "name": "SPHERES",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6982798,
    "venue_count": 1,
    "avg_score": 0.6982798
  },
  {
    "id": "C183893376",
    "name": "Sphere packing",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6186333,
    "venue_count": 1,
    "avg_score": 0.6186333
  },
  {
    "id": "C2834757",
    "name": "Monotone polygon",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6178826,
    "venue_count": 1,
    "avg_score": 0.6178826
  },
  {
    "id": "C124066611",
    "name": "Sparse approximation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4636565,
    "venue_count": 1,
    "avg_score": 0.4636565
  },
  {
    "id": "C167528306",
    "name": "Function representation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41473055,
    "venue_count": 1,
    "avg_score": 0.41473055
  },
  {
    "id": "C187455244",
    "name": "Boolean function",
    "level": 2,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C40890689",
    "name": "Osculating circle",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6957619,
    "venue_count": 1,
    "avg_score": 0.6957619
  },
  {
    "id": "C184585634",
    "name": "Bounding volume",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.6629118,
    "venue_count": 1,
    "avg_score": 0.6629118
  },
  {
    "id": "C182124507",
    "name": "Line segment",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43491712,
    "venue_count": 1,
    "avg_score": 0.43491712
  },
  {
    "id": "C2874115",
    "name": "Persistent homology",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6597088,
    "venue_count": 1,
    "avg_score": 0.6597088
  },
  {
    "id": "C165525559",
    "name": "Homology (biology)",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5914048,
    "venue_count": 1,
    "avg_score": 0.5914048
  },
  {
    "id": "C2988773926",
    "name": "Generative adversarial network",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5962419,
    "venue_count": 1,
    "avg_score": 0.5962419
  },
  {
    "id": "C93779851",
    "name": "Partial differential equation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7083684,
    "venue_count": 1,
    "avg_score": 0.7083684
  },
  {
    "id": "C195807954",
    "name": "Information extraction",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4948401,
    "venue_count": 1,
    "avg_score": 0.4948401
  },
  {
    "id": "C120567893",
    "name": "Knowledge extraction",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42694774,
    "venue_count": 1,
    "avg_score": 0.42694774
  },
  {
    "id": "C177688676",
    "name": "Semantics of Business Vocabulary and Business Rules",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.425253,
    "venue_count": 1,
    "avg_score": 0.425253
  },
  {
    "id": "C11066294",
    "name": "Business rule",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.15493253,
    "venue_count": 1,
    "avg_score": 0.15493253
  },
  {
    "id": "C16977076",
    "name": "Principal curvature",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.42842722,
    "venue_count": 1,
    "avg_score": 0.42842722
  },
  {
    "id": "C68060419",
    "name": "Subtraction",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.49033976,
    "venue_count": 1,
    "avg_score": 0.49033976
  },
  {
    "id": "C147370603",
    "name": "Hyperelastic material",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.93281806,
    "venue_count": 1,
    "avg_score": 0.93281806
  },
  {
    "id": "C18140158",
    "name": "Ogden",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.9263483,
    "venue_count": 1,
    "avg_score": 0.9263483
  },
  {
    "id": "C20192703",
    "name": "Strain energy density function",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4727232,
    "venue_count": 1,
    "avg_score": 0.4727232
  },
  {
    "id": "C163892269",
    "name": "Finite strain theory",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41054,
    "venue_count": 1,
    "avg_score": 0.41054
  },
  {
    "id": "C63632240",
    "name": "Boundary element method",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6891894,
    "venue_count": 1,
    "avg_score": 0.6891894
  },
  {
    "id": "C27592594",
    "name": "Helmholtz free energy",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.44982475,
    "venue_count": 1,
    "avg_score": 0.44982475
  },
  {
    "id": "C18591234",
    "name": "Helmholtz equation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41630507,
    "venue_count": 1,
    "avg_score": 0.41630507
  },
  {
    "id": "C113556839",
    "name": "Fuselage",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.82109404,
    "venue_count": 1,
    "avg_score": 0.82109404
  },
  {
    "id": "C38673314",
    "name": "Fuel tank",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7790985,
    "venue_count": 1,
    "avg_score": 0.7790985
  },
  {
    "id": "C57769158",
    "name": "Rivet",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6537828,
    "venue_count": 1,
    "avg_score": 0.6537828
  },
  {
    "id": "C88626702",
    "name": "Continuation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43499047,
    "venue_count": 1,
    "avg_score": 0.43499047
  },
  {
    "id": "C159694833",
    "name": "Iterative method",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5097434,
    "venue_count": 1,
    "avg_score": 0.5097434
  },
  {
    "id": "C80023036",
    "name": "Collocation (remote sensing)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43686485,
    "venue_count": 1,
    "avg_score": 0.43686485
  },
  {
    "id": "C130432447",
    "name": "Quartic function",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.871748,
    "venue_count": 1,
    "avg_score": 0.871748
  },
  {
    "id": "C194147245",
    "name": "Chord (peer-to-peer)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.55668175,
    "venue_count": 1,
    "avg_score": 0.55668175
  },
  {
    "id": "C140590641",
    "name": "OpenSees",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.79923904,
    "venue_count": 1,
    "avg_score": 0.79923904
  },
  {
    "id": "C25516864",
    "name": "Interconnectivity",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5436006,
    "venue_count": 1,
    "avg_score": 0.5436006
  },
  {
    "id": "C129621563",
    "name": "Betti number",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41701388,
    "venue_count": 1,
    "avg_score": 0.41701388
  },
  {
    "id": "C46435376",
    "name": "Multiphysics",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.48980376,
    "venue_count": 1,
    "avg_score": 0.48980376
  },
  {
    "id": "C186633575",
    "name": "Maxima and minima",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4298444,
    "venue_count": 1,
    "avg_score": 0.4298444
  },
  {
    "id": "C188060507",
    "name": "QR decomposition",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4359374,
    "venue_count": 1,
    "avg_score": 0.4359374
  },
  {
    "id": "C17095337",
    "name": "Piecewise linear function",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.55421317,
    "venue_count": 1,
    "avg_score": 0.55421317
  },
  {
    "id": "C184175843",
    "name": "Piecewise linear manifold",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5015874,
    "venue_count": 1,
    "avg_score": 0.5015874
  },
  {
    "id": "C184599523",
    "name": "Adaptive quadrature",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.46550328,
    "venue_count": 1,
    "avg_score": 0.46550328
  },
  {
    "id": "C2778844933",
    "name": "Interlocking",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.61157995,
    "venue_count": 1,
    "avg_score": 0.61157995
  },
  {
    "id": "C158436829",
    "name": "Architectural geometry",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.49338904,
    "venue_count": 1,
    "avg_score": 0.49338904
  },
  {
    "id": "C2778630250",
    "name": "Ferrocement",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41151384,
    "venue_count": 1,
    "avg_score": 0.41151384
  },
  {
    "id": "C2988805333",
    "name": "Reinforced concrete",
    "level": 2,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C24881265",
    "name": "Voronoi diagram",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.99001706,
    "venue_count": 1,
    "avg_score": 0.99001706
  },
  {
    "id": "C205672865",
    "name": "Centroidal Voronoi tessellation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.66962206,
    "venue_count": 1,
    "avg_score": 0.66962206
  },
  {
    "id": "C20468658",
    "name": "Weighted Voronoi diagram",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5977115,
    "venue_count": 1,
    "avg_score": 0.5977115
  },
  {
    "id": "C106436119",
    "name": "Quality assurance",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.7377545,
    "venue_count": 1,
    "avg_score": 0.7377545
  },
  {
    "id": "C2778618615",
    "name": "External quality assessment",
    "level": 2,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C2776196297",
    "name": "Twist",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6725514,
    "venue_count": 1,
    "avg_score": 0.6725514
  },
  {
    "id": "C125450124",
    "name": "Precast concrete",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7302801,
    "venue_count": 1,
    "avg_score": 0.7302801
  },
  {
    "id": "C2781300812",
    "name": "Shock (circulatory)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5845811,
    "venue_count": 1,
    "avg_score": 0.5845811
  },
  {
    "id": "C2993857929",
    "name": "Primary prevention",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41794044,
    "venue_count": 1,
    "avg_score": 0.41794044
  },
  {
    "id": "C133913538",
    "name": "Thermal comfort",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.92662495,
    "venue_count": 1,
    "avg_score": 0.92662495
  },
  {
    "id": "C2989386686",
    "name": "Thermal sensation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.47413182,
    "venue_count": 1,
    "avg_score": 0.47413182
  },
  {
    "id": "C2779075128",
    "name": "Buttocks",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5160363,
    "venue_count": 1,
    "avg_score": 0.5160363
  },
  {
    "id": "C2778196936",
    "name": "Back injury",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43554887,
    "venue_count": 1,
    "avg_score": 0.43554887
  },
  {
    "id": "C27400517",
    "name": "Absenteeism",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.91374654,
    "venue_count": 1,
    "avg_score": 0.91374654
  },
  {
    "id": "C2776867765",
    "name": "Job strain",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5413177,
    "venue_count": 1,
    "avg_score": 0.5413177
  },
  {
    "id": "C161657702",
    "name": "Face perception",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5046197,
    "venue_count": 1,
    "avg_score": 0.5046197
  },
  {
    "id": "C129484327",
    "name": "Social perception",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41503406,
    "venue_count": 1,
    "avg_score": 0.41503406
  },
  {
    "id": "C3454156",
    "name": "Side effect (computer science)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41225353,
    "venue_count": 1,
    "avg_score": 0.41225353
  },
  {
    "id": "C3020799230",
    "name": "Auditory perception",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.48988074,
    "venue_count": 1,
    "avg_score": 0.48988074
  },
  {
    "id": "C2777443451",
    "name": "Auditory system",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42655766,
    "venue_count": 1,
    "avg_score": 0.42655766
  },
  {
    "id": "C2988483714",
    "name": "Auditory stimuli",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41044104,
    "venue_count": 1,
    "avg_score": 0.41044104
  },
  {
    "id": "C2992824981",
    "name": "Working life",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41827175,
    "venue_count": 1,
    "avg_score": 0.41827175
  },
  {
    "id": "C20864712",
    "name": "Biological motion",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5667249,
    "venue_count": 1,
    "avg_score": 0.5667249
  },
  {
    "id": "C2983363897",
    "name": "Air temperature",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5562687,
    "venue_count": 1,
    "avg_score": 0.5562687
  },
  {
    "id": "C2984485829",
    "name": "Noise level",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.48988742,
    "venue_count": 1,
    "avg_score": 0.48988742
  },
  {
    "id": "C2780387288",
    "name": "Windshield",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.9002692,
    "venue_count": 1,
    "avg_score": 0.9002692
  },
  {
    "id": "C122776584",
    "name": "Cyan",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.670128,
    "venue_count": 1,
    "avg_score": 0.670128
  },
  {
    "id": "C188721877",
    "name": "Bar (unit)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.44677237,
    "venue_count": 1,
    "avg_score": 0.44677237
  },
  {
    "id": "C2986477067",
    "name": "Red light",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4253292,
    "venue_count": 1,
    "avg_score": 0.4253292
  },
  {
    "id": "C2987418964",
    "name": "Heat stress",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.65038466,
    "venue_count": 1,
    "avg_score": 0.65038466
  },
  {
    "id": "C2993190167",
    "name": "Extreme heat",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.647655,
    "venue_count": 1,
    "avg_score": 0.647655
  },
  {
    "id": "C2993783671",
    "name": "Fire fighter",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4869636,
    "venue_count": 1,
    "avg_score": 0.4869636
  },
  {
    "id": "C19612761",
    "name": "Workflow technology",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.51124597,
    "venue_count": 1,
    "avg_score": 0.51124597
  },
  {
    "id": "C167393769",
    "name": "Adaptive strategies",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5121274,
    "venue_count": 1,
    "avg_score": 0.5121274
  },
  {
    "id": "C2779329155",
    "name": "Deltoid muscle",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.47344255,
    "venue_count": 1,
    "avg_score": 0.47344255
  },
  {
    "id": "C2779746960",
    "name": "Carpal tunnel syndrome",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.72190154,
    "venue_count": 1,
    "avg_score": 0.72190154
  },
  {
    "id": "C3017684034",
    "name": "Surgical robot",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6745209,
    "venue_count": 1,
    "avg_score": 0.6745209
  },
  {
    "id": "C2983860417",
    "name": "Traffic sign",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.7778702,
    "venue_count": 1,
    "avg_score": 0.7778702
  },
  {
    "id": "C156957248",
    "name": "Odds ratio",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.69388676,
    "venue_count": 1,
    "avg_score": 0.69388676
  },
  {
    "id": "C2776164576",
    "name": "Osteoarthritis",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.67774355,
    "venue_count": 1,
    "avg_score": 0.67774355
  },
  {
    "id": "C24338571",
    "name": "Autoregressive integrated moving average",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.7380727,
    "venue_count": 1,
    "avg_score": 0.7380727
  },
  {
    "id": "C133029050",
    "name": "Vector autoregression",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4313589,
    "venue_count": 1,
    "avg_score": 0.4313589
  },
  {
    "id": "C183469790",
    "name": "Crash",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.57853353,
    "venue_count": 1,
    "avg_score": 0.57853353
  },
  {
    "id": "C2780347363",
    "name": "Biceps femoris muscle",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41991207,
    "venue_count": 1,
    "avg_score": 0.41991207
  },
  {
    "id": "C3018541476",
    "name": "Work performance",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42250836,
    "venue_count": 1,
    "avg_score": 0.42250836
  },
  {
    "id": "C2781407631",
    "name": "Airplane",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.553295,
    "venue_count": 1,
    "avg_score": 0.553295
  },
  {
    "id": "C2908613842",
    "name": "Aviation accident",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5720944,
    "venue_count": 1,
    "avg_score": 0.5720944
  },
  {
    "id": "C2987525970",
    "name": "Causal analysis",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.56822115,
    "venue_count": 1,
    "avg_score": 0.56822115
  },
  {
    "id": "C166151441",
    "name": "Causation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45729434,
    "venue_count": 1,
    "avg_score": 0.45729434
  },
  {
    "id": "C2780591428",
    "name": "Accident analysis",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41140297,
    "venue_count": 1,
    "avg_score": 0.41140297
  },
  {
    "id": "C102655426",
    "name": "Psychodynamics",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.76928425,
    "venue_count": 1,
    "avg_score": 0.76928425
  },
  {
    "id": "C2986187985",
    "name": "Driving simulation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.528282,
    "venue_count": 1,
    "avg_score": 0.528282
  },
  {
    "id": "C127532173",
    "name": "Hourglass",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4398902,
    "venue_count": 1,
    "avg_score": 0.4398902
  },
  {
    "id": "C2992962319",
    "name": "Work productivity",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.54642546,
    "venue_count": 1,
    "avg_score": 0.54642546
  },
  {
    "id": "C2777352226",
    "name": "TBARS",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.6433693,
    "venue_count": 1,
    "avg_score": 0.6433693
  },
  {
    "id": "C103486182",
    "name": "Isometric exercise",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5520296,
    "venue_count": 1,
    "avg_score": 0.5520296
  },
  {
    "id": "C36880943",
    "name": "Creatine kinase",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5086502,
    "venue_count": 1,
    "avg_score": 0.5086502
  },
  {
    "id": "C2776151105",
    "name": "Oxidative stress",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4598132,
    "venue_count": 1,
    "avg_score": 0.4598132
  },
  {
    "id": "C2776914184",
    "name": "Inflammation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43866917,
    "venue_count": 1,
    "avg_score": 0.43866917
  },
  {
    "id": "C2780829032",
    "name": "Lipid peroxidation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.11224502,
    "venue_count": 1,
    "avg_score": 0.11224502
  },
  {
    "id": "C2780407378",
    "name": "Overtime",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.68660134,
    "venue_count": 1,
    "avg_score": 0.68660134
  },
  {
    "id": "C3020164102",
    "name": "Fixation time",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41403002,
    "venue_count": 1,
    "avg_score": 0.41403002
  },
  {
    "id": "C43472768",
    "name": "Turn-by-turn navigation",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.72389597,
    "venue_count": 1,
    "avg_score": 0.72389597
  },
  {
    "id": "C2780204347",
    "name": "Weight-bearing",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.55865717,
    "venue_count": 1,
    "avg_score": 0.55865717
  },
  {
    "id": "C2908736133",
    "name": "Knee Joint",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5252009,
    "venue_count": 1,
    "avg_score": 0.5252009
  },
  {
    "id": "C2988237154",
    "name": "Palm oil",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5677133,
    "venue_count": 1,
    "avg_score": 0.5677133
  },
  {
    "id": "C54286561",
    "name": "Agroforestry",
    "level": 1,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C58563850",
    "name": "Physical hazard",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4397478,
    "venue_count": 1,
    "avg_score": 0.4397478
  },
  {
    "id": "C32896092",
    "name": "Risk management",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.66935956,
    "venue_count": 1,
    "avg_score": 0.66935956
  },
  {
    "id": "C121297759",
    "name": "Risk management plan",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.4347465,
    "venue_count": 1,
    "avg_score": 0.4347465
  },
  {
    "id": "C95609273",
    "name": "IT risk management",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.28769416,
    "venue_count": 1,
    "avg_score": 0.28769416
  },
  {
    "id": "C2779844322",
    "name": "Tilt (camera)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41883874,
    "venue_count": 1,
    "avg_score": 0.41883874
  },
  {
    "id": "C2778357063",
    "name": "Pelvis",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.74823105,
    "venue_count": 1,
    "avg_score": 0.74823105
  },
  {
    "id": "C178910020",
    "name": "Sagittal plane",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.69262165,
    "venue_count": 1,
    "avg_score": 0.69262165
  },
  {
    "id": "C3019295976",
    "name": "Leg muscle",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5463243,
    "venue_count": 1,
    "avg_score": 0.5463243
  },
  {
    "id": "C2779700847",
    "name": "Countdown",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.9062629,
    "venue_count": 1,
    "avg_score": 0.9062629
  },
  {
    "id": "C2776511800",
    "name": "Rotator cuff",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.53437024,
    "venue_count": 1,
    "avg_score": 0.53437024
  },
  {
    "id": "C2911216061",
    "name": "Shoulder Impingement Syndrome",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.46778166,
    "venue_count": 1,
    "avg_score": 0.46778166
  },
  {
    "id": "C2909768578",
    "name": "Tendonitis",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.42762312,
    "venue_count": 1,
    "avg_score": 0.42762312
  },
  {
    "id": "C2780105995",
    "name": "Tendon",
    "level": 2,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C2777275308",
    "name": "Cart",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8989428,
    "venue_count": 1,
    "avg_score": 0.8989428
  },
  {
    "id": "C2779070388",
    "name": "Pedometer",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.74191654,
    "venue_count": 1,
    "avg_score": 0.74191654
  },
  {
    "id": "C153606108",
    "name": "Humanism",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.56114084,
    "venue_count": 1,
    "avg_score": 0.56114084
  },
  {
    "id": "C75923793",
    "name": "Objectivism",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.44912553,
    "venue_count": 1,
    "avg_score": 0.44912553
  },
  {
    "id": "C129671850",
    "name": "Introspection",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.56456745,
    "venue_count": 1,
    "avg_score": 0.56456745
  },
  {
    "id": "C2992894027",
    "name": "Childhood cancer",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.50471365,
    "venue_count": 1,
    "avg_score": 0.50471365
  },
  {
    "id": "C2779072820",
    "name": "Military personnel",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45908678,
    "venue_count": 1,
    "avg_score": 0.45908678
  },
  {
    "id": "C52622258",
    "name": "Information theory",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4202557,
    "venue_count": 1,
    "avg_score": 0.4202557
  },
  {
    "id": "C2779794324",
    "name": "App store",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43863046,
    "venue_count": 1,
    "avg_score": 0.43863046
  },
  {
    "id": "C121193887",
    "name": "Schema crosswalk",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.47320384,
    "venue_count": 1,
    "avg_score": 0.47320384
  },
  {
    "id": "C2776272021",
    "name": "Virtual organization",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.44326785,
    "venue_count": 1,
    "avg_score": 0.44326785
  },
  {
    "id": "C85641259",
    "name": "Turn (biochemistry)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.47551897,
    "venue_count": 1,
    "avg_score": 0.47551897
  },
  {
    "id": "C46141821",
    "name": "Nuclear magnetic resonance",
    "level": 1,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C115816405",
    "name": "Sensation seeking",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6693203,
    "venue_count": 1,
    "avg_score": 0.6693203
  },
  {
    "id": "C2777111884",
    "name": "Social security",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.53185433,
    "venue_count": 1,
    "avg_score": 0.53185433
  },
  {
    "id": "C21435255",
    "name": "Habitability",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.95051545,
    "venue_count": 1,
    "avg_score": 0.95051545
  },
  {
    "id": "C76709773",
    "name": "Stress measures",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.43288288,
    "venue_count": 1,
    "avg_score": 0.43288288
  },
  {
    "id": "C2780282618",
    "name": "Anagrams",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.63265526,
    "venue_count": 1,
    "avg_score": 0.63265526
  },
  {
    "id": "C2776348555",
    "name": "ARDS",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6007345,
    "venue_count": 1,
    "avg_score": 0.6007345
  },
  {
    "id": "C2777714996",
    "name": "Lung",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.09202039,
    "venue_count": 1,
    "avg_score": 0.09202039
  },
  {
    "id": "C525925914",
    "name": "Utilitarianism",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6060249,
    "venue_count": 1,
    "avg_score": 0.6060249
  },
  {
    "id": "C2994541713",
    "name": "Moral dilemma",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.55988115,
    "venue_count": 1,
    "avg_score": 0.55988115
  },
  {
    "id": "C9158031",
    "name": "Moral reasoning",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.48842397,
    "venue_count": 1,
    "avg_score": 0.48842397
  },
  {
    "id": "C553683147",
    "name": "Deontological ethics",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.44458103,
    "venue_count": 1,
    "avg_score": 0.44458103
  },
  {
    "id": "C61434518",
    "name": "General surgery",
    "level": 1,
    "total_papers": 1,
    "total_score": 0.34128746,
    "venue_count": 1,
    "avg_score": 0.34128746
  },
  {
    "id": "C191147762",
    "name": "Human reliability",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5163349,
    "venue_count": 1,
    "avg_score": 0.5163349
  },
  {
    "id": "C2779240384",
    "name": "Safety culture",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8557277,
    "venue_count": 1,
    "avg_score": 0.8557277
  },
  {
    "id": "C67674302",
    "name": "Organizational culture",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4495092,
    "venue_count": 1,
    "avg_score": 0.4495092
  },
  {
    "id": "C142052008",
    "name": "Cross-sectional study",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.48296943,
    "venue_count": 1,
    "avg_score": 0.48296943
  },
  {
    "id": "C177918212",
    "name": "Perturbation (astronomy)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4588251,
    "venue_count": 1,
    "avg_score": 0.4588251
  },
  {
    "id": "C50440223",
    "name": "Risk factor",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5034546,
    "venue_count": 1,
    "avg_score": 0.5034546
  },
  {
    "id": "C7220189",
    "name": "Pictogram",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.9601971,
    "venue_count": 1,
    "avg_score": 0.9601971
  },
  {
    "id": "C2777120189",
    "name": "Triage",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.48593795,
    "venue_count": 1,
    "avg_score": 0.48593795
  },
  {
    "id": "C66283442",
    "name": "Failure mode and effects analysis",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4465308,
    "venue_count": 1,
    "avg_score": 0.4465308
  },
  {
    "id": "C21593369",
    "name": "Countermeasure",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8140503,
    "venue_count": 1,
    "avg_score": 0.8140503
  },
  {
    "id": "C93642007",
    "name": "Extreme environment",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.56998914,
    "venue_count": 1,
    "avg_score": 0.56998914
  },
  {
    "id": "C58693492",
    "name": "Neuroimaging",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.86056125,
    "venue_count": 1,
    "avg_score": 0.86056125
  },
  {
    "id": "C47822265",
    "name": "Complex system",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.49828935,
    "venue_count": 1,
    "avg_score": 0.49828935
  },
  {
    "id": "C206355099",
    "name": "Hazard analysis",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.49428105,
    "venue_count": 1,
    "avg_score": 0.49428105
  },
  {
    "id": "C159447121",
    "name": "Response bias",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4412702,
    "venue_count": 1,
    "avg_score": 0.4412702
  },
  {
    "id": "C147583825",
    "name": "Body weight",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46084166,
    "venue_count": 1,
    "avg_score": 0.46084166
  },
  {
    "id": "C7146039",
    "name": "Lumbosacral joint",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43305963,
    "venue_count": 1,
    "avg_score": 0.43305963
  },
  {
    "id": "C120174047",
    "name": "Euclidean distance",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.61248827,
    "venue_count": 1,
    "avg_score": 0.61248827
  },
  {
    "id": "C2778916471",
    "name": "Odor",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6703044,
    "venue_count": 1,
    "avg_score": 0.6703044
  },
  {
    "id": "C3020606620",
    "name": "Treatment modality",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.44296426,
    "venue_count": 1,
    "avg_score": 0.44296426
  },
  {
    "id": "C76542214",
    "name": "Center of pressure (fluid mechanics)",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5858098,
    "venue_count": 1,
    "avg_score": 0.5858098
  },
  {
    "id": "C107551265",
    "name": "Displacement (psychology)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41781422,
    "venue_count": 1,
    "avg_score": 0.41781422
  },
  {
    "id": "C2776268601",
    "name": "Occlusion",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43715814,
    "venue_count": 1,
    "avg_score": 0.43715814
  },
  {
    "id": "C189693848",
    "name": "Information exchange",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.54064107,
    "venue_count": 1,
    "avg_score": 0.54064107
  },
  {
    "id": "C2776058522",
    "name": "Visual field",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4900328,
    "venue_count": 1,
    "avg_score": 0.4900328
  },
  {
    "id": "C160086991",
    "name": "Human visual system model",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4888853,
    "venue_count": 1,
    "avg_score": 0.4888853
  },
  {
    "id": "C185761835",
    "name": "Peripheral vision",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.44103274,
    "venue_count": 1,
    "avg_score": 0.44103274
  },
  {
    "id": "C20685875",
    "name": "Predictive validity",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4326242,
    "venue_count": 1,
    "avg_score": 0.4326242
  },
  {
    "id": "C180591934",
    "name": "Downtime",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.50539064,
    "venue_count": 1,
    "avg_score": 0.50539064
  },
  {
    "id": "C2779018429",
    "name": "Thigh",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.72399485,
    "venue_count": 1,
    "avg_score": 0.72399485
  },
  {
    "id": "C136948725",
    "name": "Soft tissue",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6458977,
    "venue_count": 1,
    "avg_score": 0.6458977
  },
  {
    "id": "C70289976",
    "name": "Oxygenation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.61962974,
    "venue_count": 1,
    "avg_score": 0.61962974
  },
  {
    "id": "C2781057395",
    "name": "Intermittent pneumatic compression",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.4284062,
    "venue_count": 1,
    "avg_score": 0.4284062
  },
  {
    "id": "C2778959117",
    "name": "Deep vein",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.11947429,
    "venue_count": 1,
    "avg_score": 0.11947429
  },
  {
    "id": "C2780868729",
    "name": "Thrombosis",
    "level": 2,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C6439246",
    "name": "Aviation medicine",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.48996368,
    "venue_count": 1,
    "avg_score": 0.48996368
  },
  {
    "id": "C2776506782",
    "name": "Information display systems",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46655008,
    "venue_count": 1,
    "avg_score": 0.46655008
  },
  {
    "id": "C161407221",
    "name": "Cognitive model",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41172332,
    "venue_count": 1,
    "avg_score": 0.41172332
  },
  {
    "id": "C12590798",
    "name": "Replication (statistics)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7537824,
    "venue_count": 1,
    "avg_score": 0.7537824
  },
  {
    "id": "C2780898871",
    "name": "Performance metric",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.48013112,
    "venue_count": 1,
    "avg_score": 0.48013112
  },
  {
    "id": "C132094186",
    "name": "Clutter",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.643823,
    "venue_count": 1,
    "avg_score": 0.643823
  },
  {
    "id": "C194279344",
    "name": "Procrastination",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.9352126,
    "venue_count": 1,
    "avg_score": 0.9352126
  },
  {
    "id": "C555008776",
    "name": "Battery (electricity)",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.65104616,
    "venue_count": 1,
    "avg_score": 0.65104616
  },
  {
    "id": "C2987988905",
    "name": "Sedentary behavior",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6637066,
    "venue_count": 1,
    "avg_score": 0.6637066
  },
  {
    "id": "C18246116",
    "name": "Names of the days of the week",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41342905,
    "venue_count": 1,
    "avg_score": 0.41342905
  },
  {
    "id": "C194130854",
    "name": "GLARE",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.867383,
    "venue_count": 1,
    "avg_score": 0.867383
  },
  {
    "id": "C73313986",
    "name": "Luminance",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.67212176,
    "venue_count": 1,
    "avg_score": 0.67212176
  },
  {
    "id": "C110445762",
    "name": "Color temperature",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.57992136,
    "venue_count": 1,
    "avg_score": 0.57992136
  },
  {
    "id": "C101271287",
    "name": "LED lamp",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.55057645,
    "venue_count": 1,
    "avg_score": 0.55057645
  },
  {
    "id": "C2983470273",
    "name": "Night vision",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5021627,
    "venue_count": 1,
    "avg_score": 0.5021627
  },
  {
    "id": "C36365805",
    "name": "Illuminance",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43904918,
    "venue_count": 1,
    "avg_score": 0.43904918
  },
  {
    "id": "C11665553",
    "name": "Radius of curvature",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.7798238,
    "venue_count": 1,
    "avg_score": 0.7798238
  },
  {
    "id": "C200756006",
    "name": "Visual angle",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.444886,
    "venue_count": 1,
    "avg_score": 0.444886
  },
  {
    "id": "C127813850",
    "name": "Mean curvature flow",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.06593534,
    "venue_count": 1,
    "avg_score": 0.06593534
  },
  {
    "id": "C113168747",
    "name": "Cruise control",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.53951377,
    "venue_count": 1,
    "avg_score": 0.53951377
  },
  {
    "id": "C2778716859",
    "name": "Intubation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5702327,
    "venue_count": 1,
    "avg_score": 0.5702327
  },
  {
    "id": "C2779526319",
    "name": "Anesthesiology",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4607611,
    "venue_count": 1,
    "avg_score": 0.4607611
  },
  {
    "id": "C2991710064",
    "name": "Endotracheal intubation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.43734682,
    "venue_count": 1,
    "avg_score": 0.43734682
  },
  {
    "id": "C141516989",
    "name": "Default mode network",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.46598047,
    "venue_count": 1,
    "avg_score": 0.46598047
  },
  {
    "id": "C125611927",
    "name": "Criticality",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7693249,
    "venue_count": 1,
    "avg_score": 0.7693249
  },
  {
    "id": "C48921125",
    "name": "Linear regression",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41739905,
    "venue_count": 1,
    "avg_score": 0.41739905
  },
  {
    "id": "C2778585151",
    "name": "Dishonesty",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45074868,
    "venue_count": 1,
    "avg_score": 0.45074868
  },
  {
    "id": "C2776437466",
    "name": "Lie detection",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41646287,
    "venue_count": 1,
    "avg_score": 0.41646287
  },
  {
    "id": "C2778159538",
    "name": "Traumatic stress",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5057218,
    "venue_count": 1,
    "avg_score": 0.5057218
  },
  {
    "id": "C506615639",
    "name": "Command and control",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.63010406,
    "venue_count": 1,
    "avg_score": 0.63010406
  },
  {
    "id": "C33326189",
    "name": "Information integration",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4745149,
    "venue_count": 1,
    "avg_score": 0.4745149
  },
  {
    "id": "C128370203",
    "name": "Anthropocene",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.78745466,
    "venue_count": 1,
    "avg_score": 0.78745466
  },
  {
    "id": "C107218244",
    "name": "Biosphere",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.49202988,
    "venue_count": 1,
    "avg_score": 0.49202988
  },
  {
    "id": "C11821877",
    "name": "Distributive property",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4644518,
    "venue_count": 1,
    "avg_score": 0.4644518
  },
  {
    "id": "C2988919728",
    "name": "Nova scotia",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6393957,
    "venue_count": 1,
    "avg_score": 0.6393957
  },
  {
    "id": "C2779707719",
    "name": "Polity",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.44819772,
    "venue_count": 1,
    "avg_score": 0.44819772
  },
  {
    "id": "C203404855",
    "name": "Environmentalism",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.43459886,
    "venue_count": 1,
    "avg_score": 0.43459886
  },
  {
    "id": "C548836952",
    "name": "Personhood",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.9459847,
    "venue_count": 1,
    "avg_score": 0.9459847
  },
  {
    "id": "C79186407",
    "name": "Plasticity",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4481154,
    "venue_count": 1,
    "avg_score": 0.4481154
  },
  {
    "id": "C2994170677",
    "name": "Art market",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6260215,
    "venue_count": 1,
    "avg_score": 0.6260215
  },
  {
    "id": "C2781149807",
    "name": "Art world",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4985454,
    "venue_count": 1,
    "avg_score": 0.4985454
  },
  {
    "id": "C204457725",
    "name": "History of art",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.49653083,
    "venue_count": 1,
    "avg_score": 0.49653083
  },
  {
    "id": "C2779867537",
    "name": "Work of art",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.437486,
    "venue_count": 1,
    "avg_score": 0.437486
  },
  {
    "id": "C2780307871",
    "name": "Cosmos (plant)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.598424,
    "venue_count": 1,
    "avg_score": 0.598424
  },
  {
    "id": "C177897776",
    "name": "Memoir",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.92767763,
    "venue_count": 1,
    "avg_score": 0.92767763
  },
  {
    "id": "C96146094",
    "name": "Unification",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.47198206,
    "venue_count": 1,
    "avg_score": 0.47198206
  },
  {
    "id": "C2780415144",
    "name": "SAINT",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6698351,
    "venue_count": 1,
    "avg_score": 0.6698351
  },
  {
    "id": "C73520026",
    "name": "Pop music automation",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.538061,
    "venue_count": 1,
    "avg_score": 0.538061
  },
  {
    "id": "C154233639",
    "name": "Musicology",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4902623,
    "venue_count": 1,
    "avg_score": 0.4902623
  },
  {
    "id": "C114611597",
    "name": "Popular music",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42920062,
    "venue_count": 1,
    "avg_score": 0.42920062
  },
  {
    "id": "C2778848561",
    "name": "Summit",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.44152558,
    "venue_count": 1,
    "avg_score": 0.44152558
  },
  {
    "id": "C100970517",
    "name": "Physical geography",
    "level": 1,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C145746218",
    "name": "Handicraft",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.96999794,
    "venue_count": 1,
    "avg_score": 0.96999794
  },
  {
    "id": "C188162584",
    "name": "Evolutionism",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41516513,
    "venue_count": 1,
    "avg_score": 0.41516513
  },
  {
    "id": "C76947770",
    "name": "Ephemeral key",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6077634,
    "venue_count": 1,
    "avg_score": 0.6077634
  },
  {
    "id": "C117797892",
    "name": "Shadow (psychology)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4883756,
    "venue_count": 1,
    "avg_score": 0.4883756
  },
  {
    "id": "C120962342",
    "name": "History of photography",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41259304,
    "venue_count": 1,
    "avg_score": 0.41259304
  },
  {
    "id": "C192177671",
    "name": "Neurophenomenology",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4743168,
    "venue_count": 1,
    "avg_score": 0.4743168
  },
  {
    "id": "C521449643",
    "name": "Nationalism",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.49720863,
    "venue_count": 1,
    "avg_score": 0.49720863
  },
  {
    "id": "C294558",
    "name": "Newtonian fluid",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5708368,
    "venue_count": 1,
    "avg_score": 0.5708368
  },
  {
    "id": "C135889238",
    "name": "Kinetic energy",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.44068575,
    "venue_count": 1,
    "avg_score": 0.44068575
  },
  {
    "id": "C103017160",
    "name": "Coppicing",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6983158,
    "venue_count": 1,
    "avg_score": 0.6983158
  },
  {
    "id": "C128758860",
    "name": "Woody plant",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.091936916,
    "venue_count": 1,
    "avg_score": 0.091936916
  },
  {
    "id": "C2779077932",
    "name": "Electroacoustic music",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6738616,
    "venue_count": 1,
    "avg_score": 0.6738616
  },
  {
    "id": "C76091853",
    "name": "Puppetry",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.85978544,
    "venue_count": 1,
    "avg_score": 0.85978544
  },
  {
    "id": "C2779746338",
    "name": "Neuroscientist",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.79559886,
    "venue_count": 1,
    "avg_score": 0.79559886
  },
  {
    "id": "C2778609137",
    "name": "Myelin",
    "level": 3,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C2776985911",
    "name": "Oligodendrocyte",
    "level": 4,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C193221554",
    "name": "Commonsense reasoning",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.66127485,
    "venue_count": 1,
    "avg_score": 0.66127485
  },
  {
    "id": "C115925183",
    "name": "Knowledge-based systems",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.24692577,
    "venue_count": 1,
    "avg_score": 0.24692577
  },
  {
    "id": "C2776397901",
    "name": "Verb",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6459921,
    "venue_count": 1,
    "avg_score": 0.6459921
  },
  {
    "id": "C2984737752",
    "name": "Silicon valley",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.8217044,
    "venue_count": 1,
    "avg_score": 0.8217044
  },
  {
    "id": "C544956773",
    "name": "Silicon",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46688074,
    "venue_count": 1,
    "avg_score": 0.46688074
  },
  {
    "id": "C2779926162",
    "name": "Experimentalism",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.89795506,
    "venue_count": 1,
    "avg_score": 0.89795506
  },
  {
    "id": "C134535813",
    "name": "Transcoding",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8635522,
    "venue_count": 1,
    "avg_score": 0.8635522
  },
  {
    "id": "C83260615",
    "name": "Mars Exploration Program",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5592042,
    "venue_count": 1,
    "avg_score": 0.5592042
  },
  {
    "id": "C87547467",
    "name": "Ice shelf",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.45163614,
    "venue_count": 1,
    "avg_score": 0.45163614
  },
  {
    "id": "C197435368",
    "name": "Cryosphere",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.23006219,
    "venue_count": 1,
    "avg_score": 0.23006219
  },
  {
    "id": "C106111739",
    "name": "Chamber music",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46205914,
    "venue_count": 1,
    "avg_score": 0.46205914
  },
  {
    "id": "C2778758847",
    "name": "Fireworks",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.9842204,
    "venue_count": 1,
    "avg_score": 0.9842204
  },
  {
    "id": "C126348684",
    "name": "Polymer science",
    "level": 1,
    "total_papers": 1,
    "total_score": 0.39916945,
    "venue_count": 1,
    "avg_score": 0.39916945
  },
  {
    "id": "C2776695710",
    "name": "Medicinal fungi",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.33475083,
    "venue_count": 1,
    "avg_score": 0.33475083
  },
  {
    "id": "C100817775",
    "name": "Polysaccharide",
    "level": 2,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C2868805",
    "name": "Imagination",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43802774,
    "venue_count": 1,
    "avg_score": 0.43802774
  },
  {
    "id": "C2777350023",
    "name": "Aura",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.95194405,
    "venue_count": 1,
    "avg_score": 0.95194405
  },
  {
    "id": "C59375849",
    "name": "COSMIC cancer database",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6767624,
    "venue_count": 1,
    "avg_score": 0.6767624
  },
  {
    "id": "C84999194",
    "name": "Universe",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6415018,
    "venue_count": 1,
    "avg_score": 0.6415018
  },
  {
    "id": "C117011727",
    "name": "Bit (key)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.77666295,
    "venue_count": 1,
    "avg_score": 0.77666295
  },
  {
    "id": "C161798024",
    "name": "Arctic ice pack",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.412799,
    "venue_count": 1,
    "avg_score": 0.412799
  },
  {
    "id": "C3019816032",
    "name": "Cancer treatment",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4261229,
    "venue_count": 1,
    "avg_score": 0.4261229
  },
  {
    "id": "C2776416436",
    "name": "Domino",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.76526713,
    "venue_count": 1,
    "avg_score": 0.76526713
  },
  {
    "id": "C161790260",
    "name": "Catalysis",
    "level": 2,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C2777106239",
    "name": "Sister",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7200769,
    "venue_count": 1,
    "avg_score": 0.7200769
  },
  {
    "id": "C89464430",
    "name": "Metastability",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4629318,
    "venue_count": 1,
    "avg_score": 0.4629318
  },
  {
    "id": "C179345059",
    "name": "Endangered species",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6206416,
    "venue_count": 1,
    "avg_score": 0.6206416
  },
  {
    "id": "C59430087",
    "name": "Film director",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.8425869,
    "venue_count": 1,
    "avg_score": 0.8425869
  },
  {
    "id": "C80191262",
    "name": "Fragility",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8281715,
    "venue_count": 1,
    "avg_score": 0.8281715
  },
  {
    "id": "C2778611045",
    "name": "Diaspora",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.53083414,
    "venue_count": 1,
    "avg_score": 0.53083414
  },
  {
    "id": "C2780986378",
    "name": "Idealization",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8515146,
    "venue_count": 1,
    "avg_score": 0.8515146
  },
  {
    "id": "C2776242748",
    "name": "Modernism (music)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7320059,
    "venue_count": 1,
    "avg_score": 0.7320059
  },
  {
    "id": "C2991937666",
    "name": "Citation database",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.4437066,
    "venue_count": 1,
    "avg_score": 0.4437066
  },
  {
    "id": "C526940114",
    "name": "Calligraphy",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.94506514,
    "venue_count": 1,
    "avg_score": 0.94506514
  },
  {
    "id": "C2778943297",
    "name": "Cursive",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.89823496,
    "venue_count": 1,
    "avg_score": 0.89823496
  },
  {
    "id": "C109693293",
    "name": "Inkwell",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6105655,
    "venue_count": 1,
    "avg_score": 0.6105655
  },
  {
    "id": "C2778611943",
    "name": "Pedestal",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.86286414,
    "venue_count": 1,
    "avg_score": 0.86286414
  },
  {
    "id": "C2779442300",
    "name": "Cohabitation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.60076785,
    "venue_count": 1,
    "avg_score": 0.60076785
  },
  {
    "id": "C2776937656",
    "name": "Nesting (process)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5922738,
    "venue_count": 1,
    "avg_score": 0.5922738
  },
  {
    "id": "C2992713299",
    "name": "Zero gravity",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5982542,
    "venue_count": 1,
    "avg_score": 0.5982542
  },
  {
    "id": "C66098623",
    "name": "Inflatable",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5806955,
    "venue_count": 1,
    "avg_score": 0.5806955
  },
  {
    "id": "C67101536",
    "name": "George (robot)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8315989,
    "venue_count": 1,
    "avg_score": 0.8315989
  },
  {
    "id": "C2777200700",
    "name": "Intentionality",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5378591,
    "venue_count": 1,
    "avg_score": 0.5378591
  },
  {
    "id": "C2984832160",
    "name": "Art gallery",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.51260227,
    "venue_count": 1,
    "avg_score": 0.51260227
  },
  {
    "id": "C53051483",
    "name": "Cube (algebra)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.77531517,
    "venue_count": 1,
    "avg_score": 0.77531517
  },
  {
    "id": "C2549261",
    "name": "Ethnology",
    "level": 1,
    "total_papers": 1,
    "total_score": 0.32457107,
    "venue_count": 1,
    "avg_score": 0.32457107
  },
  {
    "id": "C67715294",
    "name": "Wetland",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.72914493,
    "venue_count": 1,
    "avg_score": 0.72914493
  },
  {
    "id": "C64754055",
    "name": "Spatial contextual awareness",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.44441384,
    "venue_count": 1,
    "avg_score": 0.44441384
  },
  {
    "id": "C68389820",
    "name": "Filmmaking",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.99209493,
    "venue_count": 1,
    "avg_score": 0.99209493
  },
  {
    "id": "C512185932",
    "name": "Nucleotide",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.54962033,
    "venue_count": 1,
    "avg_score": 0.54962033
  },
  {
    "id": "C552990157",
    "name": "DNA",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4852357,
    "venue_count": 1,
    "avg_score": 0.4852357
  },
  {
    "id": "C526099995",
    "name": "Concert dance",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.44351405,
    "venue_count": 1,
    "avg_score": 0.44351405
  },
  {
    "id": "C515207424",
    "name": "Amino acid",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43658006,
    "venue_count": 1,
    "avg_score": 0.43658006
  },
  {
    "id": "C185581394",
    "name": "Base pair",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.42200932,
    "venue_count": 1,
    "avg_score": 0.42200932
  },
  {
    "id": "C2779742141",
    "name": "Spectacle",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7508638,
    "venue_count": 1,
    "avg_score": 0.7508638
  },
  {
    "id": "C21931767",
    "name": "Ukrainian",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46305916,
    "venue_count": 1,
    "avg_score": 0.46305916
  },
  {
    "id": "C2779714059",
    "name": "Trope (literature)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.93457526,
    "venue_count": 1,
    "avg_score": 0.93457526
  },
  {
    "id": "C175605896",
    "name": "Microorganism",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.7512175,
    "venue_count": 1,
    "avg_score": 0.7512175
  },
  {
    "id": "C178889773",
    "name": "Responsivity",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.67974675,
    "venue_count": 1,
    "avg_score": 0.67974675
  },
  {
    "id": "C101991246",
    "name": "Extinction (optical mineralogy)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7644248,
    "venue_count": 1,
    "avg_score": 0.7644248
  },
  {
    "id": "C3020528894",
    "name": "Graduate students",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46980104,
    "venue_count": 1,
    "avg_score": 0.46980104
  },
  {
    "id": "C2909489605",
    "name": "Graduate degree",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4442483,
    "venue_count": 1,
    "avg_score": 0.4442483
  },
  {
    "id": "C140713313",
    "name": "Pathos",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.96959317,
    "venue_count": 1,
    "avg_score": 0.96959317
  },
  {
    "id": "C2779580398",
    "name": "Positive affectivity",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.45871407,
    "venue_count": 1,
    "avg_score": 0.45871407
  },
  {
    "id": "C2776708433",
    "name": "Negative affectivity",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.19634014,
    "venue_count": 1,
    "avg_score": 0.19634014
  },
  {
    "id": "C46182478",
    "name": "Literal and figurative language",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8875898,
    "venue_count": 1,
    "avg_score": 0.8875898
  },
  {
    "id": "C207700645",
    "name": "Language arts",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4564209,
    "venue_count": 1,
    "avg_score": 0.4564209
  },
  {
    "id": "C74937081",
    "name": "Cultural neuroscience",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6352465,
    "venue_count": 1,
    "avg_score": 0.6352465
  },
  {
    "id": "C144218379",
    "name": "Materialism",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.584563,
    "venue_count": 1,
    "avg_score": 0.584563
  },
  {
    "id": "C187412358",
    "name": "Visual culture",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42373815,
    "venue_count": 1,
    "avg_score": 0.42373815
  },
  {
    "id": "C2777370761",
    "name": "Carving",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6715095,
    "venue_count": 1,
    "avg_score": 0.6715095
  },
  {
    "id": "C134757568",
    "name": "Heap (data structure)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6329241,
    "venue_count": 1,
    "avg_score": 0.6329241
  },
  {
    "id": "C2781063710",
    "name": "Altar",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.52976304,
    "venue_count": 1,
    "avg_score": 0.52976304
  },
  {
    "id": "C2993995501",
    "name": "Sustainable society",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.42541245,
    "venue_count": 1,
    "avg_score": 0.42541245
  },
  {
    "id": "C2776759703",
    "name": "Longevity",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7498182,
    "venue_count": 1,
    "avg_score": 0.7498182
  },
  {
    "id": "C181907467",
    "name": "Human services",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.50107,
    "venue_count": 1,
    "avg_score": 0.50107
  },
  {
    "id": "C118563197",
    "name": "Genius",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.82422996,
    "venue_count": 1,
    "avg_score": 0.82422996
  },
  {
    "id": "C2776181820",
    "name": "Formal learning",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5409414,
    "venue_count": 1,
    "avg_score": 0.5409414
  },
  {
    "id": "C140423589",
    "name": "Project governance",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41397634,
    "venue_count": 1,
    "avg_score": 0.41397634
  },
  {
    "id": "C3018397939",
    "name": "Open source",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.7106993,
    "venue_count": 1,
    "avg_score": 0.7106993
  },
  {
    "id": "C548595372",
    "name": "Open source hardware",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.6152373,
    "venue_count": 1,
    "avg_score": 0.6152373
  },
  {
    "id": "C2777834853",
    "name": "Liability",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5160534,
    "venue_count": 1,
    "avg_score": 0.5160534
  },
  {
    "id": "C2988343187",
    "name": "Open source software",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41569617,
    "venue_count": 1,
    "avg_score": 0.41569617
  },
  {
    "id": "C2777489824",
    "name": "Wicked problem",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.61152333,
    "venue_count": 1,
    "avg_score": 0.61152333
  },
  {
    "id": "C12481700",
    "name": "Iceberg",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.48257414,
    "venue_count": 1,
    "avg_score": 0.48257414
  },
  {
    "id": "C3019360443",
    "name": "Degree program",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41979778,
    "venue_count": 1,
    "avg_score": 0.41979778
  },
  {
    "id": "C2781256697",
    "name": "Report card",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41786015,
    "venue_count": 1,
    "avg_score": 0.41786015
  },
  {
    "id": "C2777508537",
    "name": "Visual reasoning",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6888434,
    "venue_count": 1,
    "avg_score": 0.6888434
  },
  {
    "id": "C173560066",
    "name": "Interior design",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.789505,
    "venue_count": 1,
    "avg_score": 0.789505
  },
  {
    "id": "C2777103068",
    "name": "Space syntax",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.55265075,
    "venue_count": 1,
    "avg_score": 0.55265075
  },
  {
    "id": "C71116409",
    "name": "Landscape planning",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.44654775,
    "venue_count": 1,
    "avg_score": 0.44654775
  },
  {
    "id": "C2778063263",
    "name": "Lipstick",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6599181,
    "venue_count": 1,
    "avg_score": 0.6599181
  },
  {
    "id": "C160756335",
    "name": "Biosensor",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.53200346,
    "venue_count": 1,
    "avg_score": 0.53200346
  },
  {
    "id": "C183696295",
    "name": "Biochemical engineering",
    "level": 1,
    "total_papers": 1,
    "total_score": 0.34860727,
    "venue_count": 1,
    "avg_score": 0.34860727
  },
  {
    "id": "C3019207227",
    "name": "Human life",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.43258977,
    "venue_count": 1,
    "avg_score": 0.43258977
  },
  {
    "id": "C3020699964",
    "name": "Picture books",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4604339,
    "venue_count": 1,
    "avg_score": 0.4604339
  },
  {
    "id": "C2780966802",
    "name": "Book design",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42568287,
    "venue_count": 1,
    "avg_score": 0.42568287
  },
  {
    "id": "C191628500",
    "name": "Knowledge value chain",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.42140114,
    "venue_count": 1,
    "avg_score": 0.42140114
  },
  {
    "id": "C169735623",
    "name": "Organizational learning",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.21032643,
    "venue_count": 1,
    "avg_score": 0.21032643
  },
  {
    "id": "C2779816988",
    "name": "Abandonment (legal)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.48224553,
    "venue_count": 1,
    "avg_score": 0.48224553
  },
  {
    "id": "C161677786",
    "name": "Neighbourhood (mathematics)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8999713,
    "venue_count": 1,
    "avg_score": 0.8999713
  },
  {
    "id": "C148803439",
    "name": "Built environment",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42435002,
    "venue_count": 1,
    "avg_score": 0.42435002
  },
  {
    "id": "C2775854623",
    "name": "Community design",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41640702,
    "venue_count": 1,
    "avg_score": 0.41640702
  },
  {
    "id": "C2776770324",
    "name": "Sustainable consumption",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.50942785,
    "venue_count": 1,
    "avg_score": 0.50942785
  },
  {
    "id": "C21905920",
    "name": "Incubator",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.59538984,
    "venue_count": 1,
    "avg_score": 0.59538984
  },
  {
    "id": "C104304963",
    "name": "Durability",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.880998,
    "venue_count": 1,
    "avg_score": 0.880998
  },
  {
    "id": "C2780210234",
    "name": "Action plan",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.57813585,
    "venue_count": 1,
    "avg_score": 0.57813585
  },
  {
    "id": "C2986124960",
    "name": "User centred design",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.42950368,
    "venue_count": 1,
    "avg_score": 0.42950368
  },
  {
    "id": "C2984866010",
    "name": "Public space",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5532107,
    "venue_count": 1,
    "avg_score": 0.5532107
  },
  {
    "id": "C522602180",
    "name": "Neon",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.625985,
    "venue_count": 1,
    "avg_score": 0.625985
  },
  {
    "id": "C184779094",
    "name": "Atomic physics",
    "level": 1,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C547737533",
    "name": "Argon",
    "level": 2,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C2778189456",
    "name": "Appreciative inquiry",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45968813,
    "venue_count": 1,
    "avg_score": 0.45968813
  },
  {
    "id": "C109574028",
    "name": "Behavioral economics",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.64499086,
    "venue_count": 1,
    "avg_score": 0.64499086
  },
  {
    "id": "C2993770480",
    "name": "Behavioural economics",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5900986,
    "venue_count": 1,
    "avg_score": 0.5900986
  },
  {
    "id": "C2779599953",
    "name": "Ripple",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6029393,
    "venue_count": 1,
    "avg_score": 0.6029393
  },
  {
    "id": "C3019940508",
    "name": "Perceived quality",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.44411576,
    "venue_count": 1,
    "avg_score": 0.44411576
  },
  {
    "id": "C69721887",
    "name": "FLAGS register",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7912267,
    "venue_count": 1,
    "avg_score": 0.7912267
  },
  {
    "id": "C192328126",
    "name": "Schematic",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.80981106,
    "venue_count": 1,
    "avg_score": 0.80981106
  },
  {
    "id": "C191908910",
    "name": "Synthetic biology",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.62232035,
    "venue_count": 1,
    "avg_score": 0.62232035
  },
  {
    "id": "C165062768",
    "name": "Biomimetics",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.9065127,
    "venue_count": 1,
    "avg_score": 0.9065127
  },
  {
    "id": "C127040729",
    "name": "Megacity",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8080792,
    "venue_count": 1,
    "avg_score": 0.8080792
  },
  {
    "id": "C2779104420",
    "name": "Statue",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.83979905,
    "venue_count": 1,
    "avg_score": 0.83979905
  },
  {
    "id": "C501303744",
    "name": "Iconography",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.79931617,
    "venue_count": 1,
    "avg_score": 0.79931617
  },
  {
    "id": "C3018906133",
    "name": "Partially sighted",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.46707538,
    "venue_count": 1,
    "avg_score": 0.46707538
  },
  {
    "id": "C20162079",
    "name": "Case-based reasoning",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4148308,
    "venue_count": 1,
    "avg_score": 0.4148308
  },
  {
    "id": "C85308350",
    "name": "Design structure matrix",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5027783,
    "venue_count": 1,
    "avg_score": 0.5027783
  },
  {
    "id": "C91485673",
    "name": "Design review (U.S. government)",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41299456,
    "venue_count": 1,
    "avg_score": 0.41299456
  },
  {
    "id": "C526771534",
    "name": "Product testing",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.09533948,
    "venue_count": 1,
    "avg_score": 0.09533948
  },
  {
    "id": "C2777346333",
    "name": "Temporalities",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6391782,
    "venue_count": 1,
    "avg_score": 0.6391782
  },
  {
    "id": "C2777869788",
    "name": "Biocomposite",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5029039,
    "venue_count": 1,
    "avg_score": 0.5029039
  },
  {
    "id": "C104779481",
    "name": "Composite number",
    "level": 2,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C2988083511",
    "name": "Furniture industry",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42470092,
    "venue_count": 1,
    "avg_score": 0.42470092
  },
  {
    "id": "C2779056813",
    "name": "Amusement",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.74658585,
    "venue_count": 1,
    "avg_score": 0.74658585
  },
  {
    "id": "C107806365",
    "name": "Apprenticeship",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5536363,
    "venue_count": 1,
    "avg_score": 0.5536363
  },
  {
    "id": "C199561411",
    "name": "Lean software development",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.7077506,
    "venue_count": 1,
    "avg_score": 0.7077506
  },
  {
    "id": "C135475081",
    "name": "Requirement",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.45329684,
    "venue_count": 1,
    "avg_score": 0.45329684
  },
  {
    "id": "C138147947",
    "name": "Declaration",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6229021,
    "venue_count": 1,
    "avg_score": 0.6229021
  },
  {
    "id": "C37091826",
    "name": "cons",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.9828665,
    "venue_count": 1,
    "avg_score": 0.9828665
  },
  {
    "id": "C2988516024",
    "name": "Life span",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.57248,
    "venue_count": 1,
    "avg_score": 0.57248
  },
  {
    "id": "C81369262",
    "name": "Achievement test",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41790748,
    "venue_count": 1,
    "avg_score": 0.41790748
  },
  {
    "id": "C203151758",
    "name": "Standardized test",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.20279896,
    "venue_count": 1,
    "avg_score": 0.20279896
  },
  {
    "id": "C2780371621",
    "name": "Disconnection",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6770154,
    "venue_count": 1,
    "avg_score": 0.6770154
  },
  {
    "id": "C113238511",
    "name": "k-nearest neighbors algorithm",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45322025,
    "venue_count": 1,
    "avg_score": 0.45322025
  },
  {
    "id": "C13743948",
    "name": "Web crawler",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.86424756,
    "venue_count": 1,
    "avg_score": 0.86424756
  },
  {
    "id": "C46721378",
    "name": "Deep Web",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.7126026,
    "venue_count": 1,
    "avg_score": 0.7126026
  },
  {
    "id": "C73340581",
    "name": "Focused crawler",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.47659346,
    "venue_count": 1,
    "avg_score": 0.47659346
  },
  {
    "id": "C173576120",
    "name": "Static web page",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.1641253,
    "venue_count": 1,
    "avg_score": 0.1641253
  },
  {
    "id": "C2779786715",
    "name": "Discovery learning",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.47556037,
    "venue_count": 1,
    "avg_score": 0.47556037
  },
  {
    "id": "C55904794",
    "name": "Redox",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4307791,
    "venue_count": 1,
    "avg_score": 0.4307791
  },
  {
    "id": "C2985362895",
    "name": "Reputation management",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.7082163,
    "venue_count": 1,
    "avg_score": 0.7082163
  },
  {
    "id": "C2781218421",
    "name": "Reputation system",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.46390057,
    "venue_count": 1,
    "avg_score": 0.46390057
  },
  {
    "id": "C2776342725",
    "name": "Practicum",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8493456,
    "venue_count": 1,
    "avg_score": 0.8493456
  },
  {
    "id": "C2777222677",
    "name": "Worship",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8327608,
    "venue_count": 1,
    "avg_score": 0.8327608
  },
  {
    "id": "C2992496598",
    "name": "Marketing communication",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.51210856,
    "venue_count": 1,
    "avg_score": 0.51210856
  },
  {
    "id": "C48891531",
    "name": "Marketing research",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4674792,
    "venue_count": 1,
    "avg_score": 0.4674792
  },
  {
    "id": "C39453970",
    "name": "Return on marketing investment",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.43514165,
    "venue_count": 1,
    "avg_score": 0.43514165
  },
  {
    "id": "C93032411",
    "name": "Marketing strategy",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41679364,
    "venue_count": 1,
    "avg_score": 0.41679364
  },
  {
    "id": "C2777351069",
    "name": "Character education",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.54113746,
    "venue_count": 1,
    "avg_score": 0.54113746
  },
  {
    "id": "C10511746",
    "name": "Data security",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4847457,
    "venue_count": 1,
    "avg_score": 0.4847457
  },
  {
    "id": "C2777004525",
    "name": "Higher-order thinking",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.5877749,
    "venue_count": 1,
    "avg_score": 0.5877749
  },
  {
    "id": "C106165879",
    "name": "Cognitively Guided Instruction",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.24128875,
    "venue_count": 1,
    "avg_score": 0.24128875
  },
  {
    "id": "C2986378755",
    "name": "English as a foreign language",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46221086,
    "venue_count": 1,
    "avg_score": 0.46221086
  },
  {
    "id": "C2992478610",
    "name": "Academic institution",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45996505,
    "venue_count": 1,
    "avg_score": 0.45996505
  },
  {
    "id": "C3019723476",
    "name": "Electronic learning",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.42024428,
    "venue_count": 1,
    "avg_score": 0.42024428
  },
  {
    "id": "C129848803",
    "name": "Sample size determination",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.58720034,
    "venue_count": 1,
    "avg_score": 0.58720034
  },
  {
    "id": "C43141900",
    "name": "Environmental education",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.79133946,
    "venue_count": 1,
    "avg_score": 0.79133946
  },
  {
    "id": "C2777072894",
    "name": "Asynchronous learning",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.54947203,
    "venue_count": 1,
    "avg_score": 0.54947203
  },
  {
    "id": "C2779510800",
    "name": "Smart meter",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.56203586,
    "venue_count": 1,
    "avg_score": 0.56203586
  },
  {
    "id": "C67172668",
    "name": "Electricity meter",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5135529,
    "venue_count": 1,
    "avg_score": 0.5135529
  },
  {
    "id": "C40293303",
    "name": "Electric power",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4101789,
    "venue_count": 1,
    "avg_score": 0.4101789
  },
  {
    "id": "C190526755",
    "name": "Ad hoc wireless distribution service",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.53965044,
    "venue_count": 1,
    "avg_score": 0.53965044
  },
  {
    "id": "C91280400",
    "name": "Mobile ad hoc network",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4987898,
    "venue_count": 1,
    "avg_score": 0.4987898
  },
  {
    "id": "C189884158",
    "name": "Zone Routing Protocol",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.49610004,
    "venue_count": 1,
    "avg_score": 0.49610004
  },
  {
    "id": "C58801604",
    "name": "Elementary mathematics",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41696775,
    "venue_count": 1,
    "avg_score": 0.41696775
  },
  {
    "id": "C25906391",
    "name": "Hop (telecommunications)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.48510325,
    "venue_count": 1,
    "avg_score": 0.48510325
  },
  {
    "id": "C42133412",
    "name": "Adventure",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7256528,
    "venue_count": 1,
    "avg_score": 0.7256528
  },
  {
    "id": "C50773583",
    "name": "Physics education",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6418776,
    "venue_count": 1,
    "avg_score": 0.6418776
  },
  {
    "id": "C81587630",
    "name": "Dynamical simulation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4386504,
    "venue_count": 1,
    "avg_score": 0.4386504
  },
  {
    "id": "C27438332",
    "name": "Principal component analysis",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42623553,
    "venue_count": 1,
    "avg_score": 0.42623553
  },
  {
    "id": "C17426736",
    "name": "Histogram of oriented gradients",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.4201035,
    "venue_count": 1,
    "avg_score": 0.4201035
  },
  {
    "id": "C2780530410",
    "name": "Credentialing",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.58726066,
    "venue_count": 1,
    "avg_score": 0.58726066
  },
  {
    "id": "C64016661",
    "name": "Turbidity",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.49263388,
    "venue_count": 1,
    "avg_score": 0.49263388
  },
  {
    "id": "C539469273",
    "name": "Environmental monitoring",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46286234,
    "venue_count": 1,
    "avg_score": 0.46286234
  },
  {
    "id": "C2776902269",
    "name": "Continuous monitoring",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45031336,
    "venue_count": 1,
    "avg_score": 0.45031336
  },
  {
    "id": "C2780797713",
    "name": "Water quality",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42721003,
    "venue_count": 1,
    "avg_score": 0.42721003
  },
  {
    "id": "C204222849",
    "name": "Radio-frequency identification",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.70854473,
    "venue_count": 1,
    "avg_score": 0.70854473
  },
  {
    "id": "C2778631480",
    "name": "Research Object",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.53267443,
    "venue_count": 1,
    "avg_score": 0.53267443
  },
  {
    "id": "C166007726",
    "name": "Language assessment",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46172848,
    "venue_count": 1,
    "avg_score": 0.46172848
  },
  {
    "id": "C2780333494",
    "name": "Service-learning",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.65984195,
    "venue_count": 1,
    "avg_score": 0.65984195
  },
  {
    "id": "C171115542",
    "name": "Software-defined radio",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.78346133,
    "venue_count": 1,
    "avg_score": 0.78346133
  },
  {
    "id": "C101765175",
    "name": "Communications system",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.50156856,
    "venue_count": 1,
    "avg_score": 0.50156856
  },
  {
    "id": "C521751864",
    "name": "Christian ministry",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.57130885,
    "venue_count": 1,
    "avg_score": 0.57130885
  },
  {
    "id": "C77265313",
    "name": "Rest (music)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.48459637,
    "venue_count": 1,
    "avg_score": 0.48459637
  },
  {
    "id": "C91417265",
    "name": "Sport management",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4272198,
    "venue_count": 1,
    "avg_score": 0.4272198
  },
  {
    "id": "C2780907237",
    "name": "Plagiarism detection",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.51190245,
    "venue_count": 1,
    "avg_score": 0.51190245
  },
  {
    "id": "C85031952",
    "name": "Normality test",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6265221,
    "venue_count": 1,
    "avg_score": 0.6265221
  },
  {
    "id": "C87007009",
    "name": "Statistical hypothesis testing",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41864097,
    "venue_count": 1,
    "avg_score": 0.41864097
  },
  {
    "id": "C2781236532",
    "name": "Virtual campus",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.48215267,
    "venue_count": 1,
    "avg_score": 0.48215267
  },
  {
    "id": "C52837422",
    "name": "Interior gateway protocol",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.4507057,
    "venue_count": 1,
    "avg_score": 0.4507057
  },
  {
    "id": "C134652429",
    "name": "Jitter",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.447171,
    "venue_count": 1,
    "avg_score": 0.447171
  },
  {
    "id": "C4305246",
    "name": "Least significant bit",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.9586586,
    "venue_count": 1,
    "avg_score": 0.9586586
  },
  {
    "id": "C43364308",
    "name": "Byte",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.67245483,
    "venue_count": 1,
    "avg_score": 0.67245483
  },
  {
    "id": "C134765980",
    "name": "Bitwise operation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.60905033,
    "venue_count": 1,
    "avg_score": 0.60905033
  },
  {
    "id": "C78201319",
    "name": "Grayscale",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5579288,
    "venue_count": 1,
    "avg_score": 0.5579288
  },
  {
    "id": "C42781572",
    "name": "Digital image",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.42853794,
    "venue_count": 1,
    "avg_score": 0.42853794
  },
  {
    "id": "C2778915428",
    "name": "Perceived organizational support",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4782823,
    "venue_count": 1,
    "avg_score": 0.4782823
  },
  {
    "id": "C127882809",
    "name": "Anemometer",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.75717276,
    "venue_count": 1,
    "avg_score": 0.75717276
  },
  {
    "id": "C110593043",
    "name": "Real-time data",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.54563946,
    "venue_count": 1,
    "avg_score": 0.54563946
  },
  {
    "id": "C161067210",
    "name": "Wind speed",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.48059034,
    "venue_count": 1,
    "avg_score": 0.48059034
  },
  {
    "id": "C74763872",
    "name": "Digital sensors",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.44035056,
    "venue_count": 1,
    "avg_score": 0.44035056
  },
  {
    "id": "C75779659",
    "name": "Municipal solid waste",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5540534,
    "venue_count": 1,
    "avg_score": 0.5540534
  },
  {
    "id": "C521786372",
    "name": "Waste collection",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41387153,
    "venue_count": 1,
    "avg_score": 0.41387153
  },
  {
    "id": "C2780732545",
    "name": "Response to intervention",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.45194957,
    "venue_count": 1,
    "avg_score": 0.45194957
  },
  {
    "id": "C176734034",
    "name": "Worksheet",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.993042,
    "venue_count": 1,
    "avg_score": 0.993042
  },
  {
    "id": "C2776089186",
    "name": "Lesson study",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41838476,
    "venue_count": 1,
    "avg_score": 0.41838476
  },
  {
    "id": "C2777301881",
    "name": "Multicultural education",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.7023598,
    "venue_count": 1,
    "avg_score": 0.7023598
  },
  {
    "id": "C2993223162",
    "name": "Social harmony",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.49305436,
    "venue_count": 1,
    "avg_score": 0.49305436
  },
  {
    "id": "C2780304933",
    "name": "Cultural pluralism",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42246926,
    "venue_count": 1,
    "avg_score": 0.42246926
  },
  {
    "id": "C512993513",
    "name": "Chassis",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.520676,
    "venue_count": 1,
    "avg_score": 0.520676
  },
  {
    "id": "C29001434",
    "name": "Trigonometry",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.47793368,
    "venue_count": 1,
    "avg_score": 0.47793368
  },
  {
    "id": "C2776716048",
    "name": "Interactive Learning",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45259336,
    "venue_count": 1,
    "avg_score": 0.45259336
  },
  {
    "id": "C2778357586",
    "name": "Toilet",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45439342,
    "venue_count": 1,
    "avg_score": 0.45439342
  },
  {
    "id": "C99753626",
    "name": "Employee engagement",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.59976697,
    "venue_count": 1,
    "avg_score": 0.59976697
  },
  {
    "id": "C2780896845",
    "name": "Authentic learning",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5365244,
    "venue_count": 1,
    "avg_score": 0.5365244
  },
  {
    "id": "C71406770",
    "name": "Physical education",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5290909,
    "venue_count": 1,
    "avg_score": 0.5290909
  },
  {
    "id": "C171981572",
    "name": "Software analytics",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.58493674,
    "venue_count": 1,
    "avg_score": 0.58493674
  },
  {
    "id": "C37374048",
    "name": "Programmable logic controller",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.841132,
    "venue_count": 1,
    "avg_score": 0.841132
  },
  {
    "id": "C206274596",
    "name": "Programmable logic device",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.47881323,
    "venue_count": 1,
    "avg_score": 0.47881323
  },
  {
    "id": "C34370810",
    "name": "Simple programmable logic device",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.47602633,
    "venue_count": 1,
    "avg_score": 0.47602633
  },
  {
    "id": "C131017901",
    "name": "Logic gate",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.31720915,
    "venue_count": 1,
    "avg_score": 0.31720915
  },
  {
    "id": "C157922185",
    "name": "Logic synthesis",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.23687774,
    "venue_count": 1,
    "avg_score": 0.23687774
  },
  {
    "id": "C162454741",
    "name": "Logic family",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.11394593,
    "venue_count": 1,
    "avg_score": 0.11394593
  },
  {
    "id": "C15302153",
    "name": "Employability",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7966988,
    "venue_count": 1,
    "avg_score": 0.7966988
  },
  {
    "id": "C2778883600",
    "name": "Language proficiency",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5036933,
    "venue_count": 1,
    "avg_score": 0.5036933
  },
  {
    "id": "C110406131",
    "name": "Smart card",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43637034,
    "venue_count": 1,
    "avg_score": 0.43637034
  },
  {
    "id": "C533803919",
    "name": "Dengue fever",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.70886993,
    "venue_count": 1,
    "avg_score": 0.70886993
  },
  {
    "id": "C77270119",
    "name": "Software-defined networking",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.70575154,
    "venue_count": 1,
    "avg_score": 0.70575154
  },
  {
    "id": "C200789330",
    "name": "Network Functions Virtualization",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.66005343,
    "venue_count": 1,
    "avg_score": 0.66005343
  },
  {
    "id": "C2779898492",
    "name": "Network virtualization",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.5207491,
    "venue_count": 1,
    "avg_score": 0.5207491
  },
  {
    "id": "C2776818353",
    "name": "Apraxia",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.43980187,
    "venue_count": 1,
    "avg_score": 0.43980187
  },
  {
    "id": "C70153297",
    "name": "Gradient boosting",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.73277205,
    "venue_count": 1,
    "avg_score": 0.73277205
  },
  {
    "id": "C20636137",
    "name": "User Datagram Protocol",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.5313113,
    "venue_count": 1,
    "avg_score": 0.5313113
  },
  {
    "id": "C152298349",
    "name": "Datagram",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5260972,
    "venue_count": 1,
    "avg_score": 0.5260972
  },
  {
    "id": "C2987419075",
    "name": "Traffic signal",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5201179,
    "venue_count": 1,
    "avg_score": 0.5201179
  },
  {
    "id": "C2985695025",
    "name": "Road traffic",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42167625,
    "venue_count": 1,
    "avg_score": 0.42167625
  },
  {
    "id": "C173736775",
    "name": "Drill",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.63947463,
    "venue_count": 1,
    "avg_score": 0.63947463
  },
  {
    "id": "C2778048005",
    "name": "Technology integration",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4564552,
    "venue_count": 1,
    "avg_score": 0.4564552
  },
  {
    "id": "C3018591125",
    "name": "Kuala lumpur",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.59947366,
    "venue_count": 1,
    "avg_score": 0.59947366
  },
  {
    "id": "C2988115150",
    "name": "Communication skills",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5875893,
    "venue_count": 1,
    "avg_score": 0.5875893
  },
  {
    "id": "C2778598016",
    "name": "Code-mixing",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.87987846,
    "venue_count": 1,
    "avg_score": 0.87987846
  },
  {
    "id": "C2780564542",
    "name": "Hydrogen sulfide",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.42819372,
    "venue_count": 1,
    "avg_score": 0.42819372
  },
  {
    "id": "C518881349",
    "name": "Sulfur",
    "level": 2,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C52003472",
    "name": "C4.5 algorithm",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.9290169,
    "venue_count": 1,
    "avg_score": 0.9290169
  },
  {
    "id": "C547231352",
    "name": "Technology education",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46211556,
    "venue_count": 1,
    "avg_score": 0.46211556
  },
  {
    "id": "C53537400",
    "name": "Numeracy",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.9775243,
    "venue_count": 1,
    "avg_score": 0.9775243
  },
  {
    "id": "C178350159",
    "name": "Credit risk",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.44570222,
    "venue_count": 1,
    "avg_score": 0.44570222
  },
  {
    "id": "C117387248",
    "name": "Private network",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8815738,
    "venue_count": 1,
    "avg_score": 0.8815738
  },
  {
    "id": "C67396069",
    "name": "IPsec",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.67627966,
    "venue_count": 1,
    "avg_score": 0.67627966
  },
  {
    "id": "C146739243",
    "name": "Internet layer",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.47469944,
    "venue_count": 1,
    "avg_score": 0.47469944
  },
  {
    "id": "C76885553",
    "name": "Tunneling protocol",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.44276616,
    "venue_count": 1,
    "avg_score": 0.44276616
  },
  {
    "id": "C66862320",
    "name": "Building information modeling",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.625214,
    "venue_count": 1,
    "avg_score": 0.625214
  },
  {
    "id": "C57042500",
    "name": "Milgram experiment",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.7914467,
    "venue_count": 1,
    "avg_score": 0.7914467
  },
  {
    "id": "C179958297",
    "name": "Obedience",
    "level": 2,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C2779370443",
    "name": "Surgical planning",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7637805,
    "venue_count": 1,
    "avg_score": 0.7637805
  },
  {
    "id": "C3019477240",
    "name": "Invasive surgery",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.50003123,
    "venue_count": 1,
    "avg_score": 0.50003123
  },
  {
    "id": "C3018700120",
    "name": "Surgical team",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4631979,
    "venue_count": 1,
    "avg_score": 0.4631979
  },
  {
    "id": "C2779813694",
    "name": "Digital identity",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.63118565,
    "venue_count": 1,
    "avg_score": 0.63118565
  },
  {
    "id": "C20253421",
    "name": "Body language",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43613604,
    "venue_count": 1,
    "avg_score": 0.43613604
  },
  {
    "id": "C139458680",
    "name": "Interoperation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.463985,
    "venue_count": 1,
    "avg_score": 0.463985
  },
  {
    "id": "C503897019",
    "name": "Medical simulation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5414351,
    "venue_count": 1,
    "avg_score": 0.5414351
  },
  {
    "id": "C2780315633",
    "name": "Whiteboard",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4983914,
    "venue_count": 1,
    "avg_score": 0.4983914
  },
  {
    "id": "C2777976496",
    "name": "Public participation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.455415,
    "venue_count": 1,
    "avg_score": 0.455415
  },
  {
    "id": "C2994186709",
    "name": "Palliative care",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6358083,
    "venue_count": 1,
    "avg_score": 0.6358083
  },
  {
    "id": "C2910053781",
    "name": "Relaxation Therapy",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6343491,
    "venue_count": 1,
    "avg_score": 0.6343491
  },
  {
    "id": "C2780233487",
    "name": "Long-term care",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.54251796,
    "venue_count": 1,
    "avg_score": 0.54251796
  },
  {
    "id": "C2780820201",
    "name": "Analgesic",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7162932,
    "venue_count": 1,
    "avg_score": 0.7162932
  },
  {
    "id": "C3019879682",
    "name": "Burn wound",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.66693395,
    "venue_count": 1,
    "avg_score": 0.66693395
  },
  {
    "id": "C2777438270",
    "name": "Debridement (dental)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5540954,
    "venue_count": 1,
    "avg_score": 0.5540954
  },
  {
    "id": "C2993807428",
    "name": "Wound care",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.53214854,
    "venue_count": 1,
    "avg_score": 0.53214854
  },
  {
    "id": "C2776782833",
    "name": "Total body surface area",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41683072,
    "venue_count": 1,
    "avg_score": 0.41683072
  },
  {
    "id": "C2780269544",
    "name": "Wound healing",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.34991664,
    "venue_count": 1,
    "avg_score": 0.34991664
  },
  {
    "id": "C182025440",
    "name": "Maladaptation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.69950426,
    "venue_count": 1,
    "avg_score": 0.69950426
  },
  {
    "id": "C2779522443",
    "name": "UCLA Loneliness Scale",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.46323037,
    "venue_count": 1,
    "avg_score": 0.46323037
  },
  {
    "id": "C2778120072",
    "name": "Aside",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45518914,
    "venue_count": 1,
    "avg_score": 0.45518914
  },
  {
    "id": "C2777596629",
    "name": "Inclusion and exclusion criteria",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6129497,
    "venue_count": 1,
    "avg_score": 0.6129497
  },
  {
    "id": "C28804328",
    "name": "Strictly standardized mean difference",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.43490282,
    "venue_count": 1,
    "avg_score": 0.43490282
  },
  {
    "id": "C89798072",
    "name": "Wechsler Adult Intelligence Scale",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5497617,
    "venue_count": 1,
    "avg_score": 0.5497617
  },
  {
    "id": "C103378370",
    "name": "Neuroanatomy",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5593488,
    "venue_count": 1,
    "avg_score": 0.5593488
  },
  {
    "id": "C56694532",
    "name": "Turns, rounds and time-keeping systems in games",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.42438102,
    "venue_count": 1,
    "avg_score": 0.42438102
  },
  {
    "id": "C143998085",
    "name": "Oncology",
    "level": 1,
    "total_papers": 1,
    "total_score": 0.34835154,
    "venue_count": 1,
    "avg_score": 0.34835154
  },
  {
    "id": "C22237779",
    "name": "Body schema",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.70124835,
    "venue_count": 1,
    "avg_score": 0.70124835
  },
  {
    "id": "C68867621",
    "name": "Mental rotation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.7062506,
    "venue_count": 1,
    "avg_score": 0.7062506
  },
  {
    "id": "C2777353892",
    "name": "Profile of mood states",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.45707732,
    "venue_count": 1,
    "avg_score": 0.45707732
  },
  {
    "id": "C2780915742",
    "name": "Participatory planning",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5323437,
    "venue_count": 1,
    "avg_score": 0.5323437
  },
  {
    "id": "C23690007",
    "name": "Radiance",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6478204,
    "venue_count": 1,
    "avg_score": 0.6478204
  },
  {
    "id": "C125287762",
    "name": "Absorption (acoustics)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.57210237,
    "venue_count": 1,
    "avg_score": 0.57210237
  },
  {
    "id": "C33191230",
    "name": "Face validity",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.7182686,
    "venue_count": 1,
    "avg_score": 0.7182686
  },
  {
    "id": "C182050348",
    "name": "Criterion validity",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.46671742,
    "venue_count": 1,
    "avg_score": 0.46671742
  },
  {
    "id": "C103189561",
    "name": "Basketball",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4108274,
    "venue_count": 1,
    "avg_score": 0.4108274
  },
  {
    "id": "C2989506057",
    "name": "Traffic accident",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4909275,
    "venue_count": 1,
    "avg_score": 0.4909275
  },
  {
    "id": "C2780289543",
    "name": "Accident (philosophy)",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46810198,
    "venue_count": 1,
    "avg_score": 0.46810198
  },
  {
    "id": "C2779386606",
    "name": "Handwriting",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.83604836,
    "venue_count": 1,
    "avg_score": 0.83604836
  },
  {
    "id": "C60627051",
    "name": "Body shape",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4819693,
    "venue_count": 1,
    "avg_score": 0.4819693
  },
  {
    "id": "C109950114",
    "name": "3D reconstruction",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6177288,
    "venue_count": 1,
    "avg_score": 0.6177288
  },
  {
    "id": "C117455697",
    "name": "Photogrammetry",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4663659,
    "venue_count": 1,
    "avg_score": 0.4663659
  },
  {
    "id": "C2776509080",
    "name": "Apathy",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.42053452,
    "venue_count": 1,
    "avg_score": 0.42053452
  },
  {
    "id": "C2777127095",
    "name": "Phobias",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.93953073,
    "venue_count": 1,
    "avg_score": 0.93953073
  },
  {
    "id": "C29760336",
    "name": "Site plan",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.44324362,
    "venue_count": 1,
    "avg_score": 0.44324362
  },
  {
    "id": "C1631582",
    "name": "Regional planning",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.15489799,
    "venue_count": 1,
    "avg_score": 0.15489799
  },
  {
    "id": "C129564537",
    "name": "Neural correlates of consciousness",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.47315654,
    "venue_count": 1,
    "avg_score": 0.47315654
  },
  {
    "id": "C103734657",
    "name": "PESQ",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.6761316,
    "venue_count": 1,
    "avg_score": 0.6761316
  },
  {
    "id": "C501888929",
    "name": "Group psychotherapy",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45784137,
    "venue_count": 1,
    "avg_score": 0.45784137
  },
  {
    "id": "C7218915",
    "name": "Gaussian function",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41506833,
    "venue_count": 1,
    "avg_score": 0.41506833
  },
  {
    "id": "C2778533338",
    "name": "Virtual patient",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.64924055,
    "venue_count": 1,
    "avg_score": 0.64924055
  },
  {
    "id": "C54183767",
    "name": "Geriatrics",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5310438,
    "venue_count": 1,
    "avg_score": 0.5310438
  },
  {
    "id": "C174183944",
    "name": "MIT License",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.42857552,
    "venue_count": 1,
    "avg_score": 0.42857552
  },
  {
    "id": "C71039073",
    "name": "Surface finish",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4459546,
    "venue_count": 1,
    "avg_score": 0.4459546
  },
  {
    "id": "C2987654038",
    "name": "Tactile stimuli",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4174438,
    "venue_count": 1,
    "avg_score": 0.4174438
  },
  {
    "id": "C2781151872",
    "name": "Laboratory safety",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5632644,
    "venue_count": 1,
    "avg_score": 0.5632644
  },
  {
    "id": "C2989005",
    "name": "Nuclear medicine",
    "level": 1,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C535046627",
    "name": "Clinical trial",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5077146,
    "venue_count": 1,
    "avg_score": 0.5077146
  },
  {
    "id": "C2780992000",
    "name": "Generator (circuit theory)",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4731808,
    "venue_count": 1,
    "avg_score": 0.4731808
  },
  {
    "id": "C2778513438",
    "name": "Slow motion",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.44641507,
    "venue_count": 1,
    "avg_score": 0.44641507
  },
  {
    "id": "C106399304",
    "name": "Snowball sampling",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.67495185,
    "venue_count": 1,
    "avg_score": 0.67495185
  },
  {
    "id": "C2778228783",
    "name": "Asperger syndrome",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.58881086,
    "venue_count": 1,
    "avg_score": 0.58881086
  },
  {
    "id": "C2776821462",
    "name": "Cane",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.9120636,
    "venue_count": 1,
    "avg_score": 0.9120636
  },
  {
    "id": "C2777108408",
    "name": "Sugar",
    "level": 2,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C2781440851",
    "name": "Parliament",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.43590856,
    "venue_count": 1,
    "avg_score": 0.43590856
  },
  {
    "id": "C2779524336",
    "name": "Saccade",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6667157,
    "venue_count": 1,
    "avg_score": 0.6667157
  },
  {
    "id": "C2776230583",
    "name": "Spoken language",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4823922,
    "venue_count": 1,
    "avg_score": 0.4823922
  },
  {
    "id": "C155092808",
    "name": "Computational linguistics",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41801584,
    "venue_count": 1,
    "avg_score": 0.41801584
  },
  {
    "id": "C35512512",
    "name": "Translation studies",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41277102,
    "venue_count": 1,
    "avg_score": 0.41277102
  },
  {
    "id": "C37129596",
    "name": "Social mobility",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4124116,
    "venue_count": 1,
    "avg_score": 0.4124116
  },
  {
    "id": "C42989059",
    "name": "Web testing",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.44394928,
    "venue_count": 1,
    "avg_score": 0.44394928
  },
  {
    "id": "C109086967",
    "name": "Test script",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.43217948,
    "venue_count": 1,
    "avg_score": 0.43217948
  },
  {
    "id": "C128942645",
    "name": "Test case",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.31618986,
    "venue_count": 1,
    "avg_score": 0.31618986
  },
  {
    "id": "C2780957641",
    "name": "Spell",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7742005,
    "venue_count": 1,
    "avg_score": 0.7742005
  },
  {
    "id": "C2780140372",
    "name": "Keypad",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8273124,
    "venue_count": 1,
    "avg_score": 0.8273124
  },
  {
    "id": "C2987661296",
    "name": "Event management",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.48108813,
    "venue_count": 1,
    "avg_score": 0.48108813
  },
  {
    "id": "C178229462",
    "name": "Early childhood education",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4442636,
    "venue_count": 1,
    "avg_score": 0.4442636
  },
  {
    "id": "C3018905694",
    "name": "Assistive device",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.52701414,
    "venue_count": 1,
    "avg_score": 0.52701414
  },
  {
    "id": "C2777897806",
    "name": "3D modeling",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6907946,
    "venue_count": 1,
    "avg_score": 0.6907946
  },
  {
    "id": "C2780364048",
    "name": "Subtitle",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.92082024,
    "venue_count": 1,
    "avg_score": 0.92082024
  },
  {
    "id": "C31196326",
    "name": "Public institution",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.59465057,
    "venue_count": 1,
    "avg_score": 0.59465057
  },
  {
    "id": "C2989497712",
    "name": "Web survey",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5730476,
    "venue_count": 1,
    "avg_score": 0.5730476
  },
  {
    "id": "C178718744",
    "name": "Voice command device",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41734594,
    "venue_count": 1,
    "avg_score": 0.41734594
  },
  {
    "id": "C2781195486",
    "name": "Texture (cosmology)",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.60154855,
    "venue_count": 1,
    "avg_score": 0.60154855
  },
  {
    "id": "C2780917687",
    "name": "Diffusion of innovations",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.49933028,
    "venue_count": 1,
    "avg_score": 0.49933028
  },
  {
    "id": "C120784921",
    "name": "Multivariate probit model",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46482614,
    "venue_count": 1,
    "avg_score": 0.46482614
  },
  {
    "id": "C40398212",
    "name": "System requirements",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.48362222,
    "venue_count": 1,
    "avg_score": 0.48362222
  },
  {
    "id": "C62235348",
    "name": "Functional requirement",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42899948,
    "venue_count": 1,
    "avg_score": 0.42899948
  },
  {
    "id": "C164105321",
    "name": "Catalan",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5542907,
    "venue_count": 1,
    "avg_score": 0.5542907
  },
  {
    "id": "C45504901",
    "name": "Syllabus",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.74647194,
    "venue_count": 1,
    "avg_score": 0.74647194
  },
  {
    "id": "C3017595490",
    "name": "University hospital",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5620887,
    "venue_count": 1,
    "avg_score": 0.5620887
  },
  {
    "id": "C116190364",
    "name": "Grandparent",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7360548,
    "venue_count": 1,
    "avg_score": 0.7360548
  },
  {
    "id": "C2987930846",
    "name": "Mobile telephone",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45779496,
    "venue_count": 1,
    "avg_score": 0.45779496
  },
  {
    "id": "C3019308078",
    "name": "3d printed",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.65462095,
    "venue_count": 1,
    "avg_score": 0.65462095
  },
  {
    "id": "C2984377249",
    "name": "3d printer",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.58422875,
    "venue_count": 1,
    "avg_score": 0.58422875
  },
  {
    "id": "C2779096051",
    "name": "Museum education",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46367595,
    "venue_count": 1,
    "avg_score": 0.46367595
  },
  {
    "id": "C61096286",
    "name": "Web navigation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4739982,
    "venue_count": 1,
    "avg_score": 0.4739982
  },
  {
    "id": "C2777885485",
    "name": "Tangible user interface",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.48047605,
    "venue_count": 1,
    "avg_score": 0.48047605
  },
  {
    "id": "C2779422640",
    "name": "Childhood obesity",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.75684106,
    "venue_count": 1,
    "avg_score": 0.75684106
  },
  {
    "id": "C511355011",
    "name": "Obesity",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.49119732,
    "venue_count": 1,
    "avg_score": 0.49119732
  },
  {
    "id": "C2780586474",
    "name": "Overweight",
    "level": 3,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C2780031656",
    "name": "Glossary",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5383308,
    "venue_count": 1,
    "avg_score": 0.5383308
  },
  {
    "id": "C2985829316",
    "name": "Access to information",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5027323,
    "venue_count": 1,
    "avg_score": 0.5027323
  },
  {
    "id": "C2776543384",
    "name": "Information access",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.33350766,
    "venue_count": 1,
    "avg_score": 0.33350766
  },
  {
    "id": "C83931994",
    "name": "Building automation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41075745,
    "venue_count": 1,
    "avg_score": 0.41075745
  },
  {
    "id": "C552089266",
    "name": "Voice",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8193814,
    "venue_count": 1,
    "avg_score": 0.8193814
  },
  {
    "id": "C2983884539",
    "name": "Digital society",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.42740348,
    "venue_count": 1,
    "avg_score": 0.42740348
  },
  {
    "id": "C85890633",
    "name": "Capability Maturity Model",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.56583697,
    "venue_count": 1,
    "avg_score": 0.56583697
  },
  {
    "id": "C27502469",
    "name": "Dysfunctional family",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.75957215,
    "venue_count": 1,
    "avg_score": 0.75957215
  },
  {
    "id": "C2781265626",
    "name": "Cognitive behavioral therapy",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.4151297,
    "venue_count": 1,
    "avg_score": 0.4151297
  },
  {
    "id": "C86992474",
    "name": "Quality function deployment",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.61571175,
    "venue_count": 1,
    "avg_score": 0.61571175
  },
  {
    "id": "C71822192",
    "name": "Value engineering",
    "level": 2,
    "total_papers": 1,
    "total_score": 0,
    "venue_count": 1,
    "avg_score": 0
  },
  {
    "id": "C2778802812",
    "name": "Braille",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.58135134,
    "venue_count": 1,
    "avg_score": 0.58135134
  },
  {
    "id": "C2777043471",
    "name": "Team-based learning",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45117536,
    "venue_count": 1,
    "avg_score": 0.45117536
  },
  {
    "id": "C65603577",
    "name": "Web resource",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5955975,
    "venue_count": 1,
    "avg_score": 0.5955975
  },
  {
    "id": "C116865082",
    "name": "Interactive kiosk",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.99437356,
    "venue_count": 1,
    "avg_score": 0.99437356
  },
  {
    "id": "C2776809875",
    "name": "Converse",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6785943,
    "venue_count": 1,
    "avg_score": 0.6785943
  },
  {
    "id": "C74579156",
    "name": "Software peer review",
    "level": 5,
    "total_papers": 1,
    "total_score": 0.4697167,
    "venue_count": 1,
    "avg_score": 0.4697167
  },
  {
    "id": "C166423231",
    "name": "Semantic search",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.48103482,
    "venue_count": 1,
    "avg_score": 0.48103482
  },
  {
    "id": "C110046852",
    "name": "Computer-assisted translation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.59515524,
    "venue_count": 1,
    "avg_score": 0.59515524
  },
  {
    "id": "C125893350",
    "name": "Manually coded language",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.46420866,
    "venue_count": 1,
    "avg_score": 0.46420866
  },
  {
    "id": "C83479923",
    "name": "Universal Networking Language",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.43447256,
    "venue_count": 1,
    "avg_score": 0.43447256
  },
  {
    "id": "C2780878386",
    "name": "Visual language",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4341574,
    "venue_count": 1,
    "avg_score": 0.4341574
  },
  {
    "id": "C146508145",
    "name": "Level design",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.44363597,
    "venue_count": 1,
    "avg_score": 0.44363597
  },
  {
    "id": "C70364389",
    "name": "Validity",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.57164514,
    "venue_count": 1,
    "avg_score": 0.57164514
  },
  {
    "id": "C140441792",
    "name": "Cognitive development",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.51868427,
    "venue_count": 1,
    "avg_score": 0.51868427
  },
  {
    "id": "C2778073708",
    "name": "Language development",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.48098075,
    "venue_count": 1,
    "avg_score": 0.48098075
  },
  {
    "id": "C189465574",
    "name": "Maslow's hierarchy of needs",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.9138484,
    "venue_count": 1,
    "avg_score": 0.9138484
  },
  {
    "id": "C197811513",
    "name": "Need theory",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.43370554,
    "venue_count": 1,
    "avg_score": 0.43370554
  },
  {
    "id": "C2777394366",
    "name": "Personality type",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.66949546,
    "venue_count": 1,
    "avg_score": 0.66949546
  },
  {
    "id": "C35361118",
    "name": "Hoax",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.95288086,
    "venue_count": 1,
    "avg_score": 0.95288086
  },
  {
    "id": "C192314503",
    "name": "Digital native",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.559589,
    "venue_count": 1,
    "avg_score": 0.559589
  },
  {
    "id": "C2987056902",
    "name": "Flipped learning",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.79408103,
    "venue_count": 1,
    "avg_score": 0.79408103
  },
  {
    "id": "C204201278",
    "name": "Voice activity detection",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.70980906,
    "venue_count": 1,
    "avg_score": 0.70980906
  },
  {
    "id": "C61328038",
    "name": "Speech processing",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.41196796,
    "venue_count": 1,
    "avg_score": 0.41196796
  },
  {
    "id": "C2776037993",
    "name": "Social impact assessment",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43099427,
    "venue_count": 1,
    "avg_score": 0.43099427
  },
  {
    "id": "C2777021972",
    "name": "Uniqueness",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.45294186,
    "venue_count": 1,
    "avg_score": 0.45294186
  },
  {
    "id": "C153206804",
    "name": "Netnography",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.45736724,
    "venue_count": 1,
    "avg_score": 0.45736724
  },
  {
    "id": "C6907630",
    "name": "Game design document",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.485376,
    "venue_count": 1,
    "avg_score": 0.485376
  },
  {
    "id": "C2780200862",
    "name": "Tweaking",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.46853605,
    "venue_count": 1,
    "avg_score": 0.46853605
  },
  {
    "id": "C2988250419",
    "name": "Consumer satisfaction",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.60662705,
    "venue_count": 1,
    "avg_score": 0.60662705
  },
  {
    "id": "C2781332345",
    "name": "Mass-casualty incident",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.5836903,
    "venue_count": 1,
    "avg_score": 0.5836903
  },
  {
    "id": "C523966790",
    "name": "Animal welfare",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.7049544,
    "venue_count": 1,
    "avg_score": 0.7049544
  },
  {
    "id": "C29376679",
    "name": "Wildlife",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5857578,
    "venue_count": 1,
    "avg_score": 0.5857578
  },
  {
    "id": "C154020017",
    "name": "Repeatability",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6060104,
    "venue_count": 1,
    "avg_score": 0.6060104
  },
  {
    "id": "C88796919",
    "name": "Backbone network",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6486118,
    "venue_count": 1,
    "avg_score": 0.6486118
  },
  {
    "id": "C119513131",
    "name": "Journalism",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4578177,
    "venue_count": 1,
    "avg_score": 0.4578177
  },
  {
    "id": "C2780513070",
    "name": "Dynamic assessment",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6548966,
    "venue_count": 1,
    "avg_score": 0.6548966
  },
  {
    "id": "C3020552793",
    "name": "Pediatric hospital",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4345302,
    "venue_count": 1,
    "avg_score": 0.4345302
  },
  {
    "id": "C2778559731",
    "name": "Radiomics",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.61290604,
    "venue_count": 1,
    "avg_score": 0.61290604
  },
  {
    "id": "C2776535583",
    "name": "Mentorship",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8087203,
    "venue_count": 1,
    "avg_score": 0.8087203
  },
  {
    "id": "C48561166",
    "name": "Aptitude",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.83401674,
    "venue_count": 1,
    "avg_score": 0.83401674
  },
  {
    "id": "C2781275859",
    "name": "Test anxiety",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.80105805,
    "venue_count": 1,
    "avg_score": 0.80105805
  },
  {
    "id": "C2991676765",
    "name": "Pharmacy education",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.4574321,
    "venue_count": 1,
    "avg_score": 0.4574321
  },
  {
    "id": "C3604424",
    "name": "Pharmacy practice",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.13441214,
    "venue_count": 1,
    "avg_score": 0.13441214
  },
  {
    "id": "C32587265",
    "name": "Data deduplication",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.67353797,
    "venue_count": 1,
    "avg_score": 0.67353797
  },
  {
    "id": "C135572916",
    "name": "Data warehouse",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.49744728,
    "venue_count": 1,
    "avg_score": 0.49744728
  },
  {
    "id": "C2777036941",
    "name": "Motion analysis",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4639499,
    "venue_count": 1,
    "avg_score": 0.4639499
  },
  {
    "id": "C62737587",
    "name": "Vocabulary development",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.43892962,
    "venue_count": 1,
    "avg_score": 0.43892962
  },
  {
    "id": "C11207580",
    "name": "Developmental robotics",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.4478062,
    "venue_count": 1,
    "avg_score": 0.4478062
  },
  {
    "id": "C2777407727",
    "name": "Enactivism",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.45096874,
    "venue_count": 1,
    "avg_score": 0.45096874
  },
  {
    "id": "C2777432453",
    "name": "Interactive art",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.41341215,
    "venue_count": 1,
    "avg_score": 0.41341215
  },
  {
    "id": "C158886217",
    "name": "Latin Americans",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.5290747,
    "venue_count": 1,
    "avg_score": 0.5290747
  },
  {
    "id": "C519517224",
    "name": "Mythology",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.49863935,
    "venue_count": 1,
    "avg_score": 0.49863935
  },
  {
    "id": "C2779488668",
    "name": "Community resilience",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.48089147,
    "venue_count": 1,
    "avg_score": 0.48089147
  },
  {
    "id": "C2776889139",
    "name": "Electrical muscle stimulation",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.5693072,
    "venue_count": 1,
    "avg_score": 0.5693072
  },
  {
    "id": "C25630884",
    "name": "Social loafing",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.99656856,
    "venue_count": 1,
    "avg_score": 0.99656856
  },
  {
    "id": "C107344746",
    "name": "Ingroups and outgroups",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.612244,
    "venue_count": 1,
    "avg_score": 0.612244
  },
  {
    "id": "C87612349",
    "name": "In-group favoritism",
    "level": 4,
    "total_papers": 1,
    "total_score": 0.5405153,
    "venue_count": 1,
    "avg_score": 0.5405153
  },
  {
    "id": "C44819458",
    "name": "Singing",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.43074358,
    "venue_count": 1,
    "avg_score": 0.43074358
  },
  {
    "id": "C3018717917",
    "name": "Roller coaster",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.67359227,
    "venue_count": 1,
    "avg_score": 0.67359227
  },
  {
    "id": "C194365794",
    "name": "Thermochromism",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.4660028,
    "venue_count": 1,
    "avg_score": 0.4660028
  },
  {
    "id": "C71343576",
    "name": "Community development",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.44717854,
    "venue_count": 1,
    "avg_score": 0.44717854
  },
  {
    "id": "C2779825147",
    "name": "Project-based learning",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6943545,
    "venue_count": 1,
    "avg_score": 0.6943545
  },
  {
    "id": "C122302079",
    "name": "Civilization",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.67763525,
    "venue_count": 1,
    "avg_score": 0.67763525
  },
  {
    "id": "C2776461190",
    "name": "Word2vec",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.60261005,
    "venue_count": 1,
    "avg_score": 0.60261005
  },
  {
    "id": "C2777997956",
    "name": "Sexual orientation",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.8019594,
    "venue_count": 1,
    "avg_score": 0.8019594
  },
  {
    "id": "C2779692794",
    "name": "Xenophobia",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.6034045,
    "venue_count": 1,
    "avg_score": 0.6034045
  },
  {
    "id": "C21409990",
    "name": "Self-actualization",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.6469901,
    "venue_count": 1,
    "avg_score": 0.6469901
  },
  {
    "id": "C2777644245",
    "name": "Tapping",
    "level": 2,
    "total_papers": 1,
    "total_score": 0.868781,
    "venue_count": 1,
    "avg_score": 0.868781
  },
  {
    "id": "C2778409124",
    "name": "Attunement",
    "level": 3,
    "total_papers": 1,
    "total_score": 0.9434338,
    "venue_count": 1,
    "avg_score": 0.9434338
  }
];

// 前100个最常见的研究领域
const top100ResearchFields = [
  {
    "id": "C41008148",
    "name": "Computer science",
    "level": 0,
    "total_papers": 4878,
    "total_score": 2361.306393306,
    "venue_count": 29,
    "avg_score": 0.4840726513542435
  },
  {
    "id": "C15744967",
    "name": "Psychology",
    "level": 0,
    "total_papers": 2641,
    "total_score": 1050.2672568310004,
    "venue_count": 29,
    "avg_score": 0.3976778708182508
  },
  {
    "id": "C154945302",
    "name": "Artificial intelligence",
    "level": 1,
    "total_papers": 1967,
    "total_score": 591.595927819,
    "venue_count": 29,
    "avg_score": 0.3007605123634977
  },
  {
    "id": "C107457646",
    "name": "Human–computer interaction",
    "level": 1,
    "total_papers": 1694,
    "total_score": 682.1737945659997,
    "venue_count": 29,
    "avg_score": 0.40269999679220764
  },
  {
    "id": "C127413603",
    "name": "Engineering",
    "level": 0,
    "total_papers": 1671,
    "total_score": 339.324780011,
    "venue_count": 29,
    "avg_score": 0.20306689408198683
  },
  {
    "id": "C144024400",
    "name": "Sociology",
    "level": 0,
    "total_papers": 1151,
    "total_score": 333.03810062,
    "venue_count": 29,
    "avg_score": 0.28934674250217207
  },
  {
    "id": "C33923547",
    "name": "Mathematics",
    "level": 0,
    "total_papers": 1116,
    "total_score": 111.60593760700002,
    "venue_count": 29,
    "avg_score": 0.10000532043637994
  },
  {
    "id": "C17744445",
    "name": "Political science",
    "level": 0,
    "total_papers": 1114,
    "total_score": 162.80203608,
    "venue_count": 28,
    "avg_score": 0.14614186362657092
  },
  {
    "id": "C138885662",
    "name": "Philosophy",
    "level": 0,
    "total_papers": 1042,
    "total_score": 28.521801228,
    "venue_count": 29,
    "avg_score": 0.027372170084452977
  },
  {
    "id": "C77805123",
    "name": "Social psychology",
    "level": 1,
    "total_papers": 995,
    "total_score": 275.23158468200006,
    "venue_count": 28,
    "avg_score": 0.27661465797185936
  },
  {
    "id": "C199539241",
    "name": "Law",
    "level": 1,
    "total_papers": 991,
    "total_score": 24.299841900999997,
    "venue_count": 28,
    "avg_score": 0.0245205266407669
  },
  {
    "id": "C71924100",
    "name": "Medicine",
    "level": 0,
    "total_papers": 936,
    "total_score": 179.310107942,
    "venue_count": 29,
    "avg_score": 0.1915706281431624
  },
  {
    "id": "C136764020",
    "name": "World Wide Web",
    "level": 1,
    "total_papers": 924,
    "total_score": 210.22475750899994,
    "venue_count": 28,
    "avg_score": 0.22751597133008652
  },
  {
    "id": "C111919701",
    "name": "Operating system",
    "level": 1,
    "total_papers": 916,
    "total_score": 15.144000736000002,
    "venue_count": 29,
    "avg_score": 0.01653275189519651
  },
  {
    "id": "C144133560",
    "name": "Business",
    "level": 0,
    "total_papers": 812,
    "total_score": 272.9659907150001,
    "venue_count": 28,
    "avg_score": 0.33616501319581293
  },
  {
    "id": "C86803240",
    "name": "Biology",
    "level": 0,
    "total_papers": 800,
    "total_score": 9.682082056999997,
    "venue_count": 29,
    "avg_score": 0.012102602571249996
  },
  {
    "id": "C199360897",
    "name": "Programming language",
    "level": 1,
    "total_papers": 703,
    "total_score": 17.33755817,
    "venue_count": 29,
    "avg_score": 0.02466224490753912
  },
  {
    "id": "C56739046",
    "name": "Knowledge management",
    "level": 1,
    "total_papers": 703,
    "total_score": 289.388929461,
    "venue_count": 26,
    "avg_score": 0.4116485483086771
  },
  {
    "id": "C121332964",
    "name": "Physics",
    "level": 0,
    "total_papers": 676,
    "total_score": 19.907848655,
    "venue_count": 29,
    "avg_score": 0.029449480258875737
  },
  {
    "id": "C169760540",
    "name": "Neuroscience",
    "level": 1,
    "total_papers": 648,
    "total_score": 22.274905667,
    "venue_count": 27,
    "avg_score": 0.03437485442438271
  },
  {
    "id": "C49774154",
    "name": "Multimedia",
    "level": 1,
    "total_papers": 589,
    "total_score": 216.70100991099994,
    "venue_count": 28,
    "avg_score": 0.36791342939049226
  },
  {
    "id": "C194969405",
    "name": "Virtual reality",
    "level": 2,
    "total_papers": 587,
    "total_score": 363.01855237899997,
    "venue_count": 26,
    "avg_score": 0.6184302425536626
  },
  {
    "id": "C111472728",
    "name": "Epistemology",
    "level": 1,
    "total_papers": 581,
    "total_score": 90.192743426,
    "venue_count": 29,
    "avg_score": 0.15523707990705682
  },
  {
    "id": "C36289849",
    "name": "Social science",
    "level": 1,
    "total_papers": 569,
    "total_score": 47.08706543700001,
    "venue_count": 29,
    "avg_score": 0.0827540693093146
  },
  {
    "id": "C162324750",
    "name": "Economics",
    "level": 0,
    "total_papers": 567,
    "total_score": 44.98002341,
    "venue_count": 28,
    "avg_score": 0.07932984728395062
  },
  {
    "id": "C119857082",
    "name": "Machine learning",
    "level": 1,
    "total_papers": 563,
    "total_score": 137.88591627999998,
    "venue_count": 28,
    "avg_score": 0.24491281754884542
  },
  {
    "id": "C78519656",
    "name": "Mechanical engineering",
    "level": 1,
    "total_papers": 552,
    "total_score": 22.251297627999996,
    "venue_count": 29,
    "avg_score": 0.040310321789855066
  },
  {
    "id": "C41895202",
    "name": "Linguistics",
    "level": 1,
    "total_papers": 475,
    "total_score": 32.344991446,
    "venue_count": 29,
    "avg_score": 0.06809471883368422
  },
  {
    "id": "C38652104",
    "name": "Computer security",
    "level": 1,
    "total_papers": 470,
    "total_score": 115.987777733,
    "venue_count": 28,
    "avg_score": 0.2467825058148936
  },
  {
    "id": "C2522767166",
    "name": "Data science",
    "level": 1,
    "total_papers": 465,
    "total_score": 184.204693114,
    "venue_count": 28,
    "avg_score": 0.3961391249763441
  },
  {
    "id": "C142362112",
    "name": "Art",
    "level": 0,
    "total_papers": 465,
    "total_score": 97.15929097900002,
    "venue_count": 29,
    "avg_score": 0.20894471178279575
  },
  {
    "id": "C151730666",
    "name": "Paleontology",
    "level": 1,
    "total_papers": 440,
    "total_score": 0.22930467300000001,
    "venue_count": 28,
    "avg_score": 0.0005211469840909091
  },
  {
    "id": "C2779343474",
    "name": "Context (archaeology)",
    "level": 2,
    "total_papers": 433,
    "total_score": 248.93910026000003,
    "venue_count": 28,
    "avg_score": 0.5749170906697461
  },
  {
    "id": "C180747234",
    "name": "Cognitive psychology",
    "level": 1,
    "total_papers": 418,
    "total_score": 147.33665174000004,
    "venue_count": 27,
    "avg_score": 0.3524800280861245
  },
  {
    "id": "C98045186",
    "name": "Process (computing)",
    "level": 2,
    "total_papers": 412,
    "total_score": 207.90859192999997,
    "venue_count": 29,
    "avg_score": 0.504632504684466
  },
  {
    "id": "C162853370",
    "name": "Marketing",
    "level": 1,
    "total_papers": 383,
    "total_score": 104.286412264,
    "venue_count": 27,
    "avg_score": 0.27228828267362926
  },
  {
    "id": "C75630572",
    "name": "Applied psychology",
    "level": 1,
    "total_papers": 374,
    "total_score": 147.30704366499998,
    "venue_count": 26,
    "avg_score": 0.3938691007085561
  },
  {
    "id": "C118552586",
    "name": "Psychiatry",
    "level": 1,
    "total_papers": 365,
    "total_score": 22.106440147999997,
    "venue_count": 27,
    "avg_score": 0.060565589446575335
  },
  {
    "id": "C145420912",
    "name": "Mathematics education",
    "level": 1,
    "total_papers": 339,
    "total_score": 119.57624303899998,
    "venue_count": 24,
    "avg_score": 0.3527322803510324
  },
  {
    "id": "C108827166",
    "name": "Internet privacy",
    "level": 1,
    "total_papers": 334,
    "total_score": 146.16503938000002,
    "venue_count": 26,
    "avg_score": 0.43761987838323363
  },
  {
    "id": "C2780451532",
    "name": "Task (project management)",
    "level": 2,
    "total_papers": 334,
    "total_score": 188.55028445,
    "venue_count": 25,
    "avg_score": 0.5645218097305389
  },
  {
    "id": "C2524010",
    "name": "Geometry",
    "level": 1,
    "total_papers": 334,
    "total_score": 26.410467954999994,
    "venue_count": 29,
    "avg_score": 0.07907325735029938
  },
  {
    "id": "C201995342",
    "name": "Systems engineering",
    "level": 1,
    "total_papers": 324,
    "total_score": 32.96090641099999,
    "venue_count": 27,
    "avg_score": 0.10173119262654318
  },
  {
    "id": "C62520636",
    "name": "Quantum mechanics",
    "level": 1,
    "total_papers": 318,
    "total_score": 0.454796763,
    "venue_count": 29,
    "avg_score": 0.0014301785
  },
  {
    "id": "C202444582",
    "name": "Pure mathematics",
    "level": 1,
    "total_papers": 311,
    "total_score": 1.9201194140000002,
    "venue_count": 29,
    "avg_score": 0.006174017408360129
  },
  {
    "id": "C205649164",
    "name": "Geography",
    "level": 0,
    "total_papers": 297,
    "total_score": 39.244486466999994,
    "venue_count": 28,
    "avg_score": 0.13213631807070705
  },
  {
    "id": "C26760741",
    "name": "Perception",
    "level": 2,
    "total_papers": 283,
    "total_score": 152.82898846999998,
    "venue_count": 27,
    "avg_score": 0.5400317613780918
  },
  {
    "id": "C166957645",
    "name": "Archaeology",
    "level": 1,
    "total_papers": 282,
    "total_score": 9.297648945,
    "venue_count": 29,
    "avg_score": 0.03297038632978724
  },
  {
    "id": "C153349607",
    "name": "Visual arts",
    "level": 1,
    "total_papers": 282,
    "total_score": 67.73672413300001,
    "venue_count": 28,
    "avg_score": 0.24020114940780146
  },
  {
    "id": "C18762648",
    "name": "Work (physics)",
    "level": 2,
    "total_papers": 279,
    "total_score": 139.70573971999997,
    "venue_count": 28,
    "avg_score": 0.5007374183512544
  },
  {
    "id": "C142724271",
    "name": "Pathology",
    "level": 1,
    "total_papers": 278,
    "total_score": 1.631814997,
    "venue_count": 28,
    "avg_score": 0.005869838118705036
  },
  {
    "id": "C539667460",
    "name": "Management science",
    "level": 1,
    "total_papers": 275,
    "total_score": 111.90793796000001,
    "venue_count": 25,
    "avg_score": 0.40693795621818185
  },
  {
    "id": "C169900460",
    "name": "Cognition",
    "level": 2,
    "total_papers": 272,
    "total_score": 130.59359652,
    "venue_count": 24,
    "avg_score": 0.4801235166176471
  },
  {
    "id": "C19417346",
    "name": "Pedagogy",
    "level": 1,
    "total_papers": 269,
    "total_score": 44.71976117200002,
    "venue_count": 27,
    "avg_score": 0.16624446532342016
  },
  {
    "id": "C170130773",
    "name": "Usability",
    "level": 2,
    "total_papers": 261,
    "total_score": 165.38336192,
    "venue_count": 22,
    "avg_score": 0.6336527276628352
  },
  {
    "id": "C185592680",
    "name": "Chemistry",
    "level": 0,
    "total_papers": 261,
    "total_score": 4.220922849,
    "venue_count": 29,
    "avg_score": 0.016172118195402298
  },
  {
    "id": "C134306372",
    "name": "Mathematical analysis",
    "level": 1,
    "total_papers": 254,
    "total_score": 8.578745510000001,
    "venue_count": 29,
    "avg_score": 0.03377458862204725
  },
  {
    "id": "C44154836",
    "name": "Simulation",
    "level": 1,
    "total_papers": 252,
    "total_score": 92.59561876999999,
    "venue_count": 20,
    "avg_score": 0.3674429316269841
  },
  {
    "id": "C39549134",
    "name": "Public relations",
    "level": 1,
    "total_papers": 249,
    "total_score": 93.88337868900001,
    "venue_count": 23,
    "avg_score": 0.37704168148192774
  },
  {
    "id": "C76155785",
    "name": "Telecommunications",
    "level": 1,
    "total_papers": 243,
    "total_score": 24.553517448000008,
    "venue_count": 27,
    "avg_score": 0.10104328167901237
  },
  {
    "id": "C105795698",
    "name": "Statistics",
    "level": 1,
    "total_papers": 242,
    "total_score": 16.994065573000004,
    "venue_count": 28,
    "avg_score": 0.0702234114586777
  },
  {
    "id": "C55587333",
    "name": "Engineering ethics",
    "level": 1,
    "total_papers": 235,
    "total_score": 94.88649726000001,
    "venue_count": 22,
    "avg_score": 0.4037723287659575
  },
  {
    "id": "C94625758",
    "name": "Politics",
    "level": 2,
    "total_papers": 224,
    "total_score": 34.516377373000005,
    "venue_count": 26,
    "avg_score": 0.15409097041517858
  },
  {
    "id": "C31972630",
    "name": "Computer vision",
    "level": 1,
    "total_papers": 223,
    "total_score": 82.965877495,
    "venue_count": 27,
    "avg_score": 0.37204429369955155
  },
  {
    "id": "C31258907",
    "name": "Computer network",
    "level": 1,
    "total_papers": 221,
    "total_score": 49.620830807,
    "venue_count": 27,
    "avg_score": 0.22452864618552035
  },
  {
    "id": "C9652623",
    "name": "Field (mathematics)",
    "level": 2,
    "total_papers": 219,
    "total_score": 111.73778802999999,
    "venue_count": 29,
    "avg_score": 0.5102182101826483
  },
  {
    "id": "C46312422",
    "name": "Communication",
    "level": 1,
    "total_papers": 215,
    "total_score": 31.036893457000005,
    "venue_count": 28,
    "avg_score": 0.14435764398604653
  },
  {
    "id": "C153180895",
    "name": "Pattern recognition (psychology)",
    "level": 2,
    "total_papers": 206,
    "total_score": 95.44160229999999,
    "venue_count": 13,
    "avg_score": 0.46330874902912617
  },
  {
    "id": "C518677369",
    "name": "Social media",
    "level": 2,
    "total_papers": 204,
    "total_score": 109.92731073,
    "venue_count": 24,
    "avg_score": 0.5388593663235294
  },
  {
    "id": "C10138342",
    "name": "Finance",
    "level": 1,
    "total_papers": 203,
    "total_score": 5.5481016389999995,
    "venue_count": 25,
    "avg_score": 0.027330549945812806
  },
  {
    "id": "C12713177",
    "name": "Perspective (graphical)",
    "level": 2,
    "total_papers": 199,
    "total_score": 114.2191218,
    "venue_count": 26,
    "avg_score": 0.5739654361809045
  },
  {
    "id": "C195094911",
    "name": "Process management",
    "level": 1,
    "total_papers": 199,
    "total_score": 79.5217128,
    "venue_count": 25,
    "avg_score": 0.3996065969849246
  },
  {
    "id": "C11413529",
    "name": "Algorithm",
    "level": 1,
    "total_papers": 192,
    "total_score": 60.43603035699999,
    "venue_count": 25,
    "avg_score": 0.3147709914427083
  },
  {
    "id": "C177264268",
    "name": "Set (abstract data type)",
    "level": 2,
    "total_papers": 187,
    "total_score": 89.54790483000001,
    "venue_count": 28,
    "avg_score": 0.47886580122994654
  },
  {
    "id": "C18903297",
    "name": "Ecology",
    "level": 1,
    "total_papers": 180,
    "total_score": 11.236114315,
    "venue_count": 28,
    "avg_score": 0.06242285730555556
  },
  {
    "id": "C2779134260",
    "name": "Disease",
    "level": 2,
    "total_papers": 179,
    "total_score": 4.365832994,
    "venue_count": 27,
    "avg_score": 0.024390128458100558
  },
  {
    "id": "C153715457",
    "name": "Augmented reality",
    "level": 2,
    "total_papers": 165,
    "total_score": 105.50110366000001,
    "venue_count": 22,
    "avg_score": 0.6394006282424243
  },
  {
    "id": "C121684516",
    "name": "Computer graphics (images)",
    "level": 1,
    "total_papers": 165,
    "total_score": 54.40817854399999,
    "venue_count": 25,
    "avg_score": 0.32974653663030296
  },
  {
    "id": "C524204448",
    "name": "Infectious disease (medical specialty)",
    "level": 3,
    "total_papers": 163,
    "total_score": 2.866792155,
    "venue_count": 23,
    "avg_score": 0.01758768193251534
  },
  {
    "id": "C3008058167",
    "name": "Coronavirus disease 2019 (COVID-19)",
    "level": 4,
    "total_papers": 162,
    "total_score": 85.9962512,
    "venue_count": 23,
    "avg_score": 0.5308410567901235
  },
  {
    "id": "C99508421",
    "name": "Physical medicine and rehabilitation",
    "level": 1,
    "total_papers": 161,
    "total_score": 70.69330838,
    "venue_count": 16,
    "avg_score": 0.43908887192546586
  },
  {
    "id": "C19165224",
    "name": "Anthropology",
    "level": 1,
    "total_papers": 160,
    "total_score": 6.867633951000001,
    "venue_count": 28,
    "avg_score": 0.042922712193750004
  },
  {
    "id": "C28490314",
    "name": "Speech recognition",
    "level": 1,
    "total_papers": 160,
    "total_score": 66.19774732500001,
    "venue_count": 17,
    "avg_score": 0.41373592078125004
  },
  {
    "id": "C188147891",
    "name": "Cognitive science",
    "level": 1,
    "total_papers": 159,
    "total_score": 51.61272837599999,
    "venue_count": 23,
    "avg_score": 0.3246083545660377
  },
  {
    "id": "C95457728",
    "name": "History",
    "level": 0,
    "total_papers": 159,
    "total_score": 21.656156668999998,
    "venue_count": 28,
    "avg_score": 0.13620224320125784
  },
  {
    "id": "C149635348",
    "name": "Embedded system",
    "level": 1,
    "total_papers": 159,
    "total_score": 17.147433055000004,
    "venue_count": 27,
    "avg_score": 0.10784549091194971
  },
  {
    "id": "C107038049",
    "name": "Aesthetics",
    "level": 1,
    "total_papers": 157,
    "total_score": 49.412245926000004,
    "venue_count": 21,
    "avg_score": 0.31472768105732485
  },
  {
    "id": "C90509273",
    "name": "Robot",
    "level": 2,
    "total_papers": 156,
    "total_score": 76.158063106,
    "venue_count": 24,
    "avg_score": 0.48819271221794874
  },
  {
    "id": "C187736073",
    "name": "Management",
    "level": 1,
    "total_papers": 154,
    "total_score": 10.597750893000002,
    "venue_count": 26,
    "avg_score": 0.06881656424025975
  },
  {
    "id": "C156393514",
    "name": "Multimethodology",
    "level": 2,
    "total_papers": 154,
    "total_score": 96.55464369999999,
    "venue_count": 1,
    "avg_score": 0.6269782058441558
  },
  {
    "id": "C2779530757",
    "name": "Quality (philosophy)",
    "level": 2,
    "total_papers": 151,
    "total_score": 73.75596706000002,
    "venue_count": 28,
    "avg_score": 0.4884501129801326
  },
  {
    "id": "C542102704",
    "name": "Psychotherapist",
    "level": 1,
    "total_papers": 149,
    "total_score": 17.376890145999997,
    "venue_count": 28,
    "avg_score": 0.1166234237986577
  },
  {
    "id": "C138496976",
    "name": "Developmental psychology",
    "level": 1,
    "total_papers": 145,
    "total_score": 37.919722629,
    "venue_count": 23,
    "avg_score": 0.26151532847586206
  },
  {
    "id": "C124101348",
    "name": "Data mining",
    "level": 1,
    "total_papers": 143,
    "total_score": 44.25842457,
    "venue_count": 24,
    "avg_score": 0.30949947251748255
  },
  {
    "id": "C55493867",
    "name": "Biochemistry",
    "level": 1,
    "total_papers": 140,
    "total_score": 0,
    "venue_count": 25,
    "avg_score": 0
  },
  {
    "id": "C190248442",
    "name": "Qualitative research",
    "level": 2,
    "total_papers": 138,
    "total_score": 53.86673251399999,
    "venue_count": 21,
    "avg_score": 0.39033864140579705
  },
  {
    "id": "C77088390",
    "name": "Database",
    "level": 1,
    "total_papers": 132,
    "total_score": 10.623241969999999,
    "venue_count": 25,
    "avg_score": 0.08047910583333333
  },
  {
    "id": "C110875604",
    "name": "The Internet",
    "level": 2,
    "total_papers": 131,
    "total_score": 53.432793614999994,
    "venue_count": 23,
    "avg_score": 0.4078839207251908
  },
  {
    "id": "C160735492",
    "name": "Health care",
    "level": 2,
    "total_papers": 128,
    "total_score": 63.01145429399999,
    "venue_count": 22,
    "avg_score": 0.4922769866718749
  },
  {
    "id": "C2779473830",
    "name": "MEDLINE",
    "level": 2,
    "total_papers": 125,
    "total_score": 19.579519464,
    "venue_count": 24,
    "avg_score": 0.156636155712
  }
];

module.exports = {
  allResearchFields,
  top100ResearchFields,
  stats: {
    totalFields: 4967,
    analyzedVenues: 29,
    generatedAt: "2025-09-04T04:39:18.125Z"
  }
};
