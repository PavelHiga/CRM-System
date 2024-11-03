<template>
  <v-sheet class="mx-auto" width="500px">
    <v-form
      :readonly="isFormDisabled"
      ref="form"
      class="mt-6"
      validate-on="blur"
      @submit.prevent="changeProfileHandler"
    >
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
      <v-btn
        v-if="isFormDisabled"
        @click="isFormDisabled = false"
        class="mt-2 pa-2 text-black font-weight-bold"
        variant="outlined"
      >
        Сменить данные
      </v-btn>
      <div v-else class="d-flex flex-column ga-2">
        <v-btn class="mt-2 pa-2 text-black font-weight-bold" variant="outlined" type="submit">
          Сменить
        </v-btn>
        <v-btn @click="cancelEditHandler" class="mt-2 bg-black pa-2 font-weight-bold">
          Отмена
        </v-btn>
      </div>
    </v-form>
  </v-sheet>
</template>

<script setup lang="ts">
import { useAdminStore } from "@/store/admin";
import { emailRules, phoneNumberRules, usernameRules } from "@/utils/validateRules";
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const userId: any = route.params.id;

onMounted(async () => {
  await getUserProfile(userId);

  if (store.userProfile.data) {
    formData.username = store.userProfile.data.username;
    formData.email = store.userProfile.data.email;
    formData.phoneNumber = store.userProfile.data.phoneNumber;

    originalData.username = store.userProfile.data.username;
    originalData.email = store.userProfile.data.email;
    originalData.phoneNumber = store.userProfile.data.phoneNumber;
  }
});
const store = useAdminStore();
const { getUserProfile, updateUserProfile } = store;
const isFormDisabled = ref(true);

const form = ref<HTMLFormElement | null>(null);
const formData = reactive({
  username: "",
  email: "",
  phoneNumber: "",
});

const originalData = reactive({
  username: "",
  email: "",
  phoneNumber: "",
});

const changeProfileHandler = async () => {
  // валидация формы

  const isFormValid = ref<boolean | null>(null);

  if (form.value) {
    const formInfo = await form.value.validate();
    isFormValid.value = formInfo.valid;
  }

  // измененный поля

  let changedData = {};

  if (formData.username !== originalData.username) {
    changedData = { ...changedData, username: formData.username };
  }
  if (formData.email !== originalData.email) {
    changedData = { ...changedData, email: formData.email };
  }
  if (formData.phoneNumber !== originalData.phoneNumber) {
    changedData = { ...changedData, phoneNumber: formData.phoneNumber };
  }

  // изменение данных

  if (Object.keys(changedData).length > 0 && isFormValid.value) {
    const response = await updateUserProfile(userId, changedData);

    if (response?.id) {
      isFormDisabled.value = true;

      originalData.email = formData.email;
      originalData.username = formData.username;
      originalData.phoneNumber = formData.phoneNumber;
    }
  }
};

const cancelEditHandler = () => {
  isFormDisabled.value = true;

  formData.username = originalData.username;
  formData.email = originalData.email;
  formData.phoneNumber = originalData.phoneNumber;
};
</script>

<style scoped></style>
