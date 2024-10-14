<template>
  <v-layout class="d-flex">
    <img class="image" src="@/assets/images/auth.png" />
    <RouterView />
  </v-layout>
</template>

<script setup lang="ts"></script>

<style scoped>
.image {
  height: 100vh;
  max-width: 1100px;
  width: 100%;
}
</style>
