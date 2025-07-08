<script setup lang="ts">
import useUserStore from '@/stores/useUserStore.ts';
import { ref } from 'vue';
import type { IUser } from '@/interfaces/IUser.ts';
import IsEditButtons from '@/components/profile-partials/IsEditButtons.vue';
import swalPlugin from '@/plugin/swalPlugin.ts';
import userService from '@/services/userService.ts';
import authService from '@/services/authService.ts';

const userStore = useUserStore();
const user = ref<IUser>({
  name: userStore.user.name,
  email: userStore.user.email,
});
const isEditingBasicInfo = ref<boolean>(false);

async function submit() {
  swalPlugin.fire({
    icon: 'info',
    text: 'Updating informations...',
    allowEscapeKey: false,
    allowOutsideClick: false,
    timer: 0,
  });
  swalPlugin.showLoading();
  try {
    await userService.basicUpdate(user.value);

    try {
      await authService.refreshToken();
      await userService.profile();

      await swalPlugin.fire({
        icon: 'success',
        title: 'Information updated successfully!',
        timer: 3000,
        showConfirmButton: true,
        confirmButtonText: 'Ok',
      });
    } catch (error) {
      await swalPlugin.fire({
        icon: 'error',
        title: 'Your information has been updated, but an error occurred while updating your credentials!',
        text: 'Please log in again.',
        timer: 3000,
        showConfirmButton: true,
        confirmButtonText: 'OK',
        showCloseButton: true,
      });
    }
    isEditingBasicInfo.value = false;
  } catch (error) {
    const response = await swalPlugin.fire({
      icon: 'error',
      title: 'An error occurred while updating information!',
      timer: 0,
      showConfirmButton: true,
      confirmButtonText: 'Try again',
      showCancelButton: true,
      showCloseButton: true,
    });
    if (response.isConfirmed) {
      submit();
    }
  }
}
</script>

<template>
  <div class="card p-3 mb-3">
    <form @submit.prevent="submit">
      <div class="mb-3">
        <label class="form-label">
          Name
          <input
            v-model="user.name"
            type="text" class="form-control"
            name="user.name"
            :disabled="!isEditingBasicInfo"
            :readonly="!isEditingBasicInfo"
          />
        </label>
      </div>
      <div class="mb-3">
        <label class="form-label">
          Email
          <input
            v-model="user.email"
            type="email" class="form-control"
            name="user.email"
            :disabled="!isEditingBasicInfo"
            :readonly="!isEditingBasicInfo"
          />
        </label>
      </div>
      <IsEditButtons v-model:isEditing="isEditingBasicInfo" />
    </form>
  </div>
</template>

<style scoped>

</style>
