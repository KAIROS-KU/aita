import { getNodeTwoCollection } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function PUT(request:Request) {
  try {
    const { courseID, lectureID, chapterID, nodeOneId, title, detail } = await request.json() as {
      courseID: string,
      lectureID: string,
      chapterID: string,
      nodeOneId: string,
      title: string,
      detail: string
    };

    const nodeCollection = getNodeTwoCollection(courseID, lectureID, chapterID, nodeOneId);
    const nodeRef = doc(nodeCollection);

    await setDoc(nodeRef, {
      title: title, 
      detail: detail
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "NODE Two 수정에 성공했습니다",
        data: {}
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "NODE Two 수정에 실패했습니다",
        data: error
      })
    );
  }
}
