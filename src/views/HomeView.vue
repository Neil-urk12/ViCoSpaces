<script setup>
import HostRoomModal from '@/components/HostRoomModal.vue';
import JoinRoomModal from '@/components/JoinRoomModal.vue';
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { ref as dbRef, onValue, off, push } from 'firebase/database';
import { realTimeDb as database } from '@/firebase/firebaseconfig';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore'
import { useRoomStore } from '../stores/roomStore'

const router = useRouter();
const authStore = useAuthStore();
const roomStore = useRoomStore();

const roomsRef = dbRef(database, 'rooms');
let showModal = ref(false)
const searchQuery = ref('');
const sortBy = ref('createdAt');
const sortOrder = ref('desc');
const privacyFilter = ref('all');
const categoryFilter = ref('all');

const uniqueCategories = computed(() => {
  const categories = new Set(
    roomStore.rooms.map((room) => room.category).filter(Boolean)
  );
  return Array.from(categories);
})

const createRoomHandler = async (roomData) => {
  try {
    const roomId = await roomStore.createRoom(
      roomData,
      authStore.user.uid,
      authStore.user.email
    );
    router.push(`/room/${roomId}`);
  } catch (error) {
    console.error('Error creating room:', error);
    // Handle error (e.g., show error message to user)
  }
};

const joinRoom = async (roomId, privacyType) => {
  console.log(showModal.value)
  if (privacyType === 'private') {
    showModal.value = true;
    console.log(showModal.value)
  } else {
    try {
      await roomStore.joinRoom(
        roomId,
        authStore.user.uid,
        authStore.user.email
      );
      router.push(`/room/${roomId}`);
    } catch (error) {
      console.error('Error joining room:', error);
      // Handle error (e.g., show error message to user)
    }
  }
};

const joinRoomById = async (roomId, password) => {
  try {
    await roomStore.joinRoom(
      roomId,
      authStore.user.uid,
      authStore.user.email,
      password
    );
    router.push(`/room/${roomId}`);
  } catch (error) {
    console.error('Error joining room:', error);
    // Handle error (e.g., show error message to user)
  }
};

onMounted(async () => {
  if (!authStore.isAuthenticated) router.push('/login')
  else await roomStore.fetchRooms()
})
onUnmounted(() => off(roomsRef));


const filteredAndSortedRooms = computed(() => {
  let filteredRooms = roomStore.rooms.filter(
    (room) => room && typeof room === 'object'
  );
  if (searchQuery.value) {
    filteredRooms = filteredRooms.filter((room) =>
      room.id.includes(searchQuery.value)
    );
  }
  if (privacyFilter.value !== 'all') {
    filteredRooms = filteredRooms.filter(
      (room) => room.privacyType === privacyFilter.value
    );
  }
  if (categoryFilter.value !== 'all') {
    filteredRooms = filteredRooms.filter(
      (room) => room.category === categoryFilter.value
    );
  }
  return filteredRooms.sort((a, b) => {
    let comparison = 0;
    if (sortBy.value === 'createdAtOldest') {
      comparison = (a.createdAt || 0) - (b.createdAt || 0);
    } else if (sortBy.value === 'createdAt') {
      comparison = (b.createdAt || 0) - (a.createdAt || 0);
    } else {
      const aValue = a[sortBy.value] || 0;
      const bValue = b[sortBy.value] || 0;
      if (aValue < bValue) comparison = -1;
      if (aValue > bValue) comparison = 1;
    }
    return sortOrder.value === 'desc' ? comparison * -1 : comparison;
  });
});

const isCreateRoomVisible = ref(false);
</script>

