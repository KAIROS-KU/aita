import { getNodeOneCollection } from "@/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const { courseId, lectureId, chapterId, title, detail } = await request.json() as {
      courseId: string,
      lectureId: string,
      chapterId: string,
      title: string,
      detail: string
    };

    const createdAt = Timestamp.fromDate(new Date());

    const nodeCollection = getNodeOneCollection(courseId, lectureId, chapterId);
    const nodeRef = doc(nodeCollection);

    await setDoc(nodeRef, {
      title: title, 
      detail: detail, 
      createdAt: createdAt
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "NODE 생성에 성공했습니다",
        data: {}
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "NODE 생성에 실패했습니다",
        data: error
      })
    );
  }
}
