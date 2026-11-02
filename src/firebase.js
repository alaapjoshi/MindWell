import { initializeApp } from 'firebase/app';
import { initializeApp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_APIKEY",
  authDomain: "YOUR_FIREBASE_AUTHDOMAIN",
  projectId: "YOUR_FIREBASE_PROJECTID",
  storageBucket: "YOUR_FIREBASE_STORAGEBUCKET",
  messagingSenderId: "YOUR_FIREBASE_MESSAGINGSENDERID",
  appId: "YOUR_FIREBASE_APPID"
};


const app = initializeApp(firebaseConfig);

