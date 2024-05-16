import route from "@/types/route";

export default class ModifyChapterUseCase { // TODO: 수정사항 전체 보내기로 했던가?
    async modify(
        chapterID: string,
        chapterName: string
    ): Promise<Response> {
        const res = await fetch(`${route}/api/v1/chapter/modify`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chapterID,
                chapterName
            }),
        })
        return res.json()
    }
}