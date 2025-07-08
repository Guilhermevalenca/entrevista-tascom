<script setup lang="ts">
import { ref } from 'vue';
import authService from '@/services/authService.ts';
import type { IUser } from '@/interfaces/IUser.ts';
import { useRouter } from 'vue-router';
import swalPlugin from '@/plugin/swalPlugin.ts';
import userService from '@/services/userService.ts';

const router = useRouter();

const user = ref<Partial<IUser>>({
  email: '',
  password: '',
});

async function submit() {
  swalPlugin.fire({
    icon: 'info',
    text: 'Logging in...',
    allowEscapeKey: false,
    allowOutsideClick: false,
    timer: 0,
  });
  swalPlugin.showLoading();
  try {
    const response = await authService.login(user.value);
    swalPlugin.close();

    if (response.success) {
      const updateDataUser = async (countAttemptLimit: number = 0): Promise<void> => {
        swalPlugin.fire({
          icon: 'success',
          title: 'Login successful!',
          text: 'Updating information...',
          timer: 0,
          showConfirmButton: true,
          confirmButtonText: 'Ok',
        });
        swalPlugin.showLoading();
        try {
          await userService.profile();
          await swalPlugin.fire({
            icon: 'success',
            title: 'Information updated successfully!',
            timer: 3000,
            showConfirmButton: true,
            confirmButtonText: 'Ok',
          });
          router.push({ name: 'home' });
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
          if (response.isConfirmed && countAttemptLimit < 2) {
            countAttemptLimit++;
            return updateDataUser(countAttemptLimit + 1);
          }
        }
      };
      await updateDataUser();
    } else {
      swalPlugin.fire({
        icon: 'error',
        text: 'Invalid email or password!',
        timer: 3000,
        showConfirmButton: true,
        confirmButtonText: 'Try again',
      });
    }
  } catch (error) {
    swalPlugin.fire({
      icon: 'error',
      text: 'An error occurred while logging in!',
      timer: 3000,
      showConfirmButton: true,
      confirmButtonText: 'Try again',
    });
  }
}
</script>

<template>
  <div class="container">
    <form @submit.prevent="submit">
      <div class="mb-3">
        <label class="form-label">
          Email address
          <input v-model="user.email" type="email" class="form-control" name="user.email" />
        </label>
      </div>
      <div class="mb-3">
        <label class="form-label">
          Password
          <input
            v-model="user.password"
            type="password"
            class="form-control"
            name="user.password"
          />
        </label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<style scoped></style>
