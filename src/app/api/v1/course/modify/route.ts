import { getCourseCollection } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function PUT(request:Request) {
  try {
    const { userId, courseId, courseName, courseCode, syllabusFile, profName } = await request.json() as {
      userId: string,
      courseId: string,
      courseName: string,
      courseCode: string,
      syllabusFile: string,
      profName: string
    };
    
    const courseCollection = getCourseCollection();
    const courseRef = doc(courseCollection);
        
    await setDoc(courseRef, {
      userId: userId,
      courseId: courseId,
      courseName: courseName,
      courseCode:courseCode,
      syllabusFile: syllabusFile,
      profName: profName
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "",
        data: {}
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "COURSE 수정에 실패했습니다",
        data: error
      })
    );
  }
}
