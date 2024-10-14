<script setup>
import { ref } from 'vue'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { signInWithPopup } from 'firebase/auth'
import { auth , googleprovider} from '@/firebase/firebaseconfig'
import { authstart,  githubProvider } from '@/firebase/githubconfig'
import { useRouter } from 'vue-router'
import logonav from '@/components/logonav.vue'


  const email = ref('')
  const password = ref('')
  const router = useRouter()
  const errorMessage = ref()

  const signIn = async () => {
    try {
      const credential = await signInWithEmailAndPassword(auth , email.value, password.value)
        if(credential){
          console.log("User signed in: ", credential.user);
          router.replace('/home')  
        }
    }catch(error) {
        switch(error.code){
                case 'auth/invalid-email':
                    errorMessage.value = 'Complete all fields'
                    document.querySelector("#password").style.border = "2px solid red"
                    document.querySelector("#email").style.border = "2px solid red"
                    break
                case 'auth/missing-password':
                    errorMessage.value = 'Missing password'
                    document.querySelector("#password").style.border = "2px solid red"
                    document.querySelector("#email").style.border = "2px solid #4a90e2"
                    break
                case 'auth/invalid-credential':
                    errorMessage.value = 'Something went wrong'
                    document.querySelector("#password").style.border = "2px solid red"
                    document.querySelector("#email").style.border = "2px solid red"
                    break
                case 'auth/user-disabled':
                    errorMessage.value = 'User disabled'
                    break
                case 'auth/network-request-failed':
                    alert('Please Check your network')
                    break
            }
            // const errorCode = error.code;
            const geterrorMessage = error.message;
            console.log(geterrorMessage)
      };

    }
  
  const signInWithGoogle = () => {
      signInWithPopup(auth, googleprovider)
        .then((result) => {
          // Successful sign-in
          const user = result.user;
          console.log("User Info: ", user);
          router.push('/home')
        })
        .catch((error) => {
          
        });
  }

  const signInWithGithub = async () => {
    const confidential = await signInWithPopup(authstart , githubProvider)
      try {
          if(confidential){
            const user = result.user
            console.log(user)
          }
      } catch (error) {
          console.log(error.code)
      }  
  }

</script>

<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <!-- for revision after the UI person is back from trip
  functionality only no design -->
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
      ><br>
      <p class="erroMessage" v-if="errorMessage">
        {{ errorMessage }}
      </p>
      <button class="btn-primary" @click="signIn">
        Sign In
      </button><br>
      <button class="btn-secondary" name="SignIn" @click="signInWithGoogle">
       <a href="http://www.google.com"><i class="fa-brands fa-google"></i></a>
        Sign In with Google
      </button>

      <button class="btn-Third" @click="signInWithGithub">
       <a href="https://github.com/login"><i class="fa-brands fa-github"></i></a>
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
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}
.erroMessage{
  margin-top: -4%;
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
  margin-bottom: -5px;
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

.fa-google{
  font-size: 1.3rem;
  margin-right: 10px;
  color: blue;
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
  .signin {
    padding: 1.5rem;
  }

  input, .btn {
    font-size: 0.9rem;
  }
}
</style>