/**
 * Research Proposal Detail Page Prompt Templates
 * 
 * This file contains all prompt templates related to research proposal generation, evaluation, and iteration
 * Uses variable placeholders for dynamic content filling
 */

// Basic research proposal generation prompt template
export const RESEARCH_PLAN_GENERATION_TEMPLATE = `Please help me generate a quantitative experimental research proposal.

{{#if customTopic}}
**Research Topic/Question:**
{{customTopic}}

Please generate a detailed quantitative research proposal based on the above research topic.
{{else}}
{{#if hasUserRequirements}}
Based on our conversation history, I understand the following research requirements:
{{userRequirements}}

Research background and context:
{{researchContext}}
{{/if}}
{{/if}}

{{#if hasPapers}}
I will provide you with the content of the following {{paperCount}} reference papers:

{{paperContents}}

{{#if customTopic}}
Please generate a detailed quantitative research proposal based on the full text content of the above {{paperCount}} reference papers, combined with the aforementioned research topic.
{{else}}
{{#if hasUserRequirements}}
Please generate a detailed quantitative research proposal based on the full text content of the above {{paperCount}} reference papers, combined with the research requirements I mentioned.
{{else}}
Please generate a detailed quantitative research proposal based on the full text content of the above {{paperCount}} reference papers.
{{/if}}
{{/if}}
{{else}}
{{#if customTopic}}
Please generate a detailed quantitative research proposal.
{{else}}
{{#if hasUserRequirements}}
Please generate a detailed quantitative research proposal based on the research requirements I mentioned.
{{else}}
Please generate a detailed quantitative research proposal.
{{/if}}
{{/if}}
{{/if}}

Please return strictly according to the following format, and must use the following precise title format:

# Research Hypotheses:
<Insert specific research hypotheses content here>

# Experimental Design:
<Insert detailed experimental design proposal here>

# Data Analysis:
<Insert data analysis methods here>

# Results Presentation:
<Insert results presentation format here>

Please write a high-quality quantitative research proposal for the Human-Computer Interaction (HCI) field based on the research background, research objectives/research questions, and reference literature I provided. The proposal should be structurally clear, logically rigorous, and substantive, avoiding generalities or jargon accumulation. Please organize the content strictly according to the following structure and provide detailed descriptions in each section (at least 3 sentences per item):

I. Research Hypotheses
Briefly describe the experimental purpose and propose research hypotheses that correspond highly to the research objectives. Each hypothesis should be numbered (H1, H2...).

Requirements:
- Briefly describe the each experimental purpose (1-2 sentences maximum)
- Propose specific, testable research hypotheses that correspond directly to the research objectives
- Each hypothesis should be numbered (H1, H2, etc.) and clearly stated
- Hypotheses should be directional (predict the direction of expected effects) when possible
- Focus exclusively on what you expect to find, not how you will test it
- Avoid mentioning statistical methods, significance levels, or analysis procedures

II. Experimental Design
Participant characteristics: Consider but not limited to sample size estimation, age and gender composition, professional or technical background, recruitment methods, inclusion and exclusion criteria, as well as sample representativeness or research adaptability, etc., listed in detail.
Grouping method: Describe the grouping method and research design type (such as within-subject design, between-subject design, etc.), clarify the definition and operationalization of independent and dependent variables, list all experimental conditions and control variables. In addition, the grouping method can refer to cited reference literature to ensure the rationality of grouping. When involving experiments with different systems or technical conditions, it is necessary to describe in detail or give examples of the tools used by the control group (such as Adobe Illustrator, etc.), avoiding vague expressions such as "traditional systems" or "baseline" only. When setting up control groups, full consideration should be given to whether there are types that can be further distinguished internally, combined with reference literature for divergent thinking, to ensure that the control conditions are set sufficiently and representatively, to improve the interpretability and external validity of the results.
Experimental procedure: Describe the experimental procedure in as much detail as possible, including the task settings and execution sequence of each stage. If it includes different types of tasks (such as closed tasks and open creative tasks), please explain the task objectives, task content, whether reference information is provided (such as example images), etc. In addition, please describe the name of each stage, whether the experiment includes pre-experiments, pre-tests or system explanations and other preparation processes. In the evaluation section, please briefly introduce the specific evaluation methods (such as subjective questionnaires, semi-structured interviews) and evaluation content, indicators, etc., to ensure that the process is complete, clear, and reproducible.

III. Data Analysis

Please describe in detail the types of user data collected in this study, which may include but are not limited to the following: Subjective rating data, need to clarify the measured subjective indicators (such as satisfaction, immersion, cognitive load, etc.), and point out the scale form used, including but not limited to Likert scales (such as 7-point or 5-point rating), percentile sliders, self-designed scales or standard scales. Please explain the measurement purpose and rating range of each dimension (for example: "The immersion dimension is used to evaluate the user's subjective immersion experience during the task process, using a 7-point rating, where 1 represents 'completely not immersed' and 7 represents 'completely immersed'"). If it is a standard scale, the name need to be noted; if it is a self-designed scale, please explain the design basis, dimension division and measurement objectives, and provide typical item examples to show the specific aspects that the scale focuses on. Regardless of whether standard scales or self-designed scales are used, it is recommended to explain whether reliability tests (such as Cronbach's α) have been conducted and report relevant results to support scale quality and usage rationality.

For behavioral data, please list the specific indicators recorded (such as click count, task completion time, generated content quantity, interaction steps, etc.), and explain the data collection method (such as system logs or front-end buried points), clarifying whether it includes dynamic information such as interaction sequence, editing path, and dwell time. If the collected content covers the user's operation process or strategy selection during the task, it should also be explained to support process analysis.

For system recorded data, please explain whether user-generated text, images, prompts, interaction trajectories, etc. are retained, and whether this content is used for subsequent analysis, such as automatic scoring, content comparison, behavioral modeling, etc. If automatic evaluation is involved, please list the indicators used and their evaluation dimensions (such as IoU for image region overlap calculation), and briefly explain their principles and applicability. In addition, if combined with manual annotation or used as qualitative analysis materials, please explain the annotation method and analysis purpose.

Statistical Analysis
For this section, please select and explain only the 1–3 most appropriate statistical analysis methods for this specific research design. For each selected method, you must:
1. Clearly explain why this method is the best choice for the specific research hypotheses and data types.
2. Specify which dependent variables and research hypotheses (H1, H2, etc.) this method will address.
3. Ensure the method matches the experimental design (between-subject, within-subject, mixed design).
4. Set appropriate significance standards (such as α = 0.05) and explain any necessary corrections for multiple comparisons.
5. Verify that sample size and data distribution assumptions are met for the chosen methods.
6. You must answer this section (Statistical Methods) point by point.
7. In the Types of Data Collected section, it must include 3 parts: Subjective Data,Behavioral Data and System Recorded Data.

The choice of method must directly reflect the experimental design (between-subject, within-subject, or mixed) and the nature of the data (e.g., categorical vs. continuous, distributional assumptions). Methods should be chosen based on whether they directly and appropriately test the stated hypotheses.
· Between-subject comparisons of two groups → Independent-samples t-test (or nonparametric alternative such as Mann–Whitney U if normality is violated).
· Within-subject comparisons of the same group across two conditions → Paired-samples t-test (or Wilcoxon signed-rank test if assumptions are violated).
· Comparisons across more than two groups or conditions → One-way or factorial ANOVA (with appropriate post-hoc tests and corrections for multiple comparisons). For nonparametric data, use Kruskal–Wallis H test or Friedman test.
· Mixed design (both between- and within-subject factors) → Mixed-design ANOVA (or linear mixed-effects models if data structure is more complex, e.g., repeated measures with nested participants).
· Associations between continuous variables → Pearson correlation (or Spearman correlation if normality is violated).
· Prediction and relationships involving multiple predictors → Regression analysis (linear regression for continuous dependent variables, logistic regression for binary dependent variables, multinomial or ordinal regression for categorical dependent variables).
· Models accounting for random effects (e.g., participants, stimuli) → Linear mixed-effects models (LMMs) or generalized linear mixed-effects models (GLMMs). Particularly appropriate for repeated measures and hierarchical/nested designs (e.g., multiple items evaluated by the same participant).
· Categorical outcomes or frequency data → Chi-square tests (goodness-of-fit, independence, or exact tests if sample size is small).
· Multivariate data (multiple dependent variables simultaneously) → MANOVA or multivariate regression.
· Exploratory analysis (if clearly separated from confirmatory hypothesis testing) → Factor analysis, cluster analysis, or principal component analysis (PCA) for dimensionality reduction or structure discovery, but these must not be confused with hypothesis testing.

Important restrictions:
· Do not use paired tests for between-group hypotheses or invent within-subject contrasts unless explicitly stated in the hypotheses.
· Avoid listing multiple unrelated methods for the same hypothesis. Select only the most appropriate one and justify it clearly.

Final principle: The methods listed above are common options, but the actual choice must always be justified based on the specific hypothesis, study design, and data characteristics. According to the principle of fit-for-purpose analysis, the selected statistical method should be determined case by case rather than restricted to a fixed menu.

Length requirement:
This section should be no less than 1000 words, ensuring sufficient detail in linking hypotheses → data types → analysis methods, with a strong focus on correctness, appropriateness, and justification.

IV. Results Presentation
Predict the possible differences or trends among the main dependent variables under different experimental conditions, and speculate on possible explanatory mechanisms based on previous research. The output needs to be presented in a structured manner, and each paragraph should clearly correspond to a hypothesis (such as H1, H2, etc.) and include the following three points:
1. Expected direction of difference or effect (such as which condition is higher/more likely to occur)
2. Corresponding hypothesis number (such as "supports H1")
3. Mechanism explanation behind the difference (such as attention allocation, processing method, trust, etc.)
Further explain how to present various experimental results, including charts suitable for describing between-group differences (such as box plots, bar charts), charts for showing interaction effects or trends (such as line charts, interaction charts), etc. Please explain how each type of chart assists in result interpretation and emphasize the logical mapping relationship between it and research conclusions.

Requirements and Notes
● The full text should be no less than 1800 words
● The full text should be written in English and the style should be close to formal research reports or thesis proposal materials;
● Each section needs to be structurally distinct with clear hierarchies, avoiding jargon accumulation or empty expressions;
● All content must be constructed around the input research, with accurate, specific, and logical information;
● If the input materials are incomplete, reasonable academic assumptions can be made based on common sense, but prerequisite assumptions must be clearly marked.`;

