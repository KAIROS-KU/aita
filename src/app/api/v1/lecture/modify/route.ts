import { getLectureDoc } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function PUT(request:Request) {
  try {
    const { courseID, lectureID, lectureName, fileURL } = await request.json() as {
      courseID: string,
      lectureID: string,
      lectureName: string,
      fileURL: string[]
    };

    const lectureRef = getLectureDoc(courseID, lectureID);

    await setDoc(lectureRef, {
      lectureName : lectureName,
      fileURL: fileURL
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "LECTURE 수정에 성공했습니다",
        data: {}
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "LECTURE 수정에 실패했습니다",
        data: error
      })
    );
  }
}
