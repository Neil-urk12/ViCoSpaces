<script setup>
import Whiteboard from '../components/CanvasWhiteBoard.vue'
</script>

<template>
  <div class="room">
    <h1>Room</h1>
  </div>
  <Whiteboard />
</template>

<style scoped>
.room {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  font-weight: bold;
}
</style>