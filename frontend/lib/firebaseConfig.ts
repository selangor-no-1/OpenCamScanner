// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { FirebaseStorage, getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // input your own firebase configurations
  apiKey: "AIzaSyAJyjDILAjPhEhGCMf6C6hC8tDelmh7rQM",
  authDomain: "test-3b97a.firebaseapp.com",
  projectId: "test-3b97a",
  storageBucket: "test-3b97a.appspot.com",
  messagingSenderId: "181077445489",
  appId: "1:181077445489:web:d13c70a96d655421bec4d0",
  measurementId: "G-5YD4Q9CG7T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Firebase storage reference
const storage = getStorage(app);

export { storage };