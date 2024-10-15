<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <header>
    <nav class="nav-bar">
      <div class="nav-div">
        <div class="logo-container">
          <img
            src="../assets/svg/filters-2-svgrepo-com.svg"
            alt="ViCoSpaces-Logo"
            class="logo-img"
          >
          <span class="logo-name">ViCoSpaces</span>
        </div>
        <div class="nav-links-and-buttons">
          <ul class="pages-container">
            <li>
              <RouterLink to="/">
                Home
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
          <a
            id="user-profile"
            href=""
          >
            <div class="user-profile">
              <img
                src=""
                alt=""
              >
            </div>
          </a>
        </div>
      </div>
    </nav>
  </header>
</template>
  
<style scoped>
* {
  text-decoration: none;
  box-sizing: border-box;
}
.nav-bar {
  background: #2d8eff;
  font-family: Calibri, sans-serif;
  align-items: center;
  height: 70px;
  padding: 15px;
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
}
.pages-container {
  display: flex;
  list-style: none;
  gap: 20px;
  margin: 0;
}
.pages-container li {
  list-style: none;
}
.pages-container li a {
  color: white;
  font-size: 18px;
  font-weight: bold;
}
.user-profile{
    background-color: white;
    height: 40px;
    width: 40px;
    margin-left: 15px;
    border-radius: 50%;
}
</style>