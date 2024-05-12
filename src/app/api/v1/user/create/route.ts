import { USER_COLLECTION } from "@/app/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function POST(request:Request) {
  try {
    const { userID, email , userName, profilePic, courseURL } = await request.json();
    const UserRef = doc(USER_COLLECTION);

    await setDoc(UserRef, {
      userID: userID,
      email: email,
      userName: userName,
      profilePic: profilePic,
      courseURL: courseURL
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "",
        data: {},
      }),
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "유저 생성에 실패했습니다",
        data: error,
      }),
    );
  }
}