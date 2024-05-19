import { getCourseCollection } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function POST(request:Request) {
  try {
    const { courseID } = await request.json() as {
      courseID: string
    };
    
    const courseCollection = getCourseCollection();
    const courseRef = doc(courseCollection, courseID);
    const courseDoc = await getDoc(courseRef);
    const courseData = {
      ...courseDoc.data(),
      courseID: courseDoc.id
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "COURSE 개별 불러오기에 성공했습니다",
        data: courseData
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "COURSE 개별 불러오기에 실패했습니다",
        data: error
      })
    );
  }
}
