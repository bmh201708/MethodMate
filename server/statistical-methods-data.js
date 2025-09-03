// Statistical methods detailed information storage module
// Stores detailed introductions of common statistical methods to avoid frequent AI API calls

const STATISTICAL_METHODS = {
  // One Sample t-test
  'One Sample t-test': {
    keywords: ['One Sample t-test', 'one sample t-test', 'one-sample t-test', 'single sample t-test'],
    content: `# One Sample t-test

In statistical analysis of quantitative data, the simplest and most commonly used method is the **t-test** (*t-test* / *Student's t-test*), which includes: One-sample t-test, Independent-samples t-test, and Paired-samples t-test. The following will introduce the applicable conditions and hypothesis testing theory of the one-sample t-test with examples.

## I. Applicable Conditions

The one-sample *t*-test must satisfy four conditions:

Condition 1: The observed variable is a continuous variable.

Condition 2: The observed variables are independent of each other.

Condition 3: The observed variables have no significant outliers.

Condition 4: The observed variables follow a (approximately) normal distribution.

## II. Statistical Calculation

The one-sample t-test is a comparison between the known sample mean $\\bar{x}$ (representing the unknown population mean $\\mu$) and the known population mean $\\mu_0$ (usually theoretical values, standard values, or stable values obtained through extensive observation). Its test statistic is:

$$t = \\frac{\\bar{x} - \\mu_0}{s/\\sqrt{n}}$$

Where $df = n-1$ is the degrees of freedom, indicating the number of variables that can take values freely. $s_{\\bar{x}} = s/\\sqrt{n}$ is the estimated value of the standard error of the mean, which is the standard deviation of the sample mean, reflecting the dispersion of the sample mean distribution and the difference between the sample mean and the corresponding population mean, indicating the magnitude of sampling error of the mean; it is directly proportional to the sample standard deviation and inversely proportional to the square root of sample size $n$.

## III. Case Data

A doctor measured the hemoglobin content of 52 adult male workers engaged in special operations. Assuming that the known mean hemoglobin content of normal adult males is 145g/L, is there a difference between the hemoglobin content of adult male workers engaged in special operations and normal adult males? The data are shown in Table 1 below.

| ID | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Hb(g/L) | 134 | 132 | 89 | 137 | 95 | 99 | 102 | 103 | 104 | 105 | 109 | 111 | 112 |

| ID | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Hb(g/L) | 115 | 115 | 119 | 116 | 124 | 125 | 125 | 125 | 126 | 127 | 127 | 127 | 127 |

| ID | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Hb(g/L) | 128 | 128 | 128 | 123 | 128 | 124 | 129 | 130 | 134 | 135 | 136 | 139 | 150 |

| ID | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Hb(g/L) | 151 | 156 | 157 | 159 | 161 | 162 | 145 | 148 | 165 | 130 | 135 | 129 | 132 |

**Table 1. Data Details**

## IV. Hypothesis Testing

### (I) Establish Test Hypothesis and Determine Significance Level

- $H_0$: $\\mu = 145$, i.e., the mean hemoglobin content of male workers engaged in special operations equals that of normal adult males  
- $H_1$: $\\mu \\neq 145$, i.e., the mean hemoglobin content of male workers engaged in special operations does not equal that of normal adult males  
- Significance level: $\\alpha = 0.05$

### (II) Calculate Test Statistic

In this example, $n = 52$, $\\bar{x} = 128.9$, $s = 20.0$, $\\mu_0 = 145$.
Using the above formula, we calculate:

$$t = \\frac{128.9 - 145}{20.0/\\sqrt{52}} = -5.80$$

### (III) Determine P Value and Make Inference Conclusion

With degrees of freedom $df = 51$, consulting the two-tailed $t$ distribution table gives:

$P < 0.001$

Therefore, $P < 0.05$.

At the $\\alpha = 0.05$ significance level, reject the null hypothesis $H_0$ and accept the alternative hypothesis $H_1$. The difference is statistically significant.

In combination with this problem, it can be concluded that the average hemoglobin content of male workers engaged in special operations is **lower than** that of normal adult males.

## V. Analysis Tips

### (I) Outlier Detection

There are various methods for outlier detection, including:

- **Professional judgment**. Judging whether values are outliers from a professional perspective is often the most basic and reliable method. Many outliers detected through statistical methods ultimately need to be evaluated from a professional perspective to determine whether they are true outliers; however, in actual research processes, some variable indicators are difficult to assess for abnormality from a professional perspective.
- **Graphical methods**, including histogram method and box plot method. In histograms, values located at both ends of the graph and far from the mean generally suggest possible outliers; in box plots, values located outside the upper and lower quartiles ±1.5 times the interquartile range generally suggest possible outliers.
- **Statistical description method**. Generally, data located outside the mean ±3 times the standard deviation suggest possible outliers.
- **Mahalanobis distance method**, commonly used for multivariate outlier detection.

### (II) Outlier Treatment

Attention should be paid to outlier treatment:

- Before the cause of outliers is unclear, their inclusion or exclusion should not be simply decided. Outliers detected through graphical and statistical description methods should preferably be evaluated from a professional perspective to determine whether they are true outliers.
- Check original records as much as possible. If data is confirmed to have logical errors and cannot be corrected, it can be directly deleted.
- If data has no obvious logical errors, perform analysis both before and after data deletion. If results are not contradictory, do not delete; if results are contradictory and data needs to be deleted, sufficient reasonable explanation must be provided.
- If other values are used to replace outliers, it is best to perform analysis on data both before and after replacement and compare the results.

**Source:** https://mengte.online/archives/194

SPSS practical case: https://mengte.online/archives/214`
  },
  
  // Independent samples t-test
  'Independent samples t-test': {
    keywords: ['Independent samples t-test', 'independent samples t-test', 'independent t-test', 'independent t test', 'two-sample t-test'],
    content: `# Independent Samples t-test

The independent samples t-test is also called the two-sample/group t-test or two independent-sample t-test. It is commonly used in medical research for comparing the means of two samples in a completely randomized design, where subjects are completely randomly assigned to two different treatment groups, and researchers are concerned with whether the two sample means representing two population means are unequal. In addition, in observational studies, the comparison of two sample means obtained by completely random sampling from two populations can also use the independent samples t-test.

## I. Applicable Conditions

The independent samples t-test must satisfy six conditions:

- **Condition 1**: The observed variable is a continuous variable.
- **Condition 2**: The observed variables are independent of each other.
- **Condition 3**: The observed variables are divided into 2 groups.
- **Condition 4**: The observed variables have no significant outliers.
- **Condition 5**: The observed variables in each group follow a normal (or approximately normal) distribution.
- **Condition 6**: The variances of the observed variables in the two groups are equal.

## II. Statistical Calculation

When both samples come from normal populations but the sample sizes are small, such as $n_1 < 30$ or/and $n_2 < 30$, different testing methods should be adopted according to whether the variances of the two populations are equal.

### (I) t-test for Equal Population Variances

When the variances of the two populations are equal, i.e., $\\sigma_1^2 = \\sigma_2^2$, the two sample variances can be pooled to obtain their common variance—pooled variance $s_p^2$.

The test statistic for the two-sample t-test can be calculated according to the one-sample t-test statistic calculation formula, constructed under the condition $H_0: \\mu_1 = \\mu_2$, i.e., $\\mu_1 - \\mu_2 = 0$. Its test statistic is:

$$t = \\frac{(\\bar{x_1} - \\bar{x_2}) - (\\mu_1 - \\mu_2)}{s_{\\bar{x_1} - \\bar{x_2}}}$$

That is:

$$t = \\frac{\\bar{x_1} - \\bar{x_2}}{s_{\\bar{x_1} - \\bar{x_2}}}$$

=

$$t = \\frac{\\bar{x_1} - \\bar{x_2}}{s_p\\sqrt{\\frac{1}{n_1} + \\frac{1}{n_2}}}$$

=

$$t = \\frac{\\bar{x_1} - \\bar{x_2}}{\\sqrt{\\frac{s_p^2}{n_1} + \\frac{s_p^2}{n_2}}}$$

### (II) Approximate t-test for Unequal Population Variances

For comparing the means of two small samples, if the populations follow normal distributions but the variances of the two populations are unequal, i.e., $\\sigma_1^2 \\neq \\sigma_2^2$, data transformation (such as t-test for geometric means of two samples, which involves taking logarithms of the original data before conducting the t-test) or the following approximate t-test—$t'$ test or rank transformation non-parametric test can be used.

There are three methods available for approximate t-tests: Cochran & Cox method, Satterthwaite method, and Welch method.

#### 1. Cochran & Cox Approximate t-test

The test statistic of the Cochran & Cox method (1950) is $t'$, calculated according to the formula below. Since the $t'$ distribution is complex, the approximate critical value is often calculated using $t$.

$$t' = \\frac{\\bar{x_1} - \\bar{x_2}}{\\sqrt{\\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2}}}$$

$$t_{\\alpha(v)} = \\frac{t_{\\alpha(v_1)} \\cdot \\frac{s_1^2}{n_1} + t_{\\alpha(v_2)} \\cdot \\frac{s_2^2}{n_2}}{\\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2}}$$

The relationship between $t'$ values and $P$ values is the same as that between $t$ values and $P$ values. Note:

1. When $s_1^2 = s_2^2$, $t_{\\alpha(v)} = t_{\\alpha(v_1)} = t_{\\alpha(v_2)}$, $v = v_1 + v_2$ (not $v_1 \\cdot v_2$);
2. When using two-sided probability, $t_{\\alpha(v)}$ takes $t_{\\alpha/2(v_1)}$ and $t_{\\alpha/2(v_2)}$.

#### 2. Satterthwaite Approximate t-test

The Cochran & Cox method corrects the critical value, while the Satterthwaite method (1946) corrects the degrees of freedom. That is, use $t'$ in the above formula instead of $t$, and calculate the degrees of freedom correction according to the following formula. The final result is determined according to the $t$ critical value table.

$$v' = \\frac{(\\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2})^2}{\\frac{(\\frac{s_1^2}{n_1})^2}{n_1-1} + \\frac{(\\frac{s_2^2}{n_2})^2}{n_2-1}}$$

#### 3. Welch Approximate t-test

The Welch method (1947) also corrects the degrees of freedom. The correction is calculated according to the following formula:

$$v'' = \\frac{(\\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2})^2}{\\frac{(\\frac{s_1^2}{n_1})^2}{n_1+1} + \\frac{(\\frac{s_2^2}{n_2})^2}{n_2+1}} - 2$$

## III. Case Data

A doctor studied the clinical significance of a biochemical indicator (X) for the diagnosis of viral hepatitis, measuring the content of biochemical indicator (X) (μg/dl) in 20 normal people and 19 viral hepatitis patients. Is there a difference in biochemical indicator (X) content between viral hepatitis patients and normal people? The data are shown in the table below.

| ID    | 1     | 2     | 3     | 4     | 5     | 6     | 7     | 8     | 9     | 10    |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| group | 1     | 1     | 1     | 1     | 1     | 1     | 1     | 1     | 1     | 1     |
| X     | 263.8 | 271.5 | 284.6 | 292.7 | 254.8 | 275.9 | 281.7 | 268.6 | 264.4 | 275.3 |

| ID    | 11    | 12    | 13    | 14    | 15    | 16    | 17    | 18    | 19    | 20    |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| group | 1     | 1     | 1     | 1     | 1     | 1     | 1     | 1     | 1     | 1     |
| X     | 270.8 | 262.3 | 275.9 | 281.7 | 268.6 | 264.4 | 273.2 | 270.9 | 260.5 | 264.4 |

| ID    | 21    | 22    | 23    | 24    | 25    | 26    | 27    | 28    | 29    | 30    |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| group | 2     | 2     | 2     | 2     | 2     | 2     | 2     | 2     | 2     | 2     |
| X     | 235.9 | 215.4 | 251.8 | 224.7 | 228.3 | 231.1 | 253   | 221.7 | 218.8 | 232.7 |

| ID    | 31    | 32    | 33    | 34    | 35    | 36    | 37    | 38    | 39    |       |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| group | 2     | 2     | 2     | 2     | 2     | 2     | 2     | 2     | 2     |       |
| X     | 230.9 | 240.7 | 255.8 | 260.7 | 224.4 | 232.7 | 231.5 | 240.7 | 257.3 |       |

**Table 1. Specific Data**

## IV. Hypothesis Testing

### (I) Homogeneity of Variance Test

Here, the Levene test is used for homogeneity of variance testing. Due to the massive computational load of this test, jamovi software is used to complete the calculation process.

Homogeneity of Variance Test (Levene's Test)

|      | F     | df   | df2  | p     |
| ---- | ----- | ---- | ---- | ----- |
| X    | 3.883 | 1    | 37   | 0.056 |

*Note*: Lower p values suggest possible violation of the homogeneity of variance assumption

### (II) Cochran & Cox Approximate t-test

#### 1. Establish Test Hypothesis and Determine Significance Level

H0: μ1= μ2, i.e., the mean biochemical indicator (X) content of viral hepatitis patients and normal people is equal
H1: μ1 ≠ μ2, i.e., the mean biochemical indicator (X) content of viral hepatitis patients and normal people is not equal
a = 0.05

#### 2. Calculate Test Statistic

According to the data:

$n_1 = 20$, $n_2 = 19$, $\\bar{x_1} = 270.7$, $\\bar{x_2} = 235.9$

Calculated according to the Cochran & Cox approximate t-test statistic formula:

$t' = 9.352$,$t_{0.025(18)} = 2.101$, $t_{0.025(19)} = 2.093$

Consulting the t critical value table,$t_{0.025(18)} = 2.101$,$t_{0.025(19)} = 2.093$, calculating the critical value:

$t_{0.05(v)} = \\frac{2.101 \\times 8.47 + 2.093 \\times 8.46}{8.47 + 8.46} = 2.098611$

#### 3. Determine P Value and Make Inference Conclusion

Since |t′|=9.352>2.098611, P<0.05. At a = 0.05 significance level, reject H0 and accept H1, the difference is statistically significant. It can be concluded that there is a difference in biochemical indicator (X) content between viral hepatitis patients and normal people.

### (III) Satterthwaite Approximate t-test

#### 1. Establish Test Hypothesis and Determine Significance Level

$H_0$: $\\mu_1 = \\mu_2$, i.e., the mean biochemical indicator (X) content of viral hepatitis patients and normal people is equal  

$H_1$: $\\mu_1 \\neq \\mu_2$, i.e., the mean biochemical indicator (X) content of viral hepatitis patients and normal people is not equal  

$\\alpha = 0.05$  

#### 2. Calculate Test Statistic

$n_1 = 20$, $n_2 = 19$, $\\bar{x_1} = 270.7$, $\\bar{x_2} = 235.9$, calculated according to the Cochran & Cox approximate t-test statistic formula:  

$t' = 9.352$  ,$t_{0.025(18)} = 2.101$, $t_{0.025(19)} = 2.093$  

According to the Satterthwaite method degrees of freedom correction formula:

$v' = \\frac{(8.47 + 8.46)^2}{\\frac{8.47^2}{19} + \\frac{8.46^2}{18}} = 36.97$  

#### 3. Determine P Value and Make Inference Conclusion

With $df = 37$, consulting the t critical value table gives $t_{0.025(37)} = 2.026$, i.e., $|t'| = 9.352 > 2.026$, thus $P < 0.05$. At $\\alpha = 0.05$ significance level, reject $H_0$ and accept $H_1$, the difference is statistically significant. It can be concluded that there is a difference in biochemical indicator (X) content between viral hepatitis patients and normal people. The conclusion is consistent with the Cochran & Cox approximate t-test.

### (IV) Welch Approximate t-test

#### 1. Establish Test Hypothesis and Determine Significance Level

$H_0$: $\\mu_1 = \\mu_2$, i.e., the mean biochemical indicator (X) content of viral hepatitis patients and normal people is equal  

$H_1$: $\\mu_1 \\neq \\mu_2$, i.e., the mean biochemical indicator (X) content of viral hepatitis patients and normal people is not equal  

$\\alpha = 0.05$  

#### 2. Calculate Test Statistic

$n_1 = 20$, $n_2 = 19$, $\\bar{x_1} = 270.7$, $\\bar{x_2} = 235.9$, calculated according to the Cochran & Cox approximate t-test statistic formula:  

$t' = 9.352$  , $t_{0.025(18)} = 2.101$, $t_{0.025(19)} = 2.093$  

According to the Welch method degrees of freedom correction formula:

$v'' = \\frac{(8.47 + 8.46)^2}{\\frac{8.47^2}{21} + \\frac{8.46^2}{20}} - 2 = 36.97$  

#### 3. Determine P Value and Make Inference Conclusion

With $df = 37$, consulting the t critical value table gives $t_{0.025(37)} = 2.026$, i.e., $|t'| = 9.352 > 2.026$, thus $P < 0.05$. At $\\alpha = 0.05$ significance level, reject $H_0$ and accept $H_1$, the difference is statistically significant. It can be concluded that there is a difference in biochemical indicator (X) content between viral hepatitis patients and normal people. The conclusion is consistent with both the Cochran & Cox approximate t-test and Satterthwaite approximate t-test.

## V. Analysis Tips

- When conducting independent samples *t*-tests, normality tests should be performed by group, rather than conducting one normality test on all data.
- The *t*-test has some tolerance for non-normality of data. If the data is only slightly skewed, the results remain robust.
- Independent samples *t*-tests have relatively strict requirements for homogeneity of variance between two groups of data. Compared to data violating normality, variance heterogeneity has a greater impact on conclusions.
- If data satisfies conditions 1 to 5 but only fails to meet variance homogeneity, corrected t-tests (Welch's *t*-test) can be used. However, if the variance difference between data is too large, it's better to use non-parametric tests (Mann-Whitney U test). If data fails both normality and variance homogeneity, it's better to use non-parametric tests (Mann-Whitney U test).
- If there is no statistically significant difference in variance between two groups of data, Student's *t*-test has higher statistical test efficiency (lower probability of Type II error) than Welch's *t*-test. If there is a large variance difference between two groups of data, Welch's *t*-test has a lower probability of Type II error and more reliable results.
- Compared to data violating normality, variance heterogeneity has a greater impact on conclusions, so it mainly relies on hypothesis testing for examination. However, the results of "homogeneity of variance test (Levene's)" are easily affected by sample size and are not very stable. When the sample size is large, it tends to conclude that the *P* value is below the test criterion, although the variance difference between groups may not be large; conversely, when the sample size is small, although the variance difference between groups may be large, it tends to conclude that the *P* value is above the test criterion. Therefore, it is necessary to report the specific standard deviations and variances of each group data in the form of statistical description and include them in comprehensive consideration.

**Source:** https://mengte.online/archives/327

SPSS practical case: https://mengte.online/archives/2171`
  },
  
  // Paired samples t-test
  'Paired samples t-test': {
    keywords: ['Paired samples t-test', 'paired samples t-test', 'paired t-test', 'matched t-test'],
    content: `# Paired Samples t-test

The paired samples t-test, abbreviated as paired/matched t-test, is also called related-sample t-test. It is suitable for comparing quantitative data from paired designs or self-controlled designs. Paired design involves pairing subjects according to some important characteristics (such as gender, age, and other suspected confounding factors), then randomly assigning the two subjects in each pair to two treatment groups. In medical research, paired designs mainly include the following situations: ① Pairing different body parts of the same group of subjects, such as the expression of a gene in cancer tissue and adjacent normal tissue, or blood pressure comparison between left and right hands. ② Conditional pairing, such as selecting 2 mice with the same gender and weight from the same litter as a pair, forming multiple pairs; then randomly assigning the 2 mice in each pair to 2 treatment groups, and then comparing the effects of two treatment methods. ③ Pairing the same batch of specimens with different detection methods, such as dividing the same batch of blood into 2 parts and using two methods to detect the content of a biochemical indicator. ④ There is also a special research design where the same group of subjects is paired before and after intervention, such as comparing fasting blood glucose values before and after using hypoglycemic drugs in the same group of patients. For this type of design, although paired samples t-test can be used for data analysis, strictly speaking, it does not belong to paired design but rather to repeated measurement design before and after intervention.

## I. Applicable Conditions

Paired samples t-test must satisfy five conditions:

**Condition 1**: The observed variable is a continuous variable.

**Condition 2**: The observed variable is from a paired design.

**Condition 3**: The observed variables can be divided into 2 groups.

**Condition 4**: The observed variables have no significant outliers.

**Condition 5**: The differences between the observed variables in the two paired groups follow a normal (or approximately normal) distribution.  

## II. Statistical Calculation

After calculating the differences in paired data, the essence of the paired t-test is the same as the one-sample t-test. Taking the above-mentioned ② conditional pairing as an example, two homogeneous subjects are paired to receive two different treatments respectively. If the two treatment effects are the same, i.e., $\\mu_d = 0$ (when the known population mean $\\mu_0 = 0$). That is, the differences in paired data should fluctuate around 0 and not be too far above 0. Therefore, this type of data can be regarded as a comparison between the unknown population mean $\\mu_0$ represented by the sample mean of differences $\\bar{d}$ and the known population mean $\\mu_0 = 0$. Its test statistic can be calculated according to the following formula:

$$t = \\frac{\\bar{d} - \\mu_0}{s_d/\\sqrt{n}}$$

Different from the one-sample t-test statistic calculation formula (One-sample t-test - theoretical introduction), $\\bar{d}$ is the difference of each pair of data, $\\bar{d}$ is the sample mean of differences, $s_d$ is the standard deviation of differences, $s_d$ is the standard error of the sample mean of differences, and $n$ is the number of pairs.

| ID   | Before | After  | Difference $\\bar{d}$ |
| ---- | ------ | ------ | --------------- |
| 1    | 0.287  | 0.2745 | 0.0125          |
| 2    | 0.2921 | 0.2834 | 0.0087          |
| 3    | 0.295  | 0.2845 | 0.0105          |
| 4    | 0.305  | 0.287  | 0.018           |
| 5    | 0.323  | 0.2945 | 0.0285          |
| 6    | 0.343  | 0.296  | 0.047           |
| 7    | 0.3467 | 0.3217 | 0.025           |
| 8    | 0.354  | 0.2955 | 0.0585          |
| 9    | 0.3544 | 0.3113 | 0.0431          |
| 10   | 0.355  | 0.2755 | 0.0795          |
| 11   | 0.3578 | 0.3247 | 0.0331          |
| 12   | 0.364  | 0.325  | 0.039           |
| 13   | 0.3824 | 0.3456 | 0.0368          |
| 14   | 0.3936 | 0.3169 | 0.0767          |
| 15   | 0.399  | 0.352  | 0.047           |
| 16   | 0.313  | 0.2945 | 0.0185          |
| 17   | 0.333  | 0.299  | 0.034           |

## III. Hypothesis Testing

### (I) Establish Test Hypothesis and Determine Significance Level

$H_0: \\mu_d = 0$, i.e., the two methods have no effect on the detection results of biochemical indicator (X) content in muscle tissue;

$H_1: \\mu_d \\neq 0$, i.e., the two methods have an effect on the detection results of biochemical indicator (X) content in muscle tissue.

$\\alpha = 0.05$

### (II) Calculate Test Statistic

In this example, $n = 17$

$\\bar{d} = 0.0386$, $s_d = 0.0213$

According to the above formula:

$$t = \\frac{0.0386 - 0}{0.0213/\\sqrt{17}} = 7.468$$

## (III) Determine P Value and Make Inference Conclusion

With $df = 16$, consulting the (critical value table) gives $t_{0.025(16)} = 2.120$, thus $P < 0.05$. At $\\alpha = 0.05$ significance level, reject $H_0$ and accept $H_1$, the difference is statistically significant. It can be concluded that the two methods have an effect on the detection results of biochemical indicator (X) content in muscle tissue.

**Source:** https://mengte.online/archives/331

SPSS practical case: https://mengte.online/archives/2205`
  },
  
  // One-way ANOVA
  'One-way ANOVA': {
    keywords: ['One-way ANOVA', 'one-way anova', 'one way anova', 'single factor anova', 'anova', '单因素方差分析', '单因素anova'],
    content: `# One-way ANOVA

One-way Analysis of Variance (One-way ANOVA), also known as completely randomized design ANOVA, refers to a method that uses completely randomized grouping to randomly assign subjects to different treatment groups, then compares whether the differences between group means are statistically significant, thereby inferring the effects of treatment factors. This article introduces the applicable conditions and hypothesis testing of one-way ANOVA with examples.

## I. Applicable Conditions

One-way ANOVA must satisfy 6 conditions:

**Condition 1**: The observed variable is a continuous variable.

**Condition 2**: The observations are independent of each other.

**Condition 3**: The observations can be divided into multiple groups (≥2).

**Condition 4**: The observed variables have no significant outliers.

**Condition 5**: The observations in each group follow a normal (or approximately normal) distribution.

**Condition 6**: The overall variances of multiple groups of observations are equal.

## II. Statistical Calculation

### (I) One-way ANOVA

When the overall variances of multiple groups of observed variables are equal, i.e., when homogeneity of variance is satisfied, F-test can be used for one-way ANOVA. When the overall variances of multiple groups of observed variables are not equal, i.e., when homogeneity of variance is not satisfied, variable transformation can be performed to meet the homogeneity of variance requirement, or corrected one-way ANOVA (Welch test) can be used for comparison.

#### 1. F-test

The total variation in one-way ANOVA can be decomposed into between-group variation and within-group variation:

$$SS_{total} = SS_{between} + SS_{within}$$

The ANOVA calculation formula is shown in Table 1, where the correction factor $C = \\frac{T^2}{N}$, $N$ is the sample size, and $k$ is the number of treatment groups.

| Source of Variation | Sum of Squares $SS$ | Degrees of Freedom $df$ | Mean Square $MS$ | $F$ |
| ------------ | ----------- | ----------- | --------- | --- |
| **Total Variation**   | $SS_{total} = \\sum X^2 - C$ | $N-1$ |  |  |
| **Between-group Variation** | $SS_{between} = \\sum \\frac{T_i^2}{n_i} - C$ | $k-1$ | $MS_{between} = \\frac{SS_{between}}{k-1}$ | $F = \\frac{MS_{between}}{MS_{within}}$ |
| **Within-group Variation** | $SS_{within} = SS_{total} - SS_{between}$ | $N-k$ | $MS_{within} = \\frac{SS_{within}}{N-k}$ |  |

**Table 1 One-way ANOVA Table**

#### **2. Welch Test**

The Welch test refers to using the statistics of the Welch distribution to test whether the means of each group are equal. The Welch distribution is approximately an F distribution. The Welch test has no requirement for homogeneity of variance, so when the data distribution does not meet the requirement of homogeneity of variance, the Welch test is more reliable than the F test. Its calculation formula is as follows:

$$F_w = \\frac{\\sum_{i=1}^{k} w_i(\\bar{x_i} - \\bar{x_w})^2}{k-1}$$

Where $w_i = \\frac{n_i}{s_i^2}$, $\\bar{x_w} = \\frac{\\sum_{i=1}^{k} w_i \\bar{x_i}}{\\sum_{i=1}^{k} w_i}$, $n_i$ is the sample size of each group, and $k$ is the number of treatment groups.

$$\\lambda = 1 + \\frac{2(k-2)}{k^2-1} \\sum_{i=1}^{k} \\frac{1}{n_i-1}(1 - \\frac{w_i}{\\sum_{j=1}^{k} w_j})^2$$

Degrees of freedom:

$$df_2 = \\frac{k^2 - 1}{3\\lambda}$$

### **(II) Pairwise Comparisons of Multiple Sample Means**

In one-way ANOVA overall comparison, when the inference conclusion is to reject $H_0$ and accept $H_1$, we can only consider that there are differences in the overall comparison between population means, but it cannot explain that there are differences between any two population means. To further infer which specific two population means are different, further post-hoc testing (pairwise comparison) is needed. Post-hoc testing for multiple sample mean comparisons can be divided into two situations: first, all groups need to be compared with each other to understand whether there are differences between any two groups; second, only consider comparing a specific group with other groups, for example, when there is a control group, we want to know whether the means of other groups are different from the control group. There are many methods for multiple comparisons. Here we introduce three methods: the SNK method (q test) suitable for pairwise comparisons between multiple groups, the Dunnett-t method (q test) suitable for comparing a specific group with other groups, and the Games-Howell method suitable for pairwise comparisons between multiple groups with unequal variances.

#### **1. SNK Method**

The SNK method (Student-Newman-Keuls) is used to compare whether the population means represented by every two sample means are different. Its test statistic is q, also called the q test.

$$q = \\frac{|\\bar{x_i} - \\bar{x_j}|}{\\sqrt{\\frac{MS_e}{2}(\\frac{1}{n_i} + \\frac{1}{n_j})}}$$

Where $\\bar{x_i}$ and $\\bar{x_j}$ are the sample means of the two comparison groups, $MS_e$ is the error mean square (or within-group mean square) calculated in ANOVA, and $n_i$ and $n_j$ are the sample sizes of the two comparison groups respectively.

#### **2. Dunnett-t Method**

The Dunnett-t method is suitable for pairwise comparisons between multiple experimental groups and one control group. Its test statistic is q', also called the q' test.

$$q' = \\frac{|\\bar{x_i} - \\bar{x_0}|}{\\sqrt{MS_e(\\frac{1}{n_i} + \\frac{1}{n_0})}}$$

In the above formula, $\\bar{x_i}$ and $n_i$ are the experimental group mean and sample size, and $\\bar{x_0}$ and $n_0$ are the control group mean and sample size. After calculating the q' value, it is necessary to consult the (q' critical value table c). In the (q' critical value table c'), u is still the degrees of freedom of the error term in ANOVA, and a is still the number of groups included in the two comparison groups.

#### **3. Games-Howell Method**

The Games-Howell method is suitable for pairwise comparisons between multiple groups with unequal variances. The concept behind this method is to focus on the maximum difference between the means of two groups. Its statistic is calculated as:

$$q = \\frac{|\\bar{x_i} - \\bar{x_j}|}{\\sqrt{\\frac{s_i^2}{n_i} + \\frac{s_j^2}{n_j}}}$$

$n$ is the sample size of each group. The distribution of statistic q is called the studentized range q distribution. The critical values of this distribution are given in the (studentized range q table c') based on a, k (number of groups) and df_w values. If $q > q_{critical}$, then there is a statistical difference between the two group means.

This test is equivalent to

$$t = \\frac{|\\bar{x_i} - \\bar{x_j}|}{\\sqrt{\\frac{s_i^2}{n_i} + \\frac{s_j^2}{n_j}}} > t_{\\alpha/2,df}$$

## III. Case Data

A doctor used three treatment plans A, B, and C to treat anemic patients with low hemoglobin. After two months of treatment, the increase in hemoglobin (in grams) for each subject was recorded. The question is whether the three treatment plans have different effects on patient anemia? The specific data are shown in Table 2.

| ID    | 1    | 2    | 3    | 4    | 5    | 6    | 7    | 8    | 9    | 10   | 11   | 12   | 13   | 14   | 15   |
| ----- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| group | A    | A    | A    | A    | A    | A    | A    | A    | A    | A    | A    | A    | A    | A    | A    |
| Hb    | 0.5  | 0.6  | 0.5  | 0.7  | 0.8  | 0.9  | 1    | 1.1  | 1.2  | 1.4  | 1.4  | 1.5  | 1.5  | 1.6  | 1.6  |

| ID    | 16   | 17   | 18   | 19   | 20   | 21   | 22   | 23   | 24   | 25   | 26   | 27   | 28   | 29   | 30   |
| ----- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| group | A    | A    | A    | A    | A    | A    | A    | A    | A    | A    | A    | B    | B    | B    | B    |
| Hb    | 1.7  | 1.8  | 2    | 2.3  | 2.3  | 2.4  | 2.5  | 2.7  | 3    | 3.2  | 3.7  | 0.4  | 0.1  | 0.1  | 0.2  |

| ID    | 31   | 32   | 33   | 34   | 35   | 36   | 37   | 38   | 39   | 40   | 41   | 42   | 43   | 44   | 45   |
| ----- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| group | B    | B    | B    | B    | B    | B    | B    | B    | B    | B    | B    | B    | B    | B    | B    |
| Hb    | 0.3  | 0.5  | 0.7  | 0.7  | 1    | 1.2  | 1.6  | 1.6  | 1.6  | 1.9  | 2    | 2    | 2.4  | 2.5  | 2.7  |

| ID    | 46   | 47   | 48   | 49   | 50   | 51   | 52   | 53   | 54   | 55   | 56   | 57   | 58   | 59   | 60   |
| ----- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| group | B    | B    | B    | B    | B    | B    | B    | C    | C    | C    | C    | C    | C    | C    | C    |
| Hb    | 1.3  | 1.3  | 1.2  | 1.2  | 1.1  | 1.4  | 1.5  | 0.7  | 0.3  | 0.2  | 0.2  | 0.2  | 0.7  | 0.7  | 0.8  |

| ID    | 61   | 62   | 63   | 64   | 65   | 66   | 67   | 68   | 69   | 70   | 71   | 72   | 73   | 74   | 75   |
| ----- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| group | C    | C    | C    | C    | C    | C    | C    | C    | C    | C    | C    | C    | C    | C    | C    |
| Hb    | 0.9  | 0.9  | 1.1  | 1.1  | 1.3  | 1.3  | 1.4  | 1.5  | 1.7  | 1.9  | 2    | 2.1  | 1    | 1    | 1.2  |

| ID    | 76   | 77   | 78   |      |      |      |      |      |      |      |      |      |      |      |      |
| ----- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| group | C    | C    | C    |      |      |      |      |      |      |      |      |      |      |      |      |
| Hb    | 1.2  | 0.6  | 0.6  |      |      |      |      |      |      |      |      |      |      |      |      |

**Table 2**

## IV. Hypothesis Testing

### (I) Normality Test

In analysis of variance, there are two options to test normality (refer to "Basic ideas and applicable conditions of analysis of variance"). In this example, there are 3 groups in total, each group has many observed values, so the normality of each group's observed values can be tested. This article uses jamovi software for data normality testing. The specific process refers to "One-way ANOVA - jamovi software implementation", and the results are shown in Figures 1 and 2.

Figures 1 and 2 list the normality test results of the three groups by group. The scatter points of the three groups in the Q-Q plot in Figure 1 are basically distributed around the diagonal, suggesting that the three groups of data follow a normal distribution; the normality test results in Figure 2 show that the *P* values of the three groups are 0.296, 0.486, and 0.435 respectively, all >0.1, which also suggests that the three groups of data meet the normality condition. In summary, this case meets the normality condition.

### (II) Homogeneity of Variance Test

Here, the Levene test is used for homogeneity of variance testing, using jamovi software to complete the calculation process. For specific operations, see "One-way ANOVA - jamovi software implementation", and the results are shown in Figures 3 and 4.

From the "Std. deviation" and "Variance" results in the "Descriptives" table in Figure 3, it can be seen that the standard deviations of groups A, B, and C are 0.867, 0.738, and 0.538 respectively, and the variances are 0.752, 0.545, and 0.290 respectively. There are differences in the variance values of the three groups, but judgment still needs to be based on the results of statistical testing.

Figure 4 "Homogeneity of Variances Test (Levene's)" shows the homogeneity of variance test results. It can be seen that $F = 4.83$, $P = 0.011 < 0.05$, suggesting that the variances of the three groups of data are not homogeneous and do not meet the requirements of homogeneity of variance.

The data in this case meets the normality requirement but does not meet the homogeneity of variance requirement. However, the variance is not severely heterogeneous, so the Welch test can be used for data analysis.

### (III) One-way ANOVA (Welch Test)

#### 1. Establish Test Hypothesis and Determine Significance Level

$H_0: \\mu_A = \\mu_B = \\mu_C$

That is, the grams of hemoglobin increase in subjects of the three treatment plans are equal

$H_1: \\mu_A, \\mu_B, \\mu_C$ are not all equal

The grams of hemoglobin increase in subjects of the three treatment plans are not all equal

$\\alpha = 0.05$

#### 2. Calculate Test Statistic

In this case, the sample sizes of groups A, B, and C are $n_A = 26$, $n_B = 26$, $n_C = 26$ respectively, the means of the three groups are $\\bar{x_A} = 1.665$, $\\bar{x_B} = 1.227$, $\\bar{x_C} = 1.000$ respectively, and the standard deviations of the three groups are $s_A = 0.867$, $s_B = 0.738$, $s_C = 0.538$ respectively.

According to the Welch test statistic calculation formula, the corresponding parameter values can be calculated as:

$w_A = \\frac{26}{0.867^2} = 34.62$

$w_B = \\frac{26}{0.738^2} = 47.76$

$w_C = \\frac{26}{0.538^2} = 89.88$

$\\bar{x_w} = \\frac{34.62 \\times 1.665 + 47.76 \\times 1.227 + 89.88 \\times 1.000}{34.62 + 47.76 + 89.88} = 1.237$

$F_w = \\frac{34.62(1.665-1.237)^2 + 47.76(1.227-1.237)^2 + 89.88(1.000-1.237)^2}{3-1} = 7.63$

$\\lambda = 1 + \\frac{2(3-2)}{3^2-1} \\times 0.259 = 1.065$

$df_2 = \\frac{3^2 - 1}{3 \\times 1.065} = 2.50$

#### 3. Determine P Value and Make Inference Conclusion

With $df_1 = 2$, $df_2 = 2.50$, consulting the (F critical value table) gives $F_{0.05(2,2.50)} = 9.00$. In this example, $F_w = 7.63 < 9.00$, then $P > 0.05$. At the $\\alpha = 0.05$ significance level, reject $H_0$ and accept $H_1$. The difference is statistically significant, indicating that the grams of hemoglobin increase in subjects of the three treatment plans are not all equal.

### (IV) Multiple Comparisons Between Multiple Sample Means (Games-Howell Method)

When variances are unequal, the Games-Howell method is commonly used for post-hoc pairwise comparisons of multiple means.

#### 1. Establish Test Hypothesis and Determine Significance Level

$H_0: \\mu_i = \\mu_j$ (i≠j)

That is, the grams of hemoglobin increase in subjects of any two treatment plans are equal

$H_1: \\mu_i \\neq \\mu_j$ (i≠j)

That is, the grams of hemoglobin increase in subjects of any two treatment plans are not equal

$\\alpha = 0.05$

#### 2. Calculate Test Statistic

**Comparison between Group A and Group B treatment plans**:

$\\bar{x_A} - \\bar{x_B} = 1.665 - 1.227 = 0.438$

$SE = \\sqrt{\\frac{0.867^2}{26} + \\frac{0.738^2}{26}} = 0.158$

$q = \\frac{0.438}{0.158} = 2.77$

$df = 49$

Based on ($\\alpha$ = 0.05), $k$ (number of groups) = 3 and $df$ = 49 from the (studentized range q table), we get ($q_{critical}$ = 3.418), so
$q = 2.77 < 3.418$.

Similarly, the statistics for the other two groups can be calculated, as shown in Table 3:

| group  | $\\bar{x_i} - \\bar{x_j}$ | $SE$ | $df$ | $q_{critical}$ | $q$ |
| ------ | ------------------------ | ---- | ---- | ---------- | --- |
| A vs B | 0.438                    | 0.158| 49   | 3.418      | 0.540 |
| A vs C | 0.665                    | 0.142| 42   | 3.436      | 0.486 |
| B vs C | 0.227                    | 0.127| 46   | 3.425      | 0.434 |

**Table 3**

#### 3. Determine P Value and Make Inference Conclusion

According to the statistics in Table 3, when comparing Group A and Group C, $q = 4.68 > 3.436$, we get $P < 0.05$. At the $\\alpha = 0.05$ significance level, reject $H_0$ and accept $H_1$. The difference is statistically significant, indicating that the grams of hemoglobin increase in subjects of Group A and Group C treatment plans are not equal. For the other two groups, $q < q_{critical}$, we get $P > 0.05$. At the $\\alpha = 0.05$ significance level, do not reject $H_0$, and the difference is not statistically significant.

**Source:** https://mengte.online/archives/920

SPSS practical case: https://mengte.online/archives/2066`
  },
  
  // Wilcoxon Signed Rank Test
  'Wilcoxon Signed Rank Test': {
    keywords: ['Wilcoxon Signed Rank Test', 'wilcoxon signed rank test', 'one sample wilcoxon', 'wilcoxon test', 'signed rank test', 'non-parametric test', 'wilcoxon符号秩检验', '单样本wilcoxon', 'wilcoxon检验', '符号秩检验', '非参数检验'],
    content: `# One Sample Wilcoxon Signed Rank Test

Non-parametric tests are relative to parametric tests. Rank transformation non-parametric tests first convert numerical variable data from small to large and ordinal data from weak to strong into ranks, then calculate test statistics. Their characteristic is that the results of hypothesis testing are not sensitive to differences in the shape of population distributions, but only sensitive to differences in the location of population distributions.

### Introduction:

Rank transformation non-parametric tests are commonly used in the following situations: ① For quantitative data that does not meet the conditions of normality and homogeneity of variance, it is inappropriate to choose t-test or F-test for small sample data, while choosing rank transformation non-parametric test is appropriate; ② For small sample data where the distribution is unknown to be normal, it is advisable to choose rank transformation non-parametric test for safety; ③ For data with uncertain values at one or both ends (such as <20 years old, ≥65 years old, etc.), regardless of whether the distribution is normal, only rank transformation non-parametric test can be chosen; ④ For ordinal data, if row×column (R×C) contingency table data test is chosen, only differences in composition ratios can be inferred, while choosing rank transformation non-parametric test can infer differences in ordinal intensity.

It should be noted that if it is known that quantitative data satisfies (or approximately satisfies) t-test or F-test conditions, t-test or F-test should be chosen; if rank transformation non-parametric test is chosen, it will reduce test efficiency.

Rank transformation non-parametric tests mainly include: One Sample Wilcoxon Signed Rank Test for comparing individual sample median with population median, Wilcoxon Rank Sum Test for comparing two independent samples, Paired Samples Wilcoxon Signed Rank Test for comparing the median of paired sample differences with 0, Kruskal-Wallis H Test for comparing multiple independent samples in completely randomized design, and Friedman M Test (The Friedman Non-parametric Repeated Measures ANOVA Test) for comparing multiple related samples in randomized block design. This article will introduce the hypothesis testing theory of the one-sample Wilcoxon signed rank test with examples.

## I. Applicable Conditions

The purpose of the one-sample Wilcoxon signed rank test is to infer whether there is a difference between the population median $M$ from which the sample comes and a known population median $M_0$. Using the differences between each variable value in the sample and $M_0$, i.e., inferring whether there is a difference between the population median of differences and $0$. Its applicable condition is: the observed variable is a continuous variable that does not satisfy normal distribution.

## II. Statistical Calculation

### (I) T Value Method

The T value method refers to calculating data numbering, then determining P values through T value tables to make statistical inferences.

#### 1. Calculation of Test Statistic T Value

1. Each sample data is paired with the known population median $M_0$, and the difference is calculated;  
2. Omit all pairs with a difference of $0$, and let the remaining effective pairs be $n$;  
3. Rank the absolute values of $n$ differences from small to large into positive and negative ranks. Those with equal absolute values of incremental values take average ranks, called tied ranks (when the sample is small, if there are many tied ranks, the test results will be biased, so measurement accuracy should be improved to avoid too many tied ranks);  
4. Arbitrarily take the positive rank sum ($T^+$) or negative rank sum ($T^-$) as $T$.

#### 2. Determine P Value and Make Statistical Inference

When $n \\leq 25$, consult the (T value critical value table). When consulting the table, find $n$ from the left side, and compare the test statistic $T$ value with the critical value in the adjacent left column:  

- If $T$ is within the upper and lower critical value range, its $P$ value is greater than the corresponding probability level above the table;  
- If the $T$ value is exactly equal to the critical value, its $P$ value is equal to (generally approximately equal to) the corresponding probability level;  
- If the $T$ value is outside the upper and lower critical value range, its $P$ value is less than the corresponding probability level, and you can move one column to the right and compare with the critical value again.

#### 3. Principles of T Critical Value Table Construction

For simplicity, the construction principle of the (T critical value table) is introduced using the number of pairs $n=4$:
Assuming the effective number of paired pairs $n=4$, the population ranks are $1,2,3,4$. Positive ranks (or negative ranks) can take $0$, $1$, $2$, $3$, and $4$ ranks from the population, with $2^4=16$ possible combination situations and rank sum $T$ shown in Figure 1.

The probability of each combination situation corresponding to $T$ value is $1/16$. The probability distribution of $T$ when $n=4$ is summarized in Figure 2.

The probability distribution of $T$ is a symmetric discontinuous distribution. The minimum value of $T$ is $0$, the maximum value is $n(n+1)/2$, and the mean is $n(n+1)/4$. For example, when $n=4$, the maximum value is $10$ and the mean is $2.5$.

According to Figure 2, the one-sided and two-sided cumulative probabilities of $T$ when $n=4$ can be calculated as follows:

- The one-sided cumulative probability of $T$ being $0$ or $10$ equals $1/16$ ($P=0.062$ or $P=0.937$), and the two-sided cumulative probability equals $2/16$ ($P=0.125$);
- The one-sided cumulative probability of $T$ being $1$~$9$ equals $2/16$ ($P=0.125$ or $P=0.875$), and the two-sided cumulative probability equals $4/16$ ($P=0.25$).

Regardless of how large $n$ is, the construction steps of its $T$ critical values are the same as when $n=4$. Since the minimum one-sided cumulative probability when $n=4$ is greater than $0.05$, the (T critical value table) starts from $n=6$. The sum of the lower critical value and upper critical value of $T$ is $n(n+1)/2$. Since the sum of positive rank sum ($T^+$) and negative rank sum ($T^-$) is both $n(n+1)/2$, if the smaller of positive rank sum ($T^+$) and negative rank sum ($T^-$) is less than or equal to the lower critical value, then the larger one is greater than or equal to the upper critical value.

### (II) Normal Approximation Method

When $n$ increases, the $T$ distribution approaches a normal distribution with mean $n(n+1)/4$ and variance $n(n+1)(2n+1)/24$. When $n \\geq 25$, the approximation is satisfactory, so the $Z$ value can be calculated using the following formula according to the principle of normal distribution:

$$Z = \\frac{T - n(n+1)/4}{\\sqrt{n(n+1)(2n+1)/24}} \\pm 0.5$$

The $0.5$ in the formula is the continuity correction coefficient, because the $Z$ value is continuous while the $T$ value is discontinuous.

When there are many tied ranks (referring to absolute values, not including those with differences of $0$), the $Z$ value obtained using the above formula is too small and needs to be corrected using the following formula:

$$Z_c = \\frac{T - n(n+1)/4}{\\sqrt{n(n+1)(2n+1)/24 - \\sum t_i(t_i^2-1)/48}} \\pm 0.5$$

Where $t_i$ is the number of tied ranks in the $i$-th group. Assuming there are 2 tied ranks of 4, 5 tied ranks of 6, and 3 tied ranks of 7, then:
$\\sum t_i(t_i^2-1)/48 = \\frac{2(2^2-1) + 5(5^2-1) + 3(3^2-1)}{48}$,
$= \\frac{2 \\times 3 + 5 \\times 24 + 3 \\times 8}{48} = \\frac{6+120+24}{48} = \\frac{150}{48} = 3.125$.

## III. Case Data

The median urine fluoride content of normal people in a certain area is $45.2μg/L$. Now 12 workers are randomly selected from a factory in this area, and their urine fluoride content is measured. Is there a difference between the urine fluoride content of workers in this factory and that of normal people in the local area? The data are shown in Figure 3.

## IV. Hypothesis Testing

The sample data in this example showed *P*=0.062<0.1 after "Normality Test (Shapiro-Wilk)" normality testing, suggesting that the data does not meet the normality condition. The one-sample Wilcoxon signed rank test can be used.

### (I) Establish Test Hypothesis and Determine Significance Level

$H_0$: The population median of urine fluoride content $M = 45.2μg/L$
$H_1$: $M \\neq 45.2μg/L$
$\\alpha = 0.05$

### (II) Calculate Test Statistic

#### **1. Calculate Differences**

Calculate the differences between the two groups of data using the new method minus the original method, i.e., (2)=(1)-45.2 in Figure 4.

#### **2. Ranking**

(1) Take the absolute values of all differences in Figure 4.

(2) Rank the absolute values from small to large (i.e., assign rank numbers): If pairs with differences of 0 are encountered, they should be discarded and the sample size should be reduced accordingly; if differences with equal absolute values are encountered, take the average rank, also called tied ranks.

(3) Let the ranks maintain the positive or negative sign of the original difference (i.e., signed ranks).

(4) Calculate rank sums. The positive rank sum ($T^+$) is 76, and the negative rank sum ($T^-$) is 2. In this example, the number of effective differences $n=12$, so the total rank sum is

$$\\frac{n(n+1)}{2} = \\frac{12 \\times 13}{2} = 78$$

The sum of positive rank sum and negative rank sum is 76+2=78, so the rank sum calculation is correct.

#### **3. Calculate T Value**

According to columns (3) and (4) in Figure 4, take $T^+ = 76$ or $T^- = 2$.

### (III) Determine P Value and Make Inference Conclusion

In this example, the number of effective differences $n = 12$. According to $n = 12$ and $T^+ = 76$ or $T^- = 2$, consulting the ($T$ critical value table) gives one-sided $P = 0.005 < 0.05$. At the $\\alpha = 0.05$ significance level, reject $H_0$ and accept $H_1$. It can be concluded that the urine fluoride content of workers in this factory is higher than that of normal people in the local area.

**Source:** https://mengte.online/archives/333

SPSS practical case: https://mengte.online/archives/2245`
  }
};

// Method matching function
const findStatisticalMethod = (queryMethod) => {
  if (!queryMethod || typeof queryMethod !== 'string') {
    return null;
  }
  
  const query = queryMethod.toLowerCase().trim();
  
  // Traverse all pre-stored methods
  for (const [methodName, methodData] of Object.entries(STATISTICAL_METHODS)) {
    // Check if any keyword matches
    const isMatch = methodData.keywords.some(keyword => {
      const keywordLower = keyword.toLowerCase();
      return query.includes(keywordLower) || keywordLower.includes(query);
    });
    
    if (isMatch) {
      return {
        method: methodName,
        content: methodData.content,
        isLocalContent: true
      };
    }
  }
  
  return null;
};

export {
  STATISTICAL_METHODS,
  findStatisticalMethod
}; 