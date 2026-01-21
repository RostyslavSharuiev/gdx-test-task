<script setup lang="ts">
import { useTemplateRef } from 'vue';
import AppButton from './AppButton.vue';
import ChatStatus from './ChatStatus.vue';

const { isButtonDisabled = true, isLoading = false } = defineProps<{
  isButtonDisabled?: boolean;
  isLoading?: boolean;
}>();

const inputValue = defineModel<string>({ required: true });

defineEmits<{ 'send-message': [event: SubmitEvent] }>();

const inputRef = useTemplateRef<HTMLInputElement>('input-field');

const focus = () => {
  inputRef.value?.focus();
};

defineExpose({
  focus,
});
</script>

<template>
  <footer class="chat-footer">
    <form
      @submit="$emit('send-message', $event)"
      class="composer"
      aria-label="Message composer">
      <div class="composer__field">
        <label
          class="sr-only"
          for="message">
          Message
        </label>

        <input
          v-model="inputValue"
          ref="input-field"
          id="message"
          type="text"
          placeholder="Type your message…"
          autocomplete="off"
          class="input" />
        <div class="composer__hint">Enter — send • Shift+Enter — new line</div>
      </div>

      <AppButton
        :disabled="isButtonDisabled"
        :class="{ 'is-loading': isLoading }"
        type="submit"
        has-spinner>
        <span class="btn__text">Send</span>
      </AppButton>
    </form>

    <ChatStatus />
  </footer>
</template>

<style lang="css" scoped>
.chat-footer {
  padding: 14px 18px 18px;
  background: var(--card-2);
  border-top: 1px solid var(--border);
  display: grid;
  gap: 10px;
}

.composer {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  align-items: start;
}

.composer__field {
  display: grid;
  gap: 6px;
}

.input {
  width: 100%;
  height: 44px;
  padding: 0 12px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: rgba(0, 0, 0, 0.18);
  color: var(--text);
  outline: none;
}

.input::placeholder {
  color: rgba(233, 236, 245, 0.42);
}

.input:focus {
  border-color: rgba(43, 108, 255, 0.45);
  box-shadow: 0 0 0 3px rgba(43, 108, 255, 0.15);
}

.composer__hint {
  font-size: 12px;
  color: var(--muted);
}

.sr-only {
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
}
</style>
