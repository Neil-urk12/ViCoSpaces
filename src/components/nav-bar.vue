<script setup>
import { ref } from 'vue';

const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>


<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="logo">
        <span>Vico</span>
      </div>
      <div
        class="mobile-menu-button"
        @click="toggleMenu"
      >
        <span v-if="!isOpen">☰</span>
        <span v-else>✕</span>
      </div>
      <div class="desktop-menu">
        <a
          href="#"
          class="nav-link"
        >
          <span class="icon">🏠</span>
          Home
        </a>
        <a
          href="#"
          class="nav-link"
        >
          <span class="icon">✉️</span>
          Contact Us
        </a>
        <a
          href="#"
          class="nav-link profile-icon"
        >
          <span class="icon">👤</span>
        </a>
      </div>
    </div>
    
    <!-- Mobile menu -->
    <div
      v-if="isOpen"
      class="mobile-menu"
    >
      <a
        href="#"
        class="nav-link"
      >
        <span class="icon">🏠</span>
        Home
      </a>
      <a
        href="#"
        class="nav-link"
      >
        <span class="icon">✉️</span>
        Contact Us
      </a>
      <a
        href="#"
        class="nav-link"
      >
        <span class="icon">👤</span>
        Profile
      </a>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
    background-color: #2c3e50;
    padding: 1rem;
  }
  
  .navbar-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
  }
  
  .mobile-menu-button {
    display: none;
    color: #ecf0f1;
    font-size: 1.5rem;
    cursor: pointer;
  }
  
  .desktop-menu {
    display: flex;
    align-items: center;
  }
  
  .nav-link {
    color: #ecf0f1;
    text-decoration: none;
    margin-left: 1rem;
    display: flex;
    align-items: center;
  }
  
  .nav-link:hover {
    color: #3498db;
  }
  
  .icon {
    margin-right: 0.5rem;
  }
  
  .profile-icon .icon {
    margin-right: 0;
  }
  
  .mobile-menu {
    display: none;
    padding-top: 1rem;
  }
  
  @media (max-width: 768px) {
    .mobile-menu-button {
      display: block;
    }
  
    .desktop-menu {
      display: none;
    }
  
    .mobile-menu {
      display: flex;
      flex-direction: column;
    }
  
    .mobile-menu .nav-link {
      padding: 0.5rem 0;
    }
  }
</style>