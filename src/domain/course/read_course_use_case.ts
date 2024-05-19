import route from "@/types/route";

export default class ReadCourseUseCase {
    async read(
        courseID?: string,
    ): Promise<ApiResponse> {
        if (courseID) {
            const res = await fetch(`${route}/api/v1/course/read/single`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    courseID
                }),
            });
    
            const data: ApiResponse = await res.json();
            return data;
        } else {
            const res = await fetch(`${route}/api/v1/course/read`, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
            });

            const data: ApiResponse = await res.json();
            return data;
        }
    }
}
