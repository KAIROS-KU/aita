import { getNodeOneCollection } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function PUT(request:Request) {
  try {
    const { courseID, lectureID, chapterID, title, detail } = await request.json() as {
      courseID: string,
      lectureID: string,
      chapterID: string,
      title: string,
      detail: string
    };

    const nodeCollection = getNodeOneCollection(courseID, lectureID, chapterID);
    const nodeRef = doc(nodeCollection);

    await setDoc(nodeRef, {
      title: title, 
      detail: detail
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "NODE 수정에 성공했습니다",
        data: {}
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "NODE 수정에 실패했습니다",
        data: error
      })
    );
  }
}
