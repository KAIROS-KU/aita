import { getLectureCollection } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function POST(request:Request) {
  try {
    const { courseID, lectureName, file } = await request.json() as {
      courseID: string,
      lectureName: string,
      file: string
    };
    const lectureCollection = getLectureCollection(courseID);
    const lectureRef = doc(lectureCollection);
        
    await setDoc(lectureRef, {
      lectureName : lectureName,
      file: file
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "LECTURE 생성에 성공했습니다",
        data: {}
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "LECTURE 생성에 실패했습니다",
        data: error
      })
    );
  }
}
