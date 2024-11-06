import { defineStore } from "pinia";
import { reactive } from "vue";

import { getUserProfile } from "@/api/auth";
import type { ProfileData } from "@/types/auth";

export const useSessionStore = defineStore("session", () => {
  const profileData: ProfileData = reactive({
    user: null,
  });

  const getProfile = async () => {
    try {
      profileData.user = await getUserProfile();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getProfile,
    profileData,
  };
});
