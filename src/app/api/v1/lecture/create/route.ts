import { getLectureCollection } from "@/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";

export async function POST(request:Request) {
  try {
    const { courseId, lectureName, fileUrl } = await request.json() as {
      courseId: string,
      lectureName: string,
      fileUrl: string
    };
    
    const createdAt = Timestamp.fromDate(new Date());

    const lectureCollection = getLectureCollection(courseId);
    const lectureRef = doc(lectureCollection);

    await setDoc(lectureRef, {
      lectureName : lectureName,
      fileUrl: fileUrl,
      createdAt: createdAt
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
