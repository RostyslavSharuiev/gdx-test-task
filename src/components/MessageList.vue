<script setup lang="ts">
import MessageItem from './MessageItem.vue';
import type { Message } from '@/types/chat';

defineProps<{
  messages: Message[];
}>();
</script>

<template>
  <ul
    class="messages"
    aria-label="Chat messages">
    <MessageItem
      v-for="(message, index) of messages"
      :key="index"
      :message="message" />
  </ul>
</template>

<style lang="css" scoped></style>
