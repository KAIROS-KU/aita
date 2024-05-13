import route from "@/types/route";

export default class ModifyCourseUseCase { // TODO: 수정사항 전체 보내기로 했던가?
    async modify(
        courseID?: string,
        courseName?: string,
        courseCode?: string,
        syllabusFile?: File,
        profName?: string,
    ): Promise<Response> {
        const res = await fetch(`${route}/api/v1/course/modify`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                courseID,
                courseName,
                courseCode,
                syllabusFile,
                profName,
            }),
        })
        return res.json()
    }
}