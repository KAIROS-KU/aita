import route from "@/types/route";

export default class ModifyLectureUseCase {
    async modify(
        lectureID: string,
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

        const res = await fetch(`${route}/api/v1/course/modify`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                lectureID,
                lectureName,
                fileURL
            }),
        })
        return res.json()
    }
}