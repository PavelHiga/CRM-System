<template>
  <div class="filters_wrapper">
    <template v-for="(el, index) in filterArr" :key="index">
      <p
        @click="filterClick(el.status, index)"
        :class="store.activeFilterIndex == index ? 'filter-active' : 'filter'"
      >
        {{ el.title }} ({{ el.count }})
      </p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { getAllTodos } from '@/api';
import { store } from '@/store/store';
import type { TodoInfo } from '@/types/types';
import { ref, watchEffect } from 'vue';

const props = defineProps<{
  data: TodoInfo | undefined;
}>();

const filterClick = (status: string, index: number) => {
  getAllTodos(status);
  store.activeFilterIndex = index;
};

// ?

const filterArr = ref<{ title: string; status: string; count: number | undefined }[]>([]);

watchEffect(() => {
  if (props.data) {
    filterArr.value = [
      { title: 'Все', status: 'all', count: props.data.all },
      { title: 'в работе', status: 'inWork', count: props.data.inWork },
      { title: 'сделано', status: 'completed', count: props.data.completed },
    ];
  }
});
</script>

<style scoped lang="scss">
.filters_wrapper {
  display: flex;
  justify-content: space-between;
  font-size: 25px;
  margin-top: 30px;

  .filter {
    cursor: pointer;
    font-weight: 500;

    &-active {
      color: rgb(8, 174, 251);
      font-weight: 600;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