// Proposal evaluation prompt template
export const PLAN_EVALUATION_TEMPLATE = `You are the most rigorous, critical, and experienced HCI expert, examining the current research proposal from aspects such as logic, rationality, feasibility, and requirement matching, please provide practical and specific improvement suggestions, not generalizations, need to be concise, accurate and sufficiently professional

Please systematically evaluate the following research proposal, analyzing from the following three aspects:
1. Logic: Evaluate the correspondence between research purposes, research hypotheses, evaluation indicators, etc.
2. Rationality: Evaluate whether various evaluation indicators, evaluation tools, evaluation methods, etc. are effective and appropriate
3. Feasibility: Evaluate whether the task load, time, cost, etc. of user experiments are feasible

{{#if hasUserRequirements}}
4. Requirement matching: Evaluate whether the proposal fully meets the user's specific research needs and objectives
{{/if}}

Finally, please summarize and point out the advantages and areas for improvement of the proposal.

Current research proposal:
{{planContent}}

{{#if hasUserRequirements}}
User research requirements:
{{userRequirements}}

Research background and context:
{{researchContext}}

Please pay special attention to evaluating:
1. Whether the proposal fully considers the specific research objectives mentioned by the user
2. Whether the research hypotheses highly match the user's needs
3. Whether the experimental design is suitable for the user's research scenario and preferences
4. Whether the data analysis methods can effectively answer the user's research questions
{{/if}}`;

