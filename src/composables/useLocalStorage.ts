import { onMounted, ref, watch } from 'vue';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const data = ref<T>(initialValue);

  onMounted(() => {
    const saved = localStorage.getItem(key);

    if (saved) {
      try {
        data.value = JSON.parse(saved);
      } catch (e) {
        console.error(`Failed to parse localStorage for key "${key}"`, e);

        localStorage.removeItem(key);
      }
    }
  });

  watch(
    data,
    (newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    },
    { deep: true }
  );

  return data;
};
