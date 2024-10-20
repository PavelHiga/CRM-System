<template>
  <div class="todo_wrapper">
    <TodoListItem v-for="data in data" :key="data.id" @todoChanged="todoChangeHandler" :data="data" />
  </div>
</template>

<script setup lang="ts">
import type { Todo } from '@/types/types';
import TodoListItem from './TodoListItem.vue';

const props = defineProps<{
  data: Todo[];
}>();

const emit = defineEmits(['todoChanged']);

const todoChangeHandler = () => {
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
