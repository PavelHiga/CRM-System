<template>
  <v-card class="mx-auto pa-5 border-sm" rounded="lg" variant="text">
    <v-card-title class="d-flex align-center pe-2">
      <p>Пользователи</p>

      <v-spacer></v-spacer>

      <div class="d-flex w-50 justify-end ga-5">
        <v-text-field
          max-width="50%"
          v-model="search"
          variant="outlined"
          hide-details
          single-line
          density="compact"
          label="Поиск по имени или email"
          :prepend-inner-icon="IconMagnifyingGlass"
        >
        </v-text-field>

        <v-menu location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              density="default"
              variant="outlined"
              class="mr-2 font-weight-bold"
              :prepend-icon="IconFilter"
              v-bind="props"
            >
              Фильтр
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in filters"
              :key="index"
              :value="item.value"
              :title="item.title"
              @click="changeFilterHandler(item)"
              :active="store.activeFilter.title === item.title ? true : false"
            />
          </v-list>
        </v-menu>
      </div>
    </v-card-title>

    <v-data-table-server
      :headers="headers"
      v-model:page="store.tablePage"
      :items="store.allUsersData.data?.data ? store.allUsersData.data?.data : []"
      item-value="name"
      items-per-page="20"
      :search="search"
      :items-length="store.allUsersData.data?.meta?.totalAmount || 0"
      @update:options="getUsers"
      :loading="store.allUsersData.isLoading"
    >
      <template v-slot:[`item.email`]="{ value }">
        <p class="font-weight-bold text-decoration-underline">{{ value }}</p>
      </template>

      <template v-slot:[`item.phoneNumber`]="{ value }">
        {{ value ? value : "Нет" }}
      </template>

      <template v-slot:[`item.isAdmin`]="{ value }">
        <v-chip v-if="value" color="red"> admin </v-chip>
        <v-chip v-else color="gray"> user </v-chip>
      </template>

      <template v-slot:[`item.isBlocked`]="{ value }">
        <v-chip v-if="value" color="red"> Заблокирован </v-chip>
        <v-chip v-else color="gray"> Не заблокирован </v-chip>
      </template>

      <template v-slot:[`item.date`]="{ value }">
        <p>{{ date.format(value, "keyboardDate") }}</p>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <div class="d-flex ga-5 justify-end">
          <v-dialog max-width="200">
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn v-bind="activatorProps" variant="outlined">
                {{ item.isBlocked ? "Разбл" : "Блок" }}
              </v-btn>
            </template>

            <template v-slot:default="{ isActive }">
              <v-card text="Вы уверены?" class="text-center">
                <template v-slot:actions>
                  <v-btn
                    class="ml-auto"
                    text="Да"
                    @click="
                      handleBlockItemClick(item);
                      isActive.value = false;
                    "
                  ></v-btn>
                  <v-btn class="mr-auto" text="Нет" @click="isActive.value = false"></v-btn>
                </template>
              </v-card>
            </template>
          </v-dialog>

          <v-btn
            @click="router.push({ path: `/users/${item.id}` })"
            class="px-0"
            variant="outlined"
          >
            <IconArrow />
          </v-btn>
          <v-menu location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" class="px-0" variant="outlined">
                <IconDots />
              </v-btn>
            </template>
            <v-list>
              <v-dialog max-width="200">
                <template v-slot:activator="{ props: activatorProps }">
                  <v-list-item
                    v-bind="activatorProps"
                    :title="item.isAdmin ? 'Забрать админку' : 'Дать админку'"
                  />
                </template>

                <template v-slot:default="{ isActive }">
                  <v-card text="Вы уверены?" class="text-center">
                    <template v-slot:actions>
                      <v-btn
                        class="ml-auto"
                        text="Да"
                        @click="
                          handleChangeRightsClick(item);
                          isActive.value = false;
                        "
                      ></v-btn>
                      <v-btn class="mr-auto" text="Нет" @click="isActive.value = false"></v-btn>
                    </template>
                  </v-card>
                </template>
              </v-dialog>
              <v-dialog max-width="200">
                <template v-slot:activator="{ props: activatorProps }">
                  <v-list-item v-bind="activatorProps" title="Удалить" />
                </template>

                <template v-slot:default="{ isActive }">
                  <v-card text="Вы уверены?" class="text-center">
                    <template v-slot:actions>
                      <v-btn
                        class="ml-auto"
                        text="Да"
                        @click="
                          handleDeleteItemClick(item.id);
                          isActive.value = false;
                        "
                      ></v-btn>
                      <v-btn class="mr-auto" text="Нет" @click="isActive.value = false"></v-btn>
                    </template>
                  </v-card>
                </template>
              </v-dialog>
            </v-list>
          </v-menu>
        </div>
      </template>

      <template v-slot:bottom>
        <div v-show="isPaginationActive" class="text-center pt-2">
          <v-pagination v-model="store.tablePage" :length="pageCount"></v-pagination>
        </div>
      </template>
    </v-data-table-server>
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import router from "@/router/router";
import { useDate } from "vuetify";
import IconFilter from "@/components/icons/IconFilter.vue";
import IconMagnifyingGlass from "@/components/icons/IconMagnifyingGlass.vue";
import IconArrow from "@/components/icons/IconArrow.vue";
import IconDots from "@/components/icons/IconDots.vue";

import { useAdminStore } from "@/store/admin";
import type { User } from "@/types/admin";

onMounted(async () => {
  await getUsers();
});

const date = useDate();
const store = useAdminStore();
const { getUsers, deleteUser, blockUser, unblockUser, updateUserRights } = store;

const search = ref("");

const filters = reactive([
  { title: "Все пользователи" },
  { title: "Заблокированные пользователи", value: true },
  { title: "Активные пользователи", value: false },
]);

const headers: any = ref([
  { key: "username", title: "Имя" },
  { title: "Email", key: "email" },
  { title: "Телефон", key: "phoneNumber", sortable: false, align: "center" },
  { title: "Роли", key: "isAdmin", sortable: false, align: "center" },
  {
    title: "Статус блокировки",
    key: "isBlocked",
    sortable: false,
    align: "center",
  },
  { title: "Дата регистрации", key: "date", sortable: false, align: "center" },
  { title: "", key: "actions", sortable: false },
]);

const pageCount = computed(() => {
  return store.allUsersData?.data?.meta.totalAmount && store.allUsersData.data.data
    ? Math.ceil(store.allUsersData.data?.meta.totalAmount / 20)
    : 1;
});

const isPaginationActive = computed(() => {
  if (search.value || store.activeFilter.value !== undefined) {
    return store.allUsersData?.data?.data && store.allUsersData?.data?.data.length > 19;
  }

  return store.allUsersData?.data?.data && pageCount.value > 1;
});

const changeFilterHandler = async (filter: { title: string; value?: boolean }) => {
  store.activeFilter = filter;
  await getUsers();
  store.tablePage = 1;
};

const handleDeleteItemClick = async (id: number) => {
  await deleteUser(String(id));
  await getUsers();
};

const handleChangeRightsClick = async (user: User) => {
  await updateUserRights(String(user.id), { field: "isAdmin", value: !user.isAdmin });
  await getUsers();
};

const handleBlockItemClick = async (user: User) => {
  if (user.isBlocked) {
    await unblockUser(String(user.id));
  } else {
    await blockUser(String(user.id));
  }

  await getUsers();
};
</script>
