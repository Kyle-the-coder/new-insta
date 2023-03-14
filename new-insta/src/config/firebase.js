import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCzazol9IgAhJX6l6-b3gLFK_DDD-RsLKQ",
    authDomain: "newphoto-61e6b.firebaseapp.com",
    projectId: "newphoto-61e6b",
    storageBucket: "newphoto-61e6b.appspot.com",
    messagingSenderId: "359069679684",
    appId: "1:359069679684:web:3f0de7dbd01123bbb53c11",
    measurementId: "G-78LNPW6MM7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)