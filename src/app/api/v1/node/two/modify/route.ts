import { getNodeTwoCollection } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function PUT(request:Request) {
  try {
    const { courseId, lectureId, chapterId, nodeOneId, title, detail } = await request.json() as {
      courseId: string,
      lectureId: string,
      chapterId: string,
      nodeOneId: string,
      title: string,
      detail: string
    };

    const nodeCollection = getNodeTwoCollection(courseId, lectureId, chapterId, nodeOneId);
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
