import route from "@/types/route";

export default class CreateCourseUseCase {
    async create(
        lectureName: string,
        file: File
    ): Promise<Response> {
        const path = `/courseID/lectureID/file`
        const fileRes = await fetch(`${route}/api/v1/file/upload`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                path,
                file
            }),
        })

        const fileURL = await fileRes.json().then((res) => {
            return res.data
        })
        const res = await fetch(`${route}/api/v1/course/create`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                lectureName,
                fileURL
            }),
        })
        return res.json()
    }
}