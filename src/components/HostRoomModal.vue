<script setup>
import visible from '@/assets/images/SVG/eye-open-svgrepo-com.svg'
import invisible from '@/assets/images/SVG/eye-closed-svgrepo-com.svg'
import { computed, ref } from 'vue'

const emit = defineEmits(['close-room', 'create', 'close'])
const props = defineProps({ isVisible: Boolean })

const roomName = ref('')
const privacyType = ref('public')
const password = ref('')
const confirmPassword = ref('')
const roomCapacity = ref(1)
const category = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isPrivate = computed(() => privacyType.value === 'private');

const handleSubmit = () => {
  if (privacyType.value === 'private' && password.value !== confirmPassword.value) 
   return console.error('Passwords do not match');
  if (roomName.value.trim() === '') return console.error('Room name cannot be empty')
  emit('create', {
    name: roomName.value,
    privacyType: privacyType.value,
    capacity: roomCapacity.value,
    category: category.value,
    password: privacyType.value === 'private' ? password.value : null
  })
  emit('close')
}

const togglePasswordVisibility = () => showPassword.value = !showPassword.value;
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
              minlength="3"
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
              :type="showPassword ? 'text' : 'password'"
              placeholder="Password"
            >
            <span
              class="password-toggle-icon"
              @click="togglePasswordVisibility"
            >
              <img 
                :src="showPassword ? invisible : visible" 
                alt="Toggle Password Visibility"
                class="icon"
                width="20"
                height="20"
              >
            </span>
          </div>
          <div
            v-if="isPrivate"
            class="password-container"
          >
            <input
              v-model="confirmPassword"
              class="input-confirm-password"
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
                width="20"
                height="20"
              >
            </span>
          </div>
        </div>
        <div class="room-info">
          <select
            id="status"
            v-model="privacyType"
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
            @click="handleSubmit"
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
  background-color: #2e2e2e70;
  border: solid 1px white;
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
  background: transparent;
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
  box-sizing: border-box;
}
.password-container {
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
.category-container {
  width: 52%;
  border-radius: 6px;
  background: #f6f6f6;
  box-sizing: border-box;
  margin-left: 0px;
}
.category-container input {
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
.status {
  padding: 5px;
  font-size: 16px;
  border-radius: 6px;
  appearance: none;
  background-size: 16px 16px;
  width: 20%;
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

@media (max-width: 375px) {
  .edit-room {
    width: 100%;
  }
  .status {
    width: 30%;
  }
}
</style>
