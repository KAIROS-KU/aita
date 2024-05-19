import { db, getUserCollection } from "@/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

export async function POST(request:Request) {
  try {
    const { email, userName, fileURL, uid } = await request.json() as {
      email: string,
      userName: string,
      fileURL: string,
      uid: string
    };

    const createdAt = new Date()

    const userCollection = getUserCollection();
    const userRef = doc(userCollection, uid);

    const userDoc = {
      email: email,
      userName: userName,
      profilePic: fileURL,
      createdAt: createdAt
    }
    
    await setDoc(userRef, userDoc);

    return new Response(
      JSON.stringify({
        success: true,
        message: "유저 생성에 성공했습니다",
        data: {}
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "유저 생성에 실패했습니다",
        data: error
      })
    );
  }
}
