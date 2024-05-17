import { getNodeOneCollection } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function PUT(request:Request) {
  try {
    const { courseId, lectureId, chapterId, title, detail } = await request.json() as {
      courseId: string,
      lectureId: string,
      chapterId: string,
      title: string,
      detail: string
    };

    const nodeCollection = getNodeOneCollection(courseId, lectureId, chapterId);
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
