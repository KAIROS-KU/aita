import { getLectureCollection } from "@/firebase";
import { doc, getDocs } from "firebase/firestore";

export async function POST(request:Request) {
  try {
    const { courseID } = await request.json() as {
      courseID: string,
    };
    
    const lectureRef = getLectureCollection(courseID);
    const querySnapshot = await getDocs(lectureRef);

    const documents = querySnapshot.docs.map(doc => ({
      lectureID: doc.data().lectureID,
      lectureName: doc.data().lectureName,
      file: doc.data().file,
    }))
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "LECTURE 불러오기에 성공했습니다",
        data: document
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
