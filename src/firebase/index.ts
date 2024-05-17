import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc } from "firebase/firestore";
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
export function getLectureCollection(courseId: string) {
  return collection(db, "course", courseId, "lecture");
}
export function getChapterCollection(courseId: string, lectureId: string) {
  return collection(db, "course", courseId, "lecture", lectureId, "chapter");
}
export function getNodeOneCollection(courseId: string, lectureId: string, chapterId: string) {
  return collection(db, "course", courseId, "lecture", lectureId, "chapter", chapterId, "node");
}
export function getNodeTwoCollection(courseId: string, lectureId: string, chapterId: string, nodeOneId: string){
  return collection(db, "course", courseId, "lecture", lectureId, "chapter", chapterId, "node_one", nodeOneId, "node_two");
}
export function getLectureDoc(courseId: string, lectureId: string) {
  return doc(db, "course", courseId, "lecture", lectureId)
}
export function getChapterDoc(courseId: string, lectureId: string, chapterId: string) {
  return doc(db, "course", courseId, "lecture", lectureId, "chapter", chapterId)
}
export function getNodeOneDoc(courseId: string, lectureId: string, chapterId: string, nodeOneId: string) {
  return doc(db, "course", courseId, "lecture", lectureId, "chapter", chapterId, "node_one", nodeOneId)
}
export function getNodeTwoDoc(courseId: string, lectureId: string, chapterId: string, nodeOneId: string, nodeTwoId: string) {
  return doc(db, "course", courseId, "lecture", lectureId, "chapter", chapterId, "node_one", nodeOneId, "node_two", nodeTwoId)
}