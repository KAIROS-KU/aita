import route from "@/types/route";

export default class CreateLectureUseCase {
    private firebaseFunctionUrl = 'https://asia-northeast3-kairos-3326d.cloudfunctions.net/detectText';

    // 자료 base64로 변환
    private async fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    resolve(reader.result.toString().split(',')[1]);
                } else {
                    reject(new Error('Failed to read file.'));
                }
            };
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    }

    private async analyzeText(imageURLArray: string[]): Promise<ApiResponse> {
        const body = { imageURLArray };
        const resultArray: any[] = [];
        imageURLArray.forEach(async (imageURL) => {
            const res = await fetch(`${route}/api/v1/gpt/analyze-image`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageURL })
            });
            const result = await res.json();
            if (!result.success) return { success: false, message: "이미지 분석에 실패했습니다", data: null }
            resultArray.push(result.data);
        })
        return { success: true, message: "이미지 분석에 성공했습니다", data: resultArray }
    }

    async create(
        courseID: string,
        lectureName: string,
        file: File
    ): Promise<ApiResponse> {
        // 자료 분석
        // const base64 = await this.fileToBase64(file);
        // const fileType = file.type.includes('pdf') ? 'pdf' : 'image';
        // const body = fileType === 'pdf' ? { fileType, pdf: base64 } : { fileType, image: base64 };
        // const extractTextRes = await fetch(this.firebaseFunctionUrl, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(body)
        // });
        // const extractTextResult = await extractTextRes.json()
        // const extractedText = extractTextResult.text





        // // headline-contents 추출
        // const openaiRes = await fetch(`${route}/api/v1/gpt/processpdf`, {
        //     method: "POST",
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         text: extractedText
        //     }),
        // })
        // const openaiResult = await openaiRes.json()

        // if (!openaiResult.success) return { success: false, message: "강의자료 내용 분석에 실패했습니다", data: null }
        // const headlineContents = JSON.parse(openaiResult.data)



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






        // pdf -> image[] 변환
        const imageArrayRes = await fetch(`${route}/api/v1/file/pdf-convert`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                pdfUrl: fileURL
            }),
        })
        const imageArrayResult = await imageArrayRes.json()
        console.log(imageArrayResult)
        if (!imageArrayResult.success) return { success: false, message: "PDF 변환에 실패했습니다", data: null }
        const imageURLArray = imageArrayResult.data





        // headline-contents 추출
        const headlineContentsRes = await this.analyzeText(imageURLArray)
        console.log(headlineContentsRes)
        if (!headlineContentsRes.success) return { success: false, message: "강의자료 내용 분석에 실패했습니다", data: null }
        const headlineContents = headlineContentsRes.data





        // 강의 생성
        const res = await fetch(`${route}/api/v1/lecture/create`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                courseID,
                lectureName,
                fileURL,
                headlineContents,
                imageURLArray
            }),
        })
        const result = await res.json()
        console.log(result)
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
        console.log(chapterResult)
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
            console.log(result)
            if (!result.success) return { success: false, message: "챕터 생성에 실패했습니다", data: null }
        })

        return { success: true, message: "강의자료 업로드에 성공했습니다", data: lectureID };
    }
}