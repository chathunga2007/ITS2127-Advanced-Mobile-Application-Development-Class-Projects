// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.API_KEY || "",
  authDomain: "afdgf-5253a.firebaseapp.com",
  projectId: "afdgf-5253a",
  storageBucket: "afdgf-5253a.firebasestorage.app",
  messagingSenderId: "537236443103",
  appId: "1:537236443103:web:9d11641f0b41b1ab63fe6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app)