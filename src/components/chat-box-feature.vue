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
 const currentUserName = computed(() => authStore.getDisplayName);                                              
                                                                                                                
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
      class="toggle-button"
      @click="chatStore.toggleVisibility"
    >                                         
      {{ chatStore.isVisible ? 'Hide Chat' : 'Show Chat' }}                                                    
    </button>                                                                                                  
    <div
      v-if="chatStore.isVisible"
      class="chatbox"
    >                                                           
      <div class="messages">                                                                                   
        <div
          v-for="message in chatStore.messages"
          :key="message.id"                                           
          :class="['message', message.senderId === currentUserUid ? 'sent' : 'received']"                   
          :title="chatStore.formatTimestamp(message.timestamp)"                                             
          @click="chatStore.showTimestamp(message.id)"
        >                                                     
          <div class="sender">
            {{ message.senderId === currentUserUid ? 'You' : message.sender }}
          </div>         
          <div class="text">
            {{ message.text }}
          </div>                                                           
          <div
            v-if="chatStore.selectedMessageId === message.id"
            class="timestamp"
          >                            
            {{ chatStore.formatTimestamp(message.timestamp) }}                                                 
          </div>                                                                                               
        </div>                                                                                                 
      </div>                                                                                                   
      <div class="input-area">                                                                                 
        <input
          v-model="chatStore.newMessage"
          placeholder="Type a         
 message..."
          @keyup.enter="chatStore.sendMessage"
        >                                                                                                 
        <button
          class="send-button"
          @click="chatStore.sendMessage"
        >
          <span class="send-icon">➤</span>
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
   width: 300px;                                                                                                
 }                                                                                                              
                                                                                                                
 .toggle-button {                                                                                               
   width: 100%;                                                                                                 
   padding: 10px;                                                                                               
   background-color: rgb(59, 130, 246);                                                                                 
   color: white;                                                                                                
   border: none;                                                                                                
   cursor: pointer;                                                                                             
 }                                                                                                              
                                                                                                                
 .chatbox {                                                                                                     
   border: 1px solid #ccc;                                                                                      
   border-radius: 4px;                                                                                          
   overflow: hidden;                                                                                            
 }                                                                                                              
                                                                                                                
 .messages {                                                                                                    
   height: 300px;                                                                                               
   overflow-y: auto;                                                                                            
   padding: 10px;                                                                                               
   background-color: #f9f9f9;                                                                                   
   color: black                                                                                                 
 }                                                                                                              
                                                                                                                
 .message {                                                                                                     
   margin-bottom: 10px;                                                                                         
   max-width: 80%;                                                                                              
   clear: both;                                                                                                 
   cursor: pointer;                                                                                             
   color: black;                                                                                                
 }                                                                                                              
                                                                                                                
 .message .sender {                                                                                             
   font-size: 0.8em;                                                                                            
   margin-bottom: 2px;                                                                                          
   font-weight: bold;                                                                                           
 }                                                                                                              
                                                                                                                
 .message .text {                                                                                               
   padding: 8px;                                                                                                
   border-radius: 12px;                                                                                         
 }                                                                                                              
                                                                                                                
 .message .timestamp {                                                                                          
   font-size: 0.7em;                                                                                            
   margin-top: 2px;                                                                                             
   color: #888;                                                                                                 
 }                                                                                                              
                                                                                                                
 .message.sent {                                                                                                
   float: right;                                                                                                
 }                                                                                                              
                                                                                                                
 .message.sent .sender,                                                                                         
 .message.sent .timestamp {                                                                                     
   text-align: right;                                                                                           
 }                                                                                                              
                                                                                                                
 .message.sent .text {                                                                                          
   background-color: #DCF8C6;                                                                                   
 }                                                                                                              
                                                                                                                
 .message.received {                                                                                            
   float: left;                                                                                                 
 }                                                                                                              
                                                                                                                
 .message.received .text {                                                                                      
   background-color: #E6E6E6;                                                                                   
 }                                                                                                              
                                                                                                                
 .input-area {                                                                                                  
   display: flex;                                                                                               
   padding: 10px;                                                                                               
   background-color: #fff;                                                                                      
 }                                                                                                              
                                                                                                                
 input {                                                                                                        
   flex-grow: 1;                                                                                                
   padding: 5px;                                                                                                
   border: 1px solid #ccc;                                                                                      
   border-radius: 4px;                                                                                          
 }                                                                                                              
                                                                                                                
 button {                                                                                                       
   margin-left: 10px;                                                                                           
   padding: 5px 10px;                                                                                           
   background-color: rgb(59, 130, 246);                                                                                  
   color: white;                                                                                                
   border: none;                                                                                                
   border-radius: 4px;                                                                                          
   cursor: pointer;                                                                                             
 }     
 .send-button {
  background-color: rgb(59, 130, 246);
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.send-button:hover {
  background-color: #2563eb;
}

.send-icon {
  font-size: 1rem;
  transform: rotate(90deg);
}                                                                                                         
 </style>