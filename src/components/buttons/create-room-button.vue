<template>
    <button @click="handleClick">{{ label }}</button>
  </template>
  
  <script >
  export default {
    name: 'ButtonComponent',
    props: {
      label: {
        type: String,
        default: 'Click Me'
      }
    },
    methods: {
      handleClick() {
        
      }
    }
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
  