<template>
  <header>
    <header>
      <nav class="nav-bar">
        <div class="nav-div">
          <div class="logo-container">
            <img
              src="../images/logo/logo.png"
              alt="ViCoSpaces-Logo"
              class="logo-img"
            >
            <span class="logo-name">ViCoSpaces</span>
          </div>
          <div
            class="burger"
            @click="toggleMenu"
          >
            <img
              src="../images/SVG/burger-simple-svgrepo-com.svg"
              alt="menu-icon"
              width="30px"
            >
          </div>
          <div class="nav-links-and-buttons">
            <ul class="pages-container">
              <ul class="pages-container">
                <li>
                  <router-link to="/">
                    Home
                  </router-link>
                </li>
                <li>
                  <router-link to="/about">
                    About
                  </router-link>
                </li>
                <li>
                  <router-link to="/contact">
                    Contact
                  </router-link>
                </li>
              </ul>
            </ul>
            <a
              id="user-profile"
              href=""
            >
              <div class="user-profile">
                <img
                  src="../images/black-default-user-profile-ll(1).webp"
                  alt="User Profile"
                >
              </div>
            </a>
          </div>
        </div>
      </nav>
    </header>
  
    <main>
      <div class="search-bar">
        <div class="search">
          <img
            class="search-icon"
            src="../images/SVG/search-svgrepo-com.svg"
            alt="search-icon"
            width="30px"
            @click="toggleDropdown"
          >
          <!-- <div
            v-show="isDropdownVisible"
            class="dropdown-menu"
          >
            <a
              v-for="(item, index) in dropdownItems"
              :key="index"
              href="#"
              class="dropdown-item"
            >
              {{ item }}
            </a>
          </div>
        </div> -->
          <!-- search bar input -->
          <input
            v-model="searchQuery"
            type="text"
            class="search-input"
            name="search-input"
            placeholder="Search rooms by ID"
          >
  
          <div class="filter-sort">
            <a
              href="#"
              @click.prevent="filter"
            >
              <img
                class="filter-icon"
                src="../images/SVG/filters-2-svgrepo-com.svg"
                alt="filter-icon"
                width="30px"
              >
            </a>
  
            <a
              href="#"
              @click.prevent="sort"
            >
              <img
                class="sort-icon"
                src="../images/SVG/sort-vertical-svgrepo-com.svg"
                alt="sort-icon"
                width="30px"
                @click="sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'"
              >
            </a>
          </div>
        </div>
        <div class="button-container">
          <button @click="showModal = true">
            Join Room
          </button>
          <button @click="isCreateRoomVisible = true">
            Host Room
          </button>
        </div>
      </div>
    </main>
    <categoryBar @changetitle="update" />
  </header>
  <div class="search-sort">
    <select v-model="sortBy">
      <option value="capacity">
        Capacity
      </option>
      <option value="createdAt">
        Latest
      </option>
      <option value="createdAtOldest">
        Oldest
      </option>
    </select>
  </div>
  <div class="filters">
    <select v-model="privacyFilter">
      <option value="all">
        All Privacy
      </option>
      <option value="public">
        Public
      </option>
      <option value="private">
        Private
      </option>
    </select>
    <select v-model="categoryFilter">
      <option value="all">
        All Categories
      </option>
      <option
        v-for="category in uniqueCategories"
        :key="category"
        :value="category"
      >
        {{ category }}
      </option>
    </select>
  </div>
  <main class="room-view-container">
    <div
      v-for="room in filteredAndSortedRooms"
      :key="room.id"
      class="room"
    >
      <div class="image-content">
        <div class="hosting-container">
          <div class="host-profile" />
        </div>
      </div>
      <div class="text-content">
        <h2>{{ room.name }}</h2>
        <h4>{{ room.currentUsers }} / {{ room.maxCapacity }}</h4>
        <p>Host: {{ room.host?.name || 'Unknown' }}</p>
        <p>Privacy: {{ room.privacyType }}</p>
        <div class="joined-users">
          <i class="icon" />
        </div>
        <div class="join-btn-container">  
          <button
            class="join-btn"
            :disabled="room.currentUsers >= room.maxCapacity"
            @click="joinRoom(room.id, room.privacyType)"
          >
            {{ room.currentUsers >= room.maxCapacity ? 'Full' : 'Join' }}
          </button>           
        </div>
      </div>
    </div>
    <JoinRoomModal
      v-if="showModal"
      @close="showModal = false"
      @join="joinRoomById"
    />
    <HostRoomModal
      :is-visible="isCreateRoomVisible"
      @close-room="isCreateRoomVisible = false"
      @close="close"
      @create="createRoomHandler"
    />
  </main>
</template>

