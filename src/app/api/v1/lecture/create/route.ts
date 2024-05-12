import { LECTURE_COLLECTION } from "@/app/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function POST(request:Request) {
  try {
    const {
      lectureName,
      file,
    } = await request.json();
    const lectureRef = doc(LECTURE_COLLECTION);
    // const lectureRef = doc(fn("course123"))
        
    await setDoc(lectureRef, {
      lectureName : lectureName,
      file: file,
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
        message: "LECTURE 생성에 실패했습니다",
        data: error,
      }),
    );
  }
}