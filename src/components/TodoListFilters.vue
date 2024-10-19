<template>
  <div class="filters_wrapper">
    <p
      v-for="(el, index) in filterArr"
      :key="index"
      @click="changeFilterHandler(el.status)"
      :class="activeFilter == el.status ? 'filterActive' : 'filter'"
    >
      {{ el.title }} ({{ el.count }})
    </p>
  </div>
</template>

<script setup lang="ts">
import type { TodoInfo } from '@/types/types';
import { ref, watchEffect } from 'vue';

const props = defineProps<{
  data: TodoInfo | undefined;
  activeFilter: 'all' | 'inWork' | 'completed';
}>();

const emit = defineEmits(['filterChanged']);

const changeFilterHandler = (status: 'all' | 'inWork' | 'completed') => {
  emit('filterChanged', status);
};

const filterArr = ref<{ title: string; status: 'all' | 'inWork' | 'completed'; count: number | undefined }[]>(
  []
);

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
  }

  .filterActive {
    color: rgb(8, 174, 251);
    font-weight: 600;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
