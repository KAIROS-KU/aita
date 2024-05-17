import { getLectureCollection } from "@/firebase";
import { doc, getDoc, Timestamp } from "firebase/firestore";

export async function POST(request:Request) {
  try {
    const { courseID, lectureID } = await request.json() as {
      courseID: string,
      lectureID: string
    };
    
    const lectureCollection = getLectureCollection(courseID);
    const lectureRef = doc(lectureCollection, lectureID);
    const lectureDoc = await getDoc(lectureRef);
    const lectureData = lectureDoc.data();
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "LECTURE 개별 불러오기에 성공했습니다",
        data: {
          lectureID: lectureData?.lectureID,
          createdAt: lectureData?.createdAt.toDate(), //timestamp형식이면 이렇게 하는거맞낭
          lectureName: lectureData?.lectureName,
          file: lectureData?.file
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
