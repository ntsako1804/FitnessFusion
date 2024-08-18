// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { apiKey,appId,measurementId,messagingSenderId,storageBucket,projectId,authDomain } from '@env';

const firebaseConfig = {
  apiKey: "AIzaSyCtol5jrKIjjTq1HDQyhK-NcZimR8D55VQ",
  authDomain: "monday-a4c43.firebaseapp.com",
  projectId: "monday-a4c43",
  storageBucket: "monday-a4c43.appspot.com",
  messagingSenderId: "91843745346",
  appId: "1:91843745346:web:9bfc11fc3216f0a6197fdb",
  measurementId: "G-N86D128QJR"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//const auth = getAuth(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { db,auth };