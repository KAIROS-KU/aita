import { getChapterCollection } from "@/firebase";
import { getDocs } from "firebase/firestore";

export async function POST(request:Request) {
  try {
    const { courseID, lectureID } = await request.json() as {
      courseID: string,
      lectureID: string,
    };
    
    const chapterCollection = getChapterCollection(courseID, lectureID);
    const querySnapshot = await getDocs(chapterCollection);

    const documents = querySnapshot.docs.map(doc => ({
      chapterID: doc.data().chapterID, 
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
