<template>
  <div class="modal">
    <h2>Join a Room</h2>
    <form @submit.prevent="handleSubmit">
      <input
        v-model="roomId"
        placeholder="Room ID"
        required
      >
      <template v-if="props.isPrivate === 'private'">
        <div class="password-container">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password"
            required
          >
          <span
            class="password-toggle-icon"
            @click="togglePasswordVisibility"
          >
            <img
              :src="showPassword ? invisible : visible"
              alt="Toggle Password Visibility"
              class="icon"
            >
          </span>
        </div>
        <div class="password-container">
          <input
            v-model="confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            placeholder="Confirm Password"
            required
          >
          <span
            class="password-toggle-icon"
            @click="toggleConfirmPasswordVisibility"
          >
            <img
              :src="showConfirmPassword ? invisible : visible"
              alt="Toggle Confirm Password Visibility"
              class="icon"
            >
          </span>
        </div>
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
          <div class="password-container">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Password"
              required
            >
            <span
              class="password-toggle-icon"
              @click="togglePasswordVisibility"
            >
              <img
                :src="showPassword ? invisible : visible"
                alt="Toggle Password Visibility"
                class="icon"
              >
            </span>
          </div>
          <div class="password-container">
            <input
              v-model="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Confirm Password"
              required
            >
            <span
              class="password-toggle-icon"
              @click="toggleConfirmPasswordVisibility"
            >
              <img
                :src="showConfirmPassword ? invisible : visible"
                alt="Toggle Confirm Password Visibility"
                class="icon"
              >
            </span>
          </div>
        </template>                                                                                         
      </template>  
      <button
        type="submit"
        class="join-btn"
      >
        Join Room
      </button>
    </form>
    <button
      class="close-btn"
      @click="$emit('close')"
    >
      Cancel
    </button>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import visible from '@/assets/images/SVG/eye-open-svgrepo-com.svg';
import invisible from '@/assets/images/SVG/eye-closed-svgrepo-com.svg';

const privacyType = ref('public');
const props = defineProps({
  roomIdToJoin: {
    type: String,
    default: '',
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['close', 'join']);
const roomId = ref(props.roomIdToJoin);
const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const handleSubmit = () => {
  if (privacyType.value === 'private' && password.value !== confirmPassword.value) {
    console.error('Passwords do not match');
    return;
  }

  emit('join', roomId.value, password.value);
  emit('close');
};
</script>
<style scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  border: solid 1px white;
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
  padding: 10px 40px 10px 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  position: relative;
}
.password-container {
  position: relative;
  width: 100%;
}
.password-toggle-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
.icon {
  width: 20px;
  height: 20px;
}
.modal button {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #2d8eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.modal button:hover {
  background-color: #2d8eff;
}
.modal select {                                                                                             
  display: block;                                                                                           
  margin-bottom: 10px;                                                                                      
}
.modal select {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  color: #333;
  font-size: 16px;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3csvg%20xmlns%3d'http%3a//www.w3.org/2000/svg'%20viewBox%3d'0%200%204%205'%3e%3cpath%20fill%3d'%23444'%20d%3d'M2%200L0%202h4L2%200z'%3e%3c/path%3e%3c/svg%3e"); /* Custom dropdown arrow */
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px 12px;
}

.modal select:focus {
  outline: none;
  border-color: #2d8eff;
}
input:focus{
  border-color: #2d8eff;
}
.modal select option {
  color: #333;
}
.join-btn{
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
}
.close-btn{
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
}
</style>
