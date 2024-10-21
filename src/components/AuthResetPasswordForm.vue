<script setup lang="ts">
import { routeNames } from '@/router/router';
</script>

<template>
  <v-sheet width="420" class="container d-flex flex-column justify-center">
    <h1 class="text-h4 text-center">Восстановление</h1>
    <v-form class="mt-5" disabled fast-fail @submit.prevent>
      <div class="text-subtitle-1 text-medium-emphasis">Почта</div>
      <v-text-field placeholder="ivan@mail.ru" variant="outlined"></v-text-field>

      <v-btn class="mt-2 bg-pink-darken-4 px-0 py-2 font-weight-bold" disabled type="submit" block>
        Восстановить
      </v-btn>
    </v-form>
    <router-link
      :to="{ name: routeNames.signin }"
      class="mt-5 cursor-pointer text-center text-pink-darken-4 text-decoration-none"
    >
      Отменить восстановление
    </router-link>
  </v-sheet>
</template>
