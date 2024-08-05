// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getFirestore, collection } = require("firebase/firestore");

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDNhSx1kLWG_A5XwYvxVdeei50S9G4LPfY",
    authDomain: "quiz-9fe46.firebaseapp.com",
    projectId: "quiz-9fe46",
    storageBucket: "quiz-9fe46.appspot.com",
    messagingSenderId: "753918327545",
    appId: "1:753918327545:web:d97f5500ef1ec187038028",
    measurementId: "G-3QJSGGCKQ6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a reference to the collection
const userTool = collection(db, "user-tool");

module.exports = userTool;
