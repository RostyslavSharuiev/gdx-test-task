<script setup lang="ts">
import AppButton from './AppButton.vue';

defineEmits<{ (event: 'clear-messages'): void }>();
</script>

<template>
  <header class="chat-header">
    <div class="chat-title">
      <div class="chat-title__name">Chat Eliza</div>
      <div class="chat-title__sub">Vue 3 + TypeScript + ConnectRPC</div>
    </div>

    <div class="chat-actions">
      <AppButton @click="$emit('clear-messages')">
        <span class="btn__text">Clear</span>
        Clear
      </AppButton>
    </div>
  </header>
</template>

<style lang="css" scoped>
.chat-header {
  padding: 18px 18px 14px;
  background: var(--card-2);
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
}

.chat-title__name {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.2px;
}

.chat-title__sub {
  font-size: 12px;
  color: var(--muted);
  margin-top: 2px;
}

.chat-actions {
  display: flex;
  gap: 10px;
}
</style>
