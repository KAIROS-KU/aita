import { getNodeOneCollection } from "@/firebase";
import { getDocs } from "firebase/firestore";

export async function POST(request:Request) {
  try {
    const { courseId, lectureId, chapterId } = await request.json() as {
      courseId: string,
      lectureId: string,
      chapterId: string
    };
    
    const nodeRef = getNodeOneCollection(courseId, lectureId, chapterId);
    const querySnapshot = await getDocs(nodeRef);
    
    const documents = querySnapshot.docs.map(doc => ({
        nodeId: doc.data().nodeId,
        title: doc.data().title,
        detail: doc.data().detail
    }))
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "NODE 불러오기에 성공했습니다",
        data: documents
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "NODE 불러오기에 실패했습니다",
        data: error
      })
    );
  }
}
