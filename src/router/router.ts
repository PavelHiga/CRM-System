import { createRouter, createWebHistory } from 'vue-router';

import AuthLoginForm from '@/components/AuthLoginForm.vue';
import AuthRegisterForm from '@/components/AuthRegisterForm.vue';
import AuthResetPasswordForm from '@/components/AuthResetPasswordForm.vue';
import AuthLayout from '@/views/AuthLayout.vue';
import TodoView from '@/views/TodoView.vue';
import MainLayout from '@/views/MainLayout.vue';
import ProfileView from '@/views/ProfileView.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    redirect: () => {
      return { path: '/todos' };
    },
    meta: { auth: true },
    children: [
      { path: 'todos', name: 'Список задач', component: TodoView, meta: { auth: true } },
      { path: 'profile', name: 'Профиль', component: ProfileView, meta: { auth: true } },
    ],
  },
  {
    path: '/auth',
    component: AuthLayout,
    redirect: () => {
      return { path: '/auth/signin' };
    },
    children: [
      { path: 'signin', component: AuthLoginForm, meta: { auth: false } },
      { path: 'signup', component: AuthRegisterForm, meta: { auth: false } },
      { path: 'reset', component: AuthResetPasswordForm, meta: { auth: false } },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'bg-grey-lighten-3 black',
});

router.beforeEach((to, from, next) => {
  const token = JSON.parse(localStorage.getItem('userTokens') || '{}').token;

  if (to.meta.auth && !token) {
    next({ path: '/auth/signin' });
  } else if (!to.meta.auth && token) {
    next({ path: '/' });
  } else {
    next();
  }
});

export default router;
