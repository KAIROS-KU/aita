import { getUserCollection } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { cookies } from "next/headers";

export async function PUT(request:Request) {
  try {
    const { email, userName, profilePic, courseUrl } = await request.json() as {
      email: string,
      userName: string,
      profilePic: string,
      courseUrl: string
    };

    const cookieStore = cookies();
    const userID = cookieStore.get("userID")?.value;

    const userCollection = getUserCollection();
    const userRef = doc(userCollection, userID);

    await setDoc(userRef, {
      userID: userID,
      email: email,
      userName: userName,
      profilePic: profilePic,
      courseUrl: courseUrl
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
        message: "유저 수정에 실패했습니다",
        data: error
      })
    );
  }
}
