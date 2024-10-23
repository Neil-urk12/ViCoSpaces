<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore'
const router = useRouter();
const authStore = useAuthStore();
const goToRoute = (route) => {
  router.push(route);
};

const emit = defineEmits(['close']); // Emits the 'close' event to parent component

// Emit the close event to parent
const close = () => {
emit('close');
};
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
  <!-- Modal overlay -->
  <div
    class="overlay"
    @click.self="close"
  >
    <div class="modal-content">
      <!-- Back Button -->
      <div class="header">
        <img
          src="../assets/images/SVG/back-svgrepo-com.svg" 
          alt="back-icon"
          class="back-icon"
          @click="close"
        >
      </div>
      <!-- User Option Wrapper -->
      <div class="user-option-wrapper">
        <ul class="user-option">
          <li
            class="option-item"
            @click="goToRoute('/profile')"
          >
            <img
              src="../assets/images/SVG/user-svgrepo-com.svg"
              alt="profile-icon"
              class="icon"
            >
            
            Profile
          </li>
          <li
            class="option-item"
            @click="goToRoute('/settings')"
          >
            <img
              src="../assets/images/SVG/settings-svgrepo-com.svg"
              alt="settings-icon"
              class="icon"
            >
            
            Settings
          </li>
          <li
            class="option-item"
            @click="goToRoute('/')"
          >
            <img
              src="../assets/images/SVG/home-svgrepo-com.svg"
              alt="home-icon"
              class="icon"
            >
            
            Home
          </li>
          <li
            class="option-item"
            @click="goToRoute('/about')"
          >
            <img
              src="../assets/images/SVG/about-svgrepo-com.svg"
              alt="about-icon"
              class="icon"
            >
            
            About
          </li>
          <li
            class="option-item"
            @click="goToRoute('/contact')"
          >
            <img
              src="../assets/images/SVG/phone-svgrepo-com.svg"
              alt="contact-icon"
              class="icon"
            >
            
            Contact
          </li>
          <li class="option-item logout" @click.prevent="logout">
            <img
              src="../assets/images/SVG/log-out-svgrepo-com.svg"
              alt="logout-icon"
              class="icon"
            >
            Logout
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
  
  
  
<style scoped>
/* Modal Overlay */
.overlay {
position: fixed;
top: 0;
left: 0;
width: 100vw;
height: 100vh;
background-color: rgba(0, 0, 0, 0.5);
display: flex;
justify-content: end;
align-items: center;
z-index: 1000;
}

/* Modal Content */
.modal-content {
display: flex;
flex-direction: column;
background: white;
border-radius: 10px;
height: 100%;
width: 300px;
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Header with Back Icon */
.header {
display: flex;
justify-content: flex-start;
margin: 20px ;
}

.back-icon {
width: 32px;
cursor: pointer;
}

/* User Options Wrapper */
.user-option-wrapper {
flex: 1;
display: flex;
flex-direction: column;
}

.user-option {
list-style: none;
padding: 0;
margin: 0;
display: flex;
flex-direction: column;
gap: 15px;

}

.option-item {
display: flex;
align-items: center;
gap: 10px;
font-size: 18px;
padding: 10px 10px 10px 20px;
cursor: pointer;
height: 40%;
transition: background 0.3s;
}

.option-item:hover {
background-color: rgba(0, 0, 0, 0.05);
border-radius: 6px;
}

.icon {
width: 24px;
}

.logout {
color: red;
}
@media (max-width: 414px){
  .modal-content {
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 10px;
    height: 100%;
    width: 250px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
}
@media (max-width: 375px) {
    .modal-content {
        display: flex;
        flex-direction: column;
        background: white;
        border-radius: 10px;
        height: 100%;
        width: 200px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
    
}
</style>
