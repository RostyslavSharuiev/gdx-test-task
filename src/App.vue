<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue';
import { useAutoScroll } from './composables/useAutoScroll';
import { useChat } from './composables/useChat';
import MessageList from './components/MessageList.vue';
import ChatHeader from './components/ChatHeader.vue';
import ChatFooter from './components/ChatFooter.vue';

const messagesRef = useTemplateRef<HTMLElement>('scroll-element');
const { scrollToBottom } = useAutoScroll(messagesRef);

const { messages, isLoading, status, clearMessages, sendMessage } =
  useChat(scrollToBottom);

const inputValue = ref('');
const chatFooterRef = useTemplateRef<InstanceType<typeof ChatFooter>>('chat-footer');

const isButtonDisabled = computed(() => {
  return inputValue.value.trim().length === 0 || isLoading.value;
});

const onSendMessage = async (event: SubmitEvent) => {
  event.preventDefault();
  await sendMessage(inputValue.value);

  if (status.value === 'success') {
    inputValue.value = '';
  }

  chatFooterRef.value?.focus();
};
</script>

<template>
  <div class="page">
    <div class="chat-card">
      <ChatHeader @clear-messages="clearMessages" />

      <main
        class="chat-body"
        ref="scroll-element">
        <MessageList :messages="messages" />
      </main>

      <ChatFooter
        ref="chat-footer"
        v-model="inputValue"
        @send-message="onSendMessage"
        :is-button-disabled="isButtonDisabled"
        :is-loading="isLoading" />
    </div>
  </div>
</template>

<style scoped lang="css"></style>
