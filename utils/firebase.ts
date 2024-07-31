// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJvHZUyEF-vRwjBtolZX_dMvBmihNcg_I",
  authDomain: "rastreia-agro.firebaseapp.com",
  projectId: "rastreia-agro",
  storageBucket: "rastreia-agro.appspot.com",
  messagingSenderId: "1075962788131",
  appId: "1:1075962788131:web:84c2ef6424efe822be3496"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { db, auth };