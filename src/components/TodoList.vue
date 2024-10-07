<template>
  <div class="todo_wrapper">
    <div v-for="data in data" :key="data.id">
      <TodoListItem @todo-changed="handleEvent" :data="data" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Todo } from '@/types/types';
import TodoListItem from './TodoListItem.vue';

const props = defineProps<{
  data: Todo[] | undefined;
}>();

const emit = defineEmits(['todoChanged']);

const handleEvent = () => {
  emit('todoChanged');
};
</script>

<style scoped>
.todo_wrapper {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 15px;
}
</style>
