import { getCourseCollection } from "@/firebase";
import { getDocs, query, where } from "firebase/firestore";
import { cookies } from "next/headers";

export async function POST(request:Request) {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get("userId");

    const courseCollectionRef = getCourseCollection();
    const q = query(courseCollectionRef, where('userId', "==", userId));
    const querySnapshot = await getDocs(q);

    const documents = querySnapshot.docs.map(doc => ({ 
      courseId: doc.data().courseId,
      courseName: doc.data().courseName,
      courseCode: doc.data().courseCode,
      createdAt: doc.data().createdAt,
      syllabusFile: doc.data().syllabusFile
    }));

    return new Response(
      JSON.stringify({
        success: true,
        message: "COURSE 생성에 성공했습니다",
        data: documents
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
