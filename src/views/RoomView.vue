<script setup>
import CanvasWhiteBoard from '@/components/CanvasWhiteBoard.vue';
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
        font-size: 10px;
        font-weight: bold;
    }
</style>