<script setup lang="ts">
const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
  lastPage: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(['update:page']);
</script>

<template>
  <nav>
    <ul class="pagination">
      <li class="page-item">
        <button
          class="page-link"
          @click="emit('update:page', props.page - 1)"
          :class="{
            disabled: props.page === 1,
          }"
        >
          Previous
        </button>
      </li>
      <li v-for="n in lastPage" :key="`page-${n}`" class="page-item">
        <button
          class="page-link"
          @click="emit('update:page', n)"
          :class="{
            active: n === props.page,
          }"
        >
          {{ n }}
        </button>
      </li>
      <li class="page-item">
        <button
          class="page-link"
          @click="emit('update:page', props.page + 1)"
          :class="{
            disabled: props.page === lastPage,
          }"
        >
          Next
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped></style>
