<script setup lang="ts">
import type { ITask } from '@/interfaces/ITask.ts';
import { ref } from 'vue';
import swalPlugin from '@/plugin/swalPlugin.ts';
import taskService from '@/services/taskService.ts';
import { useRouter } from 'vue-router';

const router = useRouter();
const task = ref<ITask>({
  title: '',
  description: '',
});

async function submit() {
  swalPlugin.fire({
    icon: 'info',
    text: 'Creating task...',
    allowEscapeKey: false,
    allowOutsideClick: false,
    timer: 0,
  });
  swalPlugin.showLoading();
  try {
    await taskService.register(task.value);
    swalPlugin.close();
    router.push({ name: 'home' });
  } catch (error) {
    swalPlugin.fire({
      icon: 'error',
      title: 'An error occurred while creating task!',
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
          Title
          <input v-model="task.title" type="text" class="form-control" name="task.title" />
        </label>
      </div>
      <div class="mb-3">
        <label class="form-label">
          Description
          <textarea v-model="task.description" class="form-control" name="task.description" />
        </label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<style scoped></style>
