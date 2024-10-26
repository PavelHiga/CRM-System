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
          v-on:click:prepend-inner="console.log('Поиск')"
        >
        </v-text-field>

        <v-btn density="default" variant="outlined" class="mr-2 font-weight-bold" :prepend-icon="IconFilter"
          >Фильтр</v-btn
        >
      </div>
    </v-card-title>

    <v-data-table
      :headers="headers"
      v-model:page="page"
      :items="store.allUsersData.data?.data"
      item-value="name"
      :items-per-page="itemsPerPage"
      :search="search"
      show-select
      select-strategy="single"
      v-model="selected"
      return-object
    >
      <template v-slot:[item.email]="{ value }">
        <p class="font-weight-bold text-decoration-underline">{{ value }}</p>
      </template>

      <template v-slot:[item.phoneNumber]="{ value }">
        {{ value ? value : 'Не указан' }}
      </template>

      <template v-slot:[item.isAdmin]="{ value }">
        <v-chip v-if="value" color="red"> admin </v-chip>
        <v-chip v-else color="gray"> user </v-chip>
      </template>

      <template v-slot:[item.isBlocked]="{ value }">
        <v-chip v-if="value" color="red"> Заблокирован </v-chip>
        <v-chip v-else color="gray"> Не заблокирован </v-chip>
      </template>

      <template v-slot:[item.date]="{ value }">
        <p>{{ date.format(value, 'keyboardDate') }}</p>
      </template>

      <template v-slot:[item.actions]="{ value }">
        <div class="d-flex ga-5 justify-end">
          <v-btn variant="outlined">{{ value ? 'Разбл' : 'Блок' }}</v-btn>
          <v-btn class="px-0" variant="outlined">
            <IconArrow />
          </v-btn>
          <v-btn class="px-0" variant="outlined">
            <IconDots />
          </v-btn>
        </div>
      </template>

      <template v-slot:bottom>
        <div v-show="store.pageCount > 1" class="text-center pt-2">
          <v-pagination v-model="page" :length="store.pageCount"></v-pagination>
        </div>
      </template>
    </v-data-table>

    {{ selected }}
  </v-card>
</template>

<script setup lang="ts">
import IconArrow from '@/components/icons/IconArrow.vue';
import IconDots from '@/components/icons/IconDots.vue';
import IconFilter from '@/components/icons/IconFilter.vue';
import IconMagnifyingGlass from '@/components/icons/IconMagnifyingGlass.vue';
import { useAdminStore } from '@/store/admin';
import { computed, onMounted, ref, watch } from 'vue';

import { useDate } from 'vuetify';

onMounted(async () => {
  await getUsers();
});

const store = useAdminStore();
const { getUsers } = store;

const date = useDate();

const search = ref('');
const page = ref(1);
console.log(page.value);

const itemsPerPage = 20;
const selected = ref([]);

const filters = computed(() => {
  return {
    search: search,

    limit: itemsPerPage,
    offset: page,
  };
});

watch(filters.value.offset, async () => {
  await getUsers(filters);
});

const headers = ref([
  { key: 'username', title: 'Имя' },
  { title: 'Email', key: 'email', align: 'center' },
  { title: 'Телефон', key: 'phoneNumber', sortable: false, align: 'center' },
  { title: 'Роли', key: 'isAdmin', sortable: false, align: 'center' },
  { title: 'Статус блокировки', key: 'isBlocked', sortable: false, align: 'center' },
  { title: 'Дата регистрации', key: 'date', sortable: false, align: 'center' },
  { title: '', key: 'actions', sortable: false, align: 'end' },
]);
</script>

<style></style>
