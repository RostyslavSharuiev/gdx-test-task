import { onMounted, ref } from 'vue';
import { client } from '@/api/client';
import { useLocalStorage } from './useLocalStorage';
import { getFormattedTime } from '@/utils/getFormattedTime';
import type { Message } from '@/types/chat';

const STORAGE_KEY = 'chat-eliza-history';

type MessageStatus = 'success' | 'error';

export const useChat = (scrollToBottom?: () => Promise<void>) => {
  const isLoading = ref(false);
  const status = ref<MessageStatus>('success');
  const messages = useLocalStorage<Message[]>(STORAGE_KEY, []);

  onMounted(async () => {
    if (messages.value.length > 0 && scrollToBottom) {
      await scrollToBottom();
    }
  });

  const clearMessages = () => {
    messages.value = [];
  };

  const sendMessage = async (text: string) => {
    const textToSend = text.trim();

    if (!textToSend) return;

    isLoading.value = true;

    messages.value.push({
      role: 'user',
      message: textToSend,
      timestamp: getFormattedTime(),
    });

    if (scrollToBottom) {
      await scrollToBottom();
    }

    try {
      const response = await client.say({
        sentence: textToSend,
      });

      messages.value.push({
        role: 'bot',
        message: response.sentence,
        timestamp: getFormattedTime(),
      });

      status.value = 'success';
    } catch (error) {
      messages.value.push({
        role: 'system',
        message: 'Network error. Please try again.',
      });

      status.value = 'error';
    } finally {
      isLoading.value = false;

      if (scrollToBottom) {
        await scrollToBottom();
      }
    }
  };

  return {
    messages,
    isLoading,
    status,
    sendMessage,
    clearMessages,
  };
};
