import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';

import router, { routeNames } from '@/router/router';
import type { UsersData, UserRequest } from '@/types/admin';
import { getAllUsers } from '@/api/admin';

export const useAdminStore = defineStore('admin', () => {
  const allUsersData: UsersData = reactive({
    data: null,
  });

  const pageCount = computed(() => {
    return allUsersData.data?.meta.totalAmount ? Math.ceil(allUsersData.data?.meta.totalAmount / 20) : 0;
  });

  const getUsers = async (filters?: UserRequest) => {
    try {
      const response = await getAllUsers(filters);
      allUsersData.data = response;
    } catch (error) {
      alert(error);
    }
  };

  return { getUsers, allUsersData, pageCount };
});
