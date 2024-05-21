import route from "@/types/route";

export default class ReadChapterUseCase {
    async read(
        courseID: string,
        lectureID: string
    ): Promise<ApiResponse> {
        console.log(courseID, lectureID)
        const res = await fetch(`${route}/api/v1/chapter/read`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                courseID,
                lectureID
            }),
        })
        return res.json()
    }
}