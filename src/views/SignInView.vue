<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signInWithPopup } from 'firebase/auth'
import { authnow , googleprovider } from '@/firebase/firebaseconfig'
import logonav from '@/components/landing-page-nav.vue'
import { useAuthStore } from '@/stores/authStore'

const email = ref('')
const password = ref('')
const router = useRouter()
const errorMessage = ref()
const auth = useAuthStore()

if(auth.isAuthenticated) router.push('/home')

const login = async () => {
  try {
    await auth.login({ email: email.value, password: password.value })
    router.push('/home')
  } catch (error) {
    switch (error.code) {
      case 'auth/missing-password':
        errorMessage.value = 'Missing Password'
        document.querySelector("#password").style.border = "2px solid red"
        document.querySelector("#email").style.border = "2px solid #4a90e2"
        break
      case 'auth/invalid-credential':
        errorMessage.value = 'Incorrect email or password'
        document.querySelector("#password").style.border = "2px solid red"
        document.querySelector("#email").style.border = "2px solid red"
        break
      case 'auth/invalid-email':
        errorMessage.value = 'Complete all fields'
        document.querySelector("#password").style.border = "2px solid red"
        document.querySelector("#email").style.border = "2px solid red"
        break;
      default:
        alert('Please check your network')
      break
    }
  }
}
const signInWithGoogle = async () => {
  try {
      const confidential = await signInWithPopup(authnow, googleprovider)
      if(confidential){
        const user = confidential.user;
        console.log(`User Info: ${user}`)
        router.push('/home')
      }
  } catch (error) {
        console.error(error)
  }
}
const showpass = () => {
  if(document.querySelector('#password').type == 'password'){
    document.querySelector('#password').type = 'text'
    document.querySelector('#hidepass').style.display = 'none'
    document.querySelector('#showpass').style.display = 'block'
  }
}
const hidepass = () => {
  if(document.querySelector('#password').type == 'text'){
    document.querySelector('#password').type = 'password'
    document.querySelector('#hidepass').style.display = 'block'
    document.querySelector('#showpass').style.display = 'none'
  }
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
  <div class="signin">
    <h1>Sign In</h1>
    <div class="form-group">
      <label for="email">Email</label><br>
      <input
        id="email"
        v-model="email"
        type="email"
        placeholder="Enter email"
      >
      <label for="password">Password</label><br>
      <input
        id="password"
        v-model="password"
        type="password"
        placeholder="Enter password" 
      ><br>

      <i
        id="hidepass"
        class="fa-solid fa-eye-slash"
        @click="showpass"
      />
      <i
        id="showpass"
        class="fa-solid fa-eye"
        @click="hidepass"
      /><br>
  
      <span class="forgotpass">
          Forgot Password
      </span>

        <p
          v-if="errorMessage"
          class="erroMessage"
        >
          {{ errorMessage }}
        </p>
      
      <button
        class="btn-primary"
        @click="login"
      >
        Sign In
      </button>

      <button
        class="btn-secondary"
        @click="signInWithGoogle"
      >
        <img
          class="imagelogo"
          src="../images/google.png"
          alt="google logo"
        >
        Sign In with Google
      </button>

      <button
        class="btn-Third"
        @click="signInWithGithub"
      >
        <i class="fa-brands fa-github" />
        Sign In with Github
      </button>

      <p class="switch-form">
        Don't have an account ? <router-link to="/register">
          Sign Up
        </router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
body{
  font-family: Arial, Helvetica, sans-serif;
}
.fa-eye-slash{
  margin: -14% 0 0 90%;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.452);
}
.fa-eye{
  margin: -14% 0 0 90%;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.452);
  display: none;
}
.forgotpass{
  position: absolute;
  color: #0073ff;
  margin: 10.5% 0 0 18%;
}

.forgotpass:hover{
  text-decoration: underline;
}
.signin {
  max-width: 400px;
  margin: 30px auto;
  padding: 1% 1.2rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}
.erroMessage{
  width: 35%;
  margin: 1% 0 0 0;
  color: red;
}
h1 {
  text-align: center;
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  color: #555;
  font-weight: bold;
  margin-bottom: -10px;
}

input {
  padding: 0.75rem;
  margin-bottom: 2%;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  outline: 0;
  border: 2px solid rgba(0, 0, 0, 0.174);
  cursor: pointer;
}
input:hover{
  background-color: #7474740d;
}

