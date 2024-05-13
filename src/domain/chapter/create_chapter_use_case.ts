import route from "@/types/route";

export default class CreateChapterUseCase {
    async create(
        chapterName: string
    ): Promise<Response> {
        const res = await fetch(`${route}/api/v1/chapter/create`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chapterName
            }),
        })
        return res.json()
    }
}