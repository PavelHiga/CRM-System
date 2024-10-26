<template>
  <v-container class="pa-0" max-width="100%" height="100%">
    <v-row style="height: 100%" no-gutters>
      <TheSidebar />
      <v-col cols="10">
        <v-sheet>
          <div class="py-4 px-7 border-b-sm w-100 bg-grey-lighten-4 text-h5">{{ router.meta.pageTitle }}</div>
          <div class="pa-7">
            <RouterView />
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import TheSidebar from '@/components/TheSidebar.vue';
import { useRoute } from 'vue-router';

const router = useRoute();
</script>
