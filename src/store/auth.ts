import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';

import {
  changeAccessToken,
  getUserProfile,
  refreshAccessToken,
  signInAccount,
  signUpAccount,
} from '@/api/auth';
import router, { routeNames } from '@/router/router';
import type { AuthData, ProfileData, UserRegistration } from '@/types/auth';

export const useAuthStore = defineStore('auth', () => {
  const isAuth = ref(false);
  const profileData: ProfileData = reactive({
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
      changeAccessToken(response.accessToken);
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
      changeAccessToken(response.accessToken);
    } catch (error) {
      localStorage.removeItem('refreshToken');
      changeAccessToken('');
      router.push({ name: routeNames.signin });
      console.log(error);
    }
  };

  const logoutAccount = () => {
    localStorage.removeItem('refreshToken');
    changeAccessToken('');
    router.push({ name: routeNames.signin });
  };

  const getProfile = async () => {
    try {
      profileData.user = await getUserProfile();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isAuth,
    profileData,
    loginAccount,
    createAccount,
    checkAuth,
    getProfile,
    logoutAccount,
  };
});