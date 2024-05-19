import { getCourseCollection } from "@/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { cookies } from "next/headers";

export async function POST(request:Request) {
  try {
    const { courseID, courseName, courseCode, syllabusFile, profName } = await request.json() as {
      courseID: string,
      courseName: string,
      courseCode: string,
      syllabusFile: string,
      profName: string,
    };

    const cookieStore = cookies();
    const userId = cookieStore.get("userId")?.value;
    const createdAt = Timestamp.fromDate(new Date());
    
    const courseCollection = getCourseCollection();
    const courseRef = doc(courseCollection);
    
    await setDoc(courseRef, {
      userID: userId,
      courseID: courseID,
      courseName: courseName,
      courseCode:courseCode,
      syllabusFile: syllabusFile,
      profName: profName,
      createdAt: createdAt,
    });

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
