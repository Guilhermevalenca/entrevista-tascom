<script setup lang="ts">
import BasicInfo from '@/components/profile-partials/BasicInfo.vue';
import UpdatePassword from '@/components/profile-partials/UpdatePassword.vue';
import DeleteAccount from '@/components/profile-partials/DeleteAccount.vue';
import ProfilePictureUpdate from '@/components/profile-partials/ProfilePictureUpdate.vue';
</script>

<template>
  <div class="container">
    <h1>Profile</h1>

    <ProfilePictureUpdate />

    <BasicInfo />

    <UpdatePassword />

    <DeleteAccount />
  </div>
</template>

<style scoped></style>
