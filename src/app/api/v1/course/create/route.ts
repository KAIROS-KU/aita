import { getCourseCollection } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function POST(request:Request) {
  try {
    const { userID, courseID, courseName, courseCode, courseFile, syllabusFile, profName, createdAt } = await request.json() as {
      userID: string,
      courseID: string,
      courseName: string,
      courseCode: string,
      courseFile: string,
      syllabusFile: string,
      profName: string,
      createdAt: Date
    };
    const courseCollection = getCourseCollection();
    const courseRef = doc(courseCollection);

    await setDoc(courseRef, {
      userID: userID,
      courseID: courseID,
      courseName: courseName,
      courseCode:courseCode,
      courseFile: courseFile,
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
