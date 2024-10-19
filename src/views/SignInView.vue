<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signInWithPopup } from 'firebase/auth';
import { authnow , googleprovider } from '@/firebase/firebaseconfig';
import logonav from '@/components/landing-page-nav.vue';
import { useAuthStore } from '@/stores/authStore';

  const email = ref('')
  const password = ref('')
  const router = useRouter()
  const errorMessage = ref()
  const auth = useAuthStore()

  const login = async () => {
    try {
      await auth.login({ email: email.value, password: password.value });
      router.push('/home');
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          errorMessage.value = 'Wrong Password';
          document.querySelector("#password").style.border = "2px solid red";
          break;
        case 'auth/user-not-found':
          errorMessage.value = 'User not found';
          document.querySelector("#password").style.border = "2px solid red";
          document.querySelector("#email").style.border = "2px solid red";
          break;
        case 'auth/too-many-requests':
          errorMessage.value = 'Too many requests';
          document.querySelector("#password").style.border = "2px solid red";
          document.querySelector("#email").style.border = "2px solid red";
          break;
        case 'auth/invalid-email':
          errorMessage.value = 'Complete all fields';
          document.querySelector("#password").style.border = "2px solid red";
          document.querySelector("#email").style.border = "2px solid red";
          break;
        case 'auth/user-disabled':
          errorMessage.value = 'User disabled';
          break;
        default:
          errorMessage.value = 'An error occurred during login';
          break;
      }
    }
  };

  const signInWithGoogle = async () => {
    // sessionStorage.setItem('loggedin', 'true')
      try {
         const confidential = await signInWithPopup(authnow, googleprovider)
            if(confidential){
              const user = confidential.user;
              console.log("User Info: ", user);
              router.push('/home')
            }
            
      } catch (error) {
            console.error(error)
      }
    }
    const checkbox = () => {
      if(document.querySelector('#password').type == 'password'){
        document.querySelector('#password').type = 'text'
      }else{
        document.querySelector('#password').type = 'password'
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
      ><br>
      <label for="password">Password</label><br>
      <input
        id="password"
        v-model="password"
        type="password"
        placeholder="Enter password" 
      >
      <label for="checkbox" style="font-weight: 100; cursor: pointer;">
        <input type="checkbox" @click="checkbox" id="checkbox">
        Show password
      </label><br>
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
      </button><br>
      <button
        class="btn-secondary"
        @click="signInWithGoogle"
      >
        <img class="imagelogo" src="../images/google.png" alt="google logo" />
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
.signin {
  max-width: 400px;
  margin: 20px auto;
  padding: 1.2rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}
.erroMessage{
  margin-top: -1%;
  text-align: center;
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
  border: 1px solid rgba(0, 0, 0, 0.174);
  cursor: pointer;
}
input:hover{
  background-color: #7474740d;
}

input:focus {
  border: 1px solid #4a90e2;
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
  margin-bottom: 5px;
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

@media screen and (min-width: 480px) and (max-width: 600px) {
  .signin {
    padding: 1.5rem;
    border: 0;
    box-shadow:none;
  }
  input , .btn {
    font-size: 0.9rem;
  }
}
@media screen and (min-width: 601px) and (max-width: 900px)  {
    .signin{
      background-color: #ffffff;
      border: 0;
      box-shadow:none;
    }
    
}
@media screen and (min-width: 901px) and (max-width: 1200px) {
  .signin{
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    }
}


</style>