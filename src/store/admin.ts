import { defineStore } from "pinia";
import { reactive, ref } from "vue";

import type { User, MetaResponse, UserUpdate, UserRightsUpdate } from "@/types/admin";
import {
  blockUserFetch,
  deleteOneUser,
  getUsersFetch,
  getOneUser,
  unblockUserFetch,
  updateUser,
  updateUserRightsFetch,
} from "@/api/admin";

interface UsersData {
  data: MetaResponse<User> | null;
  isLoading: boolean;
}

interface UserProfileData {
  data: User | null;
}

interface TableFilters {
  page?: number;
  search?: string;
  sortBy?: [
    {
      key: string;
      order: string;
    }
  ];
  isBlocked?: boolean;
}

export const useAdminStore = defineStore("admin", () => {
  const allUsersData: UsersData = reactive({
    data: null,
    isLoading: false,
  });

  const userProfile: UserProfileData = reactive({
    data: null,
  });

  const tablePage = ref(1);
  const activeFilter = ref<{ title: string; value?: boolean }>({
    title: "Все пользователи",
  });

  const getUsers = async (filters?: TableFilters) => {
    const offset = filters && filters?.page ? filters?.page - 1 : 0;

    const sortBy = filters && filters?.sortBy ? filters?.sortBy[0]?.key : "";

    const sortOrder: any = filters && filters?.sortBy ? filters?.sortBy[0]?.order : "";

    allUsersData.isLoading = true;

    try {
      const response = await getUsersFetch({
        offset: offset,
        limit: 20,
        search: filters?.search ? filters?.search : "",
        sortBy: sortBy,
        sortOrder: sortOrder,
        isBlocked: activeFilter.value.value,
      });
      allUsersData.data = response;
    } catch (error) {
      alert(error);
    } finally {
      allUsersData.isLoading = false;
    }
  };

  const getUserProfile = async (id: string) => {
    try {
      const response = await getOneUser(id);
      userProfile.data = response;
    } catch (error) {
      alert(error);
    }
  };

  const updateUserProfile = async (id: string, userProfileData: UserUpdate) => {
    try {
      const response = await updateUser(id, userProfileData);
      userProfile.data = response;
      return response;
    } catch (error) {
      alert(error);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await deleteOneUser(id);
      tablePage.value = 1;
    } catch (error) {
      alert(error);
    }
  };

  const blockUser = async (id: string) => {
    try {
      await blockUserFetch(id);
      tablePage.value = 1;
    } catch (error) {
      alert(error);
    }
  };

  const unblockUser = async (id: string) => {
    try {
      await unblockUserFetch(id);
      tablePage.value = 1;
    } catch (error) {
      alert(error);
    }
  };

  const updateUserRights = async (id: string, data: UserRightsUpdate) => {
    try {
      await updateUserRightsFetch(id, data);
      tablePage.value = 1;
    } catch (error) {
      alert(error);
    }
  };

  return {
    getUsers,
    getUserProfile,
    updateUserProfile,
    deleteUser,
    blockUser,
    unblockUser,
    updateUserRights,
    activeFilter,
    tablePage,
    userProfile,
    allUsersData,
  };
});
