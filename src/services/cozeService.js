// Coze API 服务
import { CozeAPI } from '@coze/api';

// 初始化 Coze API 客户端
const apiClient = new CozeAPI({
  token: import.meta.env.VITE_COZE_API_KEY || '',
  baseURL: import.meta.env.VITE_COZE_API_URL || 'https://api.coze.com'
});

// Coze服务类
class CozeService {
  // 发送聊天消息（流式响应）
  async sendChatStream(message, conversationId = null) {
    try {
      const params = {
        bot_id: import.meta.env.VITE_COZE_BOT_ID || '',
        user_id: import.meta.env.VITE_COZE_USER_ID || '',
        query: message,
        stream: true
      };

      // 如果有会话ID，添加到参数中
      if (conversationId) {
        params.conversation_id = conversationId;
      }

      const stream = await apiClient.chat.stream(params);
      return stream;
    } catch (error) {
      console.error('Coze聊天错误:', error);
      throw error;
    }
  }

  // 发送聊天消息（非流式响应）
  async sendChat(message, conversationId = null) {
    try {
      const params = {
        bot_id: import.meta.env.VITE_COZE_BOT_ID || '',
        user_id: import.meta.env.VITE_COZE_USER_ID || '',
        query: message,
        stream: false
      };

      // 如果有会话ID，添加到参数中
      if (conversationId) {
        params.conversation_id = conversationId;
      }

      const response = await apiClient.chat.create(params);
      return response;
    } catch (error) {
      console.error('Coze聊天错误:', error);
      throw error;
    }
  }

  // 获取会话历史
  async getConversationHistory(conversationId) {
    try {
      const response = await apiClient.conversations.messages.list({
        conversation_id: conversationId,
        limit: 50
      });
      return response;
    } catch (error) {
      console.error('获取会话历史错误:', error);
      throw error;
    }
  }
}

// 导出服务实例
export default new CozeService(); 