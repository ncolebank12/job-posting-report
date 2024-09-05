// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBJK4JYNESkmuq7ZMlo2P-yU__lnK4Z2R8",
    authDomain: "job-posting-report.firebaseapp.com",
    projectId: "job-posting-report",
    storageBucket: "job-posting-report.appspot.com",
    messagingSenderId: "584248441011",
    appId: "1:584248441011:web:44052c934cfaed73d098c6",
    measurementId: "G-QCV793D2F5"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

export { db };