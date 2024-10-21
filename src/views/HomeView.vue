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

const isDisplayed = ref(false);

const toggleInput = () => {
  isDisplayed.value = !isDisplayed.value;
}

const filter = () => {
  alert("filtered");
};

const sort = () => {
  alert("sorted search");
};

const emit = defineEmits(["open-room"]);

const HostRoom = () => {
  console.log("button clicked");
  emit("open-room");
};

//from homeView
const join = () => {
  alert("neil joined the program!");
};

const isCreateRoomVisible = ref(false);
//const title = ref("Production Design");

//function update(newTitle) {
  //title.value = newTitle;
//}

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
        </div>
        <div class="nav-links-and-buttons">
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
          <div class="user-dropdown">
            <div class="user-profile">
              <img
                src="../assets/images/UserProfileStocks/megan.jpg"
                alt="User Profile"
              >
            </div>
          </div>
        </div>
      </div>
    </nav>
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
    <div class="searchbar-container" />
    <div class="search-bar">
      <div class="search">
        <img
          class="search-icon"
          src="../assets/images/SVG/search-svgrepo-com.svg"
          alt="search-icon"
          width="30px"
        >
        <!-- search bar input -->
        <input
          type="text"
          class="search-input"
          name="search-input"
          placeholder="Search here..."
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
            >
          </a>

          <a
            href="#"
            @click.prevent="sort"
          >
            <img
              class="sort-icon"
              src="../assets/images/SVG/sort-vertical-svgrepo-com.svg"
              alt="sort-icon"
              width="30px"
            >
          </a>
        </div>
      </div>

      <div class="button-container">
        <div
          class="link-container"
          :style="{display: isDisplayed ? 'block' : 'none' }"
        >
          <div class="link-align">
            <img
              src="../assets/images/SVG/add-link-alt-1-svgrepo-com.svg"
              alt="add-link-icon"
              width="20px"
            >
            <input
              id="link-input"
              type="text"
              placeholder="Enter Link"
            >
          </div>
        </div>

        <button
          class="join-btn-container"
          @click="toggleInput"
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
          @click="HostRoom"
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

    <!-- create a category bar below the search bar-->
    <div class="category">
      <div class="category-container">
        <ul>   
          <li><h5>Gaming</h5></li>
          <li><h5>Gaming</h5></li>
          <li><h5>Gaming</h5></li>
          <li class="hide-on-small-3">
            <h5>Gaming</h5>
          </li>
          <li class="hide-on-small-3">
            <h5>Gaming</h5>
          </li>
          <li class="hide-on-small-2">
            <h5>Gaming</h5>
          </li>
          <li class="hide-on-small-2">
            <h5>Gaming</h5>
          </li>
          <li class="hide-on-small-1">
            <h5>Gaming</h5>
          </li>
          <li class="hide-on-small-1">
            <h5>Gaming</h5>
          </li>
        </ul>
      </div>
    </div>
    <!-- <myHome @open-room="isCreateRoomVisible = true" />
    <categoryBar @changetitle="update" /> -->
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
              <div class="room-name-container">
                <h2>Production Design</h2>
              </div>
              <div class="joined-and-button-container">
                <div class="joined-users">
                  <div class="user-wrapper">
                    <div id="user-1-container ">
                      <img
                        class="user-1"
                        src="../assets/images/UserProfileStocks/megan.jpg"
                        alt=""
                      >
                    </div>
                    <div id="user-2-container ">
                      <img
                        class="user-2"
                        src="../assets/images/UserProfileStocks/megan.jpg"
                        alt=""
                      >
                    </div>
                    <div id="user-3-container ">
                      <img
                        class="user-3"
                        src="../assets/images/UserProfileStocks/megan.jpg"
                        alt=""
                      >
                    </div>
                    <div id="user-count-container">
                      <div class="user-count">
                        <p class="number-count">
                          10+
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="join-btn-container">
                  <button
                    class="join-btn"
                    @:click="join"
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>
          <createRoom
            :is-visible="isCreateRoomVisible"
            @close-room="isCreateRoomVisible = false"
          />
          <div class="room">
            <div class="image-content">
              <div class="hosting-container">
                <div class="host-profile" />
              </div>
            </div>
            <div class="text-content">
              <div class="room-name-container">
                <h2>Production Design</h2>
              </div>
              <div class="joined-and-button-container">
                <div class="joined-users">
                  <div class="user-wrapper">
                    <div id="user-1-container ">
                      <img
                        class="user-1"
                        src="../assets/images/UserProfileStocks/megan.jpg"
                        alt=""
                      >
                    </div>
                    <div id="user-2-container ">
                      <img
                        class="user-2"
                        src="../assets/images/UserProfileStocks/megan.jpg"
                        alt=""
                      >
                    </div>
                    <div id="user-3-container ">
                      <img
                        class="user-3"
                        src="../assets/images/UserProfileStocks/megan.jpg"
                        alt=""
                      >
                    </div>
                    <div id="user-count-container">
                      <div class="user-count">
                        <p class="number-count">
                          10+
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="join-btn-container">
                  <button
                    class="join-btn"
                    @:click="join"
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>
          <createRoom
            :is-visible="isCreateRoomVisible"
            @close-room="isCreateRoomVisible = false"
          />
          <div class="room">
            <div class="image-content">
              <div class="hosting-container">
                <div class="host-profile" />
              </div>
            </div>
            <div class="text-content">
              <div class="room-name-container">
                <h2>Production Design</h2>
              </div>
              <div class="joined-and-button-container">
                <div class="joined-users">
                  <div class="user-wrapper">
                    <div id="user-1-container ">
                      <img
                        class="user-1"
                        src="../assets/images/UserProfileStocks/megan.jpg"
                        alt=""
                      >
                    </div>
                    <div id="user-2-container ">
                      <img
                        class="user-2"
                        src="../assets/images/UserProfileStocks/megan.jpg"
                        alt=""
                      >
                    </div>
                    <div id="user-3-container ">
                      <img
                        class="user-3"
                        src="../assets/images/UserProfileStocks/megan.jpg"
                        alt=""
                      >
                    </div>
                    <div id="user-count-container">
                      <div class="user-count">
                        <p class="number-count">
                          10+
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="join-btn-container">
                  <button
                    class="join-btn"
                    @:click="join"
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>
          <createRoom
            :is-visible="isCreateRoomVisible"
            @close-room="isCreateRoomVisible = false"
          />
          <div class="room">
            <div class="image-content">
              <div class="hosting-container">
                <div class="host-profile" />
              </div>
            </div>
            <div class="text-content">
              <div class="room-name-container">
                <h2>Production Design</h2>
              </div>
              <div class="joined-and-button-container">
                <div class="joined-users">
                  <div class="user-wrapper">
                    <div id="user-1-container ">
                      <img
                        class="user-1"
                        src="../assets/images/UserProfileStocks/megan.jpg"
                        alt=""
                      >
                    </div>
                    <div id="user-2-container ">
                      <img
                        class="user-2"
                        src="../assets/images/UserProfileStocks/megan.jpg"
                        alt=""
                      >
                    </div>
                    <div id="user-3-container ">
                      <img
                        class="user-3"
                        src="../assets/images/UserProfileStocks/megan.jpg"
                        alt=""
                      >
                    </div>
                    <div id="user-count-container">
                      <div class="user-count">
                        <p class="number-count">
                          10+
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="join-btn-container">
                  <button
                    class="join-btn"
                    @:click="join"
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>
          <createRoom
            :is-visible="isCreateRoomVisible"
            @close-room="isCreateRoomVisible = false"
          />
          <div class="room">
            <div class="image-content">
              <div class="hosting-container">
                <div class="host-profile" />
              </div>
            </div>
            <div class="text-content">
              <div class="room-name-container">
                <h2>Production Design</h2>
              </div>
              <div class="joined-and-button-container">
                <div class="joined-users">
                  <div class="user-wrapper">
                    <div id="user-1-container ">
                      <img
                        class="user-1"
                        src="../assets/images/UserProfileStocks/megan.jpg"
                        alt=""
                      >
                    </div>
                    <div id="user-2-container ">
                      <img
                        class="user-2"
                        src="../assets/images/UserProfileStocks/megan.jpg"
                        alt=""
                      >
                    </div>
                    <div id="user-3-container ">
                      <img
                        class="user-3"
                        src="../assets/images/UserProfileStocks/megan.jpg"
                        alt=""
                      >
                    </div>
                    <div id="user-count-container">
                      <div class="user-count">
                        <p class="number-count">
                          10+
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="join-btn-container">
                  <button
                    class="join-btn"
                    @:click="join"
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>
          <createRoom
            :is-visible="isCreateRoomVisible"
            @close-room="isCreateRoomVisible = false"
          />
          <div class="room">
            <div class="image-content">
              <div class="hosting-container">
                <div class="host-profile" />
              </div>
            </div>
            <div class="text-content">
              <div class="room-name-container">
                <h2>Production Design</h2>
              </div>
              <div class="joined-and-button-container">
                <div class="joined-users">
                  <div class="user-wrapper">
                    <div id="user-1-container ">
                      <img
                        class="user-1"
                        src="../assets/images/UserProfileStocks/megan.jpg"
                        alt=""
                      >
                    </div>
                    <div id="user-2-container ">
                      <img
                        class="user-2"
                        src="../assets/images/UserProfileStocks/megan.jpg"
                        alt=""
                      >
                    </div>
                    <div id="user-3-container ">
                      <img
                        class="user-3"
                        src="../assets/images/UserProfileStocks/megan.jpg"
                        alt=""
                      >
                    </div>
                    <div id="user-count-container">
                      <div class="user-count">
                        <p class="number-count">
                          10+
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="join-btn-container">
                  <button
                    class="join-btn"
                    @:click="join"
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>
          <createRoom
            :is-visible="isCreateRoomVisible"
            @close-room="isCreateRoomVisible = false"
          />
          <div class="room">
            <div class="image-content">
              <div class="hosting-container">
                <div class="host-profile" />
              </div>
            </div>
            <div class="text-content">
              <div class="room-name-container">
                <h2>Production Design</h2>
              </div>
              <div class="joined-and-button-container">
                <div class="joined-users">
                  <div class="user-wrapper">
                    <div id="user-1-container ">
                      <img
                        class="user-1"
                        src="../assets/images/UserProfileStocks/megan.jpg"
                        alt=""
                      >
                    </div>
                    <div id="user-2-container ">
                      <img
                        class="user-2"
                        src="../assets/images/UserProfileStocks/megan.jpg"
                        alt=""
                      >
                    </div>
                    <div id="user-3-container ">
                      <img
                        class="user-3"
                        src="../assets/images/UserProfileStocks/megan.jpg"
                        alt=""
                      >
                    </div>
                    <div id="user-count-container">
                      <div class="user-count">
                        <p class="number-count">
                          10+
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="join-btn-container">
                  <button
                    class="join-btn"
                    @:click="join"
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>
          <createRoom
            :is-visible="isCreateRoomVisible"
            @close-room="isCreateRoomVisible = false"
          />
          <div class="room">
            <div class="image-content">
              <div class="hosting-container">
                <div class="host-profile" />
              </div>
            </div>
            <div class="text-content">
              <div class="room-name-container">
                <h2>Production Design</h2>
              </div>
              <div class="joined-and-button-container">
                <div class="joined-users">
                  <div class="user-wrapper">
                    <div id="user-1-container ">
                      <img
                        class="user-1"
                        src="../assets/images/UserProfileStocks/megan.jpg"
                        alt=""
                      >
                    </div>
                    <div id="user-2-container ">
                      <img
                        class="user-2"
                        src="../assets/images/UserProfileStocks/megan.jpg"
                        alt=""
                      >
                    </div>
                    <div id="user-3-container ">
                      <img
                        class="user-3"
                        src="../assets/images/UserProfileStocks/megan.jpg"
                        alt=""
                      >
                    </div>
                    <div id="user-count-container">
                      <div class="user-count">
                        <p class="number-count">
                          10+
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="join-btn-container">
                  <button
                    class="join-btn"
                    @:click="join"
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>
          <createRoom
            :is-visible="isCreateRoomVisible"
            @close-room="isCreateRoomVisible = false"
          />
          <div class="room">
            <div class="image-content">
              <div class="hosting-container">
                <div class="host-profile" />
              </div>
            </div>
            <div class="text-content">
              <div class="room-name-container">
                <h2>Production Design</h2>
              </div>
              <div class="joined-and-button-container">
                <div class="joined-users">
                  <div class="user-wrapper">
                    <div id="user-1-container ">
                      <img
                        class="user-1"
                        src="../assets/images/UserProfileStocks/megan.jpg"
                        alt=""
                      >
                    </div>
                    <div id="user-2-container ">
                      <img
                        class="user-2"
                        src="../assets/images/UserProfileStocks/megan.jpg"
                        alt=""
                      >
                    </div>
                    <div id="user-3-container ">
                      <img
                        class="user-3"
                        src="../assets/images/UserProfileStocks/megan.jpg"
                        alt=""
                      >
                    </div>
                    <div id="user-count-container">
                      <div class="user-count">
                        <p class="number-count">
                          10+
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="join-btn-container">
                  <button
                    class="join-btn"
                    @:click="join"
                  >
                    Join
                  </button>
                </div>
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

