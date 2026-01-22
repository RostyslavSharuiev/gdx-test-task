import { computed, onMounted } from 'vue';
import { useMessages } from './useMessages';
import { useElizaApi } from './useElizaApi';
import { getFormattedTime } from '@/utils/getFormattedTime';
import type { ChatApiClient } from '@/api/types';

type MessageStatus = 'success' | 'error';

export const useChat = (
  apiClient: ChatApiClient,
  scrollToBottom?: () => Promise<void>
) => {
  const { messages, addMessage, clearMessages } = useMessages();
  const {
    isLoading,
    error,
    sendMessage: apiSendMessage,
  } = useElizaApi(apiClient);

  onMounted(async () => {
    if (messages.value.length > 0 && scrollToBottom) {
      await scrollToBottom();
    }
  });

  const sendMessage = async (text: string) => {
    const textToSend = text.trim();

    if (!textToSend) return;

    addMessage({
      role: 'user',
      message: textToSend,
      timestamp: getFormattedTime(),
    });

    if (scrollToBottom) {
      await scrollToBottom();
    }

    const response = await apiSendMessage(textToSend);

    if (response) {
      addMessage({
        role: 'bot',
        message: response,
        timestamp: getFormattedTime(),
      });
    } else {
      addMessage({
        role: 'system',
        message: error.value || 'Network error. Please try again.',
      });
    }

    if (scrollToBottom) {
      await scrollToBottom();
    }
  };

  const status = computed<MessageStatus>(() =>
    error.value ? 'error' : 'success'
  );

  return {
    messages,
    isLoading,
    status,
    sendMessage,
    clearMessages,
  };
};
