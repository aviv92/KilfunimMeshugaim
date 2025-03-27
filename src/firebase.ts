// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDm-jItjssNeRgWzaMH4vJLO8_xp1ar4v8",
  authDomain: "kilfunimmeshugaim-4913d.firebaseapp.com",
  databaseURL:
    "https://kilfunimmeshugaim-4913d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "kilfunimmeshugaim-4913d",
  storageBucket: "kilfunimmeshugaim-4913d.firebasestorage.app",
  messagingSenderId: "922632587958",
  appId: "1:922632587958:web:c037a81941da0ea8193417",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
