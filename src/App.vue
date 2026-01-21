<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue';
import { useAutoScroll } from './composables/useAutoScroll';
import { useChat } from './composables/useChat';
import MessageList from './components/MessageList.vue';
import AppButton from './components/AppButton.vue';

// @ts-ignore
const { elementRef, scrollToBottom } = useAutoScroll();
const { messages, isLoading, status, clearMessages, sendMessage } =
  useChat(scrollToBottom);

const inputValue = ref('');
const inputRef = useTemplateRef<HTMLInputElement>('input-field');

const isButtonDisabled = computed(() => {
  return inputValue.value.trim().length === 0 || isLoading.value;
});

const onSendMessage = async (event: SubmitEvent) => {
  event.preventDefault();
  await sendMessage(inputValue.value);

  if (status.value === 'success') {
    inputValue.value = '';
  }

  inputRef.value?.focus();
};
</script>

<template>
  <div class="page">
    <div class="chat-card">
      <header class="chat-header">
        <div class="chat-title">
          <div class="chat-title__name">Chat Eliza</div>
          <div class="chat-title__sub">Vue 3 + TypeScript + ConnectRPC</div>
        </div>

        <div class="chat-actions">
          <AppButton @click="clearMessages">Clear</AppButton>
        </div>
      </header>

      <main
        class="chat-body"
        ref="elementRef">
        <MessageList :messages="messages" />
      </main>

      <footer class="chat-footer">
        <form
          @submit="onSendMessage"
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
            <div class="composer__hint">
              Enter — send • Shift+Enter — new line
            </div>
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
    </div>
  </div>
</template>

<style scoped lang="css"></style>
