import { defineStore } from 'pinia';
import { reactive, ref, watchEffect } from 'vue';

import { getUserProfile, refreshAccessToken, signInAccount, signUpAccount, updateUserProfile } from '@/api';
import router from '@/router/router';
import type { AuthData, ProfileRequest, UserData, UserRegistration } from '@/types/authTypes';

export const useAuthStore = defineStore('auth', () => {
  const isAuth = ref(false);
  const isAccountCreated = ref(false);
  const userData: UserData = reactive({
    user: null,
  });

  async function createAccount(registrationData: UserRegistration) {
    try {
      const response = await signUpAccount(registrationData);
      isAccountCreated.value = true;
      alert('Акканут успешно создан!');
    } catch (error) {
      alert(error);
    }
  }

  async function loginAccount(authData: AuthData) {
    try {
      const response = await signInAccount(authData);
      localStorage.setItem(
        'userTokens',
        JSON.stringify({
          token: response.accessToken,
          refreshToken: response.refreshToken,
        })
      );
      isAuth.value = true;
      alert('Вы успешно авторизовались');
    } catch (error) {
      alert(error);
    }
  }

  async function checkAuth() {
    try {
      const response = await refreshAccessToken();
      localStorage.setItem(
        'userTokens',
        JSON.stringify({
          token: response.accessToken,
          refreshToken: response.refreshToken,
        })
      );
      isAuth.value = true;
      return response.accessToken;
    } catch (error) {
      localStorage.removeItem('userTokens');
      router.push('/auth/signin');
      console.log(error);
    }
  }

  function logoutAccount() {
    localStorage.removeItem('userTokens');
    router.push('/auth/signin');
  }

  async function getUser() {
    try {
      userData.user = await getUserProfile();
    } catch (error) {
      console.log(error);
    }
  }

  return {
    isAuth,
    isAccountCreated,
    userData,
    loginAccount,
    createAccount,
    checkAuth,
    getUser,
    logoutAccount,
  };
});