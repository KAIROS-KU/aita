import route from "@/types/route";

export default class CreateChapterUseCase {
    async create(
        lectureFile: string,
    ): Promise<Response> {

        const pdfRes = await fetch(`${route}/api/v1/gpt/processpdf`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                lectureFile
            }),
        })

        const pdfJson = await pdfRes.json()
        const chapterData = JSON.parse(pdfJson.data);
        const headlines = chapterData.map((chapter: { headline: string }) => chapter.headline);


        const res = await fetch(`${route}/api/v1/gpt/generatechapter`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            }),
        })
        return res.json()
    }

    async createSampleChapter(
        courseID: string,
        lectureID: string,
        chapterName: string,
    ): Promise<Response> {
        const res = await fetch(`${route}/api/v1/chapter/create`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                courseID,
                lectureID,
                chapterName
            }),
        })
        return res.json()
    }
}