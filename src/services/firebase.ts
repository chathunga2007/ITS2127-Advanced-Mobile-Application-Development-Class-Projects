// Import the functions you need from the SDKs you need
// service/firebase.ts
// lib/firebase.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import { Auth, getAuth, initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import {
  Firestore,
  getFirestore,
  initializeFirestore,
} from "firebase/firestore";
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey:
    process.env.EXPO_PUBLIC_FIREBASE_API_KEY || process.env.API_KEY || "",
  authDomain: "afdgf-5253a.firebaseapp.com",
  projectId: "afdgf-5253a",
  storageBucket: "afdgf-5253a.firebasestorage.app",
  messagingSenderId: "537236443103",
  appId: "1:537236443103:web:9d11641f0b41b1ab63fe6a",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let auth: Auth;
try {
  auth =
    Platform.OS === "web"
      ? getAuth(app)
      : initializeAuth(app, {
          persistence: getReactNativePersistence(AsyncStorage),
        });
} catch {
  auth = getAuth(app);
}

let db: Firestore;
try {
  db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
  });
} catch {
  db = getFirestore(app);
}

export { auth, db };
