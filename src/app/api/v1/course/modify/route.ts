import { getCourseCollection } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { cookies} from "next/headers"

export async function PUT(request:Request) {
  try {
    const { courseID, courseName, courseCode, syllabusFile, profName } = await request.json() as {
      courseID: string,
      courseName: string,
      courseCode: string,
      syllabusFile: string,
      profName: string
    };
    
    const cookieStore = cookies();
    const userID = cookieStore.get("userID")?.value;
    
    const courseCollection = getCourseCollection();
    const courseRef = doc(courseCollection);
        
    await setDoc(courseRef, {
      userID: userID,
      courseID: courseID,
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
