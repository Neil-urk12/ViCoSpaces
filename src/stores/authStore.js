import { defineStore } from 'pinia';
import { authnow, googleprovider } from '@/firebase/firebaseconfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import validator from 'validator';

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
        const userCredential = await signInWithEmailAndPassword(authnow, email, password);
        this.user = userCredential.user;

        localStorage.setItem('user', JSON.stringify({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: userCredential.user.displayName || email.split('@')[0],
          accessToken: await userCredential.user.getIdToken(),
        }));
      } catch (error) {
        console.error('Login error:', error.message);                                                              
        throw new Error('Invalid email or password');
      }
    },

    async register({ email, password }) {
      if(!validator.isEmail(email)) throw new Error('Invalid email format');
      
      try {
        const userCredential = await createUserWithEmailAndPassword(authnow, email, password);

        this.user = userCredential.user;

        localStorage.setItem('user', JSON.stringify({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: userCredential.user.displayName || email.split('@')[0],
        }));

        return userCredential.user;

      } catch (error) {
        throw new Error('Invalid email or password'), error
      }
    },

    async logout() {
      try {
        await signOut(authnow);
        this.user = null;
        localStorage.removeItem('user')
      } catch (error) {
        console.error('Error during logout:', error.message)
        throw error
      }
    },

    async signInWithGoogle() {                                                                                     
      try {                                                                                                        
        const confidential = await signInWithPopup(authnow, googleprovider)                                       
        if (confidential) {                                                                                        
          const user = confidential.user                                                                        
          this.user = user                                                                                       
          localStorage.setItem('user', JSON.stringify({                                                            
            uid: user.uid,                                                                                         
            email: user.email,                                                                                     
            displayName: user.displayName || user.email.split('@')[0],                                             
            accessToken: await user.getIdToken(),                                                                  
          }))                                                                                                     
        }                                                                                                          
      } catch (error) {                                                                                            
        console.error(error);                                                                                      
        throw new Error('Google sign-in failed');                                                                  
      }                                                                                                            
    },

    checkAuthState() {
      onAuthStateChanged(authnow, (user) => {
        if (user) 
          this.user = user
        else {
          this.user = null
          localStorage.removeItem('user')
        }
      })
    },
  },
})