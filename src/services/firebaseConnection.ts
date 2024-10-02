
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdCOJ9ciKWGcz0l-klGhcQeFJ46zNq8a0",
  authDomain: "reactlinks-91956.firebaseapp.com",
  projectId: "reactlinks-91956",
  storageBucket: "reactlinks-91956.appspot.com",
  messagingSenderId: "566457408050",
  appId: "1:566457408050:web:136cf75178fdbe54feba2b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const db = getFirestore(app)

export {auth, db}