import { getFirestore } from "firebase/firestore";
import { getApps, getApp, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCw95ArPck0J8wih1gbIDqjmgqGiZk9n7k",
  authDomain: "spotit-aedbf.firebaseapp.com",
  projectId: "spotit-aedbf",
  storageBucket: "spotit-aedbf.appspot.com",
  messagingSenderId: "929045693867",
  appId: "1:929045693867:web:fc58808c3be392d8613eee"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore();
export { app, db }