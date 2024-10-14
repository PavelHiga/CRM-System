import { createRouter, createWebHistory } from 'vue-router';

import AuthLoginForm from '@/components/AuthLoginForm.vue';
import AuthRegisterForm from '@/components/AuthRegisterForm.vue';
import AuthResetPasswordForm from '@/components/AuthResetPasswordForm.vue';
import AuthView from '@/views/AuthView.vue';
import TodoView from '@/views/TodoView.vue';

const routes = [
  {
    path: '/',
    component: TodoView,
    meta: { auth: true },
  },
  {
    path: '/auth',
    component: AuthView,
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
