// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4GdKVCP5Fe8Lk5Alzw03LxChcBBGSUDM",
  authDomain: "kilfunimmeshugaim.firebaseapp.com",
  projectId: "kilfunimmeshugaim",
  storageBucket: "kilfunimmeshugaim.firebasestorage.app",
  messagingSenderId: "901461642025",
  appId: "1:901461642025:web:1f45fed47945e4bbc74538",
  measurementId: "G-QGF97T781C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
