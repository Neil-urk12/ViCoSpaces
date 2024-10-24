<script setup>
//Styles
import '@/assets/styles/homeView.css';
import '@/assets/styles/home-components.css';
//imported icon
import LockIcon from '@/assets/images/SVG/lock-password-svgrepo-com-red.svg';
import UnlockIcon from  '@/assets/images/SVG/lock-unlocked-svgrepo-com-green.svg';
import lockStatusIcon from '@/assets/images/SVG/lock-svgrepo-com-black.svg';
import hostIcon from '@/assets/images/SVG/user-svgrepo-com-black.svg';

import HostRoomModal from '@/components/HostRoomModal.vue';
import JoinRoomModal from '@/components/JoinRoomModal.vue';
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { ref as dbRef, onValue, off, push } from 'firebase/database';
import { realTimeDb as database } from '../firebase/firebaseconfig.js'
import { useRouter, RouterLink } from 'vue-router';
import { useAuthStore } from '../stores/authStore'
import { useRoomStore } from '../stores/roomStore'
//test filter modal
// import Modal from '@/components/test-modal.vue';//this should be FilterModal.vue
const isModalVisible = ref(false);

const openModal = () => {
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};
 // Import Modal component

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
const privacyCondition = ref('public')
const roomIdToJoin = ref(null)

const isCreateRoomVisible = ref(false);
const isDropdownOpen = ref(false)
const toggleDropdown = () => isDropdownOpen.value = !isDropdownOpen.value

// const uniqueCategories = computed(() => {
//   const categories = new Set(
//     roomStore.rooms.map((room) => room.category).filter(Boolean)
//   );
//   return Array.from(categories);
// })

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
  }
}

const joinRoom = async (roomId, privacyType) => {
  if (privacyType === 'private') {
    showModal.value = true;
    privacyCondition.value = privacyType
    roomIdToJoin.value = roomId
  } else {
    try {
      await roomStore.joinRoom(
        roomId,
        authStore.user.uid,
        authStore.user.email
      );
      router.push(`/room/${roomId}`)
    } catch (error) {
      console.error('Error joining room:', error)
    }
  }
}

const joinRoomById = async (roomId, password) => {
  try {
    await roomStore.joinRoom(
      roomId,
      authStore.user.uid,
      authStore.user.email,
      password
    );
    router.push(`/room/${roomId}`)
  } catch (error) {
    console.error('Error joining room:', error)
  }
};

onMounted(async () => {
  if (!authStore.isAuthenticated) router.push('/login')
  else await roomStore.fetchRooms()
})
onUnmounted(() => {
  off(roomsRef)
})

const filteredAndSortedRooms = computed(() => {
  let filteredRooms = roomStore.rooms.filter(
    (room) => room && typeof room === 'object'
  )
  if (searchQuery.value) {
    filteredRooms = filteredRooms.filter((room) =>
      room.id.includes(searchQuery.value)
    )
  }
  if (privacyFilter.value !== 'all') {
    filteredRooms = filteredRooms.filter(
      (room) => room.privacyType === privacyFilter.value
    )
  }
  if (categoryFilter.value !== 'all') {
    filteredRooms = filteredRooms.filter(
      (room) => room.category === categoryFilter.value
    )
  }
  return filteredRooms.sort((a, b) => {
    let comparison = 0;
    if (sortBy.value === 'createdAtOldest') {
      comparison = (a.createdAt || 0) - (b.createdAt || 0);
    } else if (sortBy.value === 'createdAt') {
      comparison = (b.createdAt || 0) - (a.createdAt || 0);
    } else {
      const aValue = a[sortBy.value] || 0
      const bValue = b[sortBy.value] || 0
      if (aValue < bValue) comparison = -1
      if (aValue > bValue) comparison = 1
    }
    return sortOrder.value === 'desc' ? comparison * -1 : comparison;
  })
})

const logout = async () => {
  try {
    await authStore.logout()
    router.push('/')
  } catch (error) {
    console.error('Logout error:', error)
  }
}
// const isDisplayed = ref(false);

// const toggleInput = () => {
//   isDisplayed.value = !isDisplayed.value;
// }

// const filter = () => {
//   alert("filtered");
// };

// const sort = () => {
//   alert("sorted search");
// };

// const emit = defineEmits(["open-room"]);

// const HostRoom = () => {
//   console.log("button clicked");
//   emit("open-room");
// };

//from homeView
// const join = () => {
//   alert("neil joined the program!");
// };

// //const title = ref("Production Design");

//function update(newTitle) {
  //title.value = newTitle;
//}
//test condition of the color background change in the private or public
//create a condition that will check if privacy is private and if it is change ref(true);
const isPrivate =ref(false);
console.log(isPrivate);

</script>




