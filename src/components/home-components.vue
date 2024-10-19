<script setup>
function notifyJoin() {
  alert('hello babe, I love you');
}

const filter = () => {
  alert("filtered");
}

const sort = () => {
  alert("sorted search");
}

const emit = defineEmits(['open-room']);

const HostRoom = () => {
  console.log('button clicked')
  emit('open-room');
}

</script>

<template>
  <header>
    <nav class="nav-bar">
      <!-- <input
        id="sidebar-active"
        type="checkbox"
      >
      <label for="sidebar-active">
        <img
          src="../images/SVG/mobile-menu-bar.svg"
          alt="sidebar-icon"
        >
      </label> -->
      <div class="nav-div">
        <div class="logo-container">
          <img
            src="../images/logo/logo.png"
            alt="ViCoSpaces-Logo"
            class="logo-img"
          >
          <span class="logo-name">ViCoSpaces</span>
        </div>
        <div class="nav-links-and-buttons">
          <input type="checkbox" id="activate-nav">
          <label for="activate-nav">
            <img src="../images/SVG/close-bold-svgrepo-com.svg" width="30px" alt="">
          </label>
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
        <button @click="notifyJoin">
          Join Room
        </button>
        <button @click="HostRoom">
          Host Room
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
          <li><h5>Gaming</h5></li>
          <li><h5>Gaming</h5></li>
          <li><h5>Gaming</h5></li>
          <li><h5>Gaming</h5></li>
          <li><h5>Gaming</h5></li>
          <li><h5>Gaming</h5></li>
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

.search-bar {
  display: flex;
  justify-content: center;
  margin-top: 1em;
}

.search {
  --padding: 14px;

  width: max-content;
  display: flex;
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

/* category */
.category {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 6px;
  margin-top: 6px;
}

.category-container{
  position: relative;
  width: 95%;
  max-width: 100%;
}

.category-container ul {
  position: relative;
  display: flex;
  list-style: none;
  gap: 23px;
}

.category-container li {
  position: absolute;
  color: rgb(43, 43, 43);
  font-size: 1.2em;
  font-weight: bold;
  position: relative;
  text-align: center;

  border: 1px solid rgb(122, 122, 122);
  margin: 2px;
  padding: 6px;
  width: 7%;
  border-radius: 6px;

  cursor: pointer;
}

@media (max-width: 1388px) {
  
  
}



@media (max-width: 794px) {

  .nav-bar {
  background: #0f1112;
  font-family: Calibri, sans-serif;
  align-items: center;
  height: 70px;
  padding: 15px 40px 0px 40px;
}

  .logo-container img{
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
@media (max-width: 375px) {
  .logo-container {
    display: flex;
    align-items: center;
    font-size: clamp(19px, 0.02em, 100px);
    font-weight: 600;
    color: white;
  }
  .nav-links-and-buttons, .pages-container{
    background-color: red;
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 70vh;
    z-index: 10;
  }
  .logo-container{
    display: none;
  }
  
}



</style>
