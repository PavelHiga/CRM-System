<template>
  <v-app>
    <RouterView />
  </v-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from './store/auth';
import router from './router/router';
import { accessToken } from './api/auth';

const store = useAuthStore();
const { checkAuth } = store;

onMounted(async () => {
  if (!accessToken) {
    await checkAuth();
    router.push('/');
  }
});
</script>
