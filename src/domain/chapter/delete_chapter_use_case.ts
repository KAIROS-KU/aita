import route from "@/types/route";

export default class DeleteChapterUseCase {
    async delete(
        courseID: string
    ): Promise<Response> {
        const res = await fetch(`${route}/api/v1/chapter/delete`, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                courseID
            }),
        })
        return res.json()
    }
}