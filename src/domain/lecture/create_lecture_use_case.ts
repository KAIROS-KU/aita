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

    async create(
        courseID: string,
        lectureName: string,
        file: File
    ): Promise<ApiResponse> {
        // 자료 분석
        const base64 = await this.fileToBase64(file);        
        const fileType = file.type.includes('pdf') ? 'pdf' : 'image';
        const body = fileType === 'pdf' ? { fileType, pdf: base64 } : { fileType, image: base64 };
        const extractTextRes = await fetch(this.firebaseFunctionUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const extractTextResult = await extractTextRes.json()
        const extractedText = extractTextResult.text

        // headline-contents 추출
        const openaiRes = await fetch(`${route}/api/v1/gpt/processpdf`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                text: extractedText
            }),
        })
        const openaiResult = await openaiRes.json()

        if (!openaiResult.success) return { success: false, message: "강의자료 내용 분석에 실패했습니다", data: null }
        const headlineContents = JSON.parse(openaiResult.data)


        // 자료 업로드
        const formData = new FormData();
        formData.append("path", `course/${courseID}/lectures/${lectureName}`);
        formData.append("file", file);

        const uploadFileRes = await fetch(`${route}/api/v1/file/upload`, {
            method: "POST",
            body: formData
        });
        const uploadFileResult = await uploadFileRes.json()

        if (!uploadFileResult.success) return { success: false, message: "파일 업로드에 실패했습니다", data: null }
        const fileURL = uploadFileResult.data


        // 강의 생성
        const res = await fetch(`${route}/api/v1/lecture/create`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                courseID,
                lectureName,
                fileURL,
                headlineContents
            }),
        })
        const result = await res.json()

        return result;
    }
}