// Section evaluation prompt template
export const SECTION_EVALUATION_TEMPLATE = `Please conduct a special evaluation of the "{{sectionName}}" section in the following research proposal.

Current complete research proposal:
{{fullPlanContent}}

"{{sectionName}}" section content that needs focused evaluation:
{{sectionContent}}

Please evaluate the "{{sectionName}}" section in the following aspects:
1. Logic: Evaluate whether the logical structure of this section is clear and its coordination with the overall proposal
2. Rationality: Evaluate whether the design of this section is scientifically reasonable and whether the method selection is appropriate
3. Feasibility: Evaluate the implementation difficulty, time cost and resource requirements of this section
4. Completeness: Evaluate whether the content of this section is sufficiently detailed and whether important elements are missing

{{#if hasUserRequirements}}
5. Requirement matching: Evaluate whether this section fully meets the user's specific research needs and objectives
{{/if}}

Please focus on analyzing:
- Advantages and highlights of this section
- Existing problems and deficiencies
- Specific improvement suggestions and optimization directions

{{#if hasUserRequirements}}
User research requirements:
{{userRequirements}}

Research background and context:
{{researchContext}}

Please pay special attention to evaluating:
- Whether this section fully considers the specific research objectives mentioned by the user
- Whether the design is suitable for the user's research scenario and preferences
- How to better meet the user's research needs
{{/if}}

Please provide targeted evaluation opinions, focusing on the quality and improvement space of the "{{sectionName}}" section.`;

// Complete proposal iteration prompt template
export const FULL_PLAN_ITERATION_TEMPLATE = `{{tone}}.

**User's specific optimization suggestions:** {{suggestion}}

Current research proposal:
{{planContent}}

**OPTIMIZATION PHILOSOPHY:**
🎯 **TARGETED IMPROVEMENT** - Focus optimization on areas directly addressed by user suggestions
🎯 **PRESERVE QUALITY CONTENT** - Maintain existing high-quality content and only improve what needs improvement
🎯 **MINIMAL NECESSARY CHANGES** - Avoid rewriting content that already meets requirements

**Targeted optimization requirements:**
{{requirements}}

**Key focus areas:**
{{focusAreas}}

{{#if hasUserRequirements}}
**User research requirements integration:**
User research requirements: {{userRequirements}}
Research background and context: {{researchContext}}

**Requirements adaptation requirements:**
1. In the optimization process, user's specific research needs must be deeply integrated
2. Design a more targeted research proposal based on user background and research objectives
3. Based on the user's research scenario, provide more targeted method selection and parameter settings
4. Ensure that the optimized proposal can directly serve the user's research objectives
{{/if}}

**CONTENT PRESERVATION GUIDELINES:**
- **Maintain original terminology** - Keep existing technical terms, variable names, and specific references unless they conflict with suggested changes
- **Preserve successful formulations** - Do not rewrite well-constructed sentences or paragraphs unless they directly address the user's suggestions
- **Retain specific details** - Keep existing numbers, percentages, timeframes, and technical specifications unless optimization requires changes
- **Avoid unnecessary paraphrasing** - Do not change wording simply for variety; focus changes on addressing user feedback
- **Return exact original content** - For sections that don't need changes, return the exact original text, never use "remains unchanged" or similar phrases
- **Use proper line breaks** - Add line breaks within long paragraphs to improve readability and text comparison accuracy

Please return the complete optimized proposal according to the following format, and must use the following precise title format:

# Research Hypotheses:
<Research hypotheses content>

# Experimental Design:
<Experimental design content>

# Data Analysis:
<Data analysis content>

# Results Presentation:
<Results presentation content>

**STRATEGIC OPTIMIZATION APPROACH:**
1. **Identify target areas** based on user suggestions (e.g., if suggestion is about "statistical rigor", focus primarily on Data Analysis section)
2. **Preserve non-target content** that already meets quality standards
3. **Make coherent updates** across sections only when necessary for consistency
4. **Enhance specific elements** mentioned in user feedback

Please optimize the proposal according to the following detailed structure, ensuring that each part is detailed and specific (at least 3 sentences per item):

I. Research Hypotheses
Briefly describe the experimental purpose and propose research hypotheses that correspond highly to the research objectives. Each hypothesis should be numbered (H1, H2...).

II. Experimental Design
Participant characteristics: Consider but not limited to sample size estimation, age and gender composition, professional or technical background, recruitment methods, inclusion and exclusion criteria, as well as sample representativeness or research adaptability, etc., listed in detail.
Grouping method: Describe the grouping method and research design type (such as between-subject design, within-subject design, mixed design), clarify the definition and operationalization of independent and dependent variables, list all experimental conditions and control variables.
Experimental procedure: Describe the experimental procedure in as much detail as possible, describe the names, task content, execution sequence of each stage, etc., to ensure that the process is complete, clear, and reproducible.

III. Data Analysis
Detail the types of user data to be collected, which may refer to but not limited to subjective rating data (such as questionnaire scales, user preference evaluation), behavioral data (such as click count, task completion time, operation path) and system recorded data (such as logs, interaction trajectories, etc.), and explain the collection method of each type of data (such as questionnaire platform, experimental system, background log).
For each type of key dependent variable, clarify the statistical analysis methods used (such as t-test, one/two-way ANOVA, regression analysis, moderation/mediation effect analysis, etc.), and explain the matching relationship between analysis methods and research hypotheses, hypothesis testing standards (such as α = .05) and whether to include covariate control.

IV. Results Presentation
Predict the possible differences or trends among the main dependent variables under different experimental conditions, and speculate on possible explanatory mechanisms based on previous research. Further explain how to present various experimental results, including charts suitable for describing between-group differences (such as box plots, bar charts), charts for showing interaction effects or trends (such as line charts, interaction charts), etc. Please explain how each type of chart assists in result interpretation and emphasize the logical mapping relationship between it and research conclusions.

**Output validation criteria:**
{{validationCriteria}}

{{#if qualityRequirements}}
**Specific quality requirements:**
{{qualityRequirements}}
{{/if}}
 

**Important formatting requirements:**
- Do NOT include any reference citations in square brackets format such as [1], [2], [18], [22], etc.
- Avoid any text that resembles academic paper citation format like "[number]"
- Focus on content description rather than citation formatting

**Final checklist:**
{{checklist}}
✓ Have I preserved high-quality existing content where possible?
✓ Have I focused improvements on areas specifically mentioned in user suggestions?
✓ Have I maintained original terminology and technical specifications unless changes were necessary?
✓ Does it maintain academic normativity and expression accuracy?
✓ Does it highly match the user's specific suggestions?`;

