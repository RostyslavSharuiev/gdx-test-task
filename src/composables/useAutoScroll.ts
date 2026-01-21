import { nextTick, type Ref } from 'vue';

export const useAutoScroll = (elementRef: Ref<HTMLElement | null>) => {
  const scrollToBottom = async () => {
    await nextTick();

    if (elementRef.value) {
      elementRef.value.scrollTop = elementRef.value.scrollHeight;
    }
  };

  return {
    scrollToBottom,
  };
};
