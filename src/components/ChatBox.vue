<template>
  <div class="bg-white rounded-xl shadow-sm p-6 h-full">
    <div class="flex flex-col h-full">
      <!-- 聊天记录 -->
      <div class="flex-1 overflow-y-auto mb-4 space-y-4" ref="chatContainer">
        <div v-for="message in chatState.messages" :key="message.id" 
             :class="['flex', message.type === 'user' ? 'justify-end' : 'justify-start']">
          <div :class="['max-w-[70%] rounded-lg p-4', 
                       message.type === 'user' ? 'bg-purple-100' : 
                       message.isError ? 'bg-red-50 border border-red-200' : 'bg-gray-100']">
            <p :class="['whitespace-pre-wrap', message.isError ? 'text-red-700' : 'text-gray-800']">{{ getDisplayContent(message) }}</p>
            
            <!-- 研究方案PDF下载按钮 -->
            <div v-if="message.type === 'assistant' && message.fullContent && isResearchPlan(message.fullContent)" 
                 class="mt-3 pt-3 border-t border-gray-200">
              <div class="flex items-center justify-between bg-blue-50 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">定量研究方案.pdf</p>
                    <p class="text-xs text-gray-500">完整研究方案文档</p>
                  </div>
                </div>
                <button 
                  @click="handleDownloadPDF(message.fullContent)"
                  class="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                  </svg>
                  <span>下载PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- 加载动画 -->
        <div v-if="chatState.isLoading" class="flex justify-start">
          <div class="max-w-[70%] rounded-lg p-4 bg-gray-100">
            <LoadingDots />
          </div>
        </div>
      </div>

      <!-- 对话引导 -->
      <ConversationGuide @sendPrompt="handlePromptMessage" />

      <!-- 输入框 -->
      <div class="flex items-center space-x-2">
        <div class="relative flex-1">
          <input
            v-model="newMessage"
            type="text"
            placeholder="请输入您的问题..."
            class="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
            @keyup.enter="handleSendMessage"
            :disabled="chatState.isLoading"
          />
          <!-- 润色提示词按钮 -->
          <button
            @click="handleShowOptimizeDialog"
            :disabled="!newMessage.trim() || chatState.isLoading"
            class="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="润色提示词"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3l3.09 6.26L22 10.27l-5 4.87 1.18 6.88L12 18.77l-6.18 3.25L7 15.14 2 10.27l6.91-1.01L12 3z" />
            </svg>
          </button>
        </div>
        <button
          @click="handleSendMessage"
          class="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="chatState.isLoading"
        >
          发送
        </button>
      </div>
    </div>

    <!-- 润色提示词对话框 -->
    <PromptOptimizeDialog 
      :visible="showOptimizeDialog" 
      :originalPrompt="newMessage"
      @close="showOptimizeDialog = false"
      @replace="handleOptimizeReplace"
    />
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { chatState, sendMessage } from '../stores/chatStore'
import { sendSilentMessageToCoze } from '../services/cozeApi'
import LoadingDots from './LoadingDots.vue'
import ConversationGuide from './ConversationGuide.vue'
import PromptOptimizeDialog from './PromptOptimizeDialog.vue'
import html2pdf from 'html2pdf.js'

// 接收页面上下文的props
const props = defineProps({
  pageContext: {
    type: String,
    default: null
  }
})

const newMessage = ref('')
const chatContainer = ref(null)
const showOptimizeDialog = ref(false)

