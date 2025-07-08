<script setup lang="ts">
import { ref } from 'vue';
import IsEditButtons from '@/components/profile-partials/IsEditButtons.vue';
import swalPlugin from '@/plugin/swalPlugin.ts';
import userService from '@/services/userService.ts';

const newPassword = ref({
  currentPassword: '',
  newPassword: '',
  newPasswordConfirmation: '',
})
const isEditingPassword = ref<boolean>(false);

async function submit() {
  swalPlugin.fire({
    icon: 'info',
    text: 'Updating information...',
    allowEscapeKey: false,
    allowOutsideClick: false,
    timer: 0,
  });
  swalPlugin.showLoading();
  try {
    await userService.passwordUpdate(newPassword.value);
    swalPlugin.fire({
      icon: 'success',
      title: 'Information updated successfully!',
      timer: 3000,
      showConfirmButton: true,
      confirmButtonText: 'Ok',
    });
    isEditingPassword.value = false;
    newPassword.value = {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirmation: '',
    };
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
          Current password
          <input
            v-model="newPassword.currentPassword"
            type="password" class="form-control"
            name="newPassword.currentPassword"
            :disabled="!isEditingPassword"
            :readonly="!isEditingPassword"
          />
        </label>
      </div>
      <div class="mb-3">
        <label class="form-label">
          New password
          <input
            v-model="newPassword.newPassword"
            type="password" class="form-control"
            name="newPassword.newPassword"
            :disabled="!isEditingPassword"
            :readonly="!isEditingPassword"
          />
        </label>
      </div>
      <div class="mb-3">
        <label class="form-label">
          New password confirmation
          <input
            v-model="newPassword.newPasswordConfirmation"
            type="password" class="form-control"
            name="newPassword.newPasswordConfirmation"
            :disabled="!isEditingPassword"
            :readonly="!isEditingPassword"
          />
        </label>
      </div>
      <IsEditButtons v-model:isEditing="isEditingPassword" />
    </form>
  </div>
</template>

<style scoped>

</style>
