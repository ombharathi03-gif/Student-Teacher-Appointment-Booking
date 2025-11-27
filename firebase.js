// firebase.js (modular, final)
// Exports: app, auth, db, firebaseConfig
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// <- replace with YOUR config
export const firebaseConfig = {
  apiKey: "AIzaSyAb2OLF1cGp2C8SbIM7N4JGn03lqdtffu4",
  authDomain: "student-teacher-appointm-adbc4.firebaseapp.com",
  projectId: "student-teacher-appointm-adbc4",
  storageBucket: "student-teacher-appointm-adbc4.appspot.com",
  messagingSenderId: "277093941459",
  appId: "1:277093941459:web:52e1480f20e626fe531426"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

console.log("✅ firebase.js (modular) initialized");
