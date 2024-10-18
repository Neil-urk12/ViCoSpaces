import { initializeApp } from "firebase/app"

import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database"
// import { getAnalytics } from "firebase/analytics"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const realTimeDb = getDatabase(app)
export { app, auth, realTimeDb }
// const analytics = getAnalytics(app);