import route from "@/types/route";

export default class CreateLectureUseCase {
    async create(
        courseID: string,
        lectureName: string,
        file: File
    ): Promise<ApiResponse> {
        const formData = new FormData();
        formData.append("path", `course/${courseID}/lectures/${lectureName}`);
        formData.append("file", file);

        const fileRes = await fetch(`${route}/api/v1/file/upload`, {
            method: "POST",
            body: formData
        });

        const fileURL = await fileRes.json().then((res) => {
            return res.data
        })

        if (!fileURL) return { success: false, message: "파일 업로드에 실패했습니다", data: fileURL }
        
        const res = await fetch(`${route}/api/v1/lecture/create`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                courseID,
                lectureName,
                fileURL
            }),
        })
        const data: ApiResponse = await res.json();
        return data;
    }
}