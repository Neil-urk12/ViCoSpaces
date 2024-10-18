import { defineStore } from 'pinia';
import { auth } from '@/firebase/firebaseconfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,  
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    getUid: (state) => state.user?.uid || null,
    getEmail: (state) => state.user?.email || null,
    getAccessToken: (state) => state.user?.accessToken || null,
    getUser: (state) => state.user || null,
    getDisplayName: (state) => {
      if (state.user && state.user.displayName) return state.user.displayName;
      else if (state.user && state.user.email) return state.user.email.split('@')[0];
      else return 'Anonymous';  
    },    
    getCreationTime: (state) => state.user?.metadata?.creationTime || null,
    getLastSignInTime: (state) => state.user?.metadata?.lastSignInTime || null,

  },

  actions: {
    async login({ email, password }) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        this.user = userCredential.user;
        
        localStorage.setItem('user', JSON.stringify({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: userCredential.user.displayName || email.split('@')[0],
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
            displayName: userCredential.user.displayName || email.split('@')[0],
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