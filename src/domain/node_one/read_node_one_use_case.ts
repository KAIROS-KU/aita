import route from "@/types/route";

export default class ReadNodeOneUseCase {
    async read(
        courseID: string,
        lectureID: string,
        chapterID: string,
    ): Promise<ApiResponse> {
        const res = await fetch(`${route}/api/v1/node/one/read/multiple`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                courseID,
                lectureID,
                chapterID,
            }),
        })
        return res.json()
    }
}