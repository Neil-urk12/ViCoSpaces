<script setup>
//Styles
import '@/assets/styles/homeView.css';
import '@/assets/styles/home-components.css';
//imported icon
import LockIcon from '@/assets/images/SVG/lock-password-svgrepo-com-red-large.svg';
import UnlockIcon from  '@/assets/images/SVG/lock-svgrepo-com-green-bold.svg';
import SidebarModal from '@/components/SidebarModal.vue';
import FilterModal from '@/components/FilterModal.vue';
import HostRoomModal from '@/components/HostRoomModal.vue';
import JoinRoomModal from '@/components/JoinRoomModal.vue';
import { ref, onMounted, onUnmounted, computed, watch} from 'vue';
import { ref as dbRef, onValue, off, push } from 'firebase/database';
import { realTimeDb as database } from '../firebase/firebaseconfig.js'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { useRoomStore } from '../stores/roomStore'

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
const openFilterModal = () => {
  isModalVisible.value = true
}
const closeFilterModal = () => isModalVisible.value = false


let isCreatingRoom = false;                                                                                                                                                                                                  
 const createRoomHandler = async (roomData) => {                                                                
   if (isCreatingRoom) {                                                                                        
     console.warn('Room creation is already in progress.');                                                     
     return;                                                                                                    
   }                                                                                                                                                                                                                         
   isCreatingRoom = true;                                                                                                                                                                                                  
   try {                                                                                                        
     const roomId = await roomStore.createRoom(                                                                 
       roomData,                                                                                                
       authStore.user.uid,                                                                                      
       authStore.user.email                                                                                     
     );                                                                                                         
     router.push(`/room/${roomId}`);                                                                            
   } catch (error) {                                                                                            
     console.error('Error creating room:', error);                                                              
   } finally {                                                                                                  
     isCreatingRoom = false;                                                                                    
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
    isDropdownOpen.value = false
  }
}
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
    <div id="stars" />
    <div id="stars2" />
    <div id="stars3" />
    <div id="stars4" />
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
                  :disabled="room.currentUsers >= room.capacity"
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
  #stars, #starts2, #starts3{
    overflow: hidden;
  }
  
  #stars {
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow: 117px 1613px #c49952, 1488px 635px #c49952, 944px 914px #c49952, 647px 277px #c49952, 1792px 1205px #c49952, 656px 1517px #c49952, 820px 1839px #c49952, 1153px 1400px #c49952, 870px 13px #c49952, 550px 702px #c49952, 1155px 1056px #c49952, 88px 1709px #c49952, 1450px 1090px #c49952, 1929px 457px, 1731px 1759px #c49952, 1378px 1390px #c49952, 1815px 1364px #c49952, 960px 270px #c49952, 1343px 427px #c49952, 1963px 1045px #c49952, 119px 1136px #c49952;
    -webkit-animation: animStar 50s linear infinite;
    -moz-animation: animStar 50s linear infinite;
    -ms-animation: animStar 50s linear infinite;
    animation: animStar 50s linear infinite;
  }
  
  #stars:after {
    content: " ";
    position: absolute;
    top: 2000px;
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow: 117px 1613px #c49952, 1488px 635px #c49952, 944px 914px #c49952, 647px 277px #c49952, 1792px 1205px #c49952, 656px 1517px #c49952, 820px 1839px #c49952, 1153px 1400px #c49952, 870px 13px #c49952, 550px 702px #c49952, 1155px 1056px #c49952, 88px 1709px #c49952, 1450px 1090px #c49952, 1929px 457px #c49952, 1390px 905px #c49952, 1771px 269px #c49952, 1741px 669px #c49952, 432px 64px #c49952, 563px 996px #c49952, 1918px 1873px #c49952, 1845px 1211px #c49952, 231px 1503px #c49952,#c49952, 1290px 1119px #c49952, 137px 1793px #c49952, 1052px 1470px #c49952, 1561px 226px #c49952, 1156px 402px #c49952, 709px 693px #c49952, 1040px 1911px #c49952, 1624px 1115px #c49952, 551px 475px #c49952, 416px 1090px #c49952, 1183px 451px #c49952, 58px 765px #c49952, 743px 1016px #c49952, 198px 369px #c49952, 1645px 1503px #c49952, 997px 22px #c49952, 1447px 1323px #c49952, 379px 883px #c49952, 1171px 1195px #c49952, 919px 133px #c49952, 1400px 517px #c49952, 725px 804px #c49952, 1600px 699px #c49952, 357px 581px #c49952, 266px 1713px #c49952, 848px 1749px #c49952, 1963px 1045px #c49952, 119px 1136px #c49952;
  }
  
  #stars2 {
    width: 2px;
    height: 2px;
    background: transparent;
    box-shadow: 1117px 1306px #c49952, 1078px 1783px #c49952, 1179px 1085px #c49952, 1145px 920px #c49952, 422px 1233px #c49952, 387px 98px #c49952, 1153px 637px #c49952, 1084px 782px #c49952, 476px 453px #c49952, 926px 1306px #c49952, 60px 1086px #c49952, 753px 1575px #c49952, 272px 1684px #c49952, 1285px 750px #c49952, 1416px 1327px, 1184px 1057px #c49952, 835px 451px #c49952, 896px 594px #c49952, 35px 893px #c49952, 895px 542px #c49952, 706px 225px #c49952, 56px 1040px #c49952, 1954px 108px #c49952, 1439px 1423px #c49952, 26px 1881px #c49952, 802px 1564px #c49952, 273px 708px #c49952, 40px 31px #c49952, 859px 108px #c49952;
    -webkit-animation: animStar 100s linear infinite;
    -moz-animation: animStar 100s linear infinite;
    -ms-animation: animStar 100s linear infinite;
    animation: animStar 100s linear infinite;
  }
  
  #stars2:after {
    content: " ";
    position: absolute;
    top: 2000px;
    width: 2px;
    height: 2px;
    background: transparent;
    box-shadow: 1117px 1306px #c49952, 1078px 1783px #c49952, 1179px 1085px #c49952, 1145px 920px #c49952, 422px 1233px #c49952, 387px 98px #c49952, 1153px 637px #c49952, 1084px 782px #c49952, 476px 453px #c49952, 926px 1306px #c49952, 60px 1086px #c49952, 753px 1575px #c49952, 272px 1684px #c49952, 1285px 750px #c49952, 1416px 1327px #c49952, 1931px 473px #c49952, 736px 1395px #c49952, 1816px 763px #c49952, 438px 879px #c49952, 665px 1902px #c49952, 1341px 677px #c49952, 1404px 1073px #c49952, 100px 597px #c49952, 357px 1689px #c49952, 1044px 1342px #c49952, 1954px 502px #c49952, 1192px 1308px #c49952, 540px 1239px #c49952, 1360px 552px #c49952, 89px 752px #c49952, 659px 1253px #c49952, 62px 517px #c49952, 1375px 1705px #c49952, 1343px 1511px #c49952, 1659px 1922px #c49952, 1560px, 1184px 1057px #c49952, 835px 451px #c49952, 896px 594px #c49952, 35px 893px #c49952, 895px 542px #c49952, 706px 225px #c49952, 56px 1040px #c49952, 1954px 108px #c49952, 1439px 1423px #c49952, 26px 1881px #c49952, 802px 1564px #c49952, 273px 708px #c49952, 40px 31px #c49952, 859px 108px #c49952;
  }
  
  #stars3 {
    width: 3px;
    height: 3px;
    background: transparent;
    box-shadow: 940px 1360px #c49952, 1071px 539px #c49952, 1710px 1414px #c49952, 836px 299px #c49952, 1944px 1420px #c49952, 253px 1449px #c49952, 1257px 1250px #c49952, 1588px 1830px #c49952, 1077px 1204px #c49952, 273px 1081px #c49952, 1993px 766px #c49952, 1808px 479px #c49952, 917px 263px #c49952, 663px 1820px #c49952, 342px 1988px #c49952, 727px 1250px #c49952, 636px 1666px #c49952, 692px 1112px #c49952, 248px 1211px #c49952, 1422px 1121px #c49952, 881px 46px #c49952, 1531px 1977px #c49952, 1643px 1023px #c49952, 684px 1071px #c49952, 1142px 1873px #c49952, 292px 1313px #c49952, 256px 1237px #c49952, 89px 912px #c49952, 964px 1783px #c49952, 877px 760px #c49952, 1641px 1474px #c49952, 1492px 24px #c49952, 1776px 1642px #c49952, 183px 602px #c49952, 1998px 62px #c49952, 1560px 367px #c49952, 1333px 995px #c49952, 704px 1815px #c49952, 1809px 712px #c49952, 1503px 288px #c49952, 630px 556px #c49952, 1715px 125px #c49952, 353px 1878px #c49952, 975px 333px #c49952, 1740px 1409px #c49952, 1341px 1871px #c49952, 1279px 1064px #c49952, 169px 874px #c49952, 161px 528px #c49952, 1671px 1669px #c49952, 169px 632px #c49952, 547px 1724px #c49952, 1904px 110px #c49952, 679px 1670px #c49952, 196px 123px #c49952, 786px 871px #c49952, 1840px 324px #c49952, 356px 967px #c49952, 61px 549px #c49952, 99px 677px #c49952, 1719px 87px #c49952, 1713px 1990px #c49952, 1717px 1358px #c49952, 108px 1187px #c49952, 51px 869px #c49952, 1461px 902px #c49952, 1034px 891px #c49952, 962px 1881px #c49952, 1723px 595px #c49952, 479px 901px #c49952, 1546px 1823px #c49952, 285px 1208px #c49952, 1056px 347px #c49952, 261px 988px #c49952, 466px 990px #c49952, 1657px 648px #c49952, 1249px 933px #c49952, 1552px 1555px #c49952, 147px 62px #c49952, 292px 1157px #c49952, 1816px 423px #c49952, 1714px 757px #c49952, 1036px 961px #c49952, 1955px 710px #c49952, 1842px 516px #c49952, 479px 1870px #c49952, 1579px 1445px #c49952, 1225px 1309px #c49952, 1965px 566px #c49952, 1575px 1072px #c49952, 923px 329px #c49952, 651px 1514px #c49952, 865px 1100px #c49952, 782px 1873px #c49952, 115px 299px #c49952, 14px 1668px #c49952, 1666px 1817px #c49952, 1096px 1068px #c49952, 1462px 742px #c49952, 1384px 1750px #c49952;
    -webkit-animation: animStar 150s linear infinite;
    -moz-animation: animStar 150s linear infinite;
    -ms-animation: animStar 150s linear infinite;
    animation: animStar 150s linear infinite;
  }
  
  #stars3:after {
    content: " ";
    position: absolute;
    top: 2000px;
    width: 3px;
    height: 3px;
    background: transparent;
    box-shadow: 940px 1360px #c49952, 1071px 539px #c49952, 1710px 1414px #c49952, 836px 299px #c49952, 1944px 1420px #c49952, 253px 1449px #c49952, 1257px 1250px #c49952, 1588px 1830px #c49952, 1077px 1204px #c49952, 273px 1081px #c49952, 1993px 766px #c49952, 1808px 479px #c49952, 917px 263px #c49952, 663px 1820px #c49952, 342px 1988px #c49952, 727px 1250px #c49952, 636px 1666px #c49952, 692px 1112px #c49952, 248px 1211px #c49952, 1422px 1121px, 89px 912px #c49952, 964px 1783px #c49952, 877px 760px #c49952, 1641px 1474px #c49952, 1492px 24px #c49952, 1776px 1642px #c49952, 183px 602px #c49952, 1998px 62px #c49952, 1560px 367px #c49952, 1333px 995px #c49952, 704px 1815px #c49952, 1809px 712px #c49952, 1503px 288px #c49952, 1384px 1750px #c49952;
  }
  
  #stars4 {
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow: 233px 1976px #c49952, 1196px 1119px #c49952, 646px 740px #c49952, 335px 645px #c49952, 1119px 1452px #c49952, 176px 1870px #c49952, 639px 1711px #c49952, 647px 1388px #c49952, 1516px 1108px #c49952, 464px 66px #c49952, 331px 344px #c49952, 772px 1189px #c49952, 1516px 1850px #c49952, 1500px 1463px #c49952, 1275px 876px #c49952, 1107px 645px #c49952, 977px 478px #c49952, 583px 1179px #c49952, 284px 395px #c49952, 1220px 461px #c49952, 632px 158px #c49952;
    -webkit-animation: animStar 600s linear infinite;
    -moz-animation: animStar 600s linear infinite;
    -ms-animation: animStar 600s linear infinite;
    animation: animStar 600s linear infinite;
  }
  
  #stars4:after {
    content: " ";
    position: absolute;
    top: 2000px;
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow: 233px 1976px #c49952, 1196px 1119px #c49952, 646px 740px #c49952, 335px 645px #c49952, 1119px 1452px #c49952, 176px 1870px #c49952, 639px 1711px #c49952, 647px 1388px #c49952, 1516px 1108px #c49952, 464px 66px #c49952, 331px 344px #c49952, 772px 1189px #c49952, 1516px 1850px #c49952, 1500px 1463px #c49952, 1275px 876px #c49952, 1107px 645px #c49952, 977px 478px #c49952, 583px 1179px #c49952, 284px 395px #c49952, 1220px 461px #c49952, 1160px 249px #c49952, 196px 865px #c49952, 670px 1915px #c49952, 1449px 382px #c49952, 1191px 546px #c49952, 1329px 605px #c49952, 1945px 632px 158px #c49952;
  }
  
  @-webkit-keyframes animStar {
    from {
        -webkit-transform: translateY(0px);
    }
    to {
        -webkit-transform: translateY(-2000px);
    }
  }
  
  @-moz-keyframes animStar {
    from {
        -moz-transform: translateY(0px);
    }
    to {
        -moz-transform: translateY(-2000px);
    }
  }
  
  @-ms-keyframes animStar {
    from {
        -ms-transform: translateY(0px);
    }
    to {
        -ms-transform: translateY(-2000px);
    }
  }
  
  @keyframes animStar {
    from {
        transform: translateY(0px);
    }
    to {
        transform: translateY(-2000px);
    }
  }
</style>