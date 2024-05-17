import { getNodeCollection } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const { courseID, lectureID, chapterID, title, detail, createdAt } = await request.json() as {
      courseID: string,
      lectureID: string,
      chapterID: string,
      title: string,
      detail: string,
      createdAt: string
    };
    const nodeCollection = getNodeCollection(courseID, lectureID, chapterID);
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
