<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import type { IUser } from '@/interfaces/IUser.ts';
import swalPlugin from '@/plugin/swalPlugin.ts';
import userService from '@/services/userService.ts';

const router = useRouter();

const user = ref<IUser>({
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
});

async function submit() {
  try {
    swalPlugin.fire({
      icon: 'info',
      text: 'Registering...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 0,
    });
    swalPlugin.showLoading();
    await userService.register(user.value);
    await swalPlugin.fire({
      icon: 'success',
      title: 'Registration completed successfully!',
      timer: 3000,
      showConfirmButton: true,
      confirmButtonText: 'OK',
      showCloseButton: true,
    });
    router.push({ name: 'login' });
  } catch (error) {
    swalPlugin.fire({
      icon: 'error',
      title: 'An error occurred while registering!',
      timer: 3000,
      showConfirmButton: true,
      confirmButtonText: 'OK',
      showCloseButton: true,
    });
  }
}
</script>

<template>
  <div class="container">
    <form @submit.prevent="submit">
      <div class="mb-3">
        <label class="form-label">
          Name
          <input v-model="user.name" type="text" class="form-control" name="user.name" />
        </label>
      </div>
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
      <div class="mb-3">
        <label class="form-label">
          Password confirmation
          <input
            v-model="user.passwordConfirmation"
            type="password"
            class="form-control"
            name="user.passwordConfirmation"
          />
        </label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<style scoped></style>
