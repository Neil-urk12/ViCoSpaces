<script setup>
import { ref } from "vue";
import myHome from "@/components/home-components.vue";
import createRoom from "@/components/create-room.vue";

const join = () => {
  alert("neil joined the program!");
};

const isCreateRoomVisible = ref(false);
const title = ref("Production Design");

function update(newTitle) {
  title.value = newTitle;
}
</script>

<template>
  <header>
    <myHome @open-room="isCreateRoomVisible = true" />
    <categoryBar @changetitle="update" />
  </header>
  <main>
    <div class="room-view-container">
      <div class="room-form">
        <div class="room">
          <div class="image-content">
            <div class="hosting-container">
              <div class="host-profile" />
            </div>
          </div>
          <div class="text-content">
            <h2>Production Design</h2>
            <div class="joined-users">
              <i class="icon" />
            </div>
            <div class="join-btn-container">
              <button class="join-btn" @:click="join">Join</button>
            </div>
          </div>
        </div>
        <createRoom
          :is-visible="isCreateRoomVisible"
          @close-room="isCreateRoomVisible = false"
        />
        <div class="room 2">
          <div class="image-content">
            <div class="hosting-container">
              <div class="host-profile" />
            </div>
          </div>
          <div class="text-content">
            <h2>Production Design</h2>
            <div class="joined-users">
              <i class="icon" />
            </div>
            <div class="join-btn-container">
              <button class="join-btn" @:click="join">Join</button>
            </div>
          </div>
        </div>
        <createRoom
          :is-visible="isCreateRoomVisible"
          @close-room="isCreateRoomVisible = false"
        />
        <div class="room 3">
          <div class="image-content">
            <div class="hosting-container">
              <div class="host-profile" />
            </div>
          </div>
          <div class="text-content">
            <h2>MAgic Design</h2>
            <div class="joined-users">
              <i class="icon" />
            </div>
            <div class="join-btn-container">
              <button class="join-btn" @:click="join">Join</button>
            </div>
          </div>
        </div>
        <createRoom
          :is-visible="isCreateRoomVisible"
          @close-room="isCreateRoomVisible = false"
        />
        <div class="room 4">
          <div class="image-content">
            <div class="hosting-container">
              <div class="host-profile" />
            </div>
          </div>
          <div class="text-content">
            <h2>Production Design</h2>
            <div class="joined-users">
              <i class="icon" />
            </div>
            <div class="join-btn-container">
              <button class="join-btn" @:click="join">Join</button>
            </div>
          </div>
        </div>
        <createRoom
          :is-visible="isCreateRoomVisible"
          @close-room="isCreateRoomVisible = false"
        />
        <div class="room 5">
          <div class="image-content">
            <div class="hosting-container">
              <div class="host-profile" />
            </div>
          </div>
          <div class="text-content">
            <h2>Production Design</h2>
            <div class="joined-users">
              <i class="icon" />
            </div>
            <div class="join-btn-container">
              <button class="join-btn" @:click="join">Join</button>
            </div>
          </div>
        </div>
        <createRoom
          :is-visible="isCreateRoomVisible"
          @close-room="isCreateRoomVisible = false"
        />
        <div class="room 6">
          <div class="image-content">
            <div class="hosting-container">
              <div class="host-profile" />
            </div>
          </div>
          <div class="text-content">
            <h2>Production Design</h2>
            <div class="joined-users">
              <i class="icon" />
            </div>
            <div class="join-btn-container">
              <button class="join-btn" @:click="join">Join</button>
            </div>
          </div>
        </div>
        <createRoom
          :is-visible="isCreateRoomVisible"
          @close-room="isCreateRoomVisible = false"
        />
        <div class="room 4">
          <div class="image-content">
            <div class="hosting-container">
              <div class="host-profile" />
            </div>
          </div>
          <div class="text-content">
            <h2>Production Design</h2>
            <div class="joined-users">
              <i class="icon" />
            </div>
            <div class="join-btn-container">
              <button class="join-btn" @:click="join">Join</button>
            </div>
          </div>
        </div>
        <createRoom
          :is-visible="isCreateRoomVisible"
          @close-room="isCreateRoomVisible = false"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  height: 100vh;
  padding: 20px 46px 0px 46px;
  overflow-y: auto ;
}
.room-view-container {
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: first baseline;
  min-height: 100%;
  width: 100%;
  
}
.room-form {
  width: 100%;
  display: grid;
  align-content: baseline;
  grid-template-columns: repeat(3, minmax(370px, 1fr));
  grid-template-rows: auto; 
  gap: 30px;
  flex-grow: 1;
  overflow: auto;
}

