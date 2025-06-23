import { initDatabase, getPool, closeDatabase } from './database.js';

const migrateResearchPlans = async () => {
  try {
    console.log('开始迁移research_plans表...');
    
    // 初始化数据库连接
    console.log('正在初始化数据库连接...');
    await initDatabase();
    console.log('数据库连接初始化完成');
    
    const pool = getPool();
    const connection = await pool.getConnection();
    console.log('获取数据库连接成功');
    
    try {
      // 检查新字段是否已存在
      const [columns] = await connection.execute(`
        SELECT COLUMN_NAME 
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_NAME = 'research_plans' AND TABLE_SCHEMA = DATABASE()
      `);
      
      const existingColumns = columns.map(col => col.COLUMN_NAME);
      console.log('现有字段:', existingColumns);
      
      // 添加新字段（如果不存在）
      const newColumns = [
        { name: 'hypotheses', type: 'TEXT' },
        { name: 'experimental_design', type: 'TEXT' },
        { name: 'analysis_method', type: 'TEXT' },
        { name: 'expected_results', type: 'TEXT' },
        { name: 'source_introductions', type: 'TEXT' }
      ];
      
      for (const column of newColumns) {
        if (!existingColumns.includes(column.name)) {
          console.log(`添加字段: ${column.name}`);
          await connection.execute(`
            ALTER TABLE research_plans 
            ADD COLUMN ${column.name} ${column.type} AFTER description
          `);
        } else {
          console.log(`字段 ${column.name} 已存在，跳过`);
        }
      }
      
      // 迁移现有数据：将methodology中的JSON数据拆分到新字段
      console.log('开始迁移现有数据...');
      const [plans] = await connection.execute('SELECT id, methodology FROM research_plans WHERE methodology IS NOT NULL AND methodology != ""');
      
      for (const plan of plans) {
        try {
          const methodologyData = JSON.parse(plan.methodology);
          
          const hypotheses = JSON.stringify(methodologyData.hypotheses || []);
          const experimentalDesign = methodologyData.experimentalDesign || '';
          const analysisMethod = methodologyData.analysisMethod || '';
          const expectedResults = methodologyData.expectedResults || '';
          
          await connection.execute(`
            UPDATE research_plans 
            SET hypotheses = ?, experimental_design = ?, analysis_method = ?, expected_results = ? 
            WHERE id = ?
          `, [hypotheses, experimentalDesign, analysisMethod, expectedResults, plan.id]);
          
          console.log(`迁移方案 ID ${plan.id} 完成`);
        } catch (parseError) {
          console.warn(`方案 ID ${plan.id} 的methodology数据解析失败:`, parseError.message);
        }
      }
      
      console.log('✅ research_plans表迁移完成');
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('❌ 迁移失败:', error);
  } finally {
    await closeDatabase();
  }
};

// 如果直接运行此脚本，执行迁移
console.log('迁移脚本启动');
console.log('import.meta.url:', import.meta.url);
console.log('process.argv[1]:', process.argv[1]);

// 使用更简单的检测方法
if (process.argv[1] && process.argv[1].endsWith('migrate-research-plans.js')) {
  console.log('检测到直接运行迁移脚本，开始执行...');
  migrateResearchPlans();
} else {
  console.log('迁移脚本作为模块被导入');
}

export default migrateResearchPlans; 