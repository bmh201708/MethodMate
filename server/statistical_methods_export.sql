-- MethodMate 统计方法数据库导出
-- 生成时间: 2025-07-14T08:11:31.147Z
-- 远程服务器: http://175.27.251.132/

-- 创建统计方法表
CREATE TABLE IF NOT EXISTS statistical_methods (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  keywords TEXT,
  content LONGTEXT NOT NULL,
  file_source VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_title (title),
  FULLTEXT KEY ft_content (title, keywords, content)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 插入统计方法数据
-- 如果数据已存在，可以先删除:
-- DELETE FROM statistical_methods WHERE file_source IN ('6.md', '7.md', '8.md', '9.md');

-- 插入: Kruskal-Wallis H检验
INSERT INTO statistical_methods (title, keywords, content, file_source) VALUES (
  'Kruskal-Wallis H检验',
  'Kruskal-Wallis,H检验,非参数检验,多个独立样本,秩和检验,方差分析,非正态分布,多组比较,统计检验,假设检验',
  '# Kruskal-Wallis H检验(Kruskal-Wallis H Test)

Kruskal-Wallis H 检验用于推断计量资料或等级资料的多个独立样本所来自的多个总体分布是否有差别。在理论上检验假设 ![img](https://cdn.nlark.com/yuque/__latex/57187f9bd9c2c01d01dc9aafd4f8e645.svg) 应为多个总体分布相同，即多个样本来自同一总体。由于 Kruskal-Wallis 检验对多个总体分布的形状差别不敏感，故在实际应用中检验假设 ![img](https://cdn.nlark.com/yuque/__latex/57187f9bd9c2c01d01dc9aafd4f8e645.svg) 可写作多个总体分布位置相同。对立的备择假设 ![img](https://cdn.nlark.com/yuque/__latex/5211bedb600e31046860da77076ec475.svg) 为多个总体分布位置不全相同。

## 一、适用条件

1. **条件1**：有一个观察变量和一个分组变量。  
2. **条件2**：观察变量为非正态分布或方差不齐的连续变量或有序分类变量。  
3. **条件3**：存在多个分组（![img](https://cdn.nlark.com/yuque/__latex/3e8f39332e4551205a6eca740faf7579.svg)）。  
4. **条件4**：观察变量是相互独立的观测值。

## 二、统计量计算

### (一) 多个独立样本比较的 Kruskal-Wallis H 检验

#### 1. 多个独立样本计量资料比较的 Kruskal-Wallis H 检验

当数据为不服从正态分布的计量资料时（如百分率、时间资料），多组间比较使用 Kruskal-Wallis H 检验。
**检验统计量** ![img](https://cdn.nlark.com/yuque/__latex/ff1b78684db901dd0b7bfa173991deab.svg) **值计算过程**：
① 各组数据混合从小到大编秩，遇相等数据取平均秩；
② 设各组样本量为 ![img](https://cdn.nlark.com/yuque/__latex/77db1de84c57b9099d7206fb2c0f1ca3.svg)（![img](https://cdn.nlark.com/yuque/__latex/ff7909e7bef7930dbce2b7733d538b3b.svg)），秩和为 ![img](https://cdn.nlark.com/yuque/__latex/fad3059665c05167bc57527d44d32091.svg)。
公式：  

![img](https://cdn.nlark.com/yuque/__latex/0065ba120061d41fc5d67832f6b9f18f.svg)

若存在相同秩次，需校正：  

![img](https://cdn.nlark.com/yuque/__latex/963b938c9bddfa9ae069d5869d7e3119.svg)

其中 ![img](https://cdn.nlark.com/yuque/__latex/cb072eec5eadb81ad251f19d7965d661.svg) 为第 ![img](https://cdn.nlark.com/yuque/__latex/036441a335dd85c838f76d63a3db2363.svg) 个相同秩次的个数。
**推断方法**：  

- 当组数 ![img](https://cdn.nlark.com/yuque/__latex/fab176b390a5e135589fa8f7adfcff62.svg) 且每组例数 ![img](https://cdn.nlark.com/yuque/__latex/deecdf7553f48e78e46b14ff9fb0a03b.svg) 时，查 ![img](https://cdn.nlark.com/yuque/__latex/ff1b78684db901dd0b7bfa173991deab.svg) 界值表确定 ![img](https://cdn.nlark.com/yuque/__latex/ffd1905f6d4d60accedfa6b91be93ea9.svg) 值。  
- 当组数 ![img](https://cdn.nlark.com/yuque/__latex/fab176b390a5e135589fa8f7adfcff62.svg) 且最小例数 ![img](https://cdn.nlark.com/yuque/__latex/fafbc2dfe3e4f01e3b12106482ec64ab.svg) 或 ![img](https://cdn.nlark.com/yuque/__latex/cdfc0918f9f3ae4406769d2af54df4fe.svg) 时，![img](https://cdn.nlark.com/yuque/__latex/ff1b78684db901dd0b7bfa173991deab.svg)（或 ![img](https://cdn.nlark.com/yuque/__latex/5a3549b5546765c7ebd919115799667c.svg)）近似服从自由度 ![img](https://cdn.nlark.com/yuque/__latex/deec6e26f406197e0306a2635b332754.svg) 的 ![img](https://cdn.nlark.com/yuque/__latex/31e8b215db2ad0a073daf2fbd310fd00.svg) 分布，查 ![img](https://cdn.nlark.com/yuque/__latex/31e8b215db2ad0a073daf2fbd310fd00.svg) 界值表确定 ![img](https://cdn.nlark.com/yuque/__latex/ffd1905f6d4d60accedfa6b91be93ea9.svg) 值。

#### 2. 多个独立样本频数表资料和等级资料比较的 Kruskal-Wallis H 检验

当数据为频数表资料（按数量区间分组）或等级资料（按等级分组）时，使用 Kruskal-Wallis H 检验。
**检验统计量** ![img](https://cdn.nlark.com/yuque/__latex/5a3549b5546765c7ebd919115799667c.svg) **值计算过程**：
① 确定各数量区间/等级的合计人数、秩次范围和平均秩次；
② 分组求秩和 ![img](https://cdn.nlark.com/yuque/__latex/fad3059665c05167bc57527d44d32091.svg)（各区间/等级的频数 × 相应平均秩次，再求和）；
③ 按上述公式求 ![img](https://cdn.nlark.com/yuque/__latex/ff1b78684db901dd0b7bfa173991deab.svg) 和 ![img](https://cdn.nlark.com/yuque/__latex/5a3549b5546765c7ebd919115799667c.svg)。
按自由度 ![img](https://cdn.nlark.com/yuque/__latex/deec6e26f406197e0306a2635b332754.svg) 查 ![img](https://cdn.nlark.com/yuque/__latex/31e8b215db2ad0a073daf2fbd310fd00.svg) 界值表确定 ![img](https://cdn.nlark.com/yuque/__latex/ffd1905f6d4d60accedfa6b91be93ea9.svg) 值。
**注**：两独立样本比较时，Wilcoxon 秩和检验与 Kruskal-Wallis H 检验的关系为 ![img](https://cdn.nlark.com/yuque/__latex/ff1b78684db901dd0b7bfa173991deab.svg)（或 ![img](https://cdn.nlark.com/yuque/__latex/5a3549b5546765c7ebd919115799667c.svg)) ![img](https://cdn.nlark.com/yuque/__latex/6de4047521da3779a5da9e16e00d6167.svg)。

#### 3. Kruskal-Wallis H 检验的原理

**(1)** ![img](https://cdn.nlark.com/yuque/__latex/ff1b78684db901dd0b7bfa173991deab.svg) **界值表制作原理**
以 ![img](https://cdn.nlark.com/yuque/__latex/fab176b390a5e135589fa8f7adfcff62.svg) 组（![img](https://cdn.nlark.com/yuque/__latex/9ddd21b3394a2b990af5b52b1ec7eb62.svg)）为例：  

- 总体秩为 ![img](https://cdn.nlark.com/yuque/__latex/0697151c5afc79b604d6ada6a46279e1.svg)，所有可能取秩组合数为 ![img](https://cdn.nlark.com/yuque/__latex/5d0f012c3f94898a317ed82d9e2bc6a8.svg)。  
- 对每种组合计算 ![img](https://cdn.nlark.com/yuque/__latex/2e005ed75b1fda991273847fee711c5f.svg) 和 ![img](https://cdn.nlark.com/yuque/__latex/ff1b78684db901dd0b7bfa173991deab.svg) 值，得到 ![img](https://cdn.nlark.com/yuque/__latex/ff1b78684db901dd0b7bfa173991deab.svg) 的偏态离散分布。  
- ![img](https://cdn.nlark.com/yuque/__latex/2e005ed75b1fda991273847fee711c5f.svg) 差别越小，![img](https://cdn.nlark.com/yuque/__latex/ff1b78684db901dd0b7bfa173991deab.svg) 越接近 ![img](https://cdn.nlark.com/yuque/__latex/22d0feea96d3bb2fc273f7598ce748c1.svg)；差别越大，![img](https://cdn.nlark.com/yuque/__latex/ff1b78684db901dd0b7bfa173991deab.svg) 越大。根据分布确定 ![img](https://cdn.nlark.com/yuque/__latex/ffd1905f6d4d60accedfa6b91be93ea9.svg) 值。

**(2)** ![img](https://cdn.nlark.com/yuque/__latex/ff1b78684db901dd0b7bfa173991deab.svg) **的** ![img](https://cdn.nlark.com/yuque/__latex/31e8b215db2ad0a073daf2fbd310fd00.svg) **近似法原理**
设 ![img](https://cdn.nlark.com/yuque/__latex/7a1e6a754b7a8e45cb731688765c5e85.svg) 个组，样本量 ![img](https://cdn.nlark.com/yuque/__latex/77db1de84c57b9099d7206fb2c0f1ca3.svg)（![img](https://cdn.nlark.com/yuque/__latex/ff7909e7bef7930dbce2b7733d538b3b.svg)），秩和 ![img](https://cdn.nlark.com/yuque/__latex/fad3059665c05167bc57527d44d32091.svg)。若 ![img](https://cdn.nlark.com/yuque/__latex/57187f9bd9c2c01d01dc9aafd4f8e645.svg) 成立，则：  

![img](https://cdn.nlark.com/yuque/__latex/c7d43fbe5ed63fc2981d2eff2d42486f.svg)

可推导出 ![img](https://cdn.nlark.com/yuque/__latex/68fead2c2f36ded4e07c29ea27c42de8.svg)。存在相同秩次时，方差校正为：  

![img](https://cdn.nlark.com/yuque/__latex/3329e8a54a34a6af8c565f7a6fa09a59.svg)

![img](https://cdn.nlark.com/yuque/__latex/ff1b78684db901dd0b7bfa173991deab.svg) 或 ![img](https://cdn.nlark.com/yuque/__latex/5a3549b5546765c7ebd919115799667c.svg) 近似服从 ![img](https://cdn.nlark.com/yuque/__latex/deec6e26f406197e0306a2635b332754.svg) 的 ![img](https://cdn.nlark.com/yuque/__latex/31e8b215db2ad0a073daf2fbd310fd00.svg) 分布。

------

### (二) 多个独立样本两两比较的 Nemenyi 法检验

当 Kruskal-Wallis H 检验拒绝 ![img](https://cdn.nlark.com/yuque/__latex/57187f9bd9c2c01d01dc9aafd4f8e645.svg) 时，需进一步推断哪两组不同，可用 Nemenyi 检验或扩展 ![img](https://cdn.nlark.com/yuque/__latex/cead1760d9d5723460c4b8d4028f113a.svg) 检验。  

#### 1. Nemenyi 检验

设 ![img](https://cdn.nlark.com/yuque/__latex/7a1e6a754b7a8e45cb731688765c5e85.svg) 个组，当样本量较大时，第 ![img](https://cdn.nlark.com/yuque/__latex/2443fbcfeb7e85e1d62b6f5e4f27207e.svg) 组与第 ![img](https://cdn.nlark.com/yuque/__latex/036441a335dd85c838f76d63a3db2363.svg) 组比较的 ![img](https://cdn.nlark.com/yuque/__latex/31e8b215db2ad0a073daf2fbd310fd00.svg) 值：  

![img](https://cdn.nlark.com/yuque/__latex/2dd45b3bd6a7a0eb62ccfca1cf073631.svg)

其中校正系数 ![img](https://cdn.nlark.com/yuque/__latex/a42a4fc28b384cc408de066beed57485.svg)：  

![img](https://cdn.nlark.com/yuque/__latex/6ada72fa10c287f4f15027ddcc132670.svg)

按 ![img](https://cdn.nlark.com/yuque/__latex/deec6e26f406197e0306a2635b332754.svg) 查 ![img](https://cdn.nlark.com/yuque/__latex/31e8b215db2ad0a073daf2fbd310fd00.svg) 界值表确定 ![img](https://cdn.nlark.com/yuque/__latex/ffd1905f6d4d60accedfa6b91be93ea9.svg) 值。  

#### 2. 扩展 ![img](https://cdn.nlark.com/yuque/__latex/cead1760d9d5723460c4b8d4028f113a.svg) 检验法

**统计量** ![img](https://cdn.nlark.com/yuque/__latex/cead1760d9d5723460c4b8d4028f113a.svg) **值公式**：  

![img](https://cdn.nlark.com/yuque/__latex/563bacbda1a499110156ec6dbe70be4c.svg)

其中 ![img](https://cdn.nlark.com/yuque/__latex/558b5a8a69f469cead7bd7bd2d56e559.svg) 为平均秩次，![img](https://cdn.nlark.com/yuque/__latex/fb856763ab0836f2c33bd1918825d1c9.svg) 为样本量，![img](https://cdn.nlark.com/yuque/__latex/7a1e6a754b7a8e45cb731688765c5e85.svg) 为组数，![img](https://cdn.nlark.com/yuque/__latex/459f3c80a50b7be28751b0869ef5386a.svg) 总例数，![img](https://cdn.nlark.com/yuque/__latex/5a3549b5546765c7ebd919115799667c.svg) 为 Kruskal-Wallis 检验统计量。

------

## 三、案例数据

某医师对30名胆管癌患者的肿瘤直径进行了测定，其中9名患者肿瘤直径＜2cm (A组)，11名患者肿瘤直径为2~3cm (B组)，10名患者肿瘤直径＞3cm (C组)。同时该医生对所有患者血清中癌抗原19-9 (cancer antigens 19-9, CA19-9)水平(μg/L)进行了测定，问不同肿瘤直径的胆管癌患者CA19-9水平是否不同？

**数据**：  

| **ID**    | **1**  | **2**  | **3**  | **4**  | **5**  | **6**  | **7**  | **8**  | **9**  | **10** |
| --------- | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| **group** | A组    | A组    | A组    | A组    | A组    | A组    | A组    | A组    | A组    | B组    |
| **CA**    | 58     | 31     | 47     | 30     | 34     | 32     | 35     | 33     | 40     | 325    |
| **ID**    | **11** | **12** | **13** | **14** | **15** | **16** | **17** | **18** | **19** | **20** |
| **group** | B组    | B组    | B组    | B组    | B组    | B组    | B组    | B组    | B组    | B组    |
| **CA**    | 263    | 374    | 287    | 579    | 325    | 367    | 332    | 385    | 377    | 541    |
| **ID**    | **21** | **22** | **23** | **24** | **25** | **26** | **27** | **28** | **29** | **30** |
| **group** | C组    | C组    | C组    | C组    | C组    | C组    | C组    | C组    | C组    | C组    |
| **CA**    | 789    | 1230   | 775    | 826    | 1100   | 890    | 786    | 980    | 820    | 830    |

## 四、假设检验

**前提检验**：  

- Shapiro-Wilk 正态性检验：A 组 ![img](https://cdn.nlark.com/yuque/__latex/e8dcce7e81ca1bfe561a45a55037cef1.svg)，B 组 ![img](https://cdn.nlark.com/yuque/__latex/d3d55c4cd06cec6d8a6e0823a687c3ec.svg)，C 组 ![img](https://cdn.nlark.com/yuque/__latex/5f12b48a91650c530cef6139741c7248.svg)（均 ![img](https://cdn.nlark.com/yuque/__latex/e0ed038685c13abe57e0e5cee7e84bf8.svg)），拒绝正态性。  
- Levene 方差齐性检验：![img](https://cdn.nlark.com/yuque/__latex/0218353858e22ea7eda50a0a9963905c.svg)，方差不齐。
  ![img](https://cdn.nlark.com/yuque/__latex/33b44e34aa35b8c4ecd0606453ee68e9.svg) 使用 Kruskal-Wallis H 检验。

### (一) 建立检验假设

![img](https://cdn.nlark.com/yuque/__latex/57187f9bd9c2c01d01dc9aafd4f8e645.svg)：不同肿瘤直径的胆管癌患者 CA19-9 水平总体分布位置相同
![img](https://cdn.nlark.com/yuque/__latex/5211bedb600e31046860da77076ec475.svg)：不同肿瘤直径的胆管癌患者 CA19-9 水平总体分布位置不全相同
![img](https://cdn.nlark.com/yuque/__latex/69911f59fceea773510b534eaeacaebe.svg)  

### (二) 计算检验统计量

#### 1. 编秩结果

| A 组 (CA) | 秩   | B 组 (CA) | 秩   | C 组 (CA) | 秩   |
| --------- | ---- | --------- | ---- | --------- | ---- |
| 58        | 9    | 325       | 12.5 | 789       | 23   |
| 31        | 2    | 263       | 10   | 1230      | 30   |
| 47        | 8    | 374       | 16   | 775       | 21   |
| 30        | 1    | 287       | 11   | 826       | 25   |
| 34        | 5    | 579       | 20   | 1100      | 29   |
| 32        | 3    | 325       | 12.5 | 890       | 27   |
| 35        | 6    | 367       | 15   | 786       | 22   |
| 33        | 4    | 332       | 14   | 980       | 28   |
| 40        | 7    | 385       | 18   | 820       | 24   |
|           |      | 377       | 17   | 830       | 26   |
|           |      | 541       | 19   |           |      |

#### 2. 秩和与平均秩

| 组别 | ![img](https://cdn.nlark.com/yuque/__latex/77db1de84c57b9099d7206fb2c0f1ca3.svg) | ![img](https://cdn.nlark.com/yuque/__latex/fad3059665c05167bc57527d44d32091.svg) | ![img](https://cdn.nlark.com/yuque/__latex/bba9fdcb742d58d7eb638436ca5721b9.svg) |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| A    | 9                                                            | 45                                                           | 5.0                                                          |
| B    | 11                                                           | 165                                                          | 15.0                                                         |
| C    | 10                                                           | 255                                                          | 25.5                                                         |

#### 3. 计算 ![img](https://cdn.nlark.com/yuque/__latex/ff1b78684db901dd0b7bfa173991deab.svg) 值

![img](https://cdn.nlark.com/yuque/__latex/f91b250fc6e7eebec7d12f58cd39556f.svg)，代入公式：  

![img](https://cdn.nlark.com/yuque/__latex/0997182475050dfe0afa974b421dbe35.svg)

校正后 ![img](https://cdn.nlark.com/yuque/__latex/5a3549b5546765c7ebd919115799667c.svg)（![img](https://cdn.nlark.com/yuque/__latex/4be2af8bc882a8491f4b555d413cb803.svg)）：  

![img](https://cdn.nlark.com/yuque/__latex/552d53c0fa093569e6e618b5a8632749.svg)

### (三) 确定 ![img](https://cdn.nlark.com/yuque/__latex/ffd1905f6d4d60accedfa6b91be93ea9.svg) 值

自由度 ![img](https://cdn.nlark.com/yuque/__latex/29c067f3cb0032dd9b273f0ec865eddc.svg)，查 ![img](https://cdn.nlark.com/yuque/__latex/31e8b215db2ad0a073daf2fbd310fd00.svg) 界值表得 ![img](https://cdn.nlark.com/yuque/__latex/e00ca4544250dd124d9abfe58279a88a.svg)。按 ![img](https://cdn.nlark.com/yuque/__latex/b221a01585cbaaee5f26a1afae4ffff9.svg) 水准拒绝 ![img](https://cdn.nlark.com/yuque/__latex/57187f9bd9c2c01d01dc9aafd4f8e645.svg)，接受 ![img](https://cdn.nlark.com/yuque/__latex/5211bedb600e31046860da77076ec475.svg)，认为不同肿瘤直径患者 CA19-9 水平不全相同。

------

## (四) 事后检验

### 1. Nemenyi 检验

#### (1) 假设

![img](https://cdn.nlark.com/yuque/__latex/57187f9bd9c2c01d01dc9aafd4f8e645.svg)：所比较的两个不同组别的肿瘤直径的胆管癌患者CA19-9水平总体分布位置相同
![img](https://cdn.nlark.com/yuque/__latex/5211bedb600e31046860da77076ec475.svg)：所比较的两个不同组别的肿瘤直径的胆管癌患者CA19-9水平总体分布位置不同
![img](https://cdn.nlark.com/yuque/__latex/b221a01585cbaaee5f26a1afae4ffff9.svg)  

#### (2) 计算统计量 (![img](https://cdn.nlark.com/yuque/__latex/bd12ad2e214c7647d1837dd057d8aaf0.svg))

- **A vs B**：

![img](https://cdn.nlark.com/yuque/__latex/94352fc8c38213ec67e5e695fbde5f3d.svg)

- **A vs C**：![img](https://cdn.nlark.com/yuque/__latex/9ca6631e6fc7d876b4352a097a9abcfc.svg)  
- **B vs C**：![img](https://cdn.nlark.com/yuque/__latex/4c23a38c7604ffd8837aaaefb201d33a.svg)

#### (3) 推断结论 (![img](https://cdn.nlark.com/yuque/__latex/aabf555b9ea9359b9438efc64211f1ff.svg))

| 比较组 | ![img](https://cdn.nlark.com/yuque/__latex/31e8b215db2ad0a073daf2fbd310fd00.svg) | ![img](https://cdn.nlark.com/yuque/__latex/ffd1905f6d4d60accedfa6b91be93ea9.svg) 范围 | 结论     |
| ------ | ------------------------------------------------------------ | ------------------------------------------------------------ | -------- |
| A vs B | 6.388518                                                     | ![img](https://cdn.nlark.com/yuque/__latex/a5236729469ef2b75936451cfa617745.svg) | 差异显著 |
| A vs C | 25.69162                                                     | ![img](https://cdn.nlark.com/yuque/__latex/e5c5d0a8e31b4fc4d8cc0ce58730f2da.svg) | 差异显著 |
| B vs C | 7.453271                                                     | ![img](https://cdn.nlark.com/yuque/__latex/f719e86f6c3ac919e0248f40e0345096.svg) | 差异显著 |

### 2. 扩展 ![img](https://cdn.nlark.com/yuque/__latex/cead1760d9d5723460c4b8d4028f113a.svg) 检验法

#### (1) 假设（同 Nemenyi 检验）

![img](https://cdn.nlark.com/yuque/__latex/57187f9bd9c2c01d01dc9aafd4f8e645.svg)：所比较的两个不同组别的肿瘤直径的胆管癌患者CA19-9水平总体分布位置相同
![img](https://cdn.nlark.com/yuque/__latex/5211bedb600e31046860da77076ec475.svg)：所比较的两个不同组别的肿瘤直径的胆管癌患者CA19-9水平总体分布位置不同
![img](https://cdn.nlark.com/yuque/__latex/b221a01585cbaaee5f26a1afae4ffff9.svg)  

#### (2) 计算统计量 (![img](https://cdn.nlark.com/yuque/__latex/47178241afec8918dd6e7ac330fbcf6b.svg))

| 比较组 | ![img](https://cdn.nlark.com/yuque/__latex/cead1760d9d5723460c4b8d4028f113a.svg) 值 | ![img](https://cdn.nlark.com/yuque/__latex/ffd1905f6d4d60accedfa6b91be93ea9.svg) |
| ------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| A vs B | 5.3025                                                       | ![img](https://cdn.nlark.com/yuque/__latex/74baf73b9cb33fc09473125b8711248c.svg) |
| A vs C | 10.40203                                                     | ![img](https://cdn.nlark.com/yuque/__latex/74baf73b9cb33fc09473125b8711248c.svg) |
| B vs C | 5.891667                                                     | ![img](https://cdn.nlark.com/yuque/__latex/74baf73b9cb33fc09473125b8711248c.svg) |

#### (3) 结论

根据图3中第(5)栏中的*t*值，按自由度*v*=30-3=27查(t界值表)，界定*P*值。

据上可知肿瘤直径＜2cm的患者和2~3cm的患者CA19-9水平差异有统计学意义，2~3cm的患者和＞3cm的患者CA19-9水平差异有统计学意义，＜2cm的患者和＞3cm的患者CA19-9水平差异有统计学意义。

## 转自：

原文出自：https://mengte.online/archives/354

SPSS实操案例：https://mengte.online/archives/418',
  '6.md'
);

-- 插入: 配对样本Wilcoxon符号秩检验
INSERT INTO statistical_methods (title, keywords, content, file_source) VALUES (
  '配对样本Wilcoxon符号秩检验',
  'Wilcoxon,符号秩检验,配对样本,非参数检验,相关样本,符号秩,配对设计,中位数检验,统计检验,假设检验',
  '# 配对样本Wilcoxon符号秩检验(Paired Samples Wilcoxon Signed Rank Test)

Windows符号秩检验(Wilcoxon signed-rank test)不仅可以用于单个样本中位数和总体中位数比较，还可用于配对样本差值的中位数和比较。这里我们将介绍配对样本差值的中位数和比较的配对样本Wilcoxon符号秩检验(Pared Samples Wilcoxon Signed Rank Test)相关理论及软件实现。

配对样本Wilcoxon符号秩检验，目的是推算配对样本差值的总体中位数是否和0有差别，即推算配对的两个相关样本所来自的两个总体中位数是否有差别。

## 一、适用条件

对于配对设计的连续性变量，可以选择配对检验或Wilcoxon符号秩检验。配对检验适用于两组差值近似服从正态分布的数据。当不满足该条件时，可选择Wilcoxon符号秩检验。对于配对设计的有序分类变量比较，应使用Wilcoxon符号秩检验。使用Wilcoxon符号秩检验时，需要满足三个条件：

**条件1**：观察变量是连续变量或者有序分类变量。
**条件2**：观察变量可分为2组。
**条件3**：观察变量的数据结构为配对形式。  

## 二、统计量计算

**(一) 配对设计的连续性变量比较**
详见https://mengte.online/archives/333。

**(二) 配对设计的有序分类变量比较**
Wilcoxon符号秩检验用于配对的等级级数，需要先把等级从级别级转换为默认值，2、3、4；然后求各列数的差值。若需符合标准的例子，令余下的所有有效数字均为0，最后按个差值确定其取值。求正数和负数和，但对于等级级数，相同结果的小样本的结果会存在偏差。最好用大样本。

## 三、案例数据

对12位血清分别用原方法检测时间15分钟和原方法检测时间10分钟测得样本数量，同两种方法所得结果是否有差别？

| ID   | 1    | 2    | 3    | 4    | 5    | 6    | 7    | 8    | 9    | 10   | 11   | 12   |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 原法 | 60   | 142  | 195  | 80   | 242  | 220  | 190  | 25   | 198  | 38   | 236  | 95   |
| 新法 | 76   | 152  | 243  | 82   | 240  | 222  | 205  | 38   | 243  | 44   | 190  | 100  |

## 四、假设检验

配对设计的连续性变量比较，需要给定两组差值的正态性。本例中两组差值按Normality Test (Shapiro-Wilk) (重复多项式无定常性) 正态性检验结果显示P=0.063<0.1，提示数据不满足正态性条件。本案例宜选用配对样本Wilcoxon符号秩检验。

**(一) 建立检验假设，确定检验水准**
![img](https://cdn.nlark.com/yuque/__latex/57187f9bd9c2c01d01dc9aafd4f8e645.svg)：差值的总体中位数，即两种方法所得结果无差别
![img](https://cdn.nlark.com/yuque/__latex/5211bedb600e31046860da77076ec475.svg)：![img](https://cdn.nlark.com/yuque/__latex/5107503b07f0d984d3accb6fce21bd35.svg)，即两种方法所得结果有差别
![img](https://cdn.nlark.com/yuque/__latex/69911f59fceea773510b534eaeacaebe.svg)  

**(二) 计算检验统计量**  

1. **计算差值**
   使用新法减去原法计算两组数据的差值，即图2中(d)=(b)-(c)。  
2. **编秩**
   (1) 将图2中图(a)和(c)的值提取到列。
   (2) 以绝对值的大小从小到大编秩次(即编秩序号)；若遇到差值为0则舍去，同时样本例数相应减少；若遇到绝对值相等的差值，则取平均秩次，又称相同秩。
   (3) 保留差值的正负号(即符号秩)。
   (4) 求秩和，正秩和![img](https://cdn.nlark.com/yuque/__latex/bcab3db98c3660fa0cfec36c1a9a3474.svg)=***，负秩和$T-$=\\***_。  
3. **计算T值**
   分别求出正负秩次之和![img](https://cdn.nlark.com/yuque/__latex/bcab3db98c3660fa0cfec36c1a9a3474.svg)和![img](https://cdn.nlark.com/yuque/__latex/150e21004259d7ca5d754b771d2aa981.svg)，任选正秩和或负秩和为![img](https://cdn.nlark.com/yuque/__latex/1553dae3cc5c15cddb4f5b5a367b0aba.svg)，本例![img](https://cdn.nlark.com/yuque/__latex/a0009a5b75a61e6012add3bd43fd55ce.svg)或![img](https://cdn.nlark.com/yuque/__latex/ac0b798a6f77a7f96ee152e1dd711a2f.svg)。

| ID (1)   | 原法 (2) | 新法 (3) | 差值 d (4)=(3)-(2) | 正秩 (5)                                                     | 负秩 (6)                                                     |
| -------- | -------- | -------- | ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 1        | 60       | 76       | 16                 | 9                                                            |                                                              |
| 2        | 142      | 152      | 10                 | 6                                                            |                                                              |
| 3        | 195      | 243      | 48                 | 12                                                           |                                                              |
| 4        | 80       | 82       | 2                  | 2                                                            |                                                              |
| 5        | 242      | 240      | -2                 |                                                              | 2                                                            |
| 6        | 220      | 222      | 2                  | 2                                                            |                                                              |
| 7        | 190      | 205      | 15                 | 8                                                            |                                                              |
| 8        | 25       | 38       | 13                 | 7                                                            |                                                              |
| 9        | 198      | 243      | 45                 | 10                                                           |                                                              |
| 10       | 38       | 44       | 6                  | 5                                                            |                                                              |
| 11       | 236      | 190      | -46                |                                                              | 11                                                           |
| 12       | 95       | 100      | 5                  | 4                                                            |                                                              |
| **合计** | ——       | ——       | ——                 | **65(**![img](https://cdn.nlark.com/yuque/__latex/bcab3db98c3660fa0cfec36c1a9a3474.svg)**)** | **13(**![img](https://cdn.nlark.com/yuque/__latex/150e21004259d7ca5d754b771d2aa981.svg)**)** |

------

### （三）确定 ![img](https://cdn.nlark.com/yuque/__latex/ffd1905f6d4d60accedfa6b91be93ea9.svg) 值，作出推断结论

当 ![img](https://cdn.nlark.com/yuque/__latex/333ffec6ceb1d3a699e6633414fdb999.svg) 时，查 ![img](https://cdn.nlark.com/yuque/__latex/1553dae3cc5c15cddb4f5b5a367b0aba.svg) **值界值表**：

1. 从左侧找到 ![img](https://cdn.nlark.com/yuque/__latex/df378375e7693bdcf9535661c023c02e.svg)（样本量）
2. 将检验统计量 ![img](https://cdn.nlark.com/yuque/__latex/1553dae3cc5c15cddb4f5b5a367b0aba.svg) 值与相邻左侧栏的界值比较：

- 若 ![img](https://cdn.nlark.com/yuque/__latex/1553dae3cc5c15cddb4f5b5a367b0aba.svg) 在上下界值范围内，![img](https://cdn.nlark.com/yuque/__latex/ffd1905f6d4d60accedfa6b91be93ea9.svg) 值 > 相应概率水平
- 若 ![img](https://cdn.nlark.com/yuque/__latex/1553dae3cc5c15cddb4f5b5a367b0aba.svg) 值等于界值，![img](https://cdn.nlark.com/yuque/__latex/ffd1905f6d4d60accedfa6b91be93ea9.svg) 值 ≈ 相应概率水平
- 若 ![img](https://cdn.nlark.com/yuque/__latex/1553dae3cc5c15cddb4f5b5a367b0aba.svg) 值在上下界值范围外，![img](https://cdn.nlark.com/yuque/__latex/ffd1905f6d4d60accedfa6b91be93ea9.svg) 值 < 相应概率水平（可右移一栏再比较）

**本例**：
![img](https://cdn.nlark.com/yuque/__latex/64779207d12ad7a598a8f314bf6dff1d.svg)，![img](https://cdn.nlark.com/yuque/__latex/21b186885bf78c5f0604b23e3034318d.svg) 或 ![img](https://cdn.nlark.com/yuque/__latex/ac0b798a6f77a7f96ee152e1dd711a2f.svg)，查表得双侧 ![img](https://cdn.nlark.com/yuque/__latex/2958b0f732aba87c1da89c1159756555.svg)。
按 ![img](https://cdn.nlark.com/yuque/__latex/69911f59fceea773510b534eaeacaebe.svg) 水准，拒绝 ![img](https://cdn.nlark.com/yuque/__latex/57187f9bd9c2c01d01dc9aafd4f8e645.svg)，接受 ![img](https://cdn.nlark.com/yuque/__latex/5211bedb600e31046860da77076ec475.svg)，差异有统计学意义，可认为两种方法所得结果有差别。

## 转自：

原文出自：https://mengte.online/archives/340

SPSS实操案例：https://mengte.online/archives/2325?pcat=3',
  '7.md'
);

-- 插入: 独立样本Wilcoxon秩和检验
INSERT INTO statistical_methods (title, keywords, content, file_source) VALUES (
  '独立样本Wilcoxon秩和检验',
  'Wilcoxon,秩和检验,独立样本,非参数检验,Mann-Whitney,U检验,两样本比较,分布位置,统计检验,假设检验',
  '# 独立样本Wilcoxon秩和检验(Wilcoxon Rank Sum Test)

独立样本Wilcoxon秩和检验用于推断计量资料或等级资料的两个独立样本所来自的两个总体分布位置是否有差别。

无论两个总体分布的形状有无差别，秩和检验的目的是推断两个总体分布的位置是否有差别，这正是实践中所需要的。如要推断两个不同人群的某项指标值的大小是否有差别或哪个人群的大，可用其指标值分布的位置差别反映，而不关心其指标值分布的形状有无差别。

两样本比较的秩和检验的基本思想是：如果待比较的两样本（样本含量分别为![img](https://cdn.nlark.com/yuque/__latex/75a79801b1f8d45fdfd7a0b0bbc8d02f.svg)及![img](https://cdn.nlark.com/yuque/__latex/1b83e2a3d544d2b90cd33a8b662d3039.svg)）来自位置相同的两个总体（即![img](https://cdn.nlark.com/yuque/__latex/57187f9bd9c2c01d01dc9aafd4f8e645.svg)成立），则含量为![img](https://cdn.nlark.com/yuque/__latex/75a79801b1f8d45fdfd7a0b0bbc8d02f.svg)的样本之实际秩和![img](https://cdn.nlark.com/yuque/__latex/1553dae3cc5c15cddb4f5b5a367b0aba.svg)与其理论秩和![img](https://cdn.nlark.com/yuque/__latex/d374219406939d9ae5ac8dae831b7962.svg)纯系抽样误差所致，故此差值一般不会很大，而差值越大的概率越小。若从现有样本中算得的![img](https://cdn.nlark.com/yuque/__latex/1553dae3cc5c15cddb4f5b5a367b0aba.svg)与其理论秩和相差很大，则说明从![img](https://cdn.nlark.com/yuque/__latex/57187f9bd9c2c01d01dc9aafd4f8e645.svg)规定的总体中随机抽得现有样本及更极端样本的概率![img](https://cdn.nlark.com/yuque/__latex/ffd1905f6d4d60accedfa6b91be93ea9.svg)很小，如小于等于检验水准![img](https://cdn.nlark.com/yuque/__latex/18d25ca4f77a9bbed9812e2bb0b350a5.svg)，则可拒绝![img](https://cdn.nlark.com/yuque/__latex/57187f9bd9c2c01d01dc9aafd4f8e645.svg)。此处将举例介绍Wilcoxon秩和检验的假设检验理论。

## 一、适用条件

1. 有一个观察变量，且观察变量为连续变量（不满足正态分布或方差不齐或分布未知）或等级变量。
2. 有一个分组变量，且为二分类。
3. 观测值相互独立。

## 二、统计量计算

### (一) T值法

![img](https://cdn.nlark.com/yuque/__latex/1553dae3cc5c15cddb4f5b5a367b0aba.svg)值法是指对数据编秩计算后，通过![img](https://cdn.nlark.com/yuque/__latex/1553dae3cc5c15cddb4f5b5a367b0aba.svg)值表确定![img](https://cdn.nlark.com/yuque/__latex/ffd1905f6d4d60accedfa6b91be93ea9.svg)值，做出统计推断。

1. **检验统计量**![img](https://cdn.nlark.com/yuque/__latex/1553dae3cc5c15cddb4f5b5a367b0aba.svg)**值的计算**

**(1) 计量资料检验统计量**![img](https://cdn.nlark.com/yuque/__latex/1553dae3cc5c15cddb4f5b5a367b0aba.svg)**值的计算**
① 把两样本数据混合从小到大编秩，遇数据相等者取平均秩；
② 以样本例数小者为![img](https://cdn.nlark.com/yuque/__latex/75a79801b1f8d45fdfd7a0b0bbc8d02f.svg)其秩和![img](https://cdn.nlark.com/yuque/__latex/f9fead56308a5646fe8ddf2f9af2c17d.svg)为![img](https://cdn.nlark.com/yuque/__latex/1553dae3cc5c15cddb4f5b5a367b0aba.svg)，若两样本例数相等，可任取一样本的秩和（![img](https://cdn.nlark.com/yuque/__latex/f9fead56308a5646fe8ddf2f9af2c17d.svg)或![img](https://cdn.nlark.com/yuque/__latex/e6970f40f11ca608a82850039f0f3119.svg)）为![img](https://cdn.nlark.com/yuque/__latex/1553dae3cc5c15cddb4f5b5a367b0aba.svg)。 

**(2) 频数表资料和等级资料检验统计量**![img](https://cdn.nlark.com/yuque/__latex/1553dae3cc5c15cddb4f5b5a367b0aba.svg)**值的计算**
① 频数表资料是按数量区间分组，等级资料是按等级分组。需要先确定各等级的合计人数、秩次范围和平均秩次；
② 通过样本例数×平均秩次求各等级的秩和；
③ 以样本例数小者为![img](https://cdn.nlark.com/yuque/__latex/75a79801b1f8d45fdfd7a0b0bbc8d02f.svg)，其秩和（![img](https://cdn.nlark.com/yuque/__latex/f9fead56308a5646fe8ddf2f9af2c17d.svg)）为![img](https://cdn.nlark.com/yuque/__latex/1553dae3cc5c15cddb4f5b5a367b0aba.svg)，若两样本例数相等，可任取一样本的秩和（![img](https://cdn.nlark.com/yuque/__latex/f9fead56308a5646fe8ddf2f9af2c17d.svg)或![img](https://cdn.nlark.com/yuque/__latex/e6970f40f11ca608a82850039f0f3119.svg)）为![img](https://cdn.nlark.com/yuque/__latex/1553dae3cc5c15cddb4f5b5a367b0aba.svg)。

1. **确定**![img](https://cdn.nlark.com/yuque/__latex/ffd1905f6d4d60accedfa6b91be93ea9.svg)**值，做出统计推断**
   当![img](https://cdn.nlark.com/yuque/__latex/8eb0ea57193ef4ad09ea2194642a37d0.svg)和![img](https://cdn.nlark.com/yuque/__latex/7f1a580959ab0936b285ecfb0a70ed5f.svg)时，查 ![img](https://cdn.nlark.com/yuque/__latex/1553dae3cc5c15cddb4f5b5a367b0aba.svg)**界值表**。查表时：

- 先找到![img](https://cdn.nlark.com/yuque/__latex/75a79801b1f8d45fdfd7a0b0bbc8d02f.svg)与![img](https://cdn.nlark.com/yuque/__latex/dd084010f9335fc3a2b0f72f1b1db821.svg)相交处所对应的4行界值
- 将检验统计量![img](https://cdn.nlark.com/yuque/__latex/1553dae3cc5c15cddb4f5b5a367b0aba.svg)与界值相比：

- 若![img](https://cdn.nlark.com/yuque/__latex/1553dae3cc5c15cddb4f5b5a367b0aba.svg)值在界值范围内，![img](https://cdn.nlark.com/yuque/__latex/ffd1905f6d4d60accedfa6b91be93ea9.svg)值 > 相应概率水平
- 若![img](https://cdn.nlark.com/yuque/__latex/1553dae3cc5c15cddb4f5b5a367b0aba.svg)值恰好等于界值，![img](https://cdn.nlark.com/yuque/__latex/ffd1905f6d4d60accedfa6b91be93ea9.svg)值 ≈ 相应概率水平
- 若![img](https://cdn.nlark.com/yuque/__latex/1553dae3cc5c15cddb4f5b5a367b0aba.svg)值在界值范围外，![img](https://cdn.nlark.com/yuque/__latex/ffd1905f6d4d60accedfa6b91be93ea9.svg)值 < 相应概率水平

1. ![img](https://cdn.nlark.com/yuque/__latex/1553dae3cc5c15cddb4f5b5a367b0aba.svg)**界值表制作原理**
   以![img](https://cdn.nlark.com/yuque/__latex/e8801f41503fbe7c062291647128d3d6.svg)为例：

- 总体秩为![img](https://cdn.nlark.com/yuque/__latex/0697151c5afc79b604d6ada6a46279e1.svg)，所有可能取秩组合数为![img](https://cdn.nlark.com/yuque/__latex/b36e0e2294dc3b586668e39354481efa.svg)
- ![img](https://cdn.nlark.com/yuque/__latex/1553dae3cc5c15cddb4f5b5a367b0aba.svg)的概率分布为对称的非连续分布：

![img](https://cdn.nlark.com/yuque/0/2025/png/35630207/1751818472735-793a0ce6-f1f8-49c2-aa14-cbf8c8ecfce6.png)

- ![img](https://cdn.nlark.com/yuque/__latex/1553dae3cc5c15cddb4f5b5a367b0aba.svg)的概率分布是对称的非连续分布。![img](https://cdn.nlark.com/yuque/__latex/1553dae3cc5c15cddb4f5b5a367b0aba.svg)的最小值为![img](https://cdn.nlark.com/yuque/__latex/9d35b55c27a45346534688c15e5f60fa.svg)，最大值为![img](https://cdn.nlark.com/yuque/__latex/05b568b03368ff75db0042ad7232174e.svg)，均数为![img](https://cdn.nlark.com/yuque/__latex/a34388e172d28a331e09ae3535949026.svg)。如![img](https://cdn.nlark.com/yuque/__latex/5a8f7484dc0048d0ca354f48bcdfad4c.svg)和![img](https://cdn.nlark.com/yuque/__latex/4721689acc9da52486d222a45a64ffff.svg)时![img](https://cdn.nlark.com/yuque/__latex/86488daea25b8ac4c51d68fa9ed6f64f.svg)，![img](https://cdn.nlark.com/yuque/__latex/1553dae3cc5c15cddb4f5b5a367b0aba.svg)的最小值为3，最大值为13，均数为8。两个样本的秩和之和![img](https://cdn.nlark.com/yuque/__latex/a535821e8fac0a8d0674b9805b19fe6b.svg)。
- 根据下图可计算![img](https://cdn.nlark.com/yuque/__latex/5a8f7484dc0048d0ca354f48bcdfad4c.svg)和![img](https://cdn.nlark.com/yuque/__latex/4721689acc9da52486d222a45a64ffff.svg)时![img](https://cdn.nlark.com/yuque/__latex/1553dae3cc5c15cddb4f5b5a367b0aba.svg)的单侧和双侧累计概率。如![img](https://cdn.nlark.com/yuque/__latex/1553dae3cc5c15cddb4f5b5a367b0aba.svg)为3~13的单侧累计概率为0.0476(近似0.05)，双侧累计概率等于0.0952(近似0.10)，这就是(![img](https://cdn.nlark.com/yuque/__latex/1553dae3cc5c15cddb4f5b5a367b0aba.svg)界值表)中的![img](https://cdn.nlark.com/yuque/__latex/4721689acc9da52486d222a45a64ffff.svg)和![img](https://cdn.nlark.com/yuque/__latex/e651b46720b83f7bdf5940129f63b1bb.svg)时![img](https://cdn.nlark.com/yuque/__latex/1553dae3cc5c15cddb4f5b5a367b0aba.svg)界值的来源。无论N和n1如何取值，其T界值的制作步骤与![img](https://cdn.nlark.com/yuque/__latex/5a8f7484dc0048d0ca354f48bcdfad4c.svg)和![img](https://cdn.nlark.com/yuque/__latex/4721689acc9da52486d222a45a64ffff.svg)时相同。

![img](https://cdn.nlark.com/yuque/0/2025/png/35630207/1751818528799-666725f6-a345-4fd8-9462-5cdcf1742142.png)

### (二) 正态近似法

当![img](https://cdn.nlark.com/yuque/__latex/1b08a87ae8e368f96b39b0df40ece68c.svg)或![img](https://cdn.nlark.com/yuque/__latex/93320a0640e3ab38f73bb72c0479625d.svg)，![img](https://cdn.nlark.com/yuque/__latex/1553dae3cc5c15cddb4f5b5a367b0aba.svg)分布近似正态分布，计算公式：

![img](https://cdn.nlark.com/yuque/__latex/2d1fb4d7ee8dcc493ae5d9ce0363eb94.svg)

其中![img](https://cdn.nlark.com/yuque/__latex/2c26077ae5ef957f8a1be6a81734c04d.svg)为连续性校正系数。若相同秩次较多（>25%），需校正：

![img](https://cdn.nlark.com/yuque/__latex/f82654d37e99942ebefab08a256be190.svg)

### (三) Mann-Whitney U检验

两独立样本比较还常用 Mann-Whitney U 检验 (Mann-Whitney U test)。检验统计量 ![img](https://cdn.nlark.com/yuque/__latex/61730156a4ee0ac4b11b62f6440f5779.svg) 为：把第一个样本的 ![img](https://cdn.nlark.com/yuque/__latex/2679980b755ed3a72f0537370d4a0f6e.svg) 个变量值的每个变量值，与第二个样本的 ![img](https://cdn.nlark.com/yuque/__latex/1b83e2a3d544d2b90cd33a8b662d3039.svg) 个变量值逐个比较：

- 小于记 1  
- 相等记 0.5  
- 大于记 0
  求其和。

**推断方法**：  

- 当 ![img](https://cdn.nlark.com/yuque/__latex/75a79801b1f8d45fdfd7a0b0bbc8d02f.svg) 和 ![img](https://cdn.nlark.com/yuque/__latex/1b83e2a3d544d2b90cd33a8b662d3039.svg) 均较小（![img](https://cdn.nlark.com/yuque/__latex/ec8d7ad86c79f2a73e8f946d6cf9d22d.svg)）时，使用 ![img](https://cdn.nlark.com/yuque/__latex/61730156a4ee0ac4b11b62f6440f5779.svg) **界值表** 进行推断  
- 当 ![img](https://cdn.nlark.com/yuque/__latex/75a79801b1f8d45fdfd7a0b0bbc8d02f.svg) 和 ![img](https://cdn.nlark.com/yuque/__latex/1b83e2a3d544d2b90cd33a8b662d3039.svg) 均较大时，用正态近似法作 ![img](https://cdn.nlark.com/yuque/__latex/77c3adce895348f6083c425fe1ba2624.svg) 检验

![img](https://cdn.nlark.com/yuque/__latex/61730156a4ee0ac4b11b62f6440f5779.svg) **与** ![img](https://cdn.nlark.com/yuque/__latex/1553dae3cc5c15cddb4f5b5a367b0aba.svg) **的关系**：
![img](https://cdn.nlark.com/yuque/__latex/61730156a4ee0ac4b11b62f6440f5779.svg) 的概率分布是对称的非连续分布，与 Wilcoxon 秩和检验的 ![img](https://cdn.nlark.com/yuque/__latex/1553dae3cc5c15cddb4f5b5a367b0aba.svg) 存在以下关系：  

1. 当第一个样本的所有值 < 第二个样本的所有值时：
   ![img](https://cdn.nlark.com/yuque/__latex/2c129263c53880e33250a6f94e194d71.svg)，![img](https://cdn.nlark.com/yuque/__latex/cbdd42c9d94ad128ac2c47a5a1f19d60.svg)  
2. 当第一个样本的所有值 > 第二个样本的所有值时：
   ![img](https://cdn.nlark.com/yuque/__latex/5c642889f574fcdcb9edbb2ea5bcec01.svg)，![img](https://cdn.nlark.com/yuque/__latex/2d480c30497c4afb923e90e26e01f108.svg)  
3. 一般关系式：
   ![img](https://cdn.nlark.com/yuque/__latex/14e9d6093bf8e31fcb85f18200e57339.svg)

![img](https://cdn.nlark.com/yuque/__latex/61730156a4ee0ac4b11b62f6440f5779.svg) **的均数与方差**：  

![img](https://cdn.nlark.com/yuque/__latex/e12a86dc6ce1ade4e8446821526e5a97.svg)

**正态近似公式**：  

![img](https://cdn.nlark.com/yuque/__latex/c2a44d556c6f0ecafdd84fd07e81ce6b.svg)

## 三、案例数据

某医师对12例高血压患者和11例糖尿病患者血清总胆固醇(TCHO)含量(mmol/L)进行了测定，问高血压患者和糖尿病患者的血清总胆固醇含量是否不同？

某医师测定高血压患者（![img](https://cdn.nlark.com/yuque/__latex/9cdf505cd04e6352cb75e05692fa6f60.svg)）和糖尿病患者（![img](https://cdn.nlark.com/yuque/__latex/3ab64ccb9b84f783eab05f7cbce573ce.svg)）血清总胆固醇（TCHO）含量（mmol/L）：

![img](https://cdn.nlark.com/yuque/0/2025/png/35630207/1751818874632-bf0435e5-cb96-4c9c-9523-7fedc4f6b002.png)

## 四、假设检验

#### **前提检验**：  

- Shapiro-Wilk检验：![img](https://cdn.nlark.com/yuque/__latex/12d2e16dca3d09d360b85db3b9a9dbb6.svg)（高血压组），![img](https://cdn.nlark.com/yuque/__latex/faeecabf0c688938ec5aec4a78afad86.svg)（糖尿病组）（均![img](https://cdn.nlark.com/yuque/__latex/e0ed038685c13abe57e0e5cee7e84bf8.svg)），拒绝正态性  
- Levene方差齐性检验：![img](https://cdn.nlark.com/yuque/__latex/2883fbe4d6a9e51d81cab92171c45074.svg)，方差不齐
  ![img](https://cdn.nlark.com/yuque/__latex/33b44e34aa35b8c4ecd0606453ee68e9.svg) 使用Wilcoxon秩和检验

#### (一) 建立检验假设

![img](https://cdn.nlark.com/yuque/__latex/57187f9bd9c2c01d01dc9aafd4f8e645.svg)：高血压患者和糖尿病患者血清总胆固醇(TCHO)含量总体分布位置相同
![img](https://cdn.nlark.com/yuque/__latex/5211bedb600e31046860da77076ec475.svg)：高血压患者和糖尿病患者血清总胆固醇(TCHO)含量总体分布位置不同
![img](https://cdn.nlark.com/yuque/__latex/69911f59fceea773510b534eaeacaebe.svg)

#### (二) 计算检验统计量

1. **编秩**

(1) 将两组数据混合从小到大编秩次(即编秩序号)，若遇到数据相等的，则取平均秩。

(2) 求秩和。以样本例数小者为n1，其秩和(T1)为T，若两样本例数相等，可任取一样本的秩和(T1和T2)为T。

1. **计算**![img](https://cdn.nlark.com/yuque/__latex/1553dae3cc5c15cddb4f5b5a367b0aba.svg)**值**
   取![img](https://cdn.nlark.com/yuque/__latex/3ab64ccb9b84f783eab05f7cbce573ce.svg)（糖尿病组），![img](https://cdn.nlark.com/yuque/__latex/ef1f8d8e73f97a411cdd7bb59210857e.svg)

#### (三) 确定![img](https://cdn.nlark.com/yuque/__latex/ffd1905f6d4d60accedfa6b91be93ea9.svg)值（正态近似法）

![img](https://cdn.nlark.com/yuque/__latex/1eb47a760caeffb946e2946c463655ec.svg)

相同秩次4个（<25%），无需校正。校正后![img](https://cdn.nlark.com/yuque/__latex/27ffd850fca7a0287151eddef0b71a2d.svg)。
查![img](https://cdn.nlark.com/yuque/__latex/77c3adce895348f6083c425fe1ba2624.svg)界值表：![img](https://cdn.nlark.com/yuque/__latex/4670bacc23b5e1224186aa3b9488aa22.svg)，![img](https://cdn.nlark.com/yuque/__latex/12328e55c31f935cf164c145c8661d53.svg)。
按![img](https://cdn.nlark.com/yuque/__latex/b221a01585cbaaee5f26a1afae4ffff9.svg)水准，不拒绝![img](https://cdn.nlark.com/yuque/__latex/57187f9bd9c2c01d01dc9aafd4f8e645.svg)，尚不能认为两组血清总胆固醇含量不同。

## 转自：

原文出自：https://mengte.online/archives/344?pcat=1

SPSS实操案例：https://mengte.online/archives/2279?pcat=3',
  '8.md'
);

-- 插入: Friedman M检验
INSERT INTO statistical_methods (title, keywords, content, file_source) VALUES (
  'Friedman M检验',
  'Friedman,M检验,非参数检验,多个相关样本,随机区组设计,配伍组设计,重复测量,多组比较,统计检验,假设检验',
  '# Friedman M检验(The Friedman Non-parametric Repeated Measures ANOVA Test)

Friedman M 检验用于推断随机区组设计的多个相关样本所来自的多个总体分布位置是否有差别。检验假设 ![img](https://cdn.nlark.com/yuque/__latex/57187f9bd9c2c01d01dc9aafd4f8e645.svg) 和备择假设 ![img](https://cdn.nlark.com/yuque/__latex/5211bedb600e31046860da77076ec475.svg) 与多个独立样本比较的 Kruskal-Wallis 检验相同。随机区组设计 (Randomized Block Design) 又称为配伍组设计，是配对设计的扩展。具体做法是：先按影响实验结果的非处理因素（如患者的性别、体重、年龄、职业、病情、病程等）将试验对象配成区组，再分别将各区组内的试验对象随机分配到处理因素的不同水平组。

## 一、适用条件

1. **条件1**：观察变量为非（近似）正态的连续变量或有序分类变量。  
2. **条件2**：观察变量具有 3 个及以上的分组，为配伍组设计，或各组之间存在相关性。

## 二、统计量计算

### (一) 多个相关样本比较的 Friedman M 检验

#### 1. M 值法

**检验统计量** ![img](https://cdn.nlark.com/yuque/__latex/6f5dde593f0bc27956e14b5eaec2ed17.svg) **值计算**：
设区组个数 ![img](https://cdn.nlark.com/yuque/__latex/df378375e7693bdcf9535661c023c02e.svg)，相关组别个数 ![img](https://cdn.nlark.com/yuque/__latex/7a1e6a754b7a8e45cb731688765c5e85.svg)（处理因素水平数），总例数 ![img](https://cdn.nlark.com/yuque/__latex/691eae49506246da390d31766a7d9795.svg)。
① 将每个区组数据由小到大编秩，遇相等数据取平均秩；
② 计算各组秩和 ![img](https://cdn.nlark.com/yuque/__latex/14182e4bb839505378c0aa98d41a89d8.svg)，平均秩和 ![img](https://cdn.nlark.com/yuque/__latex/219d33ef7db2b8eca0c8481d877e0c26.svg)；
③ 求 ![img](https://cdn.nlark.com/yuque/__latex/6f5dde593f0bc27956e14b5eaec2ed17.svg) 值：  

![img](https://cdn.nlark.com/yuque/__latex/cc948fadd795fa6cfbd920d3b1a0d80e.svg)

**确定** ![img](https://cdn.nlark.com/yuque/__latex/ffd1905f6d4d60accedfa6b91be93ea9.svg) **值**：
当 ![img](https://cdn.nlark.com/yuque/__latex/8fe38c8a9a5f728987a520d8dbc96950.svg) 和 ![img](https://cdn.nlark.com/yuque/__latex/76068c20fe96a1df9f907302308edbbd.svg) 时，查 ![img](https://cdn.nlark.com/yuque/__latex/6f5dde593f0bc27956e14b5eaec2ed17.svg) **界值表** 确定 ![img](https://cdn.nlark.com/yuque/__latex/ffd1905f6d4d60accedfa6b91be93ea9.svg) 值。  

#### 2. ![img](https://cdn.nlark.com/yuque/__latex/31e8b215db2ad0a073daf2fbd310fd00.svg) 近似法

**检验统计量** ![img](https://cdn.nlark.com/yuque/__latex/acf4368e052a69d240972d5506c6e95a.svg) **值计算**：
当 ![img](https://cdn.nlark.com/yuque/__latex/147293e334c263308eafde7da6303906.svg) 或 ![img](https://cdn.nlark.com/yuque/__latex/9a98820be13c174c426c4eb899cfc967.svg) 时，使用公式：  

![img](https://cdn.nlark.com/yuque/__latex/94fd4a1d35b4eee1e512e034722141aa.svg)

其中 ![img](https://cdn.nlark.com/yuque/__latex/a42a4fc28b384cc408de066beed57485.svg) 为校正系数（相同秩次多时需校正），![img](https://cdn.nlark.com/yuque/__latex/cb072eec5eadb81ad251f19d7965d661.svg) 为第 ![img](https://cdn.nlark.com/yuque/__latex/036441a335dd85c838f76d63a3db2363.svg) 个相同秩次的个数。  

**确定** ![img](https://cdn.nlark.com/yuque/__latex/ffd1905f6d4d60accedfa6b91be93ea9.svg) **值**：
按自由度 ![img](https://cdn.nlark.com/yuque/__latex/2c218d8ad4d5546c9c70dd175aad09b2.svg) 查 ![img](https://cdn.nlark.com/yuque/__latex/31e8b215db2ad0a073daf2fbd310fd00.svg) **界值表** 确定 ![img](https://cdn.nlark.com/yuque/__latex/ffd1905f6d4d60accedfa6b91be93ea9.svg) 值。  

#### 3. F 近似法

**秩转换的** ![img](https://cdn.nlark.com/yuque/__latex/7aaf2781990aa336d909f7ebd32e2f69.svg) **检验公式**：  

![img](https://cdn.nlark.com/yuque/0/2025/png/35630207/1751819685160-71453b09-bc25-4670-9254-7924b0881fb1.png)

### (二) 多个相关样本两两比较的 ![img](https://cdn.nlark.com/yuque/__latex/34c7b563b30bde3c748139530686798e.svg) 检验

### 多个相关样本两两比较的 q 检验

当经过多个相关样本比较的 Friedman M 检验拒绝![img](https://cdn.nlark.com/yuque/__latex/8f85719c7c11dddba4d6aa11d515e6d2.svg)，接受![img](https://cdn.nlark.com/yuque/__latex/cd6862ad977c56a651630436c9a17333.svg)，认为多个总体分布位置不全相同时，若要进一步推断是哪两个总体分布位置不同，可用 ![img](https://cdn.nlark.com/yuque/__latex/34c7b563b30bde3c748139530686798e.svg) 检验。

#### 1. 检验统计量 (q) 值的计算

设有 (q) 个相关样本，当区组个数 (n) 较多时，按下式求第 A 个样本和第 B 个样本比较的 (q)：

![img](https://cdn.nlark.com/yuque/__latex/387ba7ad2d477a5438ad8d8e812c977a.svg)

其中

![img](https://cdn.nlark.com/yuque/__latex/4c219c25ae3349bf49f5a29806e3a95f.svg)

![img](https://cdn.nlark.com/yuque/__latex/41ed46a5f0b292ebe08cbe30fae3278b.svg)的自由度![img](https://cdn.nlark.com/yuque/__latex/930d5aea834d8d9ac429753bbb1a38bd.svg)。此外，引入样本跨度 (![img](https://cdn.nlark.com/yuque/__latex/26fdbf8e53cb0e48da5f4ddd4aaf5a5c.svg)) 指，把 (![img](https://cdn.nlark.com/yuque/__latex/7a1e6a754b7a8e45cb731688765c5e85.svg)) 个样本秩和从小到大排序后 (![img](https://cdn.nlark.com/yuque/__latex/8873fb0f47de264d80ff326b3d9b5c3f.svg)) 和 (![img](https://cdn.nlark.com/yuque/__latex/e11f133c0490ea68fc2a3578bc40fa98.svg)) 之间涵盖的秩和个数（包括 (![img](https://cdn.nlark.com/yuque/__latex/8873fb0f47de264d80ff326b3d9b5c3f.svg)) 和 (![img](https://cdn.nlark.com/yuque/__latex/e11f133c0490ea68fc2a3578bc40fa98.svg)) 自身在内）。

#### 2. 检验统计量 (q) 值的计算

根据自由度 (![img](https://cdn.nlark.com/yuque/__latex/4f23c015ac5a125459eadbb72d04e93d.svg))、(![img](https://cdn.nlark.com/yuque/__latex/26fdbf8e53cb0e48da5f4ddd4aaf5a5c.svg))，查 (![img](https://cdn.nlark.com/yuque/__latex/34c7b563b30bde3c748139530686798e.svg)) 值表(![img](https://cdn.nlark.com/yuque/__latex/4eda66044900efe97b6756cebd043caa.svg))，界定 (![img](https://cdn.nlark.com/yuque/__latex/ffd1905f6d4d60accedfa6b91be93ea9.svg)) 值，作出统计推断。

## 三、案例数据

8名受试对象在相同试验条件下分别接受A、B、C 3种不同频率振动的刺激，测量其反应率(%)，问3种频率振动刺激的反应率是否有差别？

8 名受试者接受 A、B、C 三种频率振动刺激的反应率 (%)：  

| ID   | A    | B    | C    |
| ---- | ---- | ---- | ---- |
| 1    | 8.4  | 9.6  | 9.8  |
| 2    | 11.6 | 12.7 | 11.6 |
| 3    | 9.4  | 9.1  | 10.1 |
| 4    | 9.0  | 8.7  | 9.6  |
| 5    | 8.0  | 8.0  | 8.6  |
| 6    | 8.6  | 9.8  | 9.6  |
| 7    | 8.9  | 9.0  | 10.4 |
| 8    | 7.8  | 8.2  | 8.5  |

------

## 四、假设检验

本数据经过“Normality Test (Shapiro-Wilk) (夏皮罗-威尔克正态性)”正态性检验结果显示A、B、C三组的P=0.060、0.037、0.597，前两组P值均<0.1，提示两组数据不满足正态性条件。因此，本案例应使用Friedman M检验比较三组反应率的差异。

**前提检验**：
Shapiro-Wilk 正态性检验：![img](https://cdn.nlark.com/yuque/__latex/7ecfecd495aff66294b133383910fbfe.svg)（A、B 组 ![img](https://cdn.nlark.com/yuque/__latex/0f5657bd1270dc94eefefdd960b332c0.svg)），拒绝正态性 → 使用 Friedman ![img](https://cdn.nlark.com/yuque/__latex/6f5dde593f0bc27956e14b5eaec2ed17.svg) 检验。

### (一) 建立检验假设

![img](https://cdn.nlark.com/yuque/__latex/57187f9bd9c2c01d01dc9aafd4f8e645.svg)：3种不同频率振动的刺激的反应率总体分布位置相同
![img](https://cdn.nlark.com/yuque/__latex/5211bedb600e31046860da77076ec475.svg)：3种不同频率振动的刺激的反应率总体分布位置相同不全相同
![img](https://cdn.nlark.com/yuque/__latex/69911f59fceea773510b534eaeacaebe.svg)  

### (二) 计算检验统计量

1. **编秩结果**：  

![img](https://cdn.nlark.com/yuque/0/2025/png/35630207/1751820122976-9d2fbcf3-ac6e-417c-bcb8-38f4e3c67f60.png)

1. **计算** ![img](https://cdn.nlark.com/yuque/__latex/6f5dde593f0bc27956e14b5eaec2ed17.svg) **值**：

![img](https://cdn.nlark.com/yuque/__latex/e57b51ed15ab9a0b9908e2ee8b794e87.svg)

### (三) 确定 ![img](https://cdn.nlark.com/yuque/__latex/ffd1905f6d4d60accedfa6b91be93ea9.svg) 值

![img](https://cdn.nlark.com/yuque/__latex/0e6cfe8381d6b5ecef6db36b3a3ce51c.svg)，查 ![img](https://cdn.nlark.com/yuque/__latex/6f5dde593f0bc27956e14b5eaec2ed17.svg) 界值表得 ![img](https://cdn.nlark.com/yuque/__latex/9d9c6890c9da57358ca09d0cc647cab2.svg)。按 ![img](https://cdn.nlark.com/yuque/__latex/b221a01585cbaaee5f26a1afae4ffff9.svg) 拒绝 ![img](https://cdn.nlark.com/yuque/__latex/57187f9bd9c2c01d01dc9aafd4f8e645.svg)，认为三种频率刺激反应率不全相同。

### (四) 事后检验（![img](https://cdn.nlark.com/yuque/__latex/34c7b563b30bde3c748139530686798e.svg) 检验）

虽然得到了“3种不同频率振动的刺激的反应率总体分布位置不全相同”的结论，但我们仍然不清楚到底是哪两组之间不同，因此需要进一步两两比较，采用多个相关样本两两比较的q检验。

#### 1. 建立检验假设，确定检验水准

![img](https://cdn.nlark.com/yuque/__latex/57187f9bd9c2c01d01dc9aafd4f8e645.svg)：任意两反应率总体分布位置相同
![img](https://cdn.nlark.com/yuque/__latex/5211bedb600e31046860da77076ec475.svg)：任意两反应率总体分布位置不同
![img](https://cdn.nlark.com/yuque/__latex/b221a01585cbaaee5f26a1afae4ffff9.svg)

#### 2. 计算检验统计量![img](https://cdn.nlark.com/yuque/__latex/34c7b563b30bde3c748139530686798e.svg)值

![img](https://cdn.nlark.com/yuque/__latex/12808fa76877d6a5d6f799c4378f4887.svg)

![img](https://cdn.nlark.com/yuque/__latex/652f5f20337cacacca0ae65838bee22e.svg)

![img](https://cdn.nlark.com/yuque/__latex/1115e74f701c27c32e282296aa7b5ffa.svg)

![img](https://cdn.nlark.com/yuque/__latex/242b445755d98c60f29875cffa40accd.svg)

![img](https://cdn.nlark.com/yuque/__latex/bd1dee38c7d8ed69fbd3f072aadccd18.svg)

同样可算得![img](https://cdn.nlark.com/yuque/__latex/9c3cac1f5f27b704c048fd400a3210ab.svg)。

| 对比组                                                       | ![img](https://cdn.nlark.com/yuque/__latex/34c7b563b30bde3c748139530686798e.svg) | ![img](https://cdn.nlark.com/yuque/__latex/a770a282bbfa0ae1ec474b7ed311656d.svg) | ![img](https://cdn.nlark.com/yuque/__latex/26fdbf8e53cb0e48da5f4ddd4aaf5a5c.svg) | ![img](https://cdn.nlark.com/yuque/__latex/ffd1905f6d4d60accedfa6b91be93ea9.svg) |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 频率![img](https://cdn.nlark.com/yuque/__latex/de951302f41d4707b9d80ca1af34dd0f.svg)与频率![img](https://cdn.nlark.com/yuque/__latex/54f5fb1b07a88521e7b036e3bc7a5e33.svg)比较 | 2.096508                                                     | 14                                                           | 2                                                            | ![img](https://cdn.nlark.com/yuque/__latex/68bda9cd33470d45dab4d28c27f10912.svg) |
| 频率![img](https://cdn.nlark.com/yuque/__latex/de951302f41d4707b9d80ca1af34dd0f.svg)与频率![img](https://cdn.nlark.com/yuque/__latex/a42a4fc28b384cc408de066beed57485.svg)比较 | 4.891853                                                     | 14                                                           | 3                                                            | ![img](https://cdn.nlark.com/yuque/__latex/bd99407c15dd9e52e17b9e5742b8d0b4.svg) |
| 频率![img](https://cdn.nlark.com/yuque/__latex/54f5fb1b07a88521e7b036e3bc7a5e33.svg)与频率![img](https://cdn.nlark.com/yuque/__latex/a42a4fc28b384cc408de066beed57485.svg)比较 | 2.795344                                                     | 14                                                           | 2                                                            | ![img](https://cdn.nlark.com/yuque/__latex/68bda9cd33470d45dab4d28c27f10912.svg) |

#### 3. 确定![img](https://cdn.nlark.com/yuque/__latex/ffd1905f6d4d60accedfa6b91be93ea9.svg)值，作出推断结论

列出相关样本两两比较表见图3。根据图3中![img](https://cdn.nlark.com/yuque/__latex/7300b630c6b979cf00e93cda0996a209.svg)值，查（t界值表），界定![img](https://cdn.nlark.com/yuque/__latex/ffd1905f6d4d60accedfa6b91be93ea9.svg)值，见图3第"P"栏。

可见频率![img](https://cdn.nlark.com/yuque/__latex/de951302f41d4707b9d80ca1af34dd0f.svg)和频率![img](https://cdn.nlark.com/yuque/__latex/54f5fb1b07a88521e7b036e3bc7a5e33.svg)声音刺激的反应率差异无统计学意义；频率![img](https://cdn.nlark.com/yuque/__latex/de951302f41d4707b9d80ca1af34dd0f.svg)和频率![img](https://cdn.nlark.com/yuque/__latex/a42a4fc28b384cc408de066beed57485.svg)声音刺激的反应率差异有统计学意义；频率![img](https://cdn.nlark.com/yuque/__latex/54f5fb1b07a88521e7b036e3bc7a5e33.svg)和频率![img](https://cdn.nlark.com/yuque/__latex/a42a4fc28b384cc408de066beed57485.svg)声音刺激的反应率差异无统计学意义。''

## 转自：

原文出自：https://mengte.online/archives/361?pcat=1

SPSS实操案例：https://mengte.online/archives/446',
  '9.md'
);

-- 验证插入结果
SELECT COUNT(*) as total_methods FROM statistical_methods;
SELECT id, title, file_source, created_at FROM statistical_methods ORDER BY id;
