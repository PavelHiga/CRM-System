<template>
  <v-sheet width="420" class="container d-flex flex-column justify-center">
    <div class="text-center">
      <h1 class="text-h4">Войти в аккаунт</h1>
      <p class="text-subtitle-1 mt-1">Узнайте, что происходит с вашим бизнесом</p>
    </div>
    <v-form class="mt-9" fast-fail ref="form" @submit.prevent="loginFormHandler">
      <div class="text-subtitle-1 text-medium-emphasis">Логин</div>
      <v-text-field
        v-model="formData.login"
        :rules="loginRules"
        placeholder="Ivan"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">Пароль</div>
      <v-text-field
        v-model="formData.password"
        :rules="passwordRules"
        placeholder="******"
        type="password"
        variant="outlined"
      ></v-text-field>

      <div class="d-flex align-center">
        <v-checkbox-btn
          base-color="pink-darken-4"
          color="pink-darken-4"
          label="Запомнить меня"
        ></v-checkbox-btn>
        <router-link
          to="/auth/reset"
          class="text-subtitle-1 text-pink-darken-4 cursor-pointer text-decoration-none"
        >
          Забыли пароль?
        </router-link>
      </div>
      <v-btn class="mt-6 bg-pink-darken-4 px-0 py-2 font-weight-bold" type="submit" block>Войти</v-btn>
    </v-form>
    <p class="text-center mt-5">
      Нет аккаунта?
      <router-link to="/auth/signup" class="text-pink-darken-4 cursor-pointer text-decoration-none"
        >Регистрация</router-link
      >
    </p>
  </v-sheet>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import router from '@/router/router';
import { useAuthStore } from '@/store/store';
import type { AuthData } from '@/types/authTypes';
import { loginRules, passwordRules } from '@/utils/validateRules';

const store = useAuthStore();
const { loginAccount } = store;

const form = ref<HTMLFormElement | null>(null);
const formData = reactive<AuthData>({
  login: '',
  password: '',
});

const loginFormHandler = async () => {
  const isFormValid = ref<boolean | null>(null);

  if (form.value) {
    const formInfo = await form.value.validate();
    isFormValid.value = formInfo.valid;
  }

  if (isFormValid.value) {
    await loginAccount(formData);
    store.isAuth && router.push('/');
  }
};
</script>

<style scoped>
.container {
  margin-bottom: 100px;
}
</style>
