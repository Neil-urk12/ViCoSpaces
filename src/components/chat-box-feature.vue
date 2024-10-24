<script setup lang="ts">                                                                                       
 import { ref, onMounted, onUnmounted, computed, watch } from 'vue';                                            
 import { useRouter } from 'vue-router';                                                                        
 import { useChatStore } from '@/stores/chatStore';                                                             
 import { useAuthStore } from '@/stores/authStore';                                                             
 import { useRoute } from 'vue-router';                                                                         
                                                                                                                
 const authStore = useAuthStore();                                                                              
 const router = useRouter();                                                                                    
 const chatStore = useChatStore();                                                                              
 const route = useRoute();                                                                                      
                                                                                                                
 const currentUserUid = computed(() => authStore.getUid);                                                       
//  const currentUserName = computed(() => authStore.getDisplayName);                                              
                                                                                                                
 watch(currentUserUid, (uid) => {                                                                               
   if (!uid) {                                                                                                  
     router.push('/login');                                                                                     
   }                                                                                                            
 });                                                                                                            
                                                                                                                
 onMounted(() => {                                                                                              
   const roomId = route.params.id;                                                                              
   chatStore.setRoomId(roomId);                                                                                 
   chatStore.fetchMessages();                                                                                   
 });                                                                                                            
                                                                                                                
 onUnmounted(() => {                                                                                            
   chatStore.unsubscribeMessages();  
   chatStore.messages = []                                                                           
 });                                                                                                            
 </script>                                                                                                      
                                                                                                                
<template>                                                                                                     
  <div class="chatbox-container">                                                                              
    <button
      class="toggle-button cosmic-button"
      @click="chatStore.toggleVisibility"
    >                                         
      {{ chatStore.isVisible ? '🌎 Close' : '🛸 Chat' }}                                                    
    </button>                                                                                                  
    <div
      v-if="chatStore.isVisible"
      class="chatbox space-module"
    >                                                           
      <div class="messages star-field">                                                                                   
        <div
          v-for="message in chatStore.messages"
          :key="message.id"                                           
          :class="['message', message.senderId === currentUserUid ? 'sent spacecraft' : 'received planet']"                   
          :title="chatStore.formatTimestamp(message.timestamp)"                                             
          @click="chatStore.showTimestamp(message.id)"
        >                                                     
          <div class="sender cosmic-text">
            {{ message.senderId === currentUserUid ? '👨‍🚀' : '👽' }}
          </div>         
          <div class="text">
            {{ message.text }}
          </div>                                                           
          <div
            v-if="chatStore.selectedMessageId === message.id"
            class="timestamp stardust"
          >                            
            {{ chatStore.formatTimestamp(message.timestamp) }}                                                 
          </div>                                                                                               
        </div>                                                                                                 
      </div>                                                                                                   
      <div class="input-area control-panel">                                                                                 
        <input
          v-model="chatStore.newMessage"
          placeholder="Message..."
          class="cosmic-input"
          @keyup.enter="chatStore.sendMessage"
        >                                                                                                 
        <button
          class="send-button launch-button"
          @click="chatStore.sendMessage"
        >
          <span class="send-icon">🚀</span>
        </button>                                                 
      </div>                                                                                                   
    </div>                                                                                                     
  </div>                                                                                                       
</template>
                                                                                                                                                                                                                                
<style scoped>
.chatbox-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}
.cosmic-button {
  background: linear-gradient(135deg, #4B0082, #8A2BE2);
  border: none;
  color: #fff;
  padding: 8px 16px;
  font-size: 1.1rem;
  border-radius: 15px;
  font-weight: bold;
  box-shadow: 0 0 15px rgba(138, 43, 226, 0.4);
  transition: all 0.3s ease;
}
.cosmic-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(138, 43, 226, 0.6);
}
.space-module {
  background: rgba(13, 13, 31, 0.95);
  border-radius: 15px;
  border: 1px solid rgba(138, 43, 226, 0.3);
  box-shadow: 0 0 30px rgba(138, 43, 226, 0.2);
  backdrop-filter: blur(10px);
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}
.star-field {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  scrollbar-width: thin;
  scrollbar-color: #8A2BE2 #1A1A3A;
  background: linear-gradient(to bottom, #0B0B1A, #1A1A3A);
  position: relative;
}
.star-field::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(white 1px, transparent 1px);
  background-size: 30px 30px;
  opacity: 0.1;
  animation: twinkle 5s infinite;
  pointer-events: none;
}
.star-field::-webkit-scrollbar {width: 4px;}
.star-field::-webkit-scrollbar-track {background: #1A1A3A;}
.star-field::-webkit-scrollbar-thumb {
  background: #8A2BE2;
  border-radius: 2px;
}
.message {
  margin: 5px 0;
  padding: 8px;
  border-radius: 10px;
  max-width: 85%;
  animation: float 0.3s ease-out;
  font-size: 0.9em;
}
@keyframes float {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
@keyframes twinkle {
  0%, 100% { opacity: 0.1; }
  50% { opacity: 0.2; }
}
.spacecraft {
  background: linear-gradient(135deg, #4B0082, #8A2BE2);
  margin-left: auto;
  border-top-right-radius: 0;
  box-shadow: 0 0 10px rgba(138, 43, 226, 0.3);
}
.planet {
  background: linear-gradient(135deg, #1A1A3A, #4A4A8A);
  margin-right: auto;
  border-top-left-radius: 0;
  box-shadow: 0 0 10px rgba(74, 74, 138, 0.3);
}
.cosmic-text {
  color: #fff;
  font-weight: bold;
  margin-bottom: 3px;
  font-size: 0.9em;
}
.text {
  color: #fff;
  line-height: 1.3;
  word-break: break-word;
}
.stardust {
  font-size: 0.7em;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 3px;
}
.control-panel {
  background: rgba(26, 26, 58, 0.8);
  padding: 10px;
  border-radius: 0 0 15px 15px;
  display: flex;
  gap: 8px;
}
.cosmic-input {
  flex: 1;
  background: rgba(11, 11, 26, 0.8);
  border: 1px solid rgba(138, 43, 226, 0.3);
  color: #fff;
  padding: 8px;
  border-radius: 8px;
  outline: none;
  transition: all 0.3s ease;
  font-size: 0.9em;
}
.cosmic-input:focus {
  border-color: #8A2BE2;
  box-shadow: 0 0 10px rgba(138, 43, 226, 0.3);
}
.launch-button {
  background: linear-gradient(135deg, #4B0082, #8A2BE2);
  border: none;
  color: #fff;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}
.launch-button:hover {
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(138, 43, 226, 0.5);
}
.send-icon {font-size: 1em;}
</style>