<template>
  <header>
    <nav class="nav-bar">
      <div class="nav-div">
        <div class="logo-container">
          <img
            src="../assets/images/logo/transparentlogo 1080.png"
            alt="ViCoSpaces-Logo"
            class="logo-img"
            width="100%"
            height="100%"
          >
          <span class="logo-name">ViCoSpaces</span>
        </div>
        <div class="open-sidebar">
          <div class="open-sidebar-icon">
            <img
              src="../assets/images/SVG/mobile-menu-bar.svg"
              alt="side icon"
              width="40px"
            >
          </div>
          <div class="nav-links-and-buttons">
            <div class="mobile-content">
              <button
                class="mobile-host-container"
                @click="isCreateRoomVisible = true"
              >
                <img
                  src="../assets/images/SVG/add-square-svgrepo-com white.svg"
                  alt="host-icon"
                  width="30px"
                >
              </button>
            </div>
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
                  src="../assets/images/SVG/user-svgrepo-com.svg"
                  alt="User Profile"
                  width="30px"
                >
              </div>
              <div
                v-if="isDropdownOpen"
                class="dropdown"
              >
                <RouterLink
                  to="/settings"
                  class="dropdown-item"
                >
                  Settings
                </RouterLink>
                <RouterLink
                  to="/profile"
                  class="dropdown-item"
                >
                  Profile
                </RouterLink>
                <RouterLink
                  to="/logout"
                  class="dropdown-item"
                  @click.prevent="logout"
                >
                  Log out
                </RouterLink>
              </div>
            </a>
          </div>
        </div>
      </div>
    </nav>
  </header>
  
  <main>
    <div class="search-bar">
      <div class="search">
        <img
          class="search-icon"
          src="../assets/images/SVG/search-svgrepo-com.svg"
          alt="search-icon"
          width="30px"
          @click="toggleDropdown"
        >
        <div
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
        <!-- </div> -->
        <!-- search bar input -->
        <input
          v-model="searchQuery"
          type="text"
          class="search-input"
          name="search-input"
          placeholder="Search rooms by ID"
        >
        <input
          v-model="searchQuery"
          type="text"
          class="search-input-small"
          name="search-input"
          placeholder="Search room ID"
        >
  
        <div class="filter-sort">
          <a
            href="#"
            @click.prevent="filter"
          >
            <img
              class="filter-icon"
              src="../assets/images/SVG/filters-2-svgrepo-com.svg"
              alt="filter-icon"
              width="30px"
              @click="openModal"
            >
          </a>
          <Modal
            v-if="isModalVisible"
            @close="closeModal"
          />
  
          <a
            href="#"
            @click.prevent="sort"
          >
            <img
              class="sort-icon"
              src="../assets/images/SVG/sort-vertical-svgrepo-com.svg"
              alt="sort-icon"
              width="30px"
              @click="sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'"
            >
          </a>
        </div>
      </div>
      <div class="button-container">
        <button
          class="join-btn-container"
          @click="showModal = true"
        >
          <img
            class="join-icon"
            src="../assets/images/SVG/session-join-svgrepo-com white.svg"
            alt="join-icon"
            width="30px"
          >
          <p class="join-text-hide">
            Join <span class="room-text-hide-on-small">Room</span>
          </p>
        </button>
        <button
          class="host-btn-container"
          @click="isCreateRoomVisible = true"
        >
          <img
            src="../assets/images/SVG/add-square-svgrepo-com white.svg"
            alt="host-icon"
            width="30px"
          >
          <p>Host <span class="room-text-hide-on-small">Room</span></p>
        </button>
      </div>
    </div>

    <!-- ROOM -->

    <main class="room-view-container">
      <div class="room-form">
        <div
          v-for="room in filteredAndSortedRooms"
          :key="room.id"
          class="room"
        >
          <div class="image-content">
            <div class="status-icon-wrapper">
              <div class="status-icon">
                <img
                  :src="room.privacyType === 'public' ? UnlockIcon : LockIcon"
                  alt="status icon"
                  width="32"
                  height="32"
                >
              </div>
            </div>

            <div class="room-name-container">
              <h2 class="room-name">
                {{ room.name }}
              </h2>
            </div>
          </div>
          <div class="text-content">
            <div class="bottom-content">
              <div class="host-wrapper">
                <div class="hiw">
                  <img
                    :src="hostIcon"
                    alt="status icon"
                    class="status-icon-privacy"
                    width="26"
                    height="26"
                  >
                </div>
                <p>{{ room.host?.name || 'Unknown' }}</p>
              </div>
              <div class="privacy-wrapper">
                <div class="sip">
                  <img
                    :src="lockStatusIcon"
                    alt="status icon"
                    class="status-icon-privacy"
                    width="26"
                    height="26"
                  >
                </div>
                <div class="status-background">
                  <!-- The container's background color changes based on isPrivate -->
                  <div
                    class="status-background"
                    :style="{ backgroundColor: isPrivate ? 'red' : 'lightgreen' }"
                  >
                    <p class="p-text">
                      {{ isPrivate ? 'Private' : 'Public' }}
                    </p>
                  </div>
                </div>
                <p>privacy:{{ room.privacyType }}</p>
              </div>
              <div class="joined-users">
                <i class="icon" />
              </div>
              <div class="room-join-wrapper">  
                <div class="counter">
                  <div class="capaticy-txt">
                    Capacity:
                  </div>
                  <div class="user-counter">
                    <h4>{{ room.currentUsers }} / {{ room.maxCapacity }}</h4>
                  </div>
                </div>
                <button
                  class="join-a-room-btn"
                  :disabled="room.currentUsers >= room.maxCapacity"
                  @click="joinRoom(room.id, room.privacyType)"
                >
                  {{ room.currentUsers >= room.maxCapacity ? 'Full' : 'Join' }}
                </button>           
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
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
<style scope>
  * {
    text-decoration: none;
    font-family: Arial, Helvetica, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
</style>

