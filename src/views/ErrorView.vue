<template>
  <div class="error-container">
    <div class="error-content">
      <h1>404<br>Room Not Found</h1>
      <p class="error-message">
        Oops! The room you're trying to access doesn't exist!
      </p>
      <p class="error-explanation">
        Please check the room ID and try again, or return to the home page.
      </p>
      <button
        class="home-button"
        @click="goToHomePage"
      >
        Go to Home Page
      </button>
    </div>
  </div>
</template>
  
<script setup>
import { useRouter } from 'vue-router'
  
const router = useRouter()
  
const goToHomePage = () => {
    router.push('/home')
}
</script>
  
<style scoped>
:root {
    --primary-color: #3498db;
    --primary-color-hover: #2980b9;
    --error-color: #e74c3c;
    --text-color: #333;
    --background-color: #f5f5f5;
    --card-background: #ffffff;
}
.error-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: var(--background-color);
    font-family: Arial, sans-serif;
}
.error-content {
    background-color: var(--card-background);
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 400px;
    width: 90%;
}
h1 {
    color: var(--error-color);
    font-size: 2rem;
    margin-bottom: 1rem;
}
.error-message {
    font-size: 1.2rem;
    color: var(--text-color);
    margin-bottom: 1rem;
} 
.error-explanation {
    color: #666;
    margin-bottom: 1.5rem;
}
.home-button {
    background-color: rgb(96, 96, 248);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}
.home-button:hover {
    background-color: white;
    color: #6060f8;
    border: #2980b9;
}
</style>