<template>
  <div class="overlay" v-if="isVisible">
    <div class="overlay-content">
      <h2>Create Room</h2>
      <!-- Room creation form or content goes here -->
      <button @click="emit('close-room')">Close</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  isVisible: Boolean
});
console.log(props);

const emit = defineEmits(['close-room']);
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
}
</style>
