import { getNodeOneCollection } from "@/firebase";
import { doc, getDocs } from "firebase/firestore";

export async function POST(request:Request) {
  try {
    const { courseID, lectureID, chapterID} = await request.json() as {
      courseID: string,
      lectureID: string,
      chapterID: string,
    };
    
    const nodeRef = getNodeOneCollection(courseID, lectureID, chapterID);
    const querySnapshot = await getDocs(nodeRef);
    
    const documents = querySnapshot.docs.map(doc => ({
        nodeID: doc.data().nodeID,
        title: doc.data().title,
        detail: doc.data().detail,
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
