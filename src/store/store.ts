import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';

import { accessToken, getUserProfile, refreshAccessToken, signInAccount, signUpAccount } from '@/api/auth';
import router, { routeNames } from '@/router/router';
import type { AuthData, UserData, UserRegistration } from '@/types/auth';

export const useAuthStore = defineStore('auth', () => {
  const isAuth = ref(false);
  const userData: UserData = reactive({
    user: null,
  });

  const createAccount = async (registrationData: UserRegistration) => {
    const response = await signUpAccount(registrationData);
    return response;
  };

  const loginAccount = async (authData: AuthData) => {
    try {
      const response = await signInAccount(authData);
      localStorage.setItem('refreshToken', response.refreshToken);
      accessToken.value = response.accessToken;
      isAuth.value = true;
      alert('Вы успешно авторизовались');
    } catch (error) {
      alert(error);
    }
  };

  const checkAuth = async () => {
    try {
      const response = await refreshAccessToken();
      localStorage.setItem('refreshToken', response.refreshToken);
      accessToken.value = response.accessToken;
    } catch (error) {
      localStorage.removeItem('refreshToken');
      accessToken.value = '';
      router.push({ name: routeNames.signin });
      console.log(error);
    }
  };

  const logoutAccount = () => {
    localStorage.removeItem('refreshToken');
    accessToken.value = '';
    router.push({ name: routeNames.signin });
  };

  const getProfile = async () => {
    try {
      userData.user = await getUserProfile();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isAuth,
    userData,
    loginAccount,
    createAccount,
    checkAuth,
    getProfile,
    logoutAccount,
  };
});
