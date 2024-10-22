<script setup>                                                                                                 
import CanvasWhiteBoard from '/src/components/CanvasWhiteBoard.vue';                                           
import chatBoxFeature from '@/components/chat-box-feature.vue';                                                
import { ref, onMounted, onUnmounted, computed } from 'vue';                                                   
import { ref as dbRef, get, onValue, off } from 'firebase/database';                                           
import { realTimeDb as db } from '@/firebase/firebaseconfig';                                                  
import { useRoute, useRouter } from 'vue-router';                                                              
import { useAuthStore } from '@/stores/authStore';                                                             
import { useRoomStore } from '@/stores/roomStore';                                                             
                                                                                                               
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
  <button @click="leaveRoom">                                                                                  
    Leave Room                                                                                                 
  </button>                                                                                                    
  <button                                                                                                      
    v-if="isHost"                                                                                              
    @click="confirmDeleteRoom"                                                                                 
  >                                                                                                            
    Delete Room                                                                                                
  </button>                                                                                                    
  <p>Host: {{ host }}</p>                                                                                      
  <div class="room">                                                                                           
    <h1>Room Name : {{ roomName }}</h1>                                                                        
    <h2>Room Id : {{ roomId }}</h2>                                                                            
  </div>                                                                                                       
  <CanvasWhiteBoard />                                                                                         
  <chatBoxFeature :room-id="roomId" />                                                                          
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