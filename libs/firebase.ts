// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAA-tG5-9t5Hdl1JEVohtqqE88ztH0XFyI",
  authDomain: "e-shop-76a96.firebaseapp.com",
  projectId: "e-shop-76a96",
  storageBucket: "e-shop-76a96.appspot.com",
  messagingSenderId: "629250475299",
  appId: "1:629250475299:web:f4a798df8d5e3281187896",
  measurementId: "G-Q0S7W2XJRC"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp