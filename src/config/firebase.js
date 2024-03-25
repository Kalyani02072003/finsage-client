// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqEPbv8sA3IVEF0ofVp66RyoOzCUlphDk",
  authDomain: "softwareengineering-project.firebaseapp.com",
  databaseURL: "https://softwareengineering-project-default-rtdb.firebaseio.com",
  projectId: "softwareengineering-project",
  storageBucket: "softwareengineering-project.appspot.com",
  messagingSenderId: "495811112651",
  appId: "1:495811112651:web:38bf27d8ca3962e809b54e",
  measurementId: "G-NDH397E874"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)


