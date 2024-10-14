import { getAuth , GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAxBxp4bz789629dpGbdNputaDp_T95QGA",
    authDomain: "virtual-35bc8.firebaseapp.com",
    projectId: "virtual-35bc8",
    storageBucket: "virtual-35bc8.appspot.com",
    messagingSenderId: "251824722763",
    appId: "1:251824722763:web:f085b07637cb48555a0ece"

  };

// const app = initializeApp(firebaseConfig);

const authstart = getAuth()
const githubProvider = new GithubAuthProvider(firebaseConfig)

export {authstart , githubProvider }