.room {
  position: relative; 
  border-radius: 12px;
  height: 350px;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  word-wrap: break-word;
  box-shadow: 3px 5px 20px #9e9e9e;
}

.image-content {
  position: relative;
  background-image: url(../images/SVG/room-background_2.svg);
  display: grid;
  grid-template-columns: 28% 1fr 1fr;
  grid-template-rows: auto auto;
  border-radius: 12px 12px 0px 0px;
  height: 60%;
  box-sizing: border-box;
  background-color: #2d8eff;
}
.hosting-container {
  grid-column: 3;
  background-color: rgb(255, 255, 255);
  height: 64px;
  width: 64px;
  border-radius: 50%;
  align-self: center;
  transform: translate(107px, -20px);
  background-image: url("../images/UserProfileStocks/megan.jpg");
  background-size: 220%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.text-content {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  height: 40%;
  max-height: 100%;
  max-width: 100%;
  border-radius: 0px 0px 12px 12px;
  background-color: rgb(255, 255, 255);
  padding: 0px 10px 10px 10px;
  align-items: center;
  box-sizing: border-box;
}
.title {
  grid-column: 1 / span 3;
  grid-row: 1;
  font-size: 24px;
  font-weight: bold;
  align-items: center;
  text-align: center;
}
.title h2 {
  color: white;
}
.joined-users {
  grid-column: 1 / span 1;
  grid-row: 3;
  background-color: rgb(9, 255, 140);
  border-radius: 50%;
  height: 32px;
  width: 32px;
  font-size: 24px;
}
.join-btn-container {
  grid-column: 4;
  grid-row: 3;
  display: flex;
  justify-content: center;
  align-items: center;
}
.join-btn {
  font-weight: bolder;
  border: none;
  border-radius: 12px;
  height: 42px;
  width: 124px;
  color: white;
  background-color: #2d8eff;
}
button {
  cursor: pointer;
}
@media (max-width: 1386px) {
  main {
    height: 100vh;
    padding: 20px 38px 0px 38px;
    overflow-y: auto ;
  
  }
  .image-content {
  position: relative;
  background-image: url(../images/SVG/room-background_2.svg);
  display: grid;
  grid-template-columns: 28% 1fr 1fr;
  grid-template-rows: auto auto;
  border-radius: 12px 12px 0px 0px;
  height: 60%;
  background-color: #2d8eff;
}

.hosting-container {
  position: absolute; /* Use absolute positioning */
  top: 35px; /* Adjust the top position as needed */
  right: 120px; /* Adjust the right position as needed */
  background-color: rgb(255, 255, 255);
  height: 64px;
  width: 64px;
  border-radius: 50%;
  background-image: url("../images/UserProfileStocks/megan.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

}

@media (max-width: 1228px) {
  .room-form {
    grid-template-columns: repeat(2, 1fr); /* Two columns for smaller screens */
  }
}
@media (max-width: 794px){
  main {
    height: 100vh;
    padding: 20px 20px 0px 20px;
    overflow-y: auto ;
  
  }
  .room-form {
    grid-template-columns: 1fr; /* One column for even smaller screens */
  }
}

@media (max-width: 600px) {
  .room-form {
    grid-template-columns: 1fr; /* One column for even smaller screens */
  }
  .room-view-container{
    background-color: #9e9e9e;
  }
}

</style>
