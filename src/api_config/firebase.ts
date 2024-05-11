import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-ta-206f2.firebaseapp.com",
  projectId: "ai-ta-206f2",
  storageBucket: "ai-ta-206f2.appspot.com",
  messagingSenderId: "928712618229",
  appId: "1:928712618229:web:db1828a230d5bf0c2f95bc"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db };