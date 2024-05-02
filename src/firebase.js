// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
// 
const firebaseConfig = {
  apiKey: "AIzaSyD4w-ojym7SLBUZ6yx6ghs5BJPjYe9nBjA",
  authDomain: "netflix-clone-f8927.firebaseapp.com",
  projectId: "netflix-clone-f8927",
  storageBucket: "netflix-clone-f8927.appspot.com",
  messagingSenderId: "47858649498",
  appId: "1:47858649498:web:061bf7a86ebfdeb8e2d223"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db= getFirestore(app);

const signup = async (name,email,password) =>{
    
  try{
   const res = await createUserWithEmailAndPassword(auth, email, password)
   const user = res.user;
   await addDoc(collection(db,"user"),{
    uid:user.uid,
    name,
    authProvider:"local",
    email,
   })
  }catch(error){
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '))
  }
}
const login = async (email,password) =>{
  try {
   await signInWithEmailAndPassword(auth,email, password)
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
}
const logout = () =>{
  signOut(auth);
}
export {auth, db, login, signup, logout};