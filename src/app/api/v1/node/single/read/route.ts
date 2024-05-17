import { getNodeTwoDoc } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function POST(request:Request) {
  try {
    const { courseID, lectureID, chapterID, nodeOneID, nodeTwoID } = await request.json() as {
      courseID: string,
      lectureID: string,
      chapterID: string,
      nodeOneID: string,
      nodeTwoID: string
    };
    
    const nodeRef = getNodeTwoDoc(courseID, lectureID, chapterID, nodeOneID, nodeTwoID);
    const nodeDoc = await getDoc(nodeRef);
    const nodeData = nodeDoc.data();
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "NODE 개별 불러오기에 성공했습니다",
        data: {
          nodeID: nodeData?.nodeID,
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
