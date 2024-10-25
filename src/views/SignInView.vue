<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const email = ref('')
const password = ref('')
const router = useRouter()
const errorMessage = ref()
const auth = useAuthStore()

const showPassword = ref(false) // Reactive variable for password visibility

if (auth.isAuthenticated) router.push('/home')

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const forgotPassword = async () => {
  try {
    await auth.forgotPassword(email.value)
  } catch (error) {
    errorMessage.value = error.message
  }
}

const login = async () => {
  try {
    await auth.login({ email: email.value, password: password.value })
    router.push('/home')
  } catch (error) {
    switch (error.code) {
      case 'auth/missing-password':
        errorMessage.value = 'Missing Password'
        break
      case 'auth/invalid-credential':
        errorMessage.value = 'Incorrect email or password'
        break
      case 'auth/invalid-email':
        errorMessage.value = 'Complete all fields'
        break
      default:
        alert('Please check your network')
        break
    }
  }
}

const signInWithGoogle = async () => {
  try {
    await auth.signInWithGoogle()
    router.push('/home')
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="signin">
    <div class="stars" />
    <div class="form-container">
      <h1 class="title">
        Sign In
      </h1>
      <div class="form-group">
        <div class="input-group">
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder=" "
            required
          >
          <label for="email">Email</label>
        </div>
        <div class="input-group">
          <input
            id="password"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder=" "
            required
          >
          <label for="password">Password</label>
          <i
            :class="showPassword ? 'fa-solid fa-eye toggle-password' : 'fa-solid fa-eye-slash toggle-password'"
            @click="togglePasswordVisibility"
          />
        </div>
        <span
          class="forgotpass"
          @click="forgotPassword"
        >
          Forgot Password?
        </span>
        <p
          v-if="errorMessage"
          class="errorMessage"
        >
          {{ errorMessage }}
        </p>

        <button
          class="btn btn-primary"
          @click="login"
        >
          Sign In
        </button>
        <div class="social-divider">
          <span>or continue with</span>
        </div>
        <div class="social-buttons">
          <button
            class="btn btn-social google"
            @click="signInWithGoogle"
          >
            <img
              class="imagelogo"
              src="../assets/images/google.png"
              alt="google logo"
            >
            Google
          </button>

          <button
            class="btn btn-social github"
            @click="signInWithGithub"
          >
            <i class="fa-brands fa-github" />
            Github
          </button>
        </div>
        <p class="switch-form">
          Don't have an account?
          <router-link to="/register">
            Sign Up
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.signin {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  position: relative;
  overflow: hidden;
  padding: 1rem;
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
.form-container {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2.5rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.title {
  color: #fff;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 600;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.input-group {
  position: relative;
}
input {
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
}
input:focus {
  outline: none;
  border-color: #64ffda;
  box-shadow: 0 0 15px rgba(100, 255, 218, 0.3);
}
label {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.3s ease;
  pointer-events: none;
}
input:focus ~ label,
input:not(:placeholder-shown) ~ label {
  top: -0.5rem;
  left: 0.5rem;
  font-size: 0.8rem;
  color: #64ffda;
  background: rgba(26, 26, 46, 0.8);
  padding: 0 0.5rem;
}
.toggle-password {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: color 0.3s ease;
}
.toggle-password:hover {
  color: #64ffda;
}
.forgotpass {
  color: #64ffda;
  font-size: 0.9rem;
  text-align: right;
  cursor: pointer;
  transition: opacity 0.3s ease;
}
#hidepass, #showpass{color: black}
.forgotpass:hover {
  opacity: 0.8;
}
.errorMessage {
  color: #ff6b6b;
  font-size: 0.9rem;
  text-align: center;
}
.btn {
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}
.btn-primary {
  background: linear-gradient(135deg, #64ffda 0%, #48bfe3 100%);
  color: #1a1a2e;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(100, 255, 218, 0.4);
}
.social-divider {
  text-align: center;
  position: relative;
  margin: 1.5rem 0;
}
.social-divider::before,
.social-divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 45%;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
}
.social-divider::before {
  left: 0;
}
.social-divider::after {
  right: 0;
}
.social-divider span {
  color: rgba(255, 255, 255, 0.6);
  background: #1a1a2e;
  padding: 0 1rem;
  font-size: 0.9rem;
}
.social-buttons {
  display: flex;
  gap: 1rem;
}
.btn-social {
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
.btn-social:hover {
  background: rgba(255, 255, 255, 0.1);
}

.btn-social img,
.btn-social i {
  width: 20px;
  height: 20px;
}

.switch-form {
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

.switch-form a {
  color: #64ffda;
  text-decoration: none;
  font-weight: 600;
  transition: opacity 0.3s ease;
}

.switch-form a:hover {
  opacity: 0.8;
}

/* Responsive Design */
@media (max-width: 480px) {
  .form-container {
    padding: 1.5rem;
  }

  .title {
    font-size: 1.75rem;
  }

  .social-buttons {
    flex-direction: column;
  }
}
</style>
