import { nextTick, ref } from 'vue';

export const useAutoScroll = () => {
  const elementRef = ref<HTMLElement | null>(null);

  const scrollToBottom = async () => {
    await nextTick();

    if (elementRef.value) {
      elementRef.value.scrollTop = elementRef.value.scrollHeight;
    }
  };

  return {
    elementRef,
    scrollToBottom,
  };
};
