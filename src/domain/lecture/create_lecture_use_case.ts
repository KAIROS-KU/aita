import route from "@/types/route";

export default class CreateLectureUseCase {
    private async analyzeText(imageURLArray: string[]): Promise<ApiResponse> {
        try {
            const resultArray = await Promise.all(imageURLArray.map(async (imageURL) => {
                const res = await fetch(`${route}/api/v1/gpt/analyze-image`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ imageURL })
                });
                const result = await res.json();
                if (!result.success) throw new Error("이미지 분석에 실패했습니다");
                return result.data;
            }));
            return { success: true, message: "이미지 분석에 성공했습니다", data: resultArray };
        } catch (error) {
            return { success: false, message: "이미지 분석에 실패했습니다", data: error };
        }
    }

    async create(
        courseID: string,
        lectureName: string,
        file: File
    ): Promise<ApiResponse> {

        // 자료 업로드
        const formData = new FormData();
        formData.append("path", `course/${courseID}/lectures/${lectureName}`);
        formData.append("file", file);

        const uploadFileRes = await fetch(`${route}/api/v1/file/upload`, {
            method: "POST",
            body: formData
        });
        const uploadFileResult = await uploadFileRes.json()
        console.log(uploadFileResult)
        if (!uploadFileResult.success) return { success: false, message: "파일 업로드에 실패했습니다", data: null }
        const fileURL = uploadFileResult.data
        const pdfUrl = fileURL






        // pdf -> image[] 변환
        const imageArrayRes = await fetch(`${route}/api/v1/file/pdf-convert`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                pdfUrl
            }),
        })
        const imageArrayResult = await imageArrayRes.json()
        console.log(imageArrayResult)
        if (!(imageArrayRes.status === 200)) return { success: false, message: "PDF 변환에 실패했습니다", data: imageArrayResult.data }
        const imageURLArray = imageArrayResult.images





        // headline-contents 추출
        const headlineContentsRes = await this.analyzeText(imageURLArray)
        console.log(headlineContentsRes)
        if (!headlineContentsRes.success) return { success: false, message: "강의자료 내용 분석에 실패했습니다", data: null }
        const headlineContents = await headlineContentsRes.data.flat()




        // 강의 요약
        const lectureSummary = JSON.stringify(headlineContents)
        const summaryRes = await fetch(`${route}/api/v1/gpt/summarize-pdf`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                lectureSummary
            }),
        })
        const summaryResult = await summaryRes.json()
        console.log(summaryResult)
        if (!summaryResult.success) return { success: false, message: "강의자료 요약에 실패했습니다", data: null }
        const summary = summaryResult.data



        // 강의 생성
        const res = await fetch(`${route}/api/v1/lecture/create`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                courseID,
                lectureName,
                fileURL,
                headlineContents,
                imageURLArray,
                summary
            }),
        })
        const result = await res.json()
        if (!result.success) return { success: false, message: "강의자료 업로드에 실패했습니다.", data: null }
        const lectureID = result.data.lectureID
        const headlines: string[] = headlineContents.map((headlineContent: any) => headlineContent.headline)




        // 챕터 생성
        const chapterRes = await fetch(`${route}/api/v1/gpt/generatechapter`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                headlines
            }),
        })
        const chapterResult = await chapterRes.json()
        if (!chapterResult.success) return { success: false, message: "목차 생성에 실패했습니다", data: null }
        const chapters = JSON.parse(chapterResult.data)




        // 챕터 업로드
        chapters.forEach(async (chapter: any) => {
            const chapterName = chapter.chapterName
            const contents = chapter.headlines
            const createChapterRes = await fetch(`${route}/api/v1/chapter/create`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    courseID,
                    lectureID,
                    chapterName,
                    contents
                }),
            })
            const result = await createChapterRes.json()
            if (!result.success) return { success: false, message: "챕터 생성에 실패했습니다", data: null }
        })

        return { success: true, message: "강의자료 업로드에 성공했습니다", data: lectureID };
    }
}