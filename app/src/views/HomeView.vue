<script setup lang="ts">
import taskService from '@/services/taskService.ts';
import { onMounted, ref, watch } from 'vue';
import type { IFilterTask } from '@/interfaces/IFilterTask.ts';
import swalPlugin from '@/plugin/swalPlugin.ts';
import type { ITask } from '@/interfaces/ITask.ts';
import TaskCard from '@/components/task/TaskCard.vue';
import AppPagination from '@/components/AppPagination.vue';

const tasks = ref<ITask[]>([]);
const page = ref<number>(1);
const lastPage = ref<number>(1);
const filter = ref<IFilterTask>({
  byStatus: undefined,
  byDate: {
    start: undefined,
    end: undefined,
  },
  orderDate: 'desc',
});
const search = ref<string>('');

let debounce: number | null = null;

onMounted(async () => {
  getTasks();
});

watch(page, async () => {
  getTasks();
});

watch(
  filter,
  async () => {
    page.value = 1;
    getTasks();
  },
  {
    deep: true,
  },
);

watch(search, () => {
  if (debounce) {
    clearTimeout(debounce);
  }
  debounce = setTimeout(() => {
    getTasks();
  }, 700);
});

async function getTasks() {
  tasks.value = [];
  swalPlugin.fire({
    icon: 'info',
    text: 'Searching for tasks...',
    allowEscapeKey: false,
    allowOutsideClick: false,
    timer: 0,
  });
  swalPlugin.showLoading();
  try {
    const data = await taskService.index(page.value, search.value, filter.value);
    tasks.value = data.tasks;
    lastPage.value = data.total;

    swalPlugin.close();
  } catch (error) {
    const response = await swalPlugin.fire({
      icon: 'error',
      title: 'An error occurred while fetching tasks!',
      timer: 0,
      showConfirmButton: true,
      confirmButtonText: 'Try again',
      showCancelButton: true,
      showCloseButton: true,
    });
    if (response.isConfirmed) {
      getTasks();
    }
  }
}

function getDate(value?: string) {
  const date = new Date(String(value));

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // meses começam do 0
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function addByDate(name: 'start' | 'end', target: any) {
  if(target.value) {
    filter.value.byDate![name] = target.value;
  } else {
    filter.value.byDate![name] = undefined;
  }
}
</script>

<template>
  <div class="container">
    <div class="mb-3 d-flex">
      <h1>Todo list</h1>
      <div class="ms-auto">
        <RouterLink class="btn btn-primary mt-3" :to="{ name: 'task-create' }"
          >Criar tarefa</RouterLink
        >
      </div>
    </div>
    <div class="mb-4 d-flex justify-content-center">
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Search for..." v-model="search" />
      </div>
    </div>
    <div class="mb-4 d-flex justify-content-center">
      <div class="input-group">
        <label class="form-label">
          Status
          <select class="form-select" v-model="filter.byStatus">
            <option :value="undefined">all</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </label>
      </div>
      <div class="input-group">
        <label class="form-label">
          Date
          <select class="form-select" v-model="filter.orderDate">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
      <div class="input-group">
        <label class="form-label">
          From
          <input
            type="date"
            class="form-control"
            @change="(event) => addByDate('start', event.target)"
          />
        </label>
      </div>
      <div class="input-group">
        <label class="form-label">
          To
          <input
            type="date"
            class="form-control"
            @change="(event) => addByDate('end', event.target)"
          />
        </label>
      </div>
    </div>
    <div class="row gap-5 justify-content-center">
      <TaskCard
        v-for="task in tasks"
        :key="`task-${task.id}`"
        :task="task"
        @deleteTask="getTasks"
        class="shadow shadow-2xl"
      />
    </div>
    <div class="d-flex justify-content-center mt-5">
      <AppPagination v-model:page="page" :last-page="lastPage" />
    </div>
  </div>
</template>
