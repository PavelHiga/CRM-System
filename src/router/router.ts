import AuthView from '@/views/AuthView.vue';
import HomeView from '@/views/HomeView.vue';
import TodoView from '@/views/TodoView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: HomeView },
  { path: '/auth', component: AuthView },
  { path: '/todo', component: TodoView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
