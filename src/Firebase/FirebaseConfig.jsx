import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDyAXoSZZUnA9VjW18j0M_scMr16d2bBPQ",
  authDomain: "blogtutorial-49f57.firebaseapp.com",
  projectId: "blogtutorial-49f57",
  storageBucket: "blogtutorial-49f57.appspot.com",
  messagingSenderId: "34609138810",
  appId: "1:34609138810:web:24571b29e096e384fcbfc3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { fireDB, auth, storage };
