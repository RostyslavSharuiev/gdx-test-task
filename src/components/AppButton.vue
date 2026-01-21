<script setup lang="ts">
type ButtonType = 'button' | 'submit';

const {
  type = 'button',
  disabled = false,
  hasSpinner = false,
} = defineProps<{
  type?: ButtonType;
  disabled?: boolean;
  hasSpinner?: boolean;
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

    <span
      v-if="hasSpinner"
      class="btn__spinner"
      aria-hidden="true"></span>
  </button>
</template>

<style lang="css" scoped>
.btn {
  height: 44px;
  padding: 0 14px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  cursor: pointer;
  user-select: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: rgba(0, 0, 0, 0.18);
  color: var(--text);
}

.btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.btn--primary {
  background: rgba(43, 108, 255, 0.22);
  border-color: rgba(43, 108, 255, 0.45);
}

.btn--ghost {
  background: transparent;
}

.btn__spinner {
  width: 14px;
  height: 14px;
  border-radius: 999px;
  border: 2px solid rgba(233, 236, 245, 0.25);
  border-top-color: rgba(233, 236, 245, 0.9);
  display: none;
  animation: spin 0.8s linear infinite;
}

/* When loading add class .is-loading on button */
.btn.is-loading .btn__spinner {
  display: inline-block;
}
.btn.is-loading .btn__text {
  opacity: 0.85;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
