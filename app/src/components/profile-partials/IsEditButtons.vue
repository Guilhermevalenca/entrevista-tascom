<script setup lang="ts">
const props = defineProps({
  isEditing: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(['update:isEditing']);
</script>

<template>
  <div class="d-flex gap-1">
    <button
      type="button" class="btn btn-info"
      @click="emit('update:isEditing', !props.isEditing)"
    >
      {{ props.isEditing ? 'Cancel' : 'Edit' }}
    </button>
    <button type="submit" class="btn btn-primary" v-if="props.isEditing">Save</button>
  </div>
</template>

<style scoped>

</style>
