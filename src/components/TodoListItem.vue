<template>
  <div class="task_wrapper">
    <template v-if="isEdit">
      <input v-model="editedTodo" class="task_input" type="text" />
    </template>
    <template v-else>
      <div @click="changeStatusHandler(data)" class="task_info">
        <div class="checkbox" :class="{ checkboxDone: data.isDone }">
          <IconDone size="20px" />
        </div>
        <p class="text" :class="{ textDone: data.isDone }">
          {{ data.title }}
        </p>
      </div>
    </template>
    <template v-if="isEdit">
      <div class="task_buttons">
        <TheButton @click="saveTodoHandler" variant="success">
          <IconDone size="30px" />
        </TheButton>
        <TheButton @click="editTodoHandler" variant="alert">
          <IconCancel />
        </TheButton>
      </div>
    </template>
    <template v-else>
      <div class="task_buttons">
        <TheButton @click="editTodoHandler" variant="primary">
          <IconEdit />
        </TheButton>
        <TheButton @click="deleteTodoHandler(data.id)" variant="alert">
          <IconDelete />
        </TheButton>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import IconDelete from './icons/IconDelete.vue';
import IconEdit from './icons/IconEdit.vue';
import IconCancel from './icons/IconCancel.vue';
import IconDone from './icons/IconDone.vue';
import TheButton from './TheButton.vue';

import type { Todo } from '@/types/types';
import { changeTodoStatus, deleteTodo, editTodo } from '@/api';

const props = defineProps<{
  data: Todo;
}>();

const isEdit = ref(false);
const editedTodo = ref(props.data.title);
const emit = defineEmits(['todoChanged']);

const editTodoHandler = () => {
  isEdit.value = !isEdit.value;
};

const changeStatusHandler = async (data: Todo) => {
  await changeTodoStatus(data);
  emit('todoChanged');
};

const deleteTodoHandler = async (id: number) => {
  await deleteTodo(id);
  emit('todoChanged');
};

const saveTodoHandler = async () => {
  if (editedTodo.value !== props.data.title) {
    await editTodo({ ...props.data, title: editedTodo.value });
    emit('todoChanged');
  }

  isEdit.value = !isEdit.value;
};
</script>

<style scoped lang="scss">
%info_checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 30px;
  height: 30px;
  border: 1px solid #c2c5c7;
  border-radius: 50%;
  color: #fff;
  width: 100%;
}

%info_text {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
}

.task_wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: #000;
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
  gap: 10px;

  .task_input {
    width: 70%;
    padding: 10px 7px;
    border-bottom: 2px solid #c2c5c7;
  }

  .task_info {
    display: flex;
    gap: 30px;
    align-items: center;
    width: 100%;
    cursor: pointer;

    word-break: keep-all;

    .checkbox {
      @extend %info_checkbox;
    }

    .checkboxDone {
      @extend %info_checkbox;
      background-color: var(--primary-color);
    }

    .text {
      @extend %info_text;
    }

    .textDone {
      @extend %info_text;
      color: #a5a7a8;
      text-decoration: line-through;
    }
  }

  .task_buttons {
    display: flex;
    gap: 15px;
  }
}
</style>
