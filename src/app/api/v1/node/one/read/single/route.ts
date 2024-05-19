import { getNodeOneDoc } from "@/firebase";
import { getDoc } from "firebase/firestore";

export async function POST(request:Request) {
  try {
    const { courseID, lectureID, chapterID, nodeOneId } = await request.json() as {
      courseID: string,
      lectureID: string,
      chapterID: string,
      nodeOneId: string
    };
    
    const nodeRef = getNodeOneDoc(courseID, lectureID, chapterID, nodeOneId);
    const nodeDoc = await getDoc(nodeRef);
    const nodeData = nodeDoc.data();
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "NODE 개별 불러오기에 성공했습니다",
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
        message: "NODE 개별 불러오기에 실패했습니다",
        data: error
      })
    );
  }
}
