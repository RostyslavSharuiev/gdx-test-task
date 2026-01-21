<script setup lang="ts">
import { useTemplateRef } from 'vue';
import AppButton from './AppButton.vue';

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
      action="#"
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
          class="input"
          type="text"
          placeholder="Type your message…"
          autocomplete="off" />
        <div class="composer__hint">Enter — send • Shift+Enter — new line</div>
      </div>

      <AppButton
        :disabled="isButtonDisabled"
        :class="{ 'is-loading': isLoading }"
        type="submit">
        <span class="btn__text">Send</span>
        <span
          class="btn__spinner"
          aria-hidden="true"></span>
      </AppButton>
    </form>

    <div class="status">
      <span class="status__dot"></span>
      <span class="status__text">Ready</span>
    </div>
  </footer>
</template>
