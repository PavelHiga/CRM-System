<template>
  <div class="heading_wrapper">
    <input v-model="inputValue" class="input" type="text" placeholder="Task To Be Done..." />
    <TheButton @click="createTodoClick" :variant="ButtonVariant.Create" />
  </div>
</template>

<script setup lang="ts">
import { ButtonVariant } from '@/types/buttonVariant';
import TheButton from './TheButton.vue';
import { ref } from 'vue';
import { createTodo } from '@/api';

const inputValue = ref('');

const createTodoClick = async () => {
  if (inputValue.value.length >= 2 && inputValue.value.length <= 64) {
    createTodo({
      title: inputValue.value,
      isDone: false,
    });
  } else {
    alert('Количество символов должно быть в пределах от 2 до 64.');
  }

  inputValue.value = '';
};
</script>

<style scoped lang="scss">
.heading_wrapper {
  display: flex;
  gap: 25px;

  .input {
    width: 100%;
    padding: 10px 7px;
    border-bottom: 2px solid #c2c5c7;
  }
}
</style>
