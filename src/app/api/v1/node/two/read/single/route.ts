import { getNodeTwoDoc } from "@/firebase";
import { getDoc } from "firebase/firestore";

export async function POST(request:Request) {
  try {
    const { courseId, lectureId, chapterId, nodeOneId, nodeTwoId } = await request.json() as {
      courseId: string,
      lectureId: string,
      chapterId: string,
      nodeOneId: string,
      nodeTwoId: string
    };
    
    const nodeRef = getNodeTwoDoc(courseId, lectureId, chapterId, nodeOneId, nodeTwoId);
    const nodeDoc = await getDoc(nodeRef);
    const nodeData = nodeDoc.data();
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "NODE Two 개별 불러오기에 성공했습니다",
        data: {
          title: nodeData?.title,
          detail: nodeData?.detail
        }
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "NODE Two 개별 불러오기에 실패했습니다",
        data: error
      })
    );
  }
}
