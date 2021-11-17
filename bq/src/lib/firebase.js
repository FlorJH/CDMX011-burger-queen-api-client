/* eslint-disable no-undef */
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDgGPjuT8v8_3XiV1MjOoKc7N9yw2PF8_s",
  authDomain: "ac-burger-queen.firebaseapp.com",
  projectId: "ac-burger-queen",
  storageBucket: "ac-burger-queen.appspot.com",
  messagingSenderId: "2882002794",
  appId: "1:2882002794:web:3918e59ce04810040e0f13",
  measurementId: "G-37S6DD8YC4"
};

initializeApp(firebaseConfig);
export const auth = getAuth();

export const login= (email, password)=>{
    return signInWithEmailAndPassword(auth, email, password);
}
export const logout = () => signOut(auth);