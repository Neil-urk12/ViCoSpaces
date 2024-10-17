<script setup>
// Functions from search-bar
function notifyJoin() {
  alert('hello babe, I love you');
}

const filter = () => {
  alert("filtered");
}

const sort = () => {
  alert("sorted search");
}

// To activate the create room overlay
const emit = defineEmits(['open-room']);

const editHostRoom = () => {
    console.log('button clicked')
  emit('open-room');
}
</script>

<template>
  <header>
    <nav class="nav-bar">
      <div class="nav-div">
        <div class="logo-container">
          <img src="../images/logo/logo.png" alt="ViCoSpaces-Logo" class="logo-img">
          <span class="logo-name">ViCoSpaces</span>
        </div>
        <div class="burger" @click="toggleMenu">
          <img src="../images/SVG/burger-simple-svgrepo-com.svg" alt="menu-icon" width="30px" />
        </div>

        <div class="nav-links-and-buttons">
          <ul class="pages-container">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
          <a href="" id="user-profile">
            <div class="user-profile">
              <img src="../images/black-default-user-profile-ll(1).webp" alt="User Profile">
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
          <a href="#" @click.prevent="filter">
            <img
              class="filter-icon"
              src="../images/SVG/filters-2-svgrepo-com.svg"
              alt="filter-icon"
              width="30px"
            >
          </a>

          <a href="#" @click.prevent="sort">
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
        <button @click="notifyJoin">Join Room</button>
        <button @click="editHostRoom">Host Room</button>
      </div>
    </div>

    <!-- create a category bar below the search bar-->
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
