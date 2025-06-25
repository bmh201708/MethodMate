#!/usr/bin/env node

import { migrateStatisticalMethods } from './migrate-statistical-methods.js';

console.log('='.repeat(60));
console.log('         统计方法数据迁移脚本');
console.log('='.repeat(60));
console.log('');
console.log('此脚本将：');
console.log('1. 创建统计方法数据表（如果不存在）');
console.log('2. 读取asset目录下的所有markdown文件');
console.log('3. 解析文件内容并提取关键词');
console.log('4. 将数据导入到数据库中');
console.log('');
console.log('开始执行迁移...');
console.log('');

// 运行迁移
migrateStatisticalMethods(); 