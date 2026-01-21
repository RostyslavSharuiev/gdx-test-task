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
      <AppButton @click="$emit('clear-messages')">Clear</AppButton>
    </div>
  </header>
</template>

<style lang="css" scoped></style>
