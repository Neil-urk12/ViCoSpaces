<script setup>
import visible from '@/assets/images/SVG/eye-open-svgrepo-com.svg';
import invisible from '@/assets/images/SVG/eye-closed-svgrepo-com.svg';
import { computed, ref } from 'vue'

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
console.log(props);
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
              src="../assets/images/SVG/close-bold-svgrepo-com.svg"
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
              maxlength="30"
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
            ><img 
              :src="showPassword ? invisible : visible" 
              alt="Toggle Password Visibility"
              class="icon"
              width="20"
              height="20"
            >
              <!-- <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" /> -->
            </span>
          </div>
          <div
            v-if="isPrivate"
            class="password-container"
          >
            <input
              v-model="confirmPassword"
              class="input-confirm-password"
              type="password"
              placeholder="Confirm Password"
              required
            >          <span
              class="password-toggle-icon"
              @click="togglePasswordVisibility"
            ><img 
              :src="showPassword ? invisible : visible" 
              alt="Toggle Password Visibility"
              class="icon"
              width="20"
              height="20"
            >
              <!-- <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" /> -->
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
          </div>
        </div>
        <div class="button-container">
          <div class="category-container">
            <input
              v-model="category"
              class="input-catergory"
              placeholder="Category"
              required
            >
          </div>
          
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
header {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}
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
  z-index: 100;
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
  width: 400px;
  max-width: 500px;
  box-sizing: border-box;
}
.edit-room-inputs {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}
button {
  cursor: pointer;
}
.close-btn {
  width: 40px;
  background-color: #2d8eff;
  border: none;
}
.close-btn img {
  height: 30px;
  width: 30px;
}
.name-container{
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  background: #f6f6f6;
  box-sizing: border-box;
}
.password-container, .c-password-container{
  display: flex;
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  background: #f6f6f6;
  box-sizing: border-box;
}

.input-room-name, .input-room-password, .input-confirm-password {
  width: 100%;
  font-size: 16px;
  color: black;
  outline: none;
  border: none;
  background: transparent;
  flex: 1;
}
.category-container{
  width: 52%;

  border-radius: 6px;
  background: #f6f6f6;
  box-sizing: border-box;
  margin-left: 0px;
}
.category-container input{
  width: 100%;
  font-size: 16px;
  color: black;
  outline: none;
  border: none;
  background: transparent;
  flex: 1;
  margin-left: 10px;
}
.room-info {
  display: flex;
  justify-content: flex-start;
  gap: 6px;
  width: 100%;
  height: 30px;
}
select {
  color: #2d8eff;
  border: none;
}

.status{
  padding: 5px;
  font-size: 16px;
  border-radius: 6px;
  appearance: none;
  background-size: 16px 16px;
  width:20%;
  background-color: #f9f9f9;
  background-image: url('../assets/images/SVG/drop-down-minor-svgrepo-com.svg');
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 6px;
  outline: none;

}
.capacity {
  padding: 5px;
  font-size: 16px;
  border-radius: 6px;
  appearance: none;
  background-size: 16px 16px;
  width: 40px;
  background-color: #f9f9f9;
  background-image: url('../assets/images/SVG/drop-down-minor-svgrepo-com.svg');
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 6px;
  outline: none;
}
.button-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 0;
}
.create-btn {
  background-color: #fff;
  color: #2d8eff;
  border: none;
  border-radius: 6px;
  width: 30%;
  height: 35px;
  font-weight: bold;
  margin-right: 0px;
}

/* Responsive Styles */

@media (max-width:375px ) {
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
    width: 100%;
    max-width: 500px;
    box-sizing: border-box;
  }
  .status{
    padding: 5px;
    font-size: 16px;
    border-radius: 6px;
    appearance: none;
    background-size: 16px 16px;
    width:30%;
    background-color: #f9f9f9;
    background-image: url('../assets/images/SVG/drop-down-minor-svgrepo-com.svg');
    background-repeat: no-repeat;
    background-position-x: 100%;
    background-position-y: 6px;
    outline: none;
  }
}
</style>