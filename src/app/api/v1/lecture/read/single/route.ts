import { getLectureCollection } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function POST(request:Request) {
  try {
    const { courseId, lectureId } = await request.json() as {
      courseId: string,
      lectureId: string
    };
    
    const lectureCollection = getLectureCollection(courseId);
    const lectureRef = doc(lectureCollection, lectureId);
    const lectureDoc = await getDoc(lectureRef);
    const lectureData = lectureDoc.data();
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "LECTURE 개별 불러오기에 성공했습니다",
        data: {
          lectureId: lectureData?.lectureId,
          lectureName: lectureData?.lectureName,
          fileUrl: lectureData?.fileUrl,
          createdAt: lectureData?.createdAt
        }
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "LECTURE 개별 불러오기에 실패했습니다",
        data: error
      })
    );
  }
}
