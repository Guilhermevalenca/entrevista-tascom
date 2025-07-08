import { createRouter, createWebHistory } from 'vue-router';
import { loggedGuard, notLoggedGuard } from '@/router/guards/auth.ts';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      beforeEnter: loggedGuard,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('@/views/ProfileView.vue'),
        },
        {
          path: 'tasks/create',
          name: 'task-create',
          component: () => import('@/views/tasks/CreateTaskView.vue'),
        },
        {
          path: 'tasks/:id/edit',
          name: 'task-edit',
          component: () => import('@/views/tasks/EditTaskView.vue'),
          props: true,
        },
      ],
    },
    {
      path: '/account',
      name: 'account',
      beforeEnter: notLoggedGuard,
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/auth/LoginView.vue'),
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/views/auth/RegisterView.vue'),
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },
  ],
});

export default router;
