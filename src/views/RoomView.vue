<script setup>
import CanvasWhiteBoard from '/src/components/CanvasWhiteBoard.vue';
import ChatBox from '/src/components/chat-box-feature.vue';
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { ref as dbRef, get, onValue, off } from 'firebase/database';
import { realTimeDb as db } from '@/firebase/firebaseconfig';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { useRoomStore } from '@/stores/roomStore';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faDoorOpen, faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faDoorOpen, faTrash);

const route = useRoute()
const router = useRouter()
const roomStore = useRoomStore()
const authStore = useAuthStore()

const room = ref(null)
const roomListener = ref(null)
const host = ref(null)
const isHost = computed(() => {
  return room.value && room.value.host.id === authStore.user.uid
})

onMounted(async () => {
  const roomId = route.params.id
  roomListener.value = onValue(dbRef(db, `rooms/${roomId}`), (snapshot) => {
    if (snapshot.exists()) {
      room.value = { id: roomId, ...snapshot.val() }
      host.value = room.value.host.name
      console.log(host);
      
    } else {
      console.error('Room not found')
      router.push('/home')
    }
  })
})

onUnmounted(() => {
  if (roomListener.value) {
    off(dbRef(db, `rooms/${route.params.id}`), 'value', roomListener.value)
  }
  leaveRoom()
})

const leaveRoom = async () => {
  try {
    await roomStore.leaveRoom(route.params.id, authStore.user.uid)
    router.push('/home')
  } catch (error) {
    console.error('Error leaving room:', error)
  }
}

const confirmDeleteRoom = () => {
  if (room.value.currentUsers > 1) {
    if (confirm('There are other users in the room. Are you sure you want to delete it?')) {
      deleteRoom()
    }
  } else {
    deleteRoom()
  }
}

const deleteRoom = async () => {
  try {
    await roomStore.deleteRoom(route.params.id)
    router.push('/home')
  } catch (error) {
    console.error('Error deleting room:', error)
  }
}

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

<template>
  <div class="room-header">
    <div class="top-left-buttons">
      <button
        class="rect-button leave-btn"
        @click="leaveRoom"
      >
        <font-awesome-icon :icon="['fas', 'door-open']" /> Leave Room
      </button>
      <button 
        v-if="isHost" 
        class="rect-button delete-btn" 
        @click="confirmDeleteRoom"
      >
        <font-awesome-icon :icon="['fas', 'trash']" /> Delete Room
      </button>
    </div>

    <div class="center-room-name">
      Room Name: <span class="room-name">{{ roomName }}</span>
    </div>

    <div class="top-right-info">
      <div class="room-id">
        <span class="info-label">Room Id:</span> {{ roomId }}
      </div>
      <div class="host-name">
        <span class="info-label">Host:</span> {{ host }}
      </div>
    </div>
  </div>
  <CanvasWhiteBoard />
  <ChatBox />
</template>

<style scoped>
.room-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background-color: #f8f9fa;
  border-bottom: 2px solid #ccc;
  position: relative;
  height: 75px; 
}

.top-left-buttons {
  display: flex;
  flex-direction: column;
  gap: 5px; 
  position: absolute;
  top: 15px;
  left: 20px; 
}

.rect-button {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 15px;
  border: 2px solid #3498db; 
  border-radius: 8px;
  font-size: 16px; 
  color: #3498db; 
  background-color: transparent; 
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.leave-btn {
  border-color: #3498db; 
  color: #3498db;
}

.delete-btn {
  border-color: #2980b9; 
  color: #2980b9;
}

.rect-button:hover {
  background-color: rgba(52, 152, 219, 0.1); 
  color: #21618c; 
  border-color: #21618c;
}

.center-room-name {
  font-size: 28px; 
  font-weight: bold;
  color: #34495e;
  text-align: center;
  flex-grow: 1;
}

.room-name {
  color: #e74c3c;
}

.top-right-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 18px;
  padding: 10px 15px;
  border: 2px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.room-id, .host-name {
  margin: 3px 0;
  color: red;
  font-weight: bold;
}

.info-label {
  font-weight: normal;
  color: black;
}
</style>
