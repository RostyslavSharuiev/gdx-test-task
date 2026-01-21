<script setup lang="ts"></script>

<template>
  <div class="status">
    <span class="status__dot"></span>
    <span class="status__text">Ready</span>
  </div>
</template>

<style lang="css" scoped>
.status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--muted);
}

.status__dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: rgba(80, 220, 140, 0.9);
  box-shadow: 0 0 0 3px rgba(80, 220, 140, 0.15);
}
</style>
