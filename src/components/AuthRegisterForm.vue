<template>
  <v-sheet v-if="!isAccountCreated" width="420" class="container d-flex flex-column justify-center">
    <div>
      <div class="text-center">
        <h1 class="text-h4">Создать аккаунт</h1>
      </div>
      <v-form class="mt-6" validate-on="blur" ref="form" @submit.prevent="registerFormHandler">
        <div class="text-subtitle-1 text-medium-emphasis">Имя пользователя</div>
        <v-text-field
          v-model="formData.username"
          :rules="usernameRules"
          required
          placeholder="Иван"
          variant="outlined"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Логин</div>
        <v-text-field
          v-model="formData.login"
          :rules="loginRules"
          required
          placeholder="Ivan"
          variant="outlined"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Пароль</div>
        <v-text-field
          v-model="formData.password"
          :rules="passwordRules"
          type="password"
          required
          placeholder="******"
          variant="outlined"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Повторите пароль</div>
        <v-text-field
          v-model="secondPassword"
          :rules="secondPasswordRules"
          type="password"
          required
          placeholder="******"
          variant="outlined"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Почтовый адрес</div>
        <v-text-field
          v-model="formData.email"
          :rules="emailRules"
          required
          placeholder="ivan@mail.ru"
          variant="outlined"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Телефон</div>
        <v-text-field
          v-model="formData.phoneNumber"
          :rules="phoneNumberRules"
          placeholder="+7 (123)-456-789"
          variant="outlined"
        ></v-text-field>

        <v-btn class="mt-2 bg-pink-darken-4 px-0 py-2 font-weight-bold" type="submit" block>
          Зарегистрироваться
        </v-btn>
      </v-form>
      <p class="text-center mt-5">
        Есть аккаунт?
        <router-link
          :to="{ name: routeNames.signin }"
          class="text-pink-darken-4 cursor-pointer text-decoration-none"
        >
          Войти
        </router-link>
      </p>
    </div>
  </v-sheet>
  <v-sheet v-else width="420" class="container d-flex flex-column justify-center">
    <router-link
      :to="{ name: routeNames.signin }"
      class="text-pink-darken-4 cursor-pointer text-decoration-none"
      >Войти в систему</router-link
    >
  </v-sheet>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

import type { UserRegistration } from '@/types/auth';
import {
  emailRules,
  loginRules,
  passwordRules,
  phoneNumberRules,
  usernameRules,
} from '@/utils/validateRules';

import { useAuthStore } from '@/store/auth';
import { routeNames } from '@/router/router';

const isAccountCreated = ref(false);
const store = useAuthStore();
const { createAccount } = store;

const form = ref<HTMLFormElement | null>(null);
const formData = reactive<UserRegistration>({
  email: '',
  login: '',
  password: '',
  phoneNumber: '',
  username: '',
});

const secondPassword = ref('');

const secondPasswordRules = [
  (value: string) => {
    if (!value) return 'Поле не должно быть пустым';

    if (formData.password !== secondPassword.value) {
      return 'Пароли не совпадают';
    }

    return true;
  },
];

const registerFormHandler = async () => {
  const isFormValid = ref<boolean | null>(null);

  if (form.value) {
    const formInfo = await form.value.validate();
    isFormValid.value = formInfo.valid;
  }

  if (isFormValid.value) {
    try {
      await createAccount(formData);
      isAccountCreated.value = true;
      alert('Акканут успешно создан!');
    } catch (error) {
      alert(error);
    }
  }
};
</script>
