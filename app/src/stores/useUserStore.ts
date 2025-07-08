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

  return {
    user: computed(() => ({ ...user.value })),
    setUser,
    resetData,
  };
});
