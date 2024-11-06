<template>
  <v-sheet class="mx-auto" width="500px">
    <v-form :readonly="isFormDisabled" ref="form" class="mt-6" validate-on="blur">
      <div activeClass="border-indigo-500" class="text-subtitle-1 text-medium-emphasis">
        Имя пользователя
      </div>
      <v-text-field
        v-model="formData.username"
        :rules="usernameRules"
        required
        placeholder="Иван"
        variant="outlined"
      ></v-text-field>

      <div activeClass="border-indigo-500" class="text-subtitle-1 text-medium-emphasis">
        Почтовый адрес
      </div>
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
      <div class="d-flex flex-column ga-2">
        <v-btn
          disabled
          class="mt-2 pa-2 text-black font-weight-bold"
          variant="outlined"
          type="submit"
        >
          Сменить данные
        </v-btn>
      </div>
    </v-form>
  </v-sheet>
</template>

<script setup lang="ts">
import { useSessionStore } from "@/store/session";
import { emailRules, phoneNumberRules, usernameRules } from "@/utils/validateRules";
import { reactive, ref } from "vue";

const store = useSessionStore();
const isFormDisabled = ref(true);

const formData = reactive({
  username: "",
  email: "",
  phoneNumber: "",
});

if (store.profileData.user) {
  formData.username = store.profileData.user.username;
  formData.email = store.profileData.user.email;
  formData.phoneNumber = store.profileData.user.phoneNumber;
}
</script>
