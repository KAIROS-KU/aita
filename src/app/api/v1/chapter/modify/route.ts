import { getChapterCollection } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function PUT(request:Request) {
  try {
    const { courseId, lectureId, chapterName } = await request.json() as {
      courseId: string,
      lectureId: string,
      chapterName: string
    };
    
    const chapterCollection = getChapterCollection(courseId, lectureId);
    const chapterRef = doc(chapterCollection);

    await setDoc(chapterRef, {
      chapterName: chapterName
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "CHAPTER 수정에 성공했습니다",
        data: {}
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "CHAPTER 수정에 실패했습니다",
        data: error
      })
    );
  }
}
