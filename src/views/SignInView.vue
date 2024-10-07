<script setup>
import { ref } from 'vue';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/firebaseconfig';
import { useRouter } from 'vue-router';
import NavBar from '@/components/nav-bar.vue';
  const email = ref('')
  const password = ref('')
  const router = useRouter()
  const errorMessage = ref()

  const signIn = () => {
      signInWithEmailAndPassword(auth, email.value, password.value)
      .then((data) => {
          // const user = data.user;
          router.push('/')
      })
      .catch((error) => {
          switch(error.code){
              case 'auth/wrong-password':
                  errorMessage.value = 'Wrong Password'
                  break
              case 'auth/user-not-found':
                  errorMessage.value = 'User not found'
                  break
              case 'auth/too-many-requests':
                  errorMessage.value = 'Too many requests'
                  break
              case 'auth/invalid-email':
                  errorMessage.value = 'Invalid Email'
                  break
              case 'auth/user-disabled':
                  errorMessage.value = 'User disabled'
                  break
          }
      })
  }

  const signInWithGoogle = () => {
      console.log('Google Sign In')
  }
</script>

<template>
  <!-- for revision after the UI person is back from trip
  functionality only no design -->
  <NavBar />
  <div class="signin">
    <h1>Sign In</h1>
    <div class="form-group">
      <label for="email">Email</label><br>
      <input
        id="email"
        v-model="email"
        type="email"
      ><br>
      <label for="password">Password</label><br>
      <input
        id="password"
        v-model="password"
        type="password"
      ><br>
      <button @click="signIn">
        Sign In
      </button><br>
      <p v-if="errorMessage">
        {{ errorMessage }}
      </p>
      <button @click="signInWithGoogle">
        Sign In with Google
      </button>
      <p>
        Don't have an account? <router-link to="/register">
          Sign Up
        </router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.signin {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: bold;
}

input {
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
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
}

.btn-primary:hover {
  background-color: #3a7bc8;
}

.btn-secondary {
  background-color: #ffffff;
  color: #4a90e2;
  border: 1px solid #4a90e2;
}

.btn-secondary:hover {
  background-color: #f0f7ff;
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