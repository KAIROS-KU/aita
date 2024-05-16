import route from "@/types/route";

export default class ReadNodeUseCase {
    async read(
        chapterID: string
    ): Promise<Response> {
        const res = await fetch(`${route}/api/v1/node/read`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chapterID
            }),
        })
        return res.json()
    }
}