import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID as string,
};

const app = initializeApp(firebaseConfig);


export const storage = getStorage(app);
export const db = getFirestore(app);
export const COURSE_COLLECTION = collection(db, "course");
export const USER_COLLECTION = collection(db, "user");
export const LECTURE_COLLECTION = collection(db, "lecture");
export const CHAPTER_COLLECTION = collection(db, "chapter");
export const NODE_COLLECTION = collection(db, "node");
// export function fn(courseID, lectureID, chapterID, nodeOneID, nodeTwoID) {
//   return collection(db, "course", courseID, "lecture", lectureID, "chapter", chapterID, "nodeOne", nodeOneID, "nodeTwo");
// }
