import route from "@/types/route";

export default class CreateCourseUseCase {
    async create(
        courseName: string,
        courseCode?: string,
        profName?: string,
        syllabusFile?: File,
    ): Promise<ApiResponse> {
        const file = syllabusFile;
        const storageRes = await fetch(`${route}/api/v1/file/upload`, {
            method: "POST",
            body: JSON.stringify({
                path: `course/${courseName}/syllabus/${syllabusFile?.name}`,
                file,
            }),
        });
        const storageResJson = await storageRes.json();
        console.log(storageResJson)

        if (!storageResJson.success) return storageResJson;

        const res = await fetch(`${route}/api/v1/course/create`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                courseName: courseName,
                courseCode: courseCode || "Unknown",
                syllabusPath: storageResJson.data || "Unknown",
                profName: profName || "Unknown",
            }),
        });
        const data = await res.json();
        return data;
    }
}
