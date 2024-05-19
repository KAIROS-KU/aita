import { getChapterCollection } from "@/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";

export async function POST(request:Request) {
  try {
    const { courseId, lectureId, chapterName } = await request.json() as {
      courseId: string,
      lectureId: string,
      chapterName: string
    };

    const createdAt = Timestamp.fromDate(new Date());

    const chapterCollection = getChapterCollection(courseId, lectureId);
    const chapterRef = doc(chapterCollection);

    await setDoc(chapterRef, {
      chapterName: chapterName,
      createdAt: createdAt
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "CHAPTER 생성에 성공했습니다",
        data: {}
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
