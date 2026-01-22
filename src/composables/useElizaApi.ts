import { ref } from 'vue';
import type { ChatApiClient } from '@/api/types';

export const useElizaApi = (apiClient: ChatApiClient) => {
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const sendMessage = async (text: string): Promise<string | null> => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await apiClient.sendMessage(text);

      return response;
    } catch (err) {
      error.value = 'Network error. Please try again.';
      console.error('API error:', err);

      return null;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    error,
    sendMessage,
  };
};
