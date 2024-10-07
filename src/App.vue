<template>
  <div class="wrapper">
    <AddTodoForm @todoCreated="handleEvent" />
    <TodoListFilters
      @filterChanged="(index, status) => handleEvent(index, status)"
      :data="store.data?.info"
      :activeFilterIndex="store.activeFilterIndex"
    />
    <TodoList @todoChanged="handleEvent" :data="store.data ? store.data?.data : []" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { getAllTodos } from './api';

import AddTodoForm from './components/AddTodoForm.vue';
import TodoList from './components/TodoList.vue';
import TodoListFilters from './components/TodoListFilters.vue';
import type { IData } from './types/types';

onMounted(async () => {
  store.data = await getAllTodos('all');
});

const handleEvent = async (index: number = 0, status: 'all' | 'inWork' | 'completed' = 'all') => {
  store.data = await getAllTodos(status);
  store.activeFilterIndex = index;
};

const store: IData = reactive({
  data: null,
  activeFilterIndex: 0,
});
</script>

<style scoped lang="scss">
.wrapper {
  margin-top: 50px;
}
</style>
