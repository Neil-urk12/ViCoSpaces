<script setup>
import CanvasWhiteBoard from '/src/components/CanvasWhiteBoard.vue';
import { ref, onMounted } from 'vue';
import { ref as dbRef, get } from 'firebase/database';
import { realTimeDb as database } from '@/firebase/firebaseconfig';
import { useRoute } from 'vue-router';

const route = useRoute();
// const props = defineProps({
//   roomId: String, 
//   roomName: String, 
// });
const roomId = ref(route.params.id);
const roomName = ref(route.query.name);

onMounted(async () => {
  const roomRef = dbRef(database, `rooms/${roomId.value}`);
  const roomSnapshot = await get(roomRef);

  if (roomSnapshot.exists()) {
    const roomData = roomSnapshot.val();
    roomName.value = roomData.name; 
  } else console.error('Room not found');
});
</script>

<template>
  <div class="room">
    <h1>Room Name : {{ roomName }}</h1>
    <h2>Room Id : {{ roomId }}</h2>
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
h2{
  text-align: right;
}
</style>