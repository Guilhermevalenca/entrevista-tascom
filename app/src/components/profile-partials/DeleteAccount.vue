<script setup lang="ts">
import { ref } from 'vue'
import swalPlugin from '@/plugin/swalPlugin.ts';
import userService from '@/services/userService.ts';
import authService from '@/services/authService.ts';
import { useRouter } from 'vue-router';

const confirmPasswordForDeleteAccount = ref<string>('');
const router = useRouter();

async function submit() {
  swalPlugin.fire({
    icon: 'info',
    text: 'Deleting account...',
    allowEscapeKey: false,
    allowOutsideClick: false,
    timer: 0,
  });
  swalPlugin.showLoading();
  try {
    await userService.delete(confirmPasswordForDeleteAccount.value);
    await authService.logout();
    swalPlugin.fire({
      icon: 'success',
      title: 'Account deleted successfully!',
      timer: 3000,
      showConfirmButton: true,
      confirmButtonText: 'Ok',
    });
    router.push({ name: 'login' });
  } catch (error) {
    await swalPlugin.fire({
      icon: 'error',
      title: 'An error occurred while deleting the account!',
      text: 'Please check your password and try again.',
      timer: 3000,
      showConfirmButton: true,
      confirmButtonText: 'Ok',
    });
  }
}
</script>

<template>
  <div class="card p-3 mb-3">
    <h2>Delete account</h2>
    <p>Once you delete your account, there is no going back. Please be certain.</p>
    <div>
      <button
        class="btn btn-danger" data-bs-toggle="modal"
        data-bs-target="#deleteAccountModal"
      >Delete account</button>
    </div>
    <div class="modal fade" id="deleteAccountModal" tabindex="-1" aria-labelledby="deleteAccountModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <form @submit.prevent="submit">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="deleteAccountModalLabel">Delete account</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Are you sure you want to delete your account?</p>
              <p>Enter your password to confirm.</p>
              <input type="password" v-model="confirmPasswordForDeleteAccount" class="form-control" />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" class="btn btn-danger" data-bs-dismiss="modal">Delete</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
