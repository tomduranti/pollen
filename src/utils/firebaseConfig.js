import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "",
    authDomain: "pollen-dfce3.firebaseapp.com",
    projectId: "pollen-dfce3",
    storageBucket: "pollen-dfce3.firebasestorage.app",
    messagingSenderId: "726631837444",
    appId: "1:726631837444:web:b9452e1444bfd55a932a51",
    measurementId: "G-PFFMW6TX1L",
    databaseURL: "https://pollen-dfce3-default-rtdb.europe-west1.firebasedatabase.app/",
  };
  
// Initialize Firebase
export let app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);