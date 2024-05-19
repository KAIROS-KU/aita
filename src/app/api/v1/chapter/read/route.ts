import { getChapterCollection } from "@/firebase";
import { getDocs } from "firebase/firestore";

export async function POST(request:Request) {
  try {
    const { courseId, lectureId } = await request.json() as {
      courseId: string,
      lectureId: string,
    };
    
    const chapterCollection = getChapterCollection(courseId, lectureId);
    const querySnapshot = await getDocs(chapterCollection);

    const documents = querySnapshot.docs.map(doc => ({
      chapterId: doc.data().chapterId, 
      chapterName: doc.data().chapterName
    }));
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "CHAPTER 불러오기에 성공했습니다",
        data: documents
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "CHAPTER 불러오기에 실패했습니다",
        data: error
      })
    );
  }
}
