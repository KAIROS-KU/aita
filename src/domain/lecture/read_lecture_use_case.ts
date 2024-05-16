import route from "@/types/route";

export default class ReadLectureUseCase {
    async read(
        courseID: string
    ): Promise<Response> {
        const res = await fetch(`${route}/api/v1/lecture/read`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                courseID
            }),
        })
        return res.json()
    }
}