<template>
  <div class="room-container">
    <header class="room-header">
      <div class="room-info">
        <h1>{{ roomName }}</h1>
        <p class="host-info">
          Host: <b>{{ host }}</b>
        </p>
        <p class="host-info">
          Room Id: <b>{{ roomId }}</b>
        </p>
      </div>
      <div class="room-actions">
        <button
          class="btn"
          @click="leaveRoom"
        >
          Leave Room
        </button>
        <button
          v-if="isHost"
          class="btn btn-danger"
          @click="confirmDeleteRoom"
        >
          Delete Room
        </button>
      </div>
    </header>
    
    <div class="workspace">
      <CanvasWhiteBoard />
      <chatBoxFeature :room-id="roomId" />
    </div>
  </div>
</template>

<script setup>
import CanvasWhiteBoard from '/src/components/CanvasWhiteBoard.vue';
import chatBoxFeature from '@/components/chat-box-feature.vue';
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { ref as dbRef, get, onValue, off } from 'firebase/database';
import { realTimeDb as db } from '@/firebase/firebaseconfig';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { useRoomStore } from '@/stores/roomStore';

const route = useRoute();
const router = useRouter();
const roomStore = useRoomStore();
const authStore = useAuthStore();

const room = ref(null);
const roomListener = ref(null);
const host = ref(null);
const isHost = computed(() => {
  return room.value && room.value.host.id === authStore.user.uid;
});

onMounted(async () => {
  const roomId = route.params.id;
  roomListener.value = onValue(dbRef(db, `rooms/${roomId}`), (snapshot) => {
    if (snapshot.exists()) {
      room.value = { id: roomId, ...snapshot.val() };
      host.value = room.value.host.name;
    } else {
      console.error('Room not found');
      router.push('/home');
    }
  });
});

onUnmounted(() => {
  if (roomListener.value) {
    off(dbRef(db, `rooms/${route.params.id}`), 'value', roomListener.value);
  }
  leaveRoom();
});

const leaveRoom = async () => {
  try {
    await roomStore.leaveRoom(route.params.id, authStore.user.uid);
    router.push('/home');
  } catch (error) {
    console.error('Error leaving room:', error);
  }
};

const confirmDeleteRoom = () => {
  if (room.value.currentUsers > 1) {
    if (confirm('There are other users in the room. Are you sure you want to delete it?')) {
      deleteRoom();
    }
  } else {
    deleteRoom();
  }
};

const deleteRoom = async () => {
  try {
    await roomStore.deleteRoom(route.params.id);
    router.push('/home');
  } catch (error) {
    console.error('Error deleting room:', error);
  }
};

const roomId = ref(route.params.id);
const roomName = ref(route.query.name);

onMounted(async () => {
  const roomRef = dbRef(db, `rooms/${roomId.value}`);
  const roomSnapshot = await get(roomRef);

  if (roomSnapshot.exists()) {
    const roomData = roomSnapshot.val();
    roomName.value = roomData.name;
  } else console.error('Room not found');
});
</script>

<style scoped>
.room-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, #0B0B2A, #1a1a3a);
}
.room-header {
  background: rgba(13, 13, 48, 0.95);
  padding: 1rem 2rem;
  border-bottom: 1px solid #2d2d6e;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 15px rgba(82, 82, 255, 0.15);
  backdrop-filter: blur(10px);
}
.room-info h1 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  text-shadow: 0 0 10px rgba(82, 82, 255, 0.5);
  margin: 0;
}
.host-info {
  color: #8f8fff;
  font-size: 0.875rem;
  margin: 0.25rem 0 0;
}
.room-actions {
  display: flex;
  gap: 1rem;
}
.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid #2d2d6e;
  background: linear-gradient(145deg, #1a1a4a, #0d0d2a);
  color: #fff;
  text-shadow: 0 0 5px rgba(82, 82, 255, 0.5);
  box-shadow: 0 0 10px rgba(82, 82, 255, 0.2);
}
.btn:hover {
  background: linear-gradient(145deg, #2d2d6e, #1a1a4a);
  transform: translateY(-2px);
  box-shadow: 0 0 15px rgba(82, 82, 255, 0.4);
}
.btn-danger {
  background: linear-gradient(145deg, #6e2d2d, #4a1a1a);
  border: 1px solid #6e2d2d;
}
.btn-danger:hover {
  background: linear-gradient(145deg, #8f3d3d, #6e2d2d);
}
.workspace {
  flex: 1;
  display: flex;
  position: relative;
  overflow: hidden;
}
@media (max-width: 768px) {
  .room-header {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  .room-actions {
    width: 100%;
    justify-content: center;
  }
}
</style>