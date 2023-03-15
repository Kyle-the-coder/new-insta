import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "newinsta-5a7ab.firebaseapp.com",
    projectId: "newinsta-5a7ab",
    storageBucket: "newinsta-5a7ab.appspot.com",
    messagingSenderId: "183894258931",
    appId: "1:183894258931:web:b26eec95c998784735f386"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)