<template>
  <main>
    <!-- to Import the child component -->
    <CreateRoomButton @add-room="createRoom" />
    <div class="room-container">
      <div
        v-for="(room, index) in rooms"
        :key="index"
        class="room"
      >
        <div class="top-section" />
        <div class="bottom-section" />
      </div>
    </div>
  </main>
</template>

<script>
import CreateRoomButton from './search-bar.vue';

export default {
  components: {
    CreateRoomButton,
  },
  data() {
    return {
      rooms: [], // Store rooms in parent
    };
  },
  methods: {
    createRoom() {
      this.rooms.push({}); // Add a new room
    },
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

main {
  padding: 20px;
}

.room-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin: 20px 0px 0px 20px;

}

.room {
  width: 200px;
  height: 200px;
  border: 1px solid #000;
  display: flex;
  flex-direction: column;
}

.top-section {
  background-color: blue;
  height: 50%;
}

.bottom-section {
  background-color: white;
  height: 50%;
}
</style>
