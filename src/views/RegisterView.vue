<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signInWithPopup } from 'firebase/auth';
import { authnow , googleprovider } from '@/firebase/firebaseconfig';
import { useAuthStore } from '@/stores/authStore'

// const showpass = () => {
//   document.getElementById('password').type = 'text'
//   document.getElementById('showpass').style.display = 'none'
//   document.getElementById('hidepass').style.display = 'inline'
// }

// const hidepass = () => {
//   document.getElementById('password').type = 'password'
//   document.getElementById('hidepass').style.display = 'none'
//   document.getElementById('showpass').style.display = 'inline'
// }

const email = ref('')
const password = ref('')
const router = useRouter()
const errorMessage = ref()
const authStore = useAuthStore()

if(authStore.isAuthenticated) router.push('/home')

const register = async () => {
  try {
    await authStore.register({ email: email.value, password: password.value });
    router.push('/home')
  } catch (error) {
    switch(error.code){
      case 'auth/invalid-email':
        errorMessage.value = 'Complete all details'
        document.querySelector("#password").style.border = "2px solid red";
        document.querySelector("#email").style.border = "2px solid red";
        break
      case 'auth/missing-password':
        errorMessage.value = 'Missing password'
        document.querySelector("#password").style.border = "2px solid red";
        document.querySelector("#email").style.border = "2px solid #4a90e2";
        break
      case 'auth/missing-email':
        errorMessage.value = 'Missing email'
        document.querySelector("#password").style.border = "2px solid #4a90e2";
        document.querySelector("#email").style.border = "2px solid red";
        break
      case 'auth/email-already-in-use':
        errorMessage.value = 'Email is already in use'
        document.querySelector("#password").style.border = "2px solid red";
        document.querySelector("#email").style.border = "2px solid red";
        break
      default:
        alert('Please check your network')
        break;
    }
    console.error('Error during registration:', error.message);
  }
}

const signInWithGoogle = async () => {
      try {
          const confidential = await  signInWithPopup(authnow , googleprovider)
          if(confidential) {
            const user = confidential.user
            console.log(`user: ${user}`)
            router.push('/home');
          } 
      } catch (error) {
          console.error(error)
      }
}
// const showpass = () => {
//       if(document.querySelector('#password').type == 'password'){
//         document.querySelector('#password').type = 'text'
//         document.querySelector('#hidepass').style.display = 'none'
//         document.querySelector('#showpass').style.display = 'block'
//       }
//     }
// const hidepass = () => {
//   if(document.querySelector('#password').type == 'text'){
//     document.querySelector('#password').type = 'password'
//     document.querySelector('#hidepass').style.display = 'block'
//     document.querySelector('#showpass').style.display = 'none'
//   }
// }
</script>

<template>
  <div class="container">
    <div class="stars" />
    <div class="signup">
      <div class="form-container">
        <h1>Sign Up</h1>
        <div class="form-group">
          <div class="input-group">
            <label for="email">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="Enter email"
            >
          </div>

          <div class="input-group">
            <label for="password">Password</label>
            <div class="password-input">
              <input
                id="password"
                v-model="password"
                type="password"
                placeholder="Enter password"
              >
              <div class="password-toggle">
                <i
                  id="hidepass"
                  class="fa-solid fa-eye-slash"
                  @click="showpass"
                />
                <i
                  id="showpass"
                  class="fa-solid fa-eye"
                  @click="hidepass"
                />
              </div>
            </div>
          </div>

          <p
            v-if="errorMessage"
            class="error-message"
          >
            {{ errorMessage }}
          </p>

          <button
            class="btn btn-primary"
            @click="register"
          >
            Sign Up
          </button>

          <button
            class="btn btn-secondary"
            @click="signInWithGoogle"
          >
            <img
              class="imagelogo"
              src="/src/assets/images/google.png"
              alt="google logo"
              height="20px"
            >
            Sign Up with Google
          </button>
          <button
            class="btn btn-Third"
            @click="signUpWithGithub"
          >
            <i class="fa-brands fa-github" />
            Sign Up with Github
          </button>

          <p class="switch-form">
            Already have an account? 
            <router-link to="/login">
              Sign In
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  position: relative;
}
.stars {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background-image:
    radial-gradient(2px 2px at 20px 30px, #ffffff, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 40px 70px, #ffffff, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 50px 160px, #ffffff, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 90px 40px, #ffffff, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 130px 80px, #ffffff, rgba(0,0,0,0));
  background-repeat: repeat;
  background-size: 200px 200px;
  animation: stars 4s linear infinite;
  opacity: 0.5;
}
@keyframes stars {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100px);
  }
}
.signup {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  z-index: 1;
}
.form-container {
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 16px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
h1 {
  color: white;
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: 600;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
label {
  color: white;
  font-size: 0.9rem;
}
input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}
input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}
input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
}
#showpass, #hidepass{
  color: black;
}
.password-input {
  position: relative;
}
.password-toggle {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
}
.password-toggle i:hover {
  color: white;
}
#hidepass {
  display: none;
}
.btn{
  width: 100%;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  border: none;
}
.btn-primary {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
}
.btn-primary:hover {
  background: linear-gradient(135deg, #4338ca 0%, #6d28d9 100%);
  transform: translateY(-1px);
}
.btn-google {
  background: white;
  color: #333;
}
.btn-google:hover {
  background: #f8f9fa;
}
.btn-github {
  background: #24292e;
  color: white;
}
.btn-github:hover {
  background: #2c3238;
}
.btn-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}
.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}
.switch-form {
  text-align: center;
  color: white;
  margin-top: 1rem;
}
.switch-form a {
  color: #60a5fa;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}
.switch-form a:hover {
  text-decoration: underline;
}
@media screen and (min-width: 480px) and (max-width: 600px) {
  .signup {
    padding: 1.5rem;
    border: 0;
    box-shadow:none;
  }
  h1 {
    font-size: 1.75rem;
  }
}

@media screen and (min-width: 601px) and (max-width: 900px)  {
    .signup{
      background-color: #ffffff;
      border: 0;
      box-shadow:none;
    }
    
}
@media screen and (min-width: 901px) and (max-width: 1200px) {
  .signup{
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    }
}
</style>