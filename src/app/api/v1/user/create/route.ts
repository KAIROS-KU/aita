import { getUserCollection } from "@/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";

export async function POST(request:Request) {
  try {
    const { email, userName, profilePic, courseUrl } = await request.json() as {
      email: string,
      userName: string,
      profilePic: string,
      courseUrl: string
    };

    const createdAt = Timestamp.fromDate(new Date());

    const userCollection = getUserCollection();
    const userRef = doc(userCollection);

    await setDoc(userRef, {
      email: email,
      userName: userName,
      profilePic: profilePic,
      courseUrl: courseUrl,
      createdAt: createdAt
    });

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
