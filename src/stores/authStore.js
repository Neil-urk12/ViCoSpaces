import { defineStore } from 'pinia';
import { auth } from '@/firebase/firebaseconfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,  
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    async login({ email, password }) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        this.user = userCredential.user;
        
        localStorage.setItem('user', JSON.stringify({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          accessToken: await userCredential.user.getIdToken(),  
        }));
      } catch (error) {
        console.error('Login error:', error.message);
        throw error;  
      }
    },

    async register({ email, password }) {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
          this.user = userCredential.user;

          localStorage.setItem('user', JSON.stringify({
            uid: userCredential.user.uid,
            email: userCredential.user.email,
          }));
  
          return userCredential.user;
  
        } catch (error) {
          console.error('Registration error:', error.code, error.message);
          throw error; 
        }
    },

    async logout() {
      try {
        await signOut(auth);
        this.user = null;
        localStorage.removeItem('user');  
      } catch (error) {
        console.error('Error during logout:', error.message);
        throw error;
      }
    },

    checkAuthState() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
        } else {
          this.user = null;
          localStorage.removeItem('user');  
        }
      });
    },
  },
});