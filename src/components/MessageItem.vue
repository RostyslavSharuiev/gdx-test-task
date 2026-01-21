<script setup lang="ts">
import type { Message } from '@/types/chat';
import { computed } from 'vue';

const { message } = defineProps<{
  message: Message;
}>();

const messageUser = computed(() => {
  switch (message.role) {
    case 'bot':
      return 'Eliza';
    case 'user':
      return 'You';
    default:
      return 'System';
  }
});
</script>

<template>
  <li
    class="msg"
    :class="`msg--${message.role}`">
    <div class="msg__bubble">
      <div class="msg__meta">
        {{ messageUser }}

        <template v-if="message.role !== 'system'">•</template>

        <span
          v-if="message.timestamp"
          class="msg__time">
          {{ message.timestamp }}
        </span>
      </div>
      <div class="msg__text">{{ message.message }}</div>
    </div>
  </li>
</template>

<style lang="css" scoped></style>
