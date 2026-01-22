import { useLocalStorage } from './useLocalStorage';
import type { Message } from '@/types/chat';

const STORAGE_KEY = 'chat-eliza-history';

export const useMessages = () => {
  const messages = useLocalStorage<Message[]>(STORAGE_KEY, []);

  const addMessage = (message: Message) => {
    messages.value.push(message);
  };

  const clearMessages = () => {
    messages.value = [];
  };

  return {
    messages,
    addMessage,
    clearMessages,
  };
};
