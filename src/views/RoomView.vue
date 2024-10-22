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
        class="rect-button-leave-btn"
        @click="leaveRoom"
      >
        <font-awesome-icon :icon="['fas', 'door-open']" /> Leave Room
      </button>
      <button 
        v-if="isHost" 
        class="rect-button-delete-btn" 
        @click="confirmDeleteRoom"
      >
        <font-awesome-icon :icon="['fas', 'trash']" /> Delete Room
      </button>
    </div>

    <div class="center-room-name">
      <span class="room-name">{{ roomName }}</span>
    </div>

    <div class="top-right-info">
      <div class="room-id">
        <span class="info-label">Room ID:</span> {{ roomId }}
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
.room-header{
  display: flex;
  height: 75px;
  justify-content: space-between;
  align-content: center;
  margin: 0;
  padding: 0px 10px 0px 10px;

}
.top-left-buttons{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  
}
.top-left-buttons button{
  border: 2px solid #3498db; 
  border-radius: 8px;
  font-size: 16px; 
  color: #3498db; 
  background-color: transparent; 
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.rect-button-leave-btn:hover {
  background-color: rgba(52, 152, 219, 0.1); 
  color: #d01800; 
  border-color: #ce0000;
}
.rect-button-delete-btn:hover {
  background-color: rgba(52, 152, 219, 0.1); 
  color: #d01800; 
  border-color: #ce0000;
}

.center-room-name {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
  height: 90%;
  border: 2px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 20px;
  font-weight: bold;
  color: red;
}

.room-name{
  align-self: center;
}
.top-right-info{
  align-self: center;
  display: flex;
  flex-direction: column;
  height: 80%;
  justify-content: space-around;
  background-color: #fff;
  border: 2px solid #ccc;
  border-radius: 6px;
  padding: 3px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);  

}
.room-id, .host-name {
  color: #3498db;
  font-weight: bold;
}

.info-label {
  font-weight: normal;
  color: black;
}

/* Media Queries for Responsiveness */
@media (max-width: 959px) {
  
}
@media (max-width: 768px) {
  .room-header {
    flex-direction: column;
    align-items: center;
    height: auto;
    padding: 10px 15px;
  }

  .top-left-buttons {
    position: static; /* Reset position to flow naturally */
    margin-bottom: 10px;
    flex-direction: row; /* Change to row for better layout */
  }

  .rect-button {
    font-size: 14px;
    padding: 6px 12px;
  }

  .center-room-name {
    font-size: 16px;
    padding: 8px 12px;
    margin: 10px 0;
  }

  .top-right-info {
    position: static; /* Reset position for better responsiveness */
    margin-top: 10px;
    width: 80%;
    align-items: center;
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .room-header {
    padding: 10px;
  }

  .top-left-buttons {
    flex-direction: row;
    gap: 3px; /* Smaller gap for smaller screens */
  }

  .rect-button {
    font-size: 12px;
    padding: 4px 8px;
  }

  .center-room-name {
    font-size: 14px;
    padding: 6px 10px;
    margin: 5px 0;
  }

  .top-right-info {
    font-size: 14px;
    padding: 8px 10px;
  }

  .room-id, .host-name {
    font-size: 14px;
  }
}
</style>