// Section iteration prompt template
export const SECTION_ITERATION_TEMPLATE = `{{tone}}, especially need to focus on optimizing the "{{sectionName}}" section of the research proposal.

**User's specific optimization suggestions:** {{suggestion}}

Current complete research proposal:
# Research Hypotheses:
{{hypotheses}}

# Experimental Design:
{{experimentalDesign}}

# Data Analysis:
{{analysisMethod}}

# Results Presentation:
{{expectedResults}}

**Key optimization target: {{sectionName}} section**

**CRITICAL MODIFICATION REQUIREMENTS:**
🚨 **ONLY MODIFY THE "{{sectionName}}" SECTION** - Other sections should remain EXACTLY as they are unless absolutely necessary for consistency
🚨 **PRESERVE ORIGINAL WORDING** - When making consistency adjustments to other sections, keep the original phrasing and only make minimal changes
🚨 **AVOID WHOLESALE REWRITES** - Do not rewrite entire paragraphs in other sections unless they contain direct contradictions
🚨 **RETURN ORIGINAL CONTENT** - For unchanged sections, return the EXACT original content, do NOT write "remains unchanged" or similar phrases

**Targeted optimization requirements:**
{{requirements}}

**Key focus areas:**
{{focusAreas}}

{{#if sectionGuidance}}
**Specific optimization guidance for "{{sectionName}}" section:**
{{sectionGuidance}}
{{/if}}

**Overall coordination requirements:**
1. **PRIMARY FOCUS**: Concentrate optimization efforts ONLY on the "{{sectionName}}" section to ensure improvement effects meet user's specific suggestions
2. **MINIMAL ADJUSTMENTS**: For other sections, make ONLY the minimal adjustments necessary to maintain logical consistency (e.g., updating a variable name if it changes)
3. **PRESERVE STRUCTURE**: Keep the structure, content, and wording of other sections as close to the original as possible
4. **AVOID PARAPHRASING**: Do not rephrase or rewrite content in non-target sections even if you think it could be improved

**Specific preservation guidelines:**
- If the original text says "participants will complete a task", do NOT change it to "subjects will perform an activity" 
- If the original uses specific terminology, keep that exact terminology unless it directly conflicts with changes in the target section
- Preserve exact numbers, percentages, and statistical specifications in non-target sections
- Keep original sentence structures and paragraph organization in non-target sections

{{#if hasUserRequirements}}
**Deep integration of user research requirements:**
User research requirements: {{userRequirements}}
Research background and context: {{researchContext}}

**Requirements adaptation requirements for "{{sectionName}}":**
1. Deeply analyze the specific impact and requirements of user needs on the "{{sectionName}}" section
2. Based on the user's research background, design more fitting specific proposals for the "{{sectionName}}" section
3. Ensure that the optimization of "{{sectionName}}" can directly serve the user's research objectives and actual needs
4. Fully consider the user's resource conditions and implementation environment during the optimization process
{{/if}}

Please return the complete optimized proposal according to the following format, and must use the following precise title format:

# Research Hypotheses:
<Research hypotheses content>

# Experimental Design:
<Experimental design content>

# Data Analysis:
<Data analysis content>

# Results Presentation:
<Results presentation content>

**IMPLEMENTATION STRATEGY:**
1. **Target Section ("{{sectionName}}")**: Apply comprehensive optimization based on user suggestions
2. **Other Sections**: Copy content EXACTLY as provided in the original, making only essential consistency updates
3. **Cross-references**: Update only direct references to changed elements (e.g., if you change a hypothesis number in the target section, update references to that number in other sections)
4. **Content Integrity**: Never replace original content with placeholder text like "remains the same" - always provide the full original content

Please optimize the proposal according to the following detailed structure, ensuring that each part is detailed and specific (at least 3 sentences per item):

I. Research Hypotheses
Briefly describe the experimental purpose and propose research hypotheses that correspond highly to the research objectives. Each hypothesis should be numbered (H1, H2...).

II. Experimental Design
Participant characteristics: Consider but not limited to sample size estimation, age and gender composition, professional or technical background, recruitment methods, inclusion and exclusion criteria, as well as sample representativeness or research adaptability, etc., listed in detail.
Grouping method: Describe the grouping method and research design type (such as between-subject design, within-subject design, mixed design), clarify the definition and operationalization of independent and dependent variables, list all experimental conditions and control variables.
Experimental procedure: Describe the experimental procedure in as much detail as possible, describe the names, task content, execution sequence of each stage, etc., to ensure that the process is complete, clear, and reproducible.

III. Data Analysis
Detail the types of user data to be collected, which may refer to but not limited to subjective rating data (such as questionnaire scales, user preference evaluation), behavioral data (such as click count, task completion time, operation path) and system recorded data (such as logs, interaction trajectories, etc.), and explain the collection method of each type of data (such as questionnaire platform, experimental system, background log).
For each type of key dependent variable, clarify the statistical analysis methods used (such as t-test, one/two-way ANOVA, regression analysis, moderation/mediation effect analysis, etc.), and explain the matching relationship between analysis methods and research hypotheses, hypothesis testing standards (such as α = .05) and whether to include covariate control.

IV. Results Presentation
Predict the possible differences or trends among the main dependent variables under different experimental conditions, and speculate on possible explanatory mechanisms based on previous research. Further explain how to present various experimental results, including charts suitable for describing between-group differences (such as box plots, bar charts), charts for showing interaction effects or trends (such as line charts, interaction charts), etc. Please explain how each type of chart assists in result interpretation and emphasize the logical mapping relationship between it and research conclusions.

**Output validation criteria:**
{{validationCriteria}}

{{#if qualityRequirements}}
**Specific quality requirements:**
{{qualityRequirements}}
{{/if}}

**CRITICAL IMPLEMENTATION REQUIREMENTS:**
- **MUST return complete 4 sections** with ALL original content preserved for non-target sections
- **Focus 90% of optimization effort** on the "{{sectionName}}" section only
- **Make minimal necessary adjustments** to other sections (typically just updating cross-references)
- **Preserve original language and terminology** in non-target sections
- **Use Markdown format** with detailed, specific, academic-standard content
- **Maintain consistency** with formal research reports or thesis proposal materials
- **NEVER use placeholder text** - Always provide full content for all sections, even if unchanged
- **Add appropriate line breaks** - Use line breaks within paragraphs for better readability and comparison

**Final checklist:**
{{checklist}}
✓ Have I preserved the original wording of non-target sections as much as possible?
✓ Have I focused my optimization efforts primarily on the "{{sectionName}}" section?
✓ Have I made only minimal, necessary consistency adjustments to other sections?
✓ Does it maintain the integrity and consistency of other sections?
✓ Does it highly match the user's specific suggestions?
✓ Does it maintain academic normativity and expression accuracy?

**Important formatting requirements:**
- Do NOT include any reference citations in square brackets format such as [1], [2], [18], [22], etc.
- Avoid any text that resembles academic paper citation format like "[number]"
- Focus on content description rather than citation formatting`;

