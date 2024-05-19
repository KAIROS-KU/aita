import { getChapterDoc } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function PUT(request:Request) {
  try {
    const { courseID, lectureID, chapterID, chapterName } = await request.json() as {
      courseID: string,
      lectureID: string,
      chapterID: string,
      chapterName: string
    };
    
    const chapterRef = getChapterDoc(courseID, lectureID, chapterID);

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
