import { defineStore } from 'pinia';
import { authnow, googleprovider } from '@/firebase/firebaseconfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged,              
  signInWithPopup, sendPasswordResetEmail, signInWithRedirect, getRedirectResult } from 'firebase/auth'; 
import { GithubAuthProvider } from 'firebase/auth'; 
import { useRouter } from 'vue-router'; 
import validator from 'validator';

const router = useRouter()
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
    async signInWithGoogleRedirect() {                                                                         
      try {                                                                                                    
        await signInWithRedirect(authnow, googleprovider);                                                     
      } catch (error) {                                                                                        
        console.error(error);                                                                                  
        throw new Error('Google sign-in failed');                                                              
      }                                                                                                        
    },                                                                                                         
                                                                                                               
    async handleRedirectResult() {                                                                             
      try {                                                                                                    
        const result = await getRedirectResult(authnow);                                                       
        if (result) {                                                                                          
          const user = result.user;                                                                            
          this.user = user;                                                                                    
          localStorage.setItem('user', JSON.stringify({                                                        
            uid: user.uid,                                                                                     
            email: user.email,                                                                                 
            displayName: user.displayName || user.email.split('@')[0],                                         
            accessToken: await user.getIdToken(),                                                              
          }));                                                                                                 
          router.push('/home');                                                                                
        }                                                                                                      
      } catch (error) {                                                                                        
        console.error(error);                                                                                  
        throw new Error('Google sign-in failed');                                                              
      }                                                                                                        
    },    
    async signInWithGitHub() {                                                                                 
      const provider = new GithubAuthProvider();                                                               
      try {                                                                                                    
        const result = await signInWithPopup(authnow, provider);                                               
        const user = result.user;                                                                              
        this.user = user;                                                                                      
        localStorage.setItem('user', JSON.stringify({                                                          
          uid: user.uid,                                                                                       
          email: user.email,                                                                                   
          displayName: user.displayName || user.email.split('@')[0],                                           
          accessToken: await user.getIdToken(),                                                                
        }));                                                                                                   
        router.push('/home');                                                                                  
      } catch (error) {                                                                                        
        console.error("Error during sign-in:", error);                                                         
        throw new Error('GitHub sign-in failed');                                                              
      }                                                                                                        
    },                                                                                                         
                                                                                                               
    async signInWithGitHubRedirect() {                                                                         
      const provider = new GithubAuthProvider();                                                               
      try {                                                                                                    
        await signInWithRedirect(authnow, provider);                                                           
      } catch (error) {                                                                                        
        console.error("Error during sign-in:", error);                                                         
        throw new Error('GitHub sign-in failed');                                                              
      }                                                                                                        
    },                                                                                                         
           

    async forgotPassword(email) {                                                                              
      try {                                                                                                    
        await sendPasswordResetEmail(authnow, email);                                                          
        alert('Password reset email sent!');                                                                   
      } catch (error) {                                                                                        
        switch (error.code) {                                                                                  
          case 'auth/user-not-found':                                                                          
            throw new Error('No user found with this email');                                                  
          case 'auth/invalid-email':                                                                           
            throw new Error('Invalid email address');                                                          
          default:                                                                                             
            throw new Error('An error occurred. Please try again.');                                           
        }                                                                                                      
      }                                                                                                        
    },
  },
})