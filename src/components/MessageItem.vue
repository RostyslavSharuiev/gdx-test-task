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

<style lang="css" scoped>
.msg {
  display: flex;
}

.msg--user {
  justify-content: flex-end;
}
.msg--bot {
  justify-content: flex-start;
}
.msg--system {
  justify-content: center;
}

.msg__bubble {
  max-width: min(72ch, 78%);
  border-radius: var(--radius);
  padding: 12px 14px;
  border: 1px solid var(--border);
  background: var(--bot);
}

.msg--user .msg__bubble {
  background:
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.08),
      rgba(255, 255, 255, 0.04)
    ),
    rgba(43, 108, 255, 0.22);
  border-color: rgba(43, 108, 255, 0.35);
}

.msg--system .msg__bubble {
  max-width: min(80ch, 90%);
  background: var(--system);
  border-color: rgba(255, 170, 0, 0.25);
}

.msg__meta {
  font-size: 12px;
  color: var(--muted);
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 6px;
}

.msg__time {
  opacity: 0.85;
}

.msg__text {
  font-size: 14px;
  line-height: 1.45;
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
