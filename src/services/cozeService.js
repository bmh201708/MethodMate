// Coze API 服务
import { CozeAPI } from '@coze/api';

// 初始化 Coze API 客户端
const apiClient = new CozeAPI({
  token: 'pat_Q06cU8OsiWefqJHG2ed8GlV1al9WRGRVNAfkNmpG567hDXVbcHeyLHWtMLciNj37',
  baseURL: 'https://api.coze.com'
});

// Coze服务类
class CozeService {
  // 发送聊天消息（流式响应）
  async sendChatStream(message, conversationId = null) {
    try {
      const params = {
        bot_id: '7513529977745915905',
        user_id: '7505301221562023954',
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
        bot_id: '7513529977745915905',
        user_id: '7505301221562023954',
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