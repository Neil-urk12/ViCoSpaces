<script setup>
import { ref } from 'vue'

const userProfile = ref({
  name: '',
  email: '',
  bio: '',
  favoritePlanet: 'Earth',
  spaceExperience: 'beginner',
  notifications: true
})

const planets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune']
const experienceLevels = ['beginner', 'intermediate', 'advanced', 'space-veteran']
const isSaving = ref(false)
const saveSuccess = ref(false)

const saveProfile = async () => {
  isSaving.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    saveSuccess.value = true
    setTimeout(() => {
      saveSuccess.value = false
    }, 3000)
  } catch (error) {
    console.error('Error saving profile:', error)
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div class="space-profile">
    <div class="stars" />
    <div class="content">
      <h1>Space Explorer Profile</h1>
      
      <form @submit.prevent="saveProfile">
        <div class="form-group">
          <label for="name">Cosmic Name</label>
          <input
            id="name"
            v-model="userProfile.name"
            type="text"
            required
            placeholder="Enter your space explorer name"
          >
        </div>

        <div class="form-group">
          <label for="email">Space Communication Channel (Email)</label>
          <input
            id="email"
            v-model="userProfile.email"
            type="email"
            required
            placeholder="your@space-email.com"
          >
        </div>

        <div class="form-group">
          <label for="bio">Star Biography</label>
          <textarea
            id="bio"
            v-model="userProfile.bio"
            rows="4"
            placeholder="Tell us about your cosmic journey..."
          />
        </div>

        <div class="form-group checkbox-group">
          <label>
            <input
              v-model="userProfile.notifications"
              type="checkbox"
            >
            <span>Receive Cosmic Notifications</span>
          </label>
        </div>

        <button
          type="submit"
          :disabled="isSaving"
          class="save-button"
        >
          {{ isSaving ? 'Saving...' : 'Save Profile' }}
        </button>

        <div
          v-if="saveSuccess"
          class="success-message"
        >
          Profile saved successfully! 🚀
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.space-profile {
  min-height: 100vh;
  background: linear-gradient(to bottom, #0B0B2B, #1B1B4B);
  position: relative;
  overflow: hidden;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.stars {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background-image: 
    radial-gradient(2px 2px at 20px 30px, #ffffff, rgba(0, 0, 0, 0)),
    radial-gradient(2px 2px at 40px 70px, #ffffff, rgba(0, 0, 0, 0)),
    radial-gradient(2px 2px at 50px 160px, #ffffff, rgba(0, 0, 0, 0)),
    radial-gradient(2px 2px at 90px 40px, #ffffff, rgba(0, 0, 0, 0)),
    radial-gradient(2px 2px at 130px 80px, #ffffff, rgba(0, 0, 0, 0)),
    radial-gradient(2px 2px at 160px 120px, #ffffff, rgba(0, 0, 0, 0));
  background-repeat: repeat;
  animation: twinkle 5s infinite;
}

.content {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.1);
  padding: 30px;
  border-radius: 16px;
  backdrop-filter: blur(10px);
}

h1 {
  color: #ffffff;
  font-size: 32px;
  margin-bottom: 30px;
  text-align: center;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.form-group {
  margin-bottom: 24px;
}

label {
  display: block;
  color: #ffffff;
  margin-bottom: 8px;
  font-size: 16px;
}

input[type="text"],
input[type="email"],
textarea,
select {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 16px;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

input[type="text"]:focus,
input[type="email"]:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.checkbox-group {
  display: flex;
  align-items: center;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

input[type="checkbox"] {
  margin-right: 8px;
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.save-button {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  padding: 12px 30px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin: 0 auto;
}

.save-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}

.save-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.success-message {
  margin-top: 16px;
  padding: 16px;
  background: rgba(34, 197, 94, 0.2);
  color: #4ade80;
  border-radius: 8px;
  text-align: center;
  animation: fadeIn 0.3s ease;
}

@keyframes twinkle {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Custom scrollbar styles */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Placeholder styles */
::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

/* Form validation styles */
input:invalid,
textarea:invalid,
select:invalid {
  border-color: #ff4444;
}

@media (max-width: 768px) {
  .content {
    padding: 20px;
    margin: 10px;
  }
  
  h1 {
    font-size: 24px;
  }
  
  .save-button {
    width: 100%;
  }
}
</style>