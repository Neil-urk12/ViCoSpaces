<script setup>
function notifyJoin() {
  alert("hello babe, I love you");
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
</script>

<template>
  <header>
    <nav class="nav-bar">
      <div class="nav-div">
        <div class="logo-container">
          <img
            src="../images/logo/transparentlogo 1080.png"
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
              src="../images/SVG/mobile-menu-bar.svg"
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
    <div class="searchbar-container" />
    <div class="search-bar">
      <div class="search">
        <img
          class="search-icon"
          src="../images/SVG/search-svgrepo-com.svg"
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
            >
          </a>
        </div>
      </div>

      <div class="button-container">
        <button
          class="join-btn-container"
          @click="notifyJoin"
        >
          <img
            class="join-icon"
            src="../images/SVG/session-join-svgrepo-com white.svg"
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
            src="../images/SVG/add-square-svgrepo-com white.svg"
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
  </main>
</template>

<style scoped>
* {
  text-decoration: none;
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.nav-bar {
  position: sticky;
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

.mobile-buttons {
  display: none;
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
  content: "";
  position: absolute;
  left: 50%;
  bottom: -2px;
  width: 0;
  height: 3px;
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
.open-sidebar-icon {
  display: none;
  margin-right: 20px;
}

.search-bar {
  position: relative;
  display: flex;
  justify-content: space-evenly;
  margin-top: 8px;

}

.search {
  --padding: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: var(--padding);
  border-radius: 12px;
  background: #f6f6f6;
  width: 75vw;
  max-width: 75%;
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

.search-icon{
  cursor: none;
}
.sort-icon,
.filter-icon {

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
  justify-content: flex-start;
  gap: 20px;
  width: 18%;
}

.join-btn-container, .host-btn-container{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 5px;
}

button {
  background-color: #2d8eff;
  color: white;
  border: none;
  border-radius: 12px;
  width: 40%;
  height: 50px;
  font-size: 1em;
  font-weight: bold;

  cursor: pointer;
}

/* category */
.category {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 6px;
  margin-top: 6px;
}

.category-container {
  display: flex;
  justify-content: flex-start;
  position: relative;
  width: 95%;
  max-width: 100%;
  height: 2rem;
}

.category-container ul {
  position: relative;
  display: flex;
  list-style: none;
  gap: 23px;
}

.category-container li {
  position: relative;
  flex: 1 0 10px;
  color: rgb(43, 43, 43);
  font-size: 1.2em;
  font-weight: bold;
  text-align: center;
  align-content: center;
  width: 75px;
  border: 1px solid rgb(122, 122, 122);
  border-radius: 6px;

  cursor: pointer;
}

@media (max-width: 1339px) {

  .search-bar{
    justify-content: space-around
  }
  .search-container {
    display: flex;
    align-items: center;
    justify-content: space-between; /* Ensures space between search and button */
    width: 100%; /* Adjust as needed */
    max-width: 600px; /* Adjust as needed */
    margin: 0 auto; /* Center the container */
    
}

.search {
    border: none;
    flex-grow: 1; /* Allows the search bar to take up available space */
    padding: 10px;
    border-radius: 12px;
    margin-right: 10px; /* Space between search bar and button */
}

.button-container {
    flex-shrink: 0; /* Prevents the button from shrinking */
}

.search-button {
    padding: 10px 20px;
    border-radius: 12px;
    background-color: #007BFF;
    color: white;
    border: none;
    cursor: pointer;
}
  
}
@media (max-width: 1320px) {

  .room-text-hide-on-small{
    display: none;
  }
  
}

@media (max-width: 1014px) {


  .hide-on-small-1 {
    display: none;
  }
  
}
@media (max-width: 940px) {
  .host-btn-container p, .join-btn-container p{
    display: none;
  }
}
@media (max-width: 794px) {
  .nav-bar {
    background: #2d8eff;
    font-family: Calibri, sans-serif;
    align-items: center;
    height: 70px;
    padding: 15px 40px 0px 40px;
  }
  .logo-container img {
    display: none;
  }
  .logo-container {
    display: flex;
    align-items: center;
    font-size: clamp(30px, 0.2em, 100px);
    font-weight: 600;
    color: white;
  }


  

}
@media (max-width: 725px) {
  .nav-bar {
    padding: 0px 0px 0px 0px;
    display: flex;
  }
  .nav-div {
    width: 100%;
    padding: 0px 0px 0px 20px;
  }
  .nav-links-and-buttons {
    display: none;
    z-index: 99;
    flex-direction: column;
    background-color: rebeccapurple;
    height: 100vh;
    justify-content: center;
    width: 30%;
    padding: 100px 0px 0px 0px;
  }
  .pages-container {
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    gap: 20px;
  }
  .pages-container li {
    display: flex;
    justify-content: center;
    padding: 10px;
    width: 50%;
  }
  #user-profile {
    display: none;
  }

  .open-sidebar-icon {
    display: block;
  }

  .close-sidebar-btn {
    display: none;
  }

  .hide-on-small-2{
    display: none;
  }
}

@media (max-width: 663px) {
  .nav-bar {
    background-color: #2d8eff;
    width: 100%;
  }
}
@media (max-width: 375px) {

  .nav-bar {
    position: sticky;
    background: #2d8eff;
    font-family: Calibri, sans-serif;
    align-items: center;
    height: 70px;

  }
  
  .nav-div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .mobile-buttons {
    display: flex;
  }
  
  .logo-container {
    
  }
  
  .logo-img {
    
  }
  
  .nav-links-and-buttons {
    
  }
  
  .pages-container {
   
  }
  
  .pages-container li a {
    
  }
  
  .pages-container li a::after {
  
  }
  
  .pages-container li a:hover::after {
    
  }
  
  .user-profile {
    
  }
  .open-sidebar-icon {
    
  }
  
  .search-bar {
    display: flex;
    justify-content: flex-start;
    height: 40px;
    border-radius: 6px;
    margin-top: 8px;

  }
  
  .search {
    display: flex;
    width: 100%;
    
    
  }
  
  .search-input {
    width: 20px;
    
  }
  
  .search-icon,
  .sort-icon,
  .filter-icon {
  
    cursor: pointer;
  }
  
  .filter-sort {
    
  }
  
  .button-container {
    
  }
  .join-btn-container{
   height: 100%;  
  }
  .host-btn-container{
   display: none;
  }
  
  button {
    
  
    cursor: pointer;
  }
  
  /* category */
  .category {
    
  }
  
  .category-container {
   
  }
  
  .category-container ul {
   
  }
  
  .category-container li {
   
  
    cursor: pointer;
  }
  .hide-on-small-3{
    display: none;
  }
}
</style>
