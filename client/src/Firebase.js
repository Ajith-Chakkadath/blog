// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_Key,
  authDomain: "ajith-chakkadath-blog.firebaseapp.com",
  projectId: "ajith-chakkadath-blog",
  storageBucket: "ajith-chakkadath-blog.appspot.com",
  messagingSenderId: "301789369098",
  appId: "1:301789369098:web:74f7e6979d97370ab3a0f3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);