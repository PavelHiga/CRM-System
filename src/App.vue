<template>
  <div class="wrapper">
    <TodoHeading />
    <TodoListFilters :data="store.data?.info" />
    <TodoList :data="store.data?.data" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { getAllTodos } from './api';

import TodoHeading from './components/TodoHeading.vue';
import TodoList from './components/TodoList.vue';
import TodoListFilters from './components/TodoListFilters.vue';
import { store } from './store/store';

onMounted(() => {
  getAllTodos('all');
});
</script>

<style scoped lang="scss">
.wrapper {
  margin-top: 50px;
}
</style>
