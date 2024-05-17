import { getChapterCollection } from "@/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";

export async function POST(request:Request) {
  try {
    const { courseID, lectureID, chapterName, createdAt} = await request.json() as{
      courseID: string,
      lectureID: string,
      chapterName: string,
      createdAt: string,
    }

    const createdAtTimestamp = Timestamp.fromDate(new Date(createdAt));

    const chapterCollection = getChapterCollection(courseID, lectureID);
    const chapterRef = doc(chapterCollection);

    await setDoc(chapterRef, {
      chapterName: chapterName,
      createdAt: createdAtTimestamp
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "CHAPTER 생성에 성공했습니다",
        data: {}
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "CHAPTER 생성에 실패했습니다",
        data: error
      })
    );
  }
}
