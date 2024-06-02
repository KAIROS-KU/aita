import { storage } from "@/firebase";
import route from "@/types/route";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default class CreateCourseUseCase {
    async create(
        courseName: string,
        courseCode: string,
        profName: string,
        syllabusFile: File,
    ): Promise<ApiResponse> {
        const storageRef = ref(
            storage,
            `course/${courseName}/syllabus/${syllabusFile?.name}`
        );
        await uploadBytes(storageRef, syllabusFile);
        const URL = await getDownloadURL(storageRef);
        const fileURL = URL



        const res = await fetch(`${route}/api/v1/course/create`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                courseName: courseName,
                courseCode: courseCode || "Unknown",
                syllabusFile: fileURL || "Unknown",
                profName: profName || "Unknown",
            }),
        });
        const data = await res.json();
        return data;
    }
}
