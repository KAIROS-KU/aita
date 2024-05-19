import route from "@/types/route";

export default class ReadLectureUseCase {
    async read(
        courseID: string,
        lectureID?: string
    ): Promise<ApiResponse> {
        if (lectureID) {
            const res = await fetch(`${route}/api/v1/lecture/read/single`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    courseID,
                    lectureID
                }),
            })
            const data: ApiResponse = await res.json();
            return data;
        } else {
            const res = await fetch(`${route}/api/v1/lecture/read/multiple`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    courseID
                }),
            })
            const data: ApiResponse = await res.json();
            return data;
        }
    }
}