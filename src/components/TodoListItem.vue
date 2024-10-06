<template>
  <div class="task_wrapper">
    <template v-if="isEdit">
      <input v-model="editedTodo" class="task_input" type="text" />
    </template>
    <template v-else>
      <div @click="changeTodoStatusClick(data)" class="task_info">
        <div :class="isCheckBoxDone">
          <IconDone size="20px" />
        </div>
        <p :class="isTextDone">{{ data.title }}</p>
      </div>
    </template>
    <template v-if="isEdit">
      <div class="task_buttons">
        <TheButton @click="saveTodoClick" :variant="ButtonVariant.Save" />
        <TheButton @click="editTodoClick" :variant="ButtonVariant.Cancel" />
      </div>
    </template>
    <template v-else>
      <div class="task_buttons">
        <TheButton @click="editTodoClick" :variant="ButtonVariant.Edit" />
        <TheButton @click="deleteTodoClick(data.id)" :variant="ButtonVariant.Delete" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import IconDone from '@/components/icons/IconDone.vue';
import TheButton from './TheButton.vue';
import { ButtonVariant } from '@/types/buttonVariant';

import type { Todo } from '@/types/types';
import { changeTodoStatus, deleteTodo, editTodo } from '@/api';

const props = defineProps<{
  data: Todo;
}>();

const isEdit = ref(false);
const editedTodo = ref(props.data.title);

const isCheckBoxDone = computed(() => (props.data.isDone ? 'info_checkbox-done' : 'info_checkbox'));
const isTextDone = computed(() => (props.data.isDone ? 'info_text-done' : 'info_text'));

const changeTodoStatusClick = (data: Todo) => {
  changeTodoStatus(data);
};

const deleteTodoClick = (id: number) => {
  deleteTodo(id);
};

const editTodoClick = () => {
  isEdit.value = !isEdit.value;
};

const saveTodoClick = () => {
  if (editedTodo.value !== props.data.title) {
    editTodo({ ...props.data, title: editedTodo.value });
  }

  isEdit.value = !isEdit.value;
};
</script>

<style scoped lang="scss">
%checkbox {
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

%text {
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

    .info_checkbox {
      @extend %checkbox;

      &-done {
        @extend %checkbox;
        background-color: var(--blue-button);
      }
    }

    .info_text {
      @extend %text;

      &-done {
        @extend %text;
        color: #a5a7a8;
        text-decoration: line-through;
      }
    }
  }

  .task_buttons {
    display: flex;
    gap: 15px;
  }
}
</style>
