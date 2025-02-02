<script setup>
import '@/assets/styles/homeView.css';
import '@/assets/styles/home-components.css';
import LockIcon from '@/assets/images/SVG/lock-password-svgrepo-com-red-large.svg';
import UnlockIcon from  '@/assets/images/SVG/lock-svgrepo-com-green-bold.svg';
import SidebarModal from '@/components/SidebarModal.vue';
import FilterModal from '@/components/FilterModal.vue';
import HostRoomModal from '@/components/HostRoomModal.vue';
import JoinRoomModal from '@/components/JoinRoomModal.vue';
import { ref, onMounted, onUnmounted, computed, watch} from 'vue';
import { ref as dbRef, off} from 'firebase/database';
import { realTimeDb as database } from '../firebase/firebaseconfig.js'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { useRoomStore } from '../stores/roomStore.js'

const showSideBarModal = ref(false)
const router = useRouter()
const authStore = useAuthStore()
const roomStore = useRoomStore()
const roomsRef = dbRef(database, 'rooms')
let showModal = ref(false)
const searchQuery = ref('')
const sortBy = ref('createdAt')
const sortOrder = ref('desc')
const privacyFilter = ref('all')
const categoryFilter = ref('all')
const privacyCondition = ref('public')
const roomIdToJoin = ref(null)
const isCreateRoomVisible = ref(false)
const isDropdownOpen = ref(false)
const toggleDropdown = () => isDropdownOpen.value = !isDropdownOpen.value
const isModalVisible = ref(false)
const openFilterModal = () => isModalVisible.value = true
const closeFilterModal = () => isModalVisible.value = false
const isJoining = ref(false)

let isCreatingRoom = false;                                                                                                                                                                                                  
 const createRoomHandler = async (roomData) => {                                                                
   if (isCreatingRoom)                                                                              
    return console.warn('Room creation is already in progress.')                                                                                                                                                                                                                                                                  
   isCreatingRoom = true;                                                                                                                                                                                                 
   try {                                                                                                        
     const roomId = await roomStore.createRoom(                                                                 
       roomData,                                                                                                
       authStore.user.uid,                                                                                      
       authStore.user.email                                                                                     
     )                                                                                                         
     router.push(`/room/${roomId}`)                                                                            
   } catch (error) {                                                                                            
     console.error('Error creating room:', error)                                                              
   } finally {                                                                                                  
     isCreatingRoom = false                                                                                    
   }                                                                                                            
 }  

const joinRoom = async (roomId, privacyType) => {
  isJoining.value = true
  if (privacyType === 'private') {
    showModal.value = true
    privacyCondition.value = privacyType
    roomIdToJoin.value = roomId
  } else {
    try {
      await roomStore.joinRoom(
        roomId,
        authStore.user.uid,
        authStore.user.email
      )
      router.push(`/room/${roomId}`)
    } catch (error) {
      console.error('Error joining room:', error)
    } finally { isJoining.value = false}
  }
}

const joinRoomById = async (roomId, password) => {
  try {
    await roomStore.joinRoom(
      roomId,
      authStore.user.uid,
      authStore.user.email,
      password
    )
    router.push(`/room/${roomId}`)
  } catch (error) {
    console.error('Error joining room:', error)
  }
}

onMounted(async () => {
  if (!authStore.isAuthenticated) router.push('/login')
  else await roomStore.fetchRooms()
  document.addEventListener('click', handleClickOutsideProfile);
})
onUnmounted(() => {
  off(roomsRef)
  document.removeEventListener('click', handleClickOutsideProfile)
})

const handleClickOutsideProfile= (event) => {
  const dropdown = document.querySelector('.dropdown');
  const profile = document.querySelector('.user-profile');
  if (dropdown && !dropdown.contains(event.target) && !profile.contains(event.target)) {
    isDropdownOpen.value = false
  }
}

const handleFilterChange = (filters) => {
  searchQuery.value = filters.searchQuery
  sortBy.value = filters.sortBy
  sortOrder.value = filters.sortOrder
  privacyFilter.value = filters.privacyFilter
  categoryFilter.value = filters.categoryFilter
}

