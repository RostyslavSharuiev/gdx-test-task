import { ref, watch } from 'vue';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  let startValue = initialValue;

  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      startValue = JSON.parse(saved);
    }
  } catch (e) {
    console.error(`Failed to parse localStorage for key "${key}"`, e);
    localStorage.removeItem(key);
  }

  const data = ref<T>(startValue);

  watch(
    data,
    (newValue) => {
      try {
        localStorage.setItem(key, JSON.stringify(newValue));
      } catch (e) {
        console.error(`Failed to save to localStorage for key "${key}"`, e);
      }
    },
    { deep: true }
  );

  return data;
};