<style scoped>
.room-view-container {
  display: grid;
  column-gap: 20px;
  row-gap: 20px;
  grid-template-columns: 28% 1fr 1fr; 
  grid-template-rows: 300px auto auto; 
  background-color: rgb(255, 255, 255);
  width: 96%;
  height: 71.8vh;
  margin: auto;
}
.room {
  border-radius: 12px;
  height: 100%; 
  width: 100%;
  flex-direction: column; 
  overflow: hidden;
  box-shadow: 3px 5px 20px #9e9e9e;
}
.image-content{
  background-image: url(../images/SVG/room-background_2.svg);
  display: grid;
  grid-template-columns: 28% 1fr 1fr; 
  grid-template-rows: auto auto; 
  border-radius: 12px 12px 0px 0px;
  height: 60%;
  background-color: #2d8eff;
}
.hosting-container{
  grid-column: 3;
  background-color: rgb(255, 255, 255);
  height: 64px;
  width: 64px;
  border-radius: 50%;
  align-self: center;
  transform: translate(107px, -20px); 
  background-image: url('../images/UserProfileStocks/megan.jpg'); 
  background-size: 220%; 
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat;
}
.text-content {
  display: grid;
  grid-template-columns: auto auto auto 130px;
  grid-template-rows: auto 1fr auto;
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

.nav-bar {
  background: #2d8eff;
  font-family: Calibri, sans-serif;
  align-items: center;
  height: 70px;
  padding: 15px 40px 0px 40px;
}

.nav-div {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.burger {
  display: none;
  cursor: pointer;
}

.logo-container {
  display: flex;
  align-items: center;
  font-size: 35px;
  font-weight: 600;
  color: white;
}

.logo-img {
  height: 40px;
  margin-right: 10px;
}

.nav-links-and-buttons {
  display: flex;
  align-items: center;
  gap: 70px;
}

.pages-container {
  display: flex;
  list-style: none;
  gap: 80px;
  margin: 0;
}

.pages-container li a {
  color: white;
  font-size: 18px;
  font-weight: bold;
  position: relative;
  text-align: center;
}

.pages-container li a::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -2px;
  width: 0;
  height: 2px;
  background-color: white;
  transition: all 0.3s ease-in-out;
  transform: translateX(-50%);
}

.pages-container li a:hover::after {
  width: 100%;
  left: 50%; 
  transform: translateX(-50%);
}

.user-profile {
  display: flex;
  background-color: white;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  justify-content: center;
}

.search-bar {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.search {
  --padding: 14px;
  width: max-content;
  display: flex;
  align-items: center;
  padding: var(--padding);
  border-radius: 12px;
  background: #f6f6f6;
  width: 75%;
}

.search-input {
  font-size: 16px;
  font-family: sans-serif;
  color: black;
  margin-left: var(--padding);
  margin-right: var(--padding);
  outline: none;
  border: none;
  background: transparent;
  flex: 1;
}

.search-icon, .sort-icon, .filter-icon {
  cursor: pointer;
}

.filter-sort {
  display: flex;
  justify-content: space-between;
  gap: 15px;
}

.button-container {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 20%;
}

button {
  background-color: #2d8eff;
  color: white;
  border: none;
  border-radius: 12px;
  width: 123px;
  height: 50px;
  font-weight: bold;
}


@media (max-width: 794px) {

  .nav-bar {
  background: #0f1112;
  font-family: Calibri, sans-serif;
  align-items: center;
  height: 70px;
  padding: 15px 40px 0px 40px;
}

.nav-div {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-container {
  display: flex;
  align-items: center;
  font-size: clamp(50px, 1vw, 100px);
  font-weight: 600;
  color: white;
}

.logo-img {
  height: 40px;
  margin-right: 10px;
}

.nav-links-and-buttons {
  display: flex;
  align-items: center;
  gap: 70px;
}
.pages-container {
  display: flex;
  list-style: none;
  gap: 80px;
  margin: 0;
}

.pages-container li a {
  color: white;
  font-size: 18px;
  font-weight: bold;
  position: relative;
  text-align: center;
}

.pages-container li a::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -2px;
  width: 0;
  height: 2px;
  background-color: white;
  transition: all 0.3s ease-in-out;
  transform: translateX(-50%);
}

.pages-container li a:hover::after {
  width: 100%;
  left: 50%; 
  transform: translateX(-50%);
}
}

@media (max-width: 641px) {
  .nav-bar {
    background: #003d5b;
    font-family: Calibri, sans-serif;
    align-items: center;
    height: 70px;

  }

  .burger {
    display: block;

  }

  .logo-container {
  display: none;
  align-items: center;
  font-size: 35px;
  font-weight: 600;
  color: white;
}

.logo-img {
  height: 40px;
  margin-right: 10px;
}

  .nav-links-and-buttons {
    display: none;
  }

  .nav-links-and-buttons.menu-open {
    display: flex;
    position: absolute;
    top: 70px;
    right: 0;
    background: #003d5b;
    width: 100%;
    padding: 20px;
    gap: 20px;
    z-index: 10;
  }

  .pages-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}
</style>
