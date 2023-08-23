import {initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/auth";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDkYNKtNhzR-gI1j51SuC5NOPnnGXPtVUQ",
    authDomain: "auth-development-13f12.firebaseapp.com",
    projectId: "auth-development-13f12",
    storageBucket: "auth-development-13f12.appspot.com",
    messagingSenderId: "666301787004",
    appId: "1:666301787004:web:d0d76048e8420ce43692f9"
}
const app = initializeApp(firebaseConfig);
const auth =getAuth();
const database = getFirestore(app);
const storage = getStorage(app);
export {app, auth, database, storage};