// Source introduction generation template - Research Hypotheses section
export const SOURCE_INTRODUCTION_HYPOTHESIS_TEMPLATE = `**Please analyze and point out how the specific design of research hypotheses in the current research proposal is inspired by or borrowed from existing literature, based on the "Research Hypotheses" section content and the referenced literature.**

Please generate a table with a maximum of 5 rows, each row analyzing a borrowing relationship. Please output directly in markdown table format without code block wrapping. The table should strictly follow the following format:

| Current Proposal Approach | Corresponding Reference Content | Borrowing Relationship Description |
|---|---|---|
| Briefly state the specific content or core hypothesis points of "Research Hypotheses" in this study | 【Must provide English original text】Clearly mark the location of relevant content in the reference literature and extract English original sentences that reflect its core ideas, with source indicated | Briefly explain how the current research hypotheses are inspired by this literature, specifically reflected in which aspects, emphasizing the borrowed ideas, structure or reasoning path |

If the same item borrows from multiple literature, please distinguish and explain in the "Corresponding Reference Content" section using abbreviations like "Reference 1 (first two words of title...), Reference 2 (first two words of title...)".

**Important requirements:**
- Add one sentence as an overall overview before the table
- Output markdown table directly without code block wrapping
- The "Corresponding Reference Content" column must provide English original text, format like: "Original text: 'English original text here' (From: Reference X - Title abbreviation)"
- Each cell content should be concise and clear, avoid being too long

**## 1. Current section content of the research proposal:**
{{currentSectionContent}}

**## 2. Reference literature information:**
{{referencesInfo}}

**## 3. User's research requirements and background (if provided):**
{{#if hasUserRequirements}}
- **User requirements:** {{userRequirements}}
- **Research background:** {{researchContext}}
{{else}}
No specific user requirements, please analyze based on literature only.
{{/if}}

**## 4. Your task and output requirements:**`;

// Source introduction generation template - Experimental Design section
export const SOURCE_INTRODUCTION_DESIGN_TEMPLATE = `**Please analyze and point out how the specific practices in the experimental design are inspired by or borrowed from existing literature, based on the "Experimental Design" section content and the referenced literature.**

Please generate a table with a maximum of 5 rows, each row analyzing a borrowing relationship. Please output directly in markdown table format without code block wrapping. The table should strictly follow the following format:

| Current Proposal Approach | Corresponding Reference Content | Borrowing Relationship Description |
|---|---|---|
| Briefly explain the specific practices in experimental design of this study, such as grouping methods, variable settings, task types or operation procedures | 【Must provide English original text】Clearly mark the location of relevant content in the reference literature and extract English original sentences that reflect its core ideas, with source indicated | Briefly explain to what extent the current experimental design is inspired by this literature, specifically reflected in what design ideas, variable operations, control logic or process structure |

If the same item borrows from multiple literature, please distinguish and explain in the "Corresponding Reference Content" section using abbreviations like "Reference 1, Reference 2".

**Important requirements:**
- Add one sentence as an overall overview before the table
- Output markdown table directly without code block wrapping
- The "Corresponding Reference Content" column must provide English original text, format like: "Original text: 'English original text here' (From: Reference X - Title abbreviation)"
- Each cell content should be concise and clear, avoid being too long

**## 1. Current section content of the research proposal:**
{{currentSectionContent}}

**## 2. Reference literature information:**
{{referencesInfo}}

**## 3. User's research requirements and background (if provided):**
{{#if hasUserRequirements}}
- **User requirements:** {{userRequirements}}
- **Research background:** {{researchContext}}
{{else}}
No specific user requirements, please analyze based on literature only.
{{/if}}

**## 4. Your task and output requirements:**`;

