import { accessToken } from '@/api/auth';
import { createRouter, createWebHistory } from 'vue-router';

export const routeNames = {
  todos: 'todos',
  profile: 'profile',
  auth: 'auth',
  signin: 'signin',
  signup: 'signup',
  reset: 'reset',
};

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    redirect: () => {
      return { name: routeNames.todos };
    },
    meta: { auth: true },
    children: [
      {
        path: 'todos',
        name: routeNames.todos,
        component: () => import('@/pages/TodoPage.vue'),
        meta: { auth: true, pageTitle: 'Список задач' },
      },
      {
        path: 'profile',
        name: routeNames.profile,
        component: () => import('@/pages/ProfilePage.vue'),
        meta: { auth: true, pageTitle: 'Профиль' },
      },
    ],
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/layouts/AuthLayout.vue'),
    redirect: () => {
      return { name: routeNames.signin };
    },
    children: [
      {
        path: 'signin',
        name: routeNames.signin,
        component: () => import('@/components/AuthLoginForm.vue'),
        meta: { auth: false },
      },
      {
        path: 'signup',
        name: routeNames.signup,
        component: () => import('@/components/AuthRegisterForm.vue'),
        meta: { auth: false },
      },
      {
        path: 'reset',
        name: routeNames.reset,
        component: () => import('@/components/AuthResetPasswordForm.vue'),
        meta: { auth: false },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'bg-grey-lighten-3 black',
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !accessToken.value) {
    next({ name: routeNames.signin });
  } else if (!to.meta.auth && accessToken.value) {
    next({ path: '/' });
  } else {
    next();
  }
});

export default router;