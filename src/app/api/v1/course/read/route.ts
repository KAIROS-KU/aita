import { COURSE_COLLECTION } from "@/app/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function GET(request:Request) {
  try {

  


  return new Response(
    JSON.stringify({
      success: true,
      message: "",
      data: {},
    }),
  );

  } catch(error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "COURSE 불러오기에 실패했습니다",
        data: error,
      }),
    );
  }
}