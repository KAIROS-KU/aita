import { getCourseCollection } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { courseName, courseCode, syllabusFile, profName } = await request.json() as {
      courseName: string,
      courseCode: string,
      syllabusFile: string,
      profName: string,
    };

    const cookieStore = cookies();
    const userID = cookieStore.get("userID")?.value;
    if (!userID) return new Response(
      JSON.stringify({
        success: false,
        message: "로그인이 필요합니다",
        data: cookieStore
      })
    );
  
    const createdAt = new Date()

    const courseCollection = getCourseCollection();
    const courseRef = doc(courseCollection);

    const courseData = {
      userID: userID,
      courseName: courseName,
      courseCode: courseCode,
      syllabusFile: syllabusFile,
      profName: profName,
      createdAt: createdAt,
    }

    await setDoc(courseRef, courseData);

    return new Response(
      JSON.stringify({
        success: true,
        message: "COURSE 생성에 성공했습니다",
        data: {}
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "COURSE 생성에 실패했습니다",
        data: error
      })
    );
  }
}
