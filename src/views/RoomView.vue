<script setup>
import CanvasWhiteBoard from '/src/components/CanvasWhiteBoard.vue';
</script>

<template>
  <div class="room">
    <h1>Room</h1>
  </div>
  <CanvasWhiteBoard />
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
