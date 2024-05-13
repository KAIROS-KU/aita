import route from "@/types/route";

export default class ReadChapterUseCase {
    async read(
        lectureID: string
    ): Promise<Response> {
        const res = await fetch(`${route}/api/v1/chapter/read`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                lectureID
            }),
        })
        return res.json()
    }
}