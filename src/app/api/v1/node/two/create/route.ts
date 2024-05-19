import { getNodeTwoCollection } from "@/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const { courseId, lectureId, chapterId, nodeOneId, title, detail } = await request.json() as {
      courseId: string,
      lectureId: string,
      chapterId: string,
      nodeOneId: string,
      title: string,
      detail: string,
    };

    const createdAt = Timestamp.fromDate(new Date());

    const nodeCollection = getNodeTwoCollection(courseId, lectureId, chapterId, nodeOneId);
    const nodeRef = doc(nodeCollection);

    await setDoc(nodeRef, {
      title: title, 
      detail: detail, 
      createdAt: createdAt
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "NODE Two 생성에 성공했습니다",
        data: {}
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "NODE Two 생성에 실패했습니다",
        data: error
      })
    );
  }
}
