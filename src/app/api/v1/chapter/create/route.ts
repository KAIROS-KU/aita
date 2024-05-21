import { getChapterCollection } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function POST(request:Request) {
  try {
    const { courseID, lectureID, chapterName } = await request.json() as {
      courseID: string,
      lectureID: string,
      chapterName: string
    };

    const createdAt = new Date()

    const chapterCollection = getChapterCollection(courseID, lectureID);
    const chapterRef = doc(chapterCollection);
    const chapterID = chapterRef.id;

    await setDoc(chapterRef, {
      chapterName: chapterName,
      createdAt: createdAt
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "CHAPTER 생성에 성공했습니다",
        data: {chapterID: chapterID}
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "CHAPTER 생성에 실패했습니다",
        data: error
      })
    );
  }
}
