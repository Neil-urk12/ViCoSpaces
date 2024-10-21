<script setup>
import { computed, ref } from 'vue'
import { ref as dbRef, push, set } from 'firebase/database'
import { realTimeDb as database } from '@/firebase/firebaseconfig'
import { useRouter } from 'vue-router'
import { useRoomStore } from '../stores/roomStore'
import { useAuthStore } from '@/stores/authStore'

const emit = defineEmits(['close-room', 'create', 'close'])
const privacy = ref('private')
const isPrivate = computed(() => privacy.value === 'private')
const props = defineProps({isVisible: Boolean})

const roomName = ref('')
const privacyType = ref('public')
const password = ref('')
const confirmPassword = ref('')
const roomCapacity = ref(1)
const category = ref('')
const showPassword = ref(false);

const handleSubmit = () => {
  if (privacyType.value === 'private' && password.value !== confirmPassword.value) {
    console.error('Passwords do not match')
    return
  }
  
  emit('create', {
    name: roomName.value,
    privacyType: privacyType.value,
    capacity: roomCapacity.value,
    category: category.value,
    password: privacyType.value === 'private' ? password.value : null
  })
  
  emit('close')
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
}

// const createRoom = async () => {
//   try {
//     isLoading.value = true
//     error.value = ''

//     if (!roomName.value.trim()) 
//       throw new Error('Room name is required')
//     if (isPrivate.value && !password.value.trim()) 
//       throw new Error('Password is required for private rooms')

//     const room = { 
//       name: roomName.value,
//       isPrivate: isPrivate.value,
//       password: isPrivate.value ? password.value : null,
//       capacity: roomCapacity.value,
//       createdAt: Date.now(),
//     }

//     const roomsRef = dbRef(database, 'rooms')
//     const newRoomRef = push(roomsRef)
//     await set(newRoomRef, room)

//     console.log('Room created:', newRoomRef.key)
//     router.push({ 
//       name: 'Room', 
//       params: { id: newRoomRef.key },
//       query: { name: room.name } 
//     });
//   } catch (err) {
//     console.error('Error creating room:', err)
//     error.value = err.message
//   } finally {
//     isLoading.value = false
//   }
// }
</script>

<template>
  <section
    v-if="isVisible"
    class="overlay"
  >
    <form @submit.prevent="handleSubmit">
      <div class="edit-room">
        <header>
          <h2 class="room-name">
            Host Room
          </h2>
          <button
            class="close-btn"
            @click="emit('close-room')"
          >
            <img
              src="../images/SVG/close-bold-svgrepo-com.svg"
              alt=""
            >
          </button>
        </header>
        <div class="edit-room-inputs">
          <div class="name-container">
            <input
              v-model="roomName"
              class="input-room-name"
              type="text"
              placeholder="Room Name"
              required
            >
          </div>
          <div
            v-if="isPrivate"
            class="password-container"
          >
            <input
              v-model="password"
              class="input-room-password"
              type="password"
              placeholder="Password"
            >
            <span
              class="password-toggle-icon"
              @click="togglePasswordVisibility"
            >
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" />
            </span>
          </div>
          <div
            v-if="isPrivate"
            class="password-container"
          >
            <input
              v-model="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              required
            >          <span
              class="password-toggle-icon"
              @click="togglePasswordVisibility"
            >
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" />
            </span>
          </div>
        </div>
        <div class="room-info">
          <select
            id="status"
            v-model="privacy"
            name="status"
            class="status"
          >
            <option value="private">
              Private
            </option>
            <option value="public">
              Public
            </option>
          </select>
          <div class="capacity-content">
            <label for="capacity">Capacity </label>
            <select
              id="capacity"
              v-model="roomCapacity"
              name="capacity"
              class="capacity"
            >
              <option value="1">
                1
              </option>
              <option value="2">
                2
              </option>
              <option value="3">
                3
              </option>
              <option value="4">
                4
              </option>
              <option value="5">
                5
              </option>
              <option value="6">
                6
              </option>
            </select>
            <input
              v-model="category"
              placeholder="Category"
              required
            >
          </div>
        </div>
        <div class="button-container">
          <button
            class="create-btn"
            @click="createRoom"
          >
            Create
          </button>  
        </div>
      </div>
    </form>
  </section>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.edit-room {
  box-sizing: border-box;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: #2d8eff;
  color: white;
  z-index: 1000;
  width: 25%;
  max-width: 500px;
}
.edit-room-inputs{
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}
header {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}
.close-btn {
  background-color: #2d8eff;
  border: none;
}
.close-btn img {
  height: 30px;
  width: 30px;
}
.name-container {
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  background: #f6f6f6;
}
.input-room-name {
  width: 100%;
  font-size: 16px;
  color: black;
  outline: none;
  border: none;
  background: transparent;
  flex: 1;
}
.password-container {
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  background: #f6f6f6;
}
.input-room-password {
  width: 100%;
  font-size: 16px;
  color: black;
  outline: none;
  border: none;
  background: transparent;
  flex: 1;
}
.room-info{
  display: flex;
  justify-content: flex-start;
  gap: 6px;
  width: 100%;

}
select {
  color:#2d8eff;
  border: none;
}
.status { 
  width: 80px;
  padding: 5px;
  font-size: 16px;
  border-radius: 6px;
  appearance: none;
  background-size:16px 16px ;
  background-image: url('../images/SVG/drop-down-minor-svgrepo-com.svg');
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 6px;
}
.capacity {
  width: 40px;
  padding: 5px;
  font-size: 16px;
  border-radius: 5px;
  appearance: none;
  background-color: #f9f9f9;
  background-size:16px 16px ;
  background-image: url('../images/SVG/drop-down-minor-svgrepo-com.svg');
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 6px;
}
.button-container{
  width: 100% ;
  display: flex;
  justify-content: flex-end;
}
.create-btn{        
  background-color: #fff;
  color:#2d8eff;
  border: none;
  border-radius: 6px;
  width: 30%;
  height: 35px;
  font-weight: bold; 
}
/* Responsive Styles */
@media (max-width: 768px) {
  .edit-room {
    width: 90%;
    padding: 15px;
    gap: 15px;
  }
  header {
    gap: 1em;
  }
  .name-container {
    padding: 10px;
  }
  .input-room-name {
    font-size: 14px;
  }
}
@media (max-width: 480px) {
  .edit-room {
    width: 95%;
    padding: 10px;
    gap: 10px;
  }
  .input-room-name {
    font-size: 12px;
  }
  .room-name {
    font-size: 18px;
  }
  .close-btn img {
    height: 25px;
    width: 25px;
  }
}
</style>