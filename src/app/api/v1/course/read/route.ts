import { getCourseCollection } from "@/firebase";
import { getDocs, query, where } from "firebase/firestore";
import { cookies } from "next/headers";

export async function GET(request:Request) {
  try {
    const cookieStore = cookies();
    const userID = cookieStore.get("userID")?.value;

    const courseCollectionRef = getCourseCollection();
    const q = query(courseCollectionRef, where('userID', "==", userID));
    const querySnapshot = await getDocs(q);

    const documents = querySnapshot.docs.map(doc => ({ 
      courseID: doc.id,
      courseName: doc.data().courseName,
      courseCode: doc.data().courseCode,
      createdAt: doc.data().createdAt,
      syllabusFile: doc.data().syllabusFile,
      profName: doc.data().profName,
    }));

    return new Response(
      JSON.stringify({
        success: true,
        message: "COURSE 불러오기에 성공했습니다",
        data: documents
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "COURSE 불러오기에 실패했습니다",
        data: error
      })
    );
  }
}
