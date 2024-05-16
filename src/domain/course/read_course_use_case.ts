import route from "@/types/route";

export default class ReadCourseUseCase {
    async read(
    ): Promise<Response> {
        const res = await fetch(`${route}/api/v1/course/read`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            }),
        })
        return res.json()
    }
}