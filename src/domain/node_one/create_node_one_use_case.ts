import route from "@/types/route";

export default class CreateNodeOneUseCase {
    async create(
        courseID: string,
        lectureID: string,
        chapterID: string,
        title: string,
        detail: string,
        prompt?: string,
    ): Promise<Response> {
        const res = await fetch(`${route}/api/v1/node/one/create`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                courseID,
                lectureID,
                chapterID,
                title,
                detail
            }),
        })
        return res.json()
    }
}