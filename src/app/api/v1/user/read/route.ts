import { getUserCollection } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { cookies } from "next/headers";

export async function POST(request:Request) {
  try {

    const cookieStore = cookies();
    const userID = cookieStore.get("userID")?.value;

    if (!userID) return new Response(
        JSON.stringify({
            success: false,
            message: "로그인이 필요합니다"
        })
    )

    const userCollection = getUserCollection();
    const userRef = doc(userCollection, userID);
    const userDoc = await getDoc(userRef);
    const userData = {
      ...userDoc.data(),
      userID: userDoc.id
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "유저 불러오기에 성공했습니다",
        data: userData
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "유저 불러오기에 실패했습니다",
        data: error
      })
    );
  }
}
