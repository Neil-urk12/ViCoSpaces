<script setup>
// import { ref } from 'vue';
// Edit to make the overlay possible
import { defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';

const emit = defineEmits(['close-room']);
//make the overlay invisible
const props = defineProps({
  isVisible: Boolean
});
// checker
console.log(props);

const router = useRouter();

function goToRoom() {
  console.log('Navigating to room...');
  router.push({ name: 'Room' });
}


console.log(goToRoom);


</script>

<template>
  <section
    v-if="isVisible"
    class="overlay"
  >
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
            class="input-room-name"
            type="text"
            placeholder="Name"
          >
        </div>
        <div class="password-container">
          <input
            class="input-room-password"
            type="password"
            placeholder="Password"
          >
          <span class="password-toggle-icon"><i class="fas fa-eye" /></span>
        </div>
      </div>
      <div class="room-info">
        <select
          id="status"
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
            name="capacity"
            class="capacity"
          >
            <option value="1">
              1
            </option>
            <option value="2">
              2
            </option>
            <option value="1">
              3
            </option>
            <option value="2">
              4
            </option>
            <option value="1">
              5
            </option>
            <option value="2">
              6
            </option>
          </select>
        </div>
      </div>
      <div class="button-container">
        <button
          class="create-btn"
          @click="goToRoom"
        >
          Create
        </button>  
      </div>
    </div>
  </section>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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