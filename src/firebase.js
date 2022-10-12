import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// there is a update in the firebase import section
const firebaseConfig = {
  apiKey: "AIzaSyBBIV2uJD8nmIxoSwOfJY2KeSGVL4bng0g",
  authDomain: "netflix-a023d.firebaseapp.com",
  projectId: "netflix-a023d",
  storageBucket: "netflix-a023d.appspot.com",
  messagingSenderId: "1004223794275",
  appId: "1:1004223794275:web:5f84a09f4e96b1582a3c56",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
export { auth };
export default db;
