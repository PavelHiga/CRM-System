<template>
  <div class="wrapper">
    <input v-model="todoTitle" class="input" type="text" placeholder="Task To Be Done..." />
    <TheButton @click="createTodoHandler" variant="accent"> Add </TheButton>
  </div>
</template>

<script setup lang="ts">
import { createTodo } from '@/api/todos';
import TheButton from './TheButton.vue';
import { ref } from 'vue';

const todoTitle = ref('');
const emit = defineEmits(['todoCreated']);

const createTodoHandler = async () => {
  if (todoTitle.value.length >= 2 && todoTitle.value.length <= 64) {
    await createTodo({
      title: todoTitle.value,
      isDone: false,
    });

    emit('todoCreated');
    todoTitle.value = '';
  } else {
    alert('Количество символов должно быть в пределах от 2 до 64.');
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  gap: 25px;
  .input {
    width: 100%;
    padding: 10px 7px;
    border-bottom: 2px solid #c2c5c7;
  }
}
</style>
