<script setup>
//Styles
import '@/assets/styles/homeView.css';
import '@/assets/styles/home-components.css';
//imported icon
import LockIcon from '@/assets/images/SVG/lock-password-svgrepo-com-red-large.svg';
import UnlockIcon from  '@/assets/images/SVG/lock-unlocked-svgrepo-com-green.svg';
import lockStatusIcon from '@/assets/images/SVG/lock-svgrepo-com-black.svg';
import hostIcon from '@/assets/images/SVG/user-svgrepo-com-black.svg';
import SidebarModal from '@/components/SidebarModal.vue';
import FilterModal from '@/components/FilterModal.vue';
import HostRoomModal from '@/components/HostRoomModal.vue';
import JoinRoomModal from '@/components/JoinRoomModal.vue';
import { ref, onMounted, onUnmounted, computed, watch} from 'vue';
import { ref as dbRef, onValue, off, push } from 'firebase/database';
import { realTimeDb as database } from '../firebase/firebaseconfig.js'
import { useRouter, RouterLink } from 'vue-router';
import { useAuthStore } from '../stores/authStore'
import { useRoomStore } from '../stores/roomStore'



const showSideBarModal = ref(false);

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

//this should be FilterModal.vue
const isModalVisible = ref(false);

const openFilterModal = () => {
  isModalVisible.value = true;
};
const closeFilterModal = () => {
  isModalVisible.value = false;
};


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

const handleClickOutsideProfile= (event) => {
  const dropdown = document.querySelector('.dropdown');
  const profile = document.querySelector('.user-profile');
  if (dropdown && !dropdown.contains(event.target) && !profile.contains(event.target)) {
    isDropdownOpen.value = false; // Close dropdown if clicked outside
  }
};
// Register event listener on mounted, remove on unmount
onMounted(() => {
  document.addEventListener('click', handleClickOutsideProfile);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutsideProfile);
});
//Filters
const handleFilterChange = (filters) => {
  searchQuery.value = filters.searchQuery;
  sortBy.value = filters.sortBy;
  sortOrder.value = filters.sortOrder;
  privacyFilter.value = filters.privacyFilter;
  categoryFilter.value = filters.categoryFilter;
};

const uniqueCategories = computed(() => {
  const categories = new Set(roomStore.rooms.map((room) => room.category).filter(Boolean));
  return Array.from(categories);
});

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

    // Sort by creation date or capacity based on user selection
    if (sortBy.value === 'createdAt') {
      // Sort by latest (descending)
      comparison = (b.createdAt || 0) - (a.createdAt || 0);
    } else if (sortBy.value === 'createdAtOldest') {
      // Sort by oldest (ascending)
      comparison = (a.createdAt || 0) - (b.createdAt || 0);
    } else if (sortBy.value === 'capacity') {
      const aCapacity = a.capacity || 0;
      const bCapacity = b.capacity || 0;
      comparison = aCapacity - bCapacity;
    }

    return sortOrder.value === 'desc' ? comparison : -comparison;
  });
});

// Watch for room creation and update categories
watch(roomStore.rooms, (newRooms) => {
  // Update unique categories when new rooms are created
  const categories = new Set(newRooms.map((room) => room.category).filter(Boolean));
  categoryFilter.value = 'all'; // Reset category filter to ensure dynamic updates
});

const logout = async () => {
  try {
    await authStore.logout()
    router.push('/')
  } catch (error) {
    console.error('Logout error:', error)
  }
}
</script>




<template>
  <header>
    <nav class="nav-bar">
      <div class="nav-div">
        <div class="logo-container">
          <img
            src="../assets/images/logo/Logo.png"
            alt="ViCoSpaces-Logo"
            class="logo-img"
            width="100px"
            height="100px"
          >
          <span class="logo-name" />
        </div>
        <div class="open-sidebar">
          <div class="open-sidebar-icon">
            <img
              src="../assets/images/SVG/mobile-menu-bar.svg"
              alt="side icon"
              width="40px"
              class="open-sidemodal-btn"
              @click="showSideBarModal = true"
            >
            <!-- Pass down the close function as a prop -->
            <SidebarModal
              v-if="showSideBarModal"
              @close="showSideBarModal = false"
            />
          </div>
          <div class="nav-links-and-buttons">
            <div class="mobile-content">
              <button
                class="mobile-host-container"
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

            <div
              class="user-profile"
              @click="toggleDropdown"
            >
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
              <div class="user-option-container">
                <div class="settings">
                  <img
                    src="../assets/images/SVG/settings-svgrepo-com.svg"
                    alt="status icon"
                    class="setting-icon"
                    width="20"
                    height="20"
                  >
                  <RouterLink
                    to="/settings"
                    class="dropdown-item 1"
                  >
                    Settings
                  </RouterLink>
                </div>
                <div class="profile">
                  <img
                    src="../assets/images/SVG/user-svgrepo-com.svg"
                    alt="status icon"
                    class="profile-icon"
                    width="20"
                    height="20"
                  >
                  <RouterLink
                    to="/profile"
                    class="dropdown-item 2"
                  >
                    Profile
                  </RouterLink>
                </div>
                <div class="logout">
                  <img
                    src="../assets/images/SVG/log-out-svgrepo-com.svg"
                    alt="status icon"
                    class="logout-icon"
                    width="20"
                    height="20"
                  > 
                  <RouterLink
                    to="/logout"
                    class="dropdown-item 3"
                    @click.prevent="logout"
                  >
                    Log out
                  </RouterLink>
                </div>
              </div>
            </div>
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
        <!-- to fix asap -->
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
              @click="openFilterModal"
            >
          </a>
          <FilterModal
            v-if="isModalVisible"
            :available-categories="uniqueCategories"
            @close="closeFilterModal"
            @filter-change="handleFilterChange"
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
                <div class="status-bg-container">
                  <!-- The container's background color changes based on isPrivate -->
                  <div
                    class="status-background"
                    :style="{ backgroundColor: room.privacyType === 'private' ? 'red' : 'lightgreen' }"
                  >
                    <p class="p-text">
                      {{ room.privacyType === 'private' ? 'Private' : 'Public' }}
                    </p>
                  </div>
                </div>
                <!-- <p>privacy: {{ room.privacyType }}</p>  -->
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

