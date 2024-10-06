<template>
  <div v-if="variant === 'create'">
    <button class="create">Add</button>
  </div>
  <div v-else-if="variant === 'edit'">
    <button class="edit"><IconEdit /></button>
  </div>
  <div v-else-if="variant === 'delete'">
    <button class="delete"><IconDelete /></button>
  </div>
  <div v-else-if="variant === 'save'">
    <button class="save"><IconDone size="30px" /></button>
  </div>
  <div v-else-if="variant === 'cancel'">
    <button class="cancel"><IconCancel /></button>
  </div>
</template>

<script setup lang="ts">
import type { ButtonVariant } from '@/types/buttonVariant';
import IconDelete from './icons/IconDelete.vue';
import IconEdit from './icons/IconEdit.vue';
import IconCancel from './icons/IconCancel.vue';
import IconDone from './icons/IconDone.vue';

const props = defineProps<{
  variant: ButtonVariant;
}>();
</script>

<style scoped lang="scss">
button {
  display: flex;
  align-items: center;
  justify-content: center;
}

.create,
.edit {
  background-color: var(--blue-button);
}

.edit,
.delete,
.save,
.cancel {
  padding: 10px;
}

.create {
  padding: 10px 50px;
}

.delete {
  background-color: var(--red-button);
}

.save {
  background-color: #1ca425;
}

.cancel {
  background-color: var(--red-button);
}
</style>
