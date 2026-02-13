// src/integrations/firebase/client.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA2YfwI0pFfHCqgVY_b33XKviXCwfFV84U",
    authDomain: "akalingua-5813e.firebaseapp.com",
    projectId: "akalingua-5813e",
    storageBucket: "akalingua-5813e.firebasestorage.app",
    messagingSenderId: "254695621771",
    appId: "1:254695621771:web:f320f5c241a2a704f0c08e"
  };
  
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);