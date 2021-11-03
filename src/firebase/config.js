import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBxOqzcFW6UAfuurtIPM_04UmqZCNTL0Io",
  authDomain: "amplify-ba37a.firebaseapp.com",
  databaseURL:
    "https://amplify-ba37a-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "amplify-ba37a",
  storageBucket: "amplify-ba37a.appspot.com",
  messagingSenderId: "900111121510",
  appId: "1:900111121510:android:0f324e86643f7ed764c1a7",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export { firebase, db };
