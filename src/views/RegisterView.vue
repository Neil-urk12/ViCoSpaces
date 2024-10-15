<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import logonav from '@/components/landing-page-nav.vue'
import { useAuthStore } from '@/stores/authStore'

const email = ref('')
const password = ref('')
const router = useRouter()
const authStore = useAuthStore()


const register = async () => {
  try {
    await authStore.register({ email: email.value, password: password.value });
    router.push('/home');
  } catch (error) {
    console.error('Error during registration:', error.message);
  }
}
const signInWithGoogle = () => {
    console.log('Google Sign In')
}
</script>

<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
    integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  >
  <logonav />
  <div class="signup">
    <h1>Sign Up</h1>
    <div class="form-group">
      <label for="email">Email</label>
      <input
        id="email"
        v-model="email"
        type="email"
        placeholder="Enter email"
      >
      <label for="password">Password</label>
      <input
        id="password"
        v-model="password"
        type="password"
        placeholder="Enter password"
      >
      <button
        class="btn-primary"
        @click="register"
      >
        Sign Up
      </button>
      <button
        class="btn-secondary"
        @click="signInWithGoogle"
      >
        <a href="http://www.google.com"><i class="fa-brands fa-google" /></a>
        Sign Up with Google
      </button>
      <button
        class="btn-Third"
        @click="signUpWithGithub"
      >
        <a href="https://github.com/login"><i class="fa-brands fa-github" /></a>
        Sign Up with Github
      </button>

      <p class="switch-form">
        Already have an account? <router-link to="/login">
          Sign In
        </router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.signup {
  max-width: 400px;
  margin: 20px auto;
  padding: 2rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}
h1 {
  text-align: center;
  color: #333;
  font-size: 2.5rem;
}
.form-group {
  display: flex;
  flex-direction: column;
}
label {
  margin-bottom: 1rem;
  color: #555;
  font-weight: bold;
}
input {
  padding: 0.75rem;
  margin-bottom: 5%;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}
::placeholder{
  color: black;
}
input:hover{
  background-color: #7474740d;
}
input:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}
.btn {
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.btn-primary {
  background-color: #4a90e2;
  color: white;
  margin-bottom: 1rem;
  padding: 18px 0;
  border-radius: 5px;
  border: 0;
  cursor: pointer;
  font-weight: 500;
  font-size: 1.1rem;
}
.btn-primary:hover {
  background-color: #0f7bff;
}
.btn-secondary {
  background-color: #ffffff;
  color: #4a90e2;
  border: 1px solid #4a90e2;
  padding: 15px 0;
  border-radius: 5px;
  box-shadow: 0 0 1px black;
  cursor: pointer;
  font-weight: 500;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}
.btn-secondary:hover {
  background-color: #e7f2fe;
}
.fa-google{
  font-size: 1.3rem;
  margin-right: 10px;
  color: blue;
}
.btn-Third{
  background-color: #ffffff;
  color: #4a90e2;
  border: 1px solid #4a90e2;
  padding: 15px 0;
  border-radius: 5px;
  box-shadow: 0 0 1px black;
  cursor: pointer;
  font-weight: 500;
  font-size: 1.1rem;
}
.fa-github{
  font-size: 1.3rem;
  margin-right: 10px;
}
.btn-Third:hover {
  background-color: #e7f2fe;
}
.switch-form {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #666;
}
.switch-form a {
  color: #4a90e2;
  text-decoration: none;
  font-weight: bold;
}
.switch-form a:hover {
  text-decoration: underline;
}
@media (max-width: 480px) {
  .signup {
    padding: 1.5rem;
  }
  input, .btn {
    font-size: 0.9rem;
  }
}
</style>