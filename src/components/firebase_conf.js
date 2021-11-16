// Import the functions you need from the SDKs you need
import firebase from "firebase";
import "firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB94xvyR3Cb8mpMKg29jON_AxJQddBj7ek",
  authDomain: "homeautomationtest-fcd56.firebaseapp.com",
  projectId: "homeautomationtest-fcd56",
  storageBucket: "homeautomationtest-fcd56.appspot.com",
  messagingSenderId: "158863544455",
  appId: "1:158863544455:web:fcc0104cff02982ad2e822",
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

//const db = firebase.firestore();
const db = firebase.firestore();

export { db };
