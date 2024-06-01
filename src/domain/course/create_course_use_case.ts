import route from "@/types/route";

export default class CreateCourseUseCase {
    async create(
        courseName: string,
        courseCode: string,
        profName: string,
        syllabusFile: File,
    ): Promise<ApiResponse> {
        const formData = new FormData();
        formData.append("path", `course/${courseName}/syllabus/${syllabusFile?.name}`);
        formData.append("file", syllabusFile);

        const uploadFileRes = await fetch(`${route}/api/v1/file/upload`, {
            method: "POST",
            body: formData
        });
        const uploadFileResult = await uploadFileRes.json()
        if (!uploadFileResult.success) return { success: false, message: "파일 업로드에 실패했습니다", data: null }
        const fileURL = uploadFileResult.data



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
