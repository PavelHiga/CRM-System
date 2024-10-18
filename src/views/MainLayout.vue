<template>
  <v-container class="pa-0" max-width="100%" height="100%">
    <v-row style="height: 100%" no-gutters>
      <v-col class="bg-grey-lighten-4 border-e-sm" cols="2">
        <div class="border-b-sm w-100 bg-grey-lighten-4">
          <img class="px-5 pt-5 pb-3" src="@/assets/logo.svg" alt="LogoIcon" />
        </div>
        <div class="pa-5">
          <nav class="d-flex flex-column ga-1 bg-grey-lighten-4 text-grey-darken-1">
            <router-link class="d-flex ga-2 align-center pa-2 rounded-sm" to="/todos">
              <IconTodos />
              Список задач
            </router-link>
            <router-link class="d-flex ga-2 align-center pa-2 rounded-sm" to="/profile">
              <IconProfile />
              <p>Личный кабинет</p>
            </router-link>
          </nav>
          <v-btn
            class="d-flex align-center mt-5 px-0 py-1 font-weight-bold"
            block
            variant="outlined"
            @click="logoutAccount"
          >
            Выйти
          </v-btn>
        </div>
      </v-col>
      <v-col cols="10">
        <v-sheet>
          <div class="py-4 px-7 border-b-sm w-100 bg-grey-lighten-4 text-h5">{{ router.name }}</div>
          <RouterView />
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/store';
import { useRoute } from 'vue-router';

import IconProfile from '@/components/icons/IconProfile.vue';
import IconTodos from '@/components/icons/IconTodos.vue';

const { logoutAccount } = useAuthStore();
const router = useRoute();
</script>

<style scoped></style>
