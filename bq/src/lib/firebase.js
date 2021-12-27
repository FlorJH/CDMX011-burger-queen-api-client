/* eslint-disable no-undef */
import { initializeApp } from "firebase/app";

import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  // setPersistence,
  // browserSessionPersistence
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDocs, collection, updateDoc, query, where} from "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);




export const login = async (email, password) => {
  //  await setPersistence(auth, browserSessionPersistence)
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => signOut(auth);

export const register = async (email, password, rol) => {
  const infoUser = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  ).then((userFirebase) => {
    return userFirebase;
  });

  console.log(infoUser.user.uid);
  const docRef = doc(firestore, `users/${infoUser.user.uid}`);
  setDoc(docRef, {email: email, rol: rol , active:true, uid:infoUser.user.uid});
};

export const getUsers = async ( )=>{
const userQuery = query(collection(firestore, "users"), where("active", "==", true));
const querySnapshot = await getDocs(userQuery);
return querySnapshot 
}


export const removeUser = async (userUid) =>{
  const userRef = doc(firestore, "users", userUid);
  await updateDoc(userRef, {
    active: false
  });
}

export const updateUser = async (userUid, dataToUpdate) =>{
 
  try{
    const userRef = doc(firestore, "users", userUid);
    await updateDoc(userRef, {
      rol: dataToUpdate
    });
  }
  catch(e){
    console.log(e);

  }
  
}