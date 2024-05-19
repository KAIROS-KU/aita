import { getLectureDoc } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function PUT(request:Request) {
  try {
    const { courseId, lectureId, lectureName, fileUrl } = await request.json() as {
      courseId: string,
      lectureId: string,
      lectureName: string,
      fileUrl: string[]
    };

    const lectureRef = getLectureDoc(courseId, lectureId);

    await setDoc(lectureRef, {
      lectureName : lectureName,
      fileUrl: fileUrl
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
