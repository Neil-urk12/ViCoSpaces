import { initializeApp } from "firebase/app"
import { getAuth ,GoogleAuthProvider , GithubAuthProvider } from "firebase/auth"
import { getDatabase } from "firebase/database"
// import { getAnalytics } from "firebase/analytics"
const firebaseConfig = {
  apiKey: "AIzaSyBJfCx_rUkvT7yCpjmfz7t_auEi8scHpk4",
  authDomain: "vicospacesdb.firebaseapp.com",
  projectId: "vicospacesdb",
  storageBucket: "vicospacesdb.appspot.com",
  messagingSenderId: "997233602935",
  appId: "1:997233602935:web:71e36f5469a92a3d8c3172",
  measurementId: "G-RWCMGJ0R2F"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const realTimeDb = getDatabase(app)
const googleprovider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()


export { app, auth, realTimeDb , googleprovider ,githubProvider }
// const analytics = getAnalytics(app);
