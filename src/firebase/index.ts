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

export const db = getFirestore(app);
export const storage = getStorage(app);

export function getUserCollection() {
  return collection(db, "user");
}
export function getCourseCollection() {
  return collection(db, "course");
}
export function getLectureCollection(courseID: string) {
  return collection(db, "course", courseID, "lecture");
}
export function getChapterCollection(courseID: string, lectureID: string) {
  return collection(db, "course", courseID, "lecture", lectureID, "chapter");
}
export function getNodeCollection(courseID: string, lectureID: string, chapterID: string) {
  return collection(db, "course", courseID, "lecture", lectureID, "chapter", chapterID, "node");
}
