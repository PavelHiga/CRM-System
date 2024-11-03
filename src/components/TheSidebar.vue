<template>
  <v-col class="bg-grey-lighten-4 border-e-sm" cols="2">
    <div class="border-b-sm w-100 bg-grey-lighten-4">
      <img class="px-5 pt-5 pb-3" src="@/assets/logo.svg" alt="LogoIcon" />
    </div>
    <div class="pa-5">
      <nav class="d-flex flex-column ga-1 bg-grey-lighten-4 text-grey-darken-1">
        <router-link
          :to="{ name: routeNames.todos }"
          class="d-flex ga-2 align-center pa-2 rounded-sm"
        >
          <IconTodos />
          Список задач
        </router-link>
        <router-link
          :to="{ name: routeNames.profile }"
          class="d-flex ga-2 align-center pa-2 rounded-sm"
        >
          <IconProfile />
          <p>Личный кабинет</p>
        </router-link>
        <router-link
          :to="{ name: routeNames.users }"
          class="d-flex ga-2 align-center pa-2 rounded-sm"
        >
          <IconUsers />
          <p>Пользователи</p>
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
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/auth";

import IconProfile from "@/components/icons/IconProfile.vue";
import IconTodos from "@/components/icons/IconTodos.vue";
import IconUsers from "./icons/IconUsers.vue";

import { routeNames } from "@/router/router";

const { logoutAccount } = useAuthStore();
</script>
