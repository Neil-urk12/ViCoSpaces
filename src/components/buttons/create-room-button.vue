<template>
  <button @click="handleClick">{{ label }}</button>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: 'This is a Button',
  },
});
console.log(props);

function handleClick() {

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