// Source introduction generation template - Data Analysis section
export const SOURCE_INTRODUCTION_ANALYSIS_TEMPLATE = `**Please analyze and point out how the selection of data analysis methods is inspired by or borrowed from existing literature, based on the "Data Analysis" section content and the referenced literature.**

Please generate a table with a maximum of 5 rows, each row analyzing a borrowing relationship. Please output directly in markdown table format without code block wrapping. The table should strictly follow the following format:

| Current Proposal Approach | Corresponding Reference Content | Borrowing Relationship Description |
|---|---|---|
| Briefly explain the specific methods in data analysis of this study, such as statistical methods, analysis steps, variable processing or model construction | 【Must provide English original text】Clearly mark the location of relevant content in the reference literature and extract English original sentences that reflect its core ideas, with source indicated | Briefly explain how the current data analysis methods are inspired by this literature, specifically reflected in what analysis ideas, statistical choices, processing steps or result interpretation |

If the same item borrows from multiple literature, please distinguish and explain in the "Corresponding Reference Content" section using abbreviations like "Reference 1, Reference 2".

**Important requirements:**
- Add one sentence as an overall overview before the table
- Output markdown table directly without code block wrapping
- The "Corresponding Reference Content" column must provide English original text, format like: "Original text: 'English original text here' (From: Reference X - Title abbreviation)"
- Each cell content should be concise and clear, avoid being too long

**## 1. Current section content of the research proposal:**
{{currentSectionContent}}

**## 2. Reference literature information:**
{{referencesInfo}}

**## 3. User's research requirements and background (if provided):**
{{#if hasUserRequirements}}
- **User requirements:** {{userRequirements}}
- **Research background:** {{researchContext}}
{{else}}
No specific user requirements, please analyze based on literature only.
{{/if}}

**## 4. Your task and output requirements:**`;

// Source introduction generation template - Results Presentation section
export const SOURCE_INTRODUCTION_RESULTS_TEMPLATE = `**Please analyze and point out how the design of results presentation methods is inspired by or borrowed from existing literature, based on the "Results Presentation" section content and the referenced literature.**

Please generate a table with a maximum of 5 rows, each row analyzing a borrowing relationship. Please output directly in markdown table format without code block wrapping. The table should strictly follow the following format:

| Current Proposal Approach | Corresponding Reference Content | Borrowing Relationship Description |
|---|---|---|
| Briefly explain the design of results presentation in this study, such as expected results or conclusions, and the proposed chart types | 【Must provide English original text】Clearly mark the location of relevant content in the reference literature and extract English original sentences that reflect its core ideas, with source indicated | Briefly explain how the current proposal in results presentation is inspired by this literature, specifically reflected in which aspects, such as expression methods of expected differences, chart design styles, indicator comparison structures or conclusion reasoning frameworks |

If the same item borrows from multiple literature, please distinguish and explain in the "Corresponding Reference Content" section using abbreviations like "Reference 1, Reference 2".

**Important requirements:**
- Add one sentence as an overall overview before the table
- Output markdown table directly without code block wrapping
- The "Corresponding Reference Content" column must provide English original text, format like: "Original text: 'English original text here' (From: Reference X - Title abbreviation)"
- Each cell content should be concise and clear, avoid being too long

**## 1. Current section content of the research proposal:**
{{currentSectionContent}}

**## 2. Reference literature information:**
{{referencesInfo}}

**## 3. User's research requirements and background (if provided):**
{{#if hasUserRequirements}}
- **User requirements:** {{userRequirements}}
- **Research background:** {{researchContext}}
{{else}}
No specific user requirements, please analyze based on literature only.
{{/if}}

**## 4. Your task and output requirements:**`;

// Source introduction generation template - Default general template
export const SOURCE_INTRODUCTION_DEFAULT_TEMPLATE = `You are a professional academic assistant. Your task is to rigorously analyze how a group of reference literature provides support for a specific section of a research proposal.

Your goal is to generate a "Source Introduction" that clearly explains how each piece of literature contributes to the "{{sectionName}}" section of the proposal, using direct original text citations as evidence.

Please generate a source introduction in table format, output directly in markdown table format without code block wrapping. The table should include the following columns:

| Reference Literature | Core Contribution | Specific Citation Content | Inspiration for Current Research |
|---|---|---|---|
| Literature Title | Core contribution of this literature to the current research section | 【Must provide English original text】Specific content and English original citations from the literature, with source indicated | How it inspired the design of the current research |

**Important requirements:**
- Add one sentence as an overall overview before the table
- Output markdown table directly without code block wrapping
- **Each reference literature must have at least 2 rows in the table** - provide different aspects of contribution or multiple citations from the same literature
- The "Specific Citation Content" column must provide English original text, format like: "Original text: 'English original text here' (From: Reference X - Title abbreviation)"
- Each cell content should be concise and clear, avoid being too long

**## 1. Current section content of the research proposal:**
{{currentSectionContent}}

**## 2. Reference literature information:**
{{referencesInfo}}

**## 3. User's research requirements and background (if provided):**
{{#if hasUserRequirements}}
- **User requirements:** {{userRequirements}}
- **Research background:** {{researchContext}}
{{else}}
No specific user requirements, please analyze based on literature only.
{{/if}}

**## 4. Your task and output requirements:**

Please generate a source introduction of about 300-500 words strictly according to the table format.`;

