<template>
  <button @click="handleClick">
    {{ label }}
  </button>
</template>
  
<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  label: {
    type: String,
    default: 'Click Me'
  }
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<style scoped>
button {
  padding: 10px 20px;
  background-color: #42b983;
  border: none;
  color: white;
  cursor: pointer;
}
</style>