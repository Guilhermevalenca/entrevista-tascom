<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router';
import useUserStore from '@/stores/useUserStore.ts';
import authService from '@/services/authService.ts';

import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const userStore = useUserStore();
const router = useRouter();

async function logout() {
  await authService.logout();
  router.push({ name: 'login' });
}
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <RouterLink class="navbar-brand" to="/">Todo list</RouterLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <RouterLink class="nav-link active" aria-current="page" to="/">Home</RouterLink>
            <RouterLink class="nav-link" to="/about">About</RouterLink>
          </div>
          <div class="navbar-nav ms-auto" v-if="!userStore.user.id">
            <RouterLink class="nav-link" :to="{ name: 'login' }">Login</RouterLink>
            <RouterLink class="nav-link" :to="{ name: 'register' }">Register</RouterLink>
          </div>
          <div class="navbar-nav ms-auto" v-else>
            <RouterLink class="nav-link" :to="{ name: 'profile' }">Profile</RouterLink>
            <button class="nav-link" @click="logout">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>