// Method introduction generation template - ChatGPT mode
export const METHOD_INTRODUCTION_CHATGPT_TEMPLATE = `I will provide you with the data analysis section content of a research proposal. Please analyze the research methods and statistical analysis methods used in it, and generate a detailed method introduction.

Data analysis section of the research proposal:
{{analysisContent}}

{{#if hasUserRequirements}}
User research requirements:
{{userRequirements}}

Research background and context:
{{researchContext}}
{{/if}}

Please analyze the statistical methods mentioned in the above data analysis content and generate professional introductions for each method separately.

Requirements:
1. Identify all statistical methods mentioned in the data analysis section
2. Provide simple but professional introductions for each statistical method separately
3. Use academic language to ensure content is accurate and understandable
4. Must strictly organize content according to the following format

Format requirements:
Each statistical method should be introduced according to the following structure:

**Method Name**
Definition and basic function of the method, explaining what situations it is suitable for.

**Common Types:**
- Type 1: Specific explanation and application scenarios
- Type 2: Specific explanation and application scenarios
- Type 3: Specific explanation and application scenarios (if any)

**Output Results:**
Explain what statistics the method will produce (such as t-value, F-value, p-value, etc.), and how to interpret results and judge significance.

Example format:
**t-test**
The t-test is a commonly used statistical method for comparing whether there is a significant difference between the means of two samples. It is suitable for situations with small sample sizes and unknown population standard deviations.

**Common Types:**
- Independent samples t-test: Compare the means of two independent groups (such as male and female test scores)
- Paired samples t-test: Compare the means of the same group of individuals under different conditions (such as before and after intervention)
- One-sample t-test: Test whether the mean of a sample is significantly different from a known value

**Output Results:**
The t-test will calculate a t-value, combined with degrees of freedom, to obtain a p-value through table lookup or statistical software, used to judge whether the difference is significant (usually using p<0.05 as the standard). If the p-value is less than the significance level, it can be considered that there is a statistically significant difference between the two groups.

{{#if hasUserRequirements}}
**Special requirements:**
Combined with the user's research needs, focus on explaining how these statistical methods serve the user's specific research objectives.
{{/if}}

Please generate introductions for each statistical method mentioned in the data analysis section according to the above format.`;

// Method introduction generation template - Coze mode
export const METHOD_INTRODUCTION_COZE_TEMPLATE = `I will provide you with the data analysis section content of a research proposal. Please analyze the research methods and statistical analysis methods used in it, and generate a detailed method introduction.

Data analysis section of the research proposal:
{{analysisContent}}

{{#if hasUserRequirements}}
User research requirements:
{{userRequirements}}

Research background and context:
{{researchContext}}
{{/if}}

Please analyze the statistical methods mentioned in the above data analysis content and generate professional introductions for each method separately.

Requirements:
1. Identify all statistical methods mentioned in the data analysis section
2. Provide simple but professional introductions for each statistical method separately
3. Generate introductions for each method according to the following format:

Format:
**Method Name**
Definition and basic function of the method, explaining applicable situations.

**Common Types:**
List the main types of this method and their respective application scenarios.

**Output Results:**
Explain statistics, judgment criteria and result interpretation.

Example:
**ANOVA**
ANOVA (Analysis of Variance) is a statistical method used to compare whether there are significant differences among the means of three or more groups. It is an extension of the t-test, suitable for multi-group situations.

**Common Types:**
- One-way ANOVA: Suitable for one independent variable with multiple levels. For example: comparing the effects of three teaching methods on test scores.
- Two-way ANOVA: Simultaneously examine two independent variables and their interaction effects.

**Output Results:**
ANOVA outputs an F-value, then calculates a p-value based on the F-distribution to judge whether between-group differences are significant (usually using p<0.05 as significant). If significant, post-hoc tests (such as Tukey HSD) are needed to find out which specific groups have differences.

{{#if hasUserRequirements}}
Special note: Please combine the user's research needs to focus on explaining the applicability of these statistical methods.
{{/if}}

Please generate introductions for each statistical method in the data analysis section according to the above format.`;

// Optimization suggestion configurations
export const OPTIMIZATION_SPECS = {
  'Automatic Iterative Optimization': {
    tone: 'You are a senior HCI research expert who needs to conduct comprehensive intelligent optimization of the research proposal',
    requirements: [
      '**Comprehensive Enhancement**: Conduct comprehensive optimization from theoretical foundation, method design, data analysis, result presentation and other dimensions',
      '**Balanced Improvement**: Moderately enhance the professional depth of each part while maintaining the overall coordination of the proposal',
      '**Intelligent Adjustment**: Automatically identify and focus on strengthening parts that need improvement based on weak points of the proposal'
    ],
    focusAreas: ['Overall coordination', 'Methodological completeness', 'Academic normativity']
  },
  'Improve Scientific Rigor': {
    tone: 'You are a senior HCI research expert who needs to focus on improving the scientific rigor of the research proposal',
    requirements: [
      '**Methodological Rigor**: Ensure the logic of research design, completeness of control variables, and validity of causal inference',
      '**Statistical Rigor**: Use correct statistical methods, set reasonable significance levels, consider effect size and statistical power',
      '**Ethical Normativity**: Ensure research complies with academic ethical requirements, participant rights protection, data privacy security'
    ],
    focusAreas: ['Internal and external validity of research design', 'Normativity of statistical analysis', 'Objectivity of result interpretation']
  },
  'Add More Details': {
    tone: 'You are a senior HCI research expert who needs to significantly increase specific details of the research proposal',
    requirements: [
      '**Operational Detail Enrichment**: Provide specific numerical parameters, detailed operation steps, clear time arrangements',
      '**Technical Specification Refinement**: Include device models, software versions, experimental environment configurations and other technical details',
      '**Implementation Guide Detailing**: Provide directly executable operation manuals, including personnel allocation, material preparation, quality control'
    ],
    focusAreas: ['Specific parameter settings', 'Operation process refinement', 'Implementation standard clarification']
  },
  'Simplify Expression': {
    tone: 'You are a senior HCI research expert who needs to simplify and refine the expression of the research proposal',
    requirements: [
      '**Expression Refinement**: Remove redundant descriptions, retain key points, make expression more concise and clear',
      '**Structure Clarification**: Optimize paragraph structure, use clearer logical hierarchies, facilitate understanding and execution',
      '**Key Point Highlighting**: Highlight key information, reduce secondary details, ensure key content is clear at a glance'
    ],
    focusAreas: ['Expression conciseness', 'Logical clarity', 'Key point prominence']
  }
};

