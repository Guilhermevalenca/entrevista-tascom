<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import type { ITask } from '@/interfaces/ITask.ts';
import taskService from '@/services/taskService.ts';
import swalPlugin from '@/plugin/swalPlugin.ts';

const { id } = useRoute().params;
const router = useRouter();
const task = ref<ITask>({
  title: '',
  description: '',
});
async function submit() {
  try {
    swalPlugin.fire({
      icon: 'info',
      text: 'Updating task...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 0,
    });
    swalPlugin.showLoading();
    const response = await taskService.update(String(id), task.value);
    if (response.success) {
      router.push({ name: 'home' });
    } else {
      console.log(response);
    }
    await swalPlugin.fire({
      icon: 'success',
      title: 'Task updated successfully!',
      timer: 3000,
      showConfirmButton: true,
      confirmButtonText: 'OK',
      showCloseButton: true,
    });
    // router.push({ name: 'home' });
  } catch (error) {
    swalPlugin.fire({
      icon: 'error',
      title: 'An error occurred while updating task!',
      timer: 0,
      showConfirmButton: true,
      confirmButtonText: 'OK',
      showCloseButton: true,
    });
  }
}
async function getTask() {
  swalPlugin.fire({
    icon: 'info',
    text: 'Searching for task...',
    allowEscapeKey: false,
    allowOutsideClick: false,
    timer: 0,
  });
  swalPlugin.showLoading();
  swalPlugin.close();
  const { data } = await taskService.show(String(id));
  task.value = data;
}
onMounted(async () => {
  getTask();
});
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
      <div class="mb-3">
        <label class="form-label">
          Status
          <select v-model="task.status" class="form-select" name="task.status">
            <option value="completed">Completed</option>
            <option value="pending">pending</option>
          </select>
        </label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<style scoped></style>
