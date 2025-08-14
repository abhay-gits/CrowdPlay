import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBoZKQhI0KtfCgQ69IjtwOyfzTkE8kP3h8",
  authDomain: "musix-3f772.firebaseapp.com",
  projectId: "musix-3f772",
  storageBucket: "musix-3f772.firebasestorage.app",
  messagingSenderId: "77539400527",
  appId: "1:77539400527:web:ae10e7908f0fe79e38833a",
  measurementId: "G-VHR5G9ZSWM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };