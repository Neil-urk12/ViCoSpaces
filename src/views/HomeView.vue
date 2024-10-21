<script setup>
/*we combined the home-component to the main HomeView so I separated the two css in order to differentiate the two styles that we used*/
import '../assets/styles/home-components.css';
import '../assets/styles/homeView.css';
import '../assets/styles/user-profile-settings.css';
import { ref } from "vue";
// import myHome from "@/components/home-components.vue";
import createRoom from "@/components/create-room.vue";

//from home-components
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
