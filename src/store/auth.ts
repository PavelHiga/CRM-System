import { defineStore } from "pinia";
import { ref } from "vue";

import { changeAccessToken, refreshAccessToken, signInAccount, signUpAccount } from "@/api/auth";
import router, { routeNames } from "@/router/router";
import type { AuthData, UserRegistration } from "@/types/auth";

export const useAuthStore = defineStore("auth", () => {
  const isAuth = ref(false);

  const createAccount = async (registrationData: UserRegistration) => {
    const response = await signUpAccount(registrationData);
    return response;
  };

  const loginAccount = async (authData: AuthData) => {
    try {
      const response = await signInAccount(authData);
      localStorage.setItem("refreshToken", response.refreshToken);
      changeAccessToken(response.accessToken);
      isAuth.value = true;
      alert("Вы успешно авторизовались");
    } catch (error) {
      alert(error);
    }
  };

  const checkAuth = async () => {
    try {
      const response = await refreshAccessToken();
      localStorage.setItem("refreshToken", response.refreshToken);
      changeAccessToken(response.accessToken);
    } catch (error) {
      console.log("не прошел");
      localStorage.removeItem("refreshToken");
      sessionStorage.removeItem("routeHistory");
      changeAccessToken("");
      router.push({ name: routeNames.signin });
      console.log(error);
    }
  };

  const logoutAccount = () => {
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("routeHistory");
    changeAccessToken("");
    router.push({ name: routeNames.signin });
  };

  return {
    isAuth,
    loginAccount,
    createAccount,
    checkAuth,
    logoutAccount,
  };
});
