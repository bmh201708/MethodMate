import { getPool } from './database.js';

// 存储方案迭代历史
export const storePlanIteration = async (iterationData) => {
  const pool = getPool();
  const connection = await pool.getConnection();
  
  try {
    const {
      planId,
      userId,
      iterationType,
      iterationSection,
      iterationSuggestion,
      messageId,
      beforeSnapshot,
      afterSnapshot
    } = iterationData;

    const query = `
      INSERT INTO plan_iterations (
        plan_id, user_id, iteration_type, iteration_section, iteration_suggestion, message_id,
        before_title, before_research_questions, before_methodology, before_data_collection,
        before_analysis_method, before_hypotheses, before_experimental_design, before_expected_results,
        before_variables, before_statistical_tools, before_visualization, before_source_introductions,
        after_title, after_research_questions, after_methodology, after_data_collection,
        after_analysis_method, after_hypotheses, after_experimental_design, after_expected_results,
        after_variables, after_statistical_tools, after_visualization, after_source_introductions
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      planId, userId, iterationType, iterationSection, iterationSuggestion, messageId,
      beforeSnapshot.title, beforeSnapshot.researchQuestions, beforeSnapshot.methodology,
      beforeSnapshot.dataCollection, beforeSnapshot.analysisMethod, beforeSnapshot.hypotheses,
      beforeSnapshot.experimentalDesign, beforeSnapshot.expectedResults, beforeSnapshot.variables,
      beforeSnapshot.statisticalTools, beforeSnapshot.visualization,
      JSON.stringify(beforeSnapshot.sourceIntroductions || {}),
      afterSnapshot.title, afterSnapshot.researchQuestions, afterSnapshot.methodology,
      afterSnapshot.dataCollection, afterSnapshot.analysisMethod, afterSnapshot.hypotheses,
      afterSnapshot.experimentalDesign, afterSnapshot.expectedResults, afterSnapshot.variables,
      afterSnapshot.statisticalTools, afterSnapshot.visualization,
      JSON.stringify(afterSnapshot.sourceIntroductions || {})
    ];

    const [result] = await connection.execute(query, values);
    
    console.log(`✅ 方案迭代历史已存储，ID: ${result.insertId}`);
    return { success: true, iterationId: result.insertId };
  } catch (error) {
    console.error('❌ 存储方案迭代历史失败:', error);
    throw error;
  } finally {
    connection.release();
  }
};

// 获取方案的最新迭代历史
export const getLatestPlanIteration = async (planId, userId) => {
  const pool = getPool();
  const connection = await pool.getConnection();
  
  try {
    const query = `
      SELECT * FROM plan_iterations 
      WHERE plan_id = ? AND user_id = ?
      ORDER BY created_at DESC 
      LIMIT 1
    `;

    const [rows] = await connection.execute(query, [planId, userId]);
    
    if (rows.length === 0) {
      return null;
    }

    const iteration = rows[0];
    
    // 构建迭代前快照
    const beforeSnapshot = {
      title: iteration.before_title,
      researchQuestions: iteration.before_research_questions,
      methodology: iteration.before_methodology,
      dataCollection: iteration.before_data_collection,
      analysisMethod: iteration.before_analysis_method,
      hypotheses: iteration.before_hypotheses ? JSON.parse(iteration.before_hypotheses) : [],
      experimentalDesign: iteration.before_experimental_design,
      expectedResults: iteration.before_expected_results,
      variables: iteration.before_variables,
      statisticalTools: iteration.before_statistical_tools,
      visualization: iteration.before_visualization,
      sourceIntroductions: iteration.before_source_introductions ? JSON.parse(iteration.before_source_introductions) : {},
      timestamp: iteration.created_at
    };

    // 构建迭代后快照
    const afterSnapshot = {
      title: iteration.after_title,
      researchQuestions: iteration.after_research_questions,
      methodology: iteration.after_methodology,
      dataCollection: iteration.after_data_collection,
      analysisMethod: iteration.after_analysis_method,
      hypotheses: iteration.after_hypotheses ? JSON.parse(iteration.after_hypotheses) : [],
      experimentalDesign: iteration.after_experimental_design,
      expectedResults: iteration.after_expected_results,
      variables: iteration.after_variables,
      statisticalTools: iteration.after_statistical_tools,
      visualization: iteration.after_visualization,
      sourceIntroductions: iteration.after_source_introductions ? JSON.parse(iteration.after_source_introductions) : {},
      timestamp: iteration.updated_at
    };

    return {
      id: iteration.id,
      planId: iteration.plan_id,
      userId: iteration.user_id,
      iterationType: iteration.iteration_type,
      iterationSection: iteration.iteration_section,
      iterationSuggestion: iteration.iteration_suggestion,
      messageId: iteration.message_id,
      before: beforeSnapshot,
      after: afterSnapshot,
      createdAt: iteration.created_at,
      updatedAt: iteration.updated_at
    };
  } catch (error) {
    console.error('❌ 获取方案迭代历史失败:', error);
    throw error;
  } finally {
    connection.release();
  }
};

// 根据消息ID获取迭代历史
export const getIterationByMessageId = async (messageId, userId) => {
  const pool = getPool();
  const connection = await pool.getConnection();
  
  try {
    const query = `
      SELECT * FROM plan_iterations 
      WHERE message_id = ? AND user_id = ?
      ORDER BY created_at DESC 
      LIMIT 1
    `;

    const [rows] = await connection.execute(query, [messageId, userId]);
    
    if (rows.length === 0) {
      return null;
    }

    const iteration = rows[0];
    
    // 构建迭代前快照
    const beforeSnapshot = {
      title: iteration.before_title,
      researchQuestions: iteration.before_research_questions,
      methodology: iteration.before_methodology,
      dataCollection: iteration.before_data_collection,
      analysisMethod: iteration.before_analysis_method,
      hypotheses: iteration.before_hypotheses ? JSON.parse(iteration.before_hypotheses) : [],
      experimentalDesign: iteration.before_experimental_design,
      expectedResults: iteration.before_expected_results,
      variables: iteration.before_variables,
      statisticalTools: iteration.before_statistical_tools,
      visualization: iteration.before_visualization,
      sourceIntroductions: iteration.before_source_introductions ? JSON.parse(iteration.before_source_introductions) : {},
      timestamp: iteration.created_at
    };

    // 构建迭代后快照
    const afterSnapshot = {
      title: iteration.after_title,
      researchQuestions: iteration.after_research_questions,
      methodology: iteration.after_methodology,
      dataCollection: iteration.after_data_collection,
      analysisMethod: iteration.after_analysis_method,
      hypotheses: iteration.after_hypotheses ? JSON.parse(iteration.after_hypotheses) : [],
      experimentalDesign: iteration.after_experimental_design,
      expectedResults: iteration.after_expected_results,
      variables: iteration.after_variables,
      statisticalTools: iteration.after_statistical_tools,
      visualization: iteration.after_visualization,
      sourceIntroductions: iteration.after_source_introductions ? JSON.parse(iteration.after_source_introductions) : {},
      timestamp: iteration.updated_at
    };

    return {
      id: iteration.id,
      planId: iteration.plan_id,
      userId: iteration.user_id,
      iterationType: iteration.iteration_type,
      iterationSection: iteration.iteration_section,
      iterationSuggestion: iteration.iteration_suggestion,
      messageId: iteration.message_id,
      before: beforeSnapshot,
      after: afterSnapshot,
      createdAt: iteration.created_at,
      updatedAt: iteration.updated_at
    };
  } catch (error) {
    console.error('❌ 根据消息ID获取迭代历史失败:', error);
    throw error;
  } finally {
    connection.release();
  }
};

// 获取方案的所有迭代历史
export const getPlanIterationHistory = async (planId, userId) => {
  const pool = getPool();
  const connection = await pool.getConnection();
  
  try {
    const query = `
      SELECT * FROM plan_iterations 
      WHERE plan_id = ? AND user_id = ?
      ORDER BY created_at DESC
    `;

    const [rows] = await connection.execute(query, [planId, userId]);
    
    return rows.map(iteration => {
      // 构建迭代前快照
      const beforeSnapshot = {
        title: iteration.before_title,
        researchQuestions: iteration.before_research_questions,
        methodology: iteration.before_methodology,
        dataCollection: iteration.before_data_collection,
        analysisMethod: iteration.before_analysis_method,
        hypotheses: iteration.before_hypotheses ? JSON.parse(iteration.before_hypotheses) : [],
        experimentalDesign: iteration.before_experimental_design,
        expectedResults: iteration.before_expected_results,
        variables: iteration.before_variables,
        statisticalTools: iteration.before_statistical_tools,
        visualization: iteration.before_visualization,
        sourceIntroductions: iteration.before_source_introductions ? JSON.parse(iteration.before_source_introductions) : {},
        timestamp: iteration.created_at
      };

      // 构建迭代后快照
      const afterSnapshot = {
        title: iteration.after_title,
        researchQuestions: iteration.after_research_questions,
        methodology: iteration.after_methodology,
        dataCollection: iteration.after_data_collection,
        analysisMethod: iteration.after_analysis_method,
        hypotheses: iteration.after_hypotheses ? JSON.parse(iteration.after_hypotheses) : [],
        experimentalDesign: iteration.after_experimental_design,
        expectedResults: iteration.after_expected_results,
        variables: iteration.after_variables,
        statisticalTools: iteration.after_statistical_tools,
        visualization: iteration.after_visualization,
        sourceIntroductions: iteration.after_source_introductions ? JSON.parse(iteration.after_source_introductions) : {},
        timestamp: iteration.updated_at
      };

      return {
        id: iteration.id,
        planId: iteration.plan_id,
        userId: iteration.user_id,
        iterationType: iteration.iteration_type,
        iterationSection: iteration.iteration_section,
        iterationSuggestion: iteration.iteration_suggestion,
        messageId: iteration.message_id,
        before: beforeSnapshot,
        after: afterSnapshot,
        createdAt: iteration.created_at,
        updatedAt: iteration.updated_at
      };
    });
  } catch (error) {
    console.error('❌ 获取方案迭代历史列表失败:', error);
    throw error;
  } finally {
    connection.release();
  }
};

// 删除方案的迭代历史
export const deletePlanIteration = async (iterationId, userId) => {
  const pool = getPool();
  const connection = await pool.getConnection();
  
  try {
    const query = `
      DELETE FROM plan_iterations 
      WHERE id = ? AND user_id = ?
    `;

    const [result] = await connection.execute(query, [iterationId, userId]);
    
    if (result.affectedRows === 0) {
      throw new Error('迭代历史不存在或无权限删除');
    }

    console.log(`✅ 方案迭代历史已删除，ID: ${iterationId}`);
    return { success: true };
  } catch (error) {
    console.error('❌ 删除方案迭代历史失败:', error);
    throw error;
  } finally {
    connection.release();
  }
};

// 清理方案的迭代历史
export const clearPlanIterations = async (planId, userId) => {
  const pool = getPool();
  const connection = await pool.getConnection();
  
  try {
    const query = `
      DELETE FROM plan_iterations 
      WHERE plan_id = ? AND user_id = ?
    `;

    const [result] = await connection.execute(query, [planId, userId]);
    
    console.log(`✅ 方案迭代历史已清理，删除 ${result.affectedRows} 条记录`);
    return { success: true, deletedCount: result.affectedRows };
  } catch (error) {
    console.error('❌ 清理方案迭代历史失败:', error);
    throw error;
  } finally {
    connection.release();
  }
};

export default {
  storePlanIteration,
  getLatestPlanIteration,
  getIterationByMessageId,
  getPlanIterationHistory,
  deletePlanIteration,
  clearPlanIterations
}; 