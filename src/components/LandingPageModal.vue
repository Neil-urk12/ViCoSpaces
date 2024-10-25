<script setup>
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
const authStore = useAuthStore()
const isAuthenticated = authStore.isAuthenticated
</script>

<template>
  <div
    class="modal-content"
  >
    <nav class="space-nav">
      <RouterLink
        v-if="!isAuthenticated"
        to="/register"
      >
        Sign Up
      </RouterLink>
      <RouterLink
        v-if="!isAuthenticated"
        to="/login"
      >
        Sign In
      </RouterLink>
      <RouterLink
        v-if="isAuthenticated"
        to="/home"
      >
        Home
      </RouterLink>
      <RouterLink to="/contact">
        Contact
      </RouterLink>
      <RouterLink to="/about">
        About
      </RouterLink>
      <RouterLink to="/roadmap">
        Roadmap
      </RouterLink>
    </nav>
  </div>
</template>

<style scoped>
  .modal-content {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, #1a1a3a 0%, #0f0f1f 100%);
    overflow: hidden;
    z-index: 999
  }
  .modal-content::before {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    top: -50%;
    left: -50%;
    background-image: 
      radial-gradient(white 1px, transparent 1px),
      radial-gradient(white 1px, transparent 1px);
    background-size: 50px 50px;
    background-position: 0 0, 25px 25px;
    animation: twinkle 3s ease-in-out infinite;
    opacity: 0.3;
  }
  .space-nav {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 2rem;
    z-index: 51;
  }
  .space-nav a {
    color: #fff;
    text-decoration: none;
    font-size: 2rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
    transition: all 0.3s ease;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    position: relative;
  }
  .space-nav a::before {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px;
    left: 50%;
    background: #fff;
    transform: translateX(-50%);
    transition: width 0.3s ease;
  }
  .space-nav a:hover {
    color: #00ffff;
    text-shadow: 0 0 20px rgba(0, 255, 255, 0.7);
  }
  .space-nav a:hover::before {
    width: 100%;
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes twinkle {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.5; }
  }
</style>