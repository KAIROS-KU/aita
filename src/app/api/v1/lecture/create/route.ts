import { getLectureCollection } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function POST(request:Request) {
  try {
    const {
      courseID,
      lectureName,
      fileURL,
      headlineContents,
      imageURL
    } = await request.json() as {
      courseID: string,
      lectureName: string,
      fileURL: string,
      headlineContents: string,
      imageURL: string[]
    };
    
    const createdAt = new Date()

    const lectureCollection = getLectureCollection(courseID);
    const lectureRef = doc(lectureCollection);
    const lectureID = lectureRef.id;
  
    await setDoc(lectureRef, {
      lectureName: lectureName,
      fileURL: fileURL,
      createdAt: createdAt,
      headlineContents: headlineContents,
      imageURLArray: imageURL
    });
  
    return new Response(
      JSON.stringify({
        success: true,
        message: "LECTURE 생성에 성공했습니다",
        data: { lectureID: lectureID }
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
