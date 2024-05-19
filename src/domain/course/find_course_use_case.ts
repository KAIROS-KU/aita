import route from "@/types/route";

export default class FindCourseUseCase {
    async read(
        courseID: string
    ): Promise<ApiResponse> {
        const res = await fetch(`${route}/api/v1/course/read?courseID=${courseID}`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        });

        const data: ApiResponse = await res.json();
        return data;
    }
}