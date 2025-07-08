import type {
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteLocationNormalizedLoadedGeneric,
} from 'vue-router';
import userService from '@/services/userService.ts';
import useUserStore from '@/stores/useUserStore.ts';

export { loggedGuard, notLoggedGuard };

async function loggedGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalizedLoadedGeneric,
  next: NavigationGuardNext,
) {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      await userService.profile();
      next();
    } catch (error) {
      localStorage.removeItem('token');
      useUserStore().resetData();
      next({ name: 'login' });
    }
  } else {
    next({ name: 'login' });
  }
}

async function notLoggedGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalizedLoadedGeneric,
  next: NavigationGuardNext,
) {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      await userService.profile();
      next({ name: 'home' });
    } catch (error) {
      localStorage.removeItem('token');
      useUserStore().resetData();
      next();
    }
  } else {
    next();
  }
}
