<script setup lang="ts">
import { type PropType, ref } from 'vue';
import type { ITask } from '@/interfaces/ITask.ts';
import taskService from '@/services/taskService.ts';

const props = defineProps({
  task: {
    type: Object as PropType<ITask>,
    required: true,
  },
});
const emit = defineEmits(['deleteTask']);

const loading = ref<boolean>(false);

async function changeStatus() {
  loading.value = true;
  await taskService.changeStatus(props.task);
  loading.value = false;
}

async function deleteTask() {
  loading.value = true;
  await taskService.delete(String(props.task.id));
  emit('deleteTask');
  loading.value = false;
}
</script>

<template>
  <div class="card" style="width: 20rem">
    <div class="card-body">
      <div class="card-title d-flex justify-content-between">
        <div>
          <h5>{{ props.task.title }}</h5>
          <p class="text-body-tertiary d-grid gap-0.5" style="font-size: 0.7rem">
            <span v-if="props.task.createdAt">
              <strong>Created at:</strong> {{ props.task.createdAt.toLocaleString() }}
            </span>
            <span v-if="props.task.updatedAt">
              <strong>Updated at:</strong> {{ props.task.updatedAt.toLocaleString() }}
            </span>
          </p>
        </div>
        <form @submit.prevent="deleteTask">
          <button class="btn btn-danger btn-sm" type="submit" :disabled="loading">
            <i class="bi bi-trash" v-if="!loading"></i>
            <span v-else>
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Loading...</span>
            </span>
          </button>
        </form>
      </div>
      <p class="card-text">{{ props.task.description }}</p>
      <p class="text-body-tertiary">
        <strong>status: </strong>
        <span
          class="badge bg-info"
          :class="{
            'bg-success': props.task.status === 'completed',
            'bg-warning': props.task.status === 'pending',
          }"
          >{{ props.task.status }}</span
        >
      </p>
      <div class="d-flex justify-content-between">
        <RouterLink
          class="btn btn-primary"
          :to="{
            name: 'task-edit',
            params: { id: props.task.id },
          }"
          :class="{ disabled: loading }"
          >Edit task</RouterLink
        >
        <form @submit.prevent="changeStatus">
          <button class="btn btn-info" type="submit" :disabled="loading">
            <span v-if="!loading">change status</span>
            <span v-else>
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Loading...</span>
            </span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