input:focus {
  border: 2px solid #4a90e2;
  box-shadow: 0 0 0 2px rgba(0, 119, 255, 0.288);
}
::placeholder{
  color: lightgrey;
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
  margin-bottom: 5%;
  margin-top: 6.5%;
  padding: 18px 0;
  border-radius: 5px;
  border: 0;
  cursor: pointer;
  font-weight: 500;
  font-size: 1.1rem;
  transition: 0.3s ease-in-out;
}
.btn-primary:hover {
  background-color: #0073ff;
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
  transition: 0.3s ease-in-out;
}

.imagelogo{
  width: 1.3rem;
  margin: 0 10px -3px 0;
}

.btn-secondary:hover {
  background-color: #e7f2fe;
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
  transition: 0.3s ease-in-out;
}

.fa-github{
  font-size: 1.3rem;
  margin: 0 10px -3px 0;
  color: black;
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

@media screen and (min-width: 300px) and (max-width: 320px) and (min-height: 500px) and (max-height: 570px) {
  .signin{
    border: 0;
    box-shadow: none;
  }
  h1{
    font-size: 2.5rem;
  }
  .forgotpass{
    margin: 48.5% 0 0 59%;
    font-size: 12px;
  }
  .erroMessage{
    font-size: 12px;
    margin-top: 1px;
  }
  .fa-eye{
    margin: -19% 0 0 90%;
  }
  .fa-eye-slash{
    margin: -19% 0 0 90%;
  }
}

@media screen and (min-width: 300px) and (max-width: 399px) and (min-height: 600px) and (max-height: 699px) {
  .signin{
    border: 0;
    box-shadow: none;
  }
  .forgotpass{
    margin: 42% 0 0 61%;
    font-size: 14px;
  }
  .erroMessage{
    font-size: 14px;
    margin-top: 1px;
  }
  .fa-eye{
    margin: -16% 0 0 90%;
  }
  .fa-eye-slash{
    margin: -16% 0 0 90%;
  }
}

@media screen and (min-width: 350px) and (max-width: 360px) and (min-height: 600px) and (max-height: 640px) {
  .signin{
    border: 0;
    box-shadow: none;
  }
  .forgotpass{
    margin: 44% 0 0 62%;
    font-size: 13px;
  }
  .erroMessage{
    font-size: 13px;
    margin-top: 1px;
  }
  .fa-eye{
    margin: -16% 0 0 90%;
  }
  .fa-eye-slash{
    margin: -16% 0 0 90%;
  }
}

@media screen and (min-width: 360px) and (max-width: 399px) and (min-height: 740px) and (max-height: 799px) {
  .signin{
    border: 0;
    box-shadow: none;
  }
  .forgotpass{
    margin: 43.5% 0 0 61%;
    font-size: 13px;
  }
  .erroMessage{
    font-size: 13px;
    margin-top: 1px;
  }
  .fa-eye{
    margin: -17% 0 0 90%;
  }
  .fa-eye-slash{
    margin: -17% 0 0 90%;
  }
}

@media screen and (min-width: 400px) and (max-width: 499px) and (min-height: 800px) and (max-height: 899px) {
  .signin{
    border: 0;
    box-shadow: none;
  }
  .forgotpass{
    margin: 37.5% 0 0 63%;
    font-size: 15px;
  }
  .erroMessage{
    font-size: 15px;
    margin-top: 1px;
  }
  .fa-eye{
    margin: -15% 0 0 90%;
  }
  .fa-eye-slash{
    margin: -15% 0 0 90%;
  }
}


@media screen and (min-width: 300px) and (max-width: 344px) and (min-height: 800px) and (max-height: 899px) {
  .signin{
    border: 0;
    box-shadow: none;
  }
  .forgotpass{
    margin: 45.5% 0 0 60%;
    font-size: 13px;
  }
  .erroMessage{
    font-size: 13px;
    margin-top: 1px;
  }
  .fa-eye{
    margin: -17.5% 0 0 90%;
  }
  .fa-eye-slash{
    margin: -17.5% 0 0 90%;
  }
}

@media screen and (min-width: 300px) and (max-width: 391px) and (min-height: 800px) and (max-height: 845px) {
  .signin{
    border: 0;
    box-shadow: none;
  }
  .forgotpass{
    margin: 40% 0 0 60%;
    font-size: 15px;
  }
  .erroMessage{
    font-size: 15px;
    margin-top: 1px;
  }
  .fa-eye{
    margin: -16% 0 0 90%;
  }
  .fa-eye-slash{
    margin: -16% 0 0 90%;
  }
}

@media screen and (min-width: 412px) and (max-width: 429px) and (min-height: 914px) and (max-height: 999px) {
  .signin{
    border: 0;
    box-shadow: none;
  }
  .forgotpass{
    margin: 38.5% 0 0 63%;
    font-size: 15px;
  }
  .erroMessage{
    font-size: 15px;
    margin-top: 3px;
  }
  .fa-eye{
    margin: -15% 0 0 90%;
  }
  .fa-eye-slash{
    margin: -15% 0 0 90%;
  }
}

@media screen and (min-width: 430px) and (max-width: 499px) and (min-height: 932px) and (max-height: 999px) {
  .signin{
    border: 0;
    box-shadow: none;
  }
  .forgotpass{
    margin: 36.5% 0 0 64.5%;
    font-size: 15px;
  }
  .erroMessage{
    font-size: 15px;
    margin-top: 3px;
  }
  .fa-eye{
    margin: -15% 0 0 90%;
  }
  .fa-eye-slash{
    margin: -15% 0 0 90%;
  }
}

@media screen and (min-width: 500px) and (max-width: 599px) and (min-height: 700px) and (max-height: 799px){
  .signin{
    border: 0;
    box-shadow: none;
  }
  .forgotpass{
    margin: 29.2% 0 0 51.5%;
    font-size: 16px;
  }
  .erroMessage{
    font-size: 16px;
    margin-top: 1px;
  }
  .fa-eye{
    margin: -14% 0 0 90%;
  }
  .fa-eye-slash{
    margin: -14% 0 0 90%;
  }
}


@media screen and (min-width: 700px) and (max-width: 799px) and (min-height: 1000px) and (max-height: 1099px){
  .forgotpass{
    margin: 20.5% 0 0 36.1%;
    font-size: 16px;
  }
  .erroMessage{
    font-size: 16px;
    margin-top: 1px;
  }
  .fa-eye{
    margin: -14% 0 0 90%;
  }
  .fa-eye-slash{
    margin: -14% 0 0 90%;
  }
}

@media screen and (min-width: 800px) and (max-width: 899px) and (min-height: 1100px) and (max-height: 1180px){
  .forgotpass{
    margin: 19.2% 0 0 34%;
    font-size: 16px;
  }
  .erroMessage{
    font-size: 16px;
    margin-top: 1px;
  }
  .fa-eye{
    margin: -14% 0 0 90%;
  }
  .fa-eye-slash{
    margin: -14% 0 0 90%;
  }
}

@media screen and (min-width: 800px) and (max-width: 855px) and (min-height: 1200px) and (max-height: 1280px){
  .forgotpass{
    margin: 18.5% 0 0 32.5%;
    font-size: 16px;
  }
  .erroMessage{
    font-size: 16px;
    margin-top: 1px;
  }
  .fa-eye{
    margin: -14% 0 0 90%;
  }
  .fa-eye-slash{
    margin: -14% 0 0 90%;
  }
}

@media screen and (min-width: 900px) and (max-width: 999px) and (min-height: 1300px) and (max-height: 1399px){
  .forgotpass{
    margin: 17.5% 0 0 30.5%;
    font-size: 16px;
  }
  .erroMessage{
    font-size: 16px;
    margin-top: 1px;
  }
  .fa-eye{
    margin: -14% 0 0 90%;
  }
  .fa-eye-slash{
    margin: -14% 0 0 90%;
  }
}


@media screen and (min-width: 1000px) and (max-width: 1024px) and (min-height: 1300px) and (max-height: 1399px){
  .forgotpass{
    margin: 15.5% 0 0 27%;
    font-size: 16px;
  }
  .erroMessage{
    font-size: 16px;
    margin-top: 1px;
  }
  .fa-eye{
    margin: -14% 0 0 90%;
  }
  .fa-eye-slash{
    margin: -14% 0 0 90%;
  }
}

@media screen and (min-width: 1000px) and (max-width: 1024px) and (min-height: 600px) and (max-height: 699px){
  .forgotpass{
    margin: 15.5% 0 0 27%;
    font-size: 16px;
  }
  .erroMessage{
    font-size: 16px;
    margin-top: 1px;
  }
  .fa-eye{
    margin: -14% 0 0 90%;
  }
  .fa-eye-slash{
    margin: -14% 0 0 90%;
  }
}

@media screen and (min-width: 1279px) and (max-width: 1280px) and (min-height: 700px) and (max-height: 800px){
  .forgotpass{
    margin: 12.4% 0 0 22%;
    font-size: 16px;
  }
  .erroMessage{
    font-size: 16px;
    margin-top: 1px;
  }
  .fa-eye{
    margin: -14% 0 0 90%;
  }
  .fa-eye-slash{
    margin: -14% 0 0 90%;
  }
}








</style>