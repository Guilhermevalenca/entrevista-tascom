import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { IUser } from '@/interfaces/IUser.ts';

export default defineStore('user', () => {
  const user = ref<IUser>({
    name: '',
    email: '',
  });

  function setUser(data: IUser) {
    user.value = data;
  }

  function resetData() {
    user.value = {
      name: '',
      email: '',
    };
  }

  function showPicture(): string {
    if (user.value.picture) {
      const url = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
      return url + '/' + String(user.value.picture);
    }
    return '';
  }

  return {
    user: computed(() => ({ ...user.value })),
    setUser,
    resetData,
    showPicture,
  };
});
