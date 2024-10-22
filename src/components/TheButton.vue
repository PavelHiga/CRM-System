<template>
  <button :class="variant">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  variant: 'primary' | 'accent' | 'alert' | 'success';
}>();
</script>

<style scoped lang="scss">
button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  color: #fff;
}

.primary {
  background-color: var(--primary-color);
}

.accent {
  background-color: var(--primary-color);
  padding: 10px 50px;
}

.success {
  background-color: var(--success-color);
}

.alert {
  background-color: var(--alert-color);
}
</style>