// Validation criteria configurations
export const VALIDATION_SPECS = {
  'Automatic Iterative Optimization': {
    criteria: [
      '**Balance Check**: Ensure all parts have moderate improvements without obvious weak points',
      '**Integrity Verification**: Logical connections between parts are closer, forming a complete methodological system',
      '**Quality Enhancement Confirmation**: Overall academic level and operability of the proposal have significantly improved'
    ],
    checklist: ['Overall coordination', 'Methodological completeness', 'Academic normativity']
  },
  'Improve Scientific Rigor': {
    criteria: [
      '**Logical Rigor Check**: Internal and external validity of research design are strengthened, causal inference is more reliable',
      '**Statistical Normativity Verification**: Statistical method selection is correct, hypothesis testing settings are reasonable, result interpretation is objective',
      '**Ethical Compliance Confirmation**: Research procedures comply with academic ethical requirements, participant rights are fully protected'
    ],
    checklist: ['Logical consistency', 'Statistical normativity', 'Ethical compliance']
  },
  'Add More Details': {
    criteria: [
      '**Detail Richness Verification**: Contains specific numerical parameters, operation steps, technical specifications and other detailed information',
      '**Operability Check**: Each link has specific execution guidance and can be directly used for actual research',
      '**Completeness Confirmation**: Key information is complete, technical details are sufficiently detailed'
    ],
    qualityRequirements: [
      'Provide specific numerical parameters (such as sample size, time arrangement, device models)',
      'Include detailed operation steps and quality control standards',
      'Clarify tool selection and technical specifications (such as software versions, analysis package names)'
    ],
    checklist: ['Parameter specificity', 'Operation detail', 'Technical completeness']
  },
  'Simplify Expression': {
    criteria: [
      '**Conciseness Check**: Expression is more refined, redundant content removed, key points highlighted',
      '**Clarity Verification**: Logical structure is clearer, facilitating understanding and execution',
      '**Quality Simplification Confirmation**: Simplification maintains completeness and accuracy of core content'
    ],
    qualityRequirements: [
      'Remove redundant expressions, retain key information',
      'Use concise and clear language, avoid complex terminology accumulation',
      'Highlight key content, appropriately simplify secondary information'
    ],
    checklist: ['Expression conciseness', 'Logical clarity', 'Key point prominence']
  }
};

// Preset suggestion configurations
export const PRESET_SUGGESTIONS = {
  base: [
    'Automatic Iterative Optimization',
    'Improve Scientific Rigor',
    'Add More Details',
    'Simplify Expression'
  ],
  full: [
    'Overall optimize consistency of all parts',
    'Strengthen research innovation',
    'Improve proposal operability',
    'Enhance theoretical basis'
  ],
  hypothesis: [
    'Make hypotheses more specific and clear',
    'Add theoretical support',
    'Improve hypothesis testability',
    'Optimize variable definitions'
  ],
  design: [
    'Detail experimental steps',
    'Optimize sample selection strategy',
    'Improve control variable settings',
    'Increase experimental reproducibility'
  ],
  analysis: [
    'Add detailed statistical method explanations',
    'Optimize data processing workflow',
    'Supplement effect size analysis',
    'Improve statistical hypothesis testing'
  ],
  results: [
    'Add visualization presentation methods',
    'Optimize result interpretation logic',
    'Supplement practical significance of results',
    'Improve conclusion expression'
  ]
};

// Section-specific guidance configurations
export const SECTION_GUIDANCE = {
  hypothesis: {
    'Rigor': [
      '- **Logical Rigor**: Ensure clear causal logic of hypotheses, avoid circular reasoning and conceptual confusion',
      '- **Testability**: Each hypothesis must have operationalizable measurement schemes and verification methods'
    ],
    'Details': [
      '- **Theoretical Basis Detail**: Provide specific theoretical model references and mechanism explanations for each hypothesis',
      '- **Expected Quantification**: Provide specific expected effect size ranges and statistical significance levels'
    ],
    'Simplification': [
      '- **Hypothesis Refinement**: Remove redundant hypotheses, retain core key hypotheses, express concisely and clearly',
      '- **Focus Highlighting**: Highlight main research hypotheses, secondary hypotheses can be appropriately simplified in expression'
    ]
  },
  design: {
    'Rigor': [
      '- **Internal and External Validity**: Strengthen internal validity control and external validity considerations of experimental design',
      '- **Control Variables**: Improve identification and control measures of confounding variables'
    ],
    'Details': [
      '- **Implementation Details**: Describe experimental environment, equipment configuration, personnel arrangement and other specific information in detail',
      '- **Operation Standards**: Develop detailed operation manuals and quality standards for each experimental step'
    ],
    'Simplification': [
      '- **Process Simplification**: Optimize experimental procedures, remove unnecessary steps, improve efficiency',
      '- **Description Refinement**: Simplify complex technical descriptions, highlight core design points'
    ]
  },
  analysis: {
    'Statistical Methods': [
      '- **Method Selection**: Explain in detail the selection reasons and applicable conditions of statistical methods',
      '- **Analysis Strategy**: Develop complete data analysis strategies and alternative proposals'
    ],
    'Effect Size': [
      '- **Effect Size Calculation**: Specify corresponding effect size indicators for each statistical test',
      '- **Practical Significance**: Explain the practical meaning and evaluation criteria of effect sizes'
    ],
    'Hypothesis Testing': [
      '- **Hypothesis Setting**: Clarify null and alternative hypotheses for each statistical test',
      '- **Prerequisite Verification**: Check prerequisite conditions of statistical tests and proposals for handling violations'
    ],
    'Data Processing': [
      '- **Preprocessing Workflow**: Describe specific steps of data cleaning, transformation, standardization in detail',
      '- **Quality Control**: Establish standard procedures for data quality checking and outlier handling'
    ]
  },
  results: {
    'Rigor': [
      '- **Result Interpretation**: Ensure objectivity and logic of result interpretation, avoid over-interpretation',
      '- **Limitation Explanation**: Clarify the applicable scope and potential limitations of research results'
    ],
    'Details': [
      '- **Expectation Specification**: Provide specific numerical expectations and statistical indicator ranges',
      '- **Visualization Detail**: Describe chart production standards and interpretation methods in detail'
    ],
    'Simplification': [
      '- **Focus Highlighting**: Highlight key results, simplify description of secondary findings',
      '- **Clear Expression**: Use concise and clear language to describe expected results'
    ]
  }
}; 