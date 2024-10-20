<template>
  <div class="wrapper">
    <AddTodoForm @todoCreated="updateTasks" />
    <TodoListFilters
      @filterChanged="updateTasks"
      :data="store.data?.info"
      :activeFilter="store.activeFilter"
    />
    <TodoList @todoChanged="updateTasks" :data="store.data ? store.data?.data : []" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { getAllTodos } from './api';

import AddTodoForm from './components/AddTodoForm.vue';
import TodoList from './components/TodoList.vue';
import TodoListFilters from './components/TodoListFilters.vue';
import type { activeFilterStatus, IData } from './types/types';

onMounted(async () => {
  store.data = await getAllTodos('all');
});

const updateTasks = async (status: activeFilterStatus = 'all') => {
  store.data = await getAllTodos(status);
  store.activeFilter = status;
};

const store: IData = reactive({
  data: null,
  activeFilter: 'all',
});
</script>

<style scoped lang="scss">
.wrapper {
  margin-top: 50px;
}
</style>
