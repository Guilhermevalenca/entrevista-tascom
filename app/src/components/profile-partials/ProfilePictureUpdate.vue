<script setup lang="ts">
import useUserStore from '@/stores/useUserStore.ts';
import { ref } from 'vue';
import swalPlugin from '@/plugin/swalPlugin.ts';
import userService from '@/services/userService.ts';

const userStore = useUserStore();

const profilePicture = ref<string | File | undefined>(userStore.user.picture);

function saveProfilePicture(target: any) {
  console.log(target.files[0]);
  profilePicture.value = target.files[0];
}

async function submit() {
  if (!profilePicture.value) {
    swalPlugin.fire({
      icon: 'error',
      title: 'Please select a profile picture!',
      timer: 3000,
      showConfirmButton: true,
      confirmButtonText: 'Ok',
    });
    return;
  }
  swalPlugin.fire({
    icon: 'info',
    text: 'Updating profile picture...',
    allowEscapeKey: false,
    allowOutsideClick: false,
    timer: 0,
  });
  swalPlugin.showLoading();
  try {
    await userService.uploadPicture(profilePicture.value);
    await swalPlugin.fire({
      icon: 'success',
      title: 'Profile picture updated successfully!',
      timer: 3000,
      showConfirmButton: true,
      confirmButtonText: 'Ok',
    });
  } catch (error) {
    await swalPlugin.fire({
      icon: 'error',
      title: 'An error occurred while updating profile picture!',
      timer: 3000,
      showConfirmButton: true,
      confirmButtonText: 'Ok',
    });
  }
}
</script>

<template>
  <div class="card p-3 mb-3">
    <label class="d-grid mb-3">
      Current profile picture
      <img
        v-if="userStore.user.picture"
        :src="userStore.showPicture()"
        class="img-fluid" alt="Profile picture"
        width="300px"
      />
    </label>
    <form @submit.prevent="submit" enctype="multipart/form-data">
      <div class="mb-3">
        <label class="form-label">
          Update Profile picture
          <input
            type="file"
            accept="image/*"
            class="form-control"
            name="user.picture"
            @change="saveProfilePicture($event.target)"
          />
        </label>
      </div>
      <button type="submit" class="btn btn-primary" @click="submit">Submit</button>
    </form>
  </div>
</template>

<style scoped></style>
