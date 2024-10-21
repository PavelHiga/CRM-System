<template>
  <div class="container">
    <AddTodoForm @todoCreated="UpdateTasks" />
    <TodoListFilters
      @filterChanged="(status) => UpdateTasks(status)"
      :data="store.data?.info"
      :activeFilterIndex="store.activeFilterIndex"
    />
    <TodoList @todoChanged="UpdateTasks" :data="store.data ? store.data?.data : []" />
  </div>
</template>

<script setup lang="ts">
import { getAllTodos } from '@/api/todos';
import AddTodoForm from '@/components/AddTodoForm.vue';
import TodoList from '@/components/TodoList.vue';
import TodoListFilters from '@/components/TodoListFilters.vue';
import type { IData } from '@/types/todos';
import { onMounted, reactive } from 'vue';

onMounted(async () => {
  store.data = await getAllTodos('all');
});

const UpdateTasks = async (status: 'all' | 'inWork' | 'completed' = 'all') => {
  store.data = await getAllTodos(status);
  store.activeFilterIndex = status;
};

const store: IData = reactive({
  data: null,
  activeFilterIndex: 'all',
});
</script>

<style scoped lang="scss">
.container {
  margin-top: 50px;
}
</style>
