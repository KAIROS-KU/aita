import { getCourseCollection } from "@/firebase";
import { doc, getDocs, query, where } from "firebase/firestore";

export async function GET() { //userID 불러오는거 맞는지 아닌지 모르겟어서 일단안함
  try {
    const userID = " "
    const courseCollectionRef = getCourseCollection();
    const q = query(courseCollectionRef, where(`userID`, "==", userID));
    const querySnapshot = await getDocs(q);

    const documents = querySnapshot.docs.map(doc => ({ 
      courseID: doc.data().courseID,
      courseName: doc.data().courseName,
      courseCode: doc.data().courseCode,
      createdAt: doc.data().createdAt,
      syllabusFile: doc.data().syllabusFile,
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


