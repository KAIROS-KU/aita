import { LectureProps } from "@/app/sample_data";
import { getLectureCollection } from "@/firebase";
import { getDocs } from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const { courseID } = await request.json() as {
      courseID: string
    };

    const documents: any[] = []
    const lectureRef = getLectureCollection(courseID);
    const querySnapshot = await getDocs(lectureRef);

    querySnapshot.forEach(
      (doc) => {
        documents.push(
          {
            ...doc.data(),
            lectureID: doc.id
          }
        )
      }
    )

    return new Response(
      JSON.stringify({
        success: true,
        message: "LECTURE 불러오기에 성공했습니다",
        data: documents
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "LECTURE 불러오기에 실패했습니다",
        data: error
      })
    );
  }
}
