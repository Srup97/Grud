import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBeNi9U7X2dNrL7C2ttoziySKpo5rlo5ZY",
    authDomain: "crud-cd236.firebaseapp.com",
    projectId: "crud-cd236",
    storageBucket: "crud-cd236.appspot.com",
    messagingSenderId: "710278004299",
    appId: "1:710278004299:web:bf45151605e87fcd2ad7ce"
  };

  export const firebaseApp = firebase.initializeApp(firebaseConfig);