const uniqueCategories = computed(() => {
  const categories = new Set(roomStore.rooms.map((room) => room.category).filter(Boolean))
  return Array.from(categories)
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

    if (sortBy.value === 'createdAt') 
      comparison = (b.createdAt || 0) - (a.createdAt || 0);
    else if (sortBy.value === 'createdAtOldest') {
      comparison = (a.createdAt || 0) - (b.createdAt || 0);
    } else if (sortBy.value === 'capacity') {
      const aCapacity = a.capacity || 0
      const bCapacity = b.capacity || 0
      comparison = aCapacity - bCapacity
    }

    return sortOrder.value === 'desc' ? comparison : -comparison
  })
})
watch(roomStore.rooms, (newRooms) => {
  const categories = new Set(newRooms.map((room) => room.category).filter(Boolean));
  categoryFilter.value = 'all'
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
    <div class="stars" />
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
                  <RouterLink to="/roadmap">
                    Road Map
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to="/about">
                    About
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to="/contact">
                    Contact
                  </RouterLink>
                </li>
              </ul>
            </ul>
            <div
              class="user-profile"
              @click="toggleDropdown"
            >
              <img
                src="../assets/images/SVG/user-svgrepo-com-white.svg"
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
                    to="/"
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
            src="../assets/images/SVG/session-join-svgrepo-com.svg"
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
            class="host-icon"
            src="../assets/images/SVG/add-square-svgrepo-com.svg"
            alt="host-icon"
            width="30px"
          >
          <p>Host <span class="room-text-hide-on-small">Room</span></p>
        </button>
      </div>
    </div>
    <main class="room-view-container">
      <button
        class="host-btn-mobile"
        @click="isCreateRoomVisible = true"
      >
        <img
          class="host-icon"
          src="../assets/images/SVG/add-square-svgrepo-com.svg"
          alt="host-icon"
          width="30px"
        >
      </button>
      <div class="room-form">
        <div
          v-for="room in filteredAndSortedRooms"
          :key="room.id"
          class="room"
        >
          <div class="image-content">
            <div class="status-icon-wrapper">
              <div class="status-icon">
                <div class="shape">
                  <div class="boton">
                    <img
                      :src="room.privacyType === 'public' ? UnlockIcon : LockIcon"
                      alt="status icon"
                      width="32"
                      height="32"
                    >
                  </div>
                </div>
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
                    src="../assets/images/SVG/user-alt-1-svgrepo-com.svg"
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
                    src="../assets/images/SVG/lock-svgrepo-com.svg"
                    alt="status icon"
                    class="status-icon-privacy"
                    width="26"
                    height="26"
                  >
                </div>
                <div class="status-bg-container">
                  <div
                    class="status-background"
                    :style="{ backgroundColor: room.privacyType === 'private' ? 'red' : 'limegreen' }"
                  >
                    <p class="p-text">
                      {{ room.privacyType === 'private' ? 'Private' : 'Public' }}
                    </p>
                  </div>
                </div>
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
                    <h4>{{ room.currentUsers }} / {{ room.capacity }}</h4>
                  </div>
                </div>
                <button
                  class="join-a-room-btn"
                  :disabled="room.currentUsers >= room.capacity || isJoining"
                  @click="joinRoom(room.id, room.privacyType)"
                >
                  {{ room.currentUsers >= room.capacity ? 'Full' : 'Join' }}
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
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .stars::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(#c49952, #faae33, 2px, transparent 4px),
      radial-gradient(#c49952, 1px, transparent 30px),
      radial-gradient(#c49952, #faae33, 1px, transparent 3px),
      radial-gradient(#c49952, 1px, transparent 10px),
      radial-gradient(#c49952, #faae33, 2px, transparent 4px),
      radial-gradient(#c49952, 1px, transparent 20px);
    background-size: 550px 550px, 350px 350px, 250px 250px;
    background-position: 0 0, 40px 60px, 130px 270px;
    animation: twinkle 10s linear infinite;
    z-index: -1;
  }
  @keyframes twinkle {
    0% { transform: translateY(0); }
    100% { transform: translateY(-550px); }
  }
</style>