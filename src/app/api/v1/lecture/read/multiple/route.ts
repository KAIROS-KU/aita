import { getLectureCollection } from "@/firebase";
import { getDocs } from "firebase/firestore";

export async function POST(request:Request) {
  try {
    const { courseId } = await request.json() as {
      courseId: string
    };
    
    const lectureRef = getLectureCollection(courseId);
    const querySnapshot = await getDocs(lectureRef);

    const documents = querySnapshot.docs.map(doc => ({
      lectureId: doc.data().lectureId,
      lectureName: doc.data().lectureName,
      fileUrl: doc.data().fileUrl
    }))
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "LECTURE 불러오기에 성공했습니다",
        data: documents
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "LECTURE 불러오기에 실패했습니다",
        data: error
      })
    );
  }
}
