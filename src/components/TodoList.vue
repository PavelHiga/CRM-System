<template>
  <div class="todolist_wrapper">
    <template v-for="data in data" :key="data.id">
      <TodoListItem :data="data" />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Todo } from '@/types/types';
import TodoListItem from './TodoListItem.vue';

const props = defineProps<{
  data: Todo[] | undefined;
}>();
</script>

<style scoped>
.todolist_wrapper {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 15px;
}
</style>
