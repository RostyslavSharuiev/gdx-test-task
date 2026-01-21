<script setup lang="ts">
type ButtonType = 'button' | 'submit';

const { type = 'button', disabled = false } = defineProps<{
  type?: ButtonType;
  disabled?: boolean;
}>();

defineEmits<{ (event: 'click'): void }>();

const BUTTON_CONFIG: Record<ButtonType, { class: string }> = {
  button: { class: 'btn--ghost' },
  submit: { class: 'btn--primary' },
};
</script>

<template>
  <button
    @click="$emit('click')"
    :type="type"
    :disabled="disabled"
    :class="BUTTON_CONFIG[type].class"
    class="btn">
    <slot />
  </button>
</template>
