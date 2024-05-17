import { getNodeTwoCollection } from "@/firebase";
import { doc, getDocs } from "firebase/firestore";

export async function POST(request:Request) {
  try {
    const { courseId, lectureId, chapterId, nodeOneId } = await request.json() as {
      courseId: string,
      lectureId: string,
      chapterId: string,
      nodeOneId: string
    };
    
    const nodeRef = getNodeTwoCollection(courseId, lectureId, chapterId, nodeOneId);
    const querySnapshot = await getDocs(nodeRef);
    
    const documents = querySnapshot.docs.map(doc => ({
        title: doc.data().title,
        detail: doc.data().detail
    }))
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "NODE Two 불러오기에 성공했습니다",
        data: documents
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "NODE Two 불러오기에 실패했습니다",
        data: error
      })
    );
  }
}