// 检测是否为研究方案
const isResearchPlan = (content) => {
  const planKeywords = ['研究假设', '实验设计', '数据分析', '结果呈现', '#研究假设', '#实验设计', '#数据分析', '#结果呈现']
  const keywordCount = planKeywords.filter(keyword => content.includes(keyword)).length
  return keywordCount >= 2 // 至少包含2个关键词才认为是研究方案
  }
  
  // 将markdown转换为HTML
  const markdownToHtml = (text) => {
    if (!text) return ''
    
    let html = text
      // 处理标题（从大到小处理，避免冲突）
      .replace(/#{6}\s+(.*?)(\n|$)/g, '<h6>$1</h6>')
      .replace(/#{5}\s+(.*?)(\n|$)/g, '<h5>$1</h5>')
      .replace(/#{4}\s+(.*?)(\n|$)/g, '<h4>$1</h4>')
      .replace(/#{3}\s+(.*?)(\n|$)/g, '<h3>$1</h3>')
      .replace(/#{2}\s+(.*?)(\n|$)/g, '<h2>$1</h2>')
      .replace(/#{1}\s+(.*?)(\n|$)/g, '<h1>$1</h1>')
      // 处理粗体和斜体
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // 处理代码
      .replace(/`(.*?)`/g, '<code>$1</code>')
      // 处理链接
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    
    // 处理列表
    const lines = html.split('\n')
    const processedLines = []
    let inList = false
    
    lines.forEach(line => {
      const trimmedLine = line.trim()
      
      // 检查是否是列表项
      if (trimmedLine.match(/^[-*+]\s+/) || trimmedLine.match(/^\d+\.\s+/)) {
        if (!inList) {
          processedLines.push('<ul>')
          inList = true
        }
        // 移除列表标记并包装为li
        const content = trimmedLine.replace(/^[-*+]\s+/, '').replace(/^\d+\.\s+/, '')
        processedLines.push(`<li>${content}</li>`)
      } else {
        if (inList) {
          processedLines.push('</ul>')
          inList = false
        }
        processedLines.push(line)
      }
    })
    
    // 如果最后还在列表中，关闭列表
    if (inList) {
      processedLines.push('</ul>')
    }
    
    html = processedLines.join('\n')
    
    // 处理段落（按双换行符分割）
    const paragraphs = html.split(/\n\s*\n/)
    const processedParagraphs = paragraphs.map(paragraph => {
      const trimmed = paragraph.trim()
      if (!trimmed) return ''
      
      // 如果已经是HTML标签，直接返回
      if (trimmed.match(/^<(h[1-6]|ul|ol|li|p|div)/)) {
        return trimmed
      }
      
      // 否则包装为段落
      return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`
    })
    
    return processedParagraphs.filter(p => p).join('\n')
  }
  
  // 生成PDF
const generatePDF = async (content, title = '定量研究方案') => {
  try {
    console.log('开始生成PDF，内容长度:', content.length)
    
    // 解析内容结构
    const sections = [
      { title: '研究假设', content: '', id: 'hypothesis' },
      { title: '实验设计', content: '', id: 'design' },
      { title: '数据分析', content: '', id: 'analysis' },
      { title: '结果呈现', content: '', id: 'results' }
    ]
    
    // 简单的内容分割逻辑
    let currentSection = null
    const lines = content.split('\n')
    
    lines.forEach(line => {
      const trimmedLine = line.trim()
      if (trimmedLine.includes('研究假设') && !currentSection) {
        currentSection = sections.find(s => s.title === '研究假设')
      } else if (trimmedLine.includes('实验设计')) {
        currentSection = sections.find(s => s.title === '实验设计')
      } else if (trimmedLine.includes('数据分析')) {
        currentSection = sections.find(s => s.title === '数据分析')
      } else if (trimmedLine.includes('结果呈现')) {
        currentSection = sections.find(s => s.title === '结果呈现')
      } else if (currentSection && trimmedLine && !trimmedLine.match(/^#+\s/)) {
        // 只添加非标题行的内容
        currentSection.content += trimmedLine + '\n'
      }
    })
    
    // 如果没有找到结构化内容，就使用原始内容
    if (sections.every(s => !s.content.trim())) {
      sections[0].content = content
      sections[0].title = '研究方案内容'
    }
    
    console.log('解析的sections:', sections.map(s => ({ title: s.title, hasContent: !!s.content.trim() })))
    
    // 直接创建HTML字符串
    const timestamp = new Date().toLocaleString('zh-CN')
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="zh-CN">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: "Microsoft YaHei", "SimSun", "PingFang SC", Arial, sans-serif;
            line-height: 1.8;
            color: #333;
            background: white;
            padding: 30px;
            max-width: 800px;
            margin: 0 auto;
          }
          
          .header {
            text-align: center;
            margin-bottom: 40px;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 20px;
          }
          
          .title {
            font-size: 24px;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 10px;
          }
          
          .timestamp {
            font-size: 12px;
            color: #6b7280;
          }
          
          .section {
            margin-bottom: 30px;
            page-break-inside: avoid;
          }
          
          .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #374151;
            margin-bottom: 15px;
            border-left: 4px solid #8b5cf6;
            padding-left: 15px;
            background-color: #f9fafb;
            padding: 10px 15px;
          }
          
          .section-content {
            font-size: 14px;
            line-height: 1.8;
            text-align: justify;
            padding: 15px;
            background-color: #fafafa;
            border-radius: 5px;
          }
          
          .section-content h1, .section-content h2, .section-content h3, 
          .section-content h4, .section-content h5, .section-content h6 {
            margin: 15px 0 10px 0;
            color: #374151;
            font-weight: bold;
          }
          
          .section-content h1 { font-size: 18px; }
          .section-content h2 { font-size: 16px; }
          .section-content h3 { font-size: 15px; }
          .section-content h4, .section-content h5, .section-content h6 { font-size: 14px; }
          
          .section-content strong {
            font-weight: bold;
            color: #1f2937;
          }
          
          .section-content em {
            font-style: italic;
            color: #4b5563;
          }
          
          .section-content code {
            background-color: #f3f4f6;
            padding: 2px 4px;
            border-radius: 3px;
            font-family: "Courier New", monospace;
            font-size: 12px;
          }
          
          .section-content ul, .section-content ol {
            margin: 10px 0;
            padding-left: 20px;
          }
          
          .section-content li {
            margin: 5px 0;
          }
          
          .section-content p {
            margin: 8px 0;
          }
          
          .section-content a {
            color: #3b82f6;
            text-decoration: underline;
          }
          
          @media print {
            body { 
              margin: 0; 
              padding: 20px;
            }
            .section {
              page-break-inside: avoid;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">${title}</div>
          <div class="timestamp">生成时间：${timestamp}</div>
        </div>
        
        <div class="content">
          ${sections.filter(section => section.content.trim()).map(section => `
            <div class="section">
              <div class="section-title">${section.title}</div>
              <div class="section-content">${markdownToHtml(section.content.trim())}</div>
            </div>
          `).join('')}
        </div>
      </body>
      </html>
    `
    
    console.log('生成的HTML内容长度:', htmlContent.length)
    
    // 配置PDF选项
    const options = {
      margin: [10, 10, 10, 10],
      filename: `定量研究方案_${new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19)}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait' 
      }
    }
    
    // 生成PDF
    console.log('开始PDF转换...')
    await html2pdf().set(options).from(htmlContent).save()
    console.log('PDF生成完成')
    
    return options.filename
  } catch (error) {
    console.error('PDF生成失败:', error)
    alert('PDF生成失败：' + error.message)
    return null
  }
}

// 处理消息显示内容
const getDisplayContent = (message) => {
  // 如果是用户消息或错误消息，直接返回原内容
  if (message.type === 'user' || message.isError) {
    return message.content
  }
  
  let displayContent = message.content
  
  // 如果是助手消息，尝试解析JSON并提取output和otherIntention
  if (message.type === 'assistant') {
    try {
      // 首先尝试从代码块中提取JSON
      const jsonMatch = message.content.match(/```json\s*([\s\S]*?)\s*```/i) || message.content.match(/\{[\s\S]*\}/)
      
      if (jsonMatch) {
        let jsonStr = jsonMatch[1] || jsonMatch[0]
        
        // 增强的JSON修复逻辑
        jsonStr = jsonStr
          .replace(/,\s*}/g, '}')  // 移除对象末尾的多余逗号
          .replace(/,\s*]/g, ']')  // 移除数组末尾的多余逗号
          .replace(/:\s*,/g, ': null,')  // 将空值替换为null
          .replace(/"\s*:\s*,/g, '": null,')  // 处理 "key": , 的情况
          .replace(/,\s*,/g, ',')  // 移除连续的逗号
          .replace(/}\s*}+$/g, '}')  // 移除末尾多余的花括号
          .replace(/^{+/g, '{')  // 移除开头多余的花括号
          .trim()
        
        console.log('尝试解析的JSON字符串:', jsonStr)
        
        let jsonData = null
        
        // 尝试多种解析方法
        try {
          jsonData = JSON.parse(jsonStr)
        } catch (e1) {
          console.log('第一次解析失败:', e1.message)
          
          // 尝试修复更复杂的格式问题
          try {
            // 尝试找到最后一个完整的JSON对象
            const braceCount = (str, char) => (str.match(new RegExp('\\' + char, 'g')) || []).length
            let openBraces = braceCount(jsonStr, '{')
            let closeBraces = braceCount(jsonStr, '}')
            
            if (openBraces > closeBraces) {
              // 缺少结束花括号
              jsonStr += '}'.repeat(openBraces - closeBraces)
            } else if (closeBraces > openBraces) {
              // 多余的结束花括号，从末尾移除
              const excess = closeBraces - openBraces
              for (let i = 0; i < excess; i++) {
                jsonStr = jsonStr.replace(/}([^}]*)$/, '$1')
              }
            }
            
            console.log('修复后的JSON字符串:', jsonStr)
            jsonData = JSON.parse(jsonStr)
          } catch (e2) {
            console.log('第二次解析也失败:', e2.message)
            
            // 最后尝试：提取可识别的字段
            try {
              const outputMatch = jsonStr.match(/"output"\s*:\s*"([^"]*)"/)
              const otherMatch = jsonStr.match(/"(?:otherIntention|otherInthtion)"\s*:\s*"([^"]*)"/)
              
              if (outputMatch || otherMatch) {
                jsonData = {
                  output: outputMatch ? outputMatch[1] : '',
                  otherIntention: otherMatch ? otherMatch[1] : ''
                }
                console.log('通过正则表达式提取的数据:', jsonData)
              }
            } catch (e3) {
              console.log('正则提取也失败:', e3.message)
            }
          }
        }
        
        // 如果解析成功，提取display内容
        if (jsonData && typeof jsonData === 'object') {
          const output = jsonData.output || ''
          const otherIntention = jsonData.otherIntention || jsonData.otherInthtion || '' // 兼容拼写错误
          
          // 构建显示内容：拼接output和otherIntention
          const contentParts = []
          
          if (otherIntention && otherIntention.trim()) {
            contentParts.push(otherIntention.trim())
          }
          
          if (output && output.trim()) {
            contentParts.push(output.trim())
          }
          
          // 如果有任何一个字段有内容，返回拼接结果
          if (contentParts.length > 0) {
            displayContent = contentParts.join('\n\n')
            console.log('成功提取显示内容:', displayContent)
          }
        }
      }
    } catch (error) {
      // JSON解析失败，返回原内容
      console.log('JSON解析完全失败，显示原始内容:', error.message)
    }
  }
  
  // 检查是否为研究方案，如果是则截断显示并存储完整内容
  if (isResearchPlan(displayContent)) {
    // 存储完整内容用于PDF生成
    message.fullContent = displayContent
    
    // 只显示前200个字符
    if (displayContent.length > 200) {
      return displayContent.substring(0, 200) + '...\n\n[完整内容已生成PDF文件]'
    }
  }
  
  // 默认返回原内容
  return displayContent
}

// 处理PDF下载
const handleDownloadPDF = (content) => {
  const filename = generatePDF(content)
  if (filename) {
    // 显示成功提示
    alert(`PDF文件"${filename}"已生成并下载`)
  }
}



// 处理提示词点击
const handlePromptMessage = async (prompt) => {
  // 直接将提示词设置到输入框并发送
  newMessage.value = prompt
  await handleSendMessage()
}

// 显示润色对话框
const handleShowOptimizeDialog = () => {
  if (!newMessage.value.trim()) return
  showOptimizeDialog.value = true
}

// 处理润色替换
const handleOptimizeReplace = (optimizedPrompt) => {
  newMessage.value = optimizedPrompt
}

// 发送消息
const handleSendMessage = async () => {
  if (!newMessage.value.trim()) return
  
  const message = newMessage.value
  newMessage.value = ''
  
  // 传递页面上下文给sendMessage方法
  await sendMessage(message, props.pageContext)
  
  // 自动滚动到底部
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}

// 监听消息变化，自动滚动
watch(() => chatState.messages.length, () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
})
</script>

<style scoped>
/* 自定义滚动条样式 */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c5c5c5;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style> 