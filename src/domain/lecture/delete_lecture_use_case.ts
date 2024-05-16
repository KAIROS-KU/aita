import route from "@/types/route";

export default class DeleteLectureUseCase {
    async delete(
        lectureID: string
    ): Promise<Response> {
        const res = await fetch(`${route}/api/v1/lecture/delete`, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                lectureID
            }),
        })
        return res.json()
    }
}