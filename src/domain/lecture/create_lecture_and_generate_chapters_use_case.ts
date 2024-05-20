import route from "@/types/route";

export default class CreateLectureAndGenerateChaptersUseCase {
    async convertToImageArray(
        pdfFile: File
    ): Promise<ApiResponse> {
        const imageArray: File[] = []

        return {
            data: imageArray,
            success: true,
            message: "pdf 변환에 성공했습니다"
        }
    }


    async createLecture(
        courseID: string,
        lectureName: string,
        file: File[]
    ): Promise<ApiResponse> {

        const fileURLArray: { index: number; url: string; }[] = [];
        file.forEach(async (file, index) => {
            const formData = new FormData();
            formData.append("path", `course/${courseID}/lectures/${lectureName}`);
            formData.append("file", file);

            const fileRes = await fetch(`${route}/api/v1/file/upload`, {
                method: "POST",
                body: formData
            });

            const fileURL = await fileRes.json().then((res) => {
                return res.data;
            });

            fileURLArray.push({ index: index, url: fileURL });
        });
        
        
        const res = await fetch(`${route}/api/v1/lecture/create`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                courseID,
                lectureName,
                fileURLArray
            }),
        })
        const data: ApiResponse = await res.json();
        return data;
    }


    async generateChapters(
        imagesArray: string[]
    ): Promise<ApiResponse> {

        const headlines: string[] = []

        imagesArray.forEach(async (image, index) => {
            const pdfRes = await fetch(`${route}/api/v1/gpt/processpdf`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    image
                }),
            })
    
            const pdfJson = await pdfRes.json()
            const chapterData = JSON.parse(pdfJson.data);
            const headline = chapterData.map((chapter: {headline: string, contents: string}) => chapter.headline);
            headlines.push(headline);
        })

        const res = await fetch(`${route}/api/v1/gpt/generatechapter`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                headlines
            }),
        })
        return res.json()
    }
}