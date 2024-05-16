import route from "@/types/route";

export default class CreateCourseUseCase {
    async create(
        courseName: string,
        courseCode: string,
        syllabusFile: File,
        profName: string
    ): Promise<Response> {
        const res = await fetch(`${route}/api/v1/course/create`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                courseName,
                courseCode,
                syllabusFile,
                profName
            }),
        })
        return res.json()
    }
}