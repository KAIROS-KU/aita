import { getUserCollection } from "@/firebase/index";
import { doc, setDoc } from "firebase/firestore";

export async function POST(request:Request) {
  try {
    const { userID, email , userName, profilePic, courseURL } = await request.json() as {
      userID: string,
      email: string,
      userName: string,
      profilePic: string,
      courseURL: string
    };
    const userCollection = getUserCollection();
    const UserRef = doc(userCollection);

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
