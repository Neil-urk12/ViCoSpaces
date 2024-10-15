<script setup>
const Whiteboard =  () => import('@/components/whiteboard.vue')
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