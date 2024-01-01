// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBjbCiWDWvv1DAWr17rgKVRJmQlmAv39YU",
  authDomain: "foodapp-dee93.firebaseapp.com",
  projectId: "foodapp-dee93",
  storageBucket: "foodapp-dee93.appspot.com",
  messagingSenderId: "70849815126",
  appId: "1:70849815126:web:31f8da8b394bd38799d1f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export {auth,db};