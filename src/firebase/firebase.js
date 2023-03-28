// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
import { GoogleAuthProvider,getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyBtQBYJALHSGWU4cM5ax2tffg5_2PxgNj0",
  authDomain: "hiloramart-c274b.firebaseapp.com",
  projectId: "hiloramart-c274b",
  storageBucket: "hiloramart-c274b.appspot.com",
  messagingSenderId: "832023665016",
  appId: "1:832023665016:web:d7715d2f587de335b3d08d",
  measurementId: "G-RS6KF7T8BZ",
};

const app = initializeApp(firebaseConfig);
export default app;
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();
export const firebaseAuth = getAuth();