<template>
  <div class="modal">
    <h2>Join a Room</h2>
    <form @submit.prevent="handleSubmit">
      <template v-if="isPrivate == 'public'">
        <input
          v-model="roomId"
          placeholder="Room ID"
          required
        >
      </template>
      
      <template v-if="props.isPrivate !== undefined">
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
        >
        <input
          v-model="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          required
        >
      </template>
      <template v-else>                                                                                     
        <select v-model="privacyType">                                                                      
          <option value="public">
            Public
          </option>                                                            
          <option value="private">
            Private
          </option>                                                          
        </select>                                                                                           
        <template v-if="privacyType === 'private'">                                                         
          <input                                                                                            
            v-model="password"                                                                              
            type="password"                                                                                 
            placeholder="Password"                                                                          
            required                                                                                        
          >                                                                                                 
          <input                                                                                            
            v-model="confirmPassword"                                                                       
            type="password"                                                                                 
            placeholder="Confirm Password"                                                                  
            required                                                                                        
          >                                                                                                 
        </template>                                                                                         
      </template>  
      <button type="submit">
        Join Room
      </button>
    </form>
    <button @click="$emit('close')">
      Cancel
    </button>
  </div>
</template>
  
<script setup>
import { ref } from 'vue';
  
const props = defineProps({
  roomIdToJoin: {
    type: String,
    default: '',
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
})
  
const emit = defineEmits(['close', 'join']);
  
const privacyType = ref('public')
const roomId = ref(props.roomIdToJoin);
const password = ref('');
const confirmPassword = ref('');

const handleSubmit = () => {                                                                                
    if (privacyType.value === 'private' && password.value !== confirmPassword.value) {                        
      console.error('Passwords do not match');                                                                
      return;                                                                                                 
    }                                                                                                                                                                                                                      
    emit('join', roomId.value, password.value);                                                               
    emit('close');                                                                                            
  }  
</script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    z-index: 1000;
  }
  .modal h2 {
    margin-bottom: 10px;
  }
  .modal input {
    display: block;
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  .modal button {
    display: block;
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .modal button:hover {
    background-color: #45a049;
  }
  .modal select {                                                                                             
    display: block;                                                                                           
    margin-bottom: 10px;                                                                                      
  } 